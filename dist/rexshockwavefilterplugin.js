(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexshockwavefilterplugin = factory());
})(this, (function () { 'use strict';

  const FilterName = 'rexFilterShockwave';

  // reference : https://www.geeks3d.com/20091116/shader-library-2d-shockwave-post-processing-filter-glsl/

  const frag = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 texSize;
uniform vec2 center;
uniform vec2 waveConfig;
uniform vec2 powConfig;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
  float waveRadius = waveConfig.x;
  float waveHalfWidth = waveConfig.y;
  float powBaseScale = powConfig.x;
  float powExponent = powConfig.y;

  if (waveHalfWidth > 0.0) {
    vec2 tc = outTexCoord * texSize;
    tc -= center;

    float diff = length(tc) - waveRadius;
    if ((diff <= waveHalfWidth) && (diff >= -waveHalfWidth)) {
      diff /= max(texSize.x, texSize.y);
      float powDiff = 1.0 - pow(abs(diff*powBaseScale), powExponent);
      tc += texSize * diff * powDiff;
    }

    tc += center;
    gl_FragColor = texture2D(uMainSampler, tc / texSize);
  } else {
    gl_FragColor = texture2D(uMainSampler, outTexCoord);
  }
}
`;

  class ShockwaveFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
      static FilterName = FilterName;

      constructor(manager) {
          super(FilterName, manager, null, frag);
      }

      // This method sets up the uniforms for the shader.
      setupUniforms(controller, drawingContext) {
          const programManager = this.programManager;

          programManager.setUniform('waveConfig', [controller.waveRadius, controller.waveWidth / 2]);
          programManager.setUniform('powConfig', [controller.powBaseScale, controller.powExponent]);
          programManager.setUniform('center', [controller.centerX, controller.centerY]);
          programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
      }
  }

  const GetValue = Phaser.Utils.Objects.GetValue;

  class ShockwaveController extends Phaser.Filters.Controller {
      static FilterName = FilterName;

      constructor(camera, config) {
          super(camera, FilterName);

          this.centerX = 0; // position wo resolution
          this.centerY = 0; // position wo resolution
          this.waveWidth = 20;
          this.powBaseScale = 0.8;
          this.powExponent = 0.1;

          this.resetFromJSON(config);
      }

      resetFromJSON(o) {
          this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
          this.setWaveRadius(GetValue(o, 'waveRadius', 0));
          this.setWaveWidth(GetValue(o, 'waveWidth', 20));
          this.setPowBaseScale(GetValue(o, 'powBaseScale', 0.8));
          this.setPowExponent(GetValue(o, 'powExponent', 0.1));
          return this;
      }

      // center
      setCenter(x, y) {
          if (x === undefined) {
              x = this.camera.centerX;
              y = this.camera.centerY;
          }
          this.centerX = x;
          this.centerY = y;
          return this;
      }

      // waveRadius
      setWaveRadius(value) {
          if (value === undefined) {
              value = 0;
          }
          this.waveRadius = value;
          return this;
      }

      // waveWidth
      setWaveWidth(value) {
          if (value === undefined) {
              value = 0;
          }
          this.waveWidth = value;
          return this;
      }

      // powBaseScale
      setPowBaseScale(value) {
          this.powBaseScale = value;
          return this;
      }

      // powExponent
      setPowExponent(value) {
          this.powExponent = value;
          return this;
      }

  }

  const GameClass = Phaser.Game;
  var IsGame = function (object) {
      return (object instanceof GameClass);
  };

  const SceneClass = Phaser.Scene;
  var IsSceneObject = function (object) {
      return (object instanceof SceneClass);
  };

  var GetGame = function (object) {
      if ((object == null) || (typeof (object) !== 'object')) {
          return null;
      } else if (IsGame(object)) {
          return object;
      } else if (IsGame(object.game)) {
          return object.game;
      } else if (IsSceneObject(object)) { // object = scene object
          return object.sys.game;
      } else if (IsSceneObject(object.scene)) { // object = game object
          return object.scene.sys.game;
      }
  };

  var RegisterFilter = function (game, FilterClass) {
      var filterName = FilterClass.FilterName;
      var renderNodes = GetGame(game).renderer.renderNodes;
      if (renderNodes.hasNode(filterName)) {
          return;
      }

      renderNodes.addNodeConstructor(filterName, FilterClass);
  };

  var AddFilterListMethod = function (name, callback) {
      var FilterListComponent = Phaser.GameObjects.Components.FilterList.prototype;
      if (FilterListComponent[name]) {
          console.warn(`FilterList method: ${name} is already defined`);
          return;
      }

      FilterListComponent[name] = callback;
  };

  var GetFilterList = function (gameObject, external) {
      if (external === undefined) {
          external = false;
      }

      if (!gameObject.filters) {
          gameObject.enableFilters().focusFilters();
      }

      var filterList = (!external) ? gameObject.filters.internal : gameObject.filters.external;

      return filterList;
  };

  var AddController = function (gameObject, ControllerClass, config, external) {
      if (config === undefined) {
          config = {};
      }

      var filterList = GetFilterList(gameObject, external);

      var controller = filterList.add(
          new ControllerClass(filterList.camera, config)
      );

      if (config.name) {
          controller.name = config.name;
      }

      return controller;
  };

  const SpliceOne = Phaser.Utils.Array.SpliceOne;

  var RemoveController = function (gameObject, ControllerClass, name, external) {
      var list = GetFilterList(gameObject, external).list;
      if (name === undefined) {
          for (var i = (list.length - 1); i >= 0; i--) {
              var controller = list[i];
              if (controller instanceof ControllerClass) {
                  controller.destroy();
                  SpliceOne(controller, i);
              }
          }
      } else {
          for (var i = 0, cnt = list.length; i < cnt; i++) {
              var controller = list[i];
              if ((controller instanceof ControllerClass) && (controller.name === name)) {
                  controller.destroy();
                  SpliceOne(controller, i);
              }
          }
      }

  };

  var GetController = function (gameObject, ControllerClass, name, external) {
      var list = GetFilterList(gameObject, external).list;
      if (name === undefined) {
          var result = [];
          for (var i = 0, cnt = list.length; i < cnt; i++) {
              var controller = list[i];
              if (controller instanceof ControllerClass) {
                  result.push(controller);
              }
          }
          return result;
      } else {
          for (var i = 0, cnt = list.length; i < cnt; i++) {
              var controller = list[i];
              if ((controller instanceof ControllerClass) && (controller.name === name)) {
                  return controller;
              }
          }
      }
  };

  class FilterPluginBase extends Phaser.Plugins.BasePlugin {
      setFilterClass(FilterClass, ControllerClass) {
          this.FilterClass = FilterClass;
          this.ControllerClass = ControllerClass;
          return this;
      }

      setFilterListMethod(name, callback) {
          AddFilterListMethod(name, callback);
          return this;
      }

      start() {
          var eventEmitter = this.game.events;
          eventEmitter.once('destroy', this.destroy, this);

          if (this.game.isRunning) {
              RegisterFilter(this.game, this.FilterClass);

          } else {
              eventEmitter.once('ready', function () {
                  RegisterFilter(this.game, this.FilterClass);
              }, this);

          }

      }

      add(gameObject, config, external = false) {
          return AddController(gameObject, this.ControllerClass, config, external);
      }

      remove(gameObject, name, external = false) {
          RemoveController(gameObject, this.ControllerClass, name, external);
          return this;
      }

      get(gameObject, name, external = false) {
          return GetController(gameObject, this.ControllerClass, name, external);
      }
  }

  var IsInValidKey = function (keys) {
      return (keys == null) || (keys === '') || (keys.length === 0);
  };

  var GetEntry = function (target, keys, defaultEntry) {
      var entry = target;
      if (IsInValidKey(keys)) ; else {
          if (typeof (keys) === 'string') {
              keys = keys.split('.');
          }

          var key;
          for (var i = 0, cnt = keys.length; i < cnt; i++) {
              key = keys[i];
              if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                  var newEntry;
                  if (i === cnt - 1) {
                      if (defaultEntry === undefined) {
                          newEntry = {};
                      } else {
                          newEntry = defaultEntry;
                      }
                  } else {
                      newEntry = {};
                  }

                  entry[key] = newEntry;
              }

              entry = entry[key];
          }
      }

      return entry;
  };

  var SetValue = function (target, keys, value, delimiter) {
      if (delimiter === undefined) {
          delimiter = '.';
      }

      // no object
      if (typeof (target) !== 'object') {
          return;
      }

      // invalid key
      else if (IsInValidKey(keys)) {
          // don't erase target
          if (value == null) {
              return;
          }
          // set target to another object
          else if (typeof (value) === 'object') {
              target = value;
          }
      } else {
          if (typeof (keys) === 'string') {
              keys = keys.split(delimiter);
          }

          var lastKey = keys.pop();
          var entry = GetEntry(target, keys);
          entry[lastKey] = value;
      }

      return target;
  };

  class ShockwaveFilterPlugin extends FilterPluginBase {
      constructor(pluginManager) {
          super(pluginManager);

          this.setFilterClass(ShockwaveFilter, ShockwaveController);

          this.setFilterListMethod(
              'addRexShockwave',
              function (config) {
                  return this.add(new ShockwaveController(this.camera, config));
              }
          );
      }
  }

  SetValue(window, 'RexPlugins.Filters.ShockwaveFilter', ShockwaveFilter);
  SetValue(window, 'RexPlugins.Filters.ShockwaveController', ShockwaveController);

  return ShockwaveFilterPlugin;

}));

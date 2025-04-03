(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcrossstitchingfilterplugin = factory());
})(this, (function () { 'use strict';

  const FilterName = 'rexCrossStitching';

  // reference : https://www.geeks3d.com/20110408/cross-stitching-post-processing-shader-glsl-filter-geexlab-pixel-bender/

  const frag = `\
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
uniform vec2 stitchingSize;
uniform float brightness;

void main (void) {
  vec2 cPos = outTexCoord * texSize;
  int remX = int(mod(cPos.x, stitchingSize.x));
  int remY = int(mod(cPos.y, stitchingSize.y));
  vec2 tlPos;
  if (remX == 0 && remY == 0) {
    tlPos = cPos;
  } else {
    tlPos = floor(cPos / stitchingSize);
    tlPos.x = tlPos.x * stitchingSize.x;
    tlPos.y = tlPos.y * stitchingSize.y;
  }
  vec2 blPos = tlPos;
  blPos.y += (stitchingSize.y - 1.0);

  vec4 color0, color1;
  if (
    (remX == remY) || 
    (((int(cPos.x) - int(blPos.x)) == (int(blPos.y) - int(cPos.y))))
  ) {
    color0 = texture2D(uMainSampler, tlPos * vec2(1.0/texSize.x, 1.0/texSize.y)) * 1.4;
    color1 = vec4(0.2, 0.15, 0.05, 1.0);
  } else {
    color0 = vec4(0.0, 0.0, 0.0, 1.0);
    color1 = texture2D(uMainSampler, tlPos * vec2(1.0/texSize.x, 1.0/texSize.y)) * 1.4;    
  }
  gl_FragColor = mix(color0, color1, brightness);
}
`;

  class CrossStitchingFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
      static FilterName = FilterName;

      constructor(manager) {
          super(FilterName, manager, null, frag);
      }

      // This method sets up the uniforms for the shader.
      setupUniforms(controller, drawingContext) {
          const programManager = this.programManager;

          programManager.setUniform('stitchingSize', [controller.stitchingWidth, controller.stitchingHeight]);
          programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
          programManager.setUniform('brightness', controller._brightness);
      }

  }

  const GetValue = Phaser.Utils.Objects.GetValue;
  const Clamp = Phaser.Math.Clamp;

  class CrossStitchingController extends Phaser.Filters.Controller {
      static FilterName = FilterName;

      constructor(camera, config) {
          super(camera, FilterName);

          this.stitchingWidth = 6; // width of stitching wo resolution
          this.stitchingHeight = 6; // height of stitching wo resolution
          this._brightness = 0;

          this.resetFromJSON(config);
      }

      resetFromJSON(o) {
          this.setStitchingSize(GetValue(o, 'stitchingWidth', 6), GetValue(o, 'stitchingHeight', 6));
          this.setBrightness(GetValue(o, 'brightness', 0));
          return this;
      }

      // stitchingWidth
      setStitchingWidth(value) {
          this.stitchingWidth = value;
          return this;
      }

      // stitchingHeight
      setStitchingHeight(value) {
          this.stitchingHeight = value;
          return this;
      }

      setStitchingSize(width, height) {
          if (height === undefined) {
              height = width;
          }
          this.stitchingWidth = width;
          this.stitchingHeight = height;
          return this;
      }

      // brightness
      get brightness() {
          return this._brightness;
      }

      set brightness(value) {
          this._brightness = Clamp(value, 0, 1);
      }

      setBrightness(value) {
          this.brightness = value;
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

  class CrossStitchingFilterPlugin extends FilterPluginBase {
      constructor(pluginManager) {
          super(pluginManager);

          this.setFilterClass(CrossStitchingFilter, CrossStitchingController);

          this.setFilterListMethod(
              'addRexCrossStitching',
              function (config) {
                  return this.add(new CrossStitchingController(this.camera, config));
              }
          );
      }
  }

  SetValue(window, 'RexPlugins.Filters.CrossStitchingFilter', CrossStitchingFilter);
  SetValue(window, 'RexPlugins.Filters.CrossStitchingController', CrossStitchingController);

  return CrossStitchingFilterPlugin;

}));

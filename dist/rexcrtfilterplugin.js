(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcrtfilterplugin = factory());
})(this, (function () { 'use strict';

  const FilterName = 'rexFilterCrt';

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
uniform vec2 warp;
uniform float scanLineStrength;
uniform float scanLineWidth;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
  // squared distance from center
  vec2 uv = outTexCoord;
  vec2 dc = abs(0.5-uv);
  dc *= dc;
  
  // warp the fragment coordinates
  uv.x -= 0.5; 
  uv.x *= 1.0+(dc.y*warp.x);
  uv.x += 0.5;

  uv.y -= 0.5; 
  uv.y *= 1.0+(dc.x*warp.y); 
  uv.y += 0.5;

  // sample inside boundaries, otherwise set to black
  if (uv.y > 1.0 || uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0) {
    gl_FragColor = vec4(0.0,0.0,0.0,1.0);
  } else {
    // float apply = abs(sin(outTexCoord.y*scanLineWidth)*scanLineStrength);
    // gl_FragColor = vec4(mix(texture2D(uMainSampler,uv).rgb,vec3(0.0),apply),1.0);
    vec4 color = texture2D(uMainSampler,uv);
    color.rgb *= (1.-scanLineStrength)+(sin(outTexCoord.y*scanLineWidth)*scanLineStrength);
    gl_FragColor = color;
  }
}
`;

  class CrtFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
      static FilterName = FilterName;

      constructor(manager) {
          super(FilterName, manager, null, frag);
      }

      // This method sets up the uniforms for the shader.
      setupUniforms(controller, drawingContext) {
          const programManager = this.programManager;

          programManager.setUniform('warp', [controller.warpX, controller.warpY]);
          programManager.setUniform('scanLineStrength', controller.scanLineStrength);
          programManager.setUniform('scanLineWidth', controller.scanLineWidth);
      }

  }

  const GetValue = Phaser.Utils.Objects.GetValue;

  class CrtController extends Phaser.Filters.Controller {
      static FilterName = FilterName;

      constructor(camera, config) {
          super(camera, FilterName);

          this.warp = 0;
          this.scanLineStrength = 0.2;
          this.scanLineWidth = 1024;

          this.resetFromJSON(config);
      }

      resetFromJSON(o) {
          this.setWarp(GetValue(o, 'warpX', 0.75), GetValue(o, 'warpY', 0.75));
          this.setScanStrength(GetValue(o, 'scanLineStrength', 0.2));
          this.setScanLineWidth(GetValue(o, 'scanLineWidth', 1024));
          return this;
      }

      // warp
      setWarp(warpX, warpY) {
          this.warpX = warpX;
          this.warpY = warpY;
          return this;
      }

      // scanLineStrength
      setScanStrength(value) {
          this.scanLineStrength = value;
          return this;
      }

      // scanLineWidth
      setScanLineWidth(value) {
          this.scanLineWidth = value;
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

  class CrtFilterPlugin extends FilterPluginBase {
      constructor(pluginManager) {
          super(pluginManager);

          this.setFilterClass(CrtFilter, CrtController);

          this.setFilterListMethod(
              'addRexCrt',
              function (config) {
                  return this.add(new CrtController(this.camera, config));
              }
          );
      }
  }

  SetValue(window, 'RexPlugins.Filters.CrtFilter', CrtFilter);
  SetValue(window, 'RexPlugins.Filters.CrtController', CrtController);

  return CrtFilterPlugin;

}));

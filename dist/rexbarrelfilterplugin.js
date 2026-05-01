(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
  typeof define === 'function' && define.amd ? define(['phaser'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbarrelfilterplugin = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

  const FilterName = 'rexFilterBarrel';

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
uniform vec4 config;
uniform vec2 texSize;
uniform vec2 center;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
  float shrinkMode = config.x;
  float radius = config.y;
  float power = config.z;
  float intensity = config.w;
  vec2 tc = outTexCoord * texSize;  
  tc -= center;
  float dist = length(tc) / radius;
  float factor = pow(dist, power);
  if (shrinkMode > 0.0) {
    factor = 1.0 / factor;
  }

  tc *= mix(1.0, factor, intensity);
  tc += center;
  gl_FragColor = texture2D(uMainSampler, tc / texSize);

}
`;

  class BarrelFilter extends phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
      static FilterName = FilterName;

      constructor(manager) {
          super(FilterName, manager, null, frag);
      }

      // This method sets up the uniforms for the shader.
      setupUniforms(controller, drawingContext) {
          const programManager = this.programManager;

          var shrinkMode = (controller.shrinkMode) ? 1 : 0;
          programManager.setUniform('config', [shrinkMode, controller.radius, controller.power, controller.intensity]);
          programManager.setUniform('center', [controller.centerX, controller.centerY]);
          programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
      }
  }

  const GetValue = phaser.Utils.Objects.GetValue;

  class BarrelController extends phaser.Filters.Controller {
      static FilterName = FilterName;

      constructor(camera, config) {
          super(camera, FilterName);

          this.shrinkMode = false;
          this.centerX = 0; // position wo resolution
          this.centerY = 0; // position wo resolution
          this.radius = 0;
          this.power = 1;
          this.intensity = 1;

          this.resetFromJSON(config);
      }

      resetFromJSON(o) {
          this.setShrinkMode(GetValue(o, 'shrink', false));
          this.setRadius(GetValue(o, 'radius', 0));
          this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
          this.setPower(GetValue(o, 'power', 0.5));
          this.setIntensity(GetValue(o, 'intensity', 1));
          return this;
      }

      // radius
      setRadius(value) {
          this.radius = value;
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

      // power
      setPower(power) {
          this.power = power;
          return this;
      }

      // intensity
      setIntensity(value) {
          this.intensity = value;
          return this;
      }

      // shrinkMode
      setShrinkMode(mode) {
          if (mode === undefined) {
              mode = true;
          }
          this.shrinkMode = mode;
          return this;
      }
  }

  const GameClass = phaser.Game;
  var IsGame = function (object) {
      return (object instanceof GameClass);
  };

  const SceneClass = phaser.Scene;
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
          return false;
      }

      renderNodes.addNodeConstructor(filterName, FilterClass);
      return true;
  };

  var AddFilterListMethod = function (name, callback) {
      var FilterListComponent = phaser.GameObjects.Components.FilterList.prototype;
      if (FilterListComponent[name]) {
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

  const SpliceOne = phaser.Utils.Array.SpliceOne;

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

  class FilterPluginBase extends phaser.Plugins.BasePlugin {
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

  var IsNil = function (value) {
      return value === null || value === undefined;
  };

  var IsObjectLike = function (value) {
      return value !== null && typeof value === 'object';
  };

  var NormalizePath = function (path, delimiter) {
      if (Array.isArray(path)) ; else if (typeof path !== 'string') {
          path = [];
      } else if (path.trim() === '') {
          path = [];
      } else {
          path = path.split(delimiter).filter(Boolean);
      }
      return path;
  };

  /**
   * Set a nested value into target by path (mutates target).
   *
   * - If keys is a string and does NOT contain delimiter, write directly.
   * - Intermediate non-plain-object values are always overwritten with {}.
   *
   * @param {object} target
   * @param {string|string[]} keys
   * @param {*} value
   * @param {string} [delimiter='.']
   * @returns {object} the same target reference
   */
  var SetValue = function (target, keys, value, delimiter = '.') {
      if (!IsObjectLike(target)) {
          return target;
      }

      // Invalid key: no-op; don't replace root
      if (IsNil(keys) || keys === '' || (Array.isArray(keys) && keys.length === 0)) {
          return target;
      }

      // Fast path: single key
      if (
          (typeof keys === 'string' && keys.indexOf(delimiter) === -1) ||
          (typeof keys === 'number')
      ) {
          target[keys] = value;
          return target;
      }

      var pathSegments = NormalizePath(keys, delimiter);
      if (pathSegments.length === 0) {
          return target;
      }

      var cursor = target;
      var pathSegmentsCount = pathSegments.length;

      for (var index = 0; index < pathSegmentsCount - 1; index++) {
          var segment = pathSegments[index];
          var next = cursor[segment];

          if (!IsObjectLike(next)) {
              // Force overwrite intermediates
              cursor[segment] = {};
          }

          cursor = cursor[segment];
      }

      cursor[pathSegments[pathSegmentsCount - 1]] = value;
      return target;
  };

  class BarrelFilterPlugin extends FilterPluginBase {
      constructor(pluginManager) {
          super(pluginManager);

          this.setFilterClass(BarrelFilter, BarrelController);

          this.setFilterListMethod(
              'addRexBarrel',
              function (config) {
                  return this.add(new BarrelController(this.camera, config));
              }
          );
      }
  }

  SetValue(window, 'RexPlugins.Filters.BarrelFilter', BarrelFilter);
  SetValue(window, 'RexPlugins.Filters.BarrelController', BarrelController);

  return BarrelFilterPlugin;

}));

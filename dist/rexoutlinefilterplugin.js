(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexoutlinefilterplugin = factory());
})(this, (function () { 'use strict';

  const FilterName = 'rexFilterOutline';

  // Reference: https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag

  const frag = `\
#pragma phaserTemplate(shaderName)

#define ANGLESTEP 0.314

#pragma phaserTemplate(fragmentDefine)

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
uniform float thickness;
uniform vec3 outlineColor;

const float DOUBLE_PI = 3.14159265358979323846264 * 2.;

#pragma phaserTemplate(fragmentHeader)

void main() {
  vec4 front = boundedSampler(uMainSampler, outTexCoord);

  if (thickness > 0.0) {
    vec2 mag = vec2(thickness/texSize.x, thickness/texSize.y);
    vec4 curColor;
    float maxAlpha = front.a;
    vec2 offset;
    for (float angle = 0.; angle < DOUBLE_PI; angle += ANGLESTEP) {
        offset = vec2(mag.x * cos(angle), mag.y * sin(angle));        
        curColor = boundedSampler(uMainSampler, outTexCoord + offset);
        maxAlpha = max(maxAlpha, curColor.a);
    }
    vec3 resultColor = front.rgb + (outlineColor.rgb * (1. - front.a)) * maxAlpha;
    gl_FragColor = vec4(resultColor, maxAlpha);
  } else {
    gl_FragColor = front;
  }
}
`;

  const MAX_SAMPLES = 100;
  const MIN_SAMPLES = 1;

  class OutlineFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
      static FilterName = FilterName;

      constructor(manager) {
          var shaderAdditions = [
              {
                  name: 'anglestep_0.314',
                  additions: {
                      fragmentDefine: '#define ANGLESTEP 0.314'
                  },
                  tags: ['anglestep']
              }
          ];
          super(FilterName, manager, null, frag, shaderAdditions);
      }

      updateShaderConfig(controller, drawingContext) {
          var programManager = this.programManager;

          var samples = Math.max((controller.quality * MAX_SAMPLES), MIN_SAMPLES);
          var angleStep = (Math.PI * 2 / samples).toFixed(7);
          var anglestepAddition = programManager.getAdditionsByTag('anglestep')[0];
          anglestepAddition.name = 'anglestep_' + angleStep;
          anglestepAddition.additions.fragmentDefine = '#undef ANGLESTEP\n#define ANGLESTEP ' + angleStep;
      }

      // This method sets up the uniforms for the shader.
      setupUniforms(controller, drawingContext) {
          const programManager = this.programManager;

          programManager.setUniform('thickness', controller.thickness);
          programManager.setUniform('outlineColor', [controller._outlineColor.redGL, controller._outlineColor.greenGL, controller._outlineColor.blueGL]);
          programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
      }
  }

  const GetValue = Phaser.Utils.Objects.GetValue;
  const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
  const Color = Phaser.Display.Color;

  class OutlineController extends Phaser.Filters.Controller {
      static FilterName = FilterName;

      constructor(camera, config) {
          super(camera, FilterName);

          this.thickness = 0;
          this._outlineColor = new Color();
          this.quality = 0.1;

          this.setPaddingOverride(null);
          this.resetFromJSON(config);
      }

      resetFromJSON(o) {
          this.setThickness(GetValue(o, 'thickness', 3));
          this.setOutlineColor(GetValue(o, 'outlineColor', 0xffffff));
          this.setQuality(GetValue(o, 'quality', 0.1));
          return this;
      }

      setThickness(value) {
          this.thickness = value;
          return this;
      }

      get outlineColor() {
          return this._outlineColor;
      }

      set outlineColor(value) {
          if (typeof (value) === 'number') {
              value = IntegerToRGB(value);
          }
          this._outlineColor.setFromRGB(value);
      }

      setOutlineColor(value) {
          this.outlineColor = value;
          return this;
      }

      setQuality(value) {
          this.quality = value;
          return this;
      }

      getPadding() {
          var override = this.paddingOverride;
          if (override)
          {
              this.currentPadding.setTo(override.x, override.y, override.width, override.height);
              return override;
          }

          var padding = this.currentPadding;
          var distance = this.thickness;

          padding.left = -distance;
          padding.top = -distance;
          padding.right = distance;
          padding.bottom = distance;

          return padding;
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
          return false;
      }

      renderNodes.addNodeConstructor(filterName, FilterClass);
      return true;
  };

  var AddFilterListMethod = function (name, callback) {
      var FilterListComponent = Phaser.GameObjects.Components.FilterList.prototype;
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

  class OutlineFilterPlugin extends FilterPluginBase {
      constructor(pluginManager) {
          super(pluginManager);

          this.setFilterClass(OutlineFilter, OutlineController);

          this.setFilterListMethod(
              'addRexOutline',
              function (config) {
                  return this.add(new OutlineController(this.camera, config));
              }
          );
      }
  }

  SetValue(window, 'RexPlugins.Filters.OutlineFilter', OutlineFilter);
  SetValue(window, 'RexPlugins.Filters.OutlineController', OutlineController);

  return OutlineFilterPlugin;

}));

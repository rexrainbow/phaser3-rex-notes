(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexsplitfilterplugin = factory());
})(this, (function () { 'use strict';

  const FilterName = 'rexFilterSplit';

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
uniform vec2 split;
uniform vec4 spaceConfig;
uniform float angle;
uniform float shiftEnable;

vec2 rotate(vec2 uv, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return vec2(
    uv.x * c + uv.y * s,
    uv.y * c - uv.x * s
  );
}

#pragma phaserTemplate(fragmentHeader)

void main (void) {
  float spaceLeft = spaceConfig.x;
  float spaceRight = spaceConfig.y;
  float spaceTop = spaceConfig.z;
  float spaceBottom = spaceConfig.w;

  vec2 tc = outTexCoord * texSize;  
  tc -= split;
  tc = rotate(tc, -angle);

  if (
    ((tc.x > -spaceLeft) && (tc.x < spaceRight)) ||
    ((tc.y > -spaceTop) && (tc.y < spaceBottom))
  ) {
    gl_FragColor = vec4(0,0,0,0);
  } else {
    if (shiftEnable > 0.0) {
      tc.x += (tc.x < 0.0)? spaceLeft: -spaceRight;
      tc.y += (tc.y < 0.0)? spaceTop: -spaceBottom;
    }

    tc = rotate(tc, angle);
    tc += split;
    gl_FragColor = texture2D(uMainSampler, tc / texSize);
  }

}
`;

  class SplitFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
      static FilterName = FilterName;

      constructor(manager) {
          super(FilterName, manager, null, frag);
      }

      // This method sets up the uniforms for the shader.
      setupUniforms(controller, drawingContext) {
          const programManager = this.programManager;

          programManager.setUniform('split', [controller.splitX, (drawingContext.height - controller.splitY)]);
          programManager.setUniform('angle', controller.rotation);
          programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);

          programManager.setUniform('spaceConfig', [controller.spaceLeft, controller.spaceRight, controller.spaceTop, controller.spaceBottom]);

          programManager.setUniform('shiftEnable', (controller.shiftEnable) ? 1 : 0);
      }

  }

  const GetValue = Phaser.Utils.Objects.GetValue;
  const DegToRad = Phaser.Math.DegToRad;
  const RadToDeg = Phaser.Math.RadToDeg;

  class SplitController extends Phaser.Filters.Controller {
      static FilterName = FilterName;

      constructor(camera, config) {
          super(camera, FilterName);

          this.splitX = 0;
          this.splitY = 0;
          this.spaceLeft = 0;
          this.spaceRight = 0;
          this.spaceTop = 0;
          this.spaceBottom = 0;
          this.rotation = 0;
          this.shiftEnable = true;

          this.resetFromJSON(config);
      }

      resetFromJSON(o) {
          var splittedWidth = GetValue(o, 'width', undefined);
          if (splittedWidth === undefined) {
              this.spaceLeft = GetValue(o, 'left', 0);
              this.spaceRight = GetValue(o, 'right', 0);
          } else {
              this.splittedWidth = splittedWidth;
          }

          var splittedHeight = GetValue(o, 'height', undefined);
          if (splittedHeight === undefined) {
              this.spaceTop = GetValue(o, 'top', 0);
              this.spaceBottom = GetValue(o, 'bottom', 0);
          } else {
              this.splittedHeight = splittedHeight;
          }

          this.splitX = GetValue(o, 'x', this.camera.centerX);
          this.splitY = GetValue(o, 'Y', this.camera.centerY);

          var rotation = GetValue(o, 'rotation', undefined);
          if (rotation === undefined) {
              this.setAngle(GetValue(o, 'angle', 0));
          } else {
              this.setRotation(rotation);
          }

          this.shiftEnable = GetValue(o, 'shiftEnable', true);
          return this;
      }

      // split
      setSplit(x, y) {
          if (x === undefined) {
              x = 0;
          }
          if (y === undefined) {
              y = 0;
          }

          this.splitX = x;
          this.splitY = y;
          return this;
      }

      splitAtCenter(width, height) {
          this.setSplit(this.camera.centerX, this.camera.centerY);
          if (width !== undefined) {
              this.setSplittedWidth(width);
          }
          if (height !== undefined) {
              this.setSplittedHeight(height);
          }
          return this;
      }

      // rotation
      setRotation(value) {
          this.rotation = value;
          return this;
      }

      get angle() {
          return RadToDeg(this.rotation);
      }

      set angle(value) {
          this.rotation = DegToRad(value);
      }

      setAngle(value) {
          this.angle = value;
          return this;
      }

      // space
      setSpace(left, right, top, bottom) {
          if (left === undefined) {
              left = 0;
          }
          if (right === undefined) {
              right = 0;
          }
          if (top === undefined) {
              top = 0;
          }
          if (bottom === undefined) {
              bottom = 0;
          }
          this.spaceLeft = left;
          this.spaceRight = right;
          this.spaceTop = top;
          this.spaceBottom = bottom;
          return this;
      }

      get splittedWidth() {
          return this.spaceLeft + this.spaceRight;
      }

      set splittedWidth(value) {
          this.spaceLeft = value / 2;
          this.spaceRight = this.spaceLeft;
      }

      setSplittedWidth(width) {
          if (width === undefined) {
              width = 0;
          }
          this.splittedWidth = width;
          return this;
      }

      get splittedHeight() {
          return this.spaceTop + this.spaceBottom;
      }

      set splittedHeight(value) {
          this.spaceTop = value / 2;
          this.spaceBottom = this.spaceTop;
      }

      setSplittedHeight(height) {
          if (height === undefined) {
              height = 0;
          }
          this.splittedHeight = height;
          return this;
      }

      // shiftEnable
      setShiftEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.shiftEnable = enable;
          return true;
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

  class SplitFilterPlugin extends FilterPluginBase {
      constructor(pluginManager) {
          super(pluginManager);

          this.setFilterClass(SplitFilter, SplitController);

          this.setFilterListMethod(
              'addRexSplit',
              function (config) {
                  return this.add(new SplitController(this.camera, config));
              }
          );
      }
  }

  SetValue(window, 'RexPlugins.Filters.SplitFilter', SplitFilter);
  SetValue(window, 'RexPlugins.Filters.SplitController', SplitController);

  return SplitFilterPlugin;

}));

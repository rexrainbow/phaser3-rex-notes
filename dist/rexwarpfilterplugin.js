(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwarpfilterplugin = factory());
})(this, (function () { 'use strict';

  const FilterName = 'rexFilterWarp';

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
uniform vec2 amplitude;
uniform vec2 frequency;
uniform vec2 speed;
uniform float time;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
  vec2 dxy = frequency/texSize;
  vec2 r = amplitude/texSize;
  vec2 spd = speed/texSize;
  vec2 angle = (outTexCoord / dxy) + (spd*time);
  vec2 tc = (vec2(cos(angle.x),sin(angle.y)) * r) + outTexCoord;
  gl_FragColor = texture2D(uMainSampler, tc);
}
`;

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

  var GetTickDelta = function (game) {
      return GetGame(game).loop.delta;
  };

  const MaxPeriod = 60 * 60 * 1000;

  var GetCurrentTime = function (scene, prevTime) {
      var tickDelta = GetTickDelta(scene);
      var currentTime = prevTime + tickDelta;
      if (currentTime >= MaxPeriod) {
          currentTime -= MaxPeriod;
      }

      return currentTime;
  };

  class WarpFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
      static FilterName = FilterName;

      constructor(manager) {
          super(FilterName, manager, null, frag);
      }

      // This method sets up the uniforms for the shader.
      setupUniforms(controller, drawingContext) {
          const programManager = this.programManager;

          if (controller.speedEnable) {
              controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
          }

          programManager.setUniform('frequency', [controller.frequencyX, controller.frequencyY]);
          programManager.setUniform('amplitude', [controller.amplitudeX, controller.amplitudeY]);

          programManager.setUniform('speed', [controller.speed.x, controller.speed.y]);
          programManager.setUniform('time', controller.now);

          programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
      }

  }

  const Vector2 = Phaser.Math.Vector2;
  const GetValue = Phaser.Utils.Objects.GetValue;

  class WarpController extends Phaser.Filters.Controller {
      static FilterName = FilterName;

      constructor(camera, config) {
          super(camera, FilterName);

          this.frequencyX = 10;
          this.frequencyY = 10;

          this.amplitudeX = 10;
          this.amplitudeY = 10;

          this.speedEnable = false;
          this.now = 0;
          this.speed = new Vector2(0, 0);

          this.resetFromJSON(config);
      }

      resetFromJSON(o) {
          var frequency = GetValue(o, 'frequency', 10);
          this.setFrequency(GetValue(o, 'frequencyX', frequency), GetValue(o, 'frequencyY', frequency));

          var amplitude = GetValue(o, 'amplitude', 10);
          this.setAmplitude(GetValue(o, 'amplitudeX', amplitude), GetValue(o, 'amplitudeY', amplitude));

          var speed = GetValue(o, 'speed', 0);
          this.setSpeed(GetValue(o, 'speedX', speed), GetValue(o, 'speedY', speed));

          this.setSpeedEnable(GetValue(o, 'speedEnable', (this.speedX !== 0) || (this.speedY !== 0)));

          return this;
      }

      // frequencyX
      setFrequencyX(value) {
          this.frequencyX = value;
          return this;
      }

      // frequencyY
      setFrequencyY(value) {
          this.frequencyY = value;
          return this;
      }

      setFrequency(width, height) {
          if (height === undefined) {
              height = width;
          }
          this.frequencyX = width;
          this.frequencyY = height;
          return this;
      }

      get frequency() {
          return (this.frequencyX + this.frequencyY) / 2;
      }

      set frequency(value) {
          this.frequencyX = value;
          this.frequencyY = value;
      }

      // amplitudeX
      setAmplitudeX(value) {
          this.amplitudeX = value;
          return this;
      }

      // amplitudeY
      setAmplitudeY(value) {
          this.amplitudeY = value;
          return this;
      }

      setAmplitude(x, y) {
          if (y === undefined) {
              y = x;
          }
          this.amplitudeX = x;
          this.amplitudeY = y;
          return this;
      }

      get amplitude() {
          return (this.amplitudeX + this.amplitudeY) / 2;
      }

      set amplitude(value) {
          this.amplitudeX = value;
          this.amplitudeY = value;
      }

      // speed
      setSpeedX(value) {
          this.speedX = value;
          return this;
      }
      setSpeedY(value) {
          this.speed.y = value;
          return this;
      }
      get speedX() {
          return this.speed.x;
      }
      set speedX(value) {
          this.speed.x = value;
      }
      get speedY() {
          return this.speed.y;
      }
      set speedY(value) {
          this.speed.y = value;
      }

      setSpeed(x, y) {
          if (y === undefined) {
              y = x;
          }
          this.speedX = x;
          this.speedY = y;
          return this;
      }

      // Speed enable
      setSpeedEnable(enable) {
          if (enable === undefined) {
              enable = true;
          }
          this.speedEnable = enable;
          return this;
      }

  }

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

  class WarpFilterPlugin extends FilterPluginBase {
      constructor(pluginManager) {
          super(pluginManager);

          this.setFilterClass(WarpFilter, WarpController);

          this.setFilterListMethod(
              'addRexWarp',
              function (config) {
                  return this.add(new WarpController(this.camera, config));
              }
          );
      }
  }

  SetValue(window, 'RexPlugins.Filters.WarpFilter', WarpFilter);
  SetValue(window, 'RexPlugins.Filters.WarpController', WarpController);

  return WarpFilterPlugin;

}));

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwarppipelineplugin = factory());
})(this, (function () { 'use strict';

  // reference : https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/

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
uniform vec2 amplitude;
uniform vec2 frequency;
uniform vec2 speed;
uniform float time;


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

  const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  const Vector2 = Phaser.Math.Vector2;
  const GetValue = Phaser.Utils.Objects.GetValue;


  class WarpPostFxPipeline extends PostFXPipeline {
      constructor(game) {
          super({
              name: 'rexWarpPostFx',
              game: game,
              renderTarget: true,
              fragShader: frag
          });

          this.frequencyX = 10;
          this.frequencyY = 10;

          this.amplitudeX = 10;
          this.amplitudeY = 10;

          this.speedEnable = false;
          this.now = 0;
          this.speed = new Vector2(0, 0);

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

      onPreRender() {
          if (this.speedEnable) {
              this.now += GetTickDelta(this.game);
          }

          this.set2f('frequency', this.frequencyX, this.frequencyY);
          this.set2f('amplitude', this.amplitudeX, this.amplitudeY);

          this.set2f('speed', this.speed.x, this.speed.y);
          this.set1f('time', this.now);

          this.set2f('texSize', this.renderer.width, this.renderer.height);
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

  var RegisterPostPipeline = function (game, postFxPipelineName, PostFxPipelineClass) {
      GetGame(game).renderer.pipelines.addPostPipeline(postFxPipelineName, PostFxPipelineClass);
  };

  var AddPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, config) {
      if (config === undefined) {
          config = {};
      }

      gameObject.setPostPipeline(PostFxPipelineClass);
      var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
      pipeline.resetFromJSON(config);

      if (config.name) {
          pipeline.name = config.name;
      }

      return pipeline;
  };

  const SpliceOne = Phaser.Utils.Array.SpliceOne;

  var RemovePostFxPipelineInstance = function (gameObject, PostFxPipelineClass, name) {
      if (name === undefined) {
          var pipelines = gameObject.postPipelines;
          for (var i = (pipelines.length - 1); i >= 0; i--) {
              var instance = pipelines[i];
              if (instance instanceof PostFxPipelineClass) {
                  instance.destroy();
                  SpliceOne(pipelines, i);
              }
          }
      } else {
          var pipelines = gameObject.postPipelines;
          for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
              var instance = pipelines[i];
              if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
                  instance.destroy();
                  SpliceOne(pipelines, i);
              }
          }
      }

      gameObject.hasPostPipeline = (gameObject.postPipelines.length > 0);

  };

  var GetPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, name) {    
      if (name === undefined) {
          var result = [];
          var pipelines = gameObject.postPipelines;
          for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
              var instance = pipelines[i];
              if (instance instanceof PostFxPipelineClass) {
                  result.push(instance);
              }
          }
          return result;
      } else {
          var pipelines = gameObject.postPipelines;
          for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
              var instance = pipelines[i];
              if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
                  return instance;
              }
          }
      }
  };

  class BasePostFxPipelinePlugin extends Phaser.Plugins.BasePlugin {
      setPostPipelineClass(PostFxPipelineClass, postFxPipelineName) {
          this.PostFxPipelineClass = PostFxPipelineClass;
          this.postFxPipelineName = postFxPipelineName;
          return this;
      }

      start() {
          var eventEmitter = this.game.events;
          eventEmitter.once('destroy', this.destroy, this);

          RegisterPostPipeline(this.game, this.postFxPipelineName, this.PostFxPipelineClass);
      }

      add(gameObject, config) {
          return AddPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, config);
      }

      remove(gameObject, name) {
          RemovePostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
          return this;
      }

      get(gameObject, name) {
          return GetPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
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

  class WarpPipelinePlugin extends BasePostFxPipelinePlugin {
      constructor(pluginManager) {
          super(pluginManager);
          this.setPostPipelineClass(WarpPostFxPipeline, 'rexWarpPostFx');
      }
  }

  SetValue(window, 'RexPlugins.Pipelines.WarpPostFx', WarpPostFxPipeline);

  return WarpPipelinePlugin;

}));

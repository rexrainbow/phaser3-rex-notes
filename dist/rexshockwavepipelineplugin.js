(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexshockwavepipelineplugin = factory());
})(this, (function () { 'use strict';

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
uniform vec2 center;
uniform float waveRadius;
uniform float waveHalfWidth; // 10.0
uniform float powBaseScale; // 0.8
uniform float powExponent; // 0.1

void main (void) {
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

  const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  const GetValue = Phaser.Utils.Objects.GetValue;
  Phaser.Math.Clamp;

  class ShockwavePostFxPipeline extends PostFXPipeline {
      constructor(game) {
          super({
              name: 'rexShockwavePostFx',
              game: game,
              renderTarget: true,
              fragShader: frag
          });

          this.centerX = 0; // position wo resolution
          this.centerY = 0; // position wo resolution
          this.waveWidth = 20;
          this.powBaseScale = 0.8;
          this.powExponent = 0.1;
      }

      resetFromJSON(o) {
          this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
          this.setWaveRadius(GetValue(o, 'waveRadius', 0));
          this.setWaveWidth(GetValue(o, 'waveWidth', 20));
          this.setPowBaseScale(GetValue(o, 'powBaseScale', 0.8));
          this.setPowExponent(GetValue(o, 'powExponent', 0.1));        
          return this;
      }

      onPreRender() {
          this.set1f('waveRadius', this.waveRadius);
          this.set1f('waveHalfWidth', this.waveWidth / 2);
          this.set1f('powBaseScale', this.powBaseScale);
          this.set1f('powExponent', this.powExponent);

          var texWidth = this.renderer.width,
              textHeight = this.renderer.height;
          this.set2f('center', this.centerX, (textHeight - this.centerY));
          this.set2f('texSize', texWidth, textHeight);
      }

      // center
      setCenter(x, y) {
          if (x === undefined) {
              x = this.renderer.width / 2;
              y = this.renderer.height / 2;
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

  class ShockwavePipelinePlugin extends BasePostFxPipelinePlugin {
      constructor(pluginManager) {
          super(pluginManager);
          this.setPostPipelineClass(ShockwavePostFxPipeline, 'rexShockwavePostFx');
      }
  }

  SetValue(window, 'RexPlugins.Pipelines.ShockwavePostFx', ShockwavePostFxPipeline);

  return ShockwavePipelinePlugin;

}));

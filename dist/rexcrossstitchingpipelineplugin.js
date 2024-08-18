(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcrossstitchingpipelineplugin = factory());
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

  const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  const GetValue = Phaser.Utils.Objects.GetValue;
  const Clamp = Phaser.Math.Clamp;

  class CrossStitchingPostFxPipeline extends PostFXPipeline {
      constructor(game) {
          super({
              name: 'rexCrossStitchingPostFx',
              game: game,
              renderTarget: true,
              fragShader: frag
          });

          this.stitchingWidth = 6; // width of stitching wo resolution
          this.stitchingHeight = 6; // height of stitching wo resolution
          this._brightness = 0;
      }

      resetFromJSON(o) {
          this.setStitchingSize(GetValue(o, 'stitchingWidth', 6), GetValue(o, 'stitchingHeight', 6));
          this.setBrightness(GetValue(o, 'brightness', 0));
          return this;
      }

      onPreRender() {
          this.set2f('stitchingSize', this.stitchingWidth, this.stitchingHeight);
          this.set2f('texSize', this.renderer.width, this.renderer.height);
          this.set1f('brightness', this._brightness);
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

  class CrossStitchingPipelinePlugin extends BasePostFxPipelinePlugin {
      constructor(pluginManager) {
          super(pluginManager);
          this.setPostPipelineClass(CrossStitchingPostFxPipeline, 'rexCrossStitchingPostFx');
      }
  }

  SetValue(window, 'RexPlugins.Pipelines.CrossStitchingPostFx', CrossStitchingPostFxPipeline);

  return CrossStitchingPipelinePlugin;

}));

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexglowfilter2pipelineplugin = factory());
})(this, (function () { 'use strict';

  // Reference: https://github.com/pixijs/filters/blob/main/filters/glow/src/glow.frag

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
uniform float outerStrength;
uniform float innerStrength;
uniform vec4 glowColor; // (0, 0, 0);
uniform float knockout;

// const
const float PI = 3.14159265358979323846264;

const float DIST = __DIST__;
const float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);
const float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);

const float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;


void main(void) {
  vec2 px = vec2(1./texSize.x, 1./texSize.y);

  float totalAlpha = 0.0;

  vec2 direction;
  vec2 offset;
  vec4 curColor;

  for (float angle = 0.; angle < PI * 2.; angle += ANGLE_STEP_SIZE) {
     direction = vec2(cos(angle), sin(angle)) * px;

     for (float curDistance = 0.0; curDistance < DIST; curDistance++) {
         offset = direction * (curDistance + 1.0);
         curColor = texture2D(uMainSampler, outTexCoord + offset);
         totalAlpha += (DIST - curDistance) * curColor.a;
     }
  }
  
  curColor = texture2D(uMainSampler, outTexCoord);

  float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);

  float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;
  float innerGlowStrength = min(1.0, innerGlowAlpha);
  
  vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);

  float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);
  float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);

  vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;
  
  if (knockout > 0.) {
    float resultAlpha = outerGlowAlpha + innerGlowAlpha;
    gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);
  }
  else {
    gl_FragColor = innerColor + outerGlowColor;
  }
}
`;

  const GetValue$2 = Phaser.Utils.Objects.GetValue;
  var GetFrag = function (config) {
      var quality = GetValue$2(config, 'quality', 0, 1);
      var distance = GetValue$2(config, 'distance', 10);
      return frag
          .replace(/__ANGLE_STEP_SIZE__/gi, `${(1 / quality / distance).toFixed(7)}`)
          .replace(/__DIST__/gi, `${Math.round(distance).toFixed(0)}.0`);
  };

  const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  const GetValue$1 = Phaser.Utils.Objects.GetValue;
  const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
  const Color = Phaser.Display.Color;

  var Quality = 0.1;
  var Distance = 10;
  var FragSrc = GetFrag({ quality: Quality, distance: Distance });
  class GlowFilterPostFxPipeline extends PostFXPipeline {
      constructor(game) {
          super({
              name: 'rexGlowFilterPostFx',
              game: game,
              renderTarget: true,
              fragShader: FragSrc
          });

          this.outerStrength = 0;
          this.innerStrength = 0;
          this._glowColor = new Color();
          this.knockout = false;
      }

      resetFromJSON(o) {
          this.setOuterStrength(GetValue$1(o, 'outerStrength', 4));
          this.setInnerStrength(GetValue$1(o, 'innerStrength', 0));
          this.setGlowColor(GetValue$1(o, 'glowColor', 0xffffff));
          this.setKnockout(GetValue$1(o, 'knockout', false));
          return this;
      }

      onPreRender() {
          this.set1f('outerStrength', this.outerStrength);
          this.set1f('innerStrength', this.innerStrength);

          var color = this._glowColor;
          this.set4f('glowColor', color.redGL, color.greenGL, color.blueGL, color.alphaGL);

          this.set1f('knockout', (this.knockout) ? 1 : 0);

          this.set2f('texSize', this.renderer.width, this.renderer.height);
      }

      // outerStrength
      setOuterStrength(value) {
          this.outerStrength = value;
          return this;
      }

      // innerStrength
      setInnerStrength(value) {
          this.innerStrength = value;
          return this;
      }

      // glowColor
      get glowColor() {
          return this._glowColor;
      }

      set glowColor(value) {
          if (typeof (value) === 'number') {
              value = IntegerToRGB(value);
          }
          this._glowColor.setFromRGB(value);
      }

      setGlowColor(value) {
          this.glowColor = value;
          return this;
      }

      // knockout
      setKnockout(value) {
          this.knockout = value;
          return this;
      }

      static setQuality(value) {
          if (Quality === value) {
              return;
          }
          Quality = value;
          FragSrc = GetFrag({ quality: Quality, distance: Distance });
      }

      static getQuality() {
          return Quality;
      }

      static setDistance(value) {
          if (Distance === value) {
              return;
          }
          Distance = value;
          FragSrc = GetFrag({ quality: Quality, distance: Distance });
      }

      static getDistance() {
          return Distance;
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

  const GetValue = Phaser.Utils.Objects.GetValue;

  class GlowFilterPipelinePlugin extends BasePostFxPipelinePlugin {
      constructor(pluginManager) {
          super(pluginManager);
          this.setPostPipelineClass(GlowFilterPostFxPipeline, 'rexGlowFilter2PostFx');
      }

      add(gameObject, config) {
          this.setQuality(GetValue(config, 'quality', this.quality));
          this.setDistance(GetValue(config, 'distance', this.distance));
          return super.add(gameObject, config);
      }

      setQuality(value) {
          GlowFilterPostFxPipeline.setQuality(value);
          return this;
      }

      set quality(value) {
          this.setQuality(value);
      }

      get quality() {
          return GlowFilterPostFxPipeline.getQuality();
      }

      setDistance(value) {
          GlowFilterPostFxPipeline.setDistance(value);
          return this;
      }

      set distance(value) {
          this.setDistance(value);
      }

      get distance() {
          return GlowFilterPostFxPipeline.getDistance();
      }
  }

  SetValue(window, 'RexPlugins.Pipelines.GlowFilter2PostFx', GlowFilterPostFxPipeline);

  return GlowFilterPipelinePlugin;

}));

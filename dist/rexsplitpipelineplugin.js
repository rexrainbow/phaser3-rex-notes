(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexsplitpipelineplugin = factory());
})(this, (function () { 'use strict';

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
uniform vec2 split;
uniform float spaceLeft;
uniform float spaceRight;
uniform float spaceTop;
uniform float spaceBottom;
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

void main (void) {
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

  const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  const GetValue = Phaser.Utils.Objects.GetValue;
  const DegToRad = Phaser.Math.DegToRad;
  const RadToDeg = Phaser.Math.RadToDeg;

  class SplitPostFxPipeline extends PostFXPipeline {
      constructor(game) {
          super({
              name: 'rexSplitPostFx',
              game: game,
              renderTarget: true,
              fragShader: frag
          });

          this.splitX = 0;
          this.splitY = 0;
          this.spaceLeft = 0;
          this.spaceRight = 0;
          this.spaceTop = 0;
          this.spaceBottom = 0;
          this.rotation = 0;
          this.shiftEnable = true;
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

          this.splitX = GetValue(o, 'x', this.renderer.width / 2);
          this.splitY = GetValue(o, 'Y', this.renderer.height / 2);

          var rotation = GetValue(o, 'rotation', undefined);
          if (rotation === undefined) {
              this.setAngle(GetValue(o, 'angle', 0));
          } else {
              this.setRotation(rotation);
          }

          this.shiftEnable = GetValue(o, 'shiftEnable', true);
          return this;
      }

      onPreRender() {
          var texWidth = this.renderer.width,
              textHeight = this.renderer.height;
          this.set2f('split', this.splitX, (textHeight - this.splitY));
          this.set1f('angle', this.rotation);
          this.set2f('texSize', texWidth, textHeight);

          this.set1f('spaceLeft', this.spaceLeft);
          this.set1f('spaceRight', this.spaceRight);
          this.set1f('spaceTop', this.spaceTop);
          this.set1f('spaceBottom', this.spaceBottom);

          this.set1f('shiftEnable', (this.shiftEnable) ? 1 : 0);
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
          this.setSplit(this.renderer.width / 2, this.renderer.height / 2);
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

  class SplitPipelinePlugin extends BasePostFxPipelinePlugin {
      constructor(pluginManager) {
          super(pluginManager);
          this.setPostPipelineClass(SplitPostFxPipeline, 'rexSplitPostFx');
      }
  }

  SetValue(window, 'RexPlugins.Pipelines.SplitPostFx', SplitPostFxPipeline);

  return SplitPipelinePlugin;

}));

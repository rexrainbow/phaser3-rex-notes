(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexkawaseblurpipelineplugin = factory());
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
uniform vec2 uOffset;

void main (void) {
  vec4 color = vec4(0.0);

  // Sample top left pixel
  color += texture2D(uMainSampler, vec2(outTexCoord.x - uOffset.x, outTexCoord.y + uOffset.y));

  // Sample top right pixel
  color += texture2D(uMainSampler, vec2(outTexCoord.x + uOffset.x, outTexCoord.y + uOffset.y));

  // Sample bottom right pixel
  color += texture2D(uMainSampler, vec2(outTexCoord.x + uOffset.x, outTexCoord.y - uOffset.y));

  // Sample bottom left pixel
  color += texture2D(uMainSampler, vec2(outTexCoord.x - uOffset.x, outTexCoord.y - uOffset.y));

  // Average
  color *= 0.25;

  gl_FragColor = color;
}
`;

  var GenerateKernels = function (blur, quality, out) {
      if (out === undefined) {
          out = [];
      }

      out.length = quality;
      for (var i = quality; i > 0; i--) {
          out[i] = blur * (i / quality);
      }
      return out;
  };

  class Drawer {
      constructor(postFXPipeline) {
          this.postFXPipeline = postFXPipeline;
          this.shader = undefined;
      }

      setShader(shader) {
          this.shader = shader;
          return this;
      }

      getAnotherFrame(frame) {
          var self = this.postFXPipeline;
          var frame1 = self.fullFrame1,
              frame2 = self.fullFrame2;
          return (frame === frame1) ? frame2 : frame1;
      }

      init(renderTarget, startFrame) {
          var self = this.postFXPipeline;
          if (startFrame === undefined) {
              startFrame = self.fullFrame1;
          }

          self.copyFrame(renderTarget, startFrame);
          return startFrame;
      }

      // Override
      draw(startFrame, returnLastFrame) {
          // var self = this.postFXPipeline;
          // var shader = this.shader;

          // var sourceFrame = startFrame;
          // var targetFrame = this.getAnotherFrame(sourceFrame);
          // var returnFrame;

          // ...

          // return returnFrame;
      }


  }

  class KawaseBlurDrawer extends Drawer {
      draw(startFrame, returnLastFrame) {
          var self = this.postFXPipeline;
          var shader = this.shader;

          var sourceFrame = startFrame;
          var targetFrame = this.getAnotherFrame(sourceFrame);
          var returnFrame;

          var uvX = self.pixelWidth / self.renderer.width;
          var uvY = self.pixelHeight / self.renderer.height;
          var offset, uOffsetX, uOffsetY;
          for (var i = 0, last = self._quality - 1; i <= last; i++) {
              // Set uniforms
              offset = self._kernels[i] + 0.5;
              uOffsetX = offset * uvX;
              uOffsetY = offset * uvY;
              self.set2f('uOffset', uOffsetX, uOffsetY, shader);
              // Bind and draw
              if (i < last) {
                  self.bindAndDraw(sourceFrame, targetFrame, true, true, shader);
                  sourceFrame = targetFrame;
                  targetFrame = this.getAnotherFrame(sourceFrame);
              } else { // Last step
                  if (returnLastFrame) {
                      self.bindAndDraw(sourceFrame, targetFrame, true, true, shader);
                      returnFrame = targetFrame;
                  } else {
                      self.bindAndDraw(sourceFrame, null, true, true, shader);
                  }
              }
          }

          return returnFrame;
      }
  }

  const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  const GetValue = Phaser.Utils.Objects.GetValue;

  class KawaseBlurFilterPostFxPipeline extends PostFXPipeline {
      constructor(game) {
          super({
              name: 'rexKawaseBlurFilterPostFx',
              game: game,
              renderTarget: true,
              fragShader: frag
          });

          this.drawer = new KawaseBlurDrawer(this);
          this._kernels = [0];
          this._blur = 0;
          this._quality = 1;
          this.pixelWidth = 1; // width of pixel wo resolution
          this.pixelHeight = 1; // height of pixel wo resolution
      }

      resetFromJSON(o) {
          var blur = GetValue(o, 'blur', 4);
          if (typeof(blur) === 'number') {
              this.setBlur(blur);
              this.setQuality(GetValue(o, 'quality', 3));
          } else {
              this.setKernela(blur);
          }

          this.setPixelSize(GetValue(o, 'pixelWidth', 1), GetValue(o, 'pixelHeight', 1));
          return this;
      }

      onPreRender() {
      }

      onDraw(renderTarget) {
          this.drawer.draw(this.drawer.init(renderTarget));
      }

      // blur
      get blur() {
          return this._blur;
      }

      set blur(value) {
          if (this._blur === value) {
              return;
          }

          this._blur = value;
          GenerateKernels(this._blur, this._quality, this._kernels);
      }

      setBlur(value) {
          this.blur = value;
          return this;
      }

      // quality
      get quality() {
          return this._quality;
      }

      set quality(value) {
          if (this._quality === value) {
              return;
          }

          this._quality = value;
          GenerateKernels(this._blur, this._quality, this._kernels);
      }

      setQuality(value) {
          this.quality = value;
          return this;
      }

      // kernels
      get kernels() {
          return this._kernels;
      }

      set kernels(value) {
          if (value === undefined) {
              value = [0];
          }

          this._kernels = value;
          this._quality = value.length;
          this._blur = Math.max(...value);
      }

      setKernela(value) {
          this.kernels = value;
          return this;
      }

      // pixelWidth
      setPixelWidth(value) {
          this.pixelWidth = value;
          return this;
      }

      // pixelHeight
      setPixelHeight(value) {
          this.pixelHeight = value;
          return this;
      }

      setPixelSize(width, height) {
          if (height === undefined) {
              height = width;
          }
          this.pixelWidth = width;
          this.pixelHeight = height;
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

  Phaser.Utils.Objects.GetValue;

  class KawaseBlurFilterPipelinePlugin extends BasePostFxPipelinePlugin {
      constructor(pluginManager) {
          super(pluginManager);
          this.setPostPipelineClass(KawaseBlurFilterPostFxPipeline, 'rexKawaseBlurFilterPostFx');
      }
  }

  SetValue(window, 'RexPlugins.Pipelines.KawaseBlurFilterPostFx', KawaseBlurFilterPostFxPipeline);

  return KawaseBlurFilterPipelinePlugin;

}));

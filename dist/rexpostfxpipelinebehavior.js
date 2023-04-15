(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexpostfxpipelinebehavior = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var RemoveIte = Phaser.Utils.Array.Remove;
  var PostFxPipelineBehaviorBase = /*#__PURE__*/function () {
    function PostFxPipelineBehaviorBase(gameObject, config) {
      _classCallCheck(this, PostFxPipelineBehaviorBase);
      this.gameObject = gameObject;
      this.scene = gameObject.scene;

      // Can inject PipelineClass at runtime
      var PipelineClass;
      if (IsPostFxPipelineClass(config)) {
        PipelineClass = config;
        config = undefined;
      } else {
        PipelineClass = GetValue(config, 'PipelineClass');
      }
      if (PipelineClass) {
        this.createPipeline = function (game) {
          return new PipelineClass(game);
        };
      }
      var enable = GetValue(config, 'enable', !!config);
      if (enable) {
        this.getPipeline(config);
      }

      // Will destroy pipeline when gameObject destroying
    }
    _createClass(PostFxPipelineBehaviorBase, [{
      key: "getPipeline",
      value: function getPipeline(config) {
        if (!this.pipeline) {
          var pipeline = this.createPipeline(this.scene.game);
          var gameObject = this.gameObject;
          var postPipelines = gameObject.postPipelines;
          pipeline.gameObject = gameObject;
          postPipelines.push(pipeline);
          gameObject.hasPostPipeline = postPipelines.length > 0;
          this.pipeline = pipeline;
        }
        if (config && this.pipeline.resetFromJSON) {
          this.pipeline.resetFromJSON(config);
        }
        return this.pipeline;
      }
    }, {
      key: "freePipeline",
      value: function freePipeline() {
        if (!this.pipeline) {
          return this;
        }
        var gameObject = this.gameObject;
        var postPipelines = gameObject.postPipelines;
        RemoveIte(postPipelines, this.pipeline);
        gameObject.hasPostPipeline = postPipelines.length > 0;
        this.pipeline.destroy();
        this.pipeline = undefined;
        return this;
      }

      // Override
    }, {
      key: "createPipeline",
      value: function createPipeline(game) {}
    }]);
    return PostFxPipelineBehaviorBase;
  }();
  var IsPostFxPipelineClass = function IsPostFxPipelineClass(object) {
    return object && object.prototype && object.prototype instanceof PostFXPipeline;
  };

  return PostFxPipelineBehaviorBase;

}));

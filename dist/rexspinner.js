(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexspinner = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2020 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */
  var TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
  var tempMatrix1 = new TransformMatrix();
  var tempMatrix2 = new TransformMatrix();
  var tempMatrix3 = new TransformMatrix();
  var result = {
    camera: tempMatrix1,
    sprite: tempMatrix2,
    calc: tempMatrix3
  };
  /**
   * Calculates the Transform Matrix of the given Game Object and Camera, factoring in
   * the parent matrix if provided.
   *
   * Note that the object this results contains _references_ to the Transform Matrices,
   * not new instances of them. Therefore, you should use their values immediately, or
   * copy them to your own matrix, as they will be replaced as soon as another Game
   * Object is rendered.
   *
   * @function Phaser.GameObjects.GetCalcMatrix
   * @memberof Phaser.GameObjects
   * @since 3.50.0
   *
   * @param {Phaser.GameObjects.GameObject} src - The Game Object to calculate the transform matrix for.
   * @param {Phaser.Cameras.Scene2D.Camera} camera - The camera being used to render the Game Object.
   * @param {Phaser.GameObjects.Components.TransformMatrix} [parentMatrix] - The transform matrix of the parent container, if any.
   *
   * @return {Phaser.Types.GameObjects.GetCalcMatrixResults} The results object containing the updated transform matrices.
   */

  var GetCalcMatrix = function GetCalcMatrix(src, camera, parentMatrix) {
    var camMatrix = tempMatrix1;
    var spriteMatrix = tempMatrix2;
    var calcMatrix = tempMatrix3;
    spriteMatrix.applyITRS(src.x, src.y, src.rotation, src.scaleX, src.scaleY);
    camMatrix.copyFrom(camera.matrix);

    if (parentMatrix) {
      //  Multiply the camera by the parent matrix
      camMatrix.multiplyWithOffset(parentMatrix, -camera.scrollX * src.scrollFactorX, -camera.scrollY * src.scrollFactorY); //  Undo the camera scroll

      spriteMatrix.e = src.x;
      spriteMatrix.f = src.y;
    } else {
      spriteMatrix.e -= camera.scrollX * src.scrollFactorX;
      spriteMatrix.f -= camera.scrollY * src.scrollFactorY;
    } //  Multiply by the Sprite matrix, store result in calcMatrix


    camMatrix.multiply(spriteMatrix, calcMatrix);
    return result;
  };

  var WebGLRenderer = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    src.updateData();
    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var result = GetCalcMatrix(src, camera, parentMatrix);
    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);
    var dx = src._displayOriginX;
    var dy = src._displayOriginY;
    var alpha = camera.alpha * src.alpha;
    renderer.pipelines.preBatch(src);
    var shapes = src.geom;

    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
      shapes[i].webglRender(pipeline, calcMatrix, alpha, dx, dy);
    }

    renderer.pipelines.postBatch(src);
  };

  var SetTransform = Phaser.Renderer.Canvas.SetTransform;

  var CanvasRenderer = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    src.updateData();
    camera.addToRenderList(src);
    var ctx = renderer.currentContext;

    if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
      var dx = src._displayOriginX;
      var dy = src._displayOriginY;
      var shapes = src.geom;

      for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        shapes[i].canvasRender(ctx, dx, dy);
      } //  Restore the context saved in SetTransform


      ctx.restore();
    }
  };

  var Render = {
    renderWebGL: WebGLRenderer,
    renderCanvas: CanvasRenderer
  };

  var Clear = function Clear(obj) {
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
  };

  var Shape = Phaser.GameObjects.Shape;
  var RemoveItem = Phaser.Utils.Array.Remove;

  var BaseShapes = /*#__PURE__*/function (_Shape) {
    _inherits(BaseShapes, _Shape);

    var _super = _createSuper(BaseShapes);

    function BaseShapes(scene, x, y, width, height) {
      var _this;

      _classCallCheck(this, BaseShapes);

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      if (width === undefined) {
        width = 0;
      }

      if (height === undefined) {
        height = width;
      }

      _this = _super.call(this, scene, 'rexShapes', []);
      _this._width = -1;
      _this._height = -1;
      _this.dirty = true;
      _this.isSizeChanged = true;
      _this.shapes = {};

      _this.setPosition(x, y);

      _this.setSize(width, height);

      _this.updateDisplayOrigin();

      return _this;
    }

    _createClass(BaseShapes, [{
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.setSize(value, this._height);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.setSize(this._width, value);
      }
    }, {
      key: "setDirty",
      value: function setDirty(value) {
        if (value === undefined) {
          value = true;
        }

        this.dirty = value;
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.isSizeChanged = this.isSizeChanged || this._width !== width || this._height !== height;
        this.dirty = this.dirty || this.isSizeChanged;
        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
        var input = this.input;

        if (input && !input.customHitArea) {
          input.hitArea.width = width;
          input.hitArea.height = height;
        }

        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "setFillStyle",
      value: function setFillStyle(color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }

        this.dirty = this.dirty || this.fillColor !== color || this.fillAlpha !== alpha;
        this.fillColor = color;
        this.fillAlpha = alpha;
        return this;
      }
    }, {
      key: "setStrokeStyle",
      value: function setStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }

        this.dirty = this.dirty || this.lineWidth !== lineWidth || this.strokeColor !== color || this.strokeAlpha !== alpha;
        this.lineWidth = lineWidth;
        this.strokeColor = color;
        this.strokeAlpha = alpha;
        return this;
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {}
    }, {
      key: "updateData",
      value: function updateData() {
        if (!this.dirty) {
          return this;
        }

        this.updateShapes();
        var shapes = this.geom;

        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var shape = shapes[i];

          if (shape.dirty) {
            shape.updateData();
          }
        }

        this.dirty = false;
        this.isSizeChanged = false;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.geom.length = 0;
        Clear(this.shapes);
        return this;
      }
    }, {
      key: "getShape",
      value: function getShape(name) {
        return this.shapes[name];
      }
    }, {
      key: "getShapes",
      value: function getShapes() {
        return this.geom;
      }
    }, {
      key: "addShape",
      value: function addShape(shape) {
        this.geom.push(shape);
        var name = shape.name;

        if (name) {
          this.shapes[name] = shape;
        }

        this.dirty = true;
        return this;
      }
    }, {
      key: "deleteShape",
      value: function deleteShape(name) {
        var shape = this.getShape(name);

        if (shape) {
          delete this.shapes[name];
          RemoveItem(this.geom, shape);
        }

        return this;
      }
    }]);

    return BaseShapes;
  }(Shape);

  Object.assign(BaseShapes.prototype, Render);

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
      }

      this._privateEE = eventEmitter === true || eventEmitter === undefined;
      this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
      return this;
    },
    destroyEventEmitter: function destroyEventEmitter() {
      if (this._eventEmitter && this._privateEE) {
        this._eventEmitter.shutdown();
      }

      return this;
    },
    getEventEmitter: function getEventEmitter() {
      return this._eventEmitter;
    },
    on: function on() {
      if (this._eventEmitter) {
        this._eventEmitter.on.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    once: function once() {
      if (this._eventEmitter) {
        this._eventEmitter.once.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    off: function off() {
      if (this._eventEmitter) {
        this._eventEmitter.off.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    emit: function emit(event) {
      if (this._eventEmitter && event) {
        this._eventEmitter.emit.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    addListener: function addListener() {
      if (this._eventEmitter) {
        this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    removeListener: function removeListener() {
      if (this._eventEmitter) {
        this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    removeAllListeners: function removeAllListeners() {
      if (this._eventEmitter) {
        this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
      }

      return this;
    },
    listenerCount: function listenerCount() {
      if (this._eventEmitter) {
        return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
      }

      return 0;
    },
    listeners: function listeners() {
      if (this._eventEmitter) {
        return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
      }

      return [];
    },
    eventNames: function eventNames() {
      if (this._eventEmitter) {
        return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
      }

      return [];
    }
  };

  var SceneClass = Phaser.Scene;

  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetSceneObject = function GetSceneObject(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsSceneObject(object)) {
      // object = scene
      return object;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene;
    } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) {
      // parent = bob object
      return object.parent.scene;
    }
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$1(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

      if (this.parent && this.parent === this.scene) {
        // parent is a scene
        this.scene.events.once('shutdown', this.onSceneDestroy, this);
      } else if (this.parent && this.parent.once) {
        // bob object does not have event emitter
        this.parent.once('destroy', this.onParentDestroy, this);
      }
    }

    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // parent might not be shutdown yet


        if (this.parent && this.parent === this.scene) {
          // parent is a scene
          this.scene.events.off('shutdown', this.onSceneDestroy, this);
        } else if (this.parent && this.parent.once) {
          // bob object does not have event emitter
          this.parent.off('destroy', this.onParentDestroy, this);
        }

        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onSceneDestroy",
      value: function onSceneDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }]);

    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var TweenTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TweenTask, _ComponentBase);

    var _super = _createSuper(TweenTask);

    function TweenTask(parent, config) {
      _classCallCheck(this, TweenTask);

      if (config === undefined) {
        config = {};
      }
      /*
      eventEmitter:
      - false(default value): Use tween's event emitter.
      - true: Create a private event emitter.
      */


      if (!config.hasOwnProperty('eventEmitter')) {
        config.eventEmitter = false;
      }

      return _super.call(this, parent, config);
    }

    _createClass(TweenTask, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.stop();

        _get(_getPrototypeOf(TweenTask.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "start",
      value: function start(tweenConfig) {
        if (this.isRunning) {
          return this;
        }

        this.tween = this.scene.tweens.add(tweenConfig).on('complete', this.complete, this);

        if (this.getEventEmitter() === false) {
          this.setEventEmitter(this.tween);
        }

        return this;
      }
    }, {
      key: "restart",
      value: function restart(tweenConfig) {
        this.stop().start(tweenConfig);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (!this.tween) {
          return this;
        }

        if (this.getEventEmitter() === this.tween) {
          this.setEventEmitter(false);
        }

        this.tween.remove();
        this.tween = undefined;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (!this.tween) {
          return this;
        }

        this.tween.pause();
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        if (!this.tween) {
          return this;
        }

        this.tween.resume();
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.stop();

        if (this.getEventEmitter()) {
          this.emit('complete');
        }

        return this;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return !!this.tween;
      }
    }]);

    return TweenTask;
  }(ComponentBase);

  var Start = function Start(duration) {
    if (!this.tweenTask) {
      this.tweenTask = new TweenTask(this);
    }

    if (duration !== undefined) {
      this.duration = duration;
      this.tweenTask.stop(); // Will restart with new duration
    } // Won't restart if tweenTask is running


    if (this.tweenTask.isRunning) {
      return this;
    } // Start tweenTask


    this.setValue(0);
    this.tweenTask.start({
      targets: this,
      value: 1,
      ease: this.ease,
      // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: this.duration,
      repeat: -1,
      // -1: infinity
      yoyo: false
    });
    this.setDirty();
    return this;
  };

  var Stop = function Stop() {
    if (!this.tweenTask) {
      return this;
    }

    this.tweenTask.stop();
    this.setDirty();
    return this;
  };

  var Pause = function Pause() {
    if (!this.tweenTask) {
      return this;
    }

    this.tweenTask.pause();
    this.setDirty();
    return this;
  };

  var Resume = function Resume() {
    if (!this.tweenTask) {
      return this;
    }

    this.tweenTask.pause();
    this.setDirty();
    return this;
  };

  var TweenMethods = {
    start: Start,
    stop: Stop,
    pause: Pause,
    resume: Resume
  };

  var GetValue = Phaser.Utils.Objects.GetValue;

  var Base = /*#__PURE__*/function (_BaseShapes) {
    _inherits(Base, _BaseShapes);

    var _super = _createSuper(Base);

    function Base(scene, config) {
      var _this;

      _classCallCheck(this, Base);

      var x = GetValue(config, 'x', 0);
      var y = GetValue(config, 'y', 0);
      var width = GetValue(config, 'width', 64);
      var height = GetValue(config, 'height', 64);
      _this = _super.call(this, scene, x, y, width, height);

      _this.setDuration(GetValue(config, 'duration', 1000));

      _this.setEase(GetValue(config, 'ease', 'Linear'));

      var color = GetValue(config, 'color', 0xffffff);
      var start = GetValue(config, 'start', true);

      _this.buildShapes(config);

      _this.setColor(color);

      _this.setValue(0);

      if (start) {
        _this.start();
      }

      return _this;
    }

    _createClass(Base, [{
      key: "buildShapes",
      value: function buildShapes() {}
    }, {
      key: "centerX",
      get: function get() {
        return this.width / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.height / 2;
      }
    }, {
      key: "radius",
      get: function get() {
        return Math.min(this.centerX, this.centerY);
      }
    }, {
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._color !== value;
        this._color = value;
        this.setShapesColor(value);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
    }, {
      key: "setShapesColor",
      value: function setShapesColor(color) {}
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        value = Phaser.Math.Clamp(value, 0, 1);
        this.dirty = this.dirty || this._value != value;
        this._value = value;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        this.ease = ease;
        return this;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.tweenTask ? this.tweenTask.isRunning : false;
      }
    }]);

    return Base;
  }(BaseShapes);

  Object.assign(Base.prototype, TweenMethods);

  var FillStyle = function FillStyle(color, alpha) {
    if (color === undefined) {
      this.isFilled = false;
    } else {
      if (alpha === undefined) {
        alpha = 1;
      }

      this.isFilled = true;
      this.fillColor = color;
      this.fillAlpha = alpha;
    }

    return this;
  };

  var LineStyle = function LineStyle(lineWidth, color, alpha) {
    if (lineWidth === undefined || color === undefined) {
      this.isStroked = false;
    } else {
      if (alpha === undefined) {
        alpha = 1;
      }

      this.isStroked = true;
      this.lineWidth = lineWidth;
      this.strokeColor = color;
      this.strokeAlpha = alpha;
    }

    return this;
  };

  var StyleMethods = {
    fillStyle: FillStyle,
    lineStyle: LineStyle
  };

  var SetData = function SetData(key, value) {
    if (this.data === undefined) {
      this.data = {};
    }

    this.data[key] = value;
    return this;
  };

  var GetData = function GetData(key, defaultValue) {
    if (this.data === undefined) {
      this.data = {};
    }

    if (!this.data.hasOwnProperty(key)) {
      this.data[key] = defaultValue;
    }

    return this.data[key];
  };

  var DataMethods = {
    setData: SetData,
    getData: GetData
  };

  var BaseGeom = /*#__PURE__*/function () {
    function BaseGeom() {
      _classCallCheck(this, BaseGeom);

      this.name = undefined;
      this.dirty = true;
      this.data = undefined;
      this.isFilled = false;
      this.fillColor = undefined;
      this.fillAlpha = 1;
      this.isStroked = false;
      this.lineWidth = 1;
      this.strokeColor = undefined;
      this.strokeAlpha = 1;
    }

    _createClass(BaseGeom, [{
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.fillStyle();
        this.lineStyle();
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {}
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {}
    }, {
      key: "updateData",
      value: function updateData() {}
    }]);

    return BaseGeom;
  }();

  Object.assign(BaseGeom.prototype, StyleMethods, DataMethods);

  /*
  src: {
      fillColor, 
      fillAlpha, 
      pathData, 
      pathIndexes  // Earcut(pathData)
  }
  */
  var Utils$1 = Phaser.Renderer.WebGL.Utils;

  var FillPathWebGL = function FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy) {
    var fillTintColor = Utils$1.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);
    var path = src.pathData;
    var pathIndexes = src.pathIndexes;

    for (var i = 0; i < pathIndexes.length; i += 3) {
      var p0 = pathIndexes[i] * 2;
      var p1 = pathIndexes[i + 1] * 2;
      var p2 = pathIndexes[i + 2] * 2;
      var x0 = path[p0 + 0] - dx;
      var y0 = path[p0 + 1] - dy;
      var x1 = path[p1 + 0] - dx;
      var y1 = path[p1 + 1] - dy;
      var x2 = path[p2 + 0] - dx;
      var y2 = path[p2 + 1] - dy;
      var tx0 = calcMatrix.getX(x0, y0);
      var ty0 = calcMatrix.getY(x0, y0);
      var tx1 = calcMatrix.getX(x1, y1);
      var ty1 = calcMatrix.getY(x1, y1);
      var tx2 = calcMatrix.getX(x2, y2);
      var ty2 = calcMatrix.getY(x2, y2);
      pipeline.batchTri(src, tx0, ty0, tx1, ty1, tx2, ty2, 0, 0, 1, 1, fillTintColor, fillTintColor, fillTintColor, 2);
    }
  };

  /*
  src: {
      strokeColor,
      strokeAlpha,
      pathData,
      lineWidth,
      closePath
  }
  */
  var Utils = Phaser.Renderer.WebGL.Utils;

  var StrokePathWebGL = function StrokePathWebGL(pipeline, src, alpha, dx, dy) {
    var strokeTint = pipeline.strokeTint;
    var strokeTintColor = Utils.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);
    strokeTint.TL = strokeTintColor;
    strokeTint.TR = strokeTintColor;
    strokeTint.BL = strokeTintColor;
    strokeTint.BR = strokeTintColor;
    var path = src.pathData;
    var pathLength = path.length - 1;
    var lineWidth = src.lineWidth;
    var halfLineWidth = lineWidth / 2;
    var px1 = path[0] - dx;
    var py1 = path[1] - dy;

    if (!src.closePath) {
      pathLength -= 2;
    }

    for (var i = 2; i < pathLength; i += 2) {
      var px2 = path[i] - dx;
      var py2 = path[i + 1] - dy;
      pipeline.batchLine(px1, py1, px2, py2, halfLineWidth, halfLineWidth, lineWidth, i - 2, src.closePath ? i === pathLength - 1 : false);
      px1 = px2;
      py1 = py2;
    }
  };

  var FillStyleCanvas = function FillStyleCanvas(ctx, src, altColor, altAlpha) {
    var fillColor = altColor ? altColor : src.fillColor;
    var fillAlpha = altAlpha ? altAlpha : src.fillAlpha;
    var red = (fillColor & 0xFF0000) >>> 16;
    var green = (fillColor & 0xFF00) >>> 8;
    var blue = fillColor & 0xFF;
    ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
  };

  var LineStyleCanvas = function LineStyleCanvas(ctx, src, altColor, altAlpha) {
    var strokeColor = altColor ? altColor : src.strokeColor;
    var strokeAlpha = altAlpha ? altAlpha : src.strokeAlpha;
    var red = (strokeColor & 0xFF0000) >>> 16;
    var green = (strokeColor & 0xFF00) >>> 8;
    var blue = strokeColor & 0xFF;
    ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
    ctx.lineWidth = src.lineWidth;
  };

  var Earcut = Phaser.Geom.Polygon.Earcut;

  var PathBase = /*#__PURE__*/function (_BaseGeom) {
    _inherits(PathBase, _BaseGeom);

    var _super = _createSuper(PathBase);

    function PathBase() {
      var _this;

      _classCallCheck(this, PathBase);

      _this = _super.call(this);
      _this.pathData = [];
      _this.pathIndexes = [];
      _this.closePath = false;
      return _this;
    }

    _createClass(PathBase, [{
      key: "updateData",
      value: function updateData() {
        this.pathIndexes = Earcut(this.pathData);
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
          FillPathWebGL(pipeline, calcMatrix, this, alpha, dx, dy);
        }

        if (this.isStroked) {
          StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        var path = this.pathData;
        var pathLength = path.length - 1;
        var px1 = path[0] - dx;
        var py1 = path[1] - dy;
        ctx.beginPath();
        ctx.moveTo(px1, py1);

        if (!this.closePath) {
          pathLength -= 2;
        }

        for (var i = 2; i < pathLength; i += 2) {
          var px2 = path[i] - dx;
          var py2 = path[i + 1] - dy;
          ctx.lineTo(px2, py2);
        }

        if (this.closePath) {
          ctx.closePath();
        }

        if (this.isFilled) {
          FillStyleCanvas(ctx, this);
          ctx.fill();
        }

        if (this.isStroked) {
          LineStyleCanvas(ctx, this);
          ctx.stroke();
        }
      }
    }]);

    return PathBase;
  }(BaseGeom);

  var LineTo = function LineTo(x, y, pathData) {
    var cnt = pathData.length;

    if (cnt >= 2) {
      var lastX = pathData[cnt - 2];
      var lastY = pathData[cnt - 1];

      if (x === lastX && y === lastY) {
        return pathData;
      }
    }

    pathData.push(x, y);
    return pathData;
  };

  var DegToRad$1 = Phaser.Math.DegToRad;

  var ArcTo = function ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }

    var deltaAngle = endAngle - startAngle;
    var step = DegToRad$1(deltaAngle) / iteration;
    startAngle = DegToRad$1(startAngle);

    for (var i = 0; i <= iteration; i++) {
      var angle = startAngle + step * i;
      var x = centerX + radiusX * Math.cos(angle);
      var y = centerY + radiusY * Math.sin(angle);
      LineTo(x, y, pathData);
    }

    return pathData;
  };

  var DegToRad = Phaser.Math.DegToRad;

  var Arc = /*#__PURE__*/function (_PathBase) {
    _inherits(Arc, _PathBase);

    var _super = _createSuper(Arc);

    function Arc(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise, pie) {
      var _this;

      _classCallCheck(this, Arc);

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      if (radiusX === undefined) {
        radiusX = 0;
      }

      if (radiusY === undefined) {
        radiusY = 0;
      }

      if (startAngle === undefined) {
        startAngle = 0;
      }

      if (endAngle === undefined) {
        endAngle = 360;
      }

      if (anticlockwise === undefined) {
        anticlockwise = false;
      }

      if (pie === undefined) {
        pie = false;
      }

      _this = _super.call(this);

      _this.setCenterPosition(x, y);

      _this.setRadius(radiusX, radiusY);

      _this.setAngle(startAngle, endAngle, anticlockwise);

      _this.setPie(pie);

      _this.setIterations(32);

      return _this;
    }

    _createClass(Arc, [{
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x !== value;
        this._x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y !== value;
        this._y = value;
      }
    }, {
      key: "setCenterPosition",
      value: function setCenterPosition(x, y) {
        if (y === undefined) {
          y = x;
        }

        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "radiusX",
      get: function get() {
        return this._radiusX;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusX !== value;
        this._radiusX = value;
      }
    }, {
      key: "radiusY",
      get: function get() {
        return this._radiusY;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusY !== value;
        this._radiusY = value;
      }
    }, {
      key: "setRadius",
      value: function setRadius(radiusX, radiusY) {
        if (radiusY === undefined) {
          radiusY = radiusX;
        }

        this.radiusX = radiusX;
        this.radiusY = radiusY;
        return this;
      }
    }, {
      key: "startAngle",
      get: function get() {
        return this._startAngle;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._startAngle !== value;
        this._startAngle = value;
      }
    }, {
      key: "endAngle",
      get: function get() {
        return this._endAngle;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._endAngle !== value;
        this._endAngle = value;
      }
    }, {
      key: "anticlockwise",
      get: function get() {
        return this._anticlockwise;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._anticlockwise !== value;
        this._anticlockwise = value;
      }
    }, {
      key: "setAngle",
      value: function setAngle(startAngle, endAngle, anticlockwise) {
        // startAngle, endAngle in degrees
        if (anticlockwise === undefined) {
          anticlockwise = false;
        }

        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        return this;
      }
    }, {
      key: "pie",
      get: function get() {
        return this._pie;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._pie !== value;
        this._pie = value;
      }
    }, {
      key: "setPie",
      value: function setPie(pie) {
        if (pie === undefined) {
          pie = true;
        }

        this.pie = pie;
        return this;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._iterations !== value;
        this._iterations = value;
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;

        if (this.pie) {
          this.pathData.push(this.x, this.y);
        }

        ArcTo(this.x, this.y, this.radiusX, this.radiusY, this.startAngle, this.endAngle, this.anticlockwise, this.iterations, this.pathData);

        if (this.pie) {
          this.pathData.push(this.x, this.y);
        }

        this.pathData.push(this.pathData[0], this.pathData[1]);

        _get(_getPrototypeOf(Arc.prototype), "updateData", this).call(this);

        return this;
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        ctx.beginPath();
        var x = this.x - dx,
            y = this.y - dy,
            startAngle = DegToRad(this.startAngle),
            endAngle = DegToRad(this.endAngle);

        if (this.pie) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(startAngle) * this.radiusX, y + Math.sin(startAngle) * this.radiusY);
        }

        ctx.ellipse(x, y, this.radiusX, this.radiusY, 0, startAngle, endAngle, this.anticlockwise);

        if (this.pie) {
          ctx.lineTo(x, y);
        }

        if (this.isFilled) {
          FillStyleCanvas(ctx, this);
          ctx.fill();
        }

        if (this.isStroked) {
          LineStyleCanvas(ctx, this);
          ctx.stroke();
        }
      }
    }]);

    return Arc;
  }(PathBase);

  Phaser.Math.Interpolation.QuadraticBezier;

  Phaser.Math.RotateAround;

  Phaser.Geom.Polygon;

  Phaser.Math.DegToRad;

  Phaser.Math.Distance.Between;
  Phaser.Math.Linear;

  Phaser.Renderer.WebGL.Utils;

  Phaser.Renderer.WebGL.Utils;

  var Yoyo = function Yoyo(t, threshold) {
    if (threshold === undefined) {
      threshold = 0.5;
    }

    if (t <= threshold) {
      t = t / threshold;
    } else {
      t = 1 - (t - threshold) / (1 - threshold);
    }

    return t;
  };

  var Spinner = /*#__PURE__*/function (_Base) {
    _inherits(Spinner, _Base);

    var _super = _createSuper(Spinner);

    function Spinner(scene, config) {
      var _this;

      _classCallCheck(this, Spinner);

      _this = _super.call(this, scene, config);
      _this.type = 'rexSpinnerSpinner';
      return _this;
    }

    _createClass(Spinner, [{
      key: "buildShapes",
      value: function buildShapes() {
        this.addShape(new Arc().setName('arc'));
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 10);
        var maxRadius = radius - lineWidth;
        var endAngle = this.value * 720;
        var arcAngle = Yoyo(this.value) * 180;
        var startAngle = endAngle - arcAngle;
        this.getShape('arc').lineStyle(lineWidth, this.color, 1).setRadius(maxRadius).setCenterPosition(centerX, centerY).setAngle(startAngle + 315, endAngle + 315);
      }
    }]);

    return Spinner;
  }(Base);

  return Spinner;

})));

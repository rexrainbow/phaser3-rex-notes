(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexsequenceplugin = factory());
})(this, (function () { 'use strict';

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
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

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  //  Source object
  //  The key as a string, or an array of keys, i.e. 'banner', or 'banner.hideBanner'
  //  The default value to use if the key doesn't exist

  /**
   * Retrieves a value from an object.
   *
   * @function Phaser.Utils.Objects.GetValue
   * @since 3.0.0
   *
   * @param {object} source - The object to retrieve the value from.
   * @param {string} key - The name of the property to retrieve from the object. If a property is nested, the names of its preceding properties should be separated by a dot (`.`) - `banner.hideBanner` would return the value of the `hideBanner` property from the object stored in the `banner` property of the `source` object.
   * @param {*} defaultValue - The value to return if the `key` isn't found in the `source` object.
   *
   * @return {*} The value of the requested key.
   */
  var GetValue = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue;

      //  Use for loop here so we can break early
      for (var i = 0; i < keys.length; i++) {
        if (parent.hasOwnProperty(keys[i])) {
          //  Yes it has a key property, let's carry on down
          value = parent[keys[i]];
          parent = parent[keys[i]];
        } else {
          //  Can't go any further, so reset to default
          value = defaultValue;
          break;
        }
      }
      return value;
    } else {
      return defaultValue;
    }
  };

  var Copy = function Copy(dest, src, startIdx, endIdx) {
    if (startIdx === undefined) {
      startIdx = 0;
    }
    if (endIdx === undefined) {
      endIdx = src.length;
    }
    dest.length = endIdx - startIdx;
    for (var i = 0, len = dest.length; i < len; i++) {
      dest[i] = src[i + startIdx];
    }
    return dest;
  };

  var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
  var HEX = /^0x[0-9A-F]+$/i;
  var TypeConvert = function TypeConvert(s) {
    if (typeof s !== 'string') {
      return s;
    }
    if (s === '') {
      s = null;
    } else if (FLOAT.test(s)) {
      s = parseFloat(s);
    } else if (HEX.test(s)) {
      s = parseInt(s, 16);
    } else {
      switch (s) {
        case 'false':
          s = false;
          break;
        case 'true':
          s = true;
          break;
        case 'null':
          s = null;
          break;
        case 'undefined':
          s = undefined;
          break;
      }
    }
    return s;
  };

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var RunCommands = function RunCommands(queue, scope, config) {
    var reverse = GetValue(config, 'reverse', false);
    var retVal;
    if (IsArray(queue[0])) {
      if (!reverse) {
        for (var i = 0, len = queue.length; i < len; i++) {
          retVal = RunCommands(queue[i], scope, config);
        }
      } else {
        for (var len = queue.length, i = len - 1; i >= 0; i--) {
          retVal = RunCommands(queue[i], scope, config);
        }
      }
    } else {
      retVal = RunCommand(queue, scope, config);
    }
    return retVal;
  };
  var RunCommand = function RunCommand(cmd, scope, config) {
    var argsConvert = GetValue(config, 'argsConvert', undefined);
    var argsConvertScope = GetValue(config, 'argsConvertScope', undefined);
    var fnName = cmd[0];
    ARGS = Copy(ARGS, cmd, 1);
    if (argsConvert) {
      // convert string to floating number, boolean, null, or string        
      if (argsConvert === true) {
        argsConvert = TypeConvert;
        argsConvertScope = undefined;
      }
      for (var i = 0, len = ARGS.length; i < len; i++) {
        if (argsConvertScope) {
          ARGS[i] = argsConvert.call(argsConvertScope, ARGS[i], cmd);
        } else {
          ARGS[i] = argsConvert(ARGS[i], cmd);
        }
      }
    }
    var fn;
    if (typeof fnName === 'string') {
      fn = scope[fnName];
      if (fn == null) {
        fn = GetValue(scope, fnName, null);
      }
    } else {
      fn = fnName;
    }
    var retValue = fn.apply(scope, ARGS);
    return retValue;
  };
  var ARGS = []; // reuse this array

  var STATE_IDLE = 0;
  var STATE_RUN = 1;
  var STATE_RUNLAST = 2;
  var STATE_COMPLETE = 3;
  var Sequence = /*#__PURE__*/function () {
    function Sequence(config) {
      _classCallCheck(this, Sequence);
      // Event emitter
      this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
      this.commands = [];
      this.scope = undefined;
      this.config = undefined;
      this.index = 0;
      this.indexStep = 1; // 1, or -1
      this.setYoyo(GetValue(config, 'yoyo', false));
      this.setRepeat(GetValue(config, 'repeat', 0));
      this.setLoop(GetValue(config, 'loop', false));
      this.state = STATE_IDLE;
      this.task = undefined;
    }
    _createClass(Sequence, [{
      key: "shutdown",
      value: function shutdown() {
        this.stop();
        this.destroyEventEmitter();
        this.commands.length = 0;
        this.scope = undefined;
        this.config = undefined;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "load",
      value: function load(commands, scope, config) {
        this.stop();
        this.setYoyo(GetValue(config, 'yoyo', this.yoyo));
        this.setRepeat(GetValue(config, 'repeat', this.repeat));
        this.setLoop(GetValue(config, 'loop', this.loop));
        this.commands = Copy(this.commands, commands);
        this.scope = scope;
        this.config = config;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.stop();
        this.resetRepeatCount();
        this.index = 0;
        this.indexStep = 1;
        this.state = STATE_RUN;
        if (this.commands.length > 0) {
          this.runNextCommands();
        } else {
          this.complete();
        }
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.task) {
          this.task.off('complete', this.runNextCommands, this);
          this.task = undefined;
        }
        this.state = STATE_IDLE;
        return this;
      }
    }, {
      key: "setYoyo",
      value: function setYoyo(yoyo) {
        if (yoyo === undefined) {
          yoyo = true;
        }
        this.yoyo = yoyo;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(count) {
        this.repeat = count;
        this.resetRepeatCount();
        return this;
      }
    }, {
      key: "setLoop",
      value: function setLoop(loop) {
        if (loop === undefined) {
          loop = true;
        }
        this.loop = loop;
        this.resetRepeatCount();
        return this;
      }
    }, {
      key: "resetRepeatCount",
      value: function resetRepeatCount() {
        this.repeatCount = this.repeat === -1 || this.loop ? 999999999999 : this.repeat;
        return this;
      }
    }, {
      key: "completed",
      get: function get() {
        return this.state === STATE_COMPLETE;
      }
    }, {
      key: "currentCommandIndex",
      get: function get() {
        return this.index - 1;
      }
    }, {
      key: "runNextCommands",
      value: function runNextCommands() {
        var task, isFirstCommand, isLastCommand;
        while (1) {
          if (this.state === STATE_RUNLAST) {
            this.complete();
            return;
          }
          task = RunCommands(this.commands[this.index], this.scope);
          if (task && typeof task.once === 'function') {
            task.once('complete', this.runNextCommands, this);
            this.task = task;
          } else {
            this.task = undefined;
          }
          isFirstCommand = this.index === 0;
          isLastCommand = this.index === this.commands.length - 1;
          if (!this.yoyo) {
            if (isLastCommand) {
              this.index = 0;
              if (this.repeatCount > 0) {
                this.repeatCount--;
              } else {
                this.state = STATE_RUNLAST; // goto completed at next running
              }
            } else {
              this.index += this.indexStep;
            }
          } else {
            if (this.indexStep > 0 && isLastCommand || this.indexStep < 0 && isFirstCommand) {
              this.indexStep = -this.indexStep;
              this.index += this.indexStep;
              if (this.repeatCount > 0) {
                this.repeatCount--;
              } else {
                this.state = STATE_RUNLAST; // goto completed at next running
              }
            } else {
              this.index += this.indexStep;
            }
          }
          if (this.task) {
            return this;
          }
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        this.state = STATE_COMPLETE;
        this.emit('complete', this.scope, this);
      }
    }]);
    return Sequence;
  }();
  Object.assign(Sequence.prototype, EventEmitterMethods);

  var SequencePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(SequencePlugin, _Phaser$Plugins$BaseP);
    function SequencePlugin(pluginManager) {
      _classCallCheck(this, SequencePlugin);
      return _callSuper(this, SequencePlugin, [pluginManager]);
    }
    _createClass(SequencePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new Sequence(config);
      }
    }]);
    return SequencePlugin;
  }(Phaser.Plugins.BasePlugin);

  return SequencePlugin;

}));

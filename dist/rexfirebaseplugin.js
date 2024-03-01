(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexfirebaseplugin = factory());
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
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
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
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var VERSION = '7.19.0';
  var GetDefaultUrl = function GetDefaultUrl(version) {
    if (version === undefined) {
      version = VERSION;
    }
    return {
      app: "https://www.gstatic.com/firebasejs/".concat(version, "/firebase-app.js"),
      // auth: `https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`,
      database: "https://www.gstatic.com/firebasejs/".concat(version, "/firebase-database.js"),
      firestore: "https://www.gstatic.com/firebasejs/".concat(version, "/firebase-firestore.js")
      // storage: `https://www.gstatic.com/firebasejs/${version}/firebase-storage.js`,

      // analytics: `https://www.gstatic.com/firebasejs/${version}/firebase-analytics.js`,
      // functions: `https://www.gstatic.com/firebasejs${version}/firebase-functions.js`,
      // messaging: `https://www.gstatic.com/firebasejs/${version}/firebase-messaging.js`,
      // performance: `https://www.gstatic.com/firebasejs/${version}/firebase-performance.js`,
      // 'remote-config': `https://www.gstatic.com/firebasejs/${version}/firebase-remote-config.js`
    };
  };

  var Clear$1 = function Clear(obj) {
    if (_typeof(obj) !== 'object' || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
    return obj;
  };

  /**
   * Shallow Object Clone. Will not out nested objects.
   * @param {object} obj JSON object
   * @param {object} ret JSON object to return, set null to return a new object
   * @returns {object} this object
   */
  var Clone = function Clone(obj, out) {
    var objIsArray = Array.isArray(obj);
    if (out === undefined) {
      out = objIsArray ? [] : {};
    } else {
      Clear$1(out);
    }
    if (objIsArray) {
      out.length = obj.length;
      for (var i = 0, cnt = obj.length; i < cnt; i++) {
        out[i] = obj[i];
      }
    } else {
      for (var key in obj) {
        out[key] = obj[key];
      }
    }
    return out;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://opensource.org/licenses/MIT|MIT License}
   */


  /**
   * Creates a new Object using all values from obj1.
   * 
   * Then scans obj2. If a property is found in obj2 that *also* exists in obj1, the value from obj2 is used, otherwise the property is skipped.
   *
   * @function Phaser.Utils.Objects.MergeRight
   * @since 3.0.0
   *
   * @param {object} obj1 - The first object to merge.
   * @param {object} obj2 - The second object to merge. Keys from this object which also exist in `obj1` will be copied to `obj1`.
   *
   * @return {object} The merged object. `obj1` and `obj2` are not modified.
   */
  var MergeRight = function MergeRight(obj1, obj2) {
    var clone = Clone(obj1);
    for (var key in obj2) {
      if (clone.hasOwnProperty(key)) {
        clone[key] = obj2[key];
      }
    }
    return clone;
  };

  var LoadScript = function LoadScript(url, onload) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, cnt = scripts.length; i < cnt; i++) {
      if (scripts[i].src.indexOf(url) != -1) {
        if (onload) {
          onload();
        }
        return;
      }
    }
    var newScriptTag = document.createElement('script');
    newScriptTag.setAttribute('src', url);
    if (onload) {
      newScriptTag.onload = onload;
    }
    document.head.appendChild(newScriptTag);
  };

  var LoadScriptPromise = function LoadScriptPromise(url) {
    return new Promise(function (resolve, reject) {
      LoadScript(url, resolve);
    });
  };

  var Delay = function Delay(time, result) {
    if (time === undefined) {
      time = 0;
    }
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(result);
      }, time);
    });
  };

  var AvailableTestPromise = function AvailableTestPromise(config) {
    if (AvailableTest(config)) {
      return Promise.resolve();
    }

    // console.log('test again')
    return Delay(10).then(function () {
      return AvailableTestPromise(config);
    });
  };
  var AvailableTest = function AvailableTest(config) {
    var testCallback;
    for (var k in config) {
      if (!config[k]) {
        continue;
      }
      testCallback = TestCallbacks[k];
      if (testCallback && !testCallback()) {
        return false;
      }
    }
    return true;
  };
  var TestCallbacks = {
    database: function database() {
      return firebase.database !== undefined;
    },
    firestore: function firestore() {
      return firebase.firestore !== undefined;
    }
  };

  var Preload = function Preload(urlConfig, firebaseConfig) {
    if (typeof urlConfig === 'string') {
      // Get specific version
      urlConfig = GetDefaultUrl(urlConfig);
    } else {
      // Get default version
      urlConfig = MergeRight(GetDefaultUrl(), urlConfig);
    }
    return LoadScriptPromise(urlConfig.app) // Load firebase-app
    .then(function () {
      // Load other SDK
      var promises = [];
      var url;
      for (var k in urlConfig) {
        if (k === 'app') {
          continue;
        }
        url = urlConfig[k];
        if (!url) {
          continue;
        }
        promises.push(LoadScriptPromise(url));
      }
      if (promises.length === 0) {
        return Promise.resolve();
      } else {
        return Promise.all(promises);
      }
    }).then(function () {
      // Wait until all vairalbe are available
      return AvailableTestPromise(urlConfig);
    }).then(function () {
      if (firebaseConfig !== undefined) {
        firebase.initializeApp(firebaseConfig);
      }
      return Promise.resolve();
    });
  };

  var FILE_POPULATED = Phaser.Loader.FILE_POPULATED;
  var UUID = Phaser.Utils.String.UUID;
  var AwaitFile = /*#__PURE__*/function (_Phaser$Loader$File) {
    _inherits(AwaitFile, _Phaser$Loader$File);
    function AwaitFile(loader, fileConfig) {
      _classCallCheck(this, AwaitFile);
      if (!fileConfig.hasOwnProperty('type')) {
        fileConfig.type = 'await';
      }
      if (!fileConfig.hasOwnProperty('url')) {
        fileConfig.url = '';
      }
      if (!fileConfig.hasOwnProperty('key')) {
        fileConfig.key = UUID();
      }
      return _callSuper(this, AwaitFile, [loader, fileConfig]);
    }
    _createClass(AwaitFile, [{
      key: "load",
      value: function load() {
        if (this.state === FILE_POPULATED) {
          //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
          this.loader.nextFile(this, true);
        } else {
          // start loading task
          var config = this.config;
          var callback = config.callback;
          var scope = config.scope;
          if (callback) {
            var self = this;
            var runOnce = false;
            var successCallback = function successCallback() {
              if (runOnce) {
                return;
              }
              self.onLoad();
              runOnce = true;
            };
            var failureCallback = function failureCallback() {
              if (runOnce) {
                return;
              }
              self.onError();
              runOnce = true;
            };
            if (scope) {
              callback.call(scope, successCallback, failureCallback);
            } else {
              callback(successCallback, failureCallback);
            }
          } else {
            this.onLoad();
          }
        }
      }
    }, {
      key: "onLoad",
      value: function onLoad() {
        this.loader.nextFile(this, true);
      }
    }, {
      key: "onError",
      value: function onError() {
        this.loader.nextFile(this, false);
      }
    }]);
    return AwaitFile;
  }(Phaser.Loader.File);

  var LoaderCallback = function LoaderCallback(urlConfig, firebaseConfig) {
    var callback = function callback(successCallback, failureCallback) {
      return Preload(urlConfig, firebaseConfig).then(function () {
        setTimeout(successCallback, 0);
      })["catch"](failureCallback);
    };
    this.addFile(new AwaitFile(this, {
      config: {
        callback: callback
      }
    }));
    return this;
  };

  var ObjectFactory = /*#__PURE__*/function () {
    function ObjectFactory() {
      _classCallCheck(this, ObjectFactory);
    }
    _createClass(ObjectFactory, [{
      key: "initializeApp",
      value: function initializeApp(config) {
        firebase.initializeApp(config);
        return this;
      }
    }], [{
      key: "register",
      value: function register(type, callback) {
        ObjectFactory.prototype[type] = callback;
      }
    }]);
    return ObjectFactory;
  }();

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

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * This is a slightly modified version of jQuery.isPlainObject.
   * A plain object is an object whose internal class property is [object Object].
   *
   * @function Phaser.Utils.Objects.IsPlainObject
   * @since 3.0.0
   *
   * @param {object} obj - The object to inspect.
   *
   * @return {boolean} `true` if the object is plain, otherwise `false`.
   */
  var IsPlainObject = function IsPlainObject(obj) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (_typeof(obj) !== 'object' || obj.nodeType || obj === obj.window) {
      return false;
    }

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try {
      if (obj.constructor && !{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  };

  var Send$1 = function Send(message) {
    if (!this.sendToRef || this.sendToRef.key !== this.receiverID) {
      this.sendToRef = this.database.ref(this.rootPath).child(this.receiverID);
    }

    // Clear message
    if (message === undefined) {
      return this.sendToRef.remove(); // Promise
    }
    var d = {
      message: message,
      senderID: this.userID,
      stamp: this.stamp
    };
    if (this.userName !== undefined) {
      d.senderName = this.userName;
    }
    this.skipFirst = false;
    this.stamp = !this.stamp;
    return this.sendToRef.set(d);
  };

  var methods$8 = {
    startReceiving: function startReceiving() {
      if (this.isReceiving && this.receiverRef.key === this.receiverID) {
        return this;
      }
      this.stopReceiving();
      this.isReceiving = true;
      this.skipFirst = true; // Skip previous message
      this.receiverRef = this.database.ref(this.rootPath).child(this.receiverID);
      this.receiverRef.on('value', OnReceive, this);
      this.receiverRef.onDisconnect().remove();
      return this;
    },
    stopReceiving: function stopReceiving() {
      if (!this.isReceiving) {
        return this;
      }
      this.isReceiving = false;
      this.receiverRef.off('value', OnReceive, this);
      this.receiverRef.remove();
      this.receiverRef.onDisconnect().cancel();
      return this;
    }
  };
  var OnReceive = function OnReceive(snapshot) {
    if (this.skipFirst) {
      this.skipFirst = false;
      return;
    }
    var d = snapshot.val();
    if (d == null) {
      return;
    }
    delete d.stamp;
    this.history.add(d);
    this.emit(this.eventNameMap.receive, d);
  };

  var History = /*#__PURE__*/function () {
    function History(config) {
      _classCallCheck(this, History);
      this.maxLength = GetValue(config, 'maxLength', -1); // -1: Infinity
      this.records = [];
    }
    _createClass(History, [{
      key: "add",
      value: function add(record) {
        if (this.maxLength === 0) {
          return this;
        }
        this.records.push(record);
        if (this.maxLength > 0 && this.records.length > this.maxLength) {
          this.records.shift();
        }
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.records.length = 0;
        return this;
      }
    }, {
      key: "changeUserName",
      value: function changeUserName(userID, userName) {
        if (this.maxLength === 0) {
          return this;
        }
        this.records.forEach(function (record) {
          if (record.senderID === userID) {
            record.senderName = userName;
          }
        });
        return this;
      }
    }]);
    return History;
  }();

  var Broadcast = /*#__PURE__*/function () {
    function Broadcast(config) {
      _classCallCheck(this, Broadcast);
      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this.eventNameMap = GetValue(config, 'eventNames', DefaultEventNames$2);
      this.database = firebase.database();
      this.setRootPath(GetValue(config, 'root', ''));

      // Sender
      this.skipFirst = true;
      this.stamp = false;
      this.userInfo = {
        userID: '',
        userName: undefined
      };
      this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));
      this.setReceiver(GetValue(config, 'receiverID', ''));

      // Receiver
      this.isReceiving = false;

      // History messages
      var historyMaxLength = GetValue(config, 'history', 0);
      if (historyMaxLength === true) {
        historyMaxLength = -1;
      } else if (historyMaxLength === false) {
        historyMaxLength = 0;
      }
      this.history = new History({
        maxLength: historyMaxLength
      });
    }
    _createClass(Broadcast, [{
      key: "shutdown",
      value: function shutdown() {
        this.stopReceiving().destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "userID",
      get: function get() {
        return this.userInfo.userID;
      },
      set: function set(value) {
        this.userInfo.userID = value;
      }
    }, {
      key: "userName",
      get: function get() {
        return this.userInfo.userName;
      },
      set: function set(value) {
        this.userInfo.userName = value;
      }
    }, {
      key: "setRootPath",
      value: function setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.sendToRef = undefined;
        this.receiverRef = undefined;
        return this;
      }
    }, {
      key: "setSender",
      value: function setSender(userID, userName) {
        if (IsPlainObject(userID)) {
          this.userInfo = userID;
        } else {
          this.userID = userID;
          this.userName = userName;
        }
        return this;
      }
    }, {
      key: "setReceiver",
      value: function setReceiver(receiverID) {
        this.receiverID = receiverID;
        return this;
      }
    }, {
      key: "changeUserName",
      value: function changeUserName(userID, userName) {
        if (userID === this.userID) {
          this.userName = userName;
        }
        this.history.changeUserName(userID, userName);
        return this;
      }
    }, {
      key: "getHistory",
      value: function getHistory() {
        return this.history.records;
      }
    }, {
      key: "clearHistory",
      value: function clearHistory() {
        this.history.clear();
        return this;
      }
    }]);
    return Broadcast;
  }();
  var methods$7 = {
    send: Send$1
  };
  Object.assign(Broadcast.prototype, EventEmitterMethods, methods$8, methods$7);
  var DefaultEventNames$2 = {
    receive: 'receive'
  };

  var IsInValidKey = function IsInValidKey(keys) {
    return keys == null || keys === '' || keys.length === 0;
  };
  var GetEntry$1 = function GetEntry(target, keys, defaultEntry) {
    var entry = target;
    if (IsInValidKey(keys)) ; else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }
      var key;
      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        if (entry[key] == null || _typeof(entry[key]) !== 'object') {
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
  var SetValue = function SetValue(target, keys, value, delimiter) {
    if (delimiter === undefined) {
      delimiter = '.';
    }

    // no object
    if (_typeof(target) !== 'object') {
      return;
    }

    // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      }
      // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split(delimiter);
      }
      var lastKey = keys.pop();
      var entry = GetEntry$1(target, keys);
      entry[lastKey] = value;
    }
    return target;
  };

  ObjectFactory.register('broadcast', function (config) {
    return new Broadcast(config);
  });
  SetValue(window, 'RexPlugins.Fire.Broadcast', Broadcast);

  var Methods$9 = {
    clear: function clear() {
      this.items.length = 0;
      Clear$1(this.itemID2Index);
      return this;
    },
    getItems: function getItems() {
      return this.items;
    },
    hasItem: function hasItem(itemID) {
      return this.itemID2Index.hasOwnProperty(itemID);
    },
    getItemIndexFromItemID: function getItemIndexFromItemID(itemID) {
      if (itemID == null) {
        return null;
      }
      return this.itemID2Index[itemID];
    },
    getItemFromItemID: function getItemFromItemID(itemID) {
      if (itemID == null) {
        return null;
      }
      var index = this.getItemIndexFromItemID(itemID);
      if (index == null) {
        return null;
      }
      return this.items[index];
    },
    forEach: function forEach(callback, scope) {
      this.items.forEach(callback, scope);
      return this;
    },
    updateItemID2Index: function updateItemID2Index() {
      Clear$1(this.itemID2Index);
      var itemID;
      for (var i = 0, cnt = this.items.length; i < cnt; i++) {
        itemID = this.items[i][this.keyItemID];
        this.itemID2Index[itemID] = i;
      }
      return this;
    }
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Removes a single item from an array and returns it without creating gc, like the native splice does.
   * Based on code by Mike Reinstein.
   *
   * @function Phaser.Utils.Array.SpliceOne
   * @since 3.0.0
   *
   * @param {array} array - The array to splice from.
   * @param {integer} index - The index of the item which should be spliced.
   *
   * @return {*} The item which was spliced (removed).
   */
  var SpliceOne = function SpliceOne(array, index) {
    if (index >= array.length) {
      return;
    }
    var len = array.length - 1;
    var item = array[index];
    for (var i = index; i < len; i++) {
      array[i] = array[i + 1];
    }
    array.length = len;
    return item;
  };

  var AddChildCallback = function AddChildCallback(snapshot, prevName) {
    var item = AddItem.call(this, snapshot, prevName);
    this.updateItemID2Index();
    this.emit(this.eventNameMap.add, item);
    this.emit(this.eventNameMap.update, this.items);
  };
  var ChangeChildCallback = function ChangeChildCallback(snapshot, prevName) {
    var prevItem = RemoveItem.call(this, snapshot);
    this.updateItemID2Index();
    var newItem = AddItem.call(this, snapshot, prevName);
    this.updateItemID2Index();
    this.emit(this.eventNameMap.change, newItem, prevItem);
    this.emit(this.eventNameMap.update, this.items);
  };
  var RemoveChildCallback = function RemoveChildCallback(snapshot) {
    var item = RemoveItem.call(this, snapshot);
    this.updateItemID2Index();
    this.emit(this.eventNameMap.remove, item);
    this.emit(this.eventNameMap.update, this.items);
  };
  var GetAllChildrenCallback = function GetAllChildrenCallback(snapshot) {
    this.clear();
    snapshot.forEach(function (childSnapshot) {
      AddItem.call(this, childSnapshot, null, true);
    }.bind(this));
    this.updateItemID2Index();
    this.emit(this.eventNameMap.update, this.items);
  };
  var AddItem = function AddItem(snapshot, prevName, pushMode) {
    var item;
    var callback = this.getItemCallback;
    var scope = this.getItemCallbackScope;
    if (scope) {
      item = callback.call(scope, snapshot);
    } else {
      item = callback(snapshot);
    }
    if (pushMode) {
      this.items.push(item);
      return item;
    }
    if (prevName == null) {
      this.items.unshift(item);
    } else {
      var i = this.itemID2Index[prevName];
      if (i === this.items.length - 1) {
        this.items.push(item);
      } else {
        this.items.splice(i + 1, 0, item);
      }
    }
    return item;
  };
  var RemoveItem = function RemoveItem(snapshot) {
    var index = this.itemID2Index[snapshot.key];
    var item = SpliceOne(this.items, index);
    return item;
  };

  var Updater$2 = {
    start: function start(query) {
      this.isUpdating = false;
      query.once('value', GetAllChildrenCallback, this);
      return this;
    },
    stop: function stop() {
      // Do nothing
      return this;
    }
  };

  var Updater$1 = {
    start: function start(query) {
      query.on('child_added', AddChildCallback, this);
      query.on('child_removed', RemoveChildCallback, this);
      query.on('child_moved', ChangeChildCallback, this);
      query.on('child_changed', ChangeChildCallback, this);
      return this;
    },
    stop: function stop() {
      this.query.off('child_added', AddChildCallback, this);
      this.query.off('child_removed', RemoveChildCallback, this);
      this.query.off('child_moved', ChangeChildCallback, this);
      this.query.off('child_changed', ChangeChildCallback, this);
      return this;
    }
  };

  var Updater = {
    start: function start(query) {
      query.on('value', GetAllChildrenCallback, this);
      return this;
    },
    stop: function stop() {
      this.query.off('value', GetAllChildrenCallback, this);
      return this;
    }
  };

  var ItemList = /*#__PURE__*/function () {
    function ItemList(config) {
      _classCallCheck(this, ItemList);
      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this.eventNameMap = GetValue(config, 'eventNames', DefaultEventNames$1);
      this.isUpdating = false;
      this.items = [];
      this.itemID2Index = {};
      this.setItemIDKey(GetValue(config, 'itemIDKey', '__itemID__'));
      this.setMode(GetValue(config, 'mode', 1));
      this.setGetitemCallback(GetValue(config, 'getItemCallback', DefaultGetItemCallback), GetValue(config, 'getItemCallbackScope', this));
      this.setQuery(GetValue(config, 'query', undefined));
    }
    _createClass(ItemList, [{
      key: "shutdown",
      value: function shutdown() {
        this.stopUpdate().clear();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "setItemIDKey",
      value: function setItemIDKey(key) {
        this.keyItemID = key;
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(mode) {
        if (typeof mode === 'string') {
          mode = MODE[mode];
        }
        this.mode = mode;
        this.updater = Updaters[mode];
        return this;
      }
    }, {
      key: "setGetitemCallback",
      value: function setGetitemCallback(callback, scope) {
        this.getItemCallback = callback;
        this.getItemCallbackScope = scope;
        return this;
      }
    }, {
      key: "setQuery",
      value: function setQuery(query) {
        this.query = query;
        return this;
      }
    }, {
      key: "startUpdate",
      value: function startUpdate(query) {
        if (query) {
          this.setQuery(query);
        } else if (this.query) {
          query = this.query;
        } else {
          // !query && !this.query
          return this;
        }
        this.stopUpdate().clear();
        this.isUpdating = true;
        this.updater.start.call(this, query);
        return this;
      }
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {
        if (!this.query || !this.isUpdating) {
          return this;
        }
        this.isUpdating = false;
        this.updater.stop.call(this);
        return this;
      }
    }]);
    return ItemList;
  }();
  var DefaultGetItemCallback = function DefaultGetItemCallback(snapshot) {
    var item = snapshot.val();
    item[this.keyItemID] = snapshot.key;
    return item;
  };
  Object.assign(ItemList.prototype, EventEmitterMethods, Methods$9);
  var DefaultEventNames$1 = {
    update: 'update',
    add: 'add',
    remove: 'remove',
    change: 'change'
  };
  var Updaters = {
    0: Updater$2,
    1: Updater$1,
    2: Updater
  };
  var MODE = {
    once: 0,
    child: 1,
    all: 2
  };

  var Join = function Join(userID, userName) {
    if (userID === undefined) {
      userID = this.userID;
      userName = this.userName;
    }
    if (this.contains(userID)) {
      return Promise.resolve(); // Promise
    }

    // Prepare data
    var d = {
      userID: userID,
      userName: userName
    };
    var maxUsers = this.maxUsers;
    var rootRef = this.database.ref(this.rootPath);
    var userRef = rootRef.push();
    return userRef.onDisconnect().remove().then(function () {
      return userRef.set(d);
    }).then(function () {
      return Delay(0);
    }).then(function () {
      // No user count limitation
      if (maxUsers === 0) {
        self.isInList = true;
        return Promise.resolve();
      }

      // Has user count limitation
      return rootRef.limitToFirst(maxUsers).once('value').then(function (snapshot) {
        if (Contains(snapshot, userID)) {
          self.isInList = true;
          return Promise.resolve();
        }
        self.isInList = false;
        // UserID is not in firstN list
        return userRef.remove().then(function () {
          return userRef.onDisconnect().cancel();
        }).then(function () {
          return Promise.reject();
        });
      });
    });
  };
  var Contains = function Contains(snapshot, userID) {
    var result = false;
    snapshot.forEach(function (childSnapshot) {
      var user = childSnapshot.val();
      if (user.userID === userID) {
        result = true;
        return true;
      }
    });
    return result;
  };

  var Leave = function Leave(userID) {
    if (userID === undefined) {
      userID = this.userID;
    }
    if (!this.contains(userID)) {
      return Promise.resolve(); // Promise
    }
    var itemID = this.userID2ItemID[userID];
    var userRef = this.database.ref(this.rootPath).child(itemID);
    return userRef.remove(); // Promise
  };

  var ChangeUserName$2 = function ChangeUserName(userName) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var userRef = self.getUserRef();
      if (userRef) {
        // Find userRef
        resolve(userRef);
      } else {
        // Query userRef
        var query = self.rootRef.orderByChild('userID').equalTo(self.userID);
        query.once('child_added').then(function (snapshot) {
          resolve(snapshot.ref);
        });
      }
    }).then(function (userRef) {
      // Set userName
      return userRef.child('userName').set(userName);
    }).then(function () {
      self.userName = userName;
      return Promise.resolve();
    });
  };

  var OnlineUserList = /*#__PURE__*/function () {
    function OnlineUserList(config) {
      _classCallCheck(this, OnlineUserList);
      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this.database = firebase.database();
      this.setRootPath(GetValue(config, 'root', ''));
      this.userInfo = {
        userID: '',
        userName: ''
      };
      this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
      this.setMaxUsers(GetValue(config, 'maxUsers', 0));
      this.userList = new ItemList({
        eventEmitter: this.getEventEmitter(),
        itemIDKey: 'joinAt',
        eventNames: {
          add: GetValue(config, 'eventNames.join', 'join'),
          remove: GetValue(config, 'eventNames.leave', 'leave'),
          update: GetValue(config, 'eventNames.update', 'update'),
          change: GetValue(config, 'eventNames.change', 'change'),
          init: GetValue(config, 'eventNames.init', 'init'),
          changename: GetValue(config, 'eventNames.changename', 'changename')
        }
      });
      this.isInList = false;
      this.userID2ItemID = {};
      this.userList.on(this.userList.eventNames.add, function (user) {
        this.userID2ItemID[user.userID] = user.joinAt;
        if (user.userID === this.userInfo.userID) {
          this.emit(this.userList.eventNames.init, this.getUsers());
        }
      }, this).on(this.userList.eventNames.remove, function (user) {
        delete this.userID2ItemID[user.userID];
        if (user.userID === this.userID) {
          this.isInList = false;
        }
      }, this).on(this.userList.eventNames.change, function (currUserInfo, prevUserInfo) {
        var userID = currUserInfo.userID,
          userName = currUserInfo.userName,
          prevUserName = prevUserInfo.userName;
        if (userName !== prevUserName) {
          this.emit(this.userList.eventNames.changename, userID, userName, prevUserName);
        }
      }, this);
    }
    _createClass(OnlineUserList, [{
      key: "shutdown",
      value: function shutdown() {
        this.stopUpdate().destroyEventEmitter().leave();
        this.userList.shutdown();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "userID",
      get: function get() {
        return this.userInfo.userID;
      },
      set: function set(value) {
        this.userInfo.userID = value;
      }
    }, {
      key: "userName",
      get: function get() {
        return this.userInfo.userName;
      },
      set: function set(value) {
        this.userInfo.userName = value;
      }
    }, {
      key: "setRootPath",
      value: function setRootPath(rootPath) {
        this.rootPath = rootPath;
        return this;
      }
    }, {
      key: "rootRef",
      get: function get() {
        return this.database.ref(this.rootPath);
      }
    }, {
      key: "setUser",
      value: function setUser(userID, userName) {
        if (IsPlainObject(userID)) {
          this.userInfo = userID;
        } else {
          this.userID = userID;
          this.userName = userName;
        }
        return this;
      }
    }, {
      key: "setMaxUsers",
      value: function setMaxUsers(maxUsers) {
        this.maxUsers = maxUsers;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.userList.clear();
        return this;
      }
    }, {
      key: "forEach",
      value: function forEach(callback, scope) {
        this.userList.forEach(callback, scope);
        return this;
      }
    }, {
      key: "isFull",
      value: function isFull() {
        if (this.maxUsers === 0) {
          return false;
        }
        return this.userList.getItems().length >= this.maxUsers;
      }
    }, {
      key: "isFirstUser",
      value: function isFirstUser(userID) {
        if (userID === undefined) {
          userID = this.userID;
        }
        var user = this.usersList.getItems()[0];
        return user && user.userID === userID;
      }
    }, {
      key: "getUser",
      value: function getUser(userID) {
        if (userID === undefined) {
          userID = this.userID;
        }
        if (!this.contains(userID)) {
          return null;
        }
        var itemID = this.userID2ItemID[userID];
        return this.userList.getItemFromItemID(itemID);
      }
    }, {
      key: "getUsers",
      value: function getUsers() {
        return this.userList.getItems();
      }
    }, {
      key: "getUserRef",
      value: function getUserRef(userID) {
        if (userID === undefined) {
          userID = this.userID;
        }
        if (!this.contains(userID)) {
          return null;
        }
        var itemID = this.userID2ItemID[userID];
        return this.rootRef.child(itemID);
      }
    }, {
      key: "contains",
      value: function contains(userID) {
        if (userID === undefined) {
          userID = this.userID;
        }
        return this.userID2ItemID.hasOwnProperty(userID);
      }
    }, {
      key: "startUpdate",
      value: function startUpdate() {
        var query = this.database.ref(this.rootPath);
        if (this.maxUsers > 0) {
          query = query.limitToFirst(this.maxUsers);
        }
        this.userList.startUpdate(query);
        return this;
      }
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {
        this.userList.stopUpdate();
        return this;
      }
    }]);
    return OnlineUserList;
  }();
  var methods$6 = {
    join: Join,
    leave: Leave,
    changeUserName: ChangeUserName$2
  };
  Object.assign(OnlineUserList.prototype, EventEmitterMethods, methods$6);

  ObjectFactory.register('onlineUserList', function (config) {
    return new OnlineUserList(config);
  });
  SetValue(window, 'RexPlugins.Fire.OnlineUserList', OnlineUserList);

  var CreateUserList$1 = function CreateUserList(config) {
    var userList = new OnlineUserList({
      eventEmitter: this.getEventEmitter(),
      eventNames: {
        join: 'userlist.join',
        // Any user join
        leave: 'userlist.leave',
        // Any user leave
        update: 'userlist.update',
        // Update user list
        change: 'userlist.change',
        // Any user(name) change
        init: 'userlist.init',
        changename: 'userlist.changename'
      },
      userID: this.userInfo
    });
    userList.on('userlist.leave', function (user) {
      if (user.userID === this.userID) {
        OnLeftRoom$1.call(this); // Current user is left or kicked
      }
    }, this);
    this.on('room.join', function () {
      userList.startUpdate();
    }).on('room.leave', function () {
      userList.stopUpdate().clear();
    });
    return userList;
  };
  var OnLeftRoom$1 = function OnLeftRoom() {
    this.emit('room.leave');

    // Clear room info later
    var self = this;
    setTimeout(function () {
      self.roomID = undefined;
      self.roomName = undefined;
      self.doorState = undefined;
      self.leftRoomFlag = false;
    }, 0);
  };

  var CreateRoomList = function CreateRoomList(config) {
    var roomList = new ItemList({
      eventEmitter: this.getEventEmitter(),
      root: this.getRoomFilterRef(),
      itemIDKey: 'roomID',
      eventNames: {
        update: 'roomlist.update',
        add: 'roomlist.add',
        remove: 'roomlist.remove',
        change: 'roomlist.change'
      },
      mode: 'once'
    });
    return roomList;
  };

  var CreateBroadcast$1 = function CreateBroadcast(config) {
    var broadcastConfig = GetValue(config, 'broadcast', true);
    if (!broadcastConfig) {
      return null;
    }
    var broadcast = new Broadcast({
      eventEmitter: this.getEventEmitter(),
      eventNames: {
        receive: 'broadcast.receive'
      },
      receiverID: 'boradcast',
      senderID: this.userInfo,
      history: GetValue(broadcastConfig, 'history', false)
    });
    this.on('room.join', function (roomConfig) {
      broadcast.setRootPath(this.getRoomDataPath(roomConfig.roomID)).startReceiving();
    }, this).on('room.leave', function () {
      broadcast.stopReceiving();
    }, this).on('userlist.changename', function (userID, userName) {
      broadcast.changeUserName(userID, userName);
    }, this);
    return broadcast;
  };

  var DeepClone = function DeepClone(inObject) {
    var outObject;
    var value;
    var key;
    if (inObject == null || _typeof(inObject) !== 'object') {
      //  inObject is not an object
      return inObject;
    }

    //  Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
    if (IsPlainObject(inObject)) {
      for (key in inObject) {
        value = inObject[key];

        //  Recursively (deep) copy for nested objects, including arrays
        outObject[key] = DeepClone(value);
      }
    } else {
      outObject = inObject;
    }
    return outObject;
  };

  var Tree = /*#__PURE__*/function () {
    function Tree(data) {
      _classCallCheck(this, Tree);
      if (data === undefined) {
        data = {};
      }
      this.data = data;
      this.refPath = '';
    }
    _createClass(Tree, [{
      key: "getFullPath",
      value: function getFullPath(keys) {
        if (typeof keys === 'string') {
          if (keys === '.') {
            keys = this.refPath;
          } else if (keys.startsWith('..')) {
            if (this.refPath !== '') {
              var refPathKeys = this.refPath.split('.');
              refPathKeys.pop();
              keys = "".concat(refPathKeys.join('.')).concat(keys.substring(1));
            } else {
              // this.refPath === ''
              keys = keys.substring(2);
            }
          } else if (keys.startsWith('.')) {
            if (this.refPath !== '') {
              keys = "".concat(this.refPath).concat(keys);
            } else {
              // this.refPath === ''
              keys = keys.substring(1);
            }
          }
        }
        return keys;
      }
    }, {
      key: "setRefPath",
      value: function setRefPath(keys) {
        if (keys === undefined) {
          keys = '';
        }
        this.refPath = this.getFullPath(keys);
        return this;
      }
    }, {
      key: "setValue",
      value: function setValue(keys, value) {
        if (keys === undefined) {
          this.clear(); // No argument
        } else if (value === undefined) {
          this.data = keys; // JSON keys
        } else {
          SetValue(this.data, this.getFullPath(keys), value);
        }
        return this;
      }
    }, {
      key: "getValue",
      value: function getValue(keys) {
        if (keys === undefined) {
          return this.data;
        } else {
          if (typeof keys === 'string') {
            keys = this.getFullPath(keys).split('.');
          }
          return GetEntry(this.data, keys);
        }
      }
    }, {
      key: "cloneValue",
      value: function cloneValue(keys) {
        return DeepClone(this.getValue(keys));
      }
    }, {
      key: "removeKey",
      value: function removeKey(keys) {
        if (keys === undefined) {
          this.clear();
        } else {
          if (typeof keys === 'string') {
            keys = this.getFullPath(keys).split('.');
          }
          var lastKey = keys.pop();
          var entry = GetEntry(this.data, keys);
          if (IsObject(entry)) {
            delete entry[lastKey];
          }
        }
        return this;
      }
    }, {
      key: "hasKey",
      value: function hasKey(keys) {
        if (typeof keys === 'string') {
          keys = this.getFullPath(keys).split('.');
        }
        var lastKey = keys.pop();
        var entry = GetEntry(this.data, keys);
        if (!IsObject(entry)) {
          return false;
        }
        return entry.hasOwnProperty(lastKey);
      }
    }, {
      key: "clear",
      value: function clear() {
        Clear$1(this.data);
        return this;
      }
    }, {
      key: "clone",
      value: function clone(cloneData) {
        var data = cloneData ? this.cloneValue() : this.data;
        var tree = new Tree(data);
        tree.setRefPath(this.refPath);
        return tree;
      }
    }]);
    return Tree;
  }();
  var IsObject = function IsObject(obj) {
    return obj != null && _typeof(obj) === 'object';
  };
  var GetEntry = function GetEntry(data, keys) {
    if (keys[0] === '') {
      return data;
    }
    var entry = data;
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
      if (!IsObject(entry)) {
        return undefined;
      }
      entry = entry[keys[i]];
    }
    return entry;
  };

  var BaseUpdater = /*#__PURE__*/function () {
    function BaseUpdater(config) {
      _classCallCheck(this, BaseUpdater);
      // Event emitter
      this.setEventEmitter(config.eventEmitter, config.EventEmitterClass);
      this.parent = config.parent;
      this.key = config.key;
      if (this.parent) {
        this.fullKeyPath = ExtendKeyPath(this.parent.fullKeyPath, this.key);
      } else {
        this.fullKeyPath = '';
      }
      this.type = config.type;
      this.eventNameMap = config.eventNames;
      this.table = config.table;
      this.database = firebase.database();
      this.setRootPath();
      this.children = {};
    }
    _createClass(BaseUpdater, [{
      key: "shutdown",
      value: function shutdown() {
        this.stopUpdate().clear().destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "setRootPath",
      value: function setRootPath(rootPath) {
        if (rootPath === undefined) {
          var parentRootPath = this.parent ? this.parent.rootPath : '';
          rootPath = "".concat(parentRootPath, "/").concat(this.key);
        }
        this.rootPath = rootPath;
        var child;
        for (var key in this.children) {
          child = this.children[key];
          if (child instanceof BaseUpdater) {
            child.setRootPath();
          }
        }
        return this;
      }
    }, {
      key: "rootRef",
      get: function get() {
        return this.database.ref(this.rootPath);
      }
    }, {
      key: "load",
      value: function load() {
        var self = this;
        return this.rootRef.once('value').then(function (snapshot) {
          // Won't add any child
          var value = snapshot.val() || {};
          self.table.setValue(value);
          return Promise.resolve(value);
        });
      }
    }, {
      key: "setData",
      value: function setData(key, value) {
        if (key === undefined) {
          this.clear(); // Clear
        } else if (value === undefined) {
          var data = key; // JSON data
          for (key in this.children) {
            // Not in new data
            if (!data.hasOwnProperty(key)) {
              this.removeChild(key);
            }
          }
          for (key in data) {
            this.setChildData(key, data[key]);
          }
        } else {
          this.setChildData(key, value); // Pass data to column-updater
        }
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.table.removeKey(this.fullKeyPath);
        for (var key in this.children) {
          this.removeChild(key);
        }
        return this;
      }

      // Overwrite
    }, {
      key: "childClass",
      get: function get() {
        return undefined;
      }

      // Overwrite
    }, {
      key: "setChildData",
      value: function setChildData(key, data) {
        var keyPath = ExtendKeyPath(this.fullKeyPath, key);
        this.table.setValue(keyPath, data);
        if (!this.children.hasOwnProperty(key)) {
          if (this.childClass) {
            var child = new this.childClass({
              parent: this,
              key: key,
              type: this.type,
              eventEmitter: this.getEventEmitter(),
              eventNames: this.eventNameMap,
              table: this.table
            });
            child.startUpdate();
            this.children[key] = child;
          }
        } else {
          this.children[key].setData(data);
        }
        return this;
      }

      // Overwrite
    }, {
      key: "removeChild",
      value: function removeChild(key) {
        if (this.children.hasOwnProperty(key)) {
          this.children[key].destroy();
          delete this.children[key];
        }
        return this;
      }

      // Overwrite
    }, {
      key: "startUpdate",
      value: function startUpdate() {}

      // Overwrite
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {}
    }]);
    return BaseUpdater;
  }();
  var ExtendKeyPath = function ExtendKeyPath(baseKeyPath, newKey) {
    if (baseKeyPath == null || baseKeyPath === '') {
      return newKey;
    } else if (newKey == null || newKey === '') {
      return baseKeyPath;
    } else {
      return "".concat(baseKeyPath, ".").concat(newKey);
    }
  };
  Object.assign(BaseUpdater.prototype, EventEmitterMethods);

  var ColumnUpdater = /*#__PURE__*/function (_BaseUpdater) {
    _inherits(ColumnUpdater, _BaseUpdater);
    function ColumnUpdater() {
      _classCallCheck(this, ColumnUpdater);
      return _callSuper(this, ColumnUpdater, arguments);
    }
    _createClass(ColumnUpdater, [{
      key: "startUpdate",
      value: function startUpdate() {
        this.rootRef.on('child_added', this.addCol, this);
        this.rootRef.on('child_removed', this.removeCol, this);
        this.rootRef.on('child_changed', this.changeColValue, this);
        return this;
      }
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {
        this.rootRef.off('child_added', this.addCol, this);
        this.rootRef.off('child_removed', this.removeCol, this);
        this.rootRef.off('child_changed', this.changeColValue, this);
        return this;
      }
    }, {
      key: "addCol",
      value: function addCol(snapshot) {
        var key = snapshot.key,
          value = snapshot.val();
        this.setData(key, value);
        switch (this.type) {
          case 1:
            this.emit(this.eventNameMap.addkey0, key, value);
            break;
          case 2:
            this.emit(this.eventNameMap.addkey1, this.key, key, value);
            break;
          default:
            // 3
            this.emit(this.eventNameMap.addkey2, this.pageKey, this.key, key, value);
            break;
        }
        this.emit(this.eventNameMap.update, this.table.data);
      }
    }, {
      key: "removeCol",
      value: function removeCol(snapshot) {
        var key = snapshot.key;
        this.removeChild(key);
        switch (this.type) {
          case 1:
            this.emit(this.eventNameMap.removekey0, key);
            break;
          case 2:
            this.emit(this.eventNameMap.removekey1, this.key, key);
            break;
          default:
            // 3
            this.emit(this.eventNameMap.removekey2, this.pageKey, this.key, key);
            break;
        }
        this.emit(this.eventNameMap.update, this.table.data);
      }
    }, {
      key: "changeColValue",
      value: function changeColValue(snapshot) {
        var key = snapshot.key,
          value = snapshot.val();
        this.setData(key, value);
        switch (this.type) {
          case 1:
            this.emit(this.eventNameMap.changekey0, key, value);
            break;
          case 2:
            this.emit(this.eventNameMap.changekey1, this.key, key, value);
            break;
          default:
            // 3
            this.emit(this.eventNameMap.changekey2, this.pageKey, this.key, key, value);
            break;
        }
        this.emit(this.eventNameMap.update, this.table.data);
      }
    }, {
      key: "pageKey",
      get: function get() {
        return this.parent.key;
      }
    }]);
    return ColumnUpdater;
  }(BaseUpdater);

  var RowUpdater = /*#__PURE__*/function (_BaseUpdater) {
    _inherits(RowUpdater, _BaseUpdater);
    function RowUpdater() {
      _classCallCheck(this, RowUpdater);
      return _callSuper(this, RowUpdater, arguments);
    }
    _createClass(RowUpdater, [{
      key: "startUpdate",
      value: function startUpdate() {
        this.rootRef.on('child_added', this.addRow, this);
        this.rootRef.on('child_removed', this.removeRow, this);
        return this;
      }
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {
        this.rootRef.off('child_added', this.addRow, this);
        this.rootRef.off('child_removed', this.removeRow, this);
        return this;
      }
    }, {
      key: "addRow",
      value: function addRow(snapshot) {
        var key = snapshot.key,
          value = snapshot.val();
        this.setData(key, value);
        switch (this.type) {
          case 2:
            this.emit(this.eventNameMap.addkey0, this.key, key, value);
            break;
          default:
            // 3
            this.emit(this.eventNameMap.addkey1, this.key, key, value);
            break;
        }
      }
    }, {
      key: "removeRow",
      value: function removeRow(snapshot) {
        var key = snapshot.key;
        this.removeChild(key);
        switch (this.type) {
          case 2:
            this.emit(this.eventNameMap.removekey0, key);
            break;
          default:
            // 3
            this.emit(this.eventNameMap.removekey1, this.key, key);
            break;
        }
      }
    }, {
      key: "childClass",
      get: function get() {
        return ColumnUpdater;
      }
    }, {
      key: "pageKey",
      get: function get() {
        return this.parent.key;
      }
    }]);
    return RowUpdater;
  }(BaseUpdater);

  var PageUpdater = /*#__PURE__*/function (_BaseUpdater) {
    _inherits(PageUpdater, _BaseUpdater);
    function PageUpdater(config) {
      _classCallCheck(this, PageUpdater);
      return _callSuper(this, PageUpdater, [config]);
    }
    _createClass(PageUpdater, [{
      key: "startUpdate",
      value: function startUpdate() {
        this.rootRef.on('child_added', this.addPage, this);
        this.rootRef.on('child_removed', this.removePage, this);
        return this;
      }
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {
        this.rootRef.off('child_added', this.addPage, this);
        this.rootRef.off('child_removed', this.removePage, this);
        return this;
      }
    }, {
      key: "addPage",
      value: function addPage(snapshot) {
        var key = snapshot.key,
          value = snapshot.val();
        this.setData(key, value);
        this.emit(this.eventNameMap.addkey0, key, value);
      }
    }, {
      key: "removePage",
      value: function removePage(snapshot) {
        var key = snapshot.key;
        this.removeChild(key);
        this.emit(this.eventNameMap.removekey0, key);
      }
    }, {
      key: "childClass",
      get: function get() {
        return RowUpdater;
      }
    }]);
    return PageUpdater;
  }(BaseUpdater);

  var Init = function Init() {
    var self = this;
    this.initialFlag = false;
    return this.updater.clear().load().then(function (value) {
      self.initialFlag = true;
      self.emit(self.eventNames.init, value);
      return Promise.resolve(value);
    });
  };

  var SetData = function SetData() {
    var key0, key1, key2, value;
    switch (arguments.length) {
      case 4:
        var _arguments = Array.prototype.slice.call(arguments);
        key0 = _arguments[0];
        key1 = _arguments[1];
        key2 = _arguments[2];
        value = _arguments[3];
        break;
      case 3:
        var _arguments2 = Array.prototype.slice.call(arguments);
        key0 = _arguments2[0];
        key1 = _arguments2[1];
        value = _arguments2[2];
        break;
      case 2:
        var _arguments3 = Array.prototype.slice.call(arguments);
        key0 = _arguments3[0];
        value = _arguments3[1];
        break;
      default:
        value = arguments[0];
        break;
    }
    return this.getRef(key0, key1, key2).set(value);
  };

  var RemoveData = function RemoveData() {
    var key0, key1, key2;
    switch (arguments.length) {
      case 3:
        var _arguments = Array.prototype.slice.call(arguments);
        key0 = _arguments[0];
        key1 = _arguments[1];
        key2 = _arguments[2];
        break;
      case 2:
        var _arguments2 = Array.prototype.slice.call(arguments);
        key0 = _arguments2[0];
        key1 = _arguments2[1];
        break;
      default:
        key0 = arguments[0];
        break;
    }
    return this.getRef(key0, key1, key2).remove();
  };

  var IncValue = function IncValue() {
    var key0, key1, key2, value;
    switch (arguments.length) {
      case 4:
        var _arguments = Array.prototype.slice.call(arguments);
        key0 = _arguments[0];
        key1 = _arguments[1];
        key2 = _arguments[2];
        value = _arguments[3];
        break;
      case 3:
        var _arguments2 = Array.prototype.slice.call(arguments);
        key0 = _arguments2[0];
        key1 = _arguments2[1];
        value = _arguments2[2];
        break;
      case 2:
        var _arguments3 = Array.prototype.slice.call(arguments);
        key0 = _arguments3[0];
        value = _arguments3[1];
        break;
      default:
        value = arguments[0];
        break;
    }
    return this.getRef(key0, key1, key2).transaction(function (preValue) {
      if (preValue === null) {
        preValue = 0;
      }
      return preValue + value;
    });
  };

  var Transaction = function Transaction() {
    var key0, key1, key2, callback;
    switch (arguments.length) {
      case 4:
        var _arguments = Array.prototype.slice.call(arguments);
        key0 = _arguments[0];
        key1 = _arguments[1];
        key2 = _arguments[2];
        callback = _arguments[3];
        break;
      case 3:
        var _arguments2 = Array.prototype.slice.call(arguments);
        key0 = _arguments2[0];
        key1 = _arguments2[1];
        callback = _arguments2[2];
        break;
      case 2:
        var _arguments3 = Array.prototype.slice.call(arguments);
        key0 = _arguments3[0];
        callback = _arguments3[1];
        break;
      default:
        callback = arguments[0];
        break;
    }

    // callback: function(preValue) { return newValue; }
    return this.getRef(key0, key1, key2).transaction(callback);
  };

  var UpdateData = function UpdateData(data) {
    return this.getRef().update(data);
  };

  var RemoveDataOnDisconnect = function RemoveDataOnDisconnect() {
    var key0, key1, key2;
    switch (arguments.length) {
      case 3:
        var _arguments = Array.prototype.slice.call(arguments);
        key0 = _arguments[0];
        key1 = _arguments[1];
        key2 = _arguments[2];
        break;
      case 2:
        var _arguments2 = Array.prototype.slice.call(arguments);
        key0 = _arguments2[0];
        key1 = _arguments2[1];
        break;
      case 1:
        key0 = arguments[0];
        break;
    }
    return this.getRef(key0, key1, key2).onDisconnect().remove();
  };

  var SetDataOnDisconnect = function SetDataOnDisconnect() {
    var key0, key1, key2, value;
    switch (arguments.length) {
      case 4:
        var _arguments = Array.prototype.slice.call(arguments);
        key0 = _arguments[0];
        key1 = _arguments[1];
        key2 = _arguments[2];
        value = _arguments[3];
        break;
      case 3:
        var _arguments2 = Array.prototype.slice.call(arguments);
        key0 = _arguments2[0];
        key1 = _arguments2[1];
        value = _arguments2[2];
        break;
      case 2:
        var _arguments3 = Array.prototype.slice.call(arguments);
        key0 = _arguments3[0];
        value = _arguments3[1];
        break;
      default:
        value = arguments[0];
        break;
    }
    return this.getRef(key0, key1, key2).onDisconnect().set(value);
  };

  var ItemTable = /*#__PURE__*/function () {
    function ItemTable(config) {
      _classCallCheck(this, ItemTable);
      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this.eventNameMap = GetValue(config, 'eventNames', DefaultEventNames);
      this.database = firebase.database();
      this.table = new Tree();
      this.setTableType(GetValue(config, 'type', 3));
      this.setRootPath(GetValue(config, 'root', ''));
      this.initialFlag = false;
    }
    _createClass(ItemTable, [{
      key: "shutdown",
      value: function shutdown() {
        this.updater.destroy();
        this.destroyEventEmitter().stopUpdate();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "setRootPath",
      value: function setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.updater.setRootPath(rootPath);
        return this;
      }
    }, {
      key: "setTableType",
      value: function setTableType(type) {
        if (typeof type === 'string') {
          type = TABLE_TYPE[type];
        }
        this.tableType = type;
        var UpdaterClass = UpdaterClasses[type];
        this.updater = new UpdaterClass({
          type: type,
          eventEmitter: this.getEventEmitter(),
          eventNames: this.eventNameMap,
          table: this.table
        });
        return this;
      }
    }, {
      key: "getRootRef",
      value: function getRootRef() {
        return this.database.ref(this.rootPath);
      }
    }, {
      key: "getRef",
      value: function getRef(key0, key1, key2) {
        var ref = this.getRootRef();
        ref = key0 ? ref.child(key0) : ref;
        ref = key1 ? ref.child(key1) : ref;
        ref = key2 ? ref.child(key2) : ref;
        return ref;
      }
    }, {
      key: "startUpdate",
      value: function startUpdate() {
        Init.call(this);
        this.updater.startUpdate();
        return this;
      }
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {
        this.updater.stopUpdate();
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.updater.clear();
        return this;
      }
    }, {
      key: "getData",
      value: function getData() {
        return this.table.getValue(arguments);
      }
    }, {
      key: "cloneData",
      value: function cloneData() {
        return this.table.cloneValue(arguments);
      }
    }]);
    return ItemTable;
  }();
  var UpdaterClasses = {
    1: ColumnUpdater,
    2: RowUpdater,
    3: PageUpdater
  };
  var methods$5 = {
    setData: SetData,
    removeData: RemoveData,
    incValue: IncValue,
    transaction: Transaction,
    updateData: UpdateData,
    removeDataOnDisconnect: RemoveDataOnDisconnect,
    setDataOnDisconnect: SetDataOnDisconnect
  };
  Object.assign(ItemTable.prototype, EventEmitterMethods, methods$5);
  var TABLE_TYPE = {
    '1d': 1,
    '2d': 2,
    '3d': 3
  };
  var DefaultEventNames = {
    init: 'init',
    update: 'update',
    addkey0: 'addkey0',
    removekey0: 'removekey0',
    changekey0: 'changekey0',
    addkey1: 'addkey1',
    removekey1: 'removekey1',
    changekey1: 'changekey1',
    addkey2: 'addkey2',
    removekey2: 'removekey2',
    changekey2: 'changekey2'
  };

  var CreateTables$1 = function CreateTables(config) {
    var tablesConfig = GetValue(config, 'tables', undefined);
    if (tablesConfig === undefined) {
      return {};
    }
    var tableConfig;
    var tables = {};
    for (var i = 0, cnt = tablesConfig.length; i < cnt; i++) {
      tableConfig = tablesConfig[i];
      tables[tableConfig.key] = CreateTable$1.call(this, tableConfig);
    }
    return tables;
  };
  var CreateTable$1 = function CreateTable(config) {
    var key = config.key;
    var table = new ItemTable({
      eventEmitter: this.getEventEmitter(),
      root: this.getItemTablePath(this.roomID, key),
      type: GetValue(config, 'type', 1),
      eventNames: {
        init: "tables.".concat(key, ".init"),
        update: "tables.".concat(key, ".update"),
        addkey0: "tables.".concat(key, ".addkey0"),
        removekey0: "tables.".concat(key, ".removekey0"),
        changekey0: "tables.".concat(key, ".changekey0"),
        addkey1: "tables.".concat(key, ".addkey1"),
        removekey1: "tables.".concat(key, ".removekey1"),
        changekey1: "tables.".concat(key, ".changekey1"),
        addkey2: "tables.".concat(key, ".addkey2"),
        removekey2: "tables.".concat(key, ".removekey2"),
        changekey2: "tables.".concat(key, ".changekey2")
      }
    });
    this.on('room.join', function () {
      table.startUpdate();
    }).on('room.leave', function () {
      table.clear().stopUpdate();
    });
    return table;
  };

  var GetRoomState = function GetRoomState(filterString) {
    return filterString.split('|')[0];
  };
  var GetRoomType = function GetRoomType(filterString) {
    return filterString.split('|')[1];
  };
  var GetFilterString = function GetFilterString(roomState, roomType) {
    if (roomType === undefined) {
      roomType = '';
    }
    return "".concat(roomState, "|").concat(roomType);
  };

  var OnJoinRoom = function OnJoinRoom(config) {
    this.roomID = config.roomID;
    this.roomName = config.roomName;
    this.roomType = config.roomType;
    this.emit('room.join', config);
  };

  var TryCreateRoom = function TryCreateRoom(config) {
    if (config === undefined) {
      config = {};
    }
    if (config.roomID == null) {
      config.roomID = this.getRoomRef().push().key;
    }
    var self = this;
    return RegisterRoom.call(self, config.roomID).then(function () {
      // Create room
      return CreateRoom.call(self, config);
    });
  };
  var RegisterRoom = function RegisterRoom(roomID) {
    return this.getRoomAliveRef(roomID).transaction(function (value) {
      if (value === null) {
        // Room is not existed, register success
        return true;
      } else {
        // Room is existed, register fail
        return; // Abort the transaction
      }
    });
  };
  var CreateRoom = function CreateRoom(config) {
    config = MergeRight(DefaultConfig, config);
    var roomID = config.roomID;
    var roomName = config.roomName;
    var roomType = config.roomType;
    var doorState = config.door;
    var join = config.join;
    var filterData = config.filterData;
    var roomRef = this.getRoomRef(roomID);
    var roomFilterRef = this.getRoomFilterRef(roomID);
    var roomMetadataRef = this.getRoomDataRef(roomID);

    // Remove room when creater is offline
    this.isRemoveRoomWhenLeft = !config.presisted;
    if (this.isRemoveRoomWhenLeft) {
      roomRef.onDisconnect().remove();
      roomFilterRef.onDisconnect().remove();
      roomMetadataRef.onDisconnect().remove();
    }
    var filter = GetFilterString(doorState, roomType);
    var d = {};

    // Room-filter
    var roomFilterData = {
      filter: filter,
      name: roomName
    };
    if (filterData) {
      roomFilterData.data = filterData;
    }
    d["room-filters/".concat(roomID)] = roomFilterData;

    // Room-metadata
    var roomMetadata = {
      name: roomName,
      filter: filter,
      maxUsers: config.maxUsers,
      moderators: {}
    };
    roomMetadata.moderators[this.userID] = this.userName;
    d["room-data/".concat(roomID)] = roomMetadata;
    var self = this;
    return new Promise(function (resolve, reject) {
      if (join) {
        var promise = self.userList.setRootPath(self.getUserListPath(roomID)).setMaxUsers(0) // Don't test max user count
        .join(); // Promise
        self.userList.setMaxUsers(config.maxUsers);
        return promise.then(resolve, reject);
      } else {
        return resolve();
      }
    }).then(function () {
      return self.getRootRef().update(d);
    }).then(function () {
      self.isRoomCreator = true;
      if (join) {
        OnJoinRoom.call(self, config);
      }
      return Promise.resolve(config);
    });
  };
  var DefaultConfig = {
    roomID: '',
    roomName: '',
    roomType: '',
    maxUsers: 0,
    presisted: false,
    door: 'open',
    join: true,
    filterData: undefined
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Compute a random integer between the `min` and `max` values, inclusive.
   *
   * @function Phaser.Math.Between
   * @since 3.0.0
   *
   * @param {integer} min - The minimum value.
   * @param {integer} max - The maximum value.
   *
   * @return {integer} The random integer.
   */
  var Between = function Between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Returns a Random element from the array.
   *
   * @function Phaser.Utils.Array.GetRandom
   * @since 3.0.0
   *
   * @param {array} array - The array to select the random entry from.
   * @param {integer} [startIndex=0] - An optional start index.
   * @param {integer} [length=array.length] - An optional length, the total number of elements (from the startIndex) to choose from.
   *
   * @return {*} A random element from the array, or `null` if no element could be found in the range given.
   */
  var GetRandom = function GetRandom(array, startIndex, length) {
    if (startIndex === undefined) {
      startIndex = 0;
    }
    if (length === undefined) {
      length = array.length;
    }
    var randomIndex = startIndex + Math.floor(Math.random() * length);
    return array[randomIndex] === undefined ? null : array[randomIndex];
  };

  var CANDIDATES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var GetRandomWord = function GetRandomWord(min, max, candidates) {
    if (candidates === undefined) {
      candidates = CANDIDATES;
    }
    var count = max === undefined ? min : Between(min, max);
    var word = '';
    for (var j = 0; j < count; j++) {
      word += GetRandom(candidates);
    }
    return word;
  };

  var CreateRandomRoom = function CreateRandomRoom(config) {
    if (config === undefined) {
      config = {};
    }
    var digits = GetValue(config, 'digits', 10);
    var candidates = GetValue(config, 'candidates', '0123456789');
    var retry = GetValue(config, 'retry', 1000);
    return TryCreateRandomRoom.call(this, digits, candidates, retry, config);
  };
  var TryCreateRandomRoom = function TryCreateRandomRoom(digits, candidates, retry, config) {
    config.roomID = GetRandomWord(digits, digits, candidates);
    if (retry <= 0) {
      return Promise.reject(config);
    }
    retry--;
    var self = this;
    return this.createRoom(config)["catch"](function () {
      return TryCreateRandomRoom.call(self, digits, candidates, retry, config);
    });
  };

  var TryJoinRoom = function TryJoinRoom(config) {
    var leftThenJoin = GetValue(config, 'leftThenJoin', true);
    var self = this;
    if (leftThenJoin) {
      return this.leaveRoom().then(function () {
        return JoinRoom$1.call(self, config);
      });
    } else {
      return JoinRoom$1.call(self, config);
    }
  };
  var JoinRoom$1 = function JoinRoom(config) {
    var roomID = GetValue(config, 'roomID', undefined);
    if (roomID === undefined) {
      return Promise.reject();
    }
    this.isRemoveRoomWhenLeft = false;
    var self = this;
    return IsRoomOpened$1.call(self, config).then(function (metadata) {
      return self.userList.setRootPath(self.getUserListPath(config.roomID)).setMaxUsers(metadata.maxUsers).join();
    }).then(function () {
      OnJoinRoom.call(self, config);
      return Promise.resolve(config);
    });
  };
  var IsRoomOpened$1 = function IsRoomOpened(config) {
    var self = this;
    return this.getRoomDataRef(config.roomID).once('value').then(function (snapshot) {
      var metadata = snapshot.val();
      if (metadata === null) {
        // Can't find room
        return Promise.reject();
      }
      config.roomName = metadata.name;
      config.roomType = GetRoomType(metadata.filter);
      if (!self.isRoomOpened(metadata)) {
        return Promise.reject();
      } else {
        return Promise.resolve(metadata);
      }
    });
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Shuffles the contents of the given array using the Fisher-Yates implementation.
   *
   * The original array is modified directly and returned.
   *
   * @function Phaser.Utils.Array.Shuffle
   * @since 3.0.0
   *
   * @param {array} array - The array to shuffle. This array is modified in place.
   *
   * @return {array} The shuffled array.
   */
  var Shuffle = function Shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var JoinRandomRoom = function JoinRandomRoom(config) {
    if (config === undefined) {
      config = {};
    }
    var roomType = GetValue(config, 'roomType', '');
    var roomState = GetValue(config, 'door', 'open');
    var self = this;
    return this.getRoomList(roomType, roomState).then(function (rooms) {
      Shuffle(rooms);
      return JoinNextRoom.call(self, config, rooms, 0);
    });
  };
  var JoinNextRoom = function JoinNextRoom(config, rooms, index) {
    if (index === rooms.length) {
      return Promise.reject();
    }
    config.roomID = rooms[index].roomID;
    index++;
    var self = this;
    return this.joinRoom(config)["catch"](function () {
      return JoinNextRoom.call(self, config, rooms, index);
    });
  };

  var LeaveRoom$1 = function LeaveRoom() {
    if (!this.isInRoom()) {
      return Promise.resolve();
    }

    // 'userlist.leave' event -> 'room.leave' event -> then
    this.leftRoomFlag = true;
    if (this.isRemoveRoomWhenLeft) {
      // Remove room, include user list
      return this.removeRoom();
    } else {
      var prevRoomInfo = this.getRoomInfo();
      // Leave user list only        
      return this.userList.leave().then(function () {
        return Promise.resolve(prevRoomInfo);
      });
    }
  };

  var RemoveRoom = function RemoveRoom(roomID) {
    if (roomID === undefined) {
      roomID = this.roomID;
    }
    if (roomID === undefined) {
      return Promise.resolve();
    }
    var d = {};
    d["room-filter/".concat(roomID)] = null;
    d["room-data/".concat(roomID)] = null;
    d["rooms/".concat(roomID)] = null;
    var prevRoomInfo = this.getRoomInfo();
    return this.getRootRef().update(d).then(function () {
      return Promise.resolve(prevRoomInfo);
    });
  };

  var KickUser$1 = function KickUser(userID) {
    if (!this.userList.contains(userID)) {
      return Promise.resolve();
    } else if (userID === this.userID) {
      return this.leaveRoom();
    } else {
      // TODO: Who can kick user?
      return this.userList.leave(userID);
    }
  };

  var IsRoomOpened = function IsRoomOpened(metadata) {
    if (metadata == null) {
      return false;
    }
    var state = GetRoomState(metadata.filter);
    if (state === 'closed') {
      return false;
    }
    var userID = this.userID;
    var IsModerator = metadata.moderators.hasOwnProperty(userID);
    if (IsModerator) {
      return true;
    }
    switch (metadata.permission) {
      case 'black-list':
        var blackList = metadata['black-list'];
        return !(blackList && blackList.hasOwnProperty(userID));
      case 'white-list':
        var whiteList = metadata['white-list'];
        return whiteList && whiteList.hasOwnProperty(userID);
      default:
        // 'anyone'
        return true;
    }
  };

  var ChangeRoomState = function ChangeRoomState(roomID, roomState) {
    if (arguments.length === 1) {
      roomState = roomID;
      roomID = undefined;
    }
    if (roomID === undefined) {
      roomID = this.roomID;
    }
    var self = this;
    return this.hasRoom(roomID).then(function (hasRoom) {
      if (!hasRoom) {
        return Promise.resolve();
      }
      var filter = GetFilterString(roomState, self.roomType);
      var d = {};
      d["room-filters/".concat(roomID, "/filter")] = filter;
      d["room-data/".concat(roomID, "/filter")] = filter;
      return self.getRootRef().update(d);
    });
  };
  var OpenRoom = function OpenRoom(roomID) {
    return this.setRoomState(roomID, 'open');
  };
  var CloseRoom = function CloseRoom(roomID) {
    return this.setRoomState(roomID, 'closed');
  };

  var ChangeFilterData = function ChangeFilterData(roomID, filterData) {
    if (arguments.length === 1) {
      filterData = roomID;
      roomID = undefined;
    }
    if (roomID === undefined) {
      roomID = this.roomID;
    }
    var self = this;
    return this.hasRoom(roomID).then(function (hasRoom) {
      if (!hasRoom) {
        return Promise.resolve();
      }
      return self.getRoomFilterRef(roomID).child('data').update(filterData);
    });
  };

  var ChangeUserName$1 = function ChangeUserName(userName) {
    return this.userList.changeUserName(userName);
  };

  var ChangeRoomName = function ChangeRoomName(roomID, roomName) {
    if (arguments.length === 1) {
      roomName = roomID;
      roomID = undefined;
    }
    if (roomID === undefined) {
      roomID = this.roomID;
    }
    var self = this;
    return this.hasRoom(roomID).then(function (hasRoom) {
      if (!hasRoom) {
        return Promise.resolve();
      }
      var d = {};
      d["room-filters/".concat(roomID, "/name")] = roomName;
      d["room-data/".concat(roomID, "/name")] = roomName;
      return self.getRootRef().update(d);
    });
  };

  var GetUserList$1 = function GetUserList(roomID) {
    if (roomID === undefined) {
      return this.userList.getUsers();
    }
    var self = this;
    return new Promise(function (resolve, reject) {
      var userList = new ItemList({
        itemIDKey: 'joinAt',
        mode: 'once'
      });
      userList.once('update', function (users) {
        resolve(users);
      }).startUpdate(self.getUserListRef(roomID));
    });
  };

  var GetRoomList = function GetRoomList(roomType, roomState) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.roomList.once('roomlist.update', function (rooms) {
        resolve(rooms);
      }).startUpdate(self.getRoomListQuery(roomType, roomState));
    });
  };

  var HasRoom = function HasRoom(roomID) {
    if (roomID === this.roomID) {
      return Promise.resolve(true);
    }
    return this.getRoomDataRef(roomID).once('value').then(function (snapshot) {
      var hasRoom = snapshot.val() !== null;
      return Promise.resolve(hasRoom);
    });
  };

  var Methods$8 = {
    getRootRef: function getRootRef(childKey) {
      var ref = this.database.ref(this.rootPath);
      if (childKey) {
        ref = ref.child(childKey);
      }
      return ref;
    },
    getRoomRef: function getRoomRef(roomID, childKey) {
      var ref = this.getRootRef('rooms');
      if (roomID !== undefined) {
        ref = ref.child(roomID);
        if (childKey !== undefined) {
          ref = ref.child(childKey);
        }
      }
      return ref;
    },
    getRoomAliveRef: function getRoomAliveRef(roomID) {
      return this.getRoomRef(roomID, 'alive');
    },
    getUserListRef: function getUserListRef(roomID) {
      return this.getRoomRef(roomID, 'users');
    },
    getRoomFilterRef: function getRoomFilterRef(roomID) {
      var ref = this.getRootRef('room-filters');
      if (roomID !== undefined) {
        ref = ref.child(roomID);
      }
      return ref;
    },
    getRoomDataRef: function getRoomDataRef(roomID) {
      var ref = this.getRootRef('room-data');
      if (roomID !== undefined) {
        ref = ref.child(roomID);
      }
      return ref;
    },
    // TODO: ??
    getUserDataRef: function getUserDataRef(userID) {
      var ref = this.getRootRef('user-data');
      if (userID !== undefined) {
        ref = ref.child(userID);
      }
      return ref;
    },
    getRoomDataPath: function getRoomDataPath(roomID, childKey) {
      var path = "".concat(this.rootPath, "/rooms/").concat(roomID);
      if (childKey) {
        path += "/".concat(childKey);
      }
      return path;
    },
    getUserListPath: function getUserListPath(roomID) {
      return this.getRoomDataPath(roomID, 'users');
    },
    getItemTablePath: function getItemTablePath(roomID, key) {
      return "".concat(this.getRoomDataPath(roomID, 'tables'), "/").concat(key);
    },
    getRoomListQuery: function getRoomListQuery(roomType, roomState) {
      if (roomState === undefined) {
        roomState = 'open';
      }
      var query = this.getRoomFilterRef();
      query = query.orderByChild('filter');
      if (roomType === undefined) {
        query = query.startAt(roomState).endAt("".concat(roomState, "~"));
      } else {
        query = query.equalTo(GetFilterString(roomState, roomType));
      }
      return query;
    }
  };

  var Methods$7 = {
    createRoom: TryCreateRoom,
    createRandomRoom: CreateRandomRoom,
    joinRoom: TryJoinRoom,
    joinRandomRoom: JoinRandomRoom,
    leaveRoom: LeaveRoom$1,
    removeRoom: RemoveRoom,
    kickUser: KickUser$1,
    isRoomOpened: IsRoomOpened,
    changeRoomState: ChangeRoomState,
    changeFilterData: ChangeFilterData,
    changeUserName: ChangeUserName$1,
    changeRoomName: ChangeRoomName,
    openRoom: OpenRoom,
    closeRoom: CloseRoom,
    getUserList: GetUserList$1,
    getRoomList: GetRoomList,
    hasRoom: HasRoom
  };
  Object.assign(Methods$7, Methods$8);

  var Room = /*#__PURE__*/function () {
    function Room(config) {
      _classCallCheck(this, Room);
      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this.database = firebase.database();
      this.rootPath = GetValue(config, 'root', '');

      // User properties
      this.userInfo = {
        userID: '',
        userName: ''
      };
      this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
      // Room properties
      this.isRoomCreator = false;
      this.roomID = undefined;
      this.roomName = undefined;
      this.roomType = undefined;
      this.doorState = undefined;
      this.leftRoomFlag = false;
      this.isRemoveRoomWhenLeft = undefined;
      // User list
      this.userList = CreateUserList$1.call(this, config);
      // Room list
      this.roomList = CreateRoomList.call(this, config);
      // Broadcast
      this.broadcast = CreateBroadcast$1.call(this, config);
      // Item tables
      this.tables = CreateTables$1.call(this, config);
    }
    _createClass(Room, [{
      key: "shutdown",
      value: function shutdown() {
        var self = this;
        this.destroyEventEmitter().leaveRoom().then(function () {
          self.userList.destroy();
          self.userList = undefined;
          self.roomList.destroy();
          self.roomList = undefined;
          self.broadcast.destroy();
          self.broadcast = undefined;
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "userID",
      get: function get() {
        return this.userInfo.userID;
      },
      set: function set(value) {
        this.userInfo.userID = value;
      }
    }, {
      key: "userName",
      get: function get() {
        return this.userInfo.userName;
      },
      set: function set(value) {
        this.userInfo.userName = value;
      }
    }, {
      key: "getRoomInfo",
      value: function getRoomInfo(roomID, roomName) {
        if (roomID === undefined) {
          roomID = this.roomID;
        }
        if (roomName === undefined) {
          roomName = this.roomName;
        }
        return {
          roomID: roomID,
          roomName: roomName
        };
      }
    }, {
      key: "setUser",
      value: function setUser(userID, userName) {
        if (IsPlainObject(userID)) {
          this.userInfo = userID;
        } else {
          this.userID = userID;
          this.userName = userName;
        }
        return this;
      }
    }, {
      key: "isInRoom",
      value: function isInRoom(roomID) {
        return roomID === undefined ? this.roomID !== undefined : this.roomID === roomID;
      }
    }, {
      key: "isFull",
      value: function isFull() {
        return this.userList.isFull();
      }
    }, {
      key: "isFirstUser",
      value: function isFirstUser(userID) {
        return this.userList.isFirstUser(userID);
      }
    }, {
      key: "getUsers",
      value: function getUsers() {
        return this.userList.getUsers();
      }
    }, {
      key: "maxUsers",
      get: function get() {
        return this.userList.maxUsers;
      }
    }, {
      key: "getTable",
      value: function getTable(key) {
        return this.tables[key];
      }
    }]);
    return Room;
  }();
  Object.assign(Room.prototype, EventEmitterMethods, Methods$7);

  ObjectFactory.register('room', function (config) {
    return new Room(config);
  });
  SetValue(window, 'RexPlugins.Fire.Room', Room);

  var CreateUserList = function CreateUserList(config) {
    var userList = new OnlineUserList({
      eventEmitter: this.getEventEmitter(),
      eventNames: {
        join: 'userlist.join',
        // Any user join
        leave: 'userlist.leave',
        // Any user leave
        update: 'userlist.update',
        // Update user list
        change: 'userlist.change',
        // Any user(name) change
        init: 'userlist.init',
        changename: 'userlist.changename'
      },
      root: this.getUserListPath(),
      userID: this.userInfo,
      maxUsers: GetValue(config, 'maxUsers', 0)
    });
    userList.on('userlist.leave', function (user) {
      if (user.userID === this.userID) {
        OnLeftRoom.call(this); // Current user is left or kicked
      }
    }, this);
    this.on('room.join', function () {
      userList.startUpdate();
    }).on('room.leave', function () {
      userList.stopUpdate().clear();
    });
    return userList;
  };
  var OnLeftRoom = function OnLeftRoom() {
    this.emit('room.leave');

    // Clear room info later
    var self = this;
    setTimeout(function () {
      self.leftRoomFlag = false;
    }, 0);
  };

  var CreateBroadcast = function CreateBroadcast(config) {
    var broadcastConfig = GetValue(config, 'broadcast', true);
    if (!broadcastConfig) {
      return null;
    }
    var broadcast = new Broadcast({
      eventEmitter: this.getEventEmitter(),
      eventNames: {
        receive: 'broadcast.receive'
      },
      root: this.rootPath,
      receiverID: 'broadcast',
      senderID: this.userInfo,
      history: GetValue(broadcastConfig, 'history', false)
    });
    this.on('room.join', function () {
      broadcast.startReceiving();
    }).on('room.leave', function () {
      broadcast.stopReceiving();
    }).on('userlist.changename', function (userID, userName) {
      broadcast.changeUserName(userID, userName);
    }, this);
    return broadcast;
  };

  var CreateTables = function CreateTables(config) {
    var tablesConfig = GetValue(config, 'tables', undefined);
    if (tablesConfig === undefined) {
      return {};
    }
    var tableConfig;
    var tables = {};
    for (var i = 0, cnt = tablesConfig.length; i < cnt; i++) {
      tableConfig = tablesConfig[i];
      tables[tableConfig.key] = CreateTable.call(this, tableConfig);
    }
    return tables;
  };
  var CreateTable = function CreateTable(config) {
    var key = config.key;
    var table = new ItemTable({
      eventEmitter: this.getEventEmitter(),
      root: this.getItemTablePath(key),
      type: GetValue(config, 'type', 1),
      eventNames: {
        init: "tables.".concat(key, ".init"),
        update: "tables.".concat(key, ".update"),
        addkey0: "tables.".concat(key, ".addkey0"),
        removekey0: "tables.".concat(key, ".removekey0"),
        changekey0: "tables.".concat(key, ".changekey0"),
        addkey1: "tables.".concat(key, ".addkey1"),
        removekey1: "tables.".concat(key, ".removekey1"),
        changekey1: "tables.".concat(key, ".changekey1"),
        addkey2: "tables.".concat(key, ".addkey2"),
        removekey2: "tables.".concat(key, ".removekey2"),
        changekey2: "tables.".concat(key, ".changekey2")
      }
    });
    this.on('room.join', function () {
      table.startUpdate();
    }).on('room.leave', function () {
      table.clear().stopUpdate();
    });
    return table;
  };

  var JoinRoom = function JoinRoom() {
    var self = this;
    return this.userList.join().then(function () {
      self.emit('room.join');
      return Promise.resolve();
    });
  };

  var LeaveRoom = function LeaveRoom() {
    if (!this.isInRoom()) {
      return Promise.resolve();
    }

    // 'userlist.leave' event -> 'room.leave' event -> then
    this.leftRoomFlag = true;
    return this.userList.leave();
  };

  var KickUser = function KickUser(userID) {
    if (!this.userList.contains(userID)) {
      return Promise.resolve();
    } else if (userID === this.userID) {
      return this.leaveRoom();
    } else {
      // TODO: Who can kick user?
      return this.userList.leave(userID);
    }
  };

  var ChangeUserName = function ChangeUserName(userName) {
    return this.userList.changeUserName(userName);
  };

  var GetUserList = function GetUserList() {
    return this.userList.getUsers();
  };

  var Methods$6 = {
    getRoomRef: function getRoomRef(childKey) {
      var ref = this.database.ref(this.rootPath);
      if (childKey) {
        ref = ref.child(childKey);
      }
      return ref;
    },
    getUserListRef: function getUserListRef() {
      return this.getRoomRef('users');
    },
    getRoomDataPath: function getRoomDataPath(childKey) {
      var path = this.rootPath;
      if (childKey) {
        path += "/".concat(childKey);
      }
      return path;
    },
    getUserListPath: function getUserListPath() {
      return this.getRoomDataPath('users');
    },
    getItemTablePath: function getItemTablePath(key) {
      return "".concat(this.getRoomDataPath('tables'), "/").concat(key);
    }
  };

  var Methods$5 = {
    joinRoom: JoinRoom,
    leaveRoom: LeaveRoom,
    kickUser: KickUser,
    changeUserName: ChangeUserName,
    getUserList: GetUserList
  };
  Object.assign(Methods$5, Methods$6);

  var SingleRoom = /*#__PURE__*/function () {
    function SingleRoom(config) {
      _classCallCheck(this, SingleRoom);
      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this.database = firebase.database();
      this.rootPath = GetValue(config, 'root', '');

      // User properties
      this.userInfo = {
        userID: '',
        userName: ''
      };
      this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
      // Room properties
      this.leftRoomFlag = false;
      // User list
      this.userList = CreateUserList.call(this, config);
      // Broadcast
      this.broadcast = CreateBroadcast.call(this, config);
      // Item tables
      this.tables = CreateTables.call(this, config);
    }
    _createClass(SingleRoom, [{
      key: "shutdown",
      value: function shutdown() {}
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "userID",
      get: function get() {
        return this.userInfo.userID;
      },
      set: function set(value) {
        this.userInfo.userID = value;
      }
    }, {
      key: "userName",
      get: function get() {
        return this.userInfo.userName;
      },
      set: function set(value) {
        this.userInfo.userName = value;
      }
    }, {
      key: "setUser",
      value: function setUser(userID, userName) {
        if (IsPlainObject(userID)) {
          this.userInfo = userID;
        } else {
          this.userID = userID;
          this.userName = userName;
        }
        return this;
      }
    }, {
      key: "isInRoom",
      value: function isInRoom() {
        return this.userList.isInList;
      }
    }, {
      key: "isFull",
      value: function isFull() {
        return this.userList.isFull();
      }
    }, {
      key: "isFirstUser",
      value: function isFirstUser(userID) {
        return this.userList.isFirstUser(userID);
      }
    }, {
      key: "getUsers",
      value: function getUsers() {
        return this.userList.getUsers();
      }
    }, {
      key: "maxUsers",
      get: function get() {
        return this.userList.maxUsers;
      }
    }, {
      key: "getTable",
      value: function getTable(key) {
        return this.tables[key];
      }
    }]);
    return SingleRoom;
  }();
  Object.assign(SingleRoom.prototype, EventEmitterMethods, Methods$5);

  ObjectFactory.register('singleRoom', function (config) {
    return new SingleRoom(config);
  });
  SetValue(window, 'RexPlugins.Fire.SingleRoom', SingleRoom);

  ObjectFactory.register('itemTable', function (config) {
    return new ItemTable(config);
  });
  SetValue(window, 'RexPlugins.Fire.ItemTable', ItemTable);

  var Query = function Query(config) {
    if (config.totalLines === undefined) {
      config.totalLines = Infinity;
    }
    if (config.linesPerPage === undefined) {
      config.linesPerPage = 1000;
    }
    config.remainderLines = config.totalLines;
    return QueryNextPage(config);
  };
  var QueryNextPage = function QueryNextPage(config) {
    var query = config.query;
    if (config.startDocRef) {
      query = query[config.startMode](config.startDocRef);
    }
    var lineCount = Math.min(config.remainderLines, config.linesPerPage);
    config.remainderLines -= lineCount;
    return query.limit(lineCount).get().then(function (querySnapshot) {
      var done = config.remainderLines === 0 || querySnapshot.size < lineCount; // Is last page
      if (config.forEachPageCallback) {
        done |= !!config.forEachPageCallback(querySnapshot);
      }
      if (done) {
        var out;
        if (config.resolveCallback) {
          out = config.resolveCallback();
        }
        return Promise.resolve(out);
      } else {
        config.startDocRef = querySnapshot.docs[querySnapshot.size - 1];
        config.startMode = 'startAfter';
        return QueryNextPage(config);
      }
    });
  };

  var Load$1 = function Load(query, count, skip, startDocRef, startMode) {
    if (count === undefined) {
      count = Infinity;
    }
    if (skip === undefined) {
      skip = 0;
    }
    var out = [];
    var startIndex = 0;
    return Query({
      query: query,
      totalLines: skip + count,
      startDocRef: startDocRef,
      startMode: startMode,
      forEachPageCallback: function forEachPageCallback(querySnapshot) {
        var validDocs;
        var docCount = querySnapshot.size;
        var localStart = skip - startIndex;
        if (localStart <= 0) {
          validDocs = querySnapshot.docs;
        } else if (localStart < docCount) {
          validDocs = querySnapshot.docs.slice(localStart, docCount);
        }
        if (validDocs) {
          out.push.apply(out, _toConsumableArray(validDocs));
        }
        startIndex += docCount;
      },
      resolveCallback: function resolveCallback() {
        return out;
      }
    });
  };

  var LoadFirstPage = function LoadFirstPage() {
    var callback = this.dataMode === 0 ? LoadStaticPage$3 : LoadDynamicPage$3;
    return callback.call(this);
  };
  var LoadStaticPage$3 = function LoadStaticPage() {
    var self = this;
    return Load$1(this.nextQuery, this.itemCount, 0, this.baselineDocRef, this.baselineMode).then(function (docs) {
      var docCount = docs.length;
      self.cacheItems = docs;
      self.pageIndex = 0;
      self.startItemIndex = 0;
      self.endItemIndex = self.startItemIndex + docCount - 1;
      self.isFullPage = docCount === self.itemCount;
      // Doc reference for paging
      self.prevPageEndDocRef = undefined;
      self.currPageStartDocRef = docs[0];
      self.currPageEndDocRef = docs[docCount - 1];
      return Promise.resolve(self.cacheItems);
    });
  };
  var LoadDynamicPage$3 = function LoadDynamicPage() {
    var self = this;
    return Load$1(this.nextQuery, this.itemCount, 0, this.baselineDocRef, this.baselineMode).then(function (docs) {
      var docCount = docs.length;
      self.cacheItems = docs;
      self.pageIndex = 0;
      self.startItemIndex = 0;
      self.endItemIndex = self.startItemIndex + docCount - 1;
      self.isFullPage = docCount === self.itemCount;
      return Promise.resolve(self.cacheItems);
    });
  };

  var LoadNextPage = function LoadNextPage() {
    if (this.pageIndex === undefined) {
      return this.loadFirstPage();
    }
    var callback = this.dataMode === 0 ? LoadStaticPage$2 : LoadDynamicPage$2;
    return callback.call(this);
  };
  var LoadStaticPage$2 = function LoadStaticPage() {
    var self = this;
    return Load$1(this.nextQuery, this.itemCount, 0, this.currPageEndDocRef, 'startAfter').then(function (docs) {
      var docCount = docs.length;
      self.cacheItems = docs;
      self.pageIndex += 1;
      self.startItemIndex = self.endItemIndex + 1;
      self.endItemIndex = self.startItemIndex + docCount - 1;
      self.isFullPage = docCount === self.itemCount;
      // Doc reference for paging
      self.prevPageEndDocRef = self.currPageEndDocRef;
      self.currPageStartDocRef = docs[0];
      self.currPageEndDocRef = docs[docCount - 1];
      return Promise.resolve(self.cacheItems);
    });
  };
  var LoadDynamicPage$2 = function LoadDynamicPage() {
    var skip = (this.pageIndex + 1) * this.itemCount;
    var self = this;
    return Load$1(this.nextQuery, this.itemCount, skip, this.baselineDocRef, this.baselineMode).then(function (docs) {
      var docCount = docs.length;
      self.cacheItems = docs;
      self.pageIndex += 1;
      self.startItemIndex = self.endItemIndex + 1;
      self.endItemIndex = self.startItemIndex + docCount - 1;
      self.isFullPage = docCount === self.itemCount;
      return Promise.resolve(self.cacheItems);
    });
  };

  var LoadPreviousPage = function LoadPreviousPage() {
    if (this.pageIndex === undefined || this.pageIndex === 1) {
      return this.loadFirstPage();
    }
    var callback = this.dataMode === 0 ? LoadStaticPage$1 : LoadDynamicPage$1;
    return callback.call(this);
  };
  var LoadStaticPage$1 = function LoadStaticPage() {
    var self = this;
    return Load$1(this.prevQuery, this.itemCount + 1, 0, this.currPageStartDocRef, 'startAfter').then(function (docs) {
      // Get one more document for previous page end
      var docCount = docs.length - 1;
      self.cacheItems = docs;
      self.cacheItems.pop(); // Pop up endDoc of previous page
      self.cacheItems.reverse();
      self.pageIndex -= 1;
      self.endItemIndex = self.startItemIndex - 1;
      self.startItemIndex = self.endItemIndex - docCount + 1;
      self.isFullPage = docCount === self.itemCount;
      // Doc reference for paging
      self.prevPageEndDocRef = docs[docCount];
      self.currPageStartDocRef = docs[docCount - 1];
      self.currPageEndDocRef = docs[0];
      return Promise.resolve(self.cacheItems);
    });
  };
  var LoadDynamicPage$1 = function LoadDynamicPage() {
    var skip = (this.pageIndex - 1) * this.itemCount;
    var self = this;
    return Load$1(this.nextQuery, this.itemCount, skip, this.baselineDocRef, this.baselineMode).then(function (docs) {
      // Get one more document for previous page end
      var docCount = docs.length;
      self.cacheItems = docs;
      self.pageIndex -= 1;
      self.endItemIndex = self.startItemIndex - 1;
      self.startItemIndex = self.endItemIndex - docCount + 1;
      self.isFullPage = docCount === self.itemCount;
      return Promise.resolve(self.cacheItems);
    });
  };

  var LoadCurrentPage = function LoadCurrentPage() {
    if (this.pageIndex === undefined || this.pageIndex === 0) {
      return this.loadFirstPage();
    }
    var callback = this.dataMode === 0 ? LoadStaticPage : LoadDynamicPage;
    return callback.call(this);
  };
  var LoadStaticPage = function LoadStaticPage() {
    var self = this;
    return Load$1(this.nextQuery, this.itemCount, 0, this.prevPageEndDocRef, 'startAfter').then(function (docs) {
      var docCount = docs.length;
      self.cacheItems = docs;
      self.endItemIndex = self.startItemIndex + docCount - 1;
      self.isFullPage = docCount === self.itemCount;
      // Doc reference for paging
      self.currPageStartDocRef = docs[0];
      self.currPageEndDocRef = docs[docCount - 1];
      return Promise.resolve(self.cacheItems);
    });
  };
  var LoadDynamicPage = function LoadDynamicPage() {
    var skip = this.pageIndex * this.itemCount;
    var self = this;
    return Load$1(this.nextQuery, this.itemCount, skip, this.baselineDocRef, this.baselineMode).then(function (docs) {
      var docCount = docs.length;
      self.cacheItems = docs;
      self.endItemIndex = self.startItemIndex + docCount - 1;
      self.isFullPage = docCount === self.itemCount;
      return Promise.resolve(self.cacheItems);
    });
  };

  var LoadInRange = function LoadInRange(count, skip) {
    if (skip === undefined) {
      skip = 0;
    }
    var self = this;
    return Load$1(this.nextQuery, count, skip, this.baselineDocRef, this.baselineMode).then(function (docs) {
      var docCount = docs.length;
      self.cacheItems = docs;
      self.pageIndex = undefined; // Not in Page mode
      self.startItemIndex = skip;
      self.endItemIndex = self.startItemIndex + docCount - 1;
      self.isFullPage = count === undefined ? true : docCount === count;
      return Promise.resolve(self.cacheItems);
    });
  };

  var PageLoader = /*#__PURE__*/function () {
    function PageLoader(config) {
      _classCallCheck(this, PageLoader);
      this.setItemCount(GetValue(config, 'itemCount', 100));
      this.setQuery(GetValue(config, 'query', undefined));
      this.setDataMode(GetValue(config, 'dataMode', 0));
      this.setBaselineDoc(GetValue(config, 'baselineDoc', undefined), GetValue(config, 'baselineMode', undefined));
      this.pageIndex = undefined;
      this.baselineDocRef = undefined;
      this.baselineMode = 'startAt';
      this.startItemIndex = undefined;
      this.endItemIndex = undefined;
      this.cacheItems = undefined;
      this.isFullPage = undefined;
    }
    _createClass(PageLoader, [{
      key: "setItemCount",
      value: function setItemCount(count) {
        this.itemCount = count;
        return this;
      }
    }, {
      key: "setQuery",
      value: function setQuery(nextQuery, prevQuery) {
        if (IsPlainObject(nextQuery)) {
          var config = nextQuery;
          this.nextQuery = config.next;
          this.prevQuery = config.previous;
        } else {
          this.nextQuery = nextQuery;
          this.prevQuery = prevQuery;
        }
        this.pageIndex = undefined;
        this.isFullPage = undefined;
        return this;
      }
    }, {
      key: "setDataMode",
      value: function setDataMode(mode) {
        if (typeof mode === 'string') {
          mode = DATAMODE[mode];
        }
        this.dataMode = mode;
        return this;
      }
    }, {
      key: "setBaselineDoc",
      value: function setBaselineDoc(doc, mode) {
        if (doc) {
          this.baselineDocRef = doc.ref;
          this.baselineMode = mode; // 'startAt' or 'startAfter'
        } else {
          this.baselineDocRef = undefined;
        }
        return this;
      }
    }]);
    return PageLoader;
  }();
  var methods$4 = {
    loadFirstPage: LoadFirstPage,
    loadNextPage: LoadNextPage,
    loadPreviousPage: LoadPreviousPage,
    loadCurrentPage: LoadCurrentPage,
    load: LoadInRange
  };
  Object.assign(PageLoader.prototype, methods$4);
  var DATAMODE = {
    "static": 0,
    dynamic: 1
  };

  ObjectFactory.register('pageLoader', function (config) {
    return new PageLoader(config);
  });
  SetValue(window, 'RexPlugins.Fire.PageLoader', PageLoader);

  var DocToHeader$1 = function DocToHeader(doc) {
    var header = doc.data();
    header.headerDocID = doc.id;
    return header;
  };

  // Internal used
  var LoadHeader$1 = function LoadHeader(fileID) {
    var userID = this.userID;
    var header = this.cacheHeaders[fileID];
    if (header && header.userID === userID) {
      return Promise.resolve(header);
    }

    // Can't find in cache headers, load from firestore    
    var self = this;
    return this.getFileQuery(userID, fileID, 'header').limit(1).get().then(function (querySnapshot) {
      var header = undefined;
      if (querySnapshot.size > 0) {
        var doc = querySnapshot.docs[0];
        header = DocToHeader$1(doc);
        self.cacheHeaders[fileID] = header; // Cache it
      }
      return Promise.resolve(header);
    });
  };

  var Save = function Save(fileID, header, content, updateMode) {
    if (typeof content === 'boolean') {
      updateMode = content;
      content = undefined;
    }
    if (updateMode === undefined) {
      updateMode = false;
    }
    var userID = this.userID;
    if (header === undefined) {
      header = {};
    }
    header.userID = userID;
    header.fileID = fileID;
    header.type = 'header';
    if (content) {
      content.userID = userID;
      content.fileID = fileID;
      content.type = 'content';
    }
    var writeCommand = updateMode ? 'update' : 'set';
    var self = this;
    return LoadHeader$1.call(this, fileID) // Try load header
    .then(function (prevHeader) {
      var headerDocRef, contentDocRef;
      if (prevHeader) {
        // Overwrite file
        headerDocRef = self.rootRef.doc(prevHeader.headerDocID);
        if (content) {
          if (prevHeader.contentDocID) {
            contentDocRef = self.rootRef.doc(prevHeader.contentDocID);
          } else {
            contentDocRef = self.rootRef.doc();
          }
        }
      } else {
        // Add new file
        headerDocRef = self.rootRef.doc();
        if (content) {
          contentDocRef = self.rootRef.doc();
        }
      }

      // Don't save headerDocID to server
      if (header.hasOwnProperty('headerDocID')) {
        delete header.headerDocID;
      }
      // Save contentDocID
      if (contentDocRef) {
        header.contentDocID = contentDocRef.id;
      }
      var batch = self.database.batch();
      batch[writeCommand](headerDocRef, header);
      if (content) {
        batch[writeCommand](contentDocRef, content);
      }
      return batch.commit();
    }).then(function () {
      return Promise.resolve({
        userID: userID,
        fileID: fileID
      });
    })["catch"](function (error) {
      return Promise.reject({
        error: error,
        userID: userID,
        fileID: fileID
      });
    });
  };

  var Load = function Load(fileID) {
    var userID = this.userID;
    return this.getFileQuery(userID, fileID).get().then(function (querySnapshot) {
      var header, content;
      querySnapshot.forEach(function (doc) {
        switch (docData.type) {
          case 'header':
            header = DocToHeader$1(doc);
            break;
          case 'content':
            content = doc.data();
            break;
        }
      });
      return Promise.resolve({
        userID: userID,
        fileID: fileID,
        header: header,
        content: content
      });
    })["catch"](function () {
      return Promise.reject({
        error: error,
        userID: userID,
        fileID: fileID
      });
    });
  };

  var LoadHeaders = function LoadHeaders() {
    var userID = this.userID;
    var self = this;
    return this.getFileQuery(userID, undefined, 'header').get().then(function (querySnapshot) {
      var header;
      Clear$1(self.cacheHeaders);
      querySnapshot.forEach(function (doc) {
        header = DocToHeader$1(doc);
        self.cacheHeaders[header.fileID] = header;
      });
      return Promise.resolve({
        userID: userID,
        headers: self.cacheHeaders
      });
    })["catch"](function () {
      return Promise.reject({
        error: error,
        userID: userID
      });
    });
  };

  var Delete$1 = function Delete(fileID) {
    var userID = this.userID;
    var self = this;
    return LoadHeader.call(this, fileID) // Try load header
    .then(function (prevHeader) {
      if (!prevHeader) {
        // File dose not exist
        return Promise.resolve({
          userID: userID,
          fileID: fileID
        });
      }
      var batch = self.database.batch();
      batch["delete"](self.rootRef.doc(prevHeader.headerDocID));
      if (prevHeader.contentDocID) {
        batch["delete"](self.rootRef.doc(prevHeader.contentDocID));
      }
      return batch.commit();
    }).then(function () {
      if (self.cacheHeaders.hasOwnProperty(fileID)) {
        delete self.cacheHeaders[fileID];
      }
      return Promise.resolve({
        userID: userID,
        fileID: fileID
      });
    })["catch"](function (error) {
      return Promise.reject({
        error: error,
        userID: userID,
        fileID: fileID
      });
    });
  };

  var Clear = function Clear() {
    var userID = this.userID;
    var self = this;
    return this.getFileQuery(userID, undefined, 'header').get().then(function (querySnapshot) {
      var batch = self.database.batch();
      var header;
      querySnapshot.forEach(function (doc) {
        header = DocToHeader(doc);
        batch["delete"](self.rootRef.doc(header.headerDocID));
        if (header.contentDocID) {
          batch["delete"](self.rootRef.doc(header.contentDocID));
        }
      });
      return batch.commit();
    }).then(function () {
      self.clearCache();
      return Promise.resolve({
        userID: userID
      });
    })["catch"](function (error) {
      return Promise.reject({
        error: error,
        userID: userID
      });
    });
  };

  var Files = /*#__PURE__*/function () {
    function Files(config) {
      _classCallCheck(this, Files);
      this.database = firebase.firestore();
      this.setRootPath(GetValue(config, 'root', ''));
      this.cacheHeaders = {};

      // Owner
      this.userInfo = {
        userID: ''
      };
      this.setOwner(GetValue(config, 'userID', ''));
    }
    _createClass(Files, [{
      key: "shutdown",
      value: function shutdown() {}
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "userID",
      get: function get() {
        return this.userInfo.userID;
      },
      set: function set(value) {
        this.userInfo.userID = value;
      }
    }, {
      key: "setRootPath",
      value: function setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
      }
    }, {
      key: "setOwner",
      value: function setOwner(userID) {
        var prevUserID = this.userID;
        if (IsPlainObject(userID)) {
          this.userInfo = userID;
        } else {
          this.userID = userID;
        }
        if (prevUserID !== this.userID) {
          this.clearCache();
        }
        return this;
      }
    }, {
      key: "clearCache",
      value: function clearCache() {
        Clear$1(this.cacheHeaders);
        return this;
      }
    }, {
      key: "getFileQuery",
      value: function getFileQuery(userID, fileID, type) {
        var query = this.rootRef;
        query = userID ? query.where('userID', '==', userID) : query;
        query = fileID ? query.where('fileID', '==', fileID) : query;
        query = type ? query.where('type', '==', type) : query;
        return query;
      }
    }]);
    return Files;
  }();
  var methods$3 = {
    save: Save,
    load: Load,
    loadHeaders: LoadHeaders,
    "delete": Delete$1,
    clear: Clear
  };
  Object.assign(Files.prototype, methods$3);

  ObjectFactory.register('files', function (config) {
    return new Files(config);
  });
  SetValue(window, 'RexPlugins.Fire.Files', Files);

  var Add$1 = function Add(id, alias) {
    var self = this;
    return this.database.runTransaction(function (transaction) {
      var aliasRef = self.getAliasRef(alias);
      return transaction.get(aliasRef).then(function (doc) {
        if (!doc.exists) {
          transaction.set(aliasRef, {
            id: id
          });
          return Promise.resolve({
            id: id,
            alias: alias
          });
        } else {
          return Promise.reject({
            id: id,
            alias: alias
          });
        }
      });
    });
  };

  var Add = function Add(id, alias) {
    var self = this;
    return this.getAlias(id).then(function (result) {
      if (result.alias) {
        if (result.alias === alias) {
          return Promise.resolve({
            id: id,
            alias: alias
          });
        } else {
          return Promise.reject({
            id: id,
            alias: alias
          });
        }
      } else {
        return Add$1.call(self, id, alias);
      }
    });
  };

  var TryAdd = function TryAdd(id, digits, candidates, retry) {
    var alias = GetRandomWord(digits, digits, candidates);
    if (retry <= 0) {
      return Promise.reject({
        id: id,
        alias: alias
      });
    }
    retry--;
    var self = this;
    return Add$1.call(self, id, alias)["catch"](function () {
      setTimeout(function () {
        return TryAdd.call(self, id, digits, candidates, retry);
      }, 0);
    });
  };

  var AddRandom = function AddRandom(id, config) {
    var digits = GetValue(config, 'digits', 10);
    var candidates = GetValue(config, 'candidates', '0123456789');
    var retry = GetValue(config, 'retry', 1000);
    var self = this;
    return this.getAlias(id).then(function (result) {
      if (result.alias) {
        var alias = GetRandomWord(digits, digits, candidates);
        if (result.alias === alias) {
          return Promise.resolve({
            id: id,
            alias: alias
          });
        } else {
          return Promise.reject({
            id: id,
            alias: alias
          });
        }
      } else {
        return TryAdd.call(self, id, digits, candidates, retry);
      }
    });
  };

  var GetId = function GetId(alias) {
    return this.getAliasRef(alias).get().then(function (doc) {
      var id;
      if (doc.exists) {
        id = doc.data().id;
      }
      return Promise.resolve({
        id: id,
        alias: alias
      });
    });
  };

  var GetAlias = function GetAlias(id) {
    return this.rootRef.where('id', '==', id).limit(1).get().then(function (querySnapshot) {
      var alias;
      if (querySnapshot.size > 0) {
        var doc = querySnapshot.docs[0];
        alias = doc.id;
      }
      return Promise.resolve({
        id: id,
        alias: alias
      });
    });
  };

  var GetRandomAlias = function GetRandomAlias(id, config) {
    var digits = GetValue(config, 'digits', 10);
    var candidates = GetValue(config, 'candidates', '0123456789');
    var retry = GetValue(config, 'retry', 1000);
    var self = this;
    return this.getAlias(id).then(function (result) {
      if (result.alias) {
        return Promise.resolve(result);
      } else {
        return TryAdd.call(self, id, digits, candidates, retry);
      }
    });
  };

  var Remove = function Remove(id) {
    var self = this;
    return this.getAlias(id).then(function (alias) {
      return self.getAliasRef(alias)["delete"]();
    });
  };

  var IdAlias = /*#__PURE__*/function () {
    function IdAlias(config) {
      _classCallCheck(this, IdAlias);
      this.database = firebase.firestore();
      this.setRootPath(GetValue(config, 'root', ''));
    }
    _createClass(IdAlias, [{
      key: "shutdown",
      value: function shutdown() {}
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "setRootPath",
      value: function setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
      }
    }, {
      key: "getAliasRef",
      value: function getAliasRef(alias) {
        return this.rootRef.doc(alias);
      }
    }]);
    return IdAlias;
  }();
  var methods$2 = {
    add: Add,
    addRandom: AddRandom,
    getId: GetId,
    getAlias: GetAlias,
    getRandomAlias: GetRandomAlias,
    remove: Remove
  };
  Object.assign(IdAlias.prototype, methods$2);

  ObjectFactory.register('idAlias', function (config) {
    return new IdAlias(config);
  });
  SetValue(window, 'RexPlugins.Fire.IdAlias', IdAlias);

  var GetTime = function GetTime(timeStamp) {
    var date = timeStamp ? new Date(timeStamp) : new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var Jan1st = new Date(date.getFullYear(), 0, 1);
    var w = Math.ceil(((date - Jan1st) / 86400000 + Jan1st.getDay() + 1) / 7);
    return {
      d: "".concat(y, "-").concat(m, "-").concat(d),
      // day filter
      w: "".concat(y, "-").concat(w),
      // week filter
      m: "".concat(y, "-").concat(m),
      // month filter
      y: "".concat(y),
      // year filter
      a: '' // all-time filter
    };
  };

  var TimeTagKeys = {
    d: 'tagD',
    w: 'tagW',
    m: 'tagM',
    y: 'tagY',
    a: 'tagA'
  };
  var ScoreKeys = {
    d: 'scoreD',
    w: 'scoreW',
    m: 'scoreM',
    y: 'scoreY',
    a: 'scoreA'
  };

  var Post = function Post(score, extraData, timeStamp) {
    var newRecord = {
      userID: this.userID
    };
    if (this.boardID !== undefined) {
      newRecord.boardID = this.boardID;
    }
    if (this.userName) {
      newRecord.userName = this.userName;
    }
    var curTimeData = GetTime(timeStamp);
    if (this.timeFilters !== false) {
      for (var t in this.timeFilters) {
        if (!this.timeFilters[t]) {
          continue;
        }
        newRecord[TimeTagKeys[t]] = curTimeData[t];
        newRecord[ScoreKeys[t]] = score;
      }
    } else {
      // No time filters
      newRecord.score = score;
    }
    if (this.tag) {
      newRecord.tag = this.tag;
    }
    if (extraData) {
      Object.assign(newRecord, extraData);
    }
    var self = this;
    return this.getMyRecordQuery().get().then(function (querySnapshot) {
      var prevRecord, docID;
      if (querySnapshot.size > 0) {
        var doc = querySnapshot.docs[0];
        prevRecord = doc.data();
        docID = doc.id;
      }
      if (prevRecord) {
        if (self.timeFilters !== false) {
          for (var t in self.timeFilters) {
            if (!self.timeFilters[t]) {
              continue;
            }
            var timeTagKey = TimeTagKeys[t];
            if (prevRecord[timeTagKey] === newRecord[timeTagKey]) {
              var scoreKey = ScoreKeys[t];
              newRecord[scoreKey] = Math.max(prevRecord[scoreKey], newRecord[scoreKey]);
            }
          }
        } else {
          // No time filters
          newRecord.score = Math.max(prevRecord.score, newRecord.score);
        }
      }
      if (docID === undefined) {
        docID = self.rootRef.doc().id;
      }
      return self.rootRef.doc(docID).set(newRecord);
    });
  };

  var Methods$4 = {
    loadFirstPage: function loadFirstPage() {
      this.resetPageQuery();
      var self = this;
      return this.page.loadFirstPage().then(function (docs) {
        return Promise.resolve(DocsToDataArray.call(self, docs));
      });
    },
    loadNextPage: function loadNextPage() {
      this.resetPageQuery();
      var self = this;
      return this.page.loadNextPage().then(function (docs) {
        return Promise.resolve(DocsToDataArray.call(self, docs));
      });
    },
    loadPreviousPage: function loadPreviousPage() {
      this.resetPageQuery();
      var self = this;
      return this.page.loadPreviousPage().then(function (docs) {
        return Promise.resolve(DocsToDataArray.call(self, docs));
      });
    },
    loadCurrentPage: function loadCurrentPage() {
      this.resetPageQuery();
      var self = this;
      return this.page.loadCurrentPage().then(function (docs) {
        return Promise.resolve(DocsToDataArray.call(self, docs));
      });
    },
    load: function load(count, skip) {
      this.resetPageQuery();
      var self = this;
      return this.page.load(count, skip).then(function (docs) {
        return Promise.resolve(DocsToDataArray.call(self, docs));
      });
    },
    resetPageQuery: function resetPageQuery() {
      if (!this.resetQueryFlag) {
        return this;
      }
      this.resetQueryFlag = false;
      this.page.setQuery(this.getPageQuery());
      return this;
    }
  };
  var DocsToDataArray = function DocsToDataArray(docs) {
    var items = [],
      item;
    var scoreKey = ScoreKeys[this.timeFilterType[0]];
    for (var i = 0, cnt = docs.length; i < cnt; i++) {
      item = docs[i].data();
      if (this.timeFilters !== false) {
        item.score = item[scoreKey];
        // Remove timeFilterKeys, and scoreKeys
        for (var t in this.timeFilters) {
          delete item[TimeTagKeys[t]];
          delete item[ScoreKeys[t]];
        }
      }
      items.push(item);
    }
    return items;
  };

  var GetScore = function GetScore(userID) {
    return this.getMyRecordQuery(userID).get().then(function (querySnapshot) {
      var item;
      if (querySnapshot.size > 0) {
        var doc = querySnapshot.docs[0];
        item = doc.data();
      }
      return Promise.resolve(item);
    });
  };

  var FindFirst = function FindFirst(query, testCallback) {
    var out = {
      doc: undefined,
      index: undefined
    };
    var startIndex = 0;
    return Query({
      query: query,
      forEachPageCallback: function forEachPageCallback(querySnapshot) {
        var docs = querySnapshot.docs,
          doc;
        for (var i = 0, cnt = docs.length; i < cnt; i++) {
          doc = docs[i];
          if (testCallback(doc)) {
            out.doc = doc;
            out.index = startIndex + i;
            return true;
          }
        }
        startIndex += querySnapshot.size;
      },
      resolveCallback: function resolveCallback() {
        return out;
      }
    });
  };

  var GetRank = function GetRank(userID) {
    if (userID === undefined) {
      userID = this.userID;
    }
    var query = this.getPageQuery().next;
    var testCallback = function testCallback(doc) {
      var item = doc.data();
      return item.userID === userID;
    };
    return FindFirst(query, testCallback).then(function (result) {
      return Promise.resolve({
        userID: userID,
        rank: result.index
      });
    });
  };

  var Delete = function Delete(query) {
    return Load$1(query).then(function (docs) {
      if (docs.length === 0) {
        // Last page, task done
        return Promise.resolve();
      }
      var tasks = [];
      var batch, actionCount;
      for (var i = 0, cnt = docs.length; i < cnt; i++) {
        if (batch === undefined) {
          batch = firebase.firestore().batch();
          actionCount = 0;
        }
        batch["delete"](docs[i].ref);
        actionCount++;
        if (actionCount >= 500) {
          tasks.push(batch.commit());
          batch = undefined;
        }
      }
      if (batch) {
        tasks.push(batch.commit());
      }
      return Promise.all(tasks);
    });
  };

  var Methods$3 = {
    deleteUser: function deleteUser(userID) {
      if (userID === undefined) {
        userID = this.userID;
      }
      var query = this.getRecordQuery(undefined, undefined, userID, undefined);
      return Delete(query);
    },
    deleteBoard: function deleteBoard(boardID, tag) {
      if (boardID === undefined) {
        boardID = this.boardID;
      }
      if (tag === undefined) {
        tag = this.tag;
      }
      var query = this.getRecordQuery(boardID, tag, undefined, undefined);
      return Delete(query);
    }
  };

  var Methods$2 = {
    getRecordQuery: function getRecordQuery(boardID, customTag, userID, timeTagKey) {
      var query = this.rootRef;
      query = boardID !== undefined ? query.where('boardID', '==', boardID) : query;
      query = customTag !== undefined ? query.where('tag', '==', customTag) : query;
      query = userID !== undefined ? query.where('userID', '==', userID) : query;
      if (timeTagKey !== undefined) {
        query = query.where(timeTagKey[0], '==', timeTagKey[1]);
      }
      return query;
    },
    getMyRecordQuery: function getMyRecordQuery(userID) {
      if (userID === undefined) {
        userID = this.userID;
      }
      return this.getRecordQuery(this.boardID, this.tag, userID, undefined).limit(1);
    },
    getPageQuery: function getPageQuery() {
      var timeTagKey, scoreKey;
      if (this.timeFilters !== false) {
        var t = this.timeFilterType[0];
        timeTagKey = [TimeTagKeys[t], GetTime()[t]];
        scoreKey = ScoreKeys[t];
      } else {
        // No time filters
        timeTagKey = undefined;
        scoreKey = 'score';
      }
      var baseQuery = this.getRecordQuery(this.boardID, this.tag, undefined, timeTagKey);
      var nextPageQuery = baseQuery.orderBy(scoreKey, 'desc');
      var prevPageQuery = baseQuery.orderBy(scoreKey);
      return {
        next: nextPageQuery,
        previous: prevPageQuery
      };
    }
  };

  var LeaderBoard = /*#__PURE__*/function () {
    function LeaderBoard(config) {
      _classCallCheck(this, LeaderBoard);
      this.database = firebase.firestore();
      this.setRootPath(GetValue(config, 'root', ''));
      this.userInfo = {
        userID: undefined,
        userName: undefined
      };
      this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', undefined));
      this.setBoardID(GetValue(config, 'boardID', undefined));
      this.setTag(GetValue(config, 'tag', undefined));
      this.setTimeFilters(GetValue(config, 'timeFilters', false));
      this.setTimeFilterType(GetValue(config, 'timeFilterType', 'year'));
      this.page = new PageLoader({
        dataMode: 'dynamic',
        itemCount: GetValue(config, 'pageItemCount', 100)
      });
      this.resetQueryFlag = true;
    }
    _createClass(LeaderBoard, [{
      key: "shutdown",
      value: function shutdown() {}
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "userID",
      get: function get() {
        return this.userInfo.userID;
      },
      set: function set(value) {
        this.userInfo.userID = value;
      }
    }, {
      key: "userName",
      get: function get() {
        return this.userInfo.userName;
      },
      set: function set(value) {
        this.userInfo.userName = value;
      }
    }, {
      key: "setRootPath",
      value: function setRootPath(rootPath) {
        this.resetQueryFlag |= this.rootPath !== rootPath;
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
      }
    }, {
      key: "setUser",
      value: function setUser(userID, userName) {
        if (IsPlainObject(userID)) {
          this.userInfo = userID;
        } else {
          this.userID = userID;
          this.userName = userName;
        }
        return this;
      }
    }, {
      key: "setBoardID",
      value: function setBoardID(boardID) {
        this.resetQueryFlag |= this.boardID !== boardID;
        this.boardID = boardID;
        return this;
      }
    }, {
      key: "setTag",
      value: function setTag(tag) {
        this.resetQueryFlag |= this.tag !== tag;
        this.tag = tag;
        return this;
      }
    }, {
      key: "setTimeFilters",
      value: function setTimeFilters(filters) {
        if (filters === false) {
          this.timeFilters = false;
        } else {
          // filters is true, or a plain object
          this.timeFilters = {
            d: GetValue(filters, 'day', true),
            w: GetValue(filters, 'week', true),
            m: GetValue(filters, 'month', true),
            y: GetValue(filters, 'year', true),
            a: GetValue(filters, 'all', true)
          };
        }
        return this;
      }
    }, {
      key: "setTimeFilterType",
      value: function setTimeFilterType(type) {
        this.resetQueryFlag |= this.timeFilterType !== type;
        this.timeFilterType = type;
        return this;
      }
    }, {
      key: "setPageItemCount",
      value: function setPageItemCount(count) {
        this.page.setItemCount(count);
        return this;
      }
    }, {
      key: "pageIndex",
      get: function get() {
        return this.page.pageIndex;
      }
    }, {
      key: "isFirstPage",
      get: function get() {
        return this.page.pageIndex === 0;
      }
    }, {
      key: "isLastPage",
      get: function get() {
        return this.page.isFullPage === false;
      }
    }]);
    return LeaderBoard;
  }();
  var methods$1 = {
    post: Post,
    getScore: GetScore,
    getRank: GetRank
  };
  Object.assign(LeaderBoard.prototype, methods$1, Methods$2, Methods$4, Methods$3);

  ObjectFactory.register('leaderBoard', function (config) {
    return new LeaderBoard(config);
  });
  SetValue(window, 'RexPlugins.Fire.LeaderBoard', LeaderBoard);

  var Send = function Send(message) {
    var d = {
      senderID: this.userID,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (this.userName !== undefined) {
      d.senderName = this.userName;
    }
    if (this.receiverID !== undefined) {
      d.receiverID = this.receiverID;
    }
    return this.rootRef.add(d);
  };

  var Methods$1 = {
    startReceiving: function startReceiving() {
      var query = this.getReceiverQuery(this.receiverID).orderBy('timestamp', 'desc').limit(1);
      var self = this;
      this.unsubscribe = query.onSnapshot({
        includeMetadataChanges: true
      }, function (querySnapshot) {
        if (querySnapshot.size > 0) {
          // Load data
          var doc = querySnapshot.docs[0];
          if (doc.metadata.hasPendingWrites) {
            // Load local message                        
            if (self.skipFirst) {
              // Local doc dose not have timestamp
              self.skipFirst = false;
            }
            return;
          }
          self.resetPageQuery(self.receiverID, doc);
          if (self.skipFirst) {
            // Load previos data
            self.skipFirst = false;
          } else {
            var d = DocToMessage(doc);
            self.cacheMessages.push(d);
            self.emit('receive', d);
          }
        } else {
          if (self.skipFirst) {
            // Start from an empty collection
            self.skipFirst = false;
          }
        }
      }, function (error) {
        debugger;
      });
      return this;
    },
    stopReceiving: function stopReceiving() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }

      // Reset to initial state
      this.resetQueryFlag = true;
      this.cacheMessages.length = 0;
      return this;
    },
    loadPreviousMessages: function loadPreviousMessages() {
      this.resetPageQuery(this.receiverID);
      var self = this;
      return this.page.loadNextPage().then(function (docs) {
        var _self$cacheMessages;
        var messages = [];
        for (var i = 0, cnt = docs.length; i < cnt; i++) {
          messages.push(DocToMessage(docs[i]));
        }
        (_self$cacheMessages = self.cacheMessages).splice.apply(_self$cacheMessages, [0, 0].concat(messages));
        return Promise.resolve(messages);
      });
    },
    resetPageQuery: function resetPageQuery(receiverID, baselineDoc) {
      if (!this.resetQueryFlag) {
        return this;
      }
      this.resetQueryFlag = false;
      var baselineMode = this.skipFirst ? 'startAt' : 'startAfter';
      this.page.setBaselineDoc(baselineDoc, baselineMode).setQuery(this.getPageQuery(receiverID));
      return this;
    }
  };
  var DocToMessage = function DocToMessage(doc) {
    var message = doc.data();
    message.timestamp = message.timestamp.seconds * 1000;
    return message;
  };

  var Methods = {
    getReceiverQuery: function getReceiverQuery(receiverID) {
      if (receiverID === undefined) {
        receiverID = this.receiverID;
      }
      var query = this.rootRef;
      query = receiverID !== undefined ? query.where('receiverID', '==', receiverID) : query;
      return query;
    },
    getPageQuery: function getPageQuery(receiverID) {
      var baseQuery = this.getReceiverQuery(receiverID);
      var nextPageQuery = baseQuery.orderBy('timestamp');
      var prevPageQuery = baseQuery.orderBy('timestamp', 'desc');
      return {
        next: nextPageQuery,
        previous: prevPageQuery
      };
    }
  };

  var Messages = /*#__PURE__*/function () {
    function Messages(config) {
      _classCallCheck(this, Messages);
      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this.database = firebase.firestore();
      this.setRootPath(GetValue(config, 'root', ''));
      this.userInfo = {
        userID: '',
        userName: undefined
      };
      this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));
      this.setReceiver(GetValue(config, 'receiverID', undefined));
      this.skipFirst = true;
      this.unsubscribe = undefined;
      this.page = new PageLoader();
      this.setPageItemCount(GetValue(config, 'pageItemCount', 100));
      this.resetQueryFlag = true;
      this.cacheMessages = [];
    }
    _createClass(Messages, [{
      key: "shutdown",
      value: function shutdown() {
        this.stopReceiving().destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "userID",
      get: function get() {
        return this.userInfo.userID;
      },
      set: function set(value) {
        this.userInfo.userID = value;
      }
    }, {
      key: "userName",
      get: function get() {
        return this.userInfo.userName;
      },
      set: function set(value) {
        this.userInfo.userName = value;
      }
    }, {
      key: "setRootPath",
      value: function setRootPath(rootPath) {
        this.resetQueryFlag |= this.rootPath !== rootPath;
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
      }
    }, {
      key: "setSender",
      value: function setSender(userID, userName) {
        if (IsPlainObject(userID)) {
          this.userInfo = userID;
        } else {
          this.userID = userID;
          this.userName = userName;
        }
        return this;
      }
    }, {
      key: "setReceiver",
      value: function setReceiver(receiverID) {
        this.resetQueryFlag |= this.receiverID !== receiverID;
        this.receiverID = receiverID;
        return this;
      }
    }, {
      key: "setPageItemCount",
      value: function setPageItemCount(count) {
        this.page.setItemCount(count);
        return this;
      }
    }, {
      key: "hasPreviousMessage",
      get: function get() {
        return this.page.isFullPage !== false;
      }
    }]);
    return Messages;
  }();
  var methods = {
    send: Send
  };
  Object.assign(Messages.prototype, EventEmitterMethods, methods, Methods$1, Methods);

  ObjectFactory.register('messages', function (config) {
    return new Messages(config);
  });
  SetValue(window, 'RexPlugins.Fire.Messages', Messages);

  var FirebasePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(FirebasePlugin, _Phaser$Plugins$BaseP);
    function FirebasePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, FirebasePlugin);
      _this = _callSuper(this, FirebasePlugin, [pluginManager]);
      _this.add = new ObjectFactory();
      return _this;
    }
    _createClass(FirebasePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "initializeApp",
      value: function initializeApp(config) {
        this.add.initializeApp(config);
        return this;
      }
    }, {
      key: "preload",
      value: function preload(scene, urlConfig, firebaseConfig) {
        LoaderCallback.call(scene.sys.load, urlConfig, firebaseConfig);
        return this;
      }
    }]);
    return FirebasePlugin;
  }(Phaser.Plugins.BasePlugin);

  return FirebasePlugin;

}));

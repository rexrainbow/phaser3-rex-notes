(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexparseplugin = factory());
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

  var VERSION = '2.11.0';
  var CDNURL = "https://npmcdn.com/parse@".concat(VERSION, "/dist/parse.min.js");
  var Preload = function Preload(url) {
    if (url === undefined) {
      url = CDNURL;
    }
    return LoadScriptPromise(url);
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

  var LoaderCallback = function LoaderCallback(url) {
    var callback = function callback(successCallback, failureCallback) {
      return Preload(url).then(function () {
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

  var Query = function Query(config) {
    if (config.startIndex === undefined) {
      config.startIndex = 0;
    }
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
    var lineCount = Math.min(config.remainderLines, config.linesPerPage);
    config.remainderLines -= lineCount;
    return query.skip(config.startIndex).limit(lineCount).find().then(function (items) {
      var done = config.remainderLines === 0 || items.length < lineCount; // Is last page
      if (config.forEachPageCallback) {
        done |= !!config.forEachPageCallback(items);
      }
      if (done) {
        var out;
        if (config.resolveCallback) {
          out = config.resolveCallback();
        }
        return Promise.resolve(out);
      } else {
        config.startIndex += items.length;
        return QueryNextPage(config);
      }
    });
  };

  var Load = function Load(query, startIndex, totalLines) {
    var out = [];
    return Query({
      query: query,
      startIndex: startIndex,
      totalLines: totalLines,
      forEachPageCallback: function forEachPageCallback(items) {
        out.push.apply(out, _toConsumableArray(items));
      },
      resolveCallback: function resolveCallback() {
        return out;
      }
    });
  };

  var Methods$5 = {
    loadItems: function loadItems(startIndex, itemCount) {
      if (startIndex === undefined) {
        startIndex = 0;
      }
      if (itemCount === undefined) {
        itemCount = Infinity;
      }
      this.items.length = 0;
      var self = this;
      return Load(this.query, startIndex, itemCount).then(function (items) {
        self.items = items;
        self.startIndex = startIndex;
        self.pageIndex = Math.floor(startIndex / self.itemCount);
        self.isFullPage = itemCount === Infinity ? true : itemCount === items.length;
        return Promise.resolve(items);
      })["catch"](function (error) {
        self.isFullPage = false;
        return Promise.reject(error);
      });
    },
    loadPage: function loadPage(pageIndex) {
      var startIndex = pageIndex * this.itemCount;
      return this.loadItems(startIndex, this.itemCount);
    },
    loadFirstPage: function loadFirstPage() {
      return this.loadItems(0, this.itemCount);
    },
    loadCurrentPage: function loadCurrentPage() {
      return this.loadItems(this.startIndex, this.itemCount);
    },
    loadNextPage: function loadNextPage() {
      var startIndex = this.startIndex + this.itemCount;
      return this.loadItems(startIndex, this.itemCount);
    },
    loadPreviousPage: function loadPreviousPage() {
      var startIndex = this.startIndex - this.itemCount;
      return this.loadItems(startIndex, this.itemCount);
    }
  };

  var PageLoader = /*#__PURE__*/function () {
    function PageLoader(config) {
      _classCallCheck(this, PageLoader);
      this.items = [];
      this.startIndex = 0;
      this.pageIndex = 0;
      this.isFullPage = false;
      this.setItemCount(GetValue(config, 'itemCount', 100));
      this.setQuery(GetValue(config, 'query', undefined));
    }
    _createClass(PageLoader, [{
      key: "setItemCount",
      value: function setItemCount(itemCount) {
        this.itemCount = itemCount;
        this.pageIndex = Math.floor(this.startIndex / itemCount);
        return this;
      }
    }, {
      key: "setQuery",
      value: function setQuery(query) {
        this.query = query;
        return this;
      }
    }, {
      key: "getItem",
      value: function getItem(i) {
        return this.items[i - this.startIndex];
      }
    }, {
      key: "findFirst",
      value: function findFirst(key, value) {
        for (var i, cnt = this.items.length; i < cnt; i++) {
          if (this.items[i].get(key) === value) {
            return i + this.startIndex;
          }
        }
        return -1;
      }
    }]);
    return PageLoader;
  }();
  Object.assign(PageLoader.prototype, Methods$5);

  var IsInValidKey = function IsInValidKey(keys) {
    return keys == null || keys === '' || keys.length === 0;
  };
  var GetEntry = function GetEntry(target, keys, defaultEntry) {
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
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }
    return target;
  };

  ObjectFactory.register('pageLoader', function (config) {
    return new PageLoader(config);
  });
  SetValue(window, 'RexPlugins.Parse.PageLoader', PageLoader);

  var GetQuery = function GetQuery(data) {
    var query = this.baseQuery;
    var isItem = data instanceof this.customClass;
    var key, value;
    for (var i = 0, cnt = this.primaryKeys.length; i < cnt; i++) {
      key = this.primaryKeys[i];
      value = isItem ? data.get(key) : data[key];
      query.equalTo(key, value);
    }
    return query;
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

  var LoadRandomItems = function LoadRandomItems(query, count) {
    if (typeof query === 'number') {
      count = query;
      query = undefined;
    }
    if (query === undefined) {
      query = this.baseQuery;
    }
    if (count === undefined) {
      count = 1;
    }

    // Load all item Id
    query.select('id');
    var self = this;
    return Load(query).then(function (items) {
      // Shuffle items
      Shuffle(items);
      count = Math.min(count, items.length);
      var itemIds = [];
      for (var i = 0; i < count; i++) {
        itemIds.push(items[i].id);
      }
      // Load first N items by item Id
      query = self.baseQuery.containedIn('objectId', itemIds);
      return Load(query);
    });
  };

  var Methods$4 = {
    loadItem: function loadItem(itemId, select) {
      if (typeof itemId === 'string') {
        var query = this.baseQuery;
        if (select) {
          query = query.select(select);
        }
        return query.get(itemId);
      } else {
        // Query by primary keys
        var query = this.getQuery(itemId).limit(1);
        if (select) {
          query = query.select(select);
        }
        return query.find().then(function (result) {
          return Promise.resolve(result[0]);
        });
      }
    },
    loadPage: function loadPage(pageIndex) {
      return this.pageLoader.loadPage(pageIndex);
    },
    loadCurrentPage: function loadCurrentPage() {
      return this.pageLoader.loadCurrentPage();
    },
    loadNextPage: function loadNextPage() {
      return this.pageLoader.loadNextPage();
    },
    loadPreviousPage: function loadPreviousPage() {
      return this.pageLoader.loadPreviousPage();
    },
    loadItems: function loadItems(startIndex, itemCount) {
      return this.pageLoader.loadItems(startIndex, itemCount);
    },
    load: function load(query) {
      if (query === undefined) {
        query = this.baseQuery;
      }
      return Load(query);
    },
    loadRandomItems: LoadRandomItems
  };

  var Delete = function Delete(query) {
    query.select('id');
    return Load(query).then(function (items) {
      if (items.length === 0) {
        return Promise.resolve();
      }
      return Parse.Object.destroyAll(items);
    });
  };

  var Methods$3 = {
    deleteItem: function deleteItem(itemId) {
      return this.createItem().set('id', itemId).destroy();
    },
    "delete": function _delete(query) {
      if (query === undefined) {
        query = this.baseQuery;
      }
      return Delete(query);
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

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var DataToItem = function DataToItem(data, itemClass, item) {
    if (!item) {
      item = new itemClass();
    }
    item.set(data);
    return item;
  };

  var SetOwnerAccessMode = function SetOwnerAccessMode(item, ownerRead, ownerWrite) {
    if (!ownerRead && !ownerWrite) {
      return item;
    }
    var currentUser = Parse.User.current();
    if (!currentUser) {
      return item;
    }
    var acl = new Parse.ACL(currentUser);
    if (!ownerWrite) {
      acl.setPublicWriteAccess(true);
    }
    if (!ownerRead) {
      acl.setPublicReadAccess(true);
    }
    item.setACL(acl);
    return item;
  };

  var Save = function Save(data) {
    // JSON data, or parse object
    if (IsArray(data)) {
      return this.saveItems(data);
    }
    var self = this;
    return new Promise(function (resolve, reject) {
      if (self.primaryKeys.length > 0) {
        self.loadItem(data, 'id').then(resolve, reject);
      } else {
        return resolve();
      }
    }).then(function (item) {
      item = DataToItem(data, self.customClass, item);
      SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
      return item.save();
    });
  };

  var SaveItems = function SaveItems(dataArray) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var items = [];
      if (self.primaryKeys.length > 0) {
        var promises = [],
          promise;
        var _loop = function _loop() {
          var data = dataArray[i];
          promise = self.loadItem(data, 'id').then(function (item) {
            item = DataToItem(data, self.customClass, item);
            SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
            items.push(item);
          });
          promises.push(promise);
        };
        for (var i = 0, cnt = dataArray.length; i < cnt; i++) {
          _loop();
        }
        Promise.all(promises).then(function () {
          return resolve(items);
        })["catch"](reject);
      } else {
        for (var i = 0, cnt = dataArray.length; i < cnt; i++) {
          var item = DataToItem(dataArray[i], self.customClass);
          SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
          items.push(item);
        }
        return resolve(items);
      }
    }).then(function (items) {
      return Parse.Object.saveAll(items);
    });
  };

  var GetItemCount = function GetItemCount(query) {
    if (query === undefined) {
      query = this.baseQuery;
    }
    return query.count();
  };

  var ItemTable = /*#__PURE__*/function () {
    function ItemTable(config) {
      _classCallCheck(this, ItemTable);
      this.pageLoader = new PageLoader();
      this.setClassName(GetValue(config, 'className', 'Item'));
      this.setItemCount(GetValue(config, 'itemCount', 100));
      this.setQuery(); // Reset to base query
      this.primaryKeys = [];
      var primaryKeys = GetValue(config, 'primaryKeys', undefined);
      if (primaryKeys) {
        this.setPrimaryKey(primaryKeys);
      }
      this.setOwnerReadMode(GetValue(config, 'ownerRead', undefined));
      this.setOwnerWriteMode(GetValue(config, 'ownerWrite', undefined));
    }
    _createClass(ItemTable, [{
      key: "setClassName",
      value: function setClassName(className) {
        this.customClass = Parse.Object.extend(className);
        return this;
      }
    }, {
      key: "setPrimaryKey",
      value: function setPrimaryKey(key) {
        if (!key) {
          this.primaryKeys.length = 0;
        } else if (typeof key === 'string') {
          this.primaryKeys.length = 1;
          this.primaryKeys[0] = key;
        } else {
          Copy(this.primaryKeys, key);
        }
        return this;
      }
    }, {
      key: "setOwnerReadMode",
      value: function setOwnerReadMode(mode) {
        this.ownerRead = mode;
        return this;
      }
    }, {
      key: "setOwnerWriteMode",
      value: function setOwnerWriteMode(mode) {
        this.ownerWrite = mode;
        return this;
      }
    }, {
      key: "createItem",
      value: function createItem() {
        return new this.customClass();
      }
    }, {
      key: "setItemCount",
      value: function setItemCount(itemCount) {
        this.pageLoader.setItemCount(itemCount);
        return this;
      }
    }, {
      key: "setQuery",
      value: function setQuery(query) {
        if (query === undefined) {
          query = this.baseQuery;
        }
        this.pageLoader.setQuery(query);
        return this;
      }
    }, {
      key: "baseQuery",
      get: function get() {
        return new Parse.Query(this.customClass);
      }
    }, {
      key: "startIndex",
      get: function get() {
        return this.pageLoader.startIndex;
      }
    }, {
      key: "pageIndex",
      get: function get() {
        return this.pageLoader.pageIndex;
      }
    }, {
      key: "isLastPage",
      get: function get() {
        return this.pageLoader.isLastPage;
      }
    }]);
    return ItemTable;
  }();
  var methods$2 = {
    getQuery: GetQuery,
    save: Save,
    saveItems: SaveItems,
    getItemCount: GetItemCount
  };
  Object.assign(ItemTable.prototype, Methods$4, Methods$3, methods$2);

  ObjectFactory.register('itemTable', function (config) {
    return new ItemTable(config);
  });
  SetValue(window, 'RexPlugins.Parse.ItemTable', ItemTable);

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

  var GetTime = function GetTime(timeStamp) {
    var date = timeStamp ? new Date(timeStamp) : new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var Jan1st = new Date(date.getFullYear(), 0, 1);
    var w = Math.ceil(((date - Jan1st) / 86400000 + Jan1st.getDay() + 1) / 7);
    return {
      d: "".concat(y, "-").concat(m, "-").concat(d),
      w: "".concat(y, "-").concat(w),
      m: "".concat(y, "-").concat(m),
      y: "".concat(y)
    };
  };

  var TimeTagKeys = {
    d: 'tagD',
    w: 'tagW',
    m: 'tagM',
    y: 'tagY'
  };
  var ScoreKeys = {
    d: 'scoreD',
    w: 'scoreW',
    m: 'scoreM',
    y: 'scoreY'
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
    var curTimeData = GetTime();
    var self = this;
    return this.getMyRecordQuery().find().then(function (results) {
      var prevRecord = results[0];
      if (prevRecord) {
        if (self.timeFilters !== false) {
          for (var t in self.timeFilters) {
            if (!self.timeFilters[t]) {
              continue;
            }
            var timeTagKey = TimeTagKeys[t];
            if (prevRecord.get(timeTagKey) === newRecord[timeTagKey]) {
              var scoreKey = ScoreKeys[t];
              newRecord[scoreKey] = Math.max(prevRecord.get(scoreKey), newRecord[scoreKey]);
            }
          }
        } else {
          // No time filters
          newRecord.score = Math.max(prevRecord.get('score'), newRecord.score);
        }
      }
      var item = DataToItem(newRecord, self.customClass, prevRecord);
      return item.save();
    });
  };

  var Methods$2 = {
    loadFirstPage: function loadFirstPage() {
      this.resetPageQuery();
      var self = this;
      return this.page.loadFirstPage().then(function (items) {
        return Promise.resolve(ItemsToDataArray.call(self, items));
      });
    },
    loadNextPage: function loadNextPage() {
      this.resetPageQuery();
      var self = this;
      return this.page.loadNextPage().then(function (items) {
        return Promise.resolve(ItemsToDataArray.call(self, items));
      });
    },
    loadPreviousPage: function loadPreviousPage() {
      this.resetPageQuery();
      var self = this;
      return this.page.loadPreviousPage().then(function (items) {
        return Promise.resolve(ItemsToDataArray.call(self, items));
      });
    },
    loadCurrentPage: function loadCurrentPage() {
      this.resetPageQuery();
      var self = this;
      return this.page.loadCurrentPage().then(function (items) {
        return Promise.resolve(ItemsToDataArray.call(self, items));
      });
    },
    load: function load(count, skip) {
      this.resetPageQuery();
      var self = this;
      return this.page.load(count, skip).then(function (items) {
        return Promise.resolve(ItemsToDataArray.call(self, items));
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
  var ItemsToDataArray = function ItemsToDataArray(items) {
    var dataArray = [],
      data;
    var scoreKey = ScoreKeys[this.timeFilterType[0]];
    for (var i = 0, cnt = items.length; i < cnt; i++) {
      data = items[i].toJSON();
      if (this.timeFilters !== false) {
        data.score = data[scoreKey];
        // Remove timeFilterKeys, and scoreKeys
        for (var t in this.timeFilters) {
          delete data[TimeTagKeys[t]];
          delete data[ScoreKeys[t]];
        }
      }
      dataArray.push(data);
    }
    return dataArray;
  };

  var GetScore = function GetScore(userID) {
    return this.getMyRecordQuery(userID).find().then(function (results) {
      var myRecord = results[0];
      if (myRecord) {
        myRecord = myRecord.toJSON();
      }
      return Promise.resolve(myRecord);
    });
  };

  var FindFirst = function FindFirst(query, testCallback) {
    var out = {
      item: undefined,
      index: undefined
    };
    var startIndex = 0;
    return Query({
      query: query,
      forEachPageCallback: function forEachPageCallback(items) {
        var item;
        for (var i = 0, cnt = items.length; i < cnt; i++) {
          item = items[i];
          if (testCallback(item)) {
            out.item = item;
            out.index = startIndex + i;
            return true;
          }
        }
        startIndex += items.length;
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
    var query = this.getPageQuery();
    var testCallback = function testCallback(item) {
      return item.get('userID') === userID;
    };
    return FindFirst(query, testCallback).then(function (result) {
      return Promise.resolve({
        userID: userID,
        rank: result.index
      });
    });
  };

  var Methods$1 = {
    deleteUser: function deleteUser(userID) {
      if (userID === undefined) {
        userID = this.userID;
      }
      var query = this.getRecordQuery(undefined, undefined, userID, undefined);
      return Delete(query);
    },
    deleteBoard: function deleteBoard(boardId, tag) {
      if (boardId === undefined) {
        boardId = this.boardID;
      }
      if (tag === undefined) {
        tag = this.tag;
      }
      var query = this.getRecordQuery(boardId, tag, undefined, undefined);
      return Delete(query);
    }
  };

  var Methods = {
    getRecordQuery: function getRecordQuery(boardID, customTag, userID, timeTagKey) {
      var query = this.baseQuery;
      query = boardID !== undefined ? query.equalTo('boardID', boardID) : query;
      query = customTag !== undefined ? query.equalTo('tag', customTag) : query;
      query = userID !== undefined ? query.equalTo('userID', userID) : query;
      if (timeTagKey !== undefined) {
        query = query.equalTo(timeTagKey[0], timeTagKey[1]);
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
      var query = this.getRecordQuery(this.boardID, this.tag, undefined, timeTagKey);
      query = query.descending(scoreKey);
      return query;
    }
  };

  var LeaderBoard = /*#__PURE__*/function () {
    function LeaderBoard(config) {
      _classCallCheck(this, LeaderBoard);
      this.setClassName(GetValue(config, 'className', 'Item'));
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
      key: "setClassName",
      value: function setClassName(className) {
        this.resetQueryFlag = true;
        this.customClass = Parse.Object.extend(className);
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
            y: GetValue(filters, 'year', true)
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
      key: "baseQuery",
      get: function get() {
        return new Parse.Query(this.customClass);
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
  Object.assign(LeaderBoard.prototype, methods$1, Methods, Methods$2, Methods$1);

  ObjectFactory.register('leaderBoard', function (config) {
    return new LeaderBoard(config);
  });
  SetValue(window, 'RexPlugins.Parse.Leaderboard', LeaderBoard);

  var QuickLogin = function QuickLogin(userName, password) {
    return Parse.User.logOut() // // Log-out first
    .then(function () {
      return Parse.User.logIn(userName, password); // Try login
    })["catch"](function () {
      // Login fail, try sign-up, then login again
      return SignUpThenLogin(userName, password);
    });
  };
  var SignUpThenLogin = function SignUpThenLogin(userName, password) {
    var user = new Parse.User();
    user.set('username', userName).set('password', password);
    return user.signUp().then(function () {
      // Sign up success, try login again                        
      return Parse.User.logIn(userName, password);
    });
  };

  var ParsePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(ParsePlugin, _Phaser$Plugins$BaseP);
    function ParsePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, ParsePlugin);
      _this = _callSuper(this, ParsePlugin, [pluginManager]);
      _this.add = new ObjectFactory();
      return _this;
    }
    _createClass(ParsePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "preload",
      value: function preload(scene, url) {
        LoaderCallback.call(scene.sys.load, url);
        return this;
      }
    }]);
    return ParsePlugin;
  }(Phaser.Plugins.BasePlugin);
  var methods = {
    quickLogin: QuickLogin
  };
  Object.assign(ParsePlugin.prototype, methods);

  return ParsePlugin;

}));

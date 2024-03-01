(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgridalignplugin = factory());
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

  var SQRT3$1 = Math.sqrt(3);
  var Width = function Width(hexagon) {
    return hexagon.type === 0 ? 2 * hexagon.size : SQRT3$1 * hexagon.size;
  };

  var SQRT3 = Math.sqrt(3);
  var Height = function Height(hexagon) {
    return hexagon.type === 0 ? SQRT3 * hexagon.size : 2 * hexagon.size;
  };

  var CONST = {
    ODD_R: 0,
    EVEN_R: 1,
    ODD_Q: 2,
    EVEN_Q: 3
  };

  var ODD_R$3 = CONST.ODD_R;
  var EVEN_R$3 = CONST.EVEN_R;
  var ODD_Q$3 = CONST.ODD_Q;
  var EVEN_Q$3 = CONST.EVEN_Q;
  var GetWorldXY = function GetWorldXY(tileX, tileY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globWorldXY$1;
    }
    var worldX = tileX * this.width;
    var worldY = tileY * this.height;
    switch (this.mode) {
      case ODD_R$3:
        if (tileY & 1) {
          worldX += this._halfWidth;
        }
        worldY *= 0.75;
        break;
      case EVEN_R$3:
        if (tileY & 1) {
          worldX -= this._halfWidth;
        }
        worldY *= 0.75;
        break;
      case ODD_Q$3:
        worldX *= 0.75;
        if (tileX & 1) {
          worldY += this._halfHeight;
        }
        break;
      case EVEN_Q$3:
        worldX *= 0.75;
        if (tileX & 1) {
          worldY -= this._halfHeight;
        }
        break;
    }
    worldX += this.x;
    worldY += this.y;
    out.x = worldX;
    out.y = worldY;
    return out;
  };
  var globWorldXY$1 = {};

  var GetWorldX$2 = function GetWorldX(tileX, tileY) {
    return this.getWorldXY(tileX, tileY, true).x;
  };

  var GetWorldY$1 = function GetWorldY(tileX, tileY) {
    return this.getWorldXY(tileX, tileY, true).y;
  };

  var ODD_R$2 = CONST.ODD_R;
  var EVEN_R$2 = CONST.EVEN_R;
  var ODD_Q$2 = CONST.ODD_Q;
  var EVEN_Q$2 = CONST.EVEN_Q;
  var roundcube = function roundcube(x, y, z, out) {
    if (typeof x !== 'number') {
      out = x;
      x = out.x;
      y = out.y;
      z = out.z;
    }
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globCube$1;
    }
    var rx = Math.round(x);
    var ry = Math.round(y);
    var rz = Math.round(z);
    var dx = Math.abs(rx - x);
    var dy = Math.abs(ry - y);
    var dz = Math.abs(rz - z);
    if (dx > dy && dx > dz) {
      rx = -ry - rz;
    } else if (dy > dz) {
      ry = -rx - rz;
    } else {
      rz = -rx - ry;
    }
    out.x = rx;
    out.y = ry;
    out.z = rz;
    return out;
  };
  var cube2cr = function cube2cr(mode, x, y, z, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globCR;
    }
    switch (mode) {
      case ODD_R$2:
        out.x = x + (z - (z & 1)) / 2;
        out.y = z;
        break;
      case EVEN_R$2:
        out.x = x + (z + (z & 1)) / 2;
        out.y = z;
        break;
      case ODD_Q$2:
        out.x = x;
        out.y = z + (x - (x & 1)) / 2;
        break;
      case EVEN_Q$2:
        out.x = x;
        out.y = z + (x + (x & 1)) / 2;
        break;
    }
    return out;
  };
  var qr2cube = function qr2cube(q, r, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globCube$1;
    }
    out.x = q;
    out.y = -q - r;
    out.z = r;
    return out;
  };
  var globCube$1 = {};
  var globCR = {};

  var ODD_R$1 = CONST.ODD_R;
  var EVEN_R$1 = CONST.EVEN_R;
  var ODD_Q$1 = CONST.ODD_Q;
  var EVEN_Q$1 = CONST.EVEN_Q;
  var C4DIV3 = 4 / 3;
  var C2DIV3 = 2 / 3;
  var GetTileXY$1 = function GetTileXY(worldX, worldY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY$1;
    }
    worldX -= this.x;
    worldY -= this.y;
    var q, r;
    switch (this.mode) {
      case ODD_R$1:
      case EVEN_R$1:
        r = worldY * C4DIV3 / this.height;
        q = worldX / this.width - C2DIV3 * (worldY / this.height);
        break;
      case ODD_Q$1:
      case EVEN_Q$1:
        r = worldY / this.height - C2DIV3 * (worldX / this.width);
        q = worldX * C4DIV3 / this.width;
        break;
    }
    var cube = qr2cube(q, r, globCube);
    roundcube(cube);
    cube2cr(this.mode, cube.x, cube.y, cube.z, out);
    return out;
  };
  var globCube = {};
  var globTileXY$1 = {};

  var GetTileX$1 = function GetTileX(worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).x;
  };

  var GetTileY$1 = function GetTileY(worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).y;
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

  var ODD_R = CONST.ODD_R;
  var EVEN_R = CONST.EVEN_R;
  var ODD_Q = CONST.ODD_Q;
  var EVEN_Q = CONST.EVEN_Q;
  var Hexagon = /*#__PURE__*/function () {
    function Hexagon(config) {
      _classCallCheck(this, Hexagon);
      this.resetFromJSON(config);
    }
    _createClass(Hexagon, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setType(GetValue(o, 'staggeraxis', 1), GetValue(o, 'staggerindex', 1));
        this.setDirectionMode();
        this.setOriginPosition(GetValue(o, 'x', 0), GetValue(o, 'y', 0));
        var size = GetValue(o, 'size', undefined);
        if (size !== undefined) {
          this.setCellRadius(size);
        } else {
          this.setCellSize(GetValue(o, 'cellWidth', 0), GetValue(o, 'cellHeight', 0));
        }
      }
    }, {
      key: "setType",
      value: function setType(staggeraxis, staggerindex) {
        if (typeof staggeraxis === 'string') {
          staggeraxis = STAGGERAXIS[staggeraxis];
        }
        if (typeof staggerindex === 'string') {
          staggerindex = STAGGERINDEX[staggerindex];
        }
        this.staggeraxis = staggeraxis; // 0|y(flat), or 1|x(pointy)
        this.staggerindex = staggerindex; // even, or odd

        if (staggeraxis === 0) {
          // flat
          this.mode = staggerindex === 0 ? EVEN_Q : ODD_Q;
        } else {
          // pointy
          this.mode = staggerindex === 0 ? EVEN_R : ODD_R;
        }
        return this;
      }
    }, {
      key: "setDirectionMode",
      value: function setDirectionMode() {
        this.directions = 6;
        return this;
      }
    }, {
      key: "setOriginPosition",
      value: function setOriginPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this._width = value;
        this._halfWidth = value / 2;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this._height = value;
        this._halfHeight = value / 2;
      }
    }, {
      key: "setCellSize",
      value: function setCellSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "setCellRadius",
      value: function setCellRadius(size) {
        this.size = size;
        var hexagon = {
          size: this.size,
          type: this.staggeraxis
        };
        var cellWidth = Width(hexagon);
        var cellHeight = Height(hexagon);
        this.setCellSize(cellWidth, cellHeight);
        return this;
      }
    }, {
      key: "cellWidth",
      get: function get() {
        return this.width;
      },
      set: function set(value) {
        this.width = value;
      }
    }, {
      key: "cellHeight",
      get: function get() {
        return this.height;
      },
      set: function set(value) {
        this.height = value;
      }
    }]);
    return Hexagon;
  }();
  var methods$1 = {
    getWorldXY: GetWorldXY,
    getWorldX: GetWorldX$2,
    getWorldY: GetWorldY$1,
    getTileXY: GetTileXY$1,
    getTileX: GetTileX$1,
    getTileY: GetTileY$1
  };
  Object.assign(Hexagon.prototype, methods$1);
  var STAGGERAXIS = {
    'y': 0,
    'x': 1
  };
  var STAGGERINDEX = {
    'even': 0,
    'odd': 1
  };

  var NOOP = function NOOP() {
    //  NOOP
  };

  var globZone = new Phaser.GameObjects.Zone({
    sys: {
      queueDepthSort: NOOP,
      events: {
        once: NOOP
      }
    }
  }, 0, 0, 1, 1);
  globZone.setOrigin(0);

  var ALIGN_CONST = {
    /**
    * A constant representing a top-left alignment or position.
    * @constant
    * @name Phaser.Display.Align.TOP_LEFT
    * @since 3.0.0
    * @type {integer}
    */
    TOP_LEFT: 0,
    /**
    * A constant representing a top-center alignment or position.
    * @constant
    * @name Phaser.Display.Align.TOP_CENTER
    * @since 3.0.0
    * @type {integer}
    */
    TOP_CENTER: 1,
    /**
    * A constant representing a top-right alignment or position.
    * @constant
    * @name Phaser.Display.Align.TOP_RIGHT
    * @since 3.0.0
    * @type {integer}
    */
    TOP_RIGHT: 2,
    /**
    * A constant representing a left-top alignment or position.
    * @constant
    * @name Phaser.Display.Align.LEFT_TOP
    * @since 3.0.0
    * @type {integer}
    */
    LEFT_TOP: 3,
    /**
    * A constant representing a left-center alignment or position.
    * @constant
    * @name Phaser.Display.Align.LEFT_CENTER
    * @since 3.0.0
    * @type {integer}
    */
    LEFT_CENTER: 4,
    /**
    * A constant representing a left-bottom alignment or position.
    * @constant
    * @name Phaser.Display.Align.LEFT_BOTTOM
    * @since 3.0.0
    * @type {integer}
    */
    LEFT_BOTTOM: 5,
    /**
    * A constant representing a center alignment or position.
    * @constant
    * @name Phaser.Display.Align.CENTER
    * @since 3.0.0
    * @type {integer}
    */
    CENTER: 6,
    /**
    * A constant representing a right-top alignment or position.
    * @constant
    * @name Phaser.Display.Align.RIGHT_TOP
    * @since 3.0.0
    * @type {integer}
    */
    RIGHT_TOP: 7,
    /**
    * A constant representing a right-center alignment or position.
    * @constant
    * @name Phaser.Display.Align.RIGHT_CENTER
    * @since 3.0.0
    * @type {integer}
    */
    RIGHT_CENTER: 8,
    /**
    * A constant representing a right-bottom alignment or position.
    * @constant
    * @name Phaser.Display.Align.RIGHT_BOTTOM
    * @since 3.0.0
    * @type {integer}
    */
    RIGHT_BOTTOM: 9,
    /**
    * A constant representing a bottom-left alignment or position.
    * @constant
    * @name Phaser.Display.Align.BOTTOM_LEFT
    * @since 3.0.0
    * @type {integer}
    */
    BOTTOM_LEFT: 10,
    /**
    * A constant representing a bottom-center alignment or position.
    * @constant
    * @name Phaser.Display.Align.BOTTOM_CENTER
    * @since 3.0.0
    * @type {integer}
    */
    BOTTOM_CENTER: 11,
    /**
    * A constant representing a bottom-right alignment or position.
    * @constant
    * @name Phaser.Display.Align.BOTTOM_RIGHT
    * @since 3.0.0
    * @type {integer}
    */
    BOTTOM_RIGHT: 12
  };

  var GetDisplayWidth = function GetDisplayWidth(gameObject) {
    if (gameObject.displayWidth !== undefined) {
      return gameObject.displayWidth;
    } else {
      return gameObject.width;
    }
  };
  var GetDisplayHeight = function GetDisplayHeight(gameObject) {
    if (gameObject.displayHeight !== undefined) {
      return gameObject.displayHeight;
    } else {
      return gameObject.height;
    }
  };

  var GetBottom = function GetBottom(gameObject) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y + height - height * gameObject.originY;
  };

  var GetCenterX = function GetCenterX(gameObject) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x - width * gameObject.originX + width * 0.5;
  };

  var SetBottom = function SetBottom(gameObject, value) {
    var height = GetDisplayHeight(gameObject);
    gameObject.y = value - height + height * gameObject.originY;
    return gameObject;
  };

  var SetCenterX = function SetCenterX(gameObject, x) {
    var width = GetDisplayWidth(gameObject);
    var offsetX = width * gameObject.originX;
    gameObject.x = x + offsetX - width * 0.5;
    return gameObject;
  };

  var BottomCenter = function BottomCenter(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);
    return gameObject;
  };

  var GetLeft = function GetLeft(gameObject) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x - width * gameObject.originX;
  };

  var SetLeft = function SetLeft(gameObject, value) {
    var width = GetDisplayWidth(gameObject);
    gameObject.x = value + width * gameObject.originX;
    return gameObject;
  };

  var BottomLeft = function BottomLeft(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);
    return gameObject;
  };

  var GetRight = function GetRight(gameObject) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x + width - width * gameObject.originX;
  };

  var SetRight = function SetRight(gameObject, value) {
    var width = GetDisplayWidth(gameObject);
    gameObject.x = value - width + width * gameObject.originX;
    return gameObject;
  };

  var BottomRight = function BottomRight(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);
    return gameObject;
  };

  var SetCenterY = function SetCenterY(gameObject, y) {
    var height = GetDisplayHeight(gameObject);
    var offsetY = height * gameObject.originY;
    gameObject.y = y + offsetY - height * 0.5;
    return gameObject;
  };

  var CenterOn = function CenterOn(gameObject, x, y) {
    SetCenterX(gameObject, x);
    return SetCenterY(gameObject, y);
  };

  var GetCenterY = function GetCenterY(gameObject) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y - height * gameObject.originY + height * 0.5;
  };

  var Center = function Center(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    CenterOn(gameObject, GetCenterX(alignIn) + offsetX, GetCenterY(alignIn) + offsetY);
    return gameObject;
  };

  var LeftCenter = function LeftCenter(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);
    return gameObject;
  };

  var RightCenter = function RightCenter(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);
    return gameObject;
  };

  var GetTop = function GetTop(gameObject) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y - height * gameObject.originY;
  };

  var SetTop = function SetTop(gameObject, value) {
    var height = GetDisplayHeight(gameObject);
    gameObject.y = value + height * gameObject.originY;
    return gameObject;
  };

  var TopCenter = function TopCenter(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);
    return gameObject;
  };

  var TopLeft = function TopLeft(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);
    return gameObject;
  };

  var TopRight = function TopRight(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);
    return gameObject;
  };

  var AlignInMap = [];
  AlignInMap[ALIGN_CONST.BOTTOM_CENTER] = BottomCenter;
  AlignInMap[ALIGN_CONST.BOTTOM_LEFT] = BottomLeft;
  AlignInMap[ALIGN_CONST.BOTTOM_RIGHT] = BottomRight;
  AlignInMap[ALIGN_CONST.CENTER] = Center;
  AlignInMap[ALIGN_CONST.LEFT_CENTER] = LeftCenter;
  AlignInMap[ALIGN_CONST.RIGHT_CENTER] = RightCenter;
  AlignInMap[ALIGN_CONST.TOP_CENTER] = TopCenter;
  AlignInMap[ALIGN_CONST.TOP_LEFT] = TopLeft;
  AlignInMap[ALIGN_CONST.TOP_RIGHT] = TopRight;
  var QuickSet = function QuickSet(child, alignIn, position, offsetX, offsetY) {
    return AlignInMap[position](child, alignIn, offsetX, offsetY);
  };

  var GetFastValue$1 = Phaser.Utils.Objects.GetFastValue;
  var globHexagonGrid = new Hexagon();

  /**
   * @typedef {object} GridAlignConfig
   *
   * @property {integer} [width=-1] - The width of the grid in items (not pixels). -1 means lay all items out horizontally, regardless of quantity.
   *                                  If both this value and height are set to -1 then this value overrides it and the `height` value is ignored.
   * @property {integer} [height=-1] - The height of the grid in items (not pixels). -1 means lay all items out vertically, regardless of quantity.
   *                                   If both this value and `width` are set to -1 then `width` overrides it and this value is ignored.
   * @property {integer} [cellWidth=1] - The width of the cell, in pixels, in which the item is positioned.
   * @property {integer} [cellHeight=1] - The height of the cell, in pixels, in which the item is positioned.
   * @property {integer} [position=6] - The alignment position. One of the Phaser.Display.Align consts such as `TOP_LEFT` or `RIGHT_CENTER`.
   * @property {number} [x=0] - Optionally place the top-left of the final grid at this coordinate.
   * @property {number} [y=0] - Optionally place the top-left of the final grid at this coordinate.
   */

  var GridAlign$1 = function GridAlign(items, options) {
    if (options === undefined) {
      options = {};
    }
    var width = GetFastValue$1(options, 'width', -1);
    var height = GetFastValue$1(options, 'height', -1);
    var cellWidth = GetFastValue$1(options, 'cellWidth', 1);
    var cellHeight = GetFastValue$1(options, 'cellHeight', cellWidth);
    var staggeraxis = GetFastValue$1(options, 'staggeraxis', 1);
    var staggerindex = GetFastValue$1(options, 'staggerindex', 1);
    var position = GetFastValue$1(options, 'position', Phaser.Display.Align.CENTER);
    var x = GetFastValue$1(options, 'x', 0);
    var y = GetFastValue$1(options, 'y', 0);
    globHexagonGrid.setOriginPosition(x, y).setCellSize(cellWidth, cellHeight).setType(staggeraxis, staggerindex);
    globZone.setSize(cellWidth, cellHeight);
    var lastRowIdx = height - 1,
      lastColIdx = width - 1,
      rowIdx = 0,
      colIdx = 0;
    for (var i = 0, cnt = items.length; i < cnt; i++) {
      globHexagonGrid.getWorldXY(colIdx, rowIdx, globZone);
      QuickSet(items[i], globZone, position);
      if (width === -1) {
        rowIdx++;
      } else if (height === -1) {
        colIdx++;
      } else {
        if (colIdx === lastColIdx) {
          if (rowIdx === lastRowIdx) {
            break;
          } else {
            colIdx = 0;
            rowIdx++;
          }
        } else {
          colIdx++;
        }
      }
    }
    return items;
  };

  var GetWorldX$1 = function GetWorldX(tileX, tileY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globWorldXY;
    }
    var worldX, worldY;
    switch (this.mode) {
      case 0:
        // orthogonal
        worldX = tileX * this.width;
        worldY = tileY * this.height;
        break;
      case 1:
        // isometric
        worldX = (tileX - tileY) * this._halfWidth;
        worldY = (tileX + tileY) * this._halfHeight;
        break;
    }
    worldX += this.x;
    worldY += this.y;
    out.x = worldX;
    out.y = worldY;
    return out;
  };
  var globWorldXY = {};

  var GetWorldX = function GetWorldX(tileX, tileY) {
    return this.getWorldXY(tileX, tileY, true).x;
  };

  var GetWorldY = function GetWorldY(tileX, tileY) {
    return this.getWorldXY(tileX, tileY, true).y;
  };

  var GetTileXY = function GetTileXY(worldX, worldY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globTileXY;
    }
    worldX -= this.x;
    worldY -= this.y;
    var tmpx = worldX / this.width;
    var tmpy = worldY / this.height;
    switch (this.mode) {
      case 0:
        // orthogonal
        out.x = Math.round(tmpx);
        out.y = Math.round(tmpy);
        break;
      case 1:
        // isometric            
        out.x = Math.round(+tmpx + tmpy);
        out.y = Math.round(-tmpx + tmpy);
        break;
    }
    return out;
  };
  var globTileXY = {};

  var GetTileX = function GetTileX(worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).x;
  };

  var GetTileY = function GetTileY(worldX, worldY) {
    return this.getTileXY(worldX, worldY, true).y;
  };

  var Quad = /*#__PURE__*/function () {
    function Quad(config) {
      _classCallCheck(this, Quad);
      this.resetFromJSON(config);
    }
    _createClass(Quad, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setType(GetValue(o, 'type', 0));
        this.setDirectionMode(GetValue(o, 'dir', 4));
        this.setOriginPosition(GetValue(o, 'x', 0), GetValue(o, 'y', 0));
        this.setCellSize(GetValue(o, 'cellWidth', 0), GetValue(o, 'cellHeight', 0));
      }
    }, {
      key: "setType",
      value: function setType(type) {
        if (typeof type === 'string') {
          type = ORIENTATIONTYPE[type];
        }
        this.mode = type; // orthogonal, isometric, or staggered
        return this;
      }
    }, {
      key: "setDirectionMode",
      value: function setDirectionMode(mode) {
        if (typeof mode === 'string') {
          mode = DIRMODE[mode];
        }
        this.directions = mode;
        return this;
      }
    }, {
      key: "setOriginPosition",
      value: function setOriginPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this._width = value;
        this._halfWidth = value / 2;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this._height = value;
        this._halfHeight = value / 2;
      }
    }, {
      key: "setCellSize",
      value: function setCellSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "cellWidth",
      get: function get() {
        return this.width;
      },
      set: function set(value) {
        this.width = value;
      }
    }, {
      key: "cellHeight",
      get: function get() {
        return this.height;
      },
      set: function set(value) {
        this.height = value;
      }
    }]);
    return Quad;
  }();
  var methods = {
    getWorldXY: GetWorldX$1,
    getWorldX: GetWorldX,
    getWorldY: GetWorldY,
    getTileXY: GetTileXY,
    getTileX: GetTileX,
    getTileY: GetTileY
  };
  Object.assign(Quad.prototype, methods);
  var ORIENTATIONTYPE = {
    'orthogonal': 0,
    'isometric': 1,
    'staggered': 2
  };
  var DIRMODE = {
    '4dir': 4,
    '8dir': 8
  };

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var globQuadGrid = new Quad();

  /**
   * @typedef {object} GridAlignConfig
   *
   * @property {integer} [width=-1] - The width of the grid in items (not pixels). -1 means lay all items out horizontally, regardless of quantity.
   *                                  If both this value and height are set to -1 then this value overrides it and the `height` value is ignored.
   * @property {integer} [height=-1] - The height of the grid in items (not pixels). -1 means lay all items out vertically, regardless of quantity.
   *                                   If both this value and `width` are set to -1 then `width` overrides it and this value is ignored.
   * @property {integer} [cellWidth=1] - The width of the cell, in pixels, in which the item is positioned.
   * @property {integer} [cellHeight=1] - The height of the cell, in pixels, in which the item is positioned.
   * @property {integer} [position=6] - The alignment position. One of the Phaser.Display.Align consts such as `TOP_LEFT` or `RIGHT_CENTER`.
   * @property {number} [x=0] - Optionally place the top-left of the final grid at this coordinate.
   * @property {number} [y=0] - Optionally place the top-left of the final grid at this coordinate.
   */

  var GridAlign = function GridAlign(items, options) {
    if (options === undefined) {
      options = {};
    }
    var width = GetFastValue(options, 'width', -1);
    var height = GetFastValue(options, 'height', -1);
    var cellWidth = GetFastValue(options, 'cellWidth', 1);
    var cellHeight = GetFastValue(options, 'cellHeight', cellWidth);
    var type = GetFastValue(options, 'type', 0);
    var position = GetFastValue(options, 'position', Phaser.Display.Align.CENTER);
    var x = GetFastValue(options, 'x', 0);
    var y = GetFastValue(options, 'y', 0);
    globQuadGrid.setOriginPosition(x, y).setCellSize(cellWidth, cellHeight).setType(type);
    globZone.setSize(cellWidth, cellHeight);
    var lastRowIdx = height - 1,
      lastColIdx = width - 1,
      rowIdx = 0,
      colIdx = 0;
    for (var i = 0, cnt = items.length; i < cnt; i++) {
      globQuadGrid.getWorldXY(colIdx, rowIdx, globZone);
      QuickSet(items[i], globZone, position);
      if (width === -1) {
        rowIdx++;
      } else if (height === -1) {
        colIdx++;
      } else {
        if (colIdx === lastColIdx) {
          if (rowIdx === lastRowIdx) {
            break;
          } else {
            colIdx = 0;
            rowIdx++;
          }
        } else {
          colIdx++;
        }
      }
    }
    return items;
  };

  var GridAlignPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(GridAlignPlugin, _Phaser$Plugins$BaseP);
    function GridAlignPlugin(pluginManager) {
      _classCallCheck(this, GridAlignPlugin);
      return _callSuper(this, GridAlignPlugin, [pluginManager]);
    }
    _createClass(GridAlignPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "hexagon",
      value: function hexagon(items, options) {
        return GridAlign$1(items, options);
      }
    }, {
      key: "quad",
      value: function quad(items, options) {
        return GridAlign(items, options);
      }
    }]);
    return GridAlignPlugin;
  }(Phaser.Plugins.BasePlugin);

  return GridAlignPlugin;

}));

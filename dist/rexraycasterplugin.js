(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexraycasterplugin = factory());
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

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
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

  Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround = Phaser.Math.RotateAround;
  var GetTopLeft = function GetTopLeft(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getTopLeft) {
      return gameObject.getTopLeft(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX;
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY;
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetTopRight = function GetTopRight(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getTopRight) {
      return gameObject.getTopRight(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX + GetDisplayWidth(gameObject);
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY;
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetBottomLeft = function GetBottomLeft(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getBottomLeft) {
      return gameObject.getBottomLeft(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX;
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY + GetDisplayHeight(gameObject);
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetBottomRight = function GetBottomRight(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getBottomRight) {
      return gameObject.getBottomRight(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX + GetDisplayWidth(gameObject);
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY + GetDisplayHeight(gameObject);
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GlobVector = undefined;
  var PrepareBoundsOutput = function PrepareBoundsOutput(gameObject, output, includeParent) {
    if (includeParent === undefined) {
      includeParent = false;
    }
    if (gameObject.rotation !== 0) {
      RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var Polygon$1 = Phaser.Geom.Polygon;
  var BoundsToPolygon = function BoundsToPolygon(gameObject, out) {
    if (out === undefined) {
      out = new Polygon$1();
    }
    var p0 = GetTopLeft(gameObject),
      p1 = GetTopRight(gameObject),
      p2 = GetBottomRight(gameObject),
      p3 = GetBottomLeft(gameObject);
    out.setTo([p0, p1, p2, p3, p0]);
    return out;
  };

  var Polygon = Phaser.Geom.Polygon;
  var SpliceOne = Phaser.Utils.Array.SpliceOne;
  var Obstacles = /*#__PURE__*/function () {
    function Obstacles() {
      _classCallCheck(this, Obstacles);
      this.gameObjects = [];
      this.polygons = [];
    }
    _createClass(Obstacles, [{
      key: "contains",
      value: function contains(gameObject) {
        return this.gameObjects.indexOf(gameObject) !== -1;
      }
    }, {
      key: "get",
      value: function get(index) {
        Obstacle.gameObject = this.gameObjects[index];
        Obstacle.polygon = this.polygons[index];
        return Obstacle;
      }
    }, {
      key: "addDestroyCallback",
      value: function addDestroyCallback(gameObject) {
        if (Array.isArray(gameObject)) {
          var gameObjects = gameObject;
          for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.addDestroyCallback(gameObjects[i]);
          }
          return this;
        }
        if (gameObject.on) {
          gameObject.once('destroy', this.onChildDestroy, this);
        }
        return this;
      }
    }, {
      key: "removeDestroyCallback",
      value: function removeDestroyCallback(gameObject) {
        if (Array.isArray(gameObject)) {
          var gameObjects = gameObject;
          for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.removeDestroyCallback(gameObjects[i]);
          }
          return this;
        }
        if (gameObject.off) {
          gameObject.off('destroy', this.onChildDestroy, this);
        }
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.removeDestroyCallback(this.gameObjects);
        this.gameObjects.length = 0;
        this.polygons.length = 0;
        return this;
      }
    }, {
      key: "add",
      value: function add(gameObject, polygon) {
        if (this.contains(gameObject)) {
          return this;
        }
        if (IsGameObject(gameObject)) {
          if (polygon === undefined) {
            polygon = BoundsToPolygon(gameObject);
          }
        } else if (gameObject instanceof Polygon) {
          polygon = gameObject;
        }
        this.gameObjects.push(gameObject);
        this.polygons.push(polygon);
        this.addDestroyCallback(gameObject);
        return this;
      }
    }, {
      key: "remove",
      value: function remove(gameObject) {
        var index = this.gameObjects.indexOf(gameObject);
        if (index === -1) {
          return this;
        }
        SpliceOne(this.gameObjects, index);
        SpliceOne(this.polygons, index);
        this.removeDestroyCallback(gameObject);
        return this;
      }
    }, {
      key: "onChildDestroy",
      value: function onChildDestroy(child, fromScene) {
        this.remove(child);
      }
    }, {
      key: "update",
      value: function update(gameObject, polygon) {
        var index = this.gameObjects.indexOf(gameObject);
        if (index === -1) {
          return this;
        }
        if (polygon === undefined) {
          polygon = BoundsToPolygon(gameObject, this.polygons[index]);
        }
        this.polygons[index] = polygon;
        return this;
      }
    }]);
    return Obstacles;
  }();
  var Obstacle = {};

  var GetLineToLine = Phaser.Geom.Intersects.GetLineToLine;
  var PointToLine = Phaser.Geom.Intersects.PointToLine;
  var GetLineToPoints = function GetLineToPoints(line, points, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globResult$1;
    }
    /* 
    out: {
        x,y,      // intersection point
        d,        // intersection distance
        segIndex  // intersection segment
    }
    */

    var closestIntersect = false;
    startPoint.setTo(line.x1, line.y1);
    out.d = Infinity;
    tempIntersect.set();
    var prev = points[0];
    for (var i = 1; i < points.length; i++) {
      var current = points[i];
      segment.setTo(prev.x, prev.y, current.x, current.y);
      prev = current;

      // Ignore case: start point of line is at segment
      if (PointToLine(startPoint, segment)) {
        continue;
      }
      if (GetLineToLine(line, segment, false, tempIntersect)) {
        if (tempIntersect.z < out.d) {
          out.x = tempIntersect.x;
          out.y = tempIntersect.y;
          out.d = tempIntersect.z;
          out.segIndex = i - 1;
          closestIntersect = true;
        }
      }
    }
    return closestIntersect ? out : null;
  };
  var globResult$1 = {};
  var startPoint = new Phaser.Geom.Point();
  var segment = new Phaser.Geom.Line();
  var tempIntersect = new Phaser.Math.Vector3();

  var Clear = function Clear(obj) {
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
      Clear(out);
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

  var GetAABB = Phaser.Geom.Polygon.GetAABB;
  var LineToRectangle = Phaser.Geom.Intersects.LineToRectangle;
  var GetLineToPolygon = function GetLineToPolygon(line, polygons, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globResult;
    }
    /* 
    out: {
        x,y,        // intersection point
        d,          // intersection distance
        segIndex,   // index of intersection segment
        shapeIndex  // index of intersection polygon
    }
    */

    if (!Array.isArray(polygons)) {
      polygons = [polygons];
    }
    var closestIntersect = false;
    out.d = Infinity;

    //  Reset our vec4s

    for (var i = 0; i < polygons.length; i++) {
      var polygon = polygons[i];

      // Run AABBTest when polygon is more than 8 edges
      if (polygon.points.length > 9 && !LineToRectangle(line, GetAABB(polygon, AABBRect))) {
        continue;
      }
      var intersectionResult = GetLineToPoints(line, polygon.points, true);
      if (intersectionResult) {
        if (intersectionResult.d < out.d) {
          Clone(intersectionResult, out); // x,y,d,segIndex
          out.shapeIndex = i;
          closestIntersect = true;
        }
      }
    }
    return closestIntersect ? out : null;
  };
  var globResult = {};
  var AABBRect = new Phaser.Geom.Rectangle();

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Line = Phaser.Geom.Line;
  var SetToAngle = Phaser.Geom.Line.SetToAngle;
  var ReflectAngle = Phaser.Geom.Line.ReflectAngle;
  var Reflection = /*#__PURE__*/function () {
    function Reflection(config) {
      _classCallCheck(this, Reflection);
      this.obstacles = new Obstacles();
      this.ray = new Line();
      this.setMaxRayLength(GetValue(config, 'maxRayLength', 10000));
      this.result = {
        hit: false,
        x: 0,
        y: 0,
        segment: new Line(),
        polygon: null,
        gameObject: null,
        reflectAngle: 0
      };
    }
    _createClass(Reflection, [{
      key: "destroy",
      value: function destroy() {
        this.obstacles.clear();
        this.obstacles = null;
        this.ray = null;
        this.result = null;
      }
    }, {
      key: "setMaxRayLength",
      value: function setMaxRayLength(length) {
        this.maxRayLength = length;
        return this;
      }
    }, {
      key: "addObstacle",
      value: function addObstacle(gameObject, polygon) {
        if (Array.isArray(gameObject)) {
          var gameObjects = gameObject;
          for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.obstacles.add(gameObjects[i]);
          }
        } else {
          this.obstacles.add(gameObject, polygon);
        }
        return this;
      }
    }, {
      key: "clearObstacle",
      value: function clearObstacle() {
        this.obstacles.clear();
        return this;
      }
    }, {
      key: "removeObstacle",
      value: function removeObstacle(gameObject) {
        if (Array.isArray(gameObject)) {
          var gameObjects = gameObject;
          for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.obstacles.remove(gameObjects[i]);
          }
        } else {
          this.obstacles.remove(gameObject);
        }
        return this;
      }
    }, {
      key: "updateObstacle",
      value: function updateObstacle(gameObject, polygon) {
        if (Array.isArray(gameObject)) {
          var gameObjects = gameObject;
          for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.obstacles.update(gameObjects[i]);
          }
        } else {
          this.obstacles.update(gameObject, polygon);
        }
        return this;
      }
    }, {
      key: "hitTest",
      value: function hitTest() {
        var result = GetLineToPolygon(this.ray, this.obstacles.polygons, true);
        if (result) {
          this.ray.x2 = result.x;
          this.ray.y2 = result.y;
          this.result.hit = true;
          this.result.x = result.x;
          this.result.y = result.y;
          var obstacle = this.obstacles.get(result.shapeIndex);
          this.result.polygon = obstacle.polygon;
          this.result.gameObject = obstacle.gameObject;
          var points = this.result.polygon.points,
            segIndex = result.segIndex,
            p0 = points[segIndex],
            p1 = points[segIndex + 1];
          var segment = this.result.segment;
          segment.setTo(p0.x, p0.y, p1.x, p1.y);
          this.result.reflectAngle = ReflectAngle(this.ray, segment);
        } else {
          this.result.hit = false;
        }
        return result ? this.result : false;
      }
    }, {
      key: "rayToward",
      value: function rayToward(x, y, angle) {
        SetToAngle(this.ray, x, y, angle, this.maxRayLength);
        return this.hitTest();
      }
    }]);
    return Reflection;
  }();

  var RaycasterPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(RaycasterPlugin, _Phaser$Plugins$BaseP);
    function RaycasterPlugin(pluginManager) {
      _classCallCheck(this, RaycasterPlugin);
      return _callSuper(this, RaycasterPlugin, [pluginManager]);
    }
    _createClass(RaycasterPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new Reflection(config);
      }
    }]);
    return RaycasterPlugin;
  }(Phaser.Plugins.BasePlugin);

  return RaycasterPlugin;

}));

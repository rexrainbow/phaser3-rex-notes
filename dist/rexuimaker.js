(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexuimaker = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }

    return _get.apply(this, arguments);
  }

  function set$1(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set$1 = Reflect.set;
    } else {
      set$1 = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set$1(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set$1(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
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

  /*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
  function isNothing(subject) {
    return (typeof subject === 'undefined') || (subject === null);
  }


  function isObject(subject) {
    return (typeof subject === 'object') && (subject !== null);
  }


  function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if (isNothing(sequence)) return [];

    return [ sequence ];
  }


  function extend(target, source) {
    var index, length, key, sourceKeys;

    if (source) {
      sourceKeys = Object.keys(source);

      for (index = 0, length = sourceKeys.length; index < length; index += 1) {
        key = sourceKeys[index];
        target[key] = source[key];
      }
    }

    return target;
  }


  function repeat(string, count) {
    var result = '', cycle;

    for (cycle = 0; cycle < count; cycle += 1) {
      result += string;
    }

    return result;
  }


  function isNegativeZero(number) {
    return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
  }


  var isNothing_1      = isNothing;
  var isObject_1       = isObject;
  var toArray_1        = toArray;
  var repeat_1         = repeat;
  var isNegativeZero_1 = isNegativeZero;
  var extend_1         = extend;

  var common = {
  	isNothing: isNothing_1,
  	isObject: isObject_1,
  	toArray: toArray_1,
  	repeat: repeat_1,
  	isNegativeZero: isNegativeZero_1,
  	extend: extend_1
  };

  // YAML error class. http://stackoverflow.com/questions/8458984


  function formatError(exception, compact) {
    var where = '', message = exception.reason || '(unknown reason)';

    if (!exception.mark) return message;

    if (exception.mark.name) {
      where += 'in "' + exception.mark.name + '" ';
    }

    where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';

    if (!compact && exception.mark.snippet) {
      where += '\n\n' + exception.mark.snippet;
    }

    return message + ' ' + where;
  }


  function YAMLException$1(reason, mark) {
    // Super constructor
    Error.call(this);

    this.name = 'YAMLException';
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);

    // Include stack trace in error object
    if (Error.captureStackTrace) {
      // Chrome and NodeJS
      Error.captureStackTrace(this, this.constructor);
    } else {
      // FF, IE 10+ and Safari 6+. Fallback for others
      this.stack = (new Error()).stack || '';
    }
  }


  // Inherit from Error
  YAMLException$1.prototype = Object.create(Error.prototype);
  YAMLException$1.prototype.constructor = YAMLException$1;


  YAMLException$1.prototype.toString = function toString(compact) {
    return this.name + ': ' + formatError(this, compact);
  };


  var exception = YAMLException$1;

  // get snippet for a single line, respecting maxLength
  function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    var head = '';
    var tail = '';
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;

    if (position - lineStart > maxHalfLength) {
      head = ' ... ';
      lineStart = position - maxHalfLength + head.length;
    }

    if (lineEnd - position > maxHalfLength) {
      tail = ' ...';
      lineEnd = position + maxHalfLength - tail.length;
    }

    return {
      str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, '→') + tail,
      pos: position - lineStart + head.length // relative position
    };
  }


  function padStart(string, max) {
    return common.repeat(' ', max - string.length) + string;
  }


  function makeSnippet(mark, options) {
    options = Object.create(options || null);

    if (!mark.buffer) return null;

    if (!options.maxLength) options.maxLength = 79;
    if (typeof options.indent      !== 'number') options.indent      = 1;
    if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
    if (typeof options.linesAfter  !== 'number') options.linesAfter  = 2;

    var re = /\r?\n|\r|\0/g;
    var lineStarts = [ 0 ];
    var lineEnds = [];
    var match;
    var foundLineNo = -1;

    while ((match = re.exec(mark.buffer))) {
      lineEnds.push(match.index);
      lineStarts.push(match.index + match[0].length);

      if (mark.position <= match.index && foundLineNo < 0) {
        foundLineNo = lineStarts.length - 2;
      }
    }

    if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;

    var result = '', i, line;
    var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);

    for (i = 1; i <= options.linesBefore; i++) {
      if (foundLineNo - i < 0) break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo - i],
        lineEnds[foundLineNo - i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
        maxLineLength
      );
      result = common.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) +
        ' | ' + line.str + '\n' + result;
    }

    line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n';
    result += common.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';

    for (i = 1; i <= options.linesAfter; i++) {
      if (foundLineNo + i >= lineEnds.length) break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo + i],
        lineEnds[foundLineNo + i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
        maxLineLength
      );
      result += common.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) +
        ' | ' + line.str + '\n';
    }

    return result.replace(/\n$/, '');
  }


  var snippet = makeSnippet;

  var TYPE_CONSTRUCTOR_OPTIONS = [
    'kind',
    'multi',
    'resolve',
    'construct',
    'instanceOf',
    'predicate',
    'represent',
    'representName',
    'defaultStyle',
    'styleAliases'
  ];

  var YAML_NODE_KINDS = [
    'scalar',
    'sequence',
    'mapping'
  ];

  function compileStyleAliases(map) {
    var result = {};

    if (map !== null) {
      Object.keys(map).forEach(function (style) {
        map[style].forEach(function (alias) {
          result[String(alias)] = style;
        });
      });
    }

    return result;
  }

  function Type$1(tag, options) {
    options = options || {};

    Object.keys(options).forEach(function (name) {
      if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
        throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
      }
    });

    // TODO: Add tag format check.
    this.options       = options; // keep original options in case user wants to extend this type later
    this.tag           = tag;
    this.kind          = options['kind']          || null;
    this.resolve       = options['resolve']       || function () { return true; };
    this.construct     = options['construct']     || function (data) { return data; };
    this.instanceOf    = options['instanceOf']    || null;
    this.predicate     = options['predicate']     || null;
    this.represent     = options['represent']     || null;
    this.representName = options['representName'] || null;
    this.defaultStyle  = options['defaultStyle']  || null;
    this.multi         = options['multi']         || false;
    this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
      throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
  }

  var type = Type$1;

  /*eslint-disable max-len*/





  function compileList(schema, name) {
    var result = [];

    schema[name].forEach(function (currentType) {
      var newIndex = result.length;

      result.forEach(function (previousType, previousIndex) {
        if (previousType.tag === currentType.tag &&
            previousType.kind === currentType.kind &&
            previousType.multi === currentType.multi) {

          newIndex = previousIndex;
        }
      });

      result[newIndex] = currentType;
    });

    return result;
  }


  function compileMap(/* lists... */) {
    var result = {
          scalar: {},
          sequence: {},
          mapping: {},
          fallback: {},
          multi: {
            scalar: [],
            sequence: [],
            mapping: [],
            fallback: []
          }
        }, index, length;

    function collectType(type) {
      if (type.multi) {
        result.multi[type.kind].push(type);
        result.multi['fallback'].push(type);
      } else {
        result[type.kind][type.tag] = result['fallback'][type.tag] = type;
      }
    }

    for (index = 0, length = arguments.length; index < length; index += 1) {
      arguments[index].forEach(collectType);
    }
    return result;
  }


  function Schema$1(definition) {
    return this.extend(definition);
  }


  Schema$1.prototype.extend = function extend(definition) {
    var implicit = [];
    var explicit = [];

    if (definition instanceof type) {
      // Schema.extend(type)
      explicit.push(definition);

    } else if (Array.isArray(definition)) {
      // Schema.extend([ type1, type2, ... ])
      explicit = explicit.concat(definition);

    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
      // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
      if (definition.implicit) implicit = implicit.concat(definition.implicit);
      if (definition.explicit) explicit = explicit.concat(definition.explicit);

    } else {
      throw new exception('Schema.extend argument should be a Type, [ Type ], ' +
        'or a schema definition ({ implicit: [...], explicit: [...] })');
    }

    implicit.forEach(function (type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
      }

      if (type$1.loadKind && type$1.loadKind !== 'scalar') {
        throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
      }

      if (type$1.multi) {
        throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
      }
    });

    explicit.forEach(function (type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
      }
    });

    var result = Object.create(Schema$1.prototype);

    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);

    result.compiledImplicit = compileList(result, 'implicit');
    result.compiledExplicit = compileList(result, 'explicit');
    result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

    return result;
  };


  var schema = Schema$1;

  var str = new type('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (data) { return data !== null ? data : ''; }
  });

  var seq = new type('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (data) { return data !== null ? data : []; }
  });

  var map = new type('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (data) { return data !== null ? data : {}; }
  });

  var failsafe = new schema({
    explicit: [
      str,
      seq,
      map
    ]
  });

  function resolveYamlNull(data) {
    if (data === null) return true;

    var max = data.length;

    return (max === 1 && data === '~') ||
           (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
  }

  function constructYamlNull() {
    return null;
  }

  function isNull(object) {
    return object === null;
  }

  var _null = new type('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
      canonical: function () { return '~';    },
      lowercase: function () { return 'null'; },
      uppercase: function () { return 'NULL'; },
      camelcase: function () { return 'Null'; },
      empty:     function () { return '';     }
    },
    defaultStyle: 'lowercase'
  });

  function resolveYamlBoolean(data) {
    if (data === null) return false;

    var max = data.length;

    return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
           (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
  }

  function constructYamlBoolean(data) {
    return data === 'true' ||
           data === 'True' ||
           data === 'TRUE';
  }

  function isBoolean(object) {
    return Object.prototype.toString.call(object) === '[object Boolean]';
  }

  var bool = new type('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function (object) { return object ? 'true' : 'false'; },
      uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
      camelcase: function (object) { return object ? 'True' : 'False'; }
    },
    defaultStyle: 'lowercase'
  });

  function isHexCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
           ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
           ((0x61/* a */ <= c) && (c <= 0x66/* f */));
  }

  function isOctCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
  }

  function isDecCode(c) {
    return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
  }

  function resolveYamlInteger(data) {
    if (data === null) return false;

    var max = data.length,
        index = 0,
        hasDigits = false,
        ch;

    if (!max) return false;

    ch = data[index];

    // sign
    if (ch === '-' || ch === '+') {
      ch = data[++index];
    }

    if (ch === '0') {
      // 0
      if (index + 1 === max) return true;
      ch = data[++index];

      // base 2, base 8, base 16

      if (ch === 'b') {
        // base 2
        index++;

        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (ch !== '0' && ch !== '1') return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }


      if (ch === 'x') {
        // base 16
        index++;

        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (!isHexCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }


      if (ch === 'o') {
        // base 8
        index++;

        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }
    }

    // base 10 (except 0)

    // value should not start with `_`;
    if (ch === '_') return false;

    for (; index < max; index++) {
      ch = data[index];
      if (ch === '_') continue;
      if (!isDecCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }

    // Should have digits and should not end with `_`
    if (!hasDigits || ch === '_') return false;

    return true;
  }

  function constructYamlInteger(data) {
    var value = data, sign = 1, ch;

    if (value.indexOf('_') !== -1) {
      value = value.replace(/_/g, '');
    }

    ch = value[0];

    if (ch === '-' || ch === '+') {
      if (ch === '-') sign = -1;
      value = value.slice(1);
      ch = value[0];
    }

    if (value === '0') return 0;

    if (ch === '0') {
      if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
      if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
      if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
    }

    return sign * parseInt(value, 10);
  }

  function isInteger(object) {
    return (Object.prototype.toString.call(object)) === '[object Number]' &&
           (object % 1 === 0 && !common.isNegativeZero(object));
  }

  var int = new type('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
      octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
      decimal:     function (obj) { return obj.toString(10); },
      /* eslint-disable max-len */
      hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
    },
    defaultStyle: 'decimal',
    styleAliases: {
      binary:      [ 2,  'bin' ],
      octal:       [ 8,  'oct' ],
      decimal:     [ 10, 'dec' ],
      hexadecimal: [ 16, 'hex' ]
    }
  });

  var YAML_FLOAT_PATTERN = new RegExp(
    // 2.5e4, 2.5 and integers
    '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
    // .2e4, .2
    // special case, seems not from spec
    '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
    // .inf
    '|[-+]?\\.(?:inf|Inf|INF)' +
    // .nan
    '|\\.(?:nan|NaN|NAN))$');

  function resolveYamlFloat(data) {
    if (data === null) return false;

    if (!YAML_FLOAT_PATTERN.test(data) ||
        // Quick hack to not allow integers end with `_`
        // Probably should update regexp & check speed
        data[data.length - 1] === '_') {
      return false;
    }

    return true;
  }

  function constructYamlFloat(data) {
    var value, sign;

    value  = data.replace(/_/g, '').toLowerCase();
    sign   = value[0] === '-' ? -1 : 1;

    if ('+-'.indexOf(value[0]) >= 0) {
      value = value.slice(1);
    }

    if (value === '.inf') {
      return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

    } else if (value === '.nan') {
      return NaN;
    }
    return sign * parseFloat(value, 10);
  }


  var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

  function representYamlFloat(object, style) {
    var res;

    if (isNaN(object)) {
      switch (style) {
        case 'lowercase': return '.nan';
        case 'uppercase': return '.NAN';
        case 'camelcase': return '.NaN';
      }
    } else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case 'lowercase': return '.inf';
        case 'uppercase': return '.INF';
        case 'camelcase': return '.Inf';
      }
    } else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case 'lowercase': return '-.inf';
        case 'uppercase': return '-.INF';
        case 'camelcase': return '-.Inf';
      }
    } else if (common.isNegativeZero(object)) {
      return '-0.0';
    }

    res = object.toString(10);

    // JS stringifier can build scientific format without dots: 5e-100,
    // while YAML requres dot: 5.e-100. Fix it with simple hack

    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
  }

  function isFloat(object) {
    return (Object.prototype.toString.call(object) === '[object Number]') &&
           (object % 1 !== 0 || common.isNegativeZero(object));
  }

  var float = new type('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: 'lowercase'
  });

  var json = failsafe.extend({
    implicit: [
      _null,
      bool,
      int,
      float
    ]
  });

  var core = json;

  var YAML_DATE_REGEXP = new RegExp(
    '^([0-9][0-9][0-9][0-9])'          + // [1] year
    '-([0-9][0-9])'                    + // [2] month
    '-([0-9][0-9])$');                   // [3] day

  var YAML_TIMESTAMP_REGEXP = new RegExp(
    '^([0-9][0-9][0-9][0-9])'          + // [1] year
    '-([0-9][0-9]?)'                   + // [2] month
    '-([0-9][0-9]?)'                   + // [3] day
    '(?:[Tt]|[ \\t]+)'                 + // ...
    '([0-9][0-9]?)'                    + // [4] hour
    ':([0-9][0-9])'                    + // [5] minute
    ':([0-9][0-9])'                    + // [6] second
    '(?:\\.([0-9]*))?'                 + // [7] fraction
    '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
    '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

  function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
  }

  function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0,
        delta = null, tz_hour, tz_minute, date;

    match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

    if (match === null) throw new Error('Date resolve error');

    // match: [1] year [2] month [3] day

    year = +(match[1]);
    month = +(match[2]) - 1; // JS month starts with 0
    day = +(match[3]);

    if (!match[4]) { // no hour
      return new Date(Date.UTC(year, month, day));
    }

    // match: [4] hour [5] minute [6] second [7] fraction

    hour = +(match[4]);
    minute = +(match[5]);
    second = +(match[6]);

    if (match[7]) {
      fraction = match[7].slice(0, 3);
      while (fraction.length < 3) { // milli-seconds
        fraction += '0';
      }
      fraction = +fraction;
    }

    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

    if (match[9]) {
      tz_hour = +(match[10]);
      tz_minute = +(match[11] || 0);
      delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
      if (match[9] === '-') delta = -delta;
    }

    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

    if (delta) date.setTime(date.getTime() - delta);

    return date;
  }

  function representYamlTimestamp(object /*, style*/) {
    return object.toISOString();
  }

  var timestamp = new type('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
  });

  function resolveYamlMerge(data) {
    return data === '<<' || data === null;
  }

  var merge = new type('tag:yaml.org,2002:merge', {
    kind: 'scalar',
    resolve: resolveYamlMerge
  });

  /*eslint-disable no-bitwise*/





  // [ 64, 65, 66 ] -> [ padding, CR, LF ]
  var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


  function resolveYamlBinary(data) {
    if (data === null) return false;

    var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

    // Convert one by one.
    for (idx = 0; idx < max; idx++) {
      code = map.indexOf(data.charAt(idx));

      // Skip CR/LF
      if (code > 64) continue;

      // Fail on illegal characters
      if (code < 0) return false;

      bitlen += 6;
    }

    // If there are any bits left, source was corrupted
    return (bitlen % 8) === 0;
  }

  function constructYamlBinary(data) {
    var idx, tailbits,
        input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
        max = input.length,
        map = BASE64_MAP,
        bits = 0,
        result = [];

    // Collect by 6*4 bits (3 bytes)

    for (idx = 0; idx < max; idx++) {
      if ((idx % 4 === 0) && idx) {
        result.push((bits >> 16) & 0xFF);
        result.push((bits >> 8) & 0xFF);
        result.push(bits & 0xFF);
      }

      bits = (bits << 6) | map.indexOf(input.charAt(idx));
    }

    // Dump tail

    tailbits = (max % 4) * 6;

    if (tailbits === 0) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    } else if (tailbits === 18) {
      result.push((bits >> 10) & 0xFF);
      result.push((bits >> 2) & 0xFF);
    } else if (tailbits === 12) {
      result.push((bits >> 4) & 0xFF);
    }

    return new Uint8Array(result);
  }

  function representYamlBinary(object /*, style*/) {
    var result = '', bits = 0, idx, tail,
        max = object.length,
        map = BASE64_MAP;

    // Convert every three bytes to 4 ASCII characters.

    for (idx = 0; idx < max; idx++) {
      if ((idx % 3 === 0) && idx) {
        result += map[(bits >> 18) & 0x3F];
        result += map[(bits >> 12) & 0x3F];
        result += map[(bits >> 6) & 0x3F];
        result += map[bits & 0x3F];
      }

      bits = (bits << 8) + object[idx];
    }

    // Dump tail

    tail = max % 3;

    if (tail === 0) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    } else if (tail === 2) {
      result += map[(bits >> 10) & 0x3F];
      result += map[(bits >> 4) & 0x3F];
      result += map[(bits << 2) & 0x3F];
      result += map[64];
    } else if (tail === 1) {
      result += map[(bits >> 2) & 0x3F];
      result += map[(bits << 4) & 0x3F];
      result += map[64];
      result += map[64];
    }

    return result;
  }

  function isBinary(obj) {
    return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
  }

  var binary = new type('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
  });

  var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  var _toString$2       = Object.prototype.toString;

  function resolveYamlOmap(data) {
    if (data === null) return true;

    var objectKeys = [], index, length, pair, pairKey, pairHasKey,
        object = data;

    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      pairHasKey = false;

      if (_toString$2.call(pair) !== '[object Object]') return false;

      for (pairKey in pair) {
        if (_hasOwnProperty$3.call(pair, pairKey)) {
          if (!pairHasKey) pairHasKey = true;
          else return false;
        }
      }

      if (!pairHasKey) return false;

      if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
      else return false;
    }

    return true;
  }

  function constructYamlOmap(data) {
    return data !== null ? data : [];
  }

  var omap = new type('tag:yaml.org,2002:omap', {
    kind: 'sequence',
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
  });

  var _toString$1 = Object.prototype.toString;

  function resolveYamlPairs(data) {
    if (data === null) return true;

    var index, length, pair, keys, result,
        object = data;

    result = new Array(object.length);

    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];

      if (_toString$1.call(pair) !== '[object Object]') return false;

      keys = Object.keys(pair);

      if (keys.length !== 1) return false;

      result[index] = [ keys[0], pair[keys[0]] ];
    }

    return true;
  }

  function constructYamlPairs(data) {
    if (data === null) return [];

    var index, length, pair, keys, result,
        object = data;

    result = new Array(object.length);

    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];

      keys = Object.keys(pair);

      result[index] = [ keys[0], pair[keys[0]] ];
    }

    return result;
  }

  var pairs = new type('tag:yaml.org,2002:pairs', {
    kind: 'sequence',
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
  });

  var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;

  function resolveYamlSet(data) {
    if (data === null) return true;

    var key, object = data;

    for (key in object) {
      if (_hasOwnProperty$2.call(object, key)) {
        if (object[key] !== null) return false;
      }
    }

    return true;
  }

  function constructYamlSet(data) {
    return data !== null ? data : {};
  }

  var set = new type('tag:yaml.org,2002:set', {
    kind: 'mapping',
    resolve: resolveYamlSet,
    construct: constructYamlSet
  });

  var _default = core.extend({
    implicit: [
      timestamp,
      merge
    ],
    explicit: [
      binary,
      omap,
      pairs,
      set
    ]
  });

  /*eslint-disable max-len,no-use-before-define*/







  var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;


  var CONTEXT_FLOW_IN   = 1;
  var CONTEXT_FLOW_OUT  = 2;
  var CONTEXT_BLOCK_IN  = 3;
  var CONTEXT_BLOCK_OUT = 4;


  var CHOMPING_CLIP  = 1;
  var CHOMPING_STRIP = 2;
  var CHOMPING_KEEP  = 3;


  var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
  var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
  var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
  var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


  function _class(obj) { return Object.prototype.toString.call(obj); }

  function is_EOL(c) {
    return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
  }

  function is_WHITE_SPACE(c) {
    return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
  }

  function is_WS_OR_EOL(c) {
    return (c === 0x09/* Tab */) ||
           (c === 0x20/* Space */) ||
           (c === 0x0A/* LF */) ||
           (c === 0x0D/* CR */);
  }

  function is_FLOW_INDICATOR(c) {
    return c === 0x2C/* , */ ||
           c === 0x5B/* [ */ ||
           c === 0x5D/* ] */ ||
           c === 0x7B/* { */ ||
           c === 0x7D/* } */;
  }

  function fromHexCode(c) {
    var lc;

    if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
      return c - 0x30;
    }

    /*eslint-disable no-bitwise*/
    lc = c | 0x20;

    if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
      return lc - 0x61 + 10;
    }

    return -1;
  }

  function escapedHexLen(c) {
    if (c === 0x78/* x */) { return 2; }
    if (c === 0x75/* u */) { return 4; }
    if (c === 0x55/* U */) { return 8; }
    return 0;
  }

  function fromDecimalCode(c) {
    if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
      return c - 0x30;
    }

    return -1;
  }

  function simpleEscapeSequence(c) {
    /* eslint-disable indent */
    return (c === 0x30/* 0 */) ? '\x00' :
          (c === 0x61/* a */) ? '\x07' :
          (c === 0x62/* b */) ? '\x08' :
          (c === 0x74/* t */) ? '\x09' :
          (c === 0x09/* Tab */) ? '\x09' :
          (c === 0x6E/* n */) ? '\x0A' :
          (c === 0x76/* v */) ? '\x0B' :
          (c === 0x66/* f */) ? '\x0C' :
          (c === 0x72/* r */) ? '\x0D' :
          (c === 0x65/* e */) ? '\x1B' :
          (c === 0x20/* Space */) ? ' ' :
          (c === 0x22/* " */) ? '\x22' :
          (c === 0x2F/* / */) ? '/' :
          (c === 0x5C/* \ */) ? '\x5C' :
          (c === 0x4E/* N */) ? '\x85' :
          (c === 0x5F/* _ */) ? '\xA0' :
          (c === 0x4C/* L */) ? '\u2028' :
          (c === 0x50/* P */) ? '\u2029' : '';
  }

  function charFromCodepoint(c) {
    if (c <= 0xFFFF) {
      return String.fromCharCode(c);
    }
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode(
      ((c - 0x010000) >> 10) + 0xD800,
      ((c - 0x010000) & 0x03FF) + 0xDC00
    );
  }

  var simpleEscapeCheck = new Array(256); // integer, for fast access
  var simpleEscapeMap = new Array(256);
  for (var i = 0; i < 256; i++) {
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
  }


  function State$1(input, options) {
    this.input = input;

    this.filename  = options['filename']  || null;
    this.schema    = options['schema']    || _default;
    this.onWarning = options['onWarning'] || null;
    // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
    // if such documents have no explicit %YAML directive
    this.legacy    = options['legacy']    || false;

    this.json      = options['json']      || false;
    this.listener  = options['listener']  || null;

    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap       = this.schema.compiledTypeMap;

    this.length     = input.length;
    this.position   = 0;
    this.line       = 0;
    this.lineStart  = 0;
    this.lineIndent = 0;

    // position of first leading tab in the current line,
    // used to make sure there are no tabs in the indentation
    this.firstTabInLine = -1;

    this.documents = [];

    /*
    this.version;
    this.checkLineBreaks;
    this.tagMap;
    this.anchorMap;
    this.tag;
    this.anchor;
    this.kind;
    this.result;*/

  }


  function generateError(state, message) {
    var mark = {
      name:     state.filename,
      buffer:   state.input.slice(0, -1), // omit trailing \0
      position: state.position,
      line:     state.line,
      column:   state.position - state.lineStart
    };

    mark.snippet = snippet(mark);

    return new exception(message, mark);
  }

  function throwError(state, message) {
    throw generateError(state, message);
  }

  function throwWarning(state, message) {
    if (state.onWarning) {
      state.onWarning.call(null, generateError(state, message));
    }
  }


  var directiveHandlers = {

    YAML: function handleYamlDirective(state, name, args) {

      var match, major, minor;

      if (state.version !== null) {
        throwError(state, 'duplication of %YAML directive');
      }

      if (args.length !== 1) {
        throwError(state, 'YAML directive accepts exactly one argument');
      }

      match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

      if (match === null) {
        throwError(state, 'ill-formed argument of the YAML directive');
      }

      major = parseInt(match[1], 10);
      minor = parseInt(match[2], 10);

      if (major !== 1) {
        throwError(state, 'unacceptable YAML version of the document');
      }

      state.version = args[0];
      state.checkLineBreaks = (minor < 2);

      if (minor !== 1 && minor !== 2) {
        throwWarning(state, 'unsupported YAML version of the document');
      }
    },

    TAG: function handleTagDirective(state, name, args) {

      var handle, prefix;

      if (args.length !== 2) {
        throwError(state, 'TAG directive accepts exactly two arguments');
      }

      handle = args[0];
      prefix = args[1];

      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
      }

      if (_hasOwnProperty$1.call(state.tagMap, handle)) {
        throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }

      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
      }

      try {
        prefix = decodeURIComponent(prefix);
      } catch (err) {
        throwError(state, 'tag prefix is malformed: ' + prefix);
      }

      state.tagMap[handle] = prefix;
    }
  };


  function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;

    if (start < end) {
      _result = state.input.slice(start, end);

      if (checkJson) {
        for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
          _character = _result.charCodeAt(_position);
          if (!(_character === 0x09 ||
                (0x20 <= _character && _character <= 0x10FFFF))) {
            throwError(state, 'expected valid JSON character');
          }
        }
      } else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError(state, 'the stream contains non-printable characters');
      }

      state.result += _result;
    }
  }

  function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;

    if (!common.isObject(source)) {
      throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
    }

    sourceKeys = Object.keys(source);

    for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
      key = sourceKeys[index];

      if (!_hasOwnProperty$1.call(destination, key)) {
        destination[key] = source[key];
        overridableKeys[key] = true;
      }
    }
  }

  function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode,
    startLine, startLineStart, startPos) {

    var index, quantity;

    // The output is a plain object here, so keys can only be strings.
    // We need to convert keyNode to a string, but doing so can hang the process
    // (deeply nested arrays that explode exponentially using aliases).
    if (Array.isArray(keyNode)) {
      keyNode = Array.prototype.slice.call(keyNode);

      for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
        if (Array.isArray(keyNode[index])) {
          throwError(state, 'nested arrays are not supported inside keys');
        }

        if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
          keyNode[index] = '[object Object]';
        }
      }
    }

    // Avoid code execution in load() via toString property
    // (still use its own toString for arrays, timestamps,
    // and whatever user schema extensions happen to have @@toStringTag)
    if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
      keyNode = '[object Object]';
    }


    keyNode = String(keyNode);

    if (_result === null) {
      _result = {};
    }

    if (keyTag === 'tag:yaml.org,2002:merge') {
      if (Array.isArray(valueNode)) {
        for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
          mergeMappings(state, _result, valueNode[index], overridableKeys);
        }
      } else {
        mergeMappings(state, _result, valueNode, overridableKeys);
      }
    } else {
      if (!state.json &&
          !_hasOwnProperty$1.call(overridableKeys, keyNode) &&
          _hasOwnProperty$1.call(_result, keyNode)) {
        state.line = startLine || state.line;
        state.lineStart = startLineStart || state.lineStart;
        state.position = startPos || state.position;
        throwError(state, 'duplicated mapping key');
      }

      // used for this specific key only because Object.defineProperty is slow
      if (keyNode === '__proto__') {
        Object.defineProperty(_result, keyNode, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: valueNode
        });
      } else {
        _result[keyNode] = valueNode;
      }
      delete overridableKeys[keyNode];
    }

    return _result;
  }

  function readLineBreak(state) {
    var ch;

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x0A/* LF */) {
      state.position++;
    } else if (ch === 0x0D/* CR */) {
      state.position++;
      if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
        state.position++;
      }
    } else {
      throwError(state, 'a line break is expected');
    }

    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
  }

  function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0,
        ch = state.input.charCodeAt(state.position);

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        if (ch === 0x09/* Tab */ && state.firstTabInLine === -1) {
          state.firstTabInLine = state.position;
        }
        ch = state.input.charCodeAt(++state.position);
      }

      if (allowComments && ch === 0x23/* # */) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
      }

      if (is_EOL(ch)) {
        readLineBreak(state);

        ch = state.input.charCodeAt(state.position);
        lineBreaks++;
        state.lineIndent = 0;

        while (ch === 0x20/* Space */) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
      } else {
        break;
      }
    }

    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
      throwWarning(state, 'deficient indentation');
    }

    return lineBreaks;
  }

  function testDocumentSeparator(state) {
    var _position = state.position,
        ch;

    ch = state.input.charCodeAt(_position);

    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
        ch === state.input.charCodeAt(_position + 1) &&
        ch === state.input.charCodeAt(_position + 2)) {

      _position += 3;

      ch = state.input.charCodeAt(_position);

      if (ch === 0 || is_WS_OR_EOL(ch)) {
        return true;
      }
    }

    return false;
  }

  function writeFoldedLines(state, count) {
    if (count === 1) {
      state.result += ' ';
    } else if (count > 1) {
      state.result += common.repeat('\n', count - 1);
    }
  }


  function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding,
        following,
        captureStart,
        captureEnd,
        hasPendingContent,
        _line,
        _lineStart,
        _lineIndent,
        _kind = state.kind,
        _result = state.result,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (is_WS_OR_EOL(ch)      ||
        is_FLOW_INDICATOR(ch) ||
        ch === 0x23/* # */    ||
        ch === 0x26/* & */    ||
        ch === 0x2A/* * */    ||
        ch === 0x21/* ! */    ||
        ch === 0x7C/* | */    ||
        ch === 0x3E/* > */    ||
        ch === 0x27/* ' */    ||
        ch === 0x22/* " */    ||
        ch === 0x25/* % */    ||
        ch === 0x40/* @ */    ||
        ch === 0x60/* ` */) {
      return false;
    }

    if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        return false;
      }
    }

    state.kind = 'scalar';
    state.result = '';
    captureStart = captureEnd = state.position;
    hasPendingContent = false;

    while (ch !== 0) {
      if (ch === 0x3A/* : */) {
        following = state.input.charCodeAt(state.position + 1);

        if (is_WS_OR_EOL(following) ||
            withinFlowCollection && is_FLOW_INDICATOR(following)) {
          break;
        }

      } else if (ch === 0x23/* # */) {
        preceding = state.input.charCodeAt(state.position - 1);

        if (is_WS_OR_EOL(preceding)) {
          break;
        }

      } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
                 withinFlowCollection && is_FLOW_INDICATOR(ch)) {
        break;

      } else if (is_EOL(ch)) {
        _line = state.line;
        _lineStart = state.lineStart;
        _lineIndent = state.lineIndent;
        skipSeparationSpace(state, false, -1);

        if (state.lineIndent >= nodeIndent) {
          hasPendingContent = true;
          ch = state.input.charCodeAt(state.position);
          continue;
        } else {
          state.position = captureEnd;
          state.line = _line;
          state.lineStart = _lineStart;
          state.lineIndent = _lineIndent;
          break;
        }
      }

      if (hasPendingContent) {
        captureSegment(state, captureStart, captureEnd, false);
        writeFoldedLines(state, state.line - _line);
        captureStart = captureEnd = state.position;
        hasPendingContent = false;
      }

      if (!is_WHITE_SPACE(ch)) {
        captureEnd = state.position + 1;
      }

      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, captureEnd, false);

    if (state.result) {
      return true;
    }

    state.kind = _kind;
    state.result = _result;
    return false;
  }

  function readSingleQuotedScalar(state, nodeIndent) {
    var ch,
        captureStart, captureEnd;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x27/* ' */) {
      return false;
    }

    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;

    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 0x27/* ' */) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);

        if (ch === 0x27/* ' */) {
          captureStart = state.position;
          state.position++;
          captureEnd = state.position;
        } else {
          return true;
        }

      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;

      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, 'unexpected end of the document within a single quoted scalar');

      } else {
        state.position++;
        captureEnd = state.position;
      }
    }

    throwError(state, 'unexpected end of the stream within a single quoted scalar');
  }

  function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart,
        captureEnd,
        hexLength,
        hexResult,
        tmp,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x22/* " */) {
      return false;
    }

    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;

    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 0x22/* " */) {
        captureSegment(state, captureStart, state.position, true);
        state.position++;
        return true;

      } else if (ch === 0x5C/* \ */) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);

        if (is_EOL(ch)) {
          skipSeparationSpace(state, false, nodeIndent);

          // TODO: rework to inline fn with no type cast?
        } else if (ch < 256 && simpleEscapeCheck[ch]) {
          state.result += simpleEscapeMap[ch];
          state.position++;

        } else if ((tmp = escapedHexLen(ch)) > 0) {
          hexLength = tmp;
          hexResult = 0;

          for (; hexLength > 0; hexLength--) {
            ch = state.input.charCodeAt(++state.position);

            if ((tmp = fromHexCode(ch)) >= 0) {
              hexResult = (hexResult << 4) + tmp;

            } else {
              throwError(state, 'expected hexadecimal character');
            }
          }

          state.result += charFromCodepoint(hexResult);

          state.position++;

        } else {
          throwError(state, 'unknown escape sequence');
        }

        captureStart = captureEnd = state.position;

      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;

      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, 'unexpected end of the document within a double quoted scalar');

      } else {
        state.position++;
        captureEnd = state.position;
      }
    }

    throwError(state, 'unexpected end of the stream within a double quoted scalar');
  }

  function readFlowCollection(state, nodeIndent) {
    var readNext = true,
        _line,
        _lineStart,
        _pos,
        _tag     = state.tag,
        _result,
        _anchor  = state.anchor,
        following,
        terminator,
        isPair,
        isExplicitPair,
        isMapping,
        overridableKeys = Object.create(null),
        keyNode,
        keyTag,
        valueNode,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x5B/* [ */) {
      terminator = 0x5D;/* ] */
      isMapping = false;
      _result = [];
    } else if (ch === 0x7B/* { */) {
      terminator = 0x7D;/* } */
      isMapping = true;
      _result = {};
    } else {
      return false;
    }

    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }

    ch = state.input.charCodeAt(++state.position);

    while (ch !== 0) {
      skipSeparationSpace(state, true, nodeIndent);

      ch = state.input.charCodeAt(state.position);

      if (ch === terminator) {
        state.position++;
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = isMapping ? 'mapping' : 'sequence';
        state.result = _result;
        return true;
      } else if (!readNext) {
        throwError(state, 'missed comma between flow collection entries');
      } else if (ch === 0x2C/* , */) {
        // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
        throwError(state, "expected the node content, but found ','");
      }

      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;

      if (ch === 0x3F/* ? */) {
        following = state.input.charCodeAt(state.position + 1);

        if (is_WS_OR_EOL(following)) {
          isPair = isExplicitPair = true;
          state.position++;
          skipSeparationSpace(state, true, nodeIndent);
        }
      }

      _line = state.line; // Save the current line.
      _lineStart = state.lineStart;
      _pos = state.position;
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state.tag;
      keyNode = state.result;
      skipSeparationSpace(state, true, nodeIndent);

      ch = state.input.charCodeAt(state.position);

      if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
        isPair = true;
        ch = state.input.charCodeAt(++state.position);
        skipSeparationSpace(state, true, nodeIndent);
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        valueNode = state.result;
      }

      if (isMapping) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
      } else if (isPair) {
        _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
      } else {
        _result.push(keyNode);
      }

      skipSeparationSpace(state, true, nodeIndent);

      ch = state.input.charCodeAt(state.position);

      if (ch === 0x2C/* , */) {
        readNext = true;
        ch = state.input.charCodeAt(++state.position);
      } else {
        readNext = false;
      }
    }

    throwError(state, 'unexpected end of the stream within a flow collection');
  }

  function readBlockScalar(state, nodeIndent) {
    var captureStart,
        folding,
        chomping       = CHOMPING_CLIP,
        didReadContent = false,
        detectedIndent = false,
        textIndent     = nodeIndent,
        emptyLines     = 0,
        atMoreIndented = false,
        tmp,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x7C/* | */) {
      folding = false;
    } else if (ch === 0x3E/* > */) {
      folding = true;
    } else {
      return false;
    }

    state.kind = 'scalar';
    state.result = '';

    while (ch !== 0) {
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
        if (CHOMPING_CLIP === chomping) {
          chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
        } else {
          throwError(state, 'repeat of a chomping mode identifier');
        }

      } else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
        } else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        } else {
          throwError(state, 'repeat of an indentation width identifier');
        }

      } else {
        break;
      }
    }

    if (is_WHITE_SPACE(ch)) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (is_WHITE_SPACE(ch));

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (!is_EOL(ch) && (ch !== 0));
      }
    }

    while (ch !== 0) {
      readLineBreak(state);
      state.lineIndent = 0;

      ch = state.input.charCodeAt(state.position);

      while ((!detectedIndent || state.lineIndent < textIndent) &&
             (ch === 0x20/* Space */)) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }

      if (!detectedIndent && state.lineIndent > textIndent) {
        textIndent = state.lineIndent;
      }

      if (is_EOL(ch)) {
        emptyLines++;
        continue;
      }

      // End of the scalar.
      if (state.lineIndent < textIndent) {

        // Perform the chomping.
        if (chomping === CHOMPING_KEEP) {
          state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
        } else if (chomping === CHOMPING_CLIP) {
          if (didReadContent) { // i.e. only if the scalar is not empty.
            state.result += '\n';
          }
        }

        // Break this `while` cycle and go to the funciton's epilogue.
        break;
      }

      // Folded style: use fancy rules to handle line breaks.
      if (folding) {

        // Lines starting with white space characters (more-indented lines) are not folded.
        if (is_WHITE_SPACE(ch)) {
          atMoreIndented = true;
          // except for the first content line (cf. Example 8.1)
          state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

        // End of more-indented block.
        } else if (atMoreIndented) {
          atMoreIndented = false;
          state.result += common.repeat('\n', emptyLines + 1);

        // Just one line break - perceive as the same line.
        } else if (emptyLines === 0) {
          if (didReadContent) { // i.e. only if we have already read some scalar content.
            state.result += ' ';
          }

        // Several line breaks - perceive as different lines.
        } else {
          state.result += common.repeat('\n', emptyLines);
        }

      // Literal style: just add exact number of line breaks between content lines.
      } else {
        // Keep all line breaks except the header line break.
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      }

      didReadContent = true;
      detectedIndent = true;
      emptyLines = 0;
      captureStart = state.position;

      while (!is_EOL(ch) && (ch !== 0)) {
        ch = state.input.charCodeAt(++state.position);
      }

      captureSegment(state, captureStart, state.position, false);
    }

    return true;
  }

  function readBlockSequence(state, nodeIndent) {
    var _line,
        _tag      = state.tag,
        _anchor   = state.anchor,
        _result   = [],
        following,
        detected  = false,
        ch;

    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;

    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }

    ch = state.input.charCodeAt(state.position);

    while (ch !== 0) {
      if (state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, 'tab characters must not be used in indentation');
      }

      if (ch !== 0x2D/* - */) {
        break;
      }

      following = state.input.charCodeAt(state.position + 1);

      if (!is_WS_OR_EOL(following)) {
        break;
      }

      detected = true;
      state.position++;

      if (skipSeparationSpace(state, true, -1)) {
        if (state.lineIndent <= nodeIndent) {
          _result.push(null);
          ch = state.input.charCodeAt(state.position);
          continue;
        }
      }

      _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
      _result.push(state.result);
      skipSeparationSpace(state, true, -1);

      ch = state.input.charCodeAt(state.position);

      if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
        throwError(state, 'bad indentation of a sequence entry');
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }

    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = 'sequence';
      state.result = _result;
      return true;
    }
    return false;
  }

  function readBlockMapping(state, nodeIndent, flowIndent) {
    var following,
        allowCompact,
        _line,
        _keyLine,
        _keyLineStart,
        _keyPos,
        _tag          = state.tag,
        _anchor       = state.anchor,
        _result       = {},
        overridableKeys = Object.create(null),
        keyTag        = null,
        keyNode       = null,
        valueNode     = null,
        atExplicitKey = false,
        detected      = false,
        ch;

    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;

    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }

    ch = state.input.charCodeAt(state.position);

    while (ch !== 0) {
      if (!atExplicitKey && state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, 'tab characters must not be used in indentation');
      }

      following = state.input.charCodeAt(state.position + 1);
      _line = state.line; // Save the current line.

      //
      // Explicit notation case. There are two separate blocks:
      // first for the key (denoted by "?") and second for the value (denoted by ":")
      //
      if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

        if (ch === 0x3F/* ? */) {
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = true;
          allowCompact = true;

        } else if (atExplicitKey) {
          // i.e. 0x3A/* : */ === character after the explicit key.
          atExplicitKey = false;
          allowCompact = true;

        } else {
          throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
        }

        state.position += 1;
        ch = following;

      //
      // Implicit notation case. Flow-style node as the key first, then ":", and the value.
      //
      } else {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;

        if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          // Neither implicit nor explicit notation.
          // Reading is done. Go to the epilogue.
          break;
        }

        if (state.line === _line) {
          ch = state.input.charCodeAt(state.position);

          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }

          if (ch === 0x3A/* : */) {
            ch = state.input.charCodeAt(++state.position);

            if (!is_WS_OR_EOL(ch)) {
              throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
            }

            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
              keyTag = keyNode = valueNode = null;
            }

            detected = true;
            atExplicitKey = false;
            allowCompact = false;
            keyTag = state.tag;
            keyNode = state.result;

          } else if (detected) {
            throwError(state, 'can not read an implicit mapping pair; a colon is missed');

          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true; // Keep the result of `composeNode`.
          }

        } else if (detected) {
          throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }
      }

      //
      // Common reading code for both explicit and implicit notations.
      //
      if (state.line === _line || state.lineIndent > nodeIndent) {
        if (atExplicitKey) {
          _keyLine = state.line;
          _keyLineStart = state.lineStart;
          _keyPos = state.position;
        }

        if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
          if (atExplicitKey) {
            keyNode = state.result;
          } else {
            valueNode = state.result;
          }
        }

        if (!atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }

        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
      }

      if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
        throwError(state, 'bad indentation of a mapping entry');
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }

    //
    // Epilogue.
    //

    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }

    // Expose the resulting mapping.
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = 'mapping';
      state.result = _result;
    }

    return detected;
  }

  function readTagProperty(state) {
    var _position,
        isVerbatim = false,
        isNamed    = false,
        tagHandle,
        tagName,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x21/* ! */) return false;

    if (state.tag !== null) {
      throwError(state, 'duplication of a tag property');
    }

    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x3C/* < */) {
      isVerbatim = true;
      ch = state.input.charCodeAt(++state.position);

    } else if (ch === 0x21/* ! */) {
      isNamed = true;
      tagHandle = '!!';
      ch = state.input.charCodeAt(++state.position);

    } else {
      tagHandle = '!';
    }

    _position = state.position;

    if (isVerbatim) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (ch !== 0 && ch !== 0x3E/* > */);

      if (state.position < state.length) {
        tagName = state.input.slice(_position, state.position);
        ch = state.input.charCodeAt(++state.position);
      } else {
        throwError(state, 'unexpected end of the stream within a verbatim tag');
      }
    } else {
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {

        if (ch === 0x21/* ! */) {
          if (!isNamed) {
            tagHandle = state.input.slice(_position - 1, state.position + 1);

            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError(state, 'named tag handle cannot contain such characters');
            }

            isNamed = true;
            _position = state.position + 1;
          } else {
            throwError(state, 'tag suffix cannot contain exclamation marks');
          }
        }

        ch = state.input.charCodeAt(++state.position);
      }

      tagName = state.input.slice(_position, state.position);

      if (PATTERN_FLOW_INDICATORS.test(tagName)) {
        throwError(state, 'tag suffix cannot contain flow indicator characters');
      }
    }

    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
      throwError(state, 'tag name cannot contain such characters: ' + tagName);
    }

    try {
      tagName = decodeURIComponent(tagName);
    } catch (err) {
      throwError(state, 'tag name is malformed: ' + tagName);
    }

    if (isVerbatim) {
      state.tag = tagName;

    } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
      state.tag = state.tagMap[tagHandle] + tagName;

    } else if (tagHandle === '!') {
      state.tag = '!' + tagName;

    } else if (tagHandle === '!!') {
      state.tag = 'tag:yaml.org,2002:' + tagName;

    } else {
      throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }

    return true;
  }

  function readAnchorProperty(state) {
    var _position,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x26/* & */) return false;

    if (state.anchor !== null) {
      throwError(state, 'duplication of an anchor property');
    }

    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (state.position === _position) {
      throwError(state, 'name of an anchor node must contain at least one character');
    }

    state.anchor = state.input.slice(_position, state.position);
    return true;
  }

  function readAlias(state) {
    var _position, alias,
        ch;

    ch = state.input.charCodeAt(state.position);

    if (ch !== 0x2A/* * */) return false;

    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (state.position === _position) {
      throwError(state, 'name of an alias node must contain at least one character');
    }

    alias = state.input.slice(_position, state.position);

    if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
      throwError(state, 'unidentified alias "' + alias + '"');
    }

    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
  }

  function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles,
        allowBlockScalars,
        allowBlockCollections,
        indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
        atNewLine  = false,
        hasContent = false,
        typeIndex,
        typeQuantity,
        typeList,
        type,
        flowIndent,
        blockIndent;

    if (state.listener !== null) {
      state.listener('open', state);
    }

    state.tag    = null;
    state.anchor = null;
    state.kind   = null;
    state.result = null;

    allowBlockStyles = allowBlockScalars = allowBlockCollections =
      CONTEXT_BLOCK_OUT === nodeContext ||
      CONTEXT_BLOCK_IN  === nodeContext;

    if (allowToSeek) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      }
    }

    if (indentStatus === 1) {
      while (readTagProperty(state) || readAnchorProperty(state)) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          allowBlockCollections = allowBlockStyles;

          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        } else {
          allowBlockCollections = false;
        }
      }
    }

    if (allowBlockCollections) {
      allowBlockCollections = atNewLine || allowCompact;
    }

    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
      if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
        flowIndent = parentIndent;
      } else {
        flowIndent = parentIndent + 1;
      }

      blockIndent = state.position - state.lineStart;

      if (indentStatus === 1) {
        if (allowBlockCollections &&
            (readBlockSequence(state, blockIndent) ||
             readBlockMapping(state, blockIndent, flowIndent)) ||
            readFlowCollection(state, flowIndent)) {
          hasContent = true;
        } else {
          if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
              readSingleQuotedScalar(state, flowIndent) ||
              readDoubleQuotedScalar(state, flowIndent)) {
            hasContent = true;

          } else if (readAlias(state)) {
            hasContent = true;

            if (state.tag !== null || state.anchor !== null) {
              throwError(state, 'alias node should not have any properties');
            }

          } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;

            if (state.tag === null) {
              state.tag = '?';
            }
          }

          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      } else if (indentStatus === 0) {
        // Special case: block sequences are allowed to have same indentation level as the parent.
        // http://www.yaml.org/spec/1.2/spec.html#id2799784
        hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
      }
    }

    if (state.tag === null) {
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }

    } else if (state.tag === '?') {
      // Implicit resolving is not allowed for non-scalar types, and '?'
      // non-specific tag is only automatically assigned to plain scalars.
      //
      // We only need to check kind conformity in case user explicitly assigns '?'
      // tag, for example like this: "!<?> [0]"
      //
      if (state.result !== null && state.kind !== 'scalar') {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }

      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type = state.implicitTypes[typeIndex];

        if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
          state.result = type.construct(state.result);
          state.tag = type.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (state.tag !== '!') {
      if (_hasOwnProperty$1.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
        type = state.typeMap[state.kind || 'fallback'][state.tag];
      } else {
        // looking for multi type
        type = null;
        typeList = state.typeMap.multi[state.kind || 'fallback'];

        for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
          if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
            type = typeList[typeIndex];
            break;
          }
        }
      }

      if (!type) {
        throwError(state, 'unknown tag !<' + state.tag + '>');
      }

      if (state.result !== null && type.kind !== state.kind) {
        throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
      }

      if (!type.resolve(state.result, state.tag)) { // `state.result` updated in resolver if matched
        throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
      } else {
        state.result = type.construct(state.result, state.tag);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    }

    if (state.listener !== null) {
      state.listener('close', state);
    }
    return state.tag !== null ||  state.anchor !== null || hasContent;
  }

  function readDocument(state) {
    var documentStart = state.position,
        _position,
        directiveName,
        directiveArgs,
        hasDirectives = false,
        ch;

    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = Object.create(null);
    state.anchorMap = Object.create(null);

    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      skipSeparationSpace(state, true, -1);

      ch = state.input.charCodeAt(state.position);

      if (state.lineIndent > 0 || ch !== 0x25/* % */) {
        break;
      }

      hasDirectives = true;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveName = state.input.slice(_position, state.position);
      directiveArgs = [];

      if (directiveName.length < 1) {
        throwError(state, 'directive name must not be less than one character in length');
      }

      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x23/* # */) {
          do { ch = state.input.charCodeAt(++state.position); }
          while (ch !== 0 && !is_EOL(ch));
          break;
        }

        if (is_EOL(ch)) break;

        _position = state.position;

        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        directiveArgs.push(state.input.slice(_position, state.position));
      }

      if (ch !== 0) readLineBreak(state);

      if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state, directiveName, directiveArgs);
      } else {
        throwWarning(state, 'unknown document directive "' + directiveName + '"');
      }
    }

    skipSeparationSpace(state, true, -1);

    if (state.lineIndent === 0 &&
        state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
        state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
        state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);

    } else if (hasDirectives) {
      throwError(state, 'directives end mark is expected');
    }

    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);

    if (state.checkLineBreaks &&
        PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
      throwWarning(state, 'non-ASCII line breaks are interpreted as content');
    }

    state.documents.push(state.result);

    if (state.position === state.lineStart && testDocumentSeparator(state)) {

      if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      }
      return;
    }

    if (state.position < (state.length - 1)) {
      throwError(state, 'end of the stream or a document separator is expected');
    } else {
      return;
    }
  }


  function loadDocuments(input, options) {
    input = String(input);
    options = options || {};

    if (input.length !== 0) {

      // Add tailing `\n` if not exists
      if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
          input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
        input += '\n';
      }

      // Strip BOM
      if (input.charCodeAt(0) === 0xFEFF) {
        input = input.slice(1);
      }
    }

    var state = new State$1(input, options);

    var nullpos = input.indexOf('\0');

    if (nullpos !== -1) {
      state.position = nullpos;
      throwError(state, 'null byte is not allowed in input');
    }

    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += '\0';

    while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
      state.lineIndent += 1;
      state.position += 1;
    }

    while (state.position < (state.length - 1)) {
      readDocument(state);
    }

    return state.documents;
  }


  function loadAll$1(input, iterator, options) {
    if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
      options = iterator;
      iterator = null;
    }

    var documents = loadDocuments(input, options);

    if (typeof iterator !== 'function') {
      return documents;
    }

    for (var index = 0, length = documents.length; index < length; index += 1) {
      iterator(documents[index]);
    }
  }


  function load$1(input, options) {
    var documents = loadDocuments(input, options);

    if (documents.length === 0) {
      /*eslint-disable no-undefined*/
      return undefined;
    } else if (documents.length === 1) {
      return documents[0];
    }
    throw new exception('expected a single document in the stream, but found more');
  }


  var loadAll_1 = loadAll$1;
  var load_1    = load$1;

  var loader = {
  	loadAll: loadAll_1,
  	load: load_1
  };

  /*eslint-disable no-use-before-define*/





  var _toString       = Object.prototype.toString;
  var _hasOwnProperty = Object.prototype.hasOwnProperty;

  var CHAR_BOM                  = 0xFEFF;
  var CHAR_TAB                  = 0x09; /* Tab */
  var CHAR_LINE_FEED            = 0x0A; /* LF */
  var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
  var CHAR_SPACE                = 0x20; /* Space */
  var CHAR_EXCLAMATION          = 0x21; /* ! */
  var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
  var CHAR_SHARP                = 0x23; /* # */
  var CHAR_PERCENT              = 0x25; /* % */
  var CHAR_AMPERSAND            = 0x26; /* & */
  var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
  var CHAR_ASTERISK             = 0x2A; /* * */
  var CHAR_COMMA                = 0x2C; /* , */
  var CHAR_MINUS                = 0x2D; /* - */
  var CHAR_COLON                = 0x3A; /* : */
  var CHAR_EQUALS               = 0x3D; /* = */
  var CHAR_GREATER_THAN         = 0x3E; /* > */
  var CHAR_QUESTION             = 0x3F; /* ? */
  var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
  var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
  var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
  var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
  var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
  var CHAR_VERTICAL_LINE        = 0x7C; /* | */
  var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

  var ESCAPE_SEQUENCES = {};

  ESCAPE_SEQUENCES[0x00]   = '\\0';
  ESCAPE_SEQUENCES[0x07]   = '\\a';
  ESCAPE_SEQUENCES[0x08]   = '\\b';
  ESCAPE_SEQUENCES[0x09]   = '\\t';
  ESCAPE_SEQUENCES[0x0A]   = '\\n';
  ESCAPE_SEQUENCES[0x0B]   = '\\v';
  ESCAPE_SEQUENCES[0x0C]   = '\\f';
  ESCAPE_SEQUENCES[0x0D]   = '\\r';
  ESCAPE_SEQUENCES[0x1B]   = '\\e';
  ESCAPE_SEQUENCES[0x22]   = '\\"';
  ESCAPE_SEQUENCES[0x5C]   = '\\\\';
  ESCAPE_SEQUENCES[0x85]   = '\\N';
  ESCAPE_SEQUENCES[0xA0]   = '\\_';
  ESCAPE_SEQUENCES[0x2028] = '\\L';
  ESCAPE_SEQUENCES[0x2029] = '\\P';

  var DEPRECATED_BOOLEANS_SYNTAX = [
    'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
    'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
  ];

  var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;

  function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;

    if (map === null) return {};

    result = {};
    keys = Object.keys(map);

    for (index = 0, length = keys.length; index < length; index += 1) {
      tag = keys[index];
      style = String(map[tag]);

      if (tag.slice(0, 2) === '!!') {
        tag = 'tag:yaml.org,2002:' + tag.slice(2);
      }
      type = schema.compiledTypeMap['fallback'][tag];

      if (type && _hasOwnProperty.call(type.styleAliases, style)) {
        style = type.styleAliases[style];
      }

      result[tag] = style;
    }

    return result;
  }

  function encodeHex(character) {
    var string, handle, length;

    string = character.toString(16).toUpperCase();

    if (character <= 0xFF) {
      handle = 'x';
      length = 2;
    } else if (character <= 0xFFFF) {
      handle = 'u';
      length = 4;
    } else if (character <= 0xFFFFFFFF) {
      handle = 'U';
      length = 8;
    } else {
      throw new exception('code point within a string may not be greater than 0xFFFFFFFF');
    }

    return '\\' + handle + common.repeat('0', length - string.length) + string;
  }


  var QUOTING_TYPE_SINGLE = 1,
      QUOTING_TYPE_DOUBLE = 2;

  function State$2(options) {
    this.schema        = options['schema'] || _default;
    this.indent        = Math.max(1, (options['indent'] || 2));
    this.noArrayIndent = options['noArrayIndent'] || false;
    this.skipInvalid   = options['skipInvalid'] || false;
    this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
    this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
    this.sortKeys      = options['sortKeys'] || false;
    this.lineWidth     = options['lineWidth'] || 80;
    this.noRefs        = options['noRefs'] || false;
    this.noCompatMode  = options['noCompatMode'] || false;
    this.condenseFlow  = options['condenseFlow'] || false;
    this.quotingType   = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes   = options['forceQuotes'] || false;
    this.replacer      = typeof options['replacer'] === 'function' ? options['replacer'] : null;

    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;

    this.tag = null;
    this.result = '';

    this.duplicates = [];
    this.usedDuplicates = null;
  }

  // Indents every line in a string. Empty lines (\n only) are not indented.
  function indentString(string, spaces) {
    var ind = common.repeat(' ', spaces),
        position = 0,
        next = -1,
        result = '',
        line,
        length = string.length;

    while (position < length) {
      next = string.indexOf('\n', position);
      if (next === -1) {
        line = string.slice(position);
        position = length;
      } else {
        line = string.slice(position, next + 1);
        position = next + 1;
      }

      if (line.length && line !== '\n') result += ind;

      result += line;
    }

    return result;
  }

  function generateNextLine(state, level) {
    return '\n' + common.repeat(' ', state.indent * level);
  }

  function testImplicitResolving(state, str) {
    var index, length, type;

    for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
      type = state.implicitTypes[index];

      if (type.resolve(str)) {
        return true;
      }
    }

    return false;
  }

  // [33] s-white ::= s-space | s-tab
  function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
  }

  // Returns true if the character can be printed without escaping.
  // From YAML 1.2: "any allowed characters known to be non-printable
  // should also be escaped. [However,] This isn’t mandatory"
  // Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
  function isPrintable(c) {
    return  (0x00020 <= c && c <= 0x00007E)
        || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
        || ((0x0E000 <= c && c <= 0x00FFFD) && c !== CHAR_BOM)
        ||  (0x10000 <= c && c <= 0x10FFFF);
  }

  // [34] ns-char ::= nb-char - s-white
  // [27] nb-char ::= c-printable - b-char - c-byte-order-mark
  // [26] b-char  ::= b-line-feed | b-carriage-return
  // Including s-white (for some reason, examples doesn't match specs in this aspect)
  // ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
  function isNsCharOrWhitespace(c) {
    return isPrintable(c)
      && c !== CHAR_BOM
      // - b-char
      && c !== CHAR_CARRIAGE_RETURN
      && c !== CHAR_LINE_FEED;
  }

  // [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
  //                             c = flow-in   ⇒ ns-plain-safe-in
  //                             c = block-key ⇒ ns-plain-safe-out
  //                             c = flow-key  ⇒ ns-plain-safe-in
  // [128] ns-plain-safe-out ::= ns-char
  // [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
  // [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
  //                            | ( /* An ns-char preceding */ “#” )
  //                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
  function isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return (
      // ns-plain-safe
      inblock ? // c = flow-in
        cIsNsCharOrWhitespace
        : cIsNsCharOrWhitespace
          // - c-flow-indicator
          && c !== CHAR_COMMA
          && c !== CHAR_LEFT_SQUARE_BRACKET
          && c !== CHAR_RIGHT_SQUARE_BRACKET
          && c !== CHAR_LEFT_CURLY_BRACKET
          && c !== CHAR_RIGHT_CURLY_BRACKET
    )
      // ns-plain-char
      && c !== CHAR_SHARP // false on '#'
      && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
      || (isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP) // change to true on '[^ ]#'
      || (prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
  }

  // Simplified test for values allowed as the first character in plain style.
  function isPlainSafeFirst(c) {
    // Uses a subset of ns-char - c-indicator
    // where ns-char = nb-char - s-white.
    // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
    return isPrintable(c) && c !== CHAR_BOM
      && !isWhitespace(c) // - s-white
      // - (c-indicator ::=
      // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
      && c !== CHAR_MINUS
      && c !== CHAR_QUESTION
      && c !== CHAR_COLON
      && c !== CHAR_COMMA
      && c !== CHAR_LEFT_SQUARE_BRACKET
      && c !== CHAR_RIGHT_SQUARE_BRACKET
      && c !== CHAR_LEFT_CURLY_BRACKET
      && c !== CHAR_RIGHT_CURLY_BRACKET
      // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
      && c !== CHAR_SHARP
      && c !== CHAR_AMPERSAND
      && c !== CHAR_ASTERISK
      && c !== CHAR_EXCLAMATION
      && c !== CHAR_VERTICAL_LINE
      && c !== CHAR_EQUALS
      && c !== CHAR_GREATER_THAN
      && c !== CHAR_SINGLE_QUOTE
      && c !== CHAR_DOUBLE_QUOTE
      // | “%” | “@” | “`”)
      && c !== CHAR_PERCENT
      && c !== CHAR_COMMERCIAL_AT
      && c !== CHAR_GRAVE_ACCENT;
  }

  // Simplified test for values allowed as the last character in plain style.
  function isPlainSafeLast(c) {
    // just not whitespace or colon, it will be checked to be plain character later
    return !isWhitespace(c) && c !== CHAR_COLON;
  }

  // Same as 'string'.codePointAt(pos), but works in older browsers.
  function codePointAt(string, pos) {
    var first = string.charCodeAt(pos), second;
    if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
      second = string.charCodeAt(pos + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }

  // Determines whether block indentation indicator is required.
  function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
  }

  var STYLE_PLAIN   = 1,
      STYLE_SINGLE  = 2,
      STYLE_LITERAL = 3,
      STYLE_FOLDED  = 4,
      STYLE_DOUBLE  = 5;

  // Determines which scalar styles are possible and returns the preferred style.
  // lineWidth = -1 => no limit.
  // Pre-conditions: str.length > 0.
  // Post-conditions:
  //    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
  //    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
  //    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
  function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth,
    testAmbiguousType, quotingType, forceQuotes, inblock) {

    var i;
    var char = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false; // only checked if shouldTrackWidth
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1; // count the first line correctly
    var plain = isPlainSafeFirst(codePointAt(string, 0))
            && isPlainSafeLast(codePointAt(string, string.length - 1));

    if (singleLineOnly || forceQuotes) {
      // Case: no block styles.
      // Check for disallowed characters to rule out plain and single.
      for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
    } else {
      // Case: block styles permitted.
      for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (char === CHAR_LINE_FEED) {
          hasLineBreak = true;
          // Check if any line can be folded.
          if (shouldTrackWidth) {
            hasFoldableLine = hasFoldableLine ||
              // Foldable line = too long, and not more-indented.
              (i - previousLineBreak - 1 > lineWidth &&
               string[previousLineBreak + 1] !== ' ');
            previousLineBreak = i;
          }
        } else if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
      // in case the end is missing a \n
      hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
        (i - previousLineBreak - 1 > lineWidth &&
         string[previousLineBreak + 1] !== ' '));
    }
    // Although every style can represent \n without escaping, prefer block styles
    // for multiline, since they're more readable and they don't add empty lines.
    // Also prefer folding a super-long line.
    if (!hasLineBreak && !hasFoldableLine) {
      // Strings interpretable as another type have to be quoted;
      // e.g. the string 'true' vs. the boolean true.
      if (plain && !forceQuotes && !testAmbiguousType(string)) {
        return STYLE_PLAIN;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    // Edge case: block indentation indicator can only have one digit.
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
      return STYLE_DOUBLE;
    }
    // At this point we know block styles are valid.
    // Prefer literal style unless we want to fold.
    if (!forceQuotes) {
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }

  // Note: line breaking/folding is implemented for only the folded style.
  // NB. We drop the last trailing newline (if any) of a returned block scalar
  //  since the dumper adds its own newline. This always works:
  //    • No ending newline => unaffected; already using strip "-" chomping.
  //    • Ending newline    => removed then restored.
  //  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
  function writeScalar(state, string, level, iskey, inblock) {
    state.dump = (function () {
      if (string.length === 0) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
      }
      if (!state.noCompatMode) {
        if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? ('"' + string + '"') : ("'" + string + "'");
        }
      }

      var indent = state.indent * Math.max(1, level); // no 0-indent scalars
      // As indentation gets deeper, let the width decrease monotonically
      // to the lower bound min(state.lineWidth, 40).
      // Note that this implies
      //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
      //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
      // This behaves better than a constant minimum width which disallows narrower options,
      // or an indent threshold which causes the width to suddenly increase.
      var lineWidth = state.lineWidth === -1
        ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

      // Without knowing if keys are implicit/explicit, assume implicit for safety.
      var singleLineOnly = iskey
        // No block styles in flow mode.
        || (state.flowLevel > -1 && level >= state.flowLevel);
      function testAmbiguity(string) {
        return testImplicitResolving(state, string);
      }

      switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth,
        testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {

        case STYLE_PLAIN:
          return string;
        case STYLE_SINGLE:
          return "'" + string.replace(/'/g, "''") + "'";
        case STYLE_LITERAL:
          return '|' + blockHeader(string, state.indent)
            + dropEndingNewline(indentString(string, indent));
        case STYLE_FOLDED:
          return '>' + blockHeader(string, state.indent)
            + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
        case STYLE_DOUBLE:
          return '"' + escapeString(string) + '"';
        default:
          throw new exception('impossible error: invalid scalar style');
      }
    }());
  }

  // Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
  function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

    // note the special case: the string '\n' counts as a "trailing" empty line.
    var clip =          string[string.length - 1] === '\n';
    var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
    var chomp = keep ? '+' : (clip ? '' : '-');

    return indentIndicator + chomp + '\n';
  }

  // (See the note for writeScalar.)
  function dropEndingNewline(string) {
    return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
  }

  // Note: a long line without a suitable break point will exceed the width limit.
  // Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
  function foldString(string, width) {
    // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
    // unless they're before or after a more-indented line, or at the very
    // beginning or end, in which case $k$ maps to $k$.
    // Therefore, parse each chunk as newline(s) followed by a content line.
    var lineRe = /(\n+)([^\n]*)/g;

    // first line (possibly an empty line)
    var result = (function () {
      var nextLF = string.indexOf('\n');
      nextLF = nextLF !== -1 ? nextLF : string.length;
      lineRe.lastIndex = nextLF;
      return foldLine(string.slice(0, nextLF), width);
    }());
    // If we haven't reached the first content line yet, don't add an extra \n.
    var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
    var moreIndented;

    // rest of the lines
    var match;
    while ((match = lineRe.exec(string))) {
      var prefix = match[1], line = match[2];
      moreIndented = (line[0] === ' ');
      result += prefix
        + (!prevMoreIndented && !moreIndented && line !== ''
          ? '\n' : '')
        + foldLine(line, width);
      prevMoreIndented = moreIndented;
    }

    return result;
  }

  // Greedy line breaking.
  // Picks the longest line under the limit each time,
  // otherwise settles for the shortest line over the limit.
  // NB. More-indented lines *cannot* be folded, as that would add an extra \n.
  function foldLine(line, width) {
    if (line === '' || line[0] === ' ') return line;

    // Since a more-indented line adds a \n, breaks can't be followed by a space.
    var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
    var match;
    // start is an inclusive index. end, curr, and next are exclusive.
    var start = 0, end, curr = 0, next = 0;
    var result = '';

    // Invariants: 0 <= start <= length-1.
    //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
    // Inside the loop:
    //   A match implies length >= 2, so curr and next are <= length-2.
    while ((match = breakRe.exec(line))) {
      next = match.index;
      // maintain invariant: curr - start <= width
      if (next - start > width) {
        end = (curr > start) ? curr : next; // derive end <= length-2
        result += '\n' + line.slice(start, end);
        // skip the space that was output as \n
        start = end + 1;                    // derive start <= length-1
      }
      curr = next;
    }

    // By the invariants, start <= length-1, so there is something left over.
    // It is either the whole string or a part starting from non-whitespace.
    result += '\n';
    // Insert a break if the remainder is too long and there is a break available.
    if (line.length - start > width && curr > start) {
      result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
    } else {
      result += line.slice(start);
    }

    return result.slice(1); // drop extra \n joiner
  }

  // Escapes a double-quoted string.
  function escapeString(string) {
    var result = '';
    var char = 0;
    var escapeSeq;

    for (var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      escapeSeq = ESCAPE_SEQUENCES[char];

      if (!escapeSeq && isPrintable(char)) {
        result += string[i];
        if (char >= 0x10000) result += string[i + 1];
      } else {
        result += escapeSeq || encodeHex(char);
      }
    }

    return result;
  }

  function writeFlowSequence(state, level, object) {
    var _result = '',
        _tag    = state.tag,
        index,
        length,
        value;

    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];

      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }

      // Write only valid elements, put null instead of invalid elements.
      if (writeNode(state, level, value, false, false) ||
          (typeof value === 'undefined' &&
           writeNode(state, level, null, false, false))) {

        if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
        _result += state.dump;
      }
    }

    state.tag = _tag;
    state.dump = '[' + _result + ']';
  }

  function writeBlockSequence(state, level, object, compact) {
    var _result = '',
        _tag    = state.tag,
        index,
        length,
        value;

    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];

      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }

      // Write only valid elements, put null instead of invalid elements.
      if (writeNode(state, level + 1, value, true, true, false, true) ||
          (typeof value === 'undefined' &&
           writeNode(state, level + 1, null, true, true, false, true))) {

        if (!compact || _result !== '') {
          _result += generateNextLine(state, level);
        }

        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          _result += '-';
        } else {
          _result += '- ';
        }

        _result += state.dump;
      }
    }

    state.tag = _tag;
    state.dump = _result || '[]'; // Empty sequence if no valid values.
  }

  function writeFlowMapping(state, level, object) {
    var _result       = '',
        _tag          = state.tag,
        objectKeyList = Object.keys(object),
        index,
        length,
        objectKey,
        objectValue,
        pairBuffer;

    for (index = 0, length = objectKeyList.length; index < length; index += 1) {

      pairBuffer = '';
      if (_result !== '') pairBuffer += ', ';

      if (state.condenseFlow) pairBuffer += '"';

      objectKey = objectKeyList[index];
      objectValue = object[objectKey];

      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }

      if (!writeNode(state, level, objectKey, false, false)) {
        continue; // Skip this pair because of invalid key;
      }

      if (state.dump.length > 1024) pairBuffer += '? ';

      pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

      if (!writeNode(state, level, objectValue, false, false)) {
        continue; // Skip this pair because of invalid value.
      }

      pairBuffer += state.dump;

      // Both key and value are valid.
      _result += pairBuffer;
    }

    state.tag = _tag;
    state.dump = '{' + _result + '}';
  }

  function writeBlockMapping(state, level, object, compact) {
    var _result       = '',
        _tag          = state.tag,
        objectKeyList = Object.keys(object),
        index,
        length,
        objectKey,
        objectValue,
        explicitPair,
        pairBuffer;

    // Allow sorting keys so that the output file is deterministic
    if (state.sortKeys === true) {
      // Default sorting
      objectKeyList.sort();
    } else if (typeof state.sortKeys === 'function') {
      // Custom sort function
      objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
      // Something is wrong
      throw new exception('sortKeys must be a boolean or a function');
    }

    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = '';

      if (!compact || _result !== '') {
        pairBuffer += generateNextLine(state, level);
      }

      objectKey = objectKeyList[index];
      objectValue = object[objectKey];

      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }

      if (!writeNode(state, level + 1, objectKey, true, true, true)) {
        continue; // Skip this pair because of invalid key.
      }

      explicitPair = (state.tag !== null && state.tag !== '?') ||
                     (state.dump && state.dump.length > 1024);

      if (explicitPair) {
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += '?';
        } else {
          pairBuffer += '? ';
        }
      }

      pairBuffer += state.dump;

      if (explicitPair) {
        pairBuffer += generateNextLine(state, level);
      }

      if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
        continue; // Skip this pair because of invalid value.
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += ':';
      } else {
        pairBuffer += ': ';
      }

      pairBuffer += state.dump;

      // Both key and value are valid.
      _result += pairBuffer;
    }

    state.tag = _tag;
    state.dump = _result || '{}'; // Empty mapping if no valid pairs.
  }

  function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;

    typeList = explicit ? state.explicitTypes : state.implicitTypes;

    for (index = 0, length = typeList.length; index < length; index += 1) {
      type = typeList[index];

      if ((type.instanceOf  || type.predicate) &&
          (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
          (!type.predicate  || type.predicate(object))) {

        if (explicit) {
          if (type.multi && type.representName) {
            state.tag = type.representName(object);
          } else {
            state.tag = type.tag;
          }
        } else {
          state.tag = '?';
        }

        if (type.represent) {
          style = state.styleMap[type.tag] || type.defaultStyle;

          if (_toString.call(type.represent) === '[object Function]') {
            _result = type.represent(object, style);
          } else if (_hasOwnProperty.call(type.represent, style)) {
            _result = type.represent[style](object, style);
          } else {
            throw new exception('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
          }

          state.dump = _result;
        }

        return true;
      }
    }

    return false;
  }

  // Serializes `object` and writes it to global `result`.
  // Returns true on success, or false on invalid object.
  //
  function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;

    if (!detectType(state, object, false)) {
      detectType(state, object, true);
    }

    var type = _toString.call(state.dump);
    var inblock = block;
    var tagStr;

    if (block) {
      block = (state.flowLevel < 0 || state.flowLevel > level);
    }

    var objectOrArray = type === '[object Object]' || type === '[object Array]',
        duplicateIndex,
        duplicate;

    if (objectOrArray) {
      duplicateIndex = state.duplicates.indexOf(object);
      duplicate = duplicateIndex !== -1;
    }

    if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
      compact = false;
    }

    if (duplicate && state.usedDuplicates[duplicateIndex]) {
      state.dump = '*ref_' + duplicateIndex;
    } else {
      if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
        state.usedDuplicates[duplicateIndex] = true;
      }
      if (type === '[object Object]') {
        if (block && (Object.keys(state.dump).length !== 0)) {
          writeBlockMapping(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + state.dump;
          }
        } else {
          writeFlowMapping(state, level, state.dump);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
          }
        }
      } else if (type === '[object Array]') {
        if (block && (state.dump.length !== 0)) {
          if (state.noArrayIndent && !isblockseq && level > 0) {
            writeBlockSequence(state, level - 1, state.dump, compact);
          } else {
            writeBlockSequence(state, level, state.dump, compact);
          }
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + state.dump;
          }
        } else {
          writeFlowSequence(state, level, state.dump);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
          }
        }
      } else if (type === '[object String]') {
        if (state.tag !== '?') {
          writeScalar(state, state.dump, level, iskey, inblock);
        }
      } else if (type === '[object Undefined]') {
        return false;
      } else {
        if (state.skipInvalid) return false;
        throw new exception('unacceptable kind of an object to dump ' + type);
      }

      if (state.tag !== null && state.tag !== '?') {
        // Need to encode all characters except those allowed by the spec:
        //
        // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
        // [36] ns-hex-digit    ::=  ns-dec-digit
        //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
        // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
        // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
        // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
        //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
        //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
        //
        // Also need to encode '!' because it has special meaning (end of tag prefix).
        //
        tagStr = encodeURI(
          state.tag[0] === '!' ? state.tag.slice(1) : state.tag
        ).replace(/!/g, '%21');

        if (state.tag[0] === '!') {
          tagStr = '!' + tagStr;
        } else if (tagStr.slice(0, 18) === 'tag:yaml.org,2002:') {
          tagStr = '!!' + tagStr.slice(18);
        } else {
          tagStr = '!<' + tagStr + '>';
        }

        state.dump = tagStr + ' ' + state.dump;
      }
    }

    return true;
  }

  function getDuplicateReferences(object, state) {
    var objects = [],
        duplicatesIndexes = [],
        index,
        length;

    inspectNode(object, objects, duplicatesIndexes);

    for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
      state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
  }

  function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList,
        index,
        length;

    if (object !== null && typeof object === 'object') {
      index = objects.indexOf(object);
      if (index !== -1) {
        if (duplicatesIndexes.indexOf(index) === -1) {
          duplicatesIndexes.push(index);
        }
      } else {
        objects.push(object);

        if (Array.isArray(object)) {
          for (index = 0, length = object.length; index < length; index += 1) {
            inspectNode(object[index], objects, duplicatesIndexes);
          }
        } else {
          objectKeyList = Object.keys(object);

          for (index = 0, length = objectKeyList.length; index < length; index += 1) {
            inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
          }
        }
      }
    }
  }

  function dump$1(input, options) {
    options = options || {};

    var state = new State$2(options);

    if (!state.noRefs) getDuplicateReferences(input, state);

    var value = input;

    if (state.replacer) {
      value = state.replacer.call({ '': value }, '', value);
    }

    if (writeNode(state, 0, value, true, true)) return state.dump + '\n';

    return '';
  }

  var dump_1 = dump$1;

  var dumper = {
  	dump: dump_1
  };

  function renamed(from, to) {
    return function () {
      throw new Error('Function yaml.' + from + ' is removed in js-yaml 4. ' +
        'Use yaml.' + to + ' instead, which is now safe by default.');
    };
  }


  var Type                = type;
  var Schema              = schema;
  var FAILSAFE_SCHEMA     = failsafe;
  var JSON_SCHEMA         = json;
  var CORE_SCHEMA         = core;
  var DEFAULT_SCHEMA      = _default;
  var load                = loader.load;
  var loadAll             = loader.loadAll;
  var dump                = dumper.dump;
  var YAMLException       = exception;

  // Re-export all types in case user wants to create custom schema
  var types = {
    binary:    binary,
    float:     float,
    map:       map,
    null:      _null,
    pairs:     pairs,
    set:       set,
    timestamp: timestamp,
    bool:      bool,
    int:       int,
    merge:     merge,
    omap:      omap,
    seq:       seq,
    str:       str
  };

  // Removed functions from JS-YAML 3.0.x
  var safeLoad            = renamed('safeLoad', 'load');
  var safeLoadAll         = renamed('safeLoadAll', 'loadAll');
  var safeDump            = renamed('safeDump', 'dump');

  var jsYaml = {
  	Type: Type,
  	Schema: Schema,
  	FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
  	JSON_SCHEMA: JSON_SCHEMA,
  	CORE_SCHEMA: CORE_SCHEMA,
  	DEFAULT_SCHEMA: DEFAULT_SCHEMA,
  	load: load,
  	loadAll: loadAll,
  	dump: dump,
  	YAMLException: YAMLException,
  	types: types,
  	safeLoad: safeLoad,
  	safeLoadAll: safeLoadAll,
  	safeDump: safeDump
  };

  var ParseYAML = function ParseYAML(s) {
    if (typeof s === 'string') {
      try {
        return jsYaml.load(s);
      } catch (e) {
        console.log(e);
        return undefined;
      }
    }

    return s;
  };

  var GetTypeName = function GetTypeName(data, styles) {
    if (data.hasOwnProperty('$type')) {
      return data.$type;
    } // Get $type from styles[`#${data.name}`]


    if (data.hasOwnProperty('name')) {
      var style = styles["#".concat(data.name)];

      if (style && style.hasOwnProperty('$type')) {
        return style.$type;
      }
    }

    if (data.hasOwnProperty('$class')) {
      var clasKeys = data.$class.split(' ');

      for (var i = 0, cnt = clasKeys.length; i < cnt; i++) {
        var style = styles[".".concat(clasKeys[i])];

        if (style && style.hasOwnProperty('$type')) {
          return style.$type;
        }
      }
    } // return undefined

  };

  var DeepClone = function DeepClone(inObject) {
    var outObject;
    var value;
    var key;

    if (_typeof(inObject) !== 'object' || inObject === null) {
      //  inObject is not an object
      return inObject;
    } //  Create an array or object to hold the values


    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
      value = inObject[key]; //  Recursively (deep) copy for nested objects, including arrays

      outObject[key] = DeepClone(value);
    }

    return outObject;
  };

  /*
  Priority of styles : name, $class, $type
    1. name    (#name)
    2. $class  (.class)
    3. $type   (type)    
  */

  var MergeStyle = function MergeStyle(data, styles) {
    if (styles === undefined) {
      return data;
    }

    if (data.hasOwnProperty('name')) {
      Merge(data, styles["#".concat(data.name)]);
    }

    if (data.hasOwnProperty('$class')) {
      var clasKeys = data.$class.split(' ');

      for (var i = 0, cnt = clasKeys.length; i < cnt; i++) {
        Merge(data, styles[".".concat(clasKeys[i])]);
      }
    }

    if (data.hasOwnProperty('$type')) {
      Merge(data, styles[data.$type]);
    }

    return data;
  };

  var Merge = function Merge(toObj, fromObj) {
    if (fromObj === undefined) {
      return toObj;
    }

    for (var key in fromObj) {
      if (!toObj.hasOwnProperty(key)) {
        // Only add nonexistent property
        toObj[key] = DeepClone(fromObj[key]);
      } else {
        var value = toObj[key];

        if (value && _typeof(value) === 'object') {
          Merge(value, fromObj[key]);
        }
      }
    }

    return toObj;
  };

  var ProperiteList = ['tint', 'alpha', 'visible', 'flipX', 'flipY'];

  var SetTextureProperties = function SetTextureProperties(gameObject, data) {
    for (var i = 0, cnt = ProperiteList.length; i < cnt; i++) {
      var key = ProperiteList[i];
      var value = data[key];

      if (value !== undefined) {
        gameObject[key] = value;
      }
    }

    if (data.cropResize && !gameObject.resize) {
      gameObject.resize = function (width, height) {
        gameObject.setCrop(0, 0, width, height);
        return gameObject;
      };
    }

    return gameObject;
  };

  var CreateAnyImage = function CreateAnyImage(scene, data, view, styles, customBuilders, ImageClass) {
    data = MergeStyle(data, styles);
    var gameObject = new ImageClass(scene, 0, 0, data.key, data.frame);

    if (data.width !== undefined) {
      gameObject.setDisplayWidth(data.width);
    }

    if (data.height !== undefined) {
      gameObject.setDisplayHeight(data.height);
    }

    SetTextureProperties(gameObject, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var PhaserImage = Phaser.GameObjects.Image;

  var CreateImage = function CreateImage(scene, data, view, styles, customBuilders) {
    return CreateAnyImage(scene, data, view, styles, customBuilders, PhaserImage);
  };

  var Sprite = Phaser.GameObjects.Sprite;

  var CreateSprite = function CreateSprite(scene, data, view, styles, customBuilders) {
    return CreateAnyImage(scene, data, view, styles, customBuilders, Sprite);
  };

  var PhaserVideo = Phaser.GameObjects.Video;

  var CreateVideo = function CreateVideo(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new PhaserVideo(scene, 0, 0, data.key);

    if (data.width !== undefined) {
      gameObject.setDisplayWidth(data.width);
    }

    if (data.height !== undefined) {
      gameObject.setDisplayHeight(data.height);
    }

    SetTextureProperties(gameObject, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var PhaserText = Phaser.GameObjects.Text;

  var CreateText = function CreateText(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new PhaserText(scene, 0, 0, data.text, data);
    SetTextureProperties(gameObject, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */
  var Utils$3 = Phaser.Renderer.WebGL.Utils;
  /**
   * Renders this Game Object with the WebGL Renderer to the given Camera.
   * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
   * This method should not be called directly. It is a utility function of the Render module.
   *
   * @method Phaser.GameObjects.Text#renderWebGL
   * @since 3.0.0
   * @private
   *
   * @param {Phaser.Renderer.WebGL.WebGLRenderer} renderer - A reference to the current active WebGL renderer.
   * @param {Phaser.GameObjects.Text} src - The Game Object being rendered in this call.
   * @param {number} interpolationPercentage - Reserved for future use and custom pipelines.
   * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
   * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
   */

  var WebGLRenderer$3 = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.width === 0 || src.height === 0) {
      return;
    }

    camera.addToRenderList(src);
    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils$3.getTintAppendFloatAlpha;
    var pipeline = renderer.pipelines.set(src.pipeline, src);
    var textureUnit = pipeline.setTexture2D(frame.glTexture, src);
    renderer.pipelines.preBatch(src);
    pipeline.batchTexture(src, frame.glTexture, width, height, src.x, src.y, width / src.style.resolution, height / src.style.resolution, src.scaleX, src.scaleY, src.rotation, src.flipX, src.flipY, src.scrollFactorX, src.scrollFactorY, src.displayOriginX, src.displayOriginY, 0, 0, width, height, getTint(src.tintTopLeft, camera.alpha * src._alphaTL), getTint(src.tintTopRight, camera.alpha * src._alphaTR), getTint(src.tintBottomLeft, camera.alpha * src._alphaBL), getTint(src.tintBottomRight, camera.alpha * src._alphaBR), src.tintFill, 0, 0, camera, parentMatrix, false, textureUnit);
    renderer.pipelines.postBatch(src);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Renders this Game Object with the Canvas Renderer to the given Camera.
   * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
   * This method should not be called directly. It is a utility function of the Render module.
   *
   * @method Phaser.GameObjects.Text#renderCanvas
   * @since 3.0.0
   * @private
   *
   * @param {Phaser.Renderer.Canvas.CanvasRenderer} renderer - A reference to the current active Canvas renderer.
   * @param {Phaser.GameObjects.Text} src - The Game Object being rendered in this call.
   * @param {number} interpolationPercentage - Reserved for future use and custom pipelines.
   * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
   * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
   */
  var CanvasRenderer$3 = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.width === 0 || src.height === 0) {
      return;
    }

    camera.addToRenderList(src);
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
  };

  var Render$4 = {
    renderWebGL: WebGLRenderer$3,
    renderCanvas: CanvasRenderer$3
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */
  var CanvasPool$3 = Phaser.Display.Canvas.CanvasPool;
  /**
   * Calculates the ascent, descent and fontSize of a given font style.
   *
   * @function Phaser.GameObjects.MeasureText
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.Text.TextStyle} textStyle - The TextStyle object to measure.
   *
   * @return {object} An object containing the ascent, descent and fontSize of the TextStyle.
   */

  var MeasureText = function MeasureText(textStyle) {
    // @property {HTMLCanvasElement} canvas - The canvas element that the text is rendered.
    var canvas = CanvasPool$3.create(this); // @property {HTMLCanvasElement} context - The context of the canvas element that the text is rendered to.

    var context = canvas.getContext('2d');
    textStyle.syncFont(canvas, context);
    var metrics = context.measureText(textStyle.testString);

    if ('actualBoundingBoxAscent' in metrics) {
      var ascent = metrics.actualBoundingBoxAscent;
      var descent = metrics.actualBoundingBoxDescent;
      var output = {
        ascent: ascent,
        descent: descent,
        fontSize: ascent + descent
      };
      CanvasPool$3.remove(canvas);
      return output;
    }

    var width = Math.ceil(metrics.width * textStyle.baselineX);
    var baseline = width;
    var height = 2 * baseline;
    baseline = baseline * textStyle.baselineY | 0;
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = '#f00';
    context.fillRect(0, 0, width, height);
    context.font = textStyle._font;
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#000';
    context.fillText(textStyle.testString, 0, baseline);
    var output = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    };

    if (!context.getImageData(0, 0, width, height)) {
      output.ascent = baseline;
      output.descent = baseline + 6;
      output.fontSize = output.ascent + output.descent;
      CanvasPool$3.remove(canvas);
      return output;
    }

    var imagedata = context.getImageData(0, 0, width, height).data;
    var pixels = imagedata.length;
    var line = width * 4;
    var i;
    var j;
    var idx = 0;
    var stop = false; // ascent. scan from top to bottom until we find a non red pixel

    for (i = 0; i < baseline; i++) {
      for (j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }

      if (!stop) {
        idx += line;
      } else {
        break;
      }
    }

    output.ascent = baseline - i;
    idx = pixels - line;
    stop = false; // descent. scan from bottom to top until we find a non red pixel

    for (i = height; i > baseline; i--) {
      for (j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }

      if (!stop) {
        idx -= line;
      } else {
        break;
      }
    }

    output.descent = i - baseline;
    output.fontSize = output.ascent + output.descent;
    CanvasPool$3.remove(canvas);
    return output;
  };

  var CONST = {
    // new line mode
    NO_NEWLINE: 0,
    RAW_NEWLINE: 1,
    WRAPPED_NEWLINE: 2,
    // wrap mode
    NO_WRAP: 0,
    WORD_WRAP: 1,
    CHAR_WRAP: 2,
    // split lines
    SPLITREGEXP: /(?:\r\n|\r|\n)/
  };

  var Pad = Phaser.Utils.String.Pad;

  var GetStyle = function GetStyle(style, canvas, context) {
    if (style == null) {
      return style;
    }

    switch (_typeof(style)) {
      case 'string':
        return style;

      case 'number':
        return "#".concat(Pad(Math.floor(style).toString(16), 6, '0', 1));

      case 'function':
        return style(canvas, context);

      case 'object':
        if (style.hasOwnProperty('r')) {
          if (style.hasOwnProperty('a')) {
            // rgba
            return "rgba(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ",").concat(style.a, ")");
          } else {
            // rgb
            return "rgb(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ")");
          }
        } else if (style.hasOwnProperty('h')) {
          if (style.hasOwnProperty('a')) {
            // hsla
            return "hsla(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ",").concat(style.a, ")");
          } else {
            // hsl
            return "hsl(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ")");
          }
        } else {
          return style; // Not a valid input
        }

      default:
        return style;
    }
  };

  var GetAdvancedValue$4 = Phaser.Utils.Objects.GetAdvancedValue;
  var GetValue$1l = Phaser.Utils.Objects.GetValue; //  Key: [ Object Key, Default Value, postCallback ]

  var propertyMap = {
    // background
    backgroundColor: ['backgroundColor', null, GetStyle],
    backgroundColor2: ['backgroundColor2', null, GetStyle],
    backgroundHorizontalGradient: ['backgroundHorizontalGradient', true, null],
    backgroundStrokeColor: ['backgroundStrokeColor', null, GetStyle],
    backgroundStrokeLineWidth: ['backgroundStrokeLineWidth', 2, null],
    backgroundCornerRadius: ['backgroundCornerRadius', 0, null],
    backgroundCornerIteration: ['backgroundCornerIteration', null, null],
    // font
    fontFamily: ['fontFamily', 'Courier', null],
    fontSize: ['fontSize', '16px', null],
    fontStyle: ['fontStyle', '', null],
    color: ['color', '#fff', GetStyle],
    stroke: ['stroke', '#fff', GetStyle],
    strokeThickness: ['strokeThickness', 0, null],
    shadowOffsetX: ['shadow.offsetX', 0, null],
    shadowOffsetY: ['shadow.offsetY', 0, null],
    shadowColor: ['shadow.color', '#000', GetStyle],
    shadowBlur: ['shadow.blur', 0, null],
    shadowStroke: ['shadow.stroke', false, null],
    shadowFill: ['shadow.fill', false, null],
    // underline
    underlineColor: ['underline.color', '#000', GetStyle],
    underlineThickness: ['underline.thickness', 0, null],
    underlineOffset: ['underline.offset', 0, null],
    // align
    halign: ['halign', 'left', null],
    valign: ['valign', 'top', null],
    // size
    maxLines: ['maxLines', 0, null],
    fixedWidth: ['fixedWidth', 0, null],
    fixedHeight: ['fixedHeight', 0, null],
    resolution: ['resolution', 0, null],
    lineSpacing: ['lineSpacing', 0, null],
    xOffset: ['xOffset', 0, null],
    rtl: ['rtl', false, null],
    testString: ['testString', '|MÃ‰qgy', null],
    baselineX: ['baselineX', 1.2, null],
    baselineY: ['baselineY', 1.4, null],
    // wrap
    wrapMode: ['wrap.mode', 0, null],
    wrapWidth: ['wrap.width', 0, null],
    wrapCallback: ['wrap.callback', null],
    wrapCallbackScope: ['wrap.callbackScope', null]
  };

  var TextStyle = /*#__PURE__*/function () {
    function TextStyle(text, style) {
      _classCallCheck(this, TextStyle);

      this.parent = text;
      this.backgroundColor;
      this.backgroundColor2;
      this.backgroundHorizontalGradient;
      this.backgroundStrokeColor;
      this.backgroundStrokeLineWidth;
      this.backgroundCornerRadius;
      this.backgroundCornerIteration;
      this.fontFamily;
      this.fontSize;
      this.fontStyle;
      this.color;
      this.stroke;
      this.strokeThickness;
      this.shadowOffsetX;
      this.shadowOffsetY;
      this.shadowColor;
      this.shadowBlur;
      this.shadowStroke;
      this.shadowFill;
      this.underlineColor;
      this.underlineThickness;
      this.underlineOffset;
      this.halign;
      this.valign;
      this.maxLines;
      this.fixedWidth;
      this.fixedHeight;
      this.resolution;
      this.lineSpacing;
      this.xOffset;
      this.rtl;
      this.testString;
      this.baselineX;
      this.baselineY;
      this.wrapMode;
      this.wrapWidth;
      this.wrapCallback;
      this.wrapCallbackScope;
      this._font; //  Set to defaults + user style

      this.setStyle(style, false, true);
    }

    _createClass(TextStyle, [{
      key: "canvas",
      get: function get() {
        return this.parent.canvasText.canvas;
      }
    }, {
      key: "context",
      get: function get() {
        return this.parent.canvasText.context;
      }
    }, {
      key: "isWrapFitMode",
      get: function get() {
        return this.fixedWidth > 0 && this.wrapMode !== CONST.NO_WRAP && this.wrapWidth === 0;
      }
    }, {
      key: "setStyle",
      value: function setStyle(style, updateText, setDefaults) {
        if (updateText === undefined) {
          updateText = true;
        }

        if (setDefaults === undefined) {
          setDefaults = false;
        }

        if (style && style.hasOwnProperty('wrap')) {
          var wrap = style.wrap;

          if (wrap.hasOwnProperty('mode')) {
            var mode = wrap.mode;

            if (typeof mode === 'string') {
              wrap.mode = WRAPMODE[mode];
            }
          } else {
            if (wrap.hasOwnProperty('width')) {
              wrap.mode = 1;
            }
          }
        } // default halign of RTL is 'right'


        if (style && style.rtl && setDefaults && !style.hasOwnProperty('halign')) {
          style.halign = 'right';
        } //  Avoid type mutation


        if (style && style.hasOwnProperty('fontSize') && typeof style.fontSize === 'number') {
          style.fontSize = style.fontSize.toString() + 'px';
        }

        for (var key in propertyMap) {
          var prop = propertyMap[key]; // [ Object Key, Default Value, preCallback ]

          var objKey = prop[0];
          var defaultValue = setDefaults ? prop[1] : this[key];
          var postCallback = prop[2];

          if (key === 'wrapCallback' || key === 'wrapCallbackScope') {
            // Callback & scope should be set without processing the values
            this[key] = GetValue$1l(style, objKey, defaultValue);
          } else {
            var value = GetAdvancedValue$4(style, objKey, defaultValue);

            if (postCallback) {
              value = postCallback(value);
            }

            this[key] = value;
          }
        } //  Allow for 'font' override


        var font = GetValue$1l(style, 'font', null);

        if (font === null) {
          this._font = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;
        } else {
          this._font = font;
        } //  Allow for 'fill' to be used in place of 'color'


        var fill = GetValue$1l(style, 'fill', null);

        if (fill !== null) {
          this.color = GetStyle(fill);
        }

        var imageData = GetValue$1l(style, 'images', undefined);

        if (imageData) {
          this.parent.addImage(imageData);
        }

        var metrics = GetValue$1l(style, 'metrics', false); //  Provide optional TextMetrics in the style object to avoid the canvas look-up / scanning
        //  Doing this is reset if you then change the font of this TextStyle after creation

        if (metrics) {
          this.metrics = {
            ascent: GetValue$1l(metrics, 'ascent', 0),
            descent: GetValue$1l(metrics, 'descent', 0),
            fontSize: GetValue$1l(metrics, 'fontSize', 0)
          };
        } else if (updateText || !this.metrics) {
          this.metrics = MeasureText(this);
        }

        if (updateText) {
          return this.parent.updateText();
        } else {
          return this.parent;
        }
      }
    }, {
      key: "syncFont",
      value: function syncFont(canvas, context) {
        context.font = this._font;
      }
    }, {
      key: "syncStyle",
      value: function syncStyle(canvas, context) {
        context.textBaseline = 'alphabetic';
        context.fillStyle = this.color;
        context.strokeStyle = this.stroke;
        context.lineWidth = this.strokeThickness;
        context.lineCap = 'round';
        context.lineJoin = 'round';
      }
    }, {
      key: "syncShadow",
      value: function syncShadow(context, enabled) {
        if (enabled) {
          context.shadowOffsetX = this.shadowOffsetX;
          context.shadowOffsetY = this.shadowOffsetY;
          context.shadowColor = this.shadowColor;
          context.shadowBlur = this.shadowBlur;
        } else {
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowColor = 0;
          context.shadowBlur = 0;
        }
      }
    }, {
      key: "update",
      value: function update(recalculateMetrics) {
        if (recalculateMetrics) {
          this._font = "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily).trim();
          this.metrics = MeasureText(this);
        }

        return this.parent.updateText(recalculateMetrics);
      }
    }, {
      key: "buildFont",
      value: function buildFont() {
        var newFont = "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily).trim();

        if (newFont !== this._font) {
          this._font = newFont; //this.metrics = MeasureText(this);
        }

        return this;
      }
    }, {
      key: "setFont",
      value: function setFont(font) {
        if (typeof font === 'string') {
          this.fontFamily = font;
          this.fontSize = '';
          this.fontStyle = '';
        } else {
          this.fontFamily = GetValue$1l(font, 'fontFamily', 'Courier');
          this.fontSize = GetValue$1l(font, 'fontSize', '16px');
          this.fontStyle = GetValue$1l(font, 'fontStyle', '');
        }

        return this.update(true);
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(family) {
        this.fontFamily = family;
        return this.update(true);
      }
    }, {
      key: "setFontStyle",
      value: function setFontStyle(style) {
        this.fontStyle = style;
        return this.update(true);
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(size) {
        if (typeof size === 'number') {
          size = size.toString() + 'px';
        }

        this.fontSize = size;
        return this.update(true);
      }
    }, {
      key: "setTestString",
      value: function setTestString(string) {
        this.testString = string;
        return this.update(true);
      }
    }, {
      key: "setFixedSize",
      value: function setFixedSize(width, height) {
        this.fixedWidth = width;
        this.fixedHeight = height;

        if (width) {
          this.parent.width = width;
        }

        if (height) {
          this.parent.height = height;
        }

        return this.update(this.isWrapFitMode);
      }
    }, {
      key: "setResolution",
      value: function setResolution(value) {
        this.resolution = value;
        return this.update(false);
      }
    }, {
      key: "setLineSpacing",
      value: function setLineSpacing(value) {
        this.lineSpacing = value;
        return this.update(false);
      }
    }, {
      key: "setXOffset",
      value: function setXOffset(value) {
        this.xOffset = value;
        return this.update(false);
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }

        this.backgroundColor = GetStyle(color, this.canvas, this.context);
        this.backgroundColor2 = GetStyle(color2, this.canvas, this.context);
        this.backgroundHorizontalGradient = isHorizontalGradient;
        return this.update(false);
      }
    }, {
      key: "setBackgroundStrokeColor",
      value: function setBackgroundStrokeColor(color, lineWidth) {
        this.backgroundStrokeColor = GetStyle(color, this.canvas, this.context);
        this.backgroundStrokeLineWidth = lineWidth;
        return this.update(false);
      }
    }, {
      key: "setBackgroundCornerRadius",
      value: function setBackgroundCornerRadius(radius, iteration) {
        this.backgroundCornerRadius = radius;
        this.backgroundCornerIteration = iteration;
        return this.update(false);
      }
    }, {
      key: "setFill",
      value: function setFill(color) {
        this.color = GetStyle(color, this.canvas, this.context);
        return this.update(false);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = GetStyle(color, this.canvas, this.context);
        return this.update(false);
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, thickness) {
        if (color === undefined) {
          //  Reset the stroke to zero (disabling it)
          this.strokeThickness = 0;
        } else {
          if (thickness === undefined) {
            thickness = this.strokeThickness;
          }

          this.stroke = GetStyle(color, this.canvas, this.context);
          this.strokeThickness = thickness;
        }

        return this.update(true);
      }
    }, {
      key: "setShadow",
      value: function setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        if (x === undefined) {
          x = 0;
        }

        if (y === undefined) {
          y = 0;
        }

        if (color === undefined) {
          color = '#000';
        }

        if (blur === undefined) {
          blur = 0;
        }

        if (shadowStroke === undefined) {
          shadowStroke = false;
        }

        if (shadowFill === undefined) {
          shadowFill = true;
        }

        this.shadowOffsetX = x;
        this.shadowOffsetY = y;
        this.shadowColor = GetStyle(color, this.canvas, this.context);
        this.shadowBlur = blur;
        this.shadowStroke = shadowStroke;
        this.shadowFill = shadowFill;
        return this.update(false);
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(x, y) {
        if (x === undefined) {
          x = 0;
        }

        if (y === undefined) {
          y = x;
        }

        this.shadowOffsetX = x;
        this.shadowOffsetY = y;
        return this.update(false);
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        if (color === undefined) {
          color = '#000';
        }

        this.shadowColor = GetStyle(color, this.canvas, this.context);
        return this.update(false);
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        if (blur === undefined) {
          blur = 0;
        }

        this.shadowBlur = blur;
        return this.update(false);
      }
    }, {
      key: "setShadowStroke",
      value: function setShadowStroke(enabled) {
        this.shadowStroke = enabled;
        return this.update(false);
      }
    }, {
      key: "setShadowFill",
      value: function setShadowFill(enabled) {
        this.shadowFill = enabled;
        return this.update(false);
      }
    }, {
      key: "setUnderline",
      value: function setUnderline(color, thickness, offset) {
        if (color === undefined) {
          color = '#000';
        }

        if (thickness === undefined) {
          thickness = 0;
        }

        if (offset === undefined) {
          offset = 0;
        }

        this.underlineColor = GetStyle(color, this.canvas, this.context);
        this.underlineThickness = thickness;
        this.underlineOffset = offset;
        return this.update(false);
      }
    }, {
      key: "setUnderlineColor",
      value: function setUnderlineColor(color) {
        if (color === undefined) {
          color = '#000';
        }

        this.underlineColor = GetStyle(color, this.canvas, this.context);
        return this.update(false);
      }
    }, {
      key: "setUnderlineThickness",
      value: function setUnderlineThickness(thickness) {
        if (thickness === undefined) {
          thickness = 0;
        }

        this.underlineThickness = thickness;
        return this.update(false);
      }
    }, {
      key: "setUnderlineOffset",
      value: function setUnderlineOffset(offset) {
        if (offset === undefined) {
          offset = 0;
        }

        this.underlineOffset = offset;
        return this.update(false);
      }
    }, {
      key: "setWrapMode",
      value: function setWrapMode(mode) {
        if (typeof mode === 'string') {
          mode = WRAPMODE[mode.toLowerCase()] || 0;
        }

        this.wrapMode = mode;
        return this.update(true);
      }
    }, {
      key: "setWrapWidth",
      value: function setWrapWidth(width) {
        this.wrapWidth = width;
        return this.update(false);
      }
    }, {
      key: "setAlign",
      value: function setAlign(halign, valign) {
        if (halign === undefined) {
          halign = 'left';
        }

        if (valign === undefined) {
          valign = 'top';
        }

        this.halign = halign;
        this.valign = valign;
        return this.update(false);
      }
    }, {
      key: "setHAlign",
      value: function setHAlign(halign) {
        if (halign === undefined) {
          halign = 'left';
        }

        this.halign = halign;
        return this.update(false);
      }
    }, {
      key: "setVAlign",
      value: function setVAlign(valign) {
        if (valign === undefined) {
          valign = 'top';
        }

        this.valign = valign;
        return this.update(false);
      }
    }, {
      key: "setMaxLines",
      value: function setMaxLines(max) {
        if (max === undefined) {
          max = 0;
        }

        this.maxLines = max;
        return this.update(false);
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics() {
        var metrics = this.metrics;
        return {
          ascent: metrics.ascent,
          descent: metrics.descent,
          fontSize: metrics.fontSize
        };
      }
    }, {
      key: "setTextMetrics",
      value: function setTextMetrics(metrics, font) {
        this.metrics.ascent = metrics.ascent;
        this.metrics.descent = metrics.descent;
        this.metrics.fontSize = metrics.fontSize;

        if (font) {
          if (typeof font === 'string') {
            this.fontFamily = font;
            this.fontSize = '';
            this.fontStyle = '';
          } else {
            this.fontFamily = GetValue$1l(font, 'fontFamily', this.fontFamily);
            this.fontSize = GetValue$1l(font, 'fontSize', this.fontSize);
            this.fontStyle = GetValue$1l(font, 'fontStyle', this.fontStyle);
          }
        }

        return this.parent.updateText(true);
      }
    }, {
      key: "lineHeight",
      get: function get() {
        return this.metrics.fontSize + this.strokeThickness + this.lineSpacing;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var output = {};

        for (var key in propertyMap) {
          output[key] = this[key];
        }

        output.metrics = this.getTextMetrics();
        return output;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.parent = undefined;
      }
    }]);

    return TextStyle;
  }();
  var WRAPMODE = {
    none: CONST.NO_WRAP,
    word: CONST.WORD_WRAP,
    "char": CONST.CHAR_WRAP,
    character: CONST.CHAR_WRAP
  };

  var CanvasPool$2 = Phaser.Display.Canvas.CanvasPool;

  var MeasureTextMargins = function MeasureTextMargins(textStyle, testString, out) {
    if (out === undefined) {
      out = {};
    }

    var canvas = CanvasPool$2.create(this);
    var context = canvas.getContext('2d');
    textStyle.syncFont(canvas, context);
    var metrics = context.measureText(testString);
    var width = Math.ceil(metrics.width * textStyle.baselineX);
    var baseline = width;
    var height = 2 * baseline;
    baseline = baseline * textStyle.baselineY | 0;
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = '#f00';
    context.fillRect(0, 0, width, height);
    context.font = textStyle._font;
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#000';
    context.fillText(textStyle.testString, 0, baseline);
    out.left = 0;

    if (width === 0 || height === 0 || !context.getImageData(0, 0, width, height)) {
      CanvasPool$2.remove(canvas);
      return out;
    }

    var imagedata = context.getImageData(0, 0, width, height).data;
    var stop = false;

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var idx = (y * width + x) * 4;

        if (imagedata[idx] !== 255) {
          out.left = x;
          stop = true;
          break;
        }
      }

      if (stop) {
        break;
      }
    }

    CanvasPool$2.remove(canvas);
    return out;
  };

  var GetValue$1k = Phaser.Utils.Objects.GetValue;

  var RoundRectangle$1 = /*#__PURE__*/function () {
    function RoundRectangle(x, y, width, height, radiusConfig) {
      _classCallCheck(this, RoundRectangle);

      this.cornerRadius = {};
      this._width = 0;
      this._height = 0;
      this.setTo(x, y, width, height, radiusConfig);
    }

    _createClass(RoundRectangle, [{
      key: "setTo",
      value: function setTo(x, y, width, height, radiusConfig) {
        this.setPosition(x, y);
        this.setRadius(radiusConfig);
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        if (x === undefined) {
          x = 0;
        }

        if (y === undefined) {
          y = x;
        }

        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "setRadius",
      value: function setRadius(value) {
        if (value === undefined) {
          value = 0;
        }

        this.radius = value;
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "minWidth",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
      }
    }, {
      key: "minHeight",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }

        this._width = Math.max(value, this.minWidth);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }

        this._height = Math.max(value, this.minHeight);
      }
    }, {
      key: "radius",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x, radius.tl.y, radius.tr.x, radius.tr.y, radius.bl.x, radius.bl.y, radius.br.x, radius.br.y);
      },
      set: function set(value) {
        var defaultRadiusX, defaultRadiusY;

        if (typeof value === 'number') {
          defaultRadiusX = value;
          defaultRadiusY = value;
        } else {
          defaultRadiusX = GetValue$1k(value, 'x', 0);
          defaultRadiusY = GetValue$1k(value, 'y', 0);
        }

        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$1k(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$1k(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$1k(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$1k(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
      }
    }, {
      key: "radiusTL",
      get: function get() {
        var radius = this.cornerRadius.tl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tl, value);
      }
    }, {
      key: "radiusTR",
      get: function get() {
        var radius = this.cornerRadius.tr;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tr, value);
      }
    }, {
      key: "radiusBL",
      get: function get() {
        var radius = this.cornerRadius.bl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.bl, value);
      }
    }, {
      key: "radiusBR",
      get: function get() {
        var radius = this.cornerRadius.br;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.br, value);
      }
    }]);

    return RoundRectangle;
  }();

  var GetRadius = function GetRadius(radius, defaultRadiusX, defaultRadiusY) {
    if (radius === undefined) {
      return {
        x: defaultRadiusX,
        y: defaultRadiusY
      };
    } else if (typeof radius === 'number') {
      return {
        x: radius,
        y: radius
      };
    } else {
      return radius;
    }
  };

  var SetRadius = function SetRadius(radius, value) {
    if (typeof value === 'number') {
      radius.x = value;
      radius.y = value;
    } else {
      radius.x = GetValue$1k(value, 'x', 0);
      radius.y = GetValue$1k(value, 'y', 0);
    }
  };

  var DegToRad$6 = Phaser.Math.DegToRad;
  var Rad0 = DegToRad$6(0);
  var Rad90 = DegToRad$6(90);
  var Rad180 = DegToRad$6(180);
  var Rad270 = DegToRad$6(270);

  var AddRoundRectanglePath = function AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle$1(x, y, width, height, radiusConfig),
        minWidth = geom.minWidth,
        minHeight = geom.minHeight,
        scaleRX = width >= minWidth ? 1 : width / minWidth,
        scaleRY = height >= minHeight ? 1 : height / minHeight;
    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;
    context.save();
    context.beginPath();
    context.translate(x, y); // Bottom-right

    radius = cornerRadius.br;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = height - radiusY;
    context.moveTo(width, centerY);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo$1(context, centerX, centerY, radiusX, radiusY, Rad0, Rad90, iteration);
    } else {
      context.lineTo(width, height);
      context.lineTo(centerX, height);
    } // Bottom-left


    radius = cornerRadius.bl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = height - radiusY;
    context.lineTo(radiusX, height);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo$1(context, centerX, centerY, radiusX, radiusY, Rad90, Rad180, iteration);
    } else {
      context.lineTo(0, height);
      context.lineTo(0, centerY);
    } // Top-left


    radius = cornerRadius.tl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = radiusY;
    context.lineTo(0, centerY);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo$1(context, centerX, centerY, radiusX, radiusY, Rad180, Rad270, iteration);
    } else {
      context.lineTo(0, 0);
      context.lineTo(centerX, 0);
    } // Top-right


    radius = cornerRadius.tr;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = radiusY;
    context.lineTo(centerX, 0);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo$1(context, centerX, centerY, radiusX, radiusY, Rad270, Rad0, iteration);
    } else {
      context.lineTo(width, 0);
      context.lineTo(width, centerY);
    }

    context.closePath();
    context.restore();
  };

  var ArcTo$1 = function ArcTo(context, centerX, centerY, radiusX, radiusY, startAngle, endAngle, iteration) {
    if (iteration == null) {
      // undefined, or null
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle);
    } else {
      iteration += 1;
      var x, y, angle;
      var step = (endAngle - startAngle) / iteration;

      for (var i = 0; i <= iteration; i++) {
        angle = startAngle + step * i;
        x = centerX + radiusX * Math.cos(angle);
        y = centerY + radiusY * Math.sin(angle);
        context.lineTo(x, y);
      }
    }
  };

  var DrawRoundRectangle = function DrawRoundRectangle(canvas, context, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient, iteration) {
    AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);

    if (fillStyle != null) {
      if (fillColor2 != null) {
        var grd;

        if (isHorizontalGradient) {
          grd = context.createLinearGradient(0, 0, width, 0);
        } else {
          grd = context.createLinearGradient(0, 0, 0, height);
        }

        grd.addColorStop(0, fillStyle);
        grd.addColorStop(1, fillColor2);
        fillStyle = grd;
      }

      context.fillStyle = fillStyle;
      context.fill();
    }

    if (strokeStyle != null && lineWidth > 0) {
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      context.stroke();
    }
  };

  var DrawRoundRectangleBackground = function DrawRoundRectangleBackground(canvasObject, color, strokeColor, strokeLineWidth, radius, color2, isHorizontalGradient, iteration) {
    if (color == null && strokeColor == null) {
      return;
    }

    var width = canvasObject.canvas.width,
        height = canvasObject.canvas.height;

    if (strokeColor == null) {
      strokeLineWidth = 0;
    }

    var x = strokeLineWidth / 2;
    width -= strokeLineWidth;
    height -= strokeLineWidth;
    DrawRoundRectangle(canvasObject.canvas, canvasObject.context, x, x, width, height, radius, color, strokeColor, strokeLineWidth, color2, isHorizontalGradient, iteration);
  };

  var DrawMethods = {
    draw: function draw(startX, startY, textWidth, textHeight) {
      var penManager = this.penManager;
      this.hitAreaManager.clear();
      var context = this.context;
      context.save();
      var defaultStyle = this.defaultStyle;
      this.clear();
      DrawRoundRectangleBackground(this, defaultStyle.backgroundColor, defaultStyle.backgroundStrokeColor, defaultStyle.backgroundStrokeLineWidth, defaultStyle.backgroundCornerRadius, defaultStyle.backgroundColor2, defaultStyle.backgroundHorizontalGradient, defaultStyle.backgroundCornerIteration); // draw lines

      startX += this.startXOffset;
      startY += this.startYOffset;
      var defaultHalign = defaultStyle.halign,
          valign = defaultStyle.valign;
      var lineWidth,
          lineHeight = defaultStyle.lineHeight;
      var lines = penManager.lines;
      var totalLinesNum = lines.length,
          maxLines = defaultStyle.maxLines;
      var drawLinesNum, drawLineStartIdx, drawLineEndIdx;

      if (maxLines > 0 && totalLinesNum > maxLines) {
        drawLinesNum = maxLines;

        if (valign === 'center') {
          // center
          drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
        } else if (valign === 'bottom') {
          // bottom
          drawLineStartIdx = totalLinesNum - drawLinesNum;
        } else {
          drawLineStartIdx = 0;
        }
      } else {
        drawLinesNum = totalLinesNum;
        drawLineStartIdx = 0;
      }

      drawLineEndIdx = drawLineStartIdx + drawLinesNum;
      var offsetX, offsetY;
      var rtl = this.rtl,
          rtlOffset = rtl ? this.parent.width : undefined;

      if (valign === 'center') {
        // center
        offsetY = Math.max((textHeight - drawLinesNum * lineHeight) / 2, 0);
      } else if (valign === 'bottom') {
        // bottom
        offsetY = Math.max(textHeight - drawLinesNum * lineHeight - 2, 0);
      } else {
        offsetY = 0;
      }

      offsetY += startY;

      for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
        lineWidth = penManager.getLineWidth(lineIdx);

        if (lineWidth === 0) {
          continue;
        }

        var pens = lines[lineIdx],
            penCount = pens.length;
        var halign = defaultHalign; // Seek if there has algin tag

        for (var penIdx = 0; penIdx < penCount; penIdx++) {
          var penAlign = pens[penIdx].prop.align;

          if (penAlign !== undefined) {
            halign = penAlign;
            break;
          }
        }

        if (halign === 'center') {
          // center
          offsetX = (textWidth - lineWidth) / 2;
        } else if (halign === 'right') {
          // right
          offsetX = !rtl ? textWidth - lineWidth : 0;
        } else {
          offsetX = !rtl ? 0 : textWidth - lineWidth;
        }

        offsetX += startX;

        for (var penIdx = 0; penIdx < penCount; penIdx++) {
          this.drawPen(pens[penIdx], offsetX, offsetY, rtlOffset);
        }
      }

      context.restore();
    },
    drawPen: function drawPen(pen, offsetX, offsetY, rtlOffset) {
      offsetX += pen.x;
      offsetY += pen.y + (pen.prop.y || 0);

      if (rtlOffset !== undefined) {
        offsetX = rtlOffset - offsetX;
      }

      var canvas = this.canvas;
      var context = this.context;
      context.save();
      var curStyle = this.parser.propToContextStyle(this.defaultStyle, pen.prop);
      curStyle.buildFont();
      curStyle.syncFont(canvas, context);
      curStyle.syncStyle(canvas, context); // Underline

      if (curStyle.underlineThickness > 0 && pen.width > 0) {
        this.drawUnderline(offsetX, offsetY, pen.width, curStyle);
      } // Text


      if (pen.isTextPen) {
        this.drawText(offsetX, offsetY, pen.text, curStyle);
      } // Image


      if (pen.isImagePen) {
        this.drawImage(offsetX, offsetY, pen.prop.img, curStyle);
      }

      context.restore();

      if (pen.hasAreaMarker && pen.width > 0) {
        this.hitAreaManager.add(pen.prop.area, // key
        offsetX, // x
        offsetY - this.startYOffset, // y
        pen.width, // width
        this.defaultStyle.lineHeight // height
        );
      }
    },
    clear: function clear() {
      var canvas = this.canvas;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },
    drawUnderline: function drawUnderline(x, y, width, style) {
      y += style.underlineOffset - style.underlineThickness / 2;

      if (this.autoRound) {
        x = Math.round(x);
        y = Math.round(y);
      }

      var context = this.context;
      var savedLineCap = context.lineCap;
      context.lineCap = 'butt';
      context.strokeStyle = style.underlineColor;
      context.lineWidth = style.underlineThickness;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + width, y);
      context.stroke();
      context.lineCap = savedLineCap;
    },
    drawText: function drawText(x, y, text, style) {
      if (this.autoRound) {
        x = Math.round(x);
        y = Math.round(y);
      }

      var context = this.context;

      if (style.stroke && style.stroke !== 'none' && style.strokeThickness > 0) {
        style.syncShadow(context, style.shadowStroke);
        context.strokeText(text, x, y);
      }

      if (style.color && style.color !== 'none') {
        style.syncShadow(context, style.shadowFill);
        context.fillText(text, x, y);
      }
    },
    drawImage: function drawImage(x, y, imgKey, style) {
      y -= this.startYOffset;
      this.parent.imageManager.draw(imgKey, this.context, x, y, this.autoRound);
    }
  };

  var Stack = /*#__PURE__*/function () {
    function Stack() {
      _classCallCheck(this, Stack);

      this.items = [];
    }

    _createClass(Stack, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.items = undefined;
      }
    }, {
      key: "pop",
      value: function pop() {
        return this.items.length > 0 ? this.items.pop() : null;
      }
    }, {
      key: "push",
      value: function push(l) {
        this.items.push(l);
        return this;
      }
    }, {
      key: "pushMultiple",
      value: function pushMultiple(arr) {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items.length = 0;
        return this;
      }
    }]);

    return Stack;
  }();

  var GetValue$1j = Phaser.Utils.Objects.GetValue;
  var NO_NEWLINE$3 = CONST.NO_NEWLINE;
  var RAW_NEWLINE$1 = CONST.RAW_NEWLINE;

  var Pen = /*#__PURE__*/function () {
    function Pen(config) {
      _classCallCheck(this, Pen);

      this.prop = {};
      this.resetFromJSON(config);
    }

    _createClass(Pen, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        // (txt, x, y, width, prop, newLineMode, startIndex)
        this.text = GetValue$1j(o, 'text', '');
        this.x = GetValue$1j(o, 'x', 0);
        this.y = GetValue$1j(o, 'y', 0);
        this.width = GetValue$1j(o, 'width', 0);
        var prop = GetValue$1j(o, 'prop', null);

        if (prop === null) {
          prop = {};
        }

        this.prop = prop;
        this.newLineMode = GetValue$1j(o, 'newLineMode', 0);
        this.startIndex = GetValue$1j(o, 'startIndex', 0);
      }
    }, {
      key: "plainText",
      get: function get() {
        var txt = this.text;

        if (this.newLineMode === RAW_NEWLINE$1) {
          txt += "\n";
        }

        return txt;
      }
    }, {
      key: "wrapText",
      get: function get() {
        var txt = this.text;

        if (this.newLineMode !== NO_NEWLINE$3) {
          txt += "\n";
        }

        return txt;
      }
    }, {
      key: "rawTextLength",
      get: function get() {
        var len = this.text.length;

        if (this.newLineMode === RAW_NEWLINE$1) {
          len += 1;
        }

        return len;
      }
    }, {
      key: "endIndex",
      get: function get() {
        return this.startIndex + this.rawTextLength;
      }
    }, {
      key: "lastX",
      get: function get() {
        return this.x + this.width;
      }
    }, {
      key: "isTextPen",
      get: function get() {
        return this.text !== '';
      }
    }, {
      key: "isImagePen",
      get: function get() {
        return !!this.prop.img;
      }
    }, {
      key: "hasAreaMarker",
      get: function get() {
        return !!this.prop.area;
      }
    }]);

    return Pen;
  }();

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

  var NOOP = function NOOP() {//  NOOP
  };

  var GetFastValue$1 = Phaser.Utils.Objects.GetFastValue;
  var NO_NEWLINE$2 = CONST.NO_NEWLINE;
  var WRAPPED_NEWLINE$1 = CONST.WRAPPED_NEWLINE; // Reuse objects can increase performance

  var PensPool = new Stack(); // Default pens pool

  var LinesPool$1 = new Stack(); // Default lines pool

  var PenManager = /*#__PURE__*/function () {
    function PenManager(config) {
      _classCallCheck(this, PenManager);

      this.pens = []; // all pens

      this.lines = []; // pens in lines [ [],[],[],.. ]

      this.maxLinesWidth = undefined;
      this.PensPool = GetFastValue$1(config, 'pensPool', PensPool);
      this.LinesPool = GetFastValue$1(config, 'linesPool', LinesPool$1);
      this.tagToText = GetFastValue$1(config, 'tagToText', NOOP);
      this.tagToTextScope = GetFastValue$1(config, 'tagToTextScope', undefined);
    }

    _createClass(PenManager, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.tagToText = undefined;
        this.tagToTextScope = undefined;
      }
    }, {
      key: "clear",
      value: function clear() {
        for (var i = 0, len = this.lines.length; i < len; i++) {
          this.lines[i].length = 0;
        }

        this.PensPool.pushMultiple(this.pens);
        this.LinesPool.pushMultiple(this.lines);
        this.maxLinesWidth = undefined;
      }
    }, {
      key: "addTextPen",
      value: function addTextPen(text, x, y, width, prop, newLineMode) {
        var pen = this.PensPool.pop();

        if (pen == null) {
          pen = new Pen();
        }

        PEN_CONFIG.text = text;
        PEN_CONFIG.x = x;
        PEN_CONFIG.y = y;
        PEN_CONFIG.width = width;
        PEN_CONFIG.prop = prop;
        PEN_CONFIG.newLineMode = newLineMode;
        pen.resetFromJSON(PEN_CONFIG);
        this.addPen(pen);
        return this;
      }
    }, {
      key: "addImagePen",
      value: function addImagePen(x, y, width, prop) {
        this.addTextPen('', x, y, width, prop, NO_NEWLINE$2);
        return this;
      }
    }, {
      key: "addNewLinePen",
      value: function addNewLinePen() {
        var previousPen = this.lastPen;
        var x = previousPen ? previousPen.lastX : 0;
        var y = previousPen ? previousPen.y : 0;
        var prop = previousPen ? Clone(previousPen.prop) : null;
        this.addTextPen('', x, y, 0, prop, WRAPPED_NEWLINE$1);
        return this;
      }
    }, {
      key: "addPen",
      value: function addPen(pen) {
        var previousPen = this.lastPen;

        if (previousPen == null) {
          pen.startIndex = 0;
        } else {
          pen.startIndex = previousPen.endIndex;
        }

        this.pens.push(pen); // maintan lines

        var line = this.lastLine;

        if (line == null) {
          line = this.LinesPool.pop() || [];
          this.lines.push(line);
        }

        line.push(pen); // new line, add an empty line

        if (pen.newLineMode !== NO_NEWLINE$2) {
          line = this.LinesPool.pop() || [];
          this.lines.push(line);
        }

        this.maxLinesWidth = undefined;
      }
    }, {
      key: "clone",
      value: function clone(targetPenManager) {
        if (targetPenManager == null) targetPenManager = new PenManager();
        targetPenManager.clear();

        for (var li = 0, llen = this.lines.length; li < llen; li++) {
          var pens = this.lines[li];

          for (var pi = 0, plen = pens.length; pi < plen; pi++) {
            var pen = pens[pi];
            targetPenManager.addPen(pen.text, pen.x, pen.y, pen.width, Clone(pen.prop), pen.newLineMode);
          }
        }

        return targetPenManager;
      }
    }, {
      key: "lastPen",
      get: function get() {
        return this.pens[this.pens.length - 1];
      }
    }, {
      key: "lastLine",
      get: function get() {
        return this.lines[this.lines.length - 1];
      }
    }, {
      key: "getLineStartIndex",
      value: function getLineStartIndex(i) {
        if (i >= this.lines.length) {
          return this.getLineEndIndex(i);
        } else {
          var line = this.lines[i];
          return line && line[0] ? line[0].startIndex : 0;
        }
      }
    }, {
      key: "getLineEndIndex",
      value: function getLineEndIndex(i) {
        if (i >= this.lines.length) {
          i = this.lines.length - 1;
        }

        var li,
            hasLastPen = false,
            line;

        for (li = i; li >= 0; li--) {
          line = this.lines[li];
          hasLastPen = line != null && line.length > 0;

          if (hasLastPen) {
            break;
          }
        }

        if (!hasLastPen) {
          return 0;
        }

        var lastPen = line[line.length - 1];
        return lastPen.endIndex;
      }
    }, {
      key: "getLineWidth",
      value: function getLineWidth(i) {
        var line = this.lines[i];

        if (!line) {
          return 0;
        }

        var lastPen = line[line.length - 1];

        if (lastPen == null) {
          return 0;
        }

        var lineWidth = lastPen.lastX; // start from 0

        return lineWidth;
      }
    }, {
      key: "getMaxLineWidth",
      value: function getMaxLineWidth() {
        if (this.maxLinesWidth !== undefined) {
          return this.maxLinesWidth;
        }

        var w,
            maxW = 0;

        for (var i = 0, len = this.lines.length; i < len; i++) {
          w = this.getLineWidth(i);

          if (w > maxW) {
            maxW = w;
          }
        }

        this.maxLinesWidth = maxW;
        return maxW;
      }
    }, {
      key: "getLineWidths",
      value: function getLineWidths() {
        var result = [];

        for (var i = 0, len = this.lines.length; i < len; i++) {
          result.push(this.getLineWidth(i));
        }

        return result;
      }
    }, {
      key: "linesCount",
      get: function get() {
        return this.lines.length;
      }
    }, {
      key: "plainText",
      get: function get() {
        var txt = "",
            pens = this.pens;

        for (var i = 0, len = pens.length; i < len; i++) {
          txt += pens[i].plainText;
        }

        return txt;
      }
    }, {
      key: "rawTextLength",
      get: function get() {
        var l = 0,
            pens = this.pens;

        for (var i = 0, len = this.pens.length; i < len; i++) {
          l += pens[i].rawTextLength;
        }

        return l;
      }
    }, {
      key: "getSliceTagText",
      value: function getSliceTagText(start, end, wrap) {
        if (start === undefined) {
          start = 0;
        }

        if (end === undefined) {
          var lastPen = this.lastPen;

          if (lastPen == null) {
            return "";
          }

          end = lastPen.endIndex;
        }

        if (wrap === undefined) {
          wrap = false;
        }

        var txt = "",
            pen,
            penTxt,
            penStartIdx,
            penEndIdx,
            isInRange;
        var currentProp, previousProp;

        for (var i = 0, len = this.pens.length; i < len; i++) {
          pen = this.pens[i];
          penEndIdx = pen.endIndex;

          if (penEndIdx <= start) {
            continue;
          }

          pen = this.pens[i];
          penTxt = !wrap ? pen.plainText : pen.wrapText;
          currentProp = pen.prop;
          penStartIdx = pen.startIndex;
          isInRange = penStartIdx >= start && penEndIdx <= end;

          if (!isInRange) {
            penTxt = penTxt.substring(start - penStartIdx, end - penStartIdx);
          }

          if (this.tagToTextScope) {
            txt += this.tagToText.call(this.tagToTextScope, penTxt, currentProp, previousProp);
          } else {
            txt += this.tagToText(penTxt, currentProp, previousProp);
          }

          previousProp = currentProp;

          if (penEndIdx >= end) {
            break;
          }
        }

        return txt;
      }
    }, {
      key: "length",
      get: function get() {
        return this.lines.length;
      },
      set: function set(value) {
        // Only for set length to 0 (clear)
        this.clear();
      }
    }]);

    return PenManager;
  }();
  var PEN_CONFIG = {};

  var Rectangle$2 = Phaser.Geom.Rectangle;
  var RectanglePool = new Stack();

  var HitAreaManager = /*#__PURE__*/function () {
    function HitAreaManager() {
      _classCallCheck(this, HitAreaManager);

      this.hitAreas = [];
    }

    _createClass(HitAreaManager, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
      }
    }, {
      key: "clear",
      value: function clear() {
        RectanglePool.pushMultiple(this.hitAreas);
        return this;
      }
    }, {
      key: "add",
      value: function add(key, x, y, width, height) {
        var rectangle = RectanglePool.pop();

        if (rectangle === null) {
          rectangle = new Rectangle$2(x, y, width, height);
        } else {
          rectangle.setTo(x, y, width, height);
        }

        rectangle.key = key;
        this.hitAreas.push(rectangle);
        return this;
      }
    }, {
      key: "getFirst",
      value: function getFirst(x, y) {
        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
          var hitArea = this.hitAreas[i];

          if (hitArea.contains(x, y)) {
            return hitArea;
          }
        }

        return null;
      }
    }, {
      key: "drawBounds",
      value: function drawBounds(graphics, color, parent) {
        if (color === undefined) {
          color = 0xffffff;
        }

        if (parent) {
          graphics.save().scaleCanvas(parent.scaleX, parent.scaleY).rotateCanvas(parent.rotation).translateCanvas(parent.x, parent.y);
        }

        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
          var hitArea = this.hitAreas[i];
          graphics.lineStyle(1, color).strokeRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
        }

        if (parent) {
          graphics.restore();
        }

        return this;
      }
    }]);

    return HitAreaManager;
  }();

  var SetInteractive = function SetInteractive() {
    this.parent.on('pointerdown', OnAreaDown, this).on('pointerup', OnAreaUp, this).on('pointermove', OnAreaOverOut, this).on('pointerover', OnAreaOverOut, this).on('pointerout', function (pointer, event) {
      OnAreaOverOut.call(this, pointer, null, null, event);
    }, this);
  };

  var OnAreaDown = function OnAreaDown(pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);

    if (area === null) {
      return;
    }

    FireEvent$1.call(this, 'areadown', area.key, pointer, localX, localY, event);
  };

  var OnAreaUp = function OnAreaUp(pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);

    if (area === null) {
      return;
    }

    FireEvent$1.call(this, 'areaup', area.key, pointer, localX, localY, event);
  };

  var OnAreaOverOut = function OnAreaOverOut(pointer, localX, localY, event) {
    if (localX === null) {
      // Case of pointerout
      if (this.lastHitAreaKey !== null) {
        FireEvent$1.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
      }

      this.lastHitAreaKey = null;
      return;
    }

    var area = this.hitAreaManager.getFirst(localX, localY);
    var hitAreaKey = area ? area.key : null;

    if (this.lastHitAreaKey === hitAreaKey) {
      return;
    }

    if (this.lastHitAreaKey !== null) {
      FireEvent$1.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
    }

    if (hitAreaKey !== null) {
      FireEvent$1.call(this, 'areaover', hitAreaKey, pointer, localX, localY, event);
    }

    this.lastHitAreaKey = hitAreaKey;
  };

  var FireEvent$1 = function FireEvent(eventName, key, pointer, localX, localY, event) {
    this.parent.emit("".concat(eventName, "-").concat(key), pointer, localX, localY, event);
    this.parent.emit(eventName, key, pointer, localX, localY, event);
  };

  var LinesPool = new Stack();

  var FreeLine = function FreeLine(line) {
    if (!line) {
      return;
    }

    LinesPool.push(line);
  };

  var FreeLines = function FreeLines(lines) {
    if (!lines) {
      return;
    }

    LinesPool.pushMultiple(lines);
  };

  var GetLine = function GetLine(text, width, newLineMode) {
    var l = LinesPool.pop();

    if (l === null) {
      l = {};
    }

    l.text = text;
    l.width = width;
    l.newLineMode = newLineMode;
    return l;
  };

  var NO_NEWLINE$1 = CONST.NO_NEWLINE;
  var RAW_NEWLINE = CONST.RAW_NEWLINE;
  var WRAPPED_NEWLINE = CONST.WRAPPED_NEWLINE;
  var NO_WRAP$1 = CONST.NO_WRAP;
  var WORD_WRAP = CONST.WORD_WRAP;
  var CHAR_WRAP = CONST.CHAR_WRAP;
  var splitRegExp = CONST.SPLITREGEXP;

  var WrapText = function WrapText(text, getTextWidth, wrapMode, wrapWidth, offset) {
    if (wrapWidth <= 0) {
      wrapMode = NO_WRAP$1;
    }

    var retLines = [];

    if (!text || !text.length) {
      return retLines;
    }

    var isNoWrap = wrapMode === NO_WRAP$1;
    var isWordWrap = wrapMode === WORD_WRAP;
    var lines = text.split(splitRegExp),
        line,
        remainWidth,
        newLineMode;

    for (var i = 0, linesLen = lines.length; i < linesLen; i++) {
      line = lines[i];
      newLineMode = i === linesLen - 1 ? NO_NEWLINE$1 : RAW_NEWLINE;

      if (isNoWrap) {
        var textWidth = getTextWidth(line);
        retLines.push(GetLine(line, textWidth, newLineMode));
        continue;
      }

      remainWidth = i === 0 ? wrapWidth - offset : wrapWidth; // short string testing

      if (line.length <= 100) {
        var textWidth = getTextWidth(line);

        if (textWidth <= remainWidth) {
          retLines.push(GetLine(line, textWidth, newLineMode));
          continue;
        }
      }

      var tokenArray, isSpaceCharacterEnd;

      if (isWordWrap) {
        // word mode
        tokenArray = line.split(' ');
        isSpaceCharacterEnd = tokenArray[tokenArray.length - 1] === '';

        if (isSpaceCharacterEnd) {
          tokenArray.length -= 1;
        }
      } else {
        tokenArray = line;
      }

      var token, tokenWidth, isLastToken;
      var lineText = '',
          lineWidth = 0;
      var currLineWidth;
      var whiteSpaceWidth = isWordWrap ? getTextWidth(' ') : undefined;

      for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
        token = tokenArray[j];
        tokenWidth = getTextWidth(token);
        isLastToken = j === tokenLen - 1;

        if (isWordWrap && (!isLastToken || isSpaceCharacterEnd)) {
          token += ' ';
          tokenWidth += whiteSpaceWidth;
        } // Text width of single token is larger than a line width


        if (isWordWrap && tokenWidth > wrapWidth) {
          if (lineText !== '') {
            // Has pending lineText, flush it out
            retLines.push(GetLine(lineText, lineWidth, WRAPPED_NEWLINE));
          } else if (j === 0 && offset > 0) {
            // No pending lineText, but has previous text. Append a newline
            retLines.push(GetLine('', 0, WRAPPED_NEWLINE));
          } // Word break


          retLines.push.apply(retLines, _toConsumableArray(WrapText(token, getTextWidth, CHAR_WRAP, wrapWidth, 0))); // Continue at last-wordBreak-line

          var lastwordBreakLine = retLines.pop();
          lineText = lastwordBreakLine.text;
          lineWidth = lastwordBreakLine.width; // Free this line

          FreeLine(lastwordBreakLine); // Special case : Start at a space character, discard it

          if (lineText === ' ') {
            lineText = '';
            lineWidth = 0;
          }

          continue;
        }

        currLineWidth = lineWidth + tokenWidth;

        if (currLineWidth > remainWidth) {
          // New line
          retLines.push(GetLine(lineText, lineWidth, WRAPPED_NEWLINE));
          lineText = token;
          lineWidth = tokenWidth;
          remainWidth = wrapWidth;
        } else {
          // Append token, continue
          lineText += token;
          lineWidth = currLineWidth;
        }

        if (isLastToken) {
          // Flush remain text
          retLines.push(GetLine(lineText, lineWidth, newLineMode));
        }
      } // for token in tokenArray

    } // for each line in lines


    return retLines;
  };

  var GetValue$1i = Phaser.Utils.Objects.GetValue;
  var NO_WRAP = CONST.NO_WRAP;
  var NO_NEWLINE = CONST.NO_NEWLINE;

  var CanvasText = /*#__PURE__*/function () {
    function CanvasText(config) {
      _classCallCheck(this, CanvasText);

      this.parent = config.parent;
      this.context = GetValue$1i(config, 'context', null);
      this.canvas = this.context.canvas;
      this.parser = GetValue$1i(config, 'parser', null);
      this.defaultStyle = GetValue$1i(config, 'style', null);
      this.autoRound = true;
      this.pensPool = GetValue$1i(config, 'pensPool', null);
      this.penManager = this.newPenManager();
      this._tmpPenManager = null;
      this.hitAreaManager = new HitAreaManager();
      this.lastHitAreaKey = null;
      var context = this.context;

      this.getTextWidth = function (text) {
        return context.measureText(text).width;
      };
    }

    _createClass(CanvasText, [{
      key: "destroy",
      value: function destroy() {
        this.context = undefined;
        this.canvas = undefined;
        this.parser = undefined;
        this.defaultStyle = undefined;

        if (this.penManager) {
          this.penManager.destroy();
          this.penManager = undefined;
        }

        if (this._tmpPenManager) {
          this._tmpPenManager.destroy();

          this._tmpPenManager = undefined;
        }

        if (this.hitAreaManager) {
          this.hitAreaManager.destroy();
          this.hitAreaManager = undefined;
        }
      }
    }, {
      key: "updatePenManager",
      value: function updatePenManager(text, wrapMode, wrapWidth, lineHeight, penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }

        penManager.clear();

        if (text === "") {
          return penManager;
        }

        var textStyle = this.parent.style;

        if (textStyle.isWrapFitMode) {
          var padding = this.parent.padding;
          wrapWidth = textStyle.fixedWidth - padding.left - padding.right;
        }

        var canvas = this.canvas;
        var context = this.context;

        var MeasureText = function MeasureText(text) {
          return context.measureText(text).width;
        };

        var cursorX = 0,
            cursorY = 0;
        var customTextWrapCallback = textStyle.wrapCallback,
            customTextWrapCallbackScope = textStyle.wrapCallbackScope;
        var reuseLines = true;
        var plainText, curProp, curStyle;
        var match = this.parser.splitText(text),
            result,
            wrapLines;

        for (var i = 0, len = match.length; i < len; i++) {
          result = this.parser.tagTextToProp(match[i], curProp);
          plainText = result.plainText;
          curProp = result.prop;

          if (curProp.img) {
            // Image tag                
            var imgWidth = this.imageManager.getOuterWidth(curProp.img);

            if (wrapWidth > 0 && wrapMode !== NO_WRAP) {
              // Wrap mode
              if (wrapWidth < cursorX + imgWidth) {
                penManager.addNewLinePen();
                cursorY += lineHeight;
                cursorX = 0;
              }
            }

            penManager.addImagePen(cursorX, cursorY, imgWidth, Clone(curProp));
            cursorX += imgWidth;
          } else if (plainText !== '') {
            // wrap text to lines
            // Save the current context.
            context.save();
            curStyle = this.parser.propToContextStyle(this.defaultStyle, curProp);
            curStyle.buildFont();
            curStyle.syncFont(canvas, context);
            curStyle.syncStyle(canvas, context);

            if (!customTextWrapCallback) {
              wrapLines = WrapText(plainText, MeasureText, wrapMode, wrapWidth, cursorX);
            } else {
              // customTextWrapCallback
              wrapLines = customTextWrapCallback.call(customTextWrapCallbackScope, plainText, MeasureText, wrapWidth, cursorX);

              if (typeof wrapLines === 'string') {
                wrapLines = wrapLines.split('\n');
              }

              var n;

              for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                n = wrapLines[j];

                if (typeof n === 'string') {
                  wrapLines[j] = GetLine(n, MeasureText(n), j < jLen - 1 ? 2 : 0);
                } else {
                  reuseLines = false;
                }
              }
            } // customTextWrapCallback
            // add pens


            var n;

            for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
              n = wrapLines[j];
              penManager.addTextPen(n.text, cursorX, cursorY, n.width, Clone(curProp), n.newLineMode);

              if (n.newLineMode !== NO_NEWLINE) {
                cursorX = 0;
                cursorY += lineHeight;
              } else {
                cursorX += n.width;
              }
            }

            if (reuseLines) {
              FreeLines(wrapLines);
            }

            wrapLines = null;
            context.restore();
          }
        } // Add strokeThinkness to last pen of each line


        for (var i = 0, len = this.lines.length; i < len; i++) {
          var line = this.lines[i];
          var lastPen = line[line.length - 1];

          if (lastPen) {
            lastPen.width += this.parser.getStrokeThinkness(this.defaultStyle, lastPen.prop);
          }
        }

        return penManager;
      }
    }, {
      key: "startXOffset",
      get: function get() {
        var defaultStyle = this.defaultStyle;
        return defaultStyle.strokeThickness / 2 + defaultStyle.xOffset;
      }
    }, {
      key: "startYOffset",
      get: function get() {
        var defaultStyle = this.defaultStyle;
        return defaultStyle.strokeThickness / 2 + defaultStyle.metrics.ascent;
      }
    }, {
      key: "lines",
      get: function get() {
        return this.penManager.lines;
      }
    }, {
      key: "desplayLinesCount",
      get: function get() {
        var linesCount = this.penManager.linesCount,
            maxLines = this.defaultStyle.maxLines;

        if (maxLines > 0 && linesCount > maxLines) {
          linesCount = maxLines;
        }

        return linesCount;
      }
    }, {
      key: "linesWidth",
      get: function get() {
        return Math.ceil(this.penManager.getMaxLineWidth());
      }
    }, {
      key: "linesHeight",
      get: function get() {
        var linesCount = this.desplayLinesCount;
        var linesHeight = this.defaultStyle.lineHeight * linesCount;

        if (linesCount > 0) {
          linesHeight -= this.defaultStyle.lineSpacing;
        }

        return linesHeight;
      }
    }, {
      key: "imageManager",
      get: function get() {
        return this.parent.imageManager;
      }
    }, {
      key: "rtl",
      get: function get() {
        return this.parent.style.rtl;
      }
    }, {
      key: "newPenManager",
      value: function newPenManager() {
        return new PenManager({
          pensPool: this.pensPool,
          tagToText: this.parser.propToTagText,
          tagToTextScope: this.parser
        });
      }
    }, {
      key: "tmpPenManager",
      get: function get() {
        if (this._tmpPenManager === null) {
          this._tmpPenManager = this.newPenManager();
        }

        return this._tmpPenManager;
      }
    }, {
      key: "getPlainText",
      value: function getPlainText(text, start, end) {
        var plainText;

        if (text == null) {
          plainText = this.penManager.plainText;
        } else {
          var match = this.parser.splitText(text, 1); // PLAINTEXTONLY_MODE

          plainText = "";

          for (var i = 0, len = match.length; i < len; i++) {
            plainText += match[i];
          }
        }

        if (start != null || end != null) {
          if (start == null) {
            start = 0;
          }

          if (end == null) {
            end = plainText.length;
          }

          plainText = plainText.substring(start, end);
        }

        return plainText;
      }
    }, {
      key: "getPenManager",
      value: function getPenManager(text, retPenManager) {
        if (text === undefined) {
          return this.copyPenManager(retPenManager, this.penManager);
        }

        if (retPenManager === undefined) {
          retPenManager = this.newPenManager();
        }

        var defaultStyle = this.defaultStyle;
        this.updatePenManager(text, defaultStyle.wrapMode, defaultStyle.wrapWidth, defaultStyle.lineHeight, retPenManager);
        return retPenManager;
      }
    }, {
      key: "getText",
      value: function getText(text, start, end, wrap) {
        if (text == null) {
          return this.penManager.getSliceTagText(start, end, wrap);
        }

        var penManager = this.tmpPenManager;
        var defaultStyle = this.defaultStyle;
        this.updatePenManager(text, defaultStyle.wrapMode, defaultStyle.wrapWidth, defaultStyle.lineHeight, penManager);
        return penManager.getSliceTagText(start, end, wrap);
      }
    }, {
      key: "copyPenManager",
      value: function copyPenManager(ret, src) {
        if (src === undefined) {
          src = this.penManager;
        }

        return src.copy(ret);
      }
    }, {
      key: "getTextWidth",
      value: function getTextWidth(penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }

        return penManager.getMaxLineWidth();
      }
    }, {
      key: "getLastPen",
      value: function getLastPen(penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }

        return penManager.lastPen;
      }
    }]);

    return CanvasText;
  }();
  var methods$f = {
    setInteractive: SetInteractive
  };
  Object.assign(CanvasText.prototype, DrawMethods, methods$f);

  var GetValue$1h = Phaser.Utils.Objects.GetValue;

  var AddImage$1 = function AddImage(key, config) {
    if (config === undefined) {
      config = {
        key: key
      };
    }

    if (!config.hasOwnProperty('key')) {
      config.key = key;
    }

    var textureKey = config.key,
        frameKey = config.frame;
    var width = config.width,
        height = config.height;

    if (width === undefined || height === undefined) {
      var frame = this.textureManager.getFrame(textureKey, frameKey);
      var frameWidth = frame ? frame.cutWidth : 0;
      var frameHeight = frame ? frame.cutHeight : 0;

      if (width === undefined && height === undefined) {
        width = frameWidth;
        height = frameHeight;
      } else if (width === undefined) {
        width = frameWidth * (height / frameHeight);
      } else if (height === undefined) {
        height = frameHeight * (width / frameWidth);
      }
    }

    this.images[key] = {
      key: textureKey,
      frame: frameKey,
      width: width,
      height: height,
      y: GetValue$1h(config, 'y', 0),
      left: GetValue$1h(config, 'left', 0),
      right: GetValue$1h(config, 'right', 0)
    };
  };

  var DrawImage$2 = function DrawImage(key, context, x, y, autoRound) {
    var imgData = this.get(key);
    x += imgData.left;
    y += imgData.y;

    if (autoRound) {
      x = Math.round(x);
      y = Math.round(y);
    }

    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);
    context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight, x, y, imgData.width, imgData.height);
  };

  var ImageManager = /*#__PURE__*/function () {
    function ImageManager(scene) {
      _classCallCheck(this, ImageManager);

      this.textureManager = scene.sys.textures;
      this.images = {};
    }

    _createClass(ImageManager, [{
      key: "destroy",
      value: function destroy() {
        this.textureManager = undefined;
        this.images = undefined;
      }
    }, {
      key: "add",
      value: function add(key, config) {
        if (typeof key === 'string') {
          AddImage$1.call(this, key, config);
        } else if (Array.isArray(key)) {
          var data = key;

          for (var i = 0, cnt = data.length; i < cnt; i++) {
            AddImage$1.call(this, data[i]);
          }
        } else {
          var data = key;

          for (var key in data) {
            AddImage$1.call(this, key, data[key]);
          }
        }

        return this;
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.images.hasOwnProperty(key);
      }
    }, {
      key: "remove",
      value: function remove(key) {
        if (this.has(key)) {
          delete this.images[key];
        }

        return this;
      }
    }, {
      key: "get",
      value: function get(key) {
        if (!this.has(key)) {
          if (this.textureManager.exists(key)) {
            this.add(key);
          }
        }

        return this.images[key];
      }
    }, {
      key: "getOuterWidth",
      value: function getOuterWidth(key) {
        var data = this.get(key);
        return data ? data.width + data.left + data.right : 0;
      }
    }, {
      key: "getFrame",
      value: function getFrame(key) {
        var data = this.get(key);
        return data ? this.textureManager.getFrame(data.key, data.frame) : undefined;
      }
    }, {
      key: "hasTexture",
      value: function hasTexture(key) {
        return !!this.getFrame(key);
      }
    }]);

    return ImageManager;
  }();

  var methods$e = {
    draw: DrawImage$2
  };
  Object.assign(ImageManager.prototype, methods$e);

  var CopyCanvasToTexture = function CopyCanvasToTexture(scene, srcCanvas, key, x, y, width, height) {
    var textures = scene.sys.textures;
    var renderer = scene.renderer;

    if (x === undefined) {
      x = 0;
    }

    if (y === undefined) {
      y = 0;
    }

    if (width === undefined) {
      width = srcCanvas.width;
    }

    if (height === undefined) {
      height = srcCanvas.height;
    }

    var texture;

    if (textures.exists(key)) {
      texture = textures.get(key);
    } else {
      texture = textures.createCanvas(key, width, height);
    }

    var destCanvas = texture.getSourceImage();

    if (destCanvas.width !== width) {
      destCanvas.width = width;
    }

    if (destCanvas.height !== height) {
      destCanvas.height = height;
    }

    var destCtx = destCanvas.getContext('2d');
    destCtx.clearRect(0, 0, width, height);
    destCtx.drawImage(srcCanvas, x, y, width, height);

    if (renderer.gl && texture) {
      renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
    }
  };

  var IsPlainObject$m = Phaser.Utils.Objects.IsPlainObject;
  var AddToDOM = Phaser.DOM.AddToDOM;
  var CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;
  var GameObject$2 = Phaser.GameObjects.GameObject;
  var GetValue$1g = Phaser.Utils.Objects.GetValue;
  var RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
  var SPLITREGEXP = CONST.SPLITREGEXP;
  var PensPools = {};

  var Text = /*#__PURE__*/function (_GameObject) {
    _inherits(Text, _GameObject);

    var _super = _createSuper(Text);

    function Text(scene, x, y, text, style, type, parser) {
      var _this;

      _classCallCheck(this, Text);

      if (IsPlainObject$m(x)) {
        var config = x;
        x = GetValue$1g(config, 'x', 0);
        y = GetValue$1g(config, 'y', 0);
        text = GetValue$1g(config, 'text', '');
        style = GetValue$1g(config, 'style', '');
      }

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      _this = _super.call(this, scene, type);
      _this.renderer = scene.sys.game.renderer;

      _this.setPosition(x, y);

      _this.setOrigin(0, 0);

      _this.initPipeline();

      _this.canvas = CanvasPool$1.create(_assertThisInitialized(_this));
      _this.context = _this.canvas.getContext('2d');
      _this._imageManager = undefined;

      if (style) {
        // Override align
        if (style.hasOwnProperty('align')) {
          var halign = style.align;
          delete style.align;
          style.halign = halign;
        } // Has Stroke color but stroke thinkness, set stroke thinkness to 1


        if (style.hasOwnProperty('stroke') && !style.hasOwnProperty('strokeThickness')) {
          style.strokeThickness = 1;
        }
      }

      _this.style = new TextStyle(_assertThisInitialized(_this), style);
      _this.autoRound = true;
      _this._text = undefined;
      _this.padding = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
      _this.width = 1;
      _this.height = 1;
      _this.dirty = false; //  If resolution wasn't set, force it to 1

      if (_this.style.resolution === 0) {
        _this.style.resolution = 1;
      }

      _this._crop = _this.resetCropObject(); //  Create a Texture for this Text object

      _this.texture = scene.sys.textures.addCanvas(null, _this.canvas, true); //  Get the frame

      _this.frame = _this.texture.get(); //  Set the resolution

      _this.frame.source.resolution = _this.style.resolution;

      if (_this.renderer.gl) {
        //  Clear the default 1x1 glTexture, as we override it later
        _this.renderer.deleteTexture(_this.frame.source.glTexture);

        _this.frame.source.glTexture = null;
      }

      if (!PensPools.hasOwnProperty(type)) {
        PensPools[type] = new Stack();
      }

      _this.canvasText = new CanvasText({
        parent: _assertThisInitialized(_this),
        context: _this.context,
        parser: parser,
        style: _this.style,
        pensPool: PensPools[type]
      });
      _this.parser = parser;

      _this.initRTL();

      if (style && style.padding) {
        _this.setPadding(style.padding);
      }

      _this.setText(text);

      scene.sys.game.events.on('contextrestored', _this.onContextRestored, _assertThisInitialized(_this));
      return _this;
    }

    _createClass(Text, [{
      key: "onContextRestored",
      value: function onContextRestored() {
        this.dirty = true;
      }
    }, {
      key: "preDestroy",
      value: function preDestroy() {
        if (this.style.rtl) {
          RemoveFromDOM(this.canvas);
        }

        this.scene.sys.game.events.off('contextrestored', this.onContextRestored, this);
        this.canvasText.destroy();
        this.canvasText = undefined;

        if (this._imageManager) {
          this._imageManager.destroy();

          this._imageManager = undefined;
        }

        CanvasPool$1.remove(this.canvas);
        this.texture.destroy();
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        this.setText(value);
      }
    }, {
      key: "initRTL",
      value: function initRTL() {
        if (!this.style.rtl) {
          return;
        } //  Here is where the crazy starts.
        //
        //  Due to browser implementation issues, you cannot fillText BiDi text to a canvas
        //  that is not part of the DOM. It just completely ignores the direction property.


        this.canvas.dir = 'rtl'; //  Experimental atm, but one day ...

        this.context.direction = 'rtl'; //  Add it to the DOM, but hidden within the parent canvas.

        this.canvas.style.display = 'none';
        AddToDOM(this.canvas, this.scene.sys.canvas); //  And finally we set the x origin

        this.originX = 1;
      }
    }, {
      key: "setText",
      value: function setText(value) {
        if (value == null) {
          value = '';
        } else if (Array.isArray(value)) {
          value = value.join('\n');
        } else {
          value = value.toString();
        }

        if (value === this._text) {
          return this;
        }

        this._text = value;
        this.updateText();
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(value) {
        if (value == null) {
          return this;
        }

        if (Array.isArray(value)) {
          value = value.join('\n');
        }

        this.setText(this.text + value.toString());
        return this;
      }
    }, {
      key: "setStyle",
      value: function setStyle(style) {
        return this.style.setStyle(style);
      }
    }, {
      key: "setFont",
      value: function setFont(font) {
        return this.style.setFont(font);
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(family) {
        return this.style.setFontFamily(family);
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(size) {
        return this.style.setFontSize(size);
      }
    }, {
      key: "setFontStyle",
      value: function setFontStyle(style) {
        return this.style.setFontStyle(style);
      }
    }, {
      key: "setTestString",
      value: function setTestString(string) {
        return this.style.setTestString(string);
      }
    }, {
      key: "setFixedSize",
      value: function setFixedSize(width, height) {
        return this.style.setFixedSize(width, height);
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(color, color2, isHorizontalGradient) {
        return this.style.setBackgroundColor(color, color2, isHorizontalGradient);
      }
    }, {
      key: "setBackgroundStrokeColor",
      value: function setBackgroundStrokeColor(color, lineWidth) {
        return this.style.setBackgroundStrokeColor(color, lineWidth);
      }
    }, {
      key: "setBackgroundCornerRadius",
      value: function setBackgroundCornerRadius(radius, iteration) {
        return this.style.setBackgroundCornerRadius(radius, iteration);
      }
    }, {
      key: "setFill",
      value: function setFill(color) {
        return this.style.setFill(color);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        return this.style.setColor(color);
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, thickness) {
        return this.style.setStroke(color, thickness);
      }
    }, {
      key: "setShadow",
      value: function setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        return this.style.setShadow(x, y, color, blur, shadowStroke, shadowFill);
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(x, y) {
        return this.style.setShadowOffset(x, y);
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        return this.style.setShadowColor(color);
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        return this.style.setShadowBlur(blur);
      }
    }, {
      key: "setShadowStroke",
      value: function setShadowStroke(enabled) {
        return this.style.setShadowStroke(enabled);
      }
    }, {
      key: "setShadowFill",
      value: function setShadowFill(enabled) {
        return this.style.setShadowFill(enabled);
      }
    }, {
      key: "setWrapMode",
      value: function setWrapMode(mode) {
        return this.style.setWrapMode(mode);
      }
    }, {
      key: "setWrapWidth",
      value: function setWrapWidth(width) {
        return this.style.setWrapWidth(width);
      } // Align with built-in text game object

    }, {
      key: "setWordWrapWidth",
      value: function setWordWrapWidth(width) {
        return this.style.setWrapWidth(width);
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        return this.style.setHAlign(align);
      }
    }, {
      key: "setHAlign",
      value: function setHAlign(align) {
        return this.style.setHAlign(align);
      }
    }, {
      key: "setVAlign",
      value: function setVAlign(align) {
        return this.style.setVAlign(align);
      }
    }, {
      key: "setLineSpacing",
      value: function setLineSpacing(value) {
        return this.style.setLineSpacing(value);
      }
    }, {
      key: "setXOffset",
      value: function setXOffset(value) {
        return this.style.setXOffset(value);
      }
    }, {
      key: "setPadding",
      value: function setPadding(left, top, right, bottom) {
        if (_typeof(left) === 'object') {
          var config = left; //  If they specify x and/or y this applies to all

          var x = GetValue$1g(config, 'x', null);

          if (x !== null) {
            left = x;
            right = x;
          } else {
            left = GetValue$1g(config, 'left', 0);
            right = GetValue$1g(config, 'right', left);
          }

          var y = GetValue$1g(config, 'y', null);

          if (y !== null) {
            top = y;
            bottom = y;
          } else {
            top = GetValue$1g(config, 'top', 0);
            bottom = GetValue$1g(config, 'bottom', top);
          }
        } else {
          if (left === undefined) {
            left = 0;
          }

          if (top === undefined) {
            top = left;
          }

          if (right === undefined) {
            right = left;
          }

          if (bottom === undefined) {
            bottom = top;
          }
        }

        this.padding.left = left;
        this.padding.top = top;
        this.padding.right = right;
        this.padding.bottom = bottom;
        return this.updateText(false);
      }
    }, {
      key: "setMaxLines",
      value: function setMaxLines(max) {
        return this.style.setMaxLines(max);
      }
    }, {
      key: "setResolution",
      value: function setResolution(value) {
        return this.style.setResolution(value);
      }
    }, {
      key: "updateText",
      value: function updateText(runWrap) {
        if (runWrap === undefined) {
          runWrap = true;
        }

        var canvasText = this.canvasText; // wrap text to pens

        var style = this.style;

        if (runWrap) {
          canvasText.updatePenManager(this._text, style.wrapMode, style.wrapWidth, style.lineHeight);
        } // resize


        var padding = this.padding;
        var textWidth, textHeight;
        var linesWidth = Math.ceil(canvasText.linesWidth);

        if (style.fixedWidth === 0) {
          this.width = linesWidth + padding.left + padding.right;
          textWidth = linesWidth;
        } else {
          this.width = style.fixedWidth;
          textWidth = this.width - padding.left - padding.right;

          if (textWidth < linesWidth) {
            textWidth = linesWidth;
          }
        }

        if (style.fixedHeight === 0) {
          this.height = canvasText.linesHeight + padding.top + padding.bottom;
          textHeight = canvasText.linesHeight;
        } else {
          this.height = style.fixedHeight;
          textHeight = this.height - padding.top - padding.bottom;

          if (textHeight < canvasText.linesHeight) {
            textHeight = canvasText.linesHeight;
          }
        }

        var w = this.width;
        var h = this.height;
        this.updateDisplayOrigin();
        var resolution = style.resolution;
        w *= resolution;
        h *= resolution;
        w = Math.max(Math.ceil(w), 1);
        h = Math.max(Math.ceil(h), 1);
        var canvas = this.canvas;
        var context = this.context;

        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          this.frame.setSize(w, h);
        } else {
          context.clearRect(0, 0, w, h);
        }

        context.save();
        context.scale(resolution, resolution); // draw

        var startX = !this.style.rtl ? padding.left : padding.right;
        var startY = padding.top;
        canvasText.draw(startX, startY, textWidth, textHeight);
        context.restore();

        if (this.renderer && this.renderer.gl) {
          this.frame.source.glTexture = this.renderer.canvasToTexture(canvas, this.frame.source.glTexture, true);
          this.frame.glTexture = this.frame.source.glTexture;
        }

        this.dirty = true;
        var input = this.input;

        if (input && !input.customHitArea) {
          input.hitArea.width = this.width;
          input.hitArea.height = this.height;
        }

        return this;
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics() {
        return this.style.getTextMetrics();
      }
    }, {
      key: "setTextMetrics",
      value: function setTextMetrics(metrics, font) {
        return this.style.setTextMetrics(metrics, font);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var out = Components$3.ToJSON(this); //  Extra Text data is added here

        var data = {
          autoRound: this.autoRound,
          text: this._text,
          style: this.style.toJSON(),
          resolution: this.resolution,
          padding: {
            left: this.padding.left,
            right: this.padding.right,
            top: this.padding.top,
            bottom: this.padding.bottom
          }
        };
        out.data = data;
        return out;
      }
    }, {
      key: "setInteractive",
      value: function setInteractive(hitArea, hitAreaCallback, dropZone) {
        var isInteractived = !!this.input;
        GameObject$2.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

        if (!isInteractived) {
          this.canvasText.setInteractive();
        }

        return this;
      }
    }, {
      key: "getWrappedText",
      value: function getWrappedText(text, start, end) {
        text = this.canvasText.getText(text, start, end, true);
        return text.split(SPLITREGEXP);
      }
    }, {
      key: "getPlainText",
      value: function getPlainText(text, start, end) {
        return this.canvasText.getPlainText(text, start, end);
      }
    }, {
      key: "getText",
      value: function getText(text, start, end, wrap) {
        if (wrap === undefined) {
          wrap = false;
        }

        return this.canvasText.getText(text, start, end, wrap);
      }
    }, {
      key: "getSubString",
      value: function getSubString(text, start, end) {
        return this.getText(text, start, end);
      }
    }, {
      key: "copyPenManager",
      value: function copyPenManager(penManager) {
        return this.canvasText.copyPenManager(penManager);
      }
    }, {
      key: "getPenManager",
      value: function getPenManager(text, penManager) {
        return this.canvasText.getPenManager(text, penManager);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        return this.setFixedSize(width, height);
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        return this.setFixedSize(width, height);
      }
    }, {
      key: "lineSpacing",
      get: function get() {
        return this.style.lineSpacing;
      },
      set: function set(value) {
        this.setLineSpacing(value);
      }
    }, {
      key: "imageManager",
      get: function get() {
        if (!this._imageManager) {
          this._imageManager = new ImageManager(this.scene);
        }

        return this._imageManager;
      }
    }, {
      key: "addImage",
      value: function addImage(key, config) {
        this.imageManager.add(key, config);
        return this;
      }
    }, {
      key: "drawAreaBounds",
      value: function drawAreaBounds(graphics, color) {
        this.canvasText.hitAreaManager.drawBounds(graphics, color, this);
        return this;
      }
    }, {
      key: "measureTextMargins",
      value: function measureTextMargins(testString, out) {
        return MeasureTextMargins(this.style, testString, out);
      }
    }, {
      key: "generateTexture",
      value: function generateTexture(key, x, y, width, height) {
        var srcCanvas = this.canvas;

        if (width === undefined) {
          width = srcCanvas.width;
        } else {
          width *= this.resolution;
        }

        if (height === undefined) {
          height = srcCanvas.height;
        } else {
          height *= this.resolution;
        }

        CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);
        return this;
      }
    }]);

    return Text;
  }(GameObject$2);

  var Components$3 = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Text, [Components$3.Alpha, Components$3.BlendMode, Components$3.ComputedSize, Components$3.Crop, Components$3.Depth, Components$3.Flip, Components$3.GetBounds, Components$3.Mask, Components$3.Origin, Components$3.Pipeline, Components$3.ScrollFactor, Components$3.Tint, Components$3.Transform, Components$3.Visible, Render$4]);

  var GetOpenTagRegString = function GetOpenTagRegString(tagName, param) {
    if (param === undefined) {
      return "\\[".concat(tagName, "\\]");
    } else {
      return "\\[".concat(tagName, "=(").concat(param, ")\\]");
    }
  };

  var GetCloseTagRegString = function GetCloseTagRegString(tagName) {
    return "\\[/".concat(tagName, "\\]");
  };

  var NUMBER_PARAM = '[-.0-9]+';
  var COLOR_PARAM = '[a-z]+|#[0-9abcdef]+';
  var STR_PARAM = '[^\\]]+';
  var ESC = 'esc';
  var ESC_OPEN = GetOpenTagRegString(ESC);
  var ESC_CLOSE = GetCloseTagRegString(ESC);
  var RAW = 'raw';
  var RAW_OPEN = GetOpenTagRegString(RAW);
  var RAW_CLOSE = GetCloseTagRegString(RAW);
  var BLOD = 'b';
  var BLOD_OPEN = GetOpenTagRegString(BLOD);
  var BLOD_CLOSE = GetCloseTagRegString(BLOD);
  var ITALICS = 'i';
  var ITALICS_OPEN = GetOpenTagRegString(ITALICS);
  var ITALICS_CLOSE = GetCloseTagRegString(ITALICS);
  var WEIGHT = 'weight';
  var WEIGHT_OPEN = GetOpenTagRegString(WEIGHT, NUMBER_PARAM);
  var WEIGHT_CLOSE = GetCloseTagRegString(WEIGHT);
  var SIZE = 'size';
  var SIZE_OPEN = GetOpenTagRegString(SIZE, NUMBER_PARAM);
  var SIZE_CLOSE = GetCloseTagRegString(SIZE);
  var COLOR = 'color';
  var COLOR_OPEN = GetOpenTagRegString(COLOR, COLOR_PARAM);
  var COLOR_CLOSE = GetCloseTagRegString(COLOR);
  var UNDERLINE = 'u';
  var UNDERLINE_OPEN = GetOpenTagRegString(UNDERLINE);
  var UNDERLINE_OPENC = GetOpenTagRegString(UNDERLINE, COLOR_PARAM);
  var UNDERLINE_CLOSE = GetCloseTagRegString(UNDERLINE);
  var SHADOW = 'shadow';
  var SHADOW_OPEN = GetOpenTagRegString(SHADOW);
  var SHADOW_CLOSE = GetCloseTagRegString(SHADOW);
  var STROKE = 'stroke';
  var STROKE_OPEN = GetOpenTagRegString(STROKE);
  var STROKE_OPENC = GetOpenTagRegString(STROKE, COLOR_PARAM);
  var STROKE_CLOSE = GetCloseTagRegString(STROKE);
  var OFFSETY = 'y';
  var OFFSETY_OPEN = GetOpenTagRegString(OFFSETY, NUMBER_PARAM);
  var OFFSETY_CLOSE = GetCloseTagRegString(OFFSETY);
  var IMAGE = 'img';
  var IMAGE_OPEN = GetOpenTagRegString(IMAGE, STR_PARAM);
  var IMAGE_CLOSE = GetCloseTagRegString(IMAGE);
  var AREA = 'area';
  var AREA_OPEN = GetOpenTagRegString(AREA, STR_PARAM);
  var AREA_CLOSE = GetCloseTagRegString(AREA);
  var ALIGN$2 = 'align';
  var ALIGN_OPEN = GetOpenTagRegString(ALIGN$2, STR_PARAM);
  var ALIGN_CLOSE = GetCloseTagRegString(ALIGN$2);
  var RE_ESC_OPEN = new RegExp(ESC_OPEN, 'i');
  var RE_ESC_CLOSE = new RegExp(ESC_CLOSE, 'i');
  var RE_RAW_OPEN = new RegExp(RAW_OPEN, 'i');
  var RE_RAW_CLOSE = new RegExp(RAW_CLOSE, 'i');
  var RE_BLOD_OPEN = new RegExp(BLOD_OPEN, 'i');
  var RE_BLOD_CLOSE = new RegExp(BLOD_CLOSE, 'i');
  var RE_ITALICS_OPEN = new RegExp(ITALICS_OPEN, 'i');
  var RE_ITALICS_CLOSE = new RegExp(ITALICS_CLOSE, 'i');
  var RE_WEIGHT_OPEN = new RegExp(WEIGHT_OPEN, 'i');
  var RE_WEIGHT_CLOSE = new RegExp(WEIGHT_CLOSE, 'i');
  var RE_SIZE_OPEN = new RegExp(SIZE_OPEN, 'i');
  var RE_SIZE_CLOSE = new RegExp(SIZE_CLOSE, 'i');
  var RE_COLOR_OPEN = new RegExp(COLOR_OPEN, 'i');
  var RE_COLOR_CLOSE = new RegExp(COLOR_CLOSE, 'i');
  var RE_UNDERLINE_OPEN = new RegExp(UNDERLINE_OPEN, 'i');
  var RE_UNDERLINE_OPENC = new RegExp(UNDERLINE_OPENC, 'i');
  var RE_UNDERLINE_CLOSE = new RegExp(UNDERLINE_CLOSE, 'i');
  var RE_SHADOW_OPEN = new RegExp(SHADOW_OPEN, 'i');
  var RE_SHADOW_CLOSE = new RegExp(SHADOW_CLOSE, 'i');
  var RE_STROKE_OPEN = new RegExp(STROKE_OPEN, 'i');
  var RE_STROKE_OPENC = new RegExp(STROKE_OPENC, 'i');
  var RE_STROKE_CLOSE = new RegExp(STROKE_CLOSE, 'i');
  var RE_OFFSETY_OPEN = new RegExp(OFFSETY_OPEN, 'i');
  var RE_OFFSETY_CLOSE = new RegExp(OFFSETY_CLOSE, 'i');
  var RE_IMAGE_OPEN = new RegExp(IMAGE_OPEN, 'i');
  var RE_IMAGE_CLOSE = new RegExp(IMAGE_CLOSE, 'i');
  var RE_AREA_OPEN = new RegExp(AREA_OPEN, 'i');
  var RE_AREA_CLOSE = new RegExp(AREA_CLOSE, 'i');
  var RE_ALIGN_OPEN = new RegExp(ALIGN_OPEN, 'i');
  var RE_ALIGN_CLOSE = new RegExp(ALIGN_CLOSE, 'i');
  var RE_SPLITTEXT = new RegExp([RAW_OPEN, RAW_CLOSE, ESC_OPEN, ESC_CLOSE, BLOD_OPEN, BLOD_CLOSE, ITALICS_OPEN, ITALICS_CLOSE, WEIGHT_OPEN, WEIGHT_CLOSE, SIZE_OPEN, SIZE_CLOSE, COLOR_OPEN, COLOR_CLOSE, UNDERLINE_OPEN, UNDERLINE_OPENC, UNDERLINE_CLOSE, SHADOW_OPEN, SHADOW_CLOSE, STROKE_OPEN, STROKE_OPENC, STROKE_CLOSE, OFFSETY_OPEN, OFFSETY_CLOSE, IMAGE_OPEN, IMAGE_CLOSE, AREA_OPEN, AREA_CLOSE, ALIGN_OPEN, ALIGN_CLOSE].join('|'), 'ig');

  var SplitText = function SplitText(text, mode) {
    var result = [];
    var charIdx = 0;
    var rawMode = false,
        escMode = false;

    while (true) {
      var regexResult = RE_SPLITTEXT.exec(text);

      if (!regexResult) {
        break;
      }

      var match = regexResult[0];

      if (escMode) {
        if (RE_ESC_CLOSE.test(match)) {
          escMode = false;
        } else {
          continue; // Skip other tags
        }
      } else if (rawMode) {
        if (RE_RAW_CLOSE.test(match)) {
          rawMode = false;
        } else {
          continue; // Skip other tags
        }
      } else {
        if (RE_ESC_OPEN.test(match)) {
          escMode = true;
        } else if (RE_RAW_OPEN.test(match)) {
          rawMode = true;
        }
      }

      var matchEnd = RE_SPLITTEXT.lastIndex;
      var matchStart = matchEnd - match.length;

      if (charIdx < matchStart) {
        var content = text.substring(charIdx, matchStart);
        result.push(content);
      }

      if (mode === undefined) {
        result.push(match);
      }

      charIdx = matchEnd;
    }

    var totalLen = text.length;

    if (charIdx < totalLen) {
      // Push remainder string
      result.push(text.substring(charIdx, totalLen));
    }

    return result; // [text,...]
  };

  var PROP_REMOVE = false;
  var PROP_ADD = true;
  var GETPROP_RESULT = {
    plainText: null,
    prevProp: null
  };

  var TagTextToProp = function TagTextToProp(text, prevProp) {
    // text : result of splitText()
    if (prevProp == null) {
      prevProp = {};
    }

    var plainText = ''; // close image tag

    if (prevProp.img) {
      UpdateProp(prevProp, PROP_REMOVE, 'img');
    }

    if (prevProp.esc) {
      if (RE_ESC_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'esc');
      } else {
        plainText = text;
      }
    } else if (prevProp.raw) {
      if (RE_RAW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'raw');
      } else {
        plainText = text;
      }
    } else {
      if (RE_ESC_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'esc', true);
      } else if (RE_ESC_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'esc');
      } else if (RE_RAW_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'raw', true);
      } else if (RE_RAW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'raw');
      } else if (RE_BLOD_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'b', true);
      } else if (RE_BLOD_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'b');
      } else if (RE_ITALICS_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'i', true);
      } else if (RE_ITALICS_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'i');
      } else if (RE_WEIGHT_OPEN.test(text)) {
        var innerMatch = text.match(RE_WEIGHT_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'weight', innerMatch[1]);
      } else if (RE_WEIGHT_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'weight');
      } else if (RE_SIZE_OPEN.test(text)) {
        var innerMatch = text.match(RE_SIZE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'size', "".concat(innerMatch[1], "px"));
      } else if (RE_SIZE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'size');
      } else if (RE_COLOR_OPEN.test(text)) {
        var innerMatch = text.match(RE_COLOR_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'color', innerMatch[1]);
      } else if (RE_COLOR_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'color');
      } else if (RE_UNDERLINE_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'u', true);
      } else if (RE_UNDERLINE_OPENC.test(text)) {
        var innerMatch = text.match(RE_UNDERLINE_OPENC);
        UpdateProp(prevProp, PROP_ADD, 'u', innerMatch[1]);
      } else if (RE_UNDERLINE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'u');
      } else if (RE_SHADOW_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'shadow', true);
      } else if (RE_SHADOW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'shadow');
      } else if (RE_STROKE_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'stroke', true);
      } else if (RE_STROKE_OPENC.test(text)) {
        var innerMatch = text.match(RE_STROKE_OPENC);
        UpdateProp(prevProp, PROP_ADD, 'stroke', innerMatch[1]);
      } else if (RE_STROKE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'stroke');
      } else if (RE_OFFSETY_OPEN.test(text)) {
        var innerMatch = text.match(RE_OFFSETY_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'y', parseFloat(innerMatch[1]));
      } else if (RE_OFFSETY_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'y');
      } else if (RE_IMAGE_OPEN.test(text)) {
        var innerMatch = text.match(RE_IMAGE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'img', innerMatch[1]);
      } else if (RE_IMAGE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'img');
      } else if (RE_AREA_OPEN.test(text)) {
        var innerMatch = text.match(RE_AREA_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'area', innerMatch[1]);
      } else if (RE_AREA_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'area');
      } else if (RE_ALIGN_OPEN.test(text)) {
        var innerMatch = text.match(RE_ALIGN_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'align', innerMatch[1]);
      } else if (RE_ALIGN_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'align');
      } else {
        plainText = text;
      }
    }

    var result = GETPROP_RESULT;
    result.plainText = plainText;
    result.prop = prevProp;
    return result;
  };

  var UpdateProp = function UpdateProp(prop, op, key, value) {
    if (op === PROP_ADD) {
      // PROP_ADD     
      prop[key] = value;
    } else {
      // PROP_REMOVE        
      if (prop.hasOwnProperty(key)) {
        delete prop[key];
      }
    }

    return prop;
  };

  var PropToContextStyle = function PropToContextStyle(defaultStyle, prop) {
    var result = STYLE_RESULT;

    if (!prop.hasOwnProperty('img')) {
      result.image = null;

      if (prop.hasOwnProperty('family')) {
        result.fontFamily = prop.family;
      } else {
        result.fontFamily = defaultStyle.fontFamily;
      }

      if (prop.hasOwnProperty('size')) {
        var size = prop.size;

        if (typeof size === 'number') {
          size = "".concat(size, "px");
        }

        result.fontSize = size;
      } else {
        result.fontSize = defaultStyle.fontSize;
      }

      result.fontStyle = GetFontStyle(prop);

      if (prop.hasOwnProperty('color')) {
        result.color = prop.color;
      } else {
        result.color = defaultStyle.color;
      }

      if (prop.hasOwnProperty('stroke')) {
        if (prop.stroke === true) {
          result.stroke = defaultStyle.stroke;
          result.strokeThickness = defaultStyle.strokeThickness;
        } else {
          result.stroke = prop.stroke;
          result.strokeThickness = defaultStyle.strokeThickness;
        }
      } else {
        result.stroke = defaultStyle.stroke;
        result.strokeThickness = 0;
      }
    } else {
      result.image = prop.img;
    }

    if (prop.hasOwnProperty('shadow')) {
      if (prop.shadow === true) {
        result.shadowColor = defaultStyle.shadowColor;
        result.shadowOffsetX = defaultStyle.shadowOffsetX;
        result.shadowOffsetY = defaultStyle.shadowOffsetY;
        result.shadowBlur = defaultStyle.shadowBlur;
        result.shadowStroke = true;
        result.shadowFill = true;
      } else {
        result.shadowColor = prop.shadow;
        result.shadowOffsetX = defaultStyle.shadowOffsetX;
        result.shadowOffsetY = defaultStyle.shadowOffsetY;
        result.shadowBlur = defaultStyle.shadowBlur;
        result.shadowStroke = true;
        result.shadowFill = true;
      }
    } else {
      result.shadowColor = '#000';
      result.shadowOffsetX = 0;
      result.shadowOffsetY = 0;
      result.shadowBlur = 0;
      result.shadowStroke = false;
      result.shadowFill = false;
    }

    if (prop.hasOwnProperty('u')) {
      if (prop.u === true) {
        result.underlineColor = defaultStyle.underlineColor;
        result.underlineThickness = defaultStyle.underlineThickness;
        result.underlineOffset = defaultStyle.underlineOffset;
      } else {
        result.underlineColor = prop.u;
        result.underlineThickness = defaultStyle.underlineThickness;
        result.underlineOffset = defaultStyle.underlineOffset;
      }
    } else {
      result.underlineColor = '#000';
      result.underlineThickness = 0;
      result.underlineOffset = 0;
    }

    return result;
  };

  var GetFontStyle = function GetFontStyle(prop) {
    var isBold = prop.b;
    var weight = prop.weight;
    var isItalic = prop.i;

    if (isBold || weight || isItalic) {
      if (isItalic) {
        if (isBold) {
          return 'bold italic';
        } else if (weight) {
          return "".concat(weight, " italic");
        } else {
          return 'italic';
        }
      } else {
        // !isItalic
        if (isBold) {
          return 'bold';
        } else {
          return weight.toString();
        }
      }
    } else {
      return '';
    }
  };

  var STYLE_RESULT = new TextStyle();

  var PropToTagText = function PropToTagText(text, prop, prevProp) {
    if (prevProp == null) {
      prevProp = EMPTYPROP;
    }

    var headers = [];

    for (var k in prevProp) {
      if (!prop.hasOwnProperty(k)) {
        headers.push("[/".concat(k, "]"));
      }
    }

    for (var k in prop) {
      var value = prop[k];

      if (prevProp[k] === value) {
        continue;
      }

      switch (k) {
        case 'size':
          headers.push("[size=".concat(value.replace('px', ''), "]"));
          break;

        case 'color':
        case 'weight':
        case 'stroke':
        case 'y':
        case 'img':
        case 'area':
        case 'align':
          headers.push("[".concat(k, "=").concat(value, "]"));
          break;

        case 'u':
          if (value === true) {
            headers.push('[u]');
          } else {
            headers.push("[u=".concat(value, "]"));
          }

          break;

        default:
          headers.push("[".concat(k, "]"));
          break;
      }
    }

    headers.push(text);
    return headers.join('');
  };

  var EMPTYPROP = {};

  var Parser = /*#__PURE__*/function () {
    function Parser() {
      _classCallCheck(this, Parser);
    }

    _createClass(Parser, [{
      key: "getStrokeThinkness",
      value: function getStrokeThinkness(defaultStyle, prop) {
        var strokeThickness;

        if (prop.hasOwnProperty('stroke')) {
          strokeThickness = defaultStyle.strokeThickness;
        } else {
          strokeThickness = 0;
        }

        return strokeThickness;
      }
    }]);

    return Parser;
  }();

  var methods$d = {
    splitText: SplitText,
    tagTextToProp: TagTextToProp,
    propToContextStyle: PropToContextStyle,
    propToTagText: PropToTagText
  };
  Object.assign(Parser.prototype, methods$d);

  var BBCodeText = /*#__PURE__*/function (_Text) {
    _inherits(BBCodeText, _Text);

    var _super = _createSuper(BBCodeText);

    function BBCodeText(scene, x, y, text, style) {
      _classCallCheck(this, BBCodeText);

      var parser = new Parser(style);
      return _super.call(this, scene, x, y, text, style, 'rexBBCodeText', parser);
    }

    return _createClass(BBCodeText);
  }(Text);

  var CreateBBCodeText = function CreateBBCodeText(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new BBCodeText(scene, 0, 0, data.text, data);
    SetTextureProperties(gameObject, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

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

  var DegToRad$5 = Phaser.Math.DegToRad;

  var ArcTo = function ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }

    var deltaAngle = endAngle - startAngle;
    var step = DegToRad$5(deltaAngle) / iteration;
    startAngle = DegToRad$5(startAngle);

    for (var i = 0; i <= iteration; i++) {
      var angle = startAngle + step * i;
      var x = centerX + radiusX * Math.cos(angle);
      var y = centerY + radiusY * Math.sin(angle);
      LineTo(x, y, pathData);
    }

    return pathData;
  };

  /*
  src: {
      fillColor, 
      fillAlpha, 
      pathData, 
      pathIndexes  // Earcut(pathData)
  }
  */
  var Utils$2 = Phaser.Renderer.WebGL.Utils;

  var FillPathWebGL = function FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy) {
    var fillTintColor = Utils$2.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);
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
  var Utils$1 = Phaser.Renderer.WebGL.Utils;

  var StrokePathWebGL = function StrokePathWebGL(pipeline, src, alpha, dx, dy) {
    var strokeTint = pipeline.strokeTint;
    var strokeTintColor = Utils$1.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);
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

  var GetCalcMatrix$2 = Phaser.GameObjects.GetCalcMatrix;

  var PolygonWebGLRenderer = function PolygonWebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateData();
      src.dirty = false;
    }

    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var result = GetCalcMatrix$2(src, camera, parentMatrix);
    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);
    var dx = src._displayOriginX;
    var dy = src._displayOriginY;
    var alpha = camera.alpha * src.alpha;
    renderer.pipelines.preBatch(src);

    if (src.isFilled) {
      FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy);
    }

    if (src.isStroked) {
      StrokePathWebGL(pipeline, src, alpha, dx, dy);
    }

    renderer.pipelines.postBatch(src);
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

  var SetTransform$2 = Phaser.Renderer.Canvas.SetTransform;

  var PolygonCanvasRenderer = function PolygonCanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateData();
      src.dirty = false;
    }

    camera.addToRenderList(src);
    var ctx = renderer.currentContext;

    if (SetTransform$2(renderer, ctx, src, camera, parentMatrix)) {
      var dx = src._displayOriginX;
      var dy = src._displayOriginY;
      var path = src.pathData;
      var pathLength = path.length - 1;
      var px1 = path[0] - dx;
      var py1 = path[1] - dy;
      ctx.beginPath();
      ctx.moveTo(px1, py1);

      if (!src.closePath) {
        pathLength -= 2;
      }

      for (var i = 2; i < pathLength; i += 2) {
        var px2 = path[i] - dx;
        var py2 = path[i + 1] - dy;
        ctx.lineTo(px2, py2);
      }

      ctx.closePath();

      if (src.isFilled) {
        FillStyleCanvas(ctx, src);
        ctx.fill();
      }

      if (src.isStroked) {
        LineStyleCanvas(ctx, src);
        ctx.stroke();
      } //  Restore the context saved in SetTransform


      ctx.restore();
    }
  };

  var Render$3 = {
    renderWebGL: PolygonWebGLRenderer,
    renderCanvas: PolygonCanvasRenderer
  };

  var Shape$1 = Phaser.GameObjects.Shape;
  var IsPlainObject$l = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$1f = Phaser.Utils.Objects.GetValue;
  var Earcut$1 = Phaser.Geom.Polygon.Earcut;

  var RoundRectangle = /*#__PURE__*/function (_Shape) {
    _inherits(RoundRectangle, _Shape);

    var _super = _createSuper(RoundRectangle);

    function RoundRectangle(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
      var _this;

      _classCallCheck(this, RoundRectangle);

      var strokeColor, strokeAlpha, strokeWidth;

      if (IsPlainObject$l(x)) {
        var config = x;
        x = config.x;
        y = config.y;
        width = config.width;
        height = config.height;
        radiusConfig = config.radius;
        fillColor = config.color;
        fillAlpha = config.alpha;
        strokeColor = config.strokeColor;
        strokeAlpha = config.strokeAlpha;
        strokeWidth = config.strokeWidth;
      }

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      if (radiusConfig === undefined) {
        radiusConfig = 0;
      }

      var geom = new RoundRectangle$1(); // Configurate it later

      _this = _super.call(this, scene, 'rexRoundRectangleShape', geom);
      var radius = GetValue$1f(radiusConfig, 'radius', radiusConfig);
      geom.setTo(0, 0, width, height, radius);
      var iteration = GetValue$1f(radiusConfig, 'iteration', undefined);

      _this.setIteration(iteration);

      _this.setPosition(x, y);

      if (fillColor !== undefined) {
        _this.setFillStyle(fillColor, fillAlpha);
      }

      if (strokeColor !== undefined) {
        if (strokeWidth === undefined) {
          strokeWidth = 2;
        }

        _this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);
      }

      _this.updateDisplayOrigin();

      _this.dirty = true;
      return _this;
    }

    _createClass(RoundRectangle, [{
      key: "updateData",
      value: function updateData() {
        var geom = this.geom;
        var pathData = this.pathData;
        pathData.length = 0;
        var cornerRadius = geom.cornerRadius,
            radius,
            iteration = this.iteration + 1; // bottom-right

        radius = cornerRadius.br;

        if (isArcCorner(radius)) {
          var centerX = geom.width - radius.x;
          var centerY = geom.height - radius.y;
          ArcTo(centerX, centerY, radius.x, radius.y, 0, 90, false, iteration, pathData);
        } else {
          LineTo(geom.width, geom.height, pathData);
        } // bottom-left


        radius = cornerRadius.bl;

        if (isArcCorner(radius)) {
          var centerX = radius.x;
          var centerY = geom.height - radius.y;
          ArcTo(centerX, centerY, radius.x, radius.y, 90, 180, false, iteration, pathData);
        } else {
          LineTo(0, geom.height, pathData);
        } // top-left


        radius = cornerRadius.tl;

        if (isArcCorner(radius)) {
          var centerX = radius.x;
          var centerY = radius.y;
          ArcTo(centerX, centerY, radius.x, radius.y, 180, 270, false, iteration, pathData);
        } else {
          LineTo(0, 0, pathData);
        } // top-right


        radius = cornerRadius.tr;

        if (isArcCorner(radius)) {
          var centerX = geom.width - radius.x;
          var centerY = radius.y;
          ArcTo(centerX, centerY, radius.x, radius.y, 270, 360, false, iteration, pathData);
        } else {
          LineTo(geom.width, 0, pathData);
        }

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve

        this.pathIndexes = Earcut$1(pathData);
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this.geom.width;
      },
      set: function set(value) {
        this.resize(value, this.height);
      }
    }, {
      key: "height",
      get: function get() {
        return this.geom.height;
      },
      set: function set(value) {
        this.resize(this.width, value);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        // Override Shape's setSize method
        if (height === undefined) {
          height = width;
        }

        if (this.geom.width === width && this.geom.height === height) {
          return this;
        }

        this.geom.setSize(width, height);
        this.updateDisplayOrigin();
        this.dirty = true;
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
      key: "iteration",
      get: function get() {
        return this._iteration;
      },
      set: function set(value) {
        // Set iteration first time
        if (this._iteration === undefined) {
          this._iteration = value;
          return;
        } // Change iteration value


        if (this._iteration === value) {
          return;
        }

        this._iteration = value;
        this.dirty = true;
      }
    }, {
      key: "setIteration",
      value: function setIteration(iteration) {
        if (iteration === undefined) {
          iteration = 6;
        }

        this.iteration = iteration;
        return this;
      }
    }, {
      key: "radius",
      get: function get() {
        return this.geom.radius;
      },
      set: function set(value) {
        this.geom.setRadius(value);
        this.updateDisplayOrigin();
        this.dirty = true;
      }
    }, {
      key: "radiusTL",
      get: function get() {
        return this.geom.radiusTL;
      },
      set: function set(value) {
        this.geom.radiusTL = value;
        this.dirty = true;
      }
    }, {
      key: "radiusTR",
      get: function get() {
        return this.geom.radiusTR;
      },
      set: function set(value) {
        this.geom.radiusTR = value;
        this.dirty = true;
      }
    }, {
      key: "radiusBL",
      get: function get() {
        return this.geom.radiusBL;
      },
      set: function set(value) {
        this.geom.radiusBL = value;
        this.dirty = true;
      }
    }, {
      key: "radiusBR",
      get: function get() {
        return this.geom.radiusBR;
      },
      set: function set(value) {
        this.geom.radiusBR = value;
        this.dirty = true;
      }
    }, {
      key: "setRadius",
      value: function setRadius(value) {
        if (value === undefined) {
          value = 0;
        }

        this.radius = value;
        return this;
      }
    }, {
      key: "setRadiusTL",
      value: function setRadiusTL(value) {
        if (value === undefined) {
          value = 0;
        }

        this.radiusTL = value;
        return this;
      }
    }, {
      key: "setRadiusTR",
      value: function setRadiusTR(value) {
        if (value === undefined) {
          value = 0;
        }

        this.radiusTR = value;
        return this;
      }
    }, {
      key: "setRadiusBL",
      value: function setRadiusBL(value) {
        if (value === undefined) {
          value = 0;
        }

        this.radiuBL = value;
        return this;
      }
    }, {
      key: "setRadiusBR",
      value: function setRadiusBR(value) {
        if (value === undefined) {
          value = 0;
        }

        this.radiusBR = value;
        return this;
      }
    }, {
      key: "cornerRadius",
      get: function get() {
        return this.geom.cornerRadius;
      },
      set: function set(value) {
        this.radius = value;
      }
    }, {
      key: "setCornerRadius",
      value: function setCornerRadius(value) {
        return this.setRadius(value);
      }
    }]);

    return RoundRectangle;
  }(Shape$1);

  var isArcCorner = function isArcCorner(radius) {
    return radius.x !== 0 && radius.y !== 0;
  };

  Object.assign(RoundRectangle.prototype, Render$3);

  var CreateRoundRectangle = function CreateRoundRectangle(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new RoundRectangle(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var SetGetFrameNameCallback = function SetGetFrameNameCallback(callback) {
    if (callback === undefined) {
      callback = DefaultGetFrameNameCallback;
    }

    this.getFrameNameCallback = callback;
    return this;
  };

  var DefaultGetFrameNameCallback = function DefaultGetFrameNameCallback(colIndex, rowIndex, baseFrameName) {
    if (baseFrameName === '__BASE') {
      return "".concat(colIndex, ",").concat(rowIndex);
    } else {
      return "".concat(baseFrameName, "_").concat(colIndex, ",").concat(rowIndex);
    }
  };

  var SetTexture$1 = function SetTexture(key, baseFrameName, columns, rows) {
    if (Array.isArray(baseFrameName)) {
      rows = columns;
      columns = baseFrameName;
      baseFrameName = undefined;
    }

    if (baseFrameName === undefined) {
      baseFrameName = '__BASE';
    }

    columns = DeepClone(columns);
    rows = DeepClone(rows);
    this.textureKey = key;
    this.baseFrameName = baseFrameName;
    this.columns.data = columns;
    this.columns.count = columns ? columns.length : 0;
    this.columns.stretch = 0;
    this.columns.minWidth = 0;
    this.columns.scale = 1;
    this.rows.data = rows;
    this.rows.count = rows ? rows.length : 0;
    this.rows.stretch = 0;
    this.rows.minHeight = 0;
    this.rows.scale = 1;
    var texture = this.scene.sys.textures.get(key);

    if (!texture) {
      this.clear();
      return this;
    }

    if (!columns || !rows) {
      this.clear();
      return this;
    } // Get remainder width/height for unknown width/height


    var baseFrame = texture.get(baseFrameName);
    var remainderTextureWidth = baseFrame.width;
    var unknownColumnWidthCount = 0;

    for (var i = 0, cnt = columns.length; i < cnt; i++) {
      if (columns[i] === undefined) {
        unknownColumnWidthCount++;
      } else if (typeof columns[i] === 'number') {
        remainderTextureWidth -= columns[i];
      } else {
        remainderTextureWidth -= columns[i].width;
      }
    }

    var unknownColumnWidth = remainderTextureWidth / unknownColumnWidthCount;
    var remainderTextureHeight = baseFrame.height;
    var unknownRowHeightCount = 0;

    for (var i = 0, cnt = rows.length; i < cnt; i++) {
      if (rows[i] === undefined) {
        unknownRowHeightCount++;
      } else if (typeof rows[i] === 'number') {
        remainderTextureHeight -= rows[i];
      } else {
        remainderTextureHeight -= rows[i].width;
      }
    }

    var unknownRowHeight = remainderTextureHeight / unknownRowHeightCount;
    var row, col, rowHeight, colWidth, frameName;
    var offsetX = 0,
        offsetY = 0;

    for (var j = 0, jcnt = rows.length; j < jcnt; j++) {
      // Unknown height
      if (rows[j] === undefined) {
        rows[j] = unknownRowHeight;
      }

      if (typeof rows[j] === 'number') {
        rows[j] = {
          height: rows[j],
          stretch: j % 2
        };
      }

      row = rows[j];
      rowHeight = row.height;
      this.rows.stretch += row.stretch | 0;
      this.rows.minHeight += row.stretch > 0 ? 0 : rowHeight;
      offsetX = 0;

      for (var i = 0, icnt = columns.length; i < icnt; i++) {
        // Unknown width
        if (columns[i] === undefined) {
          columns[i] = unknownColumnWidth;
        }

        if (typeof columns[i] === 'number') {
          columns[i] = {
            width: columns[i],
            stretch: i % 2
          };
        }

        col = columns[i];
        colWidth = col.width;

        if (j === 0) {
          this.columns.stretch += col.stretch | 0;
          this.columns.minWidth += col.stretch > 0 ? 0 : colWidth;
        }

        if (colWidth >= 1 && rowHeight >= 1) {
          frameName = this.getFrameNameCallback(i, j, baseFrameName);

          var frameNameType = _typeof(frameName);

          if (frameNameType === 'string' || frameNameType === 'number') {
            texture.add(frameName, 0, offsetX + baseFrame.cutX, offsetY + baseFrame.cutY, colWidth, rowHeight); // Do nothing if frameName is existed
          }
        }

        offsetX += colWidth;
      }

      offsetY += rowHeight;
    }

    this.updateTexture();
    return this;
  };

  var UpdateTexture = function UpdateTexture() {
    this.clear();

    if (this.textureKey === undefined) {
      return this;
    }

    var texture = this.scene.sys.textures.get(this.textureKey);

    if (!texture) {
      return this;
    }

    var minWidth = this.columns.minWidth * this.maxFixedPartScaleX; // Fixed-part width

    var minHeight = this.rows.minHeight * this.maxFixedPartScaleY; // Fixed-part height

    var stretchWidth = this.width - minWidth;
    var stretchHeight = this.height - minHeight;
    var fixedPartScaleX = stretchWidth >= 0 ? this.maxFixedPartScaleX : this.width / minWidth;
    var fixedPartScaleY = stretchHeight >= 0 ? this.maxFixedPartScaleY : this.height / minHeight;

    if (this.preserveRatio) {
      var minScale = Math.min(fixedPartScaleX, fixedPartScaleY);

      if (fixedPartScaleX > minScale) {
        var compensationWidth = (fixedPartScaleX - minScale) * minWidth;

        if (stretchWidth >= 0) {
          stretchWidth += compensationWidth;
        } else {
          stretchWidth = compensationWidth;
        }

        fixedPartScaleX = minScale;
      }

      if (fixedPartScaleY > minScale) {
        var compensationHeight = (fixedPartScaleY - minScale) * minHeight;

        if (stretchHeight >= 0) {
          stretchHeight += compensationHeight;
        } else {
          stretchHeight = compensationHeight;
        }

        fixedPartScaleY = minScale;
      }
    }

    this.columns.scale = fixedPartScaleX;
    this.rows.scale = fixedPartScaleY;
    var proportionWidth;

    if (stretchWidth > 0) {
      proportionWidth = this.columns.stretch > 0 ? stretchWidth / this.columns.stretch : 0;
    } else {
      proportionWidth = 0;
    }

    var proportionHeight;

    if (stretchHeight > 0) {
      proportionHeight = this.rows.stretch > 0 ? stretchHeight / this.rows.stretch : 0;
    } else {
      proportionHeight = 0;
    }

    var frameName, col, row, colWidth, rowHeight;
    var offsetX = 0,
        offsetY = 0;
    var imageType;

    for (var j = 0, jcnt = this.rows.count; j < jcnt; j++) {
      row = this.rows.data[j];
      rowHeight = row.stretch === 0 ? row.height * fixedPartScaleY : proportionHeight * row.stretch;
      offsetX = 0;

      for (var i = 0, icnt = this.columns.count; i < icnt; i++) {
        col = this.columns.data[i];
        colWidth = col.stretch === 0 ? col.width * fixedPartScaleX : proportionWidth * col.stretch;
        frameName = this.getFrameNameCallback(i, j, this.baseFrameName);

        if (texture.has(frameName) && colWidth > 0 && rowHeight > 0) {
          if (row.stretch === 0 && col.stretch === 0) {
            // Fixed parts
            imageType = 0; // Draw image
          } else {
            // Stretchable parts
            if (this.getStretchMode(i, j) === 0) {
              // Scaled image
              imageType = 0; // Draw scaled image
            } else {
              // Repeat tile-sprite
              imageType = 1; // Draw tile-sprite
            }
          }

          if (imageType === 0) {
            this._drawImage(this.textureKey, frameName, offsetX, offsetY, colWidth, rowHeight);
          } else {
            this._drawTileSprite(this.textureKey, frameName, offsetX, offsetY, colWidth, rowHeight);
          }
        }

        offsetX += colWidth;
      }

      offsetY += rowHeight;
    }
  };

  var IsPlainObject$k = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$1e = Phaser.Utils.Objects.GetValue;

  var SetStretchMode = function SetStretchMode(mode) {
    if (IsPlainObject$k(mode)) {
      this.stretchMode.edge = parseMode(GetValue$1e(mode, 'edge', 0));
      this.stretchMode.internal = parseMode(GetValue$1e(mode, 'internal', 0));
    } else {
      mode = parseMode(mode);
      this.stretchMode.edge = mode;
      this.stretchMode.internal = mode;
    }

    return this;
  };

  var parseMode = function parseMode(mode) {
    if (typeof mode === 'string') {
      mode = EXTENDMODE[mode];
    }

    return mode;
  };

  var EXTENDMODE = {
    scale: 0,
    repeat: 1
  };

  var IsEdge = function IsEdge(colIndex, rowIndex) {
    return colIndex === 0 || colIndex === this.columns.count - 1 || rowIndex === 0 || rowIndex === this.rows.count - 1;
  };

  var GetStretchMode = function GetStretchMode(colIndex, rowIndex) {
    return IsEdge.call(this, colIndex, rowIndex) ? this.stretchMode.edge : this.stretchMode.internal;
  };

  var SetPreserveRatio = function SetPreserveRatio(enable) {
    if (enable == undefined) {
      enable = true;
    }

    this.preserveRatio = enable;
    return this;
  };

  var SetMaxFixedPartScale = function SetMaxFixedPartScale(scaleX, scaleY) {
    if (scaleY === undefined) {
      scaleY = scaleX;
    }

    this.maxFixedPartScaleX = scaleX;
    this.maxFixedPartScaleY = scaleY;
    return this;
  };

  var Methods$6 = {
    _drawImage: NOOP,
    _drawTileSprite: NOOP,
    setGetFrameNameCallback: SetGetFrameNameCallback,
    setTexture: SetTexture$1,
    updateTexture: UpdateTexture,
    setStretchMode: SetStretchMode,
    getStretchMode: GetStretchMode,
    setPreserveRatio: SetPreserveRatio,
    setMaxFixedPartScale: SetMaxFixedPartScale
  };

  var IsPlainObject$j = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$1d = Phaser.Utils.Objects.GetValue;

  var NinePatchBase = function NinePatchBase(GOClass, type) {
    var NinePatch = /*#__PURE__*/function (_GOClass) {
      _inherits(NinePatch, _GOClass);

      var _super = _createSuper(NinePatch);

      function NinePatch(scene, x, y, width, height, key, baseFrame, columns, rows, config) {
        var _this;

        _classCallCheck(this, NinePatch);

        if (IsPlainObject$j(x)) {
          config = x;
          x = GetValue$1d(config, 'x', 0);
          y = GetValue$1d(config, 'y', 0);
          width = GetValue$1d(config, 'width', 1);
          height = GetValue$1d(config, 'height', 1);
          key = GetValue$1d(config, 'key', undefined);
          baseFrame = GetValue$1d(config, 'baseFrame', undefined);
          columns = GetValue$1d(config, 'columns', undefined);
          rows = GetValue$1d(config, 'rows', undefined);
        } else if (IsPlainObject$j(width)) {
          config = width;
          width = GetValue$1d(config, 'width', 1);
          height = GetValue$1d(config, 'height', 1);
          key = GetValue$1d(config, 'key', undefined);
          baseFrame = GetValue$1d(config, 'baseFrame', undefined);
          columns = GetValue$1d(config, 'columns', undefined);
          rows = GetValue$1d(config, 'rows', undefined);
        } else if (IsPlainObject$j(key)) {
          config = key;
          key = GetValue$1d(config, 'key', undefined);
          baseFrame = GetValue$1d(config, 'baseFrame', undefined);
          columns = GetValue$1d(config, 'columns', undefined);
          rows = GetValue$1d(config, 'rows', undefined);
        } else if (IsPlainObject$j(baseFrame)) {
          config = baseFrame;
          baseFrame = GetValue$1d(config, 'baseFrame', undefined);
          columns = GetValue$1d(config, 'columns', undefined);
          rows = GetValue$1d(config, 'rows', undefined);
        } else if (Array.isArray(baseFrame)) {
          config = rows;
          rows = columns;
          columns = baseFrame;
          baseFrame = GetValue$1d(config, 'baseFrame', undefined);
        } else if (IsPlainObject$j(columns)) {
          config = columns;
          columns = GetValue$1d(config, 'columns', undefined);
          rows = GetValue$1d(config, 'rows', undefined);
        }

        _this = _super.call(this, scene);
        _this.type = type;

        _this.setPosition(x, y).setSize(width, height).setOrigin(0.5, 0.5);

        _this.columns = {};
        _this.rows = {};
        _this.stretchMode = {};
        _this._tileSprite = undefined; // Reserved for drawing image

        _this._image = undefined; // Reserved for drawing image

        _this.setGetFrameNameCallback(GetValue$1d(config, 'getFrameNameCallback', undefined));

        _this.setStretchMode(GetValue$1d(config, 'stretchMode', 0));

        _this.setPreserveRatio(GetValue$1d(config, 'preserveRatio', true));

        var maxFixedPartScale = GetValue$1d(config, 'maxFixedPartScale', 1);
        var maxFixedPartScaleX = GetValue$1d(config, 'maxFixedPartScaleX', maxFixedPartScale);
        var maxFixedPartScaleY = GetValue$1d(config, 'maxFixedPartScaleY', undefined);

        _this.setMaxFixedPartScale(maxFixedPartScaleX, maxFixedPartScaleY);

        _this.setTexture(key, baseFrame, columns, rows);

        return _this;
      }

      _createClass(NinePatch, [{
        key: "minWidth",
        get: function get() {
          return this.columns.minWidth;
        }
      }, {
        key: "minHeight",
        get: function get() {
          return this.rows.minHeight;
        }
      }, {
        key: "fixedPartScaleX",
        get: function get() {
          return this.columns.scale;
        }
      }, {
        key: "fixedPartScaleY",
        get: function get() {
          return this.rows.scale;
        }
      }, {
        key: "resize",
        value: function resize(width, height) {
          if (this.width === width && this.height === height) {
            return this;
          }

          _get(_getPrototypeOf(NinePatch.prototype), "resize", this).call(this, width, height);

          this.updateTexture();
          return this;
        }
      }]);

      return NinePatch;
    }(GOClass);

    Object.assign(NinePatch.prototype, Methods$6);
    return NinePatch;
  };

  var MakeChildImageGameObject = function MakeChildImageGameObject(parent, key, className) {
    if (className === undefined) {
      className = 'image';
    }

    if (!parent[key]) {
      parent[key] = parent.scene.make[className]({
        add: false,
        origin: {
          x: 0,
          y: 0
        }
      });
      parent.once('destroy', function () {
        if (parent[key]) {
          parent[key].destroy();
          parent[key] = undefined;
        }
      });
    }

    return parent[key];
  };

  var DrawImage$1 = function DrawImage(key, frame, x, y, width, height) {
    var gameObject = MakeChildImageGameObject(this, '_image', 'image').setTexture(key, frame).setDisplaySize(width, height);
    this.draw(gameObject, x, y);
  };

  var DrawTileSprite$1 = function DrawTileSprite(key, frame, x, y, width, height) {
    var gameObject = MakeChildImageGameObject(this, '_tileSprite', 'tileSprite').setTexture(key, frame).setSize(width, height);
    this.draw(gameObject, x, y);
  };

  var Methods$5 = {
    _drawImage: DrawImage$1,
    _drawTileSprite: DrawTileSprite$1
  };

  var RenderTexture = Phaser.GameObjects.RenderTexture;

  var NinePatch$1 = /*#__PURE__*/function (_NinePatchBase) {
    _inherits(NinePatch, _NinePatchBase);

    var _super = _createSuper(NinePatch);

    function NinePatch() {
      _classCallCheck(this, NinePatch);

      return _super.apply(this, arguments);
    }

    return _createClass(NinePatch);
  }(NinePatchBase(RenderTexture, 'rexNinePatch'));

  Object.assign(NinePatch$1.prototype, Methods$5);

  var CreateNinePatch = function CreateNinePatch(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new NinePatch$1(scene, data);
    SetTextureProperties(gameObject, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetCalcMatrix$1 = Phaser.GameObjects.GetCalcMatrix;

  var WebGLRenderer$2 = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    var bobs = src.getRenderList();

    if (bobs.length === 0) {
      return;
    }

    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var texture = src.frame.glTexture;
    var textureUnit = pipeline.setGameObject(src);
    var roundPixels = camera.roundPixels;
    var result = GetCalcMatrix$1(src, camera, parentMatrix);
    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);
    var dx = src._displayOriginX;
    var dy = src._displayOriginY;
    var alpha = camera.alpha * src.alpha;
    renderer.pipelines.preBatch(src);

    for (var i = 0, cnt = bobs.length; i < cnt; i++) {
      bobs[i].webglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels);
    }

    renderer.pipelines.postBatch(src);
  };

  var SetTransform$1 = Phaser.Renderer.Canvas.SetTransform;

  var CanvasRenderer$2 = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    var ctx = renderer.currentContext;
    var bobs = src.getRenderList();

    if (bobs.length === 0 || !SetTransform$1(renderer, ctx, src, camera, parentMatrix)) {
      return;
    }

    camera.addToRenderList(src);
    var roundPixels = camera.roundPixels;
    var dx = -src._displayOriginX,
        dy = -src._displayOriginY;
    ctx.translate(dx, dy);

    for (var i = 0, cnt = bobs.length; i < cnt; i++) {
      bobs[i].canvasRender(ctx, dx, dy, roundPixels);
    } //  Restore the context saved in SetTransform


    ctx.restore();
  };

  var Render$2 = {
    renderWebGL: WebGLRenderer$2,
    renderCanvas: CanvasRenderer$2
  };

  var SetTexture = function SetTexture(key, frame) {
    this.texture = this.scene.sys.textures.get(key);
    this.frame = this.texture.get(frame);
    return this;
  };

  var Resize = function Resize(width, height) {
    if (this.width === width && this.height === height) {
      return this;
    }

    this.width = width;
    this.height = height;
    this.updateDisplayOrigin();
    var input = this.input;

    if (input && !input.customHitArea) {
      input.hitArea.width = width;
      input.hitArea.height = height;
    }

    return this;
  };

  var AddChild$2 = function AddChild(bob) {
    this.lastAppendedChildren.length = 0;

    if (Array.isArray(bob)) {
      var _this$lastAppendedChi;

      this.children.add(bob);

      (_this$lastAppendedChi = this.lastAppendedChildren).push.apply(_this$lastAppendedChi, _toConsumableArray(bob));
    } else {
      this.children.add(bob);
      this.lastAppendedChildren.push(bob);
    }

    return this;
  };

  var RemoveItem$6 = Phaser.Utils.Array.Remove;

  var RemoveChild$2 = function RemoveChild(bob) {
    if (this.poolManager) {
      // Free this bob (bob.onFree())
      this.poolManager.free(bob);
    } // Remove this bob from blitter


    RemoveItem$6(this.children.list, bob);
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
  };

  var RemoveChildren = function RemoveChildren() {
    if (this.poolManager) {
      // Free all bobs (bob.onFree())
      this.poolManager.freeMultiple(this.children.list);
    } // Remove all bobs from blitter


    this.children.list.length = 0;
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
  };

  var GetLastAppendedChildren = function GetLastAppendedChildren() {
    return this.lastAppendedChildren;
  };

  var GetChildren = function GetChildren() {
    return this.children.list;
  };

  var TintMethods = {
    setTint: function setTint(tint) {
      // 0: Solid tint + texture alpha
      this.tint = tint;
      this.tintFill = false;
      return this;
    },
    setTintFill: function setTintFill(tint) {
      // 1: Solid tint, no texture
      this.tint = tint;
      this.tintFill = true;
      return this;
    },
    clearTint: function clearTint() {
      this.setTint(0xffffff);
      return this;
    }
  };

  var methods$c = {
    setTexture: SetTexture,
    resize: Resize,
    setSize: Resize,
    addChild: AddChild$2,
    removeChild: RemoveChild$2,
    removeChildren: RemoveChildren,
    clear: RemoveChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getChildren: GetChildren
  };
  Object.assign(methods$c, TintMethods);

  var GetValue$1c = Phaser.Utils.Objects.GetValue;
  var Pools = {};

  var PoolManager = /*#__PURE__*/function () {
    function PoolManager(config) {
      _classCallCheck(this, PoolManager);

      this.pools = GetValue$1c(config, 'pools', Pools);
    }

    _createClass(PoolManager, [{
      key: "destroy",
      value: function destroy() {
        this.pools = undefined;
      }
    }, {
      key: "free",
      value: function free(bob) {
        if (!this.pools) {
          return this;
        }

        var bobType = bob.type;

        if (!this.pools.hasOwnProperty(bobType)) {
          this.pools[bobType] = new Stack();
        }

        this.pools[bobType].push(bob);
        bob.onFree();
        return this;
      }
    }, {
      key: "freeMultiple",
      value: function freeMultiple(bobs) {
        if (!this.pools) {
          return this;
        }

        for (var i = 0, cnt = bobs.length; i < cnt; i++) {
          this.free(bobs[i]);
        }

        return this;
      }
    }, {
      key: "allocate",
      value: function allocate(bobType) {
        if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
          return null;
        }

        return this.pools[bobType].pop();
      }
    }]);

    return PoolManager;
  }();

  var GameObject$1 = Phaser.GameObjects.GameObject;
  var IsPlainObject$i = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$1b = Phaser.Utils.Objects.GetValue;
  var List = Phaser.Structs.List;
  var StableSort = Phaser.Utils.Array.StableSort;

  var Blitter = /*#__PURE__*/function (_GameObject) {
    _inherits(Blitter, _GameObject);

    var _super = _createSuper(Blitter);

    function Blitter(scene, x, y, texture, frame, config) {
      var _this;

      _classCallCheck(this, Blitter);

      if (IsPlainObject$i(x)) {
        config = x;
        x = GetValue$1b(config, 'x', 0);
        y = GetValue$1b(config, 'y', 0);
        texture = GetValue$1b(config, 'texture');
        frame = GetValue$1b(config, 'frame');
      }

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      _this = _super.call(this, scene, 'rexBlitter');
      _this.children = new List();
      _this.renderList = [];
      _this.displayListDirty = false;
      _this.lastAppendedChildren = [];
      var reuseBob = GetValue$1b(config, 'reuseBob', true);
      _this.poolManager = reuseBob ? new PoolManager(config) : undefined;

      _this.setTexture(texture, frame).setPosition(x, y).setOrigin(0, 0).clearTint().initPipeline();

      return _this;
    }

    _createClass(Blitter, [{
      key: "preDestroy",
      value: function preDestroy() {
        this.removeChildren();
        this.children.destroy();
        this.renderList.length = 0;

        if (this.poolManager) {
          this.poolManager.destroy();
        }
      }
    }, {
      key: "getRenderList",
      value: function getRenderList() {
        if (this.displayListDirty) {
          this.renderList.length = 0;
          var needDepthSort = false;
          var children = this.children.list;

          for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            if (ChildCanRender(child)) {
              this.renderList.push(child);

              if (!needDepthSort) {
                needDepthSort = child.depth !== 0;
              }
            }
          }

          if (needDepthSort) {
            StableSort(this.renderList, SortByDepth);
          }

          this.displayListDirty = false;
        }

        return this.renderList;
      }
    }]);

    return Blitter;
  }(GameObject$1);

  var ChildCanRender = function ChildCanRender(child) {
    return child.active && child.visible && child.alpha > 0;
  };

  var SortByDepth = function SortByDepth(childA, childB) {
    return childA._depth - childB._depth;
  };

  var Components$2 = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Blitter, [Components$2.Alpha, Components$2.BlendMode, Components$2.ComputedSize, Components$2.Depth, Components$2.GetBounds, Components$2.Mask, Components$2.Origin, Components$2.Pipeline, Components$2.ScrollFactor, Components$2.Transform, Components$2.Visible, Render$2, methods$c]);

  var ImageTypeName = 'image';

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
  var GetValue$1a = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue; //  Use for loop here so we can break early

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

  var DataMethods = {
    enableData: function enableData() {
      if (this.data === undefined) {
        this.data = {};
      }

      return this;
    },
    getData: function getData(key, defaultValue) {
      this.enableData();
      return key === undefined ? this.data : GetValue$1a(this.data, key, defaultValue);
    },
    setData: function setData(key, value) {
      this.enableData();

      if (arguments.length === 1) {
        var data = key;

        for (key in data) {
          this.data[key] = data[key];
        }
      } else {
        this.data[key] = value;
      }

      return this;
    },
    incData: function incData(key, inc, defaultValue) {
      if (defaultValue === undefined) {
        defaultValue = 0;
      }

      this.enableData();
      this.setData(key, this.getData(key, defaultValue) + inc);
      return this;
    },
    mulData: function mulData(key, mul, defaultValue) {
      if (defaultValue === undefined) {
        defaultValue = 0;
      }

      this.enableData();
      this.setData(key, this.getData(key, defaultValue) * mul);
      return this;
    },
    clearData: function clearData() {
      if (this.data) {
        Clear(this.data);
      }

      return this;
    }
  };

  var Base$2 = /*#__PURE__*/function () {
    function Base(parent, type) {
      _classCallCheck(this, Base);

      this.type = type;
      this.data = undefined;
      this.setParent(parent).reset().setActive();
    }

    _createClass(Base, [{
      key: "destroy",
      value: function destroy() {
        if (this.parent) {
          this.parent.removeChild(this); // Remove this bob from blitter, and free it (bob.onFree())
          // Will set this.parent to undefined
        }
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent;
        return this;
      } // get scene() {
      //     if (this.parent) {
      //         return this.parent.scene;
      //     } else {
      //         return null;
      //     }
      // }

    }, {
      key: "setDisplayListDirty",
      value: function setDisplayListDirty(displayListDirty) {
        if (displayListDirty && this.parent) {
          this.parent.displayListDirty = true;
        }

        return this;
      }
    }, {
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        this.setDisplayListDirty(this._active != value);
        this._active = value;
      }
    }, {
      key: "setActive",
      value: function setActive(active) {
        if (active === undefined) {
          active = true;
        }

        this.active = active;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        return this;
      } // Override

    }, {
      key: "reset",
      value: function reset() {
        this.clearData();
      } // Override

    }, {
      key: "onFree",
      value: function onFree() {
        this.reset().setActive(false).setParent();
      }
    }]);

    return Base;
  }();

  Object.assign(Base$2.prototype, DataMethods);

  var DegToRad$4 = Phaser.Math.DegToRad;
  var RadToDeg$4 = Phaser.Math.RadToDeg;
  var GetValue$19 = Phaser.Utils.Objects.GetValue;

  var RenderBase = /*#__PURE__*/function (_Base) {
    _inherits(RenderBase, _Base);

    var _super = _createSuper(RenderBase);

    function RenderBase() {
      _classCallCheck(this, RenderBase);

      return _super.apply(this, arguments);
    }

    _createClass(RenderBase, [{
      key: "visible",
      get: function get() {
        return this._visible;
      },
      set: function set(value) {
        this.setDisplayListDirty(this._visible != value);
        this._visible = value;
      }
    }, {
      key: "setVisible",
      value: function setVisible(visible) {
        if (visible === undefined) {
          visible = true;
        }

        this.visible = visible;
        return this;
      }
    }, {
      key: "alpha",
      get: function get() {
        return this._alpha;
      },
      set: function set(value) {
        this.setDisplayListDirty(!!this._alpha !== !!value);
        this._alpha = value;
      }
    }, {
      key: "setAlpha",
      value: function setAlpha(alpha) {
        this.alpha = alpha;
        return this;
      }
    }, {
      key: "setX",
      value: function setX(x) {
        this.x = x;
        return this;
      }
    }, {
      key: "setY",
      value: function setY(y) {
        this.y = y;
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "setRotation",
      value: function setRotation(rotation) {
        this.rotation = rotation;
        return this;
      }
    }, {
      key: "angle",
      get: function get() {
        return RadToDeg$4(this.rotation);
      },
      set: function set(value) {
        this.rotation = DegToRad$4(value);
      }
    }, {
      key: "setAngle",
      value: function setAngle(angle) {
        this.angle = angle;
        return this;
      }
    }, {
      key: "setScaleX",
      value: function setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this._width = value;
      }
    }, {
      key: "setWidth",
      value: function setWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }

        this.width = width;

        if (keepAspectRatio) {
          this.scaleY = this.scaleX;
        }

        return this;
      }
    }, {
      key: "setScaleY",
      value: function setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
      }
    }, {
      key: "setScale",
      value: function setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
          scaleY = scaleX;
        }

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this._height = value;
      }
    }, {
      key: "setHeight",
      value: function setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }

        this.height = height;

        if (keepAspectRatio) {
          this.scaleX = this.scaleY;
        }

        return this;
      }
    }, {
      key: "displayWidth",
      get: function get() {
        return this._width * this.scaleX;
      },
      set: function set(value) {
        this.scaleX = value / this._width;
      }
    }, {
      key: "setDisplayWidth",
      value: function setDisplayWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }

        this.displayWidth = width;

        if (keepAspectRatio) {
          this.scaleY = this.scaleX;
        }

        return this;
      }
    }, {
      key: "displayHeight",
      get: function get() {
        return this._height * this.scaleY;
      },
      set: function set(value) {
        this.scaleY = value / this._height;
      }
    }, {
      key: "setDisplayHeight",
      value: function setDisplayHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }

        this.displayHeight = height;

        if (keepAspectRatio) {
          this.scaleX = this.scaleY;
        }

        return this;
      }
    }, {
      key: "setOriginX",
      value: function setOriginX(originX) {
        this.originX = originX;
        this._displayOriginX = this.width * originX;
        return this;
      }
    }, {
      key: "setOriginY",
      value: function setOriginY(originY) {
        this.originY = originY;
        this._displayOriginY = this.height * originY;
        return this;
      }
    }, {
      key: "setOrigin",
      value: function setOrigin(originX, originY) {
        if (originY === undefined) {
          originY = originX;
        }

        this.setOriginX(originX).setOriginY(originY);
        return this;
      }
    }, {
      key: "depth",
      get: function get() {
        return this._depth;
      },
      set: function set(value) {
        this.setDisplayListDirty(this._depth != value);
        this._depth = value;
      }
    }, {
      key: "setDepth",
      value: function setDepth(depth) {
        if (depth === undefined) {
          depth = 0;
        }

        this.depth = depth;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        }

        if (o.hasOwnProperty('x')) {
          this.setX(o.x);
        }

        if (o.hasOwnProperty('y')) {
          this.setY(o.y);
        }

        if (o.hasOwnProperty('rotation')) {
          this.setRotation(o.rotation);
        } else if (o.hasOwnProperty('angle')) {
          this.setAngle(o.angle);
        }

        if (o.hasOwnProperty('alpha')) {
          this.setAlpha(o.alpha);
        } // ScaleX, ScaleY


        var width = GetValue$19(o, 'width', undefined);
        var height = GetValue$19(o, 'height', undefined);
        var scale = GetValue$19(o, 'scale', undefined);
        var scaleX = GetValue$19(o, 'scaleX', scale);
        var scaleY = GetValue$19(o, 'scaleY', scale);

        if (width !== undefined) {
          if (height === undefined && scaleY === undefined) {
            this.setWidth(width, true);
          } else {
            this.setWidth(width);
          }
        } else if (scaleX !== undefined) {
          this.setScaleX(scaleX);
        } else if (o.hasOwnProperty('displayWidth')) {
          this.setDisplayWidth(o.displayWidth);
        }

        if (height !== undefined) {
          if (width === undefined && scaleX === undefined) {
            this.setHeight(height, true);
          } else {
            this.setHeight(height);
          }
        } else if (scaleY !== undefined) {
          this.setScaleY(scaleY);
        } else if (o.hasOwnProperty('displayHeight')) {
          this.setDisplayHeight(o.displayHeight);
        }

        var origin = GetValue$19(o, 'origin', undefined);

        if (origin !== undefined) {
          this.setOrigin(origin);
        } else {
          if (o.hasOwnProperty('originX')) {
            this.setOriginX(o.originX);
          }

          if (o.hasOwnProperty('originY')) {
            this.setOriginY(o.originY);
          }
        }

        if (o.hasOwnProperty('depth')) {
          this.setDepth(o.depth);
        }

        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        _get(_getPrototypeOf(RenderBase.prototype), "reset", this).call(this);

        this.setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setOrigin(0).setDepth(0);
        return this;
      } // Override

    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {} // Override

    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy, roundPixels) {}
    }]);

    return RenderBase;
  }(Base$2);

  var TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
  var GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;
  var FrameMatrix = new TransformMatrix();

  var WebglRender = function WebglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {
    var width = this._width,
        height = this._height;
    var displayOriginX = width * this.originX,
        displayOriginY = height * this.originY;
    var x = this.x - dx,
        y = this.y - dy;
    var flipX = 1;
    var flipY = 1;

    if (this.flipX) {
      x += width - displayOriginX * 2;
      flipX = -1;
    }

    if (this.flipY) {
      y += height - displayOriginY * 2;
      flipY = -1;
    }

    FrameMatrix.applyITRS(x, y, this.rotation, this.scaleX * flipX, this.scaleY * flipY);
    calcMatrix.multiply(FrameMatrix, FrameMatrix);
    var tx = -displayOriginX;
    var ty = -displayOriginY;
    var tw = tx + width;
    var th = ty + height;
    var tx0 = FrameMatrix.getXRound(tx, ty, roundPixels);
    var tx1 = FrameMatrix.getXRound(tx, th, roundPixels);
    var tx2 = FrameMatrix.getXRound(tw, th, roundPixels);
    var tx3 = FrameMatrix.getXRound(tw, ty, roundPixels);
    var ty0 = FrameMatrix.getYRound(tx, ty, roundPixels);
    var ty1 = FrameMatrix.getYRound(tx, th, roundPixels);
    var ty2 = FrameMatrix.getYRound(tw, th, roundPixels);
    var ty3 = FrameMatrix.getYRound(tw, ty, roundPixels);
    var u0 = this.frame.u0;
    var v0 = this.frame.v0;
    var u1 = this.frame.u1;
    var v1 = this.frame.v1;
    var tint = GetTint(this.tint, this.alpha * alpha);
    pipeline.batchQuad(this.parent, tx0, ty0, tx1, ty1, tx2, ty2, tx3, ty3, u0, v0, u1, v1, tint, tint, tint, tint, this.tintFill, texture, textureUnit);
  };

  var CanvasRender = function CanvasRender(ctx, dx, dy, roundPixels) {
    ctx.save();
    var width = this._width,
        height = this._height;
    var displayOriginX = width * this.originX,
        displayOriginY = height * this.originY;
    var x = this.x - displayOriginX,
        y = this.y - displayOriginY;
    var flipX = 1;
    var flipY = 1;

    if (this.flipX) {
      x += width;
      flipX = -1;
    }

    if (this.flipY) {
      y += height;
      flipY = -1;
    }

    if (roundPixels) {
      x = Math.round(x);
      y = Math.round(y);
    }

    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scaleX * flipX, this.scaleY * flipY);
    var frame = this.frame;
    ctx.drawImage(frame.source.image, frame.cutX, frame.cutY, width, height, 0, 0, width, height);
    ctx.restore();
  };

  var IsPlainObject$h = Phaser.Utils.Objects.IsPlainObject;

  var ImageData = /*#__PURE__*/function (_RenderBase) {
    _inherits(ImageData, _RenderBase);

    var _super = _createSuper(ImageData);

    function ImageData(parent, frame) {
      var _this;

      _classCallCheck(this, ImageData);

      _this = _super.call(this, parent, ImageTypeName);

      _this.setFrame(frame);

      return _this;
    }

    _createClass(ImageData, [{
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {}
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {}
    }, {
      key: "setFrame",
      value: function setFrame(frame) {
        if (arguments.length > 0 && !IsPlainObject$h(frame)) {
          frame = this.parent.texture.get(frame);
        }

        this.frame = frame;
        this._width = frame ? frame.width : 0;
        this._height = frame ? frame.height : 0;
        return this;
      }
    }, {
      key: "setFlipX",
      value: function setFlipX(flipX) {
        if (flipX === undefined) {
          flipX = true;
        }

        this.flipX = flipX;
        return this;
      }
    }, {
      key: "setFlipY",
      value: function setFlipY(flipY) {
        if (flipY === undefined) {
          flipY = true;
        }

        this.flipY = flipY;
        return this;
      }
    }, {
      key: "resetFlip",
      value: function resetFlip() {
        this.flipX = false;
        this.flipY = false;
        return this;
      }
    }, {
      key: "tint",
      get: function get() {
        if (this._tint === undefined) {
          return this.parent.tint;
        } else {
          return this._tint;
        }
      },
      set: function set(value) {
        this._tint = value;
      }
    }, {
      key: "setTint",
      value: function setTint(value) {
        this.tint = value;
        this.tintFill = false;
        return this;
      }
    }, {
      key: "setTintFill",
      value: function setTintFill(value) {
        this.tint = value;
        this.tintFill = true;
        return this;
      }
    }, {
      key: "clearTint",
      value: function clearTint() {
        this.setTint(0xffffff);
        return this;
      }
    }, {
      key: "resetTint",
      value: function resetTint() {
        this.tint = undefined;
        this.tintFill = undefined;
        return this;
      }
    }, {
      key: "tintFill",
      get: function get() {
        if (this._tintFill === undefined) {
          return this.parent.tintFill;
        } else {
          return this._tintFill;
        }
      },
      set: function set(value) {
        this._tintFill = value;
      }
    }, {
      key: "reset",
      value: function reset() {
        _get(_getPrototypeOf(ImageData.prototype), "reset", this).call(this);

        this.resetFlip().resetTint().setFrame();
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        } // Size of Image is equal to frame size,
        // Move width, height properties to displayWidth,displayHeight


        if (o.hasOwnProperty('width')) {
          o.displayWidth = o.width;
          delete o.width;
        }

        if (o.hasOwnProperty('height')) {
          o.displayHeight = o.height;
          delete o.height;
        }

        if (o.hasOwnProperty('frame')) {
          this.setFrame(o.frame);
        }

        _get(_getPrototypeOf(ImageData.prototype), "modifyPorperties", this).call(this, o);

        if (o.hasOwnProperty('flipX')) {
          this.setFlipX(o.flipX);
        }

        if (o.hasOwnProperty('flipY')) {
          this.setFlipY(o.flipY);
        }

        if (o.hasOwnProperty('tint')) {
          this.setTint(o.tint);
        }

        if (o.hasOwnProperty('tintFill')) {
          this.setTintFill(o.tintFill);
        }

        return this;
      }
    }]);

    return ImageData;
  }(RenderBase);

  var methods$b = {
    webglRender: WebglRender,
    canvasRender: CanvasRender
  };
  Object.assign(ImageData.prototype, methods$b);

  var AddImage = function AddImage(blitter, config) {
    if (typeof config === 'string') {
      config = {
        frame: config
      };
    }

    var bob = blitter.poolManager ? blitter.poolManager.allocate(ImageTypeName) : null;

    if (bob === null) {
      bob = new ImageData(blitter);
    } else {
      bob.setParent(blitter).setActive();
    }

    bob.modifyPorperties(config);
    blitter.addChild(bob);
    return bob;
  };

  var DrawImage = function DrawImage(key, frame, x, y, width, height) {
    AddImage(this, {
      frame: frame,
      x: x,
      y: y,
      width: width,
      height: height
    });
  };

  var DrawTileSprite = function DrawTileSprite(key, frame, x, y, width, height) {
    var frameObj = this.texture.get(frame);
    var frameWidth = frameObj.width,
        frameHeight = frameObj.height;
    var colCount = Math.floor(width / frameWidth),
        rowCount = Math.floor(height / frameHeight); // Align images at center

    x += (width - colCount * frameWidth) / 2;
    y += (height - rowCount * frameHeight) / 2;

    for (var colIndex = 0; colIndex < colCount; colIndex++) {
      for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        AddImage(this, {
          frame: frame,
          x: x + colIndex * frameWidth,
          y: y + rowIndex * frameHeight
        });
      }
    }
  };

  var Methods$4 = {
    _drawImage: DrawImage,
    _drawTileSprite: DrawTileSprite
  };

  var NinePatch = /*#__PURE__*/function (_NinePatchBase) {
    _inherits(NinePatch, _NinePatchBase);

    var _super = _createSuper(NinePatch);

    function NinePatch() {
      _classCallCheck(this, NinePatch);

      return _super.apply(this, arguments);
    }

    _createClass(NinePatch, [{
      key: "setTexture",
      value: function setTexture(key, baseFrameName, columns, rows) {
        SetTexture.call(this, key, '__BASE'); // Not initialized yet

        if (!this.columns) {
          return this;
        }

        _get(_getPrototypeOf(NinePatch.prototype), "setTexture", this).call(this, key, baseFrameName, columns, rows);

        return this;
      }
    }]);

    return NinePatch;
  }(NinePatchBase(Blitter, 'rexNinePatch2'));

  Object.assign(NinePatch.prototype, Methods$4);

  var CreateNinePatch2 = function CreateNinePatch2(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new NinePatch(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  // copy from Phaser.GameObjects.Text
  var Utils = Phaser.Renderer.WebGL.Utils;

  var WebGLRenderer$1 = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateTexture();
      src.dirty = false;
    }

    if (src.width === 0 || src.height === 0) {
      return;
    }

    camera.addToRenderList(src);
    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils.getTintAppendFloatAlpha;
    var pipeline = renderer.pipelines.set(src.pipeline, src);
    var textureUnit = pipeline.setTexture2D(frame.glTexture, src);
    renderer.pipelines.preBatch(src);
    pipeline.batchTexture(src, frame.glTexture, width, height, src.x, src.y, width / src.resolution, height / src.resolution, src.scaleX, src.scaleY, src.rotation, src.flipX, src.flipY, src.scrollFactorX, src.scrollFactorY, src.displayOriginX, src.displayOriginY, 0, 0, width, height, getTint(src.tintTopLeft, camera.alpha * src._alphaTL), getTint(src.tintTopRight, camera.alpha * src._alphaTR), getTint(src.tintBottomLeft, camera.alpha * src._alphaBL), getTint(src.tintBottomRight, camera.alpha * src._alphaBR), src.tintFill, 0, 0, camera, parentMatrix, false, textureUnit);
    renderer.pipelines.postBatch(src);
  };

  // copy from Phaser.GameObjects.Text
  var CanvasRenderer$1 = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateTexture();
      src.dirty = false;
    }

    if (src.width === 0 || src.height === 0) {
      return;
    }

    camera.addToRenderList(src);
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
  };

  var Render$1 = {
    renderWebGL: WebGLRenderer$1,
    renderCanvas: CanvasRenderer$1
  };

  var Color = Phaser.Display.Color;
  var CanvasMethods = {
    clear: function clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    },
    fill: function fill(color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    },
    loadFromURL: function loadFromURL(url, callback) {
      var self = this;
      var img = new Image();

      img.onload = function () {
        if (self.width !== img.width || self.height !== img.height) {
          self.resize(img.width, img.height);
        } else {
          self.clear();
        }

        self.context.drawImage(img, 0, 0);
        self.updateTexture();

        if (callback) {
          callback();
        }

        img.onload = null;
        img.src = '';
        img.remove();
      };

      img.src = url;
      return this;
    },
    loadFromURLPromise: function loadFromURLPromise(url) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.loadFromURL(url, resolve);
      });
    },
    getDataURL: function getDataURL(type, encoderOptions) {
      return this.canvas.toDataURL(type, encoderOptions);
    },
    getPixel: function getPixel(x, y, out) {
      if (out === undefined) {
        out = new Color();
      }

      var rgb = this.context.getImageData(x, y, 1, 1);
      out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3]);
      return out;
    },
    setPixel: function setPixel(x, y, r, g, b, a) {
      if (typeof r !== 'number') {
        var color = r;
        r = color.red;
        g = color.green;
        b = color.blue;
        a = color.alpha;
      }

      if (a === undefined) {
        a = r !== 0 || g !== 0 || b !== 0 ? 255 : 0;
      }

      var imgData = this.context.createImageData(1, 1);
      imgData.data[0] = r;
      imgData.data[1] = g;
      imgData.data[2] = b;
      imgData.data[3] = a;
      this.context.putImageData(imgData, x, y);
      this.dirty = true;
      return this;
    }
  };

  var TextureMethods = {
    updateTexture: function updateTexture(callback, scope) {
      if (callback) {
        if (scope) {
          callback.call(scope, this.canvas, this.context);
        } else {
          callback(this.canvas, this.context);
        }
      }

      if (this.canvas.width !== this.frame.width || this.canvas.height !== this.frame.height) {
        this.frame.setSize(this.canvas.width, this.canvas.height);
      }

      if (this.renderer.gl) {
        this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
        this.frame.glTexture = this.frame.source.glTexture;
      }

      this.dirty = false;
      var input = this.input;

      if (input && !input.customHitArea) {
        input.hitArea.width = this.width;
        input.hitArea.height = this.height;
      }

      return this;
    },
    generateTexture: function generateTexture(key, x, y, width, height) {
      var srcCanvas = this.canvas;

      if (width === undefined) {
        width = srcCanvas.width;
      } else {
        width *= this.resolution;
      }

      if (height === undefined) {
        height = srcCanvas.height;
      } else {
        height *= this.resolution;
      }

      CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);
      return this;
    },
    loadTexture: function loadTexture(key, frame) {
      var textureFrame = this.scene.sys.textures.getFrame(key, frame);

      if (!textureFrame) {
        return this;
      }

      if (this.width !== textureFrame.cutWidth || this.height !== textureFrame.cutHeight) {
        this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
      } else {
        this.clear();
      }

      this.context.drawImage(textureFrame.source.image, textureFrame.cutX, textureFrame.cutY, textureFrame.cutWidth, textureFrame.cutHeight, 0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    }
  };

  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var GameObject = Phaser.GameObjects.GameObject;

  var Canvas = /*#__PURE__*/function (_GameObject) {
    _inherits(Canvas, _GameObject);

    var _super = _createSuper(Canvas);

    function Canvas(scene, x, y, width, height) {
      var _this;

      _classCallCheck(this, Canvas);

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      if (width === undefined) {
        width = 1;
      }

      if (height === undefined) {
        height = 1;
      }

      _this = _super.call(this, scene, 'rexCanvas');
      _this.renderer = scene.sys.game.renderer;
      _this.resolution = 1;
      _this._width = width;
      _this._height = height;
      width = Math.max(Math.ceil(width * _this.resolution), 1);
      height = Math.max(Math.ceil(height * _this.resolution), 1);
      _this.canvas = CanvasPool.create(_assertThisInitialized(_this), width, height);
      _this.context = _this.canvas.getContext('2d');
      _this.dirty = false;

      _this.setPosition(x, y);

      _this.setOrigin(0.5, 0.5);

      _this.initPipeline();

      _this._crop = _this.resetCropObject(); //  Create a Texture for this Text object

      _this.texture = scene.sys.textures.addCanvas(null, _this.canvas, true); //  Get the frame

      _this.frame = _this.texture.get(); //  Set the resolution

      _this.frame.source.resolution = _this.resolution;

      if (_this.renderer && _this.renderer.gl) {
        //  Clear the default 1x1 glTexture, as we override it later
        _this.renderer.deleteTexture(_this.frame.source.glTexture);

        _this.frame.source.glTexture = null;
      }

      _this.dirty = true;
      scene.sys.game.events.on('contextrestored', _this.onContextRestored, _assertThisInitialized(_this));
      return _this;
    }

    _createClass(Canvas, [{
      key: "onContextRestored",
      value: function onContextRestored() {
        this.dirty = true;
      }
    }, {
      key: "preDestroy",
      value: function preDestroy() {
        this.scene.sys.game.events.off('contextrestored', this.onContextRestored, this);
        CanvasPool.remove(this.canvas);
        this.texture.destroy();
        this.canvas = null;
        this.context = null;
      }
    }, {
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
      key: "setSize",
      value: function setSize(width, height) {
        if (this._width === width && this._height === height) {
          return this;
        }

        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
        width = Math.max(Math.ceil(width * this.resolution), 1);
        height = Math.max(Math.ceil(height * this.resolution), 1);
        this.canvas.width = width;
        this.canvas.height = height;
        this.frame.setSize(width, height);
        this.dirty = true;
        return this;
      }
    }, {
      key: "displayWidth",
      get: function get() {
        return this.scaleX * this._width;
      },
      set: function set(value) {
        this.scaleX = value / this._width;
      }
    }, {
      key: "displayHeight",
      get: function get() {
        return this.scaleY * this._height;
      },
      set: function set(value) {
        this.scaleY = value / this._height;
      }
    }, {
      key: "setDisplaySize",
      value: function setDisplaySize(width, height) {
        this.displayWidth = width;
        this.displayHeight = height;
        return this;
      }
    }, {
      key: "getCanvas",
      value: function getCanvas(readOnly) {
        if (!readOnly) {
          this.dirty = true;
        }

        return this.canvas;
      }
    }, {
      key: "getContext",
      value: function getContext(readOnly) {
        if (!readOnly) {
          this.dirty = true;
        }

        return this.context;
      }
    }, {
      key: "needRedraw",
      value: function needRedraw() {
        this.dirty = true;
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }]);

    return Canvas;
  }(GameObject);

  var Components$1 = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Canvas, [Components$1.Alpha, Components$1.BlendMode, Components$1.Crop, Components$1.Depth, Components$1.Flip, Components$1.GetBounds, Components$1.Mask, Components$1.Origin, Components$1.Pipeline, Components$1.ScrollFactor, Components$1.Tint, Components$1.Transform, Components$1.Visible, Render$1, CanvasMethods, TextureMethods]);

  var CreateCanvas = function CreateCanvas(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var width = data.width || 1;
    var height = data.height || 1;
    var gameObject = new Canvas(scene, 0, 0, width, height);

    if (data.fill !== undefined) {
      gameObject.fill(data.fill);
    }

    SetTextureProperties(gameObject, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetValue$18 = Phaser.Utils.Objects.GetValue;

  var CircleMaskImage = /*#__PURE__*/function (_Canvas) {
    _inherits(CircleMaskImage, _Canvas);

    var _super = _createSuper(CircleMaskImage);

    function CircleMaskImage(scene, x, y, key, frame, config) {
      var _this;

      _classCallCheck(this, CircleMaskImage);

      _this = _super.call(this, scene, x, y);
      _this.type = 'rexCircleMaskImage';

      _this.setTexture(key, frame, config);

      return _this;
    }

    _createClass(CircleMaskImage, [{
      key: "setTexture",
      value: function setTexture(key, frame, config) {
        if (_typeof(frame) === 'object') {
          config = frame;
          frame = undefined;
        }

        var maskType, backgroundColor;

        if (typeof config === 'string') {
          maskType = config;
          backgroundColor = undefined;
        } else {
          maskType = GetValue$18(config, 'maskType', 0);
          backgroundColor = GetValue$18(config, 'backgroundColor', undefined);
        }

        if (maskType === undefined) {
          maskType = 0;
        } else if (typeof maskType === 'string') {
          maskType = MASKTYPE[maskType];
        }

        this._textureKey = key;
        this._frameName = frame;

        if (maskType === null) {
          this.loadTexture(key, frame);
          this.dirty = true;
          return this;
        }

        var hasBackgroundColor = backgroundColor != null;

        if (!hasBackgroundColor) {
          // No background color -- draw image first
          this.loadTexture(key, frame);
        } // Draw mask


        var canvas = this.canvas,
            ctx = this.context;
        var width = canvas.width,
            height = canvas.height;
        ctx.save();
        ctx.globalCompositeOperation = hasBackgroundColor ? 'source-over' : 'destination-in';
        ctx.beginPath(); // Draw circle, ellipse, or roundRectangle

        switch (maskType) {
          case 2:
            var radiusConfig = GetValue$18(config, 'radius', 0);
            var iteration = GetValue$18(config, 'iteration', undefined);
            AddRoundRectanglePath(ctx, 0, 0, width, height, radiusConfig, iteration);
            break;

          default:
            // circle, ellipse
            var centerX = Math.floor(width / 2);
            var centerY = Math.floor(height / 2);

            if (maskType === 0) {
              ctx.arc(centerX, centerY, Math.min(centerX, centerY), 0, 2 * Math.PI);
            } else {
              ctx.ellipse(centerX, centerY, centerX, centerY, 0, 0, 2 * Math.PI);
            }

            break;
        }

        if (hasBackgroundColor) {
          ctx.fillStyle = backgroundColor;
        }

        ctx.fill();
        ctx.restore();

        if (hasBackgroundColor) {
          // Has background color -- draw image last
          ctx.save();
          ctx.globalCompositeOperation = 'destination-atop';
          this.loadTexture(key, frame);
          ctx.restore();
        }

        this.dirty = true;
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        // Don't draw content again.
        this.setDisplaySize(width, height);
        return this;
      }
    }]);

    return CircleMaskImage;
  }(Canvas);

  var MASKTYPE = {
    circle: 0,
    ellipse: 1,
    roundRectangle: 2
  };

  var CreateCircleMaskImage = function CreateCircleMaskImage(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new CircleMaskImage(scene, 0, 0, data.key, data.frame, data);

    if (data.width !== undefined) {
      gameObject.setDisplayWidth(data.width);
    }

    if (data.height !== undefined) {
      gameObject.setDisplayHeight(data.height);
    }

    SetTextureProperties(gameObject, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var Zone$1 = Phaser.GameObjects.Zone;

  var Space = /*#__PURE__*/function (_Zone) {
    _inherits(Space, _Zone);

    var _super = _createSuper(Space);

    function Space(scene) {
      var _this;

      _classCallCheck(this, Space);

      _this = _super.call(this, scene, 0, 0, 1, 1); // Don't add Zone into scene

      _this.isRexSpace = true;
      return _this;
    }

    return _createClass(Space);
  }(Zone$1);

  var CreateSpace = function CreateSpace(scene, data, view, styles, customBuilders) {
    var gameObject = new Space(scene); // Don't add Zone into scene
    // this.scene.add.existing(gameObject);

    return gameObject;
  };

  var CreateChild = function CreateChild(scene, data, subKey, view, styles, customBuilders) {
    var childData = data[subKey];

    if (!childData) {
      return undefined;
    }

    var child;
    child = Make(scene, childData, view, styles, customBuilders);
    data[subKey] = child;
    return child;
  };

  var ReplaceChildrenConfig = function ReplaceChildrenConfig(scene, childrenConfig, view, styles, customBuilders) {
    if (childrenConfig) {
      if (!Array.isArray(childrenConfig)) {
        childrenConfig = [childrenConfig];
      }

      for (var i = 0, cnt = childrenConfig.length; i < cnt; i++) {
        var childConfig = childrenConfig[i];

        if (!childConfig.$child) {
          childConfig = {
            $child: childConfig
          };
          childrenConfig[i] = childConfig;
        }

        CreateChild(scene, childConfig, '$child', view, styles, customBuilders);
      }
    }

    return childrenConfig;
  };

  var CreateAnySizer = function CreateAnySizer(scene, data, view, styles, customBuilders, SizerClass) {
    data = MergeStyle(data, styles);
    var backgroundConfig = ReplaceChildrenConfig(scene, data.background, view, styles, customBuilders);
    var childrenConfig = ReplaceChildrenConfig(scene, data.children, view, styles, customBuilders);
    var gameObject = new SizerClass(scene, data);
    scene.add.existing(gameObject);

    if (backgroundConfig) {
      for (var i = 0, cnt = backgroundConfig.length; i < cnt; i++) {
        var childConfig = backgroundConfig[i];
        gameObject.addBackground(childConfig.$child, childConfig.padding);
      }
    }

    if (childrenConfig) {
      for (var i = 0, cnt = childrenConfig.length; i < cnt; i++) {
        var childConfig = childrenConfig[i];
        gameObject.add(childConfig.$child, childConfig);
      }
    }

    return gameObject;
  };

  var Zone = Phaser.GameObjects.Zone;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem$5 = Phaser.Utils.Array.Remove;

  var Base$1 = /*#__PURE__*/function (_Zone) {
    _inherits(Base, _Zone);

    var _super = _createSuper(Base);

    function Base(scene, x, y, width, height) {
      var _this;

      _classCallCheck(this, Base);

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      if (width === undefined) {
        width = 1;
      }

      if (height === undefined) {
        height = 1;
      }

      _this = _super.call(this, scene, x, y, width, height);
      _this.children = [];
      return _this;
    }

    _createClass(Base, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        if (fromScene) {
          // Stop scene
          var child;

          for (var i = this.children.length - 1; i >= 0; i--) {
            child = this.children[i];

            if (!child.parentContainer && // Not in container
            !child.displayList // Not in scene, neither in layer
            ) {
              // Destroy child which is not in scene, container, or layer manually
              child.destroy(fromScene);
            }
          }
        } // Destroy/remove children


        this.clear(!fromScene);

        _get(_getPrototypeOf(Base.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "contains",
      value: function contains(gameObject) {
        return this.children.indexOf(gameObject) !== -1;
      }
    }, {
      key: "add",
      value: function add(gameObjects) {
        var parent = this;
        AddItem(this.children, gameObjects, 0, // Callback of item added
        function (gameObject) {
          gameObject.once('destroy', parent.onChildDestroy, parent);
        }, this);
        return this;
      }
    }, {
      key: "remove",
      value: function remove(gameObjects, destroyChild) {
        var parent = this;
        RemoveItem$5(this.children, gameObjects, // Callback of item removed
        function (gameObject) {
          gameObject.off('destroy', parent.onChildDestroy, parent);

          if (destroyChild) {
            gameObject.destroy();
          }
        });
        return this;
      }
    }, {
      key: "onChildDestroy",
      value: function onChildDestroy(child, fromScene) {
        // Only remove reference
        this.remove(child, false);
      }
    }, {
      key: "clear",
      value: function clear(destroyChild) {
        var parent = this;
        var gameObject;

        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          gameObject = this.children[i];
          gameObject.off('destroy', parent.onChildDestroy, parent);

          if (destroyChild) {
            gameObject.destroy();
          }
        }

        this.children.length = 0;
        return this;
      }
    }]);

    return Base;
  }(Zone);

  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Base$1, [Components.Alpha, Components.Flip]);

  var GetParent = function GetParent(gameObject, name) {
    var parent;

    if (name === undefined) {
      if (gameObject.hasOwnProperty('rexContainer')) {
        parent = gameObject.rexContainer.parent;
      }
    } else {
      parent = GetParent(gameObject);

      while (parent) {
        if (parent.name === name) {
          break;
        }

        parent = GetParent(parent);
      }
    }

    return parent;
  };

  var GetTopmostParent = function GetTopmostParent(gameObject) {
    var parent = GetParent(gameObject);

    while (parent) {
      gameObject = parent;
      parent = GetParent(parent);
    }

    return gameObject;
  };

  var DegToRad$3 = Phaser.Math.DegToRad;
  var RadToDeg$3 = Phaser.Math.RadToDeg;

  var GetLocalState = function GetLocalState(gameObject) {
    if (!gameObject.hasOwnProperty('rexContainer')) {
      var rexContainer = {
        parent: null,
        self: null,
        x: 0,
        y: 0,
        syncPosition: true,
        rotation: 0,
        syncRotation: true,
        scaleX: 0,
        scaleY: 0,
        syncScale: true,
        alpha: 0,
        syncAlpha: true,
        visible: true,
        active: true
      };
      Object.defineProperty(rexContainer, 'angle', {
        get: function get() {
          return RadToDeg$3(this.rotation);
        },
        set: function set(value) {
          this.rotation = DegToRad$3(value);
        }
      });
      Object.defineProperty(rexContainer, 'displayWidth', {
        get: function get() {
          return gameObject.width * this.scaleX;
        },
        set: function set(width) {
          this.scaleX = width / gameObject.width;
        }
      });
      Object.defineProperty(rexContainer, 'displayHeight', {
        get: function get() {
          return gameObject.height * this.scaleY;
        },
        set: function set(height) {
          this.scaleY = height / gameObject.height;
        }
      });
      gameObject.rexContainer = rexContainer;
    }

    return gameObject.rexContainer;
  };

  var Parent = {
    setParent: function setParent(gameObject, parent) {
      if (parent === undefined) {
        parent = this;
      }

      var localState = GetLocalState(gameObject);

      if (parent) {
        // Add to parent
        localState.parent = parent;
        localState.self = gameObject;
      } else {
        // Remove from parent
        localState.parent = null;
        localState.self = null;
      }

      return this;
    },
    getParent: function getParent(gameObject, name) {
      if (typeof gameObject === 'string') {
        name = gameObject;
        gameObject = undefined;
      }

      if (gameObject === undefined) {
        gameObject = this;
      }

      return GetParent(gameObject, name);
    },
    getTopmostParent: function getTopmostParent(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }

      return GetTopmostParent(gameObject);
    }
  };

  var GetValue$17 = Phaser.Utils.Objects.GetValue;
  var BaseAdd = Base$1.prototype.add;

  var Add$8 = function Add(gameObject, config) {
    this.setParent(gameObject);
    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);
    this.resetChildState(gameObject) // Reset local state of child
    .updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject); // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    return this;
  };

  var AddLocal = function AddLocal(gameObject, config) {
    this.setParent(gameObject); // Set local state from child directly

    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config); // Position

    state.x = gameObject.x;
    state.y = gameObject.y;
    state.rotation = gameObject.rotation;
    state.scaleX = gameObject.scaleX;
    state.scaleY = gameObject.scaleY; // Alpha

    state.alpha = gameObject.alpha; // Visible

    state.visible = gameObject.visible; // Active

    state.active = gameObject.active;
    this.updateChildPosition(gameObject).updateChildAlpha(gameObject).updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject); // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    return this;
  };

  var SetupSyncFlags = function SetupSyncFlags(state, config) {
    state.syncPosition = GetValue$17(config, 'syncPosition', true);
    state.syncRotation = GetValue$17(config, 'syncRotation', true);
    state.syncScale = GetValue$17(config, 'syncScale', true);
    state.syncAlpha = GetValue$17(config, 'syncAlpha', true);
  };

  var AddChild$1 = {
    // Can override this method
    add: function add(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        Add$8.call(this, gameObject);
      }

      return this;
    },
    // Don't override this method
    pin: function pin(gameObject, config) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject, config);
      } else {
        Add$8.call(this, gameObject, config);
      }

      return this;
    },
    addMultiple: function addMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Add$8.call(this, gameObjects[i]);
      }

      return this;
    },
    addLocal: function addLocal(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        AddLocal.call(this, gameObject);
      }

      return this;
    },
    // Don't override this method
    pinLocal: function pinLocal(gameObject, config) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject, config);
      } else {
        AddLocal.call(this, gameObject, config);
      }

      return this;
    },
    addLocalMultiple: function addLocalMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        AddLocal.call(this, gameObjects[i]);
      }

      return this;
    }
  };

  var BaseRemove = Base$1.prototype.remove;
  var BaseClear = Base$1.prototype.clear;
  var RemoveChild$1 = {
    remove: function remove(gameObject, destroyChild) {
      if (GetParent(gameObject) !== this) {
        return this;
      }

      this.setParent(gameObject, null);
      BaseRemove.call(this, gameObject, destroyChild);
      return this;
    },
    clear: function clear(destroyChild) {
      for (var i = 0, cnt = this.children.length; i < cnt; i++) {
        this.setParent(this.children[i], null);
      }

      BaseClear.call(this, destroyChild);
      return this;
    }
  };

  var ChildState = {
    getLocalState: function getLocalState(gameObject) {
      return GetLocalState(gameObject);
    },
    resetChildState: function resetChildState(gameObject) {
      this.resetChildPositionState(gameObject).resetChildVisibleState(gameObject).resetChildAlphaState(gameObject).resetChildActiveState(gameObject);
      return this;
    },
    resetChildrenState: function resetChildrenState(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.resetChildState(gameObjects[i]);
      }

      return this;
    },
    syncProperties: function syncProperties() {
      this.syncPosition().syncVisible().syncAlpha().syncActive().syncScrollFactor().syncMask();
      return this;
    }
  };

  var RotateAround$3 = Phaser.Math.RotateAround;
  var Transform = {
    worldToLocal: function worldToLocal(point) {
      // Transform
      point.x -= this.x;
      point.y -= this.y; // Rotate

      RotateAround$3(point, 0, 0, -this.rotation); // Scale

      point.x /= this.scaleX;
      point.y /= this.scaleY;
      return point;
    },
    localToWorld: function localToWorld(point) {
      // Scale
      point.x *= this.scaleX;
      point.y *= this.scaleY; // Rotate

      RotateAround$3(point, 0, 0, this.rotation); // Transform

      point.x += this.x;
      point.y += this.y;
      return point;
    }
  };

  var GetScale = function GetScale(a, b) {
    if (a === b) {
      return 1;
    } else {
      return a / b;
    }
  };

  var Position = {
    updateChildPosition: function updateChildPosition(child) {
      if (child.isRexContainerLite) {
        child.syncChildrenEnable = false;
      }

      var state = GetLocalState(child);
      var parent = state.parent;

      if (state.syncPosition) {
        child.x = state.x;
        child.y = state.y;
        parent.localToWorld(child);
      }

      if (state.syncRotation) {
        child.rotation = state.rotation + parent.rotation;
      }

      if (state.syncScale) {
        child.scaleX = state.scaleX * parent.scaleX;
        child.scaleY = state.scaleY * parent.scaleY;
      }

      if (child.isRexContainerLite) {
        child.syncChildrenEnable = true;
        child.syncPosition();
      }

      return this;
    },
    syncPosition: function syncPosition() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildPosition, this);
      }

      return this;
    },
    resetChildPositionState: function resetChildPositionState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.x = child.x;
      state.y = child.y;
      parent.worldToLocal(state);
      state.scaleX = GetScale(child.scaleX, parent.scaleX);
      state.scaleY = GetScale(child.scaleY, parent.scaleY);
      state.rotation = child.rotation - parent.rotation;
      return this;
    },
    setChildPosition: function setChildPosition(child, x, y) {
      child.x = x;
      child.y = y;
      this.resetChildPositionState(child);
      return this;
    },
    setChildLocalPosition: function setChildLocalPosition(child, x, y) {
      var state = GetLocalState(child);
      state.x = x;
      state.y = y;
      this.updateChildPosition(child);
      return this;
    },
    resetLocalPositionState: function resetLocalPositionState() {
      var parent = GetLocalState(this).parent;

      if (parent) {
        parent.resetChildPositionState(this);
      }

      return this;
    }
  };

  var DegToRad$2 = Phaser.Math.DegToRad;
  var Rotation = {
    updateChildRotation: function updateChildRotation(child) {
      var state = GetLocalState(child);
      var parent = state.parent;

      if (state.syncRotation) {
        child.rotation = parent.rotation + state.rotation;
      }

      return this;
    },
    syncRotation: function syncRotation() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildRotation, this);
      }

      return this;
    },
    resetChildRotationState: function resetChildRotationState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.rotation = child.rotation - parent.rotation;
      return this;
    },
    setChildRotation: function setChildRotation(child, rotation) {
      child.rotation = rotation;
      this.resetChildRotationState(child);
      return this;
    },
    setChildAngle: function setChildAngle(child, angle) {
      child.angle = angle;
      this.resetChildRotationState(child);
      return this;
    },
    setChildLocalRotation: function setChildLocalRotation(child, rotation) {
      var state = GetLocalState(child);
      state.rotation = rotation;
      this.updateChildRotation(child);
      return this;
    },
    setChildLocalAngle: function setChildLocalAngle(child, angle) {
      var state = GetLocalState(child);
      state.rotation = DegToRad$2(angle);
      this.updateChildRotation(child);
      return this;
    },
    resetLocalRotationState: function resetLocalRotationState() {
      var parent = GetLocalState(this).parent;

      if (parent) {
        parent.resetChildRotationState(this);
      }

      return this;
    }
  };

  var Scale$1 = {
    updateChildScale: function updateChildScale(child) {
      var state = GetLocalState(child);
      var parent = state.parent;

      if (state.syncScale) {
        child.scaleX = parent.scaleX * state.scaleX;
        child.scaleY = parent.scaleY * state.scaleY;
      }

      return this;
    },
    syncScale: function syncScale() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildScale, this);
      }

      return this;
    },
    resetChildScaleState: function resetChildScaleState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.scaleX = GetScale(child.scaleX, parent.scaleX);
      state.scaleY = GetScale(child.scaleY, parent.scaleY);
      return this;
    },
    setChildScale: function setChildScale(child, scaleX, scaleY) {
      if (scaleY === undefined) {
        scaleY = scaleX;
      }

      child.scaleX = scaleX;
      child.scaleY = scaleY;
      this.resetChildScaleState(child);
      return this;
    },
    setChildLocalScale: function setChildLocalScale(child, scaleX, scaleY) {
      if (scaleY === undefined) {
        scaleY = scaleX;
      }

      var state = GetLocalState(child);
      state.scaleX = scaleX;
      state.scaleY = scaleY;
      this.updateChildScale(child);
      return this;
    },
    setChildDisplaySize: function setChildDisplaySize(child, width, height) {
      child.setDisplaySize(width, height);
      this.resetChildScaleState(child);
      return this;
    },
    resetLocalScaleState: function resetLocalScaleState() {
      var parent = GetLocalState(this).parent;

      if (parent) {
        parent.resetChildScaleState(this);
      }

      return this;
    }
  };

  /*

  Visible in localState:

    - visible: original visible of child
    - maskVisible: invisible by parent mask, see MaskChildren.js
        - undefined (not in masking) : Equal to mask visible
        - true (mask visible) : Inside, or across parent's visible area
        - false (maske invisible) : Out of parent's visible area

  Visible result of child = (parent visible) && (child visible) && (mask visible)
  */
  var Visible = {
    updateChildVisible: function updateChildVisible(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      var maskVisible = localState.hasOwnProperty('maskVisible') ? localState.maskVisible : true;
      child.visible = parent.visible && localState.visible && maskVisible;
      return this;
    },
    syncVisible: function syncVisible() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildVisible, this);
      }

      return this;
    },
    resetChildVisibleState: function resetChildVisibleState(child) {
      var localState = GetLocalState(child); // Delete maskVisible property

      if (localState.hasOwnProperty('maskVisible')) {
        delete localState.maskVisible;
      }

      localState.visible = child.visible;
      return this;
    },
    setChildVisible: function setChildVisible(child, visible) {
      // Visible of child will be affect by parent's visible, and mask visible
      this.setChildLocalVisible(child, visible);
      return this;
    },
    // Internal method
    setChildLocalVisible: function setChildLocalVisible(child, visible) {
      if (visible === undefined) {
        visible = true;
      }

      var localState = GetLocalState(child);
      localState.visible = visible;
      this.updateChildVisible(child);
      return this;
    },
    // Internal method
    setChildMaskVisible: function setChildMaskVisible(child, visible) {
      if (visible === undefined) {
        visible = true;
      }

      var localState = GetLocalState(child);
      localState.maskVisible = visible;
      this.updateChildVisible(child);
      return this;
    },
    resetLocalVisibleState: function resetLocalVisibleState() {
      var parent = GetLocalState(this).parent;

      if (parent) {
        parent.resetChildVisibleState(this);
      }

      return this;
    }
  };

  var Alpha = {
    updateChildAlpha: function updateChildAlpha(child) {
      var state = GetLocalState(child);
      var parent = state.parent;

      if (state.syncAlpha) {
        child.alpha = parent.alpha * state.alpha;
      }

      return this;
    },
    syncAlpha: function syncAlpha() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildAlpha, this);
      }

      return this;
    },
    resetChildAlphaState: function resetChildAlphaState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.alpha = GetScale(child.alpha, parent.alpha);
      return this;
    },
    setChildAlpha: function setChildAlpha(child, alpha) {
      child.alpha = alpha;
      this.resetChildAlphaState(child);
      return this;
    },
    setChildLocalAlpha: function setChildLocalAlpha(child, alpha) {
      var state = GetLocalState(child);
      state.alpha = alpha;
      this.updateChildAlpha(child);
      return this;
    },
    resetLocalAlphaState: function resetLocalAlphaState() {
      var parent = GetLocalState(this).parent;

      if (parent) {
        parent.resetChildAlphaState(this);
      }

      return this;
    }
  };

  var Active = {
    updateChildActive: function updateChildActive(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      child.active = parent.active && localState.active;
      return this;
    },
    syncActive: function syncActive() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildActive, this);
      }

      return this;
    },
    resetChildActiveState: function resetChildActiveState(child) {
      var localState = GetLocalState(child);
      localState.active = child.active;
      return this;
    },
    setChildActive: function setChildActive(child, active) {
      child.active = active;
      this.resetChildActiveState(child);
      return this;
    },
    setChildLocalActive: function setChildLocalActive(child, active) {
      if (active === undefined) {
        active = true;
      }

      var localState = GetLocalState(child);
      localState.active = active;
      this.updateChildActive(child);
      return this;
    },
    resetLocalActiveState: function resetLocalActiveState() {
      var parent = GetLocalState(this).parent;

      if (parent) {
        parent.resetChildActiveState(this);
      }

      return this;
    }
  };

  var ScrollFactor = {
    updateChildScrollFactor: function updateChildScrollFactor(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      child.setScrollFactor(parent.scrollFactorX, parent.scrollFactorY);
      return this;
    },
    syncScrollFactor: function syncScrollFactor() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildScrollFactor, this);
      }

      return this;
    }
  };

  var Mask = {
    updateChildMask: function updateChildMask(child) {
      // Don't propagate null mask to clear children's mask
      if (this.mask == null) {
        return this;
      }

      var maskGameObject = this.mask.hasOwnProperty('geometryMask') ? this.mask.geometryMask : this.mask.bitmapMask;

      if (maskGameObject !== child) {
        child.mask = this.mask;
      }

      return this;
    },
    syncMask: function syncMask() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildMask, this);
      }

      return this;
    },
    setMask: function setMask(mask) {
      this.mask = mask;
      return this;
    },
    clearMask: function clearMask(destroyMask) {
      if (destroyMask === undefined) {
        destroyMask = false;
      } // Clear current mask


      this._mask = null; // Clear children mask

      this.children.forEach(function (child) {
        child.clearMask(false);
      });

      if (destroyMask && this.mask) {
        this.mask.destroy();
      }

      return this;
    }
  };

  var SortGameObjectsByDepth = function SortGameObjectsByDepth(gameObjects, descending) {
    if (gameObjects.length === 0) {
      return gameObjects;
    }

    if (descending === undefined) {
      descending = false;
    }

    var scene = gameObjects[0].scene;
    var displayList = scene.sys.displayList;
    displayList.depthSort();

    if (descending) {
      gameObjects.sort(function (childA, childB) {
        return displayList.getIndex(childB) - displayList.getIndex(childA);
      });
    } else {
      gameObjects.sort(function (childA, childB) {
        return displayList.getIndex(childA) - displayList.getIndex(childB);
      });
    }

    return gameObjects;
  };

  var Depth = {
    setDepth: function setDepth(value, containerOnly) {
      this.depth = value;

      if (!containerOnly && this.children) {
        var children = this.getAllChildren();

        for (var i = 0, cnt = children.length; i < cnt; i++) {
          children[i].depth = value;
        }
      }

      return this;
    },
    swapDepth: function swapDepth(containerB) {
      var depthA = this.depth;
      var depthB = containerB.depth;
      this.setDepth(depthB);
      containerB.setDepth(depthA);
      return this;
    },
    incDepth: function incDepth(inc) {
      this.depth += inc;

      if (this.children) {
        var children = this.getAllChildren();

        for (var i = 0, cnt = children.length; i < cnt; i++) {
          children[i].depth += inc;
        }
      }

      return this;
    },
    moveDepthBelow: function moveDepthBelow(gameObject) {
      var displayList = gameObject.scene.children;
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children);

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        if (displayList.exists(child)) {
          displayList.moveBelow(gameObject, child);
          break;
        }
      }

      return this;
    },
    moveDepthAbove: function moveDepthAbove(gameObject) {
      var displayList = gameObject.scene.children;
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, true);

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        if (displayList.exists(child)) {
          displayList.moveAbove(gameObject, child);
          break;
        }
      }

      return this;
    }
  };

  var DepthFirstSearch = function DepthFirstSearch(root, callback) {
    var skip = callback(root);

    if (!skip && root.isRexContainerLite) {
      var children = root.children;

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        DepthFirstSearch(children[i], callback);
      }
    }
  };

  var BreadthFirstSearch = function BreadthFirstSearch(root, callback) {
    var queue = [root];

    while (queue.length > 0) {
      var current = queue.shift();
      var skip = callback(current);

      if (!skip && current.isRexContainerLite) {
        queue.push.apply(queue, _toConsumableArray(current.children));
      }
    }
  };

  var ArrayUtils = Phaser.Utils.Array;
  var Children = {
    getChildren: function getChildren(out) {
      if (!out) {
        out = this.children; // Return internal children array
      } else {
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          out.push(this.children[i]);
        } // Copy children

      }

      return out;
    },
    getAllChildren: function getAllChildren(out) {
      if (out === undefined) {
        out = [];
      }

      var root = this;
      BreadthFirstSearch(root, function (child) {
        // Don't add root
        if (child === root) {
          return;
        }

        out.push(child);
      });
      return out;
    },
    getAllVisibleChildren: function getAllVisibleChildren(out) {
      if (out === undefined) {
        out = [];
      }

      var root = this;
      BreadthFirstSearch(root, function (child) {
        // Don't add root
        if (child === root) {
          return;
        } // Don't add invisible child


        if (!child.visible) {
          return true;
        }

        out.push(child);
      });
      return out;
    },
    bfs: function bfs(callback, root) {
      if (root === undefined) {
        root = this;
      }

      BreadthFirstSearch(root, callback);
      return this;
    },
    dfs: function dfs(callback, root) {
      if (root === undefined) {
        root = this;
      }

      DepthFirstSearch(root, callback);
      return this;
    },
    contains: function contains(gameObject) {
      // Override Base.contains method
      var parent = GetParent(gameObject);

      if (!parent) {
        return false;
      } else if (parent === this) {
        return true;
      } else {
        return this.contains(parent);
      }
    },
    getByName: function getByName(name, recursive) {
      if (!recursive) {
        return ArrayUtils.GetFirst(this.children, 'name', name); // object, or null if not found
      } else {
        // recursive
        // Breadth-first search
        var queue = [this];
        var parent, child;

        while (queue.length) {
          parent = queue.shift();

          for (var i = 0, cnt = parent.children.length; i < cnt; i++) {
            child = parent.children[i];

            if (child.name === name) {
              return child;
            } else if (child.isRexContainerLite) {
              queue.push(child);
            }
          }
        }

        return null;
      }
    },
    getRandom: function getRandom(startIndex, length) {
      return ArrayUtils.GetRandom(this.children, startIndex, length);
    },
    getFirst: function getFirst(property, value, startIndex, endIndex) {
      return ArrayUtils.GetFirstElement(this.children, property, value, startIndex, endIndex);
    },
    getAll: function getAll(property, value, startIndex, endIndex) {
      return ArrayUtils.GetAll(this.children, property, value, startIndex, endIndex);
    },
    count: function count(property, value, startIndex, endIndex) {
      return ArrayUtils.CountAllMatching(this.children, property, value, startIndex, endIndex);
    },
    swap: function swap(child1, child2) {
      ArrayUtils.Swap(this.children, child1, child2);
      return this;
    },
    setAll: function setAll(property, value, startIndex, endIndex) {
      ArrayUtils.SetAll(this.children, property, value, startIndex, endIndex);
      return this;
    }
  };

  var GetLocalStates = function GetLocalStates(gameObjects) {
    var localStates = [];

    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];

      if (!gameObject.hasOwnProperty('rexContainer')) {
        continue;
      }

      localStates.push(gameObject.rexContainer);
    }

    return localStates;
  };

  var GetScene = function GetScene(gameObjects) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var scene = gameObjects[i].scene;

      if (scene) {
        return scene;
      }
    }

    return null;
  };

  var UpdateChild = function UpdateChild(tween, key, target) {
    if (!target.parent) {
      // target object was removed, so remove this tween too
      tween.remove();
      return;
    }

    var parent = target.parent;
    var child = target.self;

    switch (key) {
      case 'x':
      case 'y':
        parent.updateChildPosition(child);
        break;

      case 'angle':
      case 'rotation':
        parent.updateChildRotation(child);
        break;

      case 'scaleX':
      case 'scaleY':
      case 'displayWidth':
      case 'displayHeight':
        parent.updateChildScale(child);
        break;

      case 'alpha':
        parent.updateChildAlpha(child);
        break;

      default:
        parent.updateChildPosition(child);
        parent.updateChildRotation(child);
        parent.updateChildScale(child);
        parent.updateChildAlpha(child);
        break;
    }
  };

  var Tween = {
    tweenChild: function tweenChild(tweenConfig) {
      var targets = tweenConfig.targets;

      if (!Array.isArray(targets)) {
        targets = [targets];
      }

      var scene = this.scene || GetScene(targets);

      if (!scene) {
        return;
      } // Map child game objects to local states


      tweenConfig.targets = GetLocalStates(targets);
      var tween = scene.tweens.add(tweenConfig); // Update child game object in 'update' event

      tween.on('update', UpdateChild);
      return tween;
    },
    createTweenChildConfig: function createTweenChildConfig(tweenConfig) {
      var targets = tweenConfig.targets;

      if (targets) {
        if (!Array.isArray(targets)) {
          targets = [targets];
        } // Map child game objects to local states


        tweenConfig.targets = GetLocalStates(targets);
      }

      var onUpdate = tweenConfig.onUpdate;

      tweenConfig.onUpdate = function (tween, target) {
        if (onUpdate) {
          onUpdate(tween, target);
        }

        UpdateChild(tween, undefined, target);
      };

      return tweenConfig;
    },
    tween: function tween(tweenConfig) {
      var scene = this.scene;

      if (!tweenConfig.targets) {
        tweenConfig.targets = this;
      }

      return scene.tweens.add(tweenConfig);
    },
    timelineChild: function timelineChild(timelineConfig) {
      var targets = timelineConfig.targets; // Map child game objects to local states

      if (targets) {
        if (!Array.isArray(targets)) {
          targets = [targets];
        }

        timelineConfig.targets = GetLocalStates(targets);
      }

      var tweens = timelineConfig.tweens;

      for (var i = 0, cnt = tweens.length; i < cnt; i++) {
        tweens[i] = this.createTweenChildConfig(tweens[i]);
      }

      var timeline = this.scene.tweens.timeline(timelineConfig);
      return timeline;
    }
  };

  var AddToLayer = function AddToLayer(layer) {
    var gameObjects = this.getAllChildren([this]);
    SortGameObjectsByDepth(gameObjects);
    layer.add(gameObjects);
    return this;
  };

  var AddToContainer = {
    addToLayer: AddToLayer,
    addToContainer: AddToLayer
  };

  var RotateAround$2 = Phaser.Math.RotateAround;

  var ChangeOrigin$1 = function ChangeOrigin(gameObject, originX, originY) {
    if (originY === undefined) {
      originY = originX;
    }

    var deltaXY = {
      x: (originX - gameObject.originX) * gameObject.displayWidth,
      y: (originY - gameObject.originY) * gameObject.displayHeight
    };
    RotateAround$2(deltaXY, 0, 0, gameObject.rotation);
    gameObject.originX = originX;
    gameObject.originY = originY;
    gameObject.x = gameObject.x + deltaXY.x;
    gameObject.y = gameObject.y + deltaXY.y;
    return gameObject;
  };

  var ChangeOrigin = function ChangeOrigin(originX, originY) {
    this.syncChildrenEnable = false;
    ChangeOrigin$1(this, originX, originY);
    this.syncChildrenEnable = true;
    var children = this.getAllChildren();

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      this.resetChildPositionState(children[i]);
    }

    return this;
  };

  var methods$a = {
    changeOrigin: ChangeOrigin
  };
  Object.assign(methods$a, Parent, AddChild$1, RemoveChild$1, ChildState, Transform, Position, Rotation, Scale$1, Visible, Alpha, Active, ScrollFactor, Mask, Depth, Children, Tween, AddToContainer);

  var ContainerLite = /*#__PURE__*/function (_Base) {
    _inherits(ContainerLite, _Base);

    var _super = _createSuper(ContainerLite);

    function ContainerLite(scene, x, y, width, height, children) {
      var _this;

      _classCallCheck(this, ContainerLite);

      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexContainerLite';
      _this.isRexContainerLite = true;
      _this.syncChildrenEnable = true;
      _this._active = true;
      _this._mask = null;
      _this._scrollFactorX = 1;
      _this._scrollFactorY = 1;

      if (children) {
        _this.add(children);
      }

      return _this;
    }

    _createClass(ContainerLite, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        this.syncChildrenEnable = false; // Don't sync properties changing anymore

        _get(_getPrototypeOf(ContainerLite.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        if (this._x === value) {
          return;
        }

        this._x = value;
        this.syncPosition();
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        if (this._y === value) {
          return;
        }

        this._y = value;
        this.syncPosition();
      } // Override

    }, {
      key: "rotation",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "rotation", this);
      },
      set: function set(value) {
        if (this.rotation === value) {
          return;
        }

        _set(_getPrototypeOf(ContainerLite.prototype), "rotation", value, this, true);

        this.syncPosition();
      } // Override

    }, {
      key: "scaleX",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scaleX", this);
      },
      set: function set(value) {
        if (this.scaleX === value) {
          return;
        }

        _set(_getPrototypeOf(ContainerLite.prototype), "scaleX", value, this, true);

        this.syncPosition();
      } // Override

    }, {
      key: "scaleY",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scaleY", this);
      },
      set: function set(value) {
        if (this.scaleY === value) {
          return;
        }

        _set(_getPrototypeOf(ContainerLite.prototype), "scaleY", value, this, true);

        this.syncPosition();
      } // Override

    }, {
      key: "scale",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scale", this);
      },
      set: function set(value) {
        if (this.scale === value) {
          return;
        }

        _set(_getPrototypeOf(ContainerLite.prototype), "scale", value, this, true);

        this.syncPosition();
      } // Override

    }, {
      key: "visible",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "visible", this);
      },
      set: function set(value) {
        if (_get(_getPrototypeOf(ContainerLite.prototype), "visible", this) === value) {
          return;
        }

        _set(_getPrototypeOf(ContainerLite.prototype), "visible", value, this, true);

        this.syncVisible();
      } // Override

    }, {
      key: "alpha",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "alpha", this);
      },
      set: function set(value) {
        if (_get(_getPrototypeOf(ContainerLite.prototype), "alpha", this) === value) {
          return;
        }

        _set(_getPrototypeOf(ContainerLite.prototype), "alpha", value, this, true);

        this.syncAlpha();
      } // Override

    }, {
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        if (this._active === value) {
          return;
        }

        this._active = value;
        this.syncActive();
      } // Override

    }, {
      key: "mask",
      get: function get() {
        return this._mask;
      },
      set: function set(mask) {
        if (this._mask === mask) {
          return;
        }

        this._mask = mask;
        this.syncMask();
      } // Override

    }, {
      key: "scrollFactorX",
      get: function get() {
        return this._scrollFactorX;
      },
      set: function set(value) {
        if (this._scrollFactorX === value) {
          return;
        }

        this._scrollFactorX = value;
        this.syncScrollFactor();
      }
    }, {
      key: "scrollFactorY",
      get: function get() {
        return this._scrollFactorY;
      },
      set: function set(value) {
        if (this._scrollFactorY === value) {
          return;
        }

        this._scrollFactorY = value;
        this.syncScrollFactor();
      } // Compatiable with container plugin

    }, {
      key: "list",
      get: function get() {
        return this.children;
      }
    }], [{
      key: "GetParent",
      value: function GetParent$1(child) {
        return GetParent(child);
      }
    }]);

    return ContainerLite;
  }(Base$1);

  Object.assign(ContainerLite.prototype, methods$a);

  var GetSizerConfig = function GetSizerConfig(gameObject) {
    if (!gameObject.hasOwnProperty('rexSizer')) {
      gameObject.rexSizer = {};
    }

    return gameObject.rexSizer;
  };

  var GetChildPrevState = function GetChildPrevState(child) {
    var childConfig = GetSizerConfig(child);

    if (!childConfig.hasOwnProperty('prevState')) {
      childConfig.prevState = {};
    }

    return childConfig.prevState;
  };

  var CameraClass = Phaser.Cameras.Scene2D.BaseCamera;

  var IsCameraObject = function IsCameraObject(object) {
    return object instanceof CameraClass;
  };

  var Rectangle$1 = Phaser.Geom.Rectangle;

  var GetViewport = function GetViewport(scene, camera, out) {
    if (!IsCameraObject(camera)) {
      out = camera;
      camera = undefined;
    }

    if (out === undefined) {
      out = new Rectangle$1();
    } else if (out === true) {
      out = globRect;
    }

    var scaleManager = scene.sys.scale;
    var baseSize = scaleManager.baseSize;
    var parentSize = scaleManager.parentSize;
    var canvasBounds = scaleManager.canvasBounds;
    var displayScale = scaleManager.displayScale;
    var x = canvasBounds.x >= 0 ? 0 : -(canvasBounds.x * displayScale.x);
    var y = canvasBounds.y >= 0 ? 0 : -(canvasBounds.y * displayScale.y);
    var width;

    if (parentSize.width >= canvasBounds.width) {
      width = baseSize.width;
    } else {
      width = baseSize.width - (canvasBounds.width - parentSize.width) * displayScale.x;
    }

    var height;

    if (parentSize.height >= canvasBounds.height) {
      height = baseSize.height;
    } else {
      height = baseSize.height - (canvasBounds.height - parentSize.height) * displayScale.y;
    }

    out.setTo(x, y, width, height);

    if (camera) {
      var offsetX = camera.scrollX;
      var offsetY = camera.scrollY;
      var scaleX = 1 / camera.zoomX;
      var scaleY = 1 / camera.zoomY;
      out.width *= scaleX;
      out.height *= scaleY;
      out.centerX = camera.centerX + offsetX;
      out.centerY = camera.centerY + offsetY;
    }

    return out;
  };

  var globRect = new Rectangle$1();

  var PushIntoBounds = function PushIntoBounds(bounds) {
    if (bounds === undefined) {
      bounds = GetViewport(this.scene);
    }

    this.left = Math.max(this.left, bounds.left);
    this.right = Math.min(this.right, bounds.right);
    this.top = Math.max(this.top, bounds.top);
    this.bottom = Math.min(this.bottom, bounds.bottom);
    return this;
  };

  var ALIGN$1 = Phaser.Display.Align;
  var ALIGNMODE = {
    center: ALIGN$1.CENTER,
    left: ALIGN$1.LEFT_CENTER,
    right: ALIGN$1.RIGHT_CENTER,
    top: ALIGN$1.TOP_CENTER,
    bottom: ALIGN$1.BOTTOM_CENTER,
    'left-top': ALIGN$1.TOP_LEFT,
    'left-center': ALIGN$1.LEFT_CENTER,
    'left-bottom': ALIGN$1.BOTTOM_LEFT,
    'center-top': ALIGN$1.TOP_CENTER,
    'center-center': ALIGN$1.CENTER,
    'center-bottom': ALIGN$1.BOTTOM_CENTER,
    'right-top': ALIGN$1.TOP_RIGHT,
    'right-center': ALIGN$1.RIGHT_CENTER,
    'right-bottom': ALIGN$1.BOTTOM_RIGHT
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

  var AlignIn = function AlignIn(child, x, y, width, height, align) {
    globZone.setPosition(x, y).setSize(width, height);
    QuickSet(child, globZone, align);
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround$1 = Phaser.Math.RotateAround;

  var GetBounds = function GetBounds(gameObject, output) {
    if (output === undefined) {
      output = new Rectangle();
    } else if (output === true) {
      if (GlobRect$1 === undefined) {
        GlobRect$1 = new Rectangle();
      }

      output = GlobRect$1;
    }

    if (gameObject.getBounds) {
      return gameObject.getBounds(output);
    } //  We can use the output object to temporarily store the x/y coords in:


    var TLx, TLy, TRx, TRy, BLx, BLy, BRx, BRy; // Instead of doing a check if parent container is
    // defined per corner we only do it once.

    if (gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      GetTopLeft(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      TLx = output.x;
      TLy = output.y;
      GetTopRight(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      TRx = output.x;
      TRy = output.y;
      GetBottomLeft(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      BLx = output.x;
      BLy = output.y;
      GetBottomRight(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      BRx = output.x;
      BRy = output.y;
    } else {
      GetTopLeft(gameObject, output);
      TLx = output.x;
      TLy = output.y;
      GetTopRight(gameObject, output);
      TRx = output.x;
      TRy = output.y;
      GetBottomLeft(gameObject, output);
      BLx = output.x;
      BLy = output.y;
      GetBottomRight(gameObject, output);
      BRx = output.x;
      BRy = output.y;
    }

    output.x = Math.min(TLx, TRx, BLx, BRx);
    output.y = Math.min(TLy, TRy, BLy, BRy);
    output.width = Math.max(TLx, TRx, BLx, BRx) - output.x;
    output.height = Math.max(TLy, TRy, BLy, BRy) - output.y;
    return output;
  };

  var GlobRect$1 = undefined;

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
      RotateAround$1(output, gameObject.x, gameObject.y, gameObject.rotation);
    }

    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }

    return output;
  };

  var GetValue$16 = Phaser.Utils.Objects.GetValue;
  var Group = Phaser.GameObjects.Group;

  var DrawBounds = function DrawBounds(graphics, config) {
    var scene = graphics.scene;
    var color;
    var createTextCallback, createTextCallbackScope, textAlign;

    if (typeof config === 'number') {
      color = config;
    } else {
      color = GetValue$16(config, 'color', 0xffffff);
      var nameTextConfig = GetValue$16(config, 'name', false);

      if (nameTextConfig) {
        createTextCallback = GetValue$16(nameTextConfig, 'createTextCallback', DefaultCreateTextCallback);
        createTextCallbackScope = GetValue$16(nameTextConfig, 'createTextCallbackScope', undefined);
        textAlign = GetValue$16(nameTextConfig, 'align', 'left-top');

        if (typeof textAlign === 'string') {
          textAlign = ALIGNMODE[textAlign];
        }
      }
    }

    if (createTextCallback && !graphics.children) {
      graphics.children = new Group(scene);
      graphics.once('destroy', function (graphics, fromScene) {
        graphics.children.destroy(!fromScene);
        graphics.children = undefined;
      });
      var graphicsClear = graphics.clear.bind(graphics);

      graphics.clear = function () {
        graphicsClear();
        graphics.children.clear(false, true);
      };
    }

    var children = this.getAllShownChildren([this]),
        child;
    var nameText;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child.getBounds || child.width !== undefined && child.height !== undefined) {
        GlobRect = GetBounds(child, GlobRect);
      } else {
        continue;
      }

      if (color != null) {
        graphics.lineStyle(1, color).strokeRectShape(GlobRect);
      }

      if (child.name && createTextCallback) {
        if (createTextCallbackScope) {
          nameText = createTextCallback.call(createTextCallbackScope, scene);
        } else {
          nameText = createTextCallback(scene);
        }

        if (nameText) {
          nameText.setText(child.name);
          graphics.children.add(nameText);
          AlignIn(nameText, GlobRect.x, GlobRect.y, GlobRect.width, GlobRect.height, textAlign);
        }
      }
    }

    return this;
  };

  var DefaultCreateTextCallback = function DefaultCreateTextCallback(scene, child, childBoundsRect) {
    return scene.add.text(0, 0, '');
  };

  var GlobRect = undefined;

  var GetValue$15 = Phaser.Utils.Objects.GetValue;

  var GetBoundsConfig = function GetBoundsConfig(config, out) {
    if (out === undefined) {
      out = {};
    }

    if (typeof config === 'number') {
      out.left = config;
      out.right = config;
      out.top = config;
      out.bottom = config;
    } else {
      out.left = GetValue$15(config, 'left', 0);
      out.right = GetValue$15(config, 'right', 0);
      out.top = GetValue$15(config, 'top', 0);
      out.bottom = GetValue$15(config, 'bottom', 0);
    }

    return out;
  };

  var ContainerAdd = ContainerLite.prototype.add;

  var AddChild = function AddChild(gameObject) {
    ContainerAdd.call(this, gameObject);

    if (this.sizerEventsEnable) {
      gameObject.emit('sizer.add', gameObject, this);
      this.emit('add', gameObject, this);
    }

    return this;
  };

  var AddChildMethods$8 = {
    addBackground: function addBackground(gameObject, paddingConfig, childKey) {
      if (this.backgroundChildren === undefined) {
        this.backgroundChildren = [];
      }

      if (typeof paddingConfig === 'string') {
        childKey = paddingConfig;
        paddingConfig = undefined;
      }

      if (paddingConfig === undefined) {
        paddingConfig = 0;
      }

      AddChild.call(this, gameObject);
      this.backgroundChildren.push(gameObject);
      var config = this.getSizerConfig(gameObject);
      config.padding = GetBoundsConfig(paddingConfig);

      if (childKey !== undefined) {
        this.addChildrenMap(childKey, gameObject);
      }

      return this;
    },
    isBackground: function isBackground(gameObject) {
      if (this.backgroundChildren === undefined) {
        return false;
      }

      return this.backgroundChildren.indexOf(gameObject) !== -1;
    }
  };

  var RemoveChildMethods$7 = {
    removeFromParentSizer: function removeFromParentSizer() {
      var parent = this.getParentSizer();

      if (parent) {
        parent.remove(this);
      }

      return this;
    }
  };

  var AddChildrenMap = function AddChildrenMap(key, gameObject) {
    if (this.childrenMap === undefined) {
      this.childrenMap = {};
    }

    this.childrenMap[key] = gameObject;
    return this;
  };

  var RemoveChildrenMap = function RemoveChildrenMap(key) {
    if (_typeof(key) === 'object') {
      var gameObject = key;

      for (var key in this.childrenMap) {
        if (this.childrenMap[key] === gameObject) {
          delete this.childrenMap[key];
          return this;
        }
      }
    }

    delete this.childrenMap[key];
    return this;
  };

  var GetElement = function GetElement(mapNameList, recursive) {
    if (typeof mapNameList === 'string') {
      mapNameList = mapNameList.split('.');
    }

    if (mapNameList.length === 0) {
      return undefined;
    }

    var name = mapNameList.shift(),
        element = null;

    if (name.charAt(0) === '#') {
      // Get element by name
      name = name.substring(1);
      element = this.getByName(name, recursive);
    } else if (name.indexOf('[') === -1) {
      // Get element by key
      if (this.childrenMap) {
        element = this.childrenMap[name];
      }
    } else {
      // Get element by key[]
      var innerMatch = name.match(RE_OBJ);

      if (innerMatch != null) {
        if (this.childrenMap) {
          var elements = this.childrenMap[innerMatch[1]];

          if (elements) {
            element = elements[innerMatch[2]];
          }
        }
      }
    }

    if (mapNameList.length === 0) {
      return element;
    } else if (element && element.childrenMap) {
      return element.getElement(mapNameList);
    } else {
      return null;
    }
  };

  var RE_OBJ = /(\S+)\[(\d+)\]/i;

  var GetValue$14 = Phaser.Utils.Objects.GetValue;

  var GetPadding = function GetPadding(padding, key) {
    if (key === undefined) {
      return padding;
    }

    return padding[key];
  };

  var SetPadding = function SetPadding(padding, key, value) {
    var keyType = _typeof(key);

    if (keyType === 'string') {
      padding[key] = value;
    } else if (keyType === 'number') {
      padding.left = key;
      padding.right = key;
      padding.top = key;
      padding.bottom = key;
    } else {
      padding.left = GetValue$14(key, 'left', 0);
      padding.right = GetValue$14(key, 'right', 0);
      padding.top = GetValue$14(key, 'top', 0);
      padding.bottom = GetValue$14(key, 'bottom', 0);
    }
  };

  var PaddingMethods = {
    getInnerPadding: function getInnerPadding(key) {
      return GetPadding(this.space, key);
    },
    setInnerPadding: function setInnerPadding(key, value) {
      SetPadding(this.space, key, value);
      return this;
    },
    getOuterPadding: function getOuterPadding(key) {
      return GetPadding(this.getSizerConfig(this).padding, key);
    },
    setOuterPadding: function setOuterPadding(key, value) {
      SetPadding(this.getSizerConfig(this).padding, key, value);
      return this;
    },
    getChildOuterPadding: function getChildOuterPadding(child, key) {
      if (typeof child === 'string') {
        child = this.getElement(child);
      }

      return GetPadding(this.getSizerConfig(child).padding, key);
    },
    setChildOuterPadding: function setChildOuterPadding(child, key, value) {
      if (typeof child === 'string') {
        child = this.getElement(child);
      }

      SetPadding(this.getSizerConfig(child).padding, key, value);
      return this;
    }
  };

  var ResolveWidth$2 = function ResolveWidth(width) {
    if (width === undefined) {
      width = Math.max(this.childrenWidth, this.minWidth);
    }

    return width;
  };

  var ResolveChildrenWidth$1 = function ResolveChildrenWidth(parentWidth) {
    // Resolve width of sizer children
    var child, childWidth;

    for (var i in this.sizerChildren) {
      child = this.sizerChildren[i];

      if (child && child.isRexSizer && !child.ignoreLayout) {
        childWidth = this.getExpandedChildWidth(child, parentWidth);
        childWidth = child.resolveWidth(childWidth);
        child.resolveChildrenWidth(childWidth);
      }
    }
  };

  var ResolveHeight$2 = function ResolveHeight(height) {
    var minHeight = Math.max(this.childrenHeight, this.minHeight);

    if (height === undefined) {
      height = minHeight;
    }

    return height;
  };

  var GetChildWidth$1 = function GetChildWidth(child) {
    var childWidth;

    if (child.isRexSizer) {
      // Sizer game object
      childWidth = Math.max(child.minWidth, child.childrenWidth);
    } else {
      // Normal game object
      if (child.minWidth !== undefined) {
        // Force minWidth
        childWidth = child.minWidth;
      } else {
        childWidth = GetDisplayWidth(child);
      }
    }

    return childWidth;
  };

  var GetChildHeight = function GetChildHeight(child) {
    var childHeight;

    if (child.isRexSizer) {
      // Sizer game object
      childHeight = Math.max(child.minHeight, child.childrenHeight);
    } else {
      // Normal game object
      if (child.minHeight !== undefined) {
        // Force minHeight
        childHeight = child.minHeight;
      } else {
        childHeight = GetDisplayHeight(child);
      }
    }

    return childHeight;
  };

  // Override
  var GetExpandedChildWidth$3 = function GetExpandedChildWidth(child, parentWidth) {
    return parentWidth;
  };

  // Override
  var GetExpandedChildHeight$3 = function GetExpandedChildHeight(child, parentHeight) {
    return parentHeight;
  };

  // Override
  var GetChildrenWidth$4 = function GetChildrenWidth() {
    return 0;
  };

  // Override
  var GetChildrenHeight$4 = function GetChildrenHeight() {
    return 0;
  };

  var GetAllChildrenSizers = function GetAllChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }

    var startIdx = out.length;
    var children = this.getChildrenSizers(out);
    var endIdx = out.length;

    for (var i = startIdx; i < endIdx; i++) {
      children[i].getAllChildrenSizers(out);
    }

    return out;
  };

  // Default method
  var GetChildrenSizers$4 = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }

    return out;
  };

  var GetShownChildrenMethods = {
    getShownChildren: function getShownChildren(out) {
      if (out === undefined) {
        out = [];
      }

      var children = this.children,
          child;

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (child.rexSizer && child.rexSizer.hidden) {
          // Don't add hidden child
          continue;
        }

        out.push(child);
      }

      return out;
    },
    getAllShownChildren: function getAllShownChildren(out) {
      if (out === undefined) {
        out = [];
      }

      var children = this.children,
          child;

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (child.rexSizer && child.rexSizer.hidden) {
          // Don't add hidden child
          continue;
        }

        out.push(child);

        if (child.hasOwnProperty('isRexContainerLite')) {
          var _out;

          (_out = out).push.apply(_out, _toConsumableArray(child.getAllShownChildren()));
        }
      }

      return out;
    }
  };

  var PreLayout$4 = function PreLayout() {
    this._childrenWidth = undefined;
    this._childrenHeight = undefined;
    var children = this.getChildrenSizers(),
        child;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child.ignoreLayout) {
        continue;
      }

      child.preLayout();
    }
  };

  var Layout = function Layout() {
    this.runLayout();
    return this;
  };

  // Override
  var RunLayout = function RunLayout(parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.ignoreLayout) {
      return this;
    }

    var isTopmostParent = !parent; // Preprocessor, top parent only

    if (isTopmostParent) {
      this.preLayout();
    } // Calculate parent width


    newWidth = this.resolveWidth(newWidth); // Calculate all children width, run width wrap

    if (isTopmostParent) {
      this.resolveChildrenWidth(newWidth);
      this.runWidthWrap(newWidth);
    } // Calculate parent height


    newHeight = this.resolveHeight(newHeight); // Resize parent

    this.resize(newWidth, newHeight);

    if (this.sizerEventsEnable) {
      if (this.layoutedChildren === undefined) {
        this.layoutedChildren = [];
      }
    } // Layout children    


    this.layoutChildren(); // Layout background children

    this.layoutBackgrounds();

    if (this.sizerEventsEnable) {
      this.emit('postlayout', this.layoutedChildren, this);
      this.layoutedChildren.length = 0;
    }

    return this.postLayout();
  };

  // Override
  var LayoutChildren$5 = function LayoutChildren() {};

  var PostLayout = function PostLayout(parent, newWidth, newHeight) {
    if (this._anchor) {
      this._anchor.updatePosition();
    }

    return this;
  };

  // Default method
  var RunWidthWrap$2 = function RunWidthWrap(parentWidth) {
    var child, childWidth;

    for (var i in this.sizerChildren) {
      child = this.sizerChildren[i];

      if (!child || child.isRexSizer && child.ignoreLayout || !child.runWidthWrap) {
        continue;
      }

      childWidth = this.getExpandedChildWidth(child, parentWidth);

      if (child.isRexSizer) {
        childWidth = child.resolveWidth(childWidth);
      }

      child.runWidthWrap(childWidth);
    }

    return this;
  };

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

  var GetValue$13 = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$13(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

      if (this.parent && this.parent === this.scene) {
        // parent is a scene
        this.scene.sys.events.once('shutdown', this.onSceneDestroy, this);
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
          this.scene.sys.events.off('shutdown', this.onSceneDestroy, this);
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

  var Anchor = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Anchor, _ComponentBase);

    var _super = _createSuper(Anchor);

    function Anchor(gameObject, config) {
      var _this;

      _classCallCheck(this, Anchor);

      _this = _super.call(this, gameObject, {
        eventEmitter: false
      }); // No event emitter
      // this.parent = gameObject;

      _this.viewport = undefined;

      _this.resetFromJSON(config);

      return _this;
    }

    _createClass(Anchor, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        if (o === undefined) {
          o = {};
        } // Position


        var alignX, configX;

        if (o.x !== undefined) {
          alignX = null;
          configX = o.x;
        } else if (o.left !== undefined) {
          alignX = 0;
          configX = o.left;
        } else if (o.right !== undefined) {
          alignX = 1;
          configX = o.right;
        } else if (o.centerX !== undefined) {
          alignX = 0.5;
          configX = o.centerX;
        }

        var alignY, configY;

        if (o.y !== undefined) {
          alignY = null;
          configY = o.y;
        } else if (o.top !== undefined) {
          alignY = 0;
          configY = o.top;
        } else if (o.bottom !== undefined) {
          alignY = 1;
          configY = o.bottom;
        } else if (o.centerY !== undefined) {
          alignY = 0.5;
          configY = o.centerY;
        }

        var percentageX, offsetX;

        if (configX !== undefined) {
          configX = configX.replace('left', '0%').replace('right', '100%').replace('center', '50%').split('%');
          percentageX = parseFloat(configX[0]) / 100;
          offsetX = configX[1] === '' ? 0 : parseFloat(configX[1]);
        }

        var percentageY, offsetY;

        if (configY !== undefined) {
          configY = configY.replace('top', '0%').replace('bottom', '100%').replace('center', '50%').split('%');
          percentageY = parseFloat(configY[0]) / 100;
          offsetY = configY[1] === '' ? 0 : parseFloat(configY[1]);
        } // Size


        var configWidth = o.width;
        var percentageWidth, paddingWidth;

        if (configWidth !== undefined) {
          configWidth = configWidth.split('%');
          percentageWidth = parseFloat(configWidth[0]) / 100;
          paddingWidth = configWidth[1] === '' ? 0 : parseFloat(configWidth[1]);
        }

        var configHeight = o.height;
        var percentageHeight, paddingHeight;

        if (configHeight !== undefined) {
          configHeight = configHeight.split('%');
          percentageHeight = parseFloat(configHeight[0]) / 100;
          paddingHeight = configHeight[1] === '' ? 0 : parseFloat(configHeight[1]);
        } // Position


        this.setAlign(alignX, alignY);
        this.setPercentage(percentageX, percentageY);
        this.setOffset(offsetX, offsetY); // Size

        this.setSizePercentage(percentageWidth, percentageHeight);
        this.setSizePadding(paddingWidth, paddingHeight);
        var onResizeCallback = o.onResizeCallback;
        var onResizeCallbackScope = o.onResizeCallbackScope;

        if (onResizeCallback !== undefined) {
          this.setResizeCallback(onResizeCallback, onResizeCallbackScope);
        }

        var onUpdateViewportCallback = o.onUpdateViewportCallback;
        var onUpdateViewportCallbackScope = o.onUpdateViewportCallbackScope;

        if (onUpdateViewportCallback !== undefined) {
          this.setUpdateViewportCallback(onUpdateViewportCallback, onUpdateViewportCallbackScope);
        }

        this.autoAnchor(o.enable);
        return this;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.autoAnchor(false);
        this.viewport = undefined;
        this.onUpdateViewportCallback = undefined;
        this.onUpdateViewportCallbackScope = undefined;
        this.onResizeCallback = undefined;
        this.onResizeCallbackScope = undefined;

        _get(_getPrototypeOf(Anchor.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "autoAnchor",
      value: function autoAnchor(enable) {
        if (enable === undefined) {
          enable = true;
        }

        enable = !!enable;

        if (this.autoAnchorEnable === enable) {
          return this;
        }

        if (enable) {
          this.scene.sys.scale.on('resize', this.anchor, this);
          this.anchor();
        } else {
          this.scene.sys.scale.off('resize', this.anchor, this);
        }

        this.autoAnchorEnable = enable;
        return this;
      } // Position

    }, {
      key: "setAlign",
      value: function setAlign(x, y) {
        this.alignX = x;
        this.alignY = y;
        return this;
      }
    }, {
      key: "setPercentage",
      value: function setPercentage(x, y) {
        this.percentageX = x;
        this.percentageY = y;
        return this;
      }
    }, {
      key: "setOffset",
      value: function setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
      } // Size

    }, {
      key: "setSizePercentage",
      value: function setSizePercentage(width, height) {
        this.percentageWidth = width;
        this.percentageHeight = height;
        return this;
      }
    }, {
      key: "setSizePadding",
      value: function setSizePadding(width, height) {
        this.paddingWidth = width;
        this.paddingHeight = height;
        return this;
      }
    }, {
      key: "setResizeCallback",
      value: function setResizeCallback(callback, scope) {
        this.onResizeCallback = callback;
        this.onResizeCallbackScope = scope;
        return this;
      }
    }, {
      key: "setUpdateViewportCallback",
      value: function setUpdateViewportCallback(callback, scope) {
        this.onUpdateViewportCallback = callback;
        this.onUpdateViewportCallbackScope = scope;
        return this;
      }
    }, {
      key: "anchor",
      value: function anchor() {
        this.updateViewport();
        this.updateSize();
        this.updatePosition();
        return this;
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        var callback = this.onResizeCallback,
            scope = this.onResizeCallbackScope;
        var newWidth = this.anchorWidth,
            newHeight = this.anchorHeight;

        if (newWidth === undefined && newHeight === undefined || !callback) {
          return;
        }

        var gameObject = this.parent;

        if (newWidth === undefined) {
          newWidth = gameObject.width;
        }

        if (newHeight === undefined) {
          newHeight = gameObject.height;
        }

        if (scope) {
          callback.call(scope, newWidth, newHeight, gameObject, this);
        } else {
          callback(newWidth, newHeight, gameObject, this);
        }
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        var gameObject = this.parent;

        if (this.alignX === null) {
          gameObject.x = this.anchorX;
        } else if (this.alignX !== undefined) {
          gameObject.x = this.anchorX + gameObject.displayWidth * (gameObject.originX - this.alignX);
        }

        if (this.alignY === null) {
          gameObject.y = this.anchorY;
        } else if (this.alignY !== undefined) {
          gameObject.y = this.anchorY + gameObject.displayHeight * (gameObject.originY - this.alignY);
        }

        return this;
      }
    }, {
      key: "anchorX",
      get: function get() {
        return this.viewport.x + this.viewport.width * this.percentageX + this.offsetX;
      }
    }, {
      key: "anchorY",
      get: function get() {
        return this.viewport.y + this.viewport.height * this.percentageY + this.offsetY;
      }
    }, {
      key: "anchorWidth",
      get: function get() {
        if (this.percentageWidth === undefined) {
          return undefined;
        }

        return this.viewport.width * this.percentageWidth + this.paddingWidth;
      }
    }, {
      key: "anchorHeight",
      get: function get() {
        if (this.percentageHeight === undefined) {
          return undefined;
        }

        return this.viewport.height * this.percentageHeight + this.paddingHeight;
      }
    }, {
      key: "updateViewport",
      value: function updateViewport() {
        var camera = this.parent.scene.cameras.main;
        this.viewport = GetViewport(this.scene, camera, this.viewport);
        var viewport = this.viewport;
        var callback = this.onUpdateViewportCallback,
            scope = this.onUpdateViewportCallbackScope;

        if (callback) {
          if (scope) {
            callback.call(scope, viewport, this.parent, this);
          } else {
            callback(viewport, this.parent, this);
          }
        }
      }
    }]);

    return Anchor;
  }(ComponentBase);

  var SetAnchor = function SetAnchor(config) {
    if (config === undefined) {
      config = {};
    } // Assign default onResizeCallback if not given    


    var hasMinWidth = config.hasOwnProperty('width');
    var hasMinHeight = config.hasOwnProperty('height');
    var hasOnResizeCallback = config.hasOwnProperty('onResizeCallback');

    if ((hasMinWidth || hasMinHeight) && !hasOnResizeCallback) {
      config.onResizeCallback = function (width, height, sizer) {
        if (hasMinWidth) {
          sizer.setMinWidth(width);
        }

        if (hasMinHeight) {
          sizer.setMinHeight(height);
        }

        sizer.layout();
      };
    }

    if (this._anchor === undefined) {
      this._anchor = new Anchor(this, config);
    } else {
      this._anchor.resetFromJSON(config);
    }

    return this;
  };

  var GetValue$12 = Phaser.Utils.Objects.GetValue;

  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);

    var _super = _createSuper(TickTask);

    function TickTask(parent, config) {
      var _this;

      _classCallCheck(this, TickTask);

      _this = _super.call(this, parent, config);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;

      _this.setTickingMode(GetValue$12(config, 'tickingMode', 1)); // boot() later


      return _this;
    } // override


    _createClass(TickTask, [{
      key: "boot",
      value: function boot() {
        if (this.tickingMode === 2 && !this.tickingState) {
          this.startTicking();
        }
      } // override

    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.stop();

        if (this.tickingState) {
          this.stopTicking();
        }

        _get(_getPrototypeOf(TickTask.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTickingMode",
      value: function setTickingMode(mode) {
        if (typeof mode === 'string') {
          mode = TICKINGMODE[mode];
        }

        this.tickingMode = mode;
      } // override

    }, {
      key: "startTicking",
      value: function startTicking() {
        this.tickingState = true;
      } // override

    }, {
      key: "stopTicking",
      value: function stopTicking() {
        this.tickingState = false;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this._isRunning;
      },
      set: function set(value) {
        if (this._isRunning === value) {
          return;
        }

        this._isRunning = value;

        if (this.tickingMode === 1 && value != this.tickingState) {
          if (value) {
            this.startTicking();
          } else {
            this.stopTicking();
          }
        }
      }
    }, {
      key: "start",
      value: function start() {
        this.isPaused = false;
        this.isRunning = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        // Only can ba paused in running state
        if (this.isRunning) {
          this.isPaused = true;
          this.isRunning = false;
        }

        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        // Only can ba resumed in paused state (paused from running state)
        if (this.isPaused) {
          this.isRunning = true;
        }

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.isPaused = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.isPaused = false;
        this.isRunning = false;
        this.emit('complete', this.parent, this);
      }
    }]);

    return TickTask;
  }(ComponentBase);

  var TICKINGMODE = {
    'no': 0,
    'lazy': 1,
    'always': 2
  };

  var GetValue$11 = Phaser.Utils.Objects.GetValue;

  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);

    var _super = _createSuper(SceneUpdateTickTask);

    function SceneUpdateTickTask(parent, config) {
      var _this;

      _classCallCheck(this, SceneUpdateTickTask);

      _this = _super.call(this, parent, config);
      _this.tickEventName = GetValue$11(config, 'tickEventName', 'update');
      return _this;
    }

    _createClass(SceneUpdateTickTask, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "startTicking", this).call(this);

        this.scene.sys.events.on(this.tickEventName, this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off(this.tickEventName, this.update, this);
        }
      } // update(time, delta) {
      //     
      // }

    }]);

    return SceneUpdateTickTask;
  }(TickTask);

  var GetValue$10 = Phaser.Utils.Objects.GetValue;
  var Clamp$6 = Phaser.Math.Clamp;

  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);

      this.resetFromJSON(config);
    }

    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$10(o, 'state', IDLE$6);
        this.timeScale = GetValue$10(o, 'timeScale', 1);
        this.delay = GetValue$10(o, 'delay', 0);
        this.repeat = GetValue$10(o, 'repeat', 0);
        this.repeatCounter = GetValue$10(o, 'repeatCounter', 0);
        this.duration = GetValue$10(o, 'duration', 0);
        this.nowTime = GetValue$10(o, 'nowTime', 0);
        this.justRestart = GetValue$10(o, 'justRestart', false);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          state: this.state,
          timeScale: this.timeScale,
          delay: this.delay,
          repeat: this.repeat,
          repeatCounter: this.repeatCounter,
          duration: this.duration,
          nowTime: this.nowTime,
          justRestart: this.justRestart
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(delay) {
        if (delay === undefined) {
          delay = 0;
        }

        this.delay = delay;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      }
    }, {
      key: "setRepeatInfinity",
      value: function setRepeatInfinity() {
        this.repeat = -1;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.nowTime = this.delay > 0 ? -this.delay : 0;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.repeatCounter = 0;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.state = IDLE$6;
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.state === IDLE$6 || this.state === DONE || delta === 0 || this.timeScale === 0) {
          return;
        }

        this.nowTime += delta * this.timeScale;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.justRestart = false;

        if (this.nowTime >= this.duration) {
          if (this.repeat === -1 || this.repeatCounter < this.repeat) {
            this.repeatCounter++;
            this.justRestart = true;
            this.nowTime -= this.duration;
          } else {
            this.nowTime = this.duration;
            this.state = DONE;
          }
        }
      }
    }, {
      key: "t",
      get: function get() {
        var t;

        switch (this.state) {
          case IDLE$6:
          case DELAY:
            t = 0;
            break;

          case COUNTDOWN:
            t = this.nowTime / this.duration;
            break;

          case DONE:
            t = 1;
            break;
        }

        return Clamp$6(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp$6(value, -1, 1);

        if (value < 0) {
          this.state = DELAY;
          this.nowTime = -this.delay * value;
        } else {
          this.state = COUNTDOWN;
          this.nowTime = this.duration * value;

          if (value === 1 && this.repeat !== 0) {
            this.repeatCounter++;
          }
        }
      }
    }, {
      key: "setT",
      value: function setT(t) {
        this.t = t;
        return this;
      }
    }, {
      key: "isIdle",
      get: function get() {
        return this.state === IDLE$6;
      }
    }, {
      key: "isDelay",
      get: function get() {
        return this.state === DELAY;
      }
    }, {
      key: "isCountDown",
      get: function get() {
        return this.state === COUNTDOWN;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.state === DELAY || this.state === COUNTDOWN;
      }
    }, {
      key: "isDone",
      get: function get() {
        return this.state === DONE;
      }
    }, {
      key: "isOddIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 1;
      }
    }, {
      key: "isEvenIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 0;
      }
    }]);

    return Timer;
  }();

  var IDLE$6 = 0;
  var DELAY = 1;
  var COUNTDOWN = 2;
  var DONE = -1;

  var TimerTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(TimerTickTask, _TickTask);

    var _super = _createSuper(TimerTickTask);

    function TimerTickTask(parent, config) {
      var _this;

      _classCallCheck(this, TimerTickTask);

      _this = _super.call(this, parent, config);
      _this.timer = new Timer(); // boot() later 

      return _this;
    } // override


    _createClass(TimerTickTask, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        _get(_getPrototypeOf(TimerTickTask.prototype), "shutdown", this).call(this, fromScene);

        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "start",
      value: function start() {
        this.timer.start();

        _get(_getPrototypeOf(TimerTickTask.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.timer.stop();

        _get(_getPrototypeOf(TimerTickTask.prototype), "stop", this).call(this);

        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.timer.stop();

        _get(_getPrototypeOf(TimerTickTask.prototype), "complete", this).call(this);

        return this;
      }
    }]);

    return TimerTickTask;
  }(SceneUpdateTickTask);

  var GetValue$$ = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$3 = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

  var EaseValueTaskBase = /*#__PURE__*/function (_TickTask) {
    _inherits(EaseValueTaskBase, _TickTask);

    var _super = _createSuper(EaseValueTaskBase);

    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);

      return _super.apply(this, arguments);
    }

    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$$(o, 'timer'));
        this.setEnable(GetValue$$(o, 'enable', true));
        this.setTarget(GetValue$$(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$3(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$3(o, 'duration', 1000));
        this.setEase(GetValue$$(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$$(o, 'repeat', 0));
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e == undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "setTarget",
      value: function setTarget(target) {
        if (target === undefined) {
          target = this.parent;
        }

        this.target = target;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(time) {
        this.delay = time;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(time) {
        this.duration = time;
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        if (ease === undefined) {
          ease = 'Linear';
        }

        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      } // Override

    }, {
      key: "start",
      value: function start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
          return this;
        }

        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
      }
    }, {
      key: "stop",
      value: function stop(toEnd) {
        if (toEnd === undefined) {
          toEnd = false;
        }

        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "stop", this).call(this);

        if (toEnd) {
          this.timer.setT(1);
          this.updateGameObject(this.target, this.timer);
          this.complete();
        }

        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable || !this.parent.active) {
          return this;
        }

        var target = this.target,
            timer = this.timer;
        timer.update(time, delta); // isDelay, isCountDown, isDone

        if (!timer.isDelay) {
          this.updateGameObject(target, timer);
        }

        this.emit('update', target, this);

        if (timer.isDone) {
          this.complete();
        }

        return this;
      } // Override

    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {}
    }]);

    return EaseValueTaskBase;
  }(TimerTickTask);

  var GetValue$_ = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$7 = Phaser.Math.Linear;

  var Scale = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Scale, _EaseValueTaskBase);

    var _super = _createSuper(Scale);

    function Scale(gameObject, config) {
      var _this;

      _classCallCheck(this, Scale);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
      // this.timer

      _this.scaleStart = {};
      _this.scaleEnd = {};

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Scale, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Scale.prototype), "resetFromJSON", this).call(this, o);

        this.setMode(GetValue$_(o, 'mode', 0));
        this.setScaleRange(GetAdvancedValue$2(o, 'start', undefined), GetAdvancedValue$2(o, 'end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE$3[m];
        }

        this.mode = m;
        return this;
      }
    }, {
      key: "setScaleRange",
      value: function setScaleRange(start, end) {
        if (typeof start === 'number') {
          this.startX = start;
          this.startY = start;
        } else {
          this.startX = GetAdvancedValue$2(start, 'x', this.parent.scaleX);
          this.startY = GetAdvancedValue$2(start, 'y', this.parent.scaleY);
        }

        if (typeof end === 'number') {
          this.endX = end;
          this.endY = end;
        } else {
          this.endX = GetAdvancedValue$2(end, 'x', undefined);
          this.endY = GetAdvancedValue$2(end, 'y', undefined);
        }

        this.hasScaleX = this.startX !== undefined && this.endX !== undefined;
        this.hasScaleY = this.startY !== undefined && this.endY !== undefined;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }

        var gameObject = this.parent;

        if (this.hasScaleX) {
          gameObject.scaleX = this.startX;
        }

        if (this.hasScaleY) {
          gameObject.scaleY = this.startY;
        }

        var repeat = this.repeat;

        if (this.mode === 2) {
          // Yoyo
          if (repeat !== -1) {
            repeat = (repeat + 1) * 2 - 1;
          }
        }

        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(repeat);

        _get(_getPrototypeOf(Scale.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;

        if (timer.isOddIteration) {
          // Yoyo
          t = 1 - t;
        }

        t = this.easeFn(t);

        if (this.hasScaleX) {
          gameObject.scaleX = Linear$7(this.startX, this.endX, t);
        }

        if (this.hasScaleY) {
          gameObject.scaleY = Linear$7(this.startY, this.endY, t);
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Scale.prototype), "complete", this).call(this);

        if (this.mode === 1) {
          this.parent.destroy(); // Will also destroy this behavior
        }

        return this;
      }
    }]);

    return Scale;
  }(EaseValueTaskBase);

  var MODE$3 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var PopUp$1 = function PopUp(gameObject, duration, orientation, ease, scale) {
    if (ease === undefined) {
      ease = 'Cubic';
    } // Ease scale from 0 to current scale


    var start, end;

    switch (orientation) {
      case 0:
      case 'x':
        start = {
          x: 0
        };
        end = {
          x: gameObject.scaleX
        };
        break;

      case 1:
      case 'y':
        start = {
          y: 0
        };
        end = {
          y: gameObject.scaleY
        };
        break;

      default:
        start = 0;
        end = gameObject.scale;
        break;
    }

    var config = {
      mode: 0,
      start: start,
      end: end,
      duration: duration,
      ease: ease
    };

    if (scale === undefined) {
      scale = new Scale(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }

    scale.restart();
    return scale;
  };

  var ScaleDownDestroy = function ScaleDownDestroy(gameObject, duration, orientation, ease, destroyMode, scale) {
    if (ease === undefined) {
      ease = 'Linear';
    } // Ease from current scale to 0


    if (destroyMode instanceof Scale) {
      scale = destroyMode;
      destroyMode = undefined;
    }

    if (destroyMode === undefined) {
      destroyMode = true;
    }

    var config = {};
    config.mode = destroyMode ? 1 : 0;

    switch (orientation) {
      case 0:
      case 'x':
        config.end = {
          x: 0
        };
        break;

      case 1:
      case 'y':
        config.end = {
          y: 0
        };
        break;

      default:
        config.end = 0;
        break;
    }

    config.duration = duration;
    config.ease = ease;

    if (scale === undefined) {
      scale = new Scale(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }

    scale.restart();
    return scale;
  };

  var Yoyo = function Yoyo(gameObject, duration, peakValue, repeat, orientation, ease, scale) {
    if (peakValue === undefined) {
      peakValue = 1.2;
    }

    if (repeat === undefined) {
      repeat = 0;
    }

    if (ease === undefined) {
      ease = 'Cubic';
    } // Ease scale from 0 to current scale


    var start, end;

    switch (orientation) {
      case 0:
      case 'x':
        start = {
          x: gameObject.scaleX
        };
        end = {
          x: peakValue
        };
        break;

      case 1:
      case 'y':
        start = {
          y: gameObject.scaleX
        };
        end = {
          y: peakValue
        };
        break;

      default:
        start = gameObject.scaleX;
        end = peakValue;
        break;
    }

    var config = {
      mode: 2,
      start: start,
      end: end,
      duration: duration / 2,
      ease: ease,
      repeat: repeat
    };

    if (scale === undefined) {
      scale = new Scale(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }

    scale.restart();
    return scale;
  };

  var WaitEvent = function WaitEvent(eventEmitter, eventName) {
    return new Promise(function (resolve, reject) {
      eventEmitter.once(eventName, function () {
        resolve();
      });
    });
  };

  var WaitComplete = function WaitComplete(eventEmitter) {
    return WaitEvent(eventEmitter, 'complete');
  };

  var IsPlainObject$g = Phaser.Utils.Objects.IsPlainObject;

  var OnInitScale = function OnInitScale(gameObject, scale) {
    // Route 'complete' of scale to gameObject
    scale.completeEventName = undefined;
    scale.on('complete', function () {
      if (scale.completeEventName) {
        gameObject.emit(scale.completeEventName, gameObject);
        scale.completeEventName = undefined;
      }
    }); // Update local state

    scale.on('update', function () {
      var parent = gameObject.getParentSizer();

      if (parent) {
        parent.resetChildPositionState(gameObject);
      }
    });
  };

  var ScaleMethods = {
    popUp: function popUp(duration, orientation, ease) {
      if (IsPlainObject$g(duration)) {
        var config = duration;
        duration = config.duration;
        orientation = config.orientation;
        ease = config.ease;
      }

      var isInit = this._scale === undefined;
      this._scale = PopUp$1(this, duration, orientation, ease, this._scale);

      if (isInit) {
        OnInitScale(this, this._scale);
      }

      this._scale.completeEventName = 'popup.complete';
      return this;
    },
    popUpPromise: function popUpPromise(duration, orientation, ease) {
      this.popUp(duration, orientation, ease);
      return WaitComplete(this._scale);
    },
    scaleDownDestroy: function scaleDownDestroy(duration, orientation, ease, destroyMode) {
      if (IsPlainObject$g(duration)) {
        var config = duration;
        duration = config.duration;
        orientation = config.orientation;
        ease = config.ease;
        destroyMode = config.destroy;
      }

      var isInit = this._scale === undefined;
      this._scale = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scale);

      if (isInit) {
        OnInitScale(this, this._scale);
      }

      this._scale.completeEventName = 'scaledown.complete';
      return this;
    },
    scaleDownDestroyPromise: function scaleDownDestroyPromise(duration, orientation, ease, destroyMode) {
      this.scaleDownDestroy(duration, orientation, ease, destroyMode);
      return WaitComplete(this._scale);
    },
    scaleDown: function scaleDown(duration, orientation, ease) {
      this.scaleDownDestroy(duration, orientation, ease, false);
      return this;
    },
    scaleDownPromise: function scaleDownPromise(duration, orientation, ease) {
      this.scaleDown(duration, orientation, ease);
      return WaitComplete(this._scale);
    },
    scaleYoyo: function scaleYoyo(duration, peakValue, repeat, orientation, ease) {
      if (IsPlainObject$g(duration)) {
        var config = duration;
        duration = config.duration;
        peakValue = config.peakValue;
        repeat = config.repeat;
        orientation = config.orientation;
        ease = config.ease;
      }

      var isInit = this._scale === undefined;
      this._scale = Yoyo(this, duration, peakValue, repeat, orientation, ease, this._scale);

      if (isInit) {
        OnInitScale(this, this._scale);
      }

      this._scale.completeEventName = 'scaleyoyo.complete';
      return this;
    },
    scaleYoyoPromise: function scaleYoyoPromise(duration, peakValue, repeat, orientation, ease) {
      this.scaleYoyo(duration, peakValue, repeat, orientation, ease);
      return WaitComplete(this._scale);
    }
  };

  var GetValue$Z = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$6 = Phaser.Math.Linear;

  var Fade = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Fade, _EaseValueTaskBase);

    var _super = _createSuper(Fade);

    function Fade(gameObject, config) {
      var _this;

      _classCallCheck(this, Fade);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Fade, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Fade.prototype), "resetFromJSON", this).call(this, o);

        this.setMode(GetValue$Z(o, 'mode', 0));
        this.setAlphaRange(GetAdvancedValue$1(o, 'start', this.parent.alpha), GetAdvancedValue$1(o, 'end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE$2[m];
        }

        this.mode = m;
        return this;
      }
    }, {
      key: "setAlphaRange",
      value: function setAlphaRange(start, end) {
        this.alphaStart = start;
        this.alphaEnd = end;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }

        var gameObject = this.parent;
        gameObject.setAlpha(this.alphaStart);
        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(this.mode === 2 ? -1 : 0);

        _get(_getPrototypeOf(Fade.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;

        if (timer.isOddIteration) {
          // Yoyo
          t = 1 - t;
        }

        gameObject.alpha = Linear$6(this.alphaStart, this.alphaEnd, t);
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Fade.prototype), "complete", this).call(this);

        if (this.mode === 1) {
          this.parent.destroy(); // Will also destroy this behavior
        }

        return this;
      }
    }]);

    return Fade;
  }(EaseValueTaskBase);

  var MODE$2 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var IsPlainObject$f = Phaser.Utils.Objects.IsPlainObject;

  var FadeIn = function FadeIn(gameObject, duration, alpha, fade) {
    var startAlpha, endAlpha;

    if (IsPlainObject$f(alpha)) {
      startAlpha = alpha.start;
      endAlpha = alpha.end;
    } else {
      endAlpha = alpha;
    }

    if (startAlpha === undefined) {
      startAlpha = 0;
    }

    if (endAlpha === undefined) {
      endAlpha = 1;
    }

    var config = {
      mode: 0,
      start: startAlpha,
      end: endAlpha,
      duration: duration
    };

    if (fade === undefined) {
      fade = new Fade(gameObject, config);
    } else {
      fade.resetFromJSON(config);
    }

    fade.restart();
    return fade;
  };

  var FadeOutDestroy = function FadeOutDestroy(gameObject, duration, destroyMode, fade) {
    if (destroyMode instanceof Fade) {
      fade = destroyMode;
      destroyMode = undefined;
    }

    if (destroyMode === undefined) {
      destroyMode = true;
    }

    var config = {
      mode: destroyMode ? 1 : 0,
      end: 0,
      duration: duration
    };

    if (fade === undefined) {
      fade = new Fade(gameObject, config);
    } else {
      fade.resetFromJSON(config);
    }

    fade.restart();
    return fade;
  };

  var IsPlainObject$e = Phaser.Utils.Objects.IsPlainObject;

  var OnInitFade = function OnInitFade(gameObject, fade) {
    // Route 'complete' of fade to gameObject
    fade.completeEventName = undefined;
    fade.on('complete', function () {
      if (fade.completeEventName) {
        gameObject.emit(fade.completeEventName, gameObject);
        fade.completeEventName = undefined;
      }
    }); // Update local state

    fade.on('update', function () {
      var parent = gameObject.getParentSizer();

      if (parent) {
        parent.resetChildAlphaState(gameObject);
      }
    });
  };

  var FadeMethods = {
    fadeIn: function fadeIn(duration, alpha) {
      if (IsPlainObject$e(duration)) {
        var config = duration;
        duration = config.duration;
        alpha = config.alpha;
      }

      var isInit = this._fade === undefined;
      this._fade = FadeIn(this, duration, alpha, this._fade);

      if (isInit) {
        OnInitFade(this, this._fade);
      }

      this._fade.completeEventName = 'fadein.complete';
      return this;
    },
    fadeInPromise: function fadeInPromise(duration, alpha) {
      this.fadeIn(duration, alpha);
      return WaitComplete(this._fade);
    },
    fadeOutDestroy: function fadeOutDestroy(duration, destroyMode) {
      if (IsPlainObject$e(duration)) {
        var config = duration;
        duration = config.duration;
        destroyMode = config.destroy;
      }

      var isInit = this._fade === undefined;
      this._fade = FadeOutDestroy(this, duration, destroyMode, this._fade);

      if (isInit) {
        OnInitFade(this, this._fade);
      }

      this._fade.completeEventName = 'fadeout.complete';
      return this;
    },
    fadeOutDestroyPromise: function fadeOutDestroyPromise(duration, destroyMode) {
      this.fadeOutDestroy(duration, destroyMode);
      return WaitComplete(this._fade);
    },
    fadeOut: function fadeOut(duration) {
      this.fadeOutDestroy(duration, false);
      return this;
    },
    fadeOutPromise: function fadeOutPromise(duration) {
      this.fadeOut(duration);
      return WaitComplete(this._fade);
    }
  };

  var GetValue$Y = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$5 = Phaser.Math.Linear;

  var EaseMove = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(EaseMove, _EaseValueTaskBase);

    var _super = _createSuper(EaseMove);

    function EaseMove(gameObject, config) {
      var _this;

      _classCallCheck(this, EaseMove);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(EaseMove, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(EaseMove.prototype), "resetFromJSON", this).call(this, o);

        this.setMode(GetValue$Y(o, 'mode', 0));

        if (o && (o.hasOwnProperty('x') || o.hasOwnProperty('y'))) {
          var endX = GetAdvancedValue(o, 'x', undefined);
          var endY = GetAdvancedValue(o, 'y', undefined);
          this.setTargetPosition(endX, endY);
        } else {
          this.setTargetPosition(o);
        }

        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE$1[m];
        }

        this.mode = m;
        return this;
      }
    }, {
      key: "setTargetPosition",
      value: function setTargetPosition(x, y) {
        if (typeof x === 'number' || typeof y === 'number') {
          // endX, endY
          // x,y : a number, or undefined
          this.startX = this.parent.x;
          this.startY = this.parent.y;
          this.endX = x;
          this.endY = y;
        } else {
          var config = x;
          this.startX = GetAdvancedValue(config, 'startX', undefined);
          this.startY = GetAdvancedValue(config, 'startY', undefined);
          this.endX = GetAdvancedValue(config, 'endX', undefined);
          this.endY = GetAdvancedValue(config, 'endY', undefined);
        }

        this.hasMoveX = this.startX !== undefined && this.endX !== undefined;
        this.hasMoveY = this.startY !== undefined && this.endY !== undefined;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }

        var gameObject = this.parent;

        if (this.hasMoveX) {
          gameObject.x = this.startX;
        }

        if (this.hasMoveY) {
          gameObject.y = this.startY;
        }

        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(this.mode === 2 ? -1 : 0);

        _get(_getPrototypeOf(EaseMove.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;

        if (timer.isOddIteration) {
          // Yoyo
          t = 1 - t;
        }

        t = this.easeFn(t);

        if (this.hasMoveX) {
          gameObject.x = Linear$5(this.startX, this.endX, t);
        }

        if (this.hasMoveY) {
          gameObject.y = Linear$5(this.startY, this.endY, t);
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(EaseMove.prototype), "complete", this).call(this);

        if (this.mode === 1) {
          this.parent.destroy(); // Will also destroy this behavior
        }

        return this;
      }
    }]);

    return EaseMove;
  }(EaseValueTaskBase);

  var MODE$1 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var ParseValue = function ParseValue(propertyValue, startValue) {
    // propertyValue : number or string
    if (typeof propertyValue === 'number') {
      return propertyValue;
    } else {
      var op = propertyValue[0];
      var num = parseFloat(propertyValue.substr(2));

      switch (op) {
        case '+':
          return startValue + num;

        case '-':
          return startValue - num;

        case '*':
          return startValue * num;

        case '/':
          return startValue / num;
      }
    }
  };

  var EaseMoveTo = function EaseMoveTo(gameObject, duration, endX, endY, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
      easeMove = destroyMode;
      destroyMode = undefined;
    }

    if (destroyMode === undefined) {
      destroyMode = false;
    }

    var config = {};
    config.mode = destroyMode ? 1 : 0;

    if (endX !== undefined) {
      config.startX = gameObject.x;
      config.endX = ParseValue(endX, gameObject.x);
    }

    if (endY !== undefined) {
      config.startY = gameObject.y;
      config.endY = ParseValue(endY, gameObject.y);
    }

    config.duration = duration;
    config.ease = ease === undefined ? 'Linear' : ease;

    if (easeMove === undefined) {
      easeMove = new EaseMove(gameObject, config);
    } else {
      easeMove.resetFromJSON(config);
    }

    easeMove.restart();
    return easeMove;
  };

  var EaseMoveFrom = function EaseMoveFrom(gameObject, duration, startX, startY, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
      easeMove = destroyMode;
      destroyMode = undefined;
    }

    if (destroyMode === undefined) {
      destroyMode = false;
    }

    var config = {};
    config.mode = destroyMode ? 1 : 0;

    if (startX !== undefined) {
      config.startX = ParseValue(startX, gameObject.x);
      config.endX = gameObject.x;
    }

    if (startY !== undefined) {
      config.startY = ParseValue(startY, gameObject.y);
      config.endY = gameObject.y;
    }

    config.duration = duration;
    config.ease = ease === undefined ? 'Linear' : ease;

    if (easeMove === undefined) {
      easeMove = new EaseMove(gameObject, config);
    } else {
      easeMove.resetFromJSON(config);
    }

    easeMove.restart();
    return easeMove;
  };

  var IsPlainObject$d = Phaser.Utils.Objects.IsPlainObject;
  var DistanceBetween$5 = Phaser.Math.Distance.Between;

  var OnInitEaseMove = function OnInitEaseMove(gameObject, easeMove) {
    // Route 'complete' of easeMove to gameObject
    easeMove.completeEventName = undefined;
    easeMove.on('complete', function () {
      if (easeMove.completeEventName) {
        gameObject.emit(easeMove.completeEventName, gameObject);
        easeMove.completeEventName = undefined;
      }
    }); // Update local state

    easeMove.on('update', function () {
      var parent = gameObject.getParentSizer();

      if (parent) {
        parent.resetChildPositionState(gameObject);
      }
    });
  };

  var EaseMoveMethods = {
    moveFrom: function moveFrom(duration, x, y, ease, destroyMode) {
      if (IsPlainObject$d(duration)) {
        var config = duration;
        x = config.x;
        y = config.y;

        if (config.hasOwnProperty('speed')) {
          duration = DistanceBetween$5(x, y, this.x, this.y) * 1000 / config.speed;
        } else {
          duration = config.duration;
        }

        ease = config.ease;
      }

      var isInit = this._easeMove === undefined;
      this._easeMove = EaseMoveFrom(this, duration, x, y, ease, destroyMode, this._easeMove);

      if (isInit) {
        OnInitEaseMove(this, this._easeMove);
      }

      this._easeMove.completeEventName = 'movefrom.complete';
      return this;
    },
    moveFromPromise: function moveFromPromise(duration, x, y, ease, destroyMode) {
      this.moveFrom(duration, x, y, ease, destroyMode);
      return WaitComplete(this._easeMove);
    },
    moveFromDestroy: function moveFromDestroy(duration, x, y, ease) {
      this.moveFrom(duration, x, y, ease, true);
      return this;
    },
    moveFromDestroyPromise: function moveFromDestroyPromise(duration, x, y, ease) {
      this.moveFromDestroy(duration, x, y, ease);
      return WaitComplete(this._easeMove);
    },
    moveTo: function moveTo(duration, x, y, ease, destroyMode) {
      if (IsPlainObject$d(duration)) {
        var config = duration;
        x = config.x;
        y = config.y;

        if (config.hasOwnProperty('speed')) {
          duration = DistanceBetween$5(x, y, this.x, this.y) * 1000 / config.speed;
        } else {
          duration = config.duration;
        }

        ease = config.ease;
      }

      var isInit = this._easeMove === undefined;
      this._easeMove = EaseMoveTo(this, duration, x, y, ease, destroyMode, this._easeMove);

      if (isInit) {
        OnInitEaseMove(this, this._easeMove);
      }

      this._easeMove.completeEventName = 'moveto.complete';
      return this;
    },
    moveToPromise: function moveToPromise(duration, x, y, ease, destroyMode) {
      this.moveTo(duration, x, y, ease, destroyMode);
      return WaitComplete(this._easeMove);
    },
    moveToDestroy: function moveToDestroy(duration, x, y, ease) {
      this.moveTo(duration, x, y, ease, true);
      return this;
    },
    moveToDestroyPromise: function moveToDestroyPromise(duration, x, y, ease) {
      this.moveToDestroy(duration, x, y, ease, true);
      return WaitComplete(this._easeMove);
    },
    moveStop: function moveStop(toEnd) {
      if (!this._easeMove) {
        return this;
      }

      this._easeMove.stop(toEnd);

      return this;
    }
  };

  var GetValue$X = Phaser.Utils.Objects.GetValue;

  var ShakePosition = /*#__PURE__*/function (_TickTask) {
    _inherits(ShakePosition, _TickTask);

    var _super = _createSuper(ShakePosition);

    function ShakePosition(gameObject, config) {
      var _this;

      _classCallCheck(this, ShakePosition);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this.timer = new Timer();

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(ShakePosition, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$X(o, 'timer'));
        this.setEnable(GetValue$X(o, 'enable', true));
        this.setMode(GetValue$X(o, 'mode', 1));
        this.isRunning = GetValue$X(o, 'isRunning', false);
        this.setMagnitudeMode(GetValue$X(o, 'magnitudeMode', 1));
        this.setDuration(GetValue$X(o, 'duration', 500));
        this.setMagnitude(GetValue$X(o, 'magnitude', 10));
        this.ox = GetValue$X(o, 'ox', undefined);
        this.oy = GetValue$X(o, 'oy', undefined);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          timer: this.timer.toJSON(),
          enable: this.enable,
          mode: this.mode,
          isRunning: this.isRunning,
          magnitudeMode: magnitudeMode,
          duration: this.duration,
          magnitude: this.magnitude,
          ox: this.ox,
          oy: this.oy
        };
      } // override

    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        _get(_getPrototypeOf(ShakePosition.prototype), "shutdown", this).call(this, fromScene);

        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(ShakePosition.prototype), "startTicking", this).call(this);

        if (this.mode === 0) {
          // Effect mode
          this.scene.game.events.on('poststep', this.update, this);
          this.scene.game.events.on('prestep', this.backToOrigin, this);
        } else {
          // Behavior Mode
          this.scene.sys.events.on('preupdate', this.update, this);
        }
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(ShakePosition.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          if (this.mode === 0) {
            // Effect mode
            this.scene.game.events.off('poststep', this.update, this);
            this.scene.game.events.off('prestep', this.backToOrigin, this);
          } else {
            // Behavior Mode
            this.scene.sys.events.off('preupdate', this.update, this);
          }
        }
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e == undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(mode) {
        if (typeof mode === 'string') {
          mode = MODE[mode];
        }

        this.mode = mode;
        return this;
      }
    }, {
      key: "setMagnitudeMode",
      value: function setMagnitudeMode(magnitudeMode) {
        if (typeof magnitudeMode === 'string') {
          magnitudeMode = MANITUDEMODE[magnitudeMode];
        }

        this.magnitudeMode = magnitudeMode;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setMagnitude",
      value: function setMagnitude(magnitude) {
        this.magnitude = magnitude;
        return this;
      }
    }, {
      key: "start",
      value: function start(duration, magnitude) {
        if (typeof duration !== 'number') {
          var config = duration;
          magnitude = GetValue$X(config, 'magnitude', undefined);
          duration = GetValue$X(config, 'duration', undefined);
        }

        if (magnitude !== undefined) {
          this.setMagnitude(magnitude);
        }

        if (duration !== undefined) {
          this.setDuration(duration);
        }

        this.timer.setDuration(this.duration).start();

        _get(_getPrototypeOf(ShakePosition.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "shake",
      value: function shake(duration, magnitude) {
        this.start(duration, magnitude);
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable) {
          return this;
        }

        var gameObject = this.parent;

        if (!gameObject.active) {
          return this;
        }

        this.timer.update(time, delta);

        if (this.timer.isDone) {
          this.backToOrigin();
          this.complete();
        } else {
          if (this.ox === undefined) {
            this.ox = gameObject.x;
            this.oy = gameObject.y;
          }

          var magnitude = this.magnitude;

          if (this.magnitudeMode === 1) // decay
            {
              magnitude *= 1 - this.timer.t;
            }

          var a = Math.random() * Math.PI * 2;
          var offsetX = Math.cos(a) * magnitude;
          var offsetY = Math.sin(a) * magnitude;
          gameObject.setPosition(this.ox + offsetX, this.oy + offsetY);
        }

        return this;
      }
    }, {
      key: "backToOrigin",
      value: function backToOrigin() {
        if (!this.isRunning || !this.enable) {
          return this;
        }

        if (this.ox === undefined) {
          return this;
        }

        var gameObject = this.parent;

        if (this.ox === gameObject.x && this.oy === gameObject.y) {
          return this;
        }

        gameObject.setPosition(this.ox, this.oy);
        this.ox = undefined;
        this.oy = undefined;
        return this;
      }
    }]);

    return ShakePosition;
  }(TickTask);

  var MODE = {
    effect: 0,
    behavior: 1
  };
  var MANITUDEMODE = {
    constant: 0,
    decay: 1
  };

  var IsPlainObject$c = Phaser.Utils.Objects.IsPlainObject;

  var OnInitShake = function OnInitShake(gameObject, shake) {
    // Route 'complete' of shake to gameObject
    shake.on('complete', function () {
      gameObject.emit('shake.complete', gameObject);
    }); // Shake effect won't change position
  };

  var ShakeMethods = {
    shake: function shake(duration, magnitude, magnitudeMode) {
      if (IsPlainObject$c(duration)) {
        var config = duration;
        duration = config.duration;
        magnitude = config.magnitude;
        magnitudeMode = config.magnitudeMode;
      }

      if (this._shake === undefined) {
        this._shake = new ShakePosition(this, {
          mode: 0,
          magnitudeMode: 1
        });
        OnInitShake(this, this._shake);
      }

      if (duration !== undefined) {
        this._shake.setDuration(duration);
      }

      if (magnitude !== undefined) {
        this._shake.setMagnitude(magnitude);
      }

      if (magnitudeMode !== undefined) {
        this._shake.setMagnitudeMode(magnitudeMode);
      }

      this._shake.shake();

      return this;
    },
    shakePromise: function shakePromise(duration, alpha) {
      this.shake(duration, alpha);
      return WaitComplete(this._shake);
    }
  };

  var GetValue$W = Phaser.Utils.Objects.GetValue;
  var Linear$4 = Phaser.Math.Linear;

  var EaseValueTask = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(EaseValueTask, _EaseValueTaskBase);

    var _super = _createSuper(EaseValueTask);

    function EaseValueTask(gameObject, config) {
      var _this;

      _classCallCheck(this, EaseValueTask);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON();

      _this.boot();

      return _this;
    }

    _createClass(EaseValueTask, [{
      key: "start",
      value: function start(config) {
        if (this.timer.isRunning) {
          return this;
        }

        var target = this.target;
        this.propertyKey = GetValue$W(config, 'key', 'value');
        var currentValue = target[this.propertyKey];
        this.fromValue = GetValue$W(config, 'from', currentValue);
        this.toValue = GetValue$W(config, 'to', currentValue);
        this.setEase(GetValue$W(config, 'ease', this.ease));
        this.setDuration(GetValue$W(config, 'duration', this.duration));
        this.timer.setDuration(this.duration);
        target[this.propertyKey] = this.fromValue;

        _get(_getPrototypeOf(EaseValueTask.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {
        var t = timer.t;
        t = this.easeFn(t);
        target[this.propertyKey] = Linear$4(this.fromValue, this.toValue, t);
      }
    }]);

    return EaseValueTask;
  }(EaseValueTaskBase);

  var IsPlainObject$b = Phaser.Utils.Objects.IsPlainObject;

  var EaseData = /*#__PURE__*/function (_ComponentBase) {
    _inherits(EaseData, _ComponentBase);

    var _super = _createSuper(EaseData);

    function EaseData(parent, config) {
      var _this;

      _classCallCheck(this, EaseData);

      _this = _super.call(this, parent, config);

      _this.parent.setDataEnabled();

      _this.easeTasks = {};
      return _this;
    }

    _createClass(EaseData, [{
      key: "complete",
      value: function complete(key) {
        this.emit("complete-".concat(key), this.parent, this);
        this.emit('complete', key, this.parent, this);
      }
    }, {
      key: "getEaseTask",
      value: function getEaseTask(key) {
        var easeTask = this.easeTasks[key];

        if (easeTask === undefined) {
          easeTask = new EaseValueTask(this.parent);
          this.easeTasks[key] = easeTask;
          easeTask.setTarget(this.parent.data.values).on('complete', function () {
            this.complete(key);
          }, this);
        }

        return easeTask;
      }
    }, {
      key: "easeTo",
      value: function easeTo(key, value, duration, ease) {
        if (IsPlainObject$b(key)) {
          var config = key;
          key = config.key;
          value = config.value;
          duration = config.duration;
          ease = config.ease;
          var speed = config.speed;

          if (duration === undefined && speed !== undefined) {
            duration = Math.abs(value - this.parent.data.values[key]) / speed * 1000;
          }
        }

        if (duration === undefined) {
          duration = 1000;
        }

        if (ease === undefined) {
          ease = 'Linear';
        }

        var easeTask = this.getEaseTask(key);
        easeTask.restart({
          key: key,
          to: value,
          duration: duration,
          ease: ease
        });
        return this;
      }
    }, {
      key: "easeFrom",
      value: function easeFrom(key, value, duration, ease) {
        if (IsPlainObject$b(key)) {
          var config = key;
          key = config.key;
          value = config.value;
          duration = config.duration;
          ease = config.ease;
          var speed = config.speed;

          if (duration === undefined && speed !== undefined) {
            duration = Math.abs(value - this.parent.data.values[key]) / speed * 1000;
          }
        }

        if (duration === undefined) {
          duration = 1000;
        }

        if (ease === undefined) {
          ease = 'Linear';
        }

        var easeTask = this.getEaseTask(key);
        easeTask.restart({
          key: key,
          from: value,
          duration: duration,
          ease: ease
        });
        return this;
      }
    }, {
      key: "stopEase",
      value: function stopEase(key, toEnd) {
        if (toEnd === undefined) {
          toEnd = true;
        }

        var easeTask = this.easeTasks[key];

        if (easeTask) {
          easeTask.stop(toEnd);
        }

        return this;
      }
    }, {
      key: "stopAll",
      value: function stopAll(toEnd) {
        if (toEnd === undefined) {
          toEnd = true;
        }

        for (var key in this.easeTasks) {
          this.stopEase(key, toEnd);
        }

        return this;
      }
    }]);

    return EaseData;
  }(ComponentBase);

  var OnInitEaseData = function OnInitEaseData(gameObject, easeData) {
    // Route 'complete' of easeData to gameObject
    easeData.on('complete', function (key) {
      gameObject.emit("easedata.".concat(key, ".complete"), gameObject);
      gameObject.emit('easedata.complete', key, gameObject);
    });
  };

  var EaseDataMethods = {
    easeDataTo: function easeDataTo(key, value, duration, ease) {
      if (!this._easeData) {
        this._easeData = new EaseData(this);
        OnInitEaseData(this, this._easeData);
      }

      this._easeData.easeTo(key, value, duration, ease);

      return this;
    },
    easeDataToPromise: function easeDataToPromise(key, value, duration, ease) {
      this.easeDataTo(key, value, duration, ease);
      return WaitEvent(this._easeData, "complete-".concat(key));
    },
    stopEaseData: function stopEaseData(key, toEnd) {
      if (!this._easeData) {
        return this;
      }

      this._easeData.stopEase(key, toEnd);

      return this;
    },
    stopAllEaseData: function stopAllEaseData(toEnd) {
      if (!this._easeData) {
        return this;
      }

      this._easeData.stopAll(toEnd);

      return this;
    }
  };

  var Show = function Show(gameObject) {
    _hide(gameObject, false);
  };

  var Hide = function Hide(gameObject) {
    _hide(gameObject, true);
  };

  var IsShown = function IsShown(gameObject) {
    if (!gameObject) {
      return false;
    }

    var config = GetSizerConfig(gameObject);
    return !config.hidden;
  };

  var _hide = function _hide(gameObject, hidden) {
    if (!gameObject) {
      return;
    }

    var config = GetSizerConfig(gameObject);
    config.hidden = hidden;
    var parent = GetParent(gameObject);

    if (parent) {
      parent.setChildVisible(gameObject, !hidden);
    } else {
      gameObject.setVisible(!hidden);
    }
  };

  var HideMethods = {
    show: function show(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }

      Show(gameObject);
      return this;
    },
    hide: function hide(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }

      Hide(gameObject);
      return this;
    },
    isShow: function isShow(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }

      return IsShown(gameObject);
    }
  };

  var IsPointInBounds = function IsPointInBounds(gameObject, x, y, preTest, postTest) {
    // Can't get bounds
    if (!gameObject || !gameObject.getBounds) {
      return false;
    }

    if (preTest && !preTest(gameObject, x, y)) {
      return false;
    }

    var boundsRect = GetBounds(gameObject, true);

    if (!boundsRect.contains(x, y)) {
      return false;
    }

    if (postTest && !postTest(gameObject, x, y)) {
      return false;
    }

    return true;
  };

  var IsPointerInBounds = function IsPointerInBounds(gameObject, pointer, preTest, postTest) {
    if (pointer) {
      return IsPointInBounds(gameObject, pointer.worldX, pointer.worldY, preTest, postTest);
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers;

      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];

        if (IsPointInBounds(gameObject, pointer.worldX, pointer.worldY, preTest, postTest)) {
          return true;
        }
      }

      return false;
    }
  };

  var IsInTouching = function IsInTouching(pointer, gameObject) {
    if (gameObject === undefined) {
      gameObject = this;
    }

    return IsPointerInBounds(gameObject, pointer);
  };

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
  };

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var ContainsPoint = function ContainsPoint(gameObject, x, y, preTest, postTest) {
    return IsPointInBounds(gameObject, x, y, GetPreTestCallback(preTest), GetPostTestCallback(postTest));
  };

  var IsNotHiddenSizer = function IsNotHiddenSizer(gameObject) {
    var isHiddenSizer = gameObject.rexSizer && gameObject.rexSizer.hidden;
    return !isHiddenSizer;
  };

  var GetPreTestCallback = function GetPreTestCallback(preTest) {
    if (!preTest) {
      return IsNotHiddenSizer;
    }

    return function (gameObject, x, y) {
      if (!IsNotHiddenSizer(gameObject)) {
        return false;
      }

      preTest(gameObject, x, y);
      return true;
    };
  };

  var GetPostTestCallback = function GetPostTestCallback(postTest) {
    return postTest;
  };

  var PointToChild$1 = function PointToChild(x, y, preTest, postTest, children) {
    if (!IsFunction(preTest)) {
      children = preTest;
      preTest = undefined;
      postTest = undefined;
    }

    if (children === undefined) {
      if (this.sizerChildren) {
        children = this.sizerChildren;
      } else {
        children = this.children;
      }
    }

    if (IsArray(children)) {
      var child;

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (ContainsPoint(child, x, y, preTest, postTest)) {
          return child;
        }
      }
    } else {
      var child;

      for (var key in children) {
        child = children[key];

        if (ContainsPoint(child, x, y, preTest, postTest)) {
          return child;
        }
      }
    }

    return null;
  };

  var GetParentSizerMethods = {
    getParentSizer: function getParentSizer(gameObject, name) {
      return this.getParent(gameObject, name);
    },
    getTopmostSizer: function getTopmostSizer(gameObject) {
      return this.getTopmostParent(gameObject);
    }
  };

  var ResizeGameObject = function ResizeGameObject(gameObject, newWidth, newHeight) {
    if (!gameObject || newWidth === undefined && newHeight === undefined) {
      return;
    }

    if (gameObject.resize) {
      // Has `resize` method
      if (newWidth === undefined) {
        newWidth = gameObject.width;
      }

      if (newHeight === undefined) {
        newHeight = gameObject.height;
      }

      gameObject.resize(newWidth, newHeight);
    } else {
      // Set display width/height
      if (newWidth !== undefined) {
        gameObject.displayWidth = newWidth;
      }

      if (newHeight !== undefined) {
        gameObject.displayHeight = newHeight;
      }
    }
  };

  var CopyState = function CopyState(gamObject, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = GlobState;
    }

    out.x = gamObject.x;
    out.y = gamObject.y;
    out.scaleX = gamObject.scaleX;
    out.scaleY = gamObject.scaleY;
    out.width = gamObject.width;
    out.height = gamObject.height;
    out.displayWidth = gamObject.displayWidth;
    out.displayHeight = gamObject.displayHeight;
    return out;
  };

  var GlobState = {};

  var PreLayoutChild = function PreLayoutChild(child) {
    if (this.sizerEventsEnable) {
      CopyState(child, this.getChildPrevState(child));
      this.layoutedChildren.push(child);
    }
  };

  var LayoutChild = function LayoutChild(child, x, y, width, height, align, offsetX, offsetY) {
    AlignIn(child, x, y, width, height, align);

    if (offsetX !== undefined) {
      child.x += offsetX;
    }

    if (offsetY !== undefined) {
      child.y += offsetY;
    }

    this.resetChildPositionState(child);

    if (this.sizerEventsEnable) {
      child.emit('sizer.postlayout', child, this);
    }
  };

  var ALIGN_CENTER$4 = Phaser.Display.Align.CENTER;

  var LayoutBackgrounds = function LayoutBackgrounds() {
    if (this.backgroundChildren === undefined) {
      return;
    }

    var backgrounds = this.backgroundChildren;
    var startX = this.left,
        startY = this.top;
    var parentWidth = this.width,
        parentHeight = this.height;
    var child, childConfig, padding, x, y, width, height;

    for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
      child = backgrounds[i];
      childConfig = child.rexSizer;

      if (childConfig.hidden) {
        continue;
      }

      padding = childConfig.padding;
      PreLayoutChild.call(this, child);
      x = startX + padding.left;
      y = startY + padding.top;
      width = parentWidth - padding.left - padding.right;
      height = parentHeight - padding.top - padding.bottom;
      ResizeGameObject(child, width, height);
      LayoutChild.call(this, child, x, y, width, height, ALIGN_CENTER$4);
    }
  };

  var SetDraggable = function SetDraggable(senser, draggable) {
    var senserType = _typeof(senser);

    if (senserType === 'string') {
      senser = this.getElement(senser);
    } else if (senser === undefined || senserType != 'object') {
      draggable = senser;
      senser = this;
    }

    if (draggable === undefined) {
      draggable = true;
    }

    if (senser.input && senser.input.hasOwnProperty('draggable')) {
      // Draggable is already registered
      senser.input.draggable = draggable;
    } else if (draggable) {
      // Register draggable
      senser.setInteractive();
      senser.scene.input.setDraggable(senser);
      senser.on('drag', function (pointer, dragX, dragY) {
        var topmostParent = this.getTopmostSizer();
        topmostParent.x += dragX - senser.x;
        topmostParent.y += dragY - senser.y;
        topmostParent.emit('sizer.drag', pointer, dragX, dragY);
      }, this).on('dragstart', function (pointer, dragX, dragY) {
        var topmostParent = this.getTopmostSizer();
        topmostParent.emit('sizer.dragstart', pointer, dragX, dragY);
      }, this).on('dragend', function (pointer, dragX, dragY, dropped) {
        var topmostParent = this.getTopmostSizer();
        topmostParent.emit('sizer.dragend', pointer, dragX, dragY, dropped);
      }, this);
    } else ;

    return this;
  };

  var GetValue$V = Phaser.Utils.Objects.GetValue;

  var Button = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Button, _ComponentBase);

    var _super = _createSuper(Button);

    function Button(gameObject, config) {
      var _this;

      _classCallCheck(this, Button);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue$V(config, "inputConfig", undefined));

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Button, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.lastClickTime = undefined;
        this.setEnable(GetValue$V(o, "enable", true));
        this.setMode(GetValue$V(o, "mode", 1));
        this.setClickInterval(GetValue$V(o, "clickInterval", 100));
        this.setDragThreshold(GetValue$V(o, 'threshold', undefined));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        var gameObject = this.parent;
        gameObject.on('pointerdown', this.onPress, this);
        gameObject.on('pointerup', this.onRelease, this);
        gameObject.on('pointerout', this.onPointOut, this);
        gameObject.on('pointermove', this.onMove, this);
        gameObject.on('pointerover', this.onOver, this);
        gameObject.on('pointeroutr', this.onOut, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // GameObject events will be removed when this gameObject destroyed 
        // this.parent.on('pointerdown', this.onPress, this);
        // this.parent.on('pointerup', this.onRelease, this);
        // this.parent.on('pointerout', this.onPointOut, this);
        // this.parent.on('pointermove', this.onMove, this);


        this.pointer = null;

        _get(_getPrototypeOf(Button.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }

        if (!e) {
          this.cancel();
        }

        this._enable = e;
        var eventName = e ? 'enable' : 'disable';
        this.emit(eventName, this, this.parent);
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = CLICKMODE$1[m];
        }

        this.mode = m;
        return this;
      }
    }, {
      key: "setClickInterval",
      value: function setClickInterval(interval) {
        this.clickInterval = interval; // ms

        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      } // internal

    }, {
      key: "onPress",
      value: function onPress(pointer, localX, localY, event) {
        if (this.pointer !== undefined) {
          return;
        }

        this.pointer = pointer;

        if (this.mode === 0) {
          this.click(pointer.downTime, pointer, event);
        }
      }
    }, {
      key: "onRelease",
      value: function onRelease(pointer, localX, localY, event) {
        if (this.pointer !== pointer) {
          return;
        }

        if (this.mode === 1) {
          this.click(pointer.upTime, pointer, event);
        }

        this.pointer = undefined;
      }
    }, {
      key: "onPointOut",
      value: function onPointOut(pointer, event) {
        if (this.pointer !== pointer) {
          return;
        }

        this.cancel();
      }
    }, {
      key: "onMove",
      value: function onMove(pointer, localX, localY, event) {
        if (this.pointer !== pointer) {
          return;
        }

        if (this.dragThreshold === undefined) {
          return;
        }

        if (pointer.getDistance() >= this.dragThreshold) {
          this.cancel();
        }
      }
    }, {
      key: "click",
      value: function click(nowTime, pointer, event) {
        if (!this.enable) {
          return this;
        }

        if (nowTime === undefined) {
          // fires 'click' event manually
          this.emit('click', this, this.parent, pointer, event);
          return this;
        }

        this.pointer = undefined;
        var lastClickTime = this.lastClickTime;

        if (lastClickTime !== undefined && nowTime - lastClickTime <= this.clickInterval) {
          return this;
        }

        this.lastClickTime = nowTime;
        this.emit('click', this, this.parent, pointer, event);
        return this;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.pointer = undefined;
        return this;
      }
    }, {
      key: "onOver",
      value: function onOver(pointer, localX, localY, event) {
        if (!this.enable) {
          return this;
        }

        this.emit('over', this, this.parent, pointer, event);
        return this;
      }
    }, {
      key: "onOut",
      value: function onOut(pointer, event) {
        if (!this.enable) {
          return this;
        }

        this.emit('out', this, this.parent, pointer, event);
        return this;
      }
    }]);

    return Button;
  }(ComponentBase);

  var CLICKMODE$1 = {
    press: 0,
    pointerdown: 0,
    release: 1,
    pointerup: 1
  };

  var ClickMethods = {
    onClick: function onClick(callback, scope, config) {
      if (!callback) {
        return this;
      }

      if (this._click === undefined) {
        this._click = new Button(this, config);
      }

      this._click.on('click', callback, scope);

      return this;
    },
    offClick: function offClick(callback, scope) {
      if (this._click === undefined) {
        return this;
      }

      this._click.off('click', callback, scope);

      return this;
    },
    enableClick: function enableClick(enabled) {
      if (this._click === undefined) {
        return this;
      }

      this._click.setEnable(enabled);

      return this;
    },
    disableClick: function disableClick() {
      if (this._click === undefined) {
        return this;
      }

      this._click.setEnable(false);

      return this;
    }
  };

  var IsPointerInHitArea = function IsPointerInHitArea(gameObject, pointer, preTest, postTest) {
    if (pointer) {
      if (preTest && !preTest(gameObject, pointer)) {
        return false;
      }

      if (!HitTest(gameObject, pointer)) {
        return false;
      }

      if (postTest && !postTest(gameObject, pointer)) {
        return false;
      }

      return true;
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers,
          pointer;

      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];

        if (preTest && !preTest(gameObject, pointer)) {
          continue;
        }

        if (!HitTest(gameObject, pointer)) {
          continue;
        }

        if (postTest && !postTest(gameObject, pointer)) {
          continue;
        }

        return true;
      }

      return false;
    }
  };

  var HitTest = function HitTest(gameObject, pointer) {
    var scene = gameObject.scene;
    var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
    var inputManager = scene.input.manager;
    var gameObjects = [gameObject];
    var output;

    for (var i = 0, len = cameras.length; i < len; i++) {
      output = inputManager.hitTest(pointer, gameObjects, cameras[i]);

      if (output.length > 0) {
        return true;
      }
    }

    return false;
  };

  var GetValue$U = Phaser.Utils.Objects.GetValue;

  var ClickOutside = /*#__PURE__*/function (_ComponentBase) {
    _inherits(ClickOutside, _ComponentBase);

    var _super = _createSuper(ClickOutside);

    function ClickOutside(gameObject, config) {
      var _this;

      _classCallCheck(this, ClickOutside);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this._enable = undefined;
      var inputConfig = GetValue$U(config, "inputConfig", undefined);

      if (inputConfig) {
        gameObject.setInteractive(inputConfig);
      }

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(ClickOutside, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$U(o, "enable", true));
        this.setMode(GetValue$U(o, "mode", 1));
        this.setClickInterval(GetValue$U(o, "clickInterval", 100));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        var scene = this.parent.scene;
        scene.input.on('pointerdown', this.onPress, this);
        scene.input.on('pointerup', this.onRelease, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        var scene = this.parent.scene;
        scene.input.off('pointerdown', this.onPress, this);
        scene.input.off('pointerup', this.onRelease, this);

        _get(_getPrototypeOf(ClickOutside.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }

        this._enable = e;
        var eventName = e ? 'enable' : 'disable';
        this.emit(eventName, this, this.parent);
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = CLICKMODE[m];
        }

        this.mode = m;
        return this;
      }
    }, {
      key: "setClickInterval",
      value: function setClickInterval(interval) {
        this.clickInterval = interval; // ms

        return this;
      }
    }, {
      key: "isPointerInside",
      value: function isPointerInside(pointer) {
        var gameObject = this.parent;
        var isInsideCallback = gameObject.input ? IsPointerInHitArea : IsPointerInBounds;
        return isInsideCallback(gameObject, pointer);
      } // internal

    }, {
      key: "onPress",
      value: function onPress(pointer) {
        if (this.mode === 0) {
          // Do nothing if game object is not visible
          if (!this.parent.willRender(pointer.camera)) {
            return;
          }

          if (!this.isPointerInside(pointer)) {
            this.click(pointer.downTime, pointer);
          }
        }
      }
    }, {
      key: "onRelease",
      value: function onRelease(pointer) {
        if (this.mode === 1) {
          // Do nothing if game object is not visible
          if (!this.parent.willRender(pointer.camera)) {
            return;
          }

          if (!this.isPointerInside(pointer)) {
            this.click(pointer.upTime, pointer);
          }
        }
      }
    }, {
      key: "click",
      value: function click(nowTime, pointer) {
        if (!this.enable) {
          return this;
        }

        if (nowTime === undefined) {
          // fires 'clickoutside' event manually
          this.emit('clickoutside', this, this.parent, pointer);
          return this;
        }

        var lastClickTime = this.lastClickTime;

        if (lastClickTime !== undefined && nowTime - lastClickTime <= this.clickInterval) {
          return this;
        }

        this.lastClickTime = nowTime;
        this.emit('clickoutside', this, this.parent, pointer);
        return this;
      }
    }]);

    return ClickOutside;
  }(ComponentBase);

  var CLICKMODE = {
    press: 0,
    pointerdown: 0,
    release: 1,
    pointerup: 1
  };

  var ClickOutsideMethods = {
    onClickOutside: function onClickOutside(callback, scope, config) {
      if (!callback) {
        return this;
      }

      if (this._clickOutside === undefined) {
        this._clickOutside = new ClickOutside(this, config);
      }

      this._clickOutside.on('clickoutside', callback, scope);

      return this;
    },
    offClickOutside: function offClickOutside(callback, scope) {
      if (this._clickOutside === undefined) {
        return this;
      }

      this._clickOutside.off('clickoutside', callback, scope);

      return this;
    },
    enableClickOutside: function enableClickOutside(enabled) {
      if (this._clickOutside === undefined) {
        return this;
      }

      this._clickOutside.setEnable(enabled);

      return this;
    },
    disableClickOutside: function disableClickOutside() {
      if (this._clickOutside === undefined) {
        return this;
      }

      this._clickOutside.setEnable(false);

      return this;
    }
  };

  var FSM = /*#__PURE__*/function () {
    /*
    var config = {
        start: 'A',   // default: undefined
        states: {
            A: {
                next: 'B',  // function() { return 'B'; }
                enter: function() {},
                exit: function() {}
            },
            // ...
        },        
        extend: {
            i: 0,
            name: 'abc'
            // ...
        },
        init: function() {},
        enable: true,
        eventEmitter: true,
    };
    */
    function FSM(config) {
      _classCallCheck(this, FSM);

      // Attach get-next-state function
      var states = GetValue$1a(config, 'states', undefined);

      if (states) {
        this.addStates(states);
      } // Attach extend members


      var extend = GetValue$1a(config, 'extend', undefined);

      if (extend) {
        for (var name in extend) {
          if (!this.hasOwnProperty(name) || this[name] === undefined) {
            this[name] = extend[name];
          }
        }
      } // Event emitter


      var eventEmitter = GetValue$1a(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue$1a(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this._stateLock = false;
      this.resetFromJSON(config);
    }

    _createClass(FSM, [{
      key: "shutdown",
      value: function shutdown() {
        this.destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$1a(o, 'enable', true));
        this.start(GetValue$1a(o, 'start', undefined));
        var init = GetValue$1a(o, 'init', undefined);

        if (init) {
          init.call(this);
        }

        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          curState: this.state,
          prevState: this.prevState,
          enable: this.enable,
          start: this._start
        };
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this._state;
      },
      set: function set(newState) {
        if (!this.enable || this._stateLock) {
          return;
        }

        if (this._state === newState) {
          return;
        }

        this._prevState = this._state;
        this._state = newState;
        this._stateLock = true; // lock state

        this.emit('statechange', this);

        if (this._prevState != null) {
          var exitEventName = 'exit_' + this._prevState;
          var exitCallback = this[exitEventName];

          if (exitCallback) {
            exitCallback.call(this);
          }

          this.emit(exitEventName, this);
        }

        this._stateLock = false;

        if (this._state != null) {
          var enterEventName = 'enter_' + this._state;
          var enterCallback = this[enterEventName];

          if (enterCallback) {
            enterCallback.call(this);
          }

          this.emit(enterEventName, this);
        }
      }
    }, {
      key: "prevState",
      get: function get() {
        return this._prevState;
      }
    }, {
      key: "start",
      value: function start(state) {
        this._start = state;
        this._prevState = undefined;
        this._state = state; // Won't fire statechange events

        return this;
      }
    }, {
      key: "goto",
      value: function goto(nextState) {
        if (nextState != null) {
          this.state = nextState;
        }

        return this;
      }
    }, {
      key: "next",
      value: function next() {
        var nextState;
        var getNextState = this['next_' + this.state];

        if (getNextState) {
          if (typeof getNextState === 'string') {
            nextState = getNextState;
          } else {
            nextState = getNextState.call(this);
          }
        }

        this["goto"](nextState);
        return this;
      }
    }, {
      key: "addState",
      value: function addState(name, state) {
        if (typeof name !== 'string') {
          state = name;
          name = state.name;
        }

        var getNextStateCallback = state.next;

        if (getNextStateCallback) {
          this['next_' + name] = getNextStateCallback;
        }

        var exitCallback = state.exit;

        if (exitCallback) {
          this['exit_' + name] = exitCallback;
        }

        var enterCallback = state.enter;

        if (enterCallback) {
          this['enter_' + name] = enterCallback;
        }

        return this;
      }
    }, {
      key: "addStates",
      value: function addStates(states) {
        if (Array.isArray(states)) {
          for (var i = 0, cnt = states.length; i < cnt; i++) {
            this.addState(states[i]);
          }
        } else {
          for (var name in states) {
            this.addState(name, states[name]);
          }
        }

        return this;
      }
    }, {
      key: "runMethod",
      value: function runMethod(methodName, a1, a2, a3, a4, a5) {
        var fn = this[methodName + '_' + this.state];

        if (!fn) {
          return undefined;
        } // Copy from eventemitter3


        var len = arguments.length;

        switch (len) {
          case 1:
            return fn.call(this);

          case 2:
            return fn.call(this, a1);

          case 3:
            return fn.call(this, a1, a2);

          case 4:
            return fn.call(this, a1, a2, a3);

          case 5:
            return fn.call(this, a1, a2, a3, a4);

          case 6:
            return fn.call(this, a1, a2, a3, a4, a5);
        }

        var args = new Array(len - 1);

        for (var i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }

        return fn.apply(this, args);
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        this.runMethod('update', time, delta);
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        this.runMethod('preupdate', time, delta);
      }
    }, {
      key: "postupdate",
      value: function postupdate(time, delta) {
        this.runMethod('postupdate', time, delta);
      }
    }]);

    return FSM;
  }();

  Object.assign(FSM.prototype, EventEmitterMethods);

  var Cooldown = /*#__PURE__*/function (_FSM) {
    _inherits(Cooldown, _FSM);

    var _super = _createSuper(Cooldown);

    function Cooldown() {
      var _this;

      _classCallCheck(this, Cooldown);

      _this = _super.call(this, {
        eventEmitter: false
      });

      _this["goto"]('IDLE');

      return _this;
    }

    _createClass(Cooldown, [{
      key: "setCooldownTime",
      value: function setCooldownTime(time) {
        this.cooldownTime = time;
        this.cooldownMode = time !== undefined;
        return this;
      }
    }, {
      key: "request",
      value: function request() {
        return this.runMethod('request');
      } // IDLE state

    }, {
      key: "update_IDLE",
      value: function update_IDLE() {
        this.compensationTime = 0;
      }
    }, {
      key: "request_IDLE",
      value: function request_IDLE() {
        this.next();
        return true;
      }
    }, {
      key: "next_IDLE",
      value: function next_IDLE() {
        if (this.cooldownMode) {
          return 'COOLDOWN';
        }
      } // COOLDOWN state

    }, {
      key: "enter_COOLDOWN",
      value: function enter_COOLDOWN() {
        this.remainderTime = this.cooldownTime + this.compensationTime;
      }
    }, {
      key: "update_COOLDOWN",
      value: function update_COOLDOWN(time, delta) {
        this.remainderTime -= delta;

        if (this.remainderTime < 0) {
          this.compensationTime = this.cooldownTime > delta ? -this.remainderTime : 0;
          this["goto"]('IDLE');
        }
      }
    }, {
      key: "request_COOLDOWN",
      value: function request_COOLDOWN() {
        return false;
      }
    }]);

    return Cooldown;
  }(FSM);

  var GetValue$T = Phaser.Utils.Objects.GetValue;

  var InTouching = /*#__PURE__*/function (_ComponentBase) {
    _inherits(InTouching, _ComponentBase);

    var _super = _createSuper(InTouching);

    function InTouching(gameObject, config) {
      var _this;

      _classCallCheck(this, InTouching);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this._enable = undefined;
      _this.cooldown = new Cooldown();

      _this.parent.setInteractive(GetValue$T(config, 'inputConfig', undefined));

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(InTouching, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouching = false;
        this.setEnable(GetValue$T(o, 'enable', true));
        this.setCooldown(GetValue$T(o, 'cooldown', undefined));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        var gameObject = this.parent;
        gameObject.on('pointerdown', this.onPointIn, this);
        gameObject.on('pointerover', this.onPointIn, this);
        gameObject.on('pointerup', this.onPointOut, this);
        gameObject.on('pointerout', this.onPointOut, this);
        this.scene.sys.events.on('preupdate', this.preupdate, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerover', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);


        this.scene.sys.events.off('preupdate', this.preupdate, this);
        this.pointer = undefined;

        _get(_getPrototypeOf(InTouching.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }

        if (!e) {
          this.isInTouching = false;
          this.pointer = undefined;
        }

        this._enable = e;
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "cooldownTime",
      get: function get() {
        return this.cooldown.cooldownTime;
      },
      set: function set(time) {
        this.cooldown.setCooldownTime(time);
      }
    }, {
      key: "setCooldown",
      value: function setCooldown(time) {
        this.cooldownTime = time;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      } // internal

    }, {
      key: "onPointIn",
      value: function onPointIn(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== undefined) {
          return;
        }

        this.pointer = pointer;
        this.isInTouching = true;
      }
    }, {
      key: "onPointOut",
      value: function onPointOut(pointer) {
        if (!this.enable || this.pointer !== pointer) {
          return;
        }

        this.pointer = undefined;
        this.isInTouching = false;
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        this.cooldown.update(time, delta);

        if (this.isInTouching && this.cooldown.request()) {
          this.emit('intouch', this, this.parent, this.pointer);
        }
      }
    }]);

    return InTouching;
  }(ComponentBase);

  var TouchingMethods = {
    onTouching: function onTouching(callback, scope, config) {
      if (!callback) {
        return this;
      }

      if (this._inTouching === undefined) {
        this._inTouching = new InTouching(this, config);
      }

      this._inTouching.on('intouch', callback, scope);

      return this;
    },
    offTouching: function offTouching(callback, scope) {
      if (this._inTouching === undefined) {
        return this;
      }

      this._inTouching.off('intouch', callback, scope);

      return this;
    },
    enableTouching: function enableTouching(enabled) {
      if (this._inTouching === undefined) {
        return this;
      }

      this._inTouching.setEnable(enabled);

      return this;
    },
    disableTouching: function disableTouching() {
      if (this._inTouching === undefined) {
        return this;
      }

      this._inTouching.setEnable(false);

      return this;
    }
  };

  var PointToChild = function PointToChild(parents, x, y) {
    var parent;

    for (var i = 0, cnt = parents.length; i < cnt; i++) {
      parent = parents[i];

      if (!ContainsPoint(parent, x, y)) {
        continue;
      }

      return parent.pointToChild(x, y);
    }

    return null;
  };

  var EmitChildEvent = function EmitChildEvent(eventEmitter, eventName, parents, x, y, pointer, event) {
    var child;

    if (y === undefined) {
      child = x;
    } else {
      child = PointToChild(parents, x, y);
    }

    if (!child) {
      return;
    }

    eventEmitter.emit(eventName, child, pointer, event);
  };

  var GetValue$S = Phaser.Utils.Objects.GetValue;

  var DownChild = function DownChild(config) {
    var overConfig = GetValue$S(config, 'down', undefined);

    if (overConfig === false) {
      return;
    }

    this.on('pointerdown', OnDown, this);
  };

  var OnDown = function OnDown(pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "down"), childrenInteractive.targetSizers, pointer.worldX, pointer.worldY, pointer, event);
  };

  var GetValue$R = Phaser.Utils.Objects.GetValue;

  var UpChild = function UpChild(config) {
    var overConfig = GetValue$R(config, 'up', undefined);

    if (overConfig === false) {
      return;
    }

    this.on('pointerup', OnUp, this);
  };

  var OnUp = function OnUp(pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "up"), childrenInteractive.targetSizers, pointer.worldX, pointer.worldY, pointer, event);
  };

  var GetValue$Q = Phaser.Utils.Objects.GetValue;

  var OverChild = function OverChild(config) {
    var overConfig = GetValue$Q(config, 'over', undefined);

    if (overConfig === false) {
      return;
    }

    this.on('pointermove', OnMove, this).on('pointerover', OnMove, this).on('pointerout', OnOut, this); // pointer-up is included too
  };

  var OnMove = function OnMove(pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;
    var child = PointToChild(childrenInteractive.targetSizers, pointer.worldX, pointer.worldY);
    var preChild = childrenInteractive.lastOverChild;

    if (child && preChild && child === preChild) {
      return;
    }

    childrenInteractive.lastOverChild = child;
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "out"), childrenInteractive.targetSizers, preChild, undefined, pointer, event);
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "over"), childrenInteractive.targetSizers, child, undefined, pointer, event);
  };

  var OnOut = function OnOut(pointer, event) {
    var childrenInteractive = this._childrenInteractive;
    var child = childrenInteractive.lastOverChild;
    childrenInteractive.lastOverChild = null;
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "out"), childrenInteractive.targetSizers, child, undefined, pointer, event);
  };

  var GetValue$P = Phaser.Utils.Objects.GetValue;

  var ClickChild = function ClickChild(config) {
    var clickConfig = GetValue$P(config, 'click', undefined);

    if (clickConfig === false) {
      return;
    }

    if (clickConfig === undefined) {
      clickConfig = {};
    }

    if (!clickConfig.hasOwnProperty('threshold')) {
      clickConfig.threshold = 10;
    }

    var childrenInteractive = this._childrenInteractive;
    this._click = new Button(this, clickConfig);

    this._click.on('click', function (button, gameObject, pointer, event) {
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "click"), childrenInteractive.targetSizers, pointer.worldX, pointer.worldY, pointer, event);
    }, this);
  };

  var GetValue$O = Phaser.Utils.Objects.GetValue;

  var OnePointerTracer = /*#__PURE__*/function (_TickTask) {
    _inherits(OnePointerTracer, _TickTask);

    var _super = _createSuper(OnePointerTracer);

    function OnePointerTracer(gameObject, config) {
      var _this;

      _classCallCheck(this, OnePointerTracer);

      var scene = GetSceneObject(gameObject);

      if (scene === gameObject) {
        gameObject = undefined;
      }

      _this = _super.call(this, scene, config);
      _this.gameObject = gameObject;

      if (gameObject) {
        gameObject.setInteractive(GetValue$O(config, "inputConfig", undefined));
      }

      _this._enable = undefined;

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(OnePointerTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$O(o, 'enable', true));
        this.setDetectBounds();

        if (this.gameObject === undefined) {
          this.setDetectBounds(GetValue$O(o, 'bounds', undefined));
        } else {
          this.setDetectBounds();
        }

        this.tracerState = TOUCH0$2; // this.recongizedState = new stateClass(this);

        this.pointer = undefined;
        this.lastPointer = undefined; // Last catched pointer

        this.movedState = false;
        this.isTouchingAnyObject = false;
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "boot", this).call(this);

        if (this.gameObject) {
          this.gameObject.on('pointerdown', this.onPointerDown, this);
        } else {
          this.scene.input.on('pointerdown', this.onPointerDown, this);
        }

        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('gameout', this.dragCancel, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        if (!this.scene) {
          return;
        }

        if (this.gameObject) ; else {
          this.scene.input.off('pointerdown', this.onPointerDown, this);
        }

        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('gameout', this.dragCancel, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.gameObject = undefined;
        this.bounds = undefined;
        this.pointer = undefined;
        this.lastPointer = undefined; // Last catched pointer

        this.movedState = false;

        _get(_getPrototypeOf(OnePointerTracer.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }

        if (!e) {
          this.dragCancel();
        }

        this._enable = e;
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "setDetectBounds",
      value: function setDetectBounds(bounds) {
        this.bounds = bounds;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "onPointerDown",
      value: function onPointerDown(pointer, gameObjects) {
        if (!this.enable) {
          return;
        }

        if (this.pointer !== undefined) {
          return;
        }

        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;

        if (!isInsideBounds) {
          return;
        }

        if (this.pointer === pointer) {
          return;
        }

        this.pointer = pointer;
        this.lastPointer = pointer;
        this.movedState = false;
        this.tracerState = TOUCH1$2;

        if (this.gameObject === undefined) {
          this.isTouchingAnyObject = gameObjects.length > 0;
        }

        this.onDragStart();
      }
    }, {
      key: "onPointerUp",
      value: function onPointerUp(pointer) {
        if (!this.enable) {
          return;
        }

        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;

        if (!isInsideBounds) {
          return;
        }

        if (this.pointer !== pointer) {
          return;
        }

        this.pointer = undefined;
        this.movedState = false;
        this.tracerState = TOUCH0$2;
        this.onDragEnd();
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer) {
        if (!this.enable) {
          return;
        }

        if (pointer.isDown) {
          var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
          var isCatchedPointer = this.pointer === pointer;

          if (!isCatchedPointer && isInsideBounds) ; else if (isCatchedPointer && !isInsideBounds) {
            // Pointer moves out of bounds
            this.onPointerUp(pointer);
          } else {
            // Pointer drags in bounds
            if (!this.movedState) {
              this.movedState = pointer.x !== pointer.downX || pointer.y !== pointer.downY;
            }

            if (this.movedState) {
              this.onDrag();
            }
          }
        }
      }
    }, {
      key: "dragCancel",
      value: function dragCancel() {
        if (this.tracerState === TOUCH1$2) {
          this.onDragEnd();
        }

        this.pointer = undefined;
        this.tracerState = TOUCH0$2;
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.emit('dragstart', this);
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.emit('dragend', this);
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        this.emit('drag', this);
      } // onLastPointerMove() { }

    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {}
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {}
    }, {
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "startTicking", this).call(this);

        this.scene.sys.events.on('preupdate', this.preUpdate, this);
        this.scene.sys.events.on('postupdate', this.postUpdate, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('preupdate', this.preUpdate, this);
          this.scene.sys.events.off('postupdate', this.postUpdate, this);
        }
      }
    }, {
      key: "setRecongizedStateObject",
      value: function setRecongizedStateObject(stateObject) {
        this.recongizedState = stateObject;
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this.recongizedState.state;
      },
      set: function set(newState) {
        this.recongizedState.state = newState;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.state = IDLE$5;
        return this;
      }
    }]);

    return OnePointerTracer;
  }(TickTask);

  var TOUCH0$2 = 0;
  var TOUCH1$2 = 1;
  var IDLE$5 = 'IDLE';

  var GetValue$N = Phaser.Utils.Objects.GetValue;
  var DistanceBetween$4 = Phaser.Math.Distance.Between;

  var Tap = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Tap, _OnePointerTracer);

    var _super = _createSuper(Tap);

    function Tap(gameObject, config) {
      var _this;

      _classCallCheck(this, Tap);

      _this = _super.call(this, gameObject, config);

      var self = _assertThisInitialized(_this);

      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.stop();
              self.tapsCount = 0;
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.start();
              self.tapsCount = 0;
              self.emit('tappingstart', self, self.gameObject, self.lastPointer);
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.start();
              self.emit('tap', self, self.gameObject, self.lastPointer);
              self.emit("".concat(self.tapsCount, "tap"), self, self.gameObject, self.lastPointer);
            }
          }
        },
        init: function init() {
          this.state = IDLE$4;
        },
        eventEmitter: false
      };

      _this.setRecongizedStateObject(new FSM(stateConfig));

      return _this;
    }

    _createClass(Tap, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Tap.prototype), "resetFromJSON", this).call(this, o);

        this.setHoldTime(GetValue$N(o, 'time', 250)); // min-hold-time of Press is 251

        this.setTapInterval(GetValue$N(o, 'tapInterval', 200));
        this.setDragThreshold(GetValue$N(o, 'threshold', 9));
        this.setTapOffset(GetValue$N(o, 'tapOffset', 10));
        var taps = GetValue$N(o, 'taps', undefined);

        if (taps !== undefined) {
          this.setTaps(taps);
        } else {
          this.setMaxTaps(GetValue$N(o, 'maxTaps', undefined));
          this.setMinTaps(GetValue$N(o, 'minTaps', undefined));
        }

        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        switch (this.state) {
          case IDLE$4:
            this.state = BEGIN$3;
            break;

          case BEGIN$3:
            var pointer = this.lastPointer;
            var tapsOffset = DistanceBetween$4(pointer.upX, pointer.upY, pointer.x, pointer.y);

            if (tapsOffset > this.tapOffset) {
              // Can't recognize next level, restart here
              this.state = RECOGNIZED$3;
              this.state = BEGIN$3;
            }

            break;

          case RECOGNIZED$3:
            this.state = BEGIN$3;
            break;
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        if (this.state === BEGIN$3) {
          this.tapsCount++; // Try recognize next level

          this.emit('tapping', this, this.gameObject, this.lastPointer);

          if (this.maxTaps !== undefined && this.tapsCount === this.maxTaps) {
            // Reach to maxTaps, stop here                
            this.state = RECOGNIZED$3;
          }
        }
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === IDLE$4) {
          return;
        }

        if (this.pointer.getDistance() > this.dragThreshold) {
          // Cancel
          this.state = IDLE$4;
        }
      }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }

        if (this.state === BEGIN$3) {
          var pointer = this.lastPointer;

          if (pointer.isDown) {
            var holdTime = time - pointer.downTime;

            if (holdTime > this.holdTime) {
              this.state = IDLE$4;
            }
          } else {
            // isUp
            var releasedTime = time - pointer.upTime;

            if (releasedTime > this.tapInterval) {
              if (this.minTaps === undefined || this.tapsCount >= this.minTaps) {
                this.state = RECOGNIZED$3;
              } else {
                this.state = IDLE$4;
              }
            }
          }
        }
      }
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        } // Clear RECOGNIZED after update()


        if (this.state === RECOGNIZED$3) {
          this.state = IDLE$4;
        }
      }
    }, {
      key: "isTapped",
      get: function get() {
        return this.state === RECOGNIZED$3;
      }
    }, {
      key: "setHoldTime",
      value: function setHoldTime(time) {
        this.holdTime = time; // ms

        return this;
      }
    }, {
      key: "setTapInterval",
      value: function setTapInterval(time) {
        this.tapInterval = time; // ms

        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setTapOffset",
      value: function setTapOffset(distance) {
        this.tapOffset = distance;
        return this;
      }
    }, {
      key: "setMaxTaps",
      value: function setMaxTaps(taps) {
        this.maxTaps = taps;
        return this;
      }
    }, {
      key: "setMinTaps",
      value: function setMinTaps(taps) {
        this.minTaps = taps;
        return this;
      }
    }, {
      key: "setTaps",
      value: function setTaps(minTaps, maxTaps) {
        if (maxTaps === undefined) {
          maxTaps = minTaps;
        }

        this.setMinTaps(minTaps).setMaxTaps(maxTaps);
        return this;
      }
    }]);

    return Tap;
  }(OnePointerTracer);

  var IDLE$4 = 'IDLE';
  var BEGIN$3 = 'BEGIN';
  var RECOGNIZED$3 = 'RECOGNIZED';

  var GetValue$M = Phaser.Utils.Objects.GetValue;

  var Press = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Press, _OnePointerTracer);

    var _super = _createSuper(Press);

    function Press(gameObject, config) {
      var _this;

      _classCallCheck(this, Press);

      _this = _super.call(this, gameObject, config);

      var self = _assertThisInitialized(_this);

      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.start();
            },
            exit: function exit() {
              self.stop();
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.emit('pressstart', self, self.gameObject, self.lastPointer);
            },
            exit: function exit() {
              self.emit('pressend', self, self.gameObject, self.lastPointer);
            }
          }
        },
        init: function init() {
          this.state = IDLE$3;
        },
        eventEmitter: false
      };

      _this.setRecongizedStateObject(new FSM(stateConfig));

      return _this;
    }

    _createClass(Press, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Press.prototype), "resetFromJSON", this).call(this, o);

        this.setDragThreshold(GetValue$M(o, 'threshold', 9));
        this.setHoldTime(GetValue$M(o, 'time', 251));
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.state = BEGIN$2;

        if (this.holdTime === 0) {
          this.state = RECOGNIZED$2;
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.state = IDLE$3;
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === IDLE$3) {
          return;
        }

        if (this.pointer.getDistance() > this.dragThreshold) {
          this.state = IDLE$3;
        }
      }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }

        if (this.state === BEGIN$2) {
          var holdTime = time - this.pointer.downTime;

          if (holdTime >= this.holdTime) {
            this.state = RECOGNIZED$2;
          }
        }
      }
    }, {
      key: "isPressed",
      get: function get() {
        return this.state === RECOGNIZED$2;
      }
    }, {
      key: "setHoldTime",
      value: function setHoldTime(time) {
        this.holdTime = time; // ms

        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }]);

    return Press;
  }(OnePointerTracer);

  var IDLE$3 = 'IDLE';
  var BEGIN$2 = 'BEGIN';
  var RECOGNIZED$2 = 'RECOGNIZED';

  Phaser.Utils.Objects.GetValue;

  var DistanceBetween$3 = Phaser.Math.Distance.Between;
  var AngleBetween$1 = Phaser.Math.Angle.Between;
  var VelocityMethods = {
    getDt: function getDt() {
      var game = this.scene.sys.game;
      var dt = game.loop.delta;
      return dt;
    },
    getVelocity: function getVelocity() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = DistanceBetween$3(p0.x, p0.y, p1.x, p1.y);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityX: function getVelocityX() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = Math.abs(p1.x - p0.x);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityY: function getVelocityY() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = Math.abs(p1.y - p0.y);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityAngle: function getVelocityAngle() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var angle = AngleBetween$1(p0.x, p0.y, p1.x, p1.y);
      return angle;
    }
  };

  var DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
  };

  var AngleToDirections = function AngleToDirections(angle, dirMode, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globOut;
    }

    out.left = false;
    out.right = false;
    out.up = false;
    out.down = false;
    angle = (angle + 360) % 360;

    switch (dirMode) {
      case 0:
        // up & down
        if (angle < 180) {
          out.down = true;
        } else {
          out.up = true;
        }

        break;

      case 1:
        // left & right
        if (angle > 90 && angle <= 270) {
          out.left = true;
        } else {
          out.right = true;
        }

        break;

      case 2:
        // 4 dir
        if (angle > 45 && angle <= 135) {
          out.down = true;
        } else if (angle > 135 && angle <= 225) {
          out.left = true;
        } else if (angle > 225 && angle <= 315) {
          out.up = true;
        } else {
          out.right = true;
        }

        break;

      case 3:
        // 8 dir
        if (angle > 22.5 && angle <= 67.5) {
          out.down = true;
          out.right = true;
        } else if (angle > 67.5 && angle <= 112.5) {
          out.down = true;
        } else if (angle > 112.5 && angle <= 157.5) {
          out.down = true;
          out.left = true;
        } else if (angle > 157.5 && angle <= 202.5) {
          out.left = true;
        } else if (angle > 202.5 && angle <= 247.5) {
          out.left = true;
          out.up = true;
        } else if (angle > 247.5 && angle <= 292.5) {
          out.up = true;
        } else if (angle > 292.5 && angle <= 337.5) {
          out.up = true;
          out.right = true;
        } else {
          out.right = true;
        }

        break;
    }

    return out;
  };

  var globOut = {};

  var GetValue$L = Phaser.Utils.Objects.GetValue;
  var RadToDeg$2 = Phaser.Math.RadToDeg;

  var Swipe = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Swipe, _OnePointerTracer);

    var _super = _createSuper(Swipe);

    function Swipe(gameObject, config) {
      var _this;

      _classCallCheck(this, Swipe);

      _this = _super.call(this, gameObject, config);

      var self = _assertThisInitialized(_this);

      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.validDrag = false;
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.start();
              self.updateDirectionStates();
              self.emit('swipe', self, self.gameObject, self.lastPointer);
            },
            exit: function exit() {
              self.stop();
              self.clearDirectionStates();
            }
          }
        },
        init: function init() {
          this.state = IDLE$2;
        },
        eventEmitter: false
      };

      _this.setRecongizedStateObject(new FSM(stateConfig));

      _this.clearDirectionStates();

      return _this;
    }

    _createClass(Swipe, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Swipe.prototype), "resetFromJSON", this).call(this, o);

        this.setDragThreshold(GetValue$L(o, 'threshold', 10));
        this.setVelocityThreshold(GetValue$L(o, 'velocityThreshold', 1000));
        this.setDirectionMode(GetValue$L(o, 'dir', '8dir'));
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.state = BEGIN$1;
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.state = IDLE$2;
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === BEGIN$1) {
          if (!this.validDrag) {
            this.validDrag = this.dragThreshold === 0 || this.pointer.getDistance() >= this.dragThreshold;
          }

          if (this.validDrag && this.dragVelocity > this.velocityThreshold) {
            this.state = RECOGNIZED$1;
          }
        }
      }
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        } // Clear RECOGNIZED after update()


        if (this.state === RECOGNIZED$1) {
          this.state = IDLE$2;
        }
      }
    }, {
      key: "isSwiped",
      get: function get() {
        return this.state === RECOGNIZED$1;
      }
    }, {
      key: "dragVelocity",
      get: function get() {
        var velocity;

        switch (this.dirMode) {
          case 0:
            velocity = this.getVelocityY();
            break;
          // up & down

          case 1:
            velocity = this.getVelocityX();
            break;
          // left & right

          default:
            velocity = this.getVelocity();
            break;
          // 4 dir, 8 dir
        }

        return velocity;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setVelocityThreshold",
      value: function setVelocityThreshold(velocity) {
        this.velocityThreshold = velocity;
        return this;
      }
    }, {
      key: "setDirectionMode",
      value: function setDirectionMode(m) {
        if (typeof m === 'string') {
          m = DIRMODE[m];
        }

        this.dirMode = m;
        return this;
      }
    }, {
      key: "updateDirectionStates",
      value: function updateDirectionStates() {
        var angle = RadToDeg$2(this.getVelocityAngle());
        AngleToDirections(angle, this.dirMode, this);
        return this;
      }
    }, {
      key: "clearDirectionStates",
      value: function clearDirectionStates() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        return this;
      }
    }]);

    return Swipe;
  }(OnePointerTracer);

  Object.assign(Swipe.prototype, VelocityMethods);
  var IDLE$2 = 'IDLE';
  var BEGIN$1 = 'BEGIN';
  var RECOGNIZED$1 = 'RECOGNIZED';

  var GetValue$K = Phaser.Utils.Objects.GetValue;
  var SpliceOne = Phaser.Utils.Array.SpliceOne;
  var DistanceBetween$2 = Phaser.Math.Distance.Between;
  var AngleBetween = Phaser.Math.Angle.Between;

  var TwoPointersTracer = /*#__PURE__*/function () {
    function TwoPointersTracer(scene, config) {
      _classCallCheck(this, TwoPointersTracer);

      var amount = scene.input.manager.pointersTotal - 1;

      if (amount < 2) {
        scene.input.addPointer(2 - amount);
      }

      this.scene = scene; // Event emitter

      this.setEventEmitter(GetValue$K(config, 'eventEmitter', undefined));
      this._enable = undefined;
      this.pointers = [];
      this.movedState = {};
      this.resetFromJSON(config);
      this.boot();
    }

    _createClass(TwoPointersTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$K(o, "enable", true));
        this.bounds = GetValue$K(o, 'bounds', undefined);
        this.tracerState = TOUCH0$1;
        this.pointers.length = 0;
        Clear(this.movedState);
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('gameout', this.dragCancel, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        if (!this.scene) {
          return;
        }

        this.destroyEventEmitter();
        this.pointers.length = 0;
        Clear(this.movedState);
        this.scene.input.off('pointerdown', this.onPointerDown, this);
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('gameout', this.dragCancel, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.scene = undefined;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }

        if (!e) {
          this.dragCancel();
        }

        this._enable = e;
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "onPointerDown",
      value: function onPointerDown(pointer) {
        if (!this.enable) {
          return;
        }

        if (this.pointers.length === 2) {
          return;
        }

        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;

        if (!isInsideBounds) {
          return;
        }

        var index = this.pointers.indexOf(pointer);

        if (index !== -1) {
          // Already in catched pointers
          return;
        }

        this.movedState[pointer.id] = false;
        this.pointers.push(pointer);

        switch (this.tracerState) {
          case TOUCH0$1:
            this.tracerState = TOUCH1$1;
            this.onDrag1Start();
            break;

          case TOUCH1$1:
            this.tracerState = TOUCH2;
            this.onDrag2Start();
            break;
        }
      }
    }, {
      key: "onPointerUp",
      value: function onPointerUp(pointer) {
        if (!this.enable) {
          return;
        }

        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;

        if (!isInsideBounds) {
          return;
        }

        var index = this.pointers.indexOf(pointer);

        if (index === -1) {
          // Not in catched pointers
          return;
        } else {
          delete this.movedState[pointer.id];
          SpliceOne(this.pointers, index);
        }

        switch (this.tracerState) {
          case TOUCH1$1:
            this.tracerState = TOUCH0$1;
            this.onDrag1End();
            break;

          case TOUCH2:
            this.tracerState = TOUCH1$1;
            this.onDrag2End();
            this.onDrag1Start();
            break;
        }
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer) {
        if (!this.enable) {
          return;
        }

        if (pointer.isDown) {
          var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
          var isCatchedPointer = this.pointers.indexOf(pointer) !== -1;

          if (!isCatchedPointer && isInsideBounds) ; else if (isCatchedPointer && !isInsideBounds) {
            // Pointer moves out of bounds, lose pointer
            this.onPointerUp(pointer);
          } else {
            // Pointer drags in bounds
            if (!this.movedState[pointer.id]) {
              this.movedState[pointer.id] = pointer.x !== pointer.downX || pointer.y !== pointer.downY;
            }

            if (this.movedState[pointer.id]) {
              switch (this.tracerState) {
                case TOUCH1$1:
                  this.onDrag1();
                  break;

                case TOUCH2:
                  this.onDrag2();
                  break;
              }
            }
          }
        }
      }
    }, {
      key: "dragCancel",
      value: function dragCancel() {
        if (this.tracerState === TOUCH2) {
          this.onDrag2End();
        }

        this.pointers.length = 0;
        Clear(this.movedState);
        this.tracerState = TOUCH0$1;
        return this;
      }
    }, {
      key: "onDrag1Start",
      value: function onDrag1Start() {
        this.emit('drag1start', this);
      }
    }, {
      key: "onDrag1End",
      value: function onDrag1End() {
        this.emit('drag1end', this);
      }
    }, {
      key: "onDrag1",
      value: function onDrag1() {
        this.emit('drag1', this);
      }
    }, {
      key: "onDrag2Start",
      value: function onDrag2Start() {
        this.emit('drag2start', this);
      }
    }, {
      key: "onDrag2End",
      value: function onDrag2End() {
        this.emit('drag2end', this);
      }
    }, {
      key: "onDrag2",
      value: function onDrag2() {
        this.emit('drag2', this);
      }
    }, {
      key: "distanceBetween",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }

        var p0 = this.pointers[0],
            p1 = this.pointers[1];
        return DistanceBetween$2(p0.x, p0.y, p1.x, p1.y);
      }
    }, {
      key: "angleBetween",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }

        var p0 = this.pointers[0],
            p1 = this.pointers[1];
        return AngleBetween(p0.x, p0.y, p1.x, p1.y);
      }
    }, {
      key: "drag1Vector",
      get: function get() {
        var pointer = this.pointers[0];

        if (pointer && this.movedState[pointer.id]) {
          var p1 = pointer.position;
          var p0 = pointer.prevPosition;
          tmpDragVector.x = p1.x - p0.x;
          tmpDragVector.y = p1.y - p0.y;
        } else {
          tmpDragVector.x = 0;
          tmpDragVector.y = 0;
        }

        return tmpDragVector;
      }
    }, {
      key: "centerX",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }

        var p0 = this.pointers[0].position;
        var p1 = this.pointers[1].position;
        return (p0.x + p1.x) / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }

        var p0 = this.pointers[0].position;
        var p1 = this.pointers[1].position;
        return (p0.y + p1.y) / 2;
      }
    }, {
      key: "prevCenterX",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }

        var preP0 = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position;
        var preP1 = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
        return (preP0.x + preP1.x) / 2;
      }
    }, {
      key: "prevCenterY",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }

        var preP0 = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position;
        var preP1 = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
        return (preP0.y + preP1.y) / 2;
      }
    }, {
      key: "movementCenterX",
      get: function get() {
        return this.centerX - this.prevCenterX;
      }
    }, {
      key: "movementCenterY",
      get: function get() {
        return this.centerY - this.prevCenterY;
      }
    }, {
      key: "setRecongizedStateObject",
      value: function setRecongizedStateObject(stateObject) {
        this.recongizedState = stateObject;
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this.recongizedState.state;
      },
      set: function set(newState) {
        this.recongizedState.state = newState;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.state = IDLE$1;
        return this;
      }
    }]);

    return TwoPointersTracer;
  }();

  Object.assign(TwoPointersTracer.prototype, EventEmitterMethods);
  var tmpDragVector = {};
  var TOUCH0$1 = 0;
  var TOUCH1$1 = 1;
  var TOUCH2 = 2;
  var IDLE$1 = 'IDLE';

  Phaser.Utils.Objects.GetValue;

  var RotateAround = Phaser.Math.RotateAround;

  var RotateObjectAround = function RotateObjectAround(gameObject, x, y, angle) {
    RotateAround(gameObject, x, y, angle);
    gameObject.rotation += angle;
    return gameObject;
  };

  var ScreenXYToWorldXY = function ScreenXYToWorldXY(screenX, screenY, camera, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globalOut;
    }

    camera.getWorldPoint(screenX, screenY, out);
    return out;
  };

  var globalOut = {};

  var SpinObject = function SpinObject(gameObject, camera) {
    if (!this.isRotation) {
      return this;
    }

    if (camera === undefined) {
      camera = this.pointers[0].camera;
    }

    var movementX = this.movementCenterX,
        movementY = this.movementCenterY;
    var worldXY = ScreenXYToWorldXY(this.centerX, this.centerY, camera, true);
    var centerWorldX = worldXY.x;
    var centerWorldY = worldXY.y;
    var angle = this.rotation;

    if (Array.isArray(gameObject)) {
      var gameObjects = gameObject;

      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        gameObject.x += movementX;
        gameObject.y += movementY;
        RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
      }
    } else {
      gameObject.x += movementX;
      gameObject.y += movementY;
      RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
    }

    return this;
  };

  var GetValue$J = Phaser.Utils.Objects.GetValue;
  var WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 

  var ShortestBetween = Phaser.Math.Angle.ShortestBetween;
  var RadToDeg$1 = Phaser.Math.RadToDeg;
  var DegToRad$1 = Phaser.Math.DegToRad;

  var Rotate = /*#__PURE__*/function (_TwoPointersTracer) {
    _inherits(Rotate, _TwoPointersTracer);

    var _super = _createSuper(Rotate);

    function Rotate(scene, config) {
      var _this;

      _classCallCheck(this, Rotate);

      _this = _super.call(this, scene, config);

      var self = _assertThisInitialized(_this);

      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.prevAngle = undefined;
              self.angle = 0;
            }
          },
          BEGIN: {},
          RECOGNIZED: {
            enter: function enter() {
              self.emit('rotatestart', self);
            },
            exit: function exit() {
              self.emit('rotateend', self);
            }
          }
        },
        init: function init() {
          this.state = IDLE;
        },
        eventEmitter: false
      };

      _this.setRecongizedStateObject(new FSM(stateConfig));

      return _this;
    }

    _createClass(Rotate, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Rotate.prototype), "resetFromJSON", this).call(this, o);

        this.setDragThreshold(GetValue$J(o, 'threshold', 0));
        return this;
      }
    }, {
      key: "onDrag2Start",
      value: function onDrag2Start() {
        this.prevAngle = WrapDegrees(RadToDeg$1(this.angleBetween)); // Degrees

        this.state = BEGIN;

        if (this.dragThreshold === 0) {
          this.state = RECOGNIZED;
        }
      }
    }, {
      key: "onDrag2End",
      value: function onDrag2End() {
        this.state = IDLE;
      }
    }, {
      key: "onDrag2",
      value: function onDrag2() {
        switch (this.state) {
          case BEGIN:
            if (this.pointers[0].getDistance() >= this.dragThreshold && this.pointers[1].getDistance() >= this.dragThreshold) {
              var curAngle = WrapDegrees(RadToDeg$1(this.angleBetween));
              this.angle = ShortestBetween(this.prevAngle, curAngle);
              this.prevAngle = curAngle;
              this.state = RECOGNIZED;
            }

            break;

          case RECOGNIZED:
            var curAngle = WrapDegrees(RadToDeg$1(this.angleBetween));
            this.angle = ShortestBetween(this.prevAngle, curAngle);
            this.prevAngle = curAngle;
            this.emit('rotate', this);
            break;
        }
      }
    }, {
      key: "isRotated",
      get: function get() {
        return this.state === RECOGNIZED;
      }
    }, {
      key: "rotation",
      get: function get() {
        return DegToRad$1(this.angle);
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }]);

    return Rotate;
  }(TwoPointersTracer);

  var methods$9 = {
    spinObject: SpinObject
  };
  Object.assign(Rotate.prototype, methods$9);
  var IDLE = 'IDLE';
  var BEGIN = 'BEGIN';
  var RECOGNIZED = 'RECOGNIZED';

  var GetValue$I = Phaser.Utils.Objects.GetValue;

  var TapChild = function TapChild(config) {
    var tapConfig = GetValue$I(config, 'tap', undefined);

    if (tapConfig === false) {
      return;
    }

    var childrenInteractive = this._childrenInteractive;
    this._tap = new Tap(this, tapConfig);

    this._tap.on('tap', function (tap, gameObject, lastPointer) {
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix).concat(tap.tapsCount, "tap"), childrenInteractive.targetSizers, tap.worldX, tap.worldY, lastPointer);
    }, this);
  };

  var GetValue$H = Phaser.Utils.Objects.GetValue;

  var PressChild = function PressChild(config) {
    var pressConfig = GetValue$H(config, 'press', undefined);

    if (pressConfig === false) {
      return;
    }

    var childrenInteractive = this._childrenInteractive;
    this._press = new Press(this, pressConfig);

    this._press.on('pressstart', function (press, gameObject, lastPointer) {
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "pressstart"), childrenInteractive.targetSizers, press.worldX, press.worldY, lastPointer);
    }, this).on('pressend', function (press, gameObject, lastPointer) {
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "pressend"), childrenInteractive.targetSizers, press.worldX, press.worldY, lastPointer);
    }, this);
  };

  var GetValue$G = Phaser.Utils.Objects.GetValue;

  var SwipeChild = function SwipeChild(config) {
    var swipeConfig = GetValue$G(config, 'swipe', undefined);

    if (swipeConfig === false) {
      return;
    }

    if (swipeConfig === undefined) {
      swipeConfig = {};
    }

    if (!swipeConfig.hasOwnProperty('dir')) {
      swipeConfig.dir = '4dir';
    }

    var childrenInteractive = this._childrenInteractive;
    this._swipe = new Swipe(this, swipeConfig);

    this._swipe.on('swipe', function (swipe, gameObject, lastPointer) {
      var dirName = swipe.left ? 'left' : swipe.right ? 'right' : swipe.up ? 'up' : 'down';
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "swipe").concat(dirName), childrenInteractive.targetSizers, swipe.worldX, swipe.worldY, lastPointer);
    }, this);
  };

  var GetValue$F = Phaser.Utils.Objects.GetValue;

  var SetChildrenInteractive = function SetChildrenInteractive(gameObject, config) {
    gameObject.setInteractive();
    gameObject._childrenInteractive = {
      targetSizers: GetValue$F(config, 'targets', [gameObject]),
      eventEmitter: GetValue$F(config, 'eventEmitter', gameObject),
      eventNamePrefix: GetValue$F(config, 'inputEventPrefix', 'child.')
    };
    DownChild.call(gameObject, config);
    UpChild.call(gameObject, config);
    OverChild.call(gameObject, config);
    ClickChild.call(gameObject, config);
    TapChild.call(gameObject, config);
    PressChild.call(gameObject, config);
    SwipeChild.call(gameObject, config);
    return gameObject;
  };

  var SetChildrenInteractiveWrap = function SetChildrenInteractiveWrap(config) {
    SetChildrenInteractive(this, config);
    return this;
  };

  var BroadcastEvent = function BroadcastEvent() {
    var gameObjects = this.getAllChildren([this]);

    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      gameObject.emit.apply(gameObject, arguments);
    }

    return this;
  };

  var methods$8 = {
    getSizerConfig: GetSizerConfig,
    getChildPrevState: GetChildPrevState,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    resolveWidth: ResolveWidth$2,
    resolveChildrenWidth: ResolveChildrenWidth$1,
    resolveHeight: ResolveHeight$2,
    getChildWidth: GetChildWidth$1,
    getChildHeight: GetChildHeight,
    getExpandedChildWidth: GetExpandedChildWidth$3,
    getExpandedChildHeight: GetExpandedChildHeight$3,
    getChildrenWidth: GetChildrenWidth$4,
    getChildrenHeight: GetChildrenHeight$4,
    addChildrenMap: AddChildrenMap,
    addElement: AddChildrenMap,
    removeChildrenMap: RemoveChildrenMap,
    getElement: GetElement,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers$4,
    preLayout: PreLayout$4,
    layout: Layout,
    runLayout: RunLayout,
    layoutChildren: LayoutChildren$5,
    runWidthWrap: RunWidthWrap$2,
    layoutBackgrounds: LayoutBackgrounds,
    postLayout: PostLayout,
    setAnchor: SetAnchor,
    isInTouching: IsInTouching,
    pointToChild: PointToChild$1,
    setDraggable: SetDraggable,
    setChildrenInteractive: SetChildrenInteractiveWrap,
    broadcastEvent: BroadcastEvent
  };
  Object.assign(methods$8, PaddingMethods, AddChildMethods$8, RemoveChildMethods$7, GetParentSizerMethods, ScaleMethods, FadeMethods, EaseMoveMethods, ShakeMethods, EaseDataMethods, ClickMethods, ClickOutsideMethods, TouchingMethods, HideMethods, GetShownChildrenMethods);

  var GetValue$E = Phaser.Utils.Objects.GetValue;

  var Base = /*#__PURE__*/function (_Container) {
    _inherits(Base, _Container);

    var _super = _createSuper(Base);

    function Base(scene, x, y, minWidth, minHeight, config) {
      var _this;

      _classCallCheck(this, Base);

      _this = _super.call(this, scene, x, y, 2, 2);
      _this.isRexSizer = true;

      _this.setMinSize(minWidth, minHeight);

      _this.setName(GetValue$E(config, 'name', ''));

      _this.rexSizer = {};
      _this.space = {};
      _this.backgroundChildren = undefined;
      _this.sizerChildren = undefined; // [] or {}

      _this.layoutedChildren = undefined;
      var anchorConfig = GetValue$E(config, 'anchor', undefined);

      if (anchorConfig) {
        _this.setAnchor(anchorConfig);
      }

      _this.setInnerPadding(GetValue$E(config, 'space', 0));

      _this.setDraggable(GetValue$E(config, 'draggable', false));

      _this.setSizerEventsEnable(GetValue$E(config, 'sizerEvents', false));

      _this.setDirty(true);

      return _this;
    }

    _createClass(Base, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        if (fromScene) {
          // In this case, children will be cleared and destroy in scene level
          var sizers = this.getAllChildrenSizers([this]);

          for (var i = 0, cnt = sizers.length; i < cnt; i++) {
            sizers[i].sizerEventsEnable = false;
          }
        }

        _get(_getPrototypeOf(Base.prototype), "destroy", this).call(this, fromScene);

        Clear(this.backgroundChildren);
        Clear(this.sizerChildren);
        this.childrenMap = undefined;
        this.space = undefined;
        this.rexSizer = undefined;
        this.layoutedChildren = undefined;
      }
    }, {
      key: "setMinSize",
      value: function setMinSize(minWidth, minHeight) {
        this.setMinWidth(minWidth).setMinHeight(minHeight);
        return this;
      }
    }, {
      key: "setMinWidth",
      value: function setMinWidth(minWidth) {
        if (minWidth == null) {
          minWidth = 0;
        }

        this.minWidth = minWidth;
        return this;
      }
    }, {
      key: "setMinHeight",
      value: function setMinHeight(minHeight) {
        if (minHeight == null) {
          minHeight = 0;
        }

        this.minHeight = minHeight;
        return this;
      }
    }, {
      key: "setDirty",
      value: function setDirty(dirty) {
        if (dirty === undefined) {
          dirty = true;
        }

        this.dirty = dirty;
        return this;
      }
    }, {
      key: "setSizerEventsEnable",
      value: function setSizerEventsEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.sizerEventsEnable = enable;
        return this;
      }
    }, {
      key: "ignoreLayout",
      get: function get() {
        // Skip hidden or !dirty sizer
        return this.rexSizer.hidden || !this.dirty;
      }
    }, {
      key: "childrenWidth",
      get: function get() {
        if (this._childrenWidth === undefined) {
          this._childrenWidth = this.getChildrenWidth();
        }

        return this._childrenWidth;
      }
    }, {
      key: "childrenHeight",
      get: function get() {
        if (this._childrenHeight === undefined) {
          this._childrenHeight = this.getChildrenHeight();
        }

        return this._childrenHeight;
      }
    }, {
      key: "left",
      get: function get() {
        return this.x - GetDisplayWidth(this) * this.originX;
      },
      set: function set(value) {
        this.x += value - this.left;
      }
    }, {
      key: "alignLeft",
      value: function alignLeft(value) {
        this.left = value;
        return this;
      }
    }, {
      key: "right",
      get: function get() {
        return this.left + GetDisplayWidth(this);
      },
      set: function set(value) {
        this.x += value - this.right;
      }
    }, {
      key: "alignRight",
      value: function alignRight(value) {
        this.right = value;
        return this;
      }
    }, {
      key: "centerX",
      get: function get() {
        return this.left + GetDisplayWidth(this) / 2;
      },
      set: function set(value) {
        this.x += value - this.centerX;
      }
    }, {
      key: "alignCenterX",
      value: function alignCenterX(value) {
        this.centerX = value;
        return this;
      }
    }, {
      key: "top",
      get: function get() {
        return this.y - GetDisplayHeight(this) * this.originY;
      },
      set: function set(value) {
        this.y += value - this.top;
      }
    }, {
      key: "alignTop",
      value: function alignTop(value) {
        this.top = value;
        return this;
      }
    }, {
      key: "bottom",
      get: function get() {
        return this.top + GetDisplayHeight(this);
      },
      set: function set(value) {
        this.y += value - this.bottom;
      }
    }, {
      key: "alignBottom",
      value: function alignBottom(value) {
        this.bottom = value;
        return this;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.top + GetDisplayHeight(this) / 2;
      },
      set: function set(value) {
        this.y += value - this.centerY;
      }
    }, {
      key: "alignCenterY",
      value: function alignCenterY(value) {
        this.centerY = value;
        return this;
      }
    }, {
      key: "innerLeft",
      get: function get() {
        return this.left + this.space.left;
      }
    }, {
      key: "innerRight",
      get: function get() {
        return this.right - this.space.right;
      }
    }, {
      key: "innerTop",
      get: function get() {
        return this.top + this.space.top;
      }
    }, {
      key: "innerBottom",
      get: function get() {
        return this.bottom - this.space.bottom;
      }
    }, {
      key: "innerWidth",
      get: function get() {
        return this.width - this.space.left - this.space.right;
      }
    }, {
      key: "innerHeight",
      get: function get() {
        return this.height - this.space.top - this.space.bottom;
      }
    }, {
      key: "minInnerWidth",
      get: function get() {
        var result = this.minWidth - this.space.left - this.space.right;
        return Math.max(result, 0);
      }
    }, {
      key: "minInnerHeight",
      get: function get() {
        var result = this.minHeight - this.space.top - this.space.bottom;
        return Math.max(result, 0);
      }
    }]);

    return Base;
  }(ContainerLite);

  Object.assign(Base.prototype, methods$8);

  var GetChildrenWidth$3 = function GetChildrenWidth(minimumMode) {
    if (this.rexSizer.hidden) {
      return 0;
    }

    if (minimumMode === undefined) {
      minimumMode = true;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;

    if (this.orientation === 0) {
      // x
      // Get summation of minimum width
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (child.rexSizer.hidden) {
          continue;
        }

        if (child.rexSizer.proportion === 0 || minimumMode && child.rexSizer.proportion > 0) {
          childWidth = this.getChildWidth(child);
        } else {
          childWidth = 0;
        }

        padding = child.rexSizer.padding;
        childWidth += padding.left + padding.right;

        if (i > 0) {
          childWidth += this.space.item;
        }

        result += childWidth;
      }
    } else {
      // Get maximun width
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (!child.hasOwnProperty('rexSizer')) {
          continue;
        }

        if (child.rexSizer.hidden) {
          continue;
        }

        padding = child.rexSizer.padding;
        childWidth = this.getChildWidth(child) + padding.left + padding.right;
        result = Math.max(childWidth, result);
      }
    }

    return result + this.space.left + this.space.right;
  };

  var GetChildrenHeight$3 = function GetChildrenHeight(minimumMode) {
    if (this.rexSizer.hidden) {
      return 0;
    }

    if (minimumMode === undefined) {
      minimumMode = true;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childHeight;

    if (this.orientation === 0) {
      // x
      // Get maximun height
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (child.rexSizer.hidden) {
          continue;
        }

        padding = child.rexSizer.padding;
        childHeight = this.getChildHeight(child) + padding.top + padding.bottom;
        result = Math.max(childHeight, result);
      }
    } else {
      // Get summation of minimum height
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (!child.hasOwnProperty('rexSizer')) {
          continue;
        }

        if (child.rexSizer.hidden) {
          continue;
        }

        padding = child.rexSizer.padding;

        if (child.rexSizer.proportion === 0 || minimumMode && child.rexSizer.proportion > 0) {
          childHeight = this.getChildHeight(child);
        } else {
          childHeight = 0;
        }

        childHeight += padding.top + padding.bottom;

        if (i > 0) {
          childHeight += this.space.item;
        }

        result += childHeight;
      }
    }

    return result + this.space.top + this.space.bottom;
  };

  var GetExpandedChildWidth$2 = function GetExpandedChildWidth(child, parentWidth) {
    if (parentWidth === undefined) {
      parentWidth = this.width;
    }

    var childWidth;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;

    if (this.orientation === 0) {
      // x
      if (childConfig.proportion > 0 && this.proportionLength > 0) {
        childWidth = childConfig.proportion * this.proportionLength;
      }
    } else {
      // y
      if (childConfig.expand) {
        var innerWidth = parentWidth - this.space.left - this.space.right;
        childWidth = innerWidth - padding.left - padding.right;
      }
    }

    return childWidth;
  };

  var GetExpandedChildHeight$2 = function GetExpandedChildHeight(child, parentHeight) {
    if (parentHeight === undefined) {
      parentHeight = this.height;
    }

    var childHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;

    if (this.orientation === 0) {
      // x
      if (childConfig.expand) {
        var innerHeight = parentHeight - this.space.top - this.space.bottom;
        childHeight = innerHeight - padding.top - padding.bottom;
      }
    } else {
      // y
      if (childConfig.proportion > 0 && this.proportionLength > 0) {
        childHeight = childConfig.proportion * this.proportionLength;
      }
    }

    return childHeight;
  };

  var GetChildrenSizers$3 = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }

    var children = this.sizerChildren,
        child;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child.isRexSizer) {
        out.push(child);
      }
    }

    return out;
  };

  var PreLayout$3 = function PreLayout() {
    this._childrenProportion = undefined;
    this.proportionLength = undefined;
    PreLayout$4.call(this);
    return this;
  };

  var CheckSize = function CheckSize(child, parent) {
    if (child.width < child.childrenWidth) {
      // Warning
      console.warn("Layout width error: Parent=".concat(parent.constructor.name, ", Child=").concat(child.constructor.name));
    }

    if (child.height < child.childrenHeight) {
      // Warning
      console.warn("Layout height error: Parent=".concat(parent.constructor.name, ", Child=").concat(child.constructor.name));
    }
  };

  var LayoutChildren$4 = function LayoutChildren() {
    var children = this.sizerChildren;
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth;
    var innerHeight = this.innerHeight;
    var itemX = startX,
        itemY = startY;
    var x, y, width, height; // Align zone

    var childWidth, childHeight;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = !this.rtl ? children[i] : children[cnt - i - 1];

      if (child.rexSizer.hidden) {
        continue;
      }

      childConfig = child.rexSizer;
      padding = childConfig.padding;
      PreLayoutChild.call(this, child); // Set size

      if (child.isRexSpace) {
        childWidth = 0;
        childHeight = 0;
      } else {
        childWidth = this.getExpandedChildWidth(child);
        childHeight = this.getExpandedChildHeight(child);
      }

      if (child.isRexSizer) {
        child.runLayout(this, childWidth, childHeight);
        CheckSize(child, this);
      } else {
        ResizeGameObject(child, childWidth, childHeight);
      }

      if (childWidth === undefined) {
        childWidth = GetDisplayWidth(child);
      }

      if (childHeight === undefined) {
        childHeight = GetDisplayHeight(child);
      } // Set position


      if (this.orientation === 0) {
        // x
        x = itemX + padding.left;

        if (childConfig.proportion === 0 || this.proportionLength === 0) {
          width = childWidth;
        } else {
          width = childConfig.proportion * this.proportionLength;
        }

        y = itemY + padding.top;
        height = innerHeight - padding.top - padding.bottom;
      } else {
        // y
        x = itemX + padding.left;
        width = innerWidth - padding.left - padding.right;
        y = itemY + padding.top;

        if (childConfig.proportion === 0 || this.proportionLength === 0) {
          height = childHeight;
        } else {
          height = childConfig.proportion * this.proportionLength;
        }
      }

      LayoutChild.call(this, child, x, y, width, height, childConfig.align);

      if (this.orientation === 0) {
        // x
        itemX += width + padding.left + padding.right + this.space.item;
      } else {
        // y
        itemY += height + padding.top + padding.bottom + this.space.item;
      }
    }
  };

  var ResolveWidth$1 = function ResolveWidth(width) {
    var width = ResolveWidth$2.call(this, width); // Calculate proportionLength

    if (this.proportionLength === undefined && this.orientation === 0) {
      var remainder = width - this.childrenWidth;

      if (remainder > 0) {
        remainder = width - this.getChildrenWidth(false);
        this.proportionLength = remainder / this.childrenProportion;
      } else {
        this.proportionLength = 0;
      }
    }

    return width;
  };

  var ResolveHeight$1 = function ResolveHeight(parent, height) {
    var height = ResolveHeight$2.call(this, parent, height); // Get proportionLength

    if (this.proportionLength === undefined && this.orientation === 1) {
      var remainder = height - this.childrenHeight;

      if (remainder > 0) {
        remainder = height - this.getChildrenHeight(false);
        this.proportionLength = remainder / this.childrenProportion;
      } else {
        this.proportionLength = 0;
      }
    }

    return height;
  };

  var GetNearestChildIndex$1 = function GetNearestChildIndex(x, y) {
    var children = this.sizerChildren;

    if (children.length === 0) {
      return -1;
    }

    var nearestIndex = -1,
        minDistance = Infinity;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      var distance;

      if (this.orientation === 0) {
        // x
        distance = Math.abs(child.left - x);
      } else {
        distance = Math.abs(child.top - y);
      }

      if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i;
      }
    } // Check right bound of last child


    var child = children[children.length - 1];
    var distance;

    if (this.orientation === 0) {
      // x
      distance = Math.abs(child.right - x);
    } else {
      distance = Math.abs(child.bottom - y);
    }

    if (minDistance > distance) {
      minDistance = distance;
      nearestIndex = i + 1;
    }

    return nearestIndex;
  };

  var IsPlainObject$a = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$D = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER$3 = Phaser.Display.Align.CENTER;
  var PROPORTIONMODE = {
    min: 0,
    full: -1
  };

  var Add$7 = function Add(gameObject, proportion, align, paddingConfig, expand, childKey, index, minWidth, minHeight) {
    AddChild.call(this, gameObject);
    var isRexSpace = gameObject.isRexSpace;

    var proportionType = _typeof(proportion);

    if (proportion === null) {
      return this;
    } else if (proportionType === 'number') ; else if (proportionType === 'string') {
      proportion = PROPORTIONMODE[proportion];
    } else if (IsPlainObject$a(proportion)) {
      var config = proportion;
      proportion = GetValue$D(config, 'proportion', undefined);
      align = GetValue$D(config, 'align', ALIGN_CENTER$3);
      paddingConfig = GetValue$D(config, 'padding', 0);
      expand = GetValue$D(config, 'expand', false);
      childKey = GetValue$D(config, 'key', undefined);
      index = GetValue$D(config, 'index', undefined);

      if (!gameObject.isRexSizer) {
        minWidth = GetValue$D(config, 'minWidth', undefined);
        minHeight = GetValue$D(config, 'minHeight', undefined);
      }
    }

    if (typeof align === 'string') {
      align = ALIGNMODE[align];
    }

    if (proportion === undefined) {
      proportion = isRexSpace ? 1 : 0;
    }

    if (align === undefined) {
      align = ALIGN_CENTER$3;
    }

    if (paddingConfig === undefined) {
      paddingConfig = 0;
    }

    if (expand === undefined) {
      expand = false;
    }

    if (minWidth === undefined) {
      if (isRexSpace) {
        minWidth = 0;
      } else if (!gameObject.isRexSizer) {
        minWidth = gameObject._minWidth;
      }
    }

    if (minHeight === undefined) {
      if (isRexSpace) {
        minHeight = 0;
      } else if (!gameObject.isRexSizer) {
        minHeight = gameObject._minHeight;
      }
    }

    var config = this.getSizerConfig(gameObject);
    config.proportion = proportion;
    config.align = align;
    config.padding = GetBoundsConfig(paddingConfig);
    config.expand = expand;

    if (index === undefined || index >= this.sizerChildren.length) {
      this.sizerChildren.push(gameObject);
    } else {
      this.sizerChildren.splice(index, 0, gameObject);
    }

    if (!gameObject.isRexSizer) {
      // Expand normal game object
      if (proportion > 0) {
        if (this.orientation === 0) {
          // x
          // minWidth is still undefined, uses current display width
          gameObject.minWidth = minWidth === undefined ? GetDisplayWidth(gameObject) : minWidth;
        } else {
          // minHeight is still undefined, uses current display height
          gameObject.minHeight = minHeight === undefined ? GetDisplayHeight(gameObject) : minHeight;
        }
      }

      if (expand) {
        if (this.orientation === 0) {
          // x
          // Might have minHeight value, or still undefined
          gameObject.minHeight = minHeight;
        } else {
          // Might have minWidth value, or still undefined
          gameObject.minWidth = minWidth;
        }
      }
    }

    if (childKey !== undefined) {
      this.addChildrenMap(childKey, gameObject);
    }

    return this;
  };

  var AddChildMethods$7 = {
    add: Add$7,
    // sizer.add could be override
    addSpace: function addSpace(proportion) {
      this.insertSpace(undefined, proportion);
      return this;
    },
    insertSpace: function insertSpace(index, proportion) {
      if (proportion === undefined) {
        proportion = 1;
      }

      Add$7.call(this, new Space(this.scene), {
        proportion: proportion,
        minWidth: 0,
        minHeight: 0,
        index: index
      }); // No problem if sizer.add is override

      return this;
    },
    insert: function insert(index, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
      if (IsPlainObject$a(proportion)) {
        proportion.index = index;
      }

      Add$7.call(this, gameObject, proportion, align, paddingConfig, expand, childKey, index, minSize); // No problem if sizer.add is override

      return this;
    },
    insertAtPosition: function insertAtPosition(x, y, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
      var index = GetNearestChildIndex$1.call(this, x, y);

      if (index === -1) {
        index = undefined;
      }

      this.insert(index, gameObject, proportion, align, paddingConfig, expand, childKey, minSize);
      return this;
    }
  };

  var RemoveItem$4 = Phaser.Utils.Array.Remove;
  var ContainerRemove = ContainerLite.prototype.remove;

  var RemoveChild = function RemoveChild(gameObject, destroyChild) {
    if (this.isBackground(gameObject)) {
      RemoveItem$4(this.backgroundChildren, gameObject);
    }

    ContainerRemove.call(this, gameObject, destroyChild);

    if (!destroyChild && this.sizerEventsEnable) {
      gameObject.emit('sizer.remove', gameObject, this);
      this.emit('remove', gameObject, this);
    }

    return this;
  };

  var ContainerClear = ContainerLite.prototype.clear;

  var ClearChildren = function ClearChildren(destroyChild) {
    if (this.backgroundChildren) {
      this.backgroundChildren.length = 0;
    }

    var fireRemoveEvent = !destroyChild && this.sizerEventsEnable;
    var children;

    if (fireRemoveEvent) {
      children = this.getChildren([]);
    }

    ContainerClear.call(this, destroyChild);

    if (fireRemoveEvent) {
      var gameObject;

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        gameObject = children[i];
        gameObject.emit('sizer.remove', gameObject, this);
        this.emit('remove', gameObject, this);
      }
    }

    return this;
  };

  var RemoveItem$3 = Phaser.Utils.Array.Remove;
  var RemoveChildMethods$6 = {
    remove: function remove(gameObject, destroyChild) {
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }

      RemoveItem$3(this.sizerChildren, gameObject);
      RemoveChild.call(this, gameObject, destroyChild);
      return this;
    },
    removeAll: function removeAll(destroyChild) {
      for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
        this.remove(this.sizerChildren[i], destroyChild);
      }

      return this;
    },
    clear: function clear(destroyChild) {
      this.sizerChildren.length = 0;
      ClearChildren.call(this, destroyChild);
      return this;
    }
  };

  var methods$7 = {
    getChildrenWidth: GetChildrenWidth$3,
    getChildrenHeight: GetChildrenHeight$3,
    getExpandedChildWidth: GetExpandedChildWidth$2,
    getExpandedChildHeight: GetExpandedChildHeight$2,
    getChildrenSizers: GetChildrenSizers$3,
    preLayout: PreLayout$3,
    layoutChildren: LayoutChildren$4,
    resolveWidth: ResolveWidth$1,
    resolveHeight: ResolveHeight$1
  };
  Object.assign(methods$7, AddChildMethods$7, RemoveChildMethods$6);

  var GetChildrenProportion = function GetChildrenProportion() {
    var result = 0;
    var children = this.sizerChildren;
    var child, proportion;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child.rexSizer.hidden) {
        continue;
      }

      proportion = child.rexSizer.proportion;

      if (proportion > 0) {
        result += proportion;
      }
    }

    return result;
  };

  var OrientationMode = {
    x: 0,
    h: 0,
    horizontal: 0,
    'left-to-right': 0,
    y: 1,
    v: 1,
    vertical: 1,
    'top-to-bottom': 1
  };

  var GetOrientationMode = function GetOrientationMode(orientation) {
    if (typeof orientation === 'string') {
      orientation = OrientationMode[orientation];
    }

    return orientation;
  };

  var IsPlainObject$9 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$C = Phaser.Utils.Objects.GetValue;

  var Sizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(Sizer, _BaseSizer);

    var _super = _createSuper(Sizer);

    function Sizer(scene, x, y, minWidth, minHeight, orientation, config) {
      var _this;

      _classCallCheck(this, Sizer);

      if (IsPlainObject$9(x)) {
        config = x;
        x = GetValue$C(config, 'x', 0);
        y = GetValue$C(config, 'y', 0);
        minWidth = GetValue$C(config, 'width', undefined);
        minHeight = GetValue$C(config, 'height', undefined);
        orientation = GetValue$C(config, 'orientation', 0);
      } else if (IsPlainObject$9(minWidth)) {
        config = minWidth;
        minWidth = GetValue$C(config, 'width', undefined);
        minHeight = GetValue$C(config, 'height', undefined);
        orientation = GetValue$C(config, 'orientation', 0);
      } else if (IsPlainObject$9(orientation)) {
        config = orientation;
        orientation = GetValue$C(config, 'orientation', 0);
      }

      if (orientation === undefined) {
        orientation = 0;
      }

      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexSizer';
      _this.sizerChildren = [];

      _this.setOrientation(orientation);

      _this.setItemSpacing(GetValue$C(config, 'space.item', 0));

      _this.setRTL(GetValue$C(config, 'rtl', false));

      _this.addChildrenMap('items', _this.sizerChildren);

      return _this;
    }

    _createClass(Sizer, [{
      key: "setOrientation",
      value: function setOrientation(orientation) {
        this.orientation = GetOrientationMode(orientation);
        return this;
      }
    }, {
      key: "setItemSpacing",
      value: function setItemSpacing(space) {
        this.space.item = space;
        return this;
      }
    }, {
      key: "setRTL",
      value: function setRTL(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.rtl = enable;
        return this;
      }
    }, {
      key: "childrenProportion",
      get: function get() {
        if (this._childrenProportion === undefined) {
          this._childrenProportion = GetChildrenProportion.call(this);
        }

        return this._childrenProportion;
      }
    }]);

    return Sizer;
  }(Base);

  Object.assign(Sizer.prototype, methods$7);

  var CreateSizer = function CreateSizer(scene, data, view, styles, customBuilders) {
    return CreateAnySizer(scene, data, view, styles, customBuilders, Sizer);
  };

  var GetChildrenWidth$2 = function GetChildrenWidth() {
    if (this.rexSizer.hidden) {
      return 0;
    } // Before RunChildrenWrap


    return this.maxChildWidth + this.space.left + this.space.right;
  };

  var GetChildrenHeight$2 = function GetChildrenHeight() {
    if (this.rexSizer.hidden) {
      return 0;
    } // After RunChildrenWrap


    return this.widthWrapResult.height + this.space.top + this.space.bottom;
  };

  var GetChildrenSizers$2 = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }

    var children = this.sizerChildren,
        child;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child === '\n') {
        continue;
      }

      if (child.isRexSizer) {
        out.push(child);
      }
    }

    return out;
  };

  var PreLayout$2 = function PreLayout() {
    this._maxChildWidth = undefined;
    this._maxChildHeight = undefined;
    PreLayout$4.call(this);
    return this;
  };

  var LayoutChildren$3 = function LayoutChildren() {
    var innerLineWidth = this.innerWidth;
    var justifyPercentage = this.justifyPercentage;
    var itemSpace = this.space.item,
        lineSpace = this.space.line,
        indentLeftOdd = this.space.indentLeftOdd,
        indentLeftEven = this.space.indentLeftEven,
        indentTopOdd = this.space.indentTopOdd,
        indentTopEven = this.space.indentTopEven;
    var child,
        childConfig,
        padding,
        justifySpace = 0,
        indentLeft,
        indentTop;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var x, y, width, height; // Align zone

    var lines = this.widthWrapResult.lines;
    var line, lineChlidren, remainderLineWidth;
    var itemX,
        itemY = startY;

    for (var i = 0, icnt = lines.length; i < icnt; i++) {
      // Layout this line
      line = lines[i];
      lineChlidren = line.children;

      if (this.rtl) {
        lineChlidren.reverse();
      }

      indentLeft = i % 2 ? indentLeftEven : indentLeftOdd;
      itemX = startX + indentLeft;
      remainderLineWidth = innerLineWidth - line.width;

      switch (this.align) {
        case 0:
          // left
          break;

        case 1:
          // right
          itemX += remainderLineWidth;
          break;

        case 2:
          // center
          itemX += remainderLineWidth / 2;
          break;

        case 3:
          // justify-left
          justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
          break;

        case 4:
          // justify-right
          justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);

          if (justifySpace === 0) {
            // Align right
            itemX += remainderLineWidth;
          }

          break;

        case 5:
          // justify-center
          justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);

          if (justifySpace === 0) {
            // Align center
            itemX += remainderLineWidth / 2;
          }

          break;
      }

      for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
        child = lineChlidren[j];

        if (child.rexSizer.hidden) {
          continue;
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;
        PreLayoutChild.call(this, child);
        x = itemX + padding.left;

        if (j > 0) {
          x += itemSpace;
        }

        indentTop = j % 2 ? indentTopEven : indentTopOdd;
        y = itemY + indentTop + padding.top;
        width = GetDisplayWidth(child);
        height = GetDisplayHeight(child);
        itemX = x + width + padding.right + justifySpace;
        LayoutChild.call(this, child, x, y, width, height, childConfig.align);
      }

      itemY += line.height + lineSpace;
    }
  };

  var GetJustifySpace = function GetJustifySpace(total, remainder, justifyPercentage, childCount) {
    return remainder / total <= justifyPercentage ? remainder / (childCount - 1) : 0;
  };

  var RunChildrenWrap = function RunChildrenWrap(lineWidth, out) {
    if (out === undefined) {
      out = {
        lines: [],
        width: 0,
        height: 0
      };
    } else {
      out.lines.length = 0;
      out.width = 0;
      out.height = 0;
    }

    var children = this.sizerChildren;
    var itemSpace = this.space.item,
        lineSpace = this.space.line,
        indentLeftOdd = this.space.indentLeftOdd,
        indentLeftEven = this.space.indentLeftEven,
        indentTopOdd = this.space.indentTopOdd,
        indentTopEven = this.space.indentTopEven;
    var child,
        childWidth,
        childHeight,
        remainder = 0,
        indentLeft;
    var lines = out.lines,
        lastLine = undefined,
        newLine;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child === '\n') {
        child = undefined;
        childWidth = 0;
        newLine = true;
      } else {
        if (child.rexSizer.hidden) {
          continue;
        }

        if (child.isRexSizer) {
          child.layout(); // Use original size
        }

        childWidth = GetChildWidth(child);
        newLine = remainder < childWidth || lastLine === undefined;
      } // New line


      if (newLine) {
        if (lastLine) {
          lastLine.width = lineWidth - (remainder + itemSpace);
          out.width = Math.max(out.width, lastLine.width);
          out.height += lastLine.height + lineSpace;
        }

        lastLine = {
          children: [],
          // width: 0,
          height: 0
        };
        lines.push(lastLine);
        var indentLeft = lines.length % 2 ? indentLeftOdd : indentLeftEven;
        remainder = lineWidth - indentLeft;
      }

      remainder -= childWidth + itemSpace;

      if (child) {
        lastLine.children.push(child);
        childHeight = GeChildHeight(child);
        lastLine.height = Math.max(lastLine.height, childHeight);
      }
    }

    if (lastLine) {
      lastLine.width = lineWidth - (remainder + itemSpace);
      out.width = Math.max(out.width, lastLine.width);
      out.height += lastLine.height;
    }

    out.height += Math.max(indentTopOdd, indentTopEven);
    return out;
  };

  var GetChildWidth = function GetChildWidth(child) {
    var padding = child.rexSizer.padding;
    return GetDisplayWidth(child) + padding.left + padding.right;
  };

  var GeChildHeight = function GeChildHeight(child) {
    var padding = child.rexSizer.padding;
    return GetDisplayHeight(child) + padding.top + padding.bottom;
  };

  var RunWidthWrap$1 = function RunWidthWrap(width) {
    var innerWidth = width - this.space.left - this.space.right;
    this.widthWrapResult = RunChildrenWrap.call(this, innerWidth, this.widthWrapResult);
    RunWidthWrap$2.call(this, width);
  };

  var DistanceBetween$1 = Phaser.Math.Distance.Between;

  var GetNearestChildIndex = function GetNearestChildIndex(x, y) {
    var children = this.sizerChildren;

    if (children.length === 0) {
      return -1;
    }

    var nearestIndex = -1,
        minDistance = Infinity;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i]; // position is not at this line

      if (Math.abs(child.centerY - y) > child.height / 2) {
        continue;
      } // Check left bound


      var distance = DistanceBetween$1(child.left, child.centerY, x, y);

      if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i;
      } // Is last child of this line


      var nextChild = children[i + 1];

      if (nextChild && nextChild.y === child.y) {
        continue;
      }

      var distance = DistanceBetween$1(child.right, child.centerY, x, y);

      if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i + 1;
      }
    }

    return nearestIndex;
  };

  var IsPlainObject$8 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$B = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER$2 = Phaser.Display.Align.CENTER;

  var Add$6 = function Add(gameObject, paddingConfig, childKey, index) {
    if (gameObject === '\n') {
      this.addNewLine();
      return this;
    }

    AddChild.call(this, gameObject);

    if (IsPlainObject$8(paddingConfig)) {
      var config = paddingConfig;
      paddingConfig = GetValue$B(config, 'padding', 0);
      childKey = GetValue$B(config, 'key', undefined);
      index = GetValue$B(config, 'index', undefined);
    }

    if (paddingConfig === undefined) {
      paddingConfig = 0;
    }

    var config = this.getSizerConfig(gameObject);
    config.align = ALIGN_CENTER$2;
    config.padding = GetBoundsConfig(paddingConfig);

    if (index === undefined || index >= this.sizerChildren.length) {
      this.sizerChildren.push(gameObject);
    } else {
      this.sizerChildren.splice(index, 0, gameObject);
    }

    if (childKey !== undefined) {
      this.addChildrenMap(childKey, gameObject);
    }

    return this;
  };

  var AddChildMethods$6 = {
    add: function add(gameObject, paddingConfig, childKey) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Add$6.call(this, gameObjects[i], paddingConfig);
        }
      } else {
        Add$6.call(this, gameObject, paddingConfig, childKey);
      }

      return this;
    },
    addNewLine: function addNewLine() {
      this.sizerChildren.push('\n');
      return this;
    },
    insert: function insert(index, gameObject, paddingConfig, childKey) {
      Add$6.call(this, gameObject, paddingConfig, childKey, index);
      return this;
    },
    insertAtPosition: function insertAtPosition(x, y, gameObject, paddingConfig, childKey) {
      var index = GetNearestChildIndex.call(this, x, y);

      if (index === -1) {
        index = undefined;
      }

      this.insert(index, gameObject, paddingConfig, childKey);
      return this;
    }
  };

  var RemoveItem$2 = Phaser.Utils.Array.Remove;
  var RemoveChildMethods$5 = {
    remove: function remove(gameObject, destroyChild) {
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }

      RemoveItem$2(this.sizerChildren, gameObject);
      RemoveChild.call(this, gameObject, destroyChild);
      return this;
    },
    removeAll: function removeAll(destroyChild) {
      for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
        this.remove(this.sizerChildren[i], destroyChild);
      }

      return this;
    },
    clear: function clear(destroyChild) {
      this.sizerChildren.length = 0;
      ClearChildren.call(this, destroyChild);
      return this;
    }
  };

  var methods$6 = {
    getChildrenWidth: GetChildrenWidth$2,
    getChildrenHeight: GetChildrenHeight$2,
    getChildrenSizers: GetChildrenSizers$2,
    preLayout: PreLayout$2,
    layoutChildren: LayoutChildren$3,
    runWidthWrap: RunWidthWrap$1
  };
  Object.assign(methods$6, AddChildMethods$6, RemoveChildMethods$5);

  var GetMaxChildWidth = function GetMaxChildWidth(children) {
    if (children === undefined) {
      children = this.sizerChildren;
    }

    var result = 0;
    var child, childWidth;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child === '\n') {
        continue;
      }

      childWidth = this.getChildWidth(child);
      result = Math.max(childWidth, result);
    }

    return result;
  };

  var GetMaxChildHeight = function GetMaxChildHeight(children) {
    if (children === undefined) {
      children = this.sizerChildren;
    }

    var result = 0;
    var child, childHeight;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child === '\n') {
        continue;
      }

      childHeight = child.isRexSizer ? Math.max(child.minHeight, child.childrenHeight) : child.hasOwnProperty('minHeight') ? child.minHeight : GetDisplayHeight(child);
      result = Math.max(childHeight, result);
    }

    return result;
  };

  var IsPlainObject$7 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$A = Phaser.Utils.Objects.GetValue;

  var FixWidthSizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(FixWidthSizer, _BaseSizer);

    var _super = _createSuper(FixWidthSizer);

    function FixWidthSizer(scene, x, y, minWidth, minHeight, config) {
      var _this;

      _classCallCheck(this, FixWidthSizer);

      if (IsPlainObject$7(x)) {
        config = x;
        x = GetValue$A(config, 'x', 0);
        y = GetValue$A(config, 'y', 0);
        minWidth = GetValue$A(config, 'width', undefined);
        minHeight = GetValue$A(config, 'height', undefined);
      } else if (IsPlainObject$7(minWidth)) {
        config = minWidth;
        minWidth = GetValue$A(config, 'width', undefined);
        minHeight = GetValue$A(config, 'height', undefined);
      }

      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexFixWidthSizer';
      _this.sizerChildren = [];

      _this.setOrientation(GetValue$A(config, 'orientation', 0));

      _this.setItemSpacing(GetValue$A(config, 'space.item', 0));

      _this.setLineSpacing(GetValue$A(config, 'space.line', 0));

      _this.setIntentLeft(GetValue$A(config, 'space.indentLeftOdd', 0), GetValue$A(config, 'space.indentLeftEven', 0));

      _this.setIntentTop(GetValue$A(config, 'space.indentTopOdd', 0), GetValue$A(config, 'space.indentTopEven', 0));

      _this.setAlign(GetValue$A(config, 'align', 0));

      _this.setJustifyPercentage(GetValue$A(config, 'justifyPercentage', 0.25));

      _this.setRTL(GetValue$A(config, 'rtl', false));

      _this.addChildrenMap('items', _this.sizerChildren);

      return _this;
    }

    _createClass(FixWidthSizer, [{
      key: "setOrientation",
      value: function setOrientation(orientation) {
        this.orientation = GetOrientationMode(orientation);
        return this;
      }
    }, {
      key: "setItemSpacing",
      value: function setItemSpacing(space) {
        this.space.item = space;
        return this;
      }
    }, {
      key: "setLineSpacing",
      value: function setLineSpacing(space) {
        this.space.line = space;
        return this;
      }
    }, {
      key: "setIntentLeft",
      value: function setIntentLeft(odd, even) {
        this.space.indentLeftOdd = odd;
        this.space.indentLeftEven = even;
        return this;
      }
    }, {
      key: "setIntentTop",
      value: function setIntentTop(odd, even) {
        this.space.indentTopOdd = odd;
        this.space.indentTopEven = even;
        return this;
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        if (typeof align === 'string') {
          align = ALIGN[align];
        }

        this.align = align;
        return this;
      }
    }, {
      key: "setJustifyPercentage",
      value: function setJustifyPercentage(value) {
        this.justifyPercentage = value;
        return this;
      }
    }, {
      key: "setRTL",
      value: function setRTL(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }

        this.rtl = enabled;
        return this;
      }
    }, {
      key: "maxChildWidth",
      get: function get() {
        if (this._maxChildWidth === undefined) {
          this._maxChildWidth = GetMaxChildWidth.call(this);
        }

        return this._maxChildWidth;
      }
    }, {
      key: "maxChildHeight",
      get: function get() {
        if (this._maxChildHeight === undefined) {
          this._maxChildHeight = GetMaxChildHeight.call(this);
        }

        return this._maxChildHeight;
      }
    }]);

    return FixWidthSizer;
  }(Base);

  var ALIGN = {
    left: 0,
    top: 0,
    right: 1,
    bottom: 1,
    center: 2,
    justify: 3,
    'justify-left': 3,
    'justify-top': 3,
    'justify-right': 4,
    'justify-bottom': 4,
    'justify-center': 5
  };
  Object.assign(FixWidthSizer.prototype, methods$6);

  var CreateFixWidthSizer = function CreateFixWidthSizer(scene, data, view, styles, customBuilders) {
    return CreateAnySizer(scene, data, view, styles, customBuilders, FixWidthSizer);
  };

  var Sum = function Sum() {
    return Array.prototype.reduce.call(arguments, Add$5, 0);
  };

  var Add$5 = function Add(a, b) {
    return a + b;
  };

  var GetChildrenWidth$1 = function GetChildrenWidth() {
    if (this.rexSizer.hidden) {
      return 0;
    }

    var result = 0,
        columnWidth;
    var children = this.sizerChildren;
    var child, padding, childWidth, proportion;

    for (var i = 0; i < this.columnCount; i++) {
      proportion = this.columnProportions[i];
      columnWidth = 0;

      if (proportion === 0) {
        for (var j = 0; j < this.rowCount; j++) {
          child = children[j * this.columnCount + i];

          if (!child) {
            continue;
          }

          if (child.rexSizer.hidden) {
            continue;
          }

          padding = child.rexSizer.padding;
          childWidth = this.getChildWidth(child) + padding.left + padding.right;
          columnWidth = Math.max(columnWidth, childWidth);
        }

        result += columnWidth;
      } // else,(proportion > 0) : columnWidth is 0


      this.columnWidth[i] = columnWidth;
    }

    var space = this.space;
    var indentLeft = Math.max(space.indentLeftOdd, space.indentLeftEven);
    return result + Sum.apply(void 0, [space.left, indentLeft].concat(_toConsumableArray(space.column), [space.right]));
  };

  var GetChildrenHeight$1 = function GetChildrenHeight() {
    if (this.rexSizer.hidden) {
      return 0;
    }

    var result = 0,
        rowHeight;
    var children = this.sizerChildren;
    var child, padding, childHeight, proportion;

    for (var i = 0; i < this.rowCount; i++) {
      proportion = this.rowProportions[i];
      rowHeight = 0;

      if (proportion === 0) {
        for (var j = 0; j < this.columnCount; j++) {
          child = children[i * this.columnCount + j];

          if (!child) {
            continue;
          }

          if (child.rexSizer.hidden) {
            continue;
          }

          childHeight = child.isRexSizer ? Math.max(child.minHeight, child.childrenHeight) : child.hasOwnProperty('minHeight') ? child.minHeight : GetDisplayHeight(child);
          padding = child.rexSizer.padding;
          childHeight += padding.top + padding.bottom;
          rowHeight = Math.max(rowHeight, childHeight);
        }

        result += rowHeight;
      } // else,(proportion > 0) : rowHeight is 0


      this.rowHeight[i] = rowHeight;
    }

    var space = this.space;
    var indentTop = Math.max(space.indentTopOdd, space.indentTopEven);
    return result + Sum.apply(void 0, [space.top, indentTop].concat(_toConsumableArray(space.row), [space.bottom]));
  };

  var GetExpandedChildWidth$1 = function GetExpandedChildWidth(child, colWidth) {
    var childWidth;
    var childConfig = child.rexSizer;

    if (childConfig.expand) {
      var padding = childConfig.padding;
      childWidth = colWidth - padding.left - padding.right;
    }

    return childWidth;
  };

  var GetExpandedChildHeight$1 = function GetExpandedChildHeight(child, rowHeight) {
    var childHeight;
    var childConfig = child.rexSizer;

    if (childConfig.expand) {
      var padding = childConfig.padding;
      childHeight = rowHeight - padding.top - padding.bottom;
    }

    return childHeight;
  };

  var GetChildrenSizers$1 = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }

    var children = this.sizerChildren,
        child;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child && child.isRexSizer) {
        out.push(child);
      }
    }

    return out;
  };

  var PreLayout$1 = function PreLayout() {
    this._totalColumnProportions = undefined;
    this._totalRowProportions = undefined;
    this.proportionWidthLength = undefined;
    this.proportionHeightLength = undefined;
    PreLayout$4.call(this);
    return this;
  };

  var LayoutChildren$2 = function LayoutChildren() {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var itemX,
        itemY = startY;
    var x, y, width, height; // Align zone

    var childWidth, childHeight; // Layout grid children

    var columnSpace = this.space.column,
        rowSpace = this.space.row,
        indentLeftOdd = this.space.indentLeftOdd,
        indentLeftEven = this.space.indentLeftEven,
        indentTopOdd = this.space.indentTopOdd,
        indentTopEven = this.space.indentTopEven;
    var colWidth, rowHeight;
    var indentLeft, indentTop;

    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      rowHeight = this.getRowHeight(rowIndex);
      indentLeft = rowIndex % 2 ? indentLeftEven : indentLeftOdd;
      itemX = startX + indentLeft;

      for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
        colWidth = this.getColumnWidth(columnIndex);
        child = this.getChildAt(columnIndex, rowIndex);

        if (!child || child.rexSizer.hidden) {
          itemX += colWidth + columnSpace[columnIndex];
          continue;
        }

        PreLayoutChild.call(this, child);
        childWidth = this.getExpandedChildWidth(child, colWidth);
        childHeight = this.getExpandedChildHeight(child, rowHeight);

        if (child.isRexSizer) {
          child.runLayout(this, childWidth, childHeight);
          CheckSize(child, this);
        } else {
          ResizeGameObject(child, childWidth, childHeight);
        }

        childConfig = child.rexSizer;
        padding = childConfig.padding;
        x = itemX + padding.left;
        width = colWidth - padding.left - padding.right;
        indentTop = columnIndex % 2 ? indentTopEven : indentTopOdd;
        y = itemY + indentTop + padding.top;
        height = rowHeight - padding.top - padding.bottom;
        LayoutChild.call(this, child, x, y, width, height, childConfig.align);
        itemX += colWidth + columnSpace[columnIndex];
      }

      itemY += rowHeight + rowSpace[rowIndex];
    }
  };

  var ResolveWidth = function ResolveWidth(width) {
    var width = ResolveWidth$2.call(this, width); // Get proportionLength

    if (this.proportionWidthLength === undefined) {
      var totalColumnProportions = this.totalColumnProportions;

      if (totalColumnProportions > 0) {
        var remainder = width - this.childrenWidth;

        if (remainder >= 0) {
          this.proportionWidthLength = remainder / totalColumnProportions;
        }
      } else {
        this.proportionWidthLength = 0;
      }
    }

    return width;
  };

  var ResolveHeight = function ResolveHeight(parent, height) {
    var height = ResolveHeight$2.call(this, parent, height); // Get proportionLength    

    if (this.proportionHeightLength === undefined) {
      var totalRowProportions = this.totalRowProportions;

      if (totalRowProportions > 0) {
        var remainder = height - this.childrenHeight;

        if (remainder >= 0) {
          this.proportionHeightLength = remainder / totalRowProportions;
        }
      } else {
        this.proportionHeightLength = 0;
      }
    }

    return height;
  };

  var ResolveChildrenWidth = function ResolveChildrenWidth(parentWidth) {
    // Resolve width of sizer children
    var child, childWidth;
    var colWidth;

    for (var i in this.sizerChildren) {
      child = this.sizerChildren[i];

      if (child && child.isRexSizer && !child.ignoreLayout) {
        colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
        childWidth = this.getExpandedChildWidth(child, colWidth);
        childWidth = child.resolveWidth(childWidth);
        child.resolveChildrenWidth(childWidth);
      }
    }
  };

  // Default method
  var RunWidthWrap = function RunWidthWrap(width) {
    var child, childWidth;
    var colWidth;

    for (var i in this.sizerChildren) {
      child = this.sizerChildren[i];

      if (!child || child.isRexSizer && child.ignoreLayout || !child.runWidthWrap) {
        continue;
      }

      colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
      childWidth = this.getExpandedChildWidth(child, colWidth);

      if (child.isRexSizer) {
        childWidth = child.resolveWidth(childWidth);
      }

      child.runWidthWrap(childWidth);
    }

    return this;
  };

  var IsPlainObject$6 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$z = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER$1 = Phaser.Display.Align.CENTER;

  var GetEmptyCellIndex = function GetEmptyCellIndex(columnIndex, rowIndex, cells, columnCount, rowCount) {
    if (typeof columnIndex === 'number' || typeof rowIndex === 'number') {
      if (columnIndex === undefined) {
        var idx;

        for (var i = 0; i < columnCount; i++) {
          idx = rowIndex * columnCount + i;

          if (!cells[idx]) {
            return idx;
          }
        }
      } else if (rowIndex === undefined) {
        var idx;

        for (var i = 0; i < rowCount; i++) {
          idx = i * columnCount + columnIndex;

          if (!cells[idx]) {
            return idx;
          }
        }
      } else {
        var idx = rowIndex * columnCount + columnIndex;

        if (!cells[idx]) {
          return idx;
        }
      }
    } else if (rowIndex === true) {
      var idx;

      for (var i = 0; i < columnCount; i++) {
        for (var j = 0; j < rowCount; j++) {
          idx = j * columnCount + i;

          if (!cells[idx]) {
            return idx;
          }
        }
      }
    } else {
      for (var i = 0, cnt = cells.length; i < cnt; i++) {
        if (!cells[i]) {
          return i;
        }
      }
    }

    return null;
  };

  var Add$4 = function Add(gameObject, columnIndex, rowIndex, align, paddingConfig, expand, childKey) {
    AddChild.call(this, gameObject);

    if (IsPlainObject$6(columnIndex)) {
      var config = columnIndex;
      columnIndex = GetValue$z(config, 'column', undefined);
      rowIndex = GetValue$z(config, 'row', undefined);
      align = GetValue$z(config, 'align', ALIGN_CENTER$1);
      paddingConfig = GetValue$z(config, 'padding', 0);
      expand = GetValue$z(config, 'expand', false);
      childKey = GetValue$z(config, 'key', undefined);
    } // Get insert index


    var itemIndex = GetEmptyCellIndex(columnIndex, rowIndex, this.sizerChildren, this.columnCount, this.rowCount);

    if (itemIndex === null) {
      // Specific index mode
      if (typeof columnIndex === 'number' && typeof rowIndex === 'number') {
        return this;
      }

      if (rowIndex === true || typeof rowIndex === 'number') {
        this.addEmptyColumn();
      } else {
        this.addEmptyRow();
      } // Get insert index again


      itemIndex = GetEmptyCellIndex(columnIndex, rowIndex, this.sizerChildren, this.columnCount, this.rowCount);
    }

    if (typeof align === 'string') {
      align = ALIGNMODE[align];
    }

    if (align === undefined) {
      align = ALIGN_CENTER$1;
    }

    if (paddingConfig === undefined) {
      paddingConfig = 0;
    }

    if (expand === undefined) {
      expand = true;
    }

    var config = this.getSizerConfig(gameObject);
    config.align = align;
    config.padding = GetBoundsConfig(paddingConfig);
    config.expand = expand;
    this.sizerChildren[itemIndex] = gameObject;

    if (childKey !== undefined) {
      this.addChildrenMap(childKey, gameObject);
    }

    return this;
  };

  var AddChildMethods$5 = {
    add: Add$4
  };

  var Fill = function Fill(arr, value, startIdx, endIdx) {
    if (startIdx === undefined) {
      startIdx = 0;
    }

    if (endIdx === undefined) {
      endIdx = arr.length - 1;
    }

    for (var i = startIdx; i <= endIdx; i++) {
      arr[i] = value;
    }

    return arr;
  };

  var RemoveChildMethods$4 = {
    remove: function remove(gameObject, destroyChild) {
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }

      var idx = this.sizerChildren.indexOf(gameObject);

      if (idx !== -1) {
        this.sizerChildren[idx] = null;
      }

      RemoveChild.call(this, gameObject, destroyChild);
      return this;
    },
    removeAt: function removeAt(columnIndex, rowIndex, destroyChild) {
      var child = this.getChildAt(columnIndex, rowIndex);

      if (child) {
        this.remove(child, destroyChild);
      }

      return this;
    },
    removeAll: function removeAll(destroyChild) {
      for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
        var child = this.sizerChildren[i];

        if (!child) {
          continue;
        }

        this.remove(child, destroyChild);
      }

      return this;
    },
    clear: function clear(destroyChild) {
      Fill(this.sizerChildren, null);
      ClearChildren.call(this, destroyChild);
      return this;
    }
  };

  var GetValue$y = Phaser.Utils.Objects.GetValue;

  var ResetGrid = function ResetGrid(columnCount, rowCount, columnProportions, rowProportions, space) {
    if (columnProportions === undefined) {
      columnProportions = 0;
    }

    if (rowProportions === undefined) {
      rowProportions = 0;
    }

    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.gridCount = columnCount * rowCount; // children

    if (this.sizerChildren === undefined) {
      this.sizerChildren = [];
    } else {
      this.removeAll();
    }

    this.sizerChildren.length = columnCount * rowCount;
    Fill(this.sizerChildren, null); // proportions

    this.columnProportions = [];
    this.columnProportions.length = columnCount;

    if (typeof columnProportions === 'number') {
      Fill(this.columnProportions, columnProportions);
    } else {
      for (var i = 0; i < columnCount; i++) {
        this.columnProportions[i] = columnProportions[i] || 0;
      }
    }

    this.rowProportions = [];
    this.rowProportions.length = rowCount;

    if (typeof rowProportions === 'number') {
      Fill(this.rowProportions, rowProportions);
    } else {
      for (var i = 0; i < rowCount; i++) {
        this.rowProportions[i] = rowProportions[i] || 0;
      }
    } // width & height


    this.columnWidth = [];
    this.columnWidth.length = columnCount;
    this.rowHeight = [];
    this.rowHeight.length = rowCount; // space

    this.space.column = [];
    this.space.column.length = columnCount - 1;
    var columnSpace = GetValue$y(space, 'column', 0);

    if (typeof columnSpace === 'number') {
      Fill(this.space.column, columnSpace);
    } else {
      for (var i = 0, cnt = this.space.column.length; i < cnt; i++) {
        this.space.column[i] = columnSpace[i] || 0;
      }
    }

    this.space.row = [];
    this.space.row.length = rowCount - 1;
    var rowSpace = GetValue$y(space, 'row', 0);

    if (typeof rowSpace === 'number') {
      Fill(this.space.row, rowSpace);
    } else {
      for (var i = 0, cnt = this.space.row.length; i < cnt; i++) {
        this.space.row[i] = rowSpace[i] || 0;
      }
    }

    return this;
  };

  var InseryEmptyRow = function InseryEmptyRow(rowIndex, proportion, space) {
    if (proportion === undefined) {
      proportion = this.rowProportions[0] || 0;
    }

    if (space === undefined) {
      space = this.space.row[0] || 0;
    }

    this.rowCount += 1;
    this.gridCount += this.columnCount;
    var args = [rowIndex * this.columnCount, 0];

    for (var i = 0; i < this.columnCount; i++) {
      args.push(null);
    }

    this.sizerChildren.splice.apply(this.sizerChildren, args);
    this.rowProportions.push(proportion);
    this.rowHeight.length += 1; // this.rowHeight will be recalculated when layout()    

    this.space.row.splice(rowIndex, 0, space);
    return this;
  };

  var AddEmptyRow = function AddEmptyRow(proportion, space) {
    InseryEmptyRow.call(this, this.rowCount, proportion, space);
    return this;
  };

  var InsertEmptyColumn = function InsertEmptyColumn(colIndex, proportion, space) {
    if (proportion === undefined) {
      proportion = this.columnProportions[0] || 0;
    }

    if (space === undefined) {
      space = this.space.column[0] || 0;
    }

    this.columnCount += 1;
    this.gridCount += this.rowCount;

    for (var i = this.rowCount - 1; i >= 0; i--) {
      var insertIndex = i * this.columnCount + colIndex;
      this.sizerChildren.splice(insertIndex, 0, null);
    }

    this.columnProportions.push(proportion);
    this.columnWidth.length += 1; // this.columnWidth will be recalculated when layout()    

    this.space.column.splice(colIndex, 0, space);
    return this;
  };

  var AddEmptyColumn = function AddEmptyColumn(proportion, space) {
    InsertEmptyColumn.call(this, this.columnCount, proportion, space);
    return this;
  };

  var methods$5 = {
    getChildrenWidth: GetChildrenWidth$1,
    getChildrenHeight: GetChildrenHeight$1,
    getExpandedChildWidth: GetExpandedChildWidth$1,
    getExpandedChildHeight: GetExpandedChildHeight$1,
    getChildrenSizers: GetChildrenSizers$1,
    preLayout: PreLayout$1,
    layoutChildren: LayoutChildren$2,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight,
    resolveChildrenWidth: ResolveChildrenWidth,
    runWidthWrap: RunWidthWrap,
    resetGrid: ResetGrid,
    inseryEmptyRow: InseryEmptyRow,
    addEmptyRow: AddEmptyRow,
    insertEmptyColumn: InsertEmptyColumn,
    addEmptyColumn: AddEmptyColumn
  };
  Object.assign(methods$5, AddChildMethods$5, RemoveChildMethods$4);

  var GetTotalColumnProportions = function GetTotalColumnProportions() {
    var result = 0,
        proportion;

    for (var i = 0; i < this.columnCount; i++) {
      proportion = this.columnProportions[i];

      if (proportion > 0) {
        result += proportion;
      }
    }

    return result;
  };

  var GetTotalRowProportions = function GetTotalRowProportions() {
    var result = 0,
        proportion;

    for (var i = 0; i < this.rowCount; i++) {
      proportion = this.rowProportions[i];

      if (proportion > 0) {
        result += proportion;
      }
    }

    return result;
  };

  var IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$x = Phaser.Utils.Objects.GetValue;

  var GridSizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(GridSizer, _BaseSizer);

    var _super = _createSuper(GridSizer);

    function GridSizer(scene, x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportions, config) {
      var _this;

      _classCallCheck(this, GridSizer);

      if (IsPlainObject$5(x)) {
        config = x;
        x = GetValue$x(config, 'x', 0);
        y = GetValue$x(config, 'y', 0);
        minWidth = GetValue$x(config, 'width', undefined);
        minHeight = GetValue$x(config, 'height', undefined);
        columnCount = GetValue$x(config, 'column', config.col || 0);
        rowCount = GetValue$x(config, 'row', 0);
        columnProportions = GetValue$x(config, 'columnProportions', 0);
        rowProportions = GetValue$x(config, 'rowProportions', 0);
      } else if (IsPlainObject$5(minWidth)) {
        config = minWidth;
        minWidth = GetValue$x(config, 'width', undefined);
        minHeight = GetValue$x(config, 'height', undefined);
        columnCount = GetValue$x(config, 'column', config.col || 0);
        rowCount = GetValue$x(config, 'row', 0);
        columnProportions = GetValue$x(config, 'columnProportions', 0);
        rowProportions = GetValue$x(config, 'rowProportions', 0);
      } else if (IsPlainObject$5(columnCount)) {
        config = columnCount;
        columnCount = GetValue$x(config, 'column', config.col || 0);
        rowCount = GetValue$x(config, 'row', 0);
        columnProportions = GetValue$x(config, 'columnProportions', 0);
        rowProportions = GetValue$x(config, 'rowProportions', 0);
      } else if (IsPlainObject$5(columnProportions)) {
        config = columnProportions;
        columnProportions = GetValue$x(config, 'columnProportions', 0);
        rowProportions = GetValue$x(config, 'rowProportions', 0);
      }

      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexGridSizer';

      _this.resetGrid(columnCount, rowCount, columnProportions, rowProportions, GetValue$x(config, 'space', undefined));

      _this.setIndentLeft(GetValue$x(config, 'space.indentLeftOdd', 0), GetValue$x(config, 'space.indentLeftEven', 0));

      _this.setIndentTop(GetValue$x(config, 'space.indentTopOdd', 0), GetValue$x(config, 'space.indentTopEven', 0));

      _this.addChildrenMap('items', _this.sizerChildren);

      var createCellContainerCallback = GetValue$x(config, 'createCellContainerCallback');

      if (createCellContainerCallback) {
        for (var y = 0, ycnt = _this.rowCount; y < ycnt; y++) {
          for (var x = 0, xcnt = _this.columnCount; x < xcnt; x++) {
            var addConfig = {
              column: x,
              row: y
            };
            var child = createCellContainerCallback(scene, x, y, addConfig);

            if (child) {
              _this.add(child, addConfig);
            }
          }
        }
      }

      return _this;
    }

    _createClass(GridSizer, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        _get(_getPrototypeOf(GridSizer.prototype), "destroy", this).call(this, fromScene); // More free resources


        this.columnProportions = undefined;
        this.rowProportions = undefined;
        this.columnWidth = undefined;
        this.rowHeight = undefined;
      }
    }, {
      key: "setIndentLeft",
      value: function setIndentLeft(odd, even) {
        this.space.indentLeftOdd = odd;
        this.space.indentLeftEven = even;
        return this;
      }
    }, {
      key: "setIndentTop",
      value: function setIndentTop(odd, even) {
        this.space.indentTopOdd = odd;
        this.space.indentTopEven = even;
        return this;
      }
    }, {
      key: "setColumnProportion",
      value: function setColumnProportion(columnIndex, proportion) {
        if (columnIndex >= this.columnProportions.length) {
          return this;
        }

        this.columnProportions[columnIndex] = proportion;
        return this;
      }
    }, {
      key: "setRowProportion",
      value: function setRowProportion(rowIndex, proportion) {
        if (rowIndex >= this.rowProportions.length) {
          return this;
        }

        this.rowProportions[rowIndex] = proportion;
        return this;
      }
    }, {
      key: "totalColumnProportions",
      get: function get() {
        if (this._totalColumnProportions === undefined) {
          this._totalColumnProportions = GetTotalColumnProportions.call(this);
        }

        return this._totalColumnProportions;
      }
    }, {
      key: "totalRowProportions",
      get: function get() {
        if (this._totalRowProportions === undefined) {
          this._totalRowProportions = GetTotalRowProportions.call(this);
        }

        return this._totalRowProportions;
      }
    }, {
      key: "getChildAt",
      value: function getChildAt(columnIndex, rowIndex) {
        return this.sizerChildren[rowIndex * this.columnCount + columnIndex];
      }
    }, {
      key: "childToGridIndex",
      value: function childToGridIndex(child, out) {
        if (!child) {
          return null;
        }

        var index = this.sizerChildren.indexOf(child);

        if (index === -1) {
          return null;
        }

        if (out === undefined) {
          out = {};
        }

        out.x = index % this.columnCount;
        out.y = Math.floor(index / this.columnCount);
        return out;
      }
    }, {
      key: "getColumnWidth",
      value: function getColumnWidth(columnIndex) {
        var colProportion = this.columnProportions[columnIndex];
        var colWidth = colProportion === 0 ? this.columnWidth[columnIndex] : colProportion * this.proportionWidthLength;
        return colWidth;
      }
    }, {
      key: "getRowHeight",
      value: function getRowHeight(rowIndex) {
        var rowProportion = this.rowProportions[rowIndex];
        var rowHeight = rowProportion === 0 ? this.rowHeight[rowIndex] : rowProportion * this.proportionHeightLength;
        return rowHeight;
      }
    }]);

    return GridSizer;
  }(Base);

  Object.assign(GridSizer.prototype, methods$5);

  var CreateGridSizer = function CreateGridSizer(scene, data, view, styles, customBuilders) {
    // Build createCellContainerCallback
    var createCellContainerCallbackConfig = data.createCellContainerCallback;

    if (createCellContainerCallbackConfig) {
      var childData = createCellContainerCallbackConfig.$child;
      delete createCellContainerCallbackConfig.$child;

      data.createCellContainerCallback = function (scene, x, y, config) {
        var child = Make(scene, childData, view, styles, customBuilders); // Copy config

        for (var key in createCellContainerCallbackConfig) {
          config[key] = createCellContainerCallbackConfig[key];
        }

        return child;
      };
    }

    return CreateAnySizer(scene, data, view, styles, customBuilders, GridSizer);
  };

  var GetChildrenWidth = function GetChildrenWidth() {
    if (this.rexSizer.hidden) {
      return 0;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;

    for (var key in children) {
      child = children[key];
      padding = child.rexSizer.padding;
      childWidth = this.getChildWidth(child) + padding.left + padding.right;
      result = Math.max(childWidth, result);
    }

    return result + this.space.left + this.space.right;
  };

  var GetChildrenHeight = function GetChildrenHeight() {
    if (this.rexSizer.hidden) {
      return 0;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childHeight;

    for (var key in children) {
      child = children[key];
      childHeight = child.isRexSizer ? Math.max(child.minHeight, child.childrenHeight) : child.minHeight !== undefined ? child.minHeight : GetDisplayHeight(child);
      padding = child.rexSizer.padding;
      childHeight += padding.top + padding.bottom;
      result = Math.max(childHeight, result);
    }

    return result + this.space.top + this.space.bottom;
  };

  var GetExpandedChildWidth = function GetExpandedChildWidth(child, parentWidth) {
    if (parentWidth === undefined) {
      parentWidth = this.width;
    }

    var childWidth;
    var childConfig = child.rexSizer;

    if (childConfig.expandWidth) {
      var innerWidth = parentWidth - this.space.left - this.space.right;
      var padding = childConfig.padding;
      childWidth = innerWidth - padding.left - padding.right;
    }

    return childWidth;
  };

  var GetExpandedChildHeight = function GetExpandedChildHeight(child, parentHeight) {
    if (parentHeight === undefined) {
      parentHeight = this.height;
    }

    var childHeight;
    var childConfig = child.rexSizer;

    if (childConfig.expandHeight) {
      var innerHeight = parentHeight - this.space.top - this.space.bottom;
      var padding = childConfig.padding;
      childHeight = innerHeight - padding.top - padding.bottom;
    }

    return childHeight;
  };

  var GetChildrenSizers = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }

    var children = this.sizerChildren,
        child;

    for (var key in children) {
      child = children[key];

      if (child.isRexSizer) {
        out.push(child);
      }
    }

    return out;
  };

  var LayoutChildren$1 = function LayoutChildren() {
    var child, childConfig, padding;
    var startX = this.innerLeft,
        startY = this.innerTop;
    var innerWidth = this.innerWidth,
        innerHeight = this.innerHeight;
    var x, y, width, height; // Align zone

    var childWidth, childHeight; // Layout current page

    var children = this.sizerChildren;

    for (var key in children) {
      child = children[key];

      if (child.rexSizer.hidden) {
        continue;
      }

      childConfig = child.rexSizer;
      padding = childConfig.padding;
      PreLayoutChild.call(this, child); // Set size

      if (child.isRexSizer) {
        child.runLayout(this, this.getExpandedChildWidth(child), this.getExpandedChildHeight(child));
        CheckSize(child, this);
      } else {
        childWidth = undefined;
        childHeight = undefined;

        if (childConfig.expandWidth) {
          // Expand width
          childWidth = innerWidth - padding.left - padding.right;
        }

        if (childConfig.expandHeight) {
          // Expand height
          childHeight = innerHeight - padding.top - padding.bottom;
        }

        ResizeGameObject(child, childWidth, childHeight);
      } // Set position


      x = startX + padding.left;
      width = innerWidth - padding.left - padding.right;
      y = startY + padding.top;
      height = innerHeight - padding.top - padding.bottom;
      LayoutChild.call(this, child, x, y, width, height, childConfig.align, childConfig.alignOffsetX, childConfig.alignOffsetY);
    }
  };

  var IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$w = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER = Phaser.Display.Align.CENTER;
  var UUID = Phaser.Utils.String.UUID;

  var Add$3 = function Add(gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY) {
    AddChild.call(this, gameObject);

    if (IsPlainObject$4(childKey)) {
      var config = childKey;
      childKey = GetValue$w(config, 'key', undefined);
      align = GetValue$w(config, 'align', ALIGN_CENTER);
      offsetX = GetValue$w(config, 'offsetX', 0);
      offsetY = GetValue$w(config, 'offsetY', 0);
      padding = GetValue$w(config, 'padding', 0);
      expand = GetValue$w(config, 'expand', true);

      if (!gameObject.isRexSizer) {
        // Get minWidth,minHeight from config
        minWidth = GetValue$w(config, 'minWidth', gameObject._minWidth);
        minHeight = GetValue$w(config, 'minHeight', gameObject._minHeighted);
      }
    }

    var hasValidKey = childKey !== undefined;

    if (!hasValidKey) {
      childKey = UUID();
    }

    if (typeof align === 'string') {
      align = ALIGNMODE[align];
    }

    if (align === undefined) {
      align = ALIGN_CENTER;
    }

    if (offsetX === undefined) {
      offsetX = 0;
    }

    if (offsetY === undefined) {
      offsetY = 0;
    }

    if (padding === undefined) {
      padding = 0;
    }

    if (expand === undefined) {
      expand = true;
    }

    if (!gameObject.isRexSizer) {
      // Get minWidth,minHeight from game object
      if (minWidth === undefined) {
        minWidth = gameObject._minWidth;
      }

      if (minHeight === undefined) {
        minHeight = gameObject._minHeight;
      }
    }

    var config = this.getSizerConfig(gameObject);
    config.align = align;
    config.alignOffsetX = offsetX;
    config.alignOffsetY = offsetY;
    config.padding = GetBoundsConfig(padding);

    if (IsPlainObject$4(expand)) {
      config.expandWidth = GetValue$w(expand, 'width', false);
      config.expandHeight = GetValue$w(expand, 'height', false);
    } else {
      config.expandWidth = expand;
      config.expandHeight = expand;
    }

    if (!gameObject.isRexSizer) {
      // Expand normal game object
      if (config.expandWidth) {
        // minWidth is still undefined, uses current display width
        gameObject.minWidth = minWidth === undefined ? GetDisplayWidth(gameObject) : minWidth;
      }

      if (config.expandHeight) {
        // minHeight is still undefined, uses current display height
        gameObject.minHeight = minHeight === undefined ? GetDisplayHeight(gameObject) : minHeight;
      }
    }

    if (this.sizerChildren.hasOwnProperty(childKey)) {
      this.sizerChildren[childKey].destroy();
    }

    this.sizerChildren[childKey] = gameObject;

    if (hasValidKey) {
      this.addChildrenMap(childKey, gameObject);
    }

    return this;
  };

  var AddChildMethods$4 = {
    add: Add$3
  };

  var RemoveChildMethods$3 = {
    remove: function remove(gameObject, destroyChild) {
      var key;

      if (typeof gameObject === 'string') {
        key = gameObject;
        gameObject = this.sizerChildren[key];

        if (!gameObject) {
          return this;
        }
      } else if (this.getParentSizer(gameObject) !== this) {
        return this;
      } else {
        key = this.childToKey(gameObject);
      }

      if (key) {
        delete this.sizerChildren[key];

        if (this.childrenMap.hasOwnProperty(key)) {
          delete this.childrenMap[key];
        }
      }

      RemoveChild.call(this, gameObject, destroyChild);
      return this;
    },
    removeAll: function removeAll(destroyChild) {
      for (var key in this.sizerChildren) {
        this.remove(key, destroyChild);
      }

      return this;
    },
    clear: function clear(destroyChild) {
      for (var key in this.sizerChildren) {
        delete this.sizerChildren[key];

        if (this.childrenMap.hasOwnProperty(key)) {
          delete this.childrenMap[key];
        }
      }

      ClearChildren.call(this, destroyChild);
      return this;
    }
  };

  var methods$4 = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    layoutChildren: LayoutChildren$1
  };
  Object.assign(methods$4, AddChildMethods$4, RemoveChildMethods$3);

  var IndexOf = function IndexOf(obj, child) {
    if (Array.isArray(obj)) {
      return obj.indexOf(child);
    } else {
      for (var key in obj) {
        if (obj[key] === child) {
          return key;
        }
      }

      return null;
    }
  };

  var IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$v = Phaser.Utils.Objects.GetValue;

  var OverlapSizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(OverlapSizer, _BaseSizer);

    var _super = _createSuper(OverlapSizer);

    function OverlapSizer(scene, x, y, minWidth, minHeight, config) {
      var _this;

      _classCallCheck(this, OverlapSizer);

      if (IsPlainObject$3(x)) {
        config = x;
        x = GetValue$v(config, 'x', 0);
        y = GetValue$v(config, 'y', 0);
        minWidth = GetValue$v(config, 'width', undefined);
        minHeight = GetValue$v(config, 'height', undefined);
      } else if (IsPlainObject$3(minWidth)) {
        config = minWidth;
        minWidth = GetValue$v(config, 'width', undefined);
        minHeight = GetValue$v(config, 'height', undefined);
      }

      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexOverlapSizer';
      _this.sizerChildren = {};

      _this.addChildrenMap('items', _this.sizerChildren);

      return _this;
    }

    _createClass(OverlapSizer, [{
      key: "childToKey",
      value: function childToKey(gameObject) {
        if (typeof gameObject === 'string') {
          var key = gameObject;

          if (this.sizerChildren.hasOwnPropery(key)) {
            return key;
          }
        } else {
          return IndexOf(this.sizerChildren, gameObject);
        }

        return null;
      }
    }]);

    return OverlapSizer;
  }(Base);

  Object.assign(OverlapSizer.prototype, methods$4);

  var CreateOverlapSizer = function CreateOverlapSizer(scene, data, view, styles, customBuilders) {
    return CreateAnySizer(scene, data, view, styles, customBuilders, OverlapSizer);
  };

  var SizerAdd$2 = Sizer.prototype.add;
  var SizerAddSpace = Sizer.prototype.addSpace;

  var Add$2 = function Add(gameObject) {
    var isNormalGameObject = !gameObject.isRexSpace;
    var proportion = !isNormalGameObject || this.buttonsExpand ? 1 : 0;

    if (this.sizerChildren.length === 0) {
      // First element
      if (isNormalGameObject) {
        // Add space at head
        var hasHeadSpace = !this.buttonsExpand && (this.buttonsAlign === 'right' || this.buttonsAlign === 'center' || this.buttonsAlign === 'bottom');

        if (hasHeadSpace) {
          SizerAddSpace.call(this);
        }

        SizerAdd$2.call(this, gameObject, {
          proportion: proportion,
          expand: true
        }); // Add space at tail

        var hasTailSpace = !this.buttonsExpand && this.buttonsAlign === 'center';

        if (hasTailSpace) {
          SizerAddSpace.call(this);
        }

        this.hasTailSpace = hasTailSpace;
      } else {
        // A space
        SizerAdd$2.call(this, gameObject, {
          proportion: proportion,
          expand: true
        });
        this.hasTailSpace = false;
      }
    } else {
      // Others
      if (this.hasTailSpace) {
        var lastIndex = this.sizerChildren.length - 1;
        SizerAdd$2.call(this, gameObject, {
          index: lastIndex,
          proportion: proportion,
          expand: true
        });
      } else {
        SizerAdd$2.call(this, gameObject, {
          proportion: proportion,
          expand: true
        });
      }
    } // Space or other game object as button


    if (isNormalGameObject) {
      this.buttonGroup.add(gameObject);
    }

    return this;
  };

  var AddChildMethods$3 = {
    addButton: function addButton(gameObject) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Add$2.call(this, gameObjects[i]);
        }
      } else {
        Add$2.call(this, gameObject);
      }

      return this;
    },
    addButtons: function addButtons(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Add$2.call(this, gameObjects[i]);
      }

      return this;
    }
  };

  var SizerRmove$2 = Sizer.prototype.remove;
  var SizerClear$2 = Sizer.prototype.clear;

  var Remove$2 = function Remove(gameObject, destroyChild) {
    if (this.getParentSizer(gameObject) !== this) {
      return this;
    }

    this.buttonGroup.remove(gameObject);
    SizerRmove$2.call(this, gameObject, destroyChild);
    return this;
  };

  var RemoveChildMethods$2 = {
    remove: function remove(gameObject, destroyChild) {
      // Remove gameObject no matter it is a button or not
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Remove$2.call(this, gameObjects[i], destroyChild);
        }
      } else {
        Remove$2.call(this, gameObject, destroyChild);
      }

      return this;
    },
    clear: function clear(destroyChild) {
      var buttons = this.buttonGroup.buttons;
      buttons.length = 0;
      SizerClear$2.call(this, destroyChild);
      return this;
    },
    removeButton: function removeButton(gameObject, destroyChild) {
      var gameObject = this.getButton(gameObject); // Don't remove this gameObject, it is not a button

      if (!gameObject) {
        return this;
      }

      this.remove(gameObject, destroyChild);
      return this;
    },
    clearButtons: function clearButtons(destroyChild) {
      var buttons = this.buttonGroup.buttons;

      for (var i = buttons.length - 1; i >= 0; i--) {
        Remove$2.call(this, buttons[i], destroyChild);
      }

      return this;
    }
  };

  var AddMethods = {
    add: function add(gameObject) {
      this.buttons.push(gameObject);

      if (this.buttonsType) {
        var key = gameObject.name;

        if (key === '') {
          console.error("".concat(this.parent.constructor.name, ": Button key is an empty string"));
        } else if (this.buttonMap.hasOwnProperty(key)) {
          console.error("".concat(this.parent.constructor.name, ": Duplicate button key '").concat(key, "'"));
        }

        this.buttonMap[key] = gameObject;
        this.dataManager.set(key, undefined).set(key, false); // Trigger data event 'changedata'
      } //Default: Fire 'click' event when touch released after pressed.


      gameObject._buttonBehavior = new Button(gameObject, this.clickConfig);

      gameObject._buttonBehavior.on('click', function (buttonBehavior, gameObject, pointer, event) {
        this.fireEvent('button.click', gameObject, pointer, event);
      }, this).on('enable', function (buttonBehavior, gameObject) {
        this.fireEvent('button.enable', gameObject);
      }, this).on('disable', function (buttonBehavior, gameObject) {
        this.fireEvent('button.disable', gameObject);
      }, this);

      gameObject.on('pointerover', function (pointer, localX, localY, event) {
        this.fireEvent('button.over', gameObject, pointer, event);
      }, this).on('pointerout', function (pointer, event) {
        this.fireEvent('button.out', gameObject, pointer, event);
      }, this);
      return this;
    },
    addMultiple: function addMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.add(gameObject[i]);
      }

      return this;
    }
  };

  var RemoveItem$1 = Phaser.Utils.Array.Remove;
  var RemoveMethods = {
    remove: function remove(gameObject) {
      RemoveItem$1(this.buttons, gameObject);

      if (this.buttonsType) {
        var key = gameObject.name;
        delete this.buttonMap[key];
        this.dataManager.remove(key);
      }

      return this;
    },
    clear: function clear() {
      this.buttons.length = 0;

      if (this.buttonsType) {
        for (var key in this.buttonMap) {
          delete this.buttonMap[key];
          this.dataManager.remove(key);
        }
      }

      return this;
    }
  };

  var FireEvent = function FireEvent(eventName, button) {
    var index;

    if (typeof button === 'number') {
      index = button;
      button = this.buttons[index];

      if (!button) {
        return;
      }
    } else {
      index = this.buttons.indexOf(button);

      if (index === -1) {
        return;
      }
    } // Buttons is a child. Fire internal events.


    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (this.eventEmitter !== this.parent) {
      var _this$parent;

      (_this$parent = this.parent).emit.apply(_this$parent, [eventName, button, index].concat(args));
    }

    if (this.groupName !== undefined) {
      var _this$eventEmitter;

      (_this$eventEmitter = this.eventEmitter).emit.apply(_this$eventEmitter, [eventName, button, this.groupName, index].concat(args));
    } else {
      var _this$eventEmitter2;

      (_this$eventEmitter2 = this.eventEmitter).emit.apply(_this$eventEmitter2, [eventName, button, index].concat(args));
    }
  };

  var GetValue$u = Phaser.Utils.Objects.GetValue;

  var Initialize = function Initialize(config) {
    // Assign this.dataManager
    var dataManager = GetValue$u(config, 'dataManager', undefined);

    if (dataManager === undefined) {
      var parent = this.parent;
      parent.setDataEnabled();
      dataManager = parent.data;
    }

    this.dataManager = dataManager; // Assign this.setValueCallback, this.setValueCallbackScope

    var setValueCallback, setValueCallbackScope;
    setValueCallback = GetValue$u(config, 'setValueCallback', undefined);
    setValueCallbackScope = GetValue$u(config, 'setValueCallbackScope', undefined);

    if (setValueCallback === undefined) {
      setValueCallback = GetValue$u(config, 'setButtonStateCallback', undefined);
      setValueCallbackScope = GetValue$u(config, 'setButtonStateCallbackScope', undefined);
    }

    this.setValueCallback = setValueCallback;
    this.setValueCallbackScope = setValueCallbackScope; // Register event callback

    dataManager.events.on("changedata", function (parent, key, value, previousValue) {
      var button = this.buttonMap[key];

      if (!button) {
        return;
      }

      var callback = this.setValueCallback;
      var scope = this.setValueCallbackScope;

      if (callback) {
        if (scope) {
          callback.call(scope, button, value, previousValue);
        } else {
          callback(button, value, previousValue);
        }
      }

      this.fireEvent('button.statechange', button, value, previousValue);
    }, this);
  };

  var SetTypeMethods = {
    setButtonsType: function setButtonsType(config) {
      if (config === undefined) {
        config = {};
      }

      var buttonsType = GetValue$u(config, 'buttonsType', config.type);
      this.buttonsType = buttonsType;

      switch (buttonsType) {
        case 'radio':
          this.setRadioType(config);
          break;

        case 'checkboxes':
          this.setCheckboxesType(config);
          break;
      }

      return this;
    },
    setRadioType: function setRadioType(config) {
      Initialize.call(this, config);
      var radioValue = undefined;
      var parent = this.parent,
          buttons = this.buttons,
          dataManager = this.dataManager;
      Object.defineProperty(parent, 'value', {
        get: function get() {
          return radioValue;
        },
        set: function set(newValue) {
          if (newValue === radioValue) {
            return;
          }

          radioValue = newValue; // Update state of button -> Fire `changedata-btnName` event -> setValueCallback                

          buttons.forEach(function (button) {
            var key = button.name;
            var state = dataManager.get(key);

            if (key === newValue) {
              if (!state) {
                dataManager.set(key, true);
              }
            } else {
              if (state) {
                dataManager.set(key, false);
              }
            }
          });
        },
        enumerable: true,
        configurable: true
      });
      parent.on('button.click', function (button) {
        parent.value = button.name;
      }); // button.click event -> parent.value -> dataManager -> changedata event -> ...
      // parent.value -> dataManager -> changedata event -> ...

      return this;
    },
    setCheckboxesType: function setCheckboxesType(config) {
      Initialize.call(this, config);
      var parent = this.parent,
          dataManager = this.dataManager;
      parent.on('button.click', function (button) {
        dataManager.toggle(button.name);
      }); // button.click event -> dataManager -> changedata event -> ...
      // dataManager.set() -> changedata event -> ...

      return this;
    },
    // Common
    clearAllButtonsState: function clearAllButtonsState() {
      for (var key in this.buttonMap) {
        this.dataManager.set(key, false);
      }

      return this;
    },
    getAllButtonsState: function getAllButtonsState() {
      var states = {};

      for (var key in this.buttonMap) {
        states[key] = this.dataManager.get(key);
      }

      return states;
    },
    // For radio
    setSelectedButtonName: function setSelectedButtonName(name) {
      this.parent.value = name;
      return this;
    },
    getSelectedButtonName: function getSelectedButtonName() {
      return this.parent.value;
    },
    // For checkboxes
    setButtonState: function setButtonState(name, state) {
      if (state === undefined) {
        state = true;
      }

      this.dataManager.set(name, state);
      return this;
    },
    getButtonState: function getButtonState(name) {
      return this.dataManager.get(name);
    }
  };

  var GetGameObjectByName = function GetGameObjectByName(children, name) {
    if (!children) {
      return null;
    } else if (IsArray(children)) {
      var child;

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = TestName(children[i], name);

        if (child) {
          return child;
        }
      }
    } else {
      // Is plain object
      var child;

      for (var key in children) {
        child = TestName(children[key], name);

        if (child) {
          return child;
        }
      }
    }
  };

  var TestName = function TestName(gameObject, name) {
    if (!gameObject) {
      return null;
    } else if (gameObject.hasOwnProperty('name')) {
      return gameObject.name === name ? gameObject : null;
    } else {
      // Array, or plain object
      return GetElementByName(gameObject, name);
    }
  };

  var ButtonMethods$1 = {
    getButton: function getButton(index) {
      // buttonGroup and button-sizer have *buttons* member both
      var buttons = this.buttons,
          button;

      var indexType = _typeof(index);

      switch (indexType) {
        case 'number':
          button = buttons[index];
          break;

        case 'string':
          button = GetGameObjectByName(buttons, index);
          break;

        default:
          button = index;

          if (buttons.indexOf(button) === -1) {
            button = undefined;
          }

          break;
      }

      return button;
    },
    setButtonEnable: function setButtonEnable(index, enabled) {
      // buttonGroup and button-sizer have *buttons* member both
      var buttons = this.buttons;

      if (index === undefined || typeof index === 'boolean') {
        enabled = index;

        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
          buttons[i]._buttonBehavior.setEnable(enabled);
        }
      } else {
        this.getButton(index)._buttonBehavior.setEnable(enabled);
      }

      return this;
    },
    toggleButtonEnable: function toggleButtonEnable(index) {
      // buttonGroup and button-sizer have *buttons* member both
      var buttons = this.buttons;

      if (index === undefined || typeof index === 'boolean') {
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
          buttons[i]._buttonBehavior.toggleEnable();
        }
      } else {
        this.getButton(index)._buttonBehavior.toggleEnable();
      }

      return this;
    },
    getButtonEnable: function getButtonEnable(index) {
      if (index === undefined) {
        index = 0;
      }

      return this.getButton(index)._buttonBehavior.enable;
    },
    emitButtonClick: function emitButtonClick(index) {
      // index or button game object
      // this: buttonGroup or button-sizer
      var buttonGroup = this.buttonGroup ? this.buttonGroup : this;
      buttonGroup.fireEvent('button.click', index);
      return this;
    },
    showButton: function showButton(index) {
      Show(this.getButton(index));
      return this;
    },
    hideButton: function hideButton(index) {
      Hide(this.getButton(index));
      return this;
    },
    isButtonShown: function isButtonShown(index) {
      IsShown(this.getButton(index));
      return this;
    },
    forEachButtton: function forEachButtton(callback, scope) {
      // buttonGroup and button-sizer have *buttons* member both
      var buttons = this.buttons;

      for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        if (scope) {
          callback.call(scope, buttons[i], i, buttons);
        } else {
          callback(buttons[i], i, buttons);
        }
      }

      return this;
    }
  };

  var ButtonGroup = /*#__PURE__*/function () {
    function ButtonGroup(config) {
      _classCallCheck(this, ButtonGroup);

      this.parent = config.parent;
      this.eventEmitter = config.eventEmitter;
      this.groupName = config.groupName;
      this.clickConfig = config.clickConfig;
      this.buttonsType = undefined;
      this.buttons = [];
      this.buttonMap = {};
    }

    _createClass(ButtonGroup, [{
      key: "destroy",
      value: function destroy() {
        this.parent = undefined;
        this.eventEmitter = undefined;
        this.clickConfig = undefined;
        this.buttons = undefined; // GameObjects will be destroyed outside
      }
    }]);

    return ButtonGroup;
  }();

  var methods$3 = {
    fireEvent: FireEvent
  };
  Object.assign(ButtonGroup.prototype, AddMethods, RemoveMethods, SetTypeMethods, ButtonMethods$1, methods$3);

  // Include in Buttons/GridButtons/FixedWidthButtons class
  var ButtonStateMethods = {
    // Common
    clearAllButtonsState: function clearAllButtonsState() {
      this.buttonGroup.clearAllButtonsState();
      return this;
    },
    getAllButtonsState: function getAllButtonsState() {
      return this.buttonGroup.getAllButtonsState();
    },
    // For radio
    setSelectedButtonName: function setSelectedButtonName(name) {
      this.buttonGroup.setSelectedButtonName(name);
      return this;
    },
    getSelectedButtonName: function getSelectedButtonName() {
      return this.buttonGroup.getSelectedButtonName();
    },
    // For checkboxes
    setButtonState: function setButtonState(name, state) {
      this.buttonGroup.setButtonState(name, state);
      return this;
    },
    getButtonState: function getButtonState(name) {
      return this.buttonGroup.getButtonState(name);
    }
  };

  var GetValue$t = Phaser.Utils.Objects.GetValue;

  var Buttons$1 = /*#__PURE__*/function (_Sizer) {
    _inherits(Buttons, _Sizer);

    var _super = _createSuper(Buttons);

    function Buttons(scene, config) {
      var _this;

      _classCallCheck(this, Buttons);

      if (config === undefined) {
        config = {};
      }

      var buttonSpace = config.space;

      if (typeof buttonSpace === 'number') {
        config.space = {
          item: buttonSpace
        };
      } // Create


      _this = _super.call(this, scene, config);
      _this.type = 'rexButtons';
      _this.buttonGroup = new ButtonGroup({
        parent: _assertThisInitialized(_this),
        eventEmitter: GetValue$t(config, 'eventEmitter', _assertThisInitialized(_this)),
        groupName: GetValue$t(config, 'groupName', undefined),
        clickConfig: GetValue$t(config, 'click', undefined)
      }).setButtonsType(config); // Add elements

      var background = GetValue$t(config, 'background', undefined);
      var buttons = GetValue$t(config, 'buttons', undefined); // Buttons properties

      _this.buttonsExpand = GetValue$t(config, 'expand', false);
      _this.buttonsAlign = GetValue$t(config, 'align', undefined); // undefined/left/top: no space                

      if (background) {
        _this.addBackground(background);
      }

      if (buttons) {
        _this.addButtons(buttons);
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('buttons', _this.buttonGroup.buttons);

      return _this;
    }

    _createClass(Buttons, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        _get(_getPrototypeOf(Buttons.prototype), "destroy", this).call(this, fromScene);

        this.buttonGroup.destroy();
        this.buttonGroup = undefined;
      }
    }, {
      key: "buttons",
      get: function get() {
        return this.buttonGroup.buttons;
      }
    }, {
      key: "groupName",
      get: function get() {
        return this.buttonGroup.groupName;
      },
      set: function set(value) {
        this.buttonGroup.groupName = value;
      }
    }, {
      key: "eventEmitter",
      get: function get() {
        return this.buttonGroup.eventEmitter;
      }
    }]);

    return Buttons;
  }(Sizer);

  Object.assign(Buttons$1.prototype, AddChildMethods$3, RemoveChildMethods$2, ButtonMethods$1, ButtonStateMethods);

  var CreateChildren = function CreateChildren(scene, data, subKey, view, styles, customBuilders) {
    var childData = data[subKey];

    if (!childData) {
      return undefined;
    }

    if (Array.isArray(childData)) {
      for (var i = 0, cnt = childData.length; i < cnt; i++) {
        if (Array.isArray(childData[i])) {
          // Nested array
          CreateChildren(scene, childData, i, view, styles, customBuilders);
        } else {
          CreateChild(scene, childData, i, view, styles, customBuilders);
        }
      }
    } else {
      for (var key in childData) {
        CreateChild(scene, childData, key, view, styles, customBuilders);
      }
    }

    return childData;
  };

  var CreateButtons$1 = function CreateButtons(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChildren(scene, data, 'buttons', view, styles, customBuilders);
    var gameObject = new Buttons$1(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var SizerAdd$1 = FixWidthSizer.prototype.add;

  var Add$1 = function Add(gameObject) {
    SizerAdd$1.call(this, gameObject);
    this.buttonGroup.add(gameObject);
    return this;
  };

  var AddChildMethods$2 = {
    addButton: function addButton(gameObject) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Add$1.call(this, gameObjects[i]);
        }
      } else {
        Add$1.call(this, gameObject);
      }

      return this;
    },
    addButtons: function addButtons(gameObjects) {
      if (IsArray(gameObjects[0])) {
        // 2d array
        var lines = gameObjects,
            line;

        for (var lineIdx = 0, lastLineIdx = lines.length - 1; lineIdx <= lastLineIdx; lineIdx++) {
          line = lines[lineIdx];

          for (var i = 0, cnt = line.length; i < cnt; i++) {
            Add$1.call(this, line[i]);
          }

          if (lineIdx > lastLineIdx) {
            SizerAdd$1.addNewLine(this);
          }
        }
      } else {
        // 1d array
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Add$1.call(this, gameObjects[i]);
        }
      }

      return this;
    }
  };

  var SizerRmove$1 = FixWidthSizer.prototype.remove;
  var SizerClear$1 = FixWidthSizer.prototype.clear;

  var Remove$1 = function Remove(gameObject, destroyChild) {
    var gameObject = this.getButton(gameObject);

    if (!gameObject) {
      return this;
    }

    this.buttonGroup.remove(gameObject);
    SizerRmove$1.call(this, gameObject, destroyChild);
    return this;
  };

  var RemoveChildMethods$1 = {
    remove: function remove(gameObject, destroyChild) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Remove$1.call(this, gameObjects[i], destroyChild);
        }
      } else {
        Remove$1.call(this, gameObject, destroyChild);
      }

      return this;
    },
    clear: function clear(destroyChild) {
      var buttons = this.buttonGroup.buttons;
      buttons.length = 0;
      SizerClear$1.call(this, destroyChild);
      return this;
    },
    removeButton: function removeButton(gameObject, destroyChild) {
      this.remove(gameObject, destroyChild);
      return this;
    },
    clearButtons: function clearButtons(destroyChild) {
      var buttons = this.buttonGroup.buttons;

      for (var i = buttons.length - 1; i >= 0; i--) {
        Remove$1.call(this, buttons[i], destroyChild);
      }

      return this;
    }
  };

  var GetValue$s = Phaser.Utils.Objects.GetValue;

  var Buttons = /*#__PURE__*/function (_FixWidthSizer) {
    _inherits(Buttons, _FixWidthSizer);

    var _super = _createSuper(Buttons);

    function Buttons(scene, config) {
      var _this;

      _classCallCheck(this, Buttons);

      if (config === undefined) {
        config = {};
      }

      var buttonSpace = config.space;

      if (typeof buttonSpace === 'number') {
        config.space = {
          item: buttonSpace,
          line: buttonSpace
        };
      } // Create


      _this = _super.call(this, scene, config);
      _this.type = 'rexFixWidthButtons';
      _this.buttonGroup = new ButtonGroup({
        parent: _assertThisInitialized(_this),
        eventEmitter: GetValue$s(config, 'eventEmitter', _assertThisInitialized(_this)),
        groupName: GetValue$s(config, 'groupName', undefined),
        clickConfig: GetValue$s(config, 'click', undefined)
      }).setButtonsType(config); // Add elements

      var background = GetValue$s(config, 'background', undefined);
      var buttons = GetValue$s(config, 'buttons', undefined); // Buttons properties

      _this.buttonsAlign = GetValue$s(config, 'align', undefined);

      if (background) {
        _this.addBackground(background);
      }

      if (buttons) {
        _this.addButtons(buttons);
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('buttons', _this.buttonGroup.buttons);

      return _this;
    }

    _createClass(Buttons, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        _get(_getPrototypeOf(Buttons.prototype), "destroy", this).call(this, fromScene);

        this.buttonGroup.destroy();
        this.buttonGroup = undefined;
      }
    }, {
      key: "buttons",
      get: function get() {
        return this.buttonGroup.buttons;
      }
    }, {
      key: "groupName",
      get: function get() {
        return this.buttonGroup.groupName;
      },
      set: function set(value) {
        this.buttonGroup.groupName = value;
      }
    }, {
      key: "eventEmitter",
      get: function get() {
        return this.buttonGroup.eventEmitter;
      }
    }]);

    return Buttons;
  }(FixWidthSizer);

  Object.assign(Buttons.prototype, AddChildMethods$2, RemoveChildMethods$1, ButtonMethods$1, ButtonStateMethods);

  var CreateFixWidthButtons = function CreateFixWidthButtons(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChildren(scene, data, 'buttons', view, styles, customBuilders);
    var gameObject = new Buttons(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var SizerAdd = GridSizer.prototype.add;
  var AddChildMethods$1 = {
    addButton: function addButton(gameObject, columnIndex, rowIndex) {
      SizerAdd.call(this, gameObject, columnIndex, rowIndex, undefined, 0, this.buttonsExpand);
      this.buttonGroup.add(gameObject);
      return this;
    },
    addButtons: function addButtons(gameObjects, rowThenColumn) {
      for (var i = 0, cnt = gameObjects; i < cnt; i++) {
        this.addButton(gameObjects[i], undefined, rowThenColumn);
      }

      return this;
    }
  };

  var SizerRmove = GridSizer.prototype.remove;
  var SizerClear = GridSizer.prototype.clear;

  var Remove = function Remove(gameObject, destroyChild) {
    var gameObject = this.getButton(gameObject);

    if (!gameObject) {
      return this;
    }

    this.buttonGroup.remove(gameObject);
    SizerRmove.call(this, gameObject, destroyChild);
    return this;
  };

  var RemoveChildMethods = {
    remove: function remove(gameObject, destroyChild) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Remove.call(this, gameObjects[i], destroyChild);
        }
      } else {
        Remove.call(this, gameObject, destroyChild);
      }

      return this;
    },
    clear: function clear(destroyChild) {
      var buttons = this.buttonGroup.buttons;
      buttons.length = 0;
      SizerClear.call(this, destroyChild);
      return this;
    },
    removeButton: function removeButton(gameObject, destroyChild) {
      this.remove(gameObject, destroyChild);
      return this;
    },
    clearButtons: function clearButtons(destroyChild) {
      var buttons = this.buttonGroup.buttons;

      for (var i = buttons.length - 1; i >= 0; i--) {
        Remove.call(this, buttons[i], destroyChild);
      }

      return this;
    }
  };

  var GetValue$r = Phaser.Utils.Objects.GetValue;

  var GridButtons = /*#__PURE__*/function (_GridSizer) {
    _inherits(GridButtons, _GridSizer);

    var _super = _createSuper(GridButtons);

    function GridButtons(scene, config) {
      var _this;

      _classCallCheck(this, GridButtons);

      if (config === undefined) {
        config = {};
      }

      var rowCount = GetValue$r(config, 'row', 0);
      var columnCount = GetValue$r(config, 'column', config.col || 0);
      var createCellContainerCallback = GetValue$r(config, 'createCellContainerCallback');
      var buttons = GetValue$r(config, 'buttons', undefined);
      var buttonsExpand = GetValue$r(config, 'expand', true);
      var buttonProportion = buttonsExpand ? 1 : 0;

      if (createCellContainerCallback) {
        config.createCellContainerCallback = undefined;
      }

      if (buttons !== undefined) {
        rowCount = Math.max(rowCount, buttons.length);

        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
          columnCount = Math.max(columnCount, buttons[i].length);
        }
      }

      config.row = rowCount;
      config.column = columnCount;
      config.columnProportions = buttonProportion;
      config.rowProportions = buttonProportion; // Create

      _this = _super.call(this, scene, config);
      _this.type = 'rexGridButtons';
      _this.buttonGroup = new ButtonGroup({
        parent: _assertThisInitialized(_this),
        eventEmitter: GetValue$r(config, 'eventEmitter', _assertThisInitialized(_this)),
        groupName: GetValue$r(config, 'groupName', undefined),
        clickConfig: GetValue$r(config, 'click', undefined)
      }).setButtonsType(config); // Add elements

      var background = GetValue$r(config, 'background', undefined); // Buttons properties

      _this.buttonsExpand = buttonsExpand;
      GetValue$r(config, 'space', undefined);

      if (background) {
        _this.addBackground(background);
      }

      if (buttons) {
        var rowButtons, button;

        for (var r = 0, rcnt = buttons.length; r < rcnt; r++) {
          // row
          rowButtons = buttons[r];

          for (var c = 0, ccnt = rowButtons.length; c < ccnt; c++) {
            // col
            button = rowButtons[c];

            if (button) {
              _this.addButton(button, c, r);
            }
          }
        }
      } else if (createCellContainerCallback) {
        for (var y = 0; y < rowCount; y++) {
          for (var x = 0; x < columnCount; x++) {
            var button = createCellContainerCallback(scene, x, y);

            if (button) {
              _this.addButton(button, x, y);
            }
          }
        }
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('buttons', _this.buttonGroup.buttons);

      return _this;
    }

    _createClass(GridButtons, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        _get(_getPrototypeOf(GridButtons.prototype), "destroy", this).call(this, fromScene);

        this.buttonGroup.destroy();
        this.buttonGroup = undefined;
      }
    }, {
      key: "buttons",
      get: function get() {
        return this.buttonGroup.buttons;
      }
    }, {
      key: "groupName",
      get: function get() {
        return this.buttonGroup.groupName;
      },
      set: function set(value) {
        this.buttonGroup.groupName = value;
      }
    }, {
      key: "eventEmitter",
      get: function get() {
        return this.buttonGroup.eventEmitter;
      }
    }]);

    return GridButtons;
  }(GridSizer);

  Object.assign(GridButtons.prototype, AddChildMethods$1, RemoveChildMethods, ButtonMethods$1, ButtonStateMethods);

  var CreateGridButtons = function CreateGridButtons(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    var buttonsConfig = data.buttons; // Game objects in 2d array

    if (buttonsConfig) {
      for (var i = 0, cnt = buttonsConfig.length; i < cnt; i++) {
        CreateChildren(scene, buttonsConfig, i, view, styles, customBuilders);
      }
    } // Build createCellContainerCallback


    var createCellContainerCallbackConfig = data.createCellContainerCallback;

    if (createCellContainerCallbackConfig) {
      var childData = createCellContainerCallbackConfig.$child;
      delete createCellContainerCallbackConfig.$child;

      data.createCellContainerCallback = function (scene, x, y, config) {
        var child = Make(scene, childData, view, styles, customBuilders); // Copy config

        for (var key in createCellContainerCallbackConfig) {
          config[key] = createCellContainerCallbackConfig[key];
        }

        return child;
      };
    }

    var gameObject = new GridButtons(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var CreateAnyLabel = function CreateAnyLabel(scene, data, view, styles, customBuilders, LabelClass) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'icon', view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);
    CreateChild(scene, data, 'action', view, styles, customBuilders);
    var gameObject = new LabelClass(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var DrawShape = function DrawShape(width, height, padding, originX, originY) {
    this.clear().fillStyle(0xffffff);

    switch (this.shape) {
      case 1:
        // circle
        var radius = Math.min(width, height) / 2;
        this.fillCircle(-width * (originX - 0.5), -height * (originY - 0.5), radius + padding);
        break;

      default:
        // 0|'rectangle'
        this.fillRect(-(width * originX) - padding, -(height * originY) - padding, width + 2 * padding, height + 2 * padding);
        break;
    }
  };

  var Graphics = Phaser.GameObjects.Graphics;

  var DefaultMaskGraphics = /*#__PURE__*/function (_Graphics) {
    _inherits(DefaultMaskGraphics, _Graphics);

    var _super = _createSuper(DefaultMaskGraphics);

    function DefaultMaskGraphics(parent, shape, padding) {
      var _this;

      _classCallCheck(this, DefaultMaskGraphics);

      if (shape === undefined) {
        shape = 0;
      }

      if (typeof shape === 'string') {
        shape = SHAPEMODE[shape];
      }

      if (padding === undefined) {
        padding = 0;
      }

      _this = _super.call(this, parent.scene);
      _this.parent = parent;
      _this.shape = shape;
      _this.padding = padding;

      _this.setPosition().resize().setVisible(false); // Don't add it to display list


      return _this;
    }

    _createClass(DefaultMaskGraphics, [{
      key: "destroy",
      value: function destroy() {
        this.parent = undefined;

        _get(_getPrototypeOf(DefaultMaskGraphics.prototype), "destroy", this).call(this);

        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        var parent = this.parent;

        if (x === undefined) {
          x = parent.x;
        }

        if (y === undefined) {
          y = parent.y;
        }

        _get(_getPrototypeOf(DefaultMaskGraphics.prototype), "setPosition", this).call(this, x, y);

        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height, padding) {
        var parent = this.parent;

        if (width === undefined) {
          width = parent.width;
        }

        if (height === undefined) {
          height = parent.height;
        }

        if (padding === undefined) {
          padding = this.padding;
        }

        if (this.widthSave === width && this.heightSave === height && this.paddingSave === padding) {
          return this;
        }

        this.widthSave = width;
        this.heightSave = height;
        this.paddingSave = padding;
        this.originXSave = parent.originX;
        this.originYSave = parent.originY;
        DrawShape.call(this, width, height, padding, parent.originX, parent.originY);
        return this;
      }
    }, {
      key: "setOrigin",
      value: function setOrigin(originX, originY) {
        if (originY === undefined) {
          originY = originX;
        }

        var parent = this.parent;

        if (originX === undefined) {
          originX = parent.originX;
        }

        if (originY === undefined) {
          originY = parent.originY;
        }

        if (this.originXSave === originX && this.originYSave === originY) {
          return this;
        }

        this.originXSave = originX;
        this.originYSave = originY;
        DrawShape.call(this, this.widthSave, this.heightSave, this.paddingSave, originX, originY);
        return this;
      }
    }]);

    return DefaultMaskGraphics;
  }(Graphics);

  var SHAPEMODE = {
    rectangle: 0,
    circle: 1
  };

  var AddChildMask = function AddChildMask(maskTarget, sizeTarget, shape, padding) {
    var maskGameObject = new DefaultMaskGraphics(sizeTarget, shape, padding); // A Graphics game object

    if (maskTarget && !maskTarget.isRexSizer) {
      // Sizer game object can't apply mask
      var mask = maskGameObject.createGeometryMask();
      maskTarget.setMask(mask);
      this.once('destroy', function () {
        maskTarget.setMask();
        mask.destroy();
      });
    }

    this.pin(maskGameObject);
    return maskGameObject;
  };

  var GetValue$q = Phaser.Utils.Objects.GetValue;

  var Label = /*#__PURE__*/function (_Sizer) {
    _inherits(Label, _Sizer);

    var _super = _createSuper(Label);

    function Label(scene, config) {
      var _this;

      _classCallCheck(this, Label);

      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexLabel'; // Add elements

      var background = GetValue$q(config, 'background', undefined);
      var icon = GetValue$q(config, 'icon', undefined);
      var iconMask = GetValue$q(config, 'iconMask', undefined);
      var text = GetValue$q(config, 'text', undefined);
      var action = GetValue$q(config, 'action', undefined);
      var actionMask = GetValue$q(config, 'actionMask', undefined); // Align

      var align = GetValue$q(config, 'align', undefined); // undefined/left/top: no space
      // Space

      var iconSpace = GetValue$q(config, 'space.icon', 0);
      var textSpace = GetValue$q(config, 'space.text', 0);

      if (background) {
        _this.addBackground(background);
      } // Add space


      if (align === 'right' || align === 'bottom' || align === 'center') {
        _this.addSpace();
      }

      if (icon) {
        var padding;

        if (_this.orientation === 0) {
          if (text || action) {
            padding = {
              right: iconSpace
            };
          }
        } else {
          if (text || action) {
            padding = {
              bottom: iconSpace
            };
          }
        }

        _this.add(icon, {
          proportion: 0,
          padding: padding
        });

        if (iconMask) {
          iconMask = AddChildMask.call(_assertThisInitialized(_this), icon, icon, 1); // Circle mask
        }
      }

      if (text) {
        var expandTextWidth = GetValue$q(config, 'expandTextWidth', false);
        var expandTextHeight = GetValue$q(config, 'expandTextHeight', false);
        var proportion, padding, expand;

        if (_this.orientation === 0) {
          proportion = expandTextWidth ? 1 : 0;

          if (action) {
            padding = {
              right: textSpace
            };
          }

          expand = expandTextHeight;
        } else {
          proportion = expandTextHeight ? 1 : 0;

          if (action) {
            padding = {
              bottom: textSpace
            };
          }

          expand = expandTextWidth;
        }

        _this.add(text, {
          proportion: proportion,
          expand: expand,
          padding: padding
        });
      }

      if (action) {
        _this.add(action);

        if (actionMask) {
          actionMask = AddChildMask.call(_assertThisInitialized(_this), action, action, 1); // Circle mask
        }
      } // Add space


      if (align === 'center') {
        _this.addSpace();
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('icon', icon);

      _this.addChildrenMap('iconMask', iconMask);

      _this.addChildrenMap('text', text);

      _this.addChildrenMap('action', action);

      _this.addChildrenMap('actionMask', actionMask);

      return _this;
    } // Access text game object


    _createClass(Label, [{
      key: "text",
      get: function get() {
        var textObject = this.childrenMap.text;

        if (textObject === undefined) {
          return '';
        }

        return textObject.text;
      },
      set: function set(value) {
        var textObject = this.childrenMap.text;

        if (textObject === undefined) {
          return;
        }

        textObject.setText(value);
      }
    }, {
      key: "setText",
      value: function setText(value) {
        this.text = value;
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(value) {
        this.text += value;
        return this;
      } // Access icon game object

    }, {
      key: "setTexture",
      value: function setTexture(key, frame) {
        var imageObject = this.childrenMap.icon;

        if (imageObject === undefined) {
          return;
        }

        imageObject.setTexture(key, frame);
        return this;
      }
    }, {
      key: "texture",
      get: function get() {
        var imageObject = this.childrenMap.icon;

        if (imageObject === undefined) {
          return undefined;
        }

        return imageObject.texture;
      }
    }, {
      key: "frame",
      get: function get() {
        var imageObject = this.childrenMap.icon;

        if (imageObject === undefined) {
          return undefined;
        }

        return imageObject.frame;
      }
    }, {
      key: "runLayout",
      value: function runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
          return this;
        }

        _get(_getPrototypeOf(Label.prototype), "runLayout", this).call(this, parent, newWidth, newHeight); // Pin icon-mask to icon game object


        var iconMask = this.childrenMap.iconMask;

        if (iconMask) {
          iconMask.setPosition();
          this.resetChildPositionState(iconMask);
        } // Pin action-mask to action game object


        var actionMask = this.childrenMap.actionMask;

        if (actionMask) {
          actionMask.setPosition();
          this.resetChildPositionState(actionMask);
        }

        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        _get(_getPrototypeOf(Label.prototype), "resize", this).call(this, width, height); // Resize icon-mask to icon game object


        var iconMask = this.childrenMap.iconMask;

        if (iconMask) {
          iconMask.resize();
        } // Resize action-mask to icon game object


        var actionMask = this.childrenMap.actionMask;

        if (actionMask) {
          actionMask.resize();
        }

        return this;
      }
    }]);

    return Label;
  }(Sizer);

  var CreateLabel = function CreateLabel(scene, data, view, styles, customBuilders) {
    return CreateAnyLabel(scene, data, view, styles, customBuilders, Label);
  };

  var GetValue$p = Phaser.Utils.Objects.GetValue;
  var BadgeKeys = {
    leftTop: 'left-top',
    centerTop: 'center-top',
    rightTop: 'right-top',
    leftCenter: 'left-center',
    center: 'center',
    rightCenter: 'right-center',
    leftBottom: 'left-bottom',
    centerBottom: 'center-bottom',
    rightBottom: 'right-bottom'
  };

  var Badge = /*#__PURE__*/function (_OverlapSizer) {
    _inherits(Badge, _OverlapSizer);

    var _super = _createSuper(Badge);

    function Badge(scene, config) {
      var _this;

      _classCallCheck(this, Badge);

      // Create sizer  
      _this = _super.call(this, scene, config);
      _this.type = 'rexBadge'; // Add elements

      var background = GetValue$p(config, 'background', undefined);

      if (background) {
        _this.addBackground(background);
      }

      _this.addChildrenMap('background', background); // Base item


      var main = GetValue$p(config, 'main', undefined);

      if (main) {
        _this.add(main, {
          key: 'main',
          align: 'center',
          expand: false
        });
      }

      _this.addChildrenMap('main', main); // Badges


      for (var key in BadgeKeys) {
        var badge = GetValue$p(config, key, undefined);

        if (badge) {
          _this.add(badge, {
            key: key,
            align: BadgeKeys[key],
            expand: false
          });

          _this.addChildrenMap(key, badge);
        }
      }

      return _this;
    }

    return _createClass(Badge);
  }(OverlapSizer);

  var CreateBadgeLabel = function CreateBadgeLabel(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'main', view, styles, customBuilders);
    CreateChild(scene, data, 'leftTop', view, styles, customBuilders);
    CreateChild(scene, data, 'centerTop', view, styles, customBuilders);
    CreateChild(scene, data, 'rightTop', view, styles, customBuilders);
    CreateChild(scene, data, 'leftCenter', view, styles, customBuilders);
    CreateChild(scene, data, 'center', view, styles, customBuilders);
    CreateChild(scene, data, 'rightCenter', view, styles, customBuilders);
    CreateChild(scene, data, 'leftBottom', view, styles, customBuilders);
    CreateChild(scene, data, 'centerBottom', view, styles, customBuilders);
    CreateChild(scene, data, 'rightBottom', view, styles, customBuilders);
    var gameObject = new Badge(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var ButtonMethods = {
    getChoice: function getChoice(index) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        return choicesSizer.getButton(index);
      } else {
        return undefined;
      }
    },
    getAction: function getAction(index) {
      return this.childrenMap.actionsSizer.getButton(index);
    },
    getToolbar: function getToolbar(index) {
      return this.childrenMap.toolbarSizer.getButton(index);
    },
    getLeftToolbar: function getLeftToolbar(index) {
      return this.childrenMap.leftToolbarSizer.getButton(index);
    },
    setChoiceEnable: function setChoiceEnable(index, enabled) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.setButtonEnable(index, enabled);
      }

      return this;
    },
    setActionEnable: function setActionEnable(index, enabled) {
      this.childrenMap.actionsSizer.setButtonEnable(index, enabled);
      return this;
    },
    setToolbarEnable: function setToolbarEnable(index, enabled) {
      this.childrenMap.toolbarSizer.setButtonEnable(index, enabled);
      return this;
    },
    setLeftToolbarEnable: function setLeftToolbarEnable(index, enabled) {
      this.childrenMap.leftToolbarSizer.setButtonEnable(index, enabled);
      return this;
    },
    toggleChoiceEnable: function toggleChoiceEnable(index) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.toggleButtonEnable(index);
      }

      return this;
    },
    toggleActionEnable: function toggleActionEnable(index) {
      this.childrenMap.actionsSizer.toggleButtonEnable(index);
      return this;
    },
    toggleToolbarEnable: function toggleToolbarEnable(index) {
      this.childrenMap.toolbarSizer.toggleButtonEnable(index);
      return this;
    },
    toggleLeftToolbarEnable: function toggleLeftToolbarEnable(index) {
      this.childrenMap.leftToolbarSizer.toggleButtonEnable(index);
      return this;
    },
    getChoiceEnable: function getChoiceEnable(index) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        return choicesSizer.getButtonEnable(index);
      } else {
        return false;
      }
    },
    getActionEnable: function getActionEnable(index) {
      return this.childrenMap.actionsSizer.getButtonEnable(index);
    },
    getToolbarEnable: function getToolbarEnable(index) {
      return this.childrenMap.toolbarSizer.getButtonEnable(index);
    },
    getLeftToolbarEnable: function getLeftToolbarEnable(index) {
      return this.childrenMap.leftToolbarSizer.getButtonEnable(index);
    },
    emitChoiceClick: function emitChoiceClick(index) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.emitButtonClick(index);
      }

      return this;
    },
    emitActionClick: function emitActionClick(index) {
      this.childrenMap.actionsSizer.emitButtonClick(index);
      return this;
    },
    emitToolbarClick: function emitToolbarClick(index) {
      this.childrenMap.toolbarSizer.emitButtonClick(index);
      return this;
    },
    emitLeftToolbarClick: function emitLeftToolbarClick(index) {
      this.childrenMap.leftToolbarSizer.emitButtonClick(index);
      return this;
    },
    showChoice: function showChoice(index) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.showButton(index);
      }

      return this;
    },
    showAction: function showAction(index) {
      this.childrenMap.actionsSizer.showButton(index);
      return this;
    },
    showToolbar: function showToolbar(index) {
      this.childrenMap.toolbarSizer.showButton(index);
      return this;
    },
    showLeftToolbar: function showLeftToolbar(index) {
      this.childrenMap.leftToolbarSizer.showButton(index);
      return this;
    },
    hideChoice: function hideChoice(index) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.hideButton(index);
      }

      return this;
    },
    hideAction: function hideAction(index) {
      this.childrenMap.actionsSizer.hideButton(index);
      return this;
    },
    hideToolbar: function hideToolbar(index) {
      this.childrenMap.toolbarSizer.hideButton(index);
      return this;
    },
    hideLeftToolbar: function hideLeftToolbar(index) {
      this.childrenMap.leftToolbarSizer.hideButton(index);
      return this;
    },
    addChoice: function addChoice(gameObject) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.addButton(gameObject);
      }

      return this;
    },
    addAction: function addAction(gameObject) {
      this.childrenMap.actionsSizer.addButton(gameObject);
      return this;
    },
    addToolbar: function addToolbar(gameObject) {
      this.childrenMap.toolbarSizer.addButton(gameObject);
      return this;
    },
    addLeftToolbar: function addLeftToolbar(gameObject) {
      this.childrenMap.leftToolbarSizer.addButton(gameObject);
      return this;
    },
    removeChoice: function removeChoice(index, destroyChild) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.removeButton(index, destroyChild);
      }

      return this;
    },
    removeAction: function removeAction(index, destroyChild) {
      this.childrenMap.actionsSizer.removeButton(index, destroyChild);
      return this;
    },
    removeToolbar: function removeToolbar(index, destroyChild) {
      this.childrenMap.toolbarSizer.removeButton(index, destroyChild);
      return this;
    },
    removeLeftToolbar: function removeLeftToolbar(index, destroyChild) {
      this.childrenMap.leftToolbarSizer.removeButton(index, destroyChild);
      return this;
    },
    clearChoices: function clearChoices(destroyChild) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.clearButtons(destroyChild);
      }

      return this;
    },
    clearActions: function clearActions(destroyChild) {
      this.childrenMap.actionsSizer.clearButtons(destroyChild);
      return this;
    },
    clearToolbar: function clearToolbar(destroyChild) {
      this.childrenMap.toolbarSizer.clearButtons(destroyChild);
      return this;
    },
    clearLeftToolbar: function clearLeftToolbar(destroyChild) {
      this.childrenMap.leftToolbarSizer.clearButtons(destroyChild);
      return this;
    },
    forEachChoice: function forEachChoice(callback, scope) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.forEachButtton(callback, scope);
      }

      return this;
    },
    forEachAction: function forEachAction(callback, scope) {
      this.childrenMap.actionsSizer.forEachButtton(callback, scope);
      return this;
    },
    forEachToolbar: function forEachToolbar(callback, scope) {
      this.childrenMap.toolbarSizer.forEachButtton(callback, scope);
      return this;
    },
    forEachLeftToolbar: function forEachLeftToolbar(callback, scope) {
      this.childrenMap.leftToolbarSizer.forEachButtton(callback, scope);
      return this;
    },
    setAllButtonsEnable: function setAllButtonsEnable(enabled) {
      if (enabled === undefined) {
        enabled = true;
      }

      if (this.childrenMap.toolbarSizer) {
        this.setToolbarEnable(enabled);
      }

      if (this.childrenMap.leftToolbarSizer) {
        this.setLeftToolbarEnable(enabled);
      }

      if (this.childrenMap.actionsSizer) {
        this.setActionEnable(enabled);
      }

      if (this.childrenMap.choicesSizer) {
        this.setChoiceEnable(enabled);
      }

      return this;
    },
    // Checkboxes
    getChoicesButtonStates: function getChoicesButtonStates() {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        return choicesSizer.getAllButtonsState();
      } else {
        return {};
      }
    },
    getChoicesButtonState: function getChoicesButtonState(name) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (name === undefined) {
        if (choicesSizer) {
          return choicesSizer.getAllButtonsState();
        } else {
          return {};
        }
      } else {
        if (choicesSizer) {
          return choicesSizer.getButtonState(name);
        } else {
          return false;
        }
      }
    },
    setChoicesButtonState: function setChoicesButtonState(name, state) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.setButtonState(name, state);
      }

      return this;
    },
    clearChoicesButtonStates: function clearChoicesButtonStates() {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.clearAllButtonsState();
      }

      return this;
    },
    // Radio buttons
    getChoicesSelectedButtonName: function getChoicesSelectedButtonName() {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        return choicesSizer.getSelectedButtonName();
      } else {
        return '';
      }
    },
    setChoicesSelectedButtonName: function setChoicesSelectedButtonName(name) {
      var choicesSizer = this.childrenMap.choicesSizer;

      if (choicesSizer) {
        choicesSizer.setSelectedButtonName(name);
      }

      return this;
    }
  };

  var GetValue$o = Phaser.Utils.Objects.GetValue;

  var Dialog = /*#__PURE__*/function (_Sizer) {
    _inherits(Dialog, _Sizer);

    var _super = _createSuper(Dialog);

    function Dialog(scene, config) {
      var _this;

      _classCallCheck(this, Dialog);

      if (config === undefined) {
        config = {};
      } // Create sizer        


      config.orientation = 1; // Top to bottom

      _this = _super.call(this, scene, config);
      _this.type = 'rexDialog';
      _this.eventEmitter = GetValue$o(config, 'eventEmitter', _assertThisInitialized(_this)); // Add elements

      var background = GetValue$o(config, 'background', undefined);
      var title = GetValue$o(config, 'title', undefined);
      var toolbar = GetValue$o(config, 'toolbar', undefined);
      var toolbarBackground = GetValue$o(config, 'toolbarBackground', undefined);
      var leftToolbar = GetValue$o(config, 'leftToolbar', undefined);
      var leftToolbarBackground = GetValue$o(config, 'leftToolbarBackground', undefined);
      var content = GetValue$o(config, 'content', undefined);
      var description = GetValue$o(config, 'description', undefined);
      var choicesSizer;
      var choices = GetValue$o(config, 'choices', undefined);
      var choicesBackground = GetValue$o(config, 'choicesBackground', undefined);
      var actionsSizer;
      var actions = GetValue$o(config, 'actions', undefined);
      var actionsBackground = GetValue$o(config, 'actionsBackground', undefined);
      var clickConfig = GetValue$o(config, 'click', undefined);

      if (background) {
        _this.addBackground(background);
      }

      var toolbarSizer;

      if (toolbar) {
        toolbarSizer = new Buttons$1(scene, {
          groupName: 'toolbar',
          background: toolbarBackground,
          buttons: toolbar,
          orientation: 0,
          // Left-right
          space: {
            item: GetValue$o(config, 'space.toolbarItem', 0)
          },
          click: clickConfig,
          eventEmitter: _this.eventEmitter
        });
      }

      var leftToolbarSizer;

      if (leftToolbar) {
        leftToolbarSizer = new Buttons$1(scene, {
          groupName: 'leftToolbar',
          background: leftToolbarBackground,
          buttons: leftToolbar,
          orientation: 0,
          // Left-right
          space: {
            item: GetValue$o(config, 'space.leftToolbarItem', 0)
          },
          click: clickConfig,
          eventEmitter: _this.eventEmitter
        });
      } // title only


      if (title && !toolbar && !leftToolbar) {
        var align = GetValue$o(config, 'align.title', 'center');
        var titleSpace = GetValue$o(config, 'space.title', 0);
        var padding;

        if (content || description || choices || actions) {
          padding = {
            bottom: titleSpace
          };
        }

        var expand = GetValue$o(config, 'expand.title', true);

        _this.add(title, {
          align: align,
          padding: padding,
          expand: expand
        });
      } // toolbar only


      if (toolbar && !title && !leftToolbar) {
        var titleSpace = GetValue$o(config, 'space.title', 0);
        var padding;

        if (content || description || choices || actions) {
          padding = {
            bottom: titleSpace
          };
        }

        var expand = GetValue$o(config, 'expand.toolbar', true);

        _this.add(toolbarSizer, {
          align: 'right',
          padding: padding,
          expand: expand
        });
      } // leftToolbar only


      if (leftToolbar && !title && !toolbar) {
        var titleSpace = GetValue$o(config, 'space.title', 0);
        var padding;

        if (content || description || choices || actions) {
          padding = {
            bottom: titleSpace
          };
        }

        var expand = GetValue$o(config, 'expand.leftToolbar', true);

        _this.add(leftToolbarSizer, {
          align: 'left',
          padding: padding,
          expand: expand
        });
      } // tilte and (toolbar or leftToolbar)


      if (title && (toolbar || leftToolbar)) {
        var titleSizer = new Sizer(scene, {
          orientation: 0
        }); // Add leftToolbar

        if (leftToolbarSizer) {
          titleSizer.add(leftToolbarSizer, {
            align: 'right',
            expand: false
          });
        } // Add title


        var align = GetValue$o(config, 'align.title', 'left');
        var expand = GetValue$o(config, 'expand.title', true); // Add space if not expand

        if (!expand && (align === 'right' || align === 'center')) {
          titleSizer.addSpace();
        }

        var padding = {
          left: GetValue$o(config, 'space.titleLeft', 0),
          right: GetValue$o(config, 'space.titleRight', 0)
        };
        var proportion = expand ? 1 : 0;
        titleSizer.add(title, {
          proportion: proportion,
          align: 'center',
          padding: padding,
          expand: expand
        }); // Add space if not expand

        if (!expand && (align === 'left' || align === 'center')) {
          titleSizer.addSpace();
        } // Add toolbar


        if (toolbarSizer) {
          titleSizer.add(toolbarSizer, {
            align: 'right',
            expand: false
          });
        } // Add sizer to dialog


        var titleSpace = GetValue$o(config, 'space.title', 0);
        var padding;

        if (content || description || choices || actions) {
          padding = {
            bottom: titleSpace
          };
        }

        _this.add(titleSizer, {
          align: 'center',
          padding: padding,
          expand: true
        });
      }

      if (content) {
        var align = GetValue$o(config, 'align.content', 'center');
        var contentSpace = GetValue$o(config, 'space.content', 0);
        var padding = {
          left: GetValue$o(config, 'space.contentLeft', 0),
          right: GetValue$o(config, 'space.contentRight', 0),
          bottom: description || choices || actions ? contentSpace : 0
        };
        var expand = GetValue$o(config, 'expand.content', true);

        _this.add(content, {
          align: align,
          padding: padding,
          expand: expand
        });
      }

      if (description) {
        var align = GetValue$o(config, 'align.description', 'center');
        var descriptionSpace = GetValue$o(config, 'space.description', 0);
        var padding = {
          left: GetValue$o(config, 'space.descriptionLeft', 0),
          right: GetValue$o(config, 'space.descriptionRight', 0),
          bottom: choices || actions ? descriptionSpace : 0
        };
        var expand = GetValue$o(config, 'expand.description', true);

        _this.add(description, {
          align: align,
          padding: padding,
          expand: expand
        });
      }

      if (choices) {
        var choicesType = GetValue$o(config, 'choicesType', '').split('-');
        var ButtonsClass = Contains(choicesType, 'wrap') ? Buttons : Contains(choicesType, 'grid') ? GridButtons : Buttons$1;
        var buttonsType = Contains(choicesType, 'radio') ? 'radio' : Contains(choicesType, 'checkboxes') ? 'checkboxes' : undefined;
        var space = {
          left: GetValue$o(config, 'space.choicesBackgroundLeft', 0),
          right: GetValue$o(config, 'space.choicesBackgroundRight', 0),
          top: GetValue$o(config, 'space.choicesBackgroundTop', 0),
          bottom: GetValue$o(config, 'space.choicesBackgroundBottom', 0)
        };
        var itemSpace = GetValue$o(config, 'space.choice', 0);

        if (ButtonsClass === Buttons$1) {
          space.item = itemSpace;
        } else if (ButtonsClass === Buttons) {
          space.item = itemSpace;
          space.line = GetValue$o(config, 'space.choiceLine', itemSpace);
        } else {
          // GridButtons
          space.column = GetValue$o(config, 'space.choiceColumn', itemSpace);
          space.row = GetValue$o(config, 'space.choiceRow', itemSpace);
        }

        var choicesConfig = {
          width: GetValue$o(config, 'choicesWidth', undefined),
          height: GetValue$o(config, 'choicesHeight', undefined),
          groupName: 'choices',
          buttonsType: buttonsType,
          background: choicesBackground,
          buttons: choices,
          space: space,
          click: clickConfig,
          eventEmitter: _this.eventEmitter,
          setValueCallback: GetValue$o(config, 'choicesSetValueCallback', undefined),
          setValueCallbackScope: GetValue$o(config, 'choicesSetValueCallbackScope', undefined)
        };

        if (ButtonsClass === Buttons$1) {
          choicesConfig.orientation = Contains(choicesType, 'x') ? 0 : 1;
        }

        choicesSizer = new ButtonsClass(scene, choicesConfig);
        var choicesSpace = GetValue$o(config, 'space.choices', 0);
        var padding = {
          left: GetValue$o(config, 'space.choicesLeft', 0),
          right: GetValue$o(config, 'space.choicesRight', 0),
          bottom: actions ? choicesSpace : 0
        };
        var align = GetValue$o(config, 'align.choices', 'center');
        var expand = GetValue$o(config, 'expand.choices', true);

        _this.add(choicesSizer, {
          align: align,
          padding: padding,
          expand: expand
        });
      }

      if (actions) {
        actionsSizer = new Buttons$1(scene, {
          groupName: 'actions',
          background: actionsBackground,
          buttons: actions,
          orientation: 0,
          // Left-right
          space: {
            item: GetValue$o(config, 'space.action', 0)
          },
          expand: GetValue$o(config, 'expand.actions', false),
          align: GetValue$o(config, 'align.actions', 'center'),
          click: clickConfig,
          eventEmitter: _this.eventEmitter
        });
        var padding = {
          left: GetValue$o(config, 'space.actionsLeft', 0),
          right: GetValue$o(config, 'space.actionsRight', 0)
        };

        _this.add(actionsSizer, {
          align: 'center',
          padding: padding,
          expand: true
        });
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('title', title);

      _this.addChildrenMap('toolbar', toolbar);

      _this.addChildrenMap('leftToolbar', leftToolbar);

      _this.addChildrenMap('content', content);

      _this.addChildrenMap('description', description);

      _this.addChildrenMap('choices', choices);

      _this.addChildrenMap('actions', actions);

      _this.addChildrenMap('choicesSizer', choicesSizer);

      _this.addChildrenMap('actionsSizer', actionsSizer);

      _this.addChildrenMap('toolbarSizer', toolbarSizer);

      _this.addChildrenMap('leftToolbarSizer', leftToolbarSizer);

      return _this;
    }

    return _createClass(Dialog);
  }(Sizer);

  var Contains = function Contains(arr, item) {
    return arr.indexOf(item) !== -1;
  };

  Object.assign(Dialog.prototype, ButtonMethods);

  var CreateDialog$1 = function CreateDialog(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'toolbarBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'leftToolbarBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'choicesBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'actionsBackground', view, styles, customBuilders);
    CreateChild(scene, data, 'title', view, styles, customBuilders);
    CreateChildren(scene, data, 'toolbar', view, styles, customBuilders);
    CreateChildren(scene, data, 'leftToolbar', view, styles, customBuilders);
    CreateChild(scene, data, 'content', view, styles, customBuilders);
    CreateChild(scene, data, 'description', view, styles, customBuilders);
    CreateChildren(scene, data, 'choices', view, styles, customBuilders);
    CreateChildren(scene, data, 'actions', view, styles, customBuilders);
    var gameObject = new Dialog(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var TextKlass = Phaser.GameObjects.Text;

  var IsTextGameObject = function IsTextGameObject(gameObject) {
    return gameObject instanceof TextKlass;
  };

  var BitmapTextKlass = Phaser.GameObjects.BitmapText;

  var IsBitmapTextGameObject = function IsBitmapTextGameObject(gameObject) {
    return gameObject instanceof BitmapTextKlass;
  };

  var TextType = 0;
  var TagTextType = 1;
  var BitmapTextType = 2;

  var GetTextObjectType = function GetTextObjectType(textObject) {
    var textObjectType;

    if (IsBitmapTextGameObject(textObject)) {
      textObjectType = BitmapTextType;
    } else if (IsTextGameObject(textObject)) {
      textObjectType = TextType;
    } else {
      textObjectType = TagTextType;
    }

    return textObjectType;
  };

  var TextToLines = function TextToLines(textObject, text, lines) {
    var textObjectType = GetTextObjectType(textObject);

    switch (textObjectType) {
      case TextType:
        lines = textObject.getWrappedText(text); // Array of string

        break;

      case TagTextType:
        lines = textObject.getPenManager(text, lines); // Pens-manager

        break;

      case BitmapTextType:
        if (textObject.maxWidth > 0) {
          lines = textObject.setText(text).getTextBounds().wrappedText.split('\n');
        } else {
          lines = text.split('\n');
        }

        break;
    }

    return lines;
  };

  var GetLines$1 = function GetLines(startLineIndex, endLineIdx) {
    if (startLineIndex === undefined) {
      startLineIndex = this.startLineIndex;
    }

    if (endLineIdx === undefined) {
      endLineIdx = startLineIndex + this.pageLinesCount;
    }

    var text;

    switch (this.textObjectType) {
      case TextType:
      case BitmapTextType:
        text = this.lines.slice(startLineIndex, endLineIdx).join('\n');
        break;

      case TagTextType:
        var startIdx = this.lines.getLineStartIndex(startLineIndex);
        var endIdx = this.lines.getLineEndIndex(endLineIdx - 1);
        text = this.lines.getSliceTagText(startIdx, endIdx, true);
        break;
    }

    return text;
  };

  var GetString = function GetString(text) {
    if (Array.isArray(text)) {
      text = text.join('\n');
    } else if (typeof text === 'number') {
      text = text.toString();
    }

    return text;
  };

  var SetContentMethods = {
    clearText: function clearText() {
      this.sections.length = 0;
      this.pageStartIndexes.length = 0;
      this.lines.length = 0;
      return this;
    },
    appendPage: function appendPage(text) {
      var pageStartIndex = this.totalLinesCount;
      this.sections.push(GetString(text));
      var text = this.sections.join('\n');
      this.lines = TextToLines(this.parent, text, this.lines);
      var newLinesCount = this.totalLinesCount - pageStartIndex;
      var pageCount = Math.ceil(newLinesCount / this.pageLinesCount);

      for (var i = 0; i < pageCount; i++) {
        this.pageStartIndexes.push(pageStartIndex + i * this.pageLinesCount);
      }

      return this;
    },
    setText: function setText(text, resetPageIdx) {
      if (resetPageIdx === undefined) {
        resetPageIdx = true;
      }

      if (resetPageIdx) {
        this.resetPageIdx();
      }

      this.clearText();
      var sections = GetString(text).split(this.pageBreak); // if (sections[sections.length - 1] === '') { // Last section is an empty string
      //     sections.length -= 1;
      // }

      for (var i = 0, cnt = sections.length; i < cnt; i++) {
        this.appendPage(sections[i]);
      }

      return this;
    },
    appendText: function appendText(text) {
      var content = this.content + GetString(text);
      this.setText(content, false);
      return this;
    }
  };

  var Clamp$5 = Phaser.Math.Clamp;
  var GetPageMethods = {
    getPage: function getPage(idx) {
      if (idx === undefined) {
        idx = this.pageIndex;
      }

      return this.setPageIndex(idx).getLines(this.startLineIndex, this.endLineIndex);
    },
    getNextPage: function getNextPage() {
      return this.getPage(this.pageIndex + 1);
    },
    getPreviousPage: function getPreviousPage() {
      return this.getPage(this.pageIndex - 1);
    },
    resetPageIdx: function resetPageIdx() {
      this.pageIndex = -1;
      return this;
    },
    setPageIndex: function setPageIndex(idx) {
      idx = Clamp$5(idx, 0, this.pageCount - 1);
      this.pageIndex = idx;
      this.startLineIndex = this.pageStartIndexes[idx];
      this.endLineIndex = this.pageStartIndexes[idx + 1];
      return this;
    }
  };

  var SetNoWrapText = function SetNoWrapText(textObject, text) {
    var textObjectType = GetTextObjectType(textObject);

    switch (textObjectType) {
      case TextType:
        // Store wrap properties
        var style = textObject.style;
        var wordWrapWidth = style.wordWrapWidth;
        var wordWrapCallback = style.wordWrapCallback; // Disable wrap

        style.wordWrapWidth = 0;
        style.wordWrapCallback = undefined; // Set text

        textObject.setText(text); // Restore wrap

        style.wordWrapWidth = wordWrapWidth;
        style.wordWrapCallback = wordWrapCallback;
        break;

      case TagTextType:
        // Store wrap properties
        var style = textObject.style;
        var wrapMode = style.wrapMode; // Disable wrap

        style.wrapMode = 0; // Set text

        textObject.setText(text); // Restore wrap

        style.wrapMode = wrapMode;
        break;

      case BitmapTextType:
        // Store wrap properties
        var maxWidth = textObject._maxWidth; // Disable wrap

        textObject._maxWidth = 0; // Set text

        textObject.setText(text); // Restore wrap

        textObject._maxWidth = maxWidth;
        break;
    }
  };

  var ShowMethods = {
    showPage: function showPage(idx) {
      this.displayText(this.getPage(idx));
      return this;
    },
    showNextPage: function showNextPage() {
      this.displayText(this.getNextPage());
      return this;
    },
    showPreviousPage: function showPreviousPage() {
      this.displayText(this.getPreviousPage());
      return this;
    },
    show: function show() {
      this.displayText(this.getLines());
      return this;
    },
    showNextLine: function showNextLine() {
      this.displayText(this.setStartLineIndex(this.startLineIndex + 1).getLines());
      return this;
    },
    showPreviousLine: function showPreviousLine() {
      this.displayText(this.setStartLineIndex(this.startLineIndex - 1).getLines());
      return this;
    },
    displayText: function displayText(text) {
      SetNoWrapText(this.parent, text);
    }
  };

  var Methods$3 = {
    getLines: GetLines$1
  };
  Object.assign(Methods$3, SetContentMethods, GetPageMethods, ShowMethods);

  var GetValue$n = Phaser.Utils.Objects.GetValue;
  var Clamp$4 = Phaser.Math.Clamp;

  var TextPage = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TextPage, _ComponentBase);

    var _super = _createSuper(TextPage);

    function TextPage(gameObject, config) {
      var _this;

      _classCallCheck(this, TextPage);

      _this = _super.call(this, gameObject, {
        eventEmitter: false
      }); // No event emitter
      // this.parent = gameObject;

      _this.textObjectType = GetTextObjectType(_this.parent);
      _this.pageStartIndexes = []; // Text object : array of string
      // Tag text object : pens-manager
      // Bitmap text object : array of string

      _this.lines = TextToLines(_this.parent, '');
      _this.sections = [];

      _this.resetFromJSON(config);

      return _this;
    }

    _createClass(TextPage, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setMaxLines(GetValue$n(o, 'maxLines', undefined));
        this.setPageBreak(GetValue$n(o, 'pageBreak', '\f\n'));
        this.setText(GetValue$n(o, 'text', ''));
        this.setStartLineIndex(GetValue$n(o, 'start', 0));
        this.setPageIndex(GetValue$n(o, 'page', -1));
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          maxLines: this.maxLines,
          text: this.content,
          start: this.startLineIndex,
          page: this.pageIndex,
          pageBreak: this.pageBreak
        };
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        switch (this.textObjectType) {
          case TextType:
            this.lines.length = 0;
            break;

          case TagTextType:
            this.lines.destroy();
            break;

          case BitmapTextType:
            this.lines.length = 0;
            break;
        }

        this.pageStartIndexes.length = 0;
        this.sections.length = 0;
        this.lines = undefined;
        this.pageStartIndexes = undefined;
        this.sections = undefined;

        _get(_getPrototypeOf(TextPage.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setMaxLines",
      value: function setMaxLines(maxLines) {
        this.maxLines = maxLines;
        return this;
      }
    }, {
      key: "setPageBreak",
      value: function setPageBreak(pageBreak) {
        this.pageBreak = pageBreak;
        return this;
      }
    }, {
      key: "pageCount",
      get: function get() {
        return this.pageStartIndexes.length;
      }
    }, {
      key: "isFirstPage",
      get: function get() {
        return this.pageIndex <= 0;
      }
    }, {
      key: "isLastPage",
      get: function get() {
        return this.pageIndex >= this.pageCount - 1;
      }
    }, {
      key: "totalLinesCount",
      get: function get() {
        return this.lines ? this.lines.length : 0;
      }
    }, {
      key: "startLineIndex",
      get: function get() {
        return this._startLineIndex;
      },
      set: function set(value) {
        value = Clamp$4(value, 0, this.totalLinesCount - 1);
        this._startLineIndex = value;
      }
    }, {
      key: "setStartLineIndex",
      value: function setStartLineIndex(idx) {
        this.startLineIndex = idx;
        return this;
      }
    }, {
      key: "pageLinesCount",
      get: function get() {
        if (this.maxLines !== undefined) {
          return this.maxLines;
        } else {
          var count;

          switch (this.textObjectType) {
            case TextType:
            case TagTextType:
              var maxLines = this.parent.style.maxLines;

              if (maxLines > 0) {
                count = maxLines;
              } else {
                count = this.totalLinesCount;
              }

              break;

            case BitmapTextType:
              count = this.totalLinesCount;
              break;
          }

          return count;
        }
      }
    }, {
      key: "content",
      get: function get() {
        return this.sections.join(this.pageBreak);
      }
    }]);

    return TextPage;
  }(ComponentBase);

  Object.assign(TextPage.prototype, Methods$3);

  var GetWrapText = function GetWrapText(textObject, text) {
    var textObjectType = GetTextObjectType(textObject);

    switch (textObjectType) {
      case TextType:
        textObject.style.syncFont(textObject.canvas, textObject.context);
        text = textObject.runWordWrap(text);
        break;

      case TagTextType:
        text = textObject.getText(text, undefined, undefined, true);
        break;

      case BitmapTextType:
        text = textObject.setText(text).getTextBounds().wrappedText;
        break;
    }

    return text;
  };

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var GetValue$m = Phaser.Utils.Objects.GetValue;

  var TextTyping = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TextTyping, _ComponentBase);

    var _super = _createSuper(TextTyping);

    function TextTyping(gameObject, config) {
      var _this;

      _classCallCheck(this, TextTyping);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this.timer = null;

      _this.resetFromJSON(config);

      return _this;
    }

    _createClass(TextTyping, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setTextWrapEnable(GetValue$m(o, 'wrap', false));
        this.setTypeMode(GetValue$m(o, 'typeMode', 0));
        this.setTypeSpeed(GetValue$m(o, 'speed', 333));
        this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);
        this.setTypingContent(GetFastValue(o, 'text', ''));
        this.typingIdx = GetFastValue(o, 'typingIdx', 0);
        this.insertIdx = GetFastValue(o, 'insertIdx', null);
        var elapsed = GetFastValue(o, 'elapsed', null);

        if (elapsed !== null) {
          this.start(undefined, undefined, this.typingIdx, elapsed);
        }

        return this;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.freeTimer();

        _get(_getPrototypeOf(TextTyping.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTypeMode",
      value: function setTypeMode(m) {
        if (typeof m === 'string') {
          m = TYPEMODE[m];
        }

        this.typeMode = m;
        return this;
      }
    }, {
      key: "setTypeSpeed",
      value: function setTypeSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "setTextWrapEnable",
      value: function setTextWrapEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.textWrapEnable = enable;
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        var text = TransferText(value);

        if (this.textWrapEnable) {
          text = GetWrapText(this.parent, text);
        }

        this._text = text;
      }
    }, {
      key: "isTyping",
      get: function get() {
        return this.getTimer() !== null;
      }
    }, {
      key: "isLastChar",
      get: function get() {
        return this.typingIdx === this.textLen;
      }
    }, {
      key: "start",
      value: function start(text, speed, startIdx, timerStartAt) {
        if (text !== undefined) {
          this.setTypingContent(text);
        }

        if (speed !== undefined) {
          this.speed = speed;
        }

        if (startIdx === undefined) {
          startIdx = 0;
        }

        this.typingIdx = startIdx + 1;

        if (this.speed === 0) {
          this.stop(true);
        } else {
          this.setText('');
          this.startTimer(timerStartAt);
        }

        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(text) {
        var newText = this.text.concat(TransferText(text));

        if (this.isTyping) {
          this.setTypingContent(newText);
        } else {
          this.start(newText, undefined, this.textLen);
        }

        return this;
      }
    }, {
      key: "stop",
      value: function stop(showAllText) {
        var timer = this.getTimer();

        if (timer) {
          this.freeTimer();
        }

        if (showAllText) {
          this.typingIdx = this.textLen;
          this.setText(this.text);
          this.emit('type');
          this.emit('complete', this, this.parent);
        }

        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        var timer = this.getTimer();

        if (timer) {
          timer.paused = true;
        }

        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        var timer = this.getTimer();

        if (timer) {
          timer.paused = false;
        }

        return this;
      }
    }, {
      key: "setTypingContent",
      value: function setTypingContent(text) {
        this.text = text;
        this.textLen = this.getTextLength(this.text);
        return this;
      }
    }, {
      key: "onTyping",
      value: function onTyping() {
        var newText = this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
        this.setText(newText);
        this.emit('type');

        if (this.isLastChar) {
          this.freeTimer();
          this.emit('complete', this, this.parent);
        } else {
          this.timer.delay = this.speed; // delay of next typing            

          this.typingIdx++;
        }
      }
    }, {
      key: "getTypingString",
      value: function getTypingString(text, typeIdx, textLen, typeMode) {
        var result;

        if (typeMode === 0) {
          //left-to-right
          var startIdx = 0;
          var endIdx = typeIdx;
          this.insertIdx = endIdx;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 1) {
          //right-to-left
          var endIdx = textLen;
          var startIdx = endIdx - typeIdx;
          this.insertIdx = 0;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 2) {
          //middle-to-sides
          var midIdx = textLen / 2;
          var startIdx = Math.floor(midIdx - typeIdx / 2);
          var endIdx = startIdx + typeIdx;
          this.insertIdx = typeIdx % 2 ? typeIdx : 0;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 3) {
          //sides-to-middle
          var lowerLen = Math.floor(typeIdx / 2);
          var lowerResult;

          if (lowerLen > 0) {
            var endIdx = textLen;
            var startIdx = endIdx - lowerLen;
            lowerResult = this.getSubString(text, startIdx, endIdx);
          } else {
            lowerResult = "";
          }

          var upperLen = typeIdx - lowerLen;
          var upperResult;

          if (upperLen > 0) {
            var startIdx = 0;
            var endIdx = startIdx + upperLen;
            this.insertIdx = endIdx;
            upperResult = this.getSubString(text, startIdx, endIdx);
          } else {
            upperResult = "";
            this.insertIdx = 0;
          }

          result = upperResult + lowerResult;
        }

        return result;
      }
    }, {
      key: "startTimer",
      value: function startTimer(timerStartAt) {
        if (this.timer) {
          this.freeTimer();
        }

        var startAt;

        if (timerStartAt === undefined) {
          startAt = 0;
        } else {
          this.speed;
          startAt = timerStartAt;
        }

        this.timer = this.scene.time.addEvent({
          delay: 0,
          startAt: startAt,
          loop: true,
          callback: this.onTyping,
          callbackScope: this
        });
        return this;
      }
    }, {
      key: "getTimer",
      value: function getTimer() {
        return this.timer;
      }
    }, {
      key: "freeTimer",
      value: function freeTimer() {
        if (this.timer) {
          this.timer.remove();
          this.timer = null;
        }

        return this;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        if (this.setTextCallback) {
          if (this.setTextCallbackScope) {
            text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIdx);
          } else {
            text = this.setTextCallback(text, this.isLastChar, this.insertIdx);
          }
        }

        if (this.textWrapEnable) {
          SetNoWrapText(this.parent, text);
        } else {
          this.parent.setText(text);
        }
      }
    }, {
      key: "getTextLength",
      value: function getTextLength(text) {
        var gameObject = this.parent;
        var len;

        if (gameObject.getPlainText) {
          len = gameObject.getPlainText(text).length;
        } else {
          len = text.length;
        }

        return len;
      }
    }, {
      key: "getSubString",
      value: function getSubString(text, startIdx, endIdx) {
        var gameObject = this.parent;
        var result;

        if (gameObject.getSubString) {
          result = gameObject.getSubString(text, startIdx, endIdx);
        } else {
          result = text.slice(startIdx, endIdx);
        }

        return result;
      }
    }]);

    return TextTyping;
  }(ComponentBase);

  var TransferText = function TransferText(text) {
    if (Array.isArray(text)) {
      text = text.join('\n');
    } else if (typeof text === 'number') {
      text = text.toString();
    }

    return text;
  };

  var TYPEMODE = {
    'left-to-right': 0,
    'right-to-left': 1,
    'middle-to-sides': 2,
    'sides-to-middle': 3
  };

  var GetValue$l = Phaser.Utils.Objects.GetValue;

  var TextBox = /*#__PURE__*/function (_Label) {
    _inherits(TextBox, _Label);

    var _super = _createSuper(TextBox);

    function TextBox(scene, config) {
      var _this;

      _classCallCheck(this, TextBox);

      if (config === undefined) {
        config = {
          text: createDefaultTextObject$1(scene)
        };
      }

      _this = _super.call(this, scene, config);
      _this.type = 'rexTextBox';
      var text = _this.childrenMap.text;
      _this.page = new TextPage(text, GetValue$l(config, 'page', undefined));
      _this.typing = new TextTyping(text, GetValue$l(config, 'typing', config.type));

      _this.typing.on('complete', _this.onPageEnd, _assertThisInitialized(_this)).on('type', _this.onType, _assertThisInitialized(_this));

      _this.textWidth = text.width;
      _this.textHeight = text.height;
      return _this;
    }

    _createClass(TextBox, [{
      key: "start",
      value: function start(text, speed) {
        this.page.setText(text);

        if (speed !== undefined) {
          this.setTypeSpeed(speed);
        }

        this.typeNextPage();
        return this;
      }
    }, {
      key: "typeNextPage",
      value: function typeNextPage() {
        if (!this.isLastPage) {
          var txt = this.page.getNextPage();
          this.typing.start(txt);
        } else {
          this.emit('complete');
        }

        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.typing.pause();
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this.typing.resume();
        return this;
      }
    }, {
      key: "stop",
      value: function stop(showAllText) {
        this.typing.stop(showAllText);
        return this;
      }
    }, {
      key: "setTypeSpeed",
      value: function setTypeSpeed(speed) {
        this.typing.setTypeSpeed(speed);
        return this;
      }
    }, {
      key: "isTyping",
      get: function get() {
        return this.typing.isTyping;
      }
    }, {
      key: "isLastPage",
      get: function get() {
        return this.page.isLastPage;
      }
    }, {
      key: "isFirstPage",
      get: function get() {
        return this.page.isFirstPage;
      }
    }, {
      key: "pageCount",
      get: function get() {
        return this.page.pageCount;
      }
    }, {
      key: "pageIndex",
      get: function get() {
        return this.page.pageIndex;
      }
    }, {
      key: "onType",
      value: function onType() {
        var text = this.childrenMap.text;

        if (this.textWidth !== text.width || this.textHeight !== text.height) {
          this.textWidth = text.width;
          this.textHeight = text.height;
          this.getTopmostSizer().layout();
        }

        this.emit('type');
      }
    }, {
      key: "onPageEnd",
      value: function onPageEnd() {
        this.emit('pageend');

        if (this.isLastPage) {
          this.emit('complete');
        }
      }
    }]);

    return TextBox;
  }(Label);

  var createDefaultTextObject$1 = function createDefaultTextObject(scene) {
    return scene.add.text(0, 0, '', {
      wordWrap: {
        width: 200
      },
      maxLines: 5
    });
  };

  var CreateTextBox = function CreateTextBox(scene, data, view, styles, customBuilders) {
    return CreateAnyLabel(scene, data, view, styles, customBuilders, TextBox);
  };

  var Percent$4 = Phaser.Math.Percent;

  var PositionToPercent = function PositionToPercent(startPoint, endPoint, currentPoint) {
    var min, max, value;

    if (startPoint.y === endPoint.y) {
      min = Math.min(startPoint.x, endPoint.x);
      max = Math.max(startPoint.x, endPoint.x);
      value = Percent$4(currentPoint.x, min, max);
    } else if (startPoint.x === endPoint.x) {
      min = Math.min(startPoint.y, endPoint.y);
      max = Math.max(startPoint.y, endPoint.y);
      value = Percent$4(currentPoint.y, min, max);
    }

    return value;
  };

  var OnDragThumb = function OnDragThumb(pointer, dragX, dragY) {
    if (!this.enable) {
      return;
    }

    tmpPoint$4.x = dragX;
    tmpPoint$4.y = dragY;
    this.value = PositionToPercent(this.getStartPoint(), this.getEndPoint(), tmpPoint$4);
  };

  var tmpPoint$4 = {};

  var OnTouchTrack = function OnTouchTrack(pointer, localX, localY) {
    if (!this.enable) {
      return;
    }

    if (!pointer.isDown) {
      return;
    }

    tmpPoint$3.x = pointer.worldX;
    tmpPoint$3.y = pointer.worldY;
    var value = PositionToPercent(this.getStartPoint(), this.getEndPoint(), tmpPoint$3);
    this.stopEaseValue();

    if (this.easeValueDuration === 0 || Math.abs(this.value - value) < 0.1) {
      this.value = value;
    } else {
      this.easeValueTo(value);
    }
  };

  var tmpPoint$3 = {};

  var GetThumbAlignPoint = function GetThumbAlignPoint(align, out) {
    if (out === undefined) {
      out = tmpPoint$2;
    }

    var thumb = this.childrenMap.thumb;
    var currentX = thumb.x;
    var currentY = thumb.y;
    AlignIn(thumb, this.innerLeft, this.innerTop, this.innerWidth, this.innerHeight, align);
    out.x = thumb.x;
    out.y = thumb.y;
    thumb.x = currentX;
    thumb.y = currentY;
    return out;
  };

  var tmpPoint$2 = {};

  var AlignLeft$1 = Phaser.Display.Align.LEFT_CENTER;
  var AlignTop$1 = Phaser.Display.Align.TOP_CENTER;

  var GetStartPoint = function GetStartPoint(out) {
    if (out === undefined) {
      out = tmpPoint$1;
    }

    if (this.childrenMap.thumb) {
      var align = this.orientation === 0 ? AlignLeft$1 : AlignTop$1;
      GetThumbAlignPoint.call(this, align, out);
    } else {
      if (this.orientation === 0) {
        out.x = this.innerLeft + 1; // Add 1 pixel margin

        out.y = this.centerY;
      } else {
        out.x = this.centerX;
        out.y = this.innerTop + 1; // Add 1 pixel margin
      }
    }

    return out;
  };

  var tmpPoint$1 = {};

  var AlignRight = Phaser.Display.Align.RIGHT_CENTER;
  var AlignBottom = Phaser.Display.Align.BOTTOM_CENTER;

  var GetEndoint = function GetEndoint(out) {
    if (out === undefined) {
      out = tmpPoint;
    }

    if (this.childrenMap.thumb) {
      var align = this.orientation === 0 ? AlignRight : AlignBottom;
      GetThumbAlignPoint.call(this, align, out);
    } else {
      if (this.orientation === 0) {
        out.x = this.innerRight - 1; // Add 1 pixel margin

        out.y = this.centerY;
      } else {
        out.x = this.centerX;
        out.y = this.innerBottom - 1; // Add 1 pixel margin
      }
    }

    return out;
  };

  var tmpPoint = {};

  var Linear$3 = Phaser.Math.Linear;

  var PercentToPosition = function PercentToPosition(t, startPoint, endPoint, out) {
    if (out === undefined) {
      out = tmpOut;
    }

    out.x = Linear$3(startPoint.x, endPoint.x, t);
    out.y = Linear$3(startPoint.y, endPoint.y, t);
    return out;
  };

  var tmpOut = {};

  var UpdateThumb = function UpdateThumb(t) {
    var thumb = this.childrenMap.thumb;

    if (thumb === undefined) {
      return this;
    }

    if (t === undefined) {
      t = this.value;
    }

    PercentToPosition(t, this.getStartPoint(), this.getEndPoint(), thumb);
    this.resetChildPositionState(thumb);
    return this;
  };

  var AlignLeft = Phaser.Display.Align.LEFT_CENTER;
  var AlignTop = Phaser.Display.Align.TOP_CENTER;

  var UpdateIndicator = function UpdateIndicator(t) {
    var indicator = this.childrenMap.indicator;

    if (indicator === undefined) {
      return this;
    }

    if (t === undefined) {
      t = this.value;
    }

    var newWidth, newHeight;
    var thumb = this.childrenMap.thumb;

    if (thumb) {
      if (this.orientation === 0) {
        // x, extend width
        var thumbWidth = GetDisplayWidth(thumb);
        var thumbRight = thumb.x - thumbWidth * thumb.originX + thumbWidth;
        newWidth = thumbRight - this.left;
      } else {
        // y, extend height
        var thumbHeight = GetDisplayHeight(thumb);
        var thumbBottom = thumb.y - thumbHeight * thumb.originY + thumbHeight;
        newHeight = thumbBottom - this.top;
      }
    } else {
      if (this.orientation === 0) {
        // x, extend width
        newWidth = this.width * t;
      } else {
        // y, extend eight
        newHeight = this.height * t;
      }
    }

    ResizeGameObject(indicator, newWidth, newHeight);
    var align = this.orientation === 0 ? AlignLeft : AlignTop;
    QuickSet(indicator, this, align);
    this.resetChildPositionState(indicator);
  };

  var Percent$3 = Phaser.Math.Percent;

  var SetEaseValuePropName = function SetEaseValuePropName(name) {
    this.easeValuePropName = name;
    return this;
  };

  var SetEaseValueDuration = function SetEaseValueDuration(duration) {
    this.easeValueDuration = duration;
    return this;
  };

  var SetEaseValueFunction = function SetEaseValueFunction(ease) {
    this.easeFunction = ease;
    return this;
  };

  var StopEaseValue = function StopEaseValue() {
    if (this.easeValueTask) {
      this.easeValueTask.stop();
    }

    return this;
  };

  var EaseValueTo = function EaseValueTo(value, min, max) {
    if (value === undefined || value === null) {
      return this;
    }

    if (min !== undefined) {
      value = Percent$3(value, min, max);
    }

    if (this.easeValueTask === undefined) {
      this.easeValueTask = new EaseValueTask(this, {
        eventEmitter: null
      });
    }

    this.easeValueTask.restart({
      key: this.easeValuePropName,
      to: value,
      duration: this.easeValueDuration,
      ease: this.easeFunction
    });
    return this;
  };

  var EaseValueMethods = {
    setEaseValuePropName: SetEaseValuePropName,
    setEaseValueDuration: SetEaseValueDuration,
    setEaseValueFunction: SetEaseValueFunction,
    stopEaseValue: StopEaseValue,
    easeValueTo: EaseValueTo
  };

  var GetValue$k = Phaser.Utils.Objects.GetValue;
  var Clamp$3 = Phaser.Math.Clamp;
  var Linear$2 = Phaser.Math.Linear;
  var Percent$2 = Phaser.Math.Percent;
  var SnapTo$1 = Phaser.Math.Snap.To;

  var Slider$1 = /*#__PURE__*/function (_Sizer) {
    _inherits(Slider, _Sizer);

    var _super = _createSuper(Slider);

    function Slider(scene, config) {
      var _this;

      _classCallCheck(this, Slider);

      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexSlider';
      _this.eventEmitter = GetValue$k(config, 'eventEmitter', _assertThisInitialized(_this)); // Add elements

      var background = GetValue$k(config, 'background', undefined);
      var track = GetValue$k(config, 'track', undefined);
      var indicator = GetValue$k(config, 'indicator', undefined);
      var thumb = GetValue$k(config, 'thumb', undefined);

      if (background) {
        _this.addBackground(background);
      }

      if (track) {
        _this.add(track, {
          proportion: 1,
          expand: true,
          minWidth: _this.orientation === 0 ? 0 : undefined,
          minHeight: _this.orientation === 1 ? 0 : undefined
        });
      }

      if (indicator) {
        _this.pin(indicator); // Put into container but not layout it

      }

      if (thumb) {
        _this.pin(thumb); // Put into container but not layout it

      } // Input


      var inputMode = GetValue$k(config, 'input', 0);

      if (typeof inputMode === 'string') {
        inputMode = INPUTMODE$1[inputMode];
      }

      switch (inputMode) {
        case 0:
          // 'drag'
          if (thumb) {
            thumb.setInteractive();

            _this.scene.input.setDraggable(thumb);

            thumb.on('drag', OnDragThumb, _assertThisInitialized(_this)).on('dragstart', function (pointer) {
              this.eventEmitter.emit('inputstart', pointer);
            }, _assertThisInitialized(_this)).on('dragend', function (pointer) {
              this.eventEmitter.emit('inputend', pointer);
            }, _assertThisInitialized(_this));
          }

          break;

        case 1:
          // 'click'
          _this.setInteractive().on('pointerdown', OnTouchTrack, _assertThisInitialized(_this)).on('pointermove', OnTouchTrack, _assertThisInitialized(_this)).on('pointerdown', function (pointer) {
            this.eventEmitter.emit('inputstart', pointer);
          }, _assertThisInitialized(_this)).on('pointerup', function (pointer) {
            this.eventEmitter.emit('inputend', pointer);
          }, _assertThisInitialized(_this)).on('pointerover', function (pointer) {
            if (pointer.isDown) {
              this.eventEmitter.emit('inputstart', pointer);
            }
          }, _assertThisInitialized(_this)).on('pointerout', function (pointer) {
            if (pointer.isDown) {
              this.eventEmitter.emit('inputend', pointer);
            }
          }, _assertThisInitialized(_this));

          break;
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('track', track);

      _this.addChildrenMap('indicator', indicator);

      _this.addChildrenMap('thumb', thumb);

      var callback = GetValue$k(config, 'valuechangeCallback', null);

      if (callback !== null) {
        var scope = GetValue$k(config, 'valuechangeCallbackScope', undefined);

        _this.eventEmitter.on('valuechange', callback, scope);
      }

      _this.setEnable(GetValue$k(config, 'enable', undefined));

      _this.setGap(GetValue$k(config, 'gap', undefined));

      _this.setValue(GetValue$k(config, 'value', 0), GetValue$k(config, 'min', undefined), GetValue$k(config, 'max', undefined));

      _this.setEaseValuePropName('value').setEaseValueDuration(GetValue$k(config, 'easeValue.duration', 0)).setEaseValueFunction(GetValue$k(config, 'easeValue.ease', 'Linear'));

      return _this;
    }

    _createClass(Slider, [{
      key: "setEnable",
      value: function setEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.enable = enable;
        return this;
      }
    }, {
      key: "setGap",
      value: function setGap(gap) {
        this.gap = gap;
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this.gap !== undefined) {
          value = SnapTo$1(value, this.gap);
        }

        var oldValue = this._value;
        this._value = Clamp$3(value, 0, 1);

        if (oldValue !== this._value) {
          this.updateThumb(this._value);
          this.updateIndicator(this._value);
          this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
        }
      }
    }, {
      key: "setValue",
      value: function setValue(value, min, max) {
        if (value === undefined || value === null) {
          return this;
        }

        if (min !== undefined) {
          value = Percent$2(value, min, max);
        }

        this.value = value;
        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, min, max) {
        if (min !== undefined) {
          inc = Percent$2(inc, min, max);
        }

        this.value += inc;
        return this;
      }
    }, {
      key: "getValue",
      value: function getValue(min, max) {
        var value = this.value;

        if (min !== undefined) {
          value = Linear$2(min, max, value);
        }

        return value;
      }
    }, {
      key: "runLayout",
      value: function runLayout(parent, newWidth, newHeight) {
        // Skip hidden or !dirty sizer
        if (this.ignoreLayout) {
          return this;
        }

        _get(_getPrototypeOf(Slider.prototype), "runLayout", this).call(this, parent, newWidth, newHeight);

        this.updateThumb();
        this.updateIndicator();
        return this;
      }
    }]);

    return Slider;
  }(Sizer);

  var INPUTMODE$1 = {
    pan: 0,
    drag: 0,
    click: 1,
    none: -1
  };
  var methods$2 = {
    getStartPoint: GetStartPoint,
    getEndPoint: GetEndoint,
    updateThumb: UpdateThumb,
    updateIndicator: UpdateIndicator
  };
  Object.assign(Slider$1.prototype, methods$2, EaseValueMethods);

  var CreateSlider = function CreateSlider(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'track', view, styles, customBuilders);
    CreateChild(scene, data, 'indicator', view, styles, customBuilders);
    CreateChild(scene, data, 'thumb', view, styles, customBuilders);
    var gameObject = new Slider$1(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetValue$j = Phaser.Utils.Objects.GetValue;

  var NumberBar = /*#__PURE__*/function (_Sizer) {
    _inherits(NumberBar, _Sizer);

    var _super = _createSuper(NumberBar);

    function NumberBar(scene, config) {
      var _this;

      _classCallCheck(this, NumberBar);

      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexNumberBar'; // Add elements

      var background = GetValue$j(config, 'background', undefined);
      var icon = GetValue$j(config, 'icon', undefined);
      var iconMask = GetValue$j(config, 'iconMask', undefined);
      var sliderConfig = GetValue$j(config, 'slider', undefined);
      var text = GetValue$j(config, 'text', undefined); // Space

      var iconSpace = GetValue$j(config, 'space.icon', 0);
      var sliderSpace = GetValue$j(config, 'space.slider', 0);

      if (background) {
        _this.addBackground(background);
      }

      if (icon) {
        var padding;

        if (_this.orientation === 0) {
          if (sliderConfig || text) {
            padding = {
              right: iconSpace
            };
          }
        } else {
          if (sliderConfig || text) {
            padding = {
              bottom: iconSpace
            };
          }
        }

        _this.add(icon, {
          proportion: 0,
          align: 'center',
          padding: padding
        });

        if (iconMask) {
          iconMask = AddChildMask.call(_assertThisInitialized(_this), icon, icon, 1); // Circle mask
        }
      }

      var slider;

      if (sliderConfig) {
        sliderConfig.orientation = _this.orientation;
        sliderConfig.eventEmitter = _assertThisInitialized(_this);
        sliderConfig.value = null;

        if (!sliderConfig.hasOwnProperty('input')) {
          sliderConfig.input = -1;
        }

        slider = new Slider$1(scene, sliderConfig);
        scene.add.existing(slider);
        var padding;

        if (_this.orientation === 0) {
          if (text) {
            padding = {
              right: sliderSpace
            };
          }
        } else {
          if (text) {
            padding = {
              bottom: sliderSpace
            };
          }
        }

        var proportion;

        if (_this.orientation === 0) {
          var sliderWidth = GetValue$j(sliderConfig, 'width', undefined);
          proportion = sliderWidth === undefined ? 1 : 0;
        } else {
          var sliderHeight = GetValue$j(sliderConfig, 'height', undefined);
          proportion = sliderHeight === undefined ? 1 : 0;
        }

        _this.add(slider, {
          proportion: proportion,
          align: 'center',
          padding: padding
        });
      }

      if (text) {
        _this.add(text);
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('icon', icon);

      _this.addChildrenMap('iconMask', iconMask);

      _this.addChildrenMap('slider', slider);

      _this.addChildrenMap('text', text);

      var callback = GetValue$j(config, 'valuechangeCallback', null);

      if (callback !== null) {
        var scope = GetValue$j(config, 'valuechangeCallbackScope', undefined);

        _this.on('valuechange', callback, scope);
      }

      _this.setEnable(GetValue$j(config, 'enable', undefined));

      _this.setValue(GetValue$j(config, 'value', 0));

      return _this;
    }

    _createClass(NumberBar, [{
      key: "enable",
      get: function get() {
        if (this.childrenMap.slider) {
          return this.childrenMap.slider.enable;
        } else {
          return false;
        }
      },
      set: function set(value) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.setEnable(value);
        }
      }
    }, {
      key: "setEnable",
      value: function setEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.enable = enable;
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        if (this.childrenMap.slider) {
          return this.childrenMap.slider.value;
        } else {
          return 0;
        }
      },
      set: function set(value) {
        if (!this.childrenMap.slider) {
          return;
        }

        this.childrenMap.slider.value = value;
      }
    }, {
      key: "setValue",
      value: function setValue(value, min, max) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.setValue(value, min, max);
        }

        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, min, max) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.addValue(inc, min, max);
        }

        return this;
      }
    }, {
      key: "getValue",
      value: function getValue(min, max) {
        if (this.childrenMap.slider) {
          return this.childrenMap.slider.getValue(min, max);
        } else {
          return 0;
        }
      }
    }, {
      key: "easeValueTo",
      value: function easeValueTo(value, min, max) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.easeValueTo(value, min, max);
        }

        return this;
      }
    }, {
      key: "stopEaseValue",
      value: function stopEaseValue() {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.stopEaseValue();
        }

        return this;
      }
    }, {
      key: "setEaseValueDuration",
      value: function setEaseValueDuration(duration) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.setEaseValueDuration(duration);
        }

        return this;
      }
    }, {
      key: "setEaseValueFunction",
      value: function setEaseValueFunction(ease) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.setEaseValueFunction(ease);
        }

        return this;
      }
    }, {
      key: "text",
      get: function get() {
        var textObject = this.childrenMap.text;

        if (textObject === undefined) {
          return '';
        }

        var value;

        if (textObject.text) {
          value = textObject.text;
        } else {
          value = textObject.getData('text');
        }

        return value;
      },
      set: function set(value) {
        var textObject = this.childrenMap.text;

        if (textObject === undefined) {
          return;
        }

        if (textObject.setText) {
          textObject.setText(value);
        } else {
          textObject.setData('text', value);
        }
      }
    }, {
      key: "setText",
      value: function setText(value) {
        this.text = value;
        return this;
      }
    }]);

    return NumberBar;
  }(Sizer);

  var ReplaceSliderConfig = function ReplaceSliderConfig(scene, sliderConfig, view, styles, customBuilders) {
    if (sliderConfig) {
      CreateChild(scene, sliderConfig, 'background', view, styles, customBuilders);
      CreateChild(scene, sliderConfig, 'track', view, styles, customBuilders);
      CreateChild(scene, sliderConfig, 'indicator', view, styles, customBuilders);
      CreateChild(scene, sliderConfig, 'thumb', view, styles, customBuilders);
    }

    return sliderConfig;
  };

  var CreateNumberBar = function CreateNumberBar(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'icon', view, styles, customBuilders);
    ReplaceSliderConfig(scene, data.slider, view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);
    var gameObject = new NumberBar(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetValue$i = Phaser.Utils.Objects.GetValue;

  var ScrollBar = /*#__PURE__*/function (_Sizer) {
    _inherits(ScrollBar, _Sizer);

    var _super = _createSuper(ScrollBar);

    function ScrollBar(scene, config) {
      var _this;

      _classCallCheck(this, ScrollBar);

      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexScrollBar'; // Add elements

      var background = GetValue$i(config, 'background', undefined);
      var buttonsConfig = GetValue$i(config, 'buttons', undefined);
      var button0 = GetValue$i(buttonsConfig, 'top', GetValue$i(buttonsConfig, 'left', undefined));
      var button1 = GetValue$i(buttonsConfig, 'bottom', GetValue$i(buttonsConfig, 'right', undefined));
      var slider,
          sliderConfig = GetValue$i(config, 'slider', undefined);

      if (background) {
        _this.addBackground(background);
      }

      if (button0) {
        _this.add(button0);

        var inTouching = new InTouching(button0);
        inTouching.on('intouch', function () {
          if (!this.enable) {
            return;
          }

          this.value -= this.scrollStep;
        }, _assertThisInitialized(_this));
      }

      if (sliderConfig) {
        sliderConfig.orientation = _this.orientation;
        sliderConfig.eventEmitter = _assertThisInitialized(_this);
        sliderConfig.value = null;
        var proportion;

        if (_this.orientation === 0) {
          var sliderWidth = GetValue$i(sliderConfig, 'width', undefined);
          proportion = sliderWidth === undefined ? 1 : 0;
        } else {
          var sliderHeight = GetValue$i(sliderConfig, 'height', undefined);
          proportion = sliderHeight === undefined ? 1 : 0;
        }

        slider = new Slider$1(scene, sliderConfig);
        scene.add.existing(slider);

        _this.add(slider, {
          proportion: proportion
        });
      }

      if (button1) {
        _this.add(button1);

        var inTouching = new InTouching(button1);
        inTouching.on('intouch', function () {
          if (!this.enable) {
            return;
          }

          this.value += this.scrollStep;
        }, _assertThisInitialized(_this));
      }

      var buttons = [button0, button1];

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('slider', slider);

      _this.addChildrenMap('buttons', buttons);

      var callback = GetValue$i(config, 'valuechangeCallback', null);

      if (callback !== null) {
        var scope = GetValue$i(config, 'valuechangeCallbackScope', undefined);

        _this.on('valuechange', callback, scope);
      }

      _this.setEnable(GetValue$i(config, 'enable', undefined));

      _this.setValue(GetValue$i(config, 'value', 0));

      _this.setScrollStep(GetValue$i(buttonsConfig, 'step', 0.01));

      return _this;
    }

    _createClass(ScrollBar, [{
      key: "setScrollStep",
      value: function setScrollStep(value) {
        this.scrollStep = value;
        return this;
      }
    }, {
      key: "enable",
      get: function get() {
        if (this.childrenMap.slider) {
          return this.childrenMap.slider.enable;
        } else {
          return false;
        }
      },
      set: function set(value) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.setEnable(value);
        }
      }
    }, {
      key: "setEnable",
      value: function setEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.enable = enable;
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        if (this.childrenMap.slider) {
          return this.childrenMap.slider.value;
        } else {
          return 0;
        }
      },
      set: function set(value) {
        if (!this.childrenMap.slider) {
          return;
        }

        this.childrenMap.slider.value = value;
      }
    }, {
      key: "setValue",
      value: function setValue(value, min, max) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.setValue(value, min, max);
        }

        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, min, max) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.addValue(inc, min, max);
        }

        return this;
      }
    }, {
      key: "getValue",
      value: function getValue(min, max) {
        if (this.childrenMap.slider) {
          return this.childrenMap.slider.getValue(min, max);
        } else {
          return 0;
        }
      }
    }, {
      key: "easeValueTo",
      value: function easeValueTo(value, min, max) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.easeValueTo(value, min, max);
        }

        return this;
      }
    }, {
      key: "stopEaseValue",
      value: function stopEaseValue() {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.stopEaseValue();
        }

        return this;
      }
    }, {
      key: "setEaseValueDuration",
      value: function setEaseValueDuration(duration) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.setEaseValueDuration(duration);
        }

        return this;
      }
    }, {
      key: "setEaseValueFunction",
      value: function setEaseValueFunction(ease) {
        if (this.childrenMap.slider) {
          this.childrenMap.slider.setEaseValueFunction(ease);
        }

        return this;
      }
    }]);

    return ScrollBar;
  }(Sizer);

  var CreateScrollBar = function CreateScrollBar(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    ReplaceSliderConfig(scene, data.slider, view, styles, customBuilders);
    var buttonsConfig = data.buttons;

    if (buttonsConfig) {
      CreateChild(scene, buttonsConfig, 'top', view, styles, customBuilders);
      CreateChild(scene, buttonsConfig, 'bottom', view, styles, customBuilders);
      CreateChild(scene, buttonsConfig, 'left', view, styles, customBuilders);
      CreateChild(scene, buttonsConfig, 'right', view, styles, customBuilders);
    }

    var gameObject = new ScrollBar(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var SCROLLMODE = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1
  };

  var GetValue$h = Phaser.Utils.Objects.GetValue;

  var GetScrollMode = function GetScrollMode(config, key) {
    var scrollMode = GetValue$h(config, 'scrollMode', 0); // Vertical

    if (typeof scrollMode === 'string') {
      scrollMode = SCROLLMODE[scrollMode];
    }

    return scrollMode;
  };

  var Slider = /*#__PURE__*/function (_Base) {
    _inherits(Slider, _Base);

    var _super = _createSuper(Slider);

    function Slider(scene, config) {
      var _this;

      _classCallCheck(this, Slider);

      if (config === undefined) {
        config = {};
      }

      var sliderConfig = Clone(config);
      config = {
        slider: sliderConfig
      }; // Move orientation parameter from sliderConfig to config

      config.orientation = sliderConfig.orientation;
      delete sliderConfig.orientation; // Move background parameter from sliderConfig to config

      config.background = sliderConfig.background;
      delete sliderConfig.background; // Move buttons parameter from sliderConfig to config

      config.buttons = sliderConfig.buttons;
      delete sliderConfig.buttons;
      _this = _super.call(this, scene, config);
      var slider = _this.childrenMap.slider;

      _this.addChildrenMap('track', slider.childrenMap.track);

      _this.addChildrenMap('indicator', slider.childrenMap.indicator);

      _this.addChildrenMap('thumb', slider.childrenMap.thumb);

      return _this;
    }

    return _createClass(Slider);
  }(ScrollBar);

  var State = /*#__PURE__*/function (_FSM) {
    _inherits(State, _FSM);

    var _super = _createSuper(State);

    function State(parent, config) {
      var _this;

      _classCallCheck(this, State);

      _this = _super.call(this, config);
      _this.parent = parent;

      _this.init();

      return _this;
    }

    _createClass(State, [{
      key: "init",
      value: function init() {
        this.start('IDLE');
      } // IDLE -> DRAGBEGIN|DRAG

    }, {
      key: "next_IDLE",
      value: function next_IDLE() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isDown) {
          nextState = parent.dragThreshold === 0 ? 'DRAG' : 'DRAGBEGIN';
        }

        return nextState;
      }
    }, {
      key: "update_IDLE",
      value: function update_IDLE(time, delta) {
        this.next();
      } // IDLE
      // DRAGBEGIN -> DRAG|IDLE

    }, {
      key: "next_DRAGBEGIN",
      value: function next_DRAGBEGIN() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isDown) {
          nextState = dragState.pointer.getDistance() >= parent.dragThreshold ? 'DRAG' : 'DRAGBEGIN';
        } else {
          // dragState.isUp
          nextState = 'IDLE';
        }

        return nextState;
      }
    }, {
      key: "update_DRAGBEGIN",
      value: function update_DRAGBEGIN(time, delta) {
        this.next();
      } // DRAGBEGIN
      // DRAG -> BACK|SLIDE|IDLE

    }, {
      key: "next_DRAG",
      value: function next_DRAG() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isUp) {
          if (parent.outOfBounds) {
            nextState = 'BACK';
          } else if (parent.slidingEnable) {
            nextState = 'SLIDE';
          } else {
            nextState = 'IDLE';
          }
        }

        return nextState;
      }
    }, {
      key: "update_DRAG",
      value: function update_DRAG(time, delta) {
        var parent = this.parent,
            dragState = parent.dragState;

        if (dragState.justMoved) {
          parent.dragging();
        }

        this.next();
      }
    }, {
      key: "enter_DRAG",
      value: function enter_DRAG() {
        this.parent.onDragStart();
      }
    }, {
      key: "exit_DRAG",
      value: function exit_DRAG() {
        this.parent.onDragEnd();
      } // DRAG    
      // SLIDE -> DRAG|IDLE

    }, {
      key: "next_SLIDE",
      value: function next_SLIDE() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isDown) {
          nextState = 'DRAG';
        } else if (!parent.isSliding) {
          nextState = 'IDLE';
        }

        return nextState;
      }
    }, {
      key: "enter_SLIDE",
      value: function enter_SLIDE() {
        this.parent.onSliding();
      }
    }, {
      key: "exit_SLIDE",
      value: function exit_SLIDE() {
        this.parent.stop();
      }
    }, {
      key: "update_SLIDE",
      value: function update_SLIDE(time, delta) {
        this.parent.sliding(time, delta);
        this.next();
      } // SLIDE    
      // BACK -> DRAG|IDLE

    }, {
      key: "next_BACK",
      value: function next_BACK() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isDown) {
          nextState = 'DRAG';
        } else if (!parent.isPullBack) {
          nextState = 'IDLE';
        }

        return nextState;
      }
    }, {
      key: "enter_BACK",
      value: function enter_BACK() {
        this.parent.onPullBack();
      }
    }, {
      key: "exit_BACK",
      value: function exit_BACK() {
        this.parent.stop();
      }
    }, {
      key: "update_BACK",
      value: function update_BACK(time, delta) {
        this.parent.pullBack(time, delta);
        this.next();
      } // BACK

    }]);

    return State;
  }(FSM);

  var GetValue$g = Phaser.Utils.Objects.GetValue;
  var DistanceBetween = Phaser.Math.Distance.Between;

  var DragSpeed = /*#__PURE__*/function (_ComponentBase) {
    _inherits(DragSpeed, _ComponentBase);

    var _super = _createSuper(DragSpeed);

    function DragSpeed(gameObject, config) {
      var _this;

      _classCallCheck(this, DragSpeed);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue$g(config, "inputConfig", undefined));

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(DragSpeed, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouched = false;
        this.holdStartTime = undefined;
        this.x = undefined;
        this.y = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.localX = undefined;
        this.localY = undefined;
        this.justMoved = false;
        this.setEnable(GetValue$g(o, 'enable', true));
        this.holdThreshold = GetValue$g(o, 'holdThreshold', 50); // ms

        this.pointerOutReleaseEnable = GetValue$g(o, 'pointerOutRelease', true);
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        // Drag start only when pointer down
        this.parent.on('pointerdown', this.onPointIn, this); // this.parent.on('pointerover', this.onPointIn, this);

        this.parent.on('pointerup', this.onPointOut, this);

        if (this.pointerOutReleaseEnable) {
          this.parent.on('pointerout', this.onPointOut, this);
        }

        this.parent.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.on('preupdate', this.preupdate, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);
        // this.parent.off('pointermove', this.onPointerMove, this);


        this.scene.sys.events.off('preupdate', this.preupdate, this);
        this.pointer = undefined;

        _get(_getPrototypeOf(DragSpeed.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }

        if (!e) {
          this.isInTouched = false;
          this.pointer = undefined;
        }

        this._enable = e;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setPointerOutReleaseEnable",
      value: function setPointerOutReleaseEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.pointerOutReleaseEnable = enable;
        return this;
      }
    }, {
      key: "isDown",
      get: function get() {
        return this.pointer && this.pointer.isDown;
      }
    }, {
      key: "isUp",
      get: function get() {
        return !this.isDown;
      }
    }, {
      key: "dx",
      get: function get() {
        return this.x - this.preX;
      }
    }, {
      key: "dy",
      get: function get() {
        return this.y - this.preY;
      }
    }, {
      key: "dt",
      get: function get() {
        var game = this.scene.sys.game;
        var delta = game.loop.delta;
        return delta;
      }
    }, {
      key: "speed",
      get: function get() {
        if (this.x === this.preX && this.y === this.preY) {
          return 0;
        }

        var d = DistanceBetween(this.preX, this.preY, this.x, this.y);
        var speed = d / (this.dt * 0.001);
        return speed;
      }
    }, {
      key: "speedX",
      get: function get() {
        return this.dx / (this.dt * 0.001);
      }
    }, {
      key: "speedY",
      get: function get() {
        return this.dy / (this.dt * 0.001);
      } // internal

    }, {
      key: "onPointIn",
      value: function onPointIn(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== undefined) {
          return;
        }

        this.pointer = pointer;
        this.localX = localX;
        this.localY = localY;
      }
    }, {
      key: "onPointOut",
      value: function onPointOut(pointer) {
        if (!this.enable || this.pointer !== pointer) {
          return;
        }

        this.pointer = undefined;
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== pointer) {
          return;
        }

        this.localX = localX;
        this.localY = localY;
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        if (!this.enable) {
          return;
        }

        var pointer = this.pointer;
        this.justMoved = false;

        if (pointer && !this.isInTouched) {
          // Touch start
          this.x = pointer.worldX;
          this.y = pointer.worldY;
          this.preX = pointer.worldX;
          this.preY = pointer.worldY;
          this.isInTouched = true;
          this.holdStartTime = undefined;
          this.emit('touchstart', pointer, this.localX, this.localY);
        } else if (pointer && this.isInTouched) {
          // In touch
          if (this.x === pointer.x && this.y === pointer.y) {
            // Hold
            if (this.holdStartTime === undefined) {
              this.holdStartTime = time;
            } else if (time - this.holdStartTime > this.holdThreshold) {
              this.preX = this.x;
              this.preY = this.y;
            }
          } else {
            // Move
            this.preX = this.x;
            this.preY = this.y;
            this.x = pointer.worldX;
            this.y = pointer.worldY;
            this.holdStartTime = undefined;
            this.justMoved = true;
            this.emit('touchmove', pointer, this.localX, this.localY);
          }
        } else if (!pointer && this.isInTouched) {
          // Touch end
          this.isInTouched = false;
          this.holdStartTime = undefined;
          this.emit('touchend', pointer);
        }
      }
    }]);

    return DragSpeed;
  }(ComponentBase);

  var GetValue$f = Phaser.Utils.Objects.GetValue;

  var Movement = /*#__PURE__*/function () {
    function Movement(config) {
      _classCallCheck(this, Movement);

      this.resetFromJSON(config);
    }

    _createClass(Movement, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setValue(GetValue$f(o, 'value', 0));
        this.setSpeed(GetValue$f(o, 'speed', 0));
        this.setAcceleration(GetValue$f(o, 'acceleration', 0));
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.setValue(0);
        this.setSpeed(0);
        this.setAcceleration(0);
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(speed) {
        // speed == 0 : stop
        // speed  > 0 : move
        this.speed = speed;
        return this;
      }
    }, {
      key: "setAcceleration",
      value: function setAcceleration(acc) {
        // acc == 0 : constant speed
        // acc  > 0 : acceleration
        // acc  < 0 : deceleration
        this.acceleration = acc;
        return this;
      }
    }, {
      key: "updateSpeed",
      value: function updateSpeed(delta) {
        // delta in sec
        if (this.acceleration !== 0) {
          this.speed += this.acceleration * delta;

          if (this.speed < 0) {
            this.speed = 0;
          }
        }

        return this;
      }
    }, {
      key: "getDeltaValue",
      value: function getDeltaValue(delta) {
        // delta in sec
        this.updateSpeed(delta);

        if (this.speed <= 0) {
          return 0;
        }

        return this.speed * delta;
      }
    }, {
      key: "update",
      value: function update(delta) {
        // delta in sec
        this.updateSpeed(delta);

        if (this.speed > 0) {
          this.value += this.getDeltaValue(delta);
        }

        return this;
      }
    }, {
      key: "isMoving",
      get: function get() {
        return this.speed > 0;
      }
    }]);

    return Movement;
  }();

  var SlowDown = /*#__PURE__*/function () {
    function SlowDown() {
      _classCallCheck(this, SlowDown);

      this.value;
      this.dir; // true:+, false:-

      this.movement = new Movement();
    }

    _createClass(SlowDown, [{
      key: "init",
      value: function init(start, dir, speed, dec, end) {
        this.value = start;
        this.end = end;

        if (end !== undefined) {
          this.dir = start < end;
        } else {
          this.dir = dir;
        }

        this.movement.setSpeed(speed).setAcceleration(-dec);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.movement.reset();
      }
    }, {
      key: "update",
      value: function update(delta) {
        // delta in sec
        var d = this.movement.getDeltaValue(delta);

        if (!this.dir) {
          d = -d;
        }

        if (this.end === undefined) {
          this.value += d;
        } else {
          if (d === 0) {
            this.value = this.end;
          } else {
            this.value += d;

            if (this.dir) {
              // +
              if (this.value > this.end) {
                this.value = this.end;
              }
            } else {
              // -
              if (this.value < this.end) {
                this.value = this.end;
              }
            }
          }
        }

        return this;
      }
    }, {
      key: "isMoving",
      get: function get() {
        return this.movement.isMoving;
      }
    }]);

    return SlowDown;
  }();

  var GetValue$e = Phaser.Utils.Objects.GetValue;
  var Clamp$2 = Phaser.Math.Clamp;

  var Scroller = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Scroller, _ComponentBase);

    var _super = _createSuper(Scroller);

    function Scroller(gameObject, config) {
      var _this;

      _classCallCheck(this, Scroller);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      var enable = GetValue$e(config, 'enable', true);
      _this._state = new State(_assertThisInitialized(_this), {
        enable: enable,
        eventEmitter: false
      });
      var drapSpeedConfig = {
        inputConfig: GetValue$e(config, 'inputConfig', undefined),
        enable: enable,
        pointerOutRelease: GetValue$e(config, 'pointerOutRelease', true),
        eventEmitter: false
      };
      _this.dragState = new DragSpeed(gameObject, drapSpeedConfig);
      _this._enable = undefined;
      _this._value = undefined;
      _this._slowDown = new SlowDown();
      var callback = GetValue$e(config, 'valuechangeCallback', null);

      if (callback !== null) {
        var scope = GetValue$e(config, 'valuechangeCallbackScope', undefined);

        _this.on('valuechange', callback, scope);
      }

      callback = GetValue$e(config, 'overmaxCallback', null);

      if (callback !== null) {
        var scope = GetValue$e(config, 'overmaxCallbackScope', undefined);

        _this.on('overmax', callback, scope);
      }

      callback = GetValue$e(config, 'overminCallback', null);

      if (callback !== null) {
        var scope = GetValue$e(config, 'overminCallbackScope', undefined);

        _this.on('overmin', callback, scope);
      }

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Scroller, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setOrientationMode(GetValue$e(o, 'orientation', 0));
        this.setDragThreshold(GetValue$e(o, 'threshold', 10));
        this.setSlidingDeceleration(GetValue$e(o, 'slidingDeceleration', 5000));
        this.setBackDeceleration(GetValue$e(o, 'backDeceleration', 2000));
        var bounds = GetValue$e(o, 'bounds', undefined);

        if (bounds) {
          this.setBounds(bounds);
        } else {
          this.setBounds(GetValue$e(o, 'max', 0), GetValue$e(o, 'min', 0));
        }

        this.setValue(GetValue$e(o, 'value', this.maxValue || 0));
        this.setEnable(GetValue$e(o, "enable", true));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.scene.sys.events.on('preupdate', this._state.update, this._state);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.scene.sys.events.off('preupdate', this._state.update, this._state);

        this._state.destroy(fromScene);

        this.dragState.destroy(fromScene);
        this._state = undefined;
        this.dragState = undefined;

        _get(_getPrototypeOf(Scroller.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }

        this._enable = e;

        this._state.setEnable(e);

        this.dragState.setEnable(e);
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setOrientationMode",
      value: function setOrientationMode(m) {
        if (typeof m === 'string') {
          m = ORIENTATIONMODE[m];
        }

        this.orientationMode = m;
        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setSlidingDeceleration",
      value: function setSlidingDeceleration(dec) {
        this.slidingDeceleration = dec;
        return this;
      }
    }, {
      key: "setBackDeceleration",
      value: function setBackDeceleration(dec) {
        this.backDeceleration = dec;
        return this;
      }
    }, {
      key: "setBounds",
      value: function setBounds(value0, value1) {
        if (Array.isArray(value0)) {
          var bounds = value0;
          value0 = bounds[0];
          value1 = bounds[1];
        }

        if (value0 < value1) {
          this.minValue = value0;
          this.maxValue = value1;
        } else {
          this.minValue = value1;
          this.maxValue = value0;
        }

        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (value === this._value) {
          return;
        }

        var oldValue = this._value;
        var isOverMax = this.overMax(value);
        var isOverMin = this.overMin(value);

        if (isOverMax) {
          this.emit('overmax', value, oldValue);
        }

        if (isOverMin) {
          this.emit('overmin', value, oldValue);
        }

        if (!this.backEnable) {
          if (isOverMax) {
            value = this.maxValue;
          }

          if (isOverMin) {
            value = this.minValue;
          }
        }

        this._value = value;
        this.emit('valuechange', value, oldValue);
      }
    }, {
      key: "setValue",
      value: function setValue(value, clamp) {
        if (clamp === undefined) {
          clamp = false;
        }

        if (clamp) {
          value = Clamp$2(value, this.minValue, this.maxValue);
        }

        this.value = value;
        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, clamp) {
        this.setValue(this.value + inc, clamp);
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this._state.state;
      }
    }, {
      key: "isDragging",
      get: function get() {
        return this.dragState.isInTouched;
      }
    }, {
      key: "outOfMaxBound",
      get: function get() {
        return this.overMax(this.value);
      }
    }, {
      key: "outOfMinBound",
      get: function get() {
        return this.overMin(this.value);
      }
    }, {
      key: "outOfBounds",
      get: function get() {
        return this.outOfMinBound || this.outOfMaxBound;
      } // internal

    }, {
      key: "overMax",
      value: function overMax(value) {
        return this.maxValue != null && value > this.maxValue;
      }
    }, {
      key: "overMin",
      value: function overMin(value) {
        return this.minValue != null && value < this.minValue;
      }
    }, {
      key: "backEnable",
      get: function get() {
        return typeof this.backDeceleration === 'number';
      }
    }, {
      key: "isPullBack",
      get: function get() {
        return this._slowDown.isMoving;
      }
    }, {
      key: "slidingEnable",
      get: function get() {
        return typeof this.slidingDeceleration === 'number';
      }
    }, {
      key: "isSliding",
      get: function get() {
        return this._slowDown.isMoving;
      }
    }, {
      key: "dragDelta",
      get: function get() {
        if (this.orientationMode === 0) {
          // y
          return this.dragState.dy;
        } else if (this.orientationMode === 1) {
          // x
          return this.dragState.dx;
        } else {
          return 0;
        }
      }
    }, {
      key: "dragSpeed",
      get: function get() {
        if (this.orientationMode === 0) {
          // y
          return this.dragState.speedY;
        } else if (this.orientationMode === 1) {
          // x
          return this.dragState.speedX;
        } else {
          return 0;
        }
      } // enter_DRAG

    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.emit('dragstart');
      } // exit_DRAG

    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.emit('dragend');
      } // everyTick_DRAG

    }, {
      key: "dragging",
      value: function dragging() {
        this.value += this.dragDelta;
      } // enter_SLIDE 

    }, {
      key: "onSliding",
      value: function onSliding() {
        var start = this.value;
        var speed = this.dragSpeed;

        if (speed === 0) {
          this._slowDown.stop();

          this._state.next();

          return;
        }

        var dec = this.slidingDeceleration;

        this._slowDown.init(start, speed > 0, Math.abs(speed), dec);
      } // everyTick_SLIDE

    }, {
      key: "sliding",
      value: function sliding(time, delta) {
        delta *= 0.001;

        var newValue = this._slowDown.update(delta).value;

        if (this.overMax(newValue)) {
          this.value = this.maxValue;

          this._slowDown.stop();
        } else if (this.overMin(newValue)) {
          this.value = this.minValue;

          this._slowDown.stop();
        } else {
          this.value = newValue;
        }
      } // enter_BACK

    }, {
      key: "onPullBack",
      value: function onPullBack() {
        var start = this.value;
        var end = this.outOfMinBound ? this.minValue : this.maxValue;
        var dist = Math.abs(end - start);
        var dec = this.backDeceleration;
        var speed = Math.sqrt(2 * dec * dist);

        this._slowDown.init(start, undefined, speed, dec, end);
      } // everyTick_BACK

    }, {
      key: "pullBack",
      value: function pullBack(time, delta) {
        delta *= 0.001;
        this.value = this._slowDown.update(delta).value;

        if (!this._slowDown.isMoving) {
          this._state.next();
        }
      } // exit_SLIDE, exit_BACK

    }, {
      key: "stop",
      value: function stop() {
        this._slowDown.stop();
      }
    }]);

    return Scroller;
  }(ComponentBase);

  var ORIENTATIONMODE = {
    y: 0,
    v: 0,
    vertical: 0,
    x: 1,
    h: 1,
    horizontal: 1
  };

  var GetValue$d = Phaser.Utils.Objects.GetValue;

  var MouseWheelScroller = /*#__PURE__*/function (_ComponentBase) {
    _inherits(MouseWheelScroller, _ComponentBase);

    var _super = _createSuper(MouseWheelScroller);

    function MouseWheelScroller(gameObject, config) {
      var _this;

      _classCallCheck(this, MouseWheelScroller);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      if (_this.parent !== _this.scene) {
        _this.focusMode = GetValue$d(config, 'focus', false);
      } else {
        _this.focusMode = false;
      }

      _this.setSpeed(GetValue$d(config, 'speed', 0.1));

      _this.setEnable(GetValue$d(config, 'enable', true));

      if (!_this.focusMode) {
        // Register on scene
        _this.scene.input.on('wheel', _this.onSceneScroll, _assertThisInitialized(_this));
      } else {
        var gameObject = _this.parent;
        gameObject.setInteractive(GetValue$d(config, "inputConfig", undefined)).on('wheel', function (pointer, dx, dy, dz, event) {
          if (!this.enable) {
            return;
          }

          this.scroll(dy);
        }, _assertThisInitialized(_this));
      }

      return _this;
    }

    _createClass(MouseWheelScroller, [{
      key: "destroy",
      value: function destroy() {
        if (!this.focusMode) {
          this.scene.input.off('wheel', this.onSceneScroll, this);
        }
      }
    }, {
      key: "onSceneScroll",
      value: function onSceneScroll(pointer, currentlyOver, dx, dy, dz, event) {
        if (!this.enable) {
          return;
        }

        this.scroll(dy);
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "scroll",
      value: function scroll(dy) {
        dy *= this.speed;
        this.emit('scroll', dy, this.parent, this);
      }
    }]);

    return MouseWheelScroller;
  }(ComponentBase);

  var GetValue$c = Phaser.Utils.Objects.GetValue;

  var CreateScrollableSizer = function CreateScrollableSizer(parent, config) {
    var scene = parent.scene;
    var scrollMode = GetScrollMode(config);
    var scrollableSizer = new Sizer(scene, {
      orientation: scrollMode
    }); // A child which not put into scene

    var child = GetValue$c(config, 'child.gameObject', undefined),
        childPadding = 0;
    var sliderConfig = GetValue$c(config, 'slider', undefined),
        slider,
        sliderPadding = 0;
    var sliderPosition = GetValue$c(sliderConfig, 'position', 0);

    if (typeof sliderPosition === 'string') {
      sliderPosition = SLIDER_POSITION_MAP[sliderPosition];
    }

    var isRightSlider = sliderPosition === 0; // Right/bottom slider

    var scrollerConfig = GetValue$c(config, 'scroller', true),
        scroller;
    var mouseWheelScrollerConfig = GetValue$c(config, 'mouseWheelScroller', false),
        mouseWheelScroller; // Child, slider, scroller, mouseWheelScroller

    if (child) {
      var childSpace = GetValue$c(config, 'space.child', 0);
      parent.childMargin = {};

      if (typeof childSpace !== 'number') {
        var paddingConfig = childSpace;

        if (scrollMode === 0) {
          childPadding = {
            left: GetValue$c(paddingConfig, 'left', 0),
            right: GetValue$c(paddingConfig, 'right', 0)
          };
          parent.childMargin.top = GetValue$c(paddingConfig, 'top', 0);
          parent.childMargin.bottom = GetValue$c(paddingConfig, 'bottom', 0);
        } else {
          childPadding = {
            top: GetValue$c(paddingConfig, 'top', 0),
            bottom: GetValue$c(paddingConfig, 'bottom', 0)
          };
          parent.childMargin.top = GetValue$c(paddingConfig, 'left', 0);
          parent.childMargin.bottom = GetValue$c(paddingConfig, 'right', 0);
        }
      } else {
        if (sliderConfig) {
          // Has slider
          if (scrollMode === 0) {
            childPadding = isRightSlider ? {
              right: childSpace
            } : {
              left: childSpace
            };
          } else {
            childPadding = isRightSlider ? {
              bottom: childSpace
            } : {
              top: childSpace
            };
          }
        }

        parent.childMargin.top = 0;
        parent.childMargin.bottom = 0;
      }

      if (sliderConfig) {
        if (sliderConfig === true) {
          sliderConfig = {};
        } // Vertical slider(orientation=1) for left-right scrollableSizer(orientation=0)
        // Horizontal slider(orientation=0) for top-bottom scrollableSizer(orientation=1)


        sliderConfig.orientation = scrollableSizer.orientation === 0 ? 1 : 0;
        slider = new Slider(scene, sliderConfig);
        sliderPadding = GetValue$c(config, 'space.slider', 0);
        parent.adaptThumbSizeMode = GetValue$c(sliderConfig, 'adaptThumbSize', false);
        parent.minThumbSize = GetValue$c(sliderConfig, 'minThumbSize', undefined);
      } else {
        parent.adaptThumbSizeMode = false;
        parent.minThumbSize = undefined;
      }

      if (scrollerConfig) {
        if (scrollerConfig === true) {
          scrollerConfig = {};
        }

        scrollerConfig.orientation = scrollMode;
        scroller = new Scroller(child, scrollerConfig);
      }

      if (mouseWheelScrollerConfig) {
        mouseWheelScroller = new MouseWheelScroller(child, mouseWheelScrollerConfig);
      } // Add slider to parent sizer at left/top side


      if (slider && !isRightSlider) {
        scrollableSizer.add(slider, {
          proportion: 0,
          align: 'center',
          padding: sliderPadding,
          expand: true
        });
      } // Add child to parent sizer


      var proportion = GetValue$c(config, 'child.proportion', 1);
      var expand = GetValue$c(config, 'child.expand', true);
      scrollableSizer.add(child, {
        proportion: proportion,
        align: 'center',
        padding: childPadding,
        expand: expand
      }); // Add slider to parent sizer at right/bottom side

      if (slider && isRightSlider) {
        scrollableSizer.add(slider, {
          proportion: 0,
          align: 'center',
          padding: sliderPadding,
          expand: true
        });
      }
    } // Control


    if (slider) {
      slider.on('valuechange', function (newValue) {
        parent.t = newValue;
        parent.emit('scroll', parent);
      });
    }

    if (scroller) {
      scroller.on('valuechange', function (newValue) {
        parent.childOY = newValue;
        parent.emit('scroll', parent);
      });
    }

    if (mouseWheelScroller) {
      mouseWheelScroller.on('scroll', function (incValue) {
        parent.addChildOY(-incValue, true);
      });
    }

    parent.addChildrenMap('child', child);
    parent.addChildrenMap('slider', slider);
    parent.addChildrenMap('scroller', scroller);
    parent.addChildrenMap('mouseWheelScroller', mouseWheelScroller);
    return scrollableSizer;
  };

  var SLIDER_POSITION_MAP = {
    right: 0,
    left: 1,
    bottom: 0,
    top: 1
  };

  Sizer.prototype.runLayout;

  var ResizeController = function ResizeController() {
    var topChildOY = this.topChildOY;
    var bottomChildOY = this.bottomChildOY;
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;

    if (scroller) {
      scroller.setBounds(bottomChildOY, topChildOY);
    }

    if (slider) {
      slider.setEnable(bottomChildOY !== topChildOY);
    }

    this.updateController();

    if (this.adaptThumbSizeMode) {
      AdaptThumbSize.call(this);
    }

    return this;
  };

  var AdaptThumbSize = function AdaptThumbSize() {
    // Change slider size according to visible ratio
    var ratio = Math.min(this.childVisibleHeight / this.childHeight, 1);
    var slider = this.childrenMap.slider;
    var track = slider.childrenMap.track;
    var thumb = slider.childrenMap.thumb;
    var minThumbSize = this.minThumbSize;

    if (this.scrollMode === 0) {
      var newHeight = track.displayHeight * ratio;

      if (minThumbSize !== undefined && newHeight < minThumbSize) {
        newHeight = minThumbSize;
      }

      ResizeGameObject(thumb, undefined, newHeight);
    } else {
      var newWidth = track.displayWidth * ratio;

      if (minThumbSize !== undefined && newWidth < minThumbSize) {
        newWidth = minThumbSize;
      }

      ResizeGameObject(thumb, newWidth, undefined);
    }

    LayoutSlider.call(this);
  };

  var LayoutSlider = function LayoutSlider() {
    var slider = this.childrenMap.slider; // Save minSize

    var minWidthSave = slider.minWidth;
    var minHeightSave = slider.minHeight; // Set minSize to current size

    slider.minWidth = slider.width;
    slider.minHeight = slider.height; // Layout slider

    slider.layout(); // Restore minSize

    slider.minWidth = minWidthSave;
    slider.minHeight = minHeightSave;
  };

  var UpdateController = function UpdateController() {
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;

    if (scroller) {
      scroller.setValue(this.childOY);
    }

    if (slider) {
      slider.setValue(this.t);
    }
  };

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var Clamp$1 = Phaser.Math.Clamp;

  var Scrollable = /*#__PURE__*/function (_Sizer) {
    _inherits(Scrollable, _Sizer);

    var _super = _createSuper(Scrollable);

    function Scrollable(scene, config) {
      var _this;

      _classCallCheck(this, Scrollable);

      if (config === undefined) {
        config = {};
      }

      var scrollMode = GetScrollMode(config); // Left-to-right, or top-to-bottom
      // Create sizer

      config.orientation = scrollMode === 0 ? 1 : 0;
      _this = _super.call(this, scene, config);
      _this.type = GetValue$b(config, 'type', 'rexScrollable'); // Add elements

      var background = GetValue$b(config, 'background', undefined);
      var scrollableSizer = CreateScrollableSizer(_assertThisInitialized(_this), config);
      var header = GetValue$b(config, 'header', undefined);
      var footer = GetValue$b(config, 'footer', undefined); // Background

      if (background) {
        _this.addBackground(background);
      }

      if (header) {
        var align = GetValue$b(config, 'align.header', 'center');
        var headerSpace = GetValue$b(config, 'space.header', 0);
        var padding;

        if (scrollMode === 0) {
          padding = {
            bottom: headerSpace
          };
        } else {
          padding = {
            right: headerSpace
          };
        }

        var expand = GetValue$b(config, 'expand.header', true);

        _this.add(header, {
          proportion: 0,
          align: align,
          padding: padding,
          expand: expand
        });
      }

      if (scrollableSizer) {
        _this.add(scrollableSizer, {
          proportion: 1,
          align: 'center',
          padding: 0,
          expand: true
        });
      }

      if (footer) {
        var align = GetValue$b(config, 'align.footer', 'center');
        var footerSpace = GetValue$b(config, 'space.footer', 0);
        var padding;

        if (scrollMode === 0) {
          padding = {
            top: footerSpace
          };
        } else {
          padding = {
            left: footerSpace
          };
        }

        var expand = GetValue$b(config, 'expand.footer', true);

        _this.add(footer, {
          proportion: 0,
          align: align,
          padding: padding,
          expand: expand
        });
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('header', header);

      _this.addChildrenMap('footer', footer);

      _this.runLayoutFlag = false;
      /* Necessary properties of child object
      - child.t (RW), 
      - child.childOY (RW)
      - child.topChildOY (R)
      - child.bottomChildOY (R)
      - child.childVisibleHeight (R)
      - child.childHeight (R)
      */

      return _this;
    }

    _createClass(Scrollable, [{
      key: "runLayout",
      value: function runLayout(parent, newWidth, newHeight) {
        // Skip hidden or !dirty sizer
        if (this.ignoreLayout) {
          return this;
        }

        _get(_getPrototypeOf(Scrollable.prototype), "runLayout", this).call(this, parent, newWidth, newHeight);

        this.resizeController(); // Set `t` to 0 at first runLayout()

        if (!this.runLayoutFlag) {
          this.runLayoutFlag = true;
          this.setT(0);
        }

        return this;
      }
    }, {
      key: "t",
      get: function get() {
        var t = this.childrenMap.child.t; // Get outer childT

        var childMargin = this.childMargin;

        if (childMargin.top !== 0 || childMargin.bottom !== 0) {
          var child = this.childrenMap.child;
          var innerHeight = child.topChildOY - child.bottomChildOY;
          var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
          var outerChildOY = innerHeight * t + childMargin.top;
          t = outerChildOY / outerHeight;
        }

        return t;
      },
      set: function set(t) {
        // Get inner childT
        var childMargin = this.childMargin;

        if (childMargin.top !== 0 || childMargin.bottom !== 0) {
          var child = this.childrenMap.child;
          var innerHeight = child.topChildOY - child.bottomChildOY;
          var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
          var innerChildOY = outerHeight * t - childMargin.top;
          t = innerChildOY / innerHeight;
        }

        this.childrenMap.child.t = t;
        this.updateController();
      }
    }, {
      key: "childOY",
      get: function get() {
        return this.childrenMap.child.childOY;
      },
      set: function set(value) {
        this.childrenMap.child.childOY = value;
        this.updateController();
      }
    }, {
      key: "topChildOY",
      get: function get() {
        return this.childrenMap.child.topChildOY + this.childMargin.top;
      }
    }, {
      key: "bottomChildOY",
      get: function get() {
        return this.childrenMap.child.bottomChildOY - this.childMargin.bottom;
      }
    }, {
      key: "childVisibleHeight",
      get: function get() {
        return this.childrenMap.child.childVisibleHeight;
      }
    }, {
      key: "childHeight",
      get: function get() {
        return this.childrenMap.child.childHeight;
      }
    }, {
      key: "isOverflow",
      get: function get() {
        var child = this.childrenMap.child;
        return child.topChildOY !== child.bottomChildOY;
      }
    }, {
      key: "scrollMode",
      get: function get() {
        return this.orientation === 0 ? 1 : 0;
      }
    }, {
      key: "setChildOY",
      value: function setChildOY(value, clamp) {
        if (clamp === undefined) {
          clamp = false;
        }

        if (clamp) {
          value = Clamp$1(value, this.bottomChildOY, this.topChildOY);
        }

        this.childOY = value;
        return this;
      }
    }, {
      key: "addChildOY",
      value: function addChildOY(inc, clamp) {
        this.setChildOY(this.childOY + inc, clamp);
        return this;
      }
    }, {
      key: "setT",
      value: function setT(value, clamp) {
        if (clamp === undefined) {
          clamp = false;
        }

        if (clamp) {
          value = Clamp$1(value, 0, 1);
        }

        this.t = value;
        return this;
      }
    }, {
      key: "addT",
      value: function addT(inc, clamp) {
        this.setT(this.t + inc, clamp);
        return this;
      }
    }, {
      key: "scrollToTop",
      value: function scrollToTop() {
        this.t = 0;
        return this;
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom() {
        this.t = 1;
        return this;
      }
    }, {
      key: "sliderEnable",
      get: function get() {
        var slider = this.childrenMap.slider;

        if (!slider) {
          return false;
        }

        return slider.enable;
      },
      set: function set(value) {
        var slider = this.childrenMap.slider;

        if (!slider) {
          return;
        }

        slider.setEnable(value);
      }
    }, {
      key: "setSliderEnable",
      value: function setSliderEnable(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }

        this.sliderEnable = enabled;
        return this;
      }
    }, {
      key: "scrollerEnable",
      get: function get() {
        var scroller = this.childrenMap.scroller;

        if (!scroller) {
          return false;
        }

        return scroller.enable;
      },
      set: function set(value) {
        var scroller = this.childrenMap.scroller;

        if (!scroller) {
          return;
        }

        scroller.setEnable(value);
      }
    }, {
      key: "setScrollerEnable",
      value: function setScrollerEnable(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }

        this.scrollerEnable = enabled;
        return this;
      }
    }, {
      key: "mouseWheelScrollerEnable",
      get: function get() {
        var mouseWheelScroller = this.childrenMap.mouseWheelScroller;

        if (!mouseWheelScroller) {
          return false;
        }

        return mouseWheelScroller.enable;
      },
      set: function set(value) {
        var mouseWheelScroller = this.childrenMap.mouseWheelScrollerEnable;

        if (!mouseWheelScroller) {
          return;
        }

        mouseWheelScroller.setEnable(value);
      }
    }, {
      key: "setMouseWheelScrollerEnable",
      value: function setMouseWheelScrollerEnable(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }

        this.mouseWheelScrollerEnable = enabled;
        return this;
      }
    }, {
      key: "setDropZoneEnable",
      value: function setDropZoneEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        var child = this.childrenMap.child;
        child.setInteractive();
        child.input.dropZone = enable;
        return this;
      }
    }]);

    return Scrollable;
  }(Sizer);

  var Methods$2 = {
    resizeController: ResizeController,
    updateController: UpdateController
  }; // mixin

  Object.assign(Scrollable.prototype, Methods$2);

  var SetText$1 = function SetText(text) {
    if (text !== undefined) {
      this.text = text;
    } // Wrap content in lines


    this.lines = TextToLines(this.textObject, this.text, this.lines); // Get lines count

    this.linesCount = this.lines.length; // Re-calculate these values later

    this._textHeight = undefined;
    this._textVisibleHeight = undefined;
    this.updateTextObject();
    return this;
  };

  var TextHeightToLinesCount = function TextHeightToLinesCount(height) {
    // height = (lines * (lineHeight + lineSpacing)) - lineSpacing
    return (height - this.textLineSpacing) / (this.textLineHeight + this.textLineSpacing);
  };

  var LinesCountToTextHeight = function LinesCountToTextHeight(linesCount) {
    // height = (linesCount * (lineHeight + lineSpacing)) - lineSpacing
    return linesCount * (this.textLineHeight + this.textLineSpacing) - this.textLineSpacing;
  };

  var GetLines = function GetLines(startLineIdx) {
    var endLineIdx = startLineIdx + this.visibleLinesCount + 1;
    var text;

    switch (this.textObjectType) {
      case TextType:
        text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
        break;

      case TagTextType:
        var startIdx = this.lines.getLineStartIndex(startLineIdx);
        var endIdx = this.lines.getLineEndIndex(endLineIdx - 1);
        text = this.lines.getSliceTagText(startIdx, endIdx, true);
        break;

      case BitmapTextType:
        text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
        break;
    }

    return text;
  };

  var ResetTextObjectPosition = function ResetTextObjectPosition() {
    var config = this.textObject.rexSizer;
    this.textObject.y += config.offsetY - config.preOffsetY;
    config.preOffsetY = config.offsetY;
    this.resetChildPositionState(this.textObject);

    if (this.textCropEnable) {
      CropTextObject.call(this);
    }
  };

  var CropTextObject = function CropTextObject() {
    // Don't have setCrop method, return
    if (!this.textObject.setCrop) {
      return;
    }

    var offsetY = this.textObject.rexSizer.offsetY;
    var cropY, cropHeight;

    if (offsetY <= 0) {
      cropY = -offsetY;
      cropHeight = this.height;
    } else {
      cropY = 0;
      cropHeight = this.height - offsetY;
    }

    this.textObject.setCrop(0, cropY, this.width, cropHeight);
  };

  var UpdateTextObject = function UpdateTextObject() {
    var startLineIndex = Math.max(Math.floor(TextHeightToLinesCount.call(this, -this.textOY)), 0);
    var textOffset = LinesCountToTextHeight.call(this, startLineIndex) + this.textOY; // Grab visible lines

    var text = GetLines.call(this, startLineIndex); // Display visible content

    SetNoWrapText(this.textObject, text);
    this.textObject.rexSizer.offsetY = textOffset;
    ResetTextObjectPosition.call(this);
    return this;
  };

  var PreLayout = function PreLayout() {
    // Style of text
    this._textLineHeight = undefined;
    this._textLineSpacing = undefined; // Style of text, width of text

    this._visibleLinesCount = undefined; // Style of text, total lines of content

    this._textHeight = undefined;
    this._textVisibleHeight = undefined;
    PreLayout$4.call(this);
    return this;
  };

  var ResizeText = function ResizeText(textObject, width, height) {
    height += this.textLineHeight + this.textLineSpacing; // Add 1 line

    if (this.textObjectWidth === width && this._textObjectRealHeight === height) {
      return;
    }

    this.textObjectWidth = width;
    this._textObjectRealHeight = height;

    switch (this.textObjectType) {
      case TextType:
      case TagTextType:
        textObject.setFixedSize(width, height);
        var style = textObject.style;
        var wrapWidth = Math.max(width, 0);

        if (this.textObjectType === TextType) {
          // Built-in text
          style.wordWrapWidth = wrapWidth;
        } else {
          // BBCode text, Tag text
          if (style.wrapMode === 0) {
            // Turn no-wrap to word-wrap
            style.wrapMode = 1;
          }

          style.wrapWidth = wrapWidth;
        }

        break;

      case BitmapTextType:
        textObject.setMaxWidth(width);
        break;
    } // Render content again


    this.setText();
  };

  var LayoutChildren = function LayoutChildren() {
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var x, y, width, height; // Align zone
    // LayoutChildren text child
    // Skip invisible child

    child = this.textObject;

    if (!child.rexSizer.hidden) {
      childConfig = child.rexSizer;
      padding = childConfig.padding;
      x = startX + padding.left;
      y = startY + padding.top;
      width = this.width - padding.left - padding.right;
      height = this.height - padding.top - padding.bottom;
      ResizeText.call(this, child, width, height);
      AlignIn(child, x, y, width, height, childConfig.align);
      childConfig.preOffsetY = 0; // Clear preOffsetY

      ResetTextObjectPosition.call(this);

      if (this.textMask) {
        this.textMask.setPosition().resize();
        this.resetChildPositionState(this.textMask);
      }
    }
  };

  var Methods$1 = {
    setText: SetText$1,
    updateTextObject: UpdateTextObject,
    preLayout: PreLayout,
    layoutChildren: LayoutChildren
  };

  var IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

  var TextBlock = /*#__PURE__*/function (_BaseSizer) {
    _inherits(TextBlock, _BaseSizer);

    var _super = _createSuper(TextBlock);

    function TextBlock(scene, x, y, minWidth, minHeight, config) {
      var _this;

      _classCallCheck(this, TextBlock);

      if (IsPlainObject$2(x)) {
        config = x;
        x = GetValue$a(config, 'x', 0);
        y = GetValue$a(config, 'y', 0);
        minWidth = GetValue$a(config, 'width', undefined);
        minHeight = GetValue$a(config, 'height', undefined);
      } else if (IsPlainObject$2(minWidth)) {
        config = minWidth;
        minWidth = GetValue$a(config, 'width', undefined);
        minHeight = GetValue$a(config, 'height', undefined);
      }

      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexTextBlock';
      _this.textObject = undefined;
      _this.linesCount = 0;
      _this.textMask = undefined;
      _this.textObjectType = undefined;
      _this._textLineHeight = undefined;
      _this._textLineSpacing = undefined;
      _this._visibleLinesCount = undefined;
      _this._textHeight = undefined;
      _this._textVisibleHeight = undefined;
      _this.lines = undefined; // Text object : array of string
      // Tag text object : pens-manager
      // Bitmap text object : array of string

      _this.text = GetValue$a(config, 'content', '');
      _this._textOY = 0;
      _this.execeedTopState = false;
      _this.execeedBottomState = false;

      _this.setClampMode(GetValue$a(config, 'clamplTextOY', true));

      _this.alwaysScrollable = GetValue$a(config, 'alwaysScrollable', false); // Add elements

      var background = GetValue$a(config, 'background', undefined);
      var textObject = GetValue$a(config, 'text', undefined);

      if (textObject === undefined) {
        textObject = CreateDefaultTextObject(scene);
      }

      _this.textCropEnable = GetValue$a(config, 'textCrop', !!textObject.setCrop);
      var textMaskEnable = GetValue$a(config, 'textMask', !_this.textCropEnable);

      if (background) {
        _this.addBackground(background);
      }

      _this.add(textObject);

      _this.sizerChildren = [textObject];

      var sizerConfig = _this.getSizerConfig(textObject);

      sizerConfig.align = ALIGN_LEFTTOP;
      sizerConfig.padding = GetBoundsConfig(0);
      sizerConfig.expand = true;
      _this.textObject = textObject;
      _this.textObjectType = GetTextObjectType(textObject); // Add more variables

      sizerConfig.preOffsetY = 0;
      sizerConfig.offsetY = 0; // Create mask of text object

      if (textMaskEnable) {
        _this.textMask = AddChildMask.call(_assertThisInitialized(_this), _this.textObject, _assertThisInitialized(_this));
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('text', textObject);

      return _this;
    }

    _createClass(TextBlock, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        this.textObject = undefined;
        this.textMask = undefined;

        if (this.lines) {
          switch (this.textObjectType) {
            case TextType:
              this.lines.length = 0;
              break;

            case TagTextType:
              this.lines.destroy();
              break;

            case BitmapTextType:
              this.lines.length = 0;
              break;
          }

          this.lines = undefined;
        }

        _get(_getPrototypeOf(TextBlock.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "setClampMode",
      value: function setClampMode(mode) {
        if (mode === undefined) {
          mode = true;
        }

        this.clampTextOY = mode;
        return this;
      }
    }, {
      key: "textLineHeight",
      get: function get() {
        if (this._textLineHeight === undefined) {
          var lineHeight;

          switch (this.textObjectType) {
            case TextType:
            case TagTextType:
              var style = this.textObject.style;
              lineHeight = style.metrics.fontSize + style.strokeThickness;
              break;

            case BitmapTextType:
              var scale = this.textObject.fontSize / this.textObject.fontData.size;
              lineHeight = this.textObject.fontData.lineHeight * scale;
              break;
          }

          this._textLineHeight = lineHeight;
        }

        return this._textLineHeight;
      }
    }, {
      key: "textLineSpacing",
      get: function get() {
        if (this._textLineSpacing === undefined) {
          var lineSpacing;

          switch (this.textObjectType) {
            case TextType:
            case TagTextType:
              lineSpacing = this.textObject.lineSpacing;
              break;

            case BitmapTextType:
              lineSpacing = 0;
              break;
          }

          this._textLineSpacing = lineSpacing;
        }

        return this._textLineSpacing;
      }
    }, {
      key: "visibleLinesCount",
      get: function get() {
        if (this._visibleLinesCount === undefined) {
          this._visibleLinesCount = Math.floor(TextHeightToLinesCount.call(this, this._textObjectRealHeight));
        }

        return this._visibleLinesCount;
      }
    }, {
      key: "topTextOY",
      get: function get() {
        return 0;
      }
    }, {
      key: "bottomTextOY",
      get: function get() {
        return -this.textVisibleHeight;
      }
    }, {
      key: "textHeight",
      get: function get() {
        if (this._textHeight === undefined) {
          this._textHeight = LinesCountToTextHeight.call(this, this.linesCount);
        }

        return this._textHeight;
      }
    }, {
      key: "textObjectHeight",
      get: function get() {
        return this._textObjectRealHeight - (this.textLineHeight + this.textLineSpacing); // Remove 1 text line
      }
    }, {
      key: "textVisibleHeight",
      get: function get() {
        if (this._textVisibleHeight === undefined) {
          var h = this.textHeight - this.textObjectHeight;

          if (!this.alwaysScrollable && h < 0) {
            h = 0;
          }

          this._textVisibleHeight = h;
        }

        return this._textVisibleHeight;
      }
    }, {
      key: "textOYExceedTop",
      value: function textOYExceedTop(oy) {
        if (oy === undefined) {
          oy = this.textOY;
        }

        return oy > this.topTextOY;
      }
    }, {
      key: "textOYExeceedBottom",
      value: function textOYExeceedBottom(oy) {
        if (oy === undefined) {
          oy = this.textOY;
        }

        return oy < this.bottomTextOY;
      }
    }, {
      key: "textOY",
      get: function get() {
        return this._textOY;
      },
      set: function set(oy) {
        var topTextOY = this.topTextOY;
        var bottomTextOY = this.bottomTextOY;
        var textOYExceedTop = this.textOYExceedTop(oy);
        var textOYExeceedBottom = this.textOYExeceedBottom(oy);

        if (this.clampTextOY) {
          if (this.visibleLinesCount > this.linesCount) {
            oy = 0;
          } else if (textOYExceedTop) {
            oy = topTextOY;
          } else if (textOYExeceedBottom) {
            oy = bottomTextOY;
          }
        }

        if (this._textOY !== oy) {
          this._textOY = oy;
          this.updateTextObject();
        }

        if (textOYExceedTop) {
          if (!this.execeedTopState) {
            this.emit('execeedtop', this, oy, topTextOY);
          }
        }

        this.execeedTopState = textOYExceedTop;

        if (textOYExeceedBottom) {
          if (!this.execeedBottomState) {
            this.emit('execeedbottom', this, oy, bottomTextOY);
          }
        }

        this.execeedBottomState = textOYExeceedBottom;
      }
    }, {
      key: "setTextOY",
      value: function setTextOY(oy) {
        this.textOY = oy;
        return this;
      }
    }, {
      key: "t",
      get: function get() {
        var textVisibleHeight = this.textVisibleHeight;

        if (textVisibleHeight === 0) {
          return 0;
        }

        return this.textOY / -textVisibleHeight;
      },
      set: function set(value) {
        this.textOY = -this.textVisibleHeight * value;
      }
    }, {
      key: "setTextOYByPercentage",
      value: function setTextOYByPercentage(percentage) {
        this.t = percentage;
        return this;
      }
    }]);

    return TextBlock;
  }(Base);

  var CreateDefaultTextObject = function CreateDefaultTextObject(scene) {
    return scene.add.text(0, 0, '');
  };

  Object.assign(TextBlock.prototype, Methods$1);

  var InjectProperties = function InjectProperties(textBlock) {
    Object.defineProperty(textBlock, 'childOY', {
      configurable: true,
      get: function get() {
        return textBlock.textOY;
      },
      set: function set(value) {
        textBlock.textOY = value;
      }
    });
    Object.defineProperty(textBlock, 'topChildOY', {
      get: function get() {
        return textBlock.topTextOY;
      }
    });
    Object.defineProperty(textBlock, 'bottomChildOY', {
      get: function get() {
        return textBlock.bottomTextOY;
      }
    });
    Object.defineProperty(textBlock, 'childVisibleHeight', {
      get: function get() {
        return textBlock.textObjectHeight;
      }
    });
    Object.defineProperty(textBlock, 'childHeight', {
      get: function get() {
        return textBlock.textHeight;
      }
    });
  };

  var SetText = function SetText(text) {
    var textBlock = this.childrenMap.child;
    textBlock.setText(text);
    this.resizeController();
    return this;
  };

  var AppendText = function AppendText(text) {
    this.setText(this.text + text);
    return this;
  };

  var GetValue$9 = Phaser.Utils.Objects.GetValue;

  var TextArea = /*#__PURE__*/function (_Scrollable) {
    _inherits(TextArea, _Scrollable);

    var _super = _createSuper(TextArea);

    function TextArea(scene, config) {
      var _this;

      _classCallCheck(this, TextArea);

      if (config === undefined) {
        config = {};
      } // Create text-block


      var textObject = GetValue$9(config, 'text', undefined);
      var textWidth = GetValue$9(config, 'textWidth', undefined);
      var textHeight = GetValue$9(config, 'textHeight', undefined);
      var textCrop = GetValue$9(config, 'textCrop', !!textObject.setCrop);
      var textMask = GetValue$9(config, 'textMask', !textCrop);
      var content = GetValue$9(config, 'content', '');
      var textBlock = new TextBlock(scene, {
        width: textWidth,
        height: textHeight,
        text: textObject,
        textMask: textMask,
        textCrop: textCrop && !textMask,
        content: content,
        clamplTextOY: GetValue$9(config, 'clamplChildOY', false),
        alwaysScrollable: GetValue$9(config, 'alwaysScrollable', false)
      });
      scene.add.existing(textBlock); // Important: Add to display list for touch detecting

      var proportion = textWidth === undefined ? 1 : 0;
      var expand = textHeight === undefined; // Inject properties for scrollable interface

      InjectProperties(textBlock); // Fill config of scrollable

      config.scrollMode = 0; // Vertical

      config.type = 'rexTextArea';
      config.child = {
        gameObject: textBlock,
        proportion: proportion,
        expand: expand
      };
      var spaceConfig = GetValue$9(config, 'space', undefined);

      if (spaceConfig) {
        spaceConfig.child = spaceConfig.text;
      }

      _this = _super.call(this, scene, config);

      _this.addChildrenMap('text', textObject);

      return _this;
    }

    _createClass(TextArea, [{
      key: "text",
      get: function get() {
        return this.childrenMap.child.text;
      }
    }, {
      key: "linesCount",
      get: function get() {
        return this.childrenMap.child.linesCount;
      }
    }, {
      key: "contentHeight",
      get: function get() {
        return this.childrenMap.child.textHeight;
      }
    }]);

    return TextArea;
  }(Scrollable);

  var methods$1 = {
    setText: SetText,
    appendText: AppendText
  };
  Object.assign(TextArea.prototype, methods$1);

  var CreateTextArea = function CreateTextArea(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);
    ReplaceSliderConfig(scene, data.slider, view, styles, customBuilders);
    CreateChild(scene, data, 'header', view, styles, customBuilders);
    CreateChild(scene, data, 'footer', view, styles, customBuilders);
    var gameObject = new TextArea(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var OverlapSizerAdd = OverlapSizer.prototype.add;

  var Add = function Add(gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY) {
    gameObject.setVisible(false); // Default is invisible

    OverlapSizerAdd.call(this, gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY);
    return this;
  };

  var AddChildMethods = {
    add: Add,
    addPage: Add
  };

  var GetPage = function GetPage(key) {
    if (key === undefined) {
      return null;
    } else if (!this.sizerChildren.hasOwnProperty(key)) {
      return null;
    } else {
      return this.sizerChildren[key];
    }
  };

  var ContainerSetChildVisible = ContainerLite.prototype.setChildVisible;

  var SwapPage = function SwapPage(key) {
    this._previousKey = this._currentKey;
    var prevoiusPage = this.previousPage;

    if (prevoiusPage) {
      if (this.swapMode === 0) {
        // Invisible
        ContainerSetChildVisible.call(this, prevoiusPage, false);
        this.emit('pageinvisible', prevoiusPage, this._previousKey, this);
      } else {
        // Destroy
        prevoiusPage.destroy();
      }
    }

    if (key && !this.sizerChildren.hasOwnProperty(key)) {
      this.emit('createpage', key, this);
    }

    this._currentKey = key;
    var currentPage = this.currentPage;

    if (currentPage) {
      ContainerSetChildVisible.call(this, currentPage, true);
      this.emit('pagevisible', currentPage, this._currentKey, this);

      if (this.fadeInDuration > 0) {
        currentPage.setAlpha(0).fadeIn(this.fadeInDuration, 1);
      }
    }

    return this;
  };

  var HasPage = function HasPage(key) {
    return this.sizerChildren.hasOwnProperty(key);
  };

  var methods = {
    getPage: GetPage,
    swapPage: SwapPage,
    hasPage: HasPage
  };
  Object.assign(methods, AddChildMethods);

  var GetValue$8 = Phaser.Utils.Objects.GetValue;

  var Pages = /*#__PURE__*/function (_OverlapSizer) {
    _inherits(Pages, _OverlapSizer);

    var _super = _createSuper(Pages);

    function Pages(scene, config) {
      var _this;

      _classCallCheck(this, Pages);

      _this = _super.call(this, scene, config);
      _this.type = 'rexPages';
      _this.childrenMap = _this.sizerChildren;
      _this._previousKey = undefined;
      _this._currentKey = undefined;

      _this.setSwapMode(GetValue$8(config, 'swapMode', 0));

      _this.setFadeInDuration(GetValue$8(config, 'fadeIn', 0));

      return _this;
    }

    _createClass(Pages, [{
      key: "setSwapMode",
      value: function setSwapMode(mode) {
        if (typeof mode === 'string') {
          mode = SWAPMODE[mode];
        }

        this.swapMode = mode;
        return this;
      }
    }, {
      key: "setFadeInDuration",
      value: function setFadeInDuration(duration) {
        this.fadeInDuration = duration;
        return this;
      }
    }, {
      key: "previousKey",
      get: function get() {
        return this._previousKey;
      }
    }, {
      key: "currentKey",
      get: function get() {
        return this._currentKey;
      },
      set: function set(key) {
        this.swapPage(key);
      }
    }, {
      key: "currentPage",
      get: function get() {
        return this.getPage(this.currentKey);
      }
    }, {
      key: "previousPage",
      get: function get() {
        return this.getPage(this.previousKey);
      }
    }, {
      key: "keys",
      get: function get() {
        return Object.keys(this.sizerChildren);
      }
    }]);

    return Pages;
  }(OverlapSizer);

  Object.assign(Pages.prototype, methods);
  var SWAPMODE = {
    invisible: 0,
    destroy: 1
  };

  var CreatePages = function CreatePages(scene, data, view, styles, customBuilders) {
    return CreateAnySizer(scene, data, view, styles, customBuilders, Pages);
  };

  var DefaultTransitCallbacks = {
    popUp: function popUp(gameObject, duration) {
      gameObject.popUp(duration);
    },
    scaleDown: function scaleDown(gameObject, duration) {
      gameObject.scaleDown(duration);
    },
    fadeIn: function fadeIn(gameObject, duration) {
      gameObject.fadeIn(duration);
    },
    fadeOut: function fadeOut(gameObject, duration) {
      gameObject.fadeOut(duration);
    }
  };

  var GetValue$7 = Phaser.Utils.Objects.GetValue;

  var BaseClock = /*#__PURE__*/function (_TickTask) {
    _inherits(BaseClock, _TickTask);

    var _super = _createSuper(BaseClock);

    function BaseClock(parent, config) {
      var _this;

      _classCallCheck(this, BaseClock);

      _this = _super.call(this, parent, config);

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(BaseClock, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$7(o, 'isRunning', false);
        this.timeScale = GetValue$7(o, 'timeScale', 1);
        this.now = GetValue$7(o, 'now', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          timeScale: this.timeScale,
          now: this.now,
          tickingMode: this.tickingMode
        };
      } // Override
      // startTicking() { }
      // Override
      // stopTicking() {}

    }, {
      key: "start",
      value: function start(startAt) {
        if (startAt === undefined) {
          startAt = 0;
        }

        this.delta = 0;
        this.now = startAt;

        _get(_getPrototypeOf(BaseClock.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.now = time;
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(value) {
        this.timeScale = value;
        return this;
      }
    }, {
      key: "tick",
      value: function tick(delta) {
        delta *= this.timeScale;
        this.now += delta;
        this.delta = delta;
        this.emit('update', this.now, this.delta);
        return this;
      }
    }]);

    return BaseClock;
  }(TickTask);

  var Clock = /*#__PURE__*/function (_BaseClock) {
    _inherits(Clock, _BaseClock);

    var _super = _createSuper(Clock);

    function Clock() {
      _classCallCheck(this, Clock);

      return _super.apply(this, arguments);
    }

    _createClass(Clock, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(Clock.prototype), "startTicking", this).call(this);

        this.scene.sys.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(Clock.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('update', this.update, this);
        }
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || this.timeScale === 0) {
          return this;
        }

        this.tick(delta);
        return this;
      }
    }]);

    return Clock;
  }(BaseClock);

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

  var convert = function convert(s) {
    if (typeof s !== 'string') {
      return s;
    }

    if (s === '') {
      s = null;
    } else if (FLOAT.test(s)) {
      s = parseFloat(s);
    } else {
      if (s === 'false') {
        s = false;
      } else if (s === 'true') {
        s = true;
      }
    }

    return s;
  };

  var GetValue$6 = Phaser.Utils.Objects.GetValue;

  var RunCommands = function RunCommands(queue, scope, config) {
    var reverse = GetValue$6(config, 'reverse', false);
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
    var argsConvert = GetValue$6(config, 'argsConvert', undefined);
    var argsConvertScope = GetValue$6(config, 'argsConvertScope', undefined);
    var fnName = cmd[0];
    ARGS = Copy(ARGS, cmd, 1);

    if (argsConvert) {
      // convert string to floating number, boolean, null, or string        
      if (argsConvert === true) {
        argsConvert = convert;
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
        fn = GetValue$6(scope, fnName, null);
      }
    } else {
      fn = fnName;
    }

    var retValue = fn.apply(scope, ARGS);
    return retValue;
  };

  var ARGS = []; // reuse this array

  var GetValue$5 = Phaser.Utils.Objects.GetValue;

  var Player = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Player, _ComponentBase);

    var _super = _createSuper(Player);

    function Player(parent, config) {
      var _this;

      _classCallCheck(this, Player);

      _this = _super.call(this, parent, config);
      var clock = GetValue$5(config, 'clock', undefined);

      if (!clock) {
        clock = new Clock(parent);
      }

      _this.clock = clock;

      _this.clock.on('update', _this.update, _assertThisInitialized(_this));

      _this.resetFromJSON(config); // this function had been called in super(config)


      return _this;
    }

    _createClass(Player, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.clock.resetFromJSON(GetValue$5(o, 'clock', undefined));
        this.state = GetValue$5(o, 'state', 0); // 0=idle, 1=run, 2=completed

        this.commands = GetValue$5(o, 'commands', []); // [[time, cmds], [time, cmds], ...]

        this.scope = GetValue$5(o, 'scope', undefined);
        this.setTimeUnit(GetValue$5(o, 'timeUnit', 0));
        this.setDtMode(GetValue$5(o, 'dtMode', 0));
        this.index = GetValue$5(o, 'index', 0);
        this.nextTime = GetValue$5(o, 'nextTime', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          clock: this.clock.toJSON(),
          state: this.state,
          commands: this.commands,
          scope: this.scope,
          timeUnit: this.timeUnit,
          dtMode: this.dtMode,
          index: this.index,
          nextTime: this.nextTime
        };
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.clock.shutdown(fromScene);
        this.commands = undefined;

        _get(_getPrototypeOf(Player.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "load",
      value: function load(commands, scope, config) {
        this.stop();
        var timeUnit = GetValue$5(config, 'timeUnit', undefined);

        if (timeUnit !== undefined) {
          this.setTimeUnit(timeUnit);
        }

        var dtMode = GetValue$5(config, 'dtMode', undefined);

        if (dtMode !== undefined) {
          this.setDtMode(dtMode);
        }

        commands = commands.filter(function (item) {
          var dt = item[0];
          return !isNaN(dt);
        }).map(function (item) {
          var dt = item[0];

          if (typeof dt === 'string') {
            item[0] = parseFloat(item[0]);
          }

          return item;
        });

        if (this.dtMode === 0) {
          commands.sort(function (itemA, itemB) {
            var dtA = itemA[0],
                dtB = itemB[0];
            return dtA > dtB ? 1 : dtA < dtB ? -1 : 0;
          });
        }

        this.commands = commands;
        this.scope = scope;
        return this;
      }
    }, {
      key: "start",
      value: function start(startAt) {
        if (startAt === undefined) {
          startAt = 0;
        }

        this.stop();
        this.index = 0;
        this.state = 1;
        this.nextTime = this.getNextDt(0);
        this.clock.start(startAt);
        this.update(startAt);
        this.emit('start', this.parent, this);
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.clock.pause();
        this.emit('pause', this.parent, this);
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this.clock.resume();
        this.emit('resume', this.parent, this);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.clock.stop();
        this.state = 0;
        this.emit('stop', this.parent, this);
        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.clock.seek(time);
        return this;
      }
    }, {
      key: "seekToNext",
      value: function seekToNext() {
        this.seek(this.nextTime);
        return this;
      }
    }, {
      key: "isPlaying",
      get: function get() {
        return this.clock.isRunning;
      }
    }, {
      key: "completed",
      get: function get() {
        return this.state === 2;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this.clock.timeScale;
      },
      set: function set(timeScale) {
        this.clock.timeScale = timeScale;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "now",
      get: function get() {
        return this.clock.now;
      }
    }, {
      key: "update",
      value: function update(now) {
        if (this.nextTime > now) {
          return this;
        }

        var lastCommandIndex = this.commands.length - 1;

        while (1) {
          // Execute a command
          var item = this.commands[this.index];
          var command = item[1];

          if (!IsArray(command)) {
            // [dt, fnName, param0, param1, ...]
            command = Copy(CMD, item, 1);
          }

          RunCommands(command, this.scope);
          this.emit('runcommand', command, this.scope); // Execute a command

          if (this.index === lastCommandIndex) {
            this.complete();
            return this;
          } else {
            // Get next time
            this.index++; // Point to next command

            this.nextTime = this.getNextDt(this.nextTime);

            if (this.nextTime > now) {
              return this;
            } // Get next time

          }
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        this.clock.stop();
        this.state = 2;
        this.emit('complete', this.parent, this);
      }
    }, {
      key: "getNextDt",
      value: function getNextDt(currentDt) {
        var time = this.commands[this.index][0];

        if (this.timeUnit === 1) {
          // Second mode
          time = time * 1000;
        }

        if (this.dtMode === 1) {
          time += currentDt;
        }

        return time;
      }
    }, {
      key: "setDtMode",
      value: function setDtMode(dtMode) {
        if (typeof dtMode === 'string') {
          dtMode = DTMODE[dtMode];
        }

        this.dtMode = dtMode;
        return this;
      }
    }, {
      key: "setTimeUnit",
      value: function setTimeUnit(timeUnit) {
        if (typeof timeUnit === 'string') {
          timeUnit = TIMEUNITMODE[timeUnit];
        }

        this.timeUnit = timeUnit;
        return this;
      }
    }]);

    return Player;
  }(ComponentBase);

  var CMD = []; // reuse this array

  var TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1
  };
  var DTMODE = {
    abs: 0,
    absolute: 0,
    inc: 1,
    increment: 1
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;

  var Toast = /*#__PURE__*/function (_Label) {
    _inherits(Toast, _Label);

    var _super = _createSuper(Toast);

    function Toast(scene, config) {
      var _this;

      _classCallCheck(this, Toast);

      if (config === undefined) {
        config = {
          text: createDefaultTextObject(scene)
        };
      }

      _this = _super.call(this, scene, config);
      _this.type = 'rexToast';

      _this.setTransitInTime(GetValue$4(config, 'duration.in', 200));

      _this.setDisplayTime(GetValue$4(config, 'duration.hold', 1200));

      _this.setTransitOutTime(GetValue$4(config, 'duration.out', 200));

      _this.setTransitInCallback(GetValue$4(config, 'transitIn', TransitionMode.popUp));

      _this.setTransitOutCallback(GetValue$4(config, 'transitOut', TransitionMode.scaleDown));

      _this.player = new Player(_assertThisInitialized(_this), {
        dtMode: 1
      });
      _this.messages = [];
      _this.scaleX0 = undefined;
      _this.scaleY0 = undefined;

      _this.setVisible(false);

      return _this;
    }

    _createClass(Toast, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        this.player.destroy();
        this.player = undefined;
        this.messages = undefined;

        _get(_getPrototypeOf(Toast.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "setDisplayTime",
      value: function setDisplayTime(time) {
        this.displayTime = time;
        return this;
      }
    }, {
      key: "setTransitOutTime",
      value: function setTransitOutTime(time) {
        this.transitOutTime = time;
        return this;
      }
    }, {
      key: "setTransitInTime",
      value: function setTransitInTime(time) {
        this.transitInTime = time;
        return this;
      }
    }, {
      key: "setTransitInCallback",
      value: function setTransitInCallback(callback) {
        if (typeof callback === 'string') {
          callback = TransitionMode[callback];
        }

        switch (callback) {
          case TransitionMode.popUp:
            callback = DefaultTransitCallbacks.popUp;
            break;

          case TransitionMode.fadeIn:
            callback = DefaultTransitCallbacks.fadeIn;
            break;
        }

        if (!callback) {
          callback = NOOP;
        }

        this.transitInCallback = callback; // callback = function(gameObject, duration) {}

        return this;
      }
    }, {
      key: "setTransitOutCallback",
      value: function setTransitOutCallback(callback) {
        if (typeof callback === 'string') {
          callback = TransitionMode[callback];
        }

        switch (callback) {
          case TransitionMode.scaleDown:
            callback = DefaultTransitCallbacks.scaleDown;
            break;

          case TransitionMode.fadeOut:
            callback = DefaultTransitCallbacks.fadeOut;
            break;
        }

        if (!callback) {
          callback = NOOP;
        }

        this.transitOutCallback = callback; // callback = function(gameObject, duration) {}

        return this;
      }
    }, {
      key: "setScale",
      value: function setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
          scaleY = scaleX;
        } // Can override initial scale


        this.scaleX0 = scaleX;
        this.scaleY0 = scaleY;

        _get(_getPrototypeOf(Toast.prototype), "setScale", this).call(this, scaleX, scaleY);

        return this;
      }
    }, {
      key: "showMessage",
      value: function showMessage(callback) {
        // Remember first scaleX, scaleY as initial scale
        if (this.scaleX0 === undefined) {
          this.scaleX0 = this.scaleX;
        }

        if (this.scaleY0 === undefined) {
          this.scaleY0 = this.scaleY;
        }

        if (callback === undefined) {
          // Try pop up a pendding message
          if (this.messages.length === 0) {
            return this;
          }

          callback = this.messages.shift();
        }

        if (this.player.isPlaying) {
          // Pend message
          this.messages.push(callback);
          return this;
        } // Recover to initial state


        this.setScale(this.scaleX0, this.scaleY0).setVisible(true);

        if (typeof callback === 'string') {
          this.setText(callback);
        } else {
          callback(this);
        }

        this.layout();
        var commands = [[// Transit-in
        0, // time
        [this.transitInCallback, this, this.transitInTime] // [callback, param, ...]
        ], [// Hold
        this.transitInTime, [NOOP]], [// Transit-out
        this.displayTime, [this.transitOutCallback, this, this.transitOutTime]], [// End
        this.transitOutTime, [this.setVisible, false]], [// Complete - show next message
        30, // Add a small delay before complete
        [NOOP]]];
        this.player.load(commands, this).once('complete', function () {
          this.showMessage();
        }, this).start();
        return this;
      }
    }]);

    return Toast;
  }(Label);

  var TransitionMode = {
    popUp: 0,
    fadeIn: 1,
    scaleDown: 0,
    fadeOut: 1
  };

  var CreateToast = function CreateToast(scene, data, view, styles, customBuilders) {
    return CreateAnyLabel(scene, data, view, styles, customBuilders, Toast);
  };

  var GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

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
      key: "fillColor",
      get: function get() {
        return this._fillColor;
      },
      set: function set(value) {
        this.setFillStyle(value, this._fillAlpha);
      }
    }, {
      key: "fillAlpha",
      get: function get() {
        return this._fillAlpha;
      },
      set: function set(value) {
        this.setFillStyle(this._fillColor, value);
      }
    }, {
      key: "setFillStyle",
      value: function setFillStyle(color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }

        this.dirty = this.dirty || this.fillColor !== color || this.fillAlpha !== alpha;
        this._fillColor = color;
        this._fillAlpha = alpha;
        return this;
      }
    }, {
      key: "lineWidth",
      get: function get() {
        return this._lineWidth;
      },
      set: function set(value) {
        this.setStrokeStyle(value, this._strokeColor, this._strokeAlpha);
      }
    }, {
      key: "strokeColor",
      get: function get() {
        return this._strokeColor;
      },
      set: function set(value) {
        this.setStrokeStyle(this._lineWidth, value, this._strokeAlpha);
      }
    }, {
      key: "strokeAlpha",
      get: function get() {
        return this._strokeAlpha;
      },
      set: function set(value) {
        this.setStrokeStyle(this._lineWidth, this._strokeColor, value);
      }
    }, {
      key: "setStrokeStyle",
      value: function setStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }

        this.dirty = this.dirty || this.lineWidth !== lineWidth || this.strokeColor !== color || this.strokeAlpha !== alpha;
        this._lineWidth = lineWidth;
        this._strokeColor = color;
        this._strokeAlpha = alpha;
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

        this.isSizeChanged = false;
        this.dirty = false;
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
        this.fillStyle().lineStyle();
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
      value: function updateData() {
        this.dirty = false;
      }
    }]);

    return BaseGeom;
  }();

  Object.assign(BaseGeom.prototype, StyleMethods, DataMethods);

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

        _get(_getPrototypeOf(PathBase.prototype), "updateData", this).call(this);

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

  var Circle = /*#__PURE__*/function (_Arc) {
    _inherits(Circle, _Arc);

    var _super = _createSuper(Circle);

    function Circle(x, y, radius) {
      _classCallCheck(this, Circle);

      return _super.call(this, x, y, radius, radius, 0, 360);
    }

    return _createClass(Circle);
  }(Arc);

  Phaser.Math.Interpolation.QuadraticBezier;

  Phaser.Math.RotateAround;

  Phaser.Geom.Polygon;

  Phaser.Math.DegToRad;

  Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

  Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var Clamp = Phaser.Math.Clamp;
  var Linear$1 = Phaser.Math.Linear;
  var Percent$1 = Phaser.Math.Percent;
  var DefaultStartAngle = Phaser.Math.DegToRad(270);
  var RadToDeg = Phaser.Math.RadToDeg;

  var CircularProgress = /*#__PURE__*/function (_BaseShapes) {
    _inherits(CircularProgress, _BaseShapes);

    var _super = _createSuper(CircularProgress);

    function CircularProgress(scene, x, y, radius, barColor, value, config) {
      var _this;

      _classCallCheck(this, CircularProgress);

      if (IsPlainObject$1(x)) {
        config = x;
        x = GetValue$3(config, 'x', 0);
        y = GetValue$3(config, 'y', 0);
        radius = GetValue$3(config, 'radius', 1);
        barColor = GetValue$3(config, 'barColor', undefined);
        value = GetValue$3(config, 'value', 0);
      }

      var width = radius * 2;
      _this = _super.call(this, scene, x, y, width, width);
      _this.type = 'rexCircularProgress';
      _this.eventEmitter = GetValue$3(config, 'eventEmitter', _assertThisInitialized(_this));

      _this.addShape(new Circle().setName('track')).addShape(new Arc().setName('bar')).addShape(new Circle().setName('center'));

      _this.setRadius(radius);

      _this.setTrackColor(GetValue$3(config, 'trackColor', undefined));

      _this.setBarColor(barColor);

      _this.setCenterColor(GetValue$3(config, 'centerColor', undefined));

      _this.setThickness(GetValue$3(config, 'thickness', 0.2));

      _this.setStartAngle(GetValue$3(config, 'startAngle', DefaultStartAngle));

      _this.setAnticlockwise(GetValue$3(config, 'anticlockwise', false));

      var callback = GetValue$3(config, 'valuechangeCallback', null);

      if (callback !== null) {
        var scope = GetValue$3(config, 'valuechangeCallbackScope', undefined);

        _this.eventEmitter.on('valuechange', callback, scope);
      }

      _this.setEaseValuePropName('value').setEaseValueDuration(GetValue$3(config, 'easeValue.duration', 0)).setEaseValueFunction(GetValue$3(config, 'easeValue.ease', 'Linear'));

      _this.setValue(value);

      return _this;
    }

    _createClass(CircularProgress, [{
      key: "resize",
      value: function resize(width, height) {
        width = Math.floor(Math.min(width, height));

        if (width === this.width) {
          return this;
        }

        _get(_getPrototypeOf(CircularProgress.prototype), "resize", this).call(this, width, width);

        this.setRadius(width / 2);
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        value = Clamp(value, 0, 1);
        var oldValue = this._value;
        var valueChanged = oldValue != value;
        this.dirty = this.dirty || valueChanged;
        this._value = value;

        if (valueChanged) {
          this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
        }
      }
    }, {
      key: "setValue",
      value: function setValue(value, min, max) {
        if (value === undefined || value === null) {
          return this;
        }

        if (min !== undefined) {
          value = Percent$1(value, min, max);
        }

        this.value = value;
        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, min, max) {
        if (min !== undefined) {
          inc = Percent$1(inc, min, max);
        }

        this.value += inc;
        return this;
      }
    }, {
      key: "getValue",
      value: function getValue(min, max) {
        var value = this.value;

        if (min !== undefined) {
          value = Linear$1(min, max, value);
        }

        return value;
      }
    }, {
      key: "radius",
      get: function get() {
        return this._radius;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radius != value;
        this._radius = value;
        var width = value * 2;
        this.resize(width, width);
      }
    }, {
      key: "setRadius",
      value: function setRadius(radius) {
        this.radius = radius;
        return this;
      }
    }, {
      key: "trackColor",
      get: function get() {
        return this._trackColor;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._trackColor != value;
        this._trackColor = value;
      }
    }, {
      key: "setTrackColor",
      value: function setTrackColor(color) {
        this.trackColor = color;
        return this;
      }
    }, {
      key: "barColor",
      get: function get() {
        return this._barColor;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._barColor != value;
        this._barColor = value;
      }
    }, {
      key: "setBarColor",
      value: function setBarColor(color) {
        this.barColor = color;
        return this;
      }
    }, {
      key: "startAngle",
      get: function get() {
        return this._startAngle;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._startAngle != value;
        this._startAngle = value;
      }
    }, {
      key: "setStartAngle",
      value: function setStartAngle(angle) {
        this.startAngle = angle;
        return this;
      }
    }, {
      key: "anticlockwise",
      get: function get() {
        return this._anticlockwise;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._anticlockwise != value;
        this._anticlockwise = value;
      }
    }, {
      key: "setAnticlockwise",
      value: function setAnticlockwise(anticlockwise) {
        if (anticlockwise === undefined) {
          anticlockwise = true;
        }

        this.anticlockwise = anticlockwise;
        return this;
      }
    }, {
      key: "thickness",
      get: function get() {
        return this._thickness;
      },
      set: function set(value) {
        value = Clamp(value, 0, 1);
        this.dirty = this.dirty || this._thickness != value;
        this._thickness = value;
      }
    }, {
      key: "setThickness",
      value: function setThickness(thickness) {
        this.thickness = thickness;
        return this;
      }
    }, {
      key: "centerColor",
      get: function get() {
        return this._centerColor;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._centerColor != value;
        this._centerColor = value;
      }
    }, {
      key: "setCenterColor",
      value: function setCenterColor(color) {
        this.centerColor = color;
        return this;
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var x = this.radius;
        var lineWidth = this.thickness * this.radius;
        var barRadius = this.radius - lineWidth / 2;
        var centerRadius = this.radius - lineWidth; // Track shape

        var trackShape = this.getShape('track');

        if (this.trackColor != null && lineWidth > 0) {
          trackShape.setCenterPosition(x, x).setRadius(barRadius).lineStyle(lineWidth, this.trackColor);
        } else {
          trackShape.reset();
        } // Bar shape


        var barShape = this.getShape('bar');

        if (this.barColor != null && barRadius > 0) {
          var anticlockwise, startAngle, endAngle;

          if (this.value === 1) {
            anticlockwise = false;
            startAngle = 0;
            endAngle = 361; // overshoot 1
          } else {
            anticlockwise = this.anticlockwise;
            startAngle = RadToDeg(this.startAngle);
            var deltaAngle = 360 * (anticlockwise ? 1 - this.value : this.value);
            endAngle = deltaAngle + startAngle;
          }

          barShape.setCenterPosition(x, x).setRadius(barRadius).setAngle(startAngle, endAngle, anticlockwise).lineStyle(lineWidth, this.barColor);
        } else {
          barShape.reset();
        } // Center shape


        var centerShape = this.getShape('center');

        if (this.centerColor && centerRadius > 0) {
          centerShape.setCenterPosition(x, x).setRadius(centerRadius).fillStyle(this.centerColor);
        } else {
          centerShape.reset();
        }
      }
    }]);

    return CircularProgress;
  }(BaseShapes);

  Object.assign(CircularProgress.prototype, EaseValueMethods);

  var GetDistance = Phaser.Math.Distance.Between;

  var IsLocalPointInKnob = function IsLocalPointInKnob(knob, localX, localY) {
    var centerX = knob.width / 2;
    return GetDistance(centerX, centerX, localX, localY) <= centerX;
  };

  var GetAngle$1 = Phaser.Math.Angle.Between;
  var NormalizeAngle = Phaser.Math.Angle.Normalize;

  var OnTouchPad = function OnTouchPad(pointer, localX, localY) {
    if (!this.enable) {
      return;
    }

    if (!pointer.isDown) {
      return;
    }

    var knob = this.sizerChildren.knob;

    if (!IsLocalPointInKnob(knob, localX, localY)) {
      return;
    }

    var centerX = knob.width / 2;
    var startAngle = knob.startAngle;
    var endAngle = GetAngle$1(centerX, centerX, localX, localY);
    var deltaAngle = knob.anticlockwise ? startAngle - endAngle : endAngle - startAngle;
    var value = NormalizeAngle(deltaAngle) / (2 * Math.PI);
    this.stopEaseValue();

    if (this.easeValueDuration === 0 || Math.abs(this.value - value) < 0.1) {
      this.value = value;
    } else {
      this.easeValueTo(value);
    }
  };

  var InstallEvents$1 = function InstallEvents() {
    var knob = this.sizerChildren.knob;
    knob.setInteractive().on('pointerdown', OnTouchPad, this).on('pointermove', OnTouchPad, this);
  };

  var GetAngle = Phaser.Math.Angle.Between;
  var WrapAngle = Phaser.Math.Angle.Wrap;

  var OnPointerDown = function OnPointerDown(pointer, localX, localY) {
    if (!this.enable || this.panPointer) {
      return;
    }

    var knob = this.sizerChildren.knob;

    if (!IsLocalPointInKnob(knob, localX, localY)) {
      return;
    }

    OnPanStart.call(this, pointer);
  };

  var OnPointerMove = function OnPointerMove(pointer, localX, localY) {
    if (!this.enable) {
      return;
    }

    if (!pointer.isDown) {
      return;
    }

    var knob = this.sizerChildren.knob;

    switch (this.panState) {
      case TOUCH0:
        if (IsLocalPointInKnob(knob, localX, localY)) {
          OnPanStart.call(this, pointer);
        }

        break;

      case TOUCH1:
        if (IsLocalPointInKnob(knob, localX, localY)) {
          OnPan.call(this);
        } else {
          OnPanEnd.call(this);
        }

        break;
    }
  };

  var OnPointerUp = function OnPointerUp(pointer, localX, localY) {
    if (!this.enable || this.panPointer !== pointer) {
      return;
    }

    OnPanEnd.call(this);
  };

  var OnPanStart = function OnPanStart(pointer) {
    this.panPointer = pointer;
    this.panState = TOUCH1;
  };

  var OnPanEnd = function OnPanEnd() {
    this.panPointer = undefined;
    this.panState = TOUCH0;
  };

  var OnPan = function OnPan() {
    var p0 = this.panPointer.prevPosition,
        p1 = this.panPointer.position;
    var knob = this.sizerChildren.knob;
    var startAngle = GetAngle(knob.x, knob.y, p0.x, p0.y),
        endAngle = GetAngle(knob.x, knob.y, p1.x, p1.y);
    var deltaAngle = knob.anticlockwise ? startAngle - endAngle : endAngle - startAngle;
    var deltaValue = WrapAngle(deltaAngle) / (Math.PI * 2);
    this.stopEaseValue();
    this.value += deltaValue;
  };

  var TOUCH0 = 0;
  var TOUCH1 = 1;

  var InstallEvents = function InstallEvents() {
    var knob = this.sizerChildren.knob;
    knob.setInteractive().on('pointerdown', OnPointerDown, this).on('pointermove', OnPointerMove, this).on('pointerup', OnPointerUp, this);
    this.panPointer = undefined;
    this.panState = TOUCH0;
  };

  var SetTextFormatCallback = function SetTextFormatCallback(callback, scope) {
    this.textFormatCallback = callback;
    this.textFormatCallbackScope = scope;
    return this;
  };

  var GetFormatText = function GetFormatText(value) {
    if (value === undefined) {
      value = this.value;
    }

    var text;

    if (this.textFormatCallbackScope) {
      text = this.textFormatCallback(value);
    } else {
      text = this.textFormatCallback.call(this.textFormatCallbackScope, value);
    }

    return text;
  };

  var UpdateText = function UpdateText() {
    var textObject = this.sizerChildren.text;

    if (textObject && this.textFormatCallback) {
      textObject.setText(GetFormatText.call(this));

      if (textObject.layout) {
        textObject.layout();
      }
    }

    return this;
  };

  var TextObjectMethods = {
    setTextFormatCallback: SetTextFormatCallback,
    getFormatText: GetFormatText,
    updateText: UpdateText
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var Linear = Phaser.Math.Linear;
  var Percent = Phaser.Math.Percent;
  var SnapTo = Phaser.Math.Snap.To;

  var Knob = /*#__PURE__*/function (_OverlapSizer) {
    _inherits(Knob, _OverlapSizer);

    var _super = _createSuper(Knob);

    function Knob(scene, config) {
      var _this;

      _classCallCheck(this, Knob);

      if (config === undefined) {
        config = {};
      } // Create sizer


      _this = _super.call(this, scene, config);
      _this.type = 'rexKnob';
      _this.eventEmitter = GetValue$2(config, 'eventEmitter', _assertThisInitialized(_this)); // Add elements

      var background = GetValue$2(config, 'background', undefined);
      var textObject = GetValue$2(config, 'text', undefined);

      if (background) {
        _this.addBackground(background);
      } // Get text object


      if (textObject) {
        // Don't draw text on knob directly
        config.textColor = undefined;
        config.textStrokeColor = undefined;

        _this.setTextFormatCallback(GetValue$2(config, 'textFormatCallback', undefined), GetValue$2(config, 'textFormatCallbackScope', undefined));
      } // Create circular progress object


      var knob = new CircularProgress(scene, config);
      knob.setDepth(GetValue$2(config, 'knobDepth', 0));
      knob._value = -1; // To trigger text updating

      scene.add.existing(knob);

      _this.add(knob, 'knob');

      if (textObject) {
        _this.add(textObject, 'text', 'center', 0, false);

        scene.children.moveBelow(knob, textObject); // Move knob below textObject
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('knob', knob);

      _this.addChildrenMap('text', textObject);

      var callback = GetValue$2(config, 'valuechangeCallback', null);

      if (callback !== null) {
        var scope = GetValue$2(config, 'valuechangeCallbackScope', undefined);

        _this.eventEmitter.on('valuechange', callback, scope);
      }

      _this.setEnable(GetValue$2(config, 'enable', undefined));

      _this.setEaseValuePropName('value').setEaseValueDuration(GetValue$2(config, 'easeValue.duration', 0)).setEaseValueFunction(GetValue$2(config, 'easeValue.ease', 'Linear'));

      _this.setGap(GetValue$2(config, 'gap', undefined));

      _this.setValue(GetValue$2(config, 'value', 0), GetValue$2(config, 'min', undefined), GetValue$2(config, 'max', undefined)); // Input


      var inputMode = GetValue$2(config, 'input', 0);

      if (typeof inputMode === 'string') {
        inputMode = INPUTMODE[inputMode];
      }

      switch (inputMode) {
        case 0:
          // 'pan'
          InstallEvents.call(_assertThisInitialized(_this));
          break;

        case 1:
          // 'click'
          InstallEvents$1.call(_assertThisInitialized(_this));
          break;
      }

      return _this;
    }

    _createClass(Knob, [{
      key: "setEnable",
      value: function setEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.enable = enable;
        return this;
      }
    }, {
      key: "setGap",
      value: function setGap(gap) {
        this.gap = gap;
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this.sizerChildren.knob.value;
      },
      set: function set(value) {
        if (this.gap !== undefined) {
          value = SnapTo(value, this.gap);
        }

        var oldValue = this.value;
        this.sizerChildren.knob.value = value;
        var newValue = this.value;

        if (oldValue !== newValue) {
          this.updateText();
          this.eventEmitter.emit('valuechange', newValue, oldValue, this.eventEmitter);
        }
      }
    }, {
      key: "setValue",
      value: function setValue(value, min, max) {
        if (value === undefined || value === null) {
          return this;
        }

        if (min !== undefined) {
          value = Percent(value, min, max);
        }

        this.value = value;
        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, min, max) {
        if (min !== undefined) {
          inc = Percent(inc, min, max);
        }

        this.value += inc;
        return this;
      }
    }, {
      key: "getValue",
      value: function getValue(min, max) {
        var value = this.value;

        if (min !== undefined) {
          value = Linear(min, max, value);
        }

        return value;
      }
    }]);

    return Knob;
  }(OverlapSizer);

  var INPUTMODE = {
    pan: 0,
    drag: 0,
    click: 1,
    none: -1
  };
  Object.assign(Knob.prototype, TextObjectMethods, EaseValueMethods);

  var CreateKnob = function CreateKnob(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);
    var gameObject = new Knob(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var HolyGrail = /*#__PURE__*/function (_Sizer) {
    _inherits(HolyGrail, _Sizer);

    var _super = _createSuper(HolyGrail);

    function HolyGrail(scene, config) {
      var _this;

      _classCallCheck(this, HolyGrail);

      if (config === undefined) {
        config = {};
      }

      config.orientation = 1; // top-to-bottom
      // Create sizer

      _this = _super.call(this, scene, config);
      _this.type = 'rexHolyGrail'; // Add Background

      var background = GetValue$1(config, 'background', undefined);

      if (background) {
        _this.addBackground(background);
      } // Add Header


      var header = GetValue$1(config, 'header', undefined);

      if (header) {
        var proportion = GetValue$1(config, 'proportion.header', 0);
        var align = GetValue$1(config, 'align.header', 'center');
        var padding = GetValue$1(config, 'space.header', undefined);

        if (typeof padding === 'number') {
          padding = {
            bottom: padding
          };
        }

        var expand = GetValue$1(config, 'expand.header', true);

        _this.add(header, {
          proportion: proportion,
          align: align,
          padding: padding,
          expand: expand
        });
      }

      var bodySizer = new Sizer(scene, {
        orientation: 0 // left-to-right

      });

      _this.add(bodySizer, {
        proportion: 1,
        align: 'center',
        padding: 0,
        expand: true
      }); // Add Left-side


      var leftSide = GetValue$1(config, 'leftSide', undefined);

      if (leftSide) {
        var proportion = GetValue$1(config, 'proportion.leftSide', 0);
        var align = GetValue$1(config, 'align.leftSide', 'center');
        var padding = GetValue$1(config, 'space.leftSide', undefined);

        if (typeof padding === 'number') {
          padding = {
            right: padding
          };
        }

        var expand = GetValue$1(config, 'expand.leftSide', true);
        bodySizer.add(leftSide, {
          proportion: proportion,
          align: align,
          padding: padding,
          expand: expand
        });
      } // Add content


      var content = GetValue$1(config, 'content', undefined);

      if (content) {
        var proportion = GetValue$1(config, 'proportion.content', 1);
        var align = GetValue$1(config, 'align.content', 'center');
        var padding = GetValue$1(config, 'space.content', undefined);
        var expand = GetValue$1(config, 'expand.content', true);
        bodySizer.add(content, {
          proportion: proportion,
          align: align,
          padding: padding,
          expand: expand
        });
      } // Add Right-side


      var rightSide = GetValue$1(config, 'rightSide', undefined);

      if (rightSide) {
        var proportion = GetValue$1(config, 'proportion.rightSide', 0);
        var align = GetValue$1(config, 'align.rightSide', 'center');
        var padding = GetValue$1(config, 'space.rightSide', undefined);

        if (typeof padding === 'number') {
          padding = {
            left: padding
          };
        }

        var expand = GetValue$1(config, 'expand.rightSide', true);
        bodySizer.add(rightSide, {
          proportion: proportion,
          align: align,
          padding: padding,
          expand: expand
        });
      } // Add Footer


      var footer = GetValue$1(config, 'footer', undefined);

      if (footer) {
        var proportion = GetValue$1(config, 'proportion.footer', 0);
        var align = GetValue$1(config, 'align.footer', 'center');
        var padding = GetValue$1(config, 'space.footer', undefined);

        if (typeof padding === 'number') {
          padding = {
            top: padding
          };
        }

        var expand = GetValue$1(config, 'expand.footer', true);

        _this.add(footer, {
          proportion: proportion,
          align: align,
          padding: padding,
          expand: expand
        });
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('header', header);

      _this.addChildrenMap('leftSide', leftSide);

      _this.addChildrenMap('content', content);

      _this.addChildrenMap('rightSide', rightSide);

      _this.addChildrenMap('footer', footer);

      return _this;
    }

    return _createClass(HolyGrail);
  }(Sizer);

  var CreateDialog = function CreateDialog(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles); // Replace data by child game object

    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'content', view, styles, customBuilders);
    CreateChild(scene, data, 'leftSide', view, styles, customBuilders);
    CreateChild(scene, data, 'rightSide', view, styles, customBuilders);
    CreateChild(scene, data, 'header', view, styles, customBuilders);
    CreateChild(scene, data, 'footer', view, styles, customBuilders);
    var gameObject = new HolyGrail(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetEaseConfig = function GetEaseConfig(easeConfig, menu) {
    if (easeConfig.sameOrientation) {
      easeConfig.orientation = menu.orientation;
    } else {
      easeConfig.orientation = menu.orientation === 0 ? 1 : 0;
    }

    return easeConfig;
  };

  var PopUp = function PopUp(menu, duration) {
    menu.popUp(GetEaseConfig(menu.root.easeIn, menu));
  };

  var ScaleDown = function ScaleDown(menu, duration) {
    // Don't destroy here
    menu.scaleDown(GetEaseConfig(menu.root.easeOut, menu));
  };

  var SetTransitCallbackMethods = {
    setTransitInCallback: function setTransitInCallback(callback) {
      if (callback === undefined) {
        callback = PopUp;
      }

      this.transitInCallback = callback; // callback = function(gameObject, duration) {}

      return this;
    },
    setTransitOutCallback: function setTransitOutCallback(callback) {
      if (callback === undefined) {
        callback = ScaleDown;
      }

      this.transitOutCallback = callback; // callback = function(gameObject, duration) {}

      return this;
    }
  };

  var PostUpdateDelayCall = function PostUpdateDelayCall(gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'postupdate' event
    var scene = gameObject.scene;
    var sceneEE = scene.sys.events;
    var timer = scene.time.delayedCall(delay, // delay
    sceneEE.once, // callback
    [// Event name of scene
    'postupdate', // Callback
    function () {
      callback.call(scope, args);
    }], // args
    sceneEE // scope, scene's EE
    );
    return timer;
  };

  var DelayCallMethods = {
    delayCall: function delayCall(delay, callback, scope) {
      // Invoke callback under scene's 'postupdate' event
      this.timer = PostUpdateDelayCall(this, delay, callback, scope);
      return this;
    },
    removeDelayCall: function removeDelayCall() {
      if (this.timer) {
        this.timer.remove(false);
        this.timer = undefined;
      }

      return this;
    }
  };

  var ExpandSubMenu = function ExpandSubMenu(parentButton, items) {
    var subMenu = this.childrenMap.subMenu; // Submenu already expand

    if (subMenu && subMenu.parentButton === parentButton) {
      return this;
    }

    this.collapseSubMenu();
    var orientation;

    if (this.root.toggleOrientation) {
      orientation = this.orientation === 0 ? 1 : 0;
    } else {
      orientation = this.orientation;
    }

    var subMenu = new this.constructor(this.scene, {
      items: items,
      orientation: orientation,
      space: this.space,
      createBackgroundCallback: this.root.createBackgroundCallback,
      createBackgroundCallbackScope: this.root.createBackgroundCallbackScope,
      createButtonCallback: this.root.createButtonCallback,
      createButtonCallbackScope: this.root.createButtonCallbackScope,
      easeIn: this.root.easeIn,
      easeOut: this.root.easeOut,
      _rootMenu: this.root,
      _parentMenu: this,
      _parentButton: parentButton
    });
    this.pin(subMenu);
    this.childrenMap.subMenu = subMenu;
    this.root.emit('expand', subMenu, parentButton, this);
    return this;
  };

  var Collapse = function Collapse() {
    var root = this.root;
    root.emit('collapse', this, this.parentButton, root);
    var duration = root.easeOut.duration; // Don't destroy under transitOutCallback

    root.transitOutCallback(this, duration);
    this.collapseSubMenu(); // Destroy by delayCall

    this.delayCall(duration, this.destroy, this);
    return this;
  };

  var CollapseSubMenu = function CollapseSubMenu() {
    var subMenu = this.childrenMap.subMenu;

    if (subMenu === undefined) {
      return this;
    }

    this.childrenMap.subMenu = undefined;
    this.remove(subMenu);
    subMenu.collapse();
    return this;
  };

  var Methods = {
    expandSubMenu: ExpandSubMenu,
    collapse: Collapse,
    collapseSubMenu: CollapseSubMenu
  };
  Object.assign(Methods, SetTransitCallbackMethods, DelayCallMethods);

  var CreateBackground = function CreateBackground(scene, items, callback, scope) {
    var background;

    if (callback) {
      items.scene = scene;

      if (scope) {
        background = callback.call(scope, items);
      } else {
        background = callback(items);
      }

      items.scene = undefined;
    }

    return background;
  };

  var CreateButtons = function CreateButtons(scene, items, callback, scope) {
    var item;
    var buttons = [],
        button;

    if (items && callback) {
      for (var i = 0, cnt = items.length; i < cnt; i++) {
        item = items[i];
        item.scene = scene;

        if (scope) {
          button = callback.call(scope, item, i, items);
        } else {
          button = callback(item, i, items);
        }

        item.scene = undefined;
        buttons.push(button);
      }
    }

    return buttons;
  };

  var MenuSetInteractive = function MenuSetInteractive(menu) {
    menu // Expand sub event
    .on(menu.root.expandEventName, function (button, index) {
      if (this._isPassedEvent) {
        return;
      }

      var childrenKey = this.root.childrenKey;
      var subItems = this.items[index][childrenKey];

      if (subItems) {
        this.expandSubMenu(button, subItems);
      }
    }, menu) // Click any button
    .on('button.click', function (button, index, pointer, event) {
      // Pass event to root menu object
      if (this !== this.root) {
        this.root._isPassedEvent = true;
        this.root.emit('button.click', button, index, pointer, event);
        this.root._isPassedEvent = false;
      }
    }, menu) //Pointer over any button
    .on('button.over', function (button, index, pointer, event) {
      // Pass event to root menu object
      if (this !== this.root) {
        this.root._isPassedEvent = true;
        this.root.emit('button.over', button, index, pointer, event);
        this.root._isPassedEvent = false;
      }
    }, menu) //Pointer out any button
    .on('button.out', function (button, index, pointer, event) {
      // Pass event to root menu object
      if (this !== this.root) {
        this.root._isPassedEvent = true;
        this.root.emit('button.out', button, index, pointer, event);
        this.root._isPassedEvent = false;
      }
    }, menu);
  };

  var ParseEaseConfig = function ParseEaseConfig(menu, easeConfig) {
    if (typeof easeConfig === 'number') {
      easeConfig = {
        duration: easeConfig
      };
    }

    if (easeConfig.hasOwnProperty('orientation') && easeConfig.orientation !== undefined) {
      easeConfig.sameOrientation = GetOrientationMode(easeConfig.orientation) === menu.orientation;
    } else {
      easeConfig.sameOrientation = true;
    }

    easeConfig.destroy = false;
    return easeConfig;
  };

  var Expand = function Expand() {
    var root = this.root;
    var duration = root.easeIn.duration; // Ease in menu

    root.transitInCallback(this, duration);

    if (this !== this.root) {
      this.delayCall(duration, function () {
        // Pass event to root menu object
        this.root.emit('popup.complete', this);
      }, this);
    }
  };

  var GetValue = Phaser.Utils.Objects.GetValue;

  var Menu = /*#__PURE__*/function (_Buttons) {
    _inherits(Menu, _Buttons);

    var _super = _createSuper(Menu);

    function Menu(scene, config) {
      var _this;

      _classCallCheck(this, Menu);

      if (config === undefined) {
        config = {};
      } // Orientation


      if (!config.hasOwnProperty('orientation')) {
        config.orientation = 1; // y
      } // Parent


      var rootMenu = config._rootMenu;
      var parentMenu = config._parentMenu;
      var parentButton = config._parentButton; // Popup, root menu can be static, sub-menus are always popup.

      var popUp = GetValue(config, 'popup', true); // Items

      var items = GetValue(config, 'items', undefined); // Background

      var createBackgroundCallback = GetValue(config, 'createBackgroundCallback', undefined);
      var createBackgroundCallbackScope = GetValue(config, 'createBackgroundCallbackScope', undefined);
      config.background = CreateBackground(scene, items, createBackgroundCallback, createBackgroundCallbackScope); // Buttons

      var createButtonCallback = GetValue(config, 'createButtonCallback', undefined);
      var createButtonCallbackScope = GetValue(config, 'createButtonCallbackScope', undefined);
      config.buttons = CreateButtons(scene, items, createButtonCallback, createButtonCallbackScope);
      _this = _super.call(this, scene, config);
      _this.type = 'rexMenu';
      _this.items = items;
      _this.root = rootMenu === undefined ? _assertThisInitialized(_this) : rootMenu;
      _this.isRoot = _this.root === _assertThisInitialized(_this);
      _this.parentMenu = parentMenu;
      _this.parentButton = parentButton;
      _this.timer = undefined; // Root menu

      if (_this.isRoot) {
        _this.isPopUpMode = popUp; // Bounds

        var bounds = config.bounds;

        if (bounds === undefined) {
          bounds = GetViewport(scene);
        }

        _this.bounds = bounds; // Side of submenu

        _this.subMenuSide = [_this.y < bounds.centerY ? SUBMENU_DOWN : SUBMENU_UP, _this.x < bounds.centerX ? SUBMENU_RIGHT : SUBMENU_LEFT]; // Overwrite subMenuSide value if given

        var subMenuSide = GetValue(config, 'subMenuSide', undefined);

        if (subMenuSide !== undefined) {
          if (typeof subMenuSide === 'string') {
            subMenuSide = SubMenuSideMode[subMenuSide];
          }

          _this.subMenuSide[_this.orientation] = subMenuSide;
        } // ToggleOrientation mode


        _this.toggleOrientation = GetValue(config, 'toggleOrientation', false); // Expand mode

        _this.expandEventName = GetValue(config, 'expandEvent', 'button.click'); // Transition

        _this.easeIn = ParseEaseConfig(_assertThisInitialized(_this), GetValue(config, 'easeIn', 0));
        _this.easeOut = ParseEaseConfig(_assertThisInitialized(_this), GetValue(config, 'easeOut', 0));

        _this.setTransitInCallback(GetValue(config, 'transitIn'));

        _this.setTransitOutCallback(GetValue(config, 'transitOut')); // Callbacks


        _this.createBackgroundCallback = createBackgroundCallback;
        _this.createBackgroundCallbackScope = createBackgroundCallbackScope;
        _this.createButtonCallback = createButtonCallback;
        _this.createButtonCallbackScope = createButtonCallbackScope; // Children key

        _this.childrenKey = GetValue(config, 'childrenKey', 'children'); // Event flag

        _this._isPassedEvent = false; // pointerdown-outside-collapse

        _this.pointerDownOutsideCollapsing = GetValue(config, 'pointerDownOutsideCollapsing', true);

        if (_this.pointerDownOutsideCollapsing) {
          scene.input.on('pointerdown', _this.onPointerDownOutside, _assertThisInitialized(_this));
        }
      }

      var originX = 0,
          originY = 0;

      if (!_this.root.easeIn.sameOrientation) {
        var easeOrientation = GetEaseConfig(_this.root.easeIn, _assertThisInitialized(_this)).orientation;
        var menuOrientation = parentMenu ? parentMenu.orientation : _this.orientation;
        var subMenuSide = _this.root.subMenuSide[menuOrientation];

        if (easeOrientation === 0 && subMenuSide === SUBMENU_LEFT) {
          originX = 1;
        }

        if (easeOrientation === 1 && subMenuSide === SUBMENU_UP) {
          originY = 1;
        }
      }

      if (popUp) {
        _this.setOrigin(originX, originY).layout();
      } // Sub-menu: 
      // - scale to root's scale value
      // - align to parent button


      if (!_this.isRoot) {
        _this.setScale(_this.root.scaleX, _this.root.scaleY);

        var subMenuSide = _this.root.subMenuSide[parentMenu.orientation];

        switch (subMenuSide) {
          case SUBMENU_LEFT:
            //Put submene at left side
            _this.alignTop(parentButton.top).alignRight(parentButton.left);

            break;

          case SUBMENU_RIGHT:
            //Put submene at right side
            _this.alignTop(parentButton.top).alignLeft(parentButton.right);

            break;

          case SUBMENU_UP:
            //Put submene at up side
            _this.alignLeft(parentButton.left).alignBottom(parentButton.top);

            break;

          case SUBMENU_DOWN:
            //Put submene at down side
            _this.alignLeft(parentButton.left).alignTop(parentButton.bottom);

            break;
        }
      }

      MenuSetInteractive(_assertThisInitialized(_this));

      if (popUp) {
        _this.pushIntoBounds(_this.root.bounds); // Expand this menu


        Expand.call(_assertThisInitialized(_this));
      }

      return _this;
    }

    _createClass(Menu, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        if (this.isRoot && this.pointerDownOutsideCollapsing) {
          this.scene.input.off('pointerdown', this.onPointerDownOutside, this);
        }

        _get(_getPrototypeOf(Menu.prototype), "destroy", this).call(this, fromScene);

        this.removeDelayCall();
      }
    }, {
      key: "isInTouching",
      value: function isInTouching(pointer) {
        if (_get(_getPrototypeOf(Menu.prototype), "isInTouching", this).call(this, pointer)) {
          return true;
        } else if (this.childrenMap.subMenu) {
          return this.childrenMap.subMenu.isInTouching(pointer);
        } else {
          return false;
        }
      }
    }, {
      key: "onPointerDownOutside",
      value: function onPointerDownOutside(pointer) {
        if (this.isInTouching(pointer)) {
          return;
        }

        if (this.isPopUpMode) {
          this.collapse();
        } else {
          this.collapseSubMenu();
        }
      }
    }]);

    return Menu;
  }(Buttons$1);

  var SUBMENU_LEFT = 2;
  var SUBMENU_RIGHT = 0;
  var SUBMENU_UP = 3;
  var SUBMENU_DOWN = 1;
  var SubMenuSideMode = {
    up: SUBMENU_UP,
    down: SUBMENU_DOWN,
    left: SUBMENU_LEFT,
    right: SUBMENU_RIGHT
  };
  Object.assign(Menu.prototype, Methods);

  var CreateMenu = function CreateMenu(scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var backgroundConfig = data.background;
    delete data.background;

    if (backgroundConfig) {
      data.createBackgroundCallback = function (items) {
        var scene = items.scene;
        var gameObject = Make(scene, DeepClone(backgroundConfig), view, styles, customBuilders);
        return gameObject;
      };
    }

    data.createButtonCallback = function (item, index, items) {
      // Don't deep-clone scene and $next properties
      var scene = item.scene;
      var $next = item.$next;
      delete item.scene;
      delete item.$next;
      var gameObject = Make(scene, DeepClone(item), view, styles, customBuilders); // Add scene, $next properties back

      item.scene = scene;
      item.$next = $next;
      return gameObject;
    };

    data.childrenKey = '$next';
    var gameObject = new Menu(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var Builders = {
    Image: CreateImage,
    Sprite: CreateSprite,
    Video: CreateVideo,
    Text: CreateText,
    BBCodeText: CreateBBCodeText,
    RoundRectangle: CreateRoundRectangle,
    Ninepatch: CreateNinePatch,
    Ninepatch2: CreateNinePatch2,
    Canvas: CreateCanvas,
    CircleMaskImage: CreateCircleMaskImage,
    Space: CreateSpace,
    Sizer: CreateSizer,
    FixWidthSizer: CreateFixWidthSizer,
    GridSizer: CreateGridSizer,
    OverlapSizer: CreateOverlapSizer,
    Buttons: CreateButtons$1,
    FixWidthButtons: CreateFixWidthButtons,
    GridButtons: CreateGridButtons,
    Label: CreateLabel,
    BadgeLabel: CreateBadgeLabel,
    Dialog: CreateDialog$1,
    TextBox: CreateTextBox,
    Slider: CreateSlider,
    NumberBar: CreateNumberBar,
    ScrollBar: CreateScrollBar,
    TextArea: CreateTextArea,
    Pages: CreatePages,
    Toast: CreateToast,
    Knob: CreateKnob,
    HolyGrail: CreateDialog,
    Menu: CreateMenu
  };

  var Make = function Make(scene, data, view, styles, customBuilders) {
    var type = GetTypeName(data, styles);

    if (!type) {
      console.warn("rexUI.Make: Can't get type name in ".concat(JSON.stringify(data)));
      return undefined;
    }

    var callback;

    if (customBuilders) {
      callback = customBuilders[type];
    }

    if (!callback) {
      callback = Builders[type];
    }

    if (!callback) {
      console.warn("rexUI.Make: Can't create ".concat(type, " game object."));
      return undefined;
    }

    var gameObject = callback(scene, data, view, styles, customBuilders);

    if (data.name) {
      gameObject.setName(data.name);
    }

    return gameObject;
  };

  var YAMLMake = function YAMLMake(scene, data, view, styles, customBuilders) {
    data = ParseYAML(data);

    if (Array.isArray(data)) {
      // Parsing result of YAML data might be an array, 
      // Only last item will be used to create game object, others are references
      data = data[data.length - 1];
    } else if (data.$root) {
      // Parsing result of YAML data might be an object, with $root key, 
      // data.$root will be used to create game object, others are default styles
      var defaultStyles = data;
      data = data.$root;
      delete defaultStyles.$root;

      if (styles === undefined) {
        styles = defaultStyles;
      } else {
        for (var key in defaultStyles) {
          if (!styles[key]) {
            styles[key] = defaultStyles[key];
          }
        }
      }
    }

    styles = ParseYAML(styles);
    var gameObject = Make(scene, data, view, styles, customBuilders);
    return gameObject;
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

  var Maker = /*#__PURE__*/function () {
    function Maker(scene, styles, customBuilders) {
      _classCallCheck(this, Maker);

      this.setScene(scene);
      this.setStyles(styles);
      this.setBuilders(customBuilders);
    }

    _createClass(Maker, [{
      key: "setScene",
      value: function setScene(scene) {
        this.scene = scene;
        return this;
      }
    }, {
      key: "setStyles",
      value: function setStyles(styles) {
        this.styles = ParseYAML(styles);
        return this;
      }
    }, {
      key: "addStyle",
      value: function addStyle(key, style) {
        if (this.styles === undefined) {
          this.styles = {};
        }

        if (typeof key === 'string' && style === undefined) {
          key = ParseYAML(key);
        }

        if (IsPlainObject(key)) {
          var styles = key;

          for (key in styles) {
            this.styles[key] = styles[key];
          }
        } else {
          this.styles[key] = ParseYAML(style);
        }

        return this;
      }
    }, {
      key: "clearStyles",
      value: function clearStyles() {
        this.setStyles();
        return this;
      }
    }, {
      key: "setBuilders",
      value: function setBuilders(customBuilders) {
        this.customBuilders = customBuilders;
        return this;
      }
    }, {
      key: "addBuilder",
      value: function addBuilder(key, customBuilder) {
        if (this.customBuilders === undefined) {
          this.customBuilders = {};
        }

        if (IsPlainObject(key)) {
          var customBuilders = key;

          for (key in customBuilders) {
            this.customBuilders[key] = customBuilders[key];
          }
        } else {
          this.customBuilders[key] = customBuilder;
        }

        return this;
      }
    }, {
      key: "clearBuilder",
      value: function clearBuilder() {
        this.setBuilders();
        return this;
      }
    }, {
      key: "make",
      value: function make(data, view) {
        return YAMLMake(this.scene, data, view, this.styles, this.customBuilders);
      }
    }]);

    return Maker;
  }();

  return Maker;

}));

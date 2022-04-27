"use strict";
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var live2dcubismframework_1 = require("../live2dcubismframework");
var csmmap_1 = require("../type/csmmap");
var csmstring_1 = require("../type/csmstring");
var csmvector_1 = require("../type/csmvector");
var cubismdebug_1 = require("./cubismdebug");
// StaticInitializeNotForClientCall()で初期化する
var CSM_JSON_ERROR_TYPE_MISMATCH = 'Error: type mismatch';
var CSM_JSON_ERROR_INDEX_OF_BOUNDS = 'Error: index out of bounds';
/**
 * パースしたJSONエレメントの要素の基底クラス。
 */
var Value = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function Value() {
    }
    /**
     * 要素を文字列型で返す(string)
     */
    Value.prototype.getRawString = function (defaultValue, indent) {
        return this.getString(defaultValue, indent);
    };
    /**
     * 要素を数値型で返す(number)
     */
    Value.prototype.toInt = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return defaultValue;
    };
    /**
     * 要素を数値型で返す(number)
     */
    Value.prototype.toFloat = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return defaultValue;
    };
    /**
     * 要素を真偽値で返す(boolean)
     */
    Value.prototype.toBoolean = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = false; }
        return defaultValue;
    };
    /**
     * サイズを返す
     */
    Value.prototype.getSize = function () {
        return 0;
    };
    /**
     * 要素を配列で返す(Value[])
     */
    Value.prototype.getArray = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return defaultValue;
    };
    /**
     * 要素をコンテナで返す(array)
     */
    Value.prototype.getVector = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = new csmvector_1.csmVector(); }
        return defaultValue;
    };
    /**
     * 要素をマップで返す(csmMap<csmString, Value>)
     */
    Value.prototype.getMap = function (defaultValue) {
        return defaultValue;
    };
    /**
     * 添字演算子[index]
     */
    Value.prototype.getValueByIndex = function (index) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    };
    /**
     * 添字演算子[string | csmString]
     */
    Value.prototype.getValueByString = function (s) {
        return Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    };
    /**
     * マップのキー一覧をコンテナで返す
     *
     * @return マップのキーの一覧
     */
    Value.prototype.getKeys = function () {
        return Value.s_dummyKeys;
    };
    /**
     * Valueの種類がエラー値ならtrue
     */
    Value.prototype.isError = function () {
        return false;
    };
    /**
     * Valueの種類がnullならtrue
     */
    Value.prototype.isNull = function () {
        return false;
    };
    /**
     * Valueの種類が真偽値ならtrue
     */
    Value.prototype.isBool = function () {
        return false;
    };
    /**
     * Valueの種類が数値型ならtrue
     */
    Value.prototype.isFloat = function () {
        return false;
    };
    /**
     * Valueの種類が文字列ならtrue
     */
    Value.prototype.isString = function () {
        return false;
    };
    /**
     * Valueの種類が配列ならtrue
     */
    Value.prototype.isArray = function () {
        return false;
    };
    /**
     * Valueの種類がマップ型ならtrue
     */
    Value.prototype.isMap = function () {
        return false;
    };
    Value.prototype.equals = function (value) {
        return false;
    };
    /**
     * Valueの値が静的ならtrue、静的なら解放しない
     */
    Value.prototype.isStatic = function () {
        return false;
    };
    /**
     * Valueにエラー値をセットする
     */
    Value.prototype.setErrorNotForClientCall = function (errorStr) {
        return JsonError.errorValue;
    };
    /**
     * 初期化用メソッド
     */
    Value.staticInitializeNotForClientCall = function () {
        JsonBoolean.trueValue = new JsonBoolean(true);
        JsonBoolean.falseValue = new JsonBoolean(false);
        Value.errorValue = new JsonError('ERROR', true);
        Value.nullValue = new JsonNullvalue();
        Value.s_dummyKeys = new csmvector_1.csmVector();
    };
    /**
     * リリース用メソッド
     */
    Value.staticReleaseNotForClientCall = function () {
        JsonBoolean.trueValue = null;
        JsonBoolean.falseValue = null;
        Value.errorValue = null;
        Value.nullValue = null;
        Value.s_dummyKeys = null;
    };
    return Value;
}());
exports.Value = Value;
/**
 * Ascii文字のみ対応した最小限の軽量JSONパーサ。
 * 仕様はJSONのサブセットとなる。
 * 設定ファイル(model3.json)などのロード用
 *
 * [未対応項目]
 * ・日本語などの非ASCII文字
 * ・eによる指数表現
 */
var CubismJson = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismJson(buffer, length) {
        this._error = null;
        this._lineCount = 0;
        this._root = null;
        if (buffer != undefined) {
            this.parseBytes(buffer, length);
        }
    }
    /**
     * バイトデータから直接ロードしてパースする
     *
     * @param buffer バッファ
     * @param size バッファサイズ
     * @return CubismJsonクラスのインスタンス。失敗したらNULL
     */
    CubismJson.create = function (buffer, size) {
        var json = new CubismJson();
        var succeeded = json.parseBytes(buffer, size);
        if (!succeeded) {
            CubismJson.delete(json);
            return null;
        }
        else {
            return json;
        }
    };
    /**
     * パースしたJSONオブジェクトの解放処理
     *
     * @param instance CubismJsonクラスのインスタンス
     */
    CubismJson.delete = function (instance) {
        instance = null;
    };
    /**
     * パースしたJSONのルート要素を返す
     */
    CubismJson.prototype.getRoot = function () {
        return this._root;
    };
    /**
     *  UnicodeのバイナリをStringに変換
     *
     * @param buffer 変換するバイナリデータ
     * @return 変換後の文字列
     */
    CubismJson.prototype.arrayBufferToString = function (buffer) {
        var uint8Array = new Uint8Array(buffer);
        var str = '';
        for (var i = 0, len = uint8Array.length; i < len; ++i) {
            str += '%' + this.pad(uint8Array[i].toString(16));
        }
        str = decodeURIComponent(str);
        return str;
    };
    /**
     * エンコード、パディング
     */
    CubismJson.prototype.pad = function (n) {
        return n.length < 2 ? '0' + n : n;
    };
    /**
     * JSONのパースを実行する
     * @param buffer    パース対象のデータバイト
     * @param size      データバイトのサイズ
     * return true : 成功
     * return false: 失敗
     */
    CubismJson.prototype.parseBytes = function (buffer, size) {
        var endPos = new Array(1); // 参照渡しにするため配列
        var decodeBuffer = this.arrayBufferToString(buffer);
        this._root = this.parseValue(decodeBuffer, size, 0, endPos);
        if (this._error) {
            var strbuf = '\0';
            strbuf = 'Json parse error : @line ' + (this._lineCount + 1) + '\n';
            this._root = new JsonString(strbuf);
            cubismdebug_1.CubismLogInfo('{0}', this._root.getRawString());
            return false;
        }
        else if (this._root == null) {
            this._root = new JsonError(new csmstring_1.csmString(this._error), false); // rootは解放されるのでエラーオブジェクトを別途作成する
            return false;
        }
        return true;
    };
    /**
     * パース時のエラー値を返す
     */
    CubismJson.prototype.getParseError = function () {
        return this._error;
    };
    /**
     * ルート要素の次の要素がファイルの終端だったらtrueを返す
     */
    CubismJson.prototype.checkEndOfFile = function () {
        return this._root.getArray()[1].equals('EOF');
    };
    /**
     * JSONエレメントからValue(float,String,Value*,Array,null,true,false)をパースする
     * エレメントの書式に応じて内部でParseString(), ParseObject(), ParseArray()を呼ぶ
     *
     * @param   buffer      JSONエレメントのバッファ
     * @param   length      パースする長さ
     * @param   begin       パースを開始する位置
     * @param   outEndPos   パース終了時の位置
     * @return      パースから取得したValueオブジェクト
     */
    CubismJson.prototype.parseValue = function (buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        var o = null;
        var i = begin;
        var f;
        for (; i < length; i++) {
            var c = buffer[i];
            switch (c) {
                case '-':
                case '.':
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': {
                    var afterString = new Array(1); // 参照渡しにするため
                    f = live2dcubismframework_1.strtod(buffer.slice(i), afterString);
                    outEndPos[0] = buffer.indexOf(afterString[0]);
                    return new JsonFloat(f);
                }
                case '"':
                    return new JsonString(this.parseString(buffer, length, i + 1, outEndPos)); // \"の次の文字から
                case '[':
                    o = this.parseArray(buffer, length, i + 1, outEndPos);
                    return o;
                case '{':
                    o = this.parseObject(buffer, length, i + 1, outEndPos);
                    return o;
                case 'n': // null以外にない
                    if (i + 3 < length) {
                        o = new JsonNullvalue(); // 解放できるようにする
                        outEndPos[0] = i + 4;
                    }
                    else {
                        this._error = 'parse null';
                    }
                    return o;
                case 't': // true以外にない
                    if (i + 3 < length) {
                        o = JsonBoolean.trueValue;
                        outEndPos[0] = i + 4;
                    }
                    else {
                        this._error = 'parse true';
                    }
                    return o;
                case 'f': // false以外にない
                    if (i + 4 < length) {
                        o = JsonBoolean.falseValue;
                        outEndPos[0] = i + 5;
                    }
                    else {
                        this._error = "illegal ',' position";
                    }
                    return o;
                case ',': // Array separator
                    this._error = "illegal ',' position";
                    return null;
                case ']': // 不正な｝だがスキップする。配列の最後に不要な , があると思われる
                    outEndPos[0] = i; // 同じ文字を再処理
                    return null;
                case '\n':
                    this._lineCount++;
                case ' ':
                case '\t':
                case '\r':
                default:
                    // スキップ
                    break;
            }
        }
        this._error = 'illegal end of value';
        return null;
    };
    /**
     * 次の「"」までの文字列をパースする。
     *
     * @param   string  ->  パース対象の文字列
     * @param   length  ->  パースする長さ
     * @param   begin   ->  パースを開始する位置
     * @param  outEndPos   ->  パース終了時の位置
     * @return      パースした文F字列要素
     */
    CubismJson.prototype.parseString = function (string, length, begin, outEndPos) {
        if (this._error)
            return null;
        var i = begin;
        var c, c2;
        var ret = new csmstring_1.csmString('');
        var bufStart = begin; // sbufに登録されていない文字の開始位置
        for (; i < length; i++) {
            c = string[i];
            switch (c) {
                case '"': {
                    // 終端の”、エスケープ文字は別に処理されるのでここに来ない
                    outEndPos[0] = i + 1; // ”の次の文字
                    ret.append(string.slice(bufStart), i - bufStart); // 前の文字までを登録する
                    return ret.s;
                }
                case '//': {
                    // エスケープの場合
                    i++; // ２文字をセットで扱う
                    if (i - 1 > bufStart) {
                        ret.append(string.slice(bufStart), i - bufStart); // 前の文字までを登録する
                    }
                    bufStart = i + 1; // エスケープ（２文字)の次の文字から
                    if (i < length) {
                        c2 = string[i];
                        switch (c2) {
                            case '\\':
                                ret.expansion(1, '\\');
                                break;
                            case '"':
                                ret.expansion(1, '"');
                                break;
                            case '/':
                                ret.expansion(1, '/');
                                break;
                            case 'b':
                                ret.expansion(1, '\b');
                                break;
                            case 'f':
                                ret.expansion(1, '\f');
                                break;
                            case 'n':
                                ret.expansion(1, '\n');
                                break;
                            case 'r':
                                ret.expansion(1, '\r');
                                break;
                            case 't':
                                ret.expansion(1, '\t');
                                break;
                            case 'u':
                                this._error = 'parse string/unicord escape not supported';
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        this._error = 'parse string/escape error';
                    }
                }
                default: {
                    break;
                }
            }
        }
        this._error = 'parse string/illegal end';
        return null;
    };
    /**
     * JSONのオブジェクトエレメントをパースしてValueオブジェクトを返す
     *
     * @param buffer    JSONエレメントのバッファ
     * @param length    パースする長さ
     * @param begin     パースを開始する位置
     * @param outEndPos パース終了時の位置
     * @return パースから取得したValueオブジェクト
     */
    CubismJson.prototype.parseObject = function (buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        var ret = new JsonMap();
        // Key: Value
        var key = '';
        var i = begin;
        var c = '';
        var localRetEndPos2 = Array(1);
        var ok = false;
        // , が続く限りループ
        for (; i < length; i++) {
            FOR_LOOP: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case '"':
                        key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                        if (this._error) {
                            return null;
                        }
                        i = localRetEndPos2[0];
                        ok = true;
                        break FOR_LOOP; //-- loopから出る
                    case '}': // 閉じカッコ
                        outEndPos[0] = i + 1;
                        return ret; // 空
                    case ':':
                        this._error = "illegal ':' position";
                        break;
                    case '\n':
                        this._lineCount++;
                    default:
                        break; // スキップする文字
                }
            }
            if (!ok) {
                this._error = 'key not found';
                return null;
            }
            ok = false;
            // : をチェック
            FOR_LOOP2: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ':':
                        ok = true;
                        i++;
                        break FOR_LOOP2;
                    case '}':
                        this._error = "illegal '}' position";
                        break;
                    case '\n':
                        this._lineCount++;
                    // case ' ': case '\t' : case '\r':
                    default:
                        break; // スキップする文字
                }
            }
            if (!ok) {
                this._error = "':' not found";
                return null;
            }
            // 値をチェック
            var value = this.parseValue(buffer, length, i, localRetEndPos2);
            if (this._error) {
                return null;
            }
            i = localRetEndPos2[0];
            // ret.put(key, value);
            ret.put(key, value);
            FOR_LOOP3: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ',':
                        break FOR_LOOP3;
                    case '}':
                        outEndPos[0] = i + 1;
                        return ret; // 正常終了
                    case '\n':
                        this._lineCount++;
                    default:
                        break; // スキップ
                }
            }
        }
        this._error = 'illegal end of perseObject';
        return null;
    };
    /**
     * 次の「"」までの文字列をパースする。
     * @param buffer    JSONエレメントのバッファ
     * @param length    パースする長さ
     * @param begin     パースを開始する位置
     * @param outEndPos パース終了時の位置
     * @return パースから取得したValueオブジェクト
     */
    CubismJson.prototype.parseArray = function (buffer, length, begin, outEndPos) {
        if (this._error)
            return null;
        var ret = new JsonArray();
        // key : value
        var i = begin;
        var c;
        var localRetEndpos2 = new Array(1);
        // , が続く限りループ
        for (; i < length; i++) {
            // : をチェック
            var value = this.parseValue(buffer, length, i, localRetEndpos2);
            if (this._error) {
                return null;
            }
            i = localRetEndpos2[0];
            if (value) {
                ret.add(value);
            }
            // FOR_LOOP3:
            // boolean breakflag = false;
            FOR_LOOP: for (; i < length; i++) {
                c = buffer[i];
                switch (c) {
                    case ',':
                        // breakflag = true;
                        // break; // 次のKEY, VAlUEへ
                        break FOR_LOOP;
                    case ']':
                        outEndPos[0] = i + 1;
                        return ret; // 終了
                    case '\n':
                        ++this._lineCount;
                    //case ' ': case '\t': case '\r':
                    default:
                        break; // スキップ
                }
            }
        }
        ret = void 0;
        this._error = 'illegal end of parseObject';
        return null;
    };
    return CubismJson;
}());
exports.CubismJson = CubismJson;
/**
 * パースしたJSONの要素をfloat値として扱う
 */
var JsonFloat = /** @class */ (function (_super) {
    __extends(JsonFloat, _super);
    /**
     * コンストラクタ
     */
    function JsonFloat(v) {
        var _this = _super.call(this) || this;
        _this._value = v;
        return _this;
    }
    /**
     * Valueの種類が数値型ならtrue
     */
    JsonFloat.prototype.isFloat = function () {
        return true;
    };
    /**
     * 要素を文字列で返す(csmString型)
     */
    JsonFloat.prototype.getString = function (defaultValue, indent) {
        var strbuf = '\0';
        this._value = parseFloat(strbuf);
        this._stringBuffer = strbuf;
        return this._stringBuffer;
    };
    /**
     * 要素を数値型で返す(number)
     */
    JsonFloat.prototype.toInt = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return parseInt(this._value.toString());
    };
    /**
     * 要素を数値型で返す(number)
     */
    JsonFloat.prototype.toFloat = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0.0; }
        return this._value;
    };
    JsonFloat.prototype.equals = function (value) {
        if ('number' === typeof value) {
            // int
            if (Math.round(value)) {
                return false;
            }
            // float
            else {
                return value == this._value;
            }
        }
        return false;
    };
    return JsonFloat;
}(Value));
exports.JsonFloat = JsonFloat;
/**
 * パースしたJSONの要素を真偽値として扱う
 */
var JsonBoolean = /** @class */ (function (_super) {
    __extends(JsonBoolean, _super);
    /**
     * 引数付きコンストラクタ
     */
    function JsonBoolean(v) {
        var _this = _super.call(this) || this;
        _this._boolValue = v;
        return _this;
    }
    /**
     * Valueの種類が真偽値ならtrue
     */
    JsonBoolean.prototype.isBool = function () {
        return true;
    };
    /**
     * 要素を真偽値で返す(boolean)
     */
    JsonBoolean.prototype.toBoolean = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = false; }
        return this._boolValue;
    };
    /**
     * 要素を文字列で返す(csmString型)
     */
    JsonBoolean.prototype.getString = function (defaultValue, indent) {
        this._stringBuffer = this._boolValue ? 'true' : 'false';
        return this._stringBuffer;
    };
    JsonBoolean.prototype.equals = function (value) {
        if ('boolean' === typeof value) {
            return value == this._boolValue;
        }
        return false;
    };
    /**
     * Valueの値が静的ならtrue, 静的なら解放しない
     */
    JsonBoolean.prototype.isStatic = function () {
        return true;
    };
    return JsonBoolean;
}(Value));
exports.JsonBoolean = JsonBoolean;
/**
 * パースしたJSONの要素を文字列として扱う
 */
var JsonString = /** @class */ (function (_super) {
    __extends(JsonString, _super);
    function JsonString(s) {
        var _this = _super.call(this) || this;
        if ('string' === typeof s) {
            _this._stringBuffer = s;
        }
        if (s instanceof csmstring_1.csmString) {
            _this._stringBuffer = s.s;
        }
        return _this;
    }
    /**
     * Valueの種類が文字列ならtrue
     */
    JsonString.prototype.isString = function () {
        return true;
    };
    /**
     * 要素を文字列で返す(csmString型)
     */
    JsonString.prototype.getString = function (defaultValue, indent) {
        return this._stringBuffer;
    };
    JsonString.prototype.equals = function (value) {
        if ('string' === typeof value) {
            return this._stringBuffer == value;
        }
        if (value instanceof csmstring_1.csmString) {
            return this._stringBuffer == value.s;
        }
        return false;
    };
    return JsonString;
}(Value));
exports.JsonString = JsonString;
/**
 * JSONパース時のエラー結果。文字列型のようにふるまう
 */
var JsonError = /** @class */ (function (_super) {
    __extends(JsonError, _super);
    /**
     * 引数付きコンストラクタ
     */
    function JsonError(s, isStatic) {
        var _this = this;
        if ('string' === typeof s) {
            _this = _super.call(this, s) || this;
        }
        else {
            _this = _super.call(this, s) || this;
        }
        _this._isStatic = isStatic;
        return _this;
    }
    /**
     * Valueの値が静的ならtrue、静的なら解放しない
     */
    JsonError.prototype.isStatic = function () {
        return this._isStatic;
    };
    /**
     * エラー情報をセットする
     */
    JsonError.prototype.setErrorNotForClientCall = function (s) {
        this._stringBuffer = s;
        return this;
    };
    /**
     * Valueの種類がエラー値ならtrue
     */
    JsonError.prototype.isError = function () {
        return true;
    };
    return JsonError;
}(JsonString));
exports.JsonError = JsonError;
/**
 * パースしたJSONの要素をNULL値として持つ
 */
var JsonNullvalue = /** @class */ (function (_super) {
    __extends(JsonNullvalue, _super);
    /**
     * コンストラクタ
     */
    function JsonNullvalue() {
        var _this = _super.call(this) || this;
        _this._stringBuffer = 'NullValue';
        return _this;
    }
    /**
     * Valueの種類がNULL値ならtrue
     */
    JsonNullvalue.prototype.isNull = function () {
        return true;
    };
    /**
     * 要素を文字列で返す(csmString型)
     */
    JsonNullvalue.prototype.getString = function (defaultValue, indent) {
        return this._stringBuffer;
    };
    /**
     * Valueの値が静的ならtrue, 静的なら解放しない
     */
    JsonNullvalue.prototype.isStatic = function () {
        return true;
    };
    /**
     * Valueにエラー値をセットする
     */
    JsonNullvalue.prototype.setErrorNotForClientCall = function (s) {
        this._stringBuffer = s;
        return JsonError.nullValue;
    };
    return JsonNullvalue;
}(Value));
exports.JsonNullvalue = JsonNullvalue;
/**
 * パースしたJSONの要素を配列として持つ
 */
var JsonArray = /** @class */ (function (_super) {
    __extends(JsonArray, _super);
    /**
     * コンストラクタ
     */
    function JsonArray() {
        var _this = _super.call(this) || this;
        _this._array = new csmvector_1.csmVector();
        return _this;
    }
    /**
     * デストラクタ相当の処理
     */
    JsonArray.prototype.release = function () {
        for (var ite = this._array.begin(); ite.notEqual(this._array.end()); ite.preIncrement()) {
            var v = ite.ptr();
            if (v && !v.isStatic()) {
                v = void 0;
                v = null;
            }
        }
    };
    /**
     * Valueの種類が配列ならtrue
     */
    JsonArray.prototype.isArray = function () {
        return true;
    };
    /**
     * 添字演算子[index]
     */
    JsonArray.prototype.getValueByIndex = function (index) {
        if (index < 0 || this._array.getSize() <= index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
        }
        var v = this._array.at(index);
        if (v == null) {
            return Value.nullValue;
        }
        return v;
    };
    /**
     * 添字演算子[string | csmString]
     */
    JsonArray.prototype.getValueByString = function (s) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    };
    /**
     * 要素を文字列で返す(csmString型)
     */
    JsonArray.prototype.getString = function (defaultValue, indent) {
        var stringBuffer = indent + '[\n';
        for (var ite = this._array.begin(); ite.notEqual(this._array.end()); ite.increment()) {
            var v = ite.ptr();
            this._stringBuffer += indent + '' + v.getString(indent + ' ') + '\n';
        }
        this._stringBuffer = stringBuffer + indent + ']\n';
        return this._stringBuffer;
    };
    /**
     * 配列要素を追加する
     * @param v 追加する要素
     */
    JsonArray.prototype.add = function (v) {
        this._array.pushBack(v);
    };
    /**
     * 要素をコンテナで返す(csmVector<Value>)
     */
    JsonArray.prototype.getVector = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return this._array;
    };
    /**
     * 要素の数を返す
     */
    JsonArray.prototype.getSize = function () {
        return this._array.getSize();
    };
    return JsonArray;
}(Value));
exports.JsonArray = JsonArray;
/**
 * パースしたJSONの要素をマップとして持つ
 */
var JsonMap = /** @class */ (function (_super) {
    __extends(JsonMap, _super);
    /**
     * コンストラクタ
     */
    function JsonMap() {
        var _this = _super.call(this) || this;
        _this._map = new csmmap_1.csmMap();
        return _this;
    }
    /**
     * デストラクタ相当の処理
     */
    JsonMap.prototype.release = function () {
        var ite = this._map.begin();
        while (ite.notEqual(this._map.end())) {
            var v = ite.ptr().second;
            if (v && !v.isStatic()) {
                v = void 0;
                v = null;
            }
            ite.preIncrement();
        }
    };
    /**
     * Valueの値がMap型ならtrue
     */
    JsonMap.prototype.isMap = function () {
        return true;
    };
    /**
     * 添字演算子[string | csmString]
     */
    JsonMap.prototype.getValueByString = function (s) {
        if (s instanceof csmstring_1.csmString) {
            var ret = this._map.getValue(s.s);
            if (ret == null) {
                return Value.nullValue;
            }
            return ret;
        }
        for (var iter = this._map.begin(); iter.notEqual(this._map.end()); iter.preIncrement()) {
            if (iter.ptr().first == s) {
                if (iter.ptr().second == null) {
                    return Value.nullValue;
                }
                return iter.ptr().second;
            }
        }
        return Value.nullValue;
    };
    /**
     * 添字演算子[index]
     */
    JsonMap.prototype.getValueByIndex = function (index) {
        return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
    };
    /**
     * 要素を文字列で返す(csmString型)
     */
    JsonMap.prototype.getString = function (defaultValue, indent) {
        this._stringBuffer = indent + '{\n';
        var ite = this._map.begin();
        while (ite.notEqual(this._map.end())) {
            var key = ite.ptr().first;
            var v = ite.ptr().second;
            this._stringBuffer +=
                indent + ' ' + key + ' : ' + v.getString(indent + '   ') + ' \n';
            ite.preIncrement();
        }
        this._stringBuffer += indent + '}\n';
        return this._stringBuffer;
    };
    /**
     * 要素をMap型で返す
     */
    JsonMap.prototype.getMap = function (defaultValue) {
        return this._map;
    };
    /**
     * Mapに要素を追加する
     */
    JsonMap.prototype.put = function (key, v) {
        this._map.setValue(key, v);
    };
    /**
     * Mapからキーのリストを取得する
     */
    JsonMap.prototype.getKeys = function () {
        if (!this._keys) {
            this._keys = new csmvector_1.csmVector();
            var ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
                var key = ite.ptr().first;
                this._keys.pushBack(key);
                ite.preIncrement();
            }
        }
        return this._keys;
    };
    /**
     * Mapの要素数を取得する
     */
    JsonMap.prototype.getSize = function () {
        return this._keys.getSize();
    };
    return JsonMap;
}(Value));
exports.JsonMap = JsonMap;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismjson"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismJson = $.CubismJson;
    Live2DCubismFramework.JsonArray = $.JsonArray;
    Live2DCubismFramework.JsonBoolean = $.JsonBoolean;
    Live2DCubismFramework.JsonError = $.JsonError;
    Live2DCubismFramework.JsonFloat = $.JsonFloat;
    Live2DCubismFramework.JsonMap = $.JsonMap;
    Live2DCubismFramework.JsonNullvalue = $.JsonNullvalue;
    Live2DCubismFramework.JsonString = $.JsonString;
    Live2DCubismFramework.Value = $.Value;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismjson.js.map
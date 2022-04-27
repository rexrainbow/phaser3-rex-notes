/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { csmMap } from '../type/csmmap';
import { csmString } from '../type/csmstring';
import { csmVector } from '../type/csmvector';
/**
 * パースしたJSONエレメントの要素の基底クラス。
 */
export declare abstract class Value {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 要素を文字列型で返す(csmString型)
     */
    abstract getString(defaultValue?: string, indent?: string): string;
    /**
     * 要素を文字列型で返す(string)
     */
    getRawString(defaultValue?: string, indent?: string): string;
    /**
     * 要素を数値型で返す(number)
     */
    toInt(defaultValue?: number): number;
    /**
     * 要素を数値型で返す(number)
     */
    toFloat(defaultValue?: number): number;
    /**
     * 要素を真偽値で返す(boolean)
     */
    toBoolean(defaultValue?: boolean): boolean;
    /**
     * サイズを返す
     */
    getSize(): number;
    /**
     * 要素を配列で返す(Value[])
     */
    getArray(defaultValue?: Value[]): Value[];
    /**
     * 要素をコンテナで返す(array)
     */
    getVector(defaultValue?: csmVector<Value>): csmVector<Value>;
    /**
     * 要素をマップで返す(csmMap<csmString, Value>)
     */
    getMap(defaultValue?: csmMap<string, Value>): csmMap<string, Value>;
    /**
     * 添字演算子[index]
     */
    getValueByIndex(index: number): Value;
    /**
     * 添字演算子[string | csmString]
     */
    getValueByString(s: string | csmString): Value;
    /**
     * マップのキー一覧をコンテナで返す
     *
     * @return マップのキーの一覧
     */
    getKeys(): csmVector<string>;
    /**
     * Valueの種類がエラー値ならtrue
     */
    isError(): boolean;
    /**
     * Valueの種類がnullならtrue
     */
    isNull(): boolean;
    /**
     * Valueの種類が真偽値ならtrue
     */
    isBool(): boolean;
    /**
     * Valueの種類が数値型ならtrue
     */
    isFloat(): boolean;
    /**
     * Valueの種類が文字列ならtrue
     */
    isString(): boolean;
    /**
     * Valueの種類が配列ならtrue
     */
    isArray(): boolean;
    /**
     * Valueの種類がマップ型ならtrue
     */
    isMap(): boolean;
    /**
     * 引数の値と等しければtrue
     */
    equals(value: csmString): boolean;
    equals(value: string): boolean;
    equals(value: number): boolean;
    equals(value: boolean): boolean;
    /**
     * Valueの値が静的ならtrue、静的なら解放しない
     */
    isStatic(): boolean;
    /**
     * Valueにエラー値をセットする
     */
    setErrorNotForClientCall(errorStr: string): Value;
    /**
     * 初期化用メソッド
     */
    static staticInitializeNotForClientCall(): void;
    /**
     * リリース用メソッド
     */
    static staticReleaseNotForClientCall(): void;
    protected _stringBuffer: string;
    private static s_dummyKeys;
    static errorValue: Value;
    static nullValue: Value;
}
/**
 * Ascii文字のみ対応した最小限の軽量JSONパーサ。
 * 仕様はJSONのサブセットとなる。
 * 設定ファイル(model3.json)などのロード用
 *
 * [未対応項目]
 * ・日本語などの非ASCII文字
 * ・eによる指数表現
 */
export declare class CubismJson {
    /**
     * コンストラクタ
     */
    constructor(buffer?: ArrayBuffer, length?: number);
    /**
     * バイトデータから直接ロードしてパースする
     *
     * @param buffer バッファ
     * @param size バッファサイズ
     * @return CubismJsonクラスのインスタンス。失敗したらNULL
     */
    static create(buffer: ArrayBuffer, size: number): CubismJson;
    /**
     * パースしたJSONオブジェクトの解放処理
     *
     * @param instance CubismJsonクラスのインスタンス
     */
    static delete(instance: CubismJson): void;
    /**
     * パースしたJSONのルート要素を返す
     */
    getRoot(): Value;
    /**
     *  UnicodeのバイナリをStringに変換
     *
     * @param buffer 変換するバイナリデータ
     * @return 変換後の文字列
     */
    arrayBufferToString(buffer: ArrayBuffer): string;
    /**
     * エンコード、パディング
     */
    private pad;
    /**
     * JSONのパースを実行する
     * @param buffer    パース対象のデータバイト
     * @param size      データバイトのサイズ
     * return true : 成功
     * return false: 失敗
     */
    parseBytes(buffer: ArrayBuffer, size: number): boolean;
    /**
     * パース時のエラー値を返す
     */
    getParseError(): string;
    /**
     * ルート要素の次の要素がファイルの終端だったらtrueを返す
     */
    checkEndOfFile(): boolean;
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
    protected parseValue(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
    /**
     * 次の「"」までの文字列をパースする。
     *
     * @param   string  ->  パース対象の文字列
     * @param   length  ->  パースする長さ
     * @param   begin   ->  パースを開始する位置
     * @param  outEndPos   ->  パース終了時の位置
     * @return      パースした文F字列要素
     */
    protected parseString(string: string, length: number, begin: number, outEndPos: number[]): string;
    /**
     * JSONのオブジェクトエレメントをパースしてValueオブジェクトを返す
     *
     * @param buffer    JSONエレメントのバッファ
     * @param length    パースする長さ
     * @param begin     パースを開始する位置
     * @param outEndPos パース終了時の位置
     * @return パースから取得したValueオブジェクト
     */
    protected parseObject(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
    /**
     * 次の「"」までの文字列をパースする。
     * @param buffer    JSONエレメントのバッファ
     * @param length    パースする長さ
     * @param begin     パースを開始する位置
     * @param outEndPos パース終了時の位置
     * @return パースから取得したValueオブジェクト
     */
    protected parseArray(buffer: string, length: number, begin: number, outEndPos: number[]): Value;
    _error: string;
    _lineCount: number;
    _root: Value;
}
/**
 * パースしたJSONの要素をfloat値として扱う
 */
export declare class JsonFloat extends Value {
    /**
     * コンストラクタ
     */
    constructor(v: number);
    /**
     * Valueの種類が数値型ならtrue
     */
    isFloat(): boolean;
    /**
     * 要素を文字列で返す(csmString型)
     */
    getString(defaultValue: string, indent: string): string;
    /**
     * 要素を数値型で返す(number)
     */
    toInt(defaultValue?: number): number;
    /**
     * 要素を数値型で返す(number)
     */
    toFloat(defaultValue?: number): number;
    /**
     * 引数の値と等しければtrue
     */
    equals(value: csmString): boolean;
    equals(value: string): boolean;
    equals(value: number): boolean;
    equals(value: boolean): boolean;
    private _value;
}
/**
 * パースしたJSONの要素を真偽値として扱う
 */
export declare class JsonBoolean extends Value {
    /**
     * Valueの種類が真偽値ならtrue
     */
    isBool(): boolean;
    /**
     * 要素を真偽値で返す(boolean)
     */
    toBoolean(defaultValue?: boolean): boolean;
    /**
     * 要素を文字列で返す(csmString型)
     */
    getString(defaultValue: string, indent: string): string;
    /**
     * 引数の値と等しければtrue
     */
    equals(value: csmString): boolean;
    equals(value: string): boolean;
    equals(value: number): boolean;
    equals(value: boolean): boolean;
    /**
     * Valueの値が静的ならtrue, 静的なら解放しない
     */
    isStatic(): boolean;
    /**
     * 引数付きコンストラクタ
     */
    constructor(v: boolean);
    static trueValue: JsonBoolean;
    static falseValue: JsonBoolean;
    private _boolValue;
}
/**
 * パースしたJSONの要素を文字列として扱う
 */
export declare class JsonString extends Value {
    /**
     * 引数付きコンストラクタ
     */
    constructor(s: string);
    constructor(s: csmString);
    /**
     * Valueの種類が文字列ならtrue
     */
    isString(): boolean;
    /**
     * 要素を文字列で返す(csmString型)
     */
    getString(defaultValue: string, indent: string): string;
    /**
     * 引数の値と等しければtrue
     */
    equals(value: csmString): boolean;
    equals(value: string): boolean;
    equals(value: number): boolean;
    equals(value: boolean): boolean;
}
/**
 * JSONパース時のエラー結果。文字列型のようにふるまう
 */
export declare class JsonError extends JsonString {
    /**
     * Valueの値が静的ならtrue、静的なら解放しない
     */
    isStatic(): boolean;
    /**
     * エラー情報をセットする
     */
    setErrorNotForClientCall(s: string): Value;
    /**
     * 引数付きコンストラクタ
     */
    constructor(s: csmString | string, isStatic: boolean);
    /**
     * Valueの種類がエラー値ならtrue
     */
    isError(): boolean;
    protected _isStatic: boolean;
}
/**
 * パースしたJSONの要素をNULL値として持つ
 */
export declare class JsonNullvalue extends Value {
    /**
     * Valueの種類がNULL値ならtrue
     */
    isNull(): boolean;
    /**
     * 要素を文字列で返す(csmString型)
     */
    getString(defaultValue: string, indent: string): string;
    /**
     * Valueの値が静的ならtrue, 静的なら解放しない
     */
    isStatic(): boolean;
    /**
     * Valueにエラー値をセットする
     */
    setErrorNotForClientCall(s: string): Value;
    /**
     * コンストラクタ
     */
    constructor();
}
/**
 * パースしたJSONの要素を配列として持つ
 */
export declare class JsonArray extends Value {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * Valueの種類が配列ならtrue
     */
    isArray(): boolean;
    /**
     * 添字演算子[index]
     */
    getValueByIndex(index: number): Value;
    /**
     * 添字演算子[string | csmString]
     */
    getValueByString(s: string | csmString): Value;
    /**
     * 要素を文字列で返す(csmString型)
     */
    getString(defaultValue: string, indent: string): string;
    /**
     * 配列要素を追加する
     * @param v 追加する要素
     */
    add(v: Value): void;
    /**
     * 要素をコンテナで返す(csmVector<Value>)
     */
    getVector(defaultValue?: csmVector<Value>): csmVector<Value>;
    /**
     * 要素の数を返す
     */
    getSize(): number;
    private _array;
}
/**
 * パースしたJSONの要素をマップとして持つ
 */
export declare class JsonMap extends Value {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * Valueの値がMap型ならtrue
     */
    isMap(): boolean;
    /**
     * 添字演算子[string | csmString]
     */
    getValueByString(s: string | csmString): Value;
    /**
     * 添字演算子[index]
     */
    getValueByIndex(index: number): Value;
    /**
     * 要素を文字列で返す(csmString型)
     */
    getString(defaultValue: string, indent: string): string;
    /**
     * 要素をMap型で返す
     */
    getMap(defaultValue?: csmMap<string, Value>): csmMap<string, Value>;
    /**
     * Mapに要素を追加する
     */
    put(key: string, v: Value): void;
    /**
     * Mapからキーのリストを取得する
     */
    getKeys(): csmVector<string>;
    /**
     * Mapの要素数を取得する
     */
    getSize(): number;
    private _map;
    private _keys;
}
import * as $ from './cubismjson';
export declare namespace Live2DCubismFramework {
    const CubismJson: typeof $.CubismJson;
    type CubismJson = $.CubismJson;
    const JsonArray: typeof $.JsonArray;
    type JsonArray = $.JsonArray;
    const JsonBoolean: typeof $.JsonBoolean;
    type JsonBoolean = $.JsonBoolean;
    const JsonError: typeof $.JsonError;
    type JsonError = $.JsonError;
    const JsonFloat: typeof $.JsonFloat;
    type JsonFloat = $.JsonFloat;
    const JsonMap: typeof $.JsonMap;
    type JsonMap = $.JsonMap;
    const JsonNullvalue: typeof $.JsonNullvalue;
    type JsonNullvalue = $.JsonNullvalue;
    const JsonString: typeof $.JsonString;
    type JsonString = $.JsonString;
    const Value: typeof $.Value;
    type Value = $.Value;
}
//# sourceMappingURL=cubismjson.d.ts.map
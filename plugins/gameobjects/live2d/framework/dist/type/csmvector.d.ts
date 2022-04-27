/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * ベクター型（可変配列型）
 */
export declare class csmVector<T> {
    /**
     * 引数付きコンストラクタ
     * @param iniitalCapacity 初期化後のキャパシティ。データサイズは_capacity * sizeof(T)
     * @param zeroClear trueなら初期化時に確保した領域を0で埋める
     */
    constructor(initialCapacity?: number);
    /**
     * インデックスで指定した要素を返す
     */
    at(index: number): T;
    /**
     * 要素をセット
     * @param index 要素をセットするインデックス
     * @param value セットする要素
     */
    set(index: number, value: T): void;
    /**
     * コンテナを取得する
     */
    get(offset?: number): T[];
    /**
     * pushBack処理、コンテナに新たな要素を追加する
     * @param value PushBack処理で追加する値
     */
    pushBack(value: T): void;
    /**
     * コンテナの全要素を解放する
     */
    clear(): void;
    /**
     * コンテナの要素数を返す
     * @return コンテナの要素数
     */
    getSize(): number;
    /**
     * コンテナの全要素に対して代入処理を行う
     * @param newSize 代入処理後のサイズ
     * @param value 要素に代入する値
     */
    assign(newSize: number, value: T): void;
    /**
     * サイズ変更
     */
    resize(newSize: number, value?: T): void;
    /**
     * サイズ変更
     */
    updateSize(newSize: number, value?: any, callPlacementNew?: boolean): void;
    /**
     * コンテナにコンテナ要素を挿入する
     * @param position 挿入する位置
     * @param begin 挿入するコンテナの開始位置
     * @param end 挿入するコンテナの終端位置
     */
    insert(position: iterator<T>, begin: iterator<T>, end: iterator<T>): void;
    /**
     * コンテナからインデックスで指定した要素を削除する
     * @param index インデックス値
     * @return true 削除実行
     * @return false 削除範囲外
     */
    remove(index: number): boolean;
    /**
     * コンテナから要素を削除して他の要素をシフトする
     * @param ite 削除する要素
     */
    erase(ite: iterator<T>): iterator<T>;
    /**
     * コンテナのキャパシティを確保する
     * @param newSize 新たなキャパシティ。引数の値が現在のサイズ未満の場合は何もしない.
     */
    prepareCapacity(newSize: number): void;
    /**
     * コンテナの先頭要素を返す
     */
    begin(): iterator<T>;
    /**
     * コンテナの終端要素を返す
     */
    end(): iterator<T>;
    getOffset(offset: number): csmVector<T>;
    _ptr: T[];
    _size: number;
    _capacity: number;
    static readonly s_defaultSize = 10;
}
export declare class iterator<T> {
    /**
     * コンストラクタ
     */
    constructor(v?: csmVector<T>, index?: number);
    /**
     * 代入
     */
    set(ite: iterator<T>): iterator<T>;
    /**
     * 前置き++演算
     */
    preIncrement(): iterator<T>;
    /**
     * 前置き--演算
     */
    preDecrement(): iterator<T>;
    /**
     * 後置き++演算子
     */
    increment(): iterator<T>;
    /**
     * 後置き--演算子
     */
    decrement(): iterator<T>;
    /**
     * ptr
     */
    ptr(): T;
    /**
     * =演算子のオーバーロード
     */
    substitution(ite: iterator<T>): iterator<T>;
    /**
     * !=演算子のオーバーロード
     */
    notEqual(ite: iterator<T>): boolean;
    _index: number;
    _vector: csmVector<T>;
}
import * as $ from './csmvector';
export declare namespace Live2DCubismFramework {
    const csmVector: typeof $.csmVector;
    type csmVector<T> = $.csmVector<T>;
    const iterator: typeof $.iterator;
    type iterator<T> = $.iterator<T>;
}
//# sourceMappingURL=csmvector.d.ts.map
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * 文字列クラス。
 */
export declare class csmString {
    /**
     * 文字列を後方に追加する
     *
     * @param c 追加する文字列
     * @return 更新された文字列
     */
    append(c: string, length?: number): csmString;
    /**
     * 文字サイズを拡張して文字を埋める
     * @param length    拡張する文字数
     * @param v         埋める文字
     * @return 更新された文字列
     */
    expansion(length: number, v: string): csmString;
    /**
     * 文字列の長さをバイト数で取得する
     */
    getBytes(): number;
    /**
     * 文字列の長さを返す
     */
    getLength(): number;
    /**
     * 文字列比較 <
     * @param s 比較する文字列
     * @return true:    比較する文字列より小さい
     * @return false:   比較する文字列より大きい
     */
    isLess(s: csmString): boolean;
    /**
     * 文字列比較 >
     * @param s 比較する文字列
     * @return true:    比較する文字列より大きい
     * @return false:   比較する文字列より小さい
     */
    isGreat(s: csmString): boolean;
    /**
     * 文字列比較 ==
     * @param s 比較する文字列
     * @return true:    比較する文字列と等しい
     * @return false:   比較する文字列と異なる
     */
    isEqual(s: string): boolean;
    /**
     * 文字列が空かどうか
     * @return true: 空の文字列
     * @return false: 値が設定されている
     */
    isEmpty(): boolean;
    /**
     * 引数付きコンストラクタ
     */
    constructor(s: string);
    s: string;
}
import * as $ from './csmstring';
export declare namespace Live2DCubismFramework {
    const csmString: typeof $.csmString;
    type csmString = $.csmString;
}
//# sourceMappingURL=csmstring.d.ts.map
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
export declare class CubismString {
    /**
     * 標準出力の書式を適用した文字列を取得する。
     * @param format    標準出力の書式指定文字列
     * @param ...args   書式指定文字列に渡す文字列
     * @return 書式を適用した文字列
     */
    static getFormatedString(format: string, ...args: any[]): string;
    /**
     * textがstartWordで始まっているかどうかを返す
     * @param test 検査対象の文字列
     * @param startWord 比較対象の文字列
     * @return true textがstartWordで始まっている
     * @return false textがstartWordで始まっていない
     */
    static isStartWith(text: string, startWord: string): boolean;
    /**
     * position位置の文字から数字を解析する。
     *
     * @param string 文字列
     * @param length 文字列の長さ
     * @param position 解析したい文字の位置
     * @param outEndPos 一文字も読み込まなかった場合はエラー値(-1)が入る
     * @return 解析結果の数値
     */
    static stringToFloat(string: string, length: number, position: number, outEndPos: number[]): number;
    /**
     * コンストラクタ呼び出し不可な静的クラスにする。
     */
    private constructor();
}
import * as $ from './cubismstring';
export declare namespace Live2DCubismFramework {
    const CubismString: typeof $.CubismString;
    type CubismString = $.CubismString;
}
//# sourceMappingURL=cubismstring.d.ts.map
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * 4x4の行列
 *
 * 4x4行列の便利クラス。
 */
export declare class CubismMatrix44 {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 受け取った２つの行列の乗算を行う。
     *
     * @param a 行列a
     * @param b 行列b
     * @return 乗算結果の行列
     */
    static multiply(a: Float32Array, b: Float32Array, dst: Float32Array): void;
    /**
     * 単位行列に初期化する
     */
    loadIdentity(): void;
    /**
     * 行列を設定
     *
     * @param tr 16個の浮動小数点数で表される4x4の行列
     */
    setMatrix(tr: Float32Array): void;
    /**
     * 行列を浮動小数点数の配列で取得
     *
     * @return 16個の浮動小数点数で表される4x4の行列
     */
    getArray(): Float32Array;
    /**
     * X軸の拡大率を取得
     * @return X軸の拡大率
     */
    getScaleX(): number;
    /**
     * Y軸の拡大率を取得する
     *
     * @return Y軸の拡大率
     */
    getScaleY(): number;
    /**
     * X軸の移動量を取得
     * @return X軸の移動量
     */
    getTranslateX(): number;
    /**
     * Y軸の移動量を取得
     * @return Y軸の移動量
     */
    getTranslateY(): number;
    /**
     * X軸の値を現在の行列で計算
     *
     * @param src X軸の値
     * @return 現在の行列で計算されたX軸の値
     */
    transformX(src: number): number;
    /**
     * Y軸の値を現在の行列で計算
     *
     * @param src Y軸の値
     * @return 現在の行列で計算されたY軸の値
     */
    transformY(src: number): number;
    /**
     * X軸の値を現在の行列で逆計算
     */
    invertTransformX(src: number): number;
    /**
     * Y軸の値を現在の行列で逆計算
     */
    invertTransformY(src: number): number;
    /**
     * 現在の行列の位置を起点にして移動
     *
     * 現在の行列の位置を起点にして相対的に移動する。
     *
     * @param x X軸の移動量
     * @param y Y軸の移動量
     */
    translateRelative(x: number, y: number): void;
    /**
     * 現在の行列の位置を移動
     *
     * 現在の行列の位置を指定した位置へ移動する
     *
     * @param x X軸の移動量
     * @param y y軸の移動量
     */
    translate(x: number, y: number): void;
    /**
     * 現在の行列のX軸の位置を指定した位置へ移動する
     *
     * @param x X軸の移動量
     */
    translateX(x: number): void;
    /**
     * 現在の行列のY軸の位置を指定した位置へ移動する
     *
     * @param y Y軸の移動量
     */
    translateY(y: number): void;
    /**
     * 現在の行列の拡大率を相対的に設定する
     *
     * @param x X軸の拡大率
     * @param y Y軸の拡大率
     */
    scaleRelative(x: number, y: number): void;
    /**
     * 現在の行列の拡大率を指定した倍率に設定する
     *
     * @param x X軸の拡大率
     * @param y Y軸の拡大率
     */
    scale(x: number, y: number): void;
    /**
     * 現在の行列に行列を乗算
     *
     * @param m 行列
     */
    multiplyByMatrix(m: CubismMatrix44): void;
    /**
     * オブジェクトのコピーを生成する
     */
    clone(): CubismMatrix44;
    protected _tr: Float32Array;
}
import * as $ from './cubismmatrix44';
export declare namespace Live2DCubismFramework {
    const CubismMatrix44: typeof $.CubismMatrix44;
    type CubismMatrix44 = $.CubismMatrix44;
}
//# sourceMappingURL=cubismmatrix44.d.ts.map
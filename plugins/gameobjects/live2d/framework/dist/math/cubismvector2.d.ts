/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * 2次元ベクトル型
 *
 * 2次元ベクトル型の機能を提供する。
 */
export declare class CubismVector2 {
    x?: number;
    y?: number;
    /**
     * コンストラクタ
     */
    constructor(x?: number, y?: number);
    /**
     * ベクトルの加算
     *
     * @param vector2 加算するベクトル値
     * @return 加算結果 ベクトル値
     */
    add(vector2: CubismVector2): CubismVector2;
    /**
     * ベクトルの減算
     *
     * @param vector2 減算するベクトル値
     * @return 減算結果 ベクトル値
     */
    substract(vector2: CubismVector2): CubismVector2;
    /**
     * ベクトルの乗算
     *
     * @param vector2 乗算するベクトル値
     * @return 乗算結果 ベクトル値
     */
    multiply(vector2: CubismVector2): CubismVector2;
    /**
     * ベクトルの乗算(スカラー)
     *
     * @param scalar 乗算するスカラー値
     * @return 乗算結果 ベクトル値
     */
    multiplyByScaler(scalar: number): CubismVector2;
    /**
     * ベクトルの除算
     *
     * @param vector2 除算するベクトル値
     * @return 除算結果 ベクトル値
     */
    division(vector2: CubismVector2): CubismVector2;
    /**
     * ベクトルの除算(スカラー)
     *
     * @param scalar 除算するスカラー値
     * @return 除算結果 ベクトル値
     */
    divisionByScalar(scalar: number): CubismVector2;
    /**
     * ベクトルの長さを取得する
     *
     * @return ベクトルの長さ
     */
    getLength(): number;
    /**
     * ベクトルの距離の取得
     *
     * @param a 点
     * @return ベクトルの距離
     */
    getDistanceWith(a: CubismVector2): number;
    /**
     * ドット積の計算
     *
     * @param a 値
     * @return 結果
     */
    dot(a: CubismVector2): number;
    /**
     * 正規化の適用
     */
    normalize(): void;
    /**
     * 等しさの確認（等しいか？）
     *
     * 値が等しいか？
     *
     * @param rhs 確認する値
     * @return true 値は等しい
     * @return false 値は等しくない
     */
    isEqual(rhs: CubismVector2): boolean;
    /**
     * 等しさの確認（等しくないか？）
     *
     * 値が等しくないか？
     *
     * @param rhs 確認する値
     * @return true 値は等しくない
     * @return false 値は等しい
     */
    isNotEqual(rhs: CubismVector2): boolean;
}
import * as $ from './cubismvector2';
export declare namespace Live2DCubismFramework {
    const CubismVector2: typeof $.CubismVector2;
    type CubismVector2 = $.CubismVector2;
}
//# sourceMappingURL=cubismvector2.d.ts.map
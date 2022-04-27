/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismVector2 } from './cubismvector2';
/**
 * 数値計算などに使用するユーティリティクラス
 */
export declare class CubismMath {
    static readonly Epsilon: number;
    /**
     * 第一引数の値を最小値と最大値の範囲に収めた値を返す
     *
     * @param value 収められる値
     * @param min   範囲の最小値
     * @param max   範囲の最大値
     * @return 最小値と最大値の範囲に収めた値
     */
    static range(value: number, min: number, max: number): number;
    /**
     * サイン関数の値を求める
     *
     * @param x 角度値（ラジアン）
     * @return サイン関数sin(x)の値
     */
    static sin(x: number): number;
    /**
     * コサイン関数の値を求める
     *
     * @param x 角度値(ラジアン)
     * @return コサイン関数cos(x)の値
     */
    static cos(x: number): number;
    /**
     * 値の絶対値を求める
     *
     * @param x 絶対値を求める値
     * @return 値の絶対値
     */
    static abs(x: number): number;
    /**
     * 平方根(ルート)を求める
     * @param x -> 平方根を求める値
     * @return 値の平方根
     */
    static sqrt(x: number): number;
    /**
     * 立方根を求める
     * @param x -> 立方根を求める値
     * @return 値の立方根
     */
    static cbrt(x: number): number;
    /**
     * イージング処理されたサインを求める
     * フェードイン・アウト時のイージングに利用できる
     *
     * @param value イージングを行う値
     * @return イージング処理されたサイン値
     */
    static getEasingSine(value: number): number;
    /**
     * 大きい方の値を返す
     *
     * @param left 左辺の値
     * @param right 右辺の値
     * @return 大きい方の値
     */
    static max(left: number, right: number): number;
    /**
     * 小さい方の値を返す
     *
     * @param left  左辺の値
     * @param right 右辺の値
     * @return 小さい方の値
     */
    static min(left: number, right: number): number;
    /**
     * 角度値をラジアン値に変換する
     *
     * @param degrees   角度値
     * @return 角度値から変換したラジアン値
     */
    static degreesToRadian(degrees: number): number;
    /**
     * ラジアン値を角度値に変換する
     *
     * @param radian    ラジアン値
     * @return ラジアン値から変換した角度値
     */
    static radianToDegrees(radian: number): number;
    /**
     * ２つのベクトルからラジアン値を求める
     *
     * @param from  始点ベクトル
     * @param to    終点ベクトル
     * @return ラジアン値から求めた方向ベクトル
     */
    static directionToRadian(from: CubismVector2, to: CubismVector2): number;
    /**
     * ２つのベクトルから角度値を求める
     *
     * @param from  始点ベクトル
     * @param to    終点ベクトル
     * @return 角度値から求めた方向ベクトル
     */
    static directionToDegrees(from: CubismVector2, to: CubismVector2): number;
    /**
     * ラジアン値を方向ベクトルに変換する。
     *
     * @param totalAngle    ラジアン値
     * @return ラジアン値から変換した方向ベクトル
     */
    static radianToDirection(totalAngle: number): CubismVector2;
    /**
     * 三次方程式の三次項の係数が0になったときに補欠的に二次方程式の解をもとめる。
     * a * x^2 + b * x + c = 0
     *
     * @param   a -> 二次項の係数値
     * @param   b -> 一次項の係数値
     * @param   c -> 定数項の値
     * @return  二次方程式の解
     */
    static quadraticEquation(a: number, b: number, c: number): number;
    /**
     * カルダノの公式によってベジェのt値に該当する３次方程式の解を求める。
     * 重解になったときには0.0～1.0の値になる解を返す。
     *
     * a * x^3 + b * x^2 + c * x + d = 0
     *
     * @param   a -> 三次項の係数値
     * @param   b -> 二次項の係数値
     * @param   c -> 一次項の係数値
     * @param   d -> 定数項の値
     * @return  0.0～1.0の間にある解
     */
    static cardanoAlgorithmForBezier(a: number, b: number, c: number, d: number): number;
    /**
     * コンストラクタ
     */
    private constructor();
}
import * as $ from './cubismmath';
export declare namespace Live2DCubismFramework {
    const CubismMath: typeof $.CubismMath;
    type CubismMath = $.CubismMath;
}
//# sourceMappingURL=cubismmath.d.ts.map
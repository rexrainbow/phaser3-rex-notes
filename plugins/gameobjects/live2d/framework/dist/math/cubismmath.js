"use strict";
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cubismvector2_1 = require("./cubismvector2");
/**
 * 数値計算などに使用するユーティリティクラス
 */
var CubismMath = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismMath() {
    }
    /**
     * 第一引数の値を最小値と最大値の範囲に収めた値を返す
     *
     * @param value 収められる値
     * @param min   範囲の最小値
     * @param max   範囲の最大値
     * @return 最小値と最大値の範囲に収めた値
     */
    CubismMath.range = function (value, min, max) {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    };
    /**
     * サイン関数の値を求める
     *
     * @param x 角度値（ラジアン）
     * @return サイン関数sin(x)の値
     */
    CubismMath.sin = function (x) {
        return Math.sin(x);
    };
    /**
     * コサイン関数の値を求める
     *
     * @param x 角度値(ラジアン)
     * @return コサイン関数cos(x)の値
     */
    CubismMath.cos = function (x) {
        return Math.cos(x);
    };
    /**
     * 値の絶対値を求める
     *
     * @param x 絶対値を求める値
     * @return 値の絶対値
     */
    CubismMath.abs = function (x) {
        return Math.abs(x);
    };
    /**
     * 平方根(ルート)を求める
     * @param x -> 平方根を求める値
     * @return 値の平方根
     */
    CubismMath.sqrt = function (x) {
        return Math.sqrt(x);
    };
    /**
     * 立方根を求める
     * @param x -> 立方根を求める値
     * @return 値の立方根
     */
    CubismMath.cbrt = function (x) {
        if (x === 0) {
            return x;
        }
        var cx = x;
        var isNegativeNumber = cx < 0;
        if (isNegativeNumber) {
            cx = -cx;
        }
        var ret;
        if (cx === Infinity) {
            ret = Infinity;
        }
        else {
            ret = Math.exp(Math.log(cx) / 3);
            ret = (cx / (ret * ret) + 2 * ret) / 3;
        }
        return isNegativeNumber ? -ret : ret;
    };
    /**
     * イージング処理されたサインを求める
     * フェードイン・アウト時のイージングに利用できる
     *
     * @param value イージングを行う値
     * @return イージング処理されたサイン値
     */
    CubismMath.getEasingSine = function (value) {
        if (value < 0.0) {
            return 0.0;
        }
        else if (value > 1.0) {
            return 1.0;
        }
        return 0.5 - 0.5 * this.cos(value * Math.PI);
    };
    /**
     * 大きい方の値を返す
     *
     * @param left 左辺の値
     * @param right 右辺の値
     * @return 大きい方の値
     */
    CubismMath.max = function (left, right) {
        return left > right ? left : right;
    };
    /**
     * 小さい方の値を返す
     *
     * @param left  左辺の値
     * @param right 右辺の値
     * @return 小さい方の値
     */
    CubismMath.min = function (left, right) {
        return left > right ? right : left;
    };
    /**
     * 角度値をラジアン値に変換する
     *
     * @param degrees   角度値
     * @return 角度値から変換したラジアン値
     */
    CubismMath.degreesToRadian = function (degrees) {
        return (degrees / 180.0) * Math.PI;
    };
    /**
     * ラジアン値を角度値に変換する
     *
     * @param radian    ラジアン値
     * @return ラジアン値から変換した角度値
     */
    CubismMath.radianToDegrees = function (radian) {
        return (radian * 180.0) / Math.PI;
    };
    /**
     * ２つのベクトルからラジアン値を求める
     *
     * @param from  始点ベクトル
     * @param to    終点ベクトル
     * @return ラジアン値から求めた方向ベクトル
     */
    CubismMath.directionToRadian = function (from, to) {
        var q1 = Math.atan2(to.y, to.x);
        var q2 = Math.atan2(from.y, from.x);
        var ret = q1 - q2;
        while (ret < -Math.PI) {
            ret += Math.PI * 2.0;
        }
        while (ret > Math.PI) {
            ret -= Math.PI * 2.0;
        }
        return ret;
    };
    /**
     * ２つのベクトルから角度値を求める
     *
     * @param from  始点ベクトル
     * @param to    終点ベクトル
     * @return 角度値から求めた方向ベクトル
     */
    CubismMath.directionToDegrees = function (from, to) {
        var radian = this.directionToRadian(from, to);
        var degree = this.radianToDegrees(radian);
        if (to.x - from.x > 0.0) {
            degree = -degree;
        }
        return degree;
    };
    /**
     * ラジアン値を方向ベクトルに変換する。
     *
     * @param totalAngle    ラジアン値
     * @return ラジアン値から変換した方向ベクトル
     */
    CubismMath.radianToDirection = function (totalAngle) {
        var ret = new cubismvector2_1.CubismVector2();
        ret.x = this.sin(totalAngle);
        ret.y = this.cos(totalAngle);
        return ret;
    };
    /**
     * 三次方程式の三次項の係数が0になったときに補欠的に二次方程式の解をもとめる。
     * a * x^2 + b * x + c = 0
     *
     * @param   a -> 二次項の係数値
     * @param   b -> 一次項の係数値
     * @param   c -> 定数項の値
     * @return  二次方程式の解
     */
    CubismMath.quadraticEquation = function (a, b, c) {
        if (this.abs(a) < CubismMath.Epsilon) {
            if (this.abs(b) < CubismMath.Epsilon) {
                return -c;
            }
            return -c / b;
        }
        return -(b + this.sqrt(b * b - 4.0 * a * c)) / (2.0 * a);
    };
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
    CubismMath.cardanoAlgorithmForBezier = function (a, b, c, d) {
        if (this.sqrt(a) < CubismMath.Epsilon) {
            return this.range(this.quadraticEquation(b, c, d), 0.0, 1.0);
        }
        var ba = b / a;
        var ca = c / a;
        var da = d / a;
        var p = (3.0 * ca - ba * ba) / 3.0;
        var p3 = p / 3.0;
        var q = (2.0 * ba * ba * ba - 9.0 * ba * ca + 27.0 * da) / 27.0;
        var q2 = q / 2.0;
        var discriminant = q2 * q2 + p3 * p3 * p3;
        var center = 0.5;
        var threshold = center + 0.01;
        if (discriminant < 0.0) {
            var mp3 = -p / 3.0;
            var mp33 = mp3 * mp3 * mp3;
            var r = this.sqrt(mp33);
            var t = -q / (2.0 * r);
            var cosphi = this.range(t, -1.0, 1.0);
            var phi = Math.acos(cosphi);
            var crtr = this.cbrt(r);
            var t1 = 2.0 * crtr;
            var root1_1 = t1 * this.cos(phi / 3.0) - ba / 3.0;
            if (this.abs(root1_1 - center) < threshold) {
                return this.range(root1_1, 0.0, 1.0);
            }
            var root2 = t1 * this.cos((phi + 2.0 * Math.PI) / 3.0) - ba / 3.0;
            if (this.abs(root2 - center) < threshold) {
                return this.range(root2, 0.0, 1.0);
            }
            var root3 = t1 * this.cos((phi + 4.0 * Math.PI) / 3.0) - ba / 3.0;
            return this.range(root3, 0.0, 1.0);
        }
        if (discriminant == 0.0) {
            var u1_1;
            if (q2 < 0.0) {
                u1_1 = this.cbrt(-q2);
            }
            else {
                u1_1 = -this.cbrt(q2);
            }
            var root1_2 = 2.0 * u1_1 - ba / 3.0;
            if (this.abs(root1_2 - center) < threshold) {
                return this.range(root1_2, 0.0, 1.0);
            }
            var root2 = -u1_1 - ba / 3.0;
            return this.range(root2, 0.0, 1.0);
        }
        var sd = this.sqrt(discriminant);
        var u1 = this.cbrt(sd - q2);
        var v1 = this.cbrt(sd + q2);
        var root1 = u1 - v1 - ba / 3.0;
        return this.range(root1, 0.0, 1.0);
    };
    CubismMath.Epsilon = 0.00001;
    return CubismMath;
}());
exports.CubismMath = CubismMath;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmath"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMath = $.CubismMath;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmath.js.map
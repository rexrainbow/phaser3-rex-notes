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
/**
 * 4x4の行列
 *
 * 4x4行列の便利クラス。
 */
var CubismMatrix44 = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismMatrix44() {
        this._tr = new Float32Array(16); // 4 * 4のサイズ
        this.loadIdentity();
    }
    /**
     * 受け取った２つの行列の乗算を行う。
     *
     * @param a 行列a
     * @param b 行列b
     * @return 乗算結果の行列
     */
    CubismMatrix44.multiply = function (a, b, dst) {
        var c = new Float32Array([
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]);
        var n = 4;
        for (var i = 0; i < n; ++i) {
            for (var j = 0; j < n; ++j) {
                for (var k = 0; k < n; ++k) {
                    c[j + i * 4] += a[k + i * 4] * b[j + k * 4];
                }
            }
        }
        for (var i = 0; i < 16; ++i) {
            dst[i] = c[i];
        }
    };
    /**
     * 単位行列に初期化する
     */
    CubismMatrix44.prototype.loadIdentity = function () {
        var c = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0
        ]);
        this.setMatrix(c);
    };
    /**
     * 行列を設定
     *
     * @param tr 16個の浮動小数点数で表される4x4の行列
     */
    CubismMatrix44.prototype.setMatrix = function (tr) {
        for (var i = 0; i < 16; ++i) {
            this._tr[i] = tr[i];
        }
    };
    /**
     * 行列を浮動小数点数の配列で取得
     *
     * @return 16個の浮動小数点数で表される4x4の行列
     */
    CubismMatrix44.prototype.getArray = function () {
        return this._tr;
    };
    /**
     * X軸の拡大率を取得
     * @return X軸の拡大率
     */
    CubismMatrix44.prototype.getScaleX = function () {
        return this._tr[0];
    };
    /**
     * Y軸の拡大率を取得する
     *
     * @return Y軸の拡大率
     */
    CubismMatrix44.prototype.getScaleY = function () {
        return this._tr[5];
    };
    /**
     * X軸の移動量を取得
     * @return X軸の移動量
     */
    CubismMatrix44.prototype.getTranslateX = function () {
        return this._tr[12];
    };
    /**
     * Y軸の移動量を取得
     * @return Y軸の移動量
     */
    CubismMatrix44.prototype.getTranslateY = function () {
        return this._tr[13];
    };
    /**
     * X軸の値を現在の行列で計算
     *
     * @param src X軸の値
     * @return 現在の行列で計算されたX軸の値
     */
    CubismMatrix44.prototype.transformX = function (src) {
        return this._tr[0] * src + this._tr[12];
    };
    /**
     * Y軸の値を現在の行列で計算
     *
     * @param src Y軸の値
     * @return 現在の行列で計算されたY軸の値
     */
    CubismMatrix44.prototype.transformY = function (src) {
        return this._tr[5] * src + this._tr[13];
    };
    /**
     * X軸の値を現在の行列で逆計算
     */
    CubismMatrix44.prototype.invertTransformX = function (src) {
        return (src - this._tr[12]) / this._tr[0];
    };
    /**
     * Y軸の値を現在の行列で逆計算
     */
    CubismMatrix44.prototype.invertTransformY = function (src) {
        return (src - this._tr[13]) / this._tr[5];
    };
    /**
     * 現在の行列の位置を起点にして移動
     *
     * 現在の行列の位置を起点にして相対的に移動する。
     *
     * @param x X軸の移動量
     * @param y Y軸の移動量
     */
    CubismMatrix44.prototype.translateRelative = function (x, y) {
        var tr1 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            x,
            y,
            0.0,
            1.0
        ]);
        CubismMatrix44.multiply(tr1, this._tr, this._tr);
    };
    /**
     * 現在の行列の位置を移動
     *
     * 現在の行列の位置を指定した位置へ移動する
     *
     * @param x X軸の移動量
     * @param y y軸の移動量
     */
    CubismMatrix44.prototype.translate = function (x, y) {
        this._tr[12] = x;
        this._tr[13] = y;
    };
    /**
     * 現在の行列のX軸の位置を指定した位置へ移動する
     *
     * @param x X軸の移動量
     */
    CubismMatrix44.prototype.translateX = function (x) {
        this._tr[12] = x;
    };
    /**
     * 現在の行列のY軸の位置を指定した位置へ移動する
     *
     * @param y Y軸の移動量
     */
    CubismMatrix44.prototype.translateY = function (y) {
        this._tr[13] = y;
    };
    /**
     * 現在の行列の拡大率を相対的に設定する
     *
     * @param x X軸の拡大率
     * @param y Y軸の拡大率
     */
    CubismMatrix44.prototype.scaleRelative = function (x, y) {
        var tr1 = new Float32Array([
            x,
            0.0,
            0.0,
            0.0,
            0.0,
            y,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0
        ]);
        CubismMatrix44.multiply(tr1, this._tr, this._tr);
    };
    /**
     * 現在の行列の拡大率を指定した倍率に設定する
     *
     * @param x X軸の拡大率
     * @param y Y軸の拡大率
     */
    CubismMatrix44.prototype.scale = function (x, y) {
        this._tr[0] = x;
        this._tr[5] = y;
    };
    /**
     * 現在の行列に行列を乗算
     *
     * @param m 行列
     */
    CubismMatrix44.prototype.multiplyByMatrix = function (m) {
        CubismMatrix44.multiply(m.getArray(), this._tr, this._tr);
    };
    /**
     * オブジェクトのコピーを生成する
     */
    CubismMatrix44.prototype.clone = function () {
        var cloneMatrix = new CubismMatrix44();
        for (var i = 0; i < this._tr.length; i++) {
            cloneMatrix._tr[i] = this._tr[i];
        }
        return cloneMatrix;
    };
    return CubismMatrix44;
}());
exports.CubismMatrix44 = CubismMatrix44;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmatrix44"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMatrix44 = $.CubismMatrix44;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmatrix44.js.map
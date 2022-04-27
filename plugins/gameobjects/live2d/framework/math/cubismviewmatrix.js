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
var cubismmatrix44_1 = require("./cubismmatrix44");
/**
 * カメラの位置変更に使うと便利な4x4行列
 *
 * カメラの位置変更に使うと便利な4x4行列のクラス。
 */
var CubismViewMatrix = /** @class */ (function (_super) {
    __extends(CubismViewMatrix, _super);
    /**
     * コンストラクタ
     */
    function CubismViewMatrix() {
        var _this = _super.call(this) || this;
        _this._screenLeft = 0.0;
        _this._screenRight = 0.0;
        _this._screenTop = 0.0;
        _this._screenBottom = 0.0;
        _this._maxLeft = 0.0;
        _this._maxRight = 0.0;
        _this._maxTop = 0.0;
        _this._maxBottom = 0.0;
        _this._maxScale = 0.0;
        _this._minScale = 0.0;
        return _this;
    }
    /**
     * 移動を調整
     *
     * @param x X軸の移動量
     * @param y Y軸の移動量
     */
    CubismViewMatrix.prototype.adjustTranslate = function (x, y) {
        if (this._tr[0] * this._maxLeft + (this._tr[12] + x) > this._screenLeft) {
            x = this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12];
        }
        if (this._tr[0] * this._maxRight + (this._tr[12] + x) < this._screenRight) {
            x = this._screenRight - this._tr[0] * this._maxRight - this._tr[12];
        }
        if (this._tr[5] * this._maxTop + (this._tr[13] + y) < this._screenTop) {
            y = this._screenTop - this._tr[5] * this._maxTop - this._tr[13];
        }
        if (this._tr[5] * this._maxBottom + (this._tr[13] + y) >
            this._screenBottom) {
            y = this._screenBottom - this._tr[5] * this._maxBottom - this._tr[13];
        }
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
        cubismmatrix44_1.CubismMatrix44.multiply(tr1, this._tr, this._tr);
    };
    /**
     * 拡大率を調整
     *
     * @param cx 拡大を行うX軸の中心位置
     * @param cy 拡大を行うY軸の中心位置
     * @param scale 拡大率
     */
    CubismViewMatrix.prototype.adjustScale = function (cx, cy, scale) {
        var maxScale = this.getMaxScale();
        var minScale = this.getMinScale();
        var targetScale = scale * this._tr[0];
        if (targetScale < minScale) {
            if (this._tr[0] > 0.0) {
                scale = minScale / this._tr[0];
            }
        }
        else if (targetScale > maxScale) {
            if (this._tr[0] > 0.0) {
                scale = maxScale / this._tr[0];
            }
        }
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
            cx,
            cy,
            0.0,
            1.0
        ]);
        var tr2 = new Float32Array([
            scale,
            0.0,
            0.0,
            0.0,
            0.0,
            scale,
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
        var tr3 = new Float32Array([
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
            -cx,
            -cy,
            0.0,
            1.0
        ]);
        cubismmatrix44_1.CubismMatrix44.multiply(tr3, this._tr, this._tr);
        cubismmatrix44_1.CubismMatrix44.multiply(tr2, this._tr, this._tr);
        cubismmatrix44_1.CubismMatrix44.multiply(tr1, this._tr, this._tr);
    };
    /**
     * デバイスに対応する論理座養生の範囲の設定
     *
     * @param left      左辺のX軸の位置
     * @param right     右辺のX軸の位置
     * @param bottom    下辺のY軸の位置
     * @param top       上辺のY軸の位置
     */
    CubismViewMatrix.prototype.setScreenRect = function (left, right, bottom, top) {
        this._screenLeft = left;
        this._screenRight = right;
        this._screenBottom = bottom;
        this._screenTop = top;
    };
    /**
     * デバイスに対応する論理座標上の移動可能範囲の設定
     * @param left      左辺のX軸の位置
     * @param right     右辺のX軸の位置
     * @param bottom    下辺のY軸の位置
     * @param top       上辺のY軸の位置
     */
    CubismViewMatrix.prototype.setMaxScreenRect = function (left, right, bottom, top) {
        this._maxLeft = left;
        this._maxRight = right;
        this._maxTop = top;
        this._maxBottom = bottom;
    };
    /**
     * 最大拡大率の設定
     * @param maxScale 最大拡大率
     */
    CubismViewMatrix.prototype.setMaxScale = function (maxScale) {
        this._maxScale = maxScale;
    };
    /**
     * 最小拡大率の設定
     * @param minScale 最小拡大率
     */
    CubismViewMatrix.prototype.setMinScale = function (minScale) {
        this._minScale = minScale;
    };
    /**
     * 最大拡大率の取得
     * @return 最大拡大率
     */
    CubismViewMatrix.prototype.getMaxScale = function () {
        return this._maxScale;
    };
    /**
     * 最小拡大率の取得
     * @return 最小拡大率
     */
    CubismViewMatrix.prototype.getMinScale = function () {
        return this._minScale;
    };
    /**
     * 拡大率が最大になっているかを確認する
     *
     * @return true 拡大率は最大
     * @return false 拡大率は最大ではない
     */
    CubismViewMatrix.prototype.isMaxScale = function () {
        return this.getScaleX() >= this._maxScale;
    };
    /**
     * 拡大率が最小になっているかを確認する
     *
     * @return true 拡大率は最小
     * @return false 拡大率は最小ではない
     */
    CubismViewMatrix.prototype.isMinScale = function () {
        return this.getScaleX() <= this._minScale;
    };
    /**
     * デバイスに対応する論理座標の左辺のＸ軸位置を取得する
     * @return デバイスに対応する論理座標の左辺のX軸位置
     */
    CubismViewMatrix.prototype.getScreenLeft = function () {
        return this._screenLeft;
    };
    /**
     * デバイスに対応する論理座標の右辺のＸ軸位置を取得する
     * @return デバイスに対応する論理座標の右辺のX軸位置
     */
    CubismViewMatrix.prototype.getScreenRight = function () {
        return this._screenRight;
    };
    /**
     * デバイスに対応する論理座標の下辺のY軸位置を取得する
     * @return デバイスに対応する論理座標の下辺のY軸位置
     */
    CubismViewMatrix.prototype.getScreenBottom = function () {
        return this._screenBottom;
    };
    /**
     * デバイスに対応する論理座標の上辺のY軸位置を取得する
     * @return デバイスに対応する論理座標の上辺のY軸位置
     */
    CubismViewMatrix.prototype.getScreenTop = function () {
        return this._screenTop;
    };
    /**
     * 左辺のX軸位置の最大値の取得
     * @return 左辺のX軸位置の最大値
     */
    CubismViewMatrix.prototype.getMaxLeft = function () {
        return this._maxLeft;
    };
    /**
     * 右辺のX軸位置の最大値の取得
     * @return 右辺のX軸位置の最大値
     */
    CubismViewMatrix.prototype.getMaxRight = function () {
        return this._maxRight;
    };
    /**
     * 下辺のY軸位置の最大値の取得
     * @return 下辺のY軸位置の最大値
     */
    CubismViewMatrix.prototype.getMaxBottom = function () {
        return this._maxBottom;
    };
    /**
     * 上辺のY軸位置の最大値の取得
     * @return 上辺のY軸位置の最大値
     */
    CubismViewMatrix.prototype.getMaxTop = function () {
        return this._maxTop;
    };
    return CubismViewMatrix;
}(cubismmatrix44_1.CubismMatrix44));
exports.CubismViewMatrix = CubismViewMatrix;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismviewmatrix"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismViewMatrix = $.CubismViewMatrix;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismviewmatrix.js.map
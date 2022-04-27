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
 * 矩形形状（座標・長さはfloat値）を定義するクラス
 */
var csmRect = /** @class */ (function () {
    /**
     * コンストラクタ
     * @param x 左端X座標
     * @param y 上端Y座標
     * @param w 幅
     * @param h 高さ
     */
    function csmRect(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    /**
     * 矩形中央のX座標を取得する
     */
    csmRect.prototype.getCenterX = function () {
        return this.x + 0.5 * this.width;
    };
    /**
     * 矩形中央のY座標を取得する
     */
    csmRect.prototype.getCenterY = function () {
        return this.y + 0.5 * this.height;
    };
    /**
     * 右側のX座標を取得する
     */
    csmRect.prototype.getRight = function () {
        return this.x + this.width;
    };
    /**
     * 下端のY座標を取得する
     */
    csmRect.prototype.getBottom = function () {
        return this.y + this.height;
    };
    /**
     * 矩形に値をセットする
     * @param r 矩形のインスタンス
     */
    csmRect.prototype.setRect = function (r) {
        this.x = r.x;
        this.y = r.y;
        this.width = r.width;
        this.height = r.height;
    };
    /**
     * 矩形中央を軸にして縦横を拡縮する
     * @param w 幅方向に拡縮する量
     * @param h 高さ方向に拡縮する量
     */
    csmRect.prototype.expand = function (w, h) {
        this.x -= w;
        this.y -= h;
        this.width += w * 2.0;
        this.height += h * 2.0;
    };
    return csmRect;
}());
exports.csmRect = csmRect;
// Namespace definition for compatibility.
var $ = __importStar(require("./csmrectf"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.csmRect = $.csmRect;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=csmrectf.js.map
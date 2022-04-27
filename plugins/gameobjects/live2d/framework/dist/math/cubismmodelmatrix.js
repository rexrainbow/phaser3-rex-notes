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
 * モデル座標設定用の4x4行列
 *
 * モデル座標設定用の4x4行列クラス
 */
var CubismModelMatrix = /** @class */ (function (_super) {
    __extends(CubismModelMatrix, _super);
    /**
     * コンストラクタ
     *
     * @param w 横幅
     * @param h 縦幅
     */
    function CubismModelMatrix(w, h) {
        var _this = _super.call(this) || this;
        _this._width = w !== undefined ? w : 0.0;
        _this._height = h !== undefined ? h : 0.0;
        _this.setHeight(2.0);
        return _this;
    }
    /**
     * 横幅を設定
     *
     * @param w 横幅
     */
    CubismModelMatrix.prototype.setWidth = function (w) {
        var scaleX = w / this._width;
        var scaleY = scaleX;
        this.scale(scaleX, scaleY);
    };
    /**
     * 縦幅を設定
     * @param h 縦幅
     */
    CubismModelMatrix.prototype.setHeight = function (h) {
        var scaleX = h / this._height;
        var scaleY = scaleX;
        this.scale(scaleX, scaleY);
    };
    /**
     * 位置を設定
     *
     * @param x X軸の位置
     * @param y Y軸の位置
     */
    CubismModelMatrix.prototype.setPosition = function (x, y) {
        this.translate(x, y);
    };
    /**
     * 中心位置を設定
     *
     * @param x X軸の中心位置
     * @param y Y軸の中心位置
     *
     * @note widthかheightを設定したあとでないと、拡大率が正しく取得できないためずれる。
     */
    CubismModelMatrix.prototype.setCenterPosition = function (x, y) {
        this.centerX(x);
        this.centerY(y);
    };
    /**
     * 上辺の位置を設定する
     *
     * @param y 上辺のY軸位置
     */
    CubismModelMatrix.prototype.top = function (y) {
        this.setY(y);
    };
    /**
     * 下辺の位置を設定する
     *
     * @param y 下辺のY軸位置
     */
    CubismModelMatrix.prototype.bottom = function (y) {
        var h = this._height * this.getScaleY();
        this.translateY(y - h);
    };
    /**
     * 左辺の位置を設定
     *
     * @param x 左辺のX軸位置
     */
    CubismModelMatrix.prototype.left = function (x) {
        this.setX(x);
    };
    /**
     * 右辺の位置を設定
     *
     * @param x 右辺のX軸位置
     */
    CubismModelMatrix.prototype.right = function (x) {
        var w = this._width * this.getScaleX();
        this.translateX(x - w);
    };
    /**
     * X軸の中心位置を設定
     *
     * @param x X軸の中心位置
     */
    CubismModelMatrix.prototype.centerX = function (x) {
        var w = this._width * this.getScaleX();
        this.translateX(x - w / 2.0);
    };
    /**
     * X軸の位置を設定
     *
     * @param x X軸の位置
     */
    CubismModelMatrix.prototype.setX = function (x) {
        this.translateX(x);
    };
    /**
     * Y軸の中心位置を設定
     *
     * @param y Y軸の中心位置
     */
    CubismModelMatrix.prototype.centerY = function (y) {
        var h = this._height * this.getScaleY();
        this.translateY(y - h / 2.0);
    };
    /**
     * Y軸の位置を設定する
     *
     * @param y Y軸の位置
     */
    CubismModelMatrix.prototype.setY = function (y) {
        this.translateY(y);
    };
    /**
     * レイアウト情報から位置を設定
     *
     * @param layout レイアウト情報
     */
    CubismModelMatrix.prototype.setupFromLayout = function (layout) {
        var keyWidth = 'width';
        var keyHeight = 'height';
        var keyX = 'x';
        var keyY = 'y';
        var keyCenterX = 'center_x';
        var keyCenterY = 'center_y';
        var keyTop = 'top';
        var keyBottom = 'bottom';
        var keyLeft = 'left';
        var keyRight = 'right';
        for (var ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
            var key = ite.ptr().first;
            var value = ite.ptr().second;
            if (key == keyWidth) {
                this.setWidth(value);
            }
            else if (key == keyHeight) {
                this.setHeight(value);
            }
        }
        for (var ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
            var key = ite.ptr().first;
            var value = ite.ptr().second;
            if (key == keyX) {
                this.setX(value);
            }
            else if (key == keyY) {
                this.setY(value);
            }
            else if (key == keyCenterX) {
                this.centerX(value);
            }
            else if (key == keyCenterY) {
                this.centerY(value);
            }
            else if (key == keyTop) {
                this.top(value);
            }
            else if (key == keyBottom) {
                this.bottom(value);
            }
            else if (key == keyLeft) {
                this.left(value);
            }
            else if (key == keyRight) {
                this.right(value);
            }
        }
    };
    return CubismModelMatrix;
}(cubismmatrix44_1.CubismMatrix44));
exports.CubismModelMatrix = CubismModelMatrix;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmodelmatrix"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelMatrix = $.CubismModelMatrix;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmodelmatrix.js.map
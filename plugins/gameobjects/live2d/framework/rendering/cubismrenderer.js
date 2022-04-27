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
var cubismmatrix44_1 = require("../math/cubismmatrix44");
/**
 * モデル描画を処理するレンダラ
 *
 * サブクラスに環境依存の描画命令を記述する。
 */
var CubismRenderer = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismRenderer() {
        this._isCulling = false;
        this._isPremultipliedAlpha = false;
        this._anisortopy = 0.0;
        this._model = null;
        this._modelColor = new CubismTextureColor();
        // 単位行列に初期化
        this._mvpMatrix4x4 = new cubismmatrix44_1.CubismMatrix44();
        this._mvpMatrix4x4.loadIdentity();
    }
    /**
     * レンダラのインスタンスを生成して取得する
     *
     * @return レンダラのインスタンス
     */
    CubismRenderer.create = function () {
        return null;
    };
    /**
     * レンダラのインスタンスを解放する
     */
    CubismRenderer.delete = function (renderer) {
        renderer = null;
    };
    /**
     * レンダラの初期化処理を実行する
     * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
     * @param model モデルのインスタンス
     */
    CubismRenderer.prototype.initialize = function (model) {
        this._model = model;
    };
    /**
     * モデルを描画する
     */
    CubismRenderer.prototype.drawModel = function () {
        if (this.getModel() == null)
            return;
        this.doDrawModel();
    };
    /**
     * Model-View-Projection 行列をセットする
     * 配列は複製されるので、元の配列は外で破棄して良い
     * @param matrix44 Model-View-Projection 行列
     */
    CubismRenderer.prototype.setMvpMatrix = function (matrix44) {
        this._mvpMatrix4x4.setMatrix(matrix44.getArray());
    };
    /**
     * Model-View-Projection 行列を取得する
     * @return Model-View-Projection 行列
     */
    CubismRenderer.prototype.getMvpMatrix = function () {
        return this._mvpMatrix4x4;
    };
    /**
     * モデルの色をセットする
     * 各色0.0~1.0の間で指定する（1.0が標準の状態）
     * @param red 赤チャンネルの値
     * @param green 緑チャンネルの値
     * @param blue 青チャンネルの値
     * @param alpha αチャンネルの値
     */
    CubismRenderer.prototype.setModelColor = function (red, green, blue, alpha) {
        if (red < 0.0) {
            red = 0.0;
        }
        else if (red > 1.0) {
            red = 1.0;
        }
        if (green < 0.0) {
            green = 0.0;
        }
        else if (green > 1.0) {
            green = 1.0;
        }
        if (blue < 0.0) {
            blue = 0.0;
        }
        else if (blue > 1.0) {
            blue = 1.0;
        }
        if (alpha < 0.0) {
            alpha = 0.0;
        }
        else if (alpha > 1.0) {
            alpha = 1.0;
        }
        this._modelColor.R = red;
        this._modelColor.G = green;
        this._modelColor.B = blue;
        this._modelColor.A = alpha;
    };
    /**
     * モデルの色を取得する
     * 各色0.0~1.0の間で指定する(1.0が標準の状態)
     *
     * @return RGBAのカラー情報
     */
    CubismRenderer.prototype.getModelColor = function () {
        return JSON.parse(JSON.stringify(this._modelColor));
    };
    /**
     * 乗算済みαの有効・無効をセットする
     * 有効にするならtrue、無効にするならfalseをセットする
     */
    CubismRenderer.prototype.setIsPremultipliedAlpha = function (enable) {
        this._isPremultipliedAlpha = enable;
    };
    /**
     * 乗算済みαの有効・無効を取得する
     * @return true 乗算済みのα有効
     * @return false 乗算済みのα無効
     */
    CubismRenderer.prototype.isPremultipliedAlpha = function () {
        return this._isPremultipliedAlpha;
    };
    /**
     * カリング（片面描画）の有効・無効をセットする。
     * 有効にするならtrue、無効にするならfalseをセットする
     */
    CubismRenderer.prototype.setIsCulling = function (culling) {
        this._isCulling = culling;
    };
    /**
     * カリング（片面描画）の有効・無効を取得する。
     * @return true カリング有効
     * @return false カリング無効
     */
    CubismRenderer.prototype.isCulling = function () {
        return this._isCulling;
    };
    /**
     * テクスチャの異方性フィルタリングのパラメータをセットする
     * パラメータ値の影響度はレンダラの実装に依存する
     * @param n パラメータの値
     */
    CubismRenderer.prototype.setAnisotropy = function (n) {
        this._anisortopy = n;
    };
    /**
     * テクスチャの異方性フィルタリングのパラメータをセットする
     * @return 異方性フィルタリングのパラメータ
     */
    CubismRenderer.prototype.getAnisotropy = function () {
        return this._anisortopy;
    };
    /**
     * レンダリングするモデルを取得する
     * @return レンダリングするモデル
     */
    CubismRenderer.prototype.getModel = function () {
        return this._model;
    };
    return CubismRenderer;
}());
exports.CubismRenderer = CubismRenderer;
var CubismBlendMode;
(function (CubismBlendMode) {
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Normal"] = 0] = "CubismBlendMode_Normal";
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Additive"] = 1] = "CubismBlendMode_Additive";
    CubismBlendMode[CubismBlendMode["CubismBlendMode_Multiplicative"] = 2] = "CubismBlendMode_Multiplicative"; // 乗算
})(CubismBlendMode = exports.CubismBlendMode || (exports.CubismBlendMode = {}));
/**
 * テクスチャの色をRGBAで扱うためのクラス
 */
var CubismTextureColor = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismTextureColor() {
        this.R = 1.0;
        this.G = 1.0;
        this.B = 1.0;
        this.A = 1.0;
    }
    return CubismTextureColor;
}());
exports.CubismTextureColor = CubismTextureColor;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismrenderer"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismBlendMode = $.CubismBlendMode;
    Live2DCubismFramework.CubismRenderer = $.CubismRenderer;
    Live2DCubismFramework.CubismTextureColor = $.CubismTextureColor;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismrenderer.js.map
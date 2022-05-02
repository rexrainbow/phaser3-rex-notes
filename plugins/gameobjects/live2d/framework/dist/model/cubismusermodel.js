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
var cubismbreath_1 = require("../effect/cubismbreath");
var cubismeyeblink_1 = require("../effect/cubismeyeblink");
var cubismpose_1 = require("../effect/cubismpose");
var live2dcubismframework_1 = require("../live2dcubismframework");
var cubismmodelmatrix_1 = require("../math/cubismmodelmatrix");
var cubismtargetpoint_1 = require("../math/cubismtargetpoint");
var cubismexpressionmotion_1 = require("../motion/cubismexpressionmotion");
var cubismmotion_1 = require("../motion/cubismmotion");
var cubismmotionmanager_1 = require("../motion/cubismmotionmanager");
var cubismphysics_1 = require("../physics/cubismphysics");
var cubismrenderer_webgl_1 = require("../rendering/cubismrenderer_webgl");
var cubismdebug_1 = require("../utils/cubismdebug");
var cubismmoc_1 = require("./cubismmoc");
var cubismmodeluserdata_1 = require("./cubismmodeluserdata");
/**
 * ユーザーが実際に使用するモデル
 *
 * ユーザーが実際に使用するモデルの基底クラス。これを継承してユーザーが実装する。
 */
var CubismUserModel = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismUserModel() {
        /**
         * モーションデータを読み込む
         * @param buffer motion3.jsonファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @param name モーションの名前
         * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
         * @return モーションクラス
         */
        this.loadMotion = function (buffer, size, name, onFinishedMotionHandler) { return cubismmotion_1.CubismMotion.create(buffer, size, onFinishedMotionHandler); };
        // 各変数初期化
        this._moc = null;
        this._model = null;
        this._motionManager = null;
        this._expressionManager = null;
        this._eyeBlink = null;
        this._breath = null;
        this._modelMatrix = null;
        this._pose = null;
        this._dragManager = null;
        this._physics = null;
        this._modelUserData = null;
        this._initialized = false;
        this._updating = false;
        this._opacity = 1.0;
        this._lipsync = true;
        this._lastLipSyncValue = 0.0;
        this._dragX = 0.0;
        this._dragY = 0.0;
        this._accelerationX = 0.0;
        this._accelerationY = 0.0;
        this._accelerationZ = 0.0;
        this._debugMode = false;
        this._renderer = null;
        // モーションマネージャーを作成
        this._motionManager = new cubismmotionmanager_1.CubismMotionManager();
        this._motionManager.setEventCallback(CubismUserModel.cubismDefaultMotionEventCallback, this);
        // 表情マネージャーを作成
        this._expressionManager = new cubismmotionmanager_1.CubismMotionManager();
        // ドラッグによるアニメーション
        this._dragManager = new cubismtargetpoint_1.CubismTargetPoint();
    }
    /**
     * 初期化状態の取得
     *
     * 初期化されている状態か？
     *
     * @return true     初期化されている
     * @return false    初期化されていない
     */
    CubismUserModel.prototype.isInitialized = function () {
        return this._initialized;
    };
    /**
     * 初期化状態の設定
     *
     * 初期化状態を設定する。
     *
     * @param v 初期化状態
     */
    CubismUserModel.prototype.setInitialized = function (v) {
        this._initialized = v;
    };
    /**
     * 更新状態の取得
     *
     * 更新されている状態か？
     *
     * @return true     更新されている
     * @return false    更新されていない
     */
    CubismUserModel.prototype.isUpdating = function () {
        return this._updating;
    };
    /**
     * 更新状態の設定
     *
     * 更新状態を設定する
     *
     * @param v 更新状態
     */
    CubismUserModel.prototype.setUpdating = function (v) {
        this._updating = v;
    };
    /**
     * マウスドラッグ情報の設定
     * @param ドラッグしているカーソルのX位置
     * @param ドラッグしているカーソルのY位置
     */
    CubismUserModel.prototype.setDragging = function (x, y) {
        this._dragManager.set(x, y);
    };
    /**
     * 加速度の情報を設定する
     * @param x X軸方向の加速度
     * @param y Y軸方向の加速度
     * @param z Z軸方向の加速度
     */
    CubismUserModel.prototype.setAcceleration = function (x, y, z) {
        this._accelerationX = x;
        this._accelerationY = y;
        this._accelerationZ = z;
    };
    /**
     * モデル行列を取得する
     * @return モデル行列
     */
    CubismUserModel.prototype.getModelMatrix = function () {
        return this._modelMatrix;
    };
    /**
     * 不透明度の設定
     * @param a 不透明度
     */
    CubismUserModel.prototype.setOpacity = function (a) {
        this._opacity = a;
    };
    /**
     * 不透明度の取得
     * @return 不透明度
     */
    CubismUserModel.prototype.getOpacity = function () {
        return this._opacity;
    };
    /**
     * モデルデータを読み込む
     *
     * @param buffer    moc3ファイルが読み込まれているバッファ
     */
    CubismUserModel.prototype.loadModel = function (buffer) {
        this._moc = cubismmoc_1.CubismMoc.create(buffer);
        this._model = this._moc.createModel();
        this._model.saveParameters();
        if (this._moc == null || this._model == null) {
            cubismdebug_1.CubismLogError('Failed to CreateModel().');
            return;
        }
        this._modelMatrix = new cubismmodelmatrix_1.CubismModelMatrix(this._model.getCanvasWidth(), this._model.getCanvasHeight());
    };
    /**
     * 表情データの読み込み
     * @param buffer expファイルが読み込まれているバッファ
     * @param size バッファのサイズ
     * @param name 表情の名前
     */
    CubismUserModel.prototype.loadExpression = function (buffer, size, name) {
        return cubismexpressionmotion_1.CubismExpressionMotion.create(buffer, size);
    };
    /**
     * ポーズデータの読み込み
     * @param buffer pose3.jsonが読み込まれているバッファ
     * @param size バッファのサイズ
     */
    CubismUserModel.prototype.loadPose = function (buffer, size) {
        this._pose = cubismpose_1.CubismPose.create(buffer, size);
    };
    /**
     * モデルに付属するユーザーデータを読み込む
     * @param buffer userdata3.jsonが読み込まれているバッファ
     * @param size バッファのサイズ
     */
    CubismUserModel.prototype.loadUserData = function (buffer, size) {
        this._modelUserData = cubismmodeluserdata_1.CubismModelUserData.create(buffer, size);
    };
    /**
     * 物理演算データの読み込み
     * @param buffer  physics3.jsonが読み込まれているバッファ
     * @param size    バッファのサイズ
     */
    CubismUserModel.prototype.loadPhysics = function (buffer, size) {
        this._physics = cubismphysics_1.CubismPhysics.create(buffer, size);
    };
    /**
     * 当たり判定の取得
     * @param drawableId 検証したいDrawableのID
     * @param pointX X位置
     * @param pointY Y位置
     * @return true ヒットしている
     * @return false ヒットしていない
     */
    CubismUserModel.prototype.isHit = function (drawableId, pointX, pointY) {
        var drawIndex = this._model.getDrawableIndex(drawableId);
        if (drawIndex < 0) {
            return false; // 存在しない場合はfalse
        }
        var count = this._model.getDrawableVertexCount(drawIndex);
        var vertices = this._model.getDrawableVertices(drawIndex);
        var left = vertices[0];
        var right = vertices[0];
        var top = vertices[1];
        var bottom = vertices[1];
        for (var j = 1; j < count; ++j) {
            var x = vertices[live2dcubismframework_1.Constant.vertexOffset + j * live2dcubismframework_1.Constant.vertexStep];
            var y = vertices[live2dcubismframework_1.Constant.vertexOffset + j * live2dcubismframework_1.Constant.vertexStep + 1];
            if (x < left) {
                left = x; // Min x
            }
            if (x > right) {
                right = x; // Max x
            }
            if (y < top) {
                top = y; // Min y
            }
            if (y > bottom) {
                bottom = y; // Max y
            }
        }
        var tx = this._modelMatrix.invertTransformX(pointX);
        var ty = this._modelMatrix.invertTransformY(pointY);
        return left <= tx && tx <= right && top <= ty && ty <= bottom;
    };
    /**
     * モデルの取得
     * @return モデル
     */
    CubismUserModel.prototype.getModel = function () {
        return this._model;
    };
    /**
     * レンダラの取得
     * @return レンダラ
     */
    CubismUserModel.prototype.getRenderer = function () {
        return this._renderer;
    };
    /**
     * レンダラを作成して初期化を実行する
     */
    CubismUserModel.prototype.createRenderer = function () {
        if (this._renderer) {
            this.deleteRenderer();
        }
        this._renderer = new cubismrenderer_webgl_1.CubismRenderer_WebGL();
        this._renderer.initialize(this._model);
    };
    /**
     * レンダラの解放
     */
    CubismUserModel.prototype.deleteRenderer = function () {
        if (this._renderer != null) {
            this._renderer.release();
            this._renderer = null;
        }
    };
    /**
     * イベント発火時の標準処理
     *
     * Eventが再生処理時にあった場合の処理をする。
     * 継承で上書きすることを想定している。
     * 上書きしない場合はログ出力をする。
     *
     * @param eventValue 発火したイベントの文字列データ
     */
    CubismUserModel.prototype.motionEventFired = function (eventValue) {
        cubismdebug_1.CubismLogInfo('{0}', eventValue.s);
    };
    /**
     * イベント用のコールバック
     *
     * CubismMotionQueueManagerにイベント用に登録するためのCallback。
     * CubismUserModelの継承先のEventFiredを呼ぶ。
     *
     * @param caller 発火したイベントを管理していたモーションマネージャー、比較用
     * @param eventValue 発火したイベントの文字列データ
     * @param customData CubismUserModelを継承したインスタンスを想定
     */
    CubismUserModel.cubismDefaultMotionEventCallback = function (caller, eventValue, customData) {
        var model = customData;
        if (model != null) {
            model.motionEventFired(eventValue);
        }
    };
    /**
     * デストラクタに相当する処理
     */
    CubismUserModel.prototype.release = function () {
        if (this._motionManager != null) {
            this._motionManager.release();
            this._motionManager = null;
        }
        if (this._expressionManager != null) {
            this._expressionManager.release();
            this._expressionManager = null;
        }
        if (this._moc != null) {
            this._moc.deleteModel(this._model);
            this._moc.release();
            this._moc = null;
        }
        this._modelMatrix = null;
        cubismpose_1.CubismPose.delete(this._pose);
        cubismeyeblink_1.CubismEyeBlink.delete(this._eyeBlink);
        cubismbreath_1.CubismBreath.delete(this._breath);
        this._dragManager = null;
        cubismphysics_1.CubismPhysics.delete(this._physics);
        cubismmodeluserdata_1.CubismModelUserData.delete(this._modelUserData);
        this.deleteRenderer();
    };
    return CubismUserModel;
}());
exports.CubismUserModel = CubismUserModel;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismusermodel"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismUserModel = $.CubismUserModel;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismusermodel.js.map
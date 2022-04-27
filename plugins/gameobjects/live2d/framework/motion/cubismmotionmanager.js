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
var cubismmotionqueuemanager_1 = require("./cubismmotionqueuemanager");
/**
 * モーションの管理
 *
 * モーションの管理を行うクラス
 */
var CubismMotionManager = /** @class */ (function (_super) {
    __extends(CubismMotionManager, _super);
    /**
     * コンストラクタ
     */
    function CubismMotionManager() {
        var _this = _super.call(this) || this;
        _this._currentPriority = 0;
        _this._reservePriority = 0;
        return _this;
    }
    /**
     * 再生中のモーションの優先度の取得
     * @return  モーションの優先度
     */
    CubismMotionManager.prototype.getCurrentPriority = function () {
        return this._currentPriority;
    };
    /**
     * 予約中のモーションの優先度を取得する。
     * @return  モーションの優先度
     */
    CubismMotionManager.prototype.getReservePriority = function () {
        return this._reservePriority;
    };
    /**
     * 予約中のモーションの優先度を設定する。
     * @param   val     優先度
     */
    CubismMotionManager.prototype.setReservePriority = function (val) {
        this._reservePriority = val;
    };
    /**
     * 優先度を設定してモーションを開始する。
     *
     * @param motion          モーション
     * @param autoDelete      再生が狩猟したモーションのインスタンスを削除するならtrue
     * @param priority        優先度
     * @return                開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
     */
    CubismMotionManager.prototype.startMotionPriority = function (motion, autoDelete, priority) {
        if (priority == this._reservePriority) {
            this._reservePriority = 0; // 予約を解除
        }
        this._currentPriority = priority; // 再生中モーションの優先度を設定
        return _super.prototype.startMotion.call(this, motion, autoDelete, this._userTimeSeconds);
    };
    /**
     * モーションを更新して、モデルにパラメータ値を反映する。
     *
     * @param model   対象のモデル
     * @param deltaTimeSeconds    デルタ時間[秒]
     * @return  true    更新されている
     * @return  false   更新されていない
     */
    CubismMotionManager.prototype.updateMotion = function (model, deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        var updated = _super.prototype.doUpdateMotion.call(this, model, this._userTimeSeconds);
        if (this.isFinished()) {
            this._currentPriority = 0; // 再生中のモーションの優先度を解除
        }
        return updated;
    };
    /**
     * モーションを予約する。
     *
     * @param   priority    優先度
     * @return  true    予約できた
     * @return  false   予約できなかった
     */
    CubismMotionManager.prototype.reserveMotion = function (priority) {
        if (priority <= this._reservePriority ||
            priority <= this._currentPriority) {
            return false;
        }
        this._reservePriority = priority;
        return true;
    };
    return CubismMotionManager;
}(cubismmotionqueuemanager_1.CubismMotionQueueManager));
exports.CubismMotionManager = CubismMotionManager;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmotionmanager"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionManager = $.CubismMotionManager;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmotionmanager.js.map
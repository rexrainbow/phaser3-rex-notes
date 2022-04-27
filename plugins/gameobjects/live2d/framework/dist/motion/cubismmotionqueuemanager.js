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
var cubismmotionqueueentry_1 = require("./cubismmotionqueueentry");
var csmvector_1 = require("../type/csmvector");
/**
 * モーション再生の管理
 *
 * モーション再生の管理用クラス。CubismMotionモーションなどACubismMotionのサブクラスを再生するために使用する。
 *
 * @note 再生中に別のモーションが StartMotion()された場合は、新しいモーションに滑らかに変化し旧モーションは中断する。
 *       表情用モーション、体用モーションなどを分けてモーション化した場合など、
 *       複数のモーションを同時に再生させる場合は、複数のCubismMotionQueueManagerインスタンスを使用する。
 */
var CubismMotionQueueManager = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismMotionQueueManager() {
        this._userTimeSeconds = 0.0;
        this._eventCallBack = null;
        this._eventCustomData = null;
        this._motions = new csmvector_1.csmVector();
    }
    /**
     * デストラクタ
     */
    CubismMotionQueueManager.prototype.release = function () {
        for (var i = 0; i < this._motions.getSize(); ++i) {
            if (this._motions.at(i)) {
                this._motions.at(i).release();
                this._motions.set(i, null);
            }
        }
        this._motions = null;
    };
    /**
     * 指定したモーションの開始
     *
     * 指定したモーションを開始する。同じタイプのモーションが既にある場合は、既存のモーションに終了フラグを立て、フェードアウトを開始させる。
     *
     * @param   motion          開始するモーション
     * @param   autoDelete      再生が終了したモーションのインスタンスを削除するなら true
     * @param   userTimeSeconds デルタ時間の積算値[秒]
     * @return                      開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
     */
    CubismMotionQueueManager.prototype.startMotion = function (motion, autoDelete, userTimeSeconds) {
        if (motion == null) {
            return exports.InvalidMotionQueueEntryHandleValue;
        }
        var motionQueueEntry = null;
        // 既にモーションがあれば終了フラグを立てる
        for (var i = 0; i < this._motions.getSize(); ++i) {
            motionQueueEntry = this._motions.at(i);
            if (motionQueueEntry == null) {
                continue;
            }
            motionQueueEntry.setFadeOut(motionQueueEntry._motion.getFadeOutTime()); // フェードアウト設定
        }
        motionQueueEntry = new cubismmotionqueueentry_1.CubismMotionQueueEntry(); // 終了時に破棄する
        motionQueueEntry._autoDelete = autoDelete;
        motionQueueEntry._motion = motion;
        this._motions.pushBack(motionQueueEntry);
        return motionQueueEntry._motionQueueEntryHandle;
    };
    /**
     * 全てのモーションの終了の確認
     * @return true 全て終了している
     * @return false 終了していない
     */
    CubismMotionQueueManager.prototype.isFinished = function () {
        // ------- 処理を行う -------
        // 既にモーションがあれば終了フラグを立てる
        for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
            var motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                ite = this._motions.erase(ite); // 削除
                continue;
            }
            var motion = motionQueueEntry._motion;
            if (motion == null) {
                motionQueueEntry.release();
                motionQueueEntry = null;
                ite = this._motions.erase(ite); // 削除
                continue;
            }
            // ----- 終了済みの処理があれば削除する ------
            if (!motionQueueEntry.isFinished()) {
                return false;
            }
            else {
                ite.preIncrement();
            }
        }
        return true;
    };
    /**
     * 指定したモーションの終了の確認
     * @param motionQueueEntryNumber モーションの識別番号
     * @return true 全て終了している
     * @return false 終了していない
     */
    CubismMotionQueueManager.prototype.isFinishedByHandle = function (motionQueueEntryNumber) {
        for (var ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.increment()) {
            var motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                continue;
            }
            if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber &&
                !motionQueueEntry.isFinished()) {
                return false;
            }
        }
        return true;
    };
    /**
     * 全てのモーションを停止する
     */
    CubismMotionQueueManager.prototype.stopAllMotions = function () {
        // ------- 処理を行う -------
        // 既にモーションがあれば終了フラグを立てる
        for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
            var motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                ite = this._motions.erase(ite);
                continue;
            }
            // ----- 終了済みの処理があれば削除する ------
            motionQueueEntry.release();
            motionQueueEntry = null;
            ite = this._motions.erase(ite); // 削除
        }
    };
    /**
         * 指定したCubismMotionQueueEntryの取得
  
          * @param   motionQueueEntryNumber  モーションの識別番号
          * @return  指定したCubismMotionQueueEntry
          * @return  null   見つからなかった
          */
    CubismMotionQueueManager.prototype.getCubismMotionQueueEntry = function (motionQueueEntryNumber) {
        //------- 処理を行う -------
        for (var ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.preIncrement()) {
            var motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                continue;
            }
            if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
                return motionQueueEntry;
            }
        }
        return null;
    };
    /**
     * イベントを受け取るCallbackの登録
     *
     * @param callback コールバック関数
     * @param customData コールバックに返されるデータ
     */
    CubismMotionQueueManager.prototype.setEventCallback = function (callback, customData) {
        if (customData === void 0) { customData = null; }
        this._eventCallBack = callback;
        this._eventCustomData = customData;
    };
    /**
     * モーションを更新して、モデルにパラメータ値を反映する。
     *
     * @param   model   対象のモデル
     * @param   userTimeSeconds   デルタ時間の積算値[秒]
     * @return  true    モデルへパラメータ値の反映あり
     * @return  false   モデルへパラメータ値の反映なし(モーションの変化なし)
     */
    CubismMotionQueueManager.prototype.doUpdateMotion = function (model, userTimeSeconds) {
        var updated = false;
        // ------- 処理を行う --------
        // 既にモーションがあれば終了フラグを立てる
        for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
            var motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
                ite = this._motions.erase(ite); // 削除
                continue;
            }
            var motion = motionQueueEntry._motion;
            if (motion == null) {
                motionQueueEntry.release();
                motionQueueEntry = null;
                ite = this._motions.erase(ite); // 削除
                continue;
            }
            // ------ 値を反映する ------
            motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
            updated = true;
            // ------ ユーザトリガーイベントを検査する ----
            var firedList = motion.getFiredEvent(motionQueueEntry.getLastCheckEventSeconds() -
                motionQueueEntry.getStartTime(), userTimeSeconds - motionQueueEntry.getStartTime());
            for (var i = 0; i < firedList.getSize(); ++i) {
                this._eventCallBack(this, firedList.at(i), this._eventCustomData);
            }
            motionQueueEntry.setLastCheckEventSeconds(userTimeSeconds);
            // ------ 終了済みの処理があれば削除する ------
            if (motionQueueEntry.isFinished()) {
                motionQueueEntry.release();
                motionQueueEntry = null;
                ite = this._motions.erase(ite); // 削除
            }
            else {
                if (motionQueueEntry.isTriggeredFadeOut()) {
                    motionQueueEntry.startFadeOut(motionQueueEntry.getFadeOutSeconds(), userTimeSeconds);
                }
                ite.preIncrement();
            }
        }
        return updated;
    };
    return CubismMotionQueueManager;
}());
exports.CubismMotionQueueManager = CubismMotionQueueManager;
exports.InvalidMotionQueueEntryHandleValue = -1;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmotionqueuemanager"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionQueueManager = $.CubismMotionQueueManager;
    Live2DCubismFramework.InvalidMotionQueueEntryHandleValue = $.InvalidMotionQueueEntryHandleValue;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmotionqueuemanager.js.map
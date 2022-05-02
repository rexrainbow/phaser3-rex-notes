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
var acubismmotion_1 = require("./acubismmotion");
/**
 * CubismMotionQueueManagerで再生している各モーションの管理クラス。
 */
var CubismMotionQueueEntry = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismMotionQueueEntry() {
        this._autoDelete = false;
        this._motion = null;
        this._available = true;
        this._finished = false;
        this._started = false;
        this._startTimeSeconds = -1.0;
        this._fadeInStartTimeSeconds = 0.0;
        this._endTimeSeconds = -1.0;
        this._stateTimeSeconds = 0.0;
        this._stateWeight = 0.0;
        this._lastEventCheckSeconds = 0.0;
        this._motionQueueEntryHandle = this;
        this._fadeOutSeconds = 0.0;
        this._isTriggeredFadeOut = false;
    }
    /**
     * デストラクタ相当の処理
     */
    CubismMotionQueueEntry.prototype.release = function () {
        if (this._autoDelete && this._motion) {
            acubismmotion_1.ACubismMotion.delete(this._motion); //
        }
    };
    /**
     * フェードアウト時間と開始判定の設定
     * @param fadeOutSeconds フェードアウトにかかる時間[秒]
     */
    CubismMotionQueueEntry.prototype.setFadeOut = function (fadeOutSeconds) {
        this._fadeOutSeconds = fadeOutSeconds;
        this._isTriggeredFadeOut = true;
    };
    /**
     * フェードアウトの開始
     * @param fadeOutSeconds フェードアウトにかかる時間[秒]
     * @param userTimeSeconds デルタ時間の積算値[秒]
     */
    CubismMotionQueueEntry.prototype.startFadeOut = function (fadeOutSeconds, userTimeSeconds) {
        var newEndTimeSeconds = userTimeSeconds + fadeOutSeconds;
        this._isTriggeredFadeOut = true;
        if (this._endTimeSeconds < 0.0 ||
            newEndTimeSeconds < this._endTimeSeconds) {
            this._endTimeSeconds = newEndTimeSeconds;
        }
    };
    /**
     * モーションの終了の確認
     *
     * @return true モーションが終了した
     * @return false 終了していない
     */
    CubismMotionQueueEntry.prototype.isFinished = function () {
        return this._finished;
    };
    /**
     * モーションの開始の確認
     * @return true モーションが開始した
     * @return false 開始していない
     */
    CubismMotionQueueEntry.prototype.isStarted = function () {
        return this._started;
    };
    /**
     * モーションの開始時刻の取得
     * @return モーションの開始時刻[秒]
     */
    CubismMotionQueueEntry.prototype.getStartTime = function () {
        return this._startTimeSeconds;
    };
    /**
     * フェードインの開始時刻の取得
     * @return フェードインの開始時刻[秒]
     */
    CubismMotionQueueEntry.prototype.getFadeInStartTime = function () {
        return this._fadeInStartTimeSeconds;
    };
    /**
     * フェードインの終了時刻の取得
     * @return フェードインの終了時刻の取得
     */
    CubismMotionQueueEntry.prototype.getEndTime = function () {
        return this._endTimeSeconds;
    };
    /**
     * モーションの開始時刻の設定
     * @param startTime モーションの開始時刻
     */
    CubismMotionQueueEntry.prototype.setStartTime = function (startTime) {
        this._startTimeSeconds = startTime;
    };
    /**
     * フェードインの開始時刻の設定
     * @param startTime フェードインの開始時刻[秒]
     */
    CubismMotionQueueEntry.prototype.setFadeInStartTime = function (startTime) {
        this._fadeInStartTimeSeconds = startTime;
    };
    /**
     * フェードインの終了時刻の設定
     * @param endTime フェードインの終了時刻[秒]
     */
    CubismMotionQueueEntry.prototype.setEndTime = function (endTime) {
        this._endTimeSeconds = endTime;
    };
    /**
     * モーションの終了の設定
     * @param f trueならモーションの終了
     */
    CubismMotionQueueEntry.prototype.setIsFinished = function (f) {
        this._finished = f;
    };
    /**
     * モーション開始の設定
     * @param f trueならモーションの開始
     */
    CubismMotionQueueEntry.prototype.setIsStarted = function (f) {
        this._started = f;
    };
    /**
     * モーションの有効性の確認
     * @return true モーションは有効
     * @return false モーションは無効
     */
    CubismMotionQueueEntry.prototype.isAvailable = function () {
        return this._available;
    };
    /**
     * モーションの有効性の設定
     * @param v trueならモーションは有効
     */
    CubismMotionQueueEntry.prototype.setIsAvailable = function (v) {
        this._available = v;
    };
    /**
     * モーションの状態の設定
     * @param timeSeconds 現在時刻[秒]
     * @param weight モーション尾重み
     */
    CubismMotionQueueEntry.prototype.setState = function (timeSeconds, weight) {
        this._stateTimeSeconds = timeSeconds;
        this._stateWeight = weight;
    };
    /**
     * モーションの現在時刻の取得
     * @return モーションの現在時刻[秒]
     */
    CubismMotionQueueEntry.prototype.getStateTime = function () {
        return this._stateTimeSeconds;
    };
    /**
     * モーションの重みの取得
     * @return モーションの重み
     */
    CubismMotionQueueEntry.prototype.getStateWeight = function () {
        return this._stateWeight;
    };
    /**
     * 最後にイベントの発火をチェックした時間を取得
     *
     * @return 最後にイベントの発火をチェックした時間[秒]
     */
    CubismMotionQueueEntry.prototype.getLastCheckEventSeconds = function () {
        return this._lastEventCheckSeconds;
    };
    /**
     * 最後にイベントをチェックした時間を設定
     * @param checkSeconds 最後にイベントをチェックした時間[秒]
     */
    CubismMotionQueueEntry.prototype.setLastCheckEventSeconds = function (checkSeconds) {
        this._lastEventCheckSeconds = checkSeconds;
    };
    /**
     * フェードアウト開始判定の取得
     * @return フェードアウト開始するかどうか
     */
    CubismMotionQueueEntry.prototype.isTriggeredFadeOut = function () {
        return this._isTriggeredFadeOut;
    };
    /**
     * フェードアウト時間の取得
     * @return フェードアウト時間[秒]
     */
    CubismMotionQueueEntry.prototype.getFadeOutSeconds = function () {
        return this._fadeOutSeconds;
    };
    return CubismMotionQueueEntry;
}());
exports.CubismMotionQueueEntry = CubismMotionQueueEntry;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmotionqueueentry"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismMotionQueueEntry = $.CubismMotionQueueEntry;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmotionqueueentry.js.map
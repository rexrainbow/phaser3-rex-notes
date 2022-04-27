/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { ACubismMotion } from './acubismmotion';
import { CubismMotionQueueEntryHandle } from './cubismmotionqueuemanager';
/**
 * CubismMotionQueueManagerで再生している各モーションの管理クラス。
 */
export declare class CubismMotionQueueEntry {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * フェードアウト時間と開始判定の設定
     * @param fadeOutSeconds フェードアウトにかかる時間[秒]
     */
    setFadeOut(fadeOutSeconds: number): void;
    /**
     * フェードアウトの開始
     * @param fadeOutSeconds フェードアウトにかかる時間[秒]
     * @param userTimeSeconds デルタ時間の積算値[秒]
     */
    startFadeOut(fadeOutSeconds: number, userTimeSeconds: number): void;
    /**
     * モーションの終了の確認
     *
     * @return true モーションが終了した
     * @return false 終了していない
     */
    isFinished(): boolean;
    /**
     * モーションの開始の確認
     * @return true モーションが開始した
     * @return false 開始していない
     */
    isStarted(): boolean;
    /**
     * モーションの開始時刻の取得
     * @return モーションの開始時刻[秒]
     */
    getStartTime(): number;
    /**
     * フェードインの開始時刻の取得
     * @return フェードインの開始時刻[秒]
     */
    getFadeInStartTime(): number;
    /**
     * フェードインの終了時刻の取得
     * @return フェードインの終了時刻の取得
     */
    getEndTime(): number;
    /**
     * モーションの開始時刻の設定
     * @param startTime モーションの開始時刻
     */
    setStartTime(startTime: number): void;
    /**
     * フェードインの開始時刻の設定
     * @param startTime フェードインの開始時刻[秒]
     */
    setFadeInStartTime(startTime: number): void;
    /**
     * フェードインの終了時刻の設定
     * @param endTime フェードインの終了時刻[秒]
     */
    setEndTime(endTime: number): void;
    /**
     * モーションの終了の設定
     * @param f trueならモーションの終了
     */
    setIsFinished(f: boolean): void;
    /**
     * モーション開始の設定
     * @param f trueならモーションの開始
     */
    setIsStarted(f: boolean): void;
    /**
     * モーションの有効性の確認
     * @return true モーションは有効
     * @return false モーションは無効
     */
    isAvailable(): boolean;
    /**
     * モーションの有効性の設定
     * @param v trueならモーションは有効
     */
    setIsAvailable(v: boolean): void;
    /**
     * モーションの状態の設定
     * @param timeSeconds 現在時刻[秒]
     * @param weight モーション尾重み
     */
    setState(timeSeconds: number, weight: number): void;
    /**
     * モーションの現在時刻の取得
     * @return モーションの現在時刻[秒]
     */
    getStateTime(): number;
    /**
     * モーションの重みの取得
     * @return モーションの重み
     */
    getStateWeight(): number;
    /**
     * 最後にイベントの発火をチェックした時間を取得
     *
     * @return 最後にイベントの発火をチェックした時間[秒]
     */
    getLastCheckEventSeconds(): number;
    /**
     * 最後にイベントをチェックした時間を設定
     * @param checkSeconds 最後にイベントをチェックした時間[秒]
     */
    setLastCheckEventSeconds(checkSeconds: number): void;
    /**
     * フェードアウト開始判定の取得
     * @return フェードアウト開始するかどうか
     */
    isTriggeredFadeOut(): boolean;
    /**
     * フェードアウト時間の取得
     * @return フェードアウト時間[秒]
     */
    getFadeOutSeconds(): number;
    _autoDelete: boolean;
    _motion: ACubismMotion;
    _available: boolean;
    _finished: boolean;
    _started: boolean;
    _startTimeSeconds: number;
    _fadeInStartTimeSeconds: number;
    _endTimeSeconds: number;
    _stateTimeSeconds: number;
    _stateWeight: number;
    _lastEventCheckSeconds: number;
    private _fadeOutSeconds;
    private _isTriggeredFadeOut;
    _motionQueueEntryHandle: CubismMotionQueueEntryHandle;
}
import * as $ from './cubismmotionqueueentry';
export declare namespace Live2DCubismFramework {
    const CubismMotionQueueEntry: typeof $.CubismMotionQueueEntry;
    type CubismMotionQueueEntry = $.CubismMotionQueueEntry;
}
//# sourceMappingURL=cubismmotionqueueentry.d.ts.map
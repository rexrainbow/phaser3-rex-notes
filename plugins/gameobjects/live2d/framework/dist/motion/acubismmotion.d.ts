/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismModel } from '../model/cubismmodel';
import { csmString } from '../type/csmstring';
import { csmVector } from '../type/csmvector';
import { CubismMotionQueueEntry } from './cubismmotionqueueentry';
/** モーション再生終了コールバック関数定義 */
export declare type FinishedMotionCallback = (self: ACubismMotion) => void;
/**
 * モーションの抽象基底クラス
 *
 * モーションの抽象基底クラス。MotionQueueManagerによってモーションの再生を管理する。
 */
export declare abstract class ACubismMotion {
    /**
     * インスタンスの破棄
     */
    static delete(motion: ACubismMotion): void;
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * モデルのパラメータ
     * @param model 対象のモデル
     * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
     * @param userTimeSeconds デルタ時間の積算値[秒]
     */
    updateParameters(model: CubismModel, motionQueueEntry: CubismMotionQueueEntry, userTimeSeconds: number): void;
    /**
     * フェードインの時間を設定する
     * @param fadeInSeconds フェードインにかかる時間[秒]
     */
    setFadeInTime(fadeInSeconds: number): void;
    /**
     * フェードアウトの時間を設定する
     * @param fadeOutSeconds フェードアウトにかかる時間[秒]
     */
    setFadeOutTime(fadeOutSeconds: number): void;
    /**
     * フェードアウトにかかる時間の取得
     * @return フェードアウトにかかる時間[秒]
     */
    getFadeOutTime(): number;
    /**
     * フェードインにかかる時間の取得
     * @return フェードインにかかる時間[秒]
     */
    getFadeInTime(): number;
    /**
     * モーション適用の重みの設定
     * @param weight 重み（0.0 - 1.0）
     */
    setWeight(weight: number): void;
    /**
     * モーション適用の重みの取得
     * @return 重み（0.0 - 1.0）
     */
    getWeight(): number;
    /**
     * モーションの長さの取得
     * @return モーションの長さ[秒]
     *
     * @note ループの時は「-1」。
     *       ループでない場合は、オーバーライドする。
     *       正の値の時は取得される時間で終了する。
     *       「-1」の時は外部から停止命令がない限り終わらない処理となる。
     */
    getDuration(): number;
    /**
     * モーションのループ1回分の長さの取得
     * @return モーションのループ一回分の長さ[秒]
     *
     * @note ループしない場合は、getDuration()と同じ値を返す
     *       ループ一回分の長さが定義できない場合(プログラム的に動き続けるサブクラスなど)の場合は「-1」を返す
     */
    getLoopDuration(): number;
    /**
     * モーション再生の開始時刻の設定
     * @param offsetSeconds モーション再生の開始時刻[秒]
     */
    setOffsetTime(offsetSeconds: number): void;
    /**
     * モデルのパラメータ更新
     *
     * イベント発火のチェック。
     * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
     *
     * @param beforeCheckTimeSeconds 前回のイベントチェック時間[秒]
     * @param motionTimeSeconds 今回の再生時間[秒]
     */
    getFiredEvent(beforeCheckTimeSeconds: number, motionTimeSeconds: number): csmVector<csmString>;
    /**
     * モーションを更新して、モデルにパラメータ値を反映する
     * @param model 対象のモデル
     * @param userTimeSeconds デルタ時間の積算値[秒]
     * @param weight モーションの重み
     * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
     * @return true モデルへパラメータ値の反映あり
     * @return false モデルへのパラメータ値の反映なし（モーションの変化なし）
     */
    abstract doUpdateParameters(model: CubismModel, userTimeSeconds: number, weight: number, motionQueueEntry: CubismMotionQueueEntry): void;
    /**
     * モーション再生終了コールバックの登録
     *
     * モーション再生終了コールバックを登録する。
     * isFinishedフラグを設定するタイミングで呼び出される。
     * 以下の状態の際には呼び出されない:
     *   1. 再生中のモーションが「ループ」として設定されているとき
     *   2. コールバックが登録されていない時
     *
     * @param onFinishedMotionHandler モーション再生終了コールバック関数
     */
    setFinishedMotionHandler: (onFinishedMotionHandler: FinishedMotionCallback) => FinishedMotionCallback;
    /**
     * モーション再生終了コールバックの取得
     *
     * モーション再生終了コールバックを取得する。
     *
     * @return 登録されているモーション再生終了コールバック関数
     */
    getFinishedMotionHandler: () => FinishedMotionCallback;
    _fadeInSeconds: number;
    _fadeOutSeconds: number;
    _weight: number;
    _offsetSeconds: number;
    _firedEventValues: csmVector<csmString>;
    _onFinishedMotion?: FinishedMotionCallback;
}
import * as $ from './acubismmotion';
export declare namespace Live2DCubismFramework {
    const ACubismMotion: typeof $.ACubismMotion;
    type ACubismMotion = $.ACubismMotion;
    type FinishedMotionCallback = $.FinishedMotionCallback;
}
//# sourceMappingURL=acubismmotion.d.ts.map
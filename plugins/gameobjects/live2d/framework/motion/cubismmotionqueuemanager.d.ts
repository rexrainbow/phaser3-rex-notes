/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { ACubismMotion } from './acubismmotion';
import { CubismMotionQueueEntry } from './cubismmotionqueueentry';
import { csmVector } from '../type/csmvector';
import { CubismModel } from '../model/cubismmodel';
import { csmString } from '../type/csmstring';
/**
 * モーション再生の管理
 *
 * モーション再生の管理用クラス。CubismMotionモーションなどACubismMotionのサブクラスを再生するために使用する。
 *
 * @note 再生中に別のモーションが StartMotion()された場合は、新しいモーションに滑らかに変化し旧モーションは中断する。
 *       表情用モーション、体用モーションなどを分けてモーション化した場合など、
 *       複数のモーションを同時に再生させる場合は、複数のCubismMotionQueueManagerインスタンスを使用する。
 */
export declare class CubismMotionQueueManager {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ
     */
    release(): void;
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
    startMotion(motion: ACubismMotion, autoDelete: boolean, userTimeSeconds: number): CubismMotionQueueEntryHandle;
    /**
     * 全てのモーションの終了の確認
     * @return true 全て終了している
     * @return false 終了していない
     */
    isFinished(): boolean;
    /**
     * 指定したモーションの終了の確認
     * @param motionQueueEntryNumber モーションの識別番号
     * @return true 全て終了している
     * @return false 終了していない
     */
    isFinishedByHandle(motionQueueEntryNumber: CubismMotionQueueEntryHandle): boolean;
    /**
     * 全てのモーションを停止する
     */
    stopAllMotions(): void;
    /**
         * 指定したCubismMotionQueueEntryの取得
  
          * @param   motionQueueEntryNumber  モーションの識別番号
          * @return  指定したCubismMotionQueueEntry
          * @return  null   見つからなかった
          */
    getCubismMotionQueueEntry(motionQueueEntryNumber: any): CubismMotionQueueEntry;
    /**
     * イベントを受け取るCallbackの登録
     *
     * @param callback コールバック関数
     * @param customData コールバックに返されるデータ
     */
    setEventCallback(callback: CubismMotionEventFunction, customData?: any): void;
    /**
     * モーションを更新して、モデルにパラメータ値を反映する。
     *
     * @param   model   対象のモデル
     * @param   userTimeSeconds   デルタ時間の積算値[秒]
     * @return  true    モデルへパラメータ値の反映あり
     * @return  false   モデルへパラメータ値の反映なし(モーションの変化なし)
     */
    doUpdateMotion(model: CubismModel, userTimeSeconds: number): boolean;
    _userTimeSeconds: number;
    _motions: csmVector<CubismMotionQueueEntry>;
    _eventCallBack: CubismMotionEventFunction;
    _eventCustomData: any;
}
/**
 * イベントのコールバック関数を定義
 *
 * イベントのコールバックに登録できる関数の型情報
 * @param caller        発火したイベントを再生させたCubismMotionQueueManager
 * @param eventValue    発火したイベントの文字列データ
 * @param customData   コールバックに返される登録時に指定されたデータ
 */
export interface CubismMotionEventFunction {
    (caller: CubismMotionQueueManager, eventValue: csmString, customData: any): void;
}
/**
 * モーションの識別番号
 *
 * モーションの識別番号の定義
 */
export declare type CubismMotionQueueEntryHandle = any;
export declare const InvalidMotionQueueEntryHandleValue: CubismMotionQueueEntryHandle;
import * as $ from './cubismmotionqueuemanager';
export declare namespace Live2DCubismFramework {
    const CubismMotionQueueManager: typeof $.CubismMotionQueueManager;
    type CubismMotionQueueManager = $.CubismMotionQueueManager;
    const InvalidMotionQueueEntryHandleValue: any;
    type CubismMotionQueueEntryHandle = $.CubismMotionQueueEntryHandle;
    type CubismMotionEventFunction = $.CubismMotionEventFunction;
}
//# sourceMappingURL=cubismmotionqueuemanager.d.ts.map
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismModel } from '../model/cubismmodel';
import { ACubismMotion } from './acubismmotion';
import { CubismMotionQueueEntryHandle, CubismMotionQueueManager } from './cubismmotionqueuemanager';
/**
 * モーションの管理
 *
 * モーションの管理を行うクラス
 */
export declare class CubismMotionManager extends CubismMotionQueueManager {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 再生中のモーションの優先度の取得
     * @return  モーションの優先度
     */
    getCurrentPriority(): number;
    /**
     * 予約中のモーションの優先度を取得する。
     * @return  モーションの優先度
     */
    getReservePriority(): number;
    /**
     * 予約中のモーションの優先度を設定する。
     * @param   val     優先度
     */
    setReservePriority(val: number): void;
    /**
     * 優先度を設定してモーションを開始する。
     *
     * @param motion          モーション
     * @param autoDelete      再生が狩猟したモーションのインスタンスを削除するならtrue
     * @param priority        優先度
     * @return                開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
     */
    startMotionPriority(motion: ACubismMotion, autoDelete: boolean, priority: number): CubismMotionQueueEntryHandle;
    /**
     * モーションを更新して、モデルにパラメータ値を反映する。
     *
     * @param model   対象のモデル
     * @param deltaTimeSeconds    デルタ時間[秒]
     * @return  true    更新されている
     * @return  false   更新されていない
     */
    updateMotion(model: CubismModel, deltaTimeSeconds: number): boolean;
    /**
     * モーションを予約する。
     *
     * @param   priority    優先度
     * @return  true    予約できた
     * @return  false   予約できなかった
     */
    reserveMotion(priority: number): boolean;
    _currentPriority: number;
    _reservePriority: number;
}
import * as $ from './cubismmotionmanager';
export declare namespace Live2DCubismFramework {
    const CubismMotionManager: typeof $.CubismMotionManager;
    type CubismMotionManager = $.CubismMotionManager;
}
//# sourceMappingURL=cubismmotionmanager.d.ts.map
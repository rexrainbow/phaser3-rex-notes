/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdHandle } from '../id/cubismid';
import { CubismModel } from '../model/cubismmodel';
import { csmString } from '../type/csmstring';
import { csmVector } from '../type/csmvector';
import { ACubismMotion, FinishedMotionCallback } from './acubismmotion';
import { CubismMotionData } from './cubismmotioninternal';
import { CubismMotionQueueEntry } from './cubismmotionqueueentry';
/**
 * モーションクラス
 *
 * モーションのクラス。
 */
export declare class CubismMotion extends ACubismMotion {
    /**
     * インスタンスを作成する
     *
     * @param buffer motion3.jsonが読み込まれているバッファ
     * @param size バッファのサイズ
     * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
     * @return 作成されたインスタンス
     */
    static create(buffer: ArrayBuffer, size: number, onFinishedMotionHandler?: FinishedMotionCallback): CubismMotion;
    /**
     * モデルのパラメータの更新の実行
     * @param model             対象のモデル
     * @param userTimeSeconds   現在の時刻[秒]
     * @param fadeWeight        モーションの重み
     * @param motionQueueEntry  CubismMotionQueueManagerで管理されているモーション
     */
    doUpdateParameters(model: CubismModel, userTimeSeconds: number, fadeWeight: number, motionQueueEntry: CubismMotionQueueEntry): void;
    /**
     * ループ情報の設定
     * @param loop ループ情報
     */
    setIsLoop(loop: boolean): void;
    /**
     * ループ情報の取得
     * @return true ループする
     * @return false ループしない
     */
    isLoop(): boolean;
    /**
     * ループ時のフェードイン情報の設定
     * @param loopFadeIn  ループ時のフェードイン情報
     */
    setIsLoopFadeIn(loopFadeIn: boolean): void;
    /**
     * ループ時のフェードイン情報の取得
     *
     * @return  true    する
     * @return  false   しない
     */
    isLoopFadeIn(): boolean;
    /**
     * モーションの長さを取得する。
     *
     * @return  モーションの長さ[秒]
     */
    getDuration(): number;
    /**
     * モーションのループ時の長さを取得する。
     *
     * @return  モーションのループ時の長さ[秒]
     */
    getLoopDuration(): number;
    /**
     * パラメータに対するフェードインの時間を設定する。
     *
     * @param parameterId     パラメータID
     * @param value           フェードインにかかる時間[秒]
     */
    setParameterFadeInTime(parameterId: CubismIdHandle, value: number): void;
    /**
     * パラメータに対するフェードアウトの時間の設定
     * @param parameterId     パラメータID
     * @param value           フェードアウトにかかる時間[秒]
     */
    setParameterFadeOutTime(parameterId: CubismIdHandle, value: number): void;
    /**
     * パラメータに対するフェードインの時間の取得
     * @param    parameterId     パラメータID
     * @return   フェードインにかかる時間[秒]
     */
    getParameterFadeInTime(parameterId: CubismIdHandle): number;
    /**
     * パラメータに対するフェードアウトの時間を取得
     *
     * @param   parameterId     パラメータID
     * @return   フェードアウトにかかる時間[秒]
     */
    getParameterFadeOutTime(parameterId: CubismIdHandle): number;
    /**
     * 自動エフェクトがかかっているパラメータIDリストの設定
     * @param eyeBlinkParameterIds    自動まばたきがかかっているパラメータIDのリスト
     * @param lipSyncParameterIds     リップシンクがかかっているパラメータIDのリスト
     */
    setEffectIds(eyeBlinkParameterIds: csmVector<CubismIdHandle>, lipSyncParameterIds: csmVector<CubismIdHandle>): void;
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * motion3.jsonをパースする。
     *
     * @param motionJson  motion3.jsonが読み込まれているバッファ
     * @param size        バッファのサイズ
     */
    parse(motionJson: ArrayBuffer, size: number): void;
    /**
     * モデルのパラメータ更新
     *
     * イベント発火のチェック。
     * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
     *
     * @param beforeCheckTimeSeconds   前回のイベントチェック時間[秒]
     * @param motionTimeSeconds        今回の再生時間[秒]
     */
    getFiredEvent(beforeCheckTimeSeconds: number, motionTimeSeconds: number): csmVector<csmString>;
    _sourceFrameRate: number;
    _loopDurationSeconds: number;
    _isLoop: boolean;
    _isLoopFadeIn: boolean;
    _lastWeight: number;
    _motionData: CubismMotionData;
    _eyeBlinkParameterIds: csmVector<CubismIdHandle>;
    _lipSyncParameterIds: csmVector<CubismIdHandle>;
    _modelCurveIdEyeBlink: CubismIdHandle;
    _modelCurveIdLipSync: CubismIdHandle;
}
import * as $ from './cubismmotion';
export declare namespace Live2DCubismFramework {
    const CubismMotion: typeof $.CubismMotion;
    type CubismMotion = $.CubismMotion;
}
//# sourceMappingURL=cubismmotion.d.ts.map
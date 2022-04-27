/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { ICubismModelSetting } from '../icubismmodelsetting';
import { CubismIdHandle } from '../id/cubismid';
import { CubismModel } from '../model/cubismmodel';
import { csmVector } from '../type/csmvector';
/**
 * 自動まばたき機能
 *
 * 自動まばたき機能を提供する。
 */
export declare class CubismEyeBlink {
    /**
     * インスタンスを作成する
     * @param modelSetting モデルの設定情報
     * @return 作成されたインスタンス
     * @note 引数がNULLの場合、パラメータIDが設定されていない空のインスタンスを作成する。
     */
    static create(modelSetting?: ICubismModelSetting): CubismEyeBlink;
    /**
     * インスタンスの破棄
     * @param eyeBlink 対象のCubismEyeBlink
     */
    static delete(eyeBlink: CubismEyeBlink): void;
    /**
     * まばたきの間隔の設定
     * @param blinkingInterval まばたきの間隔の時間[秒]
     */
    setBlinkingInterval(blinkingInterval: number): void;
    /**
     * まばたきのモーションの詳細設定
     * @param closing   まぶたを閉じる動作の所要時間[秒]
     * @param closed    まぶたを閉じている動作の所要時間[秒]
     * @param opening   まぶたを開く動作の所要時間[秒]
     */
    setBlinkingSetting(closing: number, closed: number, opening: number): void;
    /**
     * まばたきさせるパラメータIDのリストの設定
     * @param parameterIds パラメータのIDのリスト
     */
    setParameterIds(parameterIds: csmVector<CubismIdHandle>): void;
    /**
     * まばたきさせるパラメータIDのリストの取得
     * @return パラメータIDのリスト
     */
    getParameterIds(): csmVector<CubismIdHandle>;
    /**
     * モデルのパラメータの更新
     * @param model 対象のモデル
     * @param deltaTimeSeconds デルタ時間[秒]
     */
    updateParameters(model: CubismModel, deltaTimeSeconds: number): void;
    /**
     * コンストラクタ
     * @param modelSetting モデルの設定情報
     */
    constructor(modelSetting: ICubismModelSetting);
    /**
     * 次の瞬きのタイミングの決定
     *
     * @return 次のまばたきを行う時刻[秒]
     */
    determinNextBlinkingTiming(): number;
    _blinkingState: number;
    _parameterIds: csmVector<CubismIdHandle>;
    _nextBlinkingTime: number;
    _stateStartTimeSeconds: number;
    _blinkingIntervalSeconds: number;
    _closingSeconds: number;
    _closedSeconds: number;
    _openingSeconds: number;
    _userTimeSeconds: number;
    /**
     * IDで指定された目のパラメータが、0のときに閉じるなら true 、1の時に閉じるなら false 。
     */
    static readonly CloseIfZero: boolean;
}
/**
 * まばたきの状態
 *
 * まばたきの状態を表す列挙型
 */
export declare enum EyeState {
    EyeState_First = 0,
    EyeState_Interval = 1,
    EyeState_Closing = 2,
    EyeState_Closed = 3,
    EyeState_Opening = 4
}
import * as $ from './cubismeyeblink';
export declare namespace Live2DCubismFramework {
    const CubismEyeBlink: typeof $.CubismEyeBlink;
    type CubismEyeBlink = $.CubismEyeBlink;
    const EyeState: typeof $.EyeState;
    type EyeState = $.EyeState;
}
//# sourceMappingURL=cubismeyeblink.d.ts.map
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdHandle } from '../id/cubismid';
import { CubismModel } from '../model/cubismmodel';
import { csmVector } from '../type/csmvector';
import { ACubismMotion } from './acubismmotion';
import { CubismMotionQueueEntry } from './cubismmotionqueueentry';
/**
 * 表情のモーション
 *
 * 表情のモーションクラス。
 */
export declare class CubismExpressionMotion extends ACubismMotion {
    /**
     * インスタンスを作成する。
     * @param buffer expファイルが読み込まれているバッファ
     * @param size バッファのサイズ
     * @return 作成されたインスタンス
     */
    static create(buffer: ArrayBuffer, size: number): CubismExpressionMotion;
    /**
     * モデルのパラメータの更新の実行
     * @param model 対象のモデル
     * @param userTimeSeconds デルタ時間の積算値[秒]
     * @param weight モーションの重み
     * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
     */
    doUpdateParameters(model: CubismModel, userTimeSeconds: number, weight: number, motionQueueEntry: CubismMotionQueueEntry): void;
    /**
     * コンストラクタ
     */
    constructor();
    _parameters: csmVector<ExpressionParameter>;
}
/**
 * 表情パラメータ値の計算方式
 */
export declare enum ExpressionBlendType {
    ExpressionBlendType_Add = 0,
    ExpressionBlendType_Multiply = 1,
    ExpressionBlendType_Overwrite = 2
}
/**
 * 表情のパラメータ情報
 */
export declare class ExpressionParameter {
    parameterId: CubismIdHandle;
    blendType: ExpressionBlendType;
    value: number;
}
import * as $ from './cubismexpressionmotion';
export declare namespace Live2DCubismFramework {
    const CubismExpressionMotion: typeof $.CubismExpressionMotion;
    type CubismExpressionMotion = $.CubismExpressionMotion;
    const ExpressionBlendType: typeof $.ExpressionBlendType;
    type ExpressionBlendType = $.ExpressionBlendType;
    const ExpressionParameter: typeof $.ExpressionParameter;
    type ExpressionParameter = $.ExpressionParameter;
}
//# sourceMappingURL=cubismexpressionmotion.d.ts.map
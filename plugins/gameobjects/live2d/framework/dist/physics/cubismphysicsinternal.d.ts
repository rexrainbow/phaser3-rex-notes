/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdHandle } from '../id/cubismid';
import { CubismVector2 } from '../math/cubismvector2';
import { csmVector } from '../type/csmvector';
/**
 * 物理演算の適用先の種類
 */
export declare enum CubismPhysicsTargetType {
    CubismPhysicsTargetType_Parameter = 0
}
/**
 * 物理演算の入力の種類
 */
export declare enum CubismPhysicsSource {
    CubismPhysicsSource_X = 0,
    CubismPhysicsSource_Y = 1,
    CubismPhysicsSource_Angle = 2
}
/**
 * @brief 物理演算で使用する外部の力
 *
 * 物理演算で使用する外部の力。
 */
export declare class PhysicsJsonEffectiveForces {
    constructor();
    gravity: CubismVector2;
    wind: CubismVector2;
}
/**
 * 物理演算のパラメータ情報
 */
export declare class CubismPhysicsParameter {
    id: CubismIdHandle;
    targetType: CubismPhysicsTargetType;
}
/**
 * 物理演算の正規化情報
 */
export declare class CubismPhysicsNormalization {
    minimum: number;
    maximum: number;
    defalut: number;
}
/**
 * 物理演算の演算委使用する物理点の情報
 */
export declare class CubismPhysicsParticle {
    constructor();
    initialPosition: CubismVector2;
    mobility: number;
    delay: number;
    acceleration: number;
    radius: number;
    position: CubismVector2;
    lastPosition: CubismVector2;
    lastGravity: CubismVector2;
    force: CubismVector2;
    velocity: CubismVector2;
}
/**
 * 物理演算の物理点の管理
 */
export declare class CubismPhysicsSubRig {
    constructor();
    inputCount: number;
    outputCount: number;
    particleCount: number;
    baseInputIndex: number;
    baseOutputIndex: number;
    baseParticleIndex: number;
    normalizationPosition: CubismPhysicsNormalization;
    normalizationAngle: CubismPhysicsNormalization;
}
/**
 * 正規化されたパラメータの取得関数の宣言
 * @param targetTranslation     // 演算結果の移動値
 * @param targetAngle           // 演算結果の角度
 * @param value                 // パラメータの値
 * @param parameterMinimunValue // パラメータの最小値
 * @param parameterMaximumValue // パラメータの最大値
 * @param parameterDefaultValue // パラメータのデフォルト値
 * @param normalizationPosition // 正規化された位置
 * @param normalizationAngle    // 正規化された角度
 * @param isInverted            // 値が反転されているか？
 * @param weight                // 重み
 */
export interface normalizedPhysicsParameterValueGetter {
    (targetTranslation: CubismVector2, targetAngle: {
        angle: number;
    }, value: number, parameterMinimunValue: number, parameterMaximumValue: number, parameterDefaultValue: number, normalizationPosition: CubismPhysicsNormalization, normalizationAngle: CubismPhysicsNormalization, isInverted: boolean, weight: number): void;
}
/**
 * 物理演算の値の取得関数の宣言
 * @param translation 移動値
 * @param particles 物理点のリスト
 * @param isInverted 値が反映されているか
 * @param parentGravity 重力
 * @return 値
 */
export interface physicsValueGetter {
    (translation: CubismVector2, particles: CubismPhysicsParticle[], particleIndex: number, isInverted: boolean, parentGravity: CubismVector2): number;
}
/**
 * 物理演算のスケールの取得関数の宣言
 * @param translationScale 移動値のスケール
 * @param angleScale    角度のスケール
 * @return スケール値
 */
export interface physicsScaleGetter {
    (translationScale: CubismVector2, angleScale: number): number;
}
/**
 * 物理演算の入力情報
 */
export declare class CubismPhysicsInput {
    constructor();
    source: CubismPhysicsParameter;
    sourceParameterIndex: number;
    weight: number;
    type: number;
    reflect: boolean;
    getNormalizedParameterValue: normalizedPhysicsParameterValueGetter;
}
/**
 * @brief 物理演算の出力情報
 *
 * 物理演算の出力情報。
 */
export declare class CubismPhysicsOutput {
    constructor();
    destination: CubismPhysicsParameter;
    destinationParameterIndex: number;
    vertexIndex: number;
    translationScale: CubismVector2;
    angleScale: number;
    weight: number;
    type: CubismPhysicsSource;
    reflect: boolean;
    valueBelowMinimum: number;
    valueExceededMaximum: number;
    getValue: physicsValueGetter;
    getScale: physicsScaleGetter;
}
/**
 * @brief 物理演算のデータ
 *
 * 物理演算のデータ。
 */
export declare class CubismPhysicsRig {
    constructor();
    subRigCount: number;
    settings: csmVector<CubismPhysicsSubRig>;
    inputs: csmVector<CubismPhysicsInput>;
    outputs: csmVector<CubismPhysicsOutput>;
    particles: csmVector<CubismPhysicsParticle>;
    gravity: CubismVector2;
    wind: CubismVector2;
}
import * as $ from './cubismphysicsinternal';
export declare namespace Live2DCubismFramework {
    const CubismPhysicsInput: typeof $.CubismPhysicsInput;
    type CubismPhysicsInput = $.CubismPhysicsInput;
    const CubismPhysicsNormalization: typeof $.CubismPhysicsNormalization;
    type CubismPhysicsNormalization = $.CubismPhysicsNormalization;
    const CubismPhysicsOutput: typeof $.CubismPhysicsOutput;
    type CubismPhysicsOutput = $.CubismPhysicsOutput;
    const CubismPhysicsParameter: typeof $.CubismPhysicsParameter;
    type CubismPhysicsParameter = $.CubismPhysicsParameter;
    const CubismPhysicsParticle: typeof $.CubismPhysicsParticle;
    type CubismPhysicsParticle = $.CubismPhysicsParticle;
    const CubismPhysicsRig: typeof $.CubismPhysicsRig;
    type CubismPhysicsRig = $.CubismPhysicsRig;
    const CubismPhysicsSource: typeof $.CubismPhysicsSource;
    type CubismPhysicsSource = $.CubismPhysicsSource;
    const CubismPhysicsSubRig: typeof $.CubismPhysicsSubRig;
    type CubismPhysicsSubRig = $.CubismPhysicsSubRig;
    const CubismPhysicsTargetType: typeof $.CubismPhysicsTargetType;
    type CubismPhysicsTargetType = $.CubismPhysicsTargetType;
    const PhysicsJsonEffectiveForces: typeof $.PhysicsJsonEffectiveForces;
    type PhysicsJsonEffectiveForces = $.PhysicsJsonEffectiveForces;
    type normalizedPhysicsParameterValueGetter = $.normalizedPhysicsParameterValueGetter;
    type physicsScaleGetter = $.physicsScaleGetter;
    type physicsValueGetter = $.physicsValueGetter;
}
//# sourceMappingURL=cubismphysicsinternal.d.ts.map
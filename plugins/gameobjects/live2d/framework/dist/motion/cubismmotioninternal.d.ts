/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdHandle } from '../id/cubismid';
import { csmString } from '../type/csmstring';
import { csmVector } from '../type/csmvector';
/**
 * @brief モーションカーブの種類
 *
 * モーションカーブの種類。
 */
export declare enum CubismMotionCurveTarget {
    CubismMotionCurveTarget_Model = 0,
    CubismMotionCurveTarget_Parameter = 1,
    CubismMotionCurveTarget_PartOpacity = 2
}
/**
 * @brief モーションカーブのセグメントの種類
 *
 * モーションカーブのセグメントの種類。
 */
export declare enum CubismMotionSegmentType {
    CubismMotionSegmentType_Linear = 0,
    CubismMotionSegmentType_Bezier = 1,
    CubismMotionSegmentType_Stepped = 2,
    CubismMotionSegmentType_InverseStepped = 3
}
/**
 * @brief モーションカーブの制御点
 *
 * モーションカーブの制御点。
 */
export declare class CubismMotionPoint {
    time: number;
    value: number;
}
/**
 * モーションカーブのセグメントの評価関数
 *
 * @param   points      モーションカーブの制御点リスト
 * @param   time        評価する時間[秒]
 */
export interface csmMotionSegmentEvaluationFunction {
    (points: CubismMotionPoint[], time: number): number;
}
/**
 * @brief モーションカーブのセグメント
 *
 * モーションカーブのセグメント。
 */
export declare class CubismMotionSegment {
    /**
     * @brief コンストラクタ
     *
     * コンストラクタ。
     */
    constructor();
    evaluate: csmMotionSegmentEvaluationFunction;
    basePointIndex: number;
    segmentType: number;
}
/**
 * @brief モーションカーブ
 *
 * モーションカーブ。
 */
export declare class CubismMotionCurve {
    constructor();
    type: CubismMotionCurveTarget;
    id: CubismIdHandle;
    segmentCount: number;
    baseSegmentIndex: number;
    fadeInTime: number;
    fadeOutTime: number;
}
/**
 * イベント。
 */
export declare class CubismMotionEvent {
    fireTime: number;
    value: csmString;
}
/**
 * @brief モーションデータ
 *
 * モーションデータ。
 */
export declare class CubismMotionData {
    constructor();
    duration: number;
    loop: boolean;
    curveCount: number;
    eventCount: number;
    fps: number;
    curves: csmVector<CubismMotionCurve>;
    segments: csmVector<CubismMotionSegment>;
    points: csmVector<CubismMotionPoint>;
    events: csmVector<CubismMotionEvent>;
}
import * as $ from './cubismmotioninternal';
export declare namespace Live2DCubismFramework {
    const CubismMotionCurve: typeof $.CubismMotionCurve;
    type CubismMotionCurve = $.CubismMotionCurve;
    const CubismMotionCurveTarget: typeof $.CubismMotionCurveTarget;
    type CubismMotionCurveTarget = $.CubismMotionCurveTarget;
    const CubismMotionData: typeof $.CubismMotionData;
    type CubismMotionData = $.CubismMotionData;
    const CubismMotionEvent: typeof $.CubismMotionEvent;
    type CubismMotionEvent = $.CubismMotionEvent;
    const CubismMotionPoint: typeof $.CubismMotionPoint;
    type CubismMotionPoint = $.CubismMotionPoint;
    const CubismMotionSegment: typeof $.CubismMotionSegment;
    type CubismMotionSegment = $.CubismMotionSegment;
    const CubismMotionSegmentType: typeof $.CubismMotionSegmentType;
    type CubismMotionSegmentType = $.CubismMotionSegmentType;
    type csmMotionSegmentEvaluationFunction = $.csmMotionSegmentEvaluationFunction;
}
//# sourceMappingURL=cubismmotioninternal.d.ts.map
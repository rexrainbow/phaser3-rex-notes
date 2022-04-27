/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdHandle } from '../id/cubismid';
import { csmString } from '../type/csmstring';
import { CubismJson } from '../utils/cubismjson';
/**
 * motion3.jsonのコンテナ。
 */
export declare class CubismMotionJson {
    /**
     * コンストラクタ
     * @param buffer motion3.jsonが読み込まれているバッファ
     * @param size バッファのサイズ
     */
    constructor(buffer: ArrayBuffer, size: number);
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * モーションの長さを取得する
     * @return モーションの長さ[秒]
     */
    getMotionDuration(): number;
    /**
     * モーションのループ情報の取得
     * @return true ループする
     * @return false ループしない
     */
    isMotionLoop(): boolean;
    getEvaluationOptionFlag(flagType: number): boolean;
    /**
     * モーションカーブの個数の取得
     * @return モーションカーブの個数
     */
    getMotionCurveCount(): number;
    /**
     * モーションのフレームレートの取得
     * @return フレームレート[FPS]
     */
    getMotionFps(): number;
    /**
     * モーションのセグメントの総合計の取得
     * @return モーションのセグメントの取得
     */
    getMotionTotalSegmentCount(): number;
    /**
     * モーションのカーブの制御店の総合計の取得
     * @return モーションのカーブの制御点の総合計
     */
    getMotionTotalPointCount(): number;
    /**
     * モーションのフェードイン時間の存在
     * @return true 存在する
     * @return false 存在しない
     */
    isExistMotionFadeInTime(): boolean;
    /**
     * モーションのフェードアウト時間の存在
     * @return true 存在する
     * @return false 存在しない
     */
    isExistMotionFadeOutTime(): boolean;
    /**
     * モーションのフェードイン時間の取得
     * @return フェードイン時間[秒]
     */
    getMotionFadeInTime(): number;
    /**
     * モーションのフェードアウト時間の取得
     * @return フェードアウト時間[秒]
     */
    getMotionFadeOutTime(): number;
    /**
     * モーションのカーブの種類の取得
     * @param curveIndex カーブのインデックス
     * @return カーブの種類
     */
    getMotionCurveTarget(curveIndex: number): string;
    /**
     * モーションのカーブのIDの取得
     * @param curveIndex カーブのインデックス
     * @return カーブのID
     */
    getMotionCurveId(curveIndex: number): CubismIdHandle;
    /**
     * モーションのカーブのフェードイン時間の存在
     * @param curveIndex カーブのインデックス
     * @return true 存在する
     * @return false 存在しない
     */
    isExistMotionCurveFadeInTime(curveIndex: number): boolean;
    /**
     * モーションのカーブのフェードアウト時間の存在
     * @param curveIndex カーブのインデックス
     * @return true 存在する
     * @return false 存在しない
     */
    isExistMotionCurveFadeOutTime(curveIndex: number): boolean;
    /**
     * モーションのカーブのフェードイン時間の取得
     * @param curveIndex カーブのインデックス
     * @return フェードイン時間[秒]
     */
    getMotionCurveFadeInTime(curveIndex: number): number;
    /**
     * モーションのカーブのフェードアウト時間の取得
     * @param curveIndex カーブのインデックス
     * @return フェードアウト時間[秒]
     */
    getMotionCurveFadeOutTime(curveIndex: number): number;
    /**
     * モーションのカーブのセグメントの個数を取得する
     * @param curveIndex カーブのインデックス
     * @return モーションのカーブのセグメントの個数
     */
    getMotionCurveSegmentCount(curveIndex: number): number;
    /**
     * モーションのカーブのセグメントの値の取得
     * @param curveIndex カーブのインデックス
     * @param segmentIndex セグメントのインデックス
     * @return セグメントの値
     */
    getMotionCurveSegment(curveIndex: number, segmentIndex: number): number;
    /**
     * イベントの個数の取得
     * @return イベントの個数
     */
    getEventCount(): number;
    /**
     *  イベントの総文字数の取得
     * @return イベントの総文字数
     */
    getTotalEventValueSize(): number;
    /**
     * イベントの時間の取得
     * @param userDataIndex イベントのインデックス
     * @return イベントの時間[秒]
     */
    getEventTime(userDataIndex: number): number;
    /**
     * イベントの取得
     * @param userDataIndex イベントのインデックス
     * @return イベントの文字列
     */
    getEventValue(userDataIndex: number): csmString;
    _json: CubismJson;
}
/**
 * @brief ベジェカーブの解釈方法のフラグタイプ
 */
export declare enum EvaluationOptionFlag {
    EvaluationOptionFlag_AreBeziersRistricted = 0
}
import * as $ from './cubismmotionjson';
export declare namespace Live2DCubismFramework {
    const CubismMotionJson: typeof $.CubismMotionJson;
    type CubismMotionJson = $.CubismMotionJson;
}
//# sourceMappingURL=cubismmotionjson.d.ts.map
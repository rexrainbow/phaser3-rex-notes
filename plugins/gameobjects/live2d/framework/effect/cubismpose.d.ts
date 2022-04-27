/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdHandle } from '../id/cubismid';
import { CubismModel } from '../model/cubismmodel';
import { csmVector } from '../type/csmvector';
/**
 * パーツの不透明度の設定
 *
 * パーツの不透明度の管理と設定を行う。
 */
export declare class CubismPose {
    /**
     * インスタンスの作成
     * @param pose3json pose3.jsonのデータ
     * @param size pose3.jsonのデータのサイズ[byte]
     * @return 作成されたインスタンス
     */
    static create(pose3json: ArrayBuffer, size: number): CubismPose;
    /**
     * インスタンスを破棄する
     * @param pose 対象のCubismPose
     */
    static delete(pose: CubismPose): void;
    /**
     * モデルのパラメータの更新
     * @param model 対象のモデル
     * @param deltaTimeSeconds デルタ時間[秒]
     */
    updateParameters(model: CubismModel, deltaTimeSeconds: number): void;
    /**
     * 表示を初期化
     * @param model 対象のモデル
     * @note 不透明度の初期値が0でないパラメータは、不透明度を１に設定する
     */
    reset(model: CubismModel): void;
    /**
     * パーツの不透明度をコピー
     *
     * @param model 対象のモデル
     */
    copyPartOpacities(model: CubismModel): void;
    /**
     * パーツのフェード操作を行う。
     * @param model 対象のモデル
     * @param deltaTimeSeconds デルタ時間[秒]
     * @param beginIndex フェード操作を行うパーツグループの先頭インデックス
     * @param partGroupCount フェード操作を行うパーツグループの個数
     */
    doFade(model: CubismModel, deltaTimeSeconds: number, beginIndex: number, partGroupCount: number): void;
    /**
     * コンストラクタ
     */
    constructor();
    _partGroups: csmVector<PartData>;
    _partGroupCounts: csmVector<number>;
    _fadeTimeSeconds: number;
    _lastModel: CubismModel;
}
/**
 * パーツにまつわるデータを管理
 */
export declare class PartData {
    /**
     * コンストラクタ
     */
    constructor(v?: PartData);
    /**
     * =演算子のオーバーロード
     */
    assignment(v: PartData): PartData;
    /**
     * 初期化
     * @param model 初期化に使用するモデル
     */
    initialize(model: CubismModel): void;
    /**
     * オブジェクトのコピーを生成する
     */
    clone(): PartData;
    partId: CubismIdHandle;
    parameterIndex: number;
    partIndex: number;
    link: csmVector<PartData>;
}
import * as $ from './cubismpose';
export declare namespace Live2DCubismFramework {
    const CubismPose: typeof $.CubismPose;
    type CubismPose = $.CubismPose;
    const PartData: typeof $.PartData;
    type PartData = $.PartData;
}
//# sourceMappingURL=cubismpose.d.ts.map
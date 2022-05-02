/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdHandle } from '../id/cubismid';
import { CubismVector2 } from '../math/cubismvector2';
import { CubismJson } from '../utils/cubismjson';
/**
 * physics3.jsonのコンテナ。
 */
export declare class CubismPhysicsJson {
    /**
     * コンストラクタ
     * @param buffer physics3.jsonが読み込まれているバッファ
     * @param size バッファのサイズ
     */
    constructor(buffer: ArrayBuffer, size: number);
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * 重力の取得
     * @return 重力
     */
    getGravity(): CubismVector2;
    /**
     * 風の取得
     * @return 風
     */
    getWind(): CubismVector2;
    /**
     * 物理店の管理の個数の取得
     * @return 物理店の管理の個数
     */
    getSubRigCount(): number;
    /**
     * 入力の総合計の取得
     * @return 入力の総合計
     */
    getTotalInputCount(): number;
    /**
     * 出力の総合計の取得
     * @return 出力の総合計
     */
    getTotalOutputCount(): number;
    /**
     * 物理点の個数の取得
     * @return 物理点の個数
     */
    getVertexCount(): number;
    /**
     * 正規化された位置の最小値の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @return 正規化された位置の最小値
     */
    getNormalizationPositionMinimumValue(physicsSettingIndex: number): number;
    /**
     * 正規化された位置の最大値の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @return 正規化された位置の最大値
     */
    getNormalizationPositionMaximumValue(physicsSettingIndex: number): number;
    /**
     * 正規化された位置のデフォルト値の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @return 正規化された位置のデフォルト値
     */
    getNormalizationPositionDefaultValue(physicsSettingIndex: number): number;
    /**
     * 正規化された角度の最小値の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @return 正規化された角度の最小値
     */
    getNormalizationAngleMinimumValue(physicsSettingIndex: number): number;
    /**
     * 正規化された角度の最大値の取得
     * @param physicsSettingIndex
     * @return 正規化された角度の最大値
     */
    getNormalizationAngleMaximumValue(physicsSettingIndex: number): number;
    /**
     * 正規化された角度のデフォルト値の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @return 正規化された角度のデフォルト値
     */
    getNormalizationAngleDefaultValue(physicsSettingIndex: number): number;
    /**
     * 入力の個数の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @return 入力の個数
     */
    getInputCount(physicsSettingIndex: number): number;
    /**
     * 入力の重みの取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param inputIndex 入力のインデックス
     * @return 入力の重み
     */
    getInputWeight(physicsSettingIndex: number, inputIndex: number): number;
    /**
     * 入力の反転の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param inputIndex 入力のインデックス
     * @return 入力の反転
     */
    getInputReflect(physicsSettingIndex: number, inputIndex: number): boolean;
    /**
     * 入力の種類の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param inputIndex 入力のインデックス
     * @return 入力の種類
     */
    getInputType(physicsSettingIndex: number, inputIndex: number): string;
    /**
     * 入力元のIDの取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param inputIndex 入力のインデックス
     * @return 入力元のID
     */
    getInputSourceId(physicsSettingIndex: number, inputIndex: number): CubismIdHandle;
    /**
     * 出力の個数の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @return 出力の個数
     */
    getOutputCount(physicsSettingIndex: number): number;
    /**
     * 出力の物理点のインデックスの取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param outputIndex 出力のインデックス
     * @return 出力の物理点のインデックス
     */
    getOutputVertexIndex(physicsSettingIndex: number, outputIndex: number): number;
    /**
     * 出力の角度のスケールを取得する
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param outputIndex 出力のインデックス
     * @return 出力の角度のスケール
     */
    getOutputAngleScale(physicsSettingIndex: number, outputIndex: number): number;
    /**
     * 出力の重みの取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param outputIndex 出力のインデックス
     * @return 出力の重み
     */
    getOutputWeight(physicsSettingIndex: number, outputIndex: number): number;
    /**
     * 出力先のIDの取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param outputIndex 出力のインデックス
     * @return 出力先のID
     */
    getOutputDestinationId(physicsSettingIndex: number, outputIndex: number): CubismIdHandle;
    /**
     * 出力の種類の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param outputIndex 出力のインデックス
     * @return 出力の種類
     */
    getOutputType(physicsSettingIndex: number, outputIndex: number): string;
    /**
     * 出力の反転の取得
     * @param physicsSettingIndex 物理演算のインデックス
     * @param outputIndex 出力のインデックス
     * @return 出力の反転
     */
    getOutputReflect(physicsSettingIndex: number, outputIndex: number): boolean;
    /**
     * 物理点の個数の取得
     * @param physicsSettingIndex 物理演算男設定のインデックス
     * @return 物理点の個数
     */
    getParticleCount(physicsSettingIndex: number): number;
    /**
     * 物理点の動きやすさの取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param vertexIndex 物理点のインデックス
     * @return 物理点の動きやすさ
     */
    getParticleMobility(physicsSettingIndex: number, vertexIndex: number): number;
    /**
     * 物理点の遅れの取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param vertexIndex 物理点のインデックス
     * @return 物理点の遅れ
     */
    getParticleDelay(physicsSettingIndex: number, vertexIndex: number): number;
    /**
     * 物理点の加速度の取得
     * @param physicsSettingIndex 物理演算の設定
     * @param vertexIndex 物理点のインデックス
     * @return 物理点の加速度
     */
    getParticleAcceleration(physicsSettingIndex: number, vertexIndex: number): number;
    /**
     * 物理点の距離の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param vertexIndex 物理点のインデックス
     * @return 物理点の距離
     */
    getParticleRadius(physicsSettingIndex: number, vertexIndex: number): number;
    /**
     * 物理点の位置の取得
     * @param physicsSettingIndex 物理演算の設定のインデックス
     * @param vertexInde 物理点のインデックス
     * @return 物理点の位置
     */
    getParticlePosition(physicsSettingIndex: number, vertexIndex: number): CubismVector2;
    _json: CubismJson;
}
import * as $ from './cubismphysicsjson';
export declare namespace Live2DCubismFramework {
    const CubismPhysicsJson: typeof $.CubismPhysicsJson;
    type CubismPhysicsJson = $.CubismPhysicsJson;
}
//# sourceMappingURL=cubismphysicsjson.d.ts.map
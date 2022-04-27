/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdHandle } from '../id/cubismid';
export declare class CubismModelUserDataJson {
    /**
     * コンストラクタ
     * @param buffer    userdata3.jsonが読み込まれているバッファ
     * @param size      バッファのサイズ
     */
    constructor(buffer: ArrayBuffer, size: number);
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * ユーザーデータ個数の取得
     * @return ユーザーデータの個数
     */
    getUserDataCount(): number;
    /**
     * ユーザーデータ総文字列数の取得
     *
     * @return ユーザーデータ総文字列数
     */
    getTotalUserDataSize(): number;
    /**
     * ユーザーデータのタイプの取得
     *
     * @return ユーザーデータのタイプ
     */
    getUserDataTargetType(i: number): string;
    /**
     * ユーザーデータのターゲットIDの取得
     *
     * @param i インデックス
     * @return ユーザーデータターゲットID
     */
    getUserDataId(i: number): CubismIdHandle;
    /**
     * ユーザーデータの文字列の取得
     *
     * @param i インデックス
     * @return ユーザーデータ
     */
    getUserDataValue(i: number): string;
    private _json;
}
import * as $ from './cubismmodeluserdatajson';
export declare namespace Live2DCubismFramework {
    const CubismModelUserDataJson: typeof $.CubismModelUserDataJson;
    type CubismModelUserDataJson = $.CubismModelUserDataJson;
}
//# sourceMappingURL=cubismmodeluserdatajson.d.ts.map
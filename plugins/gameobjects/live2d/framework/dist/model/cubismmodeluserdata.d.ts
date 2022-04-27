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
 * ユーザーデータインターフェース
 *
 * Jsonから読み込んだユーザーデータを記録しておくための構造体
 */
export declare class CubismModelUserDataNode {
    targetType: CubismIdHandle;
    targetId: CubismIdHandle;
    value: csmString;
}
/**
 * ユーザデータの管理クラス
 *
 * ユーザデータをロード、管理、検索インターフェイス、解放までを行う。
 */
export declare class CubismModelUserData {
    /**
     * インスタンスの作成
     *
     * @param buffer    userdata3.jsonが読み込まれているバッファ
     * @param size      バッファのサイズ
     * @return 作成されたインスタンス
     */
    static create(buffer: ArrayBuffer, size: number): CubismModelUserData;
    /**
     * インスタンスを破棄する
     *
     * @param modelUserData 破棄するインスタンス
     */
    static delete(modelUserData: CubismModelUserData): void;
    /**
     * ArtMeshのユーザーデータのリストの取得
     *
     * @return ユーザーデータリスト
     */
    getArtMeshUserDatas(): csmVector<CubismModelUserDataNode>;
    /**
     * userdata3.jsonのパース
     *
     * @param buffer    userdata3.jsonが読み込まれているバッファ
     * @param size      バッファのサイズ
     */
    parseUserData(buffer: ArrayBuffer, size: number): void;
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     *
     * ユーザーデータ構造体配列を解放する
     */
    release(): void;
    private _userDataNodes;
    private _artMeshUserDataNode;
}
import * as $ from './cubismmodeluserdata';
export declare namespace Live2DCubismFramework {
    const CubismModelUserData: typeof $.CubismModelUserData;
    type CubismModelUserData = $.CubismModelUserData;
    const CubismModelUserDataNode: typeof $.CubismModelUserDataNode;
    type CubismModelUserDataNode = $.CubismModelUserDataNode;
}
//# sourceMappingURL=cubismmodeluserdata.d.ts.map
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { csmString } from '../type/csmstring';
import { CubismId } from './cubismid';
/**
 * ID名の管理
 *
 * ID名を管理する。
 */
export declare class CubismIdManager {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * ID名をリストから登録
     *
     * @param ids ID名リスト
     * @param count IDの個数
     */
    registerIds(ids: string[] | csmString[]): void;
    /**
     * ID名を登録
     *
     * @param id ID名
     */
    registerId(id: string | csmString): CubismId;
    /**
     * ID名からIDを取得する
     *
     * @param id ID名
     */
    getId(id: csmString | string): CubismId;
    /**
     * ID名からIDの確認
     *
     * @return true 存在する
     * @return false 存在しない
     */
    isExist(id: csmString | string): boolean;
    /**
     * ID名からIDを検索する。
     *
     * @param id ID名
     * @return 登録されているID。なければNULL。
     */
    private findId;
    private _ids;
}
import * as $ from './cubismidmanager';
export declare namespace Live2DCubismFramework {
    const CubismIdManager: typeof $.CubismIdManager;
    type CubismIdManager = $.CubismIdManager;
}
//# sourceMappingURL=cubismidmanager.d.ts.map
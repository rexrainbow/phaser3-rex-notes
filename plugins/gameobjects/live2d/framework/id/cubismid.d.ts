/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { csmString } from '../type/csmstring';
/**
 * パラメータ名・パーツ名・Drawable名を保持
 *
 * パラメータ名・パーツ名・Drawable名を保持するクラス。
 */
export declare class CubismId {
    /**
     * ID名を取得する
     */
    getString(): csmString;
    /**
     * コンストラクタ
     */
    constructor(id: string | csmString);
    /**
     * idを比較
     * @param c 比較するid
     * @return 同じならばtrue,異なっていればfalseを返す
     */
    isEqual(c: string | csmString | CubismId): boolean;
    /**
     * idを比較
     * @param c 比較するid
     * @return 同じならばtrue,異なっていればfalseを返す
     */
    isNotEqual(c: string | csmString | CubismId): boolean;
    private _id;
}
export declare type CubismIdHandle = CubismId;
import * as $ from './cubismid';
export declare namespace Live2DCubismFramework {
    const CubismId: typeof $.CubismId;
    type CubismId = $.CubismId;
    type CubismIdHandle = $.CubismIdHandle;
}
//# sourceMappingURL=cubismid.d.ts.map
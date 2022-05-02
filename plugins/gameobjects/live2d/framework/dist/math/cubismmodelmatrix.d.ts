/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { csmMap } from '../type/csmmap';
import { CubismMatrix44 } from './cubismmatrix44';
/**
 * モデル座標設定用の4x4行列
 *
 * モデル座標設定用の4x4行列クラス
 */
export declare class CubismModelMatrix extends CubismMatrix44 {
    /**
     * コンストラクタ
     *
     * @param w 横幅
     * @param h 縦幅
     */
    constructor(w?: number, h?: number);
    /**
     * 横幅を設定
     *
     * @param w 横幅
     */
    setWidth(w: number): void;
    /**
     * 縦幅を設定
     * @param h 縦幅
     */
    setHeight(h: number): void;
    /**
     * 位置を設定
     *
     * @param x X軸の位置
     * @param y Y軸の位置
     */
    setPosition(x: number, y: number): void;
    /**
     * 中心位置を設定
     *
     * @param x X軸の中心位置
     * @param y Y軸の中心位置
     *
     * @note widthかheightを設定したあとでないと、拡大率が正しく取得できないためずれる。
     */
    setCenterPosition(x: number, y: number): void;
    /**
     * 上辺の位置を設定する
     *
     * @param y 上辺のY軸位置
     */
    top(y: number): void;
    /**
     * 下辺の位置を設定する
     *
     * @param y 下辺のY軸位置
     */
    bottom(y: number): void;
    /**
     * 左辺の位置を設定
     *
     * @param x 左辺のX軸位置
     */
    left(x: number): void;
    /**
     * 右辺の位置を設定
     *
     * @param x 右辺のX軸位置
     */
    right(x: number): void;
    /**
     * X軸の中心位置を設定
     *
     * @param x X軸の中心位置
     */
    centerX(x: number): void;
    /**
     * X軸の位置を設定
     *
     * @param x X軸の位置
     */
    setX(x: number): void;
    /**
     * Y軸の中心位置を設定
     *
     * @param y Y軸の中心位置
     */
    centerY(y: number): void;
    /**
     * Y軸の位置を設定する
     *
     * @param y Y軸の位置
     */
    setY(y: number): void;
    /**
     * レイアウト情報から位置を設定
     *
     * @param layout レイアウト情報
     */
    setupFromLayout(layout: csmMap<string, number>): void;
    private _width;
    private _height;
}
import * as $ from './cubismmodelmatrix';
export declare namespace Live2DCubismFramework {
    const CubismModelMatrix: typeof $.CubismModelMatrix;
    type CubismModelMatrix = $.CubismModelMatrix;
}
//# sourceMappingURL=cubismmodelmatrix.d.ts.map
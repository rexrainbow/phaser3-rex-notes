/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismMatrix44 } from './cubismmatrix44';
/**
 * カメラの位置変更に使うと便利な4x4行列
 *
 * カメラの位置変更に使うと便利な4x4行列のクラス。
 */
export declare class CubismViewMatrix extends CubismMatrix44 {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 移動を調整
     *
     * @param x X軸の移動量
     * @param y Y軸の移動量
     */
    adjustTranslate(x: number, y: number): void;
    /**
     * 拡大率を調整
     *
     * @param cx 拡大を行うX軸の中心位置
     * @param cy 拡大を行うY軸の中心位置
     * @param scale 拡大率
     */
    adjustScale(cx: number, cy: number, scale: number): void;
    /**
     * デバイスに対応する論理座養生の範囲の設定
     *
     * @param left      左辺のX軸の位置
     * @param right     右辺のX軸の位置
     * @param bottom    下辺のY軸の位置
     * @param top       上辺のY軸の位置
     */
    setScreenRect(left: number, right: number, bottom: number, top: number): void;
    /**
     * デバイスに対応する論理座標上の移動可能範囲の設定
     * @param left      左辺のX軸の位置
     * @param right     右辺のX軸の位置
     * @param bottom    下辺のY軸の位置
     * @param top       上辺のY軸の位置
     */
    setMaxScreenRect(left: number, right: number, bottom: number, top: number): void;
    /**
     * 最大拡大率の設定
     * @param maxScale 最大拡大率
     */
    setMaxScale(maxScale: number): void;
    /**
     * 最小拡大率の設定
     * @param minScale 最小拡大率
     */
    setMinScale(minScale: number): void;
    /**
     * 最大拡大率の取得
     * @return 最大拡大率
     */
    getMaxScale(): number;
    /**
     * 最小拡大率の取得
     * @return 最小拡大率
     */
    getMinScale(): number;
    /**
     * 拡大率が最大になっているかを確認する
     *
     * @return true 拡大率は最大
     * @return false 拡大率は最大ではない
     */
    isMaxScale(): boolean;
    /**
     * 拡大率が最小になっているかを確認する
     *
     * @return true 拡大率は最小
     * @return false 拡大率は最小ではない
     */
    isMinScale(): boolean;
    /**
     * デバイスに対応する論理座標の左辺のＸ軸位置を取得する
     * @return デバイスに対応する論理座標の左辺のX軸位置
     */
    getScreenLeft(): number;
    /**
     * デバイスに対応する論理座標の右辺のＸ軸位置を取得する
     * @return デバイスに対応する論理座標の右辺のX軸位置
     */
    getScreenRight(): number;
    /**
     * デバイスに対応する論理座標の下辺のY軸位置を取得する
     * @return デバイスに対応する論理座標の下辺のY軸位置
     */
    getScreenBottom(): number;
    /**
     * デバイスに対応する論理座標の上辺のY軸位置を取得する
     * @return デバイスに対応する論理座標の上辺のY軸位置
     */
    getScreenTop(): number;
    /**
     * 左辺のX軸位置の最大値の取得
     * @return 左辺のX軸位置の最大値
     */
    getMaxLeft(): number;
    /**
     * 右辺のX軸位置の最大値の取得
     * @return 右辺のX軸位置の最大値
     */
    getMaxRight(): number;
    /**
     * 下辺のY軸位置の最大値の取得
     * @return 下辺のY軸位置の最大値
     */
    getMaxBottom(): number;
    /**
     * 上辺のY軸位置の最大値の取得
     * @return 上辺のY軸位置の最大値
     */
    getMaxTop(): number;
    private _screenLeft;
    private _screenRight;
    private _screenTop;
    private _screenBottom;
    private _maxLeft;
    private _maxRight;
    private _maxTop;
    private _maxBottom;
    private _maxScale;
    private _minScale;
}
import * as $ from './cubismviewmatrix';
export declare namespace Live2DCubismFramework {
    const CubismViewMatrix: typeof $.CubismViewMatrix;
    type CubismViewMatrix = $.CubismViewMatrix;
}
//# sourceMappingURL=cubismviewmatrix.d.ts.map
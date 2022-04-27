/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
/**
 * 顔の向きの制御機能
 *
 * 顔の向きの制御機能を提供するクラス。
 */
export declare class CubismTargetPoint {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 更新処理
     */
    update(deltaTimeSeconds: number): void;
    /**
     * X軸の顔の向きの値を取得
     *
     * @return X軸の顔の向きの値（-1.0 ~ 1.0）
     */
    getX(): number;
    /**
     * Y軸の顔の向きの値を取得
     *
     * @return Y軸の顔の向きの値（-1.0 ~ 1.0）
     */
    getY(): number;
    /**
     * 顔の向きの目標値を設定
     *
     * @param x X軸の顔の向きの値（-1.0 ~ 1.0）
     * @param y Y軸の顔の向きの値（-1.0 ~ 1.0）
     */
    set(x: number, y: number): void;
    private _faceTargetX;
    private _faceTargetY;
    private _faceX;
    private _faceY;
    private _faceVX;
    private _faceVY;
    private _lastTimeSeconds;
    private _userTimeSeconds;
}
import * as $ from './cubismtargetpoint';
export declare namespace Live2DCubismFramework {
    const CubismTargetPoint: typeof $.CubismTargetPoint;
    type CubismTargetPoint = $.CubismTargetPoint;
}
//# sourceMappingURL=cubismtargetpoint.d.ts.map
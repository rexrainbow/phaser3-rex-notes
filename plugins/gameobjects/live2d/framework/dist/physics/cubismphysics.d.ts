/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismVector2 } from '../math/cubismvector2';
import { CubismModel } from '../model/cubismmodel';
import { CubismPhysicsRig } from './cubismphysicsinternal';
/**
 * 物理演算クラス
 */
export declare class CubismPhysics {
    /**
     * インスタンスの作成
     * @param buffer    physics3.jsonが読み込まれているバッファ
     * @param size      バッファのサイズ
     * @return 作成されたインスタンス
     */
    static create(buffer: ArrayBuffer, size: number): CubismPhysics;
    /**
     * インスタンスを破棄する
     * @param physics 破棄するインスタンス
     */
    static delete(physics: CubismPhysics): void;
    /**
     * 物理演算の評価
     * @param model 物理演算の結果を適用するモデル
     * @param deltaTimeSeconds デルタ時間[秒]
     */
    evaluate(model: CubismModel, deltaTimeSeconds: number): void;
    /**
     * オプションの設定
     * @param options オプション
     */
    setOptions(options: Options): void;
    /**
     * オプションの取得
     * @return オプション
     */
    getOption(): Options;
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * physics3.jsonをパースする。
     * @param physicsJson physics3.jsonが読み込まれているバッファ
     * @param size バッファのサイズ
     */
    parse(physicsJson: ArrayBuffer, size: number): void;
    /**
     * 初期化する
     */
    initialize(): void;
    _physicsRig: CubismPhysicsRig;
    _options: Options;
}
/**
 * 物理演算のオプション
 */
export declare class Options {
    constructor();
    gravity: CubismVector2;
    wind: CubismVector2;
}
import * as $ from './cubismphysics';
export declare namespace Live2DCubismFramework {
    const CubismPhysics: typeof $.CubismPhysics;
    type CubismPhysics = $.CubismPhysics;
    const Options: typeof $.Options;
    type Options = $.Options;
}
//# sourceMappingURL=cubismphysics.d.ts.map
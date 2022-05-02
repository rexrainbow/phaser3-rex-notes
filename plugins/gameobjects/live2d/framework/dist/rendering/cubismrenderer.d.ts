/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismMatrix44 } from '../math/cubismmatrix44';
import { CubismModel } from '../model/cubismmodel';
/**
 * モデル描画を処理するレンダラ
 *
 * サブクラスに環境依存の描画命令を記述する。
 */
export declare abstract class CubismRenderer {
    /**
     * レンダラのインスタンスを生成して取得する
     *
     * @return レンダラのインスタンス
     */
    static create(): CubismRenderer;
    /**
     * レンダラのインスタンスを解放する
     */
    static delete(renderer: CubismRenderer): void;
    /**
     * レンダラの初期化処理を実行する
     * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
     * @param model モデルのインスタンス
     */
    initialize(model: CubismModel): void;
    /**
     * モデルを描画する
     */
    drawModel(): void;
    /**
     * Model-View-Projection 行列をセットする
     * 配列は複製されるので、元の配列は外で破棄して良い
     * @param matrix44 Model-View-Projection 行列
     */
    setMvpMatrix(matrix44: CubismMatrix44): void;
    /**
     * Model-View-Projection 行列を取得する
     * @return Model-View-Projection 行列
     */
    getMvpMatrix(): CubismMatrix44;
    /**
     * モデルの色をセットする
     * 各色0.0~1.0の間で指定する（1.0が標準の状態）
     * @param red 赤チャンネルの値
     * @param green 緑チャンネルの値
     * @param blue 青チャンネルの値
     * @param alpha αチャンネルの値
     */
    setModelColor(red: number, green: number, blue: number, alpha: number): void;
    /**
     * モデルの色を取得する
     * 各色0.0~1.0の間で指定する(1.0が標準の状態)
     *
     * @return RGBAのカラー情報
     */
    getModelColor(): CubismTextureColor;
    /**
     * 乗算済みαの有効・無効をセットする
     * 有効にするならtrue、無効にするならfalseをセットする
     */
    setIsPremultipliedAlpha(enable: boolean): void;
    /**
     * 乗算済みαの有効・無効を取得する
     * @return true 乗算済みのα有効
     * @return false 乗算済みのα無効
     */
    isPremultipliedAlpha(): boolean;
    /**
     * カリング（片面描画）の有効・無効をセットする。
     * 有効にするならtrue、無効にするならfalseをセットする
     */
    setIsCulling(culling: boolean): void;
    /**
     * カリング（片面描画）の有効・無効を取得する。
     * @return true カリング有効
     * @return false カリング無効
     */
    isCulling(): boolean;
    /**
     * テクスチャの異方性フィルタリングのパラメータをセットする
     * パラメータ値の影響度はレンダラの実装に依存する
     * @param n パラメータの値
     */
    setAnisotropy(n: number): void;
    /**
     * テクスチャの異方性フィルタリングのパラメータをセットする
     * @return 異方性フィルタリングのパラメータ
     */
    getAnisotropy(): number;
    /**
     * レンダリングするモデルを取得する
     * @return レンダリングするモデル
     */
    getModel(): CubismModel;
    /**
     * コンストラクタ
     */
    protected constructor();
    /**
     * モデル描画の実装
     */
    abstract doDrawModel(): void;
    /**
     * 描画オブジェクト（アートメッシュ）を描画する
     * ポリゴンメッシュとテクスチャ番号をセットで渡す。
     * @param textureNo 描画するテクスチャ番号
     * @param indexCount 描画オブジェクトのインデックス値
     * @param vertexCount ポリゴンメッシュの頂点数
     * @param indexArray ポリゴンメッシュ頂点のインデックス配列
     * @param vertexArray ポリゴンメッシュの頂点配列
     * @param uvArray uv配列
     * @param opacity 不透明度
     * @param colorBlendMode カラーブレンディングのタイプ
     * @param invertedMask マスク使用時のマスクの反転使用
     */
    abstract drawMesh(textureNo: number, indexCount: number, vertexCount: number, indexArray: Uint16Array, vertexArray: Float32Array, uvArray: Float32Array, opacity: number, colorBlendMode: CubismBlendMode, invertedMask: boolean): void;
    /**
     * レンダラが保持する静的なリソースを開放する
     */
    static staticRelease: Function;
    protected _mvpMatrix4x4: CubismMatrix44;
    protected _modelColor: CubismTextureColor;
    protected _isCulling: boolean;
    protected _isPremultipliedAlpha: boolean;
    protected _anisortopy: any;
    protected _model: CubismModel;
}
export declare enum CubismBlendMode {
    CubismBlendMode_Normal = 0,
    CubismBlendMode_Additive = 1,
    CubismBlendMode_Multiplicative = 2
}
/**
 * テクスチャの色をRGBAで扱うためのクラス
 */
export declare class CubismTextureColor {
    /**
     * コンストラクタ
     */
    constructor();
    R: number;
    G: number;
    B: number;
    A: number;
}
import * as $ from './cubismrenderer';
export declare namespace Live2DCubismFramework {
    const CubismBlendMode: typeof $.CubismBlendMode;
    type CubismBlendMode = $.CubismBlendMode;
    const CubismRenderer: typeof $.CubismRenderer;
    type CubismRenderer = $.CubismRenderer;
    const CubismTextureColor: typeof $.CubismTextureColor;
    type CubismTextureColor = $.CubismTextureColor;
}
//# sourceMappingURL=cubismrenderer.d.ts.map
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismMatrix44 } from '../math/cubismmatrix44';
import { CubismModel } from '../model/cubismmodel';
import { csmMap } from '../type/csmmap';
import { csmRect } from '../type/csmrectf';
import { csmVector } from '../type/csmvector';
import { CubismBlendMode, CubismRenderer, CubismTextureColor } from './cubismrenderer';
/**
 * クリッピングマスクの処理を実行するクラス
 */
export declare class CubismClippingManager_WebGL {
    /**
     * カラーチャンネル（RGBA）のフラグを取得する
     * @param channelNo カラーチャンネル（RGBA）の番号（0:R, 1:G, 2:B, 3:A）
     */
    getChannelFlagAsColor(channelNo: number): CubismTextureColor;
    /**
     * テンポラリのレンダーテクスチャのアドレスを取得する
     * FrameBufferObjectが存在しない場合、新しく生成する
     *
     * @return レンダーテクスチャのアドレス
     */
    getMaskRenderTexture(): WebGLFramebuffer;
    /**
     * WebGLレンダリングコンテキストを設定する
     * @param gl WebGLレンダリングコンテキスト
     */
    setGL(gl: WebGLRenderingContext): void;
    /**
     * マスクされる描画オブジェクト群全体を囲む矩形（モデル座標系）を計算する
     * @param model モデルのインスタンス
     * @param clippingContext クリッピングマスクのコンテキスト
     */
    calcClippedDrawTotalBounds(model: CubismModel, clippingContext: CubismClippingContext): void;
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * マネージャの初期化処理
     * クリッピングマスクを使う描画オブジェクトの登録を行う
     * @param model モデルのインスタンス
     * @param drawableCount 描画オブジェクトの数
     * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのインデックスのリスト
     * @param drawableCounts 描画オブジェクトをマスクする描画オブジェクトの数
     */
    initialize(model: CubismModel, drawableCount: number, drawableMasks: Int32Array[], drawableMaskCounts: Int32Array): void;
    /**
     * クリッピングコンテキストを作成する。モデル描画時に実行する。
     * @param model モデルのインスタンス
     * @param renderer レンダラのインスタンス
     */
    setupClippingContext(model: CubismModel, renderer: CubismRenderer_WebGL): void;
    /**
     * 既にマスクを作っているかを確認
     * 作っている様であれば該当するクリッピングマスクのインスタンスを返す
     * 作っていなければNULLを返す
     * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのリスト
     * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
     * @return 該当するクリッピングマスクが存在すればインスタンスを返し、なければNULLを返す
     */
    findSameClip(drawableMasks: Int32Array, drawableMaskCounts: number): CubismClippingContext;
    /**
     * クリッピングコンテキストを配置するレイアウト
     * 一つのレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする
     * マスクグループの数が4以下ならRGBA各チャンネルに一つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
     *
     * @param usingClipCount 配置するクリッピングコンテキストの数
     */
    setupLayoutBounds(usingClipCount: number): void;
    /**
     * カラーバッファを取得する
     * @return カラーバッファ
     */
    getColorBuffer(): WebGLTexture;
    /**
     * 画面描画に使用するクリッピングマスクのリストを取得する
     * @return 画面描画に使用するクリッピングマスクのリスト
     */
    getClippingContextListForDraw(): csmVector<CubismClippingContext>;
    /**
     * クリッピングマスクバッファのサイズを設定する
     * @param size クリッピングマスクバッファのサイズ
     */
    setClippingMaskBufferSize(size: number): void;
    /**
     * クリッピングマスクバッファのサイズを取得する
     * @return クリッピングマスクバッファのサイズ
     */
    getClippingMaskBufferSize(): number;
    _maskRenderTexture: WebGLFramebuffer;
    _colorBuffer: WebGLTexture;
    _currentFrameNo: number;
    _channelColors: csmVector<CubismTextureColor>;
    _maskTexture: CubismRenderTextureResource;
    _clippingContextListForMask: csmVector<CubismClippingContext>;
    _clippingContextListForDraw: csmVector<CubismClippingContext>;
    _clippingMaskBufferSize: number;
    private _tmpMatrix;
    private _tmpMatrixForMask;
    private _tmpMatrixForDraw;
    private _tmpBoundsOnModel;
    gl: WebGLRenderingContext;
}
/**
 * レンダーテクスチャのリソースを定義する構造体
 * クリッピングマスクで使用する
 */
export declare class CubismRenderTextureResource {
    /**
     * 引数付きコンストラクタ
     * @param frameNo レンダラーのフレーム番号
     * @param texture テクスチャのアドレス
     */
    constructor(frameNo: number, texture: WebGLFramebuffer);
    frameNo: number;
    texture: WebGLFramebuffer;
}
/**
 * クリッピングマスクのコンテキスト
 */
export declare class CubismClippingContext {
    /**
     * 引数付きコンストラクタ
     */
    constructor(manager: CubismClippingManager_WebGL, clippingDrawableIndices: Int32Array, clipCount: number);
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * このマスクにクリップされる描画オブジェクトを追加する
     *
     * @param drawableIndex クリッピング対象に追加する描画オブジェクトのインデックス
     */
    addClippedDrawable(drawableIndex: number): void;
    /**
     * このマスクを管理するマネージャのインスタンスを取得する
     * @return クリッピングマネージャのインスタンス
     */
    getClippingManager(): CubismClippingManager_WebGL;
    setGl(gl: WebGLRenderingContext): void;
    _isUsing: boolean;
    readonly _clippingIdList: Int32Array;
    _clippingIdCount: number;
    _layoutChannelNo: number;
    _layoutBounds: csmRect;
    _allClippedDrawRect: csmRect;
    _matrixForMask: CubismMatrix44;
    _matrixForDraw: CubismMatrix44;
    _clippedDrawableIndexList: number[];
    private _owner;
}
/**
 * WebGL用のシェーダープログラムを生成・破棄するクラス
 * シングルトンなクラスであり、CubismShader_WebGL.getInstanceからアクセスする。
 */
export declare class CubismShader_WebGL {
    /**
     * インスタンスを取得する（シングルトン）
     * @return インスタンス
     */
    static getInstance(): CubismShader_WebGL;
    /**
     * インスタンスを開放する（シングルトン）
     */
    static deleteInstance(): void;
    /**
     * privateなコンストラクタ
     */
    private constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * シェーダープログラムの一連のセットアップを実行する
     * @param renderer レンダラのインスタンス
     * @param textureId GPUのテクスチャID
     * @param vertexCount ポリゴンメッシュの頂点数
     * @param vertexArray ポリゴンメッシュの頂点配列
     * @param indexArray インデックスバッファの頂点配列
     * @param uvArray uv配列
     * @param opacity 不透明度
     * @param colorBlendMode カラーブレンディングのタイプ
     * @param baseColor ベースカラー
     * @param isPremultipliedAlpha 乗算済みアルファかどうか
     * @param matrix4x4 Model-View-Projection行列
     * @param invertedMask マスクを反転して使用するフラグ
     */
    setupShaderProgram(renderer: CubismRenderer_WebGL, textureId: WebGLTexture, vertexCount: number, vertexArray: Float32Array, indexArray: Uint16Array, uvArray: Float32Array, bufferData: {
        vertex: WebGLBuffer;
        uv: WebGLBuffer;
        index: WebGLBuffer;
    }, opacity: number, colorBlendMode: CubismBlendMode, baseColor: CubismTextureColor, isPremultipliedAlpha: boolean, matrix4x4: CubismMatrix44, invertedMask: boolean): void;
    /**
     * シェーダープログラムを解放する
     */
    releaseShaderProgram(): void;
    /**
     * シェーダープログラムを初期化する
     * @param vertShaderSrc 頂点シェーダのソース
     * @param fragShaderSrc フラグメントシェーダのソース
     */
    generateShaders(): void;
    /**
     * シェーダプログラムをロードしてアドレスを返す
     * @param vertexShaderSource    頂点シェーダのソース
     * @param fragmentShaderSource  フラグメントシェーダのソース
     * @return シェーダプログラムのアドレス
     */
    loadShaderProgram(vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram;
    /**
     * シェーダープログラムをコンパイルする
     * @param shaderType シェーダタイプ(Vertex/Fragment)
     * @param shaderSource シェーダソースコード
     *
     * @return コンパイルされたシェーダープログラム
     */
    compileShaderSource(shaderType: GLenum, shaderSource: string): WebGLProgram;
    setGl(gl: WebGLRenderingContext): void;
    _shaderSets: csmVector<CubismShaderSet>;
    gl: WebGLRenderingContext;
}
/**
 * CubismShader_WebGLのインナークラス
 */
export declare class CubismShaderSet {
    shaderProgram: WebGLProgram;
    attributePositionLocation: GLuint;
    attributeTexCoordLocation: GLuint;
    uniformMatrixLocation: WebGLUniformLocation;
    uniformClipMatrixLocation: WebGLUniformLocation;
    samplerTexture0Location: WebGLUniformLocation;
    samplerTexture1Location: WebGLUniformLocation;
    uniformBaseColorLocation: WebGLUniformLocation;
    uniformChannelFlagLocation: WebGLUniformLocation;
}
export declare enum ShaderNames {
    ShaderNames_SetupMask = 0,
    ShaderNames_NormalPremultipliedAlpha = 1,
    ShaderNames_NormalMaskedPremultipliedAlpha = 2,
    ShaderNames_NomralMaskedInvertedPremultipliedAlpha = 3,
    ShaderNames_AddPremultipliedAlpha = 4,
    ShaderNames_AddMaskedPremultipliedAlpha = 5,
    ShaderNames_AddMaskedPremultipliedAlphaInverted = 6,
    ShaderNames_MultPremultipliedAlpha = 7,
    ShaderNames_MultMaskedPremultipliedAlpha = 8,
    ShaderNames_MultMaskedPremultipliedAlphaInverted = 9
}
export declare const vertexShaderSrcSetupMask: string;
export declare const fragmentShaderSrcsetupMask: string;
export declare const vertexShaderSrc: string;
export declare const vertexShaderSrcMasked: string;
export declare const fragmentShaderSrcPremultipliedAlpha: string;
export declare const fragmentShaderSrcMaskPremultipliedAlpha: string;
export declare const fragmentShaderSrcMaskInvertedPremultipliedAlpha: string;
/**
 * WebGL用の描画命令を実装したクラス
 */
export declare class CubismRenderer_WebGL extends CubismRenderer {
    /**
     * レンダラの初期化処理を実行する
     * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
     *
     * @param model モデルのインスタンス
     */
    initialize(model: CubismModel): void;
    /**
     * WebGLテクスチャのバインド処理
     * CubismRendererにテクスチャを設定し、CubismRenderer内でその画像を参照するためのIndex値を戻り値とする
     * @param modelTextureNo セットするモデルテクスチャの番号
     * @param glTextureNo WebGLテクスチャの番号
     */
    bindTexture(modelTextureNo: number, glTexture: WebGLTexture): void;
    /**
     * WebGLにバインドされたテクスチャのリストを取得する
     * @return テクスチャのリスト
     */
    getBindedTextures(): csmMap<number, WebGLTexture>;
    /**
     * クリッピングマスクバッファのサイズを設定する
     * マスク用のFrameBufferを破棄、再作成する為処理コストは高い
     * @param size クリッピングマスクバッファのサイズ
     */
    setClippingMaskBufferSize(size: number): void;
    /**
     * クリッピングマスクバッファのサイズを取得する
     * @return クリッピングマスクバッファのサイズ
     */
    getClippingMaskBufferSize(): number;
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * デストラクタ相当の処理
     */
    release(): void;
    /**
     * モデルを描画する実際の処理
     */
    doDrawModel(): void;
    /**
     * [オーバーライド]
     * 描画オブジェクト（アートメッシュ）を描画する。
     * ポリゴンメッシュとテクスチャ番号をセットで渡す。
     * @param textureNo 描画するテクスチャ番号
     * @param indexCount 描画オブジェクトのインデックス値
     * @param vertexCount ポリゴンメッシュの頂点数
     * @param indexArray ポリゴンメッシュのインデックス配列
     * @param vertexArray ポリゴンメッシュの頂点配列
     * @param uvArray uv配列
     * @param opacity 不透明度
     * @param colorBlendMode カラー合成タイプ
     * @param invertedMask マスク使用時のマスクの反転使用
     */
    drawMesh(textureNo: number, indexCount: number, vertexCount: number, indexArray: Uint16Array, vertexArray: Float32Array, uvArray: Float32Array, opacity: number, colorBlendMode: CubismBlendMode, invertedMask: boolean): void;
    /**
     * レンダラが保持する静的なリソースを解放する
     * WebGLの静的なシェーダープログラムを解放する
     */
    static doStaticRelease(): void;
    /**
     * レンダーステートを設定する
     * @param fbo アプリケーション側で指定しているフレームバッファ
     * @param viewport ビューポート
     */
    setRenderState(fbo: WebGLFramebuffer, viewport: number[]): void;
    /**
     * 描画開始時の追加処理
     * モデルを描画する前にクリッピングマスクに必要な処理を実装している
     */
    preDraw(): void;
    /**
     * マスクテクスチャに描画するクリッピングコンテキストをセットする
     */
    setClippingContextBufferForMask(clip: CubismClippingContext): void;
    /**
     * マスクテクスチャに描画するクリッピングコンテキストを取得する
     * @return マスクテクスチャに描画するクリッピングコンテキスト
     */
    getClippingContextBufferForMask(): CubismClippingContext;
    /**
     * 画面上に描画するクリッピングコンテキストをセットする
     */
    setClippingContextBufferForDraw(clip: CubismClippingContext): void;
    /**
     * 画面上に描画するクリッピングコンテキストを取得する
     * @return 画面上に描画するクリッピングコンテキスト
     */
    getClippingContextBufferForDraw(): CubismClippingContext;
    /**
     * glの設定
     */
    startUp(gl: WebGLRenderingContext): void;
    _textures: csmMap<number, WebGLTexture>;
    _sortedDrawableIndexList: csmVector<number>;
    _clippingManager: CubismClippingManager_WebGL;
    _clippingContextBufferForMask: CubismClippingContext;
    _clippingContextBufferForDraw: CubismClippingContext;
    firstDraw: boolean;
    _bufferData: {
        vertex: WebGLBuffer;
        uv: WebGLBuffer;
        index: WebGLBuffer;
    };
    gl: WebGLRenderingContext;
}
import * as $ from './cubismrenderer_webgl';
export declare namespace Live2DCubismFramework {
    const CubismClippingContext: typeof $.CubismClippingContext;
    type CubismClippingContext = $.CubismClippingContext;
    const CubismClippingManager_WebGL: typeof $.CubismClippingManager_WebGL;
    type CubismClippingManager_WebGL = $.CubismClippingManager_WebGL;
    const CubismRenderTextureResource: typeof $.CubismRenderTextureResource;
    type CubismRenderTextureResource = $.CubismRenderTextureResource;
    const CubismRenderer_WebGL: typeof $.CubismRenderer_WebGL;
    type CubismRenderer_WebGL = $.CubismRenderer_WebGL;
    const CubismShaderSet: typeof $.CubismShaderSet;
    type CubismShaderSet = $.CubismShaderSet;
    const CubismShader_WebGL: typeof $.CubismShader_WebGL;
    type CubismShader_WebGL = $.CubismShader_WebGL;
    const ShaderNames: typeof $.ShaderNames;
    type ShaderNames = $.ShaderNames;
}
//# sourceMappingURL=cubismrenderer_webgl.d.ts.map
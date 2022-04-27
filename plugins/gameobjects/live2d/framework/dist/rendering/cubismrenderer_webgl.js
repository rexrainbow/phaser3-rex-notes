"use strict";
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var live2dcubismframework_1 = require("../live2dcubismframework");
var cubismmatrix44_1 = require("../math/cubismmatrix44");
var csmmap_1 = require("../type/csmmap");
var csmrectf_1 = require("../type/csmrectf");
var csmvector_1 = require("../type/csmvector");
var cubismdebug_1 = require("../utils/cubismdebug");
var cubismrenderer_1 = require("./cubismrenderer");
var ColorChannelCount = 4; // 実験時に1チャンネルの場合は1、RGBだけの場合は3、アルファも含める場合は4
var shaderCount = 10; // シェーダーの数 = マスク生成用 + (通常用 + 加算 + 乗算) * (マスク無の乗算済アルファ対応版 + マスク有の乗算済アルファ対応版 + マスク有反転の乗算済アルファ対応版)
var s_instance;
var s_viewport;
var s_fbo;
/**
 * クリッピングマスクの処理を実行するクラス
 */
var CubismClippingManager_WebGL = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismClippingManager_WebGL() {
        this._maskRenderTexture = null;
        this._colorBuffer = null;
        this._currentFrameNo = 0;
        this._clippingMaskBufferSize = 256;
        this._clippingContextListForMask = new csmvector_1.csmVector();
        this._clippingContextListForDraw = new csmvector_1.csmVector();
        this._channelColors = new csmvector_1.csmVector();
        this._tmpBoundsOnModel = new csmrectf_1.csmRect();
        this._tmpMatrix = new cubismmatrix44_1.CubismMatrix44();
        this._tmpMatrixForMask = new cubismmatrix44_1.CubismMatrix44();
        this._tmpMatrixForDraw = new cubismmatrix44_1.CubismMatrix44();
        this._maskTexture = null;
        var tmp = new cubismrenderer_1.CubismTextureColor();
        tmp.R = 1.0;
        tmp.G = 0.0;
        tmp.B = 0.0;
        tmp.A = 0.0;
        this._channelColors.pushBack(tmp);
        tmp = new cubismrenderer_1.CubismTextureColor();
        tmp.R = 0.0;
        tmp.G = 1.0;
        tmp.B = 0.0;
        tmp.A = 0.0;
        this._channelColors.pushBack(tmp);
        tmp = new cubismrenderer_1.CubismTextureColor();
        tmp.R = 0.0;
        tmp.G = 0.0;
        tmp.B = 1.0;
        tmp.A = 0.0;
        this._channelColors.pushBack(tmp);
        tmp = new cubismrenderer_1.CubismTextureColor();
        tmp.R = 0.0;
        tmp.G = 0.0;
        tmp.B = 0.0;
        tmp.A = 1.0;
        this._channelColors.pushBack(tmp);
    }
    /**
     * カラーチャンネル（RGBA）のフラグを取得する
     * @param channelNo カラーチャンネル（RGBA）の番号（0:R, 1:G, 2:B, 3:A）
     */
    CubismClippingManager_WebGL.prototype.getChannelFlagAsColor = function (channelNo) {
        return this._channelColors.at(channelNo);
    };
    /**
     * テンポラリのレンダーテクスチャのアドレスを取得する
     * FrameBufferObjectが存在しない場合、新しく生成する
     *
     * @return レンダーテクスチャのアドレス
     */
    CubismClippingManager_WebGL.prototype.getMaskRenderTexture = function () {
        var ret = 0;
        // テンポラリのRenderTextureを取得する
        if (this._maskTexture && this._maskTexture.texture != 0) {
            // 前回使ったものを返す
            this._maskTexture.frameNo = this._currentFrameNo;
            ret = this._maskTexture.texture;
        }
        if (ret == 0) {
            // FrameBufferObjectが存在しない場合、新しく生成する
            // クリッピングバッファサイズを取得
            var size = this._clippingMaskBufferSize;
            this._colorBuffer = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this._colorBuffer);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, size, size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            ret = this.gl.createFramebuffer();
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, ret);
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this._colorBuffer, 0);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
            this._maskTexture = new CubismRenderTextureResource(this._currentFrameNo, ret);
        }
        return ret;
    };
    /**
     * WebGLレンダリングコンテキストを設定する
     * @param gl WebGLレンダリングコンテキスト
     */
    CubismClippingManager_WebGL.prototype.setGL = function (gl) {
        this.gl = gl;
    };
    /**
     * マスクされる描画オブジェクト群全体を囲む矩形（モデル座標系）を計算する
     * @param model モデルのインスタンス
     * @param clippingContext クリッピングマスクのコンテキスト
     */
    CubismClippingManager_WebGL.prototype.calcClippedDrawTotalBounds = function (model, clippingContext) {
        // 被クリッピングマスク（マスクされる描画オブジェクト）の全体の矩形
        var clippedDrawTotalMinX = Number.MAX_VALUE;
        var clippedDrawTotalMinY = Number.MAX_VALUE;
        var clippedDrawTotalMaxX = Number.MIN_VALUE;
        var clippedDrawTotalMaxY = Number.MIN_VALUE;
        // このマスクが実際に必要か判定する
        // このクリッピングを利用する「描画オブジェクト」がひとつでも使用可能であればマスクを生成する必要がある
        var clippedDrawCount = clippingContext._clippedDrawableIndexList.length;
        for (var clippedDrawableIndex = 0; clippedDrawableIndex < clippedDrawCount; clippedDrawableIndex++) {
            // マスクを使用する描画オブジェクトの描画される矩形を求める
            var drawableIndex = clippingContext._clippedDrawableIndexList[clippedDrawableIndex];
            var drawableVertexCount = model.getDrawableVertexCount(drawableIndex);
            var drawableVertexes = model.getDrawableVertices(drawableIndex);
            var minX = Number.MAX_VALUE;
            var minY = Number.MAX_VALUE;
            var maxX = Number.MIN_VALUE;
            var maxY = Number.MIN_VALUE;
            var loop = drawableVertexCount * live2dcubismframework_1.Constant.vertexStep;
            for (var pi = live2dcubismframework_1.Constant.vertexOffset; pi < loop; pi += live2dcubismframework_1.Constant.vertexStep) {
                var x = drawableVertexes[pi];
                var y = drawableVertexes[pi + 1];
                if (x < minX) {
                    minX = x;
                }
                if (x > maxX) {
                    maxX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (y > maxY) {
                    maxY = y;
                }
            }
            // 有効な点が一つも取れなかったのでスキップ
            if (minX == Number.MAX_VALUE) {
                continue;
            }
            // 全体の矩形に反映
            if (minX < clippedDrawTotalMinX) {
                clippedDrawTotalMinX = minX;
            }
            if (minY < clippedDrawTotalMinY) {
                clippedDrawTotalMinY = minY;
            }
            if (maxX > clippedDrawTotalMaxX) {
                clippedDrawTotalMaxX = maxX;
            }
            if (maxY > clippedDrawTotalMaxY) {
                clippedDrawTotalMaxY = maxY;
            }
            if (clippedDrawTotalMinX == Number.MAX_VALUE) {
                clippingContext._allClippedDrawRect.x = 0.0;
                clippingContext._allClippedDrawRect.y = 0.0;
                clippingContext._allClippedDrawRect.width = 0.0;
                clippingContext._allClippedDrawRect.height = 0.0;
                clippingContext._isUsing = false;
            }
            else {
                clippingContext._isUsing = true;
                var w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
                var h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
                clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
                clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
                clippingContext._allClippedDrawRect.width = w;
                clippingContext._allClippedDrawRect.height = h;
            }
        }
    };
    /**
     * デストラクタ相当の処理
     */
    CubismClippingManager_WebGL.prototype.release = function () {
        for (var i = 0; i < this._clippingContextListForMask.getSize(); i++) {
            if (this._clippingContextListForMask.at(i)) {
                this._clippingContextListForMask.at(i).release();
                this._clippingContextListForMask.set(i, void 0);
            }
            this._clippingContextListForMask.set(i, null);
        }
        this._clippingContextListForMask = null;
        // _clippingContextListForDrawは_clippingContextListForMaskにあるインスタンスを指している。上記の処理により要素ごとのDELETEは不要。
        for (var i = 0; i < this._clippingContextListForDraw.getSize(); i++) {
            this._clippingContextListForDraw.set(i, null);
        }
        this._clippingContextListForDraw = null;
        if (this._maskTexture) {
            this.gl.deleteFramebuffer(this._maskTexture.texture);
            this._maskTexture = null;
        }
        for (var i = 0; i < this._channelColors.getSize(); i++) {
            this._channelColors.set(i, null);
        }
        this._channelColors = null;
        // テクスチャ解放
        this.gl.deleteTexture(this._colorBuffer);
        this._colorBuffer = null;
    };
    /**
     * マネージャの初期化処理
     * クリッピングマスクを使う描画オブジェクトの登録を行う
     * @param model モデルのインスタンス
     * @param drawableCount 描画オブジェクトの数
     * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのインデックスのリスト
     * @param drawableCounts 描画オブジェクトをマスクする描画オブジェクトの数
     */
    CubismClippingManager_WebGL.prototype.initialize = function (model, drawableCount, drawableMasks, drawableMaskCounts) {
        // クリッピングマスクを使う描画オブジェクトをすべて登録する
        // クリッピングマスクは、通常数個程度に限定して使うものとする
        for (var i = 0; i < drawableCount; i++) {
            if (drawableMaskCounts[i] <= 0) {
                // クリッピングマスクが使用されていないアートメッシュ（多くの場合使用しない）
                this._clippingContextListForDraw.pushBack(null);
                continue;
            }
            // 既にあるClipContextと同じかチェックする
            var clippingContext = this.findSameClip(drawableMasks[i], drawableMaskCounts[i]);
            if (clippingContext == null) {
                // 同一のマスクが存在していない場合は生成する
                clippingContext = new CubismClippingContext(this, drawableMasks[i], drawableMaskCounts[i]);
                this._clippingContextListForMask.pushBack(clippingContext);
            }
            clippingContext.addClippedDrawable(i);
            this._clippingContextListForDraw.pushBack(clippingContext);
        }
    };
    /**
     * クリッピングコンテキストを作成する。モデル描画時に実行する。
     * @param model モデルのインスタンス
     * @param renderer レンダラのインスタンス
     */
    CubismClippingManager_WebGL.prototype.setupClippingContext = function (model, renderer) {
        this._currentFrameNo++;
        // 全てのクリッピングを用意する
        // 同じクリップ（複数の場合はまとめて一つのクリップ）を使う場合は1度だけ設定する
        var usingClipCount = 0;
        for (var clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
            // 1つのクリッピングマスクに関して
            var cc = this._clippingContextListForMask.at(clipIndex);
            // このクリップを利用する描画オブジェクト群全体を囲む矩形を計算
            this.calcClippedDrawTotalBounds(model, cc);
            if (cc._isUsing) {
                usingClipCount++; // 使用中としてカウント
            }
        }
        // マスク作成処理
        if (usingClipCount > 0) {
            // 生成したFrameBufferと同じサイズでビューポートを設定
            this.gl.viewport(0, 0, this._clippingMaskBufferSize, this._clippingMaskBufferSize);
            // マスクをactiveにする
            this._maskRenderTexture = this.getMaskRenderTexture();
            // モデル描画時にDrawMeshNowに渡される変換(モデルtoワールド座標変換)
            var modelToWorldF = renderer.getMvpMatrix();
            renderer.preDraw(); // バッファをクリアする
            // 各マスクのレイアウトを決定していく
            this.setupLayoutBounds(usingClipCount);
            // ---------- マスク描画処理 ----------
            // マスク用RenderTextureをactiveにセット
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._maskRenderTexture);
            // マスクをクリアする
            // (仮仕様) 1が無効（描かれない）領域、0が有効（描かれる）領域。（シェーダーCd*Csで0に近い値をかけてマスクを作る。1をかけると何も起こらない）
            this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            // 実際にマスクを生成する
            // 全てのマスクをどのようにレイアウトして描くかを決定し、ClipContext, ClippedDrawContextに記憶する
            for (var clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
                // --- 実際に1つのマスクを描く ---
                var clipContext = this._clippingContextListForMask.at(clipIndex);
                var allClipedDrawRect = clipContext._allClippedDrawRect; // このマスクを使う、すべての描画オブジェクトの論理座標上の囲み矩形
                var layoutBoundsOnTex01 = clipContext._layoutBounds; // この中にマスクを収める
                // モデル座標上の矩形を、適宜マージンを付けて使う
                var MARGIN = 0.05;
                this._tmpBoundsOnModel.setRect(allClipedDrawRect);
                this._tmpBoundsOnModel.expand(allClipedDrawRect.width * MARGIN, allClipedDrawRect.height * MARGIN);
                //########## 本来は割り当てられた領域の全体を使わず必要最低限のサイズがよい
                // シェーダ用の計算式を求める。回転を考慮しない場合は以下のとおり
                // movePeriod' = movePeriod * scaleX + offX		  [[ movePeriod' = (movePeriod - tmpBoundsOnModel.movePeriod)*scale + layoutBoundsOnTex01.movePeriod ]]
                var scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
                var scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
                // マスク生成時に使う行列を求める
                {
                    // シェーダに渡す行列を求める <<<<<<<<<<<<<<<<<<<<<<<< 要最適化（逆順に計算すればシンプルにできる）
                    this._tmpMatrix.loadIdentity();
                    {
                        // layout0..1 を -1..1に変換
                        this._tmpMatrix.translateRelative(-1.0, -1.0);
                        this._tmpMatrix.scaleRelative(2.0, 2.0);
                    }
                    {
                        // view to layout0..1
                        this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                        this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
                        this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                        // new = [translate][scale][translate]
                    }
                    // tmpMatrixForMaskが計算結果
                    this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
                }
                //--------- draw時の mask 参照用行列を計算
                {
                    // シェーダに渡す行列を求める <<<<<<<<<<<<<<<<<<<<<<<< 要最適化（逆順に計算すればシンプルにできる）
                    this._tmpMatrix.loadIdentity();
                    {
                        this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                        this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
                        this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                        // new = [translate][scale][translate]
                    }
                    this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
                }
                clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
                clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
                var clipDrawCount = clipContext._clippingIdCount;
                for (var i = 0; i < clipDrawCount; i++) {
                    var clipDrawIndex = clipContext._clippingIdList[i];
                    // 頂点情報が更新されておらず、信頼性がない場合は描画をパスする
                    if (!model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                        continue;
                    }
                    renderer.setIsCulling(model.getDrawableCulling(clipDrawIndex) != false);
                    // 今回専用の変換を適用して描く
                    // チャンネルも切り替える必要がある(A,R,G,B)
                    renderer.setClippingContextBufferForMask(clipContext);
                    renderer.drawMesh(model.getDrawableTextureIndices(clipDrawIndex), model.getDrawableVertexIndexCount(clipDrawIndex), model.getDrawableVertexCount(clipDrawIndex), model.getDrawableVertexIndices(clipDrawIndex), model.getDrawableVertices(clipDrawIndex), model.getDrawableVertexUvs(clipDrawIndex), model.getDrawableOpacity(clipDrawIndex), cubismrenderer_1.CubismBlendMode.CubismBlendMode_Normal, // クリッピングは通常描画を強制
                    false // マスク生成時はクリッピングの反転使用は全く関係がない
                    );
                }
            }
            // --- 後処理 ---
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo); // 描画対象を戻す
            renderer.setClippingContextBufferForMask(null);
            this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
        }
    };
    /**
     * 既にマスクを作っているかを確認
     * 作っている様であれば該当するクリッピングマスクのインスタンスを返す
     * 作っていなければNULLを返す
     * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのリスト
     * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
     * @return 該当するクリッピングマスクが存在すればインスタンスを返し、なければNULLを返す
     */
    CubismClippingManager_WebGL.prototype.findSameClip = function (drawableMasks, drawableMaskCounts) {
        // 作成済みClippingContextと一致するか確認
        for (var i = 0; i < this._clippingContextListForMask.getSize(); i++) {
            var clippingContext = this._clippingContextListForMask.at(i);
            var count = clippingContext._clippingIdCount;
            // 個数が違う場合は別物
            if (count != drawableMaskCounts) {
                continue;
            }
            var sameCount = 0;
            // 同じIDを持つか確認。配列の数が同じなので、一致した個数が同じなら同じ物を持つとする
            for (var j = 0; j < count; j++) {
                var clipId = clippingContext._clippingIdList[j];
                for (var k = 0; k < count; k++) {
                    if (drawableMasks[k] == clipId) {
                        sameCount++;
                        break;
                    }
                }
            }
            if (sameCount == count) {
                return clippingContext;
            }
        }
        return null; // 見つからなかった
    };
    /**
     * クリッピングコンテキストを配置するレイアウト
     * 一つのレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする
     * マスクグループの数が4以下ならRGBA各チャンネルに一つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
     *
     * @param usingClipCount 配置するクリッピングコンテキストの数
     */
    CubismClippingManager_WebGL.prototype.setupLayoutBounds = function (usingClipCount) {
        // ひとつのRenderTextureを極力いっぱいに使ってマスクをレイアウトする
        // マスクグループの数が4以下ならRGBA各チャンネルに1つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する
        // RGBAを順番に使っていく
        var div = usingClipCount / ColorChannelCount; // 1チャンネルに配置する基本のマスク
        var mod = usingClipCount % ColorChannelCount; // 余り、この番号のチャンネルまでに一つずつ配分する
        // 小数点は切り捨てる
        div = ~~div;
        mod = ~~mod;
        // RGBAそれぞれのチャンネルを用意していく（0:R, 1:G, 2:B, 3:A）
        var curClipIndex = 0; // 順番に設定していく
        for (var channelNo = 0; channelNo < ColorChannelCount; channelNo++) {
            // このチャンネルにレイアウトする数
            var layoutCount = div + (channelNo < mod ? 1 : 0);
            // 分割方法を決定する
            if (layoutCount == 0) {
                // 何もしない
            }
            else if (layoutCount == 1) {
                // 全てをそのまま使う
                var clipContext = this._clippingContextListForMask.at(curClipIndex++);
                clipContext._layoutChannelNo = channelNo;
                clipContext._layoutBounds.x = 0.0;
                clipContext._layoutBounds.y = 0.0;
                clipContext._layoutBounds.width = 1.0;
                clipContext._layoutBounds.height = 1.0;
            }
            else if (layoutCount == 2) {
                for (var i = 0; i < layoutCount; i++) {
                    var xpos = i % 2;
                    // 小数点は切り捨てる
                    xpos = ~~xpos;
                    var cc = this._clippingContextListForMask.at(curClipIndex++);
                    cc._layoutChannelNo = channelNo;
                    cc._layoutBounds.x = xpos * 0.5;
                    cc._layoutBounds.y = 0.0;
                    cc._layoutBounds.width = 0.5;
                    cc._layoutBounds.height = 1.0;
                    // UVを2つに分解して使う
                }
            }
            else if (layoutCount <= 4) {
                // 4分割して使う
                for (var i = 0; i < layoutCount; i++) {
                    var xpos = i % 2;
                    var ypos = i / 2;
                    // 小数点は切り捨てる
                    xpos = ~~xpos;
                    ypos = ~~ypos;
                    var cc = this._clippingContextListForMask.at(curClipIndex++);
                    cc._layoutChannelNo = channelNo;
                    cc._layoutBounds.x = xpos * 0.5;
                    cc._layoutBounds.y = ypos * 0.5;
                    cc._layoutBounds.width = 0.5;
                    cc._layoutBounds.height = 0.5;
                }
            }
            else if (layoutCount <= 9) {
                // 9分割して使う
                for (var i = 0; i < layoutCount; i++) {
                    var xpos = i % 3;
                    var ypos = i / 3;
                    // 小数点は切り捨てる
                    xpos = ~~xpos;
                    ypos = ~~ypos;
                    var cc = this._clippingContextListForMask.at(curClipIndex++);
                    cc._layoutChannelNo = channelNo;
                    cc._layoutBounds.x = xpos / 3.0;
                    cc._layoutBounds.y = ypos / 3.0;
                    cc._layoutBounds.width = 1.0 / 3.0;
                    cc._layoutBounds.height = 1.0 / 3.0;
                }
            }
            else {
                cubismdebug_1.CubismLogError('not supported mask count : {0}', layoutCount);
            }
        }
    };
    /**
     * カラーバッファを取得する
     * @return カラーバッファ
     */
    CubismClippingManager_WebGL.prototype.getColorBuffer = function () {
        return this._colorBuffer;
    };
    /**
     * 画面描画に使用するクリッピングマスクのリストを取得する
     * @return 画面描画に使用するクリッピングマスクのリスト
     */
    CubismClippingManager_WebGL.prototype.getClippingContextListForDraw = function () {
        return this._clippingContextListForDraw;
    };
    /**
     * クリッピングマスクバッファのサイズを設定する
     * @param size クリッピングマスクバッファのサイズ
     */
    CubismClippingManager_WebGL.prototype.setClippingMaskBufferSize = function (size) {
        this._clippingMaskBufferSize = size;
    };
    /**
     * クリッピングマスクバッファのサイズを取得する
     * @return クリッピングマスクバッファのサイズ
     */
    CubismClippingManager_WebGL.prototype.getClippingMaskBufferSize = function () {
        return this._clippingMaskBufferSize;
    };
    return CubismClippingManager_WebGL;
}());
exports.CubismClippingManager_WebGL = CubismClippingManager_WebGL;
/**
 * レンダーテクスチャのリソースを定義する構造体
 * クリッピングマスクで使用する
 */
var CubismRenderTextureResource = /** @class */ (function () {
    /**
     * 引数付きコンストラクタ
     * @param frameNo レンダラーのフレーム番号
     * @param texture テクスチャのアドレス
     */
    function CubismRenderTextureResource(frameNo, texture) {
        this.frameNo = frameNo;
        this.texture = texture;
    }
    return CubismRenderTextureResource;
}());
exports.CubismRenderTextureResource = CubismRenderTextureResource;
/**
 * クリッピングマスクのコンテキスト
 */
var CubismClippingContext = /** @class */ (function () {
    /**
     * 引数付きコンストラクタ
     */
    function CubismClippingContext(manager, clippingDrawableIndices, clipCount) {
        this._owner = manager;
        // クリップしている（＝マスク用の）Drawableのインデックスリスト
        this._clippingIdList = clippingDrawableIndices;
        // マスクの数
        this._clippingIdCount = clipCount;
        this._allClippedDrawRect = new csmrectf_1.csmRect();
        this._layoutBounds = new csmrectf_1.csmRect();
        this._clippedDrawableIndexList = [];
        this._matrixForMask = new cubismmatrix44_1.CubismMatrix44();
        this._matrixForDraw = new cubismmatrix44_1.CubismMatrix44();
    }
    /**
     * デストラクタ相当の処理
     */
    CubismClippingContext.prototype.release = function () {
        if (this._layoutBounds != null) {
            this._layoutBounds = null;
        }
        if (this._allClippedDrawRect != null) {
            this._allClippedDrawRect = null;
        }
        if (this._clippedDrawableIndexList != null) {
            this._clippedDrawableIndexList = null;
        }
    };
    /**
     * このマスクにクリップされる描画オブジェクトを追加する
     *
     * @param drawableIndex クリッピング対象に追加する描画オブジェクトのインデックス
     */
    CubismClippingContext.prototype.addClippedDrawable = function (drawableIndex) {
        this._clippedDrawableIndexList.push(drawableIndex);
    };
    /**
     * このマスクを管理するマネージャのインスタンスを取得する
     * @return クリッピングマネージャのインスタンス
     */
    CubismClippingContext.prototype.getClippingManager = function () {
        return this._owner;
    };
    CubismClippingContext.prototype.setGl = function (gl) {
        this._owner.setGL(gl);
    };
    return CubismClippingContext;
}());
exports.CubismClippingContext = CubismClippingContext;
/**
 * WebGL用のシェーダープログラムを生成・破棄するクラス
 * シングルトンなクラスであり、CubismShader_WebGL.getInstanceからアクセスする。
 */
var CubismShader_WebGL = /** @class */ (function () {
    /**
     * privateなコンストラクタ
     */
    function CubismShader_WebGL() {
        this._shaderSets = new csmvector_1.csmVector();
    }
    /**
     * インスタンスを取得する（シングルトン）
     * @return インスタンス
     */
    CubismShader_WebGL.getInstance = function () {
        if (s_instance == null) {
            s_instance = new CubismShader_WebGL();
            return s_instance;
        }
        return s_instance;
    };
    /**
     * インスタンスを開放する（シングルトン）
     */
    CubismShader_WebGL.deleteInstance = function () {
        if (s_instance) {
            s_instance.release();
            s_instance = null;
        }
    };
    /**
     * デストラクタ相当の処理
     */
    CubismShader_WebGL.prototype.release = function () {
        this.releaseShaderProgram();
    };
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
    CubismShader_WebGL.prototype.setupShaderProgram = function (renderer, textureId, vertexCount, vertexArray, indexArray, uvArray, bufferData, opacity, colorBlendMode, baseColor, isPremultipliedAlpha, matrix4x4, invertedMask) {
        if (!isPremultipliedAlpha) {
            cubismdebug_1.CubismLogError('NoPremultipliedAlpha is not allowed');
        }
        if (this._shaderSets.getSize() == 0) {
            this.generateShaders();
        }
        // Blending
        var SRC_COLOR;
        var DST_COLOR;
        var SRC_ALPHA;
        var DST_ALPHA;
        if (renderer.getClippingContextBufferForMask() != null) {
            // マスク生成時
            var shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_SetupMask);
            this.gl.useProgram(shaderSet.shaderProgram);
            // テクスチャ設定
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
            this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
            // 頂点配列の設定(VBO)
            if (bufferData.vertex == null) {
                bufferData.vertex = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
            this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
            // テクスチャ頂点の設定
            if (bufferData.uv == null) {
                bufferData.uv = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
            this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
            // チャンネル
            var channelNo = renderer.getClippingContextBufferForMask()
                ._layoutChannelNo;
            var colorChannel = renderer
                .getClippingContextBufferForMask()
                .getClippingManager()
                .getChannelFlagAsColor(channelNo);
            this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
            this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForMask()._matrixForMask.getArray());
            var rect = renderer.getClippingContextBufferForMask()
                ._layoutBounds;
            this.gl.uniform4f(shaderSet.uniformBaseColorLocation, rect.x * 2.0 - 1.0, rect.y * 2.0 - 1.0, rect.getRight() * 2.0 - 1.0, rect.getBottom() * 2.0 - 1.0);
            SRC_COLOR = this.gl.ZERO;
            DST_COLOR = this.gl.ONE_MINUS_SRC_COLOR;
            SRC_ALPHA = this.gl.ZERO;
            DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
        } // マスク生成以外の場合
        else {
            var masked = renderer.getClippingContextBufferForDraw() != null; // この描画オブジェクトはマスク対象か
            var offset = masked ? (invertedMask ? 2 : 1) : 0;
            var shaderSet = new CubismShaderSet();
            switch (colorBlendMode) {
                case cubismrenderer_1.CubismBlendMode.CubismBlendMode_Normal:
                default:
                    shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset);
                    SRC_COLOR = this.gl.ONE;
                    DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                    SRC_ALPHA = this.gl.ONE;
                    DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
                    break;
                case cubismrenderer_1.CubismBlendMode.CubismBlendMode_Additive:
                    shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_AddPremultipliedAlpha + offset);
                    SRC_COLOR = this.gl.ONE;
                    DST_COLOR = this.gl.ONE;
                    SRC_ALPHA = this.gl.ZERO;
                    DST_ALPHA = this.gl.ONE;
                    break;
                case cubismrenderer_1.CubismBlendMode.CubismBlendMode_Multiplicative:
                    shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_MultPremultipliedAlpha + offset);
                    SRC_COLOR = this.gl.DST_COLOR;
                    DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
                    SRC_ALPHA = this.gl.ZERO;
                    DST_ALPHA = this.gl.ONE;
                    break;
            }
            this.gl.useProgram(shaderSet.shaderProgram);
            // 頂点配列の設定
            if (bufferData.vertex == null) {
                bufferData.vertex = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
            this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
            // テクスチャ頂点の設定
            if (bufferData.uv == null) {
                bufferData.uv = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
            this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
            this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
            if (masked) {
                this.gl.activeTexture(this.gl.TEXTURE1);
                var tex = renderer
                    .getClippingContextBufferForDraw()
                    .getClippingManager()
                    .getColorBuffer();
                this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
                this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
                // view座標をClippingContextの座標に変換するための行列を設定
                this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForDraw()._matrixForDraw.getArray());
                // 使用するカラーチャンネルを設定
                var channelNo = renderer.getClippingContextBufferForDraw()
                    ._layoutChannelNo;
                var colorChannel = renderer
                    .getClippingContextBufferForDraw()
                    .getClippingManager()
                    .getChannelFlagAsColor(channelNo);
                this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.R, colorChannel.G, colorChannel.B, colorChannel.A);
            }
            // テクスチャ設定
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
            this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
            // 座標変換
            this.gl.uniformMatrix4fv(shaderSet.uniformMatrixLocation, false, matrix4x4.getArray());
            this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.R, baseColor.G, baseColor.B, baseColor.A);
        }
        // IBOを作成し、データを転送
        if (bufferData.index == null) {
            bufferData.index = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferData.index);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
        this.gl.blendFuncSeparate(SRC_COLOR, DST_COLOR, SRC_ALPHA, DST_ALPHA);
    };
    /**
     * シェーダープログラムを解放する
     */
    CubismShader_WebGL.prototype.releaseShaderProgram = function () {
        for (var i = 0; i < this._shaderSets.getSize(); i++) {
            this.gl.deleteProgram(this._shaderSets.at(i).shaderProgram);
            this._shaderSets.at(i).shaderProgram = 0;
            this._shaderSets.set(i, void 0);
            this._shaderSets.set(i, null);
        }
    };
    /**
     * シェーダープログラムを初期化する
     * @param vertShaderSrc 頂点シェーダのソース
     * @param fragShaderSrc フラグメントシェーダのソース
     */
    CubismShader_WebGL.prototype.generateShaders = function () {
        for (var i = 0; i < shaderCount; i++) {
            this._shaderSets.pushBack(new CubismShaderSet());
        }
        this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(exports.vertexShaderSrcSetupMask, exports.fragmentShaderSrcsetupMask);
        this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(exports.vertexShaderSrc, exports.fragmentShaderSrcPremultipliedAlpha);
        this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(exports.vertexShaderSrcMasked, exports.fragmentShaderSrcMaskPremultipliedAlpha);
        this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(exports.vertexShaderSrcMasked, exports.fragmentShaderSrcMaskInvertedPremultipliedAlpha);
        // 加算も通常と同じシェーダーを利用する
        this._shaderSets.at(4).shaderProgram = this._shaderSets.at(1).shaderProgram;
        this._shaderSets.at(5).shaderProgram = this._shaderSets.at(2).shaderProgram;
        this._shaderSets.at(6).shaderProgram = this._shaderSets.at(3).shaderProgram;
        // 乗算も通常と同じシェーダーを利用する
        this._shaderSets.at(7).shaderProgram = this._shaderSets.at(1).shaderProgram;
        this._shaderSets.at(8).shaderProgram = this._shaderSets.at(2).shaderProgram;
        this._shaderSets.at(9).shaderProgram = this._shaderSets.at(3).shaderProgram;
        // SetupMask
        this._shaderSets.at(0).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, 'a_position');
        this._shaderSets.at(0).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, 'a_texCoord');
        this._shaderSets.at(0).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 's_texture0');
        this._shaderSets.at(0).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(0).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(0).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, 'u_baseColor');
        // 通常（PremultipliedAlpha）
        this._shaderSets.at(1).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, 'a_position');
        this._shaderSets.at(1).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, 'a_texCoord');
        this._shaderSets.at(1).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 's_texture0');
        this._shaderSets.at(1).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_matrix');
        this._shaderSets.at(1).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, 'u_baseColor');
        // 通常（クリッピング、PremultipliedAlpha）
        this._shaderSets.at(2).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, 'a_position');
        this._shaderSets.at(2).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, 'a_texCoord');
        this._shaderSets.at(2).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 's_texture0');
        this._shaderSets.at(2).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 's_texture1');
        this._shaderSets.at(2).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_matrix');
        this._shaderSets.at(2).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(2).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(2).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, 'u_baseColor');
        // 通常（クリッピング・反転, PremultipliedAlpha）
        this._shaderSets.at(3).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, 'a_position');
        this._shaderSets.at(3).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, 'a_texCoord');
        this._shaderSets.at(3).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 's_texture0');
        this._shaderSets.at(3).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 's_texture1');
        this._shaderSets.at(3).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_matrix');
        this._shaderSets.at(3).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(3).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(3).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, 'u_baseColor');
        // 加算（PremultipliedAlpha）
        this._shaderSets.at(4).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, 'a_position');
        this._shaderSets.at(4).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, 'a_texCoord');
        this._shaderSets.at(4).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 's_texture0');
        this._shaderSets.at(4).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_matrix');
        this._shaderSets.at(4).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, 'u_baseColor');
        // 加算（クリッピング、PremultipliedAlpha）
        this._shaderSets.at(5).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, 'a_position');
        this._shaderSets.at(5).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, 'a_texCoord');
        this._shaderSets.at(5).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 's_texture0');
        this._shaderSets.at(5).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 's_texture1');
        this._shaderSets.at(5).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_matrix');
        this._shaderSets.at(5).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(5).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(5).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, 'u_baseColor');
        // 加算（クリッピング・反転、PremultipliedAlpha）
        this._shaderSets.at(6).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, 'a_position');
        this._shaderSets.at(6).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, 'a_texCoord');
        this._shaderSets.at(6).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 's_texture0');
        this._shaderSets.at(6).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 's_texture1');
        this._shaderSets.at(6).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_matrix');
        this._shaderSets.at(6).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(6).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(6).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, 'u_baseColor');
        // 乗算（PremultipliedAlpha）
        this._shaderSets.at(7).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, 'a_position');
        this._shaderSets.at(7).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, 'a_texCoord');
        this._shaderSets.at(7).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 's_texture0');
        this._shaderSets.at(7).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_matrix');
        this._shaderSets.at(7).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, 'u_baseColor');
        // 乗算（クリッピング、PremultipliedAlpha）
        this._shaderSets.at(8).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, 'a_position');
        this._shaderSets.at(8).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, 'a_texCoord');
        this._shaderSets.at(8).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 's_texture0');
        this._shaderSets.at(8).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 's_texture1');
        this._shaderSets.at(8).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_matrix');
        this._shaderSets.at(8).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(8).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(8).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, 'u_baseColor');
        // 乗算（クリッピング・反転、PremultipliedAlpha）
        this._shaderSets.at(9).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, 'a_position');
        this._shaderSets.at(9).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, 'a_texCoord');
        this._shaderSets.at(9).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 's_texture0');
        this._shaderSets.at(9).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 's_texture1');
        this._shaderSets.at(9).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_matrix');
        this._shaderSets.at(9).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_clipMatrix');
        this._shaderSets.at(9).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_channelFlag');
        this._shaderSets.at(9).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, 'u_baseColor');
    };
    /**
     * シェーダプログラムをロードしてアドレスを返す
     * @param vertexShaderSource    頂点シェーダのソース
     * @param fragmentShaderSource  フラグメントシェーダのソース
     * @return シェーダプログラムのアドレス
     */
    CubismShader_WebGL.prototype.loadShaderProgram = function (vertexShaderSource, fragmentShaderSource) {
        // Create Shader Program
        var shaderProgram = this.gl.createProgram();
        var vertShader = this.compileShaderSource(this.gl.VERTEX_SHADER, vertexShaderSource);
        if (!vertShader) {
            cubismdebug_1.CubismLogError('Vertex shader compile error!');
            return 0;
        }
        var fragShader = this.compileShaderSource(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!fragShader) {
            cubismdebug_1.CubismLogError('Vertex shader compile error!');
            return 0;
        }
        // Attach vertex shader to program
        this.gl.attachShader(shaderProgram, vertShader);
        // Attach fragment shader to program
        this.gl.attachShader(shaderProgram, fragShader);
        // link program
        this.gl.linkProgram(shaderProgram);
        var linkStatus = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
        // リンクに失敗したらシェーダーを削除
        if (!linkStatus) {
            cubismdebug_1.CubismLogError('Failed to link program: {0}', shaderProgram);
            this.gl.deleteShader(vertShader);
            vertShader = 0;
            this.gl.deleteShader(fragShader);
            fragShader = 0;
            if (shaderProgram) {
                this.gl.deleteProgram(shaderProgram);
                shaderProgram = 0;
            }
            return 0;
        }
        // Release vertex and fragment shaders.
        this.gl.deleteShader(vertShader);
        this.gl.deleteShader(fragShader);
        return shaderProgram;
    };
    /**
     * シェーダープログラムをコンパイルする
     * @param shaderType シェーダタイプ(Vertex/Fragment)
     * @param shaderSource シェーダソースコード
     *
     * @return コンパイルされたシェーダープログラム
     */
    CubismShader_WebGL.prototype.compileShaderSource = function (shaderType, shaderSource) {
        var source = shaderSource;
        var shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!shader) {
            var log = this.gl.getShaderInfoLog(shader);
            cubismdebug_1.CubismLogError('Shader compile log: {0} ', log);
        }
        var status = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!status) {
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    CubismShader_WebGL.prototype.setGl = function (gl) {
        this.gl = gl;
    };
    return CubismShader_WebGL;
}());
exports.CubismShader_WebGL = CubismShader_WebGL;
/**
 * CubismShader_WebGLのインナークラス
 */
var CubismShaderSet = /** @class */ (function () {
    function CubismShaderSet() {
    }
    return CubismShaderSet;
}());
exports.CubismShaderSet = CubismShaderSet;
var ShaderNames;
(function (ShaderNames) {
    // SetupMask
    ShaderNames[ShaderNames["ShaderNames_SetupMask"] = 0] = "ShaderNames_SetupMask";
    // Normal
    ShaderNames[ShaderNames["ShaderNames_NormalPremultipliedAlpha"] = 1] = "ShaderNames_NormalPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_NormalMaskedPremultipliedAlpha"] = 2] = "ShaderNames_NormalMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_NomralMaskedInvertedPremultipliedAlpha"] = 3] = "ShaderNames_NomralMaskedInvertedPremultipliedAlpha";
    // Add
    ShaderNames[ShaderNames["ShaderNames_AddPremultipliedAlpha"] = 4] = "ShaderNames_AddPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlpha"] = 5] = "ShaderNames_AddMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_AddMaskedPremultipliedAlphaInverted"] = 6] = "ShaderNames_AddMaskedPremultipliedAlphaInverted";
    // Mult
    ShaderNames[ShaderNames["ShaderNames_MultPremultipliedAlpha"] = 7] = "ShaderNames_MultPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlpha"] = 8] = "ShaderNames_MultMaskedPremultipliedAlpha";
    ShaderNames[ShaderNames["ShaderNames_MultMaskedPremultipliedAlphaInverted"] = 9] = "ShaderNames_MultMaskedPremultipliedAlphaInverted";
})(ShaderNames = exports.ShaderNames || (exports.ShaderNames = {}));
exports.vertexShaderSrcSetupMask = 'attribute vec4     a_position;' +
    'attribute vec2     a_texCoord;' +
    'varying vec2       v_texCoord;' +
    'varying vec4       v_myPos;' +
    'uniform mat4       u_clipMatrix;' +
    'void main()' +
    '{' +
    '   gl_Position = u_clipMatrix * a_position;' +
    '   v_myPos = u_clipMatrix * a_position;' +
    '   v_texCoord = a_texCoord;' +
    '   v_texCoord.y = 1.0 - v_texCoord.y;' +
    '}';
exports.fragmentShaderSrcsetupMask = 'precision mediump float;' +
    'varying vec2       v_texCoord;' +
    'varying vec4       v_myPos;' +
    'uniform vec4       u_baseColor;' +
    'uniform vec4       u_channelFlag;' +
    'uniform sampler2D  s_texture0;' +
    'void main()' +
    '{' +
    '   float isInside = ' +
    '       step(u_baseColor.x, v_myPos.x/v_myPos.w)' +
    '       * step(u_baseColor.y, v_myPos.y/v_myPos.w)' +
    '       * step(v_myPos.x/v_myPos.w, u_baseColor.z)' +
    '       * step(v_myPos.y/v_myPos.w, u_baseColor.w);' +
    '   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;' +
    '}';
//----- バーテックスシェーダプログラム -----
// Normal & Add & Mult 共通
exports.vertexShaderSrc = 'attribute vec4     a_position;' + //v.vertex
    'attribute vec2     a_texCoord;' + //v.texcoord
    'varying vec2       v_texCoord;' + //v2f.texcoord
    'uniform mat4       u_matrix;' +
    'void main()' +
    '{' +
    '   gl_Position = u_matrix * a_position;' +
    '   v_texCoord = a_texCoord;' +
    '   v_texCoord.y = 1.0 - v_texCoord.y;' +
    '}';
// Normal & Add & Mult 共通（クリッピングされたものの描画用）
exports.vertexShaderSrcMasked = 'attribute vec4     a_position;' +
    'attribute vec2     a_texCoord;' +
    'varying vec2       v_texCoord;' +
    'varying vec4       v_clipPos;' +
    'uniform mat4       u_matrix;' +
    'uniform mat4       u_clipMatrix;' +
    'void main()' +
    '{' +
    '   gl_Position = u_matrix * a_position;' +
    '   v_clipPos = u_clipMatrix * a_position;' +
    '   v_texCoord = a_texCoord;' +
    '   v_texCoord.y = 1.0 - v_texCoord.y;' +
    '}';
//----- フラグメントシェーダプログラム -----
// Normal & Add & Mult 共通 （PremultipliedAlpha）
exports.fragmentShaderSrcPremultipliedAlpha = 'precision mediump float;' +
    'varying vec2       v_texCoord;' + //v2f.texcoord
    'uniform vec4       u_baseColor;' +
    'uniform sampler2D  s_texture0;' + //_MainTex
    'void main()' +
    '{' +
    '   gl_FragColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;' +
    '}';
// Normal （クリッピングされたものの描画用、PremultipliedAlpha兼用）
exports.fragmentShaderSrcMaskPremultipliedAlpha = 'precision mediump float;' +
    'varying vec2       v_texCoord;' +
    'varying vec4       v_clipPos;' +
    'uniform vec4       u_baseColor;' +
    'uniform vec4       u_channelFlag;' +
    'uniform sampler2D  s_texture0;' +
    'uniform sampler2D  s_texture1;' +
    'void main()' +
    '{' +
    '   vec4 col_formask = texture2D(s_texture0 , v_texCoord) * u_baseColor;' +
    '   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
    '   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
    '   col_formask = col_formask * maskVal;' +
    '   gl_FragColor = col_formask;' +
    '}';
// Normal & Add & Mult 共通（クリッピングされて反転使用の描画用、PremultipliedAlphaの場合）
exports.fragmentShaderSrcMaskInvertedPremultipliedAlpha = 'precision mediump float;' +
    'varying vec2 v_texCoord;' +
    'varying vec4 v_clipPos;' +
    'uniform sampler2D s_texture0;' +
    'uniform sampler2D s_texture1;' +
    'uniform vec4 u_channelFlag;' +
    'uniform vec4 u_baseColor;' +
    'void main()' +
    '{' +
    'vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;' +
    'vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
    'float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
    'col_formask = col_formask * (1.0 - maskVal);' +
    'gl_FragColor = col_formask;' +
    '}';
/**
 * WebGL用の描画命令を実装したクラス
 */
var CubismRenderer_WebGL = /** @class */ (function (_super) {
    __extends(CubismRenderer_WebGL, _super);
    /**
     * コンストラクタ
     */
    function CubismRenderer_WebGL() {
        var _this = _super.call(this) || this;
        _this._clippingContextBufferForMask = null;
        _this._clippingContextBufferForDraw = null;
        _this._clippingManager = new CubismClippingManager_WebGL();
        _this.firstDraw = true;
        _this._textures = new csmmap_1.csmMap();
        _this._sortedDrawableIndexList = new csmvector_1.csmVector();
        _this._bufferData = {
            vertex: WebGLBuffer = null,
            uv: WebGLBuffer = null,
            index: WebGLBuffer = null
        };
        // テクスチャ対応マップの容量を確保しておく
        _this._textures.prepareCapacity(32, true);
        return _this;
    }
    /**
     * レンダラの初期化処理を実行する
     * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
     *
     * @param model モデルのインスタンス
     */
    CubismRenderer_WebGL.prototype.initialize = function (model) {
        if (model.isUsingMasking()) {
            this._clippingManager = new CubismClippingManager_WebGL(); // クリッピングマスク・バッファ前処理方式を初期化
            this._clippingManager.initialize(model, model.getDrawableCount(), model.getDrawableMasks(), model.getDrawableMaskCounts());
        }
        this._sortedDrawableIndexList.resize(model.getDrawableCount(), 0);
        _super.prototype.initialize.call(this, model); // 親クラスの処理を呼ぶ
    };
    /**
     * WebGLテクスチャのバインド処理
     * CubismRendererにテクスチャを設定し、CubismRenderer内でその画像を参照するためのIndex値を戻り値とする
     * @param modelTextureNo セットするモデルテクスチャの番号
     * @param glTextureNo WebGLテクスチャの番号
     */
    CubismRenderer_WebGL.prototype.bindTexture = function (modelTextureNo, glTexture) {
        this._textures.setValue(modelTextureNo, glTexture);
    };
    /**
     * WebGLにバインドされたテクスチャのリストを取得する
     * @return テクスチャのリスト
     */
    CubismRenderer_WebGL.prototype.getBindedTextures = function () {
        return this._textures;
    };
    /**
     * クリッピングマスクバッファのサイズを設定する
     * マスク用のFrameBufferを破棄、再作成する為処理コストは高い
     * @param size クリッピングマスクバッファのサイズ
     */
    CubismRenderer_WebGL.prototype.setClippingMaskBufferSize = function (size) {
        // FrameBufferのサイズを変更するためにインスタンスを破棄・再作成する
        this._clippingManager.release();
        this._clippingManager = void 0;
        this._clippingManager = null;
        this._clippingManager = new CubismClippingManager_WebGL();
        this._clippingManager.setClippingMaskBufferSize(size);
        this._clippingManager.initialize(this.getModel(), this.getModel().getDrawableCount(), this.getModel().getDrawableMasks(), this.getModel().getDrawableMaskCounts());
    };
    /**
     * クリッピングマスクバッファのサイズを取得する
     * @return クリッピングマスクバッファのサイズ
     */
    CubismRenderer_WebGL.prototype.getClippingMaskBufferSize = function () {
        return this._clippingManager.getClippingMaskBufferSize();
    };
    /**
     * デストラクタ相当の処理
     */
    CubismRenderer_WebGL.prototype.release = function () {
        this._clippingManager.release();
        this._clippingManager = void 0;
        this._clippingManager = null;
        this.gl.deleteBuffer(this._bufferData.vertex);
        this._bufferData.vertex = null;
        this.gl.deleteBuffer(this._bufferData.uv);
        this._bufferData.uv = null;
        this.gl.deleteBuffer(this._bufferData.index);
        this._bufferData.index = null;
        this._bufferData = null;
        this._textures = null;
    };
    /**
     * モデルを描画する実際の処理
     */
    CubismRenderer_WebGL.prototype.doDrawModel = function () {
        //------------ クリッピングマスク・バッファ前処理方式の場合 ------------
        if (this._clippingManager != null) {
            this.preDraw();
            this._clippingManager.setupClippingContext(this.getModel(), this);
        }
        // 上記クリッピング処理内でも一度PreDrawを呼ぶので注意!!
        this.preDraw();
        var drawableCount = this.getModel().getDrawableCount();
        var renderOrder = this.getModel().getDrawableRenderOrders();
        // インデックスを描画順でソート
        for (var i = 0; i < drawableCount; ++i) {
            var order = renderOrder[i];
            this._sortedDrawableIndexList.set(order, i);
        }
        // 描画
        for (var i = 0; i < drawableCount; ++i) {
            var drawableIndex = this._sortedDrawableIndexList.at(i);
            // Drawableが表示状態でなければ処理をパスする
            if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
                continue;
            }
            // クリッピングマスクをセットする
            this.setClippingContextBufferForDraw(this._clippingManager != null
                ? this._clippingManager
                    .getClippingContextListForDraw()
                    .at(drawableIndex)
                : null);
            this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));
            this.drawMesh(this.getModel().getDrawableTextureIndices(drawableIndex), this.getModel().getDrawableVertexIndexCount(drawableIndex), this.getModel().getDrawableVertexCount(drawableIndex), this.getModel().getDrawableVertexIndices(drawableIndex), this.getModel().getDrawableVertices(drawableIndex), this.getModel().getDrawableVertexUvs(drawableIndex), this.getModel().getDrawableOpacity(drawableIndex), this.getModel().getDrawableBlendMode(drawableIndex), this.getModel().getDrawableInvertedMaskBit(drawableIndex));
        }
    };
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
    CubismRenderer_WebGL.prototype.drawMesh = function (textureNo, indexCount, vertexCount, indexArray, vertexArray, uvArray, opacity, colorBlendMode, invertedMask) {
        // 裏面描画の有効・無効
        if (this.isCulling()) {
            this.gl.enable(this.gl.CULL_FACE);
        }
        else {
            this.gl.disable(this.gl.CULL_FACE);
        }
        this.gl.frontFace(this.gl.CCW); // Cubism SDK OpenGLはマスク・アートメッシュ共にCCWが表面
        var modelColorRGBA = this.getModelColor();
        if (this.getClippingContextBufferForMask() == null) {
            // マスク生成時以外
            modelColorRGBA.A *= opacity;
            if (this.isPremultipliedAlpha()) {
                modelColorRGBA.R *= modelColorRGBA.A;
                modelColorRGBA.G *= modelColorRGBA.A;
                modelColorRGBA.B *= modelColorRGBA.A;
            }
        }
        var drawtexture; // シェーダに渡すテクスチャ
        // テクスチャマップからバインド済みテクスチャＩＤを取得
        // バインドされていなければダミーのテクスチャIDをセットする
        if (this._textures.getValue(textureNo) != null) {
            drawtexture = this._textures.getValue(textureNo);
        }
        else {
            drawtexture = null;
        }
        CubismShader_WebGL.getInstance().setupShaderProgram(this, drawtexture, vertexCount, vertexArray, indexArray, uvArray, this._bufferData, opacity, colorBlendMode, modelColorRGBA, this.isPremultipliedAlpha(), this.getMvpMatrix(), invertedMask);
        // ポリゴンメッシュを描画する
        this.gl.drawElements(this.gl.TRIANGLES, indexCount, this.gl.UNSIGNED_SHORT, 0);
        // 後処理
        this.gl.useProgram(null);
        this.setClippingContextBufferForDraw(null);
        this.setClippingContextBufferForMask(null);
    };
    /**
     * レンダラが保持する静的なリソースを解放する
     * WebGLの静的なシェーダープログラムを解放する
     */
    CubismRenderer_WebGL.doStaticRelease = function () {
        CubismShader_WebGL.deleteInstance();
    };
    /**
     * レンダーステートを設定する
     * @param fbo アプリケーション側で指定しているフレームバッファ
     * @param viewport ビューポート
     */
    CubismRenderer_WebGL.prototype.setRenderState = function (fbo, viewport) {
        s_fbo = fbo;
        s_viewport = viewport;
    };
    /**
     * 描画開始時の追加処理
     * モデルを描画する前にクリッピングマスクに必要な処理を実装している
     */
    CubismRenderer_WebGL.prototype.preDraw = function () {
        if (this.firstDraw) {
            this.firstDraw = false;
            // 拡張機能を有効にする
            this._anisortopy =
                this.gl.getExtension('EXT_texture_filter_anisotropic') ||
                    this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
                    this.gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
        }
        this.gl.disable(this.gl.SCISSOR_TEST);
        this.gl.disable(this.gl.STENCIL_TEST);
        this.gl.disable(this.gl.DEPTH_TEST);
        // カリング（1.0beta3）
        this.gl.frontFace(this.gl.CW);
        this.gl.enable(this.gl.BLEND);
        this.gl.colorMask(true, true, true, true);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // 前にバッファがバインドされていたら破棄する必要がある
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    };
    /**
     * マスクテクスチャに描画するクリッピングコンテキストをセットする
     */
    CubismRenderer_WebGL.prototype.setClippingContextBufferForMask = function (clip) {
        this._clippingContextBufferForMask = clip;
    };
    /**
     * マスクテクスチャに描画するクリッピングコンテキストを取得する
     * @return マスクテクスチャに描画するクリッピングコンテキスト
     */
    CubismRenderer_WebGL.prototype.getClippingContextBufferForMask = function () {
        return this._clippingContextBufferForMask;
    };
    /**
     * 画面上に描画するクリッピングコンテキストをセットする
     */
    CubismRenderer_WebGL.prototype.setClippingContextBufferForDraw = function (clip) {
        this._clippingContextBufferForDraw = clip;
    };
    /**
     * 画面上に描画するクリッピングコンテキストを取得する
     * @return 画面上に描画するクリッピングコンテキスト
     */
    CubismRenderer_WebGL.prototype.getClippingContextBufferForDraw = function () {
        return this._clippingContextBufferForDraw;
    };
    /**
     * glの設定
     */
    CubismRenderer_WebGL.prototype.startUp = function (gl) {
        this.gl = gl;
        this._clippingManager.setGL(gl);
        CubismShader_WebGL.getInstance().setGl(gl);
    };
    return CubismRenderer_WebGL;
}(cubismrenderer_1.CubismRenderer));
exports.CubismRenderer_WebGL = CubismRenderer_WebGL;
/**
 * レンダラが保持する静的なリソースを開放する
 */
cubismrenderer_1.CubismRenderer.staticRelease = function () {
    CubismRenderer_WebGL.doStaticRelease();
};
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismrenderer_webgl"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismClippingContext = $.CubismClippingContext;
    Live2DCubismFramework.CubismClippingManager_WebGL = $.CubismClippingManager_WebGL;
    Live2DCubismFramework.CubismRenderTextureResource = $.CubismRenderTextureResource;
    Live2DCubismFramework.CubismRenderer_WebGL = $.CubismRenderer_WebGL;
    Live2DCubismFramework.CubismShaderSet = $.CubismShaderSet;
    Live2DCubismFramework.CubismShader_WebGL = $.CubismShader_WebGL;
    Live2DCubismFramework.ShaderNames = $.ShaderNames;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismrenderer_webgl.js.map
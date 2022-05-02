"use strict";
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var live2dcubismframework_1 = require("../live2dcubismframework");
var cubismrenderer_1 = require("../rendering/cubismrenderer");
var csmmap_1 = require("../type/csmmap");
var csmvector_1 = require("../type/csmvector");
var cubismdebug_1 = require("../utils/cubismdebug");
/**
 * モデル
 *
 * Mocデータから生成されるモデルのクラス。
 */
var CubismModel = /** @class */ (function () {
    /**
     * コンストラクタ
     * @param model モデル
     */
    function CubismModel(model) {
        this._model = model;
        this._parameterValues = null;
        this._parameterMaximumValues = null;
        this._parameterMinimumValues = null;
        this._partOpacities = null;
        this._savedParameters = new csmvector_1.csmVector();
        this._parameterIds = new csmvector_1.csmVector();
        this._drawableIds = new csmvector_1.csmVector();
        this._partIds = new csmvector_1.csmVector();
        this._notExistPartId = new csmmap_1.csmMap();
        this._notExistParameterId = new csmmap_1.csmMap();
        this._notExistParameterValues = new csmmap_1.csmMap();
        this._notExistPartOpacities = new csmmap_1.csmMap();
    }
    /**
     * モデルのパラメータの更新
     */
    CubismModel.prototype.update = function () {
        // Update model
        this._model.update();
        this._model.drawables.resetDynamicFlags();
    };
    /**
     * キャンバスの幅を取得する
     */
    CubismModel.prototype.getCanvasWidth = function () {
        if (this._model == null) {
            return 0.0;
        }
        return (this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit);
    };
    /**
     * キャンバスの高さを取得する
     */
    CubismModel.prototype.getCanvasHeight = function () {
        if (this._model == null) {
            return 0.0;
        }
        return (this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit);
    };
    /**
     * パラメータを保存する
     */
    CubismModel.prototype.saveParameters = function () {
        var parameterCount = this._model.parameters.count;
        var savedParameterCount = this._savedParameters.getSize();
        for (var i = 0; i < parameterCount; ++i) {
            if (i < savedParameterCount) {
                this._savedParameters.set(i, this._parameterValues[i]);
            }
            else {
                this._savedParameters.pushBack(this._parameterValues[i]);
            }
        }
    };
    /**
     * モデルを取得
     */
    CubismModel.prototype.getModel = function () {
        return this._model;
    };
    /**
     * パーツのインデックスを取得
     * @param partId パーツのID
     * @return パーツのインデックス
     */
    CubismModel.prototype.getPartIndex = function (partId) {
        var partIndex;
        var partCount = this._model.parts.count;
        for (partIndex = 0; partIndex < partCount; ++partIndex) {
            if (partId == this._partIds.at(partIndex)) {
                return partIndex;
            }
        }
        // モデルに存在していない場合、非存在パーツIDリスト内にあるかを検索し、そのインデックスを返す
        if (this._notExistPartId.isExist(partId)) {
            return this._notExistPartId.getValue(partId);
        }
        // 非存在パーツIDリストにない場合、新しく要素を追加する
        partIndex = partCount + this._notExistPartId.getSize();
        this._notExistPartId.setValue(partId, partIndex);
        this._notExistPartOpacities.appendKey(partIndex);
        return partIndex;
    };
    /**
     * パーツの個数の取得
     * @return パーツの個数
     */
    CubismModel.prototype.getPartCount = function () {
        var partCount = this._model.parts.count;
        return partCount;
    };
    /**
     * パーツの不透明度の設定(Index)
     * @param partIndex パーツのインデックス
     * @param opacity 不透明度
     */
    CubismModel.prototype.setPartOpacityByIndex = function (partIndex, opacity) {
        if (this._notExistPartOpacities.isExist(partIndex)) {
            this._notExistPartOpacities.setValue(partIndex, opacity);
            return;
        }
        // インデックスの範囲内検知
        cubismdebug_1.CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
        this._partOpacities[partIndex] = opacity;
    };
    /**
     * パーツの不透明度の設定(Id)
     * @param partId パーツのID
     * @param opacity パーツの不透明度
     */
    CubismModel.prototype.setPartOpacityById = function (partId, opacity) {
        // 高速化のためにPartIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
        var index = this.getPartIndex(partId);
        if (index < 0) {
            return; // パーツがないのでスキップ
        }
        this.setPartOpacityByIndex(index, opacity);
    };
    /**
     * パーツの不透明度の取得(index)
     * @param partIndex パーツのインデックス
     * @return パーツの不透明度
     */
    CubismModel.prototype.getPartOpacityByIndex = function (partIndex) {
        if (this._notExistPartOpacities.isExist(partIndex)) {
            // モデルに存在しないパーツIDの場合、非存在パーツリストから不透明度を返す。
            return this._notExistPartOpacities.getValue(partIndex);
        }
        // インデックスの範囲内検知
        cubismdebug_1.CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
        return this._partOpacities[partIndex];
    };
    /**
     * パーツの不透明度の取得(id)
     * @param partId パーツのＩｄ
     * @return パーツの不透明度
     */
    CubismModel.prototype.getPartOpacityById = function (partId) {
        // 高速化のためにPartIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
        var index = this.getPartIndex(partId);
        if (index < 0) {
            return 0; // パーツが無いのでスキップ
        }
        return this.getPartOpacityByIndex(index);
    };
    /**
     * パラメータのインデックスの取得
     * @param パラメータID
     * @return パラメータのインデックス
     */
    CubismModel.prototype.getParameterIndex = function (parameterId) {
        var parameterIndex;
        var idCount = this._model.parameters.count;
        for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
            if (parameterId != this._parameterIds.at(parameterIndex)) {
                continue;
            }
            return parameterIndex;
        }
        // モデルに存在していない場合、非存在パラメータIDリスト内を検索し、そのインデックスを返す
        if (this._notExistParameterId.isExist(parameterId)) {
            return this._notExistParameterId.getValue(parameterId);
        }
        // 非存在パラメータIDリストにない場合新しく要素を追加する
        parameterIndex =
            this._model.parameters.count + this._notExistParameterId.getSize();
        this._notExistParameterId.setValue(parameterId, parameterIndex);
        this._notExistParameterValues.appendKey(parameterIndex);
        return parameterIndex;
    };
    /**
     * パラメータの個数の取得
     * @return パラメータの個数
     */
    CubismModel.prototype.getParameterCount = function () {
        return this._model.parameters.count;
    };
    /**
     * パラメータの最大値の取得
     * @param parameterIndex パラメータのインデックス
     * @return パラメータの最大値
     */
    CubismModel.prototype.getParameterMaximumValue = function (parameterIndex) {
        return this._model.parameters.maximumValues[parameterIndex];
    };
    /**
     * パラメータの最小値の取得
     * @param parameterIndex パラメータのインデックス
     * @return パラメータの最小値
     */
    CubismModel.prototype.getParameterMinimumValue = function (parameterIndex) {
        return this._model.parameters.minimumValues[parameterIndex];
    };
    /**
     * パラメータのデフォルト値の取得
     * @param parameterIndex パラメータのインデックス
     * @return パラメータのデフォルト値
     */
    CubismModel.prototype.getParameterDefaultValue = function (parameterIndex) {
        return this._model.parameters.defaultValues[parameterIndex];
    };
    /**
     * パラメータの値の取得
     * @param parameterIndex    パラメータのインデックス
     * @return パラメータの値
     */
    CubismModel.prototype.getParameterValueByIndex = function (parameterIndex) {
        if (this._notExistParameterValues.isExist(parameterIndex)) {
            return this._notExistParameterValues.getValue(parameterIndex);
        }
        // インデックスの範囲内検知
        cubismdebug_1.CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        return this._parameterValues[parameterIndex];
    };
    /**
     * パラメータの値の取得
     * @param parameterId    パラメータのID
     * @return パラメータの値
     */
    CubismModel.prototype.getParameterValueById = function (parameterId) {
        // 高速化のためにparameterIndexを取得できる機構になっているが、外部からの設定の時は呼び出し頻度が低いため不要
        var parameterIndex = this.getParameterIndex(parameterId);
        return this.getParameterValueByIndex(parameterIndex);
    };
    /**
     * パラメータの値の設定
     * @param parameterIndex パラメータのインデックス
     * @param value パラメータの値
     * @param weight 重み
     */
    CubismModel.prototype.setParameterValueByIndex = function (parameterIndex, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        if (this._notExistParameterValues.isExist(parameterIndex)) {
            this._notExistParameterValues.setValue(parameterIndex, weight == 1
                ? value
                : this._notExistParameterValues.getValue(parameterIndex) *
                    (1 - weight) +
                    value * weight);
            return;
        }
        // インデックスの範囲内検知
        cubismdebug_1.CSM_ASSERT(0 <= parameterIndex && parameterIndex < this.getParameterCount());
        if (this._model.parameters.maximumValues[parameterIndex] < value) {
            value = this._model.parameters.maximumValues[parameterIndex];
        }
        if (this._model.parameters.minimumValues[parameterIndex] > value) {
            value = this._model.parameters.minimumValues[parameterIndex];
        }
        this._parameterValues[parameterIndex] =
            weight == 1
                ? value
                : (this._parameterValues[parameterIndex] =
                    this._parameterValues[parameterIndex] * (1 - weight) +
                        value * weight);
    };
    /**
     * パラメータの値の設定
     * @param parameterId パラメータのID
     * @param value パラメータの値
     * @param weight 重み
     */
    CubismModel.prototype.setParameterValueById = function (parameterId, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        var index = this.getParameterIndex(parameterId);
        this.setParameterValueByIndex(index, value, weight);
    };
    /**
     * パラメータの値の加算(index)
     * @param parameterIndex パラメータインデックス
     * @param value 加算する値
     * @param weight 重み
     */
    CubismModel.prototype.addParameterValueByIndex = function (parameterIndex, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) + value * weight);
    };
    /**
     * パラメータの値の加算(id)
     * @param parameterId パラメータＩＤ
     * @param value 加算する値
     * @param weight 重み
     */
    CubismModel.prototype.addParameterValueById = function (parameterId, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        var index = this.getParameterIndex(parameterId);
        this.addParameterValueByIndex(index, value, weight);
    };
    /**
     * パラメータの値の乗算
     * @param parameterId パラメータのID
     * @param value 乗算する値
     * @param weight 重み
     */
    CubismModel.prototype.multiplyParameterValueById = function (parameterId, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        var index = this.getParameterIndex(parameterId);
        this.multiplyParameterValueByIndex(index, value, weight);
    };
    /**
     * パラメータの値の乗算
     * @param parameterIndex パラメータのインデックス
     * @param value 乗算する値
     * @param weight 重み
     */
    CubismModel.prototype.multiplyParameterValueByIndex = function (parameterIndex, value, weight) {
        if (weight === void 0) { weight = 1.0; }
        this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) *
            (1.0 + (value - 1.0) * weight));
    };
    /**
     * Drawableのインデックスの取得
     * @param drawableId DrawableのID
     * @return Drawableのインデックス
     */
    CubismModel.prototype.getDrawableIndex = function (drawableId) {
        var drawableCount = this._model.drawables.count;
        for (var drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
            if (this._drawableIds.at(drawableIndex) == drawableId) {
                return drawableIndex;
            }
        }
        return -1;
    };
    /**
     * Drawableの個数の取得
     * @return drawableの個数
     */
    CubismModel.prototype.getDrawableCount = function () {
        var drawableCount = this._model.drawables.count;
        return drawableCount;
    };
    /**
     * DrawableのIDを取得する
     * @param drawableIndex Drawableのインデックス
     * @return drawableのID
     */
    CubismModel.prototype.getDrawableId = function (drawableIndex) {
        var parameterIds = this._model.drawables.ids;
        return live2dcubismframework_1.CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
    };
    /**
     * Drawableの描画順リストの取得
     * @return Drawableの描画順リスト
     */
    CubismModel.prototype.getDrawableRenderOrders = function () {
        var renderOrders = this._model.drawables.renderOrders;
        return renderOrders;
    };
    /**
     * Drawableのテクスチャインデックスリストの取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableのテクスチャインデックスリスト
     */
    CubismModel.prototype.getDrawableTextureIndices = function (drawableIndex) {
        var textureIndices = this._model.drawables.textureIndices;
        return textureIndices[drawableIndex];
    };
    /**
     * DrawableのVertexPositionsの変化情報の取得
     *
     * 直近のCubismModel.update関数でDrawableの頂点情報が変化したかを取得する。
     *
     * @param   drawableIndex   Drawableのインデックス
     * @retval  true    Drawableの頂点情報が直近のCubismModel.update関数で変化した
     * @retval  false   Drawableの頂点情報が直近のCubismModel.update関数で変化していない
     */
    CubismModel.prototype.getDrawableDynamicFlagVertexPositionsDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(dynamicFlags[drawableIndex]);
    };
    /**
     * Drawableの頂点インデックスの個数の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点インデックスの個数
     */
    CubismModel.prototype.getDrawableVertexIndexCount = function (drawableIndex) {
        var indexCounts = this._model.drawables.indexCounts;
        return indexCounts[drawableIndex];
    };
    /**
     * Drawableの頂点の個数の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点の個数
     */
    CubismModel.prototype.getDrawableVertexCount = function (drawableIndex) {
        var vertexCounts = this._model.drawables.vertexCounts;
        return vertexCounts[drawableIndex];
    };
    /**
     * Drawableの頂点リストの取得
     * @param drawableIndex drawableのインデックス
     * @return drawableの頂点リスト
     */
    CubismModel.prototype.getDrawableVertices = function (drawableIndex) {
        return this.getDrawableVertexPositions(drawableIndex);
    };
    /**
     * Drawableの頂点インデックスリストの取得
     * @param drarableIndex Drawableのインデックス
     * @return drawableの頂点インデックスリスト
     */
    CubismModel.prototype.getDrawableVertexIndices = function (drawableIndex) {
        var indicesArray = this._model.drawables.indices;
        return indicesArray[drawableIndex];
    };
    /**
     * Drawableの頂点リストの取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点リスト
     */
    CubismModel.prototype.getDrawableVertexPositions = function (drawableIndex) {
        var verticesArray = this._model.drawables.vertexPositions;
        return verticesArray[drawableIndex];
    };
    /**
     * Drawableの頂点のUVリストの取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの頂点UVリスト
     */
    CubismModel.prototype.getDrawableVertexUvs = function (drawableIndex) {
        var uvsArray = this._model.drawables.vertexUvs;
        return uvsArray[drawableIndex];
    };
    /**
     * Drawableの不透明度の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableの不透明度
     */
    CubismModel.prototype.getDrawableOpacity = function (drawableIndex) {
        var opacities = this._model.drawables.opacities;
        return opacities[drawableIndex];
    };
    /**
     * Drawableのカリング情報の取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableのカリング情報
     */
    CubismModel.prototype.getDrawableCulling = function (drawableIndex) {
        var constantFlags = this._model.drawables.constantFlags;
        return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[drawableIndex]);
    };
    /**
     * Drawableのブレンドモードを取得
     * @param drawableIndex Drawableのインデックス
     * @return drawableのブレンドモード
     */
    CubismModel.prototype.getDrawableBlendMode = function (drawableIndex) {
        var constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasBlendAdditiveBit(constantFlags[drawableIndex])
            ? cubismrenderer_1.CubismBlendMode.CubismBlendMode_Additive
            : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(constantFlags[drawableIndex])
                ? cubismrenderer_1.CubismBlendMode.CubismBlendMode_Multiplicative
                : cubismrenderer_1.CubismBlendMode.CubismBlendMode_Normal;
    };
    /**
     * Drawableのマスクの反転使用の取得
     *
     * Drawableのマスク使用時の反転設定を取得する。
     * マスクを使用しない場合は無視される。
     *
     * @param drawableIndex Drawableのインデックス
     * @return Drawableの反転設定
     */
    CubismModel.prototype.getDrawableInvertedMaskBit = function (drawableIndex) {
        var constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasIsInvertedMaskBit(constantFlags[drawableIndex]);
    };
    /**
     * Drawableのクリッピングマスクリストの取得
     * @return Drawableのクリッピングマスクリスト
     */
    CubismModel.prototype.getDrawableMasks = function () {
        var masks = this._model.drawables.masks;
        return masks;
    };
    /**
     * Drawableのクリッピングマスクの個数リストの取得
     * @return Drawableのクリッピングマスクの個数リスト
     */
    CubismModel.prototype.getDrawableMaskCounts = function () {
        var maskCounts = this._model.drawables.maskCounts;
        return maskCounts;
    };
    /**
     * クリッピングマスクの使用状態
     *
     * @return true クリッピングマスクを使用している
     * @return false クリッピングマスクを使用していない
     */
    CubismModel.prototype.isUsingMasking = function () {
        for (var d = 0; d < this._model.drawables.count; ++d) {
            if (this._model.drawables.maskCounts[d] <= 0) {
                continue;
            }
            return true;
        }
        return false;
    };
    /**
     * Drawableの表示情報を取得する
     *
     * @param drawableIndex Drawableのインデックス
     * @return true Drawableが表示
     * @return false Drawableが非表示
     */
    CubismModel.prototype.getDrawableDynamicFlagIsVisible = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
    };
    /**
     * DrawableのDrawOrderの変化情報の取得
     *
     * 直近のCubismModel.update関数でdrawableのdrawOrderが変化したかを取得する。
     * drawOrderはartMesh上で指定する0から1000の情報
     * @param drawableIndex drawableのインデックス
     * @return true drawableの不透明度が直近のCubismModel.update関数で変化した
     * @return false drawableの不透明度が直近のCubismModel.update関数で変化している
     */
    CubismModel.prototype.getDrawableDynamicFlagVisibilityDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(dynamicFlags[drawableIndex]);
    };
    /**
     * Drawableの不透明度の変化情報の取得
     *
     * 直近のCubismModel.update関数でdrawableの不透明度が変化したかを取得する。
     *
     * @param drawableIndex drawableのインデックス
     * @return true Drawableの不透明度が直近のCubismModel.update関数で変化した
     * @return false Drawableの不透明度が直近のCubismModel.update関数で変化してない
     */
    CubismModel.prototype.getDrawableDynamicFlagOpacityDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasOpacityDidChangeBit(dynamicFlags[drawableIndex]);
    };
    /**
     * Drawableの描画順序の変化情報の取得
     *
     * 直近のCubismModel.update関数でDrawableの描画の順序が変化したかを取得する。
     *
     * @param drawableIndex Drawableのインデックス
     * @return true Drawableの描画の順序が直近のCubismModel.update関数で変化した
     * @return false Drawableの描画の順序が直近のCubismModel.update関数で変化してない
     */
    CubismModel.prototype.getDrawableDynamicFlagRenderOrderDidChange = function (drawableIndex) {
        var dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(dynamicFlags[drawableIndex]);
    };
    /**
     * 保存されたパラメータの読み込み
     */
    CubismModel.prototype.loadParameters = function () {
        var parameterCount = this._model.parameters.count;
        var savedParameterCount = this._savedParameters.getSize();
        if (parameterCount > savedParameterCount) {
            parameterCount = savedParameterCount;
        }
        for (var i = 0; i < parameterCount; ++i) {
            this._parameterValues[i] = this._savedParameters.at(i);
        }
    };
    /**
     * 初期化する
     */
    CubismModel.prototype.initialize = function () {
        cubismdebug_1.CSM_ASSERT(this._model);
        this._parameterValues = this._model.parameters.values;
        this._partOpacities = this._model.parts.opacities;
        this._parameterMaximumValues = this._model.parameters.maximumValues;
        this._parameterMinimumValues = this._model.parameters.minimumValues;
        {
            var parameterIds = this._model.parameters.ids;
            var parameterCount = this._model.parameters.count;
            this._parameterIds.prepareCapacity(parameterCount);
            for (var i = 0; i < parameterCount; ++i) {
                this._parameterIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(parameterIds[i]));
            }
        }
        {
            var partIds = this._model.parts.ids;
            var partCount = this._model.parts.count;
            this._partIds.prepareCapacity(partCount);
            for (var i = 0; i < partCount; ++i) {
                this._partIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(partIds[i]));
            }
        }
        {
            var drawableIds = this._model.drawables.ids;
            var drawableCount = this._model.drawables.count;
            this._drawableIds.prepareCapacity(drawableCount);
            for (var i = 0; i < drawableCount; ++i) {
                this._drawableIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(drawableIds[i]));
            }
        }
    };
    /**
     * デストラクタ相当の処理
     */
    CubismModel.prototype.release = function () {
        this._model.release();
        this._model = null;
    };
    return CubismModel;
}());
exports.CubismModel = CubismModel;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmodel"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModel = $.CubismModel;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmodel.js.map
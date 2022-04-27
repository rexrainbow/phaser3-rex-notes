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
var csmvector_1 = require("../type/csmvector");
var cubismjson_1 = require("../utils/cubismjson");
var Epsilon = 0.001;
var DefaultFadeInSeconds = 0.5;
// Pose.jsonのタグ
var FadeIn = 'FadeInTime';
var Link = 'Link';
var Groups = 'Groups';
var Id = 'Id';
/**
 * パーツの不透明度の設定
 *
 * パーツの不透明度の管理と設定を行う。
 */
var CubismPose = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismPose() {
        this._fadeTimeSeconds = DefaultFadeInSeconds;
        this._lastModel = null;
        this._partGroups = new csmvector_1.csmVector();
        this._partGroupCounts = new csmvector_1.csmVector();
    }
    /**
     * インスタンスの作成
     * @param pose3json pose3.jsonのデータ
     * @param size pose3.jsonのデータのサイズ[byte]
     * @return 作成されたインスタンス
     */
    CubismPose.create = function (pose3json, size) {
        var ret = new CubismPose();
        var json = cubismjson_1.CubismJson.create(pose3json, size);
        var root = json.getRoot();
        // フェード時間の指定
        if (!root.getValueByString(FadeIn).isNull()) {
            ret._fadeTimeSeconds = root
                .getValueByString(FadeIn)
                .toFloat(DefaultFadeInSeconds);
            if (ret._fadeTimeSeconds <= 0.0) {
                ret._fadeTimeSeconds = DefaultFadeInSeconds;
            }
        }
        // パーツグループ
        var poseListInfo = root.getValueByString(Groups);
        var poseCount = poseListInfo.getSize();
        for (var poseIndex = 0; poseIndex < poseCount; ++poseIndex) {
            var idListInfo = poseListInfo.getValueByIndex(poseIndex);
            var idCount = idListInfo.getSize();
            var groupCount = 0;
            for (var groupIndex = 0; groupIndex < idCount; ++groupIndex) {
                var partInfo = idListInfo.getValueByIndex(groupIndex);
                var partData = new PartData();
                var parameterId = live2dcubismframework_1.CubismFramework.getIdManager().getId(partInfo.getValueByString(Id).getRawString());
                partData.partId = parameterId;
                // リンクするパーツの設定
                if (!partInfo.getValueByString(Link).isNull()) {
                    var linkListInfo = partInfo.getValueByString(Link);
                    var linkCount = linkListInfo.getSize();
                    for (var linkIndex = 0; linkIndex < linkCount; ++linkIndex) {
                        var linkPart = new PartData();
                        var linkId = live2dcubismframework_1.CubismFramework.getIdManager().getId(linkListInfo.getValueByIndex(linkIndex).getString());
                        linkPart.partId = linkId;
                        partData.link.pushBack(linkPart);
                    }
                }
                ret._partGroups.pushBack(partData.clone());
                ++groupCount;
            }
            ret._partGroupCounts.pushBack(groupCount);
        }
        cubismjson_1.CubismJson.delete(json);
        return ret;
    };
    /**
     * インスタンスを破棄する
     * @param pose 対象のCubismPose
     */
    CubismPose.delete = function (pose) {
        if (pose != null) {
            pose = null;
        }
    };
    /**
     * モデルのパラメータの更新
     * @param model 対象のモデル
     * @param deltaTimeSeconds デルタ時間[秒]
     */
    CubismPose.prototype.updateParameters = function (model, deltaTimeSeconds) {
        // 前回のモデルと同じでない場合は初期化が必要
        if (model != this._lastModel) {
            // パラメータインデックスの初期化
            this.reset(model);
        }
        this._lastModel = model;
        // 設定から時間を変更すると、経過時間がマイナスになる事があるので、経過時間0として対応
        if (deltaTimeSeconds < 0.0) {
            deltaTimeSeconds = 0.0;
        }
        var beginIndex = 0;
        for (var i = 0; i < this._partGroupCounts.getSize(); i++) {
            var partGroupCount = this._partGroupCounts.at(i);
            this.doFade(model, deltaTimeSeconds, beginIndex, partGroupCount);
            beginIndex += partGroupCount;
        }
        this.copyPartOpacities(model);
    };
    /**
     * 表示を初期化
     * @param model 対象のモデル
     * @note 不透明度の初期値が0でないパラメータは、不透明度を１に設定する
     */
    CubismPose.prototype.reset = function (model) {
        var beginIndex = 0;
        for (var i = 0; i < this._partGroupCounts.getSize(); ++i) {
            var groupCount = this._partGroupCounts.at(i);
            for (var j = beginIndex; j < beginIndex + groupCount; ++j) {
                this._partGroups.at(j).initialize(model);
                var partsIndex = this._partGroups.at(j).partIndex;
                var paramIndex = this._partGroups.at(j).parameterIndex;
                if (partsIndex < 0) {
                    continue;
                }
                model.setPartOpacityByIndex(partsIndex, j == beginIndex ? 1.0 : 0.0);
                model.setParameterValueByIndex(paramIndex, j == beginIndex ? 1.0 : 0.0);
                for (var k = 0; k < this._partGroups.at(j).link.getSize(); ++k) {
                    this._partGroups
                        .at(j)
                        .link.at(k)
                        .initialize(model);
                }
            }
            beginIndex += groupCount;
        }
    };
    /**
     * パーツの不透明度をコピー
     *
     * @param model 対象のモデル
     */
    CubismPose.prototype.copyPartOpacities = function (model) {
        for (var groupIndex = 0; groupIndex < this._partGroups.getSize(); ++groupIndex) {
            var partData = this._partGroups.at(groupIndex);
            if (partData.link.getSize() == 0) {
                continue; // 連動するパラメータはない
            }
            var partIndex = this._partGroups.at(groupIndex).partIndex;
            var opacity = model.getPartOpacityByIndex(partIndex);
            for (var linkIndex = 0; linkIndex < partData.link.getSize(); ++linkIndex) {
                var linkPart = partData.link.at(linkIndex);
                var linkPartIndex = linkPart.partIndex;
                if (linkPartIndex < 0) {
                    continue;
                }
                model.setPartOpacityByIndex(linkPartIndex, opacity);
            }
        }
    };
    /**
     * パーツのフェード操作を行う。
     * @param model 対象のモデル
     * @param deltaTimeSeconds デルタ時間[秒]
     * @param beginIndex フェード操作を行うパーツグループの先頭インデックス
     * @param partGroupCount フェード操作を行うパーツグループの個数
     */
    CubismPose.prototype.doFade = function (model, deltaTimeSeconds, beginIndex, partGroupCount) {
        var visiblePartIndex = -1;
        var newOpacity = 1.0;
        var phi = 0.5;
        var backOpacityThreshold = 0.15;
        // 現在、表示状態になっているパーツを取得
        for (var i = beginIndex; i < beginIndex + partGroupCount; ++i) {
            var partIndex = this._partGroups.at(i).partIndex;
            var paramIndex = this._partGroups.at(i).parameterIndex;
            if (model.getParameterValueByIndex(paramIndex) > Epsilon) {
                if (visiblePartIndex >= 0) {
                    break;
                }
                visiblePartIndex = i;
                newOpacity = model.getPartOpacityByIndex(partIndex);
                // 新しい不透明度を計算
                newOpacity += deltaTimeSeconds / this._fadeTimeSeconds;
                if (newOpacity > 1.0) {
                    newOpacity = 1.0;
                }
            }
        }
        if (visiblePartIndex < 0) {
            visiblePartIndex = 0;
            newOpacity = 1.0;
        }
        // 表示パーツ、非表示パーツの不透明度を設定する
        for (var i = beginIndex; i < beginIndex + partGroupCount; ++i) {
            var partsIndex = this._partGroups.at(i).partIndex;
            // 表示パーツの設定
            if (visiblePartIndex == i) {
                model.setPartOpacityByIndex(partsIndex, newOpacity); // 先に設定
            }
            // 非表示パーツの設定
            else {
                var opacity = model.getPartOpacityByIndex(partsIndex);
                var a1 = void 0; // 計算によって求められる不透明度
                if (newOpacity < phi) {
                    a1 = (newOpacity * (phi - 1)) / phi + 1.0; // (0,1),(phi,phi)を通る直線式
                }
                else {
                    a1 = ((1 - newOpacity) * phi) / (1.0 - phi); // (1,0),(phi,phi)を通る直線式
                }
                // 背景の見える割合を制限する場合
                var backOpacity = (1.0 - a1) * (1.0 - newOpacity);
                if (backOpacity > backOpacityThreshold) {
                    a1 = 1.0 - backOpacityThreshold / (1.0 - newOpacity);
                }
                if (opacity > a1) {
                    opacity = a1; // 計算の不透明度よりも大きければ（濃ければ）不透明度を上げる
                }
                model.setPartOpacityByIndex(partsIndex, opacity);
            }
        }
    };
    return CubismPose;
}());
exports.CubismPose = CubismPose;
/**
 * パーツにまつわるデータを管理
 */
var PartData = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function PartData(v) {
        this.parameterIndex = 0;
        this.partIndex = 0;
        this.link = new csmvector_1.csmVector();
        if (v != undefined) {
            this.partId = v.partId;
            for (var ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
                this.link.pushBack(ite.ptr().clone());
            }
        }
    }
    /**
     * =演算子のオーバーロード
     */
    PartData.prototype.assignment = function (v) {
        this.partId = v.partId;
        for (var ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
            this.link.pushBack(ite.ptr().clone());
        }
        return this;
    };
    /**
     * 初期化
     * @param model 初期化に使用するモデル
     */
    PartData.prototype.initialize = function (model) {
        this.parameterIndex = model.getParameterIndex(this.partId);
        this.partIndex = model.getPartIndex(this.partId);
        model.setParameterValueByIndex(this.parameterIndex, 1);
    };
    /**
     * オブジェクトのコピーを生成する
     */
    PartData.prototype.clone = function () {
        var clonePartData = new PartData();
        clonePartData.partId = this.partId;
        clonePartData.parameterIndex = this.parameterIndex;
        clonePartData.partIndex = this.partIndex;
        clonePartData.link = new csmvector_1.csmVector();
        for (var ite = this.link.begin(); ite.notEqual(this.link.end()); ite.increment()) {
            clonePartData.link.pushBack(ite.ptr().clone());
        }
        return clonePartData;
    };
    return PartData;
}());
exports.PartData = PartData;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismpose"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismPose = $.CubismPose;
    Live2DCubismFramework.PartData = $.PartData;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismpose.js.map
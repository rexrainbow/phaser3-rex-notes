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
var icubismmodelsetting_1 = require("./icubismmodelsetting");
var live2dcubismframework_1 = require("./live2dcubismframework");
var csmvector_1 = require("./type/csmvector");
var cubismjson_1 = require("./utils/cubismjson");
/**
 * Model3Jsonのキー文字列
 */
// JSON Keys
var Version = 'Version';
var FileReferences = 'FileReferences';
var Groups = 'Groups';
var Layout = 'Layout';
var HitAreas = 'HitAreas';
var Moc = 'Moc';
var Textures = 'Textures';
var Physics = 'Physics';
var Pose = 'Pose';
var Expressions = 'Expressions';
var Motions = 'Motions';
var UserData = 'UserData';
var Name = 'Name';
var FilePath = 'File';
var Id = 'Id';
var Ids = 'Ids';
var Target = 'Target';
// Motions
var Idle = 'Idle';
var TapBody = 'TapBody';
var PinchIn = 'PinchIn';
var PinchOut = 'PinchOut';
var Shake = 'Shake';
var FlickHead = 'FlickHead';
var Parameter = 'Parameter';
var SoundPath = 'Sound';
var FadeInTime = 'FadeInTime';
var FadeOutTime = 'FadeOutTime';
// Layout
var CenterX = 'CenterX';
var CenterY = 'CenterY';
var X = 'X';
var Y = 'Y';
var Width = 'Width';
var Height = 'Height';
var LipSync = 'LipSync';
var EyeBlink = 'EyeBlink';
var InitParameter = 'init_param';
var InitPartsVisible = 'init_parts_visible';
var Val = 'val';
var FrequestNode;
(function (FrequestNode) {
    FrequestNode[FrequestNode["FrequestNode_Groups"] = 0] = "FrequestNode_Groups";
    FrequestNode[FrequestNode["FrequestNode_Moc"] = 1] = "FrequestNode_Moc";
    FrequestNode[FrequestNode["FrequestNode_Motions"] = 2] = "FrequestNode_Motions";
    FrequestNode[FrequestNode["FrequestNode_Expressions"] = 3] = "FrequestNode_Expressions";
    FrequestNode[FrequestNode["FrequestNode_Textures"] = 4] = "FrequestNode_Textures";
    FrequestNode[FrequestNode["FrequestNode_Physics"] = 5] = "FrequestNode_Physics";
    FrequestNode[FrequestNode["FrequestNode_Pose"] = 6] = "FrequestNode_Pose";
    FrequestNode[FrequestNode["FrequestNode_HitAreas"] = 7] = "FrequestNode_HitAreas"; // getRoot().getValueByString(HitAreas)
})(FrequestNode || (FrequestNode = {}));
/**
 * Model3Jsonパーサー
 *
 * model3.jsonファイルをパースして値を取得する
 */
var CubismModelSettingJson = /** @class */ (function (_super) {
    __extends(CubismModelSettingJson, _super);
    /**
     * 引数付きコンストラクタ
     *
     * @param buffer    Model3Jsonをバイト配列として読み込んだデータバッファ
     * @param size      Model3Jsonのデータサイズ
     */
    function CubismModelSettingJson(buffer, size) {
        var _this = _super.call(this) || this;
        _this._json = cubismjson_1.CubismJson.create(buffer, size);
        if (_this._json) {
            _this._jsonValue = new csmvector_1.csmVector();
            // 順番はenum FrequestNodeと一致させる
            _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(Groups));
            _this._jsonValue.pushBack(_this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Moc));
            _this._jsonValue.pushBack(_this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Motions));
            _this._jsonValue.pushBack(_this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Expressions));
            _this._jsonValue.pushBack(_this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Textures));
            _this._jsonValue.pushBack(_this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Physics));
            _this._jsonValue.pushBack(_this._json
                .getRoot()
                .getValueByString(FileReferences)
                .getValueByString(Pose));
            _this._jsonValue.pushBack(_this._json.getRoot().getValueByString(HitAreas));
        }
        return _this;
    }
    /**
     * デストラクタ相当の処理
     */
    CubismModelSettingJson.prototype.release = function () {
        cubismjson_1.CubismJson.delete(this._json);
        this._jsonValue = null;
    };
    /**
     * CubismJsonオブジェクトを取得する
     *
     * @return CubismJson
     */
    CubismModelSettingJson.prototype.GetJson = function () {
        return this._json;
    };
    /**
     * Mocファイルの名前を取得する
     * @return Mocファイルの名前
     */
    CubismModelSettingJson.prototype.getModelFileName = function () {
        if (!this.isExistModelFile()) {
            return '';
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Moc).getRawString();
    };
    /**
     * モデルが使用するテクスチャの数を取得する
     * テクスチャの数
     */
    CubismModelSettingJson.prototype.getTextureCount = function () {
        if (!this.isExistTextureFiles()) {
            return 0;
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getSize();
    };
    /**
     * テクスチャが配置されたディレクトリの名前を取得する
     * @return テクスチャが配置されたディレクトリの名前
     */
    CubismModelSettingJson.prototype.getTextureDirectory = function () {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Textures)
            .getRawString();
    };
    /**
     * モデルが使用するテクスチャの名前を取得する
     * @param index 配列のインデックス値
     * @return テクスチャの名前
     */
    CubismModelSettingJson.prototype.getTextureFileName = function (index) {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Textures)
            .getValueByIndex(index)
            .getRawString();
    };
    /**
     * モデルに設定された当たり判定の数を取得する
     * @return モデルに設定された当たり判定の数
     */
    CubismModelSettingJson.prototype.getHitAreasCount = function () {
        if (!this.isExistHitAreas()) {
            return 0;
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getSize();
    };
    /**
     * 当たり判定に設定されたIDを取得する
     *
     * @param index 配列のindex
     * @return 当たり判定に設定されたID
     */
    CubismModelSettingJson.prototype.getHitAreaId = function (index) {
        return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._jsonValue
            .at(FrequestNode.FrequestNode_HitAreas)
            .getValueByIndex(index)
            .getValueByString(Id)
            .getRawString());
    };
    /**
     * 当たり判定に設定された名前を取得する
     * @param index 配列のインデックス値
     * @return 当たり判定に設定された名前
     */
    CubismModelSettingJson.prototype.getHitAreaName = function (index) {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_HitAreas)
            .getValueByIndex(index)
            .getValueByString(Name)
            .getRawString();
    };
    /**
     * 物理演算設定ファイルの名前を取得する
     * @return 物理演算設定ファイルの名前
     */
    CubismModelSettingJson.prototype.getPhysicsFileName = function () {
        if (!this.isExistPhysicsFile()) {
            return '';
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Physics).getRawString();
    };
    /**
     * パーツ切り替え設定ファイルの名前を取得する
     * @return パーツ切り替え設定ファイルの名前
     */
    CubismModelSettingJson.prototype.getPoseFileName = function () {
        if (!this.isExistPoseFile()) {
            return '';
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Pose).getRawString();
    };
    /**
     * 表情設定ファイルの数を取得する
     * @return 表情設定ファイルの数
     */
    CubismModelSettingJson.prototype.getExpressionCount = function () {
        if (!this.isExistExpressionFile()) {
            return 0;
        }
        return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getSize();
    };
    /**
     * 表情設定ファイルを識別する名前（別名）を取得する
     * @param index 配列のインデックス値
     * @return 表情の名前
     */
    CubismModelSettingJson.prototype.getExpressionName = function (index) {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Expressions)
            .getValueByIndex(index)
            .getValueByString(Name)
            .getRawString();
    };
    /**
     * 表情設定ファイルの名前を取得する
     * @param index 配列のインデックス値
     * @return 表情設定ファイルの名前
     */
    CubismModelSettingJson.prototype.getExpressionFileName = function (index) {
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Expressions)
            .getValueByIndex(index)
            .getValueByString(FilePath)
            .getRawString();
    };
    /**
     * モーショングループの数を取得する
     * @return モーショングループの数
     */
    CubismModelSettingJson.prototype.getMotionGroupCount = function () {
        if (!this.isExistMotionGroups()) {
            return 0;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getKeys()
            .getSize();
    };
    /**
     * モーショングループの名前を取得する
     * @param index 配列のインデックス値
     * @return モーショングループの名前
     */
    CubismModelSettingJson.prototype.getMotionGroupName = function (index) {
        if (!this.isExistMotionGroups()) {
            return null;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getKeys()
            .at(index);
    };
    /**
     * モーショングループに含まれるモーションの数を取得する
     * @param groupName モーショングループの名前
     * @return モーショングループの数
     */
    CubismModelSettingJson.prototype.getMotionCount = function (groupName) {
        if (!this.isExistMotionGroupName(groupName)) {
            return 0;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getSize();
    };
    /**
     * グループ名とインデックス値からモーションファイル名を取得する
     * @param groupName モーショングループの名前
     * @param index     配列のインデックス値
     * @return モーションファイルの名前
     */
    CubismModelSettingJson.prototype.getMotionFileName = function (groupName, index) {
        if (!this.isExistMotionGroupName(groupName)) {
            return '';
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FilePath)
            .getRawString();
    };
    /**
     * モーションに対応するサウンドファイルの名前を取得する
     * @param groupName モーショングループの名前
     * @param index 配列のインデックス値
     * @return サウンドファイルの名前
     */
    CubismModelSettingJson.prototype.getMotionSoundFileName = function (groupName, index) {
        if (!this.isExistMotionSoundFile(groupName, index)) {
            return '';
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(SoundPath)
            .getRawString();
    };
    /**
     * モーション開始時のフェードイン処理時間を取得する
     * @param groupName モーショングループの名前
     * @param index 配列のインデックス値
     * @return フェードイン処理時間[秒]
     */
    CubismModelSettingJson.prototype.getMotionFadeInTimeValue = function (groupName, index) {
        if (!this.isExistMotionFadeIn(groupName, index)) {
            return -1.0;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FadeInTime)
            .toFloat();
    };
    /**
     * モーション終了時のフェードアウト処理時間を取得する
     * @param groupName モーショングループの名前
     * @param index 配列のインデックス値
     * @return フェードアウト処理時間[秒]
     */
    CubismModelSettingJson.prototype.getMotionFadeOutTimeValue = function (groupName, index) {
        if (!this.isExistMotionFadeOut(groupName, index)) {
            return -1.0;
        }
        return this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FadeOutTime)
            .toFloat();
    };
    /**
     * ユーザーデータのファイル名を取得する
     * @return ユーザーデータのファイル名
     */
    CubismModelSettingJson.prototype.getUserDataFile = function () {
        if (!this.isExistUserDataFile()) {
            return '';
        }
        return this._json
            .getRoot()
            .getValueByString(FileReferences)
            .getValueByString(UserData)
            .getRawString();
    };
    /**
     * レイアウト情報を取得する
     * @param outLayoutMap csmMapクラスのインスタンス
     * @return true レイアウト情報が存在する
     * @return false レイアウト情報が存在しない
     */
    CubismModelSettingJson.prototype.getLayoutMap = function (outLayoutMap) {
        // 存在しない要素にアクセスするとエラーになるためValueがnullの場合はnullを代入する
        var map = this._json
            .getRoot()
            .getValueByString(Layout)
            .getMap();
        if (map == null) {
            return false;
        }
        var ret = false;
        for (var ite = map.begin(); ite.notEqual(map.end()); ite.preIncrement()) {
            outLayoutMap.setValue(ite.ptr().first, ite.ptr().second.toFloat());
            ret = true;
        }
        return ret;
    };
    /**
     * 目パチに関連付けられたパラメータの数を取得する
     * @return 目パチに関連付けられたパラメータの数
     */
    CubismModelSettingJson.prototype.getEyeBlinkParameterCount = function () {
        if (!this.isExistEyeBlinkParameters()) {
            return 0;
        }
        var num = 0;
        for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            var refI = this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
                continue;
            }
            if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                num = refI
                    .getValueByString(Ids)
                    .getVector()
                    .getSize();
                break;
            }
        }
        return num;
    };
    /**
     * 目パチに関連付けられたパラメータのIDを取得する
     * @param index 配列のインデックス値
     * @return パラメータID
     */
    CubismModelSettingJson.prototype.getEyeBlinkParameterId = function (index) {
        if (!this.isExistEyeBlinkParameters()) {
            return null;
        }
        for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            var refI = this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
                continue;
            }
            if (refI.getValueByString(Name).getRawString() == EyeBlink) {
                return live2dcubismframework_1.CubismFramework.getIdManager().getId(refI
                    .getValueByString(Ids)
                    .getValueByIndex(index)
                    .getRawString());
            }
        }
        return null;
    };
    /**
     * リップシンクに関連付けられたパラメータの数を取得する
     * @return リップシンクに関連付けられたパラメータの数
     */
    CubismModelSettingJson.prototype.getLipSyncParameterCount = function () {
        if (!this.isExistLipSyncParameters()) {
            return 0;
        }
        var num = 0;
        for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            var refI = this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
                continue;
            }
            if (refI.getValueByString(Name).getRawString() == LipSync) {
                num = refI
                    .getValueByString(Ids)
                    .getVector()
                    .getSize();
                break;
            }
        }
        return num;
    };
    /**
     * リップシンクに関連付けられたパラメータの数を取得する
     * @param index 配列のインデックス値
     * @return パラメータID
     */
    CubismModelSettingJson.prototype.getLipSyncParameterId = function (index) {
        if (!this.isExistLipSyncParameters()) {
            return null;
        }
        for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            var refI = this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
                continue;
            }
            if (refI.getValueByString(Name).getRawString() == LipSync) {
                return live2dcubismframework_1.CubismFramework.getIdManager().getId(refI
                    .getValueByString(Ids)
                    .getValueByIndex(index)
                    .getRawString());
            }
        }
        return null;
    };
    /**
     * モデルファイルのキーが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistModelFile = function () {
        var node = this._jsonValue.at(FrequestNode.FrequestNode_Moc);
        return !node.isNull() && !node.isError();
    };
    /**
     * テクスチャファイルのキーが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistTextureFiles = function () {
        var node = this._jsonValue.at(FrequestNode.FrequestNode_Textures);
        return !node.isNull() && !node.isError();
    };
    /**
     * 当たり判定のキーが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistHitAreas = function () {
        var node = this._jsonValue.at(FrequestNode.FrequestNode_HitAreas);
        return !node.isNull() && !node.isError();
    };
    /**
     * 物理演算ファイルのキーが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistPhysicsFile = function () {
        var node = this._jsonValue.at(FrequestNode.FrequestNode_Physics);
        return !node.isNull() && !node.isError();
    };
    /**
     * ポーズ設定ファイルのキーが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistPoseFile = function () {
        var node = this._jsonValue.at(FrequestNode.FrequestNode_Pose);
        return !node.isNull() && !node.isError();
    };
    /**
     * 表情設定ファイルのキーが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistExpressionFile = function () {
        var node = this._jsonValue.at(FrequestNode.FrequestNode_Expressions);
        return !node.isNull() && !node.isError();
    };
    /**
     * モーショングループのキーが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistMotionGroups = function () {
        var node = this._jsonValue.at(FrequestNode.FrequestNode_Motions);
        return !node.isNull() && !node.isError();
    };
    /**
     * 引数で指定したモーショングループのキーが存在するかどうかを確認する
     * @param groupName  グループ名
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistMotionGroupName = function (groupName) {
        var node = this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName);
        return !node.isNull() && !node.isError();
    };
    /**
     * 引数で指定したモーションに対応するサウンドファイルのキーが存在するかどうかを確認する
     * @param groupName  グループ名
     * @param index 配列のインデックス値
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistMotionSoundFile = function (groupName, index) {
        var node = this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(SoundPath);
        return !node.isNull() && !node.isError();
    };
    /**
     * 引数で指定したモーションに対応するフェードイン時間のキーが存在するかどうかを確認する
     * @param groupName  グループ名
     * @param index 配列のインデックス値
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistMotionFadeIn = function (groupName, index) {
        var node = this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FadeInTime);
        return !node.isNull() && !node.isError();
    };
    /**
     * 引数で指定したモーションに対応するフェードアウト時間のキーが存在するかどうかを確認する
     * @param groupName  グループ名
     * @param index 配列のインデックス値
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistMotionFadeOut = function (groupName, index) {
        var node = this._jsonValue
            .at(FrequestNode.FrequestNode_Motions)
            .getValueByString(groupName)
            .getValueByIndex(index)
            .getValueByString(FadeOutTime);
        return !node.isNull() && !node.isError();
    };
    /**
     * UserDataのファイル名が存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistUserDataFile = function () {
        var node = this._json
            .getRoot()
            .getValueByString(FileReferences)
            .getValueByString(UserData);
        return !node.isNull() && !node.isError();
    };
    /**
     * 目ぱちに対応付けられたパラメータが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistEyeBlinkParameters = function () {
        if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() ||
            this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
            return false;
        }
        for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
            if (this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i)
                .getValueByString(Name)
                .getRawString() == EyeBlink) {
                return true;
            }
        }
        return false;
    };
    /**
     * リップシンクに対応付けられたパラメータが存在するかどうかを確認する
     * @return true キーが存在する
     * @return false キーが存在しない
     */
    CubismModelSettingJson.prototype.isExistLipSyncParameters = function () {
        if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() ||
            this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
            return false;
        }
        for (var i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
            if (this._jsonValue
                .at(FrequestNode.FrequestNode_Groups)
                .getValueByIndex(i)
                .getValueByString(Name)
                .getRawString() == LipSync) {
                return true;
            }
        }
        return false;
    };
    return CubismModelSettingJson;
}(icubismmodelsetting_1.ICubismModelSetting));
exports.CubismModelSettingJson = CubismModelSettingJson;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmodelsettingjson"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelSettingJson = $.CubismModelSettingJson;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmodelsettingjson.js.map
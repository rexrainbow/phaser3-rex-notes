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
var cubismjson_1 = require("../utils/cubismjson");
var Meta = 'Meta';
var UserDataCount = 'UserDataCount';
var TotalUserDataSize = 'TotalUserDataSize';
var UserData = 'UserData';
var Target = 'Target';
var Id = 'Id';
var Value = 'Value';
var CubismModelUserDataJson = /** @class */ (function () {
    /**
     * コンストラクタ
     * @param buffer    userdata3.jsonが読み込まれているバッファ
     * @param size      バッファのサイズ
     */
    function CubismModelUserDataJson(buffer, size) {
        this._json = cubismjson_1.CubismJson.create(buffer, size);
    }
    /**
     * デストラクタ相当の処理
     */
    CubismModelUserDataJson.prototype.release = function () {
        cubismjson_1.CubismJson.delete(this._json);
    };
    /**
     * ユーザーデータ個数の取得
     * @return ユーザーデータの個数
     */
    CubismModelUserDataJson.prototype.getUserDataCount = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(UserDataCount)
            .toInt();
    };
    /**
     * ユーザーデータ総文字列数の取得
     *
     * @return ユーザーデータ総文字列数
     */
    CubismModelUserDataJson.prototype.getTotalUserDataSize = function () {
        return this._json
            .getRoot()
            .getValueByString(Meta)
            .getValueByString(TotalUserDataSize)
            .toInt();
    };
    /**
     * ユーザーデータのタイプの取得
     *
     * @return ユーザーデータのタイプ
     */
    CubismModelUserDataJson.prototype.getUserDataTargetType = function (i) {
        return this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Target)
            .getRawString();
    };
    /**
     * ユーザーデータのターゲットIDの取得
     *
     * @param i インデックス
     * @return ユーザーデータターゲットID
     */
    CubismModelUserDataJson.prototype.getUserDataId = function (i) {
        return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Id)
            .getRawString());
    };
    /**
     * ユーザーデータの文字列の取得
     *
     * @param i インデックス
     * @return ユーザーデータ
     */
    CubismModelUserDataJson.prototype.getUserDataValue = function (i) {
        return this._json
            .getRoot()
            .getValueByString(UserData)
            .getValueByIndex(i)
            .getValueByString(Value)
            .getRawString();
    };
    return CubismModelUserDataJson;
}());
exports.CubismModelUserDataJson = CubismModelUserDataJson;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismmodeluserdatajson"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismModelUserDataJson = $.CubismModelUserDataJson;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismmodeluserdatajson.js.map
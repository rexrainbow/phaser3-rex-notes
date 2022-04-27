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
/**
 * モデル設定情報を取り扱う関数を宣言した純粋仮想クラス。
 *
 * このクラスを継承することで、モデル設定情報を取り扱うクラスになる。
 */
var ICubismModelSetting = /** @class */ (function () {
    function ICubismModelSetting() {
    }
    return ICubismModelSetting;
}());
exports.ICubismModelSetting = ICubismModelSetting;
// Namespace definition for compatibility.
var $ = __importStar(require("./icubismmodelsetting"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.ICubismModelSetting = $.ICubismModelSetting;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=icubismmodelsetting.js.map
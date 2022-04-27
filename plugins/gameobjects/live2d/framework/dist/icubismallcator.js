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
 * メモリアロケーションを抽象化したクラス
 *
 * メモリ確保・解放処理をプラットフォーム側で実装して
 * フレームワークから呼び出すためのインターフェース
 */
var ICubismAllocator = /** @class */ (function () {
    function ICubismAllocator() {
    }
    return ICubismAllocator;
}());
exports.ICubismAllocator = ICubismAllocator;
// Namespace definition for compatibility.
var $ = __importStar(require("./icubismallcator"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.ICubismAllocator = $.ICubismAllocator;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=icubismallcator.js.map
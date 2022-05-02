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
var csmvector_1 = require("../type/csmvector");
var cubismid_1 = require("./cubismid");
/**
 * ID名の管理
 *
 * ID名を管理する。
 */
var CubismIdManager = /** @class */ (function () {
    /**
     * コンストラクタ
     */
    function CubismIdManager() {
        this._ids = new csmvector_1.csmVector();
    }
    /**
     * デストラクタ相当の処理
     */
    CubismIdManager.prototype.release = function () {
        for (var i = 0; i < this._ids.getSize(); ++i) {
            this._ids.set(i, void 0);
        }
        this._ids = null;
    };
    /**
     * ID名をリストから登録
     *
     * @param ids ID名リスト
     * @param count IDの個数
     */
    CubismIdManager.prototype.registerIds = function (ids) {
        for (var i = 0; i < ids.length; i++) {
            this.registerId(ids[i]);
        }
    };
    /**
     * ID名を登録
     *
     * @param id ID名
     */
    CubismIdManager.prototype.registerId = function (id) {
        var result = null;
        if ('string' == typeof id) {
            if ((result = this.findId(id)) != null) {
                return result;
            }
            result = new cubismid_1.CubismId(id);
            this._ids.pushBack(result);
        }
        else {
            return this.registerId(id.s);
        }
        return result;
    };
    /**
     * ID名からIDを取得する
     *
     * @param id ID名
     */
    CubismIdManager.prototype.getId = function (id) {
        return this.registerId(id);
    };
    /**
     * ID名からIDの確認
     *
     * @return true 存在する
     * @return false 存在しない
     */
    CubismIdManager.prototype.isExist = function (id) {
        if ('string' == typeof id) {
            return this.findId(id) != null;
        }
        return this.isExist(id.s);
    };
    /**
     * ID名からIDを検索する。
     *
     * @param id ID名
     * @return 登録されているID。なければNULL。
     */
    CubismIdManager.prototype.findId = function (id) {
        for (var i = 0; i < this._ids.getSize(); ++i) {
            if (this._ids
                .at(i)
                .getString()
                .isEqual(id)) {
                return this._ids.at(i);
            }
        }
        return null;
    };
    return CubismIdManager;
}());
exports.CubismIdManager = CubismIdManager;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismidmanager"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismIdManager = $.CubismIdManager;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismidmanager.js.map
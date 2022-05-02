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
var CubismString = /** @class */ (function () {
    /**
     * コンストラクタ呼び出し不可な静的クラスにする。
     */
    function CubismString() {
    }
    /**
     * 標準出力の書式を適用した文字列を取得する。
     * @param format    標準出力の書式指定文字列
     * @param ...args   書式指定文字列に渡す文字列
     * @return 書式を適用した文字列
     */
    CubismString.getFormatedString = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var ret = format;
        return ret.replace(/\{(\d+)\}/g, function (m, k // m="{0}", k="0"
        ) {
            return args[k];
        });
    };
    /**
     * textがstartWordで始まっているかどうかを返す
     * @param test 検査対象の文字列
     * @param startWord 比較対象の文字列
     * @return true textがstartWordで始まっている
     * @return false textがstartWordで始まっていない
     */
    CubismString.isStartWith = function (text, startWord) {
        var textIndex = 0;
        var startWordIndex = 0;
        while (startWord[startWordIndex] != '\0') {
            if (text[textIndex] == '\0' ||
                text[textIndex++] != startWord[startWordIndex++]) {
                return false;
            }
        }
        return false;
    };
    /**
     * position位置の文字から数字を解析する。
     *
     * @param string 文字列
     * @param length 文字列の長さ
     * @param position 解析したい文字の位置
     * @param outEndPos 一文字も読み込まなかった場合はエラー値(-1)が入る
     * @return 解析結果の数値
     */
    CubismString.stringToFloat = function (string, length, position, outEndPos) {
        var i = position;
        var minus = false; // マイナスフラグ
        var period = false;
        var v1 = 0;
        //負号の確認
        var c = parseInt(string[i]);
        if (c < 0) {
            minus = true;
            i++;
        }
        //整数部の確認
        for (; i < length; i++) {
            var c_1 = string[i];
            if (0 <= parseInt(c_1) && parseInt(c_1) <= 9) {
                v1 = v1 * 10 + (parseInt(c_1) - 0);
            }
            else if (c_1 == '.') {
                period = true;
                i++;
                break;
            }
            else {
                break;
            }
        }
        //小数部の確認
        if (period) {
            var mul = 0.1;
            for (; i < length; i++) {
                c = parseFloat(string[i]) & 0xff;
                if (0 <= c && c <= 9) {
                    v1 += mul * (c - 0);
                }
                else {
                    break;
                }
                mul *= 0.1; //一桁下げる
                if (!c)
                    break;
            }
        }
        if (i == position) {
            //一文字も読み込まなかった場合
            outEndPos[0] = -1; //エラー値が入るので呼び出し元で適切な処理を行う
            return 0;
        }
        if (minus)
            v1 = -v1;
        outEndPos[0] = i;
        return v1;
    };
    return CubismString;
}());
exports.CubismString = CubismString;
// Namespace definition for compatibility.
var $ = __importStar(require("./cubismstring"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismString = $.CubismString;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=cubismstring.js.map
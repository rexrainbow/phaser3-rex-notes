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
var cubismidmanager_1 = require("./id/cubismidmanager");
var cubismrenderer_1 = require("./rendering/cubismrenderer");
var cubismdebug_1 = require("./utils/cubismdebug");
var cubismjson_1 = require("./utils/cubismjson");
function strtod(s, endPtr) {
    var index = 0;
    for (var i = 1;; i++) {
        var testC = s.slice(i - 1, i);
        // 指数・マイナスの可能性があるのでスキップする
        if (testC == 'e' || testC == '-' || testC == 'E') {
            continue;
        } // 文字列の範囲を広げていく
        var test = s.substring(0, i);
        var number = Number(test);
        if (isNaN(number)) {
            // 数値として認識できなくなったので終了
            break;
        } // 最後に数値としてできたindexを格納しておく
        index = i;
    }
    var d = parseFloat(s); // パースした数値
    if (isNaN(d)) {
        // 数値として認識できなくなったので終了
        d = NaN;
    }
    endPtr[0] = s.slice(index); // 後続の文字列
    return d;
}
exports.strtod = strtod;
// ファイルスコープの変数を初期化
var s_isStarted = false;
var s_isInitialized = false;
var s_option = null;
var s_cubismIdManager = null;
/**
 * Framework内で使う定数の宣言
 */
exports.Constant = Object.freeze({
    vertexOffset: 0,
    vertexStep: 2 // メッシュ頂点のステップ値
});
function csmDelete(address) {
    if (!address) {
        return;
    }
    address = void 0;
}
exports.csmDelete = csmDelete;
/**
 * Live2D Cubism SDK Original Workflow SDKのエントリポイント
 * 利用開始時はCubismFramework.initialize()を呼び、CubismFramework.dispose()で終了する。
 */
var CubismFramework = /** @class */ (function () {
    /**
     * 静的クラスとして使用する
     * インスタンス化させない
     */
    function CubismFramework() {
    }
    /**
     * Cubism FrameworkのAPIを使用可能にする。
     *  APIを実行する前に必ずこの関数を実行すること。
     *  一度準備が完了して以降は、再び実行しても内部処理がスキップされます。
     *
     * @param    option      Optionクラスのインスタンス
     *
     * @return   準備処理が完了したらtrueが返ります。
     */
    CubismFramework.startUp = function (option) {
        if (option === void 0) { option = null; }
        if (s_isStarted) {
            cubismdebug_1.CubismLogInfo('CubismFramework.startUp() is already done.');
            return s_isStarted;
        }
        s_option = option;
        if (s_option != null) {
            Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
        }
        s_isStarted = true;
        // Live2D Cubism Coreバージョン情報を表示
        if (s_isStarted) {
            var version = Live2DCubismCore.Version.csmGetVersion();
            var major = (version & 0xff000000) >> 24;
            var minor = (version & 0x00ff0000) >> 16;
            var patch = version & 0x0000ffff;
            var versionNumber = version;
            cubismdebug_1.CubismLogInfo("Live2D Cubism Core version: {0}.{1}.{2} ({3})", ('00' + major).slice(-2), ('00' + minor).slice(-2), ('0000' + patch).slice(-4), versionNumber);
        }
        cubismdebug_1.CubismLogInfo('CubismFramework.startUp() is complete.');
        return s_isStarted;
    };
    /**
     * StartUp()で初期化したCubismFrameworkの各パラメータをクリアします。
     * Dispose()したCubismFrameworkを再利用する際に利用してください。
     */
    CubismFramework.cleanUp = function () {
        s_isStarted = false;
        s_isInitialized = false;
        s_option = null;
        s_cubismIdManager = null;
    };
    /**
     * Cubism Framework内のリソースを初期化してモデルを表示可能な状態にします。<br>
     *     再度Initialize()するには先にDispose()を実行する必要があります。
     */
    CubismFramework.initialize = function () {
        cubismdebug_1.CSM_ASSERT(s_isStarted);
        if (!s_isStarted) {
            cubismdebug_1.CubismLogWarning('CubismFramework is not started.');
            return;
        }
        // --- s_isInitializedによる連続初期化ガード ---
        // 連続してリソース確保が行われないようにする。
        // 再度Initialize()するには先にDispose()を実行する必要がある。
        if (s_isInitialized) {
            cubismdebug_1.CubismLogWarning('CubismFramework.initialize() skipped, already initialized.');
            return;
        }
        //---- static 初期化 ----
        cubismjson_1.Value.staticInitializeNotForClientCall();
        s_cubismIdManager = new cubismidmanager_1.CubismIdManager();
        s_isInitialized = true;
        cubismdebug_1.CubismLogInfo('CubismFramework.initialize() is complete.');
    };
    /**
     * Cubism Framework内の全てのリソースを解放します。
     *      ただし、外部で確保されたリソースについては解放しません。
     *      外部で適切に破棄する必要があります。
     */
    CubismFramework.dispose = function () {
        cubismdebug_1.CSM_ASSERT(s_isStarted);
        if (!s_isStarted) {
            cubismdebug_1.CubismLogWarning('CubismFramework is not started.');
            return;
        }
        // --- s_isInitializedによる未初期化解放ガード ---
        // dispose()するには先にinitialize()を実行する必要がある。
        if (!s_isInitialized) {
            // false...リソース未確保の場合
            cubismdebug_1.CubismLogWarning('CubismFramework.dispose() skipped, not initialized.');
            return;
        }
        cubismjson_1.Value.staticReleaseNotForClientCall();
        s_cubismIdManager.release();
        s_cubismIdManager = null;
        // レンダラの静的リソース（シェーダプログラム他）を解放する
        cubismrenderer_1.CubismRenderer.staticRelease();
        s_isInitialized = false;
        cubismdebug_1.CubismLogInfo('CubismFramework.dispose() is complete.');
    };
    /**
     * Cubism FrameworkのAPIを使用する準備が完了したかどうか
     * @return APIを使用する準備が完了していればtrueが返ります。
     */
    CubismFramework.isStarted = function () {
        return s_isStarted;
    };
    /**
     * Cubism Frameworkのリソース初期化がすでに行われているかどうか
     * @return リソース確保が完了していればtrueが返ります
     */
    CubismFramework.isInitialized = function () {
        return s_isInitialized;
    };
    /**
     * Core APIにバインドしたログ関数を実行する
     *
     * @praram message ログメッセージ
     */
    CubismFramework.coreLogFunction = function (message) {
        // Return if logging not possible.
        if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
            return;
        }
        Live2DCubismCore.Logging.csmGetLogFunction()(message);
    };
    /**
     * 現在のログ出力レベル設定の値を返す。
     *
     * @return  現在のログ出力レベル設定の値
     */
    CubismFramework.getLoggingLevel = function () {
        if (s_option != null) {
            return s_option.loggingLevel;
        }
        return LogLevel.LogLevel_Off;
    };
    /**
     * IDマネージャのインスタンスを取得する
     * @return CubismManagerクラスのインスタンス
     */
    CubismFramework.getIdManager = function () {
        return s_cubismIdManager;
    };
    return CubismFramework;
}());
exports.CubismFramework = CubismFramework;
var Option = /** @class */ (function () {
    function Option() {
    }
    return Option;
}());
exports.Option = Option;
/**
 * ログ出力のレベル
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["LogLevel_Verbose"] = 0] = "LogLevel_Verbose";
    LogLevel[LogLevel["LogLevel_Debug"] = 1] = "LogLevel_Debug";
    LogLevel[LogLevel["LogLevel_Info"] = 2] = "LogLevel_Info";
    LogLevel[LogLevel["LogLevel_Warning"] = 3] = "LogLevel_Warning";
    LogLevel[LogLevel["LogLevel_Error"] = 4] = "LogLevel_Error";
    LogLevel[LogLevel["LogLevel_Off"] = 5] = "LogLevel_Off"; // ログ出力無効
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
// Namespace definition for compatibility.
var $ = __importStar(require("./live2dcubismframework"));
// eslint-disable-next-line @typescript-eslint/no-namespace
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.Constant = $.Constant;
    Live2DCubismFramework.csmDelete = $.csmDelete;
    Live2DCubismFramework.CubismFramework = $.CubismFramework;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));
//# sourceMappingURL=live2dcubismframework.js.map
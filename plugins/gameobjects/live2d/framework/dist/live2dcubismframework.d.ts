/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { CubismIdManager } from './id/cubismidmanager';
export declare function strtod(s: string, endPtr: string[]): number;
/**
 * Framework内で使う定数の宣言
 */
export declare const Constant: Readonly<Record<string, number>>;
export declare function csmDelete<T>(address: T): void;
/**
 * Live2D Cubism SDK Original Workflow SDKのエントリポイント
 * 利用開始時はCubismFramework.initialize()を呼び、CubismFramework.dispose()で終了する。
 */
export declare class CubismFramework {
    /**
     * Cubism FrameworkのAPIを使用可能にする。
     *  APIを実行する前に必ずこの関数を実行すること。
     *  一度準備が完了して以降は、再び実行しても内部処理がスキップされます。
     *
     * @param    option      Optionクラスのインスタンス
     *
     * @return   準備処理が完了したらtrueが返ります。
     */
    static startUp(option?: Option): boolean;
    /**
     * StartUp()で初期化したCubismFrameworkの各パラメータをクリアします。
     * Dispose()したCubismFrameworkを再利用する際に利用してください。
     */
    static cleanUp(): void;
    /**
     * Cubism Framework内のリソースを初期化してモデルを表示可能な状態にします。<br>
     *     再度Initialize()するには先にDispose()を実行する必要があります。
     */
    static initialize(): void;
    /**
     * Cubism Framework内の全てのリソースを解放します。
     *      ただし、外部で確保されたリソースについては解放しません。
     *      外部で適切に破棄する必要があります。
     */
    static dispose(): void;
    /**
     * Cubism FrameworkのAPIを使用する準備が完了したかどうか
     * @return APIを使用する準備が完了していればtrueが返ります。
     */
    static isStarted(): boolean;
    /**
     * Cubism Frameworkのリソース初期化がすでに行われているかどうか
     * @return リソース確保が完了していればtrueが返ります
     */
    static isInitialized(): boolean;
    /**
     * Core APIにバインドしたログ関数を実行する
     *
     * @praram message ログメッセージ
     */
    static coreLogFunction(message: string): void;
    /**
     * 現在のログ出力レベル設定の値を返す。
     *
     * @return  現在のログ出力レベル設定の値
     */
    static getLoggingLevel(): LogLevel;
    /**
     * IDマネージャのインスタンスを取得する
     * @return CubismManagerクラスのインスタンス
     */
    static getIdManager(): CubismIdManager;
    /**
     * 静的クラスとして使用する
     * インスタンス化させない
     */
    private constructor();
}
export declare class Option {
    logFunction: Live2DCubismCore.csmLogFunction;
    loggingLevel: LogLevel;
}
/**
 * ログ出力のレベル
 */
export declare enum LogLevel {
    LogLevel_Verbose = 0,
    LogLevel_Debug = 1,
    LogLevel_Info = 2,
    LogLevel_Warning = 3,
    LogLevel_Error = 4,
    LogLevel_Off = 5
}
import * as $ from './live2dcubismframework';
export declare namespace Live2DCubismFramework {
    const Constant: Readonly<Record<string, number>>;
    const csmDelete: typeof $.csmDelete;
    const CubismFramework: typeof $.CubismFramework;
    type CubismFramework = $.CubismFramework;
}
//# sourceMappingURL=live2dcubismframework.d.ts.map
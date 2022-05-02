/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */
import { LogLevel } from '../live2dcubismframework';
export declare const CubismLogPrint: (level: LogLevel, fmt: string, args: any[]) => void;
export declare const CubismLogPrintIn: (level: LogLevel, fmt: string, args: any[]) => void;
export declare const CSM_ASSERT: (expr: any) => void;
export declare let CubismLogVerbose: (fmt: string, ...args: any[]) => void;
export declare let CubismLogDebug: (fmt: string, ...args: any[]) => void;
export declare let CubismLogInfo: (fmt: string, ...args: any[]) => void;
export declare let CubismLogWarning: (fmt: string, ...args: any[]) => void;
export declare let CubismLogError: (fmt: string, ...args: any[]) => void;
/**
 * デバッグ用のユーティリティクラス。
 * ログの出力、バイトのダンプなど
 */
export declare class CubismDebug {
    /**
     * ログを出力する。第一引数にログレベルを設定する。
     * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
     *
     * @param logLevel ログレベルの設定
     * @param format 書式付き文字列
     * @param args 可変長引数
     */
    static print(logLevel: LogLevel, format: string, args?: any[]): void;
    /**
     * データから指定した長さだけダンプ出力する。
     * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
     *
     * @param logLevel ログレベルの設定
     * @param data ダンプするデータ
     * @param length ダンプする長さ
     */
    static dumpBytes(logLevel: LogLevel, data: Uint8Array, length: number): void;
    /**
     * private コンストラクタ
     */
    private constructor();
}
import * as $ from './cubismdebug';
export declare namespace Live2DCubismFramework {
    const CubismDebug: typeof $.CubismDebug;
    type CubismDebug = $.CubismDebug;
}
//# sourceMappingURL=cubismdebug.d.ts.map
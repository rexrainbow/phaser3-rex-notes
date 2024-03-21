export default BBCodeLog;

declare namespace BBCodeLog {
    interface IConfig {
        delimiters?: string | [string, string];
        enable?: boolean;
    }
}

declare class BBCodeLog {
    constructor(config?: BBCodeLog.IConfig);

    setEnable(enable?: boolean): this;

    log(
        s: string | null,
        logType?: string
    ): this;

}
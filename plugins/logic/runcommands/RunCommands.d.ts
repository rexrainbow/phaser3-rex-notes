export interface IConfig {
    reverse?: boolean,
    argsConvert?: ((s: any, cmd?: any[]) => any) | boolean,

}

export default function (
    queue: any[],
    scope?: object,
    config?: IConfig
): any
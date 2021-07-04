import { IConfig } from './logic/runcommands/RunCommands';

export default class RunCommandsPlugin extends Phaser.Plugins.BasePlugin {
    run(
        queue: any[],
        scope?: object,
        config?: IConfig
    ): any;

}
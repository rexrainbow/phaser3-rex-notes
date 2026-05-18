import RunCommands from './runcommands';

import { Plugins as PhaserPlugins } from 'phaser';
class RunCommandsPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    run(queue?: any, scope?: any, config?: any) {
        return RunCommands(queue, scope, config);
    }
}

export default RunCommandsPlugin;
import RunCommands from './runcommands.js';

import { Plugins as PhaserPlugins } from 'phaser';
class RunCommandsPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    run(queue, scope, config) {
        return RunCommands(queue, scope, config);
    }
}

export default RunCommandsPlugin;
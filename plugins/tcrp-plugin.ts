import TCRP from './tcrp';

import { Plugins as PhaserPlugins } from 'phaser';
const Recorder = TCRP.Recorder;
const Player = TCRP.Player;

class TCRPPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    addRecorder(parent?: any, config?: any) {
        return new Recorder(parent, config);
    }

    addPlayer(parent?: any, config?: any) {
        return new Player(parent, config);
    }
}

var methods = {
    runCommands: TCRP.RunCommands
}

Object.assign(
    TCRPPlugin.prototype,
    methods
);

export default TCRPPlugin;
import TCRP from './arcadetcrp';

import { Plugins as PhaserPlugins } from 'phaser';
const Recorder = TCRP.Recorder;
const Player = TCRP.Player;
const StepRunner = TCRP.StepRunner;

class ArcadeTCRPPlugin extends PhaserPlugins.BasePlugin {
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

    addStepRunner(parent?: any) {
        return new StepRunner(parent);
    }
}

var methods = {
    runCommands: TCRP.RunCommands
}

Object.assign(
    ArcadeTCRPPlugin.prototype,
    methods
);

export default ArcadeTCRPPlugin;
import TCRP from './tcrp.js';

const Recorder = TCRP.Recorder;
const Player = TCRP.Player;

class TCRPPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addRecorder(parent, config) {
        return new Recorder(parent, config);
    }

    addPlayer(parent, config) {
        return new Player(parent, config);
    }    
}

export default TCRPPlugin;
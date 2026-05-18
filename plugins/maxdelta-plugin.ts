import { Plugins as PhaserPlugins } from 'phaser';
class MaxDeltaPlugin extends PhaserPlugins.BasePlugin {
    game: any;
    maxDelta: any;
    prevTime: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        eventEmitter.on('step', this.update, this);
    }

    destroy() {
        this.game.events.off('step', this.update, this);
        super.destroy();
    }

    reset() {
        this.prevTime = undefined;
        this.maxDelta = undefined;
    }

    update(time?: any, delta?: any) {
        if (this.prevTime === undefined) {
            this.prevTime = time;
            this.maxDelta = 0;
        } else {
            var dt = time - this.prevTime;
            this.prevTime = time;
            if (this.maxDelta < dt) {
                this.maxDelta = dt;
                console.log(`Max delta: ${dt}`);
            }
        }
    }
}

export default MaxDeltaPlugin;
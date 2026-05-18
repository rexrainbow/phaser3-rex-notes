import ParticlesAlongBounds from './particlesalongbounds'

import { Plugins as PhaserPlugins } from 'phaser';
class ParticlesAlongBoundsPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    startEffect(gamObject?: any, config?: any) {
        return ParticlesAlongBounds(gamObject, config);
    }
}

export default ParticlesAlongBoundsPlugin;
import ParticlesAlongBounds from './particlesalongbounds.js'

import { Plugins as PhaserPlugins } from 'phaser';
class ParticlesAlongBoundsPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    startEffect(gamObject, config) {
        return ParticlesAlongBounds(gamObject, config);
    }
}

export default ParticlesAlongBoundsPlugin;
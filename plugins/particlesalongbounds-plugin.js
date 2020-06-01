import ParticlesAlongBounds from './particlesalongbounds.js'

class ParticlesAlongBoundsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    startEffect(gamObject, config, particles) {
        return ParticlesAlongBounds(gamObject, config, particles);
    }
}

export default ParticlesAlongBoundsPlugin;
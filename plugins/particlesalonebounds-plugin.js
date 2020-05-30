import ParticlesAloneBounds from './particlesalonebounds.js'

class ParticlesAloneBoundsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    startEffect(gamObject, config, particles) {
        return ParticlesAloneBounds(gamObject, config, particles);
    }
}

export default ParticlesAloneBoundsPlugin;
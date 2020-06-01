import CreateParticles from './CreateParticles.js';
import CreateEmitter from './CreateEmitter.js';

var ParticlesAlongBounds = function (gameObject, config, particles) {
    if (config === undefined) {
        config = {};
    }

    // Create particles
    if ((particles === undefined) || (!particles.scene)) {
        particles = CreateParticles(gameObject);
    }
    particles.setTexture(config.textureKey);

    // Create emitter
    config.gameObject = gameObject;
    var emitter = CreateEmitter(particles, config);

    return particles;
}

export default ParticlesAlongBounds;
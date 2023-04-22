import CreateEmitterConfig from './methods/CreateEmitterConfig.js';
import SyncToGameObject from './methods/SyncToGameObject.js';

/*
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
*/

var ParticlesAlongBounds = function (gameObject, config) {
    var emitterConfig = CreateEmitterConfig(gameObject, config);
    var particles = gameObject.scene.add.particles(0, 0, config.textureKey, emitterConfig);
    SyncToGameObject(particles, gameObject, config);

    particles.once('complete', function () {
        particles.destroy();
    });

    return particles;
}

export default ParticlesAlongBounds;
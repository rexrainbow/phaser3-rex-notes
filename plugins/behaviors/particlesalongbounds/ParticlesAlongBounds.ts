import CreateEmitterConfig from './methods/CreateEmitterConfig';
import SyncToGameObject from './methods/SyncToGameObject';

var ParticlesAlongBounds = function(gameObject?: any, config?: any) {
    if (config === undefined) {
        config = {};
    }

    var emitterConfig = CreateEmitterConfig(gameObject, config);
    var particles = gameObject.scene.add.particles(0, 0, config.textureKey, emitterConfig);
    SyncToGameObject(particles, gameObject, config);

    particles.once('complete', function() {
        particles.destroy();
    });

    return particles;
}

export default ParticlesAlongBounds;
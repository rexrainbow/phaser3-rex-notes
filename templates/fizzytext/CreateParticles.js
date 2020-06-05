var CreateParticles = function (fizzyText, config) {
    var scene = fizzyText.scene;
    var particles = scene.add.particles(config.key);
    config.emitZone = {
        type: 'random',
        source: config.source
    }
    particles.createEmitter(config);
    return particles;
}

export default CreateParticles;
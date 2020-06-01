const PreUpdate = Phaser.GameObjects.Particles.ParticleEmitterManager.prototype.preUpdate;
var CreateParticles = function (gameObject) {
    var particles = gameObject.scene.add.particles();

    // Override preUpdate, sync properties of particles to game object
    particles.preUpdate = (function (time, delta) {
        if (!gameObject.scene) { // gameObject has been destroyed
            this.destroy();
            return;
        }

        // Sync to gameObject
        SyncTo.call(this, gameObject);
        PreUpdate.call(this, time, delta);
    }).bind(particles);

    return particles;
}

var SyncTo = function (gameObject) {
    if (globPoint === undefined) {
        globPoint = { x: 0, y: 0 };
    }
    gameObject.getCenter(globPoint);
    this
        .setPosition(globPoint.x, globPoint.y)
        .setScale(gameObject.scaleX, gameObject.scaleY)
        .setAngle(gameObject.angle)
        .setAlpha(gameObject.alpha);

    if (this.depth !== gameObject.depth) {
        this.setDepth(gameObject.depth);
    }
}

var globPoint;

export default CreateParticles;
import PersistenceEffectPlugin from '../../plugins/persistenceeffect-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateTexture(this, 'dot');
        var persistenceEffect = this.add.rexPersistenceEffect('dot', {
            lifespan: 3000
        });

        this.input.on('pointermove', function (pointer) {
            if (pointer.isDown) {
                persistenceEffect.paste(pointer.worldX, pointer.worldY);
            }
        })
    }

    update() { }
}

var CreateTexture = function (scene, key) {
    var r = 4, w = r * 2;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillCircle(r, r, r)
        .generateTexture(key, w, w)
        .destroy();
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexPersistenceEffect',
            plugin: PersistenceEffectPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
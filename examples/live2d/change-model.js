import phaser from 'phaser/src/phaser.js';
import Live2dPlugin from '../../plugins/live2d-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.rexLive2dCoreScript('assets/live2d/core/live2dcubismcore.js');

        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
        this.load.rexLive2d('Hiyori', 'assets/live2d/Hiyori/Hiyori.model3.json');
    }

    create() {
        var x = this.game.config.width / 2,
            y = this.game.config.height / 2;

        var character0 = CreateCharacter(this, x - 500, y, 'Haru');
        var character1 = CreateCharacter(this, x + 500, y, 'Hiyori');

        this.input.on('pointermove', function (pointer) {
            var x = pointer.worldX, y = pointer.worldY;
            character0.lookAt(x, y);
            character1.lookAt(x, y);
        })
    }

    update() {
    }
}

var CreateCharacter = function (scene, x, y, key) {
    var character = scene.add.rexLive2d(x, y, key, {
        autoPlayIdleMotion: 'Idle'
    })
        .setScale(0.2)
        .setInteractive()
        .on('pointerdown-Body', function () {
            var key = (character.key === 'Haru') ? 'Hiyori' : 'Haru';
            character.setModel(key)
        })

    return character;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexLive2d',
                plugin: Live2dPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
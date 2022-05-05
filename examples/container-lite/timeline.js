import phaser from 'phaser/src/phaser.js';
import ContainerLitePlugin from '../../plugins/containerlite-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var sprite = this.add.rectangle(400, 300, 40, 60, 0xFF6347);
        var txt = this.add.text(400, 250, 'Name').setOrigin(0.5);
        var container = this.add.rexContainerLite(400, 300, 100, 100)
            .pin(sprite)
            .pin(txt, { syncRotation: false })

        sprite.wobble = container.timelineChild({
            targets: sprite,  // Can assign child here
            loop: -1,
            duration: 100,
            tweens: [
                {
                    // targets: sprite,  // Or assign child here
                    angle: 10,
                    yoyo: true,
                },
                {
                    // targets: sprite,
                    angle: -10,
                    yoyo: true,
                },
            ],
        })

        container.movement = this.tweens.add({
            targets: container,
            x: '+=300',
            y: '+=100',
            duration: 3000,
            repeat: -1,
            yoyo: true
        })
    }

    update() {
    }
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
            key: 'rexContainerLite',
            plugin: ContainerLitePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
import phaser from 'phaser/src/phaser.js';
import ModalPlugin from '../../plugins/modal-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var print = this.add.text(0, 0, 'Click gray rectangle\n').setDepth(1);

        this.add.image(400, 300, 'classroom')
            .setInteractive()
            .on('pointerup', function () {
                print.text += 'Click bottom image\n';
            })

        var basePanel = this.add.rectangle(200, 300, 100, 100, 0xAAAAAA)
            .setInteractive()
            .on('pointerdown', function () {
                // Create modal game object after click basePanel
                var modalGameObject = this.add.rectangle(400, 300, 100, 100, 0xffffff)
                    .on('destroy', function () {
                        print.text += 'parent destroy\n'
                    })
                // button will be destroyed after modal closing

                var modelBehavior = this.plugins.get('rexModal').add(modalGameObject, {                    
                    touchOutsideClose: true,
                    duration: {
                        in: 1000,
                        out: 1000
                    },

                    // destroy: false
                })

                modelBehavior
                    .on('open', function () {
                        print.text += 'modal.open\n';
                    })
                    .on('close', function () {
                        print.text += 'modal.close\n';
                    })

                print.text += 'Click outside of white rectangle\n';
            }, this)

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
            key: 'rexModal',
            plugin: ModalPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
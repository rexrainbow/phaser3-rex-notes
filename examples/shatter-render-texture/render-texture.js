import 'phaser';
import ShatterImagePlugin from '../../plugins/shatterimage-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var mushroom = this.make.image({ key: 'mushroom', add: false });
        var numberText = this.make.text({
            text: '7',
            style: { color: 'red', fontSize: '36px', fontFamily: 'serif' },
            add: false
        }).setOrigin(1);


        var image = this.add.rexShatterRenderTexture(400, 300, 150, 200);
        image.rt
            .fill(0x888888)
            .draw(numberText, 150, 200)
            .draw(mushroom, 75, 100)

        this.input
            .on('pointerdown', function (pointer) {
                if (image.task) {
                    image.task.stop();
                    image.task = null;
                }
                image.shatter(pointer.x, pointer.y);
            })
            .on('pointerup', function () {
                image.startUpdate();
                image.task = this.tweens.add({
                    targets: image.faces,
                    alpha: 0,
                    angle: function () { return -90 + Math.random() * 180; },
                    y: '-=0.5',
                    ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 1000,
                    delay: this.tweens.stagger(20),
                    repeat: 0,            // -1: infinity
                    yoyo: false,
                    onComplete: function () {
                        image
                            .stopUpdate()
                            .resetImage()
                    }
                });
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
    backgroundColor: 0x333333,
    plugins: {
        global: [{
            key: 'rexShatterImage',
            plugin: ShatterImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
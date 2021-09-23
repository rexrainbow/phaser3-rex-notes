import 'phaser';
import ToBase64 from '../../plugins/utils/texture/ToBase64.js';

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
        var text = this.make.text({
            text: 'Phaser3\nPhaser3',
            style: {
                fontSize: 40
            },
            add: false
        })
        console.log(ToBase64(text));

        var image = this.make.image({
            key: 'mushroom',
            add: false
        })
        console.log(ToBase64(image));

    }

    update() { }
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
};

var game = new Phaser.Game(config);
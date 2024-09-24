import phaser from 'phaser/src/phaser.js';
import ClickableWhenHidden from '../../plugins/utils/gameobject/clickablewhenhidden/ClickableWhenHidden.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObjectType = 'image';

        var gameObject;
        switch (gameObjectType) {
            case 'rectangle':
                var GOClass = ClickableWhenHidden(Phaser.GameObjects.Rectangle);
                gameObject = new GOClass(this, 400, 300, 800, 600, 0x555555);
                break;

            case 'image':
                var GOClass = ClickableWhenHidden(Phaser.GameObjects.Image);
                gameObject = new GOClass(this, 400, 300, '__WHITE');
                gameObject.setDisplaySize(800, 600).setTint(0x555555);
                break;

            default:
                var GOClass = Phaser.GameObjects.Image;
                gameObject = new GOClass(this, 400, 300, '__WHITE');
                gameObject.setDisplaySize(800, 600).setTint(0x555555);
                break;
        }

        this.add.existing(gameObject);

        gameObject
            .setInteractive()
            .on('pointerdown', function () {
                gameObject.visible = !gameObject.visible;
                console.log(gameObject.visible)
            })

        // var layer = this.add.layer()
        // layer.add(gameObject)
        // layer.setVisible(false)
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
    scene: Demo
};

var game = new Phaser.Game(config);
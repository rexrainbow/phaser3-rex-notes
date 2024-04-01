import phaser from 'phaser/src/phaser.js';
import GOManager from '../../plugins/utils/gameobject/gomanager/GOManager.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var goManager = new GOManager(this, {
            fade: 0,
            createGameObject(scene, x, y, r, color) {
                return scene.add.circle(x, y, r, color);
            }
        })
            .add('a', 300, 300, 30, 0x880000)
            .add('b', 330, 330, 30, 0x880000)
            .add('c', 360, 360, 30, 0x880000)
            .call(null, 'setStrokeStyle', 3, 0x00ff00)  // Call all game objects' method
            .setProperty('!b', 'fillColor', 0x000088)   // Set property of all game objects exclude b

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
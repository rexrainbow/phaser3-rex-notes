import 'phaser';
import PathFollowerPlugin from '../../plugins/pathfollower-plugin.js';

const COLOR_PRIMARY = 0x43a047;
const COLOR_LIGHT = 0x76d275;
const COLOR_DARK = 0x00701a;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() { }

    create() {
        // Normal behavior
        var path0 = new Phaser.Curves.Ellipse(250, 300, 40, 250);

        var gameObject0 = this.add.rectangle(0, 0, 30, 30, COLOR_PRIMARY);
        gameObject0.pathFollower = this.plugins.get('rexPathFollower').add(gameObject0, {
            path: path0,
            t: 0,
            rotateToPath: true
        });

        this.tweens.add({
            targets: gameObject0.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 6000,
            repeat: -1,
            yoyo: false
        });

        // Spaced
        var path1 = new Phaser.Curves.Ellipse(550, 300, 40, 250);

        var gameObject1 = this.add.rectangle(0, 0, 30, 30, COLOR_PRIMARY);
        gameObject1.pathFollower = this.plugins.get('rexPathFollower').add(gameObject1, {
            path: path1,
            t: 0,
            rotateToPath: true,
            spacedPoints: {
                stepRate: 10
            }
        });

        this.tweens.add({
            targets: gameObject1.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 6000,
            repeat: -1,
            yoyo: false
        });

        var graphics = this.add.graphics({
            lineStyle: {
                width: 3,
                color: COLOR_DARK,
                alpha: 1
            }
        })
        path0.draw(graphics);
        path1.draw(graphics);

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
    plugins: {
        global: [{
            key: 'rexPathFollower',
            plugin: PathFollowerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
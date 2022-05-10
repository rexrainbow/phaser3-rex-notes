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
    }

    create() {
        var x = this.game.config.width / 2,
            y = this.game.config.height / 2;

        var character = this.add.rexLive2d(x, y, 'Haru')
            .setScale(0.25)
            .setRandomExpression()
            //.startMotion('Idle', undefined, 'idle')
            .on('expression.start', function (name) {
                console.log(`expression.start: ${name}`)
            })
            .on('motion.complete', function (group, no) {
                console.log(`motion.complete: ${group}_${no}`)
            })

        console.log('Expressions:', character.getExpressionNames());
        console.log('Motions:', character.getMotionNames());
        console.log('Motion groups:', character.getMotionGroupNames());
        console.log('Is any motion playing?', character.isAnyMotionPlaying());

        var expressionNameTxt = this.add.text(0, 0, '', { fontSize: 36 });
        expressionNameTxt.text = character.expressionName;

        AddButton(this, 0, 50, 'Random expression', function () {
            character.setRandomExpression();
            expressionNameTxt.text = character.expressionName;
        })

        AddButton(this, 0, 250, 'Random motion', function () {
            character.startMotion('TapBody', undefined, 'force');
            console.log('Is any motion playing?', character.isAnyMotionPlaying());
            console.log('Playing motions', character.getPlayinigMotionNames());
        })

        AddButton(this, 0, 350, 'Stop all motions', function () {
            character.stopAllMotions();
            console.log('Is any motion playing?', character.isAnyMotionPlaying());
        })

        // Lip sync value
        var tween = this.tweens.add({
            targets: character,
            lipSyncValue: 1,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 300,
            repeat: -1,            // -1: infinity
            yoyo: true
        });
    }

    update() {
    }
}

var AddButton = function (scene, x, y, text, onClick) {
    return scene.add.text(x, y, text, {
        fontSize: 36, backgroundColor: 'gray', padding: { left: 20, right: 20, top: 20, bottom: 20 }
    })
        .setInteractive()
        .on('pointerdown', onClick)
        .on('pointerover', function () {
            this.setColor('red')
        })
        .on('pointerout', function () {
            this.setColor('white')
        })
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
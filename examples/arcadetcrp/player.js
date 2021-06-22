import 'phaser';
import TCRPPlugin from '../../plugins/arcadetcrp-plugin.js'

class PlayerSprite extends Phaser.GameObjects.Line {
    constructor(scene, x, y, fillColor) {
        super(scene, x, y, 30, 0, 0, 0, fillColor);
        this.setLineWidth(4, 15);
        scene.add.existing(this);

        // Arcade
        scene.physics.add.existing(this);
        this.body
            .setSize(30, 30);
        this.setResetPosition(x, y);
    }

    setResetPosition(x, y) {
        this.resetX = x;
        this.resetY = y;
        return this;
    }

    reset() {
        this.body.reset(this.resetX, this.resetY);
        return this;
    }

    moveLeft(speed) {
        this.body.setVelocityX(-speed);
        return this;
    }

    moveRight(speed) {
        this.body.setVelocityX(speed);
        return this;
    }

    stop() {
        this.body.setVelocity(0, 0);
        return this;
    }
}

class ObstacleSprite extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor);
        scene.add.existing(this);

        // Arcade
        scene.physics.add.existing(this, true);
        this.body
            .setSize(width, height)
    }

    pushOut(gameObjects) {
        this.scene.physics.add.collider(this, gameObjects, function (obstacle, player) {
            console.log(`Player ${player.name} hit obstacle`);
        });
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var TCRPplugin = this.plugins.get('rexTCRP');
        var recorder = TCRPplugin.addRecorder(this);
        var player = TCRPplugin.addPlayer(this);
        var stepRunner = TCRPplugin.addStepRunner(this);

        // Loop player
        player.on('complete', function () { player.start() });

        var spriteA = (new PlayerSprite(this, 300, 200, 0x00cccc)).setName('A');
        var spriteB = (new PlayerSprite(this, 300, 400, 0xcccc00)).setName('B');
        var blocker = new ObstacleSprite(this, 600, 300, 100, 400, 0x333333);
        blocker.pushOut([spriteA, spriteB]);

        var print = this.add.text(0, 0, 'Press Space to start recording/playing\nLeft/right key to move sprite');

        var spaceKey = this.input.keyboard.addKey('SPACE')
        spaceKey.on('down', function (event) {
            if (!recorder.isRecording) {
                // spriteA
                recorder.start(1);
                print.setText('Recording');
                var command = [
                    'reset'
                ];
                recorder.addCommand(command);
                stepRunner.add(command, spriteA);

                // spriteB
                player.stop();
                spriteB.stop();
            } else {
                // spriteA
                if (recorder.isRecording) {
                    var command = [
                        'stop',  // function name
                    ]
                    recorder.addCommand(command);
                    stepRunner.add(command, spriteA);
                }
                recorder.stop();

                // spriteB
                var commands = recorder.getCommands();
                for (var i = 0, cnt = commands.length; i < cnt; i++) {
                    console.log(commands[i].toString());
                }
                player
                    .load(commands, spriteB)
                    .start();
                print.setText('Playing');
            }
        });

        var leftKey = this.input.keyboard.addKey('LEFT');
        leftKey
            .on('down', function () {
                if (recorder.isRecording) {
                    var command = [
                        'moveLeft',  // function name
                        100, // speed
                    ]
                    recorder.addCommand(command);
                    stepRunner.add(command, spriteA);
                }
            })
            .on('up', function () {
                if (recorder.isRecording) {
                    var command = [
                        'stop',  // function name
                    ]
                    recorder.addCommand(command);
                    stepRunner.add(command, spriteA);
                }
            });

        var rightKey = this.input.keyboard.addKey('RIGHT');
        rightKey
            .on('down', function () {
                if (recorder.isRecording) {
                    var command = [
                        'moveRight',  // function name
                        100, // speed
                    ]
                    recorder.addCommand(command);
                    stepRunner.add(command, spriteA);
                }
            })
            .on('up', function () {
                if (recorder.isRecording) {
                    var command = [
                        'stop',  // function name
                    ]
                    recorder.addCommand(command);
                    stepRunner.add(command, spriteA);
                }
            });

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
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexTCRP',
                plugin: TCRPPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
import 'phaser';
import RunCommandsPlugin from '../../plugins/runcommands-plugin';

const Map = Phaser.Structs.Map;

class ActionKlass {
    scene: Phaser.Scene;
    objs: Phaser.Structs.Map<string, Phaser.GameObjects.Sprite>;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.objs = new Map([]);

        // alias function name
        this['create-sprite'] = this.createSprite;
        this['move-sprite-to'] = this.moveSpriteTo;
    }

    // callbacks
    print(msg: string) {
        console.log(msg);
    }

    createSprite(name: string, x: number, y: number, key: string) {
        if (this.objs.has(name)) {
            return;
        }
        this.objs.set(name, this.scene.add.sprite(x, y, key));
    }

    moveSpriteTo(name: string, x: number, y: number, duration: number) {
        var sprite = this.objs.get(name);
        if (sprite == null) {
            return;
        }
        this.scene.tweens.add({
            targets: sprite,
            x: x,
            y: y,
            duration: duration * 1000
        })
    }
}
class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('arrow', 'assets/images/arrow.png');
    }

    create() {
        var myCmds = new ActionKlass(this);

        var cmds = [
            ['print', 'hello'],
            ['print', 'world'],
            [
                ['create-sprite', 'A', 100, 100, 'arrow'],
                ['move-sprite-to', 'A', 300, 200, 1]
            ]

        ];

        (this.plugins.get('rexRunCommands') as RunCommandsPlugin)
            .run(cmds, myCmds);
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
import ContainerLite from '../../plugins/containerlite.js';

class MyContainer extends ContainerLite {
    constructor(scene, x, y, width, height, children) {
        super(scene, x, y, width, height, children);
        scene.add.existing(this);
    }
}

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
        this.containerLite = (new MyContainer(this, 100, 300))
            .add(
                (new MyContainer(this, 50, 200))
                .add(this.add.image(100, 200, 'mushroom'))
            )
            .add(
                (new MyContainer(this, 150, 300))
                .add(this.add.image(140, 340, 'mushroom').setAngle(45))
            );

        // test x, scale, angle, alpha
        this.tweens.add({
            targets: this.containerLite,
            props: {
                x: {
                    value: '+=300'
                },
                scaleX: {
                    value: '+=1'
                },
                scaleY: {
                    value: '+=1'
                },
                angle: {
                    value: '+=360'
                },
                alpha: {
                    value: '-=1'
                }
            },
            duration: 6000,
            repeat: -1,
            yoyo: true
        });

        // test visible
        var scene = this;
        this.input.on('pointerup', function () {
            //scene.containerLite.visible = !scene.containerLite.visible;
            scene.containerLite.toggleFlipY();
        });

        this.lines = this.add.graphics()
            .setDefaultStyles({
                lineStyle: {
                    width: 2,
                    color: 0x00ffff,
                    alpha: 1
                }
            });
        this.update();

        var allChildren = this.containerLite.getAllChildren();
        console.log(this.containerLite.contains(allChildren[3]));        
    }

    update() {
        this.lines.clear();
        this.lineParentToChildren(this.containerLite);
    }

    lineParentToChildren(parent) {
        var children = parent.getChildren(),
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            this.lines.lineBetween(parent.x, parent.y, child.x, child.y);
            if (child.children) {
                this.lineParentToChildren(child);
            }
        }
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
    scene: Demo
};

var game = new Phaser.Game(config);
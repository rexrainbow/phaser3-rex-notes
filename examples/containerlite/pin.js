import phaser from 'phaser/src/phaser.js';
import ContainerLitePlugin from '../../plugins/containerlite-plugin.js';

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
        this.containerLite = this.add.rexContainerLite(100, 300, 100, 100)
            .add(
                this.add.rexContainerLite(50, 200)
                    .pin(
                        this.add.image(100, 200, 'mushroom'),
                        { syncRotation: false, syncScale: false, syncAlpha: false }
                    )
            )
            .add(
                this.add.rexContainerLite(150, 300)
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

        this.debugGraphics = this.add.graphics();
        this.update();

        var allChildren = this.containerLite.getAllChildren();
        console.log(this.containerLite.contains(allChildren[3]));

        var parentConteiner = this.plugins.get('rexContainerLite').getParent(allChildren[0]);
        console.log(parentConteiner === this.containerLite)
    }

    update() {
        this.debugGraphics.clear();
        this.lineParentToChildren(this.containerLite);
        this.containerLite.drawBounds(this.debugGraphics, 0xff0000);
    }

    lineParentToChildren(parent) {
        var children = parent.getChildren(),
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            this.debugGraphics
                .lineStyle(2, 0x00ffff)
                .lineBetween(parent.x, parent.y, child.x, child.y);
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexContainerLite',
            plugin: ContainerLitePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
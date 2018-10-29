class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xff0000,
                alpha: 1
            },
            fillStyle: {
                color: 0xff0000,
                alpha: 1
            },
        });

        var print = this.add.text(0, 0, '');

        var zone1 = this.add.zone(50, 350, 100, 100)
            .setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                print.text += 'click zone1\n';
            });
        var zone2 = this.add.zone(150, 350, 10, 10)
            .setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                print.text += 'click zone2\n';
            });
        var zone3 = this.add.zone(250, 350, 10, 10)
            .setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                print.text += 'click zone3\n';
            });

        zone2.setSize(100, 100).updateDisplayOrigin();
        zone3.setSize(100, 100);

        graphics.strokeRectShape(zone1.getBounds());
        graphics.strokeRectShape(zone2.getBounds());
        graphics.strokeRectShape(zone3.getBounds());
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);
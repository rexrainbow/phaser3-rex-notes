const DegToRad = Phaser.Math.DegToRad;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var colors = Phaser.Display.Color.HSVColorWheel(1, 1);

        var graphics = this.add.graphics();
        var r = 300;
        colors.forEach(function (item, i) {
            var a = DegToRad(i);
            graphics
                .lineStyle(2, item.color)
                .lineBetween(
                    400,
                    300,
                    400 + (r * Math.cos(a)),
                    300 + (r * Math.sin(a))
                )
        })
    }

    update() {}
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
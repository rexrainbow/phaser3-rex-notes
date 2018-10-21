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

        var rect1 = this.add.rectangle(400, 200, 1, 30, 0x555555);
        var rect2 = this.add.rectangle(400, 300, 2, 30, 0x555555);

        rect1.displayWidth = 60;
        rect2.displayWidth = 60;

        graphics.strokeRectShape(rect1.getBounds());
        graphics.strokeRectShape(rect2.getBounds());
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
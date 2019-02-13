class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.add.image(400, 300, 'classroom');
        this.scale.on('resize', function () {
            var rect = this.scale.canvasBounds;
            console.log(rect.x + ',' +
                rect.y + ' - ' +
                rect.width + 'x' +
                rect.height);
        }, this)
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    backgroundColor: 0x333333
};

var game = new Phaser.Game(config);
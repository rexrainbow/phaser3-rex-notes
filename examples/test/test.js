class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var baseLine = new Phaser.Geom.Line(100, 300, 700, 300);
        var rayIn = new Phaser.Geom.Line(388, 200, 400, 300);
        var reflactAngle = Phaser.Geom.Line.ReflectAngle(rayIn, baseLine);
        console.log(Phaser.Math.RadToDeg(reflactAngle))
        var rayReflect = new Phaser.Geom.Line();
        Phaser.Geom.Line.SetToAngle(rayReflect, 400, 300, reflactAngle, 200);

        this.add.graphics()
            .lineStyle(2, 0x848484)
            .strokeLineShape(baseLine)
            .lineStyle(2, 0xC40000)
            .strokeLineShape(rayIn)
            .lineStyle(2, 0x00C400)
            .strokeLineShape(rayReflect)
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);
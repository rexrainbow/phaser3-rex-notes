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
        var mesh = this.add.mesh(400, 300, 'classroom');
        Phaser.Geom.Mesh.GenerateGridVerts({
            mesh: mesh,
            width: 800 / 600,
            height: 1,
            widthSegments: 6

        })
        mesh.panZ(3);

        this.debug = this.add.graphics();
        mesh.setDebug(this.debug);

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }

            mesh.modelRotation.y += pointer.velocity.x * (1 / 800);
            // mesh.modelRotation.x += pointer.velocity.y * (1 / 600);

        });
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
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
    scene: Demo,
    backgroundColor: 0x33333
};

var game = new Phaser.Game(config);
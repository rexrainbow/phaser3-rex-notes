class MyQuad extends Phaser.GameObjects.Mesh {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        var textureFrame = this.texture.get(frame);
        var frameWidth = textureFrame.cutWidth,
            frameHeight = textureFrame.cutHeight;
        var minEdge = Math.min(frameWidth, frameHeight)
        Phaser.Geom.Mesh.GenerateGridVerts({
            mesh: this,
            width: frameWidth / minEdge,
            height: frameHeight / minEdge,
            widthSegments: Math.ceil(frameWidth / 50),
            heightSegments: Math.ceil(frameHeight / 50)
        })

        var renderer = scene.sys.renderer;
        this.updateProjectionMatrix(renderer.width, renderer.height, 90);
        this.panZ(1);
    }

    get rotateY() {
        return this.modelRotation.y
    }

    set rotateY(radians) {
        this.modelRotation.y = radians;
    }
}

const RAD180 = Phaser.Math.DegToRad(180);
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        var front = new MyQuad(this, 400, 300, 'classroom');
        var back = new MyQuad(this, 400, 300, 'road');
        back.rotateY = front.rotateY - RAD180;
        back.dirtyCache[10] = 1;  // Set dirty to update vertices

        this.debug = this.add.graphics();        
        front.setDebug(this.debug);
        back.setDebug(this.debug);

        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }
            
            front.rotateY += pointer.velocity.x * (1 / 800);
            back.rotateY = front.rotateY - RAD180;
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
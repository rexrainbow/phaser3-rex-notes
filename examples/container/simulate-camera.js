import phaser from 'phaser/src/phaser.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

const ContainerClass = Phaser.GameObjects.Container;
const ContainerAdd = ContainerClass.prototype.add;
class CameraTransformNode extends ContainerClass {
    constructor(scene) {
        super(scene);
        this.type = 'rexCameraTransformNode';

        this.scrollNode = new ContainerClass(scene);
        ContainerAdd.call(this, this.scrollNode);

        this.boot();
    }

    boot() {
        this.scene.scale.on('resize', this.pinToCenter, this);
        this.pinToCenter();
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }
        this.scene.scale.off('resize', this.pinToCenter, this);
        super.destroy(fromScene);
    }

    pinToCenter() {
        var prevX = this.x;
        var prevY = this.y;

        // var viewport = this.scene.scale.getViewPort();
        var viewport = this.scene.cameras.main;
        this.setPosition(viewport.centerX, viewport.centerY);

        this.scrollNode.x -= this.x - prevX;
        this.scrollNode.y -= this.y - prevY;

        return this;
    }

    add(gameObject) {
        this.scrollNode.add(gameObject);
        return this;
    }

    set zoom(value) {
        this.scale = value;
    }

    get zoom() {
        return this.scale;
    }

    set scrollX(value) {
        this.scrollNode.x = - this.x - value;
    }

    get scrollX() {
        return - this.scrollNode.x - this.x;
    }

    set scrollY(value) {
        this.scrollNode.y = - this.y - value;
    }

    get scrollY() {
        return - this.scrollNode.y - this.y;
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var cameraNdoe = new CameraTransformNode(this);
        this.add.existing(cameraNdoe);

        var gui = new Dat.GUI();
        gui.add(cameraNdoe, 'zoom', 0.1, 3);
        gui.add(cameraNdoe, 'scrollX', -200, 200);
        gui.add(cameraNdoe, 'scrollY', -200, 200);
        gui.add(cameraNdoe, 'rotation', -1.57, 1.57);

        var gameObject = this.add.image(400, 300, 'classroom');
        cameraNdoe.add(gameObject);
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
    scene: Demo,
};

var game = new Phaser.Game(config);
class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Main'
        })
    }

    preload() {}

    create() {
        this.scene.launch('Sub');
    }

    update() {
        var pointer = this.input.activePointer;
        if (pointer.justDown) {
            var subScene = this.scene.get('Sub');
            var camera = subScene.cameras.main;
            var worldXY = camera.getWorldPoint(pointer.x, pointer.y);
            subScene.createObj(worldXY.x, worldXY.y);

            console.log('World poisition at Main: ' + pointer.worldX + ',' + pointer.worldY);
            console.log('World poisition at Sub: ' + worldXY.x + ',' + worldXY.y);
        }
    }
}

class SubScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Sub'
        })
    }

    preload() {}

    create() {
        this.cameras.main.setScroll(2000, 2000).setZoom(0.75).setAngle(45);
    }

    update() {}

    createObj(x, y) {
        this.add.rectangle(x, y, 50, 50, 0xffffff);
    }
}

var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [MainScene, SubScene]
};

var game = new Phaser.Game(config);
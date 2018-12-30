class UIScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'UI'
        })
    }

    preload() {
        this.load.image('avatar', 'https://secure.gravatar.com/avatar/0f59b911b7cfc4157500b447da3c3f04?d=http://www.html5gamedevs.com/uploads/monthly_2018_02/R_member_30465.png');
    }

    create() {
        this.scene.launch('Game');
        // this.add.text(0, 0, 'UI scene: Hover image to place object at game-scene.');
        // this.add.text(0, 20, 'Goal is to drag new image and have it follow the cursor to put it in yellow rectangle');
        // this.add.text(0, 40, 'Put before or after you dragged it, you first have to move the camera ~= 150px to the right (arrows)');

        this.image = this.add.image(400, 60, 'avatar').setInteractive().setDepth(1000).setOrigin(0);
        this.image.on('pointerover', () => {
            var pointer = this.input.activePointer;
            var subScene = this.scene.get('Game');
            var camera = subScene.cameras.main;
            var worldXY = camera.getWorldPoint(pointer.x, pointer.y);
            subScene.createObj(worldXY.x, worldXY.y);
        });
    }

    update() {}
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        })
    }

    preload() {
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexdragplugin.min.js';
        this.load.plugin('rexdragplugin', url, true);
        this.load.image('avatar', 'https://secure.gravatar.com/avatar/0f59b911b7cfc4157500b447da3c3f04?d=http://www.html5gamedevs.com/uploads/monthly_2018_02/R_member_30465.png');
    }

    create() {
        this.deployer = null;
        this.camera = this.cameras.main;
        //this.camera.setZoom(0.5).setScroll(-200, -200);
        this.add.text(0, 25, 'Game scene');

        var zone = this.add.zone(0, 25, 40, 40).setRectangleDropZone(40, 40);
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = pointer.worldX;
            gameObject.y = worldXY.worldY;
        });
    }

    createObj(x, y) {
        if (this.deployer !== null) {
            this.deployer.destroy();
            this.deployer = null;
        }
        this.deployer = this.add.image(x, y, 'avatar').setInteractive().setDepth(1000).setOrigin(0).setScrollFactor(0);
        this.drag = this.plugins.get('rexdragplugin').add(this.deployer);
    }
}

var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [UIScene, GameScene]
};

var game = new Phaser.Game(config);
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var rect = this.add.rectangle(300, 300, 64, 64, 0x888888).setOrigin(0);
      
        var rt = this.add.renderTexture(400, 300, 300, 300)
        rt.setSize(rect.width, rect.height);
        rt.draw(rect, 0, 0);
    }

    update() {}
}

var config = {
    type: Phaser.WEBGL, // Works fine in *Phaser.CANVAS* mode
    width: 800,
    height: 600,
    scene: Demo,
};

var game = new Phaser.Game(config);
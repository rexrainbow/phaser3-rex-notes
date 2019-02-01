class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var d = {
            a: Math.floor(Math.random() * 100),
            b: Math.floor(Math.random() * 100)
        };
        console.log(d);
        localStorage.setItem('key', JSON.stringify(d));
        var value = JSON.parse(localStorage.getItem('key'));
        console.log(value);
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
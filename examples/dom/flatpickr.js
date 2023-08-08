import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { 
        this.load.css('flatpickr-css', 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css');
        this.load.script('flatpickr', 'https://cdn.jsdelivr.net/npm/flatpickr');
    }

    create() {
        var domGO = this.add.dom(400, 300).createElement('div', {
            width: '200px',
            height: '60px',
            backgroundColor: '#555555'
        });

        flatpickr(domGO.node, {});
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
    dom: {
        createContainer: true
    },
    scene: Demo,
};

var game = new Phaser.Game(config);
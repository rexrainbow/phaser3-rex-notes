'use strict'

class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Main'
        })
        console.log('MainScene: constructor');
    }

    init() {
        console.log('MainScene: init');
        this.events.on('shutdown', function () {
            console.log('MainScene event: shutdown');
        });       
        this.events.on('destroy', function () {
            console.log('MainScene event: destroy');
        });
        this.scene.get('Sub').events.on('start', function(){
            console.log('SubScene event: start');
        })
    }
    preload() {
        console.log('MainScene: preload');
    }

    create() {
        console.log('MainScene: create');        
        // this.scene.launch('Sub');
        this.scene.start('Sub');
    }

    update() {
        console.log('MainScene: update');
        this.scene.stop();
    }
}

class SubScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Sub'
        })
        console.log('SubScene: constructor');
    }

    init() {
        console.log('SubScene: init');
    }
    preload() {
        console.log('SubScene: preload');
    }

    create() {
        console.log('SubScene: create');
    }

    update() {
        console.log('SubScene: update');
        this.scene.stop();
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [MainScene, SubScene]
};

var game = new Phaser.Game(config);
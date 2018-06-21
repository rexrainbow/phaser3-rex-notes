'use strict'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg', 'assets/images/white-dot.png');
    }

    create() {
        var isInTouched = false;
        this.input.addPointer(3);
        var bg = this.add.image(400, 300, 'bg')
            .setDisplaySize(150, 150)
            .setTint(0xcccccc)
            .setInteractive()
            .on('pointerover', function (pointer, localX, localY) {
                if (pointer.isDown) {
                    isInTouched = true;
                    console.log(isInTouched);
                }
            })
            .on('pointerout', function (pointer) {
                if (pointer.isDown) {
                    isInTouched = false;
                    console.log(isInTouched);
                }
            })
            .on('pointerdown', function (pointer, localX, localY, camera) {
                isInTouched = true;
                console.log(isInTouched);
            })
            .on('pointerup', function (pointer, localX, localY) {
                isInTouched = false;
                console.log(isInTouched);
            })            
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);
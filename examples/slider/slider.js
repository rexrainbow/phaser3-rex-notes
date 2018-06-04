'use strict'

import Slider from './../../plugins/slider.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

        this.img;
        this.text;
    }

    preload() {
        this.load.image('dot', 'assets/images/white-dot.png');
    }

    create() {
        this.img = this.add.image(400, 300, 'dot').setScale(10, 10);
        this.img.slider = new Slider(this.img, {
            endPoints: [{
                    x: this.img.x - 200,
                    y: this.img.y
                },
                {
                    x: this.img.x + 200,
                    y: this.img.y
                },
            ]
        });

        this.add.graphics()
            .lineStyle(3, 0x55ff55, 1)
            .strokePoints(this.img.slider.endPoints);
        this.text = this.add.text(100, 100, '', {
            fontSize: '20px'
        });
        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
        var isLeftDown = this.cursorKeys.left.isDown;
        var isRightDown = this.cursorKeys.right.isDown;
        if (isLeftDown) {
            this.img.slider.value -= 0.01;
        } else if (isRightDown) {
            this.img.slider.value += 0.01;
        }
        this.text.setText(this.img.slider.value);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);
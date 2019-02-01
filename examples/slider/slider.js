import SliderPlugin from '../../plugins/slider-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('dot', 'assets/images/white-dot.png');
    }

    create() {
        this.img = this.add.image(400, 300, 'dot').setScale(10, 10);
        this.img.slider = this.plugins.get('rexSlider').add(this.img, {
            endPoints: [{
                    x: this.img.x - 200,
                    y: this.img.y - 200
                },
                {
                    x: this.img.x + 200,
                    y: this.img.y + 200
                }
            ],
            value: 0.25
        });

        this.add.graphics()
            .lineStyle(3, 0x55ff55, 1)
            .strokePoints(this.img.slider.endPoints);

        this.text = this.add.text(0, 0, '', {
            fontSize: '20px'
        });
        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursorKeys.left.isDown) {
            this.img.slider.value -= 0.01;
        } else if (this.cursorKeys.right.isDown) {
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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexSlider',
            plugin: SliderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
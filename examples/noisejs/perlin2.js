import Noise from '../../plugins/utils/math/noise/Perlin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() { }

    create() {
        this.points = [];
        this.noise = new Noise(Math.random());
        this.canvas = this.add.renderTexture(0, 0, this.game.config.width, this.game.config.height);
        this.dot = this.add.rectangle(0, 0, 2, 2);
        this.colors = Phaser.Display.Color.HSVColorWheel(0.95, 0.8);

        var width = this.canvas.width,
            height = this.canvas.height;
        for (var i = 0; i < 500; i++) {
            var p1 = {
                x: (Math.random() * width),
                y: (height / 2) + (Math.random() * 50),
                a: 0
            };
            this.points.push(p1);
            this.points.push({
                x: p1.x,
                y: p1.y,
                a: Math.PI
            });
        }

        this.fps = this.add.text(0, 580, '');
    }

    update(time, delta) {
        var points = this.points, p;
        var v, a, color, period = delta / 10000;
        var noise = this.noise,
            dot = this.dot,
            canvas = this.canvas,
            colors = this.colors;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            p = points[i];
            v = noise.perlin2(p.x * period, p.y * period);
            a = (v * 2 * Math.PI) + p.a;
            p.x += Math.cos(a);
            p.y += Math.sin(a);
            color = colors[Math.floor(Math.abs(v) * 360)].color;

            dot
                .setPosition(p.x, p.y)
                .setFillStyle(color, 0.3)
            canvas.draw(dot);
        }

        this.fps.text = delta;
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
};

var game = new Phaser.Game(config);
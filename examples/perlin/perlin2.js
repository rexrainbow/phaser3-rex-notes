import PerlinPlugin from '../../plugins/perlin-plugin.js';
import CanvasPlugin from '../../plugins/canvas-plugin.js'

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
        this.noise = this.plugins.get('rexPerlin').add(Math.random());
        this.canvas = this.add.rexCanvas(0, 0, this.cameras.main.width, this.cameras.main.height).setOrigin(0);

        var width = this.canvas.width,
            height = this.canvas.height;
        for (var i = 0; i < 2000; i++) {
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
        var v, a, period = delta / 5000;
        var noise = this.noise,
            canvas = this.canvas,
            ctx = canvas.getCanvas().getContext('2d');
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            p = points[i];
            v = noise.perlin2(p.x * period, p.y * period);
            a = (v * 2 * Math.PI) + p.a;
            p.x += Math.cos(a);
            p.y += Math.sin(a);

            ctx.fillStyle = `hsla(${Math.floor(v * 360)}, 60%, 50%, 0.1)`;
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 1, 1);
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
    plugins: {
        global: [
            {
                key: 'rexPerlin',
                plugin: PerlinPlugin,
                start: true
            },
            {
                key: 'rexCanvas',
                plugin: CanvasPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
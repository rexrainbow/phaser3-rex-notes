import phaser from 'phaser/src/phaser.js';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var spinner = AddExplodeBlobSpinner(this, 400, 300, 260, 260, {
            count: 64,
            base: 0.2,
            amp: 0.7,
            jitter: 0.8,
            duration: 1100,
            stroke: true,
            strokeWidth: 1.5,
            start: true
        });
        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(spinner.getBounds())

    }

    update() { }
}

function AddExplodeBlobSpinner(scene, x, y, width, height, options = {}) {
    const {
        count = 64,
        base = 0.55,
        amp = 0.35,
        jitter = 0.25,
        duration = 1000,
        stroke = true,
        strokeWidth = 1,
        start = true
    } = options;

    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

    return scene.rexSpinner.add.custom({
        x, y, width, height, duration, start,

        create: { lines: ['rim'] },

        update: function () {
            const cx = this.centerX, cy = this.centerY, R = this.radius;
            const t = this.value; // 0..1
            const step = 360 / count;
            const rBase = R * base;
            const rAmp = R * amp;

            const path = this.getShape('rim');

            let prevT = path.getData('_prevT', 1);
            let targets = path.getData('targets', null);

            if (t < prevT || !targets) {
                if (!targets) {
                    targets = new Array(count);
                    path.setData('targets', targets);
                }
                for (let i = 0; i < count; i++) {
                    targets[i] = clamp01(1 - jitter + rand(0, jitter * 2));
                }
            }
            path.setData('_prevT', t);

            let k;
            if (t < 0.5) {
                const u = t * 2;
                k = 1 - Math.pow(1 - u, 3);
            } else {
                const u = (t - 0.5) * 2;
                k = 1 - u * u * u;
            }

            let firstX = 0, firstY = 0;
            for (let i = 0; i < count; i++) {
                const deg = i * step;
                const rad = deg * (Math.PI / 180);
                const rNow = rBase + rAmp * k * targets[i];
                const x = cx + rNow * Math.cos(rad);
                const y = cy + rNow * Math.sin(rad);

                if (i === 0) {
                    path.startAt(x, y);
                    firstX = x; firstY = y;
                } else {
                    path.lineTo(x, y);
                }
            }
            path.lineTo(firstX, firstY).close();

            path.fillStyle(this.color, 1);
            if (stroke) {
                path.lineStyle(strokeWidth, this.color, 1);
            } else {
                path.lineStyle();
            }
        }
    });
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
        scene: [{
            key: 'rexSpinner',
            plugin: SpinnerPlugin,
            mapping: 'rexSpinner'
        }]
    }
};

var game = new Phaser.Game(config);
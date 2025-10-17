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
        var spinner = AddDualBlobSpinner(this, 400, 300, 280, 280, {
            count: 64,
            base: 0.2,
            amp: 0.7,
            jitter: 0.8,
            innerMin: 0.60,
            innerMax: 0.85,

            duration: 1100,
            strokeWidth: 0,

            color: 0x4dabf7,
            innerColor: 0xffe066,

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

function AddDualBlobSpinner(scene, x, y, width, height, options = {}) {
    const {
        count = 64,
        base = 0.55,
        amp = 0.35,
        jitter = 0.25,
        innerMin = 0.55,
        innerMax = 0.85,
        duration = 1000,
        strokeWidth = 0,
        innerColor = 0xffffff,
        color = 0x33aaff,
        start = true
    } = options;

    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

    return scene.rexSpinner.add.custom({
        x, y, width, height, duration, start,
        color,

        create: { lines: ['outer', 'inner'] },

        update: function () {
            const cx = this.centerX, cy = this.centerY, R = this.radius;
            const t = this.value;
            const step = 360 / count;
            const rBase = R * base;
            const rAmp = R * amp;

            const outer = this.getShape('outer');
            const inner = this.getShape('inner');

            let prevT = outer.getData('_prevT', 1);
            let targets = outer.getData('targets', null);
            let scales = outer.getData('scales', null);

            if (t < prevT || !targets || !scales) {
                if (!targets) { targets = new Array(count); outer.setData('targets', targets); }
                if (!scales) { scales = new Array(count); outer.setData('scales', scales); }
                for (let i = 0; i < count; i++) {
                    targets[i] = clamp01(1 - jitter + rand(0, jitter * 2));
                    scales[i] = rand(innerMin, innerMax);
                }
            }
            outer.setData('_prevT', t);

            let k;
            if (t < 0.5) { const u = t * 2; k = 1 - Math.pow(1 - u, 3); }
            else { const u = (t - 0.5) * 2; k = 1 - u * u * u; }

            let fx = 0, fy = 0, gfx = 0, gfy = 0;

            for (let i = 0; i < count; i++) {
                const deg = i * (360 / count);
                const rad = deg * (Math.PI / 180);

                const rOuter = rBase + rAmp * k * targets[i];
                const rInner = rOuter * scales[i];

                const xo = cx + rOuter * Math.cos(rad);
                const yo = cy + rOuter * Math.sin(rad);
                const xi = cx + rInner * Math.cos(rad);
                const yi = cy + rInner * Math.sin(rad);

                if (i === 0) {
                    outer.startAt(xo, yo); inner.startAt(xi, yi);
                    fx = xo; fy = yo; gfx = xi; gfy = yi;
                } else {
                    outer.lineTo(xo, yo); inner.lineTo(xi, yi);
                }
            }

            outer.lineTo(fx, fy).close();
            inner.lineTo(gfx, gfy).close();

            outer.fillStyle(this.color, 1);
            inner.fillStyle(innerColor, 1);

            if (strokeWidth > 0) {
                outer.lineStyle(strokeWidth, this.color, 1);
                inner.lineStyle(strokeWidth, innerColor, 1);
            } else {
                outer.lineStyle(); inner.lineStyle();
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
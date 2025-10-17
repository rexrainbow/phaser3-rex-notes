import phaser from '../../../phaser/src/phaser.js';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var spinner = AddHourglassSpinner(this, 400, 300, 100, 100, {
            color: 0xffd740,
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

function AddHourglassSpinner(scene, x, y, width, height, options = {}) {
    const {
        duration = 1500,
        fillPortion = 0.65,
        base = 0.9,
        h = 0.9,
        slices = 8,
        power = 2.0,
        gain = 1.0,
        flipDeg = 180,
        showOutline = true,
        outlineColor = 0xffffff,
        strokeWidth = 2,
        color = 0xffd740,
        start = true,
    } = options;

    const fillPhase = Phaser.Math.Clamp(fillPortion, 0.3, 0.9);
    const DEG2RAD = Math.PI / 180;
    const easeInOutSine = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);

    return scene.rexSpinner.add.custom({
        x, y, width, height, duration, start, color,

        create: function () {
            this.addShape(this.createShape('lines', 'topFill'));
            this.addShape(this.createShape('lines', 'botFill'));
            if (showOutline) {
                this.addShape(this.createShape('lines', 'topOutline'));
                this.addShape(this.createShape('lines', 'botOutline'));
            }
            for (const s of this.getShapes()) {
                s.setData({ base, h, slices, power, gain });
            }
        },

        update: function () {
            const cx = this.centerX, cy = this.centerY, R = this.radius, t = this.value;
            const any = this.getShapes()[0];
            const wantB = R * any.getData('base');
            const wantH = R * any.getData('h');
            const S = any.getData('slices');
            const P = any.getData('power');
            const G = any.getData('gain');

            const halfW = this.width * 0.5;
            const halfH = this.height * 0.5;
            const pad = Math.max(1, strokeWidth * 0.5 + 0.5);
            const B = Math.min(wantB, Math.max(0, 2 * (halfW - pad)));
            const H = Math.min(wantH, Math.max(0, (halfH - pad)));

            const yTop = cy - H;
            const yBot = cy + H;
            const edgeTop = (x) => cy - (2 * H / B) * Math.abs(x - cx);
            const edgeBot = (x) => cy + (2 * H / B) * Math.abs(x - cx);

            const inFill = t < fillPhase;
            const fillT = inFill ? (t / fillPhase) : 1.0;
            const rotT = inFill ? 0.0 : (t - fillPhase) / (1 - fillPhase);
            const rotDeg = easeInOutSine(rotT) * flipDeg;

            const xL = cx - B / 2, xR = cx + B / 2;
            const shapeU = (u) => Phaser.Math.Clamp(1 - G * Math.pow(Math.abs(2 * u - 1), P), 0, 1);
            const col = this.color ?? 0xffffff;

            {
                const p = this.getShape('topFill');
                p.fillStyle(col, 1).lineStyle(0).startAt(xL, Math.min(yTop + H * fillT * shapeU(0), edgeTop(xL)));
                for (let i = 1; i <= S; i++) {
                    const u = i / S, x = xL + (xR - xL) * u;
                    let y = yTop + H * fillT * shapeU(u);
                    y = Math.min(y, edgeTop(x));
                    p.lineTo(x, y);
                }
                for (let i = S; i >= 0; i--) {
                    const u = i / S, x = xL + (xR - xL) * u;
                    p.lineTo(x, edgeTop(x));
                }
                p.close().rotateAround(cx, cy, rotDeg);
            }

            {
                const p = this.getShape('botFill');
                p.fillStyle(col, 1).lineStyle(0).startAt(xL, yBot).lineTo(xR, yBot);
                for (let i = S; i >= 0; i--) {
                    const u = i / S, x = xL + (xR - xL) * u;
                    const desired = yBot - H * fillT * shapeU(u);
                    const ymax = edgeBot(x);
                    const yTopMound = Math.max(desired, ymax);
                    p.lineTo(x, yTopMound);
                }
                p.close().rotateAround(cx, cy, rotDeg);
            }

            if (showOutline) {
                const top = this.getShape('topOutline');
                top.fillStyle(0, 0).lineStyle(strokeWidth, outlineColor, 1)
                    .startAt(xL, yTop).lineTo(xR, yTop).lineTo(cx, cy).close()
                    .rotateAround(cx, cy, rotDeg);

                const bot = this.getShape('botOutline');
                bot.fillStyle(0, 0).lineStyle(strokeWidth, outlineColor, 1)
                    .startAt(cx, cy).lineTo(xR, yBot).lineTo(xL, yBot).close()
                    .rotateAround(cx, cy, rotDeg);
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
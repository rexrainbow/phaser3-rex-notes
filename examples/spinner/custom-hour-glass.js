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
        slices = 18,
        power = 2.0,
        gain = 1.0,
        flipDeg = 180,
        showOutline = true,
        outlineColor = 0xffffff,
        strokeWidth = 2,
        color = 0xffffff,
        start = true,
    } = options;

    const fillPhase = Phaser.Math.Clamp(fillPortion, 0.3, 0.9);
    const DEG2RAD = Math.PI / 180;
    const easeInOutSine = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);
    const rotPt = (px, py, cx, cy, deg) => {
        const r = deg * DEG2RAD, c = Math.cos(r), s = Math.sin(r);
        const dx = px - cx, dy = py - cy;
        return [cx + dx * c - dy * s, cy + dx * s + dy * c];
    };

    return scene.rexSpinner.add.custom({
        x, y, width, height, duration, start, color,

        create: function () {
            for (let i = 0; i < slices; i++) {
                this.addShape(this.createShape('triangle', `top${i}_A`));
                this.addShape(this.createShape('triangle', `top${i}_B`));
            }
            for (let i = 0; i < slices; i++) {
                this.addShape(this.createShape('triangle', `bot${i}_A`));
                this.addShape(this.createShape('triangle', `bot${i}_B`));
            }
            if (showOutline) {
                this.addShape(this.createShape('triangle', 'topOutline'));
                this.addShape(this.createShape('triangle', 'botOutline'));
            }
            for (const s of this.getShapes()) {
                s.setData('base', base).setData('h', h).setData('slices', slices);
                s.setData('power', power).setData('gain', gain);
            }
        },

        update: function () {
            const cx = this.centerX, cy = this.centerY, R = this.radius, t = this.value;

            const halfW = this.width * 0.5;
            const halfH = this.height * 0.5;
            const pad = Math.max(1, strokeWidth * 0.5 + 0.5);

            const wantB = R * this.getShapes()[0].getData('base');
            const wantH = R * this.getShapes()[0].getData('h');
            const Bmax = Math.max(0, 2 * (halfW - pad));
            const Hmax = Math.max(0, (halfH - pad));

            const B = Math.min(wantB, Bmax);
            const H = Math.min(wantH, Hmax);

            const yTop = cy - H;
            const yBot = cy + H;
            const edgeTop = (x) => cy - (2 * H / B) * Math.abs(x - cx);
            const edgeBot = (x) => cy + (2 * H / B) * Math.abs(x - cx);

            const inFill = t < fillPhase;
            const fillT = inFill ? (t / fillPhase) : 1.0;
            const rotT = inFill ? 0.0 : (t - fillPhase) / (1 - fillPhase);
            const rotDeg = easeInOutSine(rotT) * flipDeg;

            const rot = (p) => (rotDeg === 0 ? p : rotPt(p[0], p[1], cx, cy, rotDeg));
            const setTri = (shape, p0, p1, p2, col, a = 1) =>
                shape.fillStyle(col, a).lineStyle(0)
                    .setP0(p0[0], p0[1]).setP1(p1[0], p1[1]).setP2(p2[0], p2[1]);

            const fillColor = this.color ?? 0xffffff;

            const P = this.getShapes()[0].getData('power');
            const G = this.getShapes()[0].getData('gain');
            const S = this.getShapes()[0].getData('slices');
            const shapeU = (u) => Phaser.Math.Clamp(1 - G * Math.pow(Math.abs(2 * u - 1), P), 0, 1);

            for (let i = 0; i < S; i++) {
                const u0 = i / S, u1 = (i + 1) / S;
                const x0 = cx - B / 2 + B * u0;
                const x1 = cx - B / 2 + B * u1;

                const d0 = H * fillT * shapeU(u0);
                const d1 = H * fillT * shapeU(u1);

                const yCut0 = Math.min(yTop + d0, edgeTop(x0));
                const yCut1 = Math.min(yTop + d1, edgeTop(x1));

                const A = rot([x0, yCut0]);
                const Bp = rot([x1, yCut1]);
                const C = rot([x1, edgeTop(x1)]);
                const D = rot([x0, edgeTop(x0)]);
                setTri(this.getShape(`top${i}_A`), A, Bp, C, fillColor, 1);
                setTri(this.getShape(`top${i}_B`), A, C, D, fillColor, 1);
            }

            for (let i = 0; i < S; i++) {
                const u0 = i / S, u1 = (i + 1) / S;
                const x0 = cx - B / 2 + B * u0;
                const x1 = cx - B / 2 + B * u1;

                const h0_des = H * fillT * shapeU(u0);
                const h1_des = H * fillT * shapeU(u1);
                const h0_max = H - (edgeBot(x0) - cy);
                const h1_max = H - (edgeBot(x1) - cy);
                const h0 = Math.min(h0_des, h0_max);
                const h1 = Math.min(h1_des, h1_max);

                const y0 = yBot - h0;
                const y1 = yBot - h1;

                const A = rot([x0, yBot]);
                const Bp = rot([x1, yBot]);
                const C = rot([x1, y1]);
                const D = rot([x0, y0]);
                setTri(this.getShape(`bot${i}_A`), A, Bp, C, fillColor, 1);
                setTri(this.getShape(`bot${i}_B`), A, C, D, fillColor, 1);
            }

            if (showOutline) {
                const topOutline = this.getShape('topOutline');
                const botOutline = this.getShape('botOutline');

                const tA = rot([cx - B / 2, yTop]);
                const tB = rot([cx + B / 2, yTop]);
                const tV = rot([cx, cy]);

                const bV = rot([cx, cy]);
                const bB = rot([cx + B / 2, yBot]);
                const bA = rot([cx - B / 2, yBot]);

                topOutline.fillStyle(0, 0).lineStyle(strokeWidth, outlineColor, 1)
                    .setP0(tA[0], tA[1]).setP1(tB[0], tB[1]).setP2(tV[0], tV[1]);
                botOutline.fillStyle(0, 0).lineStyle(strokeWidth, outlineColor, 1)
                    .setP0(bV[0], bV[1]).setP1(bB[0], bB[1]).setP2(bA[0], bA[1]);
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
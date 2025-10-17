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
        var spinner = AddSnakeRandomTickedSpinner(this, 400, 300, 200, 200, {
            gap: 0.08,
            length: 4,
            duration: 1000,
            stepsPerCycle: 10
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

function AddSnakeRandomTickedSpinner(scene, x, y, width, height, options = {}) {
    const {
        gap = 0.08,
        length = 4,
        duration = 1000,
        stepsPerCycle = 10,
        start = true
    } = options;

    return scene.rexSpinner.add.custom({
        x, y, width, height, duration, start,

        create: function () {
            const cols = 5, rows = 5;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = r * cols + c;
                    const rect = this.createShape('rectangle', `cell${idx}`);
                    this.addShape(rect);
                }
            }

            const L = Math.max(1, Math.floor(length));
            const body = [];
            const occ = new Uint8Array(rows * cols);

            let hr = 2, hc = 2
            body.push(hr * cols + hc); occ[body[0]] = 1;

            const tryDirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            outer:
            for (let d = 0; d < tryDirs.length; d++) {
                const dr = tryDirs[d][0], dc = tryDirs[d][1];
                let r = hr, c = hc; const tmp = [body[0]];
                let ok = true;
                for (let k = 1; k < L; k++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) { ok = false; break; }
                    tmp.push(nr * cols + nc); r = nr; c = nc;
                }
                if (ok) {
                    for (let i = 1; i < tmp.length; i++) { body.push(tmp[i]); occ[tmp[i]] = 1; }
                    hr = Math.floor(body[0] / cols); hc = body[0] % cols;
                    break outer;
                }
            }

            const holder = this.getShape('cell0');
            holder.setData({
                rows, cols,
                L,
                body,
                occ,
                headR: hr, headC: hc,
                prevTick: -1,
                stepsPerCycle: Math.max(1, Math.floor(stepsPerCycle)),
                dir: [-1, 0, 0, 1, 1, 0, 0, -1]
            });
        },

        update: function () {
            const shapes = this.getShapes();
            const holder = shapes[0];

            const rows = holder.getData('rows'), cols = holder.getData('cols');
            const L = holder.getData('L');
            const body = holder.getData('body');
            const occ = holder.getData('occ');
            let hr = holder.getData('headR'), hc = holder.getData('headC');

            const R = this.radius, cx = this.centerX, cy = this.centerY;
            const squareSize = R * 2;
            const gapPx = R * holder.getData('gapPx') ?? (R * 0);
            const actualGapPx = R * (typeof this.getData === 'function' ? 0 : 0);
            const gapVal = (typeof gap === 'number') ? gap : 0.08;
            const cellGap = R * gapVal;

            const cellSize = (squareSize - cellGap * (cols - 1)) / cols;
            const left = cx - R, top = cy - R;

            for (let idx = 0; idx < rows * cols; idx++) {
                const r = Math.floor(idx / cols);
                const c = idx % cols;
                const s = this.getShape(`cell${idx}`);
                const xx = left + c * (cellSize + cellGap);
                const yy = top + r * (cellSize + cellGap);
                s.setSize(cellSize, cellSize).setTopLeftPosition(xx, yy);
                s.lineStyle();
                s.fillStyle();
            }

            const spc = holder.getData('stepsPerCycle');
            const tick = Math.floor(this.value * spc);
            let prevTick = holder.getData('prevTick', -1);
            let steps = tick - prevTick;
            if (prevTick === -1) steps = 1;
            else if (steps < 0) steps += spc;

            const dir = holder.getData('dir');

            while (steps-- > 0) {
                const tailIdx = body[body.length - 1];

                const startK = Math.floor(Math.random() * 4);
                let moved = false, tr = hr, tc = hc;

                for (let tTry = 0; tTry < 4; tTry++) {
                    const d = (startK + tTry) % 4;
                    const dr = dir[d * 2], dc = dir[d * 2 + 1];
                    const nr = hr + dr, nc = hc + dc;
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
                    const nextIdx = nr * cols + nc;
                    if (occ[nextIdx] && nextIdx !== tailIdx) continue;
                    tr = nr; tc = nc; moved = true; break;
                }

                if (moved) {
                    const newHead = tr * cols + tc;
                    body.unshift(newHead);
                    occ[newHead] = 1;
                    while (body.length > L) {
                        const tail = body.pop();
                        occ[tail] = 0;
                    }
                    hr = tr; hc = tc;
                }
            }

            holder.setData('headR', hr);
            holder.setData('headC', hc);
            holder.setData('prevTick', tick);

            const headAlpha = 1.0, tailAlpha = 0.25;
            const stepA = (L > 1) ? (headAlpha - tailAlpha) / (L - 1) : 0;

            for (let seg = 0; seg < body.length; seg++) {
                const idx = body[seg];
                const s = this.getShape(`cell${idx}`);
                const alpha = Math.max(tailAlpha, headAlpha - seg * stepA);
                s.fillStyle(this.color, alpha);
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
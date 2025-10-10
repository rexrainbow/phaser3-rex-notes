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
            const R = this.radius, cx = this.centerX, cy = this.centerY;

            const squareSize = R * 2;
            const gapPx = R * gap;
            const cellSize = (squareSize - gapPx * (cols - 1)) / cols;
            const left = cx - R, top = cy - R;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = r * cols + c;
                    const rect = this.createShape('rectangle', `cell${idx}`);
                    const xx = left + c * (cellSize + gapPx);
                    const yy = top + r * (cellSize + gapPx);
                    rect.setSize(cellSize, cellSize).setTopLeftPosition(xx, yy);
                    rect.lineStyle();
                    rect.fillStyle();
                    this.addShape(rect);
                }
            }

            const L = Math.max(1, Math.floor(length));
            const body = [];
            const occ = new Uint8Array(25);

            let hr = 2, hc = 2;
            body.push(hr * 5 + hc); occ[body[0]] = 1;

            const tryDirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            outer:
            for (let d = 0; d < tryDirs.length; d++) {
                const dr = tryDirs[d][0], dc = tryDirs[d][1];
                let r = hr, c = hc; const tmp = [body[0]];
                let ok = true;
                for (let k = 1; k < L; k++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) { ok = false; break; }
                    tmp.push(nr * 5 + nc); r = nr; c = nc;
                }
                if (ok) {
                    for (let i = 1; i < tmp.length; i++) { body.push(tmp[i]); occ[tmp[i]] = 1; }
                    hr = Math.floor(body[0] / 5); hc = body[0] % 5;
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
                    const nextIdx = nr * 5 + nc;
                    if (occ[nextIdx] && nextIdx !== tailIdx) continue;
                    tr = nr; tc = nc; moved = true; break;
                }

                if (moved) {
                    const newHead = tr * 5 + tc;
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

            for (let i = 0; i < shapes.length; i++) shapes[i].fillStyle();

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
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
        var spinner = AddBounceBallSpinner(this, 400, 300, 220, 220, {
            duration: 1000,
            border: 0.06,
            pad: 0.10,
            ball: 0.1,
            speed: 2,
            angleDeg: 33
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

/**
 * AddBounceBallSpinner
 * A single ball bounces inside a box, continuously, without restarting at loop boundaries.
 *
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {object} [options]
 * @param {number} [options.duration=1000]  // ms per spinner loop (drives this.value)
 * @param {boolean}[options.start=true]
 * @param {number} [options.border=0.06]    // stroke width as fraction of this.radius
 * @param {number} [options.pad=0.10]       // inner padding fraction of this.radius
 * @param {number} [options.ball=0.14]      // ball radius as fraction of this.radius
 * @param {number} [options.speed=1.1]      // ball speed in radii per second
 * @param {number} [options.angleDeg=37]    // initial heading in degrees (0=+X, 90=+Y)
 */
function AddBounceBallSpinner(scene, x, y, width, height, options = {}) {
    const {
        duration = 1000,
        start = true,
        border = 0.06,
        pad = 0.10,
        ball = 0.14,
        speed = 1.1,
        angleDeg = 37
    } = options;

    return scene.rexSpinner.add.custom({
        x, y, width, height, duration, start,

        // Create only: allocate and name shapes; cache constants/state via setData
        create: function () {
            // Box outline
            this.addShape(this.createShape('rectangle', 'box'));
            // Ball
            this.addShape(this.createShape('circle', 'ball'));

            // Cache spinner duration (ms) for time integration
            this.setData('durMs', duration);

            // Spinner-time accumulator and last t for wrap detection
            this.setData('accLoops', 0);  // completed loops count
            this.setData('prevT', 0);     // previous this.value

            // Continuous time cursor in "loops" (u = loops + current t)
            this.setData('u', 0);

            // Kinematics: position (px) and velocity (px/s)
            this.setData('px', 0); // will be set on first update after geometry known
            this.setData('py', 0);

            // Velocity from speed (in radii/s) and initial angle
            this.setData('spdR', speed);
            this.setData('ang', angleDeg);

            // Flag to place ball on first frame after box geometry is known
            this.setData('initialized', false);
        },

        // Update only: compute geometry/styles; integrate motion; handle bounces
        update: function () {
            const cx = this.centerX, cy = this.centerY, R = this.radius;
            const t = this.value; // 0..1
            const shapes = this.getShapes();
            const box = this.getShape('box');
            const ballShape = this.getShape('ball');

            // Derive geometry
            const padR = R * pad;
            const boxHalf = R - padR;                 // half-size of inner square
            const strokeW = Math.max(1, R * border);  // border width in px
            const ballR = R * ball;                   // ball radius in px

            // Draw the box (stroke only)
            box.setCenterPosition(cx, cy)
                .setSize(boxHalf * 2, boxHalf * 2)
                .fillStyle() // clear any fill
                .lineStyle(strokeW, this.color, 1);

            // Time accumulation across wraps
            let prevT = this.getData('prevT', 0);
            let loops = this.getData('accLoops', 0);
            if (t < prevT) loops += 1; // wrapped
            this.setData('prevT', t);
            this.setData('accLoops', loops);

            // Continuous loop time u, and delta-time in seconds
            const uPrev = this.getData('u', 0);
            const u = loops + t;
            const du = u - uPrev;
            this.setData('u', u);

            const durMs = this.getData('durMs', 1000);
            const dt = du * (durMs / 1000); // seconds for this frame

            // Compute velocity in px/s (from radii/s)
            const spdR = this.getData('spdR', 1.1);
            const ang = this.getData('ang', 37) * Phaser.Math.DEG_TO_RAD;
            let vx = this.getData('vx');
            let vy = this.getData('vy');

            if (vx === undefined || vy === undefined) {
                vx = Math.cos(ang) * (spdR * R);
                vy = Math.sin(ang) * (spdR * R);
                this.setData('vx', vx);
                this.setData('vy', vy);
            }

            // Bounds (accounting for ball radius so it stays inside the stroke)
            const L = cx - boxHalf + strokeW * 0.5 + ballR;
            const Rr = cx + boxHalf - strokeW * 0.5 - ballR;
            const T = cy - boxHalf + strokeW * 0.5 + ballR;
            const B = cy + boxHalf - strokeW * 0.5 - ballR;

            // Initialize position once (center-ish so we don't immediately collide)
            let px = this.getData('px', 0);
            let py = this.getData('py', 0);
            let initialized = this.getData('initialized', false);
            if (!initialized) {
                px = Phaser.Math.Clamp(cx + 0.3 * boxHalf, L, Rr);
                py = Phaser.Math.Clamp(cy - 0.25 * boxHalf, T, B);
                this.setData('initialized', true);
            }

            // Integrate motion with simple reflective collisions.
            // To be robust against large dt, iterate a small fixed number of times.
            let rem = dt;
            let localX = px, localY = py, localVx = vx, localVy = vy;
            let safety = 0;
            while (rem > 0 && safety < 4) {
                safety++;

                // Time to hit each wall (if moving toward it)
                const tx = localVx > 0 ? (Rr - localX) / localVx : (localVx < 0 ? (L - localX) / localVx : Infinity);
                const ty = localVy > 0 ? (B - localY) / localVy : (localVy < 0 ? (T - localY) / localVy : Infinity);

                // Next collision time (positive only)
                const nextHit = Math.min(
                    tx > 0 ? tx : Infinity,
                    ty > 0 ? ty : Infinity
                );

                if (nextHit > rem || nextHit === Infinity) {
                    // No collision within remaining time: advance and exit
                    localX += localVx * rem;
                    localY += localVy * rem;
                    rem = 0;
                } else {
                    // Advance to collision point
                    localX += localVx * nextHit;
                    localY += localVy * nextHit;
                    rem -= nextHit;

                    // Reflect at the wall we hit (tie-break: prefer X if equal)
                    if (Math.abs(nextHit - tx) <= Math.abs(nextHit - ty)) {
                        localVx = -localVx;
                    } else {
                        localVy = -localVy;
                    }
                }
            }

            // If iterations exhausted, clamp inside as a safety net
            localX = Phaser.Math.Clamp(localX, L, Rr);
            localY = Phaser.Math.Clamp(localY, T, B);

            // Persist updated state
            this.setData('px', localX);
            this.setData('py', localY);
            this.setData('vx', localVx);
            this.setData('vy', localVy);

            // Draw ball
            ballShape
                .setCenterPosition(localX, localY)
                .setRadius(ballR, ballR)
                .lineStyle() // clear stroke
                .fillStyle(this.color, 1);
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
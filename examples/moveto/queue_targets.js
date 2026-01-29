import phaser from 'phaser/src/phaser.js';
import MoveToPlugin from '../../plugins/moveto-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var hexPoints = function (cx, cy, radius) {
            var points = [];
            for (var i = 0; i < 6; i++) {
                var angle = (Math.PI * 2 * i) / 6;
                points.push({
                    x: cx + Math.cos(angle) * radius,
                    y: cy + Math.sin(angle) * radius
                });
            }
            return points;
        };

        // Chain segment by 'complete' event
        var points0 = hexPoints(250, 300, 120);
        var dot0 = this.add.circle(points0[0].x, points0[0].y, 16, 0xffffff);
        var txt0 = this.add.text(100, 100, '0');
        dot0.moveTo = this.plugins.get('rexMoveTo').add(dot0, {
            speed: 300
        });
        var index0 = 1;
        dot0.moveTo.on('complete', function () {
            index0 = (index0 + 1) % points0.length;
            var next0 = points0[index0];
            dot0.moveTo.moveTo(next0.x, next0.y);

            if (index0 === 0) {
                txt0.text = (parseInt(txt0.text) + 1).toString();
            }
        });
        dot0.moveTo.moveTo(points0[index0].x, points0[index0].y);

        // Queue segments by moveTo method        
        var points1 = hexPoints(550, 300, 120);
        var dot1 = this.add.circle(points1[0].x, points1[0].y, 16, 0xffcc00);
        var txt1 = this.add.text(500, 100, '0');
        dot1.moveTo = this.plugins.get('rexMoveTo').add(dot1, {
            speed: 300,
            appendMode: true
        });
        var queueDot1 = function () {
            for (var i = 1; i <= points1.length; i++) {
                var next1 = points1[i % points1.length];
                dot1.moveTo.moveTo(next1.x, next1.y);
            }
        };
        dot1.moveTo.on('complete', function () {
            queueDot1();
            txt1.text = (parseInt(txt1.text) + 1).toString();
        });
        queueDot1();
    }

    update() { }
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
            key: 'rexMoveTo',
            plugin: MoveToPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);

import Phaser from 'phaser';
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

        var round0 = 0, round1 = 0, round2=0;
        var txt = this.add.text(0,0, '');
        var OnRoundUpdate = function() {
            txt.text = `${round0} , ${round1} , ${round2}`
        }
        OnRoundUpdate();

        // Chain segment by 'complete' event
        var points0 = hexPoints(250, 150, 120);
        var dot0 = this.add.circle(points0[0].x, points0[0].y, 16, 0xffffff);
        dot0.moveTo = this.plugins.get('rexMoveTo').add(dot0, {
            speed: 350
        });
        var index0 = 1;
        dot0.moveTo.on('complete', function () {
            index0 = (index0 + 1) % points0.length;
            var next0 = points0[index0];
            dot0.moveTo.moveTo(next0.x, next0.y);

            if (index0 === 0) {
                round0 += 1;
                OnRoundUpdate();
            }
        });
        dot0.moveTo.moveTo(points0[index0].x, points0[index0].y);

        // Queue segments by moveTo method        
        var points1 = hexPoints(550, 150, 120);
        var dot1 = this.add.circle(points1[0].x, points1[0].y, 16, 0xffcc00);
        dot1.moveTo = this.plugins.get('rexMoveTo').add(dot1, {
            speed: 350,
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
            round1 += 1;
            OnRoundUpdate();
        });
        queueDot1();

        // Chain segment by 'complete' event, continue in same tick
        var points2 = hexPoints(550, 400, 120);
        var dot2 = this.add.circle(points2[0].x, points2[0].y, 16, 0x00ccff);
        dot2.moveTo = this.plugins.get('rexMoveTo').add(dot2, {
            speed: 350,
            continueAfterComplete: true
        });
        var index2 = 1;
        dot2.moveTo.on('complete', function () {
            index2 = (index2 + 1) % points2.length;
            var next2 = points2[index2];
            dot2.moveTo.moveTo(next2.x, next2.y);

            if (index2 === 0) {
                round2 +=1;
                OnRoundUpdate();
            }
        });
        dot2.moveTo.moveTo(points2[index2].x, points2[index2].y);


        this.add.graphics()
            .lineStyle(3, 0x00ff00)
            .strokePoints(points0, true, true)
            .strokePoints(points1, true, true)
            .strokePoints(points2, true, true)

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

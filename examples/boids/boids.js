import BoidsPlugin from '../../plugins/boids-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.birds = this.add.group({
            runChildUpdate: true,
        });
        var x, y, radius = 10,
            color;
        for (var i = 0; i < 10; i++) {
            x = Random(0, 800);
            y = Random(0, 600);
            color = Random(0, 0xffffff);
            new Bird(this.birds, x, y, radius, color);
        }
    }
}

class Bird extends Phaser.GameObjects.Line {
    constructor(group, x, y, radius, color) {
        var scene = group.scene;
        super(scene, x, y, 2 * radius, 0, 0, 0, color);
        scene.add.existing(this);
        scene.physics.add.existing(this, false);
        group.add(this);

        this.setLineWidth(3, 8);
        this.body.setCollideWorldBounds()
        this.birds = group;
        this.boids = scene.plugins.get('rexBoids').add(this, {
            separation: {
                weight: 2,
                distance: 100
            },
            cohesion: {
                weight: 1,
                distance: 200
            },
            // alignment: {
            //     weight: 1,
            //     distance: 100
            // }
        });
    }

    update() {        
        this.boids.update(this.birds.getChildren());
        var output = this.boids.output;
        if ((output.x !== 0) || (output.y !== 0)) {
            this.rotation = output.angle();            
            output.normalize().scale(30);
            this.body.setVelocity(output.x, output.y);            
        }
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
    physics: {
        default: 'arcade',      
    },
    plugins: {
        global: [{
            key: 'rexBoids',
            plugin: BoidsPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
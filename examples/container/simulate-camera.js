import phaser from 'phaser/src/phaser.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var zoomRotationContainer = this.add.container();
        var scrollXYContainer = this.add.container();
        zoomRotationContainer.add(scrollXYContainer);

        // Always put zoomRotationContainer at center of viewport
        var self = this;
        var CenterOn = function () {
            var originX = scrollXYContainer.x + zoomRotationContainer.x;
            var originY = scrollXYContainer.y + zoomRotationContainer.y;

            var viewport = self.scale.getViewPort();
            zoomRotationContainer.setPosition(viewport.centerX, viewport.centerY);

            scrollXYContainer.tlx = - zoomRotationContainer.x;
            scrollXYContainer.tly = - zoomRotationContainer.y;
            scrollXYContainer.setPosition(originX - zoomRotationContainer.x, originY - zoomRotationContainer.y)
        }
        this.scale.on('resize', CenterOn);
        CenterOn();

        Object.defineProperty(zoomRotationContainer, 'zoom', {
            set(value) {
                this.scale = value;
            },
            get() {
                return this.scale
            }
        });

        Object.defineProperty(scrollXYContainer, 'scrollX', {
            set(value) {
                this.x = this.tlx + value;
            },
            get() {
                return this.x - this.tlx;
            }
        });

        Object.defineProperty(scrollXYContainer, 'scrollY', {
            set(value) {
                this.y = this.tly + value;
            },
            get() {
                return this.y - this.tly;
            }
        });

        var gui = new Dat.GUI();
        gui.add(zoomRotationContainer, 'zoom', 0.1, 3);
        gui.add(scrollXYContainer, 'scrollX', -200, 200);
        gui.add(scrollXYContainer, 'scrollY', -200, 200);
        gui.add(zoomRotationContainer, 'rotation', -1.57, 1.57);

        var gameObject = this.add.image(400, 300, 'classroom');
        scrollXYContainer.add(gameObject);
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
};

var game = new Phaser.Game(config);
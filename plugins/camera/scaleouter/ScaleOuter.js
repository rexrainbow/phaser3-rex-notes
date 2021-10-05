import ComponentBase from '../../utils/componentbase/ComponentBase.js';

const SetStruct = Phaser.Structs.Set;

class ScaleOuter extends ComponentBase {
    constructor(scene) {
        super(scene, { eventEmitter: false });
        this.scene = scene;
        // Set gameConfig.scale.mode to Phaser.Scale.RESIZE

        var gameConfig = scene.game.config;
        this.gameWindowCenterX = gameConfig.width / 2;
        this.gameWindowCenterY = gameConfig.height / 2;
        this.cameras = new SetStruct();
        this.scrollX = 0;
        this.scrollY = 0;
        this.zoom = 1;

        scene.scale.on('resize', this.scale, this);
    }

    destroy() {
        super.destroy();

        this.scene = undefined;
        this.cameras.clear();
    }

    add(camera) {
        this.cameras.set(camera);
        this.scale();
        return this;
    }

    scale() {
        if (this.cameras.size == 0) {
            this.cameras.set(this.scene.cameras.main);
        }

        var gameWindowCenterX = this.gameWindowCenterX,
            gameWindowCenterY = this.gameWindowCenterY;

        var displaySize = this.scene.scale.displaySize;
        var displayCentetX = displaySize.width / 2,
            displayCentetY = displaySize.height / 2;

        var scrollX = gameWindowCenterX - displayCentetX,
            scrollY = gameWindowCenterY - displayCentetY;
        var zoom = (gameWindowCenterX > gameWindowCenterY) ?
            (displayCentetX / gameWindowCenterX) :
            (displayCentetY / gameWindowCenterY);

        this.scrollX = scrollX;
        this.scrollY = scrollY;
        this.zoom = zoom;

        this.cameras.iterate(function (camera, index) {
            camera
                .setScroll(scrollX, scrollY)
                .setZoom(zoom)
        });
    }
}

export default ScaleOuter;
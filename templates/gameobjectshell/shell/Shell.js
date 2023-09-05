import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';
import Methods from './methods/Methods.js';


const GetValue = Phaser.Utils.Objects.GetValue;

class Shell extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.addLayerManager(config);

        if (GetValue(config, 'clickOutsideDetection', true)) {
            this.addBackground(config);
        }

        this.addPropertiesPanel(config)

        this.addControlPoints(config);

    }

    shutdown(fromScene) {
        super.shutdown(fromScene);

        if (this.background) {
            this.background.destroy(fromScene);
        }

        if (this.panel) {
            this.panel.destroy();
        }

        if (this.controlPoints) {
            this.controlPoints.destroy();
        }

        if (this.isPrivateLayerManager) {
            this.layerManager.destroy();
        }

        this.background = undefined;
        this.panel = undefined;
        this.controlPoints = undefined;
        this.layerManager = undefined;
    }

    destroy(fromScene) {
        this.emit('destroy');
        super.destroy(fromScene);
        return this;
    }

}

Object.assign(
    Shell.prototype,
    Methods,
)

export default Shell;
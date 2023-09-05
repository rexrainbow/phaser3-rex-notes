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

        this.addBackground(config);

        this.addPropertiesPanel(config)

        this.addControlPoints(config);

    }

    shutdown(fromScene) {
        super.shutdown(fromScene);

        // background, panel, controlPoints are placed inside layers
        if (this.isPrivateLayerManager) {
            this.layerManager.destroy(fromScene);
        } else {
            var layNames = [this.backgroundLayerName, this.monitorLayerName, this.uiLayerName];
            for (var i = 0, cnt = layNames.length; i < cnt; i++) {
                this.layerManager.clearLayer(layNames[i], !fromScene);
            }
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
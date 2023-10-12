import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';
import CreateBackground from './methods/CreateBackground.js';
import CreatePropertiesPanel from './methods/CreatePropertiesPanel.js';
import CreateControlPoints from './methods/CreateControlPoints.js';
import Methods from './methods/Methods.js';
import { OnSelectGameObject, OnUnSelectGameObject } from './methods/SelectGameObjectMethods.js';


const GetValue = Phaser.Utils.Objects.GetValue;

class Shell extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.onSelectGameObjectCallback = GetValue(config, 'onSelectGameObject', OnSelectGameObject);
        this.onUnSelectGameObjectCallback = GetValue(config, 'onUnSelectGameObject', OnUnSelectGameObject);

        this.addLayerManager(config);

        CreateBackground.call(this, config);

        CreatePropertiesPanel.call(this, config);

        CreateControlPoints.call(this, config);

        /*

        - Click game object on 'monitor' layer to open properties editor
        - Click background (outside of any game object) will set binding target to undefined, 
          also set properties editor to invisible

        */
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
import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';
import CreateLayerManager from './methods/CreateLayerManager.js';
import CreateBackground from './methods/CreateBackground.js';
import CreateMainPanel from './methods/CreateMainPanel.js';
import CreateControlPoints from './methods/CreateControlPoints.js';
import CreateCameraController from './methods/CreateCameraController.js';
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

        CreateLayerManager.call(this, config);

        CreateBackground.call(this, config);

        CreateMainPanel.call(this, config);

        CreateControlPoints.call(this, config);

        CreateCameraController.call(this, config);

        /*

        - Click game object on 'monitor' layer to open properties editor
        - Click background (outside of any game object) will set binding target to undefined, 
          also set properties editor to invisible

        */
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
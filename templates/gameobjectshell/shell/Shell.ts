import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase';
import CreateLayerManager from './methods/CreateLayerManager';
import CreateBackground from './methods/CreateBackground';
import CreateMainPanel from './methods/CreateMainPanel';
import CreateControlPoints from './methods/CreateControlPoints';
import CreateCameraController from './methods/CreateCameraController';
import Methods from './methods/Methods';
import { OnSelectGameObject, OnUnSelectGameObject } from './methods/SelectGameObjectMethods';


import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Shell extends ComponentBase {
    emit: any;
    onSelectGameObjectCallback: any;
    onUnSelectGameObjectCallback: any;
    scene: any;

    constructor(scene?: any, config?: any) {
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

    destroy(fromScene?: any) {
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
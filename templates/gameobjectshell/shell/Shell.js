import ComponentBase from '../../../plugins/utils/componentbase/ComponentBase.js';
import Methods from './methods/Methods.js';
import { UILayerName, MainLayerName, BackgroundLayerName } from './methods/Const.js';
import LayerManager from '../layermanager/LayerManager.js';
import FullWindowRectangle from '../fullwindowrectangle/FullWindowRectangle.js';
import PropertiesPanel from '../propertiespanel/PropertiesPanel.js';
import ControlPoints from '../controlpoints/ControlPoints.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Shell extends ComponentBase {
    constructor(scene, config) {
        super(scene, config);
        // this.scene

        // LayerManager
        var layerManager = new LayerManager(scene, {
            layers: [BackgroundLayerName, MainLayerName, UILayerName]
        })

        // TODO : Enable/disable background by config
        // Background
        // var background = new FullWindowRectangle(scene);
        // scene.add.existing(background);
        // layerManager.addToLayer(BackgroundLayerName, background);
        // // Click background = outside of gameObjects at MainLayerName, will setBindingTarget
        // background
        //     .setInteractive()
        //     .on('pointerdown', function () {
        //         this.setBindingTarget();
        //     }, this)

        // PropertiesPanel
        var panel = new PropertiesPanel(scene, GetValue(config, 'panel'));
        if ((panel.x === 0) && (panel.y === 0)) {
            panel.setOrigin(0)
        }
        scene.add.existing(panel);
        panel.layout();
        layerManager.addToLayer(UILayerName, panel);

        // ControlPoints
        var controlPoints = new ControlPoints(scene, GetValue(config, 'controlPoints'));
        scene.add.existing(controlPoints);
        layerManager.addToLayer(UILayerName, controlPoints);


        this.layerManager = layerManager;
        this.panel = panel;
        this.controlPoints = controlPoints;
    }

    shutdown(fromScene) {
        super.shutdown(fromScene);

        this.panel.destroy();
        this.controlPoints.destroy();

        this.panel = undefined;
        this.controlPoints = undefined;
    }

    destroy(fromScene) {
        this.emit('destroy');
        super.destroy(fromScene);
        return this;
    }

    setBindingTarget(target) {
        this.panel.setBindingTarget(target);
        this.controlPoints.setBindingTarget(target);
        return this;
    }

}

Object.assign(
    Shell.prototype,
    Methods,
)

export default Shell;
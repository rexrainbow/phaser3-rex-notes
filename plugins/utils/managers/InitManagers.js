import LayerManager from '../gameobject/layermanager/LayerManager.js';
import SoundManager from '../audio/soundmanager/SoundManager.js';
import Timeline from '../../time/progresses/Timeline.js';
import WaitEventManager from './waiteventmanager/WaitEventManager.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var InitManagers = function (scene, config) {
    this.clickTarget = undefined;
    this.clickShortcutKeys = undefined;
    this.cameraTarget = undefined;

    this.managersScene = scene;

    this.gameObjectManagers = {};

    var layerNames = GetValue(config, 'layers', false);
    if (layerNames !== false) {
        var layerManager = new LayerManager(scene, {
            name: 'LAYER',
            layers: layerNames,
            rootLayer: GetValue(config, 'rootLayer', undefined),
            depth: GetValue(config, 'layerDepth', undefined)
        });
        this.addGameObjectManager(layerManager);
        this.layerManager = layerManager;
    }

    var soundManagerConfig = GetValue(config, 'sounds');
    if (soundManagerConfig !== false) {
        this.soundManager = new SoundManager(scene, soundManagerConfig);
    }

    this.timeline = new Timeline(this);

    this.waitEventManager = new WaitEventManager(this, config);

    return this;
}

export default InitManagers;
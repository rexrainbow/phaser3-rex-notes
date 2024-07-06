import GameObjectPanel from './GameObjectPanel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('gameObjectPanel', function (config) {
    var gameObject = new GameObjectPanel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.GameObjectPanel', GameObjectPanel);

export default GameObjectPanel;
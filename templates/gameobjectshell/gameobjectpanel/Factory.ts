import GameObjectPanel from './GameObjectPanel';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('gameObjectPanel', function(config?: any) {
    var gameObject = new GameObjectPanel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.GameObjectPanel', GameObjectPanel);

export default GameObjectPanel;
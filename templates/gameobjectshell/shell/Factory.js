import Shell from './Shell.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('shell', function (config) {
    var gameObject = new Shell(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.Shell', Shell);

export default Shell;
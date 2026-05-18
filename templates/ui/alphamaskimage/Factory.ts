import AlphaMaskImage from './AlphaMaskImage';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('alphaMaskImage', function(x?: any, y?: any, key?: any, frame?: any, config?: any) {
    var gameObject = new AlphaMaskImage(this.scene, x, y, key, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.AlphaMaskImage', AlphaMaskImage);

export default AlphaMaskImage;
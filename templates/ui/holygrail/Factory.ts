import HolyGrail from './HolyGrail';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('holyGrail', function(config?: any) {
    var gameObject = new HolyGrail(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.HolyGrail', HolyGrail);

export default HolyGrail;
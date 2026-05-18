import Arrow from './Arrow';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('arrow', function(config?: any) {
    var gameObject = new Arrow(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

const Directions = ['left', 'right', 'up', 'down'];
for (var i = 0, cnt = Directions.length; i < cnt; i++) {
    let direction = Directions[i];
    ObjectFactory.register(`${direction}Arrow`, function(config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.direction = direction;
        var gameObject = new Arrow(this.scene, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    });
}

SetValue(window, 'RexPlugins.Spinner.Arrow', Arrow);

export default Arrow;
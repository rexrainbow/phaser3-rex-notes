import Monopoly from './Monopoly';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('monopoly', function(gameObject?: any, config?: any) {
    return new Monopoly(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.Monopoly', Monopoly);

export default Monopoly;
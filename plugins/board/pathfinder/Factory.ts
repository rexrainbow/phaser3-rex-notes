import PathFinder from './PathFinder';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('pathFinder', function(gameObject?: any, config?: any) {
    return new PathFinder(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.PathFinder', PathFinder);

export default PathFinder;
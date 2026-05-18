import Match from './Match';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('match', function(config?: any) {
    return new Match(config);
});

SetValue(window, 'RexPlugins.Board.Match', Match);

export default Match;
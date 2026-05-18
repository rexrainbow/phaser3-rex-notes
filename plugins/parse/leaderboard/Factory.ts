import Leaderboard from './Leaderboard';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('leaderBoard', function(config?: any) {
    return new Leaderboard(config);
});

SetValue(window, 'RexPlugins.Parse.Leaderboard', Leaderboard);

export default Leaderboard;
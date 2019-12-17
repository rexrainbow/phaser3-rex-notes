import Leaderboard from './LeaderBoard.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('leaderBoard', function (config) {
    return new Leaderboard(config);
});

SetValue(window, 'RexPlugins.Fire.Leaderboard', Leaderboard);

export default Leaderboard;
import LeaderBoard from './LeaderBoard';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('leaderBoard', function(config?: any) {
    return new LeaderBoard(config);
});

SetValue(window, 'RexPlugins.Fire.LeaderBoard', LeaderBoard);

export default LeaderBoard;
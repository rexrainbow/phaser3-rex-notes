import Match from './Match.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('match', function (config) {
    return new Match(config);
});

export default Match;
import MoveTo from './MoveTo.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('moveTo', function (chess, config) {
    return new MoveTo(chess, config);
});

export default MoveTo;
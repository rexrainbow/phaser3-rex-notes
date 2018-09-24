import MoveTo from './MoveTo.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('moveTo', function (gameObject, config) {
    return new MoveTo(gameObject, config);
});

export default MoveTo;
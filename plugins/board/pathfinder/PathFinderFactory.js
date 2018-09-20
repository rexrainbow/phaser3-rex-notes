import PathFinder from './PathFinder.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('pathFinder', function (config) {
    return new PathFinder(config);
});

export default PathFinder;
import Quad from './Quad-loigc';
import ObjectFactory from '../../ObjectFactory.js';

ObjectFactory.register('quadGrid', function (config) {
    return new Quad(config);
});

export default Quad;
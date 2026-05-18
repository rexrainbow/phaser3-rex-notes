import Hexagon from './Hexagon';
import ObjectFactory from '../../ObjectFactory';

ObjectFactory.register('hexagonGrid', function(config?: any) {
    return new Hexagon(config);
});

export default Hexagon;
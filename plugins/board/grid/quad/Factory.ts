import Quad from './Quad';
import ObjectFactory from '../../ObjectFactory';

ObjectFactory.register('quadGrid', function(config?: any) {
    return new Quad(config);
});

export default Quad;
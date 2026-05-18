import Wrap from '../../../utils/math/Wrap';

var DirectionNormalize = function(direction?: any) {
    return Wrap(direction, 0, this.directions);
}

export default DirectionNormalize;
import IsPointInBounds from '../bounds/IsPointInBounds';
import PointerTest from './PointerTest';

var IsPointerInBounds = function(gameObject?: any, pointer?: any, preTest?: any, postTest?: any) {
    return PointerTest(gameObject, pointer, IsPointInBounds, preTest, postTest)
}

export default IsPointerInBounds;
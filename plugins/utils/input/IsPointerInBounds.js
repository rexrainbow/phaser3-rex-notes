import IsPointInBounds from '../bounds/IsPointInBounds.js';
import PointerTest from './PointerTest.js';

var IsPointerInBounds = function (gameObject, pointer, preTest, postTest) {
    return PointerTest(gameObject, pointer, IsPointInBounds, preTest, postTest)
}

export default IsPointerInBounds;
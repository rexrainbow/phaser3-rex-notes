import AngleToDirection from './AngleToDirections';
import RadToDeg from '../../RadToDeg';

var RotationToDirection = function(rotation?: any, dirMode?: any, out?: any) {
    return AngleToDirection(RadToDeg(rotation), dirMode, out);
}
export default RotationToDirection;
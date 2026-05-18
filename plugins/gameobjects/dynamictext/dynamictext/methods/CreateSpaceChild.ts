import Space from '../bob/space/Space';
import { SpaceTypeName } from '../bob/Types';

var CreateSpaceChild = function(width?: any) {
    var child = this.poolManager.allocate(SpaceTypeName);

    if (child === null) {
        child = new Space(
            this,               // parent
            width
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .setSpaceWidth(width)
    }
    return child;
}

export default CreateSpaceChild;
import Space from '../bob/space/Space.js';
import { SpaceTypeName } from '../bob/Types.js';

var AppendSpace = function (width) {
    var bob = this.poolManager.allocate(SpaceTypeName);

    if (bob === null) {
        bob = new Space(
            this,               // parent
            width
        );
    } else {
        bob
            .setParent(this)
            .setActive()
            .setSpaceWidth(width)
    }

    this.addChild(bob);

    return this;
};

export default AppendSpace;
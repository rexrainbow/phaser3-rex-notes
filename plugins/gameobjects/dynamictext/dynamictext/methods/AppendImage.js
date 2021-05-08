import ImageData from '../bob/image/ImageData.js';
import { ImageTypeName } from '../bob/Types.js';

var AppendImage = function (key, frame, properties) {
    var bob = this.poolManager.allocate(ImageTypeName);
    if (bob === null) {
        bob = new ImageData(
            this,               // parent
            key,
            frame
        );
    } else {
        bob
            .setParent(this)
            .setActive()
            .setTexture(key, frame)
    }
    bob.modifyPorperties(properties);

    this.lastAppendedChildren.length = 0;
    this.children.push(bob);
    this.lastAppendedChildren.push(bob);
    return this;
};

export default AppendImage;
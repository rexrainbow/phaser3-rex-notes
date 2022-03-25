import { ImageTypeName } from '../bob/Types.js';
import ImageData from '../bob/image/Image';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var AppendImage = function (frame, properties) {
    var bob = this.poolManager.allocate(ImageTypeName);
    // TODO: Get frame data
    if (!IsPlainObject(frame)) {
        frame = this.texture.get(frame);
    }
    if (bob === null) {
        bob = new ImageData(
            this,               // parent
            frame
        );
    } else {
        bob
            .setParent(this)
            .setActive()
            .setFrame(frame);
    }
    bob.modifyPorperties(properties);

    this.lastAppendedChildren.length = 0;
    this.children.add(bob);
    this.lastAppendedChildren.push(bob);
    return this;
}

export default AppendImage;
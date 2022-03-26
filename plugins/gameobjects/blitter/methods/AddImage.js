import { ImageTypeName } from '../bob/Types.js';
import ImageData from '../bob/image/Image';

var AddImage = function (config) {
    var bob = this.poolManager.allocate(ImageTypeName);

    if (typeof (config) === 'string') {
        config = {
            frame: config
        }
    }

    if (bob === null) {
        bob = new ImageData(this);
    } else {
        bob.setParent(this).setActive();
    }
    bob.modifyPorperties(config);

    this.lastAddedChildren.length = 0;
    this.children.add(bob);
    this.lastAddedChildren.push(bob);
    return this;
}

export default AddImage;
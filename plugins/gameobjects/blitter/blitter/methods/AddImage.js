import { ImageTypeName } from '../bob/Types.js';
import ImageData from '../bob/image/Image';

var AddImage = function (config) {
    if (typeof (config) === 'string') {
        config = {
            frame: config
        }
    }

    var bob = this.popReusedBob(ImageTypeName);
    if (bob === null) {
        bob = new ImageData(this);
    } else {
        bob.setParent(this).setActive();
    }
    bob.modifyPorperties(config);

    this.addChild(bob);

    return this;
}

export default AddImage;
import ImageData from '../bob/image/ImageData';
import { ImageTypeName } from '../bob/Types';

var CreateImageChild = function(key?: any, frame?: any, properties?: any) {
    var child = this.poolManager.allocate(ImageTypeName);

    if (child === null) {
        child = new ImageData(
            this,               // parent
            key,
            frame
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .setTexture(key, frame)
    }
    child.modifyPorperties(properties);

    return child;
}

export default CreateImageChild;
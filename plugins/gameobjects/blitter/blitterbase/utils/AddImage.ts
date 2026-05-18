import { ImageTypeName } from '../../blitterbase/bob/Types';
import ImageData from '../../blitterbase/bob/image/ImageData';

var AddImage = function(blitter?: any, config?: any) {
    if (typeof (config) === 'string') {
        config = {
            frame: config
        }
    }

    var bob = (blitter.poolManager) ? blitter.poolManager.allocate(ImageTypeName) : null;
    if (bob === null) {
        bob = new ImageData(blitter);
    } else {
        bob.setParent(blitter).setActive();
    }
    bob.modifyPorperties(config);

    blitter.addChild(bob);

    return bob;
}

export default AddImage;
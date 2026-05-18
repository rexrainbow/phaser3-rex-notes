import BlitterBase from '../blitterbase/BlitterBase';
import AddImage from '../blitterbase/utils/AddImage';

class Blitter extends BlitterBase {
    addImage(config?: any) {
        AddImage(this, config);
        return this;
    }
}

export default Blitter;
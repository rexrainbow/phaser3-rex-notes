import RenderBase from '../renderbase/RenderBase';
import { SpaceTypeName } from '../Types';

class Space extends RenderBase {
    scaleX: any;
    spaceWidth: any;

    constructor(
        parent,
        width
    ) {
        super(parent, SpaceTypeName);
        this.setSpaceWidth(width);
    }

    get width() {
        return this.spaceWidth * this.scaleX;
    }

    set width(value) {
        if (this.spaceWidth > 0) {
            this.scaleX = value / this.spaceWidth;
        } else {
            this.scaleX = 1;
        }
    }

    setSpaceWidth(width?: any) {
        this.spaceWidth = width;
        return this;
    }

}

export default Space;
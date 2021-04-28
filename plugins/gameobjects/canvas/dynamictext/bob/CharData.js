import Base from './Base.js';
import TextStyle from '../TextStyle.js';

class CharData extends Base {
    constructor(
        parent,
        styleJSON,
        text,
        x, y, rotation
    ) {
        super(parent);

        this.style = new TextStyle(styleJSON);
        this.setText(text);

        this.setPosition(x, y);
        this.setRotation(rotation);
    }

    setStyle(styleJSON) {
        this.setDirty(true);
        this.style.reset(styleJSON);
        return this;
    }

    setText(text) {
        this.setDirty(this.text != text);
        this.text = text;
        return this;
    }

    setPosition(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        this.setDirty((this.x != x) || (this.y != y));
        this.x = x;
        this.y = y;
        return this;
    }

    setRotation(rotation) {
        if (rotation === undefined) {
            rotation = 0;
        }

        this.setDirty(this.rotation != rotation);
        this.rotation = rotation;
        return this;
    }
}

export default CharData;
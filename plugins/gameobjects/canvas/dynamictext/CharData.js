import TextStyle from './TextStyle.js';

class CharData {
    constructor(
        parent,
        styleJSON,
        text,
        x, y, rotation
    ) {
        this.parent = parent;
        this.style = new TextStyle(styleJSON);
        this.setText(text);

        this.setPosition(x, y);
        this.setRotation(rotation);
    }

    get canvas() {
        return this.parent.canvas;
    }

    get context() {
        return this.parent.context;
    }

    setStyle(styleJSON) {
        this.style.reset(styleJSON);
        return this;
    }

    setText(text) {
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
        this.x = x;
        this.y = y;
        return this;
    }

    setRotation(rotation) {
        if (rotation === undefined) {
            rotation = 0;
        }
        this.rotation = rotation;
        return this;
    }
}

export default CharData;
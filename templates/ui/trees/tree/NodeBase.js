var ExtendNodeClass = function (GOClass) {
    return class Base extends GOClass {

        // Wrap text/setText() from nodeBody
        setText(text) {
            this.text = text;
            return this;
        }

        get text() {
            var textObject = this.childrenMap.nodeBody;
            return textObject.text;
        }

        set text(value) {
            var textObject = this.childrenMap.nodeBody;
            if (textObject.setText) {
                textObject.setText(value);
            }
        }


        // Wrap setTexture() from nodeBody
        setTexture(key, frame) {
            var imageObject = this.childrenMap.nodeBody;
            if (imageObject.setTexture) {
                imageObject.setTexture(key, frame);
            }
            return this;
        }

        get texture() {
            var imageObject = this.childrenMap.nodeBody;
            if (!imageObject) {
                return undefined;
            }
            return imageObject.texture;
        }

        get frame() {
            var imageObject = this.childrenMap.nodeBody;
            if (!imageObject) {
                return undefined;
            }
            return imageObject.frame;
        }

    }
}

export default ExtendNodeClass;
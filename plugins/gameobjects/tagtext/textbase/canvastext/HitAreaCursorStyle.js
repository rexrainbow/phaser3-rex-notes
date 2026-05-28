const HasOwn = Object.prototype.hasOwnProperty;

class HitAreaCursorStyle {
    constructor() {
        this.url = null;
        this.tags = {};
        this.default = null;
    }

    destroy() {
        this.tags = undefined;
    }

    setURL(cursorStyle) {
        this.url = cursorStyle;
        return this;
    }

    setTag(key, cursorStyle) {
        this.tags[key] = cursorStyle;
        return this;
    }

    setDefault(cursorStyle) {
        this.default = cursorStyle;
        return this;
    }

    has(data) {
        if (!data) {
            return false;
        }

        return !!(
            (this.url && data.url) ||
            HasOwn.call(this.tags, data.key) ||
            !!this.default
        );
    }

    get(data) {
        if (!data) {
            return null;
        }

        if (this.url && data.url) {
            return this.url;
        } else if (HasOwn.call(this.tags, data.key)) {
            return this.tags[data.key];
        } else if (this.default) {
            return this.default;
        } else {
            return null;
        }
    }
}

export default HitAreaCursorStyle;

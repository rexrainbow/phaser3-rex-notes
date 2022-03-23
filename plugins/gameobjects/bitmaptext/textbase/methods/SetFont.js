var SetFont = function (key) {
    if (key === this.font) {
        return this;
    }

    var entry = this.scene.sys.cache.bitmapFont.get(key);

    this.font = key;

    if (entry) {
        this.fontData = entry.data;
        this.fromAtlas = (entry.fromAtlas === true);
        this.setTexture(entry.texture, entry.frame);
    } else {
        console.warn(`Invalid BitmapText key: ${key}`);

        this.fontData = undefined;
        this.fromAtlas = undefined;
        this.setTexture();
    }

    // TODO: Update render result

    return this;
}

export default SetFont;
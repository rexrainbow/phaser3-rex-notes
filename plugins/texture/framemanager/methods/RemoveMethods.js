export default {
    // Remove a frame
    remove(frameName) {
        var index = this.getFrameIndex(frameName);
        if (index === -1) {
            return this;
        }

        this.addFrameName(index, undefined);
        this.texture.remove(frameName);

        // Don't clear canvas

        return this;
    },

    // Remove all frames
    clear() {
        for (var i, cnt = this.frameNames.length; i < cnt; i++) {
            var frameName = this.frameNames[i];
            if (frameName !== undefined) {
                this.addFrameName(index, undefined);
                this.texture.remove(frameName);
            }
        }

        return this;
    }
}
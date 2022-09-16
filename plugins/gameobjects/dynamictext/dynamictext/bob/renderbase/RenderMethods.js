const Rectangle = Phaser.Geom.Rectangle;

export default {
    // Override
    renderContent() {

    },

    // Override
    render() {
        if (!this.willRender) {
            return this;
        }

        var context = this.context;
        context.save();

        var x = this.drawX, y = this.drawY;
        if (this.autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        context.translate(x, y);
        context.globalAlpha = this.alpha;
        context.scale(this.scaleX, this.scaleY);
        context.rotate(this.rotation);

        if (this.drawBelowCallback) {
            this.drawBelowCallback(this);
        }

        this.renderContent();

        if (this.drawAboveCallback) {
            this.drawAboveCallback(this);
        }

        context.restore();
        return this;
    },

    getDrawBounds(out) {
        if (out === undefined) {
            out = new Rectangle();
        } else if (out === true) {
            if (globBounds === undefined) {
                globBounds = new Rectangle();
            }
            out = globBounds;
        }

        var x = this.drawTLx,
            y = this.drawTLy;
        out.setTo(x, y, (this.drawTRx - x), (this.drawBLy - y));

        return out;
    }

}

var globBounds;
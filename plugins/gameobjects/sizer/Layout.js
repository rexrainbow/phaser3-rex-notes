const Zone = Phaser.GameObjects.Zone;
const NOOP = function () {};
const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function () {
    var children = this.getChildren(),
        child,
        sizerChildren = [],
        state;
    var totalProportion = 0,
        totalFixLength0 = 0,
        maxLength1 = -Infinity;
    // Get sizer children
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        state = this.getLocalState(child);
        if (!state.hasOwnProperty('sizeFlag')) {
            continue;
        }
        sizerChildren.push(child);

        if ((state.sizeFlag === 0) || (state.proportion === 0)) { // MIN size
            totalFixLength0 += (this.orientation === 0) ? child.width : child.height;
        } else { // Not MIN size
            totalProportion += state.proportion;
        }

        maxLength1 = Math.max((this.orientation === 0) ? child.height : child.width, maxLength1);
    }
    if (sizerChildren.length === 0) {
        return this;
    }

    if (this.orientation === 0) {
        this.height = maxLength1;
    } else {
        this.width = maxLength1;
    }

    var proportionLength = 0;
    if (totalProportion === 0) {
        if (this.orientation === 0) {
            this.width = totalFixLength0;
        } else {
            this.height = totalFixLength0;
        }
    } else { // Fix sizer
        var remainder = ((this.orientation === 0) ? this.width : this.height) - totalFixLength0;
        proportionLength = remainder / totalProportion;
    }

    var x = this.x - (this.displayWidth * this.originX),
        y = this.y - (this.displayHeight * this.originY),
        width, height;
    if (this.orientation === 0) {
        height = this.height;
    } else {
        width = this.width;
    }
    for (var i = 0, cnt = sizerChildren.length; i < cnt; i++) {
        child = sizerChildren[i];
        state = this.getLocalState(child);
        if (this.orientation === 0) {
            width = (state.proportion === 0) ? child.width : (state.proportion * proportionLength);
        } else {
            height = (state.proportion === 0) ? child.height : (state.proportion * proportionLength);
        }
        tmpZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, tmpZone, Phaser.Display.Align.CENTER);
        this.setChildLocalPosition(child, child.x - this.x, child.y - this.y);

        // TODO: Nestest layout
        // if (child.isRexSizer) {
        //     child.layout();
        // }

        if (this.orientation === 0) {
            x += width;
        } else {
            y += height;
        }
    }
    return this;
}

var tmpZone = new Zone({
    sys: {
        queueDepthSort: NOOP,
        events: {
            once: NOOP
        }
    }
}, 0, 0, 1, 1);
tmpZone.setOrigin(0);

export default Layout;
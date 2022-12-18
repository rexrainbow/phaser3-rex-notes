import ScaleMethods from '../../basesizer/ScaleMethods.js';

export default {
    expand(transitionDuration) {
        if (this.expanded) {
            return this;
        }

        if (transitionDuration === undefined) {
            transitionDuration = this.transitionDuration;
        }

        this.expanded = true;

        var title = this.childrenMap.title;
        var child = this.childrenMap.child;

        title.emit('folder.expand', transitionDuration, this);
        child.emit('folder.expand', transitionDuration, this);

        this
            .show(child)
            .getTopmostSizer().layout()

        child.once('popup.complete', function () {
            this.emit('expand.complete', this);
        }, this)
        ScaleMethods.popUp.call(child, transitionDuration, this.expandDirection)

        this.emit('expand.start', this);

        return this;
    },

    collapse(transitionDuration) {
        if (!this.expanded) {
            return this;
        }

        if (transitionDuration === undefined) {
            transitionDuration = this.transitionDuration;
        }

        this.expanded = false;

        var title = this.childrenMap.title;
        var child = this.childrenMap.child;

        title.emit('folder.collapse', transitionDuration, this);
        child.emit('folder.collapse', transitionDuration, this);

        var child = this.childrenMap.child;
        child.once('scaledown.complete', function () {
            this
                .setChildScale(child, 1, 1)
                .hide(child)
                .getTopmostSizer().layout()
            this.emit('collapse.complete', this);
        }, this);
        ScaleMethods.scaleDown.call(child, transitionDuration, this.expandDirection)

        this.emit('collapse.start', this);

        return this;
    },

    toggle(transitionDuration) {
        if (this.expanded) {
            this.collapse(transitionDuration);
        } else {
            this.expand(transitionDuration);
        }

        return this;
    }
}
export default {
    expand(transitionDuration) {
        if (this.expanded) {
            return this;
        }

        if (transitionDuration === undefined) {
            transitionDuration = this.transitionDuration;
        }

        var child = this.childrenMap.child;
        this
            .show(child)
            .getTopmostSizer().layout()

        child
            .popUp(transitionDuration, 'y')

        this.expanded = true;

        return this;
    },

    collapse(transitionDuration) {
        if (!this.expanded) {
            return this;
        }

        if (transitionDuration === undefined) {
            transitionDuration = this.transitionDuration;
        }

        var child = this.childrenMap.child;
        child
            .once('scaledown.complete', function () {
                this
                    .setChildScale(child, 1, 1)
                    .hide(child)
                    .getTopmostSizer().layout()
            }, this)
            .scaleDown(transitionDuration, 'y')

        this.expanded = false;

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
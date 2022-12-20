export default {
    expand(duration) {
        if (this.expanded === true) {
            return this;
        }

        if (duration === undefined) {
            duration = this.transitionDuration;
        }

        this.expanded = true;

        var title = this.childrenMap.title;
        var child = this.childrenMap.child;

        this
            .show(child)
            .getTopmostSizer().layout()

        title.emit('folder.expand', duration, this);
        child.emit('child.expand', duration, this);
        this.emit('expand.start', this);

        this.childTransition
            .once('open', function () {
                this.emit('expand.complete', this);
            }, this)
            .requestOpen(duration);

        return this;
    },

    collapse(duration) {
        if (this.expanded === false) {
            return this;
        }

        if (duration === undefined) {
            duration = this.transitionDuration;
        }

        this.expanded = false;

        var title = this.childrenMap.title;
        var child = this.childrenMap.child;

        title.emit('folder.collapse', duration, this);
        child.emit('child.collapse', duration, this);
        this.emit('collapse.start', this);

        this.childTransition
            .once('close', function () {
                this
                    .setChildScale(child, 1, 1)
                    .hide(child)
                    .getTopmostSizer().layout()
                this.emit('collapse.complete', this);
            }, this)
            .requestClose(null, duration);

        return this;
    },

    toggle(duration) {
        if (this.expanded) {
            this.collapse(duration);
        } else {
            this.expand(duration);
        }

        return this;
    }
}
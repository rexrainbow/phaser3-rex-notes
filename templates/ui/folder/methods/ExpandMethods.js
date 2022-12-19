export default {
    expand(duration) {
        if (this.expanded) {
            return this;
        }

        if (duration === undefined) {
            duration = this.childTransition.transitInTime;
        }

        this.expanded = true;

        var title = this.childrenMap.title;
        var child = this.childrenMap.child;

        title.emit('folder.expand', duration, this);
        child.emit('folder.expand', duration, this);

        this
            .show(child)
            .getTopmostSizer().layout()

        this.childTransition
            .once('open', function () {
                this.emit('expand.complete', this);
            }, this)
            .open(duration);

        this.emit('expand.start', this);

        return this;
    },

    collapse(duration) {
        if (!this.expanded) {
            return this;
        }

        if (duration === undefined) {
            duration = this.childTransition.transitOutTime;
        }

        this.expanded = false;

        var title = this.childrenMap.title;
        var child = this.childrenMap.child;

        title.emit('folder.collapse', duration, this);
        child.emit('folder.collapse', duration, this);

        this.childTransition
            .once('close', function () {
                this
                    .setChildScale(child, 1, 1)
                    .hide(child)
                    .getTopmostSizer().layout()
                this.emit('collapse.complete', this);
            }, this)
            .close(duration);

        this.emit('collapse.start', this);

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
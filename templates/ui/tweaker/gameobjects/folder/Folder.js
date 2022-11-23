import Sizer from '../../../sizer/Sizer.js';

class Folder extends Sizer {
    constructor(scene, config) {
        super(scene, { orientation: 1 });

        var title = config.title;
        var child = config.child;
        var background = config.background;

        this.add(
            title,
            { proportion: 0, expand: true, }
        );

        this.add(
            child,
            { proportion: 0, expand: true, }
        );

        if (background) {
            this.addBackground(background);
        }

        this.addChildrenMap('title', title);
        this.addChildrenMap('child', child);
        this.addChildrenMap('background', background);

        child.expanded = true;

        title.onClick(this.toggle, this);
    }

    setTransitionDuration(duration) {
        this.transitionDuration = duration;
        return this;
    }

    setTitle(config) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
    }

    expand() {
        var child = this.childrenMap.child;
        if (child.expanded) {
            return this;
        }

        this
            .show(child)
            .getTopmostSizer().layout()

        child
            .popUp(this.transitionDuration, 'y')

        child.expanded = true;

        return this;
    }

    collapse() {
        var child = this.childrenMap.child;
        if (!child.expanded) {
            return this;
        }

        child
            .once('scaledown.complete', function () {
                this
                    .setChildScale(child, 1, 1)
                    .hide(child)
                    .getTopmostSizer().layout()
            }, this)
            .scaleDown(this.transitionDuration, 'y')

        child.expanded = false;

        return this;
    }

    toggle() {
        if (child.expanded) {
            this.collapse();
        } else {
            this.expand();
        }

        return this;
    }
}

export default Folder;
import Sizer from '../../../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Folder extends Sizer {
    constructor(scene, config) {
        super(scene, { orientation: 1 });
        this.type = 'rexTweaker.Folder';

        this.expanded = true;

        var title = config.title;
        var child = config.child;
        var background = config.background;

        this.add(
            title,
            { proportion: 0, expand: true, }
        );

        child.setOrigin(0.5, 0);
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

        this.setTransitionDuration(GetValue(config, 'transition.duration', 200));

        title.onClick(function () {
            this.toggle()
        }, this);
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
    }

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
    }

    toggle(transitionDuration) {
        if (this.expanded) {
            this.collapse(transitionDuration);
        } else {
            this.expand(transitionDuration);
        }

        return this;
    }
}

export default Folder;
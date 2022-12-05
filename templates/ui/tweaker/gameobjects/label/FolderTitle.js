import Title from './Title.js';
import Triangle from '../../../triangle/Triangle.js';

class FolderTitle extends Title {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        this.type = 'rexTweaker.FolderTitle';

        var expandedIcon = new Triangle(scene, config.expandedIcon)
        scene.add.existing(expandedIcon);

        this
            .addSpace()
            .add(
                expandedIcon,
                { proportion: 0, expand: false, padding: 1, }
            );

        this.addChildrenMap('expandedIcon', expandedIcon);
    }

    preLayout() {
        var expandedIcon = this.childrenMap.expandedIcon;
        expandedIcon.resize(1, 1);
    }

    postResolveSize(width, height) {
        var expandedIcon = this.childrenMap.expandedIcon;
        var size = height
            - this.getInnerPadding('top') - this.getInnerPadding('bottom')
            - this.getChildOuterPadding(expandedIcon, 'top') - this.getChildOuterPadding(expandedIcon, 'bottom');
        expandedIcon.resize(size, size);

        // Recalculate proportionLength
        this.proportionLength = undefined;
        this._childrenWidth = undefined;
        this.resolveWidth(width, true);
    }

    setExpandedState(expanded) {
        if (expanded === undefined) {
            expanded = true;
        }

        var direction = (expanded) ? 'down' : 'right';
        var expandedIcon = this.childrenMap.expandedIcon;
        expandedIcon.setDirection(direction);

        return this;
    }

}

export default FolderTitle;
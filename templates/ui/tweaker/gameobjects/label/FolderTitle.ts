import Title from './Title';
import Triangle from '../../../triangle/Triangle';

class FolderTitle extends Title {
    addChildrenMap: any;
    childrenMap: any;
    type: any;

    constructor(scene?: any, config?: any) {
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
                { proportion: 0, expand: false, padding: 1, fitRatio: 1 }
            );

        this.addChildrenMap('expandedIcon', expandedIcon);
    }

    setExpandedState(expanded?: any) {
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
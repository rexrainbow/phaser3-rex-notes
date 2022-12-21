import FolderBase from '../../../folder/Folder.js';

class Folder extends FolderBase {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.Folder';
    }

    setTitle(config) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
    }

    setBindingTarget(target) {
        var child = this.childrenMap.child;
        child.setBindingTarget(target);
        return this;
    }
}

export default Folder;
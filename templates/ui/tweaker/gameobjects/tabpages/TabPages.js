import TabPagesBase from '../../../tabpages/TabPages.js';

class TabPages extends TabPagesBase {
    setBindingTarget(target) {
        var children = this.childrenMap.pages.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setBindingTarget(target);
        }
        return this;
    }
}

export default TabPages;
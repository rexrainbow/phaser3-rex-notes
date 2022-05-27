import GetPageKeyByIndex from './GetPageKeyByIndex.js';

var RemovePage = function (key, destroyChild) {
    var tabs = this.getElement('tabs');
    var tabGameObject = tabs.getByName(key);
    var pages = this.getElement('pages');
    var pageGameObject = pages.getElement(key);
    if (!tabGameObject || !pageGameObject) {
        return this;
    }

    pages.removeChildrenMap(key);

    tabs.removeButton(tabGameObject, destroyChild);
    pages.remove(pageGameObject, destroyChild);

    return this;
}

var RemovePageByIndex = function (index) {
    var key = GetPageKeyByIndex.call(this, index);
    if (key) {
        this.removePage(key)
    }
    return this;
}

export default {
    removePage: RemovePage,
    removePageByIndex: RemovePageByIndex,
};
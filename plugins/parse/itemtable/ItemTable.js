import Parse from 'parse';
import GetValue from '../../utils/object/GetValue.js';
import PageLoader from '../utils/PageLoader.js';
import Save from './Save.js';
import Remove from '../utils/Remove.js';
import LoadRandomItems from './LoadRandomItems.js';

class ItemTable {
    constructor(config) {
        this.setClassName(GetValue(config, 'className', 'Item'));
        this.primaryKeys = {};
        var primaryKeys = GetValue(config, 'primaryKeys', undefined);
        if (primaryKeys) {
            this.addPrimaryKey(primaryKeys);
        }

        this.pageLoader = new PageLoader({
            lines: GetValue(config, 'lines', 10)
        });
    }

    setClassName(className) {
        this.customClass = Parse.Object.extend(className);
        return this;
    }

    addPrimaryKey(key) {
        if (typeof (key) === 'string') {
            this.primaryKeys[key] = true;
            return this;
        }

        var keys = key;
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.addPrimaryKey(keys[i]);
        }
        return this;
    }

    createItem() {
        return new this.customClass();
    }

    createQuery() {
        return new Parse.Query(this.customClass);
    }

    // Load methods
    loadItem(itemId) {
        return this.createQuery().get(itemId);
    }

    loadPage(query, pageIndex) {
        return this.pageLoader.loadPage(query, pageIndex);
    }

    loadCurrentPage(query) {
        return this.pageLoader.loadCurrentPage(query);
    }

    loadNextPage(query) {
        return this.pageLoader.loadNextPage(query);
    }

    loadPreviousPage(query) {
        return this.pageLoader.loadPreviousPage(query);
    }

    loadLines(query, startIndex, linesCnt) {
        return this.pageLoader.loadLines(query, startIndex, linesCnt);
    }

    loadAll(query) {
        if (query === undefined) {
            query = this.createQuery();
        }
        return this.pageLoader.loadLines(query);
    }

    get startIndex() {
        return this.pageLoader.startIndex;
    }

    get pageIndex() {
        return this.pageLoader.pageIndex;
    }

    get isLastPage() {
        return this.pageLoader.isLastPage;
    }

    // Remove
    removeItem(itemId) {
        return this.createItem().set('id', itemId).destroy();
    }

    // Get items count
    getItemCount(query) {
        if (query === undefined) {
            query = this.createQuery();
        }
        return query.count();
    }
}

var methods = {
    save: Save,
    remove: Remove,
    loadRandomItems: LoadRandomItems,
}
Object.assign(
    ItemTable.prototype,
    methods
);

export default ItemTable;
import GetValue from '../../utils/object/GetValue';
import PageLoader from '../pageloader/PageLoader';
import GetQuery from './GetQuery';
import LoadMethods from './LoadMethods';
import DeleteMethods from './DeleteMethods';
import Copy from '../../utils/array/Copy';
import Save from './Save';
import SaveItems from './SaveItems';
import GetItemCount from './GetItemCount';

class ItemTable {
    customClass: any;
    ownerRead: any;
    ownerWrite: any;
    pageLoader: any;
    primaryKeys: any;

    constructor(config?: any) {
        this.pageLoader = new PageLoader();

        this.setClassName(GetValue(config, 'className', 'Item'));
        this.setItemCount(GetValue(config, 'itemCount', 100));
        this.setQuery();  // Reset to base query
        this.primaryKeys = [];
        var primaryKeys = GetValue(config, 'primaryKeys', undefined);
        if (primaryKeys?: any) {
            this.setPrimaryKey(primaryKeys);
        }

        this.setOwnerReadMode(GetValue(config, 'ownerRead', undefined));
        this.setOwnerWriteMode(GetValue(config, 'ownerWrite', undefined));

    }

    setClassName(className?: any) {
        this.customClass = Parse.Object.extend(className);
        return this;
    }

    setPrimaryKey(key?: any) {
        if (!key) {
            this.primaryKeys.length = 0;
        } else if (typeof (key) === 'string') {
            this.primaryKeys.length = 1;
            this.primaryKeys[0] = key;
        } else {
            Copy(this.primaryKeys, key);
        }
        return this;
    }

    setOwnerReadMode(mode?: any) {
        this.ownerRead = mode;
        return this;
    }

    setOwnerWriteMode(mode?: any) {
        this.ownerWrite = mode;
        return this;
    }

    createItem() {
        return new this.customClass();
    }

    setItemCount(itemCount?: any) {
        this.pageLoader.setItemCount(itemCount);
        return this;
    }

    setQuery(query?: any) {
        if (query === undefined) {
            query = this.baseQuery;
        }
        this.pageLoader.setQuery(query);
        return this;
    }

    get baseQuery() {
        return new Parse.Query(this.customClass);
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
}

var methods = {
    getQuery: GetQuery,
    save: Save,
    saveItems: SaveItems,
    getItemCount: GetItemCount,
}
Object.assign(
    ItemTable.prototype,
    LoadMethods,
    DeleteMethods,
    methods
);

export default ItemTable;
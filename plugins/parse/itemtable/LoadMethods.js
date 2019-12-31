import Load from '../utils/query/Load.js';
import LoadRandomItems from './LoadRandomItems.js';

var Methods = {
    loadItem(itemId) {
        return this.baseQuery.get(itemId);
    },

    loadPage(pageIndex) {
        return this.pageLoader.loadPage(pageIndex);
    },

    loadCurrentPage() {
        return this.pageLoader.loadCurrentPage();
    },

    loadNextPage() {
        return this.pageLoader.loadNextPage();
    },

    loadPreviousPage() {
        return this.pageLoader.loadPreviousPage();
    },

    loadItems(startIndex, itemCount) {
        return this.pageLoader.loadItems(startIndex, itemCount);
    },

    load(query) {
        if (query === undefined) {
            query = this.baseQuery;
        }
        return Load(query);
    },

    loadRandomItems: LoadRandomItems
}

export default Methods;
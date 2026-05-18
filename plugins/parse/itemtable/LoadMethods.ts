import Load from '../utils/query/Load';
import LoadRandomItems from './LoadRandomItems';

var Methods = {
    loadItem(itemId?: any, select?: any) {
        if (typeof (itemId) === 'string') {
            var query = this.baseQuery;
            if (select?: any) {
                query = query.select(select);
            }
            return query.get(itemId);
        } else { // Query by primary keys
            var query = this.getQuery(itemId).limit(1);
            if (select?: any) {
                query = query.select(select);
            }
            return query.find()
                .then(function(result?: any) {
                    return Promise.resolve(result[0]);
                })
        }
    },

    loadPage(pageIndex?: any) {
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

    loadItems(startIndex?: any, itemCount?: any) {
        return this.pageLoader.loadItems(startIndex, itemCount);
    },

    load(query?: any) {
        if (query === undefined) {
            query = this.baseQuery;
        }
        return Load(query);
    },

    loadRandomItems: LoadRandomItems
}

export default Methods;
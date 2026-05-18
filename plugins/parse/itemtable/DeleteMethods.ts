import Delete from '../utils/query/Delete';

var Methods = {
    deleteItem(itemId?: any) {
        return this.createItem().set('id', itemId).destroy();
    },

    delete(query?: any) {
        if (query === undefined) {
            query = this.baseQuery;
        }
        return Delete(query);
    }
}

export default Methods;
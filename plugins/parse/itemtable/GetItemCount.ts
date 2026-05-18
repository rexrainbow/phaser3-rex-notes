var GetItemCount = function(query?: any) {
    if (query === undefined) {
        query = this.baseQuery;
    }
    return query.count();
}
export default GetItemCount;
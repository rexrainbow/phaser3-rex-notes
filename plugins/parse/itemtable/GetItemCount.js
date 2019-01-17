var GetItemCount = function (query) {
    if (query === undefined) {
        query = this.createQuery();
    }
    return query.count();
}
export default GetItemCount;
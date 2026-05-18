import Query from './Query';

var Load = function(query?: any, startIndex?: any, totalLines?: any) {
    var out = [];
    return Query({
        query: query,
        startIndex: startIndex,
        totalLines: totalLines,
        forEachPageCallback: function(items?: any) {
            out.push(...items);
        },
        resolveCallback: function() {
            return out;
        }
    })
};
export default Load;
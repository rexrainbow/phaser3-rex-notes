import Query from './Query';
var Load = function (query, totalLines, startDocRef, startMode) {
    var out = [];

    return Query({
        query: query,
        totalLines: totalLines,
        startDocRef: startDocRef,
        startMode: startMode,
        forEachPageCallback: function (querySnapshot) {
            out.push(...querySnapshot.docs);
        },
        resolveCallback: function () {
            return out;
        }
    });
}

export default Load;
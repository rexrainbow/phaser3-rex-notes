import Load from "./Load"

var LoadInRange = function (query, skip, count, startDocRef, startMode) {
    return Load(query, (skip + count), startDocRef, startMode)
        .then(function (docs) {
            docs = (skip === 0) ? docs : docs.slice(skip, (skip + count));
            return Promise.resolve(docs);
        })
}

export default LoadInRange;
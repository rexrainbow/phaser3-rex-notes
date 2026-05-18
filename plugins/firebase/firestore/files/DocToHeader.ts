var DocToHeader = function(doc?: any) {
    var header = doc.data();
    header.headerDocID = doc.id;
    return header;
}

export default DocToHeader;
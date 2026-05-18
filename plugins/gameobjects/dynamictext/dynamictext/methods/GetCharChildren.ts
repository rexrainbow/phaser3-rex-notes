var GetCharChildren = function(activeOnly?: any, out?: any) {
    if (out === undefined) {
        out = [];
    }

    this.forEachCharChild(function(child?: any) {
        out.push(child);
    }, undefined, activeOnly);

    return out;
}

export default GetCharChildren;
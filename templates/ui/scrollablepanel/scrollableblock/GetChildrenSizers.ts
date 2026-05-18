var GetChildrenSizers = function(out?: any) {
    if (out === undefined) {
        out = [];
    }
    if (this.child && this.child.isRexSizer) {
        out.push(this.child);
    }
    return out;
}
export default GetChildrenSizers;
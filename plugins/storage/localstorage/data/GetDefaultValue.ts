var GetDefaultValue = function(key?: any) {
    return (this.defaultData) ? this.defaultData[key] : undefined;
}
export default GetDefaultValue;
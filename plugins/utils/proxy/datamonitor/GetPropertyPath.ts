var GetPropertyPath = function(parentPath?: any, property?: any) {
    return (parentPath === '') ? property : `${parentPath}.${property}`;
}
export default GetPropertyPath;
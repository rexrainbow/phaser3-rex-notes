var ManagerIDMap = new WeakMap();
var ManagerID = 0;

var GetManagerID = function (manager) {
    if (!ManagerIDMap.has(manager)) {
        ManagerIDMap.set(manager, ManagerID++);
    }

    return ManagerIDMap.get(manager);
}

export default GetManagerID;

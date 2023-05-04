import TaskAction from './TaskAction.js';

var customNodeClasses = [TaskAction];

var names = {};
for (var i = 0, cnt = customNodeClasses.length; i < cnt; i++) {
    var nodeClass = customNodeClasses[i];
    names[nodeClass.getName] = nodeClass;
}

var GetCustomNodeMapping = function () {
    return names;
}

export default GetCustomNodeMapping;
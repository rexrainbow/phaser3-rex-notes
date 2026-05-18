import Tree from '../../plugins/utils/struct/Tree';

var tree = new Tree({
    a: {
        b: {
            c: {
                d: 10, e: 20
            }
        }
    }
})

var value = tree.setRefPath('a.b').getValue('.c.d');
console.log(value)

var tree2 = tree.clone().setRefPath('.c');
console.log(tree2.refPath);
var value = tree2.getValue('.e');
console.log(value)
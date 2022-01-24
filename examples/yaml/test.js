import yaml from 'js-yaml';

var print = function (s) {
    try {
        const doc = yaml.load(s);
        console.log(doc);
    } catch (e) {
        console.log(e);
    }
}

var s;

s = `
a : 10
b : 20
c :    # null
`
print(s)

s = `
- 10
- 20
`
print(s)

s = `
- a: 10
- b: 20
`
print(s)

s = `
content: |
    line 1 end
    line 2 ... end
    line 3 ... ... end
`
print(s)

s = `
a:
    ? key0
    ? key1
    ? key2
`
print(s)

s = `
obj0: &obj
    a: 10
    b: 20
obj1:
    <<: *obj
    c: 30    
`
print(s)
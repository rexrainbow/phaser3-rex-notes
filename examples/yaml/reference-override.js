// https://stackoverflow.com/questions/4875185/override-yaml-subkey

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
- &anchor
  key0: 10
  key1: 20
  key99: &subanchor
      subKey0: 100
      subKey1: 200
- <<: *anchor
  key99:
      <<: *subanchor
      subKey0: 300
`
print(s)

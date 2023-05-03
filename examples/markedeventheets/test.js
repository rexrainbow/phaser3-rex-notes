import MarkedEventSheets from '../../plugins/logic/markedeventsheets/MarkedEventSheets';

var content = `\
# Title

## Condition

coin > 3

## Script

print
  text=Hello

`;
var manager = new MarkedEventSheets();
manager.addEventSheet(content);
console.log(manager.dump())

import MarkedEventSheets from '../../plugins/logic/markedeventsheets/MarkedEventSheets';

var content = `\
# Title

## Condition

coin > 5

## Condition

hp > 0

## Script

print
  text=Hello

`;

var taskHandlers = {
    print(config, blackboard) {
        console.log(config.text);
    }
}

var manager = new MarkedEventSheets({
    taskHandlers: taskHandlers
});
manager.addEventSheet(content);
console.log(manager.dump())

manager
    .setData('coin', 1)
    .setData('hp', 4)
    .tick()
console.log(manager.isRunning);

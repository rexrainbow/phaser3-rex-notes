import CSVScenarioLogic from '../../plugins/logic/runcommands/csvscenario/CSVScenarioLogic.js';
import EventEmitter from 'eventemitter3';

var csvString =
    `#IF,this.coin > 100,AA
#IF,this.coin > 10,BB
#IF,,CC
#LABEL,AA,
-,print,I can eat anything
click,print,Ha
1,print,doneAA
#EXIT,,
#LABEL,BB,
-,print,I have a cup of tea
click,print,Bla bla bla
1,print,doneBB
#EXIT,,
#LABEL,CC,
-,print,Game over
click,print,Ouch
1,print,doneCC
#EXIT,,`;

class ActionKlass extends EventEmitter {
    constructor(scene) {
        super();
        this.scene = scene;
        this.coin = 50;
    }

    // callbacks
    print(s) {
        console.log(s);
    }
}
var scenario = new CSVScenarioLogic();
var myCmds = new ActionKlass(this);

document.addEventListener('click', function (event) {
    scenario.continue('click');
});

scenario
    .on('log', function (msg) {
        console.log(msg)
    })
    .on('complete', function () {
        console.log('scenario complete')
    })
    .load(csvString, myCmds, {
        timeUnit: 'sec'
    })
    .start();
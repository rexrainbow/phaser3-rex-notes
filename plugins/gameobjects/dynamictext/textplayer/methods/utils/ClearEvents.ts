import { ClearEvents as Events } from './Events';

var ClearEvents = function(textPlayer?: any) {
    for (var i = 0, cnt = Events.length; i < cnt; i++) {
        textPlayer.emit(Events[i]);
    }
}

export default ClearEvents;
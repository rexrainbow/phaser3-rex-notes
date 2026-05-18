import { GetLockedCharacterItems } from './CharacterQueryMethods';

var Unlock = function() {
    var items = GetLockedCharacterItems(this.characterCollection);
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        items[i].lock = false;
    }
    return this;
}

export default Unlock;
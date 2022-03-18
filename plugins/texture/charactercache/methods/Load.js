import {
    GetChatacter, GetInCacheCharacterItems
} from './CharacterQueryMethods.js';

var Load = function (content, lock) {
    if (Array.isArray(content)) {
        content = content.join('');
    }

    if (lock === undefined) {
        lock = false;
    }

    var insertCharacters = [];
    var removeCharacters = [];

    var totalCacheCount = this.frameManager.totalCount;
    var aliveCount = GetInCacheCharacterItems(this.characterCollection).length;
    var penddingItems = [];
    for (var i = 0, cnt = content.length; i < cnt; i++) {
        var character = content.charAt(i);
        var item = GetChatacter(this.characterCollection, character);
        item.freq++;
        item.lock = lock;
        if (!item.alive) {
            insertCharacters.push(character);
            if (totalCacheCount > aliveCount) {
                // Has free space, add to cache directly
                item.alive = true;
                aliveCount++;
                this.inCacheCount++;
            } else {
                penddingItems.push(item);
            }
        }
    }

    if (penddingItems.length > 0) {
        var freeCandidateItems = GetInCacheCharacterItems(this.characterCollection, {
            exclude: content,
            lock: false
        });
        for (var i = 0, cnt = penddingItems.length; i < cnt; i++) {
            var item = penddingItems[i];
            var freeItem = freeCandidateItems.pop();
            if (freeItem) {
                freeItem.alive = false;
                item.alive = true;
                removeCharacters.push(freeItem.character);
            } else {
                console.warn(`Character cache full, can't add '${item.character}' character.`);
            }
        }
    }

    // Update frame-manager
    for (var i = 0, cnt = removeCharacters.length; i < cnt; i++) {
        this.emit('remove', character, this.textObject);
        this.frameManager.remove(removeCharacters[i]);
    }

    for (var i = 0, cnt = insertCharacters.length; i < cnt; i++) {
        var character = insertCharacters[i];
        this.emit('add', character, this.textObject);

        this.textObject.setText(character);
        this.frameManager.paste(character, this.textObject);
    }

    if (insertCharacters.length > 0) {
        this.frameManager.updateTexture();
    }

    this.frameManager.addToBitmapFont();

    return this;
}

export default Load;
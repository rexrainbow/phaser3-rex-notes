import Click from '../../click/Click.js';

export default {
    add(gameObject) {
        this.buttons.push(gameObject);

        if (this.buttonsType) {
            var key = gameObject.name;
            if (key === '') {
                console.error(`${this.parent.constructor.name}: Button key is an empty string`)
            } else if (this.buttonMap.hasOwnProperty(key)) {
                console.error(`${this.parent.constructor.name}: Duplicate button key '${key}'`)
            }
            this.buttonMap[key] = gameObject;
            this.dataManager
                .set(key, undefined)
                .set(key, false); // Trigger data event 'changedata'
        }

        //Default: Fire 'click' event when touch released after pressed.
        gameObject._buttonBehavior = new Click(gameObject, this.clickConfig);

        gameObject._buttonBehavior
            .on('click', function (buttonBehavior, gameObject, pointer, event) {
                this.fireEvent('button.click', gameObject, pointer, event);
            }, this)
            .on('enable', function (buttonBehavior, gameObject) {
                this.fireEvent('button.enable', gameObject);
            }, this)
            .on('disable', function (buttonBehavior, gameObject) {
                this.fireEvent('button.disable', gameObject);
            }, this)

        gameObject
            .on('pointerover', function (pointer, localX, localY, event) {
                this.fireEvent('button.over', gameObject, pointer, event);
            }, this)
            .on('pointerout', function (pointer, event) {
                this.fireEvent('button.out', gameObject, pointer, event);
            }, this)

        return this;
    },

    addMultiple(gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.add(gameObject[i]);
        }
        return this;
    }
}
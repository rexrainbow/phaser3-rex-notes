import Click from '../../click/Click';
import InjectSelectedProperty from './InjectSelectedProperty';

export default {
    add(gameObject?: any) {
        this.buttons.push(gameObject);

        //Default: Fire 'click' event when touch released after pressed.
        if (!gameObject._click) {
            gameObject._click = new Click(gameObject, this.clickConfig);

            gameObject._click
                .on('click', function(buttonBehavior?: any, gameObject?: any, pointer?: any, event?: any) {
                    this.fireEvent('button.click', gameObject, pointer, event);
                }, this)
                .on('enable', function(buttonBehavior?: any, gameObject?: any) {
                    this.fireEvent('button.enable', gameObject);
                }, this)
                .on('disable', function(buttonBehavior?: any, gameObject?: any) {
                    this.fireEvent('button.disable', gameObject);
                }, this)


                .on('over', function(buttonBehavior?: any, gameObject?: any, pointer?: any, event?: any) {
                    this.fireEvent('button.over', gameObject, pointer, event);
                }, this)
                .on('out', function(buttonBehavior?: any, gameObject?: any, pointer?: any, event?: any) {
                    this.fireEvent('button.out', gameObject, pointer, event);
                }, this)

                .on('down', function(buttonBehavior?: any, gameObject?: any, pointer?: any, event?: any) {
                    this.fireEvent('button.down', gameObject, pointer, event);
                }, this)
                .on('up', function(buttonBehavior?: any, gameObject?: any, pointer?: any, event?: any) {
                    this.fireEvent('button.up', gameObject, pointer, event);
                }, this)

            if (gameObject.isRexContainerLite) {
                // Send touch detection sensor to back
                gameObject.sendChildToBack(gameObject);
            }
        }

        if (this.buttonsType) {
            if (gameObject.name === undefined) {
                console.error(`${this.parent.constructor.name}: Option button miss value`)
            }

            InjectSelectedProperty.call(this, gameObject);
        }


        return this;
    },

    addMultiple(gameObjects?: any) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.add(gameObjects[i]);
        }
        return this;
    }
}
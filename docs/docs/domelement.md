## Introduction

Carry DOM element, built-in game object of phaser.

- Author: Richard Davey

## Usage

### Add DOM element object

#### Add html string

1. Load html string in preload stage
    ```javascript
    scene.load.html(key, url);
    ```
    Reference: [load html](loader.md#html)
1. Add DOM element object with html string from cache
    ```javascript
    var domElement = scene.add.dom(x, y).createFromCache(key);  // elementType = 'div'
    // var domElement = scene.add.dom(x, y).createFromCache(key, elementType);
    ```
    - Add DOM element object with html string
        ```javascript
        var domElement = scene.add.dom(x, y).createFromHTML(htmlString);  // elementType = 'div'
        // var domElement = scene.add.dom(x, y).createFromHTML(htmlString, elementType);
        ```

#### Add existing DOM

1. Create DOM element
    ```javascript
    var el = document.createElement('div');
    // el.style = '...';
    // el.innerText = '...';
    ```
1. Add to scene
   ```javascript
   var domElement = scene.add.dom(x, y, el);
   ```

### Custom class

- Define class
    ```javascript
    class MyDOMElement extends Phaser.GameObjects.DOMElement {
        constructor(scene, x, y, element) {
            super(scene, x, y, element);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var domElement = new MyDOMElement(scene, x, y, element);
    ```

### Event of DOM element

- Add listener
    ```javascript
    domElement.addListener(eventName);
    ```
    - `eventName` : Event name
        - Single string. ex. `'click'`
        - Event name joined with `' '`
- Add event handler
    ```javascript
    var callback = function(event) {
        // event.target.name
    };
    domElement.on(eventName, callback, scope);
    // domElement.once(eventName, callback, scope);
    ```
    Reference: [event emitter](eventemitter3.md#attach-listener)
- Remove listener
    ```javascript
    domElement.removeListener(eventName);
    ```
    - `eventName` : Event name
        - Single string. ex. `'click'`
        - Event name joined with `' '`

### Get child

- Get child by name
    ```javascript
    var child = domElement.getChildByName(name)
    ```
- Get child by id
    ```javascript
    var child = domElement.getChildByID(id)
    ```
- Get child by property
    ```javascript
    var child = domElement.getChildByProperty(property, value)
    ```

### Set inner html string

```javascript
scene.setHTML(html);
```

or

```javascript
scene.setText(html);
```

### DOM Element

Each DOM element object has 1 DOM element.

- Set
   ```javascript
   domElement.setElement(el);
   ```
- Get
   ```javascript
   var el = domElement.node;
   ```

### Depth

```javascript
domElement.setDepth(value);
```

### Skew

```javascript
domElement.setSkew(x, y);
```

or

```javascript
domElement.skewX = x;
domElement.skewY = y;
```

### Rotate 3d

The rotate3d() CSS function defines a transformation that rotates an element around a fixed axis in 3D space, without deforming it.

```javascript
domElement.rotate3d.set(x, y, z, a);
```

[Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d)

### Other properties

See [game object](gameobject.md)

## Introduction

Create a transparent file chooser button (`<input type="file">`).

- Author: Rex
- [DOM Game object](domelement.md)

## Live demos

- [File chooser button](https://codepen.io/rexrainbow/pen/LYpeLQm)
- [Open file chooser dialog](https://codepen.io/rexrainbow/pen/qBOmyVd)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/filechooser)

### Install plugin

#### Load minify file

- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        dom: {
            createContainer: true
        },        
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfilechooserplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfilechooserplugin.min.js', true);
    ```
- Add file chooser object
    ```javascript
    var fileChooser = scene.add.rexFileChooser(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FileChooserPlugin from 'phaser3-rex-plugins/plugins/filechooser-plugin.js';
    var config = {    
        parent: divId,
        dom: {
            createContainer: true
        },        
        // ...
        plugins: {
            global: [{
                key: 'rexFileChooser',
                plugin: FileChooserPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add file chooser object
    ```javascript
    var fileChooser = scene.add.rexFileChooser(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        dom: {
            createContainer: true
        },        
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Import class
    ```javascript
    import { FileChooser } from 'phaser3-rex-plugins/plugins/filechooser.js';
    ```
- Add file chooser object
    ```javascript
    var fileChooser = new FileChooser(config);
    scene.add.existing(fileChooser);
    ```

### Add file chooser object

```javascript
var fileChooser = scene.add.rexFileChooser({
    accept: '',
    multiple: false
});
// var fileChooser = scene.add.rexFileChooser(x, y, width, height, config);
```

- `accept` : A filter for what file types the user can pick from the file input dialog box.
    - `'image/*'` : The user can pick all image files.
    - `'audio/*'` : The user can pick all sound files.
    - `'video/*'` : The user can pick all video files.
    - `file_extension` : Specify the file extension(s) (e.g: .gif, .jpg, .png, .doc) the user can pick from.
- `multiple` : Set `true` to select multiple files.

### Custom class

- Define class
    ```javascript
    class MyFlieChooser extends FileChooser {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config) {
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var fileChooser = new MyFlieChooser(scene, x, y, width, height, config);
    ```

### Sync

Sync position, size and origin to another game object.

```javascript
fileChooser.syncTo(gameObject);
```

### Selected files

```javascript
var files = fileChooser.files;
```

- `files` : Array of file object.

### Set accept filter

```javascript
fileChooser.setAccept(accept);
```

- `accept` : A filter for what file types the user can pick from the file input dialog box.
    - `'image/*'` : The user can pick all image files.
    - `'audio/*'` : The user can pick all sound files.
    - `'video/*'` : The user can pick all video files.
    - `file_extension` : Specify the file extension(s) (e.g: .gif, .jpg, .png, .doc) the user can pick from.

### Multiple files

- Enable
    ```javascript
    fileChooser.setMultiple();
    ```
- Disable
    ```javascript
    fileChooser.setMultiple(false);
    ```

### Events

- Selected file(s) changed
    ```javascript
    fileChooser.on('change', function(fileChooser) {
        var files = fileChooser.files;
        if (files.length === 0) { // No selected file
            return;
        }

        var file = files[0];
        var url = URL.createObjectURL(file);
        // ...
    })
    ```

### Create object URL

- [Create object url](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
    ```javascript
    var objectURL = URL.createObjectURL(file);
    ```
- [Release object url](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)
    ```javascript
    URL.createObjectURL(objectURL);
    ```
    
### Open file chooser

!!! failure
    This method can't run at ipad.

!!! note
    Open a file chooser dialog **under any touch event**. i.e. User can't open file chooser dialog directly.

```javascript
scene.plugins.get('rexFileChooser').open({
    // accept: '',
    // multiple: false,
    // closeDelay: 200
})
    .then(function(result) {
        // var files = result.files;
    })
```

- `accept` : A filter for what file types the user can pick from the file input dialog box.
    - `'image/*'` : The user can pick all image files.
    - `'audio/*'` : The user can pick all sound files.
    - `'video/*'` : The user can pick all video files.
    - `file_extension` : Specify the file extension(s) (e.g: .gif, .jpg, .png, .doc) the user can pick from.
- `multiple` : Set `true` to select multiple files.
- `delay` : Add a small delay to detect dialog canceled after game focus.
    - File chooser dialog dose not have `cancel` event.
- `files` : Array of selected files.     
    - Each file object (`files[i]`) has properties
        - `file.name` : File name with file extension.
        - `file.type` : File type. (ex. `'image/jpeg'`)
        - `file.size` : File size in bytes.
        - `file.lastModified` : Timestamp of last-modified time.
        - `file.lastModifiedDate` : Date object of last-modified time. Equal to `new Data(lastModified)`.
        - Get object url :
            ```javascript
            var objectURL = URL.createObjectURL(file);
            ```
    - Length `files` is 0 : User cancels file chooser dialog.
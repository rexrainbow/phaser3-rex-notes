## Introduction

Open a file chooser dialog (`<input type="file">`) to select a local file.

- Author: Rex
- Method

## Live demos

- [File chooser](https://codepen.io/rexrainbow/pen/qBOmyVd)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/filechooser)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfilechooserplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfilechooserplugin.min.js', true);
    ```
- Open a file chooser dialog **under any touch event**
    ```javascript
    scene.plugins.get('rexfilechooserplugin').open(config)
        .then(function(result) {
            // var files = result.files;
        })
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
- Open a file chooser dialog **under any touch event**
    ```javascript
    scene.plugins.get('rexFileChooser').open(config)
        .then(function(result) {
            // var files = result.files;
        })
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import OpenFileChooser from 'phaser3-rex-plugins/plugins/filechooser.js';
    ```
- Open a file chooser dialog **under any touch event**
    ```javascript
    OpenFileChooser(scene, config)
        .then(function(result) {
            // var files = result.files;
        })
    ```
 
### Open file chooser

!!! note
    Open a file chooser dialog **under any touch event**. i.e. User can't open file chooser dialog directly.

```javascript
scene.plugins.get('rexFileChooser').open({
    // accept: '',
    // multiple: false,
    // delay: 200
})
    .then(function(result) {
        // var files = result.files;
    })
```

- `accept` : A filter for what file types the user can pick from the file input dialog box.
    - `'image/*'` : The user can pick all image files.
    - `'audio/*'` : The user can pick all sound files.
    - `'video/*'` : The user can pick all video files.
    - `file_extension` : Specify the file extension(s) (e.g: .gif, .jpg, .png, .doc) the user can pick from
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

### Create object URL

- [Create object url](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
    ```javascript
    var objectURL = URL.createObjectURL(file);
    ```
- [Release object url](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)
    ```javascript
    URL.createObjectURL(objectURL);
    ```
    
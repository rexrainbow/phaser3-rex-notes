## Introduction

Apply translated string ([i18next](https://www.i18next.com/)) to [text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), [bitmap text object](bitmaptext.md), or [label game object](ui-label.md)

- Author: Rex
- Behavior of text object

## Live demos

- [Inline resources](https://codepen.io/rexrainbow/pen/xxaEVBq)
- [External resources](https://codepen.io/rexrainbow/pen/dyqNdbB)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/texttranslation)

### Install plugin

#### Load minify file

- Load plugin (minify file) in scene's config
    ```javascript
    class Demo extends Phaser.Scene {
        constructor() {
            super({
                key: 'Scnee',
                pack: {
                    files: [{
                        type: 'plugin',
                        key: 'rextexttranslationplugin',
                        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttranslationplugin.min.js',
                        start: true,
                        mapping: 'translation'  // Add text-translation plugin to `scene.translation`
                    }]
                },
                // ...
            });
        }
        // ...
    }
    ```
- Initialize i18next during preload stage
    ```javascript
    scene.plugins.get('rextexttranslationplugin').initI18Next(scene, {
        lng: 'dev',
        ns: 'translation',

        // resources: {
        //     'dev': {
        //         'translation': {
        //             key: value,  
        //         }
        //     }
        // }

        // debug: true,

        // backend: {
        //     loadPath: '',
        //     parse: function(data) { return JSON.parse(data); }
        // },
    })
    ```
- Add translation behavior
    ```javascript
    var translation = scene.plugins.get('rextexttranslationplugin').add(textGameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TextTranslationPlugin from 'phaser3-rex-plugins/plugins/texttranslation-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTextTranslation',
                plugin: TextTranslationPlugin,
                start: true,
                mapping: 'translation'  // Add text-translation plugin to `scene.translation`
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Initialize i18next during preload stage
    ```javascript
    scene.plugins.get('rexTextTranslation').initI18Next(scene, {
        lng: 'dev',
        ns: 'translation',

        // resources: {
        //     'dev': {
        //         'translation': {
        //             key: value,  
        //         }
        //     }
        // }

        // debug: true,
        
        // backend: {
        //     loadPath: '',
        //     parse: function(data) { return JSON.parse(data); }
        // },
    })
    ```
- Add translation behavior
    ```javascript
    var translation = scene.plugins.get('rexTextTranslation').add(textGameObject, config);
    ```

#### Import class

- Install rex plugins, i18next, i18next-http-backend from npm
    ```
    npm i phaser3-rex-plugins
    npm i i18next
    npm i i18next-http-backend
    ```
- Import class
    ```javascript
    import TextTranslationBehavior from 'phaser3-rex-plugins/plugins/texttranslation.js';
    import i18next from 'i18next';
    import Backend from 'i18next-http-backend';
    import Awaitloader from 'phaser3-rex-plugins/plugins/awaitloader.js';
    ```
- Initialize i18next during preload stage
    ```javascript
    Awaitloader.call(scene.load, function (successCallback, failureCallback) {
        i18next
            .use(Backend)
            .init({
                lng: 'dev',
                ns: 'translation',
                
                // resources: {
                //     'dev': {
                //         'translation': {
                //             key: value,  
                //         }
                //     }
                // }
            
                // debug: true,
                
                // backend: {
                //     loadPath: '',
                //     parse: function(data) { return JSON.parse(data); }
                // },
            }, successCallback);
    })
    TextTranslationBehavior.setI18Next(i18next);
    ```
    - `Awaitloader` : Using [Awaitloader](awaitloader.md#import-class) to load external resource.
    - `Backend` : `i18next-http-backend` module can be used to load external resource. 
    - `TextTranslationBehavior.setI18Next(i18next)` : Pass `i18next` to TextTranslationBehavior.
        - `TextTranslationBehavior.setI18Next` is a static method.    
- Add translation behavior
    ```javascript
    var translation = new TextTranslationBehavior(textGameObject, config);
    ```

### Initialize i18next

```javascript
scene.plugins.get('rexTextTranslation').initI18Next(scene, {
    lng: 'dev',
    ns: 'translation',

    // resources: {
    //     'dev': {
    //         'translation': {
    //             key: value,  
    //         }
    //     }
    // }

    // debug: true,
    
    // backend: {
    //     loadPath: '',
    //     parse: function(data) { return JSON.parse(data); }
    // },
})
```

or

```javascript
i18next
    .use(Backend)
    .init(config, onComplete);
```

- `lng` : Language to use. Will fallback to `'dev'`.
- `ns` : String or array of namespaces to load. Default value is `'translation'`.
- `debug` : Logs info level to console output. Helps finding issues with loading not working. Default value is `false`.
- `resources` : Resources to initialize with.
- `backend.loadPath` : Path where resources get loaded from, or a function returning a path.
    ```javascript
    function(lngs, namespaces) { 
        return customPath; 
    }
    ```
- `backend.parse` : Parse data after it has been fetched. Optional.
    ```javascript
    function(data) { 
        return JSON.parse(data); 
    }
    ```


See also [Configuration Options](https://www.i18next.com/overview/configuration-options), and [Backend Options](https://github.com/i18next/i18next-http-backend#backend-options)

### Create instance

```javascript
var translation = scene.plugins.get('rexTextTranslation').add(textGameObject, {
    // translationKey: '',
    // interpolation: {},

    // updateText: true,

    // setText: function(gameObject, text) { 
    //     gameObject.setText(text); 
    // }
});
```

- `textObject` : [text object](text.md), [bbcode text object](bbcodetext.md), [tag text object](tagtext.md), [bitmap text object](bitmaptext.md), or [label game object](ui-label.md)
- `translationKey` : Key in translation resource. See [Essentials](https://www.i18next.com/translation-function/essentials)
- `interpolation` : Integrating dynamic values into translation result. See [Interpolation](https://www.i18next.com/translation-function/interpolation)
- `updateText` : 
    - `true` : Update text object via `translationKey`, and `interpolation`. Default behavior.
    - `false` : Don't update text object now.
- `setText` : Callback invoked when updating text object. Default value is
    ```javascript
    function(gameObject, text) {
        gameObject.setText(text);
    }
    ```

### Set translation key

```javascript
translation
    .setTranslationKey(key)
    .updateText()
```

### Set interpolation

- Assign interpolation object
    ```javascript
    translation
        .setInterpolation(object)
        .updateText()
    ```
- Update current interpolation object
    ```javascript
    translation
        .updateInterpolation(key, value)
        .updateText()
    ```
    or
    ```javascript
    translation
        .updateInterpolation(object)
        .updateText()
    ```

### Update text

Update text object via `translationKey`, and `interpolation`.

```javascript
translation.updateText()
```

### Change language

```javascript
scene.plugins.get('rexTextTranslation').changeLanguage(language);
// scene.plugins.get('rexTextTranslation').changeLanguage(language, onComplete);
```

or


```javascript
i18next.changeLanguage(language, onComplete);
```

All translation behavior will update text object after changing language.

### Set default namespace

```javascript
scene.plugins.get('rexTextTranslation').setDefaultNamespace(namespace);
```

or

```javascript
i18next.setDefaultNamespace(namespace);
```

### Translate string

```javascript
var result = scene.plugins.get('rexTextTranslation').t(translationKey, interpolation);
```

or

```javascript
var result = i18next.t(translationKey, interpolation);
```

### Events

- On language changed, triggered by `changeLanguage` method.
    ```javascript
    scene.plugins.get('rexTextTranslation').on('languageChanged', function (lng) {
    });
    ```
    or
    ```javascript
    i18next.on('languageChanged', function (lng) {
    });
    ```

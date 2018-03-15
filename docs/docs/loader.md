## Introduction

Load assets, built-in object of phaser.

- Author: Richard Davey

## Usage

### Loading in preload stage

```javascript
scene.load.image(key, path/to/image);
```

Loader in 'preload' stage will start loading automatically by scene, and transfer to 'create' stage when loading completed.

### Loading after preload stage

```javascript
scene.load.image(key, path/to/image);   // add task
scene.load.once('complete', callback);  // add callback of 'complete' event
scene.load.start();                     // start loading
```

### Events

- Start loading

```javascript
scene.load.once('start', function(){});
```

- Loading progressing

```javascript
scene.load.once('progress', function(progress){});
```

- Loading a file object successful

```javascript
scene.load.once('load', function(fileObj){});
```

- Loading a file object failed

```javascript
scene.load.once('loaderror', function(fileObj){});
```

- All loading completed

```javascript
scene.load.once('complete', function(){});
```
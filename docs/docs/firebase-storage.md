## Introduction

It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

- Author: [Firebase](https://firebase.google.com/)

## Usage

[Official document](https://firebase.google.com/docs/storage/web/start)

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/firebase-storage)

### Setup

1. Import firestore
    ```javascript
    import firebase from 'firebase/app';
    import 'firebase/storage';
    ```
    Firebase has been included in [package.json](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/package.json).
1. Initialize
    ```javascript
    var firebaseApp = firebase.initializeApp({
       apiKey: '...',
       authDomain: '...',
       databaseURL: '...',
       projectId: '...',
       storageBucket: '...',
       messagingSenderId: '...'
    });
    var storageRef = firebaseApp.storage().ref();
    ```

### Upload string

- Upload string
    ```javascript
    var fileRef = storageRef.child('path/to/filename');
    var uploadTask = fileRef.putString(content)
        .then(function (snapshot) {})
        .catch(function (error) {});
    ```
- Upload base64 formatted string
    ```javascript
    var fileRef = storageRef.child('path/to/filename');
    var uploadTask = fileRef.putString(content, 'base64')
        .then(function (snapshot) {})
        .catch(function (error) {});
    ```
- Upload base64url formatted string
    ```javascript
    var fileRef = storageRef.child('path/to/filename');
    var uploadTask = fileRef.putString(content, 'base64url')
        .then(function (snapshot) {})
        .catch(function (error) {});
    ```
- Upload data URL string
    ```javascript
    var fileRef = storageRef.child('path/to/filename');
    var uploadTask = fileRef.putString(content, 'data_url')
        .then(function (snapshot) {})
        .catch(function (error) {});
    ```

### Upload image

1. Get image from [image texture](texture.md#image-texture)
    ```javascript
    var image = scene.textures.get(key).getSourceImage();
    ```
1. Copy image to canvas
   ```javascript
   var canvas = CanvasPool.create(scene, image.width, image.height);
   var ctx = canvas.getContext('2d');
   ctx.drawImage(image, 0, 0, image.width, image.height);
   ```
1. Get blob from canvas, then upload this blob.
    ```javascript
    var uploadTask;
    canvasToBlob(canvas)
        .then(function(blob) {
            var metadata = {
                contentType: 'image/jpeg',
            };        
            var fileRef = storageRef.child('path/to/filename');
            uploadTask = fileRef.put(blob, metadata);
            return uploadTask;
        })
        .then(function (snapshot) {})
        .catch(function (error) {});
    ```
    Reference: [canvasToBlob](https://github.com/nolanlawson/blob-util#canvastoblob)
1. Free canvas
   ```javascript
   CanvasPool.remove(canvas);
   ```

### Upload task

- Pause task
    ```javascript
    uploadTask.pause();
    ```
- Resume task
    ```javascript
    uploadTask.resume();
    ```
- Cancel task
    ```javascript
    uploadTask.cancel();
    ```
- Monitor progress
    ```javascript
    uploadTask.on('state_changed', 
        function(snapshot){
            // Observe state change events such as progress, pause, and resume
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        function(error) {
            // Handle unsuccessful uploads
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function() {
            // Handle successful uploads on complete
            // Get download url
            uploadTask.snapshot.ref.getDownloadURL()
                .then(function(url) {
                    console.log('File available at', url);
                })
                .catch(function (error) {});
        }
    );
    ```

### Download file

1. Get download url
    ```javascript
    var fileRef = storageRef.child('path/to/filename');
    fileRef.getDownloadURL()
        .then(function(url) {})
        .catch(function (error) {});
    ```
1. Download file by [loader](loader.md)

### Delete file

```javascript
var fileRef = storageRef.child('path/to/filename');
fileRef.delete()
    .then(function() {})
    .catch(function(error) {});
```
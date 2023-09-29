import localforage from 'localforage';

localforage.getItem('photo').then(function (image) {
    if (!image) {
        return;
    }

    console.log('Load from localforage', image)
})

var req = new XMLHttpRequest();
req.addEventListener('readystatechange', function () {
    if (req.readyState === 4) { // readyState DONE
        localforage.setItem('photo', req.response).then(function (image) {
            console.log('Load from request', image)

            // This will be a valid blob URI for an <img> tag.
            // var blob = new Blob([image]);
            // var imageURI = window.URL.createObjectURL(blob);

        }).catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }
});
req.open('GET', 'assets/images/mushroom.png');
req.responseType = 'arraybuffer';
req.send();



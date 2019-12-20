import FirebasePlugin from '../../plugins/firebase.js';
import firebaseConfig from './firebaseConfig.js';

var rexFire = new FirebasePlugin();
rexFire.preload(undefined, firebaseConfig)
    .then(function () {
        var idAlias = rexFire.add.idAlias({
            root: 'idalias-test'
        })

        idAlias
            .add('aabb', 'rex')
            .then(function (result) {
                console.log('Add: ', result);
                return idAlias.getId('rex');
            })
            .then(function (result) {
                console.log('Get: ', result);
                return idAlias.getRandomAlias('ccdd', { digits: 10, candidates: '0123456789' });
            })
            .then(function (result) {
                console.log('Get: ', result);
            })
    })
## Introduction

Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.

- Author: [Firebase](https://firebase.google.com/)

## Usage

[Official document](https://firebase.google.com/docs/firestore/)

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/firebase-firestore)

### Setup

1. Import firestore
    ```javascript
    import firebase from 'firebase/app';
    import 'firebase/firestore';
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
    var db = firebaseApp.firestore();
    db.settings({
           timestampsInSnapshots: true
    })
    ```

### References

- Reference of collection
    ```javascript
    var collectionRef = db.collection(collectionName);
    ```
- Reference of document
    ```javascript
    var docRef = db.collection(collectionName).doc(docName);
    ```

### Save

- Add document
    ```javascript
    db.collection(collectionName).add(doc)      // doc: { ... }
        .then(function(doc) { /* ... */ })
        .catch(function(error) { /* ... */ });
    ```
    Maximum size for a document : 1 MiB (1,048,576 bytes)
- Set document
    ```javascript
    db.collection(collectionName).doc(docName).set(keyValues)  // keyValues: { ... }
        .then(function(doc) { /* ... */ })
        .catch(function(error) { /* ... */ });
    ```
    Overwrite document
- Update data
    ```javascript
    db.collection(collectionName).doc(docName).update(keyValues)  // keyValues: { ... }
        .then(function(doc) { /* ... */ })
        .catch(function(error) { /* ... */ });
    ```
- Batched writes
    ```javascript
    // Get a new write batch
    var batch = db.batch();

    batch.set(db.collection(collectionName).doc(docName), keyValues);
    batch.update(db.collection(collectionName).doc(docName), keyValues);
    batch.delete(db.collection(collectionName).doc(docName));
    // ...

    // Commit the batch
    batch.commit()
        .then(function() { /* ... */ })
        .catch(function(error) { /* ... */ });
    ```
    Maximum document writting in a commit : 500
- Delete a document
    ```javascript
    db.collection(collectionName).doc(docName).delete()
        .then(function() { /* ... */ })
        .catch(function(error) { /* ... */ });
    ```
- Delete a field
    ```javascript
    db.collection(collectionName).doc(docName).update({
            key: firebase.firestore.FieldValue.delete()
        })
        .then(function() { /* ... */ })
        .catch(function(error) { /* ... */ });
    ```
- Transaction
    ```javascript
    var docRef = db.collection(collectionName).doc(docName);
    db.runTransaction(function(transaction) {
            // read-modify-write
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(docRef).then(function(doc) {
                        // doc.exists
                        transaction.update(docRef, keyValues);
                    });
        })
        .then(function() {
            //console.log("Transaction successfully committed!");
        })
        .catch(function(error) {
            //console.log("Transaction failed: ", error);
        });
    ```

[Limitation](https://firebase.google.com/docs/firestore/quotas): *Writes and transactions* section

#### Server timestamp

```javascript
firebase.firestore.FieldValue.serverTimestamp()
```

### Load

- Get a document
    ```javascript
    db.collection(collectionName).doc(docName).get()
        .then(function(doc) { /* ... */ })
        .catch(function(error) { /* ... */ });
    ```
    - [doc](https://firebase.google.com/docs/reference/js/firebase.firestore.QueryDocumentSnapshot)
        - `doc.id`
        - `doc.data()`
- Get all documents
    ```javascript
    db.collection(collectionName).get()
        .then(function(querySnapshot) { /* ... */ })
        .catch(function(error){ /* ... */ });
    ```
    - [querySnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot)        
        - `querySnapshot.docs`
        - `querySnapshot.forEach(callback, thisArg)`
        - `querySnapshot.empty`
        - `querySnapshot.size`
- Simple queries
    ```javascript
    db.collection(collectionName).where(key, op, value).get()
        .then(function(querySnapshot) { /* ... */ })
        .catch(function(error){ /* ... */ });
    ```
    - `op` : `'>'`, `'=='`, `'<'`, `'>='`, `'<='`
        - `!=` : `where(key,'>', value).where(key, '<', value)`
- Compound queries
    ```javascript
    db.collection(collectionName).where(key0, op0, value0).where(key1, op1, value1).get()
        .then(function(querySnapshot) { /* ... */ })
        .catch(function(error){ /* ... */ });
    ```
    -  Range filters (`<`, `<=`, `>`, `>=`) on only one field

#### Paginate

- Order, limit
    ```javascript
    db.collection(collectionName).orderBy(key).limit(count)
    ```
    - Descending order : `orderBy(key, 'desc')`
    - Order by multiple fields : `orderBy(key0).orderBy(key1)`
- Query, order, limit
    ```javascript
    db.collection(collectionName).where(key, op, value).orderBy(key).limit(count)
    ```
    - Key of first order must be equal to range comparison (`<`, `<=`, `>`, `>=`)
- Page
    1. Start at
        ```javascript
        db.collection(collectionName).orderBy(key).startAt(value).limit(count).get()
            .then(function(querySnapshot) { /* ... */ })
            .catch(function(error){ /* ... */ });
        ```
        - `endAt(value)`
    1. Next page
        ```javascript
        var lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        db.collection(collectionName).orderBy(key).startAfter(lastDoc).limit(count).get()
            .then(function(querySnapshot) { /* ... */ })
            .catch(function(error){ /* ... */ });
        ```
        - `endBefore(lastDoc)`

#### Get realtime updates

- Get updates of a document
    ```javascript
    var unsubscribe = db.collection(collectionName).doc(docName)
        .onSnapshot(function(doc) { /* ... */ });
    ```
- Get updates of documents
    ```javascript
    var unsubscribe = db.collection(collectionName).where(key, op, value)
        .onSnapshot(function(querySnapshot) { /* ... */ });
    ```
    - Changes
        ```javascript
        var changes = querySnapshot.docChanges();  // [change]
        ```
        - [Change](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentChange)
            - `change.type` : `'added'`, `'modified'`, `'removed'`
            - `change.newIndex`
            - `change.oldIndex`
- Detach a listener
    ```javascript
    unsubscribe();
    ```
- Events for [metadata](https://firebase.google.com/docs/reference/js/firebase.firestore.SnapshotMetadata) changes
    ```javascript
    var unsubscribe = db.collection(collectionName).doc(docName)
        .onSnapshot({
                includeMetadataChanges: true    // Listen for document metadata changes
            },
            function(doc) { /* ... */ } );
    ```

### Indexing

[Reference](https://firebase.google.com/docs/firestore/query-data/index-overview)
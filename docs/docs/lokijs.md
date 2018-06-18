## Introduction

In-memory JavaScript Datastore with Persistence.
[Reference](http://lokijs.org/)

## Usage

### Create database

```javascript
var db = new loki();
// var db = new loki('loki.json');  // load database from file
```

### Create collection

```javascript
var collection = db.addCollection(name);
```

### Insert document

```javascript
collection.insert(doc);  // doc: an object
```

### Query

#### Get document by id

```javascript
var doc = collection.get(id);  // Id: `$loki`
```

#### Filter documents

- **$eq** : filter for document(s) with property of (strict) equality
    ```javascript
    var docArray = collection.find({key: value});
    // var docArray = collection.find({key: {'$eq': value});
    ```
- **$aeq** : filter for document(s) with property of abstract (loose) equality
    ```javascript
    var docArray = collection.find({key: {'$aeq': value});
    ```
    For example
    ```javascript
    var results = coll.find({age: {'$aeq': 20}});  // age == '20' or age == 20
    ```
- **$ne** : filter for document(s) with property not equal to provided value
    ```javascript
    var docArray = collection.find({key: {'$ne': value});
    ```    
- **$gt** : filter for document(s) with property greater than provided value
    ```javascript
    var docArray = collection.find({key: {'$gt': value});
    ```    
- **$gte** : filter for document(s) with property greater or equal to provided value
    ```javascript
    var docArray = collection.find({key: {'$gte': value});
    ```
- **$lt** : filter for document(s) with property less than provided value
    ```javascript
    var docArray = collection.find({key: {'$lt': value});
    ```    
- **$lte** : filter for document(s) with property less than or equal to provided value
    ```javascript
    var docArray = collection.find({key: {'$lte': value});
    ```
- **$between** : filter for documents(s) with property between provided values
    ```javascript
    var docArray = collection.find({key: {'$between': [value0, value1]});
    ```
- **$in** : filter for document(s) with property matching any of the provided array values
    ```javascript
    var docArray = collection.find({key: {'$in': [value0, value1, ...]});
    ```
    Your property should not be an array but your compare values should be.
- **$nin** : filter for document(s) with property not matching any of the provided array values
    ```javascript
    var docArray = collection.find({key: {'$nin': [value0, value1, ...]});
    ```
- **$contains** : filter for document(s) with property containing the provided value
    ```javascript
    var docArray = collection.find({key: {'$contains': value});
    ```
    Use this when your property contains an array but your compare value is not an array
- **$containsAny** : filter for document(s) with property containing any of the provided values
    ```javascript
    var docArray = collection.find({key: {'$containsAny': [value0, value1, ...]});
    ```    
- **$containsNone** : filter for documents(s) with property containing none of the provided values
    ```javascript
    var docArray = collection.find({key: {'$containsNone': [value0, value1, ...]});
    ```
- **$regex** : filter for document(s) with property matching provided regular expression
    ```javascript
    var docArray = collection.find({key: {'$regex': pattern});
    // var docArray = collection.find({key: {'$regex': [pattern, options]});
    ```    
    For example
    ```javascript
    var docArray = collection.find({name: { '$regex': 'din' }});
    var docArray = collection.find({name: { '$regex': ['din', 'i'] }});
    ```    
- **$dteq**: filter for document(s) with date property equal to provided date value
    ```javascript
    var docArray = collection.find({key: {'$dteq': new Date('1/1/2017')});
    ```
- **$type** : filter for documents which have a property of a specified type
    ```javascript
    var docArray = collection.find({key: {'$type': value}); // 'string', or 'number', ...
    ```
- **$size** : filter for documents which have array property of specified size
    ```javascript
    var docArray = collection.find({key: {'$size': value});
    ```
    *(does not work for strings)*
- **$len** : filter for documents which have string property of specified length
    ```javascript
    var docArray = collection.find({key: {'$len': value});
    ```
- **$or** : filter for documents which meet any of the nested subexpressions
    ```javascript
    var docArray = collection.find({'$or': [
        {key0: {'$lt': value0},
        {key1: {'$gte': value1},
        // ...
    ]});
    ```

#### Filter by function

```javascript
var docArray = collection.where(function(doc){
    // ...
    return isPicked;  // true to pick this document
})
```

#### Sort

- Sort with a key
    ```javascript
    var docArray = collection.chain().find({}).simplesort(key).data();  // ascending
    // var docArray = collection.chain().find({}).simplesort(key, {desc: true}).data();  // descending
    ```
- Sort with mutiple keys
    ```javascript
    var docArray = collection.chain().find({}).compoundsort([key0, key1]).data();  // key0, key1: ascending
    // var docArray = collection.chain().find({}).compoundsort([key0, [key1, true]]).data(); // key0: ascending, key1: descending
    ```
- Sort with function
    ```javascript
    var docArray = collection.chain().find({}).sort(function(){ /* */ }).data();
    ```

#### Pagination

Get documents from `start` to `start+count-1`.

```javascript
var docArray = collection.chain().find({}).offset(start).limit(count).data();
```
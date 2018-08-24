## Introduction

Get current date or unix-timestamp.

- Author: Built-in javascript function

## Usage

[Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

### Create instance

```javascript
var d = new Date();
var d = new Date(timestamp);
var d = new Date(dateString);
var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
```

### Get date

```javascript
var year = d.getFullYear();    // returns the year
var month = d.getMonth();      // returns the month (0-11)
var date = d.getDate();        // returns the day of the month (1-31)
var day = d.getDay();          // returns the day of the week
var hour = d.getHours();       // returns the hour (0-23)
var min = d.getMinutes();      // returns the minutes (0-59)
var sec = d.getSeconds();      // returns the seconds (0-59)
var ms = d.getMilliseconds();  // returns the milliseconds (0-999)
```

### Get unix-timestamp

```javascript
var timestamp = d.getTime();;   // unix-timestamp in milliseconds
```

or

```javascript
var timestamp = Date.now();;    // unix-timestamp in milliseconds
```

### To string

```javascript
var s = d.toLocaleString();   // locale conventions
var iso = d.toISOString();    // ISO standard
```
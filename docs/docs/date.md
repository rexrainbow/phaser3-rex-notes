## Introduction

Get current date or unix-timestamp.

## Dependence

None

## Source code

Built-in javascript function.

## Usage

[Reference](https://www.w3schools.com/jsref/jsref_obj_date.asp)

### Create instance

```javascript
var d = new Date();
var d = new Date(timestamp);
var d = new Date(dateString);
var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
```

### Get date

```javascript
d.getFullYear();     // returns the year
d.getMonth();        // returns the month (0-11)
d.getDate();         // returns the day of the month (1-31)
d.getDay();          // returns the day of the week
d.getHours();        // returns the hour (0-23)
d.getMinutes();      // returns the minutes (0-59)
d.getSeconds();      // returns the seconds (0-59)
d.getMilliseconds(); // returns the milliseconds (0-999)
```

### Get unix-timestamp

```javascript
d.now();         // unix-timestamp in milliseconds
```

### To string

```javascript
d.toLocaleString();  // locale conventions
d.toISOString();     // ISO standard
```
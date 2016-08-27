# world-clock

## Getting the current time in a specific time zone
```js
// Assuming the time is 2016-08-27T14:03.24+00:00
const worldClock = require('world-clock')()

worldClock.today('Europe/London').toString()          // 2016-08-27
worldClock.localDate('Europe/London').toString()      // 2016-08-27 - same as today
worldClock.localTime('Europe/London').toString()      // 15:03:24
worldClock.localDateTime('Europe/London').toString()  // 2016-08-27T15:03.24
worldClock.zonedDateTime('Europe/London').toString()  // 2016-08-27T15:03.24+01:00

worldClock.today('UTC').toString()                    // 2016-08-27
worldClock.localDate('UTC').toString()                // 2016-08-27 - same as today
worldClock.localTime('UTC').toString()                // 14:03:24
worldClock.localDateTime('UTC').toString()            // 2016-08-27T14:03.24
worldClock.zonedDateTime('UTC').toString()            // 2016-08-27T14:03.24+00:00
```

## Getting a specific time in a specific time zone
```js
const worldClock = require('world-clock')()
const millis = new Date('2016-08-27T14:03.24+00:00').getTime()

worldClock.today('Europe/London', millis).toString()          // 2016-08-27
worldClock.localDate('Europe/London', millis).toString()      // 2016-08-27 - same as today
worldClock.localTime('Europe/London', millis).toString()      // 15:03:24
worldClock.localDateTime('Europe/London', millis).toString()  // 2016-08-27T15:03.24
worldClock.zonedDateTime('Europe/London', millis).toString()  // 2016-08-27T15:03.24+01:00

worldClock.today('UTC', millis).toString()                    // 2016-08-27
worldClock.localDate('UTC', millis).toString()                // 2016-08-27 - same as today
worldClock.localTime('UTC', millis).toString()                // 14:03:24
worldClock.localDateTime('UTC', millis).toString()            // 2016-08-27T14:03.24
worldClock.zonedDateTime('UTC', millis).toString()            // 2016-08-27T14:03.24+00:00
```

## Getting the current time in the system time zone
This is not recommented since a lot of date related bugs are caused because of accidental reliance on the system time zone, but if you really need to...
```js
// Assuming the time is 2016-08-27T14:03.24+00:00 and system time zone is Europe/London
const worldClock = require('world-clock')()

worldClock.today('SYSTEM').toString()          // 2016-08-27
worldClock.localDate('SYSTEM').toString()      // 2016-08-27 - same as today
worldClock.localTime('SYSTEM').toString()      // 15:03:24
worldClock.localDateTime('SYSTEM').toString()  // 2016-08-27T15:03.24
worldClock.zonedDateTime('SYSTEM').toString()  // 2016-08-27T15:03.24+01:00[SYSTEM]
```

## Fixing dates
For automatied testing it can be handy to fix time to a known instant. ```world-clock``` can be passed any object that exposes a ```now()``` method. e.g.

```js
const fakeClock = require('groundhog-day').fake().fix('2015-07-24T15:03:24Z')
const worldClock = require('world-clock')(fakeClock)

worldClock.today('Europe/London').toString()          // 2016-08-27
```

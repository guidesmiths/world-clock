# world-clock
A library for getting dates/times in explicit timezones, underwritten by [js-joda](https://github.com/js-joda/js-joda) and [zoneinfo](https://github.com/gsmcwhirter/node-zoneinfo). The latter parses zoneinfo files from ```/usr/share/zoneinfo```. Therefore this library will not work on windows.

## API
* worldClock([&lt;nowable&gt;])
* worldClock().today(&lt;timezone&gt;) returns an instance of [js-joda.LocalDate](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDate.js~LocalDate.html)
* worldClock().localDate(&lt;timezone&gt;, [&lt;millis&gt;]) returns an instance of [js-joda.LocalDate](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDate.js~LocalDate.html)
* worldClock().localTime(&lt;timezone&gt;, [&lt;millis&gt;]) returns an instance of [js-joda.LocalTime](https://js-joda.github.io/js-joda/esdoc/class/src/LocalTime.js~LocalTime.html)
* worldClock().localDateTime(&lt;timezone&gt;, [&lt;millis&gt;]) returns an instance of [js-joda.LocalDateTime](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDateTime.js~LocalDateTime.html)
* worldClock().zonedDateTime(&lt;timezone&gt;, [&lt;millis&gt;]) returns an instance of [js-joda.ZonedDateTime](https://js-joda.github.io/js-joda/esdoc/class/src/ZonedDateTime.js~ZonedDateTime.html)

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
For automatied testing it can be handy to fix time to a known instant. ```world-clock``` can be passed any 'nowable' object, i.e. one that exposes a ```now()``` function. e.g.
```js
const worldClock = require('world-clock')({
    now: () => new Date('2016-08-27T14:03.24Z').getTime()
})

worldClock.today('Europe/London').toString()          // 2016-08-27
```
We use [groundhog-day](https://github.com/guidesmiths/groundhog-day) for fixing time when testing.

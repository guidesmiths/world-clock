[![Build Status](https://img.shields.io/travis/guidesmiths/world-clock/master.svg)](https://travis-ci.org/guidesmiths/world-clock)
[![Code Style](https://img.shields.io/badge/code%20style-imperative-brightgreen.svg)](https://github.com/guidesmiths/eslint-config-imperative)
# world-clock
A library for getting dates/times in explicit timezones, underwritten by [js-joda](https://github.com/js-joda/js-joda) and [zoneinfo](https://github.com/gsmcwhirter/node-zoneinfo). The latter parses zoneinfo files from ```/usr/share/zoneinfo``` and therefore will not work on windows.

## Why not use moment-timezone?
[moment-timezone](https://github.com/moment/moment-timezone) is mutable which can result in hard to diagnose bugs. It lacks support for local dates/times and is restricted by trying to remain compatible with [moment](https://github.com/moment/moment).

## Why not use js-joda?
[js-joda](https://github.com/js-joda/js-joda) cannot yet convert timezone names (e.g. 'Europe/London') to its internal representation of a timezone. Until this is implemented you need to use the timezone offset, which varies depending on daylight saving. ```world-clock``` relies on [zoneinfo](https://github.com/gsmcwhirter/node-zoneinfo) to convert the timezone name to an offset, then passes the offset to [js-joda](https://github.com/js-joda/js-joda) to create immutable LocalDate/LocalTime/LocalDateTime/ZonedDateTime objects.

## API
* worldClock([&lt;nowable&gt;])
* worldClock().isValid(&lt;timezone&gt;, [&lt;millis|date|string&gt;]) returns whether the timezone and optional instant is valid
* worldClock().today(&lt;timezone&gt;) returns an instance of [js-joda.LocalDate](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDate.js~LocalDate.html)
* worldClock().localDate(&lt;timezone&gt;, [&lt;millis|date|string&gt;]) returns an instance of [js-joda.LocalDate](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDate.js~LocalDate.html)
* worldClock().localTime(&lt;timezone&gt;, [&lt;millis|date|string&gt;]) returns an instance of [js-joda.LocalTime](https://js-joda.github.io/js-joda/esdoc/class/src/LocalTime.js~LocalTime.html)
* worldClock().localDateTime(&lt;timezone&gt;, [&lt;millis|date|string&gt;]) returns an instance of [js-joda.LocalDateTime](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDateTime.js~LocalDateTime.html)
* worldClock().zonedDateTime(&lt;timezone&gt;, [&lt;millis|date|string&gt;]) returns an instance of [js-joda.ZonedDateTime](https://js-joda.github.io/js-joda/esdoc/class/src/ZonedDateTime.js~ZonedDateTime.html)

The ```today```, ```localDate```, ```localTime```, ```localDateTime``` and ```zonedDateTime``` functions will throw an error if passed an invalid timezone or instant. Use ```worldClock.isValid(isValid(&lt;timezone&gt;, [&lt;millis|date|string&gt;])``` if you want to test before calling them.

## Getting the current date/time in a specific time zone
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

## Getting a specific date/time in a specific time zone
```js
const worldClock = require('world-clock')()
const date = new Date('2016-08-27T14:03.24+00:00')

worldClock.localDate('Europe/London', date).toString()      // 2016-08-27
worldClock.localTime('Europe/London', date).toString()      // 15:03:24
worldClock.localDateTime('Europe/London', date).toString()  // 2016-08-27T15:03.24
worldClock.zonedDateTime('Europe/London', date).toString()  // 2016-08-27T15:03.24+01:00

worldClock.localDate('UTC', date).toString()                // 2016-08-27
worldClock.localTime('UTC', date).toString()                // 14:03:24
worldClock.localDateTime('UTC', date).toString()            // 2016-08-27T14:03.24
worldClock.zonedDateTime('UTC', date).toString()            // 2016-08-27T14:03.24+00:00
```

## Getting the current date/time in the system time zone
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
const options = {
    nowable: {
        now: () => new Date('2016-08-27T14:03.24Z').getTime()
    }
}
const worldClock = require('world-clock')(options)

worldClock.today('Europe/London').toString()          // 2016-08-27
```
We use [groundhog-day](https://github.com/guidesmiths/groundhog-day) for fixing time when testing.

## Getting / Setting Joda
```world-clock``` exposes its version of js-joda in joda.js
```js
const joda = require('world-clock/joda')
```
You can also supply the version of js-joda that ```world-clock``` will use by providing it as an option
```js
const options = {
    joda: require('js-joda')
}
const worldClock = require('world-clock')(options)
```

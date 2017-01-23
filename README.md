# world-clock
A library for getting dates/times in explicit timezones.

[![NPM version](https://img.shields.io/npm/v/world-clock.svg?style=flat-square)](https://www.npmjs.com/package/world-clock)
[![NPM downloads](https://img.shields.io/npm/dm/world-clock.svg?style=flat-square)](https://www.npmjs.com/package/world-clock)
[![Build Status](https://img.shields.io/travis/guidesmiths/world-clock/master.svg)](https://travis-ci.org/guidesmiths/world-clock)
[![Code Climate](https://codeclimate.com/github/guidesmiths/world-clock/badges/gpa.svg)](https://codeclimate.com/github/guidesmiths/world-clock)
[![Test Coverage](https://codeclimate.com/github/guidesmiths/world-clock/badges/coverage.svg)](https://codeclimate.com/github/guidesmiths/world-clock/coverage)
[![Code Style](https://img.shields.io/badge/code%20style-imperative-brightgreen.svg)](https://github.com/guidesmiths/eslint-config-imperative)
[![Dependency Status](https://david-dm.org/guidesmiths/world-clock.svg)](https://david-dm.org/guidesmiths/world-clock)
[![devDependencies Status](https://david-dm.org/guidesmiths/world-clock/dev-status.svg)](https://david-dm.org/guidesmiths/world-clock?type=dev)

## API

### isValid(&lt;timezone&gt;, [&lt;millis|date|string&gt;])
Returns whether the timezone and optional instant is valid, e.g.
```js
const clock = require('world-clock')()

clock.isValid('Europe/London', Date.now()) // true
```

### today(&lt;timezone&gt;)
Returns an instance of [js-joda.LocalDate](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDate.js~LocalDate.html). Throws an error if passed an invalid timezone or instant.

```js
const clock = require('world-clock')()

clock.today('Europe/London').toString() // 2016-08-27
```

### localDate(&lt;timezone&gt;, [&lt;millis|date|string&gt;])
Returns an instance of [js-joda.LocalDate](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDate.js~LocalDate.html). Throws an error if passed an invalid timezone or instant.

```js
const clock = require('world-clock')()

clock.localDate('Europe/London').toString()             // 2016-08-27
clock.localDate('Europe/London', Date.now()).toString() // 2016-08-27
```

### localTime(&lt;timezone&gt;, [&lt;millis|date|string&gt;])
Returns an instance of [js-joda.LocalTime](https://js-joda.github.io/js-joda/esdoc/class/src/LocalTime.js~LocalTime.html). Throws an error if passed an invalid timezone or instant.

```js
const clock = require('world-clock')()

clock.localTime('Europe/London').toString()             // 15:03:24
clock.localTime('Europe/London', Date.now()).toString() // 15:03:24
```

### localDateTime(&lt;timezone&gt;, [&lt;millis|date|string&gt;])
Returns an instance of [js-joda.LocalDateTime](https://js-joda.github.io/js-joda/esdoc/class/src/LocalDateTime.js~LocalDateTime.html). Throws an error if passed an invalid timezone or instant.

```js
const clock = require('world-clock')()

clock.localDateTime('Europe/London').toString()             // 2016-08-27T15:03.24
clock.localDateTime('Europe/London', Date.now()).toString() // 2016-08-27T15:03.24
```

### zonedDateTime(&lt;timezone&gt;, [&lt;millis|date|string&gt;])
Returns an instance of [js-joda.ZonedDateTime](https://js-joda.github.io/js-joda/esdoc/class/src/ZonedDateTime.js~ZonedDateTime.html). Throws an error if passed an invalid timezone or instant.

```js
const clock = require('world-clock')()

clock.zonedDateTime('Europe/London').toString()             // 2016-08-27T15:03.24+01:00
clock.zonedDateTime('Europe/London', Date.now()).toString() // 2016-08-27T15:03.24+01:00
```

## Advanced Usage

### Using the system time zone
This is not recommented since a lot of date related bugs are caused because of accidental reliance on the system time zone, but if you really need to...
```js
const clock = require('world-clock')()

clock.today('SYSTEM').toString()          // 2016-08-27
clock.localDate('SYSTEM').toString()      // 2016-08-27 - same as today
clock.localTime('SYSTEM').toString()      // 15:03:24
clock.localDateTime('SYSTEM').toString()  // 2016-08-27T15:03.24
clock.zonedDateTime('SYSTEM').toString()  // 2016-08-27T15:03.24+01:00[SYSTEM]
```

### Fixing dates
For automatied testing it can be handy to fix time to a known instant. ```world-clock``` can be passed any 'nowable' object, i.e. one that exposes a ```now()``` function. e.g.
```js
const options = {
    nowable: {
        now: () => new Date('2016-08-27T14:03.24Z').getTime()
    }
}
const clock = require('world-clock')(options)

clock.today('Europe/London').toString()          // 2016-08-27
```
We use [groundhog-day](https://github.com/guidesmiths/groundhog-day) for fixing time when testing.

### Getting / Setting Joda
```world-clock``` exposes its version of js-joda in joda.js
```js
const joda = require('world-clock/joda')
```
You can also supply the version of js-joda that ```world-clock``` will use by providing it as an option
```js
const options = {
    joda: require('js-joda')
}
const clock = require('world-clock')(options)
```

## FAQ

### Why not use moment-timezone?
[moment-timezone](https://github.com/moment/moment-timezone) is mutable which can result in hard to diagnose bugs. It lacks support for local dates/times and is restricted by trying to remain compatible with [moment](https://github.com/moment/moment).

### Why not use js-joda?
[js-joda](https://github.com/js-joda/js-joda) does not currently handle timezone names (e.g. 'Europe/London'). This issue is being tracked [here](https://github.com/js-joda/js-joda/issues/32).

### Why doesn't world-clock work on Windows?
world-clock relies on [zoneinfo](https://github.com/gsmcwhirter/node-zoneinfo) which parses zoneinfo files from ```/usr/share/zoneinfo```. It therefore does not work on windows.

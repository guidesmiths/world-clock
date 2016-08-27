const zoneinfo = require('zoneinfo')

module.exports = function(options) {

    var clock = options && options.nowable || Date
    var joda = options && options.joda || require('js-joda')

    function offset(timezone, at) {
        return new zoneinfo.TZDate(at, timezone)._utcoffset()
    }

    function zoneId(timezone, at) {
        return timezone === 'SYSTEM' ? joda.ZoneId.of('SYSTEM') : joda.ZoneOffset.ofTotalMinutes(offset(timezone, at))
    }

    function instant(at) {
        return joda.Instant.ofEpochMilli(at)
    }

    function zonedDateTime(timezone, at) {
        var now = clock.now()
        return joda.ZonedDateTime.ofInstant(instant(at || now), zoneId(timezone, at || now))
    }

    function localDateTime(timezone, at) {
        return zonedDateTime(timezone, at || clock.now()).toLocalDateTime()
    }

    function localTime(timezone, at) {
        return zonedDateTime(timezone, at || clock.now()).toLocalTime()
    }

    function localDate(timezone, at) {
        return zonedDateTime(timezone, at || clock.now()).toLocalDate()
    }

    function today(timezone) {
        return localDate(timezone)
    }

    return {
        today: today,
        localDate: localDate,
        localTime: localTime,
        localDateTime: localDateTime,
        zonedDateTime: zonedDateTime
    }
}
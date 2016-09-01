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
        if (!isValidTimezone(timezone)) throw new Error(timezone + ' is not a valid timezone')
        if (at && !isValidInstant(at)) throw new Error(at + ' is not a valid instant')

        var millis = at ? new Date(at).getTime() : clock.now()
        return joda.ZonedDateTime.ofInstant(instant(millis), zoneId(timezone, millis))
    }

    function localDateTime(timezone, at) {
        return zonedDateTime(timezone, at).toLocalDateTime()
    }

    function localTime(timezone, at) {
        return zonedDateTime(timezone, at).toLocalTime()
    }

    function localDate(timezone, at) {
        return zonedDateTime(timezone, at).toLocalDate()
    }

    function today(timezone) {
        return localDate(timezone)
    }

    function isValid(timezone, at) {
        return isValidTimezone(timezone) && (!at || isValidInstant(at))
    }

    function isValidTimezone(timezone) {
        return timezone === 'SYSTEM' || zoneinfo.isTimezone(timezone)
    }

    function isValidInstant(at) {
        return !isNaN(new Date(at).getTime())
    }

    return {
        isValid: isValid,
        today: today,
        localDate: localDate,
        localTime: localTime,
        localDateTime: localDateTime,
        zonedDateTime: zonedDateTime
    }
}
const assert = require('chai').assert
const fake = require('groundhog-day').fake()
const wc = require('..')

describe('World Clock', function() {

    describe('today', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).today('Europe/London').toString(), '2015-12-15')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).today('Europe/London').toString(), '2015-12-15')
        })

        it('Current time, daylight Savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).today('Europe/London').toString(), '2015-07-15')
        })

        it('Current time, daylight Savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).today('Europe/London').toString(), '2015-07-16')
        })

        it('Just before switch to daylight savings', function() {
            fake.fix('2016-03-27T00:55:02Z')
            assert.equal(wc({ nowable: fake }).today('Europe/London').toString(), '2016-03-27')
        })

        it('On switch to daylight savings', function() {
            fake.fix('2016-03-27T01:00:00Z')
            assert.equal(wc({ nowable: fake }).today('Europe/London').toString(), '2016-03-27')
        })

        it('Just before switch from daylight savings', function() {
            fake.fix('2016-10-30T01:55:02Z')
            assert.equal(wc({ nowable: fake }).today('Europe/London').toString(), '2016-10-30')
        })

        it('On switch from daylight savings', function() {
            fake.fix('2016-10-30T02:00:00Z')
            assert.equal(wc({ nowable: fake }).today('Europe/London').toString(), '2016-10-30')
        })

        it('No args', function() {
            assert.throws(function() {
                wc().today()
            }, /A timezone is required/)
        })

        it('Invalid timezone', function() {
            assert.throws(function() {
                wc().today('foo/bar')
            }, /foo\/bar is not a valid timezone/)
        })
    })

    describe('localDate', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).localDate('Europe/London').toString(), '2015-12-15')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).localDate('Europe/London').toString(), '2015-12-15')
        })

        it('Current time, daylight savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).localDate('Europe/London').toString(), '2015-07-15')
        })

        it('Current time, daylight savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).localDate('Europe/London').toString(), '2015-07-16')
        })

        it('Custom time, no daylight savings, start of day', function() {
            assert.equal(wc().localDate('Europe/London', '2016-12-15T00:01:02Z').toString(), '2016-12-15')
        })

        it('Custom time, no daylight savings, end of day', function() {
            assert.equal(wc().localDate('Europe/London', '2016-12-15T23:55:02Z').toString(), '2016-12-15')
        })

        it('Custom time, daylight savings, start of day', function() {
            assert.equal(wc().localDate('Europe/London', '2016-07-15T00:01:02Z').toString(), '2016-07-15')
        })

        it('Custom time, daylight savings, end of day', function() {
            assert.equal(wc().localDate('Europe/London', '2016-07-15T23:55:02Z').toString(), '2016-07-16')
        })

        it('Just before switch to daylight savings', function() {
            assert.equal(wc().localDate('Europe/London', '2016-03-27T00:55:02Z').toString(), '2016-03-27')
        })

        it('On switch to daylight savings', function() {
            assert.equal(wc().localDate('Europe/London', '2016-03-27T01:00:00Z').toString(), '2016-03-27')
        })

        it('Just before switch from daylight savings', function() {
            assert.equal(wc().localDate('Europe/London', '2016-10-30T01:55:02Z').toString(), '2016-10-30')
        })

        it('On switch from daylight savings', function() {
            assert.equal(wc().localDate('Europe/London', '2016-10-30T02:00:00Z').toString(), '2016-10-30')
        })

        it('No args', function() {
            assert.throws(function() {
                wc().localDate()
            }, /A timezone is required/)
        })

        it('Invalid timezone', function() {
            assert.throws(function() {
                wc().localDate('foo/bar')
            }, /foo\/bar is not a valid timezone/)
        })

        it('Invalid instant', function() {
            assert.throws(function() {
                wc().localDate('Europe/London', 'meh')
            }, /meh is not a valid instant/)
        })
    })

    describe('localTime', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).localTime('Europe/London').toString(), '00:01:02')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).localTime('Europe/London').toString(), '23:55:02')
        })

        it('Current time, daylight savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).localTime('Europe/London').toString(), '01:01:02')
        })

        it('Current time, daylight savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).localTime('Europe/London').toString(), '00:55:02')
        })

        it('Custom time, no daylight savings, start of day', function() {
            assert.equal(wc().localTime('Europe/London', '2016-12-15T00:01:02Z').toString(), '00:01:02')
        })

        it('Custom time, no daylight savings, end of day', function() {
            assert.equal(wc().localTime('Europe/London', '2016-12-15T23:55:02Z').toString(), '23:55:02')
        })

        it('Custom time, daylight savings, start of day', function() {
            assert.equal(wc().localTime('Europe/London', '2016-07-15T00:01:02Z').toString(), '01:01:02')
        })

        it('Custom time, daylight savings, end of day', function() {
            assert.equal(wc().localTime('Europe/London', '2016-07-15T23:55:02Z').toString(), '00:55:02')
        })

        it('Just before switch to daylight savings', function() {
            assert.equal(wc().localTime('Europe/London', '2016-03-27T00:55:02Z').toString(), '00:55:02')
        })

        it('On switch to daylight savings', function() {
            assert.equal(wc().localTime('Europe/London', '2016-03-27T01:00:00Z').toString(), '02:00')
        })

        it('Just before switch from daylight savings', function() {
            assert.equal(wc().localTime('Europe/London', '2016-10-30T01:55:02Z').toString(), '01:55:02')
        })

        it('On switch from daylight savings', function() {
            assert.equal(wc().localTime('Europe/London', '2016-10-30T02:00:00Z').toString(), '02:00')
        })

        it('No args', function() {
            assert.throws(function() {
                wc().localTime()
            }, /A timezone is required/)
        })

        it('Invalid timezone', function() {
            assert.throws(function() {
                wc().localTime('foo/bar')
            }, /foo\/bar is not a valid timezone/)
        })

        it('Invalid instant', function() {
            assert.throws(function() {
                wc().localTime('Europe/London', 'meh')
            }, /meh is not a valid instant/)
        })
    })

    describe('localDateTime', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).localDateTime('Europe/London').toString(), '2015-12-15T00:01:02')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).localDateTime('Europe/London').toString(), '2015-12-15T23:55:02')
        })

        it('Current time, daylight savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).localDateTime('Europe/London').toString(), '2015-07-15T01:01:02')
        })

        it('Current time, daylight savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).localDateTime('Europe/London').toString(), '2015-07-16T00:55:02')
        })

        it('Custom time, no daylight savings, start of day', function() {
            assert.equal(wc().localDateTime('Europe/London', '2016-12-15T00:01:02Z').toString(), '2016-12-15T00:01:02')
        })

        it('Custom time, no daylight savings, end of day', function() {
            assert.equal(wc().localDateTime('Europe/London', '2016-12-15T23:55:02Z').toString(), '2016-12-15T23:55:02')
        })

        it('Custom time, daylight savings, start of day', function() {
            assert.equal(wc().localDateTime('Europe/London', '2016-07-15T00:01:02Z').toString(), '2016-07-15T01:01:02')
        })

        it('Custom time, daylight savings, end of day', function() {
            assert.equal(wc().localDateTime('Europe/London', '2016-07-15T23:55:02Z').toString(), '2016-07-16T00:55:02')
        })

        it('Just before switch to daylight savings', function() {
            assert.equal(wc().localDateTime('Europe/London', '2016-03-27T00:55:02Z').toString(), '2016-03-27T00:55:02')
        })

        it('On switch to daylight savings', function() {
            assert.equal(wc().localDateTime('Europe/London', '2016-03-27T01:00:00Z').toString(), '2016-03-27T02:00')
        })

        it('Just before switch from daylight savings', function() {
            assert.equal(wc().localDateTime('Europe/London', '2016-10-30T01:55:02Z').toString(), '2016-10-30T01:55:02')
        })

        it('On switch from daylight savings', function() {
            assert.equal(wc().localDateTime('Europe/London', '2016-10-30T02:00:00Z').toString(), '2016-10-30T02:00')
        })

        it('No args', function() {
            assert.throws(function() {
                wc().localDateTime()
            }, /A timezone is required/)
        })

        it('Invalid timezone', function() {
            assert.throws(function() {
                wc().localDateTime('foo/bar')
            }, /foo\/bar is not a valid timezone/)
        })

        it('Invalid instant', function() {
            assert.throws(function() {
                wc().localDateTime('Europe/London', 'meh')
            }, /meh is not a valid instant/)
        })
    })

    describe('zonedDateTime', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).zonedDateTime('Europe/London').toString(), '2015-12-15T00:01:02Z')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).zonedDateTime('Europe/London').toString(), '2015-12-15T23:55:02Z')
        })

        it('Current time, daylight savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(wc({ nowable: fake }).zonedDateTime('Europe/London').toString(), '2015-07-15T01:01:02+01:00')
        })

        it('Current time, daylight savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(wc({ nowable: fake }).zonedDateTime('Europe/London').toString(), '2015-07-16T00:55:02+01:00')
        })

        it('Custom time, no daylight savings, start of day', function() {
            assert.equal(wc().zonedDateTime('Europe/London', '2016-12-15T00:01:02Z').toString(), '2016-12-15T00:01:02Z')
        })

        it('Custom time, no daylight savings, end of day', function() {
            assert.equal(wc().zonedDateTime('Europe/London', '2016-12-15T23:55:02Z').toString(), '2016-12-15T23:55:02Z')
        })

        it('Custom time, daylight savings, start of day', function() {
            assert.equal(wc().zonedDateTime('Europe/London', '2016-07-15T00:01:02Z').toString(), '2016-07-15T01:01:02+01:00')
        })

        it('Custom time, daylight savings, end of day', function() {
            assert.equal(wc().zonedDateTime('Europe/London', '2016-07-15T23:55:02Z').toString(), '2016-07-16T00:55:02+01:00')
        })

        it('Just before switch to daylight savings', function() {
            assert.equal(wc().zonedDateTime('Europe/London', '2016-03-27T00:55:02Z').toString(), '2016-03-27T00:55:02Z')
        })

        it('On switch to daylight savings', function() {
            assert.equal(wc().zonedDateTime('Europe/London', '2016-03-27T01:00:00Z').toString(), '2016-03-27T02:00+01:00')
        })

        it('Just before switch from daylight savings', function() {
            assert.equal(wc().zonedDateTime('Europe/London', '2016-10-30T01:55:02Z').toString(), '2016-10-30T01:55:02Z')
        })

        it('On switch from daylight savings', function() {
            assert.equal(wc().zonedDateTime('Europe/London', '2016-10-30T02:00:00Z').toString(), '2016-10-30T02:00Z')
        })

        it('No args', function() {
            assert.throws(function() {
                wc().zonedDateTime()
            }, /A timezone is required/)
        })

        it('Invalid timezone', function() {
            assert.throws(function() {
                wc().zonedDateTime('foo/bar')
            }, /foo\/bar is not a valid timezone/)
        })

        it('Invalid instant', function() {
            assert.throws(function() {
                wc().zonedDateTime('Europe/London', 'meh')
            }, /meh is not a valid instant/)
        })
    })

})
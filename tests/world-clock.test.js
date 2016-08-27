const assert = require('chai').assert
const fake = require('groundhog-day').fake()
const world = require('..')

describe('World Clock', function() {

    describe('today', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(world(fake).today('Europe/London').toString(), '2015-12-15')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(world(fake).today('Europe/London').toString(), '2015-12-15')
        })

        it('Current time, daylight Savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(world(fake).today('Europe/London').toString(), '2015-07-15')
        })

        it('Current time, daylight Savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(world(fake).today('Europe/London').toString(), '2015-07-16')
        })
    })

    describe('localDate', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(world(fake).localDate('Europe/London').toString(), '2015-12-15')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(world(fake).localDate('Europe/London').toString(), '2015-12-15')
        })

        it('Current time, daylight savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(world(fake).localDate('Europe/London').toString(), '2015-07-15')
        })

        it('Current time, daylight savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(world(fake).localDate('Europe/London').toString(), '2015-07-16')
        })

        it('Custom time, no daylight savings, start of day', function() {
            assert.equal(world().localDate('Europe/London', new Date('2016-12-15T00:01:02Z').getTime()).toString(), '2016-12-15')
        })

        it('Custom time, no daylight savings, end of day', function() {
            assert.equal(world().localDate('Europe/London', new Date('2016-12-15T23:55:02Z').getTime()).toString(), '2016-12-15')
        })

        it('Custom time, daylight savings, start of day', function() {
            assert.equal(world().localDate('Europe/London', new Date('2016-07-15T00:01:02Z').getTime()).toString(), '2016-07-15')
        })

        it('Custom time, daylight savings, end of day', function() {
            assert.equal(world().localDate('Europe/London', new Date('2016-07-15T23:55:02Z').getTime()).toString(), '2016-07-16')
        })
    })

    describe('localTime', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(world(fake).localTime('Europe/London').toString(), '00:01:02')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(world(fake).localTime('Europe/London').toString(), '23:55:02')
        })

        it('Current time, daylight savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(world(fake).localTime('Europe/London').toString(), '01:01:02')
        })

        it('Current time, daylight savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(world(fake).localTime('Europe/London').toString(), '00:55:02')
        })

        it('Custom time, no daylight savings, start of day', function() {
            assert.equal(world().localTime('Europe/London', new Date('2016-12-15T00:01:02Z').getTime()).toString(), '00:01:02')
        })

        it('Custom time, no daylight savings, end of day', function() {
            assert.equal(world().localTime('Europe/London', new Date('2016-12-15T23:55:02Z').getTime()).toString(), '23:55:02')
        })

        it('Custom time, daylight savings, start of day', function() {
            assert.equal(world().localTime('Europe/London', new Date('2016-07-15T00:01:02Z').getTime()).toString(), '01:01:02')
        })

        it('Custom time, daylight savings, end of day', function() {
            assert.equal(world().localTime('Europe/London', new Date('2016-07-15T23:55:02Z').getTime()).toString(), '00:55:02')
        })
    })

    describe('localDateTime', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(world(fake).localDateTime('Europe/London').toString(), '2015-12-15T00:01:02')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(world(fake).localDateTime('Europe/London').toString(), '2015-12-15T23:55:02')
        })

        it('Current time, daylight savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(world(fake).localDateTime('Europe/London').toString(), '2015-07-15T01:01:02')
        })

        it('Current time, daylight savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(world(fake).localDateTime('Europe/London').toString(), '2015-07-16T00:55:02')
        })

        it('Custom time, no daylight savings, start of day', function() {
            assert.equal(world().localDateTime('Europe/London', new Date('2016-12-15T00:01:02Z').getTime()).toString(), '2016-12-15T00:01:02')
        })

        it('Custom time, no daylight savings, end of day', function() {
            assert.equal(world().localDateTime('Europe/London', new Date('2016-12-15T23:55:02Z').getTime()).toString(), '2016-12-15T23:55:02')
        })

        it('Custom time, daylight savings, start of day', function() {
            assert.equal(world().localDateTime('Europe/London', new Date('2016-07-15T00:01:02Z').getTime()).toString(), '2016-07-15T01:01:02')
        })

        it('Custom time, daylight savings, end of day', function() {
            assert.equal(world().localDateTime('Europe/London', new Date('2016-07-15T23:55:02Z').getTime()).toString(), '2016-07-16T00:55:02')
        })
    })

    describe('zonedDateTime', function() {

        it('Current time, no daylight savings, start of day', function() {
            fake.fix('2015-12-15T00:01:02Z')
            assert.equal(world(fake).zonedDateTime('Europe/London').toString(), '2015-12-15T00:01:02Z')
        })

        it('Current time, no daylight savings, end of day', function() {
            fake.fix('2015-12-15T23:55:02Z')
            assert.equal(world(fake).zonedDateTime('Europe/London').toString(), '2015-12-15T23:55:02Z')
        })

        it('Current time, daylight savings, start of day', function() {
            fake.fix('2015-07-15T00:01:02Z')
            assert.equal(world(fake).zonedDateTime('Europe/London').toString(), '2015-07-15T01:01:02+01:00')
        })

        it('Current time, daylight savings, end of day', function() {
            fake.fix('2015-07-15T23:55:02Z')
            assert.equal(world(fake).zonedDateTime('Europe/London').toString(), '2015-07-16T00:55:02+01:00')
        })

        it('Custom time, no daylight savings, start of day', function() {
            assert.equal(world().zonedDateTime('Europe/London', new Date('2016-12-15T00:01:02Z').getTime()).toString(), '2016-12-15T00:01:02Z')
        })

        it('Custom time, no daylight savings, end of day', function() {
            assert.equal(world().zonedDateTime('Europe/London', new Date('2016-12-15T23:55:02Z').getTime()).toString(), '2016-12-15T23:55:02Z')
        })

        it('Custom time, daylight savings, start of day', function() {
            assert.equal(world().zonedDateTime('Europe/London', new Date('2016-07-15T00:01:02Z').getTime()).toString(), '2016-07-15T01:01:02+01:00')
        })

        it('Custom time, daylight savings, end of day', function() {
            assert.equal(world().zonedDateTime('Europe/London', new Date('2016-07-15T23:55:02Z').getTime()).toString(), '2016-07-16T00:55:02+01:00')
        })
    })

})
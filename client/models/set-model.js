var AmpersandState = require('ampersand-state');
var PlayCollection = require('./play-collection');
var PlayModel = require('./play-model');

module.exports = AmpersandState.extend({
    props: {
        _i: 'number',
        _d: 'string',
        _p: 'array'
    },
    derived: {
        id: { deps: ['_i'], cache: true, fn: function() { return this._i } },
        date: { deps: ['_d'], cache: true, fn: function() { return this._d } },
        plays: { deps: ['_p'], cache: true, fn: function() { return this._p.map(function (p) { return { songid: p[0], request: p[1] }; }) } },
        viewUrl: {
            deps: ['id'],
            cache: true,
            fn: function () {
                return '#set/' + this.id;
            }
        },
        playCount: {
            deps: ['plays'],
            cache: true,
            fn: function () {
                return this.plays.length;
            }
        },
        playCollection: {
            deps: ['plays'],
            cache: true,
            fn: function() {
                var self = this;
                return new PlayCollection(
                    this.plays.map(function (play, idx) {
                        return new PlayModel({
                            id: idx,
                            songid: play.songid,
                            setid: self.id,
                            request: play.request
                        });
                    })
                );
            }
        }
    }
});

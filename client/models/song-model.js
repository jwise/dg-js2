/*global app*/
var AmpersandState = require('ampersand-state');
var SetCollection = require('./set-collection');

module.exports = AmpersandState.extend({
    props: {
        _i: 'number',
        _a: 'number',
        _t: 'string'
    },
    derived: {
        id: { deps: ['_i'], cache: true, fn: function() { return this._i } },
        artistid: { deps: ['_a'], cache: true, fn: function() { return this._a } },
        title: { deps: ['_t'], cache: true, fn: function() { return this._t } },
        viewUrl: {
            deps: ['id'],
            cache: true,
            fn: function () {
                return '#song/' + this.id;
            }
        },
        artist: {
            deps: ['artistid'],
            cache: false,
            fn: function() {
                return app.world.artists.get(this.artistid)
            }
        },
        plays: {
            deps: ['id'],
            cache: true,
            fn: function () {
                var self = this;
                return new SetCollection(
                    app.world.sets.filter(function (set) {
                        return set.plays.some(function (play) { return play.songid == self.id; });
                    })
                );
            }
        }
    }
});

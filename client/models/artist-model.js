/*global app */
var AmpersandState = require('ampersand-state');
var SongCollection = require('./song-collection');

module.exports = AmpersandState.extend({
    props: {
        _i: 'number',
        _a: 'string',
        _p: 'number'
    },
    derived: {
        id: { deps: ['_i'], cache: true, fn: function() { return this._i } },
        artist: { deps: ['_a'], cache: true, fn: function() { return this._a } },
        playCount: { deps: ['_p'], cache: true, fn: function() { return this._p } },
        viewUrl: {
            deps: ['id'],
            cache: true,
            fn: function () {
                return '#artist/' + this.id;
            }
        },
        songs: {
            deps: ['id'],
            cache: true,
            fn: function () {
                var self = this;
                return new SongCollection(
                    app.world.songs.filter(function (song) {
                        return song.artistid == self.id;
                    })
                );
            }
        }/*,
        playCount: {
            deps: ['songs'],
            cache: true,
            fn: function () {
                return this.songs.reduce(function (a, song) { return a + song.plays.length; }, 0);
            }
        }*/
        
    }
});

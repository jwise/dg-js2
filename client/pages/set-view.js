/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var PlayEntryView = require('./set-view/play-entry');

module.exports = PageView.extend({
    pageTitle: 'set view',
    template: templates.pages.setView.page,
    bindings: {
        'model.date': '[data-hook~=date]',
        'model.club': '[data-hook~=club]',
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.model.playCollection, PlayEntryView, this.queryByHook('set-contents'));
    },
    initialize: function (spec) {
        var self = this;
        
        this.model = app.world.sets.get(spec.id);
        this.pageTitle = this.model.date;
    }
});

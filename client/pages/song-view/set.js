var View = require('ampersand-view');
var templates = require('../../templates');

module.exports = View.extend({
    template: templates.pages.songView.set,
    bindings: {
        'model.date': '[data-hook~=date]',
        'model.club': '[data-hook~=club]',
        'model.viewUrl': {
            type: 'attribute',
            name: 'href',
            hook: 'date'
        }
    }
});

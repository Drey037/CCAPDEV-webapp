// Controllers contain functions that are routed in routers, to be called in forms

const controller = {
    getIndex: function(req, res) {
        res.render("index");
    },

    getAbout: function(req, res) {
        res.render("about", {
            pageTitle: 'About',
        });
    }
};

module.exports = controller;

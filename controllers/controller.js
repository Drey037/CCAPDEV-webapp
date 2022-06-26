// Controllers contain functions that are routed in routers, to be called in forms

const controller = {
    getIndex: function(req, res) {
        res.render("index");
    }
};

module.exports = controller;

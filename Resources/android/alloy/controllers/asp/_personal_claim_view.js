function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function generate_progressBar(filled) {
        var view_progressBar = $.UI.create("View", {
            classes: [ "progressBar" ]
        });
        var view_progressBarFill = $.UI.create("View", {
            classes: [ "progressBarFill" ],
            width: filled
        });
        view_progressBar.add(view_progressBarFill);
        return view_progressBar;
    }
    function generate_description(desc, balance, limit) {
        var view_desc = $.UI.create("View", {
            classes: [ "wfill", "hsize", "horz" ]
        });
        var label_balance = $.UI.create("Label", {
            text: desc + limit
        });
        view_desc.add(label_balance);
        return view_desc;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/_personal_claim_view";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.personalClaimVw = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "personalClaimVw"
    });
    $.__views.personalClaimVw && $.addTopLevelView($.__views.personalClaimVw);
    $.__views.main = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderRadius: "5",
        borderColor: "#dfe0e4",
        backgroundColor: "#FFFFFF",
        id: "main"
    });
    $.__views.personalClaimVw.add($.__views.main);
    $.__views.__alloyId211 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId211"
    });
    $.__views.main.add($.__views.__alloyId211);
    $.__views.name = Ti.UI.createLabel({
        width: "85%",
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 18
        },
        id: "name",
        left: "10",
        top: "5",
        zIndex: "10"
    });
    $.__views.__alloyId211.add($.__views.name);
    $.__views.more = Ti.UI.createImageView({
        id: "more",
        image: "/images/btn-forward.png",
        right: "8",
        top: "8",
        zIndex: "10",
        width: "20dp",
        height: "20dp"
    });
    $.__views.__alloyId211.add($.__views.more);
    $.__views.__alloyId212 = Ti.UI.createView({
        height: "15",
        width: Ti.UI.FILL,
        id: "__alloyId212"
    });
    $.__views.main.add($.__views.__alloyId212);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    console.log(args);
    $.name.text = args.name;
    for (var i = 0; i < args.data.length; i++) {
        var view_container = $.UI.create("View", {
            classes: [ "padding", "wfill", "hsize", "vert" ],
            top: 5
        });
        var typeHeaderView = $.UI.create("View", {
            classes: [ "wfill", "hsize", "horz" ]
        });
        var label_type = $.UI.create("Label", {
            classes: [ "font_medium" ],
            left: 0,
            width: "65%",
            text: args.data[i].benefittype + " Balance "
        });
        if (args.data[i].entidvbal < 99999) var totBal = args.data[i].entidvbal;
        if (args.data[i].entshabal < 99999) var totBal = args.data[i].entshabal;
        var totalLimitLbl = $.UI.create("Label", {
            classes: [ "font_small" ],
            right: 0,
            width: "35%",
            textAlign: "right",
            text: "RM " + totBal
        });
        typeHeaderView.add(label_type);
        typeHeaderView.add(totalLimitLbl);
        view_container.add(typeHeaderView);
        if (args.data[i].entidvbal < 99999) {
            var balance = Math.ceil((args.data[i].entidv - args.data[i].entidvbal) / args.data[i].entidv * 100);
            console.log(balance);
            view_container.add(generate_progressBar(balance + "%"));
            view_container.add(generate_description("Limit: RM ", args.data[i].entidvbal, args.data[i].entidv));
        }
        if (args.data[i].entshabal < 99999) {
            var share_balance = Math.ceil((args.data[i].entsha - args.data[i].entshabal) / args.data[i].entsha * 100);
            console.log(share_balance);
            view_container.add(generate_progressBar(share_balance + "%"));
            view_container.add(generate_description("Shared Limit: RM ", args.data[i].entshabal, args.data[i].entsha));
        }
        $.main.add(view_container);
    }
    $.personalClaimVw.addEventListener("click", function() {
        var nav = require("navigation");
        nav.navigateWithArgs("asp/claimHistory", {
            name: args.name
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
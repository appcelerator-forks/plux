function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "news";
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
    $.__views.news = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "",
        backButtonTitle: "",
        id: "news",
        navTintColor: "#CE1D1C"
    });
    $.__views.news && $.addTopLevelView($.__views.news);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "main",
        layout: "vertical"
    });
    $.__views.news.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId200 = Ti.UI.createView({
=======
    $.__views.__alloyId201 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId200"
    });
    $.__views.main.add($.__views.__alloyId200);
    $.__views.__alloyId201 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId201"
    });
    $.__views.__alloyId200.add($.__views.__alloyId201);
=======
        id: "__alloyId201"
    });
    $.__views.main.add($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId202"
    });
    $.__views.__alloyId201.add($.__views.__alloyId202);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId201.add($.__views.btnBack);
    $.__views.__alloyId202 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId202"
    });
    $.__views.__alloyId200.add($.__views.__alloyId202);
=======
    $.__views.__alloyId202.add($.__views.btnBack);
    $.__views.__alloyId203 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId203"
    });
    $.__views.__alloyId201.add($.__views.__alloyId203);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Health Article",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId202.add($.__views.pageTitle);
    var __alloyId204 = [];
=======
    $.__views.__alloyId203.add($.__views.pageTitle);
    var __alloyId205 = [];
>>>>>>> origin/master
    $.__views.myContentView = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        id: "myContentView",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL
    });
<<<<<<< HEAD
    __alloyId204.push($.__views.myContentView);
=======
    __alloyId205.push($.__views.myContentView);
>>>>>>> origin/master
    $.__views.newsTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        wordWrap: true,
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        id: "newsTitle"
    });
    $.__views.myContentView.add($.__views.newsTitle);
    $.__views.newsImage = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        id: "newsImage",
        image: ""
    });
    $.__views.myContentView.add($.__views.newsImage);
    $.__views.newsDate = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#9E9E9E",
        font: {
            fontSize: "10dp"
        },
        left: "8dp",
        top: "8dp",
        id: "newsDate"
    });
    $.__views.myContentView.add($.__views.newsDate);
<<<<<<< HEAD
    $.__views.__alloyId203 = Ti.UI.createScrollableView({
        views: __alloyId204,
        showPagingControl: false,
        id: "__alloyId203"
    });
    $.__views.main.add($.__views.__alloyId203);
=======
    $.__views.__alloyId204 = Ti.UI.createScrollableView({
        views: __alloyId205,
        showPagingControl: false,
        id: "__alloyId204"
    });
    $.__views.main.add($.__views.__alloyId204);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var news_id = args.news_id;
    var newsFeedModel = Alloy.createCollection("health_news_feed");
    var newsElementModel = Alloy.createCollection("news_element");
    var categoryModel = Alloy.createCollection("category");
    var news = newsFeedModel.getRecordsById(news_id);
    var details = newsElementModel.getListByNews(news_id);
    categoryModel.getCategoryById(news.category);
    $.newsTitle.text = news.title;
    $.newsImage.image = news.images;
    $.newsDate.text = timeFormat(news.updated);
    details.forEach(function(entry) {
        if ("1" == entry.type) {
            var dynaLabel = $.UI.create("Label", {
                text: entry.content,
                classes: [ "news_subtitle" ]
            });
            $.myContentView.add(dynaLabel);
        }
        if ("2" == entry.type) {
            var msg = entry.content;
            msg = msg.replace(/<br\/>/g, "\r\n");
            var dynaLabel = $.UI.create("Label", {
                text: msg,
                classes: [ "news_paragraph" ]
            });
            $.myContentView.add(dynaLabel);
        }
        if ("3" == entry.type) {
            var dynaImage = Ti.UI.createImageView({
                image: entry.images
            });
            $.myContentView.add(dynaImage);
            var msg = entry.content;
            msg = msg.replace(/<br\/>/g, "\r\n");
            var dynaLabel = $.UI.create("Label", {
                text: msg,
                classes: [ "image_caption" ]
            });
            $.myContentView.add(dynaLabel);
        }
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.news);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
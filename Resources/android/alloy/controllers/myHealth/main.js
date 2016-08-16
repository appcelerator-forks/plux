function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resetGraph() {
        $.bmiView.setHeight("0");
        $.bloodPressureView.setHeight("0");
        $.heartRateView.setHeight("0");
        $.bodyTemperatureView.setHeight("0");
        $.cholestrolView.setHeight("0");
        $.glucoseView.setHeight("0");
        $.bmiView.setTop("0");
        $.bloodPressureView.setTop("0");
        $.heartRateView.setTop("0");
        $.bodyTemperatureView.setTop("0");
        $.cholestrolView.setTop("0");
    }
    function filterList(e) {
        if ("measurement" == e.category) {
            resetGraph();
            $.bmiView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.bmiView.setTop(10);
            $.cholestrolView.setTop(10);
            $.bmiView.show();
            $.cholestrolView.show();
        } else if ("vitals" == e.category) {
            resetGraph();
            $.heartRateView.setHeight(Ti.UI.SIZE);
            $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
            $.bloodPressureView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.glucoseView.setHeight(Ti.UI.SIZE);
            $.heartRateView.setTop(10);
            $.bodyTemperatureView.setTop(10);
            $.bloodPressureView.setTop(10);
            $.cholestrolView.setTop(10);
            $.glucoseView.setTop(10);
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.bloodPressureView.show();
            $.cholestrolView.show();
            $.glucoseView.show();
        } else {
            for (var a = 0; a < $.graphScrollView.children.length; a++) {
                var activityIndicator = createIndicator();
                $.graphScrollView.children[a].children[0].add(activityIndicator);
                activityIndicator.show();
            }
            $.bmiView.setHeight(Ti.UI.SIZE);
            $.heartRateView.setHeight(Ti.UI.SIZE);
            $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
            $.bloodPressureView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.glucoseView.setHeight(Ti.UI.SIZE);
            $.bmiView.setTop(10);
            $.heartRateView.setTop(10);
            $.bodyTemperatureView.setTop(10);
            $.bloodPressureView.setTop(10);
            $.cholestrolView.setTop(10);
            $.glucoseView.setTop(10);
            $.bmiView.show();
            $.bloodPressureView.show();
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.cholestrolView.show();
            $.glucoseView.show();
        }
    }
    function loadLatest(e) {
        var graph_view = children({
            name: "gType",
            value: e.gType
        }, $.graphScrollView);
        graph_view.children[2].children[1].text = e.text;
    }
    function graphLoaded(e) {
        var graph_view = children({
            name: "gType",
            value: e.id
        }, $.graphScrollView);
        graph_view.children[0].children[0].hide();
    }
    function populateDataById(e) {
        hd.loadInfo(e.id, "", "1");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/main";
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
    $.__views.myhealth = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "MY HEALTH RECORD",
        id: "myhealth",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.myhealth && $.addTopLevelView($.__views.myhealth);
<<<<<<< HEAD
    $.__views.__alloyId741 = Ti.UI.createView({
        id: "__alloyId741"
=======
    $.__views.__alloyId729 = Ti.UI.createView({
        id: "__alloyId729"
>>>>>>> origin/master
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: 0,
        id: "moreHealth",
        width: 30,
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId741.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId741;
    $.__views.__alloyId742 = Ti.UI.createView({
        id: "__alloyId742"
    });
    $.__views.myhealth.add($.__views.__alloyId742);
=======
    $.__views.__alloyId729.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId729;
    $.__views.__alloyId730 = Ti.UI.createView({
        id: "__alloyId730"
    });
    $.__views.myhealth.add($.__views.__alloyId730);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.__alloyId742.add($.__views.loadingBar);
=======
    $.__views.__alloyId730.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId743 = Ti.UI.createLabel({
=======
    $.__views.__alloyId731 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        text: "Loading",
<<<<<<< HEAD
        id: "__alloyId743"
    });
    $.__views.loadingBar.add($.__views.__alloyId743);
=======
        id: "__alloyId731"
    });
    $.__views.loadingBar.add($.__views.__alloyId731);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    $.__views.__alloyId742.add($.__views.main);
    $.__views.__alloyId744 = Ti.UI.createView({
=======
    $.__views.__alloyId730.add($.__views.main);
    $.__views.__alloyId732 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId744"
    });
    $.__views.main.add($.__views.__alloyId744);
    $.__views.__alloyId745 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId745"
    });
    $.__views.__alloyId744.add($.__views.__alloyId745);
=======
        id: "__alloyId732"
    });
    $.__views.main.add($.__views.__alloyId732);
    $.__views.__alloyId733 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId733"
    });
    $.__views.__alloyId732.add($.__views.__alloyId733);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId745.add($.__views.btnBack);
=======
    $.__views.__alloyId733.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
<<<<<<< HEAD
    $.__views.__alloyId744.add($.__views.pageTitle);
    $.__views.__alloyId746 = Ti.UI.createLabel({
=======
    $.__views.__alloyId732.add($.__views.pageTitle);
    $.__views.__alloyId734 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Health Info",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId746"
    });
    $.__views.pageTitle.add($.__views.__alloyId746);
    $.__views.__alloyId747 = Ti.UI.createView({
        width: "10%",
        id: "__alloyId747"
    });
    $.__views.__alloyId744.add($.__views.__alloyId747);
=======
        id: "__alloyId734"
    });
    $.__views.pageTitle.add($.__views.__alloyId734);
    $.__views.__alloyId735 = Ti.UI.createView({
        width: "10%",
        id: "__alloyId735"
    });
    $.__views.__alloyId732.add($.__views.__alloyId735);
>>>>>>> origin/master
    $.__views.moreHealth = Ti.UI.createImageView({
        id: "moreHealth",
        width: 30,
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId747.add($.__views.moreHealth);
=======
    $.__views.__alloyId735.add($.__views.moreHealth);
>>>>>>> origin/master
    $.__views.graphScrollView = Ti.UI.createScrollView({
        id: "graphScrollView",
        layout: "vertical",
        height: "auto",
        width: "100%",
        backgroundColor: "#EBEBEB",
        contentWidth: Ti.UI.FILL
    });
    $.__views.main.add($.__views.graphScrollView);
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        gType: 1,
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: 10,
        right: 10,
        top: 10,
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: false
    });
    $.__views.graphScrollView.add($.__views.bmiView);
    $.__views.bmiWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bmiWebView",
        height: 230,
        width: Ti.UI.FILL,
        url: "/html/bmi.html",
        disableBounce: true
    });
    $.__views.bmiView.add($.__views.bmiWebView);
<<<<<<< HEAD
    $.__views.__alloyId748 = Ti.UI.createView({
=======
    $.__views.__alloyId736 = Ti.UI.createView({
>>>>>>> origin/master
        height: 1,
        left: 10,
        right: 10,
        bottom: 0,
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId748"
    });
    $.__views.bmiView.add($.__views.__alloyId748);
    $.__views.__alloyId749 = Ti.UI.createView({
=======
        id: "__alloyId736"
    });
    $.__views.bmiView.add($.__views.__alloyId736);
    $.__views.__alloyId737 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
<<<<<<< HEAD
        id: "__alloyId749"
    });
    $.__views.bmiView.add($.__views.__alloyId749);
    $.__views.__alloyId750 = Ti.UI.createLabel({
=======
        id: "__alloyId737"
    });
    $.__views.bmiView.add($.__views.__alloyId737);
    $.__views.__alloyId738 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        text: "Latest",
        font: "fontSize: 12",
        left: 0,
<<<<<<< HEAD
        id: "__alloyId750"
    });
    $.__views.__alloyId749.add($.__views.__alloyId750);
=======
        id: "__alloyId738"
    });
    $.__views.__alloyId737.add($.__views.__alloyId738);
>>>>>>> origin/master
    $.__views.bmiDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: 0,
        id: "bmiDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId749.add($.__views.bmiDetailLabel);
=======
    $.__views.__alloyId737.add($.__views.bmiDetailLabel);
>>>>>>> origin/master
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        gType: 2,
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: 10,
        right: 10,
        top: 10,
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: false
    });
    $.__views.graphScrollView.add($.__views.bloodPressureView);
    $.__views.bloodPressureWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bloodPressureWebView",
        height: 230,
        width: Ti.UI.FILL,
        url: "/html/bloodPressure.html",
        disableBounce: true
    });
    $.__views.bloodPressureView.add($.__views.bloodPressureWebView);
<<<<<<< HEAD
    $.__views.__alloyId751 = Ti.UI.createView({
=======
    $.__views.__alloyId739 = Ti.UI.createView({
>>>>>>> origin/master
        height: 1,
        left: 10,
        right: 10,
        bottom: 0,
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId751"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId751);
    $.__views.__alloyId752 = Ti.UI.createView({
=======
        id: "__alloyId739"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId739);
    $.__views.__alloyId740 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
<<<<<<< HEAD
        id: "__alloyId752"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId752);
    $.__views.__alloyId753 = Ti.UI.createLabel({
=======
        id: "__alloyId740"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId740);
    $.__views.__alloyId741 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        text: "Latest",
        font: "fontSize: 12",
        left: 0,
<<<<<<< HEAD
        id: "__alloyId753"
    });
    $.__views.__alloyId752.add($.__views.__alloyId753);
=======
        id: "__alloyId741"
    });
    $.__views.__alloyId740.add($.__views.__alloyId741);
>>>>>>> origin/master
    $.__views.bloodPressureDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: 0,
        id: "bloodPressureDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId752.add($.__views.bloodPressureDetailLabel);
=======
    $.__views.__alloyId740.add($.__views.bloodPressureDetailLabel);
>>>>>>> origin/master
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        gType: 3,
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: 10,
        right: 10,
        top: 10,
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: false
    });
    $.__views.graphScrollView.add($.__views.heartRateView);
    $.__views.heartRateWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "heartRateWebView",
        height: 230,
        width: Ti.UI.FILL,
        url: "/html/heartRate.html",
        disableBounce: true
    });
    $.__views.heartRateView.add($.__views.heartRateWebView);
<<<<<<< HEAD
    $.__views.__alloyId754 = Ti.UI.createView({
=======
    $.__views.__alloyId742 = Ti.UI.createView({
>>>>>>> origin/master
        height: 1,
        left: 10,
        right: 10,
        bottom: 0,
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId754"
    });
    $.__views.heartRateView.add($.__views.__alloyId754);
    $.__views.__alloyId755 = Ti.UI.createView({
=======
        id: "__alloyId742"
    });
    $.__views.heartRateView.add($.__views.__alloyId742);
    $.__views.__alloyId743 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
<<<<<<< HEAD
        id: "__alloyId755"
    });
    $.__views.heartRateView.add($.__views.__alloyId755);
    $.__views.__alloyId756 = Ti.UI.createLabel({
=======
        id: "__alloyId743"
    });
    $.__views.heartRateView.add($.__views.__alloyId743);
    $.__views.__alloyId744 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        text: "Latest",
        font: "fontSize: 12",
        left: 0,
<<<<<<< HEAD
        id: "__alloyId756"
    });
    $.__views.__alloyId755.add($.__views.__alloyId756);
=======
        id: "__alloyId744"
    });
    $.__views.__alloyId743.add($.__views.__alloyId744);
>>>>>>> origin/master
    $.__views.heartRateDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: 0,
        id: "heartRateDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId755.add($.__views.heartRateDetailLabel);
=======
    $.__views.__alloyId743.add($.__views.heartRateDetailLabel);
>>>>>>> origin/master
    $.__views.glucoseView = Ti.UI.createView({
        id: "glucoseView",
        gType: 8,
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: 10,
        right: 10,
        top: 10,
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: false
    });
    $.__views.graphScrollView.add($.__views.glucoseView);
    $.__views.glucoseWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "glucoseWebView",
        height: 230,
        width: Ti.UI.FILL,
        url: "/html/glucose.html",
        disableBounce: true
    });
    $.__views.glucoseView.add($.__views.glucoseWebView);
<<<<<<< HEAD
    $.__views.__alloyId757 = Ti.UI.createView({
=======
    $.__views.__alloyId745 = Ti.UI.createView({
>>>>>>> origin/master
        height: 1,
        left: 10,
        right: 10,
        bottom: 0,
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId757"
    });
    $.__views.glucoseView.add($.__views.__alloyId757);
    $.__views.__alloyId758 = Ti.UI.createView({
=======
        id: "__alloyId745"
    });
    $.__views.glucoseView.add($.__views.__alloyId745);
    $.__views.__alloyId746 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
<<<<<<< HEAD
        id: "__alloyId758"
    });
    $.__views.glucoseView.add($.__views.__alloyId758);
    $.__views.__alloyId759 = Ti.UI.createLabel({
=======
        id: "__alloyId746"
    });
    $.__views.glucoseView.add($.__views.__alloyId746);
    $.__views.__alloyId747 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        text: "Latest",
        font: "fontSize: 12",
        left: 0,
<<<<<<< HEAD
        id: "__alloyId759"
    });
    $.__views.__alloyId758.add($.__views.__alloyId759);
=======
        id: "__alloyId747"
    });
    $.__views.__alloyId746.add($.__views.__alloyId747);
>>>>>>> origin/master
    $.__views.glucoseDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: 0,
        id: "glucoseDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId758.add($.__views.glucoseDetailLabel);
=======
    $.__views.__alloyId746.add($.__views.glucoseDetailLabel);
>>>>>>> origin/master
    $.__views.cholestrolView = Ti.UI.createView({
        id: "cholestrolView",
        gType: 7,
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: 10,
        right: 10,
        top: 10,
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: false
    });
    $.__views.graphScrollView.add($.__views.cholestrolView);
    $.__views.cholestrolWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "cholestrolWebView",
        height: 230,
        width: Ti.UI.FILL,
        url: "/html/cholestrol.html",
        disableBounce: true
    });
    $.__views.cholestrolView.add($.__views.cholestrolWebView);
<<<<<<< HEAD
    $.__views.__alloyId760 = Ti.UI.createView({
=======
    $.__views.__alloyId748 = Ti.UI.createView({
>>>>>>> origin/master
        height: 1,
        left: 10,
        right: 10,
        bottom: 0,
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId760"
    });
    $.__views.cholestrolView.add($.__views.__alloyId760);
    $.__views.__alloyId761 = Ti.UI.createView({
=======
        id: "__alloyId748"
    });
    $.__views.cholestrolView.add($.__views.__alloyId748);
    $.__views.__alloyId749 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
<<<<<<< HEAD
        id: "__alloyId761"
    });
    $.__views.cholestrolView.add($.__views.__alloyId761);
    $.__views.__alloyId762 = Ti.UI.createLabel({
=======
        id: "__alloyId749"
    });
    $.__views.cholestrolView.add($.__views.__alloyId749);
    $.__views.__alloyId750 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        text: "Latest",
        font: "fontSize: 12",
        left: 0,
<<<<<<< HEAD
        id: "__alloyId762"
    });
    $.__views.__alloyId761.add($.__views.__alloyId762);
=======
        id: "__alloyId750"
    });
    $.__views.__alloyId749.add($.__views.__alloyId750);
>>>>>>> origin/master
    $.__views.cholestrolDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: 0,
        id: "cholestrolDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId761.add($.__views.cholestrolDetailLabel);
=======
    $.__views.__alloyId749.add($.__views.cholestrolDetailLabel);
>>>>>>> origin/master
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        gType: 4,
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: 10,
        right: 10,
        top: 10,
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: false
    });
    $.__views.graphScrollView.add($.__views.bodyTemperatureView);
    $.__views.bodyTemperatureWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bodyTemperatureWebView",
        height: 230,
        width: Ti.UI.FILL,
        url: "/html/bodyTemperature.html",
        disableBounce: true
    });
    $.__views.bodyTemperatureView.add($.__views.bodyTemperatureWebView);
<<<<<<< HEAD
    $.__views.__alloyId763 = Ti.UI.createView({
=======
    $.__views.__alloyId751 = Ti.UI.createView({
>>>>>>> origin/master
        height: 1,
        left: 10,
        right: 10,
        bottom: 0,
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId763"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId763);
    $.__views.__alloyId764 = Ti.UI.createView({
=======
        id: "__alloyId751"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId751);
    $.__views.__alloyId752 = Ti.UI.createView({
>>>>>>> origin/master
        height: Ti.UI.SIZE,
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
<<<<<<< HEAD
        id: "__alloyId764"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId764);
    $.__views.__alloyId765 = Ti.UI.createLabel({
=======
        id: "__alloyId752"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId752);
    $.__views.__alloyId753 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        text: "Latest",
        font: "fontSize: 12",
        left: 0,
<<<<<<< HEAD
        id: "__alloyId765"
    });
    $.__views.__alloyId764.add($.__views.__alloyId765);
=======
        id: "__alloyId753"
    });
    $.__views.__alloyId752.add($.__views.__alloyId753);
>>>>>>> origin/master
    $.__views.bodyTempDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: 0,
        id: "bodyTempDetailLabel"
    });
<<<<<<< HEAD
    $.__views.__alloyId764.add($.__views.bodyTempDetailLabel);
=======
    $.__views.__alloyId752.add($.__views.bodyTempDetailLabel);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.category || "";
    var nav = require("navigation");
    var hd = require("healthData");
    common.construct($);
    hd.construct($);
    Ti.App.addEventListener("filterList", filterList);
    Ti.App.addEventListener("loadLatest", loadLatest);
    Ti.App.addEventListener("graphLoaded", graphLoaded);
    Ti.App.addEventListener("populateDataById", populateDataById);
    filterList({
        category: "all"
    });
    $.bmiView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 1
        });
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 2
        });
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 3
        });
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 4
        });
    });
    $.bmiWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.bloodPressureWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.heartRateWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.bodyTemperatureWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.cholestrolWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.glucoseWebView.addEventListener("load", function(e) {
        e.source.evalJS("document.height;");
    });
    $.cholestrolView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 7
        });
    });
    $.glucoseView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 8
        });
    });
    $.moreHealth.addEventListener("click", function() {
        var dialog = Ti.UI.createOptionDialog({
            cancel: 3,
            options: [ "Me", "Body Measurement", "Vitals", "Cancel" ],
            title: "More"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            0 == e.index ? nav.navigationWindow("myHealth/profile") : 1 == e.index ? Ti.App.fireEvent("filterList", {
                category: "measurement"
            }) : 2 == e.index && Ti.App.fireEvent("filterList", {
                category: "vitals"
            });
        });
    });
    $.myhealth.addEventListener("close", function() {
        Ti.App.removeEventListener("filterList", filterList);
        Ti.App.removeEventListener("populateDataById", populateDataById);
        Ti.App.removeEventListener("loadLatest", loadLatest);
        Ti.App.removeEventListener("graphLoaded", graphLoaded);
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myhealth);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
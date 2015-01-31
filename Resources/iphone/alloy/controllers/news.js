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
        fullscreen: true,
        title: "Bone Health for Life",
        backButtonTitle: "",
        id: "news",
        navTintColor: "#CE1D1C"
    });
    $.__views.news && $.addTopLevelView($.__views.news);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "main"
    });
    $.__views.news.add($.__views.main);
    var __alloyId195 = [];
    $.__views.__alloyId196 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
        id: "__alloyId196"
    });
    __alloyId195.push($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
        id: "__alloyId197"
    });
<<<<<<< HEAD
    $.__views.__alloyId187.add($.__views.__alloyId188);
    $.__views.pic = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        id: "pic",
        image: "/images/bone-health-thumb.png"
    });
    $.__views.__alloyId187.add($.__views.pic);
    $.__views.__alloyId189 = Ti.UI.createLabel({
=======
    $.__views.__alloyId196.add($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId198"
    });
    $.__views.__alloyId196.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId189"
    });
    $.__views.__alloyId187.add($.__views.__alloyId189);
    $.__views.__alloyId190 = Ti.UI.createLabel({
=======
        id: "__alloyId199"
    });
    $.__views.__alloyId196.add($.__views.__alloyId199);
    $.__views.__alloyId200 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
<<<<<<< HEAD
        id: "__alloyId190"
    });
    $.__views.__alloyId187.add($.__views.__alloyId190);
    $.__views.__alloyId191 = Ti.UI.createLabel({
=======
        id: "__alloyId200"
    });
    $.__views.__alloyId196.add($.__views.__alloyId200);
    $.__views.__alloyId201 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
<<<<<<< HEAD
        id: "__alloyId191"
    });
    $.__views.__alloyId187.add($.__views.__alloyId191);
    $.__views.__alloyId192 = Ti.UI.createLabel({
=======
        id: "__alloyId201"
    });
    $.__views.__alloyId196.add($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
<<<<<<< HEAD
        id: "__alloyId192"
    });
    $.__views.__alloyId187.add($.__views.__alloyId192);
    $.__views.__alloyId193 = Ti.UI.createScrollView({
=======
        id: "__alloyId202"
    });
    $.__views.__alloyId196.add($.__views.__alloyId202);
    $.__views.__alloyId203 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId193"
    });
    __alloyId186.push($.__views.__alloyId193);
    $.__views.__alloyId194 = Ti.UI.createLabel({
=======
        id: "__alloyId203"
    });
    __alloyId195.push($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
<<<<<<< HEAD
        id: "__alloyId194"
    });
    $.__views.__alloyId193.add($.__views.__alloyId194);
    $.__views.__alloyId195 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId195"
    });
    $.__views.__alloyId193.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createLabel({
=======
        id: "__alloyId204"
    });
    $.__views.__alloyId203.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId205"
    });
    $.__views.__alloyId203.add($.__views.__alloyId205);
    $.__views.__alloyId206 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId196"
    });
    $.__views.__alloyId193.add($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createLabel({
=======
        id: "__alloyId206"
    });
    $.__views.__alloyId203.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
<<<<<<< HEAD
        id: "__alloyId197"
    });
    $.__views.__alloyId193.add($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createLabel({
=======
        id: "__alloyId207"
    });
    $.__views.__alloyId203.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
<<<<<<< HEAD
        id: "__alloyId198"
    });
    $.__views.__alloyId193.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createLabel({
=======
        id: "__alloyId208"
    });
    $.__views.__alloyId203.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
<<<<<<< HEAD
        id: "__alloyId199"
    });
    $.__views.__alloyId193.add($.__views.__alloyId199);
    $.__views.__alloyId200 = Ti.UI.createScrollView({
=======
        id: "__alloyId209"
    });
    $.__views.__alloyId203.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId200"
    });
    __alloyId186.push($.__views.__alloyId200);
    $.__views.__alloyId201 = Ti.UI.createLabel({
=======
        id: "__alloyId210"
    });
    __alloyId195.push($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
<<<<<<< HEAD
        id: "__alloyId201"
    });
    $.__views.__alloyId200.add($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId202"
    });
    $.__views.__alloyId200.add($.__views.__alloyId202);
    $.__views.__alloyId203 = Ti.UI.createLabel({
=======
        id: "__alloyId211"
    });
    $.__views.__alloyId210.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId212"
    });
    $.__views.__alloyId210.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId203"
    });
    $.__views.__alloyId200.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createLabel({
=======
        id: "__alloyId213"
    });
    $.__views.__alloyId210.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
<<<<<<< HEAD
        id: "__alloyId204"
    });
    $.__views.__alloyId200.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createLabel({
=======
        id: "__alloyId214"
    });
    $.__views.__alloyId210.add($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
<<<<<<< HEAD
        id: "__alloyId205"
    });
    $.__views.__alloyId200.add($.__views.__alloyId205);
    $.__views.__alloyId206 = Ti.UI.createLabel({
=======
        id: "__alloyId215"
    });
    $.__views.__alloyId210.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
<<<<<<< HEAD
        id: "__alloyId206"
    });
    $.__views.__alloyId200.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createScrollView({
=======
        id: "__alloyId216"
    });
    $.__views.__alloyId210.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId207"
    });
    __alloyId186.push($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createLabel({
=======
        id: "__alloyId217"
    });
    __alloyId195.push($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
<<<<<<< HEAD
        id: "__alloyId208"
    });
    $.__views.__alloyId207.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId209"
    });
    $.__views.__alloyId207.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createLabel({
=======
        id: "__alloyId218"
    });
    $.__views.__alloyId217.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId219"
    });
    $.__views.__alloyId217.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId210"
    });
    $.__views.__alloyId207.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createLabel({
=======
        id: "__alloyId220"
    });
    $.__views.__alloyId217.add($.__views.__alloyId220);
    $.__views.__alloyId221 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
<<<<<<< HEAD
        id: "__alloyId211"
    });
    $.__views.__alloyId207.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createLabel({
=======
        id: "__alloyId221"
    });
    $.__views.__alloyId217.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
<<<<<<< HEAD
        id: "__alloyId212"
    });
    $.__views.__alloyId207.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createLabel({
=======
        id: "__alloyId222"
    });
    $.__views.__alloyId217.add($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
<<<<<<< HEAD
        id: "__alloyId213"
    });
    $.__views.__alloyId207.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createScrollView({
=======
        id: "__alloyId223"
    });
    $.__views.__alloyId217.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId214"
    });
    __alloyId186.push($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createLabel({
=======
        id: "__alloyId224"
    });
    __alloyId195.push($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
<<<<<<< HEAD
        id: "__alloyId215"
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId216"
    });
    $.__views.__alloyId214.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createLabel({
=======
        id: "__alloyId225"
    });
    $.__views.__alloyId224.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId226"
    });
    $.__views.__alloyId224.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId217"
    });
    $.__views.__alloyId214.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createLabel({
=======
        id: "__alloyId227"
    });
    $.__views.__alloyId224.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
<<<<<<< HEAD
        id: "__alloyId218"
    });
    $.__views.__alloyId214.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createLabel({
=======
        id: "__alloyId228"
    });
    $.__views.__alloyId224.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
<<<<<<< HEAD
        id: "__alloyId219"
    });
    $.__views.__alloyId214.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
=======
        id: "__alloyId229"
    });
    $.__views.__alloyId224.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
<<<<<<< HEAD
        id: "__alloyId220"
    });
    $.__views.__alloyId214.add($.__views.__alloyId220);
    $.__views.__alloyId185 = Ti.UI.createScrollableView({
        views: __alloyId186,
=======
        id: "__alloyId230"
    });
    $.__views.__alloyId224.add($.__views.__alloyId230);
    $.__views.__alloyId194 = Ti.UI.createScrollableView({
        views: __alloyId195,
>>>>>>> FETCH_HEAD
        showPagingControl: "true",
        id: "__alloyId194"
    });
    $.__views.main.add($.__views.__alloyId194);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var title = args.title;
    $.news.title = title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
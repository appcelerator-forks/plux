var MediaPickerModule = require("ti.mediapicker");

var warned = false;

var _env = {};

_env.iOS = false;

_env.ldf = _env.iOS ? 1 : Ti.Platform.displayCaps.logicalDensityFactor;

_env.android = !_env.iOS;

_env.iOS7 = _env.iOS && parseInt(Ti.Platform.version.split(".")[0], 10) >= 7, _env.width = function() {
    return Ti.Platform.displayCaps.platformWidth / this.ldf;
};

_env.height = function() {
    return Ti.Platform.displayCaps.platformHeight / this.ldf;
};

var _nav = {
    stack: [],
    init: function() {
        this.orientation = Ti.UI.orientation;
    },
    open: function(win) {
        win.orientationModes = this.orientation;
        this.stack.push(win);
        if (_env.android) win.open(); else if (1 == this.stack.length) {
            this.navGroup = Ti.UI.iOS.createNavigationWindow({
                window: win
            });
            this.navGroup.open();
        } else this.navGroup.openWindow(win);
    },
    closeAll: function() {
        if (_env.iOS) this.navGroup.close(); else for (var i = this.stack.length - 1; i >= 0; i--) this.stack[i].close();
        this.stack = [];
    }
};

var _config = {
    size: 96,
    dpi_warning: 1024
};

var _lang = {
    photos: "Images",
    videos: "Videos"
};

var Element = function(type, options) {
    this.element = Ti.UI["create" + type](options);
    return this;
};

Element.prototype.addClick = function(fn) {
    this.element.addEventListener("click", fn);
    return this;
};

Element.prototype.addTo = function(to) {
    to.add(this.element);
    return this;
};

exports.MediaPicker = function() {
    return this;
};

exports.MediaPicker.prototype.show = function(cb, max, type, message) {
    function findUrl(url) {
        for (var i = selectedItems.length - 1; i >= 0; i--) if (url == selectedItems[i].url) return i;
        return -1;
    }
    function createIV(row, i) {
        var toAdd = assets[row];
        var iv = Ti.UI.createImageView({
            image: _env.iOS ? "images/no_media.png" : null,
            top: _env.iOS ? 4 : 4 + row * (_size + 4),
            left: 4 + i % perrow * (_size + 4),
            width: _size,
            height: _size,
            assetUrl: toAdd[i].url,
            id: toAdd[i].id,
            row: row,
            i: i
        });
        toAdd[i].iv = iv;
        iv.addEventListener(_env.iOS ? "singletap" : "click", function(e) {
            if (e.source.longpress) {
                e.source.longpress = false;
                return;
            }
            var iv = e.source;
            if (e.source.overlay) {
                e.source.overlay.image = null;
                e.source.getParent().remove(e.source.overlay);
                e.source.overlay = null;
                var pos = findUrl(iv.assetUrl);
                pos >= 0 && selectedItems.splice(pos, 1);
            } else {
                if (1 == max && selectedItems.length > 0) {
                    for (var i = 0; i < selectedItems.length; i++) {
                        var obj = selectedItems[i];
                        var source = assets[obj.row][obj.i].iv;
                        source.overlay.image = null;
                        source.getParent().remove(source.overlay);
                        source.overlay = null;
                    }
                    selectedItems = [];
                } else if (max && selectedItems.length == max) {
                    alert("Maximum number of images selected!");
                    return;
                }
                addOverlay(e.source);
                selectedItems.push({
                    url: iv.assetUrl,
                    id: iv.id,
                    row: iv.row,
                    i: iv.i,
                    metadata: assets[iv.row][iv.i].metadata
                });
            }
            0 == selectedItems.length ? done.setTitle("OK") : done.setTitle("OK (" + selectedItems.length + ")");
        });
        iv.addEventListener("longpress", function(e) {
            e.source.longpress = true;
            if ("videos" == type) {
                var win_video = Ti.UI.createWindow({
                    title: "Video"
                });
                var button = new Element("Button", {
                    title: "Back"
                }).addClick(function() {
                    activeMovie.stop();
                    activeMovie.release();
                    activeMovie = null;
                    win_video.close();
                }).element;
                win_video.setLeftNavButton(button);
                var activeMovie = Ti.Media.createVideoPlayer({
                    backgroundColor: "#000",
                    mediaControlStyle: Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
                    scalingMode: Ti.Media.VIDEO_SCALING_ASPECT_FIT,
                    autoplay: true,
                    top: 0,
                    left: 0,
                    width: Ti.UI.FILL,
                    height: Ti.UI.FILL
                });
                var iv = e.source;
                _env.iOS ? activeMovie.media = assets[iv.row][iv.i].url : activeMovie.url = "file://" + assets[iv.row][iv.i].url;
                activeMovie.addEventListener("complete", function(e) {
                    if (e.reason == Ti.Media.VIDEO_FINISH_REASON_USER_EXITED && activeMovie) {
                        activeMovie.stop();
                        activeMovie.release();
                        activeMovie = null;
                        win_video.close();
                    }
                });
                win_video.add(activeMovie);
                win_video.open({
                    fullscreen: true,
                    barColor: "black"
                });
            } else !function(key, id) {
                that.getImageByURL({
                    key: key,
                    id: id,
                    success: function(res) {
                        var ar = res.width / res.height;
                        var screen_ar = _env.width() / _env.height(true);
                        if (ar >= screen_ar) {
                            var width = _env.width();
                            var height = width / ar;
                        } else {
                            var height = _env.height(true);
                            var width = height * ar;
                        }
                        var view = Ti.UI.createView({
                            width: Ti.UI.FILL,
                            height: Ti.UI.FILL,
                            backgroundColor: "#000"
                        });
                        var imageView = Ti.UI.createImageView({
                            image: "Ti.Blob" == res.image.apiName ? res.image : "file://" + res.image,
                            width: width,
                            height: height,
                            touchEnabled: false
                        });
                        view.addEventListener("click", function() {
                            win_assets.remove(view);
                            imageView = null;
                            view = null;
                        });
                        view.add(imageView);
                        win_assets.add(view);
                    }
                });
            }(this.assetUrl, this.id);
        });
        return iv;
    }
    function setMetadata(row, i) {
        var r = _env.iOS ? rows[row] : grid;
        var ass = assets[row][i];
        var iv = ass.iv;
        var md = ass.metadata;
        if (md.width) {
            var landscape = md.width > md.height;
            r.add(Ti.UI.createView({
                top: iv.top + 5,
                left: iv.left + 5,
                width: landscape ? 12 : 8,
                height: landscape ? 8 : 12,
                backgroundColor: "#cccccc",
                touchEnabled: false,
                zIndex: 999
            }));
            if ("photos" == type && _config.dpi_warning && Math.min(md.width, md.height) < _config.dpi_warning) {
                iv.dpi = true;
                r.add(Ti.UI.createImageView({
                    image: "images/warning.png",
                    width: 16,
                    height: 16,
                    top: iv.top + 5,
                    left: iv.left + _size - 21,
                    touchEnabled: false
                }));
            }
            if ("videos" == type && md.duration) {
                var sec = Math.round(md.duration % 60);
                var min = Math.floor(md.duration / 60);
                r.add(Ti.UI.createLabel({
                    text: min + ":" + (10 > sec ? "0" : "") + sec,
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: "#000",
                    opacity: .75,
                    height: 15,
                    width: _size / 2,
                    font: {
                        fontFamily: "Helvetica Neue",
                        fontSize: 12,
                        fontWeight: "bold"
                    },
                    top: iv.top + _size - 15,
                    left: iv.left,
                    touchEnabled: false
                }));
            }
        }
        var pos = findUrl(ass.url);
        pos >= 0 && addOverlay(iv);
    }
    function addOverlay(iv) {
        iv.overlay = Ti.UI.createImageView({
            image: "images/overlay.png",
            left: iv.left,
            top: iv.top,
            touchEnabled: false,
            width: _size,
            height: _size
        });
        iv.getParent().add(iv.overlay);
    }
    function setMessage(w, m) {
        var lbl = Ti.UI.createLabel({
            text: "  " + m,
            color: "#ffffff",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            left: 0,
            height: 15,
            width: Ti.UI.FILL,
            top: 0,
            backgroundColor: "#052c6d"
        });
        w.add(lbl);
    }
    var that = this;
    var _size = _config.size;
    this.callbackFN = cb;
    var rowsPerScreen, perrow;
    var assets = [];
    var win_assetGroups = new Element("Window", {
        title: _lang[type],
        backgroundColor: "#fff"
    }).element;
    var win_assets;
    var grid;
    var loaded_rows = 0;
    var to = false;
    var queue = 0;
    var lazy = [];
    var selectedItems = [];
    var message = "string" == typeof message ? message : false;
    var doneFn = function() {
        _nav.closeAll();
        that.callbackFN && that.callbackFN(selectedItems);
    };
    var done = new Element("Button", {
        title: "OK",
        bottom: 0,
        right: 0,
        zIndex: 99
    }).addClick(doneFn).element;
    _env.iOS && win_assetGroups.setRightNavButton(done);
    var cancel = new Element("Button", {
        title: "Cancel",
        bottom: 0,
        left: 0,
        zIndex: 99
    }).addClick(function() {
        _nav.closeAll();
    }).element;
    _env.iOS ? win_assetGroups.setLeftNavButton(cancel) : win_assetGroups.add(cancel);
    var gotAssetGroups = function(e) {
        var data = [];
        var nr = 0;
        for (var key in e.items) {
            var obj = e.items[key];
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                height: 55,
                caption: obj.name,
                width: Ti.UI.FILL,
                layout: "horizontal",
                cnt: obj.count,
                nr: _env.iOS ? nr : key
            });
            new Element("ImageView", {
                image: obj.count ? obj.image : "images/no_media.png",
                width: 55,
                height: 55,
                left: 0
            }).addTo(row);
            new Element("Label", {
                text: obj.name,
                font: {
                    fontFamily: "Helvetica Neue",
                    fontSize: 16,
                    fontWeight: "bold"
                },
                color: "#000",
                height: 55,
                left: 10,
                top: 0
            }).addTo(row);
            new Element("Label", {
                text: " (" + obj.count + ")",
                font: {
                    fontFamily: "Helvetica Neue",
                    fontSize: 16
                },
                color: "#000",
                height: 55,
                left: 5,
                top: 0
            }).addTo(row);
            data.push(row);
            nr++;
        }
        new Element("TableView", {
            top: message ? 15 : 0,
            data: data
        }).addClick(function(e) {
            rowsPerScreen = Math.floor(_env.height() / (_size + 4));
            perrow = Math.floor(_env.width() / (_size + 4));
            assets = null;
            win_assets = new Element("Window", {
                title: e.rowData.caption
            }).element;
            MediaPickerModule.getPhotos({
                nr: e.rowData.nr,
                type: type,
                success: gotAssets
            });
        }).addTo(win_assetGroups);
        message && setMessage(win_assetGroups, message);
    };
    var gotAssets = function(e) {
        rows = [];
        lastRow = false;
        assets = [];
        for (var i = e.items.length - 1, j = 0; i >= 0; i--) {
            var rownr = Math.floor(j / perrow);
            j++;
            assets[rownr] || (assets[rownr] = []);
            var metadata = {};
            e.items[i].width && (metadata = {
                width: e.items[i].width,
                height: e.items[i].height
            });
            e.items[i].duration && (metadata.duration = e.items[i].duration);
            assets[rownr].push({
                id: e.items[i].id,
                url: e.items[i].url,
                metadata: metadata
            });
        }
        var len = assets.length;
        if (_env.iOS) {
            var data = [];
            for (var i = 0; 2 * rowsPerScreen > i; i++) data.push(addRow(true));
            grid = Ti.UI.createTableView({
                h: 0,
                y: 0,
                top: message ? 15 : 0,
                separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
                allowsSelection: false,
                data: data
            });
        } else grid = Ti.UI.createScrollView({
            top: message ? 15 : 0,
            contentWidth: "auto",
            contentHeight: len * (_size + 4) * _env.ldf,
            showVerticalScrollIndicator: true,
            showHorizontalScrollIndicator: false
        });
        var firstRow = -1;
        grid.addEventListener("scroll", function(e) {
            if (_env.iOS) {
                this.y = e.contentOffset.y;
                rows.length * (_size + 4) - this.y - _env.height() <= _size + 4 && addRow();
                return;
            }
            var row = Math.floor(e.y / _env.ldf / (_size + 4));
            if (row != firstRow) {
                for (var i = 0; rowsPerScreen + 2 >= i; i++) {
                    var check = row + i;
                    if (!rows[check] && len > check && check >= 0) {
                        lazy.push(check);
                        loaded_rows++;
                        rows[check] = true;
                        if (lazy.length > 8) {
                            var job = lazy.splice(0, 1)[0];
                            rows[job] = false;
                            loaded_rows--;
                        }
                    }
                }
                if ("photos" == type && loaded_rows > 2 * rowsPerScreen) for (var i = 0; i < rows.length; i++) if (true === rows[i] && (row > i || i > row + rowsPerScreen + 5)) {
                    rows[i] = false;
                    loaded_rows--;
                    for (var j = 0; j < assets[i].length; j++) {
                        var iv = assets[i][j].iv;
                        if (!iv) continue;
                        iv.setImage("images/no_media.png");
                    }
                }
                firstRow = row;
            }
        });
        message && setMessage(win_assets, message);
        win_assets.add(grid);
        win_assets.addEventListener("close", function() {
            lazy = [];
            clearTimeout(to);
            for (var i = 0; i < assets.length; i++) for (var j = 0; j < assets[i].length; j++) {
                var iv = assets[i][j].iv;
                if (!iv) continue;
                iv.image = null;
                _env.iOS ? rows[iv.row].remove(iv) : grid.remove(iv);
                iv = null;
            }
            win_assets.remove(grid);
            grid = null;
        });
        _nav.open(win_assets);
        _env.iOS ? win_assets.setRightNavButton(done) : win_assets.add(done);
        _env.iOS || grid.fireEvent("scroll", {
            y: 0
        });
        lazyLoad();
    };
    var rows = [];
    var lastRow = false;
    var addRow = function(ret) {
        var toAdd = assets[rows.length];
        if (!toAdd) return false;
        var row = Ti.UI.createTableViewRow({
            height: _size + 4
        });
        var fastScroll = new Date().getTime() - lastRow < 100 && rows.length > 2 * rowsPerScreen;
        if (fastScroll) {
            grid.fastScroll = fastScroll;
            clearTimeout(to);
            to = setTimeout(lazyLoad, 600);
        }
        lastRow = new Date().getTime();
        lazy.push(rows.length);
        rows.push(row);
        for (var i = 0; i < toAdd.length; i++) {
            var iv = createIV(rows.length - 1, i);
            row.add(iv);
        }
        if (ret) return row;
        grid.appendRow(row);
    };
    var loadImages = function(row, lzy) {
        var toAdd = assets[row];
        if (!toAdd) return false;
        for (var i = 0; i < toAdd.length; i++) {
            if (toAdd[i].iv) {
                if (_env.android) {
                    toAdd[i].iv.setImage(toAdd[i].iv.path);
                    queue || !lzy || grid.fastScroll || lazyLoad();
                    continue;
                }
                var iv = toAdd[i].iv;
            } else {
                var iv = createIV(row, i);
                _env.iOS ? rows[row].add(iv) : grid.add(iv);
            }
            if (_env.android) {
                var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, iv.id + ".png_");
                if (file.exists()) {
                    iv.path = file.nativePath;
                    iv.setImage(file.nativePath);
                    file = null;
                    queue || !lzy || grid.fastScroll || lazyLoad();
                    setMetadata(iv.row, iv.i);
                    continue;
                }
            }
            queue++;
            !function(iv, lzy) {
                MediaPickerModule.getThumb({
                    url: _env.android && "photos" == type ? iv.id : iv.assetUrl,
                    success: function(e) {
                        queue--;
                        if (!e.image) return;
                        if (_env.android && "Ti.Blob" != e.image.apiName) {
                            var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, iv.id + ".png_");
                            var file2 = Ti.Filesystem.getFile("file://" + e.image);
                            var blob = file2.read();
                            var ar = blob.width / blob.height;
                            blob = 1 > ar ? blob.imageAsResized(_size, _size / ar).imageAsCropped({
                                width: _size,
                                height: _size,
                                x: 0,
                                y: (_size / ar - _size) / 2
                            }) : blob.imageAsResized(_size * ar, _size).imageAsCropped({
                                width: _size,
                                height: _size,
                                x: (_size * ar - _size) / 2,
                                y: 0
                            });
                            file.write(blob);
                            iv.path = file.nativePath;
                            iv.setImage(file.nativePath);
                            file = null;
                            file2 = null;
                            blob = null;
                        } else {
                            if (e.width && !assets[iv.row][iv.i].metadata.width) {
                                assets[iv.row][iv.i].metadata = {
                                    width: e.width,
                                    height: e.height
                                };
                                e.duration && (assets[iv.row][iv.i].metadata.duration = e.duration);
                            }
                            e.size && (assets[iv.row][iv.i].metadata.size = e.size);
                            iv.setImage(e.image);
                        }
                        setMetadata(iv.row, iv.i);
                        queue || !lzy || grid.fastScroll || lazyLoad();
                    }
                });
            }(iv, lzy);
        }
    };
    var lazyLoad = function() {
        clearTimeout(to);
        grid && (grid.fastScroll = false);
        if (!lazy.length) {
            to = setTimeout(lazyLoad, 600);
            return;
        }
        var job = lazy.splice(lazy.length > 1 ? -2 : -1, 1)[0];
        loadImages(job, true);
    };
    MediaPickerModule.getAssetGroups({
        type: type || "photos",
        success: gotAssetGroups,
        error: function() {
            alert("Bitte erlauben Sie den Zugriff auf Fotos unter Einstellungen->Datenschutz");
        }
    });
    _nav.open(win_assetGroups);
};

exports.MediaPicker.prototype.getImageByURL = function(opt) {
    if (_env.iOS) MediaPickerModule.getImageByURL(opt); else {
        var payload = opt.payload || {};
        opt.payload && delete opt.payload;
        MediaPickerModule.getImageByURL(opt, payload);
    }
};
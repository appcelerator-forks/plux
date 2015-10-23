var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            member_no: "TEXT",
            subject: "TEXT",
            message: "TEXT",
            url: "TEXT",
            expired: "TEXT",
            isRead: "TEXT",
            created: "TEXT",
            updated: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "notification"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            addColumn: function(newFieldName, colSpec) {
                var collection = this;
                var db = Ti.Database.open(collection.config.adapter.db_name);
                var fieldExists = false;
                resultSet = db.execute("PRAGMA TABLE_INFO(" + collection.config.adapter.collection_name + ")");
                while (resultSet.isValidRow()) {
                    resultSet.field(1) == newFieldName && (fieldExists = true);
                    resultSet.next();
                }
                fieldExists || db.execute("ALTER TABLE " + collection.config.adapter.collection_name + " ADD COLUMN " + newFieldName + " " + colSpec);
                db.close();
            },
            getList: function(e) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE member_no='" + e.member_no + "' and (expired !='' OR expired <='" + currentDateTime() + "') ";
                var res = db.execute(sql);
                var listArr = [];
                var count = 0;
                while (res.isValidRow()) {
                    listArr[count] = {
                        id: res.fieldByName("id"),
                        member_no: res.fieldByName("member_no"),
                        subject: res.fieldByName("subject"),
                        message: res.fieldByName("message"),
                        url: res.fieldByName("url"),
                        isRead: res.fieldByName("isRead"),
                        expired: res.fieldByName("expired"),
                        created: res.fieldByName("created"),
                        updated: res.fieldByName("updated")
                    };
                    res.next();
                    count++;
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            getCountUnread: function(e) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT COUNT(*) AS total FROM " + collection.config.adapter.collection_name + " WHERE member_no='" + e.member_no + "' and isRead='0' and (expired !='' OR expired <='" + currentDateTime + "') ";
                var res = db.execute(sql);
                var listArr;
                while (res.isValidRow()) {
                    listArr = {
                        total: res.fieldByName("total")
                    };
                    res.next();
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            setAllAsRead: function(e) {
                var collection = this;
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE member_no='" + e.member_no + "' and isRead='0' ";
                var res = db.execute(sql);
                var listArr;
                while (res.isValidRow()) {
                    sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET isRead=1 WHERE id='" + res.fieldByName("id") + "' ";
                    db.execute(sql_query);
                    res.next();
                }
                res.close();
                db.close();
                collection.trigger("sync");
                return listArr;
            },
            addData: function(entry) {
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" + entry.id + "' ";
                var sql_query = "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
                sql_query = res.isValidRow() ? "UPDATE " + collection.config.adapter.collection_name + " SET member_no='" + entry.member_no + "', subject='" + entry.subject + "', message='" + entry.message + "' , url='" + entry.url + "' ,  expired='" + entry.expired + "', updated='" + entry.updated + "' WHERE id='" + entry.id + "' " : "INSERT INTO " + collection.config.adapter.collection_name + "(id, member_no, subject, message, url,isRead, expired,created,updated) VALUES ('" + entry.id + "', '" + entry.member_no + "','" + entry.subject + "','" + entry.message + "','" + entry.url + "', '" + entry.isRead + "', '" + entry.expired + "', '" + entry.created + "', '" + entry.updated + "')";
                db.execute(sql_query);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("notification", exports.definition, []);

collection = Alloy.C("notification", exports.definition, model);

exports.Model = model;

exports.Collection = collection;
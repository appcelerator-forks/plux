

exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "member_no": "TEXT",
		    "subject": "TEXT",
		    "message" : "TEXT",
		    "url" : "TEXT", 
		    "expired" : "TEXT",
		    "isRead" : "TEXT",
		    "created" : "TEXT",
		    "updated" : "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "notification"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			addColumn : function( newFieldName, colSpec) {
				var collection = this;
				var db = Ti.Database.open(collection.config.adapter.db_name);
				if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
				var fieldExists = false;
				resultSet = db.execute('PRAGMA TABLE_INFO(' + collection.config.adapter.collection_name + ')');
				while (resultSet.isValidRow()) {
					if(resultSet.field(1)==newFieldName) {
						fieldExists = true;
					}
					resultSet.next();
				}
			 	if(!fieldExists) { 
					db.execute('ALTER TABLE ' + collection.config.adapter.collection_name + ' ADD COLUMN '+newFieldName + ' ' + colSpec);
				}
				db.close();
			},
			getList : function(e){
				var collection = this;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE member_no='"+e.member_no+"' " ;
              
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                 
                while (res.isValidRow()){ 
					listArr[count] = {
					    id: res.fieldByName('id'),
					    member_no: res.fieldByName('member_no'),
					    subject: res.fieldByName('subject'),
					    message: res.fieldByName('message'),
					    url: res.fieldByName('url'), 
					    isRead: res.fieldByName('isRead'),
					    expired: res.fieldByName('expired'), 
					    created: res.fieldByName('created'), 
					    updated: res.fieldByName('updated')
					}; 
					res.next();
					count++;
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getCountUnread : function(e){
				var collection = this;
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                var sql = "SELECT COUNT(*) AS total FROM " + collection.config.adapter.collection_name + " WHERE member_no='"+e.member_no+"' and isRead='0' " ;
               
                var res = db.execute(sql);
                var listArr;
                while (res.isValidRow()){
					listArr = { 
					    total: res.fieldByName('total')  
					};
					res.next();
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			}, 
			addData : function(entry) {
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name + " WHERE id='" +entry.id+"' ";
                var sql_query =  "";
                db = Ti.Database.open(collection.config.adapter.db_name);
                var res = db.execute(sql);
             
                if (res.isValidRow()){
             		sql_query = "UPDATE " + collection.config.adapter.collection_name + " SET subject='"+entry.subject+"', message='"+entry.message+"' , url='"+entry.url+"' , isRead='"+entry.isRead+"', expired='"+entry.expired+"', updated='"+entry.updated+"' WHERE id='" +entry.id+"' ";
                }else{
                	sql_query = "INSERT INTO "+ collection.config.adapter.collection_name + "(id, member_no, subject, message, url,isRead, expired,created,updated) VALUES ('"+entry.id+"', '"+entry.member_no +"','"+entry.subject+"','"+entry.message+"','"+entry.url+"', '"+entry.isRead+"', '"+entry.expired+"', '"+entry.created+"', '"+entry.updated+"')";
				}
				 
				console.log(sql_query);
                db.execute(sql_query);
	            db.close();
	            collection.trigger('sync');
            } 
		});

		return Collection;
	}
};
exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY",
		    "name": "TEXT" ,
		    "dr_code": "TEXT" ,
		    "status": "INTEGER" ,
		    "email": "TEXT" ,
		    "mobile": "TEXT" ,
		    "specialty": "TEXT" ,
		    "qualification" : "TEXT",
		    "introduction" : "TEXT",
		    "created": "TEXT" ,
		    "updated": "TEXT",
		    "img_path": "TEXT",
		    //"clinic_id": "INTEGER" abaddon
		},
		
		adapter: {
			type: "sql",
			collection_name: "doctors",
			idAttribute: "id"
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
			getDoctorListGroupBySpecialty: function(params){
				var addon = "";
				var params_length = (typeof params != "undefined")?params.length:0;
				for (var i=0; i < params_length; i++) {
				  var key = params[i].key || "";
				  var value = params[i].value || "";
				  console.log(params[i]);
				  addon += " AND "+key+" like '%"+value+"%'";
				};
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE `status` =1 "+addon+" group by specialty ORDER BY name ASC";
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){
					listArr[count] = { 
						id: res.fieldByName('id'),
						name: res.fieldByName('name'), 
						dr_code : res.fieldByName('dr_code'), 
						email: res.fieldByName('email'),
						status: res.fieldByName('status'),
						mobile: res.fieldByName('mobile'),
						specialty: res.fieldByName('specialty'),
						qualification: res.fieldByName('qualification'),
						introduction: res.fieldByName('introduction'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						img_path: res.fieldByName('img_path')
						//clinic_id: res.fieldByName('clinic_id')
					};	
					 
					res.next();
					count++;
				} 
			 console.log(listArr);
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getDoctorList: function(params){
				var addon = "";
				for (var i=0; i < params.length; i++) {
				  var key = params[i].key || "";
				  var value = params[i].value || "";
				  
				  addon = " AND "+key+" = '"+value+"'";
				};
				var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE `status` = 1 "+addon+" ORDER BY name ASC";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var listArr = []; 
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = { 
						id: res.fieldByName('id'),
						name: res.fieldByName('name'), 
						dr_code : res.fieldByName('dr_code'), 
						email: res.fieldByName('email'),
						status: res.fieldByName('status'),
						mobile: res.fieldByName('mobile'),
						specialty: res.fieldByName('specialty'),
						qualification: res.fieldByName('qualification'),
						introduction: res.fieldByName('introduction'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						img_path: res.fieldByName('img_path')
						//clinic_id: res.fieldByName('clinic_id')
					};	
					 
					res.next();
					console.log(count);
					count++;
				} 
			 console.log(listArr);
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			getDoctorById: function(id){ 
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE id = ? ";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql, id);
                var arr = []; 
               
                if (res.isValidRow()){
					arr = {
					   id: res.fieldByName('id'),
						name: res.fieldByName('name'), 
						dr_code : res.fieldByName('dr_code'), 
						email: res.fieldByName('email'),
						status: res.fieldByName('status'),
						mobile: res.fieldByName('mobile'),
						specialty: res.fieldByName('specialty'),
						qualification: res.fieldByName('qualification'),
						introduction: res.fieldByName('introduction'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						img_path: res.fieldByName('img_path')
						//clinic_id: res.fieldByName('clinic_id')
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			}, 
			saveArray : function(arr){
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
				var columns = collection.config.columns;
				var keys = [];
				var questionmark = [];
				var eval_values = [];
				var update_questionmark = [];
				
				for (var k in columns) {
	                keys.push(k);
            		questionmark.push("?");
            		eval_values.push("entry."+k);
            		update_questionmark.push(k+"=?");
	            }
	            db.execute("BEGIN");
	            arr.forEach(function(entry) {
                	var without_pk_list = _.rest(update_questionmark);
	                var without_pk_value = _.rest(eval_values);
	                
	                var sql_query =  "INSERT OR REPLACE INTO "+collection.config.adapter.collection_name+" ("+keys.join()+") VALUES ("+questionmark.join()+")";
	                eval("db.execute(sql_query, "+eval_values.join()+")");
	                
				});
	            db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
			},
			/*
			saveArray : function(arr){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute("BEGIN");
                arr.forEach(function(entry) {
	                var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (id, name,dr_code, email, mobile,status,specialty,qualification,introduction, created, updated, img_path) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
					db.execute(sql_query, entry.id, entry.name,entry.dr_code, entry.email,entry.mobile,entry.status ,entry.specialty,entry.qualification,entry.introduction,entry.created,entry.updated, entry.img_path);
					 
					var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET name=?,dr_code=?, email=?,mobile=?,status=?,specialty=?,qualification=?,introduction=?,updated=?,img_path=? WHERE id=?";
					db.execute(sql_query, entry.name,entry.dr_code,entry.email,entry.mobile,entry.status,entry.specialty,entry.qualification,entry.introduction, entry.updated, entry.img_path, entry.id);
				});
				db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
			},*/
			resetDoctors : function(id){
				var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name ;
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute(sql);
                db.close();
                collection.trigger('sync');
			},
			rebuildDb : function(){
				console.log("rebuildDb");
				var collection = this;
				db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
				db.execute('DROP TABLE IF EXISTS doctors');
		db.execute('CREATE TABLE IF NOT EXISTS doctors(id INTEGER PRIMARY KEY, name TEXT, dr_code TEXT, status INTEGER, email TEXT, mobile TEXT, specialty TEXT, qualification TEXT, introduction TEXT, created DATE, updated DATE);');
			 	db.close();
                collection.trigger('sync');
			}
		});
		return Collection;
	}
};  
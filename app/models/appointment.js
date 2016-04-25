exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY",
		    "u_id": "TEXT" , 
		    "duration": "INTEGER",
		    "clinic_name": "TEXT",		//
		    "doctor_name": "TEXT",
		    "specialty_name" : "TEXT",
		    "doctor_panel_id": "INTEGER",
		    "start_date" : "TEXT",
		    "end_date" : "TEXT",
		    "remark" : "TEXT",
		    "status": "INTEGER" ,
		    "created": "TEXT" ,
		    "updated": "TEXT",
		    "date" : "TEXT",
		    "suggested_date" : "TEXT",
		},
		adapter: {
			type: "sql",
			collection_name: "appointment",
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
			getAppointmentList: function(ex){
				var query_doctor_panel_id = (typeof ex.doctor_panel_id != "undefined")?" AND appointment.doctor_panel_id= ? ":"";
				var query_start_date = (typeof ex.start_date != "undefined")?" AND appointment.start_date >= ? AND appointment.start_date < ? ":"";
				var query_uid = (typeof ex.u_id != "undefined")?" AND appointment.u_id=?":"";
				var collection = this;
                var sql = "SELECT appointment.* FROM appointment WHERE 1 "+query_uid+query_doctor_panel_id+query_start_date+" AND appointment.status != 5 ORDER BY appointment.created DESC";
              	 
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                if(typeof ex.doctor_panel_id != "undefined"){
                	console.log('doctor_panel_id '+ ex.doctor_panel_id);
                	console.log(sql);
                	var res = db.execute(sql, ex.doctor_panel_id, ex.start_date, ex.end_date);
                }else{
                	console.log('wrong');
                	var res = db.execute(sql, ex.u_id);
                }
                 
                var listArr = [];
                var count = 0;
                while (res.isValidRow()){ 
					listArr[count] = { 
						id: res.fieldByName('id'),
						u_id: res.fieldByName('u_id'), 
						clinic_name : res.fieldByName('clinic_name'),
						doctor_name : res.fieldByName('doctor_name'),
						doctor_panel_id : res.fieldByName('doctor_panel_id'),
						status: res.fieldByName('status'), 
						start_date: res.fieldByName('start_date'),
						duration: res.fieldByName('duration'),
						remark: res.fieldByName('remark'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						specialty_name: res.fieldByName('specialty_name'),
					};	 
					res.next();
					count++;
				}
			 
				res.close();
                db.close();
                collection.trigger('sync');
                return listArr;
			},
			saveArray : function(arr){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                db.execute("BEGIN"); 
               	arr.forEach(function(entry) {
		            var sql_query =  "INSERT OR IGNORE INTO "+collection.config.adapter.collection_name+" (id, u_id, doctor_panel_id, clinic_name, doctor_name,remark, status,start_date,end_date, duration,suggested_date, created, updated, specialty_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
					db.execute(sql_query, entry.id, entry.u_id, entry.doctor_panel_id, entry.clinic_name, entry.doctor_name, entry.remark,entry.status ,entry.start_date, entry.end_date,entry.duration,entry.suggested_date, entry.created,entry.updated, entry.specialty_name);
				 	var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET doctor_panel_id=?, clinic_name=?, doctor_name=?, remark=?,status=?,start_date=?,end_date=?, duration=?, suggested_date=?,updated=?, specialty_name=? WHERE id=?";
				 	 
					db.execute(sql_query, entry.doctor_panel_id, entry.clinic_name, entry.doctor_name, entry.remark, entry.status,entry.start_date,entry.end_date,entry.duration,entry.suggested_date,entry.updated, entry.specialty_name, entry.id);
				});
				db.execute("COMMIT");
	            db.close();
	            collection.trigger('sync');
			},
			updateAppointmentStatus : function(id, statusCode){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
             	
             	var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET status=? WHERE id=?";
				db.execute(sql_query, statusCode,  id);
			 
                db.close();
	            collection.trigger('sync');
			},
			updateSuggestedAppointmentStatus : function(doctor_panel_id, statusCode){
				var collection = this;
				
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
             	
             	var sql_query =  "UPDATE "+collection.config.adapter.collection_name+" SET status=5 WHERE doctor_panel_id=? AND status = 4";
				db.execute(sql_query, doctor_panel_id);
			 
                db.close();
	            collection.trigger('sync');
			},
			getAppointmentById: function(id){ 
                var collection = this;
                var sql = "SELECT * FROM " + collection.config.adapter.collection_name +" WHERE id ='"+id+"'";
                
                db = Ti.Database.open(collection.config.adapter.db_name);
                if(Ti.Platform.osname != "android"){
                	db.file.setRemoteBackup(false);
                }
                var res = db.execute(sql);
                var arr = []; 
                if (res.isValidRow()){
					arr = {
					   id: res.fieldByName('id'),
						u_id: res.fieldByName('u_id'), 
						duration: res.fieldByName('duration'), 
						start_date: res.fieldByName('start_date'), 
						end_date: res.fieldByName('end_date'), 
						clinic_name : res.fieldByName('clinic_name'),  
						doctor_name : res.fieldByName('doctor_name'),  
						doctor_panel_id : res.fieldByName('doctor_panel_id'),  
						status: res.fieldByName('status'), 
						date: res.fieldByName('date'),
						remark: res.fieldByName('remark'),
						created: res.fieldByName('created'),
						updated: res.fieldByName('updated'),
						specialty_name: res.fieldByName('specialty_name'),
					};
					
				} 
				res.close();
                db.close();
                collection.trigger('sync');
                return arr;
			}, 
			  
		});

		return Collection;
	}
};  
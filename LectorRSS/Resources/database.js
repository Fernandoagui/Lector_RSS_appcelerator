exports.DBInstala = function(){	
	Ti.Database.install('mydata/Feeds.sqlite','Feeds');
};

exports.DBSelect = function(categoria){
	var results = [];
	var db = Ti.Database.open('Feeds');
	var resulSet = db.execute('SELECT * FROM Canales WHERE categoria = "'+ categoria +'"');
	while(resulSet.isValidRow()){  
	  results.push({
	   nombre:resulSet.fieldByName('nombre'),
	   direccion:resulSet.fieldByName('direccion'),
	   categoria:resulSet.fieldByName('categoria'),
	  });
	  resulSet.next();
	}
	resulSet.close();
	db.close();
	return results;
};

exports.DBSelectPagina = function(pagina){
	var results;
	var db = Ti.Database.open('Feeds');
	var resulSet = db.execute('SELECT * FROM Canales WHERE nombre = "'+ pagina +'"');
	// while(resulSet.isValidRow()){  
	  // results.push({
	   // nombre:resulSet.fieldByName('nombre'),
	   // direccion:resulSet.fieldByName('direccion'),
	   // categoria:resulSet.fieldByName('categoria'),
	  // });
	  // resulSet.next();
	// }
	results = {
		nombre:resulSet.fieldByName('nombre'),
		direccion:resulSet.fieldByName('direccion'),
		categoria:resulSet.fieldByName('categoria'),
	};
	resulSet.close();
	db.close();
	return results;
};


exports.DBInsertCanal = function(nombre, direccion, categoria){
	var results = [];
	var db = Ti.Database.open('Feeds');
	nombre = nombre.replaceAll('"', '');
	nombre = nombre.replaceAll("'", '');
	try{
		db.execute('INSERT INTO Canales (nombre, direccion, categoria) VALUES("'+nombre+'", "'+direccion+'", "'+categoria+'")');
	}catch(E){
		Ti.API.info(E);
	};
	db.close();
};

exports.DBSelectFavoritos = function(){
	var results = [];
	var db = Ti.Database.open('Feeds');
	var resulSet = db.execute('SELECT * FROM Canales WHERE categoria = "Favoritos"');
	while(resulSet.isValidRow()){  
	  results.push({
	   	properties: { title: resulSet.fieldByName('nombre'), image: 'starFa.png',color: 'white', bandera : false},
		url : resulSet.fieldByName('direccion')
	  });
	  resulSet.next();
	};
	resulSet.close();
	db.close();
	return results;
};

exports.DBInsertFavorito = function(titulo, direccion){
	var results = [];
	var db = Ti.Database.open('Feeds');
	titulo = titulo.replaceAll('"', '');
	titulo = titulo.replaceAll("'", '');
	try{
		var resulSet = db.execute('INSERT INTO Canales (nombre, direccion, categoria) VALUES("'+titulo+'", "'+direccion+'","Favoritos")');
	}catch(E){
		Ti.API.info(E);
	};
	db.close();
};

exports.DBDeleteFavorito = function(direccion){
	var results = [];
	var db = Ti.Database.open('Feeds');
	var resulSet = db.execute('DELETE FROM Canales WHERE direccion = "'+direccion+'"');
	db.close();
};

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

exports.DBSelectPaginas = function(){
	var results = [];
	var db = Ti.Database.open('Feeds');
	var resulSet = db.execute('SELECT nombre FROM Canales WHERE NOT categoria = "Favoritos"');
	while(resulSet.isValidRow()){
		var pickerRow = Ti.UI.createPickerRow({title:resulSet.fieldByName('nombre')});  
		results.push(pickerRow);
		Ti.API.info(results);
	  resulSet.next();
	};
	resulSet.close();
	db.close();
	return results;
};

exports.DBDeletePagina = function(nombre){
	var results = [];
	var db = Ti.Database.open('Feeds');
	var resulSet = db.execute('DELETE FROM Canales WHERE nombre = "'+nombre+'"');
	db.close();
};

exports.DBSelectPaginasCategoria = function(categoria){
	var results = [];
	var db = Ti.Database.open('Feeds');
	var resulSet = db.execute('SELECT * FROM Canales WHERE categoria = "'+categoria+'"');
	while(resulSet.isValidRow()){
		results.push({
			properties: { title: resulSet.fieldByName('nombre') , color: 'white'},
		});
		resulSet.next();
	};
	resulSet.close();
	db.close();
	return results;
};
exports.tablaRSS = function(nombrePagina, categoria, favoritos_arreglo){
	if(Ti.Network.getOnline()){
		var db = require('database');
		var resul = db.DBSelectPagina(nombrePagina);
		var ruta;
		ruta = resul.direccion;
		Ti.API.info(resul);
		Ti.API.info(ruta);
		var data = [];
		var x = 0;
	    var win = Ti.UI.createWindow({
			layout : 'vertical'
		});
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(1000);
		xhr.open("GET",ruta);
		xhr.onload = function(){
		    try{
		    	var labelPagina = Ti.UI.createLabel({
		    		top: '5%',
		    		text : resul.nombre + " - "+ resul.categoria,
					fontSize : 18  
		    	});
		        var doc = this.responseXML.documentElement;
		        var items = doc.getElementsByTagName("item");
		        for(var c=0;c<items.length;c++){
		            var item = items.item(c);
		            var title = item.getElementsByTagName("title").item(0).textContent;
		            var url = item.getElementsByTagName("link").item(0).textContent;
					data.push({
						properties: { title: resul.nombre + " - "+ title, image: 'starF.png',color: 'white', bandera : true},
						url : url
					});
		        }
		        for(var j=0; j<data.length;j++){
					for(var i=0; i<favoritos_arreglo.length; i++){
						if(favoritos_arreglo[i].properties.title==data[j].properties.title || favoritos_arreglo[i].url == data[j].url){
							data[j].properties.image = 'starFa.png';
							data[j].properties.bandera = false;
						}
					};
				}
				var listSection = Titanium.UI.createListSection({
				    items: data
				});
				
				var listView = Titanium.UI.createListView({
					separatorColor : '#2A868C',
					sections: [listSection]
				});
				listView.addEventListener('itemclick', function(e){
					var opcionF;
					if(e.section.getItemAt(e.itemIndex).properties.bandera){
						opcionF='Agregar';
					}else{
						opcionF='Quitar';
					}
					  var dialog = Ti.UI.createAlertDialog({
					    buttonNames: ['Abrir', 'Cancelar' ,opcionF]
					  });
					  dialog.addEventListener('click', function(f){
					  	if(f.index === 0){
					    	var winWeb = Ti.UI.createWindow();
					    	var vieWeb = Ti.UI.createWebView({
					    		url : e.section.getItemAt(e.itemIndex).url,
					    		enableZoomControls : false
					    	});
					    	winWeb.add(vieWeb);
					    	winWeb.open();
					    };
					    if (f.index === 2){
							if (e.section.getItemAt(e.itemIndex).properties.bandera) {
								var item = e.section.getItemAt(e.itemIndex);
								item.properties.bandera = false;
								item.properties.image = 'starFa.png';
						        data[e.itemIndex] = item;
						        listSection.items = data;
						        favoritos_arreglo.push({
									properties: {title: item.properties.title, image: item.properties.image, color: item.properties.color, bandera : item.properties.bandera},
									url : item.url,
								});
								db.DBInsertFavorito(item.properties.title, item.url);
							}else{
						        var item = e.section.getItemAt(e.itemIndex);
								item.properties.bandera = true;
								item.properties.image = 'starF.png';
						        data[e.itemIndex] = item;
						        listSection.items = data;
						        var dataAux = [];
						        for(var i = 0; i<favoritos_arreglo.length; i++){
						        	if(item.properties.title == favoritos_arreglo[i].properties.title && item.url == favoritos_arreglo[i].url){
						        		favoritos_arreglo.splice(i,1);
						        	}
						        }
						        db.DBDeleteFavorito(item.url);
							}
					    }
					  });
					  dialog.show();
				});
				win.add(labelPagina);
				var view = Ti.UI.createView({
					top : '5%',
					borderColor : '#2A868C'
				});
				view.add(listView);
				win.add(view);
		    }catch(E){
		        Ti.API.info("--------Catch: "+E);
		        alert('Error al intentar cargar la página.');
		    };
		};    
		xhr.send();
		win.open();
	}else{
		var win = Ti.UI.createWindow({
			layout : 'vertical'
		});
		var label = Ti.UI.createLabel({
			top : '15%',
			text : 'No hay conexión disponible.'
		});
		win.add(label);
		win.open();
	}
};

exports.tablaRSSFavoritos = function(favoritos_arreglo){
	var win = Ti.UI.createWindow({
		layout : 'vertical'
	});
	var data = [];
	var x; 
	for (var i=0; i <favoritos_arreglo.length; i++){
		data.push({
			properties: {title: favoritos_arreglo[i].properties.title, image: favoritos_arreglo[i].properties.image, color: favoritos_arreglo[i].properties.color, bandera : favoritos_arreglo[i].properties.bandera},
			url : favoritos_arreglo[i].url,
		});
    };
    var listSection = Titanium.UI.createListSection({
	    items: data
	});
	
	var listView = Titanium.UI.createListView({
		separatorColor : '#2A868C',
		sections: [listSection],
	});
	listView.addEventListener('itemclick', function(e){
		var opcion;
		if(e.section.getItemAt(e.itemIndex).properties.bandera){
			opcion = 'Agregar';
		}else{
			opcion = 'Quitar';
		}
		  var dialog = Ti.UI.createAlertDialog({
		    buttonNames: ['Abrir', 'Cancelar' ,opcion],
		  });
		  dialog.addEventListener('click', function(f){
		  	if(f.index === 0){
				if(Ti.Network.online){
			    	var winWeb = Ti.UI.createWindow();
			    	var vieWeb = Ti.UI.createWebView({
			    		url : e.section.getItemAt(e.itemIndex).url,
			    		enableZoomControls : false
			    	});
			    	winWeb.add(vieWeb);
			    	winWeb.open();
			   }else{
			   		var labelOffline = Ti.UI.createLabel({
						text : 'No hay entradas que mostrar.'
					});
					var winsec_Favoritos = Ti.UI.createWindow({
						layout : 'vertical'
					});
					winsec_Favoritos.add(labelOffline);
					winsec_Favoritos.open();
			   }
		    };
		    if (f.index === 2){
				if (e.section.getItemAt(e.itemIndex).properties.bandera) {
					var item = e.section.getItemAt(e.itemIndex);
					item.properties.bandera = false;
					item.properties.image = 'starFa.png';
			        data[e.itemIndex] = item;
			        listSection.items = data;
			        favoritos_arreglo.push({
						properties: {title: item.properties.title, image: item.properties.image, color: item.properties.color, bandera : item.properties.bandera},
						url : item.url,
					});
					db.DBInsertFavorito(item.properties.title, item.url);
				}else{
			        var item = e.section.getItemAt(e.itemIndex);
					item.properties.bandera = true;
					item.properties.image = 'starF.png';
			        data[e.itemIndex] = item;
			        listSection.items = data;
			        var dataAux = [];
			        for(var i = 0; i<favoritos_arreglo.length; i++){
			        	if(item.properties.title == favoritos_arreglo[i].properties.title && item.url == favoritos_arreglo[i].url){
			        		favoritos_arreglo.splice(i,1);
			        	}
			        }
			        db.DBDeleteFavorito(item.url);
				}
		    }
		  });
		  dialog.show();
	});
	var view1 = Ti.UI.createView({
		height : '15%',
		layout : 'horizontal'
	});
	var view_icono = Ti.UI.createView({
		width: '15%'
	});
	var imageView_icono = Ti.UI.createImageView({
		top: 10,
		image : 'estrella.png',
		borderRadius : 1,
		borderWidth : 1,
		borderColor : 'white'
	});
	var labelFavoritos = Ti.UI.createLabel({
		top: '10%',
		width : '85%',
		left : 0,
		text : '  Favoritos',
		fontSize : 22 
	});
	view1.add(view_icono);
	view1.add(labelFavoritos);
	view_icono.add(imageView_icono);
	var view2 = Ti.UI.createView({
		top : '5%',
		borderColor : '#2A868C'
	});
	view2.add(listView);
	win.add(view1);
	win.add(view2);
	win.open();
};
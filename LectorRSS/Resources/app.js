var RSSTabla = require('RSSTabla');
var db = require('database');
db.DBInstala();
var win = Ti.UI.createWindow({
	splitActionBar : true,
	backgroundGradient : {
    type : 'linear',
    startPoint : {
      x : '50%',
      y : '0%'
    },
    endPoint : {
      x : '50%',
      y : '100%'
    },
    colors : [{
      color : 'black',
      offset : 0.0
    }, {
      color : '#2A868C',
      offset : 0.5
    }],
  	},
	layout : 'vertical'
});


var activity = win.activity;

activity.onCreateOptionsMenu = function(e){
  var menu = e.menu;
  var agregarCanal = menu.add({
    title: "Agregar canal"
  });
  var quitarCanal = menu.add({
    title: "Quitar canal"
  });
  agregarCanal.addEventListener("click", function(e){
  	var win = Ti.UI.createWindow();
    ventanaAQ(win, 'agrega');
  });
  quitarCanal.addEventListener("click", function(e){
  	var win = Ti.UI.createWindow();
    ventanaAQ(win, 'elimina');
  });
};

// ================================== FAVORITOS =================================================
var favoritos_arreglo = db.DBSelectFavoritos();
var view_Favoritos = Ti.UI.createView({
	height : '16%',
	layout : 'horizontal'
});
var view_icono_Favoritos = Ti.UI.createView({
	width: '35%',
	top : 5
});
var label_Favoritos = Ti.UI.createLabel({
	color : 'white',
	text : 'Favoritos',
	width: '65%'
});
var imageView_icono_Favoritos = Ti.UI.createImageView({
	top: 10,
	image : 'estrella.png',
	borderRadius : 1,
	borderWidth : 1,
	borderColor : 'white'
});
imageView_icono_Favoritos.addEventListener('click', function(){
	RSSTabla.tablaRSSFavoritos(favoritos_arreglo);
});

view_icono_Favoritos.add(imageView_icono_Favoritos);
view_Favoritos.add(view_icono_Favoritos);
view_Favoritos.add(label_Favoritos);
win.add(view_Favoritos);
//=================================== CINE Y TELEVISIÓN ==========================================
var view_CineT = Ti.UI.createView({
	height : '16%',
	layout : 'horizontal'
});
var view_icono_CineT = Ti.UI.createView({
	width: '35%'
});
var label_CineT = Ti.UI.createLabel({
	color : 'white',
	text : 'Cine y televisión',
	textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	width: '65%'
});
var imageView_icono_CineT = Ti.UI.createImageView({
	top: 10,
	image : 'camara.png',
	borderRadius : 1,
	borderWidth : 1,
	borderColor : 'white'
});
imageView_icono_CineT.addEventListener('click', function(){
	ventanaPaginas('Cine y Television', 'camara.png');
});
view_icono_CineT.add(imageView_icono_CineT);
view_CineT.add(label_CineT);
view_CineT.add(view_icono_CineT);
win.add(view_CineT);

// =================================== POLITICA =================================================
var view_Politica = Ti.UI.createView({
	height : '16%',
	layout : 'horizontal'
});
var view_icono_Politica= Ti.UI.createView({
	width: '35%'
});
var label_Politica = Ti.UI.createLabel({
	color : 'white',
	text : 'Política',
	width: '65%'
});
var imageView_icono_Politica  = Ti.UI.createImageView({
	top: 10,
	image : 'gobierno.png',
	borderRadius : 1,
	borderWidth : 1,
	borderColor : 'white'
});
imageView_icono_Politica.addEventListener('click', function(){
	ventanaPaginas('Politica', 'gobierno.png');
});
view_icono_Politica.add(imageView_icono_Politica);
view_Politica.add(view_icono_Politica);
view_Politica.add(label_Politica);
win.add(view_Politica);
// =================================== DEPORTES ==================================================
var view_Deportes = Ti.UI.createView({
	height : '16%',
	layout : 'horizontal'
});
var view_icono_Deportes= Ti.UI.createView({
	width: '35%'
});
var label_Deportes = Ti.UI.createLabel({
	color : 'white',
	text: 'Deportes',
	textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	width: '65%'
});
var imageView_icono_Deportes  = Ti.UI.createImageView({
	top: 10,
	image : 'futbol.png',
	borderRadius : 1,
	borderWidth : 1,
	borderColor : 'white'
});
imageView_icono_Deportes.addEventListener('click', function(){
	ventanaPaginas('Deportes', 'futbol.png');
});
view_icono_Deportes.add(imageView_icono_Deportes);
view_Deportes.add(label_Deportes);
view_Deportes.add(view_icono_Deportes);
win.add(view_Deportes);
// ==================================== MUSICA ============================================
var view_Musica = Ti.UI.createView({
	height : '16%',
	layout : 'horizontal'
});
var view_icono_Musica = Ti.UI.createView({
	width: '35%'
});
var label_Musica = Ti.UI.createLabel({
	color : 'white',
	text : 'Música',
	width: '65%'
});
var imageView_icono_Musica = Ti.UI.createImageView({
	top: 10,
	image : 'nota-musical.png',
	borderRadius : 1,
	borderWidth : 1,
	borderColor : 'white'
});
imageView_icono_Musica.addEventListener('click', function(){
	ventanaPaginas('Música', 'nota-musical.png');
});
view_icono_Musica.add(imageView_icono_Musica);
view_Musica.add(view_icono_Musica);
view_Musica.add(label_Musica);
win.add(view_Musica);
// ==================================== Otro ============================================
var view_Otro = Ti.UI.createView({
	height : '16%',
	layout : 'horizontal'
});
var view_icono_Otro = Ti.UI.createView({
	width: '35%'
});
var label_Otro = Ti.UI.createLabel({
	color : 'white',
	text : 'Otro',
	textAlign : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	width: '65%'
});
var imageView_icono_Otro = Ti.UI.createImageView({
	top: 10,
	image : 'otro.png',
	borderRadius : 1,
	borderWidth : 1,
	borderColor : 'white'
});
imageView_icono_Otro.addEventListener('click', function(){
	ventanaPaginas('Otro', 'otro.png');
});
view_icono_Otro.add(imageView_icono_Otro);
view_Otro.add(label_Otro);
view_Otro.add(view_icono_Otro);
win.add(view_Otro);
// ===================================================================================================================
var scroll_ventana = Ti.UI.createScrollView();
scroll_ventana.add(view_CineT);
scroll_ventana.add(view_Politica);
scroll_ventana.add(view_Deportes);
scroll_ventana.add(view_Musica);
win.add(scroll_ventana);
win.open();

function ventanaAQ(win, opcion){
	if(opcion == 'agrega'){
		var view = Ti.UI.createView({
			layout : 'vertical'
		});
		var labelNombre = Ti.UI.createLabel({
			top: '5%',
			text : 'Nombre:'
		});
		var textFieldNombre = Ti.UI.createTextField({
			borderColor : '#2A868C',
			width : '80%'
		});
		var labelDireccion = Ti.UI.createLabel({
			top: '5%',
			text : 'Dirección:'
		});
		var textFieldDireccion = Ti.UI.createTextField({
			borderColor : '#2A868C',
			width : '80%'
		});
		var labelCategoria = Ti.UI.createLabel({
			top: '5%',
			text : 'Categoria:'
		});
		var picker = Ti.UI.createPicker({
		});
		
		var data = [];
		data[0]=Ti.UI.createPickerRow({title:'Cine y Televisión'});
		data[1]=Ti.UI.createPickerRow({title:'Politica'});
		data[2]=Ti.UI.createPickerRow({title:'Deportes'});
		data[3]=Ti.UI.createPickerRow({title:'Musica'});
		data[4]=Ti.UI.createPickerRow({title:'Otro'});
		
		picker.add(data);
		picker.selectionIndicator = true;
		picker.setBorderColor('#00838f');
		var buttonAceptar = Ti.UI.createButton({
			top : '10%',
			title : "Aceptar"
		});
		buttonAceptar.addEventListener('click', function(e){
			db.DBInsertCanal(textFieldNombre.getValue(),textFieldDireccion.getValue(),picker.getSelectedRow(0).title);
			win.close();
		});
		view.add(labelNombre);
		view.add(textFieldNombre);
		view.add(labelDireccion);
		view.add(textFieldDireccion);
		view.add(labelCategoria);
		view.add(picker);
		view.add(buttonAceptar);
		win.add(view);
	}else{
		var view = Ti.UI.createView({
			layout : 'vertical'
		});
		var labelNombre = Ti.UI.createLabel({
			top: '20%',
			text : 'Nombre:'
		});

		var picker = Ti.UI.createPicker({
			top: '5%'
		});
		picker.selectionIndicator = true;
		picker.setBorderColor('#00838f');
		var data = db.DBSelectPaginas();
		picker.add(data);
		var buttonEliminar = Ti.UI.createButton({
			top : '25%',
			title : "Eliminar"
		});
		buttonEliminar.addEventListener('click', function(e){
			db.DBDeletePagina(picker.getSelectedRow(0).title);
			win.close();
		});
		view.add(labelNombre);
		view.add(picker);
		view.add(buttonEliminar);
		win.add(view);
	}
	win.open();
}

function ventanaPaginas(categoria, icono){
	var view = Ti.UI.createView({
		height : '15%',
		layout : 'horizontal'
	});
	var view_icono = Ti.UI.createView({
		width: '15%'
	});
	var imageView_icono = Ti.UI.createImageView({
		top: 10,
		image : icono,
		borderRadius : 1,
		borderWidth : 1,
		borderColor : 'white'
	});
	view_icono.add(imageView_icono);
    var labelCategoria = Ti.UI.createLabel({
		top: '10%',
		width : '85%',
		left : 0,
		text : '  '+categoria,
		fontSize : 22 
	});
	view.add(view_icono);
	view.add(labelCategoria);
	var data = db.DBSelectPaginasCategoria(categoria);
	var listSection = Titanium.UI.createListSection({
	    items: data
	});	
	var listView = Titanium.UI.createListView({
		separatorColor : '#2A868C',
		sections: [listSection],
		top : '5%'
	});
	listView.addEventListener('itemclick', function(e){
		var nombre = e.section.getItemAt(e.itemIndex).properties.title;
		RSSTabla.tablaRSS(nombre, categoria, favoritos_arreglo);	 
	});
	var win = Ti.UI.createWindow({
		layout : 'vertical'
	});
	win.add(view);
	win.add(listView);
	win.open();	
};

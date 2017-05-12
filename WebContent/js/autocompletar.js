function busquedas_ajax(){

	this.ancla = 'buscador';
	this.respuesta   = '.sujerencia-response';
	this.input_top = '';
	this.input_left = '';
	this.form = document.getElementById("buscador");
}


busquedas_ajax.prototype.fijar_lugar = function(elem){
		var actual = this.ancla.val();
		var lugar = $(elem).html();
		this.ancla.val(lugar);
		this.cerrar();
}
busquedas_ajax.prototype.limpiar_sujerencia = function(elem){
		this.ancla.attr('placeholder','Poblacion');
}
busquedas_ajax.prototype.mostrar = function(){
		$(this.respuesta).addClass('sujerencia-on').removeClass('sujerencia-off');
}
busquedas_ajax.prototype.cerrar = function(){
		$(this.respuesta).addClass('sujerencia-off').removeClass('sujerencia-on');
}

busquedas_ajax.prototype.cons = function(string,name){



}


busquedas_ajax.prototype.consultar = function(string,name){
	
		var object = this;
		var caracteres = string.length;
		if(caracteres >2){
			this.resetnotselectedinputs(name);
			//enviara ajax
			$.ajax({
				type:'get',
				url:'Contactobuscar',
				data:({	
					string:string,
					name:name
						}),
				success: function(response){
					$(object.respuesta).html(response);
					object.mostrar();
				}
			});	

		}else{
			//tres caracteres o nada
			this.resetnotselectedinputs(name);
			this.cerrar();
		}	
}







busquedas_ajax.prototype.resetnotselectedinputs = function(selected){
	var string = $('input[name="'+selected+'"]').val();
	this.form.reset();
	$('input[name="'+selected+'"]').val(string);
}



	var sujerencia = new busquedas_ajax();

		//al escribir muestro
	$('input[name="nombre"],input[name="apellido"],input[name="empresa"]').bind('input', function(){
		var string = $(this).val();		
		var name = $(this).attr('name');
		sujerencia.consultar(string,name);
	});

	$('input[name="nombre"],input[name="apellido"],input[name="empresa"]').on('click', function(){
		var string = $(this).val();
		var name = $(this).attr('name');
		sujerencia.consultar(string,name);
	});	

	//selecciono sujerencia
	// $('.sujerencia-response').on( 'click','li',function(){
	// 	var element = $(this);
	// 	var pro = $(this).attr('rel');
	// 	var suj = $(this).attr('rol');
	// 	sujerencia.fijar_lugar(element);
	// 	sujerencia.consultar_poblacion(pro,suj);
	// });


	$('.sujerencia-response').on('focusout', function(){
		sujerencia.cerrar();
	});





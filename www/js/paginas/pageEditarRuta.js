function inicioPaginaEditarRuta(p_IdRuta){

    AsignarLiterales('pageEditarRuta');

    var v_ruta = new clRuta();
    v_ruta.ObtenerSQLite(p_IdRuta,EditarRutaObtenerRutaOK,EditarRutaObtenerRutaError)
    //mostrarRutaEdicion(p_IdRuta);
    //MostrarTrayectos();

}

function EditarRutaObtenerRutaError(p_error){
    mensaje('msj_10','msj_5',ex.message);
    handleBackButton();
}
function EditarRutaObtenerRutaOK(p_trans,p_results) {
    try {
        $('#divMapaEditar').html('');
        $('#divMapaEditar').text('');

        _RutaCapturaEdicion = new clRuta();
        _RutaCapturaEdicion.ProcesaResultados(p_results);

        var v_puntos = new clListaRutaPunto();
        v_puntos.ObtenerListaSQLite(_RutaCapturaEdicion.ID, EditarRutaObtenerPuntosOK, EditarRutaObtenerPuntosError)
    }
    catch (ex) {
        mensaje('msj_10', 'msj_5', ex.message);
        handleBackButton();
    }
}

function EditarRutaObtenerPuntosError(p_error){
    mensaje('msj_10','msj_5',ex.message);
    handleBackButton();
}

function EditarRutaObtenerPuntosOK(p_trans,p_results) {
    try {
        var v_puntos = new clListaRutaPunto();
        v_puntos.ProcesaResultados(p_results);

        _ListaPuntosRutaEditar = v_puntos.Lista;
        _ListaPuntosTemp = null;
        _ListaPuntosTemp = new Array();

        //Posicionar mapa en la posición inicial de la ruta
        var myLatLng = new google.maps.LatLng(_ListaPuntosRutaEditar[0].COORD_X, _ListaPuntosRutaEditar[0].COORD_Y);

        var myOptions = {
            zoom: 11,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        _mapaEditar = new google.maps.Map(document.getElementById("divMapaEditar"), myOptions);

        PintarRutaMapa(_ListaPuntosRutaEditar, _mapaEditar);

        document.getElementById("sliderRuta").max = _ListaPuntosRutaEditar.length - 1;
        $('#sliderRuta').val(0).slider('refresh');
        cambioSliderRuta(0);

        MostrarTrayectos();
    }
    catch (ex) {
        mensaje('msj_10', 'msj_5', ex.message);
        handleBackButton();
    }

}

//function mostrarRutaEdicion(p_IdRuta){
//    try
//    {
//        $('#divMapaEditar').html('');
//        $('#divMapaEditar').text('');
//
//        _RutaCapturaEdicion=new clRuta();
//        _RutaCapturaEdicion.Obtener(p_IdRuta);
//
//        var v_puntos = new clListaRutaPunto();
//        if(_RutaCapturaEdicion.IDRUTAORIGEN==-1) {
//            v_puntos.ObtenerLista(p_IdRuta,_RutaCapturaEdicion.IDPUNTOINICIO,_RutaCapturaEdicion.IDPUNTOFIN);
//        }
//        else{
//            v_puntos.ObtenerLista(_RutaCapturaEdicion.IDRUTAORIGEN,_RutaCapturaEdicion.IDPUNTOINICIO,_RutaCapturaEdicion.IDPUNTOFIN);
//        }
//
//        _ListaPuntosRutaEditar = v_puntos.Lista;
//        _ListaPuntosTemp = null;
//        _ListaPuntosTemp=new Array();
//
//        //Posicionar mapa en la posición inicial de la ruta
//        var myLatLng = new google.maps.LatLng(_ListaPuntosRutaEditar[0].COORD_X, _ListaPuntosRutaEditar[0].COORD_Y);
//
//        var myOptions = {
//            zoom: 11,
//            center: myLatLng,
//            mapTypeId: google.maps.MapTypeId.ROADMAP
//        };
//
//        _mapaEditar = new google.maps.Map(document.getElementById("divMapaEditar"), myOptions);
//
//        PintarRutaMapa(_ListaPuntosRutaEditar,_mapaEditar);
//
//        document.getElementById("sliderRuta").max=_ListaPuntosRutaEditar.length-1;
//        $('#sliderRuta').val(0).slider('refresh');
//        cambioSliderRuta(0);
//
//    }
//    catch (ex){
//        mensaje('msj_10','msj_5',ex.message);
//        handleBackButton();
//    }
//}

function EditarRutaMenos(){
    if(_cambioSlider==null){
        $('#sliderRuta').val(0).slider('refresh');
        cambioSliderRuta(0);
    }
    else {
        if(parseInt(_cambioSlider) > 0){
            $('#sliderRuta').val(parseInt(_cambioSlider)- 1).slider('refresh');
            cambioSliderRuta(parseInt(_cambioSlider) - 1);
        }
    }
}
function EditarRutaMas(){
    if(_cambioSlider==null){
        $('#sliderRuta').val(0).slider('refresh');
        cambioSliderRuta(0);
    }
    else {
        if (parseInt(_cambioSlider) < parseInt(document.getElementById("sliderRuta").max)) {
            $('#sliderRuta').val(parseInt(_cambioSlider) + 1).slider('refresh');
            cambioSliderRuta(parseInt(_cambioSlider) + 1);
            //$('#sliderRuta').slider('refresh');
        }
    }
}


function cambioSliderRuta(p_indice){
    _cambioSlider=p_indice;

    //$('#lbEditarRutaValor').text(p_indice);
    //$('#lbEditarRutaCoordenasdasX').text(_ListaPuntosRutaEditar[p_indice].COORD_X);
    //$('#lbEditarRutaCoordenasdasY').text(_ListaPuntosRutaEditar[p_indice].COORD_Y);

    VerPunto(_ListaPuntosRutaEditar[p_indice].COORD_X,_ListaPuntosRutaEditar[p_indice].COORD_Y,_mapaEditar)

    var v_distancia1=CalculaDistanciaSegmento(p_indice,1);
    var v_distancia2=CalculaDistanciaSegmento(p_indice,2);
    $('#lbEditarRutadistancia1').text(v_distancia1+ "km.");
    $('#lbEditarRutadistancia2').text(v_distancia2+ "km.");

}

function CalculaDistanciaSegmento(p_indice,p_segmento) {

    var v_distancia = 0;
    var v_ini=0;
    var v_fin = _ListaPuntosRutaEditar.length;

    if(parseInt(p_indice)!=0) {
        if (p_segmento == 1) {
            v_fin = parseInt(p_indice) + 1;
        }
        else {
            v_ini = parseInt(p_indice) + 1;
        }
    }
    else{
        if(p_segmento==1){
            v_fin=0;
        }
    }

    v_distancia=CalculaDistanciaPuntos(v_ini,v_fin);
    return v_distancia;
}

function CalculaDistanciaPuntos(p_inicio,p_fin){
    var v_distancia = 0;
    for (var x = p_inicio; x < p_fin; x++) {

        if (x > 0) {
            try {
                var v_punto1 = new google.maps.LatLng(_ListaPuntosRutaEditar[x - 1].COORD_X, _ListaPuntosRutaEditar[x - 1].COORD_Y);
                var v_punto2 = new google.maps.LatLng(_ListaPuntosRutaEditar[x].COORD_X, _ListaPuntosRutaEditar[x].COORD_Y);
                v_distancia = v_distancia + google.maps.geometry.spherical.computeDistanceBetween(v_punto1, v_punto2);
            }
            catch (ex){}
        }
    }
    var v_km=v_distancia/1000;

    return  +(Math.round(v_km + "e+2")  + "e-2");
}

function VerPunto(p_latitud,p_longitud,p_mapa){
    try
    {
        var myLatLng = new google.maps.LatLng(p_latitud, p_longitud);

        if(_mapaCapturaMarcador != null) {
            _mapaCapturaMarcador.setMap(null);
            _mapaCapturaMarcador=null;
        }
        var v_icon = IconoPuntoActual();

        _mapaCapturaMarcador = new google.maps.Marker({
            position:myLatLng,
            icon:v_icon,
            draggable:false,
            zIndex: -2000,
            map: p_mapa
        });

    }
    catch (ex){mensaje(ex.message,'msj_1');}
}

function AnadirMarcadorPunto(p_latitud,p_longitud,p_punto){
    try
    {
        var myLatLng = new google.maps.LatLng(p_latitud, p_longitud);



        var v_image =ImagenPunto(p_punto);

        var v_marcador = new google.maps.Marker({
            position:myLatLng,
            icon: v_image,
            draggable:false,
            map: _mapaEditar
        });

        var v_ind=0;
        if(_ListaMarcadoresTemp!=null){
            v_ind= _ListaMarcadoresTemp.length;
        }
        _ListaMarcadoresTemp[v_ind]=v_marcador;

    }
    catch (ex){mensaje(ex.message,'msj_1');}
}

function EliminarMarcadores(){
    if(_ListaMarcadoresTemp != null){
        for(var i=0;i<_ListaMarcadoresTemp.length;i++){
            if(_ListaMarcadoresTemp[i] != null) {
                _ListaMarcadoresTemp[i].setMap(null);
            }
        }
    }
    _ListaMarcadoresTemp=null;
}

function AnadirPunto(){

    if(_ListaPuntosTemp==null){
        _ListaPuntosTemp=new Array();
    }
    if(_cambioSlider==0 ||( _ListaPuntosRutaEditar.length-1)==_cambioSlider){
        //No se puede cortar por el primero o segundo punto
    }
    else {
        if (_ListaPuntosTemp.length < 4) {

            var v_indice;
            for (var i = 0; i < _ListaPuntosTemp.length; i++) {
                if (_ListaPuntosTemp[i][0] == _cambioSlider) {
                    v_indice = i;
                }
            }
            if (v_indice != null) {
                if (_ListaPuntosTemp[v_indice][3] == 1) {
                    _ListaPuntosTemp[v_indice][3] = 0;
                }
                else {
                    _ListaPuntosTemp[v_indice][3] = 1;
                }
                MostrarTrayectos();
            }
            else {
                var v_punto = new google.maps.LatLng(_ListaPuntosRutaEditar[_cambioSlider].COORD_X, _ListaPuntosRutaEditar[_cambioSlider].COORD_Y);
                var v_direccion = cogerDireccion(v_punto);
                var v_puntoTemp = new Array();
                v_puntoTemp[0] = _cambioSlider;
                v_puntoTemp[1] = v_direccion;
                v_puntoTemp[3] = 1;//indica q es válido

                _ListaPuntosTemp[_ListaPuntosTemp.length] = v_puntoTemp;

                MostrarTrayectos();
            }

        }
        else {
            mensaje("msj_14", 'msj_2');//No se pueden añadir más de cuatro puntos de corte, Aviso
        }
    }
}

function EliminarPuntoTemp(p_indice) {
    for (var i = 0; i < _ListaPuntosTemp.length; i++) {
        if (_ListaPuntosTemp[i][0] == p_indice) {
            _ListaPuntosTemp.splice(i, 1);
        }
    }
    MostrarTrayectos();
}


function MostrarTrayectos(){
    //Eliminar los marcadores del mapa de los puntos añadidos
    EliminarMarcadores();
    _ListaMarcadoresTemp=new Array();

    var v_hayPuntos=0;
    if(_ListaPuntosTemp!=null){
        v_hayPuntos=_ListaPuntosTemp.length;
    }


    $('#divEditarRutaTemp').html('');

    var v_html = "";

    if(v_hayPuntos==0) {
        v_html += "<table cellspacing='1' cellpadding='1' border='0' width='100%' >";
        v_html += "<tr>";
        v_html += "<td class='marcaInicio'><div></div></td>";
        v_html += "<td class='rutaTexto'>" + _RutaCapturaEdicion.DIRECINICIO + "</td>";//dirección de inicio
        v_html += "</tr>";
        v_html += "<tr>";
        v_html += "<td></td>";
        v_html += "<td class='rutaDuracion'>" + _RutaCapturaEdicion.DURACION + ", " + _RutaCapturaEdicion.DISTANCIA + ' km' + "</td>"; //duración y distancia
        v_html += "</tr>";
        v_html += "<tr>";
        v_html += "<td class='marcaFin'><div ></div></td>";
        v_html += "<td class='rutaTexto'>" + _RutaCapturaEdicion.DIRECFIN + "</td>";//dirección final
        v_html += "</tr>";
        v_html += "</table>";
    }
    else {

        var v_indAnt=0;
        if(_ListaPuntosTemp.length>1) {
            _ListaPuntosTemp.sort(function (a, b) {
                return parseInt(a[0]) - parseInt(b[0])
            });
        }

        var v_distancia=0;
        var v_duracion=0;
        v_html += "<table cellspacing='1' cellpadding='1' border='0' style='width: 100%;table-layout: fixed' >";
        v_html += "<tr>";
        v_html += "<td class='td1'><div></div></td>";
        v_html += "<td class='marcaInicio'><div></div></td>";
        v_html += "<td colspan='2' class='td3'><div>" + _RutaCapturaEdicion.DIRECINICIO + "</div></td>";//dirección de inicio
        v_html += "</tr>";
        for(var i=0;i<_ListaPuntosTemp.length;i++){

            //var v_dFechaIni= new Date(_ListaPuntosRutaEditar[v_indAnt].FECHAHORA);
            //var v_dFechaFin=new Date(_ListaPuntosRutaEditar[parseInt(_ListaPuntosTemp[i][0])].FECHAHORA);
            //v_duracion = CalculaTiempo(v_dFechaIni,v_dFechaFin);
            var v_dFechaIni= _ListaPuntosRutaEditar[v_indAnt].FECHAHORA;
            var v_dFechaFin=_ListaPuntosRutaEditar[parseInt(_ListaPuntosTemp[i][0])].FECHAHORA;
            v_duracion = CalculaTiempo_hhmm(FechaHora_StringToDate(v_dFechaIni),FechaHora_StringToDate(v_dFechaFin));

            var v_imagen = "imagenes/punto"+(i+1).toString()+"_20.png";
            if(_media_480.matches){
                v_imagen = "imagenes/punto" +(i+1).toString()+ "_24.png";
            }
            if(_media_768.matches){
                v_imagen = "imagenes/punto" +(i+1).toString()+ "_28.png";
            }
            if(_media_800.matches){
                v_imagen = "imagenes/punto"+(i+1).toString()+ "_32.png";
            }

            v_distancia= CalculaDistanciaPuntos(v_indAnt,parseInt(_ListaPuntosTemp[i][0])+1);
            v_html += "<tr class='filaPar'>";
            v_html += "<td></td>";
            v_html += "<td></td>";
            v_html += "<td class='rutaDuracion'>" +v_duracion+", "+ v_distancia + ' km' + "</td>"; //duración y distancia
            v_html += "</tr>";
            v_html += "<tr>";
            v_html += "<td align='center' class='mi-punto-delete'><button onclick='EliminarPuntoTemp("+_ListaPuntosTemp[i][0]+")' class='botonGris btTocar' ><img alt='' src='imagenes/Delete_48x48.png' /></button></td>";
            v_html += "<td class='marcaPunto'><img alt='' src='"+v_imagen+"' /></td>";
            v_html += "<td  colspan='2'  class='td3'><div>" + _ListaPuntosTemp[i][1] + "</div></td>";//dirección punto
            v_html += "</tr>";

            AnadirMarcadorPunto(_ListaPuntosRutaEditar[parseInt(_ListaPuntosTemp[i][0])].COORD_X,_ListaPuntosRutaEditar[parseInt(_ListaPuntosTemp[i][0])].COORD_Y,i+1);
            v_indAnt=parseInt(_ListaPuntosTemp[i][0])+1;
        }
        //var v_dFechaIni=new Date( _ListaPuntosRutaEditar[v_indAnt].FECHAHORA);
        //var v_dFechaFin=new Date(_ListaPuntosRutaEditar[_ListaPuntosRutaEditar.length-1].FECHAHORA);
        //v_duracion = CalculaTiempo(v_dFechaIni,v_dFechaFin);
        var v_dFechaIni=_ListaPuntosRutaEditar[v_indAnt].FECHAHORA;
        var v_dFechaFin=_ListaPuntosRutaEditar[_ListaPuntosRutaEditar.length-1].FECHAHORA;
        v_duracion = CalculaTiempo_hhmm(FechaHora_StringToDate(v_dFechaIni),FechaHora_StringToDate(v_dFechaFin));
        v_distancia= CalculaDistanciaPuntos(v_indAnt,_ListaPuntosRutaEditar.length);
        v_html += "<tr class='filaPar'>";
        v_html += "<td></td>";
        v_html += "<td></td>";
        v_html += "<td class='rutaDuracion'>"+v_duracion+", " + v_distancia + ' km' + "</td>"; //duración y distancia
        v_html += "</tr>";
        v_html += "";
        v_html += "";
        v_html += "<tr>";
        v_html += "<td></td>";
        v_html += "<td class='marcaFin'><div ></div></td>";
        v_html += "<td  colspan='2'  class='td3'><div>" + _RutaCapturaEdicion.DIRECFIN + "<div></div></td>";//dirección final
        v_html += "</tr>";
        v_html += "</table>";

    }


    v_html += "<script type='text/javascript'>";
    v_html += "$('.btTocar1').bind('touchstart', function(){";
    v_html += "$(this).addClass('btHover');";
    v_html += "});";

    v_html += "$('.btTocar1').bind('touchend', function(){";
    v_html += "$(this).removeClass('btHover');";
    v_html += "})";
    v_html += "</script>";

    $('#divEditarRutaTemp').html(v_html);
    $('#divEditarRutaTemp').trigger('create');



}




//------------------------------------------------------------------------
//------------------------------------------------------------------------
// GUARDAR
//------------------------------------------------------------------------
//------------------------------------------------------------------------

function CrearDividirRuta() {
    setTimeout(MostrarEspera(),1);
    //MostrarEspera();
    $.ajax({
        url: "js/paginas/espera.js",
        cache:false,
        dataType: "script",
        success: function(datos){setTimeout(CrearDividirRuta1(),1000); },
        error: function(error){setTimeout(CrearDividirRuta1(),1000);}
    });
}
function CrearDividirRuta1(){

    if(_ListaPuntosTemp!=null && _ListaPuntosTemp.length>0){

        //Ordenar la lista de puntos de corte
        //En la lista de puntos de corte se están guardando los índices de la lista
        //de puntos de la ruta a dividir (_RutaCapturaEdicion)
        if(_ListaPuntosTemp.length>1) {
            _ListaPuntosTemp.sort(function (a, b) {
                return parseInt(a[0]) - parseInt(b[0])
            });
        }



        //Crear las nuevas rutas
        //Si es el primer punto de corte: la nueva ruta va desde el punto de inicio de la ruta original hasta el punto de corte
        //Si es el último punto de corte: la nueva ruta va desde el punto de corte hasta el último punto de la ruta original
        //Resto de casos la ruta va: desde punto anterior de corte a punto actual de corte
        var v_listaparam = new Array();
        var v_elemento;
        for(var i=0;i<=_ListaPuntosTemp.length;i++){
            if(i==0){
                v_elemento = CrearScriptInsertNuevaRuta(0,parseInt(_ListaPuntosTemp[i][0]));
            }
            else if(i==_ListaPuntosTemp.length){
                v_elemento = CrearScriptInsertNuevaRuta(parseInt(_ListaPuntosTemp[i-1][0]),_ListaPuntosRutaEditar.length-1);
            }
            else{
                v_elemento = CrearScriptInsertNuevaRuta(parseInt(_ListaPuntosTemp[i-1][0]),parseInt(_ListaPuntosTemp[i][0]));
            }
            v_listaparam[v_listaparam.length]=v_elemento;
            if(v_elemento[1]==-1) break;
        }

        if(v_listaparam[v_listaparam.length-1][1]==-1){
            mensaje("msj_15",'msj_1',v_listaparam[v_listaparam.length-1][0]);//No se ha podido dividir la ruta
        }
        else{
            var v_ruta = new clRuta();
            var v_res= v_ruta.DividirRuta(_RutaCapturaEdicion.ID,v_listaparam,CrearDividirRutaOK,CrearDividirRutaError);
            if(v_res != "OK"){
                mensaje("msj_15",'msj_1',v_res);//No se ha podido dividir la ruta
            }

        }
    }
    else{
        mensaje("msj_16",'msj_2');//No se ha añadido ningún punto de corte., Aviso
    }
}

function CrearDividirRutaError(p_error) {
    mensaje("msj_15",'msj_1');//No se ha podido dividir la ruta
    return true;//para hacer el rollback
}
function CrearDividirRutaOK(p_error) {
        _RutaCapturaEdicion = null;
        _ListaPuntosTemp = null;
        OcultarEspera();
        abrirPagina('pageListaRuta');
}
function CrearScriptInsertNuevaRuta(p_indiceIni,p_indiceFin){

    var v_res=new Array();
    try {
        var v_ruta = new clRuta();
        //var v_dFechaIni = new Date(_ListaPuntosRutaEditar[p_indiceIni].FECHAHORACAPTURA);
        //var v_dFechaFin = new Date(_ListaPuntosRutaEditar[p_indiceFin].FECHAHORACAPTURA);
        //var v_duracion = CalculaTiempo_hhmm(v_dFechaIni,v_dFechaFin);
        var v_dFechaIni = _ListaPuntosRutaEditar[p_indiceIni].FECHAHORACAPTURA;
        var v_dFechaFin = _ListaPuntosRutaEditar[p_indiceFin].FECHAHORACAPTURA;
        var v_duracion = CalculaTiempo_hhmm(FechaHora_StringToDate(v_dFechaIni),FechaHora_StringToDate(v_dFechaFin));

        var v_posIni = new google.maps.LatLng(_ListaPuntosRutaEditar[p_indiceIni].COORD_X, _ListaPuntosRutaEditar[p_indiceIni].COORD_Y);
        var v_direccionIni = cogerDireccion(v_posIni);
        var v_posFin = new google.maps.LatLng(_ListaPuntosRutaEditar[p_indiceFin].COORD_X, _ListaPuntosRutaEditar[p_indiceFin].COORD_Y);
        var v_direccionFin = cogerDireccion(v_posFin);

        var v_distancia = CalculaDistanciaEntrePuntos(_ListaPuntosRutaEditar,p_indiceIni,p_indiceFin);

        v_ruta.IDUSUARIO = _UsuarioApp.IDUSUARIO;

        //v_ruta.FECHAHORAINICIO = FechaHora_DateToString(v_dFechaIni);
        //v_ruta.FECHAHORAFIN = FechaHora_DateToString(v_dFechaFin);
        v_ruta.FECHAHORAINICIO = v_dFechaIni;
        v_ruta.FECHAHORAFIN = v_dFechaFin;
        v_ruta.DURACION = v_duracion;
        v_ruta.DIRECINICIO = v_direccionIni;
        v_ruta.DIRECFIN = v_direccionFin;
        v_ruta.DISTANCIA = v_distancia;
        v_ruta.OBSERVACIONES = "";
        v_ruta.ESIOS=_RutaCapturaEdicion.ESIOS;

        v_res[0] = v_ruta.ObtenerScriptInsertSQLite();
        v_res[1] = _ListaPuntosRutaEditar[p_indiceIni].ID;
        v_res[2] = _ListaPuntosRutaEditar[p_indiceFin].ID;


    }
    catch (ex)
    {
        v_res[0]=ex.message;
        v_res[1]=-1;
        v_res[2]=-1;
    }
    return v_res;
}


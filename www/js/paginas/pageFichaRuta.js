function inicioPaginaFichaRuta(p_idRuta,p_origen){
    AsignarLiterales('pageFichaRuta');
    try {
        _origenFichaRuta = p_origen;
        _IdRutaFicha=p_idRuta;
        $('#btEditarRuta').unbind("click");
        $('#btFichaRutaEnviar').unbind("click");
        $('#btObservacionesAceptar').unbind("click");
        $('#btEditarObservacionesRuta').unbind("click");

        $('#btEditarRuta').click(function () {
            EditarRuta(p_idRuta)
        });
        $('#btFichaRutaEnviar').click(function () {
            AbrirObservEnviar(p_idRuta, p_origen);
        });
        $('#btObservacionesAceptar').click(function () {
            AceptarObservaciones(p_idRuta, p_origen);
        });
        $('#btEditarObservacionesRuta').click(function () {
            AbrirObservaciones(p_idRuta);
        });

        if (p_origen == "Captura") {
            $('#btEditarRuta').show();
            $('#btEditarObservacionesRuta').hide();
            $('#btFichaRutaEnviar').show();
        }
        else if (p_origen == "Pendientes") {
            $('#btEditarRuta').show();
            $('#btEditarObservacionesRuta').show();
            $('#btFichaRutaEnviar').show();
        }
        else if (p_origen == "Consulta") {
            $('#btEditarRuta').hide();
            $('#btEditarObservacionesRuta').hide();
            $('#btFichaRutaEnviar').hide();
        }

        mostrarDatosRuta(p_idRuta, p_origen);

    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        handleBackButton();
    }
}

function mostrarDatosRuta(p_idRuta,p_origen){
    try {

        $('#divMapaConsulta').html('');
        $('#divMapaConsulta').text('');

        $('#FichaRutaFecha').text('');
        $('#FichaRutaDirecIni').text('');
        $('#FichaRutaDuracion').text('');
        $('#FichaRutaDistancia').text('');
        $('#FichaRutaDirecFin').text('');
        $('#inputRuta_OBSERVACIONES').text('');

        if(p_origen == "Consulta")
        {
            ObtenerRutaCentral(p_idRuta);
        }
        else{
            var v_rutaEdi = new clRuta();
            var v_res= v_rutaEdi.ObtenerSQLite(p_idRuta,FichaRutaObtenerSQLiteOK,FichaRutaObtenerSQLiteError);
        }

    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        handleBackButton();
    }
}

function FichaRutaObtenerSQLiteError(p_error){
    mensaje('msj_10','msj_5',p_error);
    handleBackButton();
}
function FichaRutaObtenerSQLiteOK(p_trans,p_results){
    try{
        var v_ruta = new clRuta();
        var v_res = v_ruta.ProcesaResultados(p_results);
        if(v_res=="OK"){
            if(v_ruta.FECHAHORAFIN.indexOf('Na')!=-1 || v_ruta.DURACION.indexOf('Na')!=-1){
                var v_error=v_ruta.FinalizarRutaSQLite(v_ruta.ID,FichaRutaFinalizarRutaOK,FichaRutaFinalizarRutaError);
                if(v_error!="OK"){
                    mensaje('msj_10','msj_5',v_error);
                    handleBackButton();
                }
            }
            else{
                FichaRutaFinalizarRutaOK(p_trans,p_results);
            }
        }
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        handleBackButton();

    }
}

function FichaRutaFinalizarRutaError(p_error){
    mensaje('msj_10','msj_5');
    handleBackButton();

}

function FichaRutaFinalizarRutaOK(p_trans,p_results){
    try{
        var v_ruta = new clRuta();
        var v_res = v_ruta.ProcesaResultados(p_results);
        if(v_res=="OK"){
            $('#FichaRutaFecha').text(v_ruta.FECHAHORAINICIO);
            $('#FichaRutaDirecIni').text(v_ruta.DIRECINICIO);
            $('#FichaRutaDuracion').text(v_ruta.DURACION);
            $('#FichaRutaDistancia').text(v_ruta.DISTANCIA +' km');
            $('#FichaRutaDirecFin').text(v_ruta.DIRECFIN);
            $('#inputRuta_OBSERVACIONES').text(v_ruta.OBSERVACIONES);

            var v_puntos = new clListaRutaPunto();
            v_puntos.ObtenerListaSQLite(v_ruta.ID,FichaRutaObtenerListaSQLiteOK,FichaRutaObtenerListaSQLiteError);
        }
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        handleBackButton();

    }
}


function FichaRutaObtenerListaSQLiteError(p_error){
    mensaje('msj_10','msj_5',p_error.message);
    handleBackButton();
}
function FichaRutaObtenerListaSQLiteOK(p_trans,p_results) {
    try {
        var v_puntos = new clListaRutaPunto();
        var v_res = v_puntos.ProcesaResultados(p_results);
        if (v_res == "OK") {
            //Posicionar mapa en la posición inicial de la ruta
            var myLatLng = new google.maps.LatLng(v_puntos.Lista[0].COORD_X, v_puntos.Lista[0].COORD_Y);

            var myOptions = {
                zoom: 13,
                center: myLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var v_mapa = new google.maps.Map(document.getElementById("divMapaConsulta"), myOptions);

            PintarRutaMapa(v_puntos.Lista, v_mapa);
        }
        else{
            mensaje('msj_10','msj_5',v_res);
            handleBackButton();
        }
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        handleBackButton();
    }
}

function mostrarRutaConsulta(p_ruta,p_puntos){
    try
    {

        $('#FichaRutaFecha').text(p_ruta.FECHAHORAINICIO);
        $('#FichaRutaDirecIni').text(p_ruta.DIRECINICIO);
        $('#FichaRutaDuracion').text(p_ruta.DURACION);
        $('#FichaRutaDistancia').text(p_ruta.DISTANCIA +' km');
        $('#FichaRutaDirecFin').text(p_ruta.DIRECFIN);
        $('#inputRuta_OBSERVACIONES').text(p_ruta.OBSERVACIONES);

        //Posicionar mapa en la posición inicial de la ruta
        var myLatLng = new google.maps.LatLng(p_puntos.Lista[0].COORD_X, p_puntos.Lista[0].COORD_Y);

        var myOptions = {
            zoom: 13,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var v_mapa = new google.maps.Map(document.getElementById("divMapaConsulta"), myOptions);

        PintarRutaMapa(p_puntos.Lista,v_mapa);
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        handleBackButton();
    }
}


function ObtenerRutaCentral(p_idRuta) {
    try {
        MostrarEspera();
        var v_url=_urlRutas+"/"+_UsuarioApp.LOGIN.toString()+"/"+_UsuarioApp.PASSWORD.toString()+"?id="+p_idRuta.toString();

        $.ajax({
            type: "GET",
            cache:false,
            url: v_url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ObtenerRutaCentral_OK,
            error: ObtenerRutaCentral_Error
        });

    }
    catch (ex){
        OcultarEspera();
        mensaje(ex.message,"msj_3");
    }
}
function ObtenerRutaCentral_Error(error){
    OcultarEspera();
    mensaje(error.responseText,"msj_3");
}
function ObtenerRutaCentral_OK(datos){
    try{
        var v_ruta = new clRuta();
        var v_listapunto=new clListaRutaPunto();
        var v_indice=0;
        if(datos !=null) {
            v_ruta = new clRuta(datos);
            if (datos["ListaPuntos"] != null) {
                for (var j = 0; j < datos["ListaPuntos"].length; j++) {
                    var v_punto = new clRutaPunto(datos["ListaPuntos"][j])
                    v_listapunto.Lista[v_indice] = v_punto;
                    v_indice++;
                }
            }
        }
        mostrarRutaConsulta(v_ruta,v_listapunto);
        OcultarEspera();
    }
    catch (ex){
        mensaje("msj_19",'msj_1',error.responseText);//No se ha podido mostrar los resultados de la búsqueda
    }
}

function AbrirObservEnviar(p_iIdRuta,p_origen){
    if(p_origen=="Captura"){
        AbrirObservaciones(p_iIdRuta);
    }
    else{
        EnviarRuta(p_iIdRuta);
    }
}

function EditarRuta(p_idRuta){
        abrirPagina("pageEditarRuta",p_idRuta);
}

function AbrirObservaciones(p_idRuta){
    AsignarLiterales('divObservaciones');
    try{
        try{
            var v_alto=$(document).height();
            document.getElementById('divObservaciones').style.height=v_alto+"px";

            var v_ruta = new clRuta();
            v_ruta.ObtenerSQLite(p_idRuta,FichaRutaObtenerObservacionesOK,FichaRutaObtenerObservacionesError);
            //$('#inputRuta_OBSERVACIONES').val(indefinidoOnullToVacio(v_ruta.OBSERVACIONES));

        }catch(ex) {}

        $('#divObservaciones').show();
    }
    catch (ex){mensaje(ex.message,'msj_1')}
}

function FichaRutaObtenerObservacionesError(p_error){

}
function FichaRutaObtenerObservacionesOK(p_tran,p_result){
    var v_ruta = new clRuta();
    v_ruta.ProcesaResultados(p_result);
    $('#inputRuta_OBSERVACIONES').val(indefinidoOnullToVacio(v_ruta.OBSERVACIONES));
}

function AceptarObservaciones(p_iIdRuta, p_origen){

    $('#divObservaciones').hide();

    try{
        var v_ruta = new clRuta();
        v_ruta.ModificarSQLiteObservaciones(p_iIdRuta,$('#inputRuta_OBSERVACIONES').val(),FichaRutaModificarObservacionesOK,FichaRutaModificarObservacionesError);
        //v_ruta.ObtenerSQLite(p_iIdRuta,FobsOK,FichaRutaModificarObservacionesError);
    }
    catch(ex){}
}
function FobsOK(p_trans,p_results){
    var v_ruta = new clRuta();
    v_ruta.ProcesaResultados(p_results);
    v_ruta.OBSERVACIONES=$('#inputRuta_OBSERVACIONES').val();
    v_ruta.ModificarSQLite(FichaRutaModificarObservacionesOK,FichaRutaModificarObservacionesError);

}
function FichaRutaModificarObservacionesError(p_error){
    //alert("FichaRutaModificarObservacionesError");

}
function FichaRutaModificarObservacionesOK(p_trans,p_results){
    if((_origenFichaRuta=="Captura")){
        EnviarRuta(_IdRutaFicha);
    }

}

function CancelarObservaciones(){
    $('#divObservaciones').hide();

}

function EnviarRuta(p_idRuta){
    try {
        MostrarEspera();
        _RutaEnvio=null;
        var v_ruta = new clRuta();
        v_ruta.ObtenerSQLite(p_idRuta,EnviarRutaObtenerOK,EnviarRutaObtenerError);
        ////var v_datos= JSON.stringify(v_ruta.JSON());
        //var v_datos= JSON.stringify(v_ruta.JSONSQLite());
        //var v_url = _urlRutas + "/" + _UsuarioApp.LOGIN.toString() + "/" + _UsuarioApp.PASSWORD.toString();
        //
        //try {
        //    $.ajax({
        //        type: "POST",
        //        cache:false,
        //        url: v_url,
        //        data: v_datos,
        //        contentType: "application/json",
        //        success: function (datos) {
        //            if (datos == 1) {
        //                EliminarEnviarRuta(v_ruta);
        //                abrirPagina("pageResultados", "OK");
        //            }
        //            else {
        //                abrirPagina("pageResultados", "ERROR3");
        //            }
        //        },
        //        error: function (error) {
        //            abrirPagina("pageResultados", "ERROR3");
        //        }
        //    });
        //}
        //catch (ex) {
        //    abrirPagina("pageResultados", "ERROR3");
        //}
    }
    catch (ex){mensaje(ex.message,'msj_1');}
}

function EnviarRutaObtenerError(p_error){
    _RutaEnvio =null;
    mensaje("msj_58", 'msj_1');
}
function EnviarRutaObtenerOK(p_trans,p_results) {
    try {
        _RutaEnvio = new clRuta();
        var v_res = _RutaEnvio.ProcesaResultados(p_results);
        if (v_res == "OK") {
            var v_lista = new clListaRutaPunto();
            v_lista.ObtenerListaSQLite(_RutaEnvio.ID,EnviarRutaObtenerPuntosOK,EnviarRutaObtenerError);
        }
        else {
            _RutaEnvio = null;
            mensaje("msj_58", 'msj_1');
        }
    }
    catch (ex) {
        _RutaEnvio =null;
        mensaje(ex.message, 'msj_1');
    }
}

function EnviarRutaObtenerPuntosOK(p_trans,p_results) {
    try {
        var v_lista = new clListaRutaPunto();
        var v_res=v_lista.ProcesaResultados(p_results);
        if(v_res=="OK"){
            var v_datos= JSON.stringify(_RutaEnvio.JSONSQLite(v_lista.Lista));
            //alert(v_datos);
            var v_url = _urlRutas + "/" + _UsuarioApp.LOGIN.toString() + "/" + _UsuarioApp.PASSWORD.toString();

            try {
                $.ajax({
                    type: "POST",
                    cache:false,
                    url: v_url,
                    data: v_datos,
                    contentType: "application/json",
                    success: function (datos) {
                        if (datos == 1) {
                            _RutaEnvio.EliminarCompletoSQLite("("+_RutaEnvio.ID+")",EnviarRutaEliminarOK,EnviarRutaEliminarError);
                        }
                        else {
                            _RutaEnvio =null;
                            abrirPagina("pageResultados", "ERROR4");
                        }
                    },
                    error: function (error) {
                        //alert('error ajax: '+JSON.stringify(error));
                        _RutaEnvio =null;
                        abrirPagina("pageResultados", "ERROR3");
                    }
                });
            }
            catch (ex) {
                //alert('error try: '+ex.message);
                _RutaEnvio =null;
                abrirPagina("pageResultados", "ERROR3");
            }

        }
        else{
            _RutaEnvio =null;
            OcultarEspera();
            mensaje("msj_58", 'msj_1');
        }
    }
    catch (ex) {
        _RutaEnvio =null;
        OcultarEspera();
        mensaje(ex.message, 'msj_1');
    }
}

function EnviarRutaEliminarError(p_error){
    _RutaEnvio =null;
    OcultarEspera();
    abrirPagina("pageResultados", "OK");

}
function EnviarRutaEliminarOK(p_trans,p_results){
    _RutaEnvio =null;
    OcultarEspera();
    abrirPagina("pageResultados", "OK");

}
function ErrorEnviarRuta(p_ruta) {


    //try {
    //    p_registro.Guardar();
    //    abrirPagina("pageResultados", "ERROR2");
    //}
    //catch (ex) {
    //    abrirPagina("pageResultados", "ERROR1");
    //}
}

function EliminarEnviarRuta(p_ruta){
    try{
        //Eliminar la ruta de local
        var v_puntos = new clListaRutaPunto();
        //var v_error=v_puntos.Eliminar((p_ruta.IDRUTAORIGEN==-1)? p_ruta.ID:p_ruta.IDRUTAORIGEN,p_ruta.IDPUNTOINICIO,p_ruta.IDPUNTOFIN);
        var v_error=v_puntos.EliminarSQLite((p_ruta.IDRUTAORIGEN==-1)? p_ruta.ID:p_ruta.IDRUTAORIGEN,p_ruta.IDPUNTOINICIO,p_ruta.IDPUNTOFIN);
        if(v_error=="OK"){
            //p_ruta.Eliminar();
            p_ruta.EliminarSQLite();
        }
        else{
            p_ruta.ELIMINADA=1;
            //p_ruta.Modificar();
            p_ruta.ModificarSQLite();
        }
    }
    catch (ex){}
}
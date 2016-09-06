var _Obsservaciones;
var _Espera;
var _EsperaFinalizarRuta;
var _puntosGPS;
var _puntosGPSGuardados;
function iniCapturaRuta() {
    try {

        AsignarLiterales('pageCapturaRuta');
        //$('#divMapaCapturaRuta').show();

        InicializaPantallaCaptura(_RutaCaptura == null?false:true);

        LimpiarVariables();
        if(esIOS()){}
        else {
            FleetCareGPSTracking.init(_UsuarioApp.IDUSUARIO, _UsuarioApp.INTERVALOCAPTURA, ObtenerTexto('msj_51'),true, function (ruta) {
                /* ruta al empezar la captura */
                _RutaCaptura = new clRuta();
                _RutaCaptura.ID = ruta.Id;
                $('#lblCapturandoRuta').text('Puntos GPS: 0');
                $('#lblCapturandoRuta1').text('Coordenadas GPS capturadas: 0');
            }, function (p) {
                /* puntos que se van encontrando */
                $('#lblCapturandoRuta').text('Puntos GPS:' + p);
                $('#lblCapturandoRuta1').text('Coordenadas GPS capturadas: ' + p);
                _puntosGPSGuardados=p;
            }, function (ruta) {
                /* ruta al final de la captura */
                //FinalizarCapturaAndroid(ruta);
            }, function () {
                /* función que se ejecutará al recibir aviso de 10 minutos sin coordenadas nuevas */
                MostrarAvisoCaptura();
            });
        }
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}

function InicializaPantallaCaptura(p_capturando){
    if (p_capturando) {
        $('#divMapaCapturaRuta').show();
        $('#btnIniciarCaptura').hide();
        $('#btnFinalizarCaptura').show();
        $('#divIniciarCapturaRuta').hide();
        $('#divFinalizarCapturaRuta').show();
        $('#pageCapturaRuta_atras').hide();
        $('#pageCapturaRuta_menu').hide();
    }
    else {
        $('#divMapaCapturaRuta').hide();
        $('#btnIniciarCaptura').show();
        $('#btnFinalizarCaptura').hide();
        $('#divIniciarCapturaRuta').show();
        $('#divFinalizarCapturaRuta').hide();
        $('#pageCapturaRuta_atras').show();
        $('#pageCapturaRuta_menu').show();
    }
}

function ComprobarGPS() {
    try {

        Diagnostic.prototype.isLocationEnabled(ComprobarGPSOK, ComprobarGPSError);
    }
    catch (ex){
        mensaje(ex.message,'msj_1');
    }
}

function ComprobarGPSError(error){
    mensaje('msj_11','msj_1');
}

function ComprobarGPSOK(result){
    if(result){
        if(esIOS()) {
            IniciarCapturaIOS()
        }
        else {
            if (result) {
                try {
                    FleetCareGPSTracking.iniciarServicio(function (status) {
                        /* Devuelve el status del servicio, si está activo o no */
                        if (status) {
                            InicializaPantallaCaptura(true);
                        }
                        else {
                            InicializaPantallaCaptura(false);
                            LimpiarVariables();
                            mensaje('msj_11', 'msj_1');
                        }
                    }, function (e) {
                        InicializaPantallaCaptura(false);
                        LimpiarVariables();
                        mensaje('msj_11', 'msj_1');
                    })
                }
                catch (ex) {
                    InicializaPantallaCaptura(false);
                    LimpiarVariables();
                    mensaje('msj_11', 'msj_1');
                }
            }
            else {
                mensaje('msj_11', 'msj_1');
            }
        }
    }
    else{
        mensaje('msj_11','msj_1');
    }
}

function IniciarCapturaIOS() {
    try {

        if (_wathID == null) {
            _Obsservaciones='';
            _RutaCaptura = null;
            _mapaCaptura=null;
            _TimePosicionAnterior=null;
            _PuntoAnterior=null;

            $('#btnIniciarCaptura').hide();
            $('#btnFinalizarCaptura').show();
            $('#divIniciarCapturaRuta').hide();
            $('#divFinalizarCapturaRuta').show();
            $('#pageCapturaRuta_atras').hide();
            $('#pageCapturaRuta_menu').hide();

            $('#divMapaCapturaRuta').show();

            _puntosGPS=0;
            _puntosGPSGuardados=0;
            $('#lblCapturandoRuta').text('Puntos GPS:'+_puntosGPS.toString());
            $('#lblCapturandoRuta1').text('Coordenadas GPS capturadas: '+_puntosGPSGuardados.toString());


            _RutaCaptura = new clRuta();
            _RutaCaptura.FECHAHORAINICIO = FechaHora_DateToString(new Date);
            _RutaCaptura.ESIOS = (esIOS() ? 1 : 0);
            _RutaCaptura.GuardarSQLite(GuardarRutaOK, GuardarRutaError);

        }
    }
    catch (ex){
        mensaje(ex.message,'msj_1');
    }
}

//function GuardarCoordenada()
//{
//    try {
//        alert('1');
//        if (_RutaCaptura == null) {
//            alert('2');
//            _RutaCaptura = new clRuta();
//            _RutaCaptura.FECHAHORAINICIO = FechaHora_DateToString(new Date);
//            _RutaCaptura.ESIOS = (esIOS() ? 1 : 0);
//            _RutaCaptura.GuardarSQLite(GuardarRutaOK, GuardarRutaError);
//        }
//        else {
//            alert('3');
//            _PuntoActual.IDRUTALOCAL = _RutaCaptura.ID;
//            _PuntoActual.GuardarSQLite(GuardarRutaPuntoOK, GuardarRutaPuntoError);
//        }
//    }
//    catch (ex){alert('Guardar coordenadas: '+ex.message);}
//}

function GuardarRutaError(p_error)
{
    InicializaPantallaCaptura(false);
    LimpiarVariables();

    mensaje("msj_56",'msj_1');//No se ha podido iniciar la captura.
}
function GuardarRutaOK(p_tran,p_result)
{
    try {
        _RutaCaptura.ID = p_result.insertId;

        //10 minutos= 10*60*1000
        _Espera=setInterval(espera,10*60*1000)

        var locOptions = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true
        };

        _wathID = navigator.geolocation.watchPosition(IniciarCapturaOK,IniciarCapturaError,locOptions);
    }
    catch (ex){
        if(_wathID==null) {
            _RutaCaptura=null;
            _puntosGPS=0;
            _puntosGPSGuardados=0;
            $('#btnIniciarCaptura').show();
            $('#btnFinalizarCaptura').hide();
            $('#divIniciarCapturaRuta').show();
            $('#divFinalizarCapturaRuta').hide();
            $('#pageCapturaRuta_atras').show();
            $('#pageCapturaRuta_menu').show();

            $('#divMapaCapturaRuta').hide();

            mensaje('msj_56' , 'msj_1',': '+ ex.message);
        }
    }
}

function espera(){
    try {
        if (EsperaVencida()) {
            if (_appEnSegundoPlano) {
                LanzarNotificacion();
            }
            else {
                LanzarAvisoSonoro();
                MostrarAvisoCaptura();
            }
        }
    }
    catch (ex){}
}

function EsperaVencida(){
    try {
        if (_RutaCaptura != null) {
            if (_PuntoAnterior != null) {
                var v_timeActual = new Date;
                v_timeActual = v_timeActual.getTime();

                var v_dif = DiferenciaEnSegundos(_PuntoAnterior.FECHAHORACAPTURA, v_timeActual);

                //10 minutos 10*60
                if (v_dif > (10*60)) {
                    return true;
                }
            }
        }
    }
    catch(ex){}
    return false;
}
function LanzarNotificacion(){

    var path = window.location.pathname;
    path = path.substr(path, path.length - 10);
    var v_sonido = 'file://' + path + 'beep.wav';
    if(esIOS()){
        v_sonido = 'file://beep.wav';
    }

    cordova.plugins.notification.local.schedule({
        id: 1,
        title: 'Notificación',
        message: 'Lleva más de 10 minutos sin capturar coordenadas.',
        sound: v_sonido
    });
}

function LanzarAvisoSonoro(){
    try {
        var path = window.location.pathname;
        path = path.substr(path, path.length - 10);
        var v_sonido = 'file://' + path + 'beep.wav';
        if(esIOS()){
            v_sonido = 'beep.wav';
        }

        var _mediaAudio = new Media(v_sonido, function(){}, function(error){});
        _mediaAudio.play();
    }
    catch (ex){}
}

function MostrarAvisoCaptura(){
    try{
        if(_RutaCaptura!=null){
            var v_mensaje =ObtenerTexto('msj_57');
            var v_titulo = ObtenerTexto('txt_6');
            var v_botones =ObtenerTexto('msj_35');

            if (navigator.notification && navigator.notification.confirm) {
                navigator.notification.confirm(v_mensaje, EsperaRuta, v_titulo, v_botones);
            }
            else {
                var v_retorno = confirm(v_mensaje);
                if (v_retorno) {
                    EsperaRuta(1);
                }
                else {
                    EsperaRuta(2);
                }
            }
        }
    }
    catch (ex){}
}

function EsperaRuta(p_opcion){
    if(p_opcion==1) {
        FinalizarCaptura();
    }
    else{
        //10 minutos= 10*60*1000
        //_Espera=setInterval(espera,10*60*1000)

    }
}

function IniciarCapturaError(error){
    //alert('Error wathPosition code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    if(_wathID==null){
        //mensaje('msj_11','msj_1');
    }
}

//function IniciarCapturaOK(posicion){
//    try
//    {
//        var v_capturada=false;
//        var v_timeActual=new Date;
//        v_timeActual=v_timeActual.getTime();
//
//        if (posicionBuena(posicion)) {
//            var v_procesar=true;
//            //try {
//            //    if (_TimePosicionAnterior != null) {
//            //        var v_dif = DiferenciaEnSegundos(_TimePosicionAnterior, v_timeActual);
//            //        if (v_dif > _UsuarioApp.INTERVALOCAPTURA) v_procesar = true;
//            //        else v_procesar = false;
//            //    }
//            //    else {
//            //        _TimePosicionAnterior = v_timeActual;
//            //    }
//            //}
//            //catch(ex){}
//            //procesar coordenadas cada tres segundos
//            if(v_procesar) {
//                _TimePosicionAnterior = v_timeActual;
//                if (posicion.coords.accuracy < 50 || (_RutaCaptura == null && esIOS() )) {
//                    if (_RutaCaptura == null) {
//                        _RutaCaptura = new clRuta();
//                        _RutaCaptura.FECHAHORAINICIO = FechaHora_DateToString(new Date);
//                        _RutaCaptura.Guardar();
//                        $('#divMapaCapturaRuta').show();
//
//                        //try {
//                        //    VisualizarMapa(posicion);
//                        //}
//                        //catch (ex) {
//                        //}
//                    }
//
//                    var v_repetido = false;
//                    try {
//                        if (_PuntoAnterior != null) {
//                            if (_PuntoAnterior.COORD_X == v_punto.COORD_X && _PuntoAnterior.COORD_Y == v_punto.COORD_Y) {
//                                v_repetido = true;
//                            }
//                        }
//                    }
//                    catch (ex) {
//                    }
//
//                    if (!v_repetido) {
//                        v_capturada=true;
//                        var v_punto = new clRutaPunto();
//                        v_punto.IDRUTALOCAL = _RutaCaptura.ID;
//                        v_punto.COORD_X = posicion.coords.latitude;
//                        v_punto.COORD_Y = posicion.coords.longitude;
//                        v_punto.FECHAHORA = posicion.timestamp;
//                        v_punto.HEADING = posicion.coords.heading;
//                        v_punto.VELOCIDAD = posicion.coords.speed;
//                        v_punto.ALTITUD = posicion.coords.altitude;
//                        v_punto.ACCURACY = posicion.coords.accuracy;
//                        v_punto.ALTITUDACCURACY = posicion.coords.altitudeAccuracy;
//                        v_punto.FECHAHORACAPTURA = (new Date().getTime());
//
//
//                        var v_res = v_punto.Guardar();
//                        _PuntoAnterior = new clRutaPunto();
//                        _PuntoAnterior.COORD_X = v_punto.COORD_X;
//                        _PuntoAnterior.COORD_Y = v_punto.COORD_Y;
//                        _PuntoAnterior.FECHAHORACAPTURA = v_punto.FECHAHORACAPTURA;
//
//                        //if (!_appEnSegundoPlano) {
//                        //    try {
//                        //
//                        //        if (_TimeVisualizacionAnterior == null) {
//                        //            _TimeVisualizacionAnterior = v_timeActual;
//                        //            VisualizarPunto(posicion);
//                        //        }
//                        //        else {
//                        //            var v_dif = DiferenciaEnSegundos(_TimeVisualizacionAnterior, v_timeActual);
//                        //            if (v_dif > _UsuarioApp.INTERVALOVISUALIZACION) {
//                        //                _TimeVisualizacionAnterior = v_timeActual;
//                        //                VisualizarPunto(posicion);
//                        //            }
//                        //        }
//                        //    }
//                        //    catch (ex) {
//                        //    }
//                        //}
//                    }
//                }
//            }
//        }
//
//    }
//    catch (ex){
//        mensaje(error.message,'msj_1');
//    }
//
//}

function IniciarCapturaOK(posicion){
    try
    {
        if(posicion!=null) {
            _puntosGPS = _puntosGPS + 1;
            $('#lblCapturandoRuta').text('Puntos GPS:' + _puntosGPS.toString());
            var v_timeActual = new Date;
            v_timeActual = v_timeActual.getTime();

            var v_fechaHora= new Date(posicion.timestamp);
            var v_fecha= new Date();
            _PuntoActual = new clRutaPunto();
            _PuntoActual.IDRUTALOCAL = _RutaCaptura.ID;
            _PuntoActual.COORD_X = posicion.coords.latitude;
            _PuntoActual.COORD_Y = posicion.coords.longitude;
            _PuntoActual.FECHAHORA = FechaHora_DateToString(v_fechaHora);
            _PuntoActual.HEADING = indefinidoOvacioToCero(posicion.coords.heading);
            _PuntoActual.VELOCIDAD = indefinidoOvacioToCero(posicion.coords.speed);
            _PuntoActual.ALTITUD = indefinidoOvacioToCero(posicion.coords.altitude);
            _PuntoActual.ACCURACY = indefinidoOvacioToCero(posicion.coords.accuracy);
            _PuntoActual.ALTITUDACCURACY = indefinidoOvacioToCero(posicion.coords.altitudeAccuracy);
            _PuntoActual.FECHAHORACAPTURA = FechaHora_DateToString(v_fecha);
            _PuntoActual.VALIDO = 1;

            var v_procesar = true;

            try {
                if (!posicionBuena(posicion)) {
                    v_procesar = false;
                    _PuntoActual.VALIDO = -1;
                }
                else {
                    try {
                        if (_TimePosicionAnterior != null) {
                            var v_dif = DiferenciaEnSegundos(_TimePosicionAnterior, v_timeActual);
                            _PuntoActual.DIFF = v_dif;
                            if (v_dif > _UsuarioApp.INTERVALOCAPTURA) v_procesar = true;
                            else v_procesar = false;
                        }
                        else {
                            v_procesar = true;
                        }
                    }
                    catch (ex) {
                    }

                    if (v_procesar) {
                        if (posicion.coords.accuracy > 50) _PuntoActual.VALIDO = -3;
                        else {
                            try {
                                if (_PuntoAnterior != null) {
                                    if (_PuntoAnterior.COORD_X == _PuntoActual.COORD_X && _PuntoAnterior.COORD_Y == _PuntoActual.COORD_Y) {
                                        _PuntoActual.VALIDO = -4;
                                    }
                                }
                            }
                            catch (ex) {
                            }
                        }
                    }
                    else {
                        _PuntoActual.VALIDO = -2;
                    }
                }
            }
            catch (ex) {
                _PuntoActual.VALIDO = -5;
            }

            if (v_procesar && _PuntoActual.VALIDO == 1) {
                _TimePosicionAnterior = v_timeActual;
            }

            if (_PuntoActual.VALIDO == 1) {
                _PuntoActual.DISTANCIA = 0;

                _PuntoActual.GuardarSQLite(GuardarRutaPuntoOK, GuardarRutaPuntoError);
            }
        }
    }
    catch (ex){
        //mensaje("Error posición OK : "+error.message,'msj_1');
    }

}

function posicionBuena(posicion){
    try{
        if(posicion!=null){
            if(indefinidoOvacioToCero(posicion.coords.heading)== 0 &&
                indefinidoOvacioToCero(posicion.coords.altitude)== 0 &&
                indefinidoOvacioToCero(posicion.coords.speed)== 0 &&
                indefinidoOvacioToCero(posicion.coords.accuracy) >10){
                return false;
            }
            else return true;
        }
        else return false;
    }
    catch(ex){return false;}
}

function GuardarRutaPuntoError(p_error)
{
    //alert('Guardar RutaPunto Error: '+p_error.code);

}
function GuardarRutaPuntoOK(p_tran,p_result)
{

    _puntosGPSGuardados=_puntosGPSGuardados+1;

    $('#lblCapturandoRuta1').text('Coordenadas GPS capturadas: '+_puntosGPSGuardados.toString());

    _PuntoAnterior = new clRutaPunto();
    _PuntoAnterior.COORD_X = _PuntoActual.COORD_X;
    _PuntoAnterior.COORD_Y = _PuntoActual.COORD_Y;
    _PuntoAnterior.FECHAHORACAPTURA = _PuntoActual.FECHAHORACAPTURA;

}
function VisualizarMapa(posicion){
    try
    {

        //Posicionar mapa en la posición inicial de la ruta
        var myLatLng = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);

        var myOptions = {
            zoom: 15,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggable:false,
            scrollwheel:false,
            navigationControl:false,
            scaleControl:false,
            streetViewControl:false,
            keyboardShortcuts:false
        };

        _mapaCaptura = new google.maps.Map(document.getElementById("divMapaCapturaRuta"), myOptions);

    }
    catch (ex){mensaje(ex.message,'msj_1');}
}

function VisualizarPunto(posicion){
    try
    {
        if(_mapaCaptura==null){
            VisualizarMapa(posicion);
        }

        var myLatLng = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);

        if(_mapaCapturaMarcador != null) {
            _mapaCapturaMarcador.setMap(null);
            _mapaCapturaMarcador=null;
        }
        _mapaCapturaMarcador = new google.maps.Marker({
            position:myLatLng,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5, //tamaño
                strokeColor: '#008cff', //color del borde
                strokeWeight: 10, //grosor del borde
                strokeOpacity:0.2,//opacidad del borde
                fillColor: '#008cff', //color de relleno
                fillOpacity:1// opacidad del relleno
            },
            draggable:false,
            map: _mapaCaptura
        });

        _mapaCaptura.setCenter(myLatLng);

    }
    catch (ex){mensaje(ex.message,'msj_1');}
}

function FinalizarCaptura() {
    try {
        MostrarEspera();

        $('#btnIniciarCaptura').show();
        $('#btnFinalizarCaptura').hide();
        $('#divIniciarCapturaRuta').show();
        $('#divFinalizarCapturaRuta').hide();
        $('#pageCapturaRuta_atras').show();
        $('#pageCapturaRuta_menu').show();
        $('#divMapaCapturaRuta').hide();

        _TimeEspera=null;
        _TimePosicionAnterior=null;
        _PuntoAnterior = null;
        clearInterval(_Espera);

        if (esIOS()) {
            FinalizarCapturaRuta();
        }
        else {
            try {
                FleetCareGPSTracking.finalizarServicio(function (status) {
                    /* Devuelve el status del servicio, si está activo o no */
                    FinalizarCapturaRuta();
                    //if (status) {
                    //    alert('finalizarServicioOK_true');
                    //}
                    //else {
                    //    alert('finalizarServicioOK_false');
                    //}
                }, function (e) {
                    OcultarEspera();
                    mensaje(e.message, 'msj_1');
                });
            }
            catch(ex){
                OcultarEspera();
                mensaje(ex.message, 'msj_1');
            }
        }
    }
    catch (ex){mensaje(ex.message,'msj_1');}
}
//function FinalizarCapturaAndroid(ruta){
//    try {
//        //_RutaCaptura = ruta;
//        alert(_RutaCaptura.IdRuta);
//        var v_ruta = new clRuta();
//        v_ruta.FinalizarRutaSQLite(_RutaCaptura.ID, FinalizarRutaSQLiteOK, FinalizarRutaSQLiteError)
//        $('#lblCapturandoRuta').text('Puntos GPS: 0');
//        $('#lblCapturandoRuta1').text('Coordenadas GPS capturadas: 0');
//        OcultarEspera();
//        if (_RutaCaptura.ListaPuntos.length > 0) {
//            abrirPagina("pageFichaRuta", _RutaCaptura.IdRuta, 'Captura');
//            LimpiarVariables();
//        }
//        else {
//            LimpiarVariables();
//            mensaje('msj_12', 'msj_2');
//        }
//    }
//    catch (ex){
//        LimpiarVariables();
//        mensaje(ex.message,'msj_1');
//    }
//}
function FinalizarCapturaRuta() {
    try
    {
        try
        {
            if (_wathID != null) {
                navigator.geolocation.clearWatch(_wathID);
                _wathID = null;
            }
        }
        catch (ex){}

        if (_RutaCaptura != null) {

            if(_puntosGPSGuardados==0){
                //La ruta no tiene puntos asociados, se elimina
                OcultarEspera();
                var v_ruta = new clRuta();
                v_ruta.EliminarCompletoSQLite("("+_RutaCaptura.ID+")",EliminarRutaSQLiteOK,EliminarRutaSQLiteError)
                mensaje('msj_12', 'msj_2');
            }
            else {
                var v_ruta = new clRuta();
                v_ruta.FinalizarRutaSQLite(_RutaCaptura.ID, FinalizarRutaSQLiteOK, FinalizarRutaSQLiteError);
            }
        }
        else{
            OcultarEspera();
        }
    }
    catch (ex){
        OcultarEspera();
        LimpiarVariables();
        mensaje(ex.message,'msj_1');
    }
}

function LimpiarVariables(){
    try {
        _wathID = null;
        _RutaCaptura = null;
        _PuntoAnterior = null;
        _TimeEspera = null;
        _TimePosicionAnterior = null;
        _puntosGPS = 0;
        _puntosGPSGuardados = 0;
        clearInterval(_Espera);
        clearInterval(_EsperaFinalizarRuta);
    }
    catch(ex){}
}

function FinalizarRutaSQLiteError(error){
    OcultarEspera();
    LimpiarVariables();
}
function FinalizarRutaSQLiteOK(p_trans,p_result){
    OcultarEspera();
    abrirPagina("pageFichaRuta", _RutaCaptura.ID, 'Captura');
    LimpiarVariables();
}

function EliminarRutaSQLiteError(p_error){
    LimpiarVariables();
}
function EliminarRutaSQLiteOK(p_tran,p_result){
    LimpiarVariables();
}
//function ObtenerRutaCompletoSQLiteError(error){
//    OcultarEspera();
//    alert('ObtenerRutaCompletoSQLiteError:'+JSON.stringify(error));
//    _wathID = null;
//    _RutaCaptura = null;
//    _PuntoAnterior=null;
//    _TimeEspera=null;
//    _TimePosicionAnterior=null;
//    clearInterval(_Espera);
//}
//function ObtenerRutaCompletoSQLiteOK(p_trans,p_result) {
//    try {
//        var v_ruta = new clRuta();
//        var v_res=v_ruta.ProcesaResultadosCompleto(p_result);
//
//        //Si se han guardado puntos asociados a la ruta
//        if (v_res=="OK") {
//            var v_dFechaFin = new Date();
//            var v_duracion = CalculaTiempo_hhmm(FechaHora_StringToDate(v_ruta.FECHAHORAINICIO), v_dFechaFin);
//
//            var v_dis = v_ruta.DISTANCIAPUNTOS;
//            var v_km=v_dis/1000;
//
//            var v_distancia=  +(Math.round(v_km + "e+2")  + "e-2");
//
//            var v_posIni = new google.maps.LatLng(v_ruta.COORD_X_INI, v_ruta.COORD_Y_INI);
//            var v_direccionIni = cogerDireccion(v_posIni);
//            var v_posFin = new google.maps.LatLng(v_ruta.COORD_X_FIN, v_ruta.COORD_Y_FIN);
//            var v_direccionFin = cogerDireccion(v_posFin);
//
//            v_ruta.FECHAHORAFIN = FechaHora_DateToString(v_dFechaFin);
//            v_ruta.DURACION = v_duracion;
//            v_ruta.DISTANCIA = v_distancia;
//            v_ruta.DIRECINICIO = v_direccionIni;
//            v_ruta.DIRECFIN = v_direccionFin;
//            //v_ruta.IDPUNTOINICIO =v_ruta.ID_INI;
//            //v_ruta.IDPUNTOFIN = v_ruta.ID_FIN;
//            v_ruta.OBSERVACIONES = "";
//
//            var v_res = v_ruta.ModificarSQLite(ModificarRutaSQLiteOK,ModificarRutaSQLiteError);
//
//        }
//        else {
//            //La ruta no tiene puntos asociados, se elimina
//            OcultarEspera();
//            _RutaCaptura.EliminarSQLite(EliminarRutaSQLiteOK,EliminarRutaSQLiteError);
//            mensaje('msj_12', 'msj_2');
//        }
//    }
//    catch(ex){
//
//    }
//}
//
//function ModificarRutaSQLiteError(p_error){
//    OcultarEspera();
//    alert('ModificarRutaSQLiteError: '+JSON.stringify(p_error));
//    _RutaCaptura = null;
//    _PuntoAnterior=null;
//
//}
//function ModificarRutaSQLiteOK(p_tran,p_result){
//    OcultarEspera();
//    abrirPagina("pageFichaRuta", _RutaCaptura.ID, 'Captura');
//    _RutaCaptura = null;
//    _PuntoAnterior=null;
//
//}


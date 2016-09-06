var navLIFO = new Array();
var itemAnterior = "";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        if(phoneGapRun()) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }
        else
        {
            deviceReady();
        }
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        deviceReady();
    }
};

function deviceReady() {
    try {
/*        if (!$.jStorage.storageAvailable()) {
            mensaje('msj_8', 'msj_1');
            salir1();
        }*/


        var success = function(status) {
            //alert('Cache Message: ' + status);
        }

        var error = function(status) {
            //alert('Cache Error: ' + status);
        }

/*        window.cache.clear( success, error );*/

        //if(!phoneGapRun()) {
        //    mensaje('msj_43', 'msj_1');
        //    salir1();
        //}

        //2 minutos= 2*60*1000
/*        setInterval(function(){window.cache.clear( success, error )},2*60*1000)*/

        //Evento q se dispara cuando se pulsa el botón atrás
        document.addEventListener("backbutton", handleBackButton, false);
        //Evento q se dispara cuando la aplicación vuelve a primer plano
        document.addEventListener("resume", onResume, false);
        //Evento q se dispara cuando la aplicación se va a segundo plano
        document.addEventListener("pause", onPause, false);

/*        try {
            //Evento q se dispara cuando se pulsa sobre una notificación
            cordova.plugins.notification.local.on('click', function (id, state, json) {
                MostrarAvisoCaptura();
            });
        }
        catch(ex){}
        try {
            //Evento q se dispara cuando se crea una notificación desde capturar ruta
            cordova.plugins.notification.local.on('schedule', function (id, state, json) {
                LanzarAvisoSonoro();
            });
        }
        catch (ex){}*/

/*        bdSQLite_abrir();
        bdSQLite_creartablas();*/
/*
        try {
            _Dispositivo = "DISPOSITIVO: " + device.model + "  , " + device.platform + "  " + device.version + " - ";
            _AndroidVersion=device.version;
            if(!esIOS()){
                FleetCareGPSTracking.numeroProcesadores(function (p_num) {
                    _AndroidNumNucleos = p_num;
                }, function (e) {
                });
            }
        }
        catch (ex){_Dispositivo="";}
        //alert(_Dispositivo);

        if(esIOS()){
            MostrarPantallaLogin();
        }
        else {
            try {
                FleetCareGPSTracking.estaActivo(function (status) {
                    if (status) {
                        ReanudarDesdeServicio();
                    } else {
                        MostrarPantallaLogin();
                    }
                }, function (e) {
                    MostrarPantallaLogin();
                    mensaje(e.message, 'msj_1');
                });
            }
            catch(ex){
                MostrarPantallaLogin();
            }
        }
        */

        copiaPDFs();

        navLIFO.push("pageMENU|0|");
        $('#divInicio').hide();
/*

        cargaPaginaInfoCateter('es-es', 0);
        $.mobile.changePage('#pageMENU', {transition: "none"});
*/

    }
    catch(ex){MostrarPantallaLogin();mensaje(ex.message,'msj_1');}
}

/* InfCateter */
function Menu() {
    $("#pageMenuLateral" ).panel().panel("open");
}

function Atras() {
    var item="";
    try
    {
        if(navLIFO.length > 1)
        {
            navLIFO.pop();
            item = navLIFO.pop();
            abrirPagina(item.split("|")[0], item.split("|")[1], item.split("|")[2]);
        }
        else {
            salir();
        }
    }
    catch(ex)
    {
        alert(ex.message);
    }
}

function abrirPagina(sPag, id, titulo) {

    try
    {

        navLIFO.push(sPag + "|" + id + "|" + titulo);

        $.mobile.changePage('#' + sPag, {transition: "slide"});

        if(navLIFO.length > 1) {
            //Imagen del header --> Atrás
            /*            $("#imgHeaderAtras").attr("src","images/back.png");
             $("#imgHeaderAtras").attr("onclick","Atras()");*/
            //Texto del header --> Atrás
            /*        itemAnterior = "atrás";
             if (typeof itemAnterior !== "undefined" && itemAnterior != "") $("#txtHeaderAtras").html(itemAnterior);*/

            //Texto de header --> Título
            //if(typeof ? !== "undefined") $("#txtHeaderTitulo").html(?);
        }
        else {
            //Imagen del header --> Atrás
            /*            $("#imgHeaderAtras").attr("src","images/cateter.png");
             $("#imgHeaderAtras").attr("onclick","");*/
            //Texto del header --> Atrás
            /*$("#txtHeaderAtras").html("");*/

            //Texto de header --> Título
            //if(typeof ? !== "undefined") $("#txtHeaderTitulo").html(?);
        }

        //Texto de body --> Titulo
        if(typeof titulo !== "undefined") $("#tituloMenu").html(titulo);

        switch (sPag) {
            case 'pageMENU':
                $.doTimeout(1500, cargaPaginaInfoCateter('es-es', id));
                break;

            case 'pageInfoXML':
                $.doTimeout(1500, inicioPaginaInfoXML());
                break;

            case 'pageFiltro':
                $.doTimeout(1500, inicioPaginaFiltro(titulo));
                break;

            case 'pageAYUDA':
                $.doTimeout(1500, inicioPaginaAyuda(titulo));
                break;

            case 'pageINFO':
                $.doTimeout(1500, inicioPaginaInfo(titulo));
                break;

        }

    }
    catch(ex)
    {
        alert(ex.message);
    }
}

/* InfCateter */

function TesteoAndroidMinimo(){

    if(esIOS()){
        return true;
    }
    else {
        try {

            //alert(_AndroidNumNucleos);
            //alert(_AndroidVersion);
            if (_AndroidNumNucleos < 4) return false;

            var v_str = _AndroidVersion.split(".");
            if (v_str.length > 2) {
                if (parseInt(v_str[0]) < 4) return false;
                else {
                    if (parseInt(v_str[0]) == 4) {
                        if (parseInt(v_str[1]) < 2) return false;
                        else {
                            if (parseInt(v_str[1]) == 2) {
                                if (parseInt(v_str[0]) < 2) return false;
                            }
                        }
                    }
                }
            }
            else {
                if (v_str.length > 1) {
                    if (parseInt(v_str[0]) < 4) return false;
                    else {
                        if (parseInt(v_str[0]) == 4) {
                            if (parseInt(v_str[1]) < 2) return false;
                        }
                    }
                }
                else {
                    if (v_str.length > 0) {
                        if (parseInt(v_str[0]) < 4) return false;
                    }
                }
            }

            return true;
        }
        catch (ex) {
            return false;
        }
    }
}
function onPause() {
    setTimeout(function() {
        _appEnSegundoPlano=true;
    }, 0);

    //try{
    //    cordova.plugins.notification.local.schedule({
    //        id: 2,
    //        title: 'FleetCare',
    //        message: 'Aplicación en segundo plano.',
    //        sound:null
    //    });
    //}
    //catch (ex){}
}

function onResume() {
    //si no se utiliza el SetTimeout en IOS no funciona
    setTimeout(function() {
        _appEnSegundoPlano=false;
        try {
            //Se cancelan las notificaciones pendientes
            cordova.plugins.notification.local.getAllIds(function (ids) {
                if (ids != null) {
                    if (ids.length > 0) {
                        //alert(ids[0]);
                        try {
                            cordova.plugins.notification.local.cancelAll(function (ids) {
                            });
                        }
                        catch(ex){}
                        //Si aún se están esperando coordenadas nuevas se muestra confirmación
                        if (EsperaVencida()) {
                            MostrarAvisoCaptura();
                        }
                    }
                }
            });
        }
        catch(ex){}
    }, 0);
}

function MostrarPantallaLogin(){
    $('#divInicio').hide();
    var v_objUsu = new clUsuario();
    var v_resultado = v_objUsu.Obtener();
    if (v_resultado == "OK") {
        AsignarLiterales('pageIndex');
        $('#inputLOGIN').val(v_objUsu.LOGIN);
        $('#inputPASSWORD').val(v_objUsu.PASSWORD);
        estadoControl('inputLOGIN', false);
    } else {
        estadoControl('inputLOGIN', true);
    }

}
//------------------------------------------------------------------------
// Inicializar la api de google
// Como el lenguaje va en función del clUsuario y la clave de la api
// irá en función de la empresa
// Se inicializa el google maps con la información asociada al clUsuario
//------------------------------------------------------------------------
function loadMap(p_lenguaje,p_clave) {
    try {
        var v_scr = "https://maps.googleapis.com/maps/api/js?v=3&key=" + p_clave + "&sensor=true&language=" + p_lenguaje + "&libraries=geometry";

        // save old document.write
        var oldDocumentWrite = document.write

        // change document.write temporary
        document.write = function (node) {
            //alert('4');
            try {
                $("body").append(node)
            }
            catch (ex){mensaje(ex.message,'msj_1');}
        }

        // get script
        $.getScript(v_scr, function () {
            // replace the temp document.write with the original version
            try {
                setTimeout(function () {
                    document.write = oldDocumentWrite
                }, 100)
            }
            catch (ex){mensaje(ex.message,'msj_1');}
        });
    }
    catch (ex){mensaje(ex.message,'msj_1');}
}

//------------------------------------------------------------------------
// Mostrar-Ocultar menú
//------------------------------------------------------------------------
function verMenu(){
    try{
        var v_alto=$(document).height();
        document.getElementById('divMenu').style.height=v_alto+"px";
    }catch(ex) {}

    $('#divMenu').fadeIn(300);
}
function ocultarMenu(){
    $('#divMenu').fadeOut(300);
}

//------------------------------------------------------------------------
// Evento 'patras'
//------------------------------------------------------------------------
function handleBackButton() {
    try {
        var v_pagActiva = $.mobile.activePage.attr('id');
        switch (v_pagActiva) {
            case 'pageIndex':
                salir();
                break;
            case 'pageInicio':
                salir();
                break;
            case 'pageCapturaRuta':
                if(esIOS()){
                    if (_wathID == null)abrirPagina("pageInicio");
                }
                else{
                    if($('#btnFinalizarCaptura').css("display")=="none") abrirPagina("pageInicio");
                }
                break;
            case 'pageListaRuta':
                abrirPagina("pageInicio");
                break;
            case 'pageConsultaRuta':
                abrirPagina("pageInicio");
                break;
            case 'pageDatosConductor':
                abrirPagina("pageInicio");
                break;
            case 'pageDatosVehiculo':
                abrirPagina("pageInicio");
                break;
            case 'pageNotificacion':
                abrirPagina("pageInicio");
                break;
            case 'pageFichaNotificacion':
                abrirPagina("pageNotificacion");
                break;
            case 'pageEntradaKM':
                if (_origenEntradaKm == "Editar") abrirPagina("pageRevisionKM");
                else abrirPagina("pageInicio");
                break;
            case 'pageRevisionKM':
                abrirPagina("pageInicio");
                break;
            case 'pageFichaRuta':
                if($('#divObservaciones').css("display")=="none") {
                    if (_origenFichaRuta == "Captura") {
                        abrirPagina("pageInicio");
                    }
                    else if (_origenFichaRuta == "Consulta") {
                        abrirPagina("pageConsultaRuta");
                    }
                    else if (_origenFichaRuta == "Pendientes") {
                        abrirPagina("pageListaRuta");
                    }
                }
                else{
                    $('#divObservaciones').hide();
                }
                break;
            case 'pageEditarRuta':
                irAtras();
                break;
            case 'pageResultados':
                abrirPagina("pageInicio");
                break;
            case 'pageConsultaRutaCoordenadas':
                irAtras();
                break;
        }
    }
    catch (ex){}
}

function irAtras(){
    if (esIOS()) {
        window.history.back();
    }
    else {
        if (navigator.app) {
            navigator.app.backHistory();

        } else if (navigator.device) {
            navigator.device.backHistory();
        }
        else {
            window.history.back();
        }
    }
}
function handleBackButton1() {
    try {
        if ($.mobile.activePage.attr('id') == 'pageIndex') {
            salir();
        }
        else if ($.mobile.activePage.attr('id') == 'pageInicio') {
            salir();
        }
        else if ($.mobile.activePage.attr('id') == 'pageFichaNotificacion') {
            abrirPagina("pageNotificacion");
        }
        else if ($.mobile.activePage.attr('id') == 'pageResultados') {
            abrirPagina("pageInicio");
        }
        else if ($.mobile.activePage.attr('id') == 'pageFichaRuta') {
            if(_origenFichaRuta=="Captura"){
                abrirPagina("pageInicio");
            }
            else{
                if (esIOS()) {
                    window.history.back();
                }
                else {
                    if (navigator.app) {
                        navigator.app.backHistory();

                    } else if (navigator.device) {
                        navigator.device.backHistory();
                    }
                    else {
                        window.history.back();
                    }
                }
            }
        }
        else{
            var v_atras=true;
            if ($.mobile.activePage.attr('id') == 'pageCapturaRuta'){
                if(_wathID != null) v_atras=false;
            }
            if(v_atras) {
                if (esIOS()) {
                    window.history.back();
                }
                else {
                    if (navigator.app) {
                        navigator.app.backHistory();
                    } else if (navigator.device) {
                        navigator.device.backHistory();
                    }
                    else {
                        window.history.back();
                    }
                }
            }
        }
    }
    catch (ex) {
        //alert("handleBackButton: " +ex.message);
    }
}

//-------------------------------------------------------------
// Navegación entre las distintas páginas
//-------------------------------------------------------------
function abrirPagina222(p_pagina,p_param1,p_param2) {

    $.mobile.changePage('#' + p_pagina, {transition: "none"});

    switch (p_pagina) {
        case 'pageIndex':
            break;
        case 'pageInicio':
            $.doTimeout(1500, inicioPaginaInicio());
            break;
        case 'pageCapturaRuta':
            $.doTimeout(1500, iniCapturaRuta());
            break;
        case 'pageListaRuta':
            $.doTimeout(1500, inicioPaginaListaRutas());
            break;
        case 'pageConsultaRuta':
            $.doTimeout(1500, inicioPaginaConsultaRutas());
            break;
        case 'pageDatosConductor':
            $.doTimeout(1500, inicioPaginaDatosUsuario());
            break;
        case 'pageDatosVehiculo':
            $.doTimeout(1500, inicioPaginaDatosVehiculo());
            break;
        case 'pageNotificacion':
            $.doTimeout(1500, inicioPaginaNotificacion());
            break;
        case 'pageEntradaKM':
            $.doTimeout(1500, inicioPaginaEntradaKm(p_param1,p_param2));
            break;
        case 'pageRevisionKM':
            $.doTimeout(1500, inicioPaginaRevisionKm());
            break;
        case 'pageFichaRuta':
            $.doTimeout(1500, inicioPaginaFichaRuta(p_param1,p_param2));
            break;
        case 'pageEditarRuta':
            $.doTimeout(1500, inicioPaginaEditarRuta(p_param1));
            break;
        case 'pageResultados':
            $.doTimeout(1500, inicioPaginaResultados(p_param1));
            break;
    }
}

//-------------------------------------------------------------
// Mostrar-Ocultar espera
//-------------------------------------------------------------
function MostrarEspera(){
    try{
        var v_alto=$(document).height();
        document.getElementById('divEspera').style.height=v_alto+"px";
    }catch(ex) {}
    $('#divEspera').show();

}
function OcultarEspera(){
    $('#divEspera').hide();
}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
// VALIDAR USUARIO
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function ValidarUsuario() {
    try {

        var v_login = $('#inputLOGIN').val();
        var v_password = $('#inputPASSWORD').val();



        //_UsuarioApp=new clUsuario();
        //_UsuarioApp.LOGIN="pruebasws";
        //_UsuarioApp.PASSWORD="prueb@s1234";
        //_UsuarioApp.IDIOMA="es-ES";
        //_UsuarioApp.CLAVEGOOGLE=_claveMapa;
        //_UsuarioApp.OPCIONESMENU="1111111111";
        //_UsuarioApp.Guardar();
        //
        //_UsuarioApp.Obtener();
        //var v_lista= new clListaVehiculoFlota();
        //v_lista.ObtenerLista();
        //_ListaVehiculosFlota=v_lista.Lista;
        //_frecuenciaDeCaptura = _UsuarioApp.INTERVALOCAPTURA;;
        ////Inicializar google_maps
        //loadMap(_UsuarioApp.IDIOMA, _UsuarioApp.CLAVEGOOGLE);
        //////
        //////////
        ////////////try {CrearRuta();}
        ////////////catch (ex) {}
        //FinalizarProcesoDeInicio(true);





        MostrarEspera();
        var v_url=_urlUsuario+"/"+v_login+"/"+v_password;

        $.ajax({
            type: "GET",
            cache:false,
            url: v_url,
            contentType: "application/json",
            success: CompruebaUsuario_OK,
            error: function(error){mensaje('msj_9',"msj_3")}
        });


    }
    catch (ex){
        mensaje(ex.message,'msj_1');
    }
}

//-------------------------------------------------------------
// CompruebaUsuario_OK(datos)
// Se ejecuta al finalizar la invocación del servicio rest de validación de clUsuario
//    se procesan los datos recibidos
//    se navega a la página de inicio
//-------------------------------------------------------------
function CompruebaUsuario_OK(datos) {
    try {
        var v_objUsu = new clUsuario();
        var v_resultado = v_objUsu.Obtener();
        var v_ExisteUsuario = 1;
        if (v_resultado == null) {
            v_ExisteUsuario = 1;
            AsignarLiterales('pageIndex');
        }

        var v_error = ProcesarDatosCompruebaUsuario(datos);
        if (v_error == "OK") {
            //Guardar en variable local los datos del usuario
            _UsuarioApp = new clUsuario();
            _UsuarioApp.Obtener();
            v_error = CompruebaAccesoGoogleMaps();
            if (v_error != "ERROR") {
                if (v_error == "ACCESO") {
                    _frecuenciaDeCaptura = _UsuarioApp.INTERVALOCAPTURA;
                    //Inicializar google_maps
                    loadMap(_UsuarioApp.IDIOMA, _UsuarioApp.CLAVEGOOGLE);
                }
                //Guardar en variable local los vehículos de flota del usuario
                var v_lista = new clListaVehiculoFlota();
                v_lista.ObtenerLista();
                _ListaVehiculosFlota = v_lista.Lista;

                //Obtener Etiquetas, actualizar notificaciones y finalizar proceso de validación
                ObtenerEtiquetas(v_ExisteUsuario);
            }
            else mensaje('msj_50', 'msj_4')
        }
        else {
            mensaje(v_error, 'msj_4');
        }
    }
    catch (ex) {
        mensaje(ex.message, 'msj_1');
    }
}

function CompruebaAccesoGoogleMaps(){
    try {
        var v_long = _UsuarioApp.OPCIONESMENU.length;
        var v_accesoCaptura = false;
        var v_accesoLista = false;
        var v_accesoConsulta = false;
        if (v_long >= 1 && _UsuarioApp.OPCIONESMENU.substr(0, 1) == "1") {
            v_accesoCaptura = true;
        }
        if (v_long >= 2 || _UsuarioApp.OPCIONESMENU.substr(1, 1) == "1") {
            v_accesoLista = true;
        }
        if (v_long >= 3 || _UsuarioApp.OPCIONESMENU.substr(2, 1) == "1") {
            v_accesoConsulta = true;
        }

        if (v_accesoCaptura || v_accesoLista || v_accesoConsulta) {
            if(indefinidoOnullToVacio(_UsuarioApp.CLAVEGOOGLE) == '') _UsuarioApp.CLAVEGOOGLE=_claveMapa;

            if (indefinidoOnullToVacio(_UsuarioApp.IDIOMA) == '' || indefinidoOnullToVacio(_UsuarioApp.CLAVEGOOGLE) == '' || indefinidoOnullToVacio(_UsuarioApp.INTERVALOCAPTURA) == 0) {
                return "ERROR"
            }
            else {
                return "ACCESO";
            }
        }
        else return "SINACCESO";
    }
    catch(ex){ return "ERROR: "+ex.message;}
}
//-------------------------------------------------------------
// Obtener Lista Etiquetas
//-------------------------------------------------------------
function ObtenerEtiquetas(p_SoloModificado){
    try{
        var v_url=_urlUsuario+"/"+_UsuarioApp.LOGIN.toString()+"/"+_UsuarioApp.PASSWORD.toString()+"/"+p_SoloModificado.toString();
        $.ajax({
            type: "GET",
            cache:false,
            url: v_url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(datos){
                var v_error = ProcesarDatosEtiquetas(datos);
                if(v_error=="OK"){
                    TratarNotificaciones();
                }
                else{
                    if(p_SoloModificado) TratarNotificaciones();
                    else mensaje('msj_9',"msj_3");
                }
            },
            error:   function(error){
                if(p_SoloModificado) TratarNotificaciones();
                else mensaje('msj_9',"msj_3");
            }
        });
    }
    catch(ex){
        if(p_SoloModificado) TratarNotificaciones();
        else mensaje('msj_9',"msj_3");
    }
}

//-------------------------------------------------------------
//-------------------------------------------------------------
// Actualizar notificaciones
//-------------------------------------------------------------
//-------------------------------------------------------------
function TratarNotificaciones(){
    var v_error = EnviarNotificacionesPendientes();
    ObtenerListaNotificacionesWS(v_error);
}
//-------------------------------------------------------------
// Enviar Notificaciones Pendientes
//-------------------------------------------------------------
function EnviarNotificacionesPendientes(){
    var v_error="OK";
    try{
        var v_resultado="";
        var v_lista = new clListaNotificacion();
        v_lista.ObtenerLista();
        for(var i=0;i<v_lista.Lista.length;i++){
            if(v_lista.Lista[i].LEIDA==1 && v_lista.Lista[i].ENVIADO==0){
                v_resultado= ActualizarNotificacionWS(v_lista.Lista[i].ID,true);
                if(v_resultado!="OK") {
                    v_error = v_resultado;
                }
            }
        }
    }
    catch (ex){
        v_error=ex.message;
    }
    return v_error;
}

//-------------------------------------------------------------
// Obtener lista de notificaciones
//-------------------------------------------------------------
function ObtenerListaNotificacionesWS(p_error) {
    try {
        var v_url=_urlNotificacion+"/"+_UsuarioApp.LOGIN.toString()+"/"+_UsuarioApp.PASSWORD.toString();


        $.ajax({
            type: "GET",
            cache:false,
            url: v_url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(datos){
                try {
                    if (datos != null) {
                        var v_lista=datos;
                        var v_indice=0;
                        for(var i=0;i<v_lista.length;i++){
                            var v_notificacionNew  = new clNotificacion(v_lista[i]);
                            var v_notificacion  = new clNotificacion();
                            var v_res = v_notificacion.Obtener_porIdNotificacion(v_notificacionNew.IDNOTIFICACION);
                            if(v_res=="OK" && v_notificacion.LEIDA==0 ){
                                v_notificacion.TEXTO=v_notificacionNew.TEXTO
                                v_notificacion.FECHA=v_notificacionNew.FECHA
                                v_notificacion.ASUNTO=v_notificacionNew.ASUNTO
                                v_notificacion.LEIDA=v_notificacionNew.LEIDA
                                v_notificacion.Modificar();
                            }
                            else{
                                v_notificacionNew.Guardar();
                            }
                        }
                    }
                    if(p_error=="OK") FinalizarProcesoDeInicio(true);
                    else  FinalizarProcesoDeInicio(false,"msj_29");//No se ha podido actualizar la lista de notificaciones.
                }
                catch (ex){ FinalizarProcesoDeInicio(false,"msj_29");}//No se ha podido actualizar la lista de notificaciones.
            },
            error:  function(error){ FinalizarProcesoDeInicio(false,"msj_29");}//No se ha podido actualizar la lista de notificaciones.
        });

    }
    catch (ex){
        FinalizarProcesoDeInicio(false,"msj_29");//No se ha podido actualizar la lista de notificaciones.
    }
}


//-------------------------------------------------------------
//-------------------------------------------------------------
// Fin de proceso de validación de usuario
//-------------------------------------------------------------
//-------------------------------------------------------------
function FinalizarProcesoDeInicio(p_correcto,p_error) {
    try {
        if (!p_correcto) {
            mensaje(p_error, 'msj_2')
        }
        //Ir a página principal
        OcultarEspera();
        var v_error = InicializarApp();
        $('#menuversion').html(_versionApp);
        abrirPagina("pageInicio");
    }
    catch (ex) {
        mensaje(ex.message, 'msj_1')
        abrirPagina("pageInicio");
    }
}

//-------------------------------------------------------------
// Inicializar la app en función de opciones de menú y de si es ios
//-------------------------------------------------------------
function InicializarApp(){
    var v_retorno="OK";
    try {
        if (esIOS()) {
            $('#pageInicio_atras').hide();
            $('#liMenuSalir').hide();
        }

        var v_long = _UsuarioApp.OPCIONESMENU.length;
        if (v_long < 1 || _UsuarioApp.OPCIONESMENU.substr(0, 1) != "1") {
            $('#liMenuCaptura').hide();
            $('#pageInicio_op_Capturar').hide();
        }
        if (v_long < 2 || _UsuarioApp.OPCIONESMENU.substr(1, 1) != "1") {
            $('#liMenuLista').hide();
            $('#pageInicio_op_Pendiente').hide();
        }
        if (v_long < 3 || _UsuarioApp.OPCIONESMENU.substr(2, 1) != "1") {
            $('#liMenuConsulta').hide();
            $('#pageInicio_op_Consultar').hide();
        }
        if (v_long < 4 || _UsuarioApp.OPCIONESMENU.substr(3, 1) != "1") {
            $('#liMenuDatosConductor').hide();
            $('#pageInicio_op_Conductor').hide();
        }
        if (v_long < 5 || _UsuarioApp.OPCIONESMENU.substr(4, 1) != "1") {
            $('#liMenuDatosVehiculo').hide();
            $('#pageInicio_op_Vehiculo').hide();
        }
        if (v_long < 6 || _UsuarioApp.OPCIONESMENU.substr(5, 1) != "1") {
            $('#liMenuEntradaKm').hide();
            $('#pageInicio_op_EntradaKm').hide();
        }
        if (v_long < 7 || _UsuarioApp.OPCIONESMENU.substr(6, 1) != "1") {
            $('#liMenuRevisionKm').hide();
            $('#pageInicio_op_RevisionKm').hide();
        }
        if (v_long < 8 || _UsuarioApp.OPCIONESMENU.substr(7, 1) != "1") {
            $('#liMenuNotificacion').hide();
            $('#pageInicio_op_Notificacion').hide();
        }
        if (v_long < 9 || _UsuarioApp.OPCIONESMENU.substr(8, 1) != "1") {
            $('.btLlamar').hide();
        }
        if (v_long < 10 || _UsuarioApp.OPCIONESMENU.substr(9, 1) != "1") {
            $('.btEnviar').hide();
        }
    }
    catch (ex){v_retorno=ex.message;}
    return v_retorno;
}


function ReanudarDesdeServicio() {
    var v_error="OK";
    try {
        _UsuarioApp = new clUsuario();
        _UsuarioApp.Obtener();
        _frecuenciaDeCaptura = _UsuarioApp.INTERVALOCAPTURA;
        loadMap(_UsuarioApp.IDIOMA, _UsuarioApp.CLAVEGOOGLE);
        //Guardar en variable local los vehículos de flota del usuario
        var v_lista = new clListaVehiculoFlota();
        v_lista.ObtenerLista();
        _ListaVehiculosFlota = v_lista.Lista;
    }
    catch(ex){v_error=ex.message;}

    if(v_error=="OK") {
        InicializarApp();
        $('#menuversion').html(_versionApp);
        FleetCareGPSTracking.getRutalActual(function (ruta) {
            $('#divInicio').hide();
            abrirPagina("pageCapturaRuta");
            _RutaCaptura = ruta;
            $('#btnIniciarCaptura').hide();
            $('#btnFinalizarCaptura').show();
            $('#divIniciarCapturaRuta').hide();
            $('#divFinalizarCapturaRuta').show();
            $('#pageCapturaRuta_atras').hide();
            $('#pageCapturaRuta_menu').hide();
            $('#divMapaCapturaRuta').show();
        }, function (e) {
            $('#divInicio').hide();
            abrirPagina("pageInicio");
            mensaje(e.message, 'msj_1');
        });
    }
    else{
        MostrarPantallaLogin();
    }
}
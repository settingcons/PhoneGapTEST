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
        var success = function(status) {
            //alert('Cache Message: ' + status);
        }

        var error = function(status) {
            //alert('Cache Error: ' + status);
        }


        if(!phoneGapRun()) {
            alert('Error : no funciona PhoneGap');
            salir();
        }

        //Evento q se dispara cuando se pulsa el botón atrás
/*        document.addEventListener("backbutton", handleBackButton, false);*/

        //INICIO InfCateter
        copiaPDFs();
        $.doTimeout(1500, inicio());

    }
    catch(ex){
        if(phoneGapRun())
            navigator.notification.alert(ex.message, null, "Error");
        else
            alert("Error : " + ex.message);
    }
}

/*inicia InfCateter*/
function inicio(){
    navLIFO.push("pageMENU|0|");
    cargaPaginaInfoCateter('es-es', 0);
}

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


//------------------------------------------------------------------------
// Evento 'patras'
//------------------------------------------------------------------------
function handleBackButton() {
/*    try {
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
    catch (ex){}*/
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
/*    try {
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
        alert("handleBackButton error : " + ex.message);
    }*/
}

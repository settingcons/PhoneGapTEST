function inicioPaginaConsultaRutas(){
    try
    {
        AsignarLiterales('pageConsultaRuta');
        _ListaRutasConsulta=new Array();

        var v_fecha = new Date();
        v_fecha.setDate(v_fecha.getDate()-31);
        $('#inputCONSULTARUTA_FECHAINI').val(Fecha_DateToString(v_fecha));
        $('#inputCONSULTARUTA_FECHAFIN').val(Fecha_DateToString(new Date()));

    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}


function BuscarRutas(){
    try {

        MostrarEspera();

        var v_fechaini = $('#inputCONSULTARUTA_FECHAINI').val();
        v_fechaini=StringFecha_ddmmyyy_a_yyyymmdd(v_fechaini);
        v_fechaini = v_fechaini.replace("/", "").replace("/", "");

        var v_fechafin = $('#inputCONSULTARUTA_FECHAFIN').val();
        v_fechafin=StringFecha_ddmmyyy_a_yyyymmdd(v_fechafin);
        v_fechafin = v_fechafin.replace("/", "").replace("/", "");

        ObtenerListaRutas(v_fechaini, v_fechafin)
    }
    catch(ex){
        mensaje("msj_13",'msj_1',ex.message);//No se ha podido realizar la búsqueda.
    }
}


function ObtenerListaRutas(p_fechaini,p_fechafin) {
    try {
        var v_url=_urlRutas+"/"+_UsuarioApp.LOGIN.toString()+"/"+_UsuarioApp.PASSWORD.toString()+"/"+p_fechaini+"/"+p_fechafin;

        $.ajax({
            type: "GET",
            cache:false,
            url: v_url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ObtenerListaRutas_OK,
            error: ObtenerListaRutas_Error
        });

    }
    catch (ex){
        mensaje("msj_13",'msj_1',ex.message);//No se ha podido realizar la búsqueda.
    }
}
function ObtenerListaRutas_Error(error){
    mensaje("msj_13",'msj_1',ex.message);//No se ha podido realizar la búsqueda.
}
function ObtenerListaRutas_OK(datos){
    try{
        _ListaRutasConsulta=new Array();
        var v_indice=0;
        if(datos !=null) {

            for (var i = 0; i < datos.length; i++) {
                _ListaRutasConsulta[v_indice++] = new clRuta(datos[i]);
                //_ListaRutasConsulta[_ListaRutasConsulta.length-1].DIRECINICIO;
            }
        }
        cargaListaRutasConsulta();
        OcultarEspera();
    }
    catch (ex){
        mensaje("msj_13",'msj_1',ex.message);//No se ha podido realizar la búsqueda.
    }
}

function cargaListaRutasConsulta() {

    $('#divListaRutasPendientes').html('');


    var sFila = "";
    var sDatos = "";
    var separador = "#";
    var v_html = "";

    var v_direccion = "";
    v_html = "<ul>"
    for (var x = 0; x < _ListaRutasConsulta.length; x++) {


        v_html += "<li >";
        v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
        v_html += "<tr>";
        //v_html += "<td style='padding: 1%' class='rutaCheck'  valign='middle'>";
        //v_html += "<div class='div-checkbox'><label><input type='checkbox' data-theme='a' class='custom' onchange='ActualizarListaEliminar(" + _ListaRutasLocal[x].ID + ")'/></label></div>";
        //v_html += "</td>";
        v_html += "<td class='btTocar1' onclick='verRutaConsulta(" + _ListaRutasConsulta[x].IDRUTA + ")' >";
        v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
        v_html += "<tr>";
        v_html += "<td  style='padding: 1%' class='rutaImg'>";
        //v_html += "<img onclick='VerCoordenadas(" + _ListaRutasConsulta[x].ID + ")'  src='imagenes/mapa.png' style='max-width:100%;display: inline-block;vertical-align:middle' />";
        v_html += "<img src='imagenes/mapa.png' style='max-width:100%;display: inline-block;vertical-align:middle' />";
        v_html += "</td>"
        v_html += "<td style='padding: 1%'>";
        v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
        v_html += " <tr><td align='right' class='rutaFecha'>" + _ListaRutasConsulta[x].FECHAHORAINICIO + "</td></tr>";
        v_html += " <tr><td align='left' class='rutaTexto'>" +_ListaRutasConsulta[x].DIRECINICIO  + " </td></tr>";
        v_html += " <tr><td align='left' class='rutaDuracion'>"+ _ListaRutasConsulta[x].DURACION + "</td></tr>";
        v_html += " <tr><td align='left' class='rutaDuracion'>" + _ListaRutasConsulta[x].DISTANCIA + " Km.</td></tr>";
        v_html += " <tr><td align='left' class='rutaTexto'>" +_ListaRutasConsulta[x].DIRECFIN + " </td></tr>";
        v_html += "</table>"
        v_html += "</td>"
        v_html += "</tr>";
        v_html += "</table>"
        v_html += "</td>";
        v_html += "</tr>";
        v_html += "</table>"
        v_html += "</li>";

    }
    v_html += "</ul>"

    v_html += "<script type='text/javascript'>";
    v_html += "$('.btTocar1').bind('touchstart', function(){";
    v_html += "$(this).addClass('btHover');";
    v_html += "});";

    v_html += "$('.btTocar1').bind('touchend', function(){";
    v_html += "$(this).removeClass('btHover');";
    v_html += "});";




    v_html += "</script>";

    $('#divListaRutasConsulta').html(v_html);
    $('#divListaRutasConsulta').trigger('create');


}

function verRutaConsulta(p_idRuta) {
    abrirPagina("pageFichaRuta", p_idRuta,'Consulta');
}

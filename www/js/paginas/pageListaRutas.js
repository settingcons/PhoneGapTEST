

function inicioPaginaListaRutas(){
    AsignarLiterales('pageListaRuta');
    try
    {
        _ListaRutasLocal=null;
        _ListaRutasLocalEliminar=null;
        var v_lista = new clListaRuta();
        v_lista.ObtenerListaSQLite(ObtenerListaRutasPendientesOK,ObtenerListaRutasPendientesError);
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}
function ObtenerListaRutasPendientesError(p_error){
    mensaje('msj_10','msj_5',ObtenerTexto('msj_59'));//Error al obtener la lista de rutas pendientes.
    abrirPagina("pageInicio");
}

function ObtenerListaRutasPendientesOK(p_tran,p_result){
    var v_lista=new clListaRuta();
    v_lista.ProcesaResultado(p_result);
    _ListaRutasLocal=v_lista.Lista;

    var v_modificadas = 0;
    //var v_script="";
    for (var x = 0; x < _ListaRutasLocal.length; x++) {
        var v_texto = ObtenerTexto('msj_51');//Dirección no encontrada
        if (_ListaRutasLocal[x].DIRECINICIO == v_texto || _ListaRutasLocal[x].DIRECFIN == v_texto ||
            _ListaRutasLocal[x].DIRECINICIO == '' || _ListaRutasLocal[x].DIRECFIN == '' ||
            _ListaRutasLocal[x].FECHAHORAFIN.indexOf('Na')!=-1 || _ListaRutasLocal[x].DURACION.indexOf('Na')!=-1) {
            var v_ruta = new clRuta();
            v_ruta.FinalizarRutaSQLite(_ListaRutasLocal[x].ID, ListaRutasModificarSQLiteOK, ListaRutasModificarSQLiteError);
            v_modificadas = v_modificadas + 1;
        }
    }

    if (v_modificadas > 0) {
        v_lista = new clListaRuta();
        v_lista.ObtenerListaSQLite(ObtenerListaRutasPendientesOK_1,ObtenerListaRutasPendientesError);
    }
    else
    {
        cargaListaRutas();
    }
}


function FinalizarRutaAbierta(p_ruta) {

    var v_texto = ObtenerTexto('msj_51');//Dirección no encontrada
    var v_dFechaFin = p_ruta.FECHAHORAFIN;
    var v_duracion = p_ruta.DURACION;
    var v_distancia = p_ruta.DISTANCIA;
    var v_direccionIni = p_ruta.DIRECINICIO;
    var v_direccionFin = p_ruta.DIRECFIN;


    if (v_direccionIni == v_texto || v_direccionIni == '') {
        var v_posIni = new google.maps.LatLng(p_ruta.COORD_X_INI, p_ruta.COORD_Y_INI);
        v_direccionIni = cogerDireccion(v_posIni);
    }
    if (v_direccionFin == v_texto || v_direccionFin == '') {
        var v_posFin = new google.maps.LatLng(p_ruta.COORD_X_FIN, p_ruta.COORD_Y_FIN);
        v_direccionFin = cogerDireccion(v_posFin);
    }


    if (v_dFechaFin == '') {
        v_dFechaFin=new Date(p_ruta.FECHAHORACAPTURA_FIN);
        //v_dFechaFin = new Date();
        v_dFechaFin = FechaHora_DateToString(v_dFechaFin);
    }
    if (v_duracion == '') {
        v_duracion = CalculaTiempo_hhmm(FechaHora_StringToDate(p_ruta.FECHAHORAINICIO), FechaHora_StringToDate(v_dFechaFin));
    }

    if (v_distancia == '') {
        var v_dis = p_ruta.DISTANCIAPUNTOS;
        var v_km = v_dis / 1000;

        v_distancia = +(Math.round(v_km + "e+2") + "e-2");

    }

    p_ruta.FECHAHORAFIN = v_dFechaFin;
    p_ruta.DURACION = v_duracion;
    p_ruta.DISTANCIA = v_distancia;
    p_ruta.DIRECINICIO = v_direccionIni;
    p_ruta.DIRECFIN = v_direccionFin;
    //p_ruta.IDPUNTOINICIO = p_ruta.ID_INI;
    //p_ruta.IDPUNTOFIN = p_ruta.ID_FIN;
    p_ruta.OBSERVACIONES = "";

    p_ruta.ModificarSQLite(ListaRutasModificarSQLiteOK,ListaRutasModificarSQLiteError)
}
function ListaRutasModificarSQLiteOK(p_trans,p_results){

}
function ListaRutasModificarSQLiteError(p_error){

}

function ObtenerListaRutasPendientesOK_1(p_tran,p_result) {
    var v_lista = new clListaRuta();
    v_lista.ProcesaResultado(p_result);
    _ListaRutasLocal = v_lista.Lista;

    cargaListaRutas();
}

function cargaListaRutas() {

    $('#divListaRutasPendientes').html('');


    var sFila = "";
    var sDatos = "";
    var separador = "#";
    var v_html = "";

    var v_direccion = "";
    v_html = "<ul>"
    for (var x = 0; x < _ListaRutasLocal.length; x++) {



        v_html += "<li >";
        v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
        v_html += "<tr>";
        v_html += "<td style='padding: 1%' class='rutaCheck'  valign='middle'>";
        v_html += "<div class='div-checkbox'><label><input type='checkbox' data-theme='a' class='custom' onchange='ActualizarListaEliminar(" + _ListaRutasLocal[x].ID + ")'/></label></div>";
        v_html += "</td>";
        //v_html += "<td class='btTocar1' onclick='verRuta(" + _ListaRutasLocal[x].ID + ")' >";
        v_html += "<td>";
        v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
        v_html += "<tr>";
        v_html += "<td  style='padding: 1%' class='rutaImg'>";
        //v_html += "<img onclick='VerCoordenadas(" + _ListaRutasLocal[x].ID + ")'  src='imagenes/mapa.png' style='max-width:100%;display: inline-block;vertical-align:middle' />";
        v_html += "<img  src='imagenes/mapa.png' style='max-width:100%;display: inline-block;vertical-align:middle' />";
        v_html += "</td>"
        //v_html += "<td style='padding: 1%'>";
        v_html += "<td class='btTocar1' onclick='verRuta(" + _ListaRutasLocal[x].ID + ")' >";
        v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
        v_html += " <tr><td align='right' class='rutaFecha'>" + _ListaRutasLocal[x].FECHAHORAINICIO + "</td></tr>";
        v_html += " <tr><td align='left' class='rutaTexto'>" +_ListaRutasLocal[x].DIRECINICIO  + " </td></tr>";
        v_html += " <tr><td align='left' class='rutaDuracion'>"+ _ListaRutasLocal[x].DURACION + "</td></tr>";
        v_html += " <tr><td align='left' class='rutaDuracion'>" + _ListaRutasLocal[x].DISTANCIA + " Km.</td></tr>";
        v_html += " <tr><td align='left' class='rutaTexto'>" +_ListaRutasLocal[x].DIRECFIN + " </td></tr>";
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

    $('#divListaRutasPendientes').html(v_html);
    $('#divListaRutasPendientes').trigger('create');


}

function ActualizarListaEliminar(p_idRuta) {

    var v_encontrado = 0;
    if (_ListaRutasLocalEliminar != null) {
        var v_lista = _ListaRutasLocalEliminar.split("#");
        _ListaRutasLocalEliminar=null;
        for (var i = 0; i < v_lista.length; i++) {
            if (v_lista[i] == p_idRuta) {
                v_encontrado = 1;
            }
            else {
                if (_ListaRutasLocalEliminar == null) {
                    _ListaRutasLocalEliminar = v_lista[i].toString();
                }
                else {
                    _ListaRutasLocalEliminar = _ListaRutasLocalEliminar + "#" + v_lista[i].toString();
                }
            }

        }
    }
    if (v_encontrado == 0) {
        if (_ListaRutasLocalEliminar == null) {
            _ListaRutasLocalEliminar = p_idRuta.toString();
        }
        else {
            _ListaRutasLocalEliminar = _ListaRutasLocalEliminar + "#" + p_idRuta.toString();
        }

    }

}

function EliminarRutasConfirmar()
{
    if (_ListaRutasLocalEliminar != null) {

        var v_mensaje =ObtenerTexto('msj_33');//"¿Quieres eliminar las rutas seleccionadas?";
        var v_titulo = ObtenerTexto('msj_34');//"Eliminar rutas locales";
        var v_botones = ObtenerTexto('msj_35');//"SI,NO";

        if (navigator.notification && navigator.notification.confirm) {
            navigator.notification.confirm(v_mensaje, EliminarRutas, v_titulo, v_botones);
        }
        else {
            var v_retorno = confirm(v_mensaje);
            if (v_retorno) {
                EliminarRutas(1);
            }
            else {
                EliminarRutas(2);
            }
        }
    }

}
function EliminarRutas(p_opcion){
    if(p_opcion==1) {

        if (_ListaRutasLocalEliminar != null) {
            var v_lista = _ListaRutasLocalEliminar.split("#");
            var v_indices = "";
            for (var i = 0; i < v_lista.length; i++) {
                if (v_indices == "") {
                    v_indices += "(" + v_lista[i].toString();
                }
                else {
                    v_indices += "," + v_lista[i].toString();

                }
            }
            v_indices += ")"

            MostrarEspera();

            var v_ruta = new clRuta();
            v_ruta.EliminarCompletoSQLite(v_indices,EliminarRutasOK,EliminarRutasError);
        }
    }
}

function EliminarRutasError(error){
    OcultarEspera();
}
function EliminarRutasOK(p_trans,p_results){
    OcultarEspera();
    inicioPaginaListaRutas();
}

function verRuta(p_idRuta) {
    abrirPagina("pageFichaRuta", p_idRuta,'Pendientes');
}

function VerCoordenadas(p_IdRuta){
    try {
        abrirPagina("pageConsultaRutaCoordenadas");

        var v_lista = new clListaRutaPunto();
        v_lista.ObtenerListaSQLite(p_IdRuta,VerCoordenadasOK,VerCoordenadasError);

    }
    catch (ex){mensaje(ex.message,'msj_1');}
}

function VerCoordenadasError(p_error)
{

}
function VerCoordenadasOK(p_tran,p_results)
{
    try{
        var v_lista = new clListaRutaPunto();
        var v_res= v_lista.ProcesaResultados(p_results);
        if(v_res=="OK") {
            var v_puntos = v_lista.Lista;

            $('#divListaCoordenadas').html("");


            var sFila = "";
            var sDatos = "";
            var separador = "#";
            var v_fecha;
            var v_sFecha = '';
            var v_fecha1;
            var v_sFecha1 = '';
            var v_distancia = 0;
            sFila = " <div style='width:100%;'>";
            sFila += " <table cellpadding='1' cellspacing='1' border='1' width='100%' >";
            sFila += " <tr><td><b style='font-size: 0.85em' >ID</b> </td>";
            sFila += " <td><b style='font-size: 0.85em'>ACC</b> </td>";
            sFila += " <td><b style='font-size: 0.85em'></td></tr>";
            //sFila +=" <td><b style='font-size: 0.85em'>ALTITUDACCURACY:</b> </td></tr>";
            for (var x = 0; x < v_puntos.length; x++) {
                v_fecha = new Date(v_puntos[x].FECHAHORA);
                v_sFecha = FechaHora_DateToString(v_fecha);
                //    v_fecha1 = new Date(v_puntos[x].FECHAHORACAPTURA);
                //    v_sFecha1 = FechaHora_DateToString(v_fecha1);
                //    if (x > 0) {
                //        var v_punto1 = new google.maps.LatLng(v_puntos[x - 1].COORD_X, v_puntos[x - 1].COORD_Y);
                //        var v_punto2 = new google.maps.LatLng(v_puntos[x].COORD_X, v_puntos[x].COORD_Y);
                //        v_distancia = google.maps.geometry.spherical.computeDistanceBetween(v_punto1, v_punto2)
                //    }
                sFila += " <tr><td style='font-size: 0.85em'>" + v_puntos[x].ID + "</td>";
                sFila += " <td><b style='font-size: 0.85em'>" + v_puntos[x].ACCURACY + "</td>";
                sFila += " <td><table cellpadding='0' cellspacing='0' border='0' >"
                sFila += " <tr><td><b style='font-size: 0.85em' >X: </b> " + v_puntos[x].COORD_X + "</td></tr>";
                sFila += " <tr><td><b style='font-size: 0.85em'>Y: </b>" + v_puntos[x].COORD_Y + "</td></tr>";
                //sFila += " <tr><td><b style='font-size: 0.85em'>DISTANCIA</b>: " + v_distancia + "</td></tr>";
                sFila += " <tr><td><b style='font-size: 0.85em'>FECHAHORA</b>: " + v_sFecha + "</td></tr>";
                //sFila += " <tr><td><b style='font-size: 0.85em'>CAPTURA</b>: " + v_sFecha1 + "</td></tr>";
                sFila += " <tr><td><b style='font-size: 0.85em'>HEADING</b>: " + v_puntos[x].HEADING + "</td></tr>";
                sFila += " <tr><td><b style='font-size: 0.85em'>VELOCIDAD</b>:" + v_puntos[x].VELOCIDAD + "</td></tr>";
                sFila += " <tr><td><b style='font-size: 0.85em'>ALTITUD</b>: " + v_puntos[x].ALTITUD + "</td></tr>";
                sFila += " <tr><td><b style='font-size: 0.85em'>VALIDO</b>: " + v_puntos[x].VALIDO + "</td></tr>";
                sFila += " <tr><td><b style='font-size: 0.85em'>DIFF</b>: " + v_puntos[x].DIFF + "</td></tr>";
                sFila += " <tr><td><b style='font-size: 0.85em'>DIS</b>: " + v_puntos[x].DISTANCIA + "</td></tr>";
                sFila += "</table></td></tr>";
            }
            sFila += " </table></div>";

            $('#divListaCoordenadas').html(sFila);
        }
        else
        {
            mensaje(v_res,'msj_1');
        }
    }
    catch (ex){mensaje(ex.message,'msj_1');}

}

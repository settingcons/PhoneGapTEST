function inicioPaginaRevisionKm(){
    try
    {
        AsignarLiterales('pageRevisionKM');
        _ListaEntradaKmEliminar=null;
        _ListaEntradaKm=new Array();

        estadoControl('divREVISIONBUSCARKM_VEHICULO', true);
        estadoControl('inputREVISIONBUSCARKM_VEHICULO', true);
        if(_ListaVehiculosFlota!=null) {
            if (_ListaVehiculosFlota.length == 1) {
                estadoControl('divREVISIONBUSCARKM_VEHICULO', false);
                estadoControl('inputREVISIONBUSCARKM_VEHICULO', false);
                $('#inputREVISIONBUSCARKM_VEHICULO').text(_ListaVehiculosFlota[0].MATRICULA);
            }
        }

        var v_fecha = new Date();
        v_fecha.setDate(v_fecha.getDate()-31);
        $('#inputREVISIONKM_FECHAINI').val(Fecha_DateToString(v_fecha));
        $('#inputREVISIONKM_FECHAFIN').val(Fecha_DateToString(new Date()));

        cargarListaEntradaKm();
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}


function BuscarEntradaKm(){
    try {

        MostrarEspera();

        _ListaEntradaKmEliminar=null;
        _ListaEntradaKm=new Array();

        var v_matricula = $('#inputREVISIONBUSCARKM_VEHICULO').text();
        if(v_matricula.toString().length==0 || v_matricula==ObtenerTexto('txt_36')) {
            mensaje('msj_21','msj_2');//Debe escoger una matrícula.
        }
        else{
            var v_fechaini = $('#inputREVISIONKM_FECHAINI').val();
            v_fechaini=StringFecha_ddmmyyy_a_yyyymmdd(v_fechaini);
            v_fechaini = v_fechaini.replace("/", "").replace("/", "");

            var v_fechafin = $('#inputREVISIONKM_FECHAFIN').val();
            v_fechafin=StringFecha_ddmmyyy_a_yyyymmdd(v_fechafin);
            v_fechafin = v_fechafin.replace("/", "").replace("/", "");

            ObtenerListaEntradaKmWS(v_matricula, v_fechaini, v_fechafin)
        }
    }
    catch(ex){
        OcultarEspera();
        mensaje("msj_13",'msj_1',ex.message);//No se ha podido realizar la búsqueda.
    }
}
function ObtenerListaEntradaKmWS(p_matricula,p_fechaini,p_fechafin) {
    try {
        var v_url=_urlEntradaKm+"/"+_UsuarioApp.LOGIN.toString()+"/"+_UsuarioApp.PASSWORD.toString()+"/"+p_matricula+"/"+p_fechaini+"/"+p_fechafin;

        $.ajax({
            type: "GET",
            cache:false,
            url: v_url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ObtenerListaEntradaKmWS_OK,
            error: ObtenerListaEntradaKmWS_Error
        });

    }
    catch (ex){
        OcultarEspera();
        mensaje("msj_13",'msj_1',ex.message);//No se ha podido realizar la búsqueda.
    }
}
function ObtenerListaEntradaKmWS_Error(error){
    OcultarEspera();
    mensaje("msj_13","msj_3");//No se ha podido realizar la búsqueda.
}
function ObtenerListaEntradaKmWS_OK(datos){
    try{
        _ListaEntradaKm=new Array();
        var v_indice=0;
        if(datos !=null) {

            for (var i = 0; i < datos.length; i++) {
                _ListaEntradaKm[v_indice++] = new clEntradaKm(datos[i]);
            }
        }
        cargarListaEntradaKm();
        OcultarEspera();
    }
    catch (ex){
        mensaje("msj_19",'msj_1',error.responseText);//No se ha podido mostrar los resultados de la búsqueda.
    }
}
function cargarListaEntradaKm() {
    $('#divResultadosBuscarEntradaKm').html("");

    var v_html = "";
    var v_clase = "";

    var v_txtFecha="Fecha"
    var v_txtKm="Km."
    var v_txtProf="Prof."
    var v_txtPer="Pers."
    var v_txtTot="Total"

    try {
        v_txtFecha = ObtenerTexto('txt_32');
        v_txtKm = ObtenerTexto('txt_33');
        v_txtProf = ObtenerTexto('txt_34');
        v_txtPer = ObtenerTexto('txt_35');
        v_txtTot = ObtenerTexto('txt_60');
    }catch (ex){}

    v_html = " <div style='width:100%;' class='tablaRes'>";
    v_html += " <table cellpadding='0' cellspacing='0' border='0' width='100%' >";
    v_html += "<tr><td style='width: 1%'></td><td  align='center'>"
    v_html += " <table cellpadding='0' cellspacing='0' border='0' width='100%' >";
    v_html += "<tr><th></th><th  align='center'>"+v_txtFecha+"</th><th>"+v_txtKm+"</th>";
    if(_UsuarioApp.TIPOUSUARIO==1) {
        v_html += "<th>"+v_txtProf+"</th><th>"+v_txtPer+"</th>";
    }
    v_html += "<th>"+v_txtTot+"</th></tr>"

    if (_ListaEntradaKm.length > 0) {
        for (var x = 0; x < _ListaEntradaKm.length; x++) {
            if (x % 2 == 0) {
                v_clase = "filaPar";
            }
            else {
                v_clase = "filaImpar";
            }
            var v_kmProfexionales=parseInt(_ListaEntradaKm[x].KM_TOTAL)-parseInt(_ListaEntradaKm[x].KM_PROFESIONAL);
            v_html += "<tr class='" + v_clase + " btTocar1' >";
            v_html += "<td style='padding: 1%' class='notifCheck' valign='bottom'>";
            if( _ListaEntradaKm[x].PERMISOELIMINAR=="1"){
                v_html += "<div class='div-checkbox'><label><input type='checkbox' data-theme='a' class='custom' onchange='ActualizarListaEliminarEntradaKm(" + x.toString()+ ")'/></label></div>";
            }
            v_html += "</td>";

            v_html += "<td align='center' onclick='EditarEntradaKm("+ x.toString()+")'>" + _ListaEntradaKm[x].FECHA_ACTUAL.substring(0,10); + "</td>";
            v_html += "<td align='right' onclick='EditarEntradaKm("+ x.toString()+")'>" +Numero_String(_ListaEntradaKm[x].KM_ACTUAL) + "</td>";
            if(_UsuarioApp.TIPOUSUARIO==1){
                v_html += "<td align='right' onclick='EditarEntradaKm("+ x.toString()+")'>" + Numero_String(_ListaEntradaKm[x].KM_PROFESIONAL) + "</td>";
                v_html += "<td align='right' onclick='EditarEntradaKm("+ x.toString()+")'>" + Numero_String(v_kmProfexionales)  + "</td>"
            }
            v_html += "<td align='right' onclick='EditarEntradaKm("+ x.toString()+")'>" + Numero_String(_ListaEntradaKm[x].KM_TOTAL) + "</td>";
            v_html += "</tr>"

        }
    }
    v_html +="</table></td><td style='width: 1%'></td></tr><table"
    v_html +="</div>";

    v_html +="<script type='text/javascript'>";
    v_html +="$('.btTocar1').bind('touchstart', function(){";
    v_html +="$(this).addClass('btHover');";
    v_html +="});";

    v_html +="$('.btTocar1').bind('touchend', function(){";
    v_html +="$(this).removeClass('btHover');";
    v_html +="})";
    v_html +="</script>";

    $('#divResultadosBuscarEntradaKm').html(v_html);
    $('#divResultadosBuscarEntradaKm').trigger('create');

}

function EditarEntradaKm(p_indice){
    if(p_indice  < _ListaEntradaKm.length-1) {
        abrirPagina('pageEntradaKM', p_indice,"Editar");
    }
}

function ActualizarListaEliminarEntradaKm(p_indice) {

    var v_encontrado = 0;
    if (_ListaEntradaKmEliminar != null) {
        var v_lista = _ListaEntradaKmEliminar.split("#");
        _ListaEntradaKmEliminar=null;
        for (var i = 0; i < v_lista.length; i++) {
            if (v_lista[i] == p_indice) {
                v_encontrado = 1;
            }
            else {
                if (_ListaEntradaKmEliminar == null) {
                    _ListaEntradaKmEliminar = v_lista[i].toString();
                }
                else {
                    _ListaEntradaKmEliminar = _ListaEntradaKmEliminar + "#" + v_lista[i].toString();
                }
            }

        }
    }
    if (v_encontrado == 0) {
        if (_ListaEntradaKmEliminar == null) {
            _ListaEntradaKmEliminar = p_indice.toString();
        }
        else {
            _ListaEntradaKmEliminar = _ListaEntradaKmEliminar + "#" + p_indice.toString();
        }

    }

}



function EliminarLecturasConfirm() {

    var v_lista = _ListaEntradaKmEliminar.split("#");
    if(v_lista!=null && v_lista.length>0) {
        var v_mensaje = ObtenerTexto('msj_36'); //"¿Quiere eliminar las lecturas seleccionadas?";
        var v_titulo = ObtenerTexto('msj_37'); //"Eliminar lecturas";
        var v_botones = ObtenerTexto('msj_35'); //"SI,NO";

        if (navigator.notification && navigator.notification.confirm) {
            navigator.notification.confirm(v_mensaje, EliminarLecturas, v_titulo, v_botones);
        }
        else {
            var v_retorno = confirm(v_mensaje);
            if (v_retorno) {
                EliminarLecturas(1);
            }
            else {
                EliminarLecturas(2);
            }
        }
    }
}

function EliminarLecturas(respuesta){

    if (respuesta==1) {

        var v_error="OK";
        var v_lista = _ListaEntradaKmEliminar.split("#");
        for (var i = 0; i < v_lista.length; i++) {

            var v_url = _urlEntradaKm + "/" + _UsuarioApp.LOGIN.toString() + "/" + _UsuarioApp.PASSWORD.toString()+"?id="+_ListaEntradaKm[v_lista[i]].IDLECTURA.toString();
            $.ajax({
                type: "DELETE",
                cache:false,
                url: v_url,
                success: function(datos){
                    if (datos != 1) {
                        v_error="Error de comunicación.\n\n Los datos se han guardado en local.\n\n ERROR: Error al actualizar los datos en central.";
                    }
                },
                error: function(error){ v_error="Error de comunicación.\n\n Los datos se han guardado en local.\n\n ERROR: Error al actualizar los datos en central.";},
                async:false
            });

        }


        BuscarEntradaKm()

    }

}


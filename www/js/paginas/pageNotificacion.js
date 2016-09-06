function inicioPaginaNotificacion(){
    try
    {
        AsignarLiterales('pageNotificacion');
        _ListaNotificacionesEliminar=null;
        var v_lista = new clListaNotificacion();
        v_lista.ObtenerLista();
        _ListaNotificaciones=v_lista.Lista;
        cargarListaNotificacion();
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}



function cargarListaNotificacion(){
    try {
        $('#divNotificaciones').html("");


        var v_html = "";
        var v_imagen = "";

        v_html = "<ul>"
        for (var x = 0; x < _ListaNotificaciones.length; x++) {
            if (_ListaNotificaciones[x].LEIDA == "0") {
                v_imagen = "imagenes/notif_noleida.png";
            }
            else if (_ListaNotificaciones[x].LEIDA == "1" && _ListaNotificaciones[x].ENVIADO == "0") {
                v_imagen = "imagenes/notif_noenviada.png";
            }
            else {
                v_imagen = "imagenes/notif_enviada.png";
            }
            v_html += "<li >";
            v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
            v_html += "<tr>";
            v_html += "<td style='padding: 1%' class='notifCheck' valign='bottom'>";
            if( _ListaNotificaciones[x].LEIDA=="1" && _ListaNotificaciones[x].ENVIADO=="1"){
                v_html += "<div class='div-checkbox'><label><input type='checkbox' data-theme='a' class='custom' onchange='ActualizarListaEliminarNotificacion(" + _ListaNotificaciones[x].ID + ")'/></label></div>";
            }
            v_html += "</td>";
            v_html += "<td class='btTocar1' onclick='VerNotificacion(" + x.toString() + ")' >";
            v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
            v_html += "<tr>";
            v_html += "<td class='notifImg' style='padding: 1px'>";
            v_html += "<img  src='" + v_imagen + "' style='display: inline-block;vertical-align:middle' />";
            v_html += "</td>"
            v_html += "<td style='padding: 1%'>";
            v_html += "<table cellpadding='0' cellspacing='0' border='0' style='width: 100%;table-layout: fixed'>";
            v_html += "<tr><td class='notifAsunto'>" + _ListaNotificaciones[x].ASUNTO +"</td></tr>"
            v_html += "<tr><td class='notifTexto'>" + _ListaNotificaciones[x].TEXTO + "</td></tr>"
            v_html += "</table>"
            v_html += "</td>"
            v_html += "<td style='padding: 1%' class='notifFecha' valign='bottom'>";
            v_html += _ListaNotificaciones[x].FECHA;
            v_html += "</td>";
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
        v_html += "})";
        v_html += "</script>";

        $('#divNotificaciones').html(v_html);
        $('#divNotificaciones').trigger('create');

    }
    catch (ex){mensaje(ex.message,'msj_1')}
}

function ActualizarListaEliminarNotificacion(p_indice) {

    var v_encontrado = 0;
    if (_ListaNotificacionesEliminar != null) {
        var v_lista = _ListaNotificacionesEliminar.split("#");
        _ListaNotificacionesEliminar=null;
        for (var i = 0; i < v_lista.length; i++) {
            if (v_lista[i] == p_indice) {
                v_encontrado = 1;
            }
            else {
                if (_ListaNotificacionesEliminar == null) {
                    _ListaNotificacionesEliminar = v_lista[i].toString();
                }
                else {
                    _ListaNotificacionesEliminar = _ListaNotificacionesEliminar + "#" + v_lista[i].toString();
                }
            }

        }
    }
    if (v_encontrado == 0) {
        if (_ListaNotificacionesEliminar == null) {
            _ListaNotificacionesEliminar = p_indice.toString();
        }
        else {
            _ListaNotificacionesEliminar = _ListaNotificacionesEliminar + "#" + p_indice.toString();
        }

    }

}


function EliminarNotifConfirm() {

    var v_lista = _ListaNotificacionesEliminar.split("#");
    if(v_lista!=null && v_lista.length>0) {
        var v_mensaje = ObtenerTexto('msj_48'); //"¿Quiere eliminar las notificaciones seleccionadas?";
        var v_titulo = ObtenerTexto('msj_39'); //"Eliminar notificaciones";
        var v_botones = ObtenerTexto('msj_35'); //"SI,NO";

        if (navigator.notification && navigator.notification.confirm) {
            navigator.notification.confirm(v_mensaje, EliminarLecturas, v_titulo, v_botones);
        }
        else {
            var v_retorno = confirm(v_mensaje);
            if (v_retorno) {
                EliminarNotificaciones(1);
            }
            else {
                EliminarNotificaciones(2);
            }
        }
    }
}

function EliminarNotificaciones(p_opcion){
    if(p_opcion==1) {
        MostrarEspera();
        $.ajax({
            url: "js/paginas/espera.js",
            cache:false,
            dataType: "script",
            success: function (datos) {
                setTimeout(EliminarNotificaciones1(), 1000);
            },
            error: function (error) {
                setTimeout(EliminarNotificaciones1(), 1000);
            }
        });
    }
}

function EliminarNotificaciones1() {
    if (_ListaNotificacionesEliminar != null) {
        var v_lista = _ListaNotificacionesEliminar.split("#");
        for (var i = 0; i < v_lista.length; i++) {
            var v_notif = new clNotificacion();
            v_notif.Obtener(v_lista[i]);
            v_notif.Eliminar();
        }
        inicioPaginaNotificacion();
    }
    OcultarEspera();
}

function SincronizarNotif() {
    MostrarEspera();
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
                    OcultarEspera();
                }
                catch (ex){ mensaje("msj_29","msj_1");}//No se ha podido actualizar la lista de notificaciones.
            },
            error:  function(error){ mensaje("msj_29","msj_3");}//No se ha podido actualizar la lista de notificaciones.
        });

    }
    catch (ex){
        mensaje("msj_29","msj_1");;//No se ha podido actualizar la lista de notificaciones.
    }

}


function VerNotificacion(p_indice)
{
    $('#lblNOTIFICACIONFECHA').text('');
    $('#lblNOTIFICACIONASUNTO').text('');
    $('#lblNOTIFICACIONTEXTTO').text('');

    var v_img = document.getElementById('imgNOTIFICACIONESTADO');
    if (_ListaNotificaciones[p_indice].LEIDA == "0") {
        v_img.src= "imagenes/notif_noleida.png";
    }
    else if (_ListaNotificaciones[p_indice].LEIDA == "1" && _ListaNotificaciones[p_indice].ENVIADO == "0") {
        v_img.src = "imagenes/notif_noenviada.png";
    }
    else {
        v_img.src = "imagenes/notif_enviada.png";
    }


    $('#lblNOTIFICACIONFECHA').text(_ListaNotificaciones[p_indice].FECHA);
    $('#lblNOTIFICACIONASUNTO').text(_ListaNotificaciones[p_indice].ASUNTO);
    $('#lblNOTIFICACIONTEXTTO').text(_ListaNotificaciones[p_indice].TEXTO);

    AsignarLiterales('pageFichaNotificacion');
    abrirPagina("pageFichaNotificacion");
    if (_ListaNotificaciones[p_indice].LEIDA == "0") {
        ActualizarNotificacionWS(_ListaNotificaciones[p_indice].ID,false);
    }
    else if (_ListaNotificaciones[p_indice].LEIDA == "1" && _ListaNotificaciones[p_indice].ENVIADO == "0") {
        ActualizarNotificacionWS(_ListaNotificaciones[p_indice].ID,true);
    }

}

function ActualizarNotificacionWS(p_indice,p_sincro){
    var v_error="OK";
    try {
        var v_notif=new clNotificacion();
        v_notif.Obtener(p_indice);
        if(!p_sincro){
            v_notif.LEIDA=1;
            v_notif.Modificar();
        }
        var v_url = _urlNotificacion + "/" + _UsuarioApp.LOGIN.toString() + "/" + _UsuarioApp.PASSWORD.toString() + "?id=" + v_notif.IDNOTIFICACION.toString();

        $.ajax({
            type: "PUT",
            cache:false,
            url: v_url,
            data: JSON.stringify(v_notif.JSON()),
            contentType: "application/json",
            success: function(datos){
                try {
                    if (datos == 1) {
                        v_notif.ActualizarEnviado(true);
                    }
                    else{v_error="ERROR";}
                }
                catch (ex){v_error="ERROR";}
            },
            error: function(error){ v_error="ERROR";},
            async: false
        });

    }
    catch(ex){
        v_error="ERROR";
    }

    return v_error;
}


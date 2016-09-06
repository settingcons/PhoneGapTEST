function inicioPaginaInicio() {
    AsignarLiterales('pageInicio');
    try{
        $('#pageInicio_NotificacionPend').html('');
        $('#pageInicio_RutasPend').html('');
        $('#pageInicio_RutasPend').hide();
        $('#pageInicio_NotificacionPend').hide();
        $('#pageInicio_Aviso1').hide();
        $('#pageInicio_Aviso2').hide();

        try {
            var v_notificacion = new clNotificacion(null);
            var v_notifPen = v_notificacion.ObtenerPendientes();
            if (v_notifPen > 0) {
                $('#pageInicio_NotificacionPend').html(v_notifPen.toString());
                $('#pageInicio_NotificacionPend').show();
            }
            else {
                $('#pageInicio_NotificacionPend').hide();
            }
        }catch (ex){}
        try {
            var v_rutaspend = new clRuta();
            v_rutaspend.ObtenerPendientesSQLite(InicioObtenerPendientesOK,InicioObtenerPendientesError);
        }catch (ex){}
    }
    catch (ex){
        mensaje(ex.message,'msj_5');
    }
}

function InicioObtenerPendientesError(p_error){
    ActualizarNumRutasPend(-1);
}
function InicioObtenerPendientesOK(p_trans, p_result){
    try {
        var v_pendiente = -1;
        if (p_result != null && p_result.rows != null && p_result.rows.length > 0) {
            v_pendiente = p_result.rows.item(0).TOTAL;
        }
        ActualizarNumRutasPend(v_pendiente);
    }
    catch (ex){}
}

function ActualizarNumRutasPend(p_numRutasPen){
    try {
        if (p_numRutasPen > 0) {
            $('#pageInicio_RutasPend').html(p_numRutasPen.toString());
            $('#pageInicio_RutasPend').show();
        }
        else {
            $('#pageInicio_RutasPend').html('');
            $('#pageInicio_RutasPend').hide();
        }
        if(_UsuarioApp.MAXRUTASSINENVIAR!=0){
            if(p_numRutasPen>=_UsuarioApp.MAXRUTASSINENVIAR-1){
                $('#pageInicio_Aviso1').show();
                $('#pageInicio_Aviso2').show();
                if(p_numRutasPen==_UsuarioApp.MAXRUTASSINENVIAR){
                    $('#pageInicio_Aviso1').text(ObtenerTexto('txt_63'));
                }
                else{
                    $('#pageInicio_Aviso1').text(ObtenerTexto('txt_61'));
                }
            }
        }
    }catch (ex){}

}
function abrirCapturarRuta(){
    if(esIOS()){
        abrirCapturarRuta_1(1);
    }
    else {
        if (TesteoAndroidMinimo()) {
            abrirCapturarRuta_1(1);
        }
        else {

            //mensaje("Este dispositivo no cumple con las condiciones mínimas de hardware y software para garantizar una captura estable de coordenadas GPS", 'msj_2');
            //abrirCapturarRuta_1(1);

            var v_mensaje = "Este dispositivo no cumple con las condiciones mínimas de hardware y software para garantizar una captura estable de coordenadas GPS. ¿Desea continuar?";
            var v_titulo = ObtenerTexto('msj_2');//"Aviso";
            var v_botones = ObtenerTexto('msj_35');//"SI,NO";

            if (navigator.notification && navigator.notification.confirm) {
                navigator.notification.confirm(v_mensaje, abrirCapturarRuta_1, v_titulo, v_botones);
            }
            else {
                var v_retorno = confirm(v_mensaje);
                if (v_retorno) {
                    abrirCapturarRuta_1(1);
                }
                else {
                    abrirCapturarRuta_1(2);
                }
            }
        }
    }
}

function abrirCapturarRuta_1(p_opcion) {
    if(p_opcion==1) {
        if (_UsuarioApp.MAXRUTASSINENVIAR == 0) abrirPagina('pageCapturaRuta');
        else {
            var v_rfPen = $('#pageInicio_RutasPend').text();
            var v_num = 0;
            try {
                v_rfPen = indefinidoOvacioToCero(v_rfPen);
                v_num = parseInt(v_rfPen);
            }
            catch (ex) {
            }
            if (v_num < _UsuarioApp.MAXRUTASSINENVIAR) {
                abrirPagina('pageCapturaRuta');
            }
            else {
                mensaje("msj_20", 'msj_2');//Antes de capturar otra ruta debe reducir el número de rutas pendientes.
            }
        }
    }
}

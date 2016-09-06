function inicioPaginaDatosVehiculo() {
    OcultarEspera();
    AsignarLiterales('pageDatosVehiculo');
    try{
        ObtenerDatosVehiculoPropio();
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}


function ObtenerDatosVehiculoPropio(){
    try {
        MostrarEspera();
        var v_url=_urlVehiculoPropio+"/"+_UsuarioApp.LOGIN.toString()+"/"+_UsuarioApp.PASSWORD.toString();

        $.ajax({
            type: "GET",
            cache:false,
            url: v_url,
            contentType: "application/json",
            success: ObtenerDatosVehiculoPropio_OK,
            error: ObtenerDatosVehiculoPropio_Error
        });

    }
    catch (ex){
        //mensaje('Se trabajará con datos locales.\nNo se puede conectar con el servidor. Error de conexión:\n'+ex.message,'msj_2')
        MostrarDatosDatosVehiculoPropio();
    }
}
function ObtenerDatosVehiculoPropio_Error(datos) {
    //mensaje('Se trabajará con datos locales.\nNo se puede conectar con el servidor. Error de conexión:\n'+ex.message,'msj_2')
    MostrarDatosDatosVehiculoPropio();
}

function ObtenerDatosVehiculoPropio_OK(datos) {
    try{
        if(datos!=null){
            var v_vehiculo = new clVehiculoPropio(datos);
            v_vehiculo.Guardar();
        }
    }
    catch (ex){}
    MostrarDatosDatosVehiculoPropio();
}

function LimpiarDatosVehiculoPropio() {
    try{
        $('#inputDATOSVEHICULO_MARCA').val('');
        $('#inputDATOSVEHICULO_MODELO').val('');
        $('#inputDATOSVEHICULO_VERSION').val('');
        $('#inputDATOSVEHICULO_CILINDRADA').val('');
        $('#inputDATOSVEHICULO_CV').val('');
        $('#inputDATOSVEHICULO_EMISIONESCO2').val('');
        $('#inputDATOSVEHICULO_MATRICULA').val('');
        $('#inputDATOSVEHICULO_BASTIDOR').val('');
        $('#inputDATOSVEHICULO_NPOLIZA').val('');
        $('#inputDATOSVEHICULO_VENCIMIENTOPOLIZA').val('');
        $('#inputDATOSVEHICULO_FECHAITV').val('');
        $('#inputDATOSVEHICULO_CONSUMOALOS100').val('');
    }
    catch (ex){}
}

function MostrarDatosDatosVehiculoPropio(){
    try {

        LimpiarDatosVehiculoPropio();
        var v_vehiculo = new clVehiculoPropio();
        var v_resultado = v_vehiculo.Obtener();
        if (v_resultado == "OK" || v_resultado == null) {

            $('#inputDATOSVEHICULO_MARCA').val(indefinidoOnullToVacio(v_vehiculo.MARCA));
            $('#inputDATOSVEHICULO_MODELO').val(indefinidoOnullToVacio(v_vehiculo.MODELO));
            $('#inputDATOSVEHICULO_VERSION').val(indefinidoOnullToVacio(v_vehiculo.VERSION));
            $('#inputDATOSVEHICULO_CILINDRADA').val(parseInt(v_vehiculo.CILINDRADA));
            $('#inputDATOSVEHICULO_CV').val(parseInt(v_vehiculo.CV));
            $('#inputDATOSVEHICULO_EMISIONESCO2').val(parseFloat(v_vehiculo.EMISIONESCO2));
            $('#inputDATOSVEHICULO_MATRICULA').val(indefinidoOnullToVacio(v_vehiculo.MATRICULA));
            $('#inputDATOSVEHICULO_BASTIDOR').val(indefinidoOnullToVacio(v_vehiculo.BASTIDOR));
            $('#inputDATOSVEHICULO_NPOLIZA').val(indefinidoOnullToVacio(v_vehiculo.NUMEROPOLIZA));
            try {
                var v_fecha = v_vehiculo.VENCIMIENTOPOLIZA;
                if (v_fecha.length > 10) {
                    v_fecha = v_fecha.substring(0, 10);
                }
                $('#inputDATOSVEHICULO_VENCIMIENTOPOLIZA').val(indefinidoOnullToVacio(v_fecha));
            }
            catch (ex){$('#inputDATOSVEHICULO_VENCIMIENTOPOLIZA').val('');}
            try {
                v_fecha = v_vehiculo.FECHAITV;
                if (v_fecha.length > 10) {
                    v_fecha = v_fecha.substring(0, 10);
                }
                $('#inputDATOSVEHICULO_FECHAITV').val(indefinidoOnullToVacio(v_fecha));
            }
            catch(ex){$('#inputDATOSVEHICULO_FECHAITV').val('');}
            $('#inputDATOSVEHICULO_CONSUMOALOS100').val(parseFloat(v_vehiculo.CONSUMOALOS100));
        }
        OcultarEspera();
    }
    catch(ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}

function GuardarDatosVehiculoPropio(){
    try
    {
        MostrarEspera();
        var v_resultado=ValidarDatosVehiculoPropio();
        if (v_resultado=="OK") {
            var v_vehiculo = RecuperarDatosVehiculoPropio();

            if(v_vehiculo!=null){
                ModificarDatosVehiculoPropioWS(v_vehiculo);
            }
            else mensaje('msj_25' , 'msj_1');

        }
        else{mensaje(v_resultado , 'msj_2');}
    }
    catch (ex){mensaje(ex.message , 'msj_1');}

}

function ValidarDatosVehiculoPropio(){

    var v_resultado='';

    if($('#inputDATOSVEHICULO_MARCA').val().toString()==''){
        v_resultado+= ObtenerTexto('msj_26')+'\n';//El campo Marca es obligatorio
    }
    if($('#inputDATOSVEHICULO_MODELO').val().toString()==''){
        v_resultado+=ObtenerTexto('msj_27')+'\n';//El campo Modelo es obligatorio
    }
    if($('#inputDATOSVEHICULO_MATRICULA').val().toString()==''){
        v_resultado+=ObtenerTexto('msj_28')+'\n';//El campo Matrícula es obligatorio
    }
    if(v_resultado=='') return "OK"
    else return v_resultado;
}

function RecuperarDatosVehiculoPropio(){
    var v_vehiculo = new clVehiculoPropio();
    var v_res=v_vehiculo.Obtener();

    if(v_res==null || v_vehiculo.IDCOCHEPROPIO==0){
        v_vehiculo.IDUSUARIO = _UsuarioApp.IDUSUARIO;
    }
    v_vehiculo.MARCA =  $('#inputDATOSVEHICULO_MARCA').val();
    v_vehiculo.MODELO =$('#inputDATOSVEHICULO_MODELO').val();
    v_vehiculo.VERSION = $('#inputDATOSVEHICULO_VERSION').val();
    v_vehiculo.CILINDRADA = indefinidoOvacioToCero($('#inputDATOSVEHICULO_CILINDRADA').val());
    v_vehiculo.CV = indefinidoOvacioToCero($('#inputDATOSVEHICULO_CV').val());
    v_vehiculo.EMISIONESCO2 = parseFloat(indefinidoOvacioToCero($('#inputDATOSVEHICULO_EMISIONESCO2').val())).toFixed(2);
    v_vehiculo.BASTIDOR =$('#inputDATOSVEHICULO_BASTIDOR').val();
    v_vehiculo.MATRICULA = $('#inputDATOSVEHICULO_MATRICULA').val();
    v_vehiculo.NUMEROPOLIZA =$('#inputDATOSVEHICULO_NPOLIZA').val();
    v_vehiculo.VENCIMIENTOPOLIZA = $('#inputDATOSVEHICULO_VENCIMIENTOPOLIZA').val();
    v_vehiculo.FECHAITV = $('#inputDATOSVEHICULO_FECHAITV').val();
    v_vehiculo.CONSUMOALOS100 = parseFloat(indefinidoOvacioToCero($('#inputDATOSVEHICULO_CONSUMOALOS100').val())).toFixed(2);

    return v_vehiculo;
}

function ModificarDatosVehiculoPropioWS(p_vehiculo){
    try {
        var v_tipo="POST";

        var v_url=_urlVehiculoPropio+"/"+_UsuarioApp.LOGIN.toString()+"/"+_UsuarioApp.PASSWORD.toString();

        if(p_vehiculo.IDCOCHEPROPIO != 0){
            v_url=v_url+"?id="+p_vehiculo.IDCOCHEPROPIO.toString();
            v_tipo="PUT";
        }

        $.ajax({
            type: v_tipo,
            cache:false,
            url: v_url,
            data: JSON.stringify(p_vehiculo.JSON()),
            contentType: "application/json",
            success: function(datos){
                if (datos == 1) {
                    try{
                        v_vehiculo.Modificar();
                    }
                    catch (ex){}
                    abrirPagina("pageResultados","OK");
                }
                else{abrirPagina("pageResultados", "ERROR3");}
            },
            error: function(error){abrirPagina("pageResultados","ERROR3");}
        });

    }
    catch (ex){
        abrirPagina("pageResultados","ERROR3");
    }

}


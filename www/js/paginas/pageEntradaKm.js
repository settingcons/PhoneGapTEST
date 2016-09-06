
function inicioPaginaEntradaKm(p_indice,p_origen) {

    MostrarEspera();
    AsignarLiterales('pageEntradaKM');
    _primeralectura=false;
    try{
        _origenEntradaKm=p_origen;
        LimpiarEntradaKm(true);
        _tempEntradaKmId=p_indice;
        ActivarEntradaKm(_tempEntradaKmId);


        if(_tempEntradaKmId!=null) {//es uma modificación

            $('#inputENTRADAKM_VEHICULO').text(_ListaEntradaKm[p_indice].MATRICULA);

            if (p_indice  < _ListaEntradaKm.length-1) {

                $('#inputENTRADAKM_KMULTIMA').val(_ListaEntradaKm[p_indice + 1].KM_ACTUAL);
                $('#inputENTRADAKM_FECHAULTIMA').val(_ListaEntradaKm[p_indice + 1].FECHA_ACTUAL.substring(0,10));
            }

            $('#inputENTRADAKM_KMACTUAL').val(_ListaEntradaKm[p_indice].KM_ACTUAL);
            $('#inputENTRADAKM_FECHAACTUAL').val(_ListaEntradaKm[p_indice].FECHA_ACTUAL.substring(0,10));

            var v_kmPersonales = parseInt(_ListaEntradaKm[p_indice].KM_TOTAL) - parseInt(_ListaEntradaKm[p_indice].KM_PROFESIONAL);

            $('#inputENTRADAKM_KMDIFERENCIA').val(_ListaEntradaKm[p_indice].KM_TOTAL);
            $('#inputENTRADAKM_KMPROFESIONALES').val(_ListaEntradaKm[p_indice].KM_PROFESIONAL);
            $('#inputENTRADAKM_KMPROFESIONALES').max=_ListaEntradaKm[p_indice].KM_TOTAL;

            $('#inputENTRADAKM_KMPERSONALES').val(Numero_String(v_kmPersonales));

            $('#inputENTRADAKM_OBSESRVACIONES').text(_ListaEntradaKm[p_indice].OBSERVACIONES);
            OcultarEspera();

        }
        else{//nuevo

            if(_ListaVehiculosFlota!=null) {

                if (_ListaVehiculosFlota.length == 1) {

                    $('#inputENTRADAKM_VEHICULO').text(_ListaVehiculosFlota[0].MATRICULA);
                    RecuperarUltimaLectura();
                }
                else {
                    OcultarEspera();
                }
            }
            else{mensaje('msj_17','msj_1');abrirPagina("pageInicio");}
        }
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}

function LimpiarEntradaKm(p_total){
    if(p_total){$('#inputENTRADAKM_VEHICULO').text(ObtenerTexto('txt_36'));}//Escoger un vehículo...

    $('#inputENTRADAKM_KMULTIMA').val('');
    $('#inputENTRADAKM_FECHAULTIMA').val('');

    $('#inputENTRADAKM_KMACTUAL').val('');
    $('#inputENTRADAKM_FECHAACTUAL').val('');

    $('#inputENTRADAKM_KMPROFESIONALES').val('');
    $('#inputENTRADAKM_KMPERSONALES').val('');
    $('#inputENTRADAKM_KMDIFERENCIA').val('');

    $('#inputENTRADAKM_OBSESRVACIONES').val('');

}

function ActivarEntradaKm(p_indice) {
    estadoControl('inputENTRADAKM_FECHAULTIMA', false);
    estadoControl('inputENTRADAKM_KMULTIMA', false);
    estadoControl('inputENTRADAKM_KMPERSONALES', false);
    estadoControl('inputENTRADAKM_KMDIFERENCIA', false);

    if(p_indice!=null){//Es una modificación
        estadoControl('divENTRADAKM_VEHICULO', false);
        estadoControl('inputENTRADAKM_VEHICULO', false);
        estadoControl('inputENTRADAKM_FECHAACTUAL', false);
        estadoControl('inputENTRADAKM_KMACTUAL', false);

        estadoControl('inputENTRADAKM_KMPROFESIONALES', true);
        estadoControl('inputENTRADAKM_OBSESRVACIONES', true);
    }
    else{//Es un registro nuevo
        if (_ListaVehiculosFlota.length == 1) {
            estadoControl('divENTRADAKM_VEHICULO', false);
            estadoControl('inputENTRADAKM_VEHICULO', false);
        }
        else {
            estadoControl('divENTRADAKM_VEHICULO', true);
            estadoControl('inputENTRADAKM_VEHICULO', true);
        }
        if($('#inputENTRADAKM_VEHICULO').text()==ObtenerTexto('txt_36')) {
            estadoControl('inputENTRADAKM_FECHAACTUAL', false);
            estadoControl('inputENTRADAKM_KMACTUAL', false);
            estadoControl('inputENTRADAKM_KMPROFESIONALES', false);
            estadoControl('inputENTRADAKM_OBSESRVACIONES', false);
        }
        else
        {
            estadoControl('inputENTRADAKM_FECHAACTUAL', true);
            estadoControl('inputENTRADAKM_KMACTUAL', true);
            estadoControl('inputENTRADAKM_KMPROFESIONALES', true);
            estadoControl('inputENTRADAKM_OBSESRVACIONES', true);
        }
    }

    if(_UsuarioApp.TIPOUSUARIO==1){
        $('#divEntradaKmDiferencia').hide();
        $('#divEntradaKmProfPer').show();
    }
    else{
        $('#divEntradaKmDiferencia').show();
        $('#divEntradaKmProfPer').hide();

    }
}

function RecuperarUltimaLectura(){
    try {
        var v_matricula=$('#inputENTRADAKM_VEHICULO').text();
        ActivarEntradaKm(_tempEntradaKmId);
        _primeralectura=false;
        if(v_matricula!=ObtenerTexto('txt_36')) {
            MostrarEspera();

            $('#inputENTRADAKM_KMULTIMA').val('');
            $('#inputENTRADAKM_FECHAULTIMA').val('');
            $('#inputENTRADAKM_KMPROFESIONALES').val('');
            $('#inputENTRADAKM_KMPERSONALES').val('');
            $('#inputENTRADAKM_KMDIFERENCIA').val('');

            var v_url = _urlEntradaKm + "/" + _UsuarioApp.LOGIN.toString() + "/" + _UsuarioApp.PASSWORD.toString() + "/" + v_matricula;

            $.ajax({
                type: "GET",
                cache:false,
                url: v_url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (datos) {
                    try {
                        if (datos != null) {
                            LimpiarEntradaKm(false);
                            if(datos['KmContador']==0 && datos['FechaLectura']==null){
                                _primeralectura=true;
                                $('#divEntradaKmUltima').hide();
                                $('#divEntradaKmDiferencia').hide();
                                $('#divEntradaKmProfPer').hide();
                            }
                            else{
                                $('#divEntradaKmUltima').show();
                                $('#inputENTRADAKM_KMULTIMA').val(Numero_String(datos['KmContador']));
                                $('#inputENTRADAKM_FECHAULTIMA').val(datos['FechaLectura'].substring(0,10));

                                if(_UsuarioApp.TIPOUSUARIO==1){
                                    $('#divEntradaKmDiferencia').hide();
                                    $('#divEntradaKmProfPer').show();
                                }
                                else{
                                    $('#divEntradaKmDiferencia').show();
                                    $('#divEntradaKmProfPer').hide();

                                }

                            }
                            OcultarEspera();
                        }
                        else {
                            mensaje("msj_18",'msj_3')//No se ha podido obtener la última lectura de central.
                        }
                    }
                    catch (ex) {
                        mensaje("msj_18",'msj_3')//No se ha podido obtener la última lectura de central.
                    }
                },
                error: function (error) {
                    mensaje("msj_18",'msj_3')//No se ha podido obtener la última lectura de central.
                }
            });
        }
    }
    catch (ex){
        mensaje("msj_18",'msj_3')//No se ha podido obtener la última lectura de central.
    }
}
function CambioNuevaLectura() {
    var v_dif = 0;
    if (_tempEntradaKmId == null) {
        var v_ult = String_Entero($('#inputENTRADAKM_KMULTIMA').val());
        var v_act = String_Entero($('#inputENTRADAKM_KMACTUAL').val());

        if (v_act < v_ult)$('#inputENTRADAKM_KMACTUAL').val(v_ult);
        else $('#inputENTRADAKM_KMACTUAL').val(v_act);

        v_dif = String_Entero($('#inputENTRADAKM_KMACTUAL').val()) - String_Entero($('#inputENTRADAKM_KMULTIMA').val());
    }
    CambioKmProfesionales();
}
function CambioKmProfesionales() {
    if(!_primeralectura) {
        var v_dif = 0;
        if (_tempEntradaKmId == null) {
            v_dif = String_Entero($('#inputENTRADAKM_KMACTUAL').val()) - String_Entero($('#inputENTRADAKM_KMULTIMA').val());
        }
        else {
            v_dif = parseInt(_ListaEntradaKm[_tempEntradaKmId].KM_TOTAL);
        }

        if (_UsuarioApp.TIPOUSUARIO == 1) {

            var v_kmProfesionales = 0;
            if ($('#inputENTRADAKM_KMPROFESIONALES').val().toString() != '') {
                v_kmProfesionales = String_Entero($('#inputENTRADAKM_KMPROFESIONALES').val());
                if (v_kmProfesionales > v_dif) v_kmProfesionales = v_dif;
                else if (v_kmProfesionales < 0) v_kmProfesionales = 0;
            }
            else {
                v_kmProfesionales = v_dif;
            }

            $('#inputENTRADAKM_KMPROFESIONALES').val(v_kmProfesionales);

            var v_kmPersonales = v_dif - String_Entero($('#inputENTRADAKM_KMPROFESIONALES').val());


            $('#inputENTRADAKM_KMPERSONALES').val(v_kmPersonales);
        }
        else {
            $('#inputENTRADAKM_KMDIFERENCIA').val(v_dif);
        }
    }
}
function EnviarEntradaKm(){
    try
    {
        MostrarEspera();
        var v_resultado=ValidarDatosEntradaKm(_tempEntradaKmId);
        if (v_resultado=="OK") {
            var v_registro = RecuperarDatosEntradaKm(_tempEntradaKmId);

            if(v_registro!=null){CrearEntradaKMws(v_registro,_tempEntradaKmId);}
            else{mensaje('msj_25' , 'msj_1');}//No se ha podido procesar los datos

        }
        else{mensaje(v_resultado , 'msj_2');}
    }
    catch (ex){mensaje(ex.message , 'msj_1');}
}
function ValidarDatosEntradaKm(p_indice){
    var v_resultado='';
    var v_ult=String_Entero($('#inputENTRADAKM_KMULTIMA').val());
    var v_act=0;
    if(p_indice==null){

        var v_matricula=$('#inputENTRADAKM_VEHICULO').text();
        if(v_matricula.toString().length==0 || v_matricula==ObtenerTexto('txt_36')) {
            v_resultado+=ObtenerTexto('txt_28')+'\n';//Campo matrícula obligatorio
        }
            //Lectura obligatoria y superior a la última
        if($('#inputENTRADAKM_KMACTUAL').val().toString()!=''){

            if(!_primeralectura) {
                v_act = parseInt($('#inputENTRADAKM_KMACTUAL').val());
                if (v_act < v_ult) v_resultado += ObtenerTexto('msj_30') + '\n';//La lectura actual es obligatoria y ha de ser superior a la última lectura.
            }
        }
        else v_resultado+=ObtenerTexto('msj_30')+'\n';//La lectura actual es obligatoria y ha de ser superior a la última lectura.

        //Fecha lectura obligatoria y superior a la última y no superior al día de hoy
        if($('#inputENTRADAKM_FECHAACTUAL').val().toString()!=''){
            if(!_primeralectura) {
                var v_fult = Fecha_StringToDate($('#inputENTRADAKM_FECHAULTIMA').val());
                var v_fact = Fecha_StringToDate($('#inputENTRADAKM_FECHAACTUAL').val());
                if (v_fact <= v_fult)v_resultado += ObtenerTexto('msj_31') + '\n';//La fecha actual es obligatoria, no puede ser a futuro y ha de ser superior o igual a la de última lectura.
                else {
                    if (v_fact > new Date())v_resultado += ObtenerTexto('msj_31') + '\n';//La fecha actual es obligatoria, no puede ser a futuro y ha de ser superior o igual a la de última lectura.
                }
            }
        }
        else v_resultado+=ObtenerTexto('msj_31')+'\n';//La fecha actual es obligatoria, no puede ser a futuro y ha de ser superior o igual a la de última lectura.
    }

    if(!_primeralectura) {
        if (_UsuarioApp.TIPOUSUARIO == 1) {
            //km profesionales obligatorio y no superior a los km totales
            if ($('#inputENTRADAKM_KMPROFESIONALES').val().toString() != '') {
                v_act = parseInt($('#inputENTRADAKM_KMACTUAL').val());
                var v_km = parseInt($('#inputENTRADAKM_KMPROFESIONALES').val());
                if (v_km > (v_act - v_ult))v_resultado += ObtenerTexto('msj_32') + '\n';//Los km profesionales son obligatorios y no pueden superar los km. totales.
            }
            else v_resultado += ObtenerTexto('msj_32') + '\n';//Los km profesionales son obligatorios y no pueden superar los km. totales.
        }
    }
    if(v_resultado=='') return "OK"
    else return v_resultado;
}

function RecuperarDatosEntradaKm(p_indice){
    var v_registro=new clEntradaKm();
    if(p_indice!=null) {
        v_registro.IDUSUARIO = _ListaEntradaKm[p_indice].IDUSUARIO;
        v_registro.IDLECTURA = _ListaEntradaKm[p_indice].IDLECTURA;
        v_registro.MATRICULA = _ListaEntradaKm[p_indice].MATRICULA;
        v_registro.KM_ACTUAL = _ListaEntradaKm[p_indice].KM_ACTUAL;
        v_registro.FECHA_ACTUAL = _ListaEntradaKm[p_indice].FECHA_ACTUAL;
        v_registro.FECHA_REGISTRO = _ListaEntradaKm[p_indice].FECHA_REGISTRO;
        v_registro.KM_ULT = _ListaEntradaKm[p_indice].KM_ULT;
        v_registro.KM_TOTAL = _ListaEntradaKm[p_indice].KM_TOTAL;
        v_registro.PERMISOELIMINAR = _ListaEntradaKm[p_indice].PERMISOELIMINAR;
    }
    else{
        v_registro.IDUSUARIO = _UsuarioApp.IDUSUARIO;
        v_registro.MATRICULA = $('#inputENTRADAKM_VEHICULO').text();
        v_registro.KM_ACTUAL =parseInt($('#inputENTRADAKM_KMACTUAL').val().replace(".","").replace(".","").replace(".",""));
        v_registro.FECHA_ACTUAL = $('#inputENTRADAKM_FECHAACTUAL').val();
        var v_fecha=new Date();
        v_registro.FECHA_REGISTRO = Fecha_DateToString(v_fecha);

        if(!_primeralectura){
            v_registro.KM_ULT =parseInt($('#inputENTRADAKM_KMULTIMA').val().replace(".","").replace(".","").replace(".",""));
            v_registro.KM_TOTAL =v_registro.KM_ACTUAL- v_registro.KM_ULT;
        }
        else{
            v_registro.KM_TOTAL=v_registro.KM_ACTUAL;
        }
    }


    if(!_primeralectura){
        v_registro.FECHA_UL= $('#inputENTRADAKM_FECHAULTIMA').val();
        if(_UsuarioApp.TIPOUSUARIO==1){
            v_registro.KM_PROFESIONAL =parseInt($('#inputENTRADAKM_KMPROFESIONALES').val().replace(".","").replace(".","").replace(".",""));
        }
        else{
            v_registro.KM_PROFESIONAL = v_registro.KM_TOTAL;
        }
    }
    v_registro.OBSERVACIONES = $('#inputENTRADAKM_OBSESRVACIONES').val();


    return v_registro;
}
function CrearEntradaKMws(p_registro,p_indice){
    var v_error="OK";
    try {

        var v_tipo="POST";
        var v_url = _urlEntradaKm + "/" + _UsuarioApp.LOGIN.toString() + "/" + _UsuarioApp.PASSWORD.toString();
        if(p_indice!=null){
            v_tipo="PUT";
            v_url=v_url+"?id="+p_registro.IDLECTURA.toString();
        }


        $.ajax({
            type: v_tipo,
            cache:false,
            url: v_url,
            data: JSON.stringify(p_registro.JSON()),
            contentType: "application/json",
            success: function(datos){
                    if (datos == 1) {abrirPagina("pageResultados","OK");}
                    else{abrirPagina("pageResultados", "ERROR3");}
            },
            error: function(error){ abrirPagina("pageResultados", "ERROR3");}
        });

    }
    catch(ex){abrirPagina("pageResultados","ERROR3");}
}


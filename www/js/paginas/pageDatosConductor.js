function inicioPaginaDatosUsuario() {
    OcultarEspera();
    AsignarLiterales('pageDatosConductor');
    try{
        cargaDatosDatosUsuario();
    }
    catch (ex){
        mensaje('msj_10','msj_5',ex.message);
        abrirPagina("pageInicio");
    }
}

function LimpiarDatosUsuario() {
    try{
        //$('#inputCONDUCTOR_EMPRESA').val('');
        $('#inputNOMBRE').val('');
        $('#inputAPELLIDOS').val('');
        $('#inputEMAIL').val('');
        $('#inputTELEFONOFIJO').val('');
        $('#inputTELEFONOMOVIL').val('');
    }
    catch (ex){}
}

function cargaDatosDatosUsuario(){

    LimpiarDatosUsuario();
    var v_objUsu = new clUsuario();
    var v_resultado = v_objUsu.Obtener();
    if(v_resultado =="OK")
    {
        //$('#inputCONDUCTOR_EMPRESA').val(v_objUsu.EMPRESA);

        $('#inputNOMBRE').val(v_objUsu.NOMBRE) ;
        $('#inputAPELLIDOS').val(v_objUsu.APELLIDOS);
        $('#inputEMAIL').val(v_objUsu.EMAIL);
        $('#inputTELEFONOFIJO').val(v_objUsu.TELEFONO_FIJO);
        $('#inputTELEFONOMOVIL').val(v_objUsu.TELEFONO_MOVIL);

    }
    //estadoControl('inputCONDUCTOR_EMPRESA', false);
    estadoControl('inputNOMBRE', false);
    estadoControl('inputAPELLIDOS', false);

}


function guardaDatosUsuario(){
    try
    {
        MostrarEspera();
        var v_resultado=ValidarDatosConductor();
        if (v_resultado=="OK") {
            var v_usuario = RecuperarDatosConductor();

            if(v_usuario!=null){
                ModificaUsuarioWS(v_usuario);
            }
            else{
                mensaje('msj_25' , 'msj_1');
            }
        }
        else{mensaje(v_resultado , 'msj_2');}
    }
    catch (ex){mensaje(ex.message , 'msj_1');}
}

function ValidarDatosConductor(){
    var v_resultado='';
    if(!esEmail($('#inputEMAIL').val())){
        v_resultado=ObtenerTexto('msj_22')+'\n';//"Email de contacto no válido";
    }
    if(!esTelefono($('#inputTELEFONOFIJO').val())){
        v_resultado+=ObtenerTexto('msj_23')+'\n';//Teléfono fijo no válido
    }
    if(!esTelefono($('#inputTELEFONOMOVIL').val())){
        v_resultado+=ObtenerTexto('msj_24')+'\n';//Teléfono móvil no válido
    }
    if(v_resultado=='')return"OK"
    else return v_resultado;
}

function RecuperarDatosConductor(){
    var v_usuario = new clUsuario();
    var v_res=v_usuario.Obtener();

    if(v_res=="OK"){
        v_usuario.EMAIL=$('#inputEMAIL').val();;
        v_usuario.TELEFONO_FIJO=$('#inputTELEFONOFIJO').val();
        v_usuario.TELEFONO_MOVIL=$('#inputTELEFONOMOVIL').val();
        return v_usuario;
    }
    return null;
}

function ModificaUsuarioWS(p_usuario){

    try {

        var v_url=_urlUsuario+"/"+_UsuarioApp.LOGIN.toString()+"/"+_UsuarioApp.PASSWORD.toString()+"?id="+p_usuario.IDUSUARIO.toString();

        $.ajax({
            type: "PUT",
            cache:false,
            url: v_url,
            data: JSON.stringify(p_usuario.JSON()),
            contentType: "application/json",
            success: function(datos){
                if (datos == 1) {
                    try{p_usuario.Modificar();}
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


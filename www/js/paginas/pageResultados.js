function inicioPaginaResultados(p_resultado) {
    OcultarEspera();
    $.mobile.loading( "hide" );
    AsignarLiterales('pageResultados');

    var v_titulo='';
    var v_texto='';
    var v_error='';
    switch (p_resultado) {
        case 'OK':
            v_titulo=ObtenerTexto('msj_44');//"Envío correcto.";
            v_texto=ObtenerTexto('msj_45');//"Los datos se han actualizado correctamente.";
            break;
        case 'ERROR3':
            v_titulo=ObtenerTexto('msj_46');//"Error de comunicación.";
            v_texto=ObtenerTexto('msj_47');//"Los datos no se han podido enviar a central.";
            break;
        case 'ERROR4':
            v_titulo=ObtenerTexto('msj_46');//"Error de comunicación.";
            v_texto='Error de servidor: los datos no se han grabado en central.';//"Los datos no se han podido enviar a central.";
            break;
        default:
            break;

    }

    if(p_resultado=="OK"){
        $('#lblRESULTADOESTADO').css("color","#96BD0D");
    }
    else{
        $('#lblRESULTADOESTADO').css("color","#ff0000");
    }
    $('#lblRESULTADOESTADO').text(v_titulo);
    $('#lblRESULTADOTEXTO').text(v_texto);
    $('#lblRESULTADOERROR').text(v_error);


}

function MostrarResultados(p_texto){
    abrirPagina("pageResultados");
    $('#divResultadostexto').html(p_texto.replace('\n','<br />').replace('\n','<br />').replace('\n','<br />').replace('\n','<br />'));


}
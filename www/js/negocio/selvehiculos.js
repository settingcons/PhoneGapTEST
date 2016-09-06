function AbrirLista(p_elemento,p_ficha){
    try{
        _tempCampoVehiculo=p_elemento;
        cargarListaVehiculo(p_ficha);
        try{
            var v_alto=$(document).height();
            document.getElementById('divListaVehiculo').style.height=v_alto+"px";
        }catch(ex) {}

        $('#divListaVehiculo').show();
    }
    catch (ex){mensaje(ex.message,'msj_1')}
}


function AceptarLista(p_idLista,p_ficha){

    $('#'+_tempCampoVehiculo).text(_ListaVehiculosFlota[p_idLista].MATRICULA);
    _tempCampoVehiculo=null;
    $('#divListaVehiculo').hide();
    if(p_ficha){
        RecuperarUltimaLectura();
    }

}

function CancelarLista(){
    _tempCampoVehiculo=null;
    $('#divListaVehiculo').hide();

}

function cargarListaVehiculo(p_ficha){
    $('#lvListaVehiculo').html("");


    var v_html = "";

    v_html="<ul>"
    for(var x=0; x<_ListaVehiculosFlota.length; x++)
    {
        v_html +="<li class='btTocar1' onclick='AceptarLista("+ x.toString()+","+p_ficha.toString()+")' ><div style='width:90%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap'>"+_ListaVehiculosFlota[x].MATRICULA+"</div></li>";

    }

    v_html+="</ul>"

    v_html +="<script type='text/javascript'>";
    v_html +="$('.btTocar1').bind('touchstart', function(){";
    v_html +="$(this).addClass('btHover');";
    v_html +="});";

    v_html +="$('.btTocar1').bind('touchend', function(){";
    v_html +="$(this).removeClass('btHover');";
    v_html +="})";
    v_html +="</script>";

    $('#lvListaVehiculo').html(v_html);

}


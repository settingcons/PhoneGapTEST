
function ProcesandoDatosObtenerListaEntradaKmWS(datos){

    var v_lista=datos;
    var v_listaRetorno=new Array();
    var v_indice=0;
    for(var i=0;i<v_lista.length;i++){
        v_listaRetorno[v_indice++] =new clEntradaKm(v_lista[i]);
    }

    return v_listaRetorno;
}


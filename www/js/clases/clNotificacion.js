function clNotificacion(aDatos) {
    if (undefined === aDatos || void 0 === aDatos || aDatos == null) {
        this.ID = 0;
        this.IDNOTIFICACION = '';
        this.FECHA = '';
        this.ASUNTO = '';
        this.TEXTO = '';
        this.LEIDA = '';
        this.ENVIADO = 0;
    }
    else{
        this.ID = aDatos['id'];
        this.IDNOTIFICACION = aDatos['IdNotificacion'];
        this.FECHA = aDatos['Fecha'] + '';
        this.ASUNTO = aDatos['Asunto'] + '';
        this.TEXTO = aDatos['Texto'] + '';
        this.LEIDA = aDatos['Leida'];
        this.ENVIADO = 0;
    }
}

clNotificacion.prototype.Obtener=function(p_indice){
    var v_registro = null;
    try {
        v_registro = leeObjetoLocal('NOTIF_' + p_indice.toString().trim(), 'NO_EXISTE');
        if (v_registro == 'NO_EXISTE') {
            return null;
        }
        else {
            this.ID = v_registro.ID;
            this.IDNOTIFICACION = v_registro.IDNOTIFICACION;
            this.FECHA = v_registro.FECHA;
            this.ASUNTO = v_registro.ASUNTO;
            this.TEXTO = v_registro.TEXTO;
            this.LEIDA = v_registro.LEIDA;
            this.ENVIADO=v_registro.ENVIADO;

            return "OK";
        }
    }
    catch (ex){return ex.message}
}

clNotificacion.prototype.Obtener_porIdNotificacion=function(p_IdNotificacion){
    try {
        var v_registro = null;
        var v_encontrado=false;
        var v_n = leeObjetoLocal('NOTIF_NEXTVAL' , -1);
        while (true){
            v_registro = leeObjetoLocal('NOTIF_' + (v_n--).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                if (p_IdNotificacion==v_registro.IDNOTIFICACION)
                {
                    v_encontrado=true;
                    break;
                }
            }
            if(v_n<0)break;
        }
        if(v_encontrado){
            this.ID = v_registro.ID;
            this.IDNOTIFICACION = v_registro.IDNOTIFICACION;
            this.FECHA = v_registro.FECHA;
            this.ASUNTO = v_registro.ASUNTO;
            this.TEXTO = v_registro.TEXTO;
            this.LEIDA = v_registro.LEIDA;
            this.ENVIADO=v_registro.ENVIADO;

            return "OK";
        }
        else{
            return null;
        }
    }
    catch (ex){return ex.message}
}

clNotificacion.prototype.Guardar=function(){
    try {
        var v_IdLocal = leeObjetoLocal('NOTIF_NEXTVAL', -1) + 1;

        this.ID = v_IdLocal;

        guardaObjetoLocal('NOTIF_' + v_IdLocal.toString().trim(), this);

        guardaObjetoLocal('NOTIF_NEXTVAL', v_IdLocal);

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clNotificacion.prototype.Modificar=function(){
    try{
        guardaObjetoLocal('NOTIF_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex) {return ex.message;}
}

clNotificacion.prototype.Eliminar=function(){
    try{
        borraObjetoLocal('NOTIF_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex) {return ex.message;}
}

clNotificacion.prototype.ActualizarEnviado=function(p_enviado){
    try{
        if(p_enviado){
            this.ENVIADO=1;
        }
        else{
            this.ENVIADO=0;
        }
        guardaObjetoLocal('NOTIF_' + this.ID.toString().trim(), this);
        return "OK";
    }
    catch (ex){return ex.message}
}

clNotificacion.prototype.ObtenerPendientes=function(){
    try {
        var v_registro = null;
        var v_pendiente=0;
        var v_n = leeObjetoLocal('NOTIF_NEXTVAL' , -1);
        while (true){
            v_registro = leeObjetoLocal('NOTIF_' + (v_n--).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                if (v_registro.LEIDA==0)
                {
                    v_pendiente++;
                }
            }
            if(v_n<0)break;
        }
        return v_pendiente;
    }
    catch (ex){return -1;}
}


clNotificacion.prototype.JSON=function (){
    var v_data =
    {
        "IdNotificacion": this.IDNOTIFICACION,
        "Fecha": this.FECHA.toString(),
        "Asunto": this.ASUNTO.toString(),
        "Texto": this.TEXTO.toString(),
        "Leida": this.LEIDA
    };
    return v_data;
}

function clListaNotificacion(){
    this.Lista = new Array();
}

clListaNotificacion.prototype.ObtenerLista=function(){
    try{
        this.Lista = new Array();
        var v_registro = null;
        var v_nInd = 0;
        var v_n = leeObjetoLocal('NOTIF_NEXTVAL' , -1);

        while (true){
            v_registro = leeObjetoLocal('NOTIF_' + (v_n--).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                this.Lista[v_nInd++] = v_registro;
            }
            if(v_n<0)break;
        }

    }
    catch (ex) {return ex.message;}
}


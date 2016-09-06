function clTexto(aDatos) {
    if (undefined === aDatos || void 0 === aDatos || aDatos == null) {
        this.ID = 0;
        this.IDTEXTO = '';
        this.TEXTO = '';
    }
    else{
        this.ID = aDatos['id'];
        this.IDTEXTO = aDatos['idtexto'] + '';
        this.TEXTO = aDatos['texto'] + '';
    }
}


clTexto.prototype.Obtener_porIdLocal=function(p_indice){
    var v_registro = null;
    try {
        v_registro = leeObjetoLocal('TEXTO_' + p_indice.toString().trim(), 'NO_EXISTE');
        if (v_registro == 'NO_EXISTE') {
            return null;
        }
        else {
            this.ID = v_registro.ID;
            this.IDTEXTO = v_registro.IDTEXTO;
            this.TEXTO = v_registro.TEXTO;

            return "OK";
        }
    }
    catch (ex){return ex.message}
}

clTexto.prototype.Obtener_porIdTexto=function(p_idTexto){
    try {
        var v_registro = null;
        var v_encontrado=false;
        var v_n = leeObjetoLocal('TEXTO_NEXTVAL', 0);
        while (true) {
            v_registro = leeObjetoLocal('TEXTO_' + (v_n--).toString().trim(), 'NO_EXISTE');
            if (v_registro != 'NO_EXISTE') {
                if (p_idTexto == v_registro.IDTEXTO) {
                    v_encontrado=true;
                    break;
                }
            }
            if (v_n < 0)break;
        }
        if(v_encontrado){
            this.ID = v_registro.ID;
            this.IDTEXTO = v_registro.IDTEXTO;
            this.TEXTO = v_registro.TEXTO;

            return "OK";
        }
        else{
            return null;
        }
    }
    catch (ex){return ex.message}
}

clTexto.prototype.Guardar=function(){
    try{
        var v_IdTexto = leeObjetoLocal('TEXTO_NEXTVAL', -1) + 1;
        this.ID = v_IdTexto;

        guardaObjetoLocal('TEXTO_' + v_IdTexto.toString().trim(), this);

        guardaObjetoLocal('TEXTO_NEXTVAL', v_IdTexto);

        return "OK";

    }
    catch (ex){return ex.message}

}

clTexto.prototype.Modificar=function(){
    try{
        guardaObjetoLocal('TEXTO_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex){return ex.message}
}

clTexto.prototype.Actualizar=function(p_idTexto,p_sTexto){
    try {
        var v_resultado = this.Obtener_porIdTexto(p_idTexto);
        if (v_resultado == "OK") {
            this.TEXTO = p_sTexto;
            return this.Modificar();
        }
        else if (v_resultado == null) {
            this.IDTEXTO = p_idTexto;
            this.TEXTO = p_sTexto;
            return this.Guardar();
        }
        else {
            return v_resultado;
        }
    }
    catch (ex){return ex.message}
}
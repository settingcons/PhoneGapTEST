function clVehiculoFlota(aDatos) {
    if (undefined === aDatos || void 0 === aDatos || aDatos == null) {
        this.ID = 0;
        this.MATRICULA = '';
        this.MARCA = '';
        this.MODELO = '';
        this.VERSION = '';
        this.FECHAINICIO = '';
    }
    else{
        this.ID = aDatos['id'];
        this.MATRICULA = aDatos['matricula'] + '';
        this.MARCA = aDatos['marca'] + '';
        this.MODELO = aDatos['modelo'] + '';
        this.VERSION = aDatos['version'] + '';
        this.FECHAINICIO= aDatos['fechainicio'] + '';
    }
}


clVehiculoFlota.prototype.Obtener_porIdLocal=function(p_indice){
    var v_registro = null;
    try {
        v_registro = leeObjetoLocal('VFLOTA_' + p_indice.toString().trim(), 'NO_EXISTE');
        if (v_registro == 'NO_EXISTE') {
            return null;
        }
        else {
            this.ID = v_registro.ID;
            this.MATRICULA = v_registro.MATRICULA;
            this.MARCA = v_registro.MARCA;
            this.MODELO = v_registro.MODELO;
            this.VERSION = v_registro.VERSION;
            this.FECHAINICIO = v_registro.FECHAINICIO;

            return "OK";
        }
    }
    catch (ex){return ex.message}
}

clVehiculoFlota.prototype.Obtener_porMatricula=function(p_matricula){
    try {
        var v_registro = null;
        var v_encontrado=false;
        var v_n = leeObjetoLocal('VFLOTA_NEXTVAL' , -1);
        while (true){
            v_registro = leeObjetoLocal('VFLOTA_' + (v_n--).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                if (p_matricula==v_registro.MATRICULA)
                {
                    v_encontrado=true;
                    break;
                }
            }
            if(v_n<0)break;
        }
        if(v_encontrado){
            this.ID = v_registro.ID;
            this.MATRICULA = v_registro.MATRICULA;
            this.MARCA = v_registro.MARCA;
            this.MODELO = v_registro.MODELO;
            this.VERSION = v_registro.VERSION;
            this.FECHAINICIO = v_registro.FECHAINICIO;

            return "OK";
        }
        else{
            return null;
        }
    }
    catch (ex){return ex.message}
}


clVehiculoFlota.prototype.Guardar=function(){
    try {
        var v_IdLocal = leeObjetoLocal('VFLOTA_NEXTVAL', -1) + 1;

        this.ID = v_IdLocal;

        guardaObjetoLocal('VFLOTA_' + v_IdLocal.toString().trim(), this);

        guardaObjetoLocal('VFLOTA_NEXTVAL', v_IdLocal);

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clVehiculoFlota.prototype.Modificar=function(){
    try{
        guardaObjetoLocal('VFLOTA_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex) {return ex.message;}
}



function clListaVehiculoFlota(){
    this.Lista = new Array();
}

clListaVehiculoFlota.prototype.ObtenerLista=function(){
    try{
        this.Lista = new Array();
        var v_registro = null;
        var v_nInd = 0;
        var v_n = leeObjetoLocal('VFLOTA_NEXTVAL' , -1);

        while (true){
            v_registro = leeObjetoLocal('VFLOTA_' + (v_n--).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                this.Lista[v_nInd++] = v_registro;
            }
            if(v_n<0)break;
        }

    }
    catch (ex) {return ex.message;}
}
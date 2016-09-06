function clEntradaKm(aDatos) {
    if (undefined === aDatos || void 0 === aDatos || aDatos == null) {
        this.ID = 0;
        this.IDLECTURA = 0;
        this.IDUSUARIO = 0;
        this.MATRICULA = '';
        this.KM_ULT = 0;
        this.FECHA_UL = '';
        this.KM_ACTUAL = 0;
        this.FECHA_ACTUAL = '';
        this.KM_PROFESIONAL = 0;
        this.OBSERVACIONES = '';
        this.FECHA_REGISTRO = '';
        this.KM_TOTAL = 0;
        this.PERMISOELIMINAR = 0;
        this.ENVIADO=0;
    }
    else{
        this.ID = aDatos['id'];
        this.IDLECTURA = aDatos['IdLectura'];
        this.IDUSUARIO = aDatos['IdUsuario'];
        this.MATRICULA = aDatos['Matricula'] + '';
        this.KM_ULT = aDatos['KmUltimaLectura'];
        this.KM_ACTUAL = aDatos['KmContador'] ;
        this.FECHA_ACTUAL  = aDatos['FechaLectura'] + '';
        this.KM_PROFESIONAL = aDatos['KmProfesionales'] ;
        this.OBSERVACIONES = aDatos['Comentarios'] + '';
        this.FECHA_REGISTRO = aDatos['FechaRegistro'] + '';
        this.KM_TOTAL = aDatos['KmTotales'];
        this.PERMISOELIMINAR = aDatos['PermisoEliminar'];
        this.FECHA_UL ='';
        this.ENVIADO=0;
    }
}


clEntradaKm.prototype.Obtener= function (p_indice){
    var v_registro = null;
    try {
        v_registro = leeObjetoLocal('ENTRADAKM_' + p_indice.toString().trim(), 'NO_EXISTE');
        if (v_registro == 'NO_EXISTE') {
            return null;
        }
        else {
            this.ID = v_registro.ID;
            this.IDLECTURA = v_registro.IDLECTURA;
            this.IDUSUARIO = v_registro.IDUSUARIO;
            this.MATRICULA = v_registro.MATRICULA;
            this.KM_ULT = v_registro.KM_ULT;
            this.FECHA_UL=v_registro.FECHA_UL;
            this.KM_ACTUAL =v_registro.KM_ACTUAL;
            this.FECHA_ACTUAL = v_registro.FECHA_ACTUAL;
            this.KM_PROFESIONAL =v_registro.KM_PROFESIONAL;
            this.OBSERVACIONES = v_registro.OBSERVACIONES;
            this.FECHA_REGISTRO = v_registro.FECHA_REGISTRO;
            this.KM_TOTAL = v_registro.KM_TOTAL;
            this.PERMISOELIMINAR = v_registro.PERMISOELIMINAR;
            this.ENVIADO=v_registro.ENVIADO;

            return "OK";
        }
    }
    catch (ex){return ex.message}
}

clEntradaKm.prototype.Obtener_porMatricula=function(p_matricula){
    try {
        var v_registro = null;
        var v_encontrado=false;
        var v_n = leeObjetoLocal('ENTRADAKM_NEXTVAL' , -1);
        while (true){
            v_registro = leeObjetoLocal('ENTRADAKM_' + (v_n--).toString().trim() , 'NO_EXISTE');
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
            this.IDLECTURA = v_registro.IDLECTURA;
            this.IDUSUARIO = v_registro.IDUSUARIO;
            this.MATRICULA = v_registro.MATRICULA;
            this.KM_ULT = v_registro.KM_ULT;
            this.FECHA_UL=v_registro.FECHA_UL;
            this.KM_ACTUAL =v_registro.KM_ACTUAL;
            this.FECHA_ACTUAL = v_registro.FECHA_ACTUAL;
            this.KM_PROFESIONAL =v_registro.KM_PROFESIONAL;
            this.OBSERVACIONES = v_registro.OBSERVACIONES;
            this.FECHA_REGISTRO = v_registro.FECHA_REGISTRO;
            this.KM_TOTAL = v_registro.KM_TOTAL;
            this.PERMISOELIMINAR = v_registro.PERMISOELIMINAR;
            this.ENVIADO=v_registro.ENVIADO;

            return "OK";
        }
        else{
            return null;
        }
    }
    catch (ex){return ex.message}
}

clEntradaKm.prototype.Guardar= function (){
    try {
        var v_IdLocal = leeObjetoLocal('ENTRADAKM_NEXTVAL', -1) + 1;

        this.ID = v_IdLocal;

        guardaObjetoLocal('ENTRADAKM_' + v_IdLocal.toString().trim(), this);

        guardaObjetoLocal('ENTRADAKM_NEXTVAL', v_IdLocal);

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clEntradaKm.prototype.Modificar=function (){
    try {
        guardaObjetoLocal('ENTRADAKM_' + this.ID.toString().trim(), this);
        return "OK";
    }
    catch (ex){return ex.message}
}

clEntradaKm.prototype.Eliminar=function(){
    try{
        borraObjetoLocal('ENTRADAKM_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex) {return ex.message;}
}

clEntradaKm.prototype.JSON=function (){
    var v_data = {
        "IdLectura":this.IDLECTURA,
        "IdUsuario":this.IDUSUARIO,
        "Comentarios": ""+this.OBSERVACIONES+"",
        "FechaLectura": ""+this.FECHA_ACTUAL+"",
        "FechaRegistro": ""+this.FECHA_REGISTRO+"",
        "KmContador":this.KM_ACTUAL,
        "KmProfesionales":((this.KM_PROFESIONAL==null)? 0 : this.KM_PROFESIONAL ),
        "KmTotales":this.KM_TOTAL,
        "KmUltimaLectura":this.KM_ULT,
        "Matricula":""+this.MATRICULA+"",
        "PermisoEliminar":this.PERMISOELIMINAR
    };
    return v_data;
}



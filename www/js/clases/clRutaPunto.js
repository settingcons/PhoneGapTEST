
function clRutaPunto(aDatos) {
    if (undefined === aDatos || void 0 === aDatos || aDatos == null) {
        this.ID = 0;
        this.IDRUTALOCAL = 0;
        this.IDRUTAPUNTO = 0;
        this.IDPUNTO = 0;
        this.IDUSUARIO = 0;
        this.COORD_X = '';
        this.COORD_Y = '';
        this.FECHAHORA = '';
        this.HEADING = 0;
        this.VELOCIDAD = 0;
        this.ALTITUD = 0;
        this.ACCURACY = 0;
        this.ALTITUDACCURACY = 0;
        this.FECHAHORACAPTURA = '';
        this.VALIDO=1;
        this.DIFF=0;
        this.DISTANCIA=0;
    }
    else{
        this.ID = aDatos['id'];
        this.IDRUTALOCAL = aDatos['idrutalocal'] + '';;
        this.IDRUTAPUNTO =aDatos['IdRuta'] + '';
        this.IDPUNTO =  aDatos['IdPunto'] + '';
        this.IDUSUARIO =  aDatos['IdUsuario'] + '';
        this.COORD_X = aDatos['CoordX'] + '';
        this.COORD_Y = aDatos['CoordY'] + '';
        this.FECHAHORA = aDatos['FechaHora'] + '';
        this.HEADING = aDatos['Heading'] + '';
        this.VELOCIDAD  = aDatos['Velocidad'] + '';
        this.ALTITUD = aDatos['Altitud'] + '';
        this.ACCURACY = aDatos['Accuracy'] + '';
        this.ALTITUDACCURACY = aDatos['altitudaccuracy'] + '';
        this.FECHAHORACAPTURA = aDatos['FechaHoraCapturaRuta'] + '';
        this.VALIDO= aDatos['Valido'] + '';;
        this.DIFF=0;
        this.DISTANCIA=0;
    }
}

clRutaPunto.prototype.Obtener=function(p_indice){
    var v_registro = null;
    try {
        v_registro = leeObjetoLocal('RUTAPUNTO_' + p_indice.toString().trim(), 'NO_EXISTE');
        if (v_registro == 'NO_EXISTE') {
            return null;
        }
        else {
            this.ID = v_registro.ID;
            this.IDRUTALOCAL = v_registro.IDRUTALOCAL;
            this.IDRUTAPUNTO = v_registro.IDRUTAPUNTO;
            this.IDPUNTO = v_registro.IDPUNTO;
            this.IDUSUARIO = v_registro.IDUSUARIO;
            this.COORD_X = v_registro.COORD_X;
            this.COORD_Y = v_registro.COORD_Y;
            this.FECHAHORA = v_registro.FECHAHORA;
            this.HEADING = v_registro.HEADING;
            this.VELOCIDAD = v_registro.VELOCIDAD;
            this.ALTITUD = v_registro.ALTITUD;
            this.ACCURACY = v_registro.ACCURACY;
            this.ALTITUDACCURACY = v_registro.ALTITUDACCURACY;
            this.FECHAHORACAPTURA = v_registro.FECHAHORACAPTURA;
            this.VALIDO=v_registro.VALIDO;
            this.DIFF=v_registro.DIFF;

            return "OK";
        }
    }
    catch (ex){return ex.message}
}
clRutaPunto.prototype.ObtenerSQLite=function(p_indice){
    try {
        var v_sql="SELECT ";
        v_sql +=" ID, ";
        v_sql +=" IDRUTALOCAL, ";
        v_sql +=" IDRUTAPUNTO, ";
        v_sql +=" IDPUNTO, ";
        v_sql +=" IDUSUARIO, ";
        v_sql +=" COORD_X, ";
        v_sql +=" COORD_Y, ";
        v_sql +=" FECHAHORA, ";
        v_sql +=" HEADING, ";
        v_sql +=" VELOCIDAD, ";
        v_sql +=" ALTITUD, ";
        v_sql +=" ACCURACY, ";
        v_sql +=" ALTITUDACCURACY, ";
        v_sql +=" FECHAHORACAPTURA, ";
        v_sql +=" VALIDO, ";
        v_sql +=" DIFF, ";
        v_sql +=" DOUBLE ";
        v_sql +=" FROM RutaPunto WHERE ID = "+p_indice.toString()+" ";

        var v_resultado="";
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],
                function(p_tran,p_result){
                    if(p_result!=null && p_result.rows!=null && p_result.rows.length>0) {
                        this.ID = p_result.rows.item(0).ID;
                        this.IDRUTALOCAL = p_result.rows.item(0).IDRUTALOCAL;
                        this.IDRUTAPUNTO = p_result.rows.item(0).IDRUTAPUNTO;
                        this.IDPUNTO = p_result.rows.item(0).IDPUNTO;
                        this.IDUSUARIO = p_result.rows.item(0).IDUSUARIO;
                        this.COORD_X = p_result.rows.item(0).COORD_X;
                        this.COORD_Y = p_result.rows.item(0).COORD_Y;
                        this.FECHAHORA = p_result.rows.item(0).FECHAHORA;
                        this.HEADING = p_result.rows.item(0).HEADING;
                        this.VELOCIDAD = p_result.rows.item(0).VELOCIDAD;
                        this.ALTITUD = p_result.rows.item(0).ALTITUD;
                        this.ACCURACY = p_result.rows.item(0).ACCURACY;
                        this.ALTITUDACCURACY = p_result.rows.item(0).ALTITUDACCURACY;
                        this.FECHAHORACAPTURA = p_result.rows.item(0).FECHAHORACAPTURA;
                        this.VALIDO=p_result.rows.item(0).VALIDO;
                        this.DIFF=p_result.rows.item(0).DIFF;
                        this.DISTANCIA=p_result.rows.item(0).DISTANCIA;

                        v_resultado = "OK";
                    }
                    else v_resultado=null;
                },
                function(p_error){v_resultado= p_error.message;});
        });

        return v_resultado;

    }
    catch (ex){return ex.message}
}

clRutaPunto.prototype.Obtener_porIdRutaPunto=function(p_IdRutaPunto){
    try {
        var v_registro = null;
        var v_encontrado=false;
        var v_n = leeObjetoLocal('RUTAPUNTO_NEXTVAL' , -1);
        while (true){
            v_registro = leeObjetoLocal('RUTAPUNTO_' + (v_n--).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                if (p_IdRutaPunto==v_registro.IDRUTAPUNTO)
                {
                    v_encontrado=true;
                    break;
                }
            }
            if(v_n<0)break;
        }
        if(v_encontrado){
            this.ID = v_registro.ID;
            this.IDRUTALOCAL = v_registro.IDRUTALOCAL;
            this.IDRUTAPUNTO = v_registro.IDRUTAPUNTO;
            this.IDPUNTO = v_registro.IDPUNTO;
            this.IDUSUARIO = v_registro.IDUSUARIO;
            this.COORD_X = v_registro.COORD_X;
            this.COORD_Y = v_registro.COORD_Y;
            this.FECHAHORA = v_registro.FECHAHORA;
            this.HEADING = v_registro.HEADING;
            this.VELOCIDAD = v_registro.VELOCIDAD;
            this.ALTITUD = v_registro.ALTITUD;
            this.ACCURACY = v_registro.ACCURACY;
            this.ALTITUDACCURACY = v_registro.ALTITUDACCURACY;
            this.FECHAHORACAPTURA = v_registro.FECHAHORACAPTURA;
            this.VALIDO=v_registro.VALIDO;
            this.DIFF=v_registro.DIFF;

            return "OK";
        }
        else{
            return null;
        }
    }
    catch (ex){return ex.message}
}
clRutaPunto.prototype.Obtener_porIdRutaPuntoSQLite=function(p_IdRutaPunto){
    try {
        var v_sql="SELECT ";
        v_sql +=" ID, ";
        v_sql +=" IDRUTALOCAL, ";
        v_sql +=" IDRUTAPUNTO, ";
        v_sql +=" IDPUNTO, ";
        v_sql +=" IDUSUARIO, ";
        v_sql +=" COORD_X, ";
        v_sql +=" COORD_Y, ";
        v_sql +=" FECHAHORA, ";
        v_sql +=" HEADING, ";
        v_sql +=" VELOCIDAD, ";
        v_sql +=" ALTITUD, ";
        v_sql +=" ACCURACY, ";
        v_sql +=" ALTITUDACCURACY, ";
        v_sql +=" FECHAHORACAPTURA, ";
        v_sql +=" VALIDO, ";
        v_sql +=" DIFF, ";
        v_sql +=" DISTANCIA ";
        v_sql +=" FROM RutaPunto WHERE ID = "+p_IdRutaPunto.toString()+" ";

        var v_resultado="";
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],
                function(p_tran,p_result){
                    if(p_result!=null && p_result.rows!=null && p_result.rows.length>0) {
                        this.ID = p_result.rows.item(0).ID;
                        this.IDRUTALOCAL = p_result.rows.item(0).IDRUTALOCAL;
                        this.IDRUTAPUNTO = p_result.rows.item(0).IDRUTAPUNTO;
                        this.IDPUNTO = p_result.rows.item(0).IDPUNTO;
                        this.IDUSUARIO = p_result.rows.item(0).IDUSUARIO;
                        this.COORD_X = p_result.rows.item(0).COORD_X;
                        this.COORD_Y = p_result.rows.item(0).COORD_Y;
                        this.FECHAHORA = p_result.rows.item(0).FECHAHORA;
                        this.HEADING = p_result.rows.item(0).HEADING;
                        this.VELOCIDAD = p_result.rows.item(0).VELOCIDAD;
                        this.ALTITUD = p_result.rows.item(0).ALTITUD;
                        this.ACCURACY = p_result.rows.item(0).ACCURACY;
                        this.ALTITUDACCURACY = p_result.rows.item(0).ALTITUDACCURACY;
                        this.FECHAHORACAPTURA = p_result.rows.item(0).FECHAHORACAPTURA;
                        this.VALIDO=p_result.rows.item(0).VALIDO;
                        this.DIFF=p_result.rows.item(0).DIFF;
                        this.DISTANCIA=p_result.rows.item(0).DISTANCIA;

                        v_resultado = "OK";
                    }
                    else v_resultado=null;
                },
                function(p_error){v_resultado= p_error.message;});
        });

        return v_resultado;
    }
    catch (ex){return ex.message}
}


clRutaPunto.prototype.Guardar=function(){
    try {
        var v_IdLocal = leeObjetoLocal('RUTAPUNTO_NEXTVAL', -1) + 1;

        this.ID = v_IdLocal;

        guardaObjetoLocal('RUTAPUNTO_' + v_IdLocal.toString().trim(), this);

        guardaObjetoLocal('RUTAPUNTO_NEXTVAL', v_IdLocal);

        return "OK";
    }
    catch (ex) {return ex.message;}
}
clRutaPunto.prototype.GuardarSQLite=function(fnOk,fnError){
    try {
        var v_sql="INSERT INTO RutaPunto ( ";
        v_sql +=" IDRUTALOCAL, ";
        v_sql +=" IDRUTAPUNTO, ";
        v_sql +=" IDPUNTO, ";
        v_sql +=" IDUSUARIO, ";
        v_sql +=" COORD_X, ";
        v_sql +=" COORD_Y, ";
        v_sql +=" FECHAHORA, ";
        v_sql +=" HEADING, ";
        v_sql +=" VELOCIDAD, ";
        v_sql +=" ALTITUD, ";
        v_sql +=" ACCURACY, ";
        v_sql +=" ALTITUDACCURACY, ";
        v_sql +=" FECHAHORACAPTURA, ";
        v_sql +=" VALIDO, ";
        v_sql +=" DIFF, ";
        v_sql +=" DISTANCIA ";
        v_sql +=" ) VALUES ( ";
        v_sql +=this.IDRUTALOCAL.toString()+", ";
        v_sql +=this.IDRUTAPUNTO.toString()+", ";
        v_sql +=this.IDPUNTO.toString()+", ";
        v_sql +=this.IDUSUARIO.toString()+", ";
        v_sql +="'"+this.COORD_X+"', ";
        v_sql +="'"+this.COORD_Y+"', ";
        v_sql +="'"+this.FECHAHORA+"', ";
        v_sql +="'"+indefinidoOnullToVacio(this.HEADING).toString()+"', ";
        v_sql +="'"+indefinidoOnullToVacio(this.VELOCIDAD).toString()+"', ";
        v_sql +="'"+indefinidoOnullToVacio(this.ALTITUD).toString()+"', ";
        v_sql +="'"+indefinidoOnullToVacio(this.ACCURACY).toString()+"', ";
        v_sql +="'"+indefinidoOnullToVacio(this.ALTITUDACCURACY).toString()+"', ";
        v_sql +="'"+this.FECHAHORACAPTURA+"', ";
        v_sql +=this.VALIDO.toString()+", ";
        v_sql +=this.DIFF.toString()+", ";
        v_sql +=this.DISTANCIA.toString()+" ";
        v_sql += ") "

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOk,fnError);
        })

        return "OK";
    }
    catch (ex) {return ex.message;}
}


clRutaPunto.prototype.Modificar=function(){
    try{
        guardaObjetoLocal('RUTAPUNTO_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex) {return ex.message;}
}
clRutaPunto.prototype.ModificarSQLite=function(){
    try{
        var v_sql="UPDATE RutaPunto SET ";
        v_sql +="IDRUTALOCAL="+this.IDRUTALOCAL.toString()+", ";
        v_sql +="IDRUTAPUNTO="+this.IDRUTAPUNTO.toString()+", ";
        v_sql +="IDPUNTO="+this.IDPUNTO.toString()+", ";
        v_sql +="IDUSUARIO="+this.IDUSUARIO.toString()+", ";
        v_sql +="COORD_X='"+this.COORD_X+"', ";
        v_sql +="COORD_Y='"+this.COORD_Y+"', ";
        v_sql +="FECHAHORA='"+this.FECHAHORA+"', ";
        v_sql +="HEADING="+this.HEADING.toString()+", ";
        v_sql +="VELOCIDAD="+this.VELOCIDAD.toString()+", ";
        v_sql +="ALTITUD="+this.ALTITUD.toString()+", ";
        v_sql +="ACCURACY="+this.ACCURACY.toString()+", ";
        v_sql +="ALTITUDACCURACY="+this.ALTITUDACCURACY.toString()+", ";
        v_sql +="FECHAHORACAPTURA='"+this.FECHAHORACAPTURA+"', ";
        v_sql +="VALIDO="+this.VALIDO.toString()+", ";
        v_sql +="DIFF="+this.DIFF.toString()+", ";
        v_sql +="DISTANCIA="+this.DISTANCIA.toString()+" ";
        v_sql +="WHERE ID = "+this.ID.toString()+" ";

        var v_resultado="";
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],function(p_tran,p_result){v_resultado= "OK";},function(p_error){v_resultado= p_error.message;});
        })

        return v_resultado;
    }
    catch (ex) {return ex.message;}
}

clRutaPunto.prototype.Eliminar=function(){
    try{
        borraObjetoLocal('RUTAPUNTO_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex) {return ex.message;}
}
clRutaPunto.prototype.EliminarSQLite=function(){
    try{
        var v_sql="DELETE RutaPunto ";
        v_sql +=" WHERE ID = "+this.ID.toString()+ " ";

        var v_resultado="";
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],function(p_tran,p_result){v_resultado= "OK";},function(p_error){v_resultado= p_error.message;});
        })

        return v_resultado;
    }
    catch (ex) {return ex.message;}
}

clRutaPunto.prototype.JSON=function (){
    var v_idUsuario=this.IDUSUARIO;
    if(v_idUsuario==0) v_idUsuario=_UsuarioApp.IDUSUARIO;
    var v_data = {
        "Accuracy": parseFloat(indefinidoOvacioToCero(this.ACCURACY)),
        "Altitud": parseFloat(indefinidoOvacioToCero(this.ALTITUD)),
        "CoordX": parseFloat(indefinidoOvacioToCero(this.COORD_X)),
        "CoordY":  parseFloat(indefinidoOvacioToCero(this.COORD_Y)),
        "FechaHora": this.FECHAHORA+"",
        "FechaHoraCapturaRuta":this.FECHAHORACAPTURA+"",
        "Heading": parseFloat(indefinidoOvacioToCero(this.HEADING)),
        "IdPunto": this.ID,
        "IdRuta": this.IDRUTALOCAL,
        "IdUsuario": v_idUsuario,
        "Valido": this.VALIDO,
        "Velocidad": parseFloat(indefinidoOvacioToCero(this.VELOCIDAD))
    };
    return v_data;
}


function clListaRutaPunto(){
    this.Lista = new Array();
}

clListaRutaPunto.prototype.ObtenerLista=function(p_idRutaLocal,p_inicio,p_fin){
    try{
        this.Lista = new Array();
        var v_registro = null;
        var v_nInd = 0;
        var v_numReg = leeObjetoLocal('RUTAPUNTO_NEXTVAL' , -1)+1;
        var v_inicio=0;
        var v_fin = v_numReg-1;
        if (!(undefined === p_inicio || void 0 === p_inicio || p_inicio == null)) {
            if(p_inicio>0) v_inicio=p_inicio;
            if(p_fin<v_fin) v_fin = p_fin;
        }
        for(var i=v_inicio;i<=v_fin;i++){
            v_registro = leeObjetoLocal('RUTAPUNTO_' + (i).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                if(p_idRutaLocal==v_registro.IDRUTALOCAL){
                    this.Lista[v_nInd++] = v_registro;
                }
            }
        }
        return "OK";
    }
    catch (ex) {return ex.message;}
}
clListaRutaPunto.prototype.ObtenerListaSQLite=function(p_idRutaLocal,fnOK,fnError){
    try{
        var v_sql="SELECT ";
        v_sql +=" ID, ";
        v_sql +=" IDRUTALOCAL, ";
        v_sql +=" IDRUTAPUNTO, ";
        v_sql +=" IDPUNTO, ";
        v_sql +=" IDUSUARIO, ";
        v_sql +=" COORD_X, ";
        v_sql +=" COORD_Y, ";
        v_sql +=" FECHAHORA, ";
        v_sql +=" HEADING, ";
        v_sql +=" VELOCIDAD, ";
        v_sql +=" ALTITUD, ";
        v_sql +=" ACCURACY, ";
        v_sql +=" ALTITUDACCURACY, ";
        v_sql +=" FECHAHORACAPTURA, ";
        v_sql +=" VALIDO, ";
        v_sql +=" DIFF, ";
        v_sql +=" DISTANCIA ";
        v_sql +=" FROM RutaPunto WHERE IDRUTALOCAL = "+p_idRutaLocal.toString()+" ";

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOK,fnError);
        });

        return v_resultado;
    }
    catch (ex) {return ex.message;}
}

clListaRutaPunto.prototype.ProcesaResultados=function(p_result){
    this.Lista = new Array();
    try {
        var v_registro = null;
        var v_nInd = 0;
        var v_resultado = "";

        if (p_result != null && p_result.rows != null && p_result.rows.length > 0) {
            for (var i = 0; i < p_result.rows.length; i++) {
                v_registro = new clRutaPunto();
                v_registro.ID = p_result.rows.item(i).ID;
                v_registro.IDRUTALOCAL = p_result.rows.item(i).IDRUTALOCAL;
                v_registro.IDRUTAPUNTO = p_result.rows.item(i).IDRUTAPUNTO;
                v_registro.IDPUNTO = p_result.rows.item(i).IDPUNTO;
                v_registro.IDUSUARIO = p_result.rows.item(i).IDUSUARIO;
                v_registro.COORD_X = p_result.rows.item(i).COORD_X;
                v_registro.COORD_Y = p_result.rows.item(i).COORD_Y;
                v_registro.FECHAHORA = p_result.rows.item(i).FECHAHORA;
                v_registro.HEADING = p_result.rows.item(i).HEADING;
                v_registro.VELOCIDAD = p_result.rows.item(i).VELOCIDAD;
                v_registro.ALTITUD = p_result.rows.item(i).ALTITUD;
                v_registro.ACCURACY = p_result.rows.item(i).ACCURACY;
                v_registro.ALTITUDACCURACY = p_result.rows.item(i).ALTITUDACCURACY;
                v_registro.FECHAHORACAPTURA = p_result.rows.item(i).FECHAHORACAPTURA;
                v_registro.VALIDO = p_result.rows.item(i).VALIDO;
                v_registro.DIFF = p_result.rows.item(i).DIFF;
                v_registro.DISTANCIA = p_result.rows.item(i).DISTANCIA;
                this.Lista[v_nInd++] = v_registro;
            }
        }
        return "OK";
    }
    catch(ex){return ex.message;}
}

clListaRutaPunto.prototype.UpdateStringSQLite=function(p_idRutaNueva,p_idPuntoIni,p_idPuntoFin){
    try{
        var v_sql="UPDATE RutaPunto SET ";
        v_sql +=" IDRUTALOCAL = "+p_idRutaNueva.toString()+" ";
        v_sql +=" WHERE ID >= "+p_idPuntoIni.toString()+" AND ID <= " +p_idPuntoFin.toString()+" ";

        return v_sql;

    }
    catch (ex) {return ex.message;}
}

clListaRutaPunto.prototype.JSON=function(p_idRutaLocal,p_inicio,p_fin){
    try{
        var v_lista=new Array();
        var v_registro = null;
        var v_nInd = 0;
        var v_numReg = leeObjetoLocal('RUTAPUNTO_NEXTVAL' , -1)+1;
        var v_inicio=0;
        var v_fin = v_numReg-1;
        if (!(undefined === p_inicio || void 0 === p_inicio || p_inicio == null)) {
            if(p_inicio>0) v_inicio=p_inicio;
            if(p_fin<v_fin) v_fin = p_fin;
        }
        for(var i=v_inicio;i<=v_fin;i++){
            v_registro = leeObjetoLocal('RUTAPUNTO_' + (i).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                if(p_idRutaLocal==v_registro.IDRUTALOCAL){
                        var v_punto = new clRutaPunto();
                        v_punto.Obtener(v_registro.ID);
                        v_lista[v_nInd++] = v_punto.JSON();
                }
            }
        }
        return v_lista;
    }
    catch (ex) {return ex.message;}
}
clListaRutaPunto.prototype.JSONSQLite=function(p_idRutaLocal){
    try{
        var v_sql="SELECT ";
        v_sql +=" ID, ";
        v_sql +=" IDRUTALOCAL, ";
        v_sql +=" IDRUTAPUNTO, ";
        v_sql +=" IDPUNTO, ";
        v_sql +=" IDUSUARIO, ";
        v_sql +=" COORD_X, ";
        v_sql +=" COORD_Y, ";
        v_sql +=" FECHAHORA, ";
        v_sql +=" HEADING, ";
        v_sql +=" VELOCIDAD, ";
        v_sql +=" ALTITUD, ";
        v_sql +=" ACCURACY, ";
        v_sql +=" ALTITUDACCURACY, ";
        v_sql +=" FECHAHORACAPTURA, ";
        v_sql +=" VALIDO, ";
        v_sql +=" DIFF ";
        v_sql +=" WHERE IDRUTALOCAL = "+p_idRutaLocal.toString()+" ";

        var v_lista = new Array();
        var v_registro = null;
        var v_nInd = 0;
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],
                function(p_tran,p_result){
                    if(p_result!=null && p_result.rows!=null && p_result.rows.length>0) {
                        for (var i = 0; i < p_result.rows.length; i++) {
                            v_registro = new clRutaPunto();
                            v_registro.ID = p_result.rows.item(i).ID;
                            v_registro.IDRUTALOCAL = p_result.rows.item(i).IDRUTALOCAL;
                            v_registro.IDRUTAPUNTO = p_result.rows.item(i).IDRUTAPUNTO;
                            v_registro.IDPUNTO = p_result.rows.item(i).IDPUNTO;
                            v_registro.IDUSUARIO = p_result.rows.item(i).IDUSUARIO;
                            v_registro.COORD_X = p_result.rows.item(i).COORD_X;
                            v_registro.COORD_Y = p_result.rows.item(i).COORD_Y;
                            v_registro.FECHAHORA = p_result.rows.item(i).FECHAHORA;
                            v_registro.HEADING = p_result.rows.item(i).HEADING;
                            v_registro.VELOCIDAD = p_result.rows.item(i).VELOCIDAD;
                            v_registro.ALTITUD = p_result.rows.item(i).ALTITUD;
                            v_registro.ACCURACY = p_result.rows.item(i).ACCURACY;
                            v_registro.ALTITUDACCURACY = p_result.rows.item(i).ALTITUDACCURACY;
                            v_registro.FECHAHORACAPTURA = p_result.rows.item(i).FECHAHORACAPTURA;
                            v_registro.VALIDO = p_result.rows.item(i).VALIDO;
                            v_registro.DIFF = p_result.rows.item(i).DIFF;
                            v_lista[v_nInd++] = v_registro.JSON();
                        }
                    }
                },
                function(p_error){});
        });

        return v_lista;
    }
    catch (ex) {return ex.message;}
}


clListaRutaPunto.prototype.Eliminar=function(p_idRutaLocal,p_inicio,p_fin){
    try{
        var v_Error="OK";
        var v_registro = null;
        var v_nInd = 0;
        var v_numReg = leeObjetoLocal('RUTAPUNTO_NEXTVAL' , -1)+1;
        var v_inicio=0;
        var v_fin = v_numReg-1;
        if (!(undefined === p_inicio || void 0 === p_inicio || p_inicio == null)) {
            if(p_inicio>0) v_inicio=p_inicio;
            if(p_fin<v_fin) v_fin = p_fin;
        }
        for(var i=v_inicio;i<=v_fin;i++){
            v_registro = leeObjetoLocal('RUTAPUNTO_' + (i).toString().trim() , 'NO_EXISTE');
            if(v_registro != 'NO_EXISTE') {
                if(p_idRutaLocal==v_registro.IDRUTALOCAL){
                    var v_punto = new clRutaPunto();
                    v_Error=v_punto.Eliminar(v_registro.ID);
                    if(v_Error!="OK") break;
                }
            }
        }
        return v_Error;
    }
    catch (ex) {return ex.message;}
}
clListaRutaPunto.prototype.EliminarSQLite=function(p_idRutaLocal,p_inicio,p_fin){
    try{
        var v_sql="DELETE RutaPunto ";
        v_sql +=" WHERE IDRUTALOCAL = "+p_idRutaLocal.toString()+ " ";

        var v_resultado="";
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],function(p_tran,p_result){v_resultado= "OK";},function(p_error){v_resultado= p_error.message;});
        })

        return v_resultado;
    }
    catch (ex) {return ex.message;}
}

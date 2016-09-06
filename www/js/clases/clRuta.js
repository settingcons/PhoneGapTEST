function clRuta(aDatos) {
    if (undefined === aDatos || void 0 === aDatos || aDatos == null) {
        this.ID = -1;
        this.IDRUTA = 0;
        this.IDUSUARIO = 0;
        this.FECHAHORAINICIO = '';
        this.FECHAHORAFIN = '';
        this.DURACION = '';
        this.DISTANCIA = '';
        this.OBSERVACIONES = '';
        this.DIRECINICIO = '';
        this.DIRECFIN = '';
        //this.ELIMINADA=0;
        //this.DIVIDIDA=0;
        //this.IDRUTAORIGEN=-1;
        //this.IDPUNTOINICIO=-1;
        //this.IDPUNTOFIN=-1;
        //this.ENVIADO = 0;
        this.ESIOS=0;
        this.ID_INI=0;
        this.COORD_X_INI=0;
        this.COORD_Y_INI=0;
        this.ID_FIN=0;
        this.COORD_X_FIN=0;
        this.COORD_Y_FIN=0;
        this.FECHAHORACAPTURA_FIN=0;
        this.DISTANCIAPUNTOS=0;
    }
    else {
        this.ID = aDatos['id'];
        this.IDRUTA =  aDatos['IdRuta'] + '';
        this.IDUSUARIO =  aDatos['IdUsuario'] + '';
        this.FECHAHORAINICIO = aDatos['FechaHoraInicio'] + '';
        this.FECHAHORAFIN = aDatos['FechaHoraFin'] + '';
        this.DURACION = aDatos['Duracion'] + '';
        this.DISTANCIA = aDatos['Distancia'];
        this.OBSERVACIONES = aDatos['Observaciones'] + '';
        this.DIRECINICIO = aDatos['DireccionInicio'] + '';
        this.DIRECFIN = aDatos['DireccionFin'] + '';
        //this.ELIMINADA=0;
        //this.DIVIDIDA=0;
        //this.IDRUTAORIGEN=-1;
        //this.IDPUNTOINICIO=-1;
        //this.IDPUNTOFIN=-1;
        //this.ENVIADO = 0;
        this.ESIOS=0;
        this.ID_INI=0;
        this.COORD_X_INI=0;
        this.COORD_Y_INI=0;
        this.ID_FIN=0;
        this.COORD_X_FIN=0;
        this.COORD_Y_FIN=0;
        this.FECHAHORACAPTURA_FIN=0;
        this.DISTANCIAPUNTOS=0;
    }
}

clRuta.prototype.ObtenerSQLite=function(p_ID,fnOK,fnError){
    try {
        var v_sql="SELECT ";
        v_sql+= "ID, ";
        v_sql+= "IDRUTA, ";
        v_sql+= "IDUSUARIO, ";
        v_sql+= "FECHAHORAINICIO,";
        v_sql+= "FECHAHORAFIN,";
        v_sql+= "DURACION,";
        v_sql+= "DISTANCIA,";
        v_sql+= "OBSERVACIONES,";
        v_sql+= "DIRECINICIO,";
        v_sql+= "DIRECFIN,";
        v_sql+= "ESIOS ";
        v_sql +="FROM Ruta WHERE ID = "+p_ID.toString().trim()+" ";

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOK,fnError);
        });

        return "OK";
    }
    catch (ex){return ex.message}
}
clRuta.prototype.ProcesaResultados=function(p_result){
    if(p_result!=null && p_result.rows!=null && p_result.rows.length>0) {
        this.ID =p_result.rows.item(0).ID;
        this.IDRUTA = p_result.rows.item(0).IDRUTA;
        this.IDUSUARIO = p_result.rows.item(0).IDUSUARIO;
        this.FECHAHORAINICIO = p_result.rows.item(0).FECHAHORAINICIO;
        this.FECHAHORAFIN = p_result.rows.item(0).FECHAHORAFIN;
        this.DURACION = p_result.rows.item(0).DURACION;
        this.DISTANCIA = p_result.rows.item(0).DISTANCIA;
        this.OBSERVACIONES = p_result.rows.item(0).OBSERVACIONES;
        this.DIRECINICIO = p_result.rows.item(0).DIRECINICIO;
        this.DIRECFIN = p_result.rows.item(0).DIRECFIN;
        this.ESIOS = p_result.rows.item(0).ESIOS;

        return "OK";
    }
    else return null;
}

clRuta.prototype.ObtenerCompletoSQLite=function(p_ID,fnOK,fnError){
    try {
        var v_sql="SELECT ";
        v_sql+= "r.ID, ";
        v_sql+= "r.IDRUTA, ";
        v_sql+= "r.IDUSUARIO, ";
        v_sql+= "r.FECHAHORAINICIO,";
        v_sql+= "r.FECHAHORAFIN,";
        v_sql+= "r.DURACION,";
        v_sql+= "r.DISTANCIA,";
        v_sql+= "r.OBSERVACIONES,";
        v_sql+= "r.DIRECINICIO,";
        v_sql+= "r.DIRECFIN,";
        //v_sql+= "r.ELIMINADA,";
        //v_sql+= "r.DIVIDIDA,";
        //v_sql+= "r.IDRUTAORIGEN,";
        //v_sql+= "r.IDPUNTOINICIO,";
        //v_sql+= "r.IDPUNTOFIN,";
        //v_sql+= "r.ENVIADO,";
        v_sql+= "r.ESIOS, ";
        v_sql+= "p1.ID AS ID_INI, p1.COORD_X AS COORD_X_INI, p1.COORD_Y AS COORD_Y_INI, p1.FECHAHORACAPTURA AS FECHAHORACAPTURA_INI, ";
        v_sql+= "p2.ID AS ID_FIN, p2.COORD_X AS COORD_X_FIN, p2.COORD_Y AS COORD_Y_FIN, p2.FECHAHORACAPTURA AS FECHAHORACAPTURA_FIN, ";
        v_sql+= "p.DISTANCIAPUNTOS ";
        v_sql+= "FROM Ruta r, ";
        v_sql+= "(SELECT r1.ID AS IDRUTA, MIN(p.ID) AS ID_INI,MAX(p.ID) AS ID_FIN,SUM(p.DISTANCIA) AS DISTANCIAPUNTOS FROM Ruta r1,RutaPunto p WHERE p.IDRUTALOCAL= r1.ID GROUP BY r1.ID) p, ";
        v_sql+= "RutaPunto p1,RutaPunto p2 ";
        v_sql+= "WHERE r.ID = p.IDRUTA ";
        v_sql+= "AND   p.ID_INI = p1.ID ";
        v_sql+= "AND   p.ID_FIN = p2.ID ";
        v_sql +="AND   r.ID = "+p_ID.toString().trim()+" ";

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOK,fnError);
        });

        return "OK";
    }
    catch (ex){return ex.message}
}
clRuta.prototype.ProcesaResultadosCompleto=function(p_result){
    try {
        if (p_result != null && p_result.rows != null && p_result.rows.length > 0) {
            this.ID = p_result.rows.item(0).ID;
            this.IDRUTA = p_result.rows.item(0).IDRUTA;
            this.IDUSUARIO = p_result.rows.item(0).IDUSUARIO;
            this.FECHAHORAINICIO = p_result.rows.item(0).FECHAHORAINICIO;
            this.FECHAHORAFIN = p_result.rows.item(0).FECHAHORAFIN;
            this.DURACION = p_result.rows.item(0).DURACION;
            this.DISTANCIA = p_result.rows.item(0).DISTANCIA;
            this.OBSERVACIONES = p_result.rows.item(0).OBSERVACIONES;
            this.DIRECINICIO = p_result.rows.item(0).DIRECINICIO;
            this.DIRECFIN = p_result.rows.item(0).DIRECFIN;
            //this.ELIMINADA = p_result.rows.item(0).ELIMINADA;
            //this.DIVIDIDA = p_result.rows.item(0).DIVIDIDA;
            //this.IDRUTAORIGEN = p_result.rows.item(0).IDRUTAORIGEN;
            //this.IDPUNTOINICIO = p_result.rows.item(0).IDPUNTOINICIO;
            //this.IDPUNTOFIN = p_result.rows.item(0).IDPUNTOFIN;
            //this.ENVIADO = p_result.rows.item(0).ENVIADO;
            this.ESIOS = p_result.rows.item(0).ESIOS;
            this.ID_INI = p_result.rows.item(0).ID_INI;
            this.COORD_X_INI = p_result.rows.item(0).COORD_X_INI;
            this.COORD_Y_INI = p_result.rows.item(0).COORD_Y_INI;
            this.ID_FIN = p_result.rows.item(0).ID_FIN;
            this.COORD_X_FIN = p_result.rows.item(0).COORD_X_FIN;
            this.COORD_Y_FIN = p_result.rows.item(0).COORD_Y_FIN;
            this.FECHAHORACAPTURA_FIN= p_result.rows.item(0).FECHAHORACAPTURA_FIN;
            this.DISTANCIAPUNTOS = p_result.rows.item(0).DISTANCIAPUNTOS;

            return "OK";
        }
        else  return null;
    }
    catch (ex){return ex.message;}
}


clRuta.prototype.GuardarSQLite=function(fnOk,fnError){
    try {

        var v_sql="INSERT INTO Ruta (";
        v_sql+= "IDRUTA, ";
        v_sql+= "IDUSUARIO, ";
        v_sql+= "FECHAHORAINICIO,";
        v_sql+= "FECHAHORAFIN,";
        v_sql+= "DURACION,";
        v_sql+= "DISTANCIA,";
        v_sql+= "OBSERVACIONES,";
        v_sql+= "DIRECINICIO,";
        v_sql+= "DIRECFIN,";
        v_sql+= "ESIOS";
        v_sql +=")VALUES("
        v_sql += this.IDRUTA.toString()+",";
        v_sql+= this.IDUSUARIO.toString()+",";
        v_sql+= "'"+this.FECHAHORAINICIO+"',";
        v_sql+= "'"+this.FECHAHORAFIN+"',";
        v_sql+= "'"+this.DURACION+"',";
        v_sql+= "'"+this.DISTANCIA+"',";
        v_sql+= "'"+this.OBSERVACIONES+"',";
        v_sql+= "'"+this.DIRECINICIO+"',";
        v_sql+= "'"+this.DIRECFIN+"',";
        v_sql+= this.ESIOS.toString()+") ";

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOk,fnError);
        })
        return "OK";
    }
    catch (ex) {return ex.message;}
}

clRuta.prototype.ObtenerScriptInsertSQLite=function(){
    try {

        var v_sql="INSERT INTO Ruta (";
        v_sql+= "IDRUTA, ";
        v_sql+= "IDUSUARIO, ";
        v_sql+= "FECHAHORAINICIO,";
        v_sql+= "FECHAHORAFIN,";
        v_sql+= "DURACION,";
        v_sql+= "DISTANCIA,";
        v_sql+= "OBSERVACIONES,";
        v_sql+= "DIRECINICIO,";
        v_sql+= "DIRECFIN,";
        v_sql+= "ESIOS";
        v_sql +=")VALUES("
        v_sql += this.IDRUTA.toString()+",";
        v_sql+= this.IDUSUARIO.toString()+",";
        v_sql+= "'"+this.FECHAHORAINICIO+"',";
        v_sql+= "'"+this.FECHAHORAFIN+"',";
        v_sql+= "'"+this.DURACION+"',";
        v_sql+= "'"+this.DISTANCIA+"',";
        v_sql+= "'"+this.OBSERVACIONES+"',";
        v_sql+= "'"+this.DIRECINICIO+"',";
        v_sql+= "'"+this.DIRECFIN+"',";
        v_sql+= this.ESIOS.toString()+") ";

        return v_sql;
    }
    catch (ex) {return ex.message;}
}

clRuta.prototype.Modificar=function(){
    try{
        guardaObjetoLocal('RUTA_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex) {return ex.message;}
}
clRuta.prototype.ModificarSQLite=function(fnOK,fnError){
    try{
        var v_sql="UPDATE Ruta SET ";
        v_sql+= "IDRUTA= "+this.IDRUTA.toString()+" , ";
        v_sql+= "IDUSUARIO= "+this.IDUSUARIO.toString()+" , ";
        v_sql+= "FECHAHORAINICIO= '"+this.FECHAHORAINICIO+"' , ";
        v_sql+= "FECHAHORAFIN= '"+this.FECHAHORAFIN+"' , ";
        v_sql+= "DURACION= '"+this.DURACION+"' , ";
        v_sql+= "DISTANCIA= '"+this.DISTANCIA+"' , ";
        v_sql+= "OBSERVACIONES= '"+this.OBSERVACIONES+"' , ";
        v_sql+= "DIRECINICIO= '"+this.DIRECINICIO+"' , ";
        v_sql+= "DIRECFIN= '"+this.DIRECFIN+"' , ";
        v_sql+= "ESIOS= "+this.ESIOS.toString()+"  ";
        v_sql +=" WHERE ID = "+this.ID.toString()+ " ";

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOK,fnError);
        })

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clRuta.prototype.ModificarSQLiteObservaciones=function(p_idruta,p_observaciones, fnOK,fnError){
    try{
        var v_sql="UPDATE Ruta SET ";
        v_sql+= "OBSERVACIONES= '"+p_observaciones+"'  ";
        v_sql +=" WHERE ID = "+p_idruta+ " ";

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOK,fnError);
        })

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clRuta.prototype.ModificarScriptSQLite=function(p_script,fnOK,fnError){
    try{
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(p_script,[],fnOK,fnError);
        })

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clRuta.prototype.ObtenerScriptModificarSQLite=function(){
    try{
        var v_sql="UPDATE Ruta SET ";
        v_sql+= "IDRUTA= "+this.IDRUTA.toString()+" , ";
        v_sql+= "IDUSUARIO= "+this.IDUSUARIO.toString()+" , ";
        v_sql+= "FECHAHORAINICIO= '"+this.FECHAHORAINICIO+"' , ";
        v_sql+= "FECHAHORAFIN= '"+this.FECHAHORAFIN+"' , ";
        v_sql+= "DURACION= '"+this.DURACION+"' , ";
        v_sql+= "DISTANCIA= '"+this.DISTANCIA+"' , ";
        v_sql+= "OBSERVACIONES= '"+this.OBSERVACIONES+"' , ";
        v_sql+= "DIRECINICIO= '"+this.DIRECINICIO+"' , ";
        v_sql+= "DIRECFIN= '"+this.DIRECFIN+"' , ";
        v_sql+= "ESIOS= "+this.ESIOS.toString()+"  ";
        v_sql +=" WHERE ID = "+this.ID.toString()+ " ; ";


        return v_sql;
    }
    catch (ex) {return "ERROR";}
}

clRuta.prototype.Eliminar=function(){
    try{
        borraObjetoLocal('RUTA_' + this.ID.toString().trim(), this);
        return "OK"
    }
    catch (ex) {return ex.message;}
}
clRuta.prototype.EliminarSQLite=function(fnOK,fnError){
    try{
        var v_sql1="DELETE FROM RutaPunto WHERE IDRUTALOCAL = "+this.ID.toString()+ " ; ";
        var v_sql2=" DELETE FROM Ruta WHERE ID = "+this.ID.toString()+ " ;  ";

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql1,[],
                function(p_tran,p_results){p_tran.executeSql(v_sql2,[],fnOK,fnError);},
                fnError);
        })

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clRuta.prototype.EliminarCompletoSQLite=function(p_ID,fnOK,fnError){
    try{
        var v_sql1="DELETE FROM RutaPunto WHERE IDRUTALOCAL IN "+p_ID.toString()+ " ; ";
        var v_sql2=" DELETE FROM Ruta WHERE ID IN "+p_ID.toString()+ " ;  ";

        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql1,[],
                function(p_tran,p_results){p_tran.executeSql(v_sql2,[],fnOK,fnError);},
                fnError);
        })

        return "OK";
    }
    catch (ex) {return ex.message;}
}

//p_ID -> identificador de la ruta a dividir
//se pasan los scripts de creación de ruta
//se pasa la lista con los puntos de corte
clRuta.prototype.DividirRuta=function(p_ID,p_listaparametros, fnOK,fnError){
    try{

        var v_delete=" DELETE FROM Ruta WHERE ID = "+p_ID.toString()+ " ";

        _bdSQLite.transaction(function(p_tran) {
            if (p_listaparametros.length >=1) {
                //alert('p_script_ruta1: '+p_listaparametros[0][0]);
                p_tran.executeSql(p_listaparametros[0][0], [], function (p_tran, p_results) {
                    //alert('ID1='+p_results.insertId);
                    var v_puntos1 = new clListaRutaPunto();
                    var v_script1=v_puntos1.UpdateStringSQLite(p_results.insertId,p_listaparametros[0][1],p_listaparametros[0][2]);
                    //alert('update1:'+v_script1);
                    p_tran.executeSql(v_script1, [], function (p_tran, p_results) {
                        if (p_listaparametros.length >=2) {
                            //alert('p_script_ruta2: '+p_listaparametros[1][0]);
                            p_tran.executeSql(p_listaparametros[1][0], [], function (p_tran, p_results) {
                                //alert('ID2='+p_results.insertId);
                                var v_puntos2 = new clListaRutaPunto();
                                var v_script2=v_puntos2.UpdateStringSQLite(p_results.insertId,p_listaparametros[1][1],p_listaparametros[1][2]);
                                //alert('update2:'+v_script2);
                                p_tran.executeSql(v_script2, [], function (p_tran, p_results) {
                                    if (p_listaparametros.length >=3) {
                                        //alert('p_script_ruta3: '+p_listaparametros[2][0]);
                                        p_tran.executeSql(p_listaparametros[2][0], [], function (p_tran, p_results) {
                                            //alert('ID3='+p_results.insertId);
                                            var v_puntos3 = new clListaRutaPunto();
                                            var v_script3=v_puntos3.UpdateStringSQLite(p_results.insertId,p_listaparametros[2][1],p_listaparametros[2][2]);
                                            //alert('update3:'+v_script3);
                                            p_tran.executeSql(v_script3, [], function (p_tran, p_results) {
                                                if (p_listaparametros.length >=4) {
                                                    //alert('p_script_ruta4: '+p_listaparametros[3][0]);
                                                    p_tran.executeSql(p_listaparametros[3][0], [], function (p_tran, p_results) {
                                                        //alert('ID4='+p_results.insertId);
                                                        var v_puntos4 = new clListaRutaPunto();
                                                        var v_script4=v_puntos4.UpdateStringSQLite(p_results.insertId,p_listaparametros[3][1],p_listaparametros[3][2]);
                                                        //alert('update4:'+v_script4);
                                                        p_tran.executeSql(v_script4, [], function (p_tran, p_results) {
                                                            if (p_listaparametros.length >=5) {
                                                                //alert('p_script_ruta5: '+p_listaparametros[4][0]);
                                                                p_tran.executeSql(p_listaparametros[4][0], [], function (p_tran, p_results) {
                                                                    //alert('ID5='+p_results.insertId);
                                                                    var v_puntos5 = new clListaRutaPunto();
                                                                    var v_script5=v_puntos5.UpdateStringSQLite(p_results.insertId,p_listaparametros[4][1],p_listaparametros[4][2]);
                                                                    //alert('update5:'+v_script5);
                                                                    p_tran.executeSql(v_script5, [], function (p_tran, p_results) {p_tran.executeSql(v_delete,[],fnOK,fnError);
                                                                    }, fnError);
                                                                }, fnError);
                                                            }
                                                            else{
                                                                p_tran.executeSql(v_delete,[],fnOK,fnError);
                                                            }
                                                        }, fnError);
                                                    }, fnError);
                                                }
                                                else{
                                                    p_tran.executeSql(v_delete,[],fnOK,fnError);
                                                }
                                            }, fnError);
                                        }, fnError);
                                    }
                                    else{
                                        p_tran.executeSql(v_delete,[],fnOK,fnError);
                                    }
                                }, fnError);
                            }, fnError);
                        }
                        else{
                            p_tran.executeSql(v_delete,[],fnOK,fnError);
                        }

                    }, fnError);
                }, fnError);
            }



            })

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clRuta.prototype.FinalizarRutaSQLite=function(p_ID,fnOK,fnError){
    try{

        var v_selRuta="SELECT ";
        v_selRuta+= "ID, ";
        v_selRuta+= "IDRUTA, ";
        v_selRuta+= "IDUSUARIO, ";
        v_selRuta+= "FECHAHORAINICIO,";
        v_selRuta+= "FECHAHORAFIN,";
        v_selRuta+= "DURACION,";
        v_selRuta+= "DISTANCIA,";
        v_selRuta+= "OBSERVACIONES,";
        v_selRuta+= "DIRECINICIO,";
        v_selRuta+= "DIRECFIN,";
        v_selRuta+= "ESIOS ";
        v_selRuta +="FROM Ruta WHERE ID = "+p_ID.toString().trim()+" ";

        var v_selPuntos="SELECT ";
        v_selPuntos +=" ID, ";
        v_selPuntos +=" IDRUTALOCAL, ";
        v_selPuntos +=" IDRUTAPUNTO, ";
        v_selPuntos +=" IDPUNTO, ";
        v_selPuntos +=" IDUSUARIO, ";
        v_selPuntos +=" COORD_X, ";
        v_selPuntos +=" COORD_Y, ";
        v_selPuntos +=" FECHAHORA, ";
        v_selPuntos +=" HEADING, ";
        v_selPuntos +=" VELOCIDAD, ";
        v_selPuntos +=" ALTITUD, ";
        v_selPuntos +=" ACCURACY, ";
        v_selPuntos +=" ALTITUDACCURACY, ";
        v_selPuntos +=" FECHAHORACAPTURA, ";
        v_selPuntos +=" VALIDO, ";
        v_selPuntos +=" DIFF, ";
        v_selPuntos +=" DISTANCIA ";
        v_selPuntos +=" FROM RutaPunto WHERE IDRUTALOCAL = "+p_ID.toString().trim()+" ";


        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_selRuta,[],
                function (p_tran, p_result){
                    if(p_result!=null && p_result.rows!=null && p_result.rows.length>0) {
                        this.ID =p_result.rows.item(0).ID;
                        this.IDRUTA = p_result.rows.item(0).IDRUTA;
                        this.IDUSUARIO = p_result.rows.item(0).IDUSUARIO;
                        this.FECHAHORAINICIO = p_result.rows.item(0).FECHAHORAINICIO;
                        this.FECHAHORAFIN = p_result.rows.item(0).FECHAHORAFIN;
                        this.DURACION = p_result.rows.item(0).DURACION;
                        this.DISTANCIA = p_result.rows.item(0).DISTANCIA;
                        this.OBSERVACIONES = p_result.rows.item(0).OBSERVACIONES;
                        this.DIRECINICIO = p_result.rows.item(0).DIRECINICIO;
                        this.DIRECFIN = p_result.rows.item(0).DIRECFIN;
                        this.ESIOS = p_result.rows.item(0).ESIOS;

                        p_tran.executeSql(v_selPuntos,[],
                            function (p_tran, p_result){
                                var v_puntos = new Array();
                                var v_registro = null;
                                var v_nInd = 0;
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
                                        v_puntos[v_nInd++] = v_registro;
                                    }
                                    //var v_dFechaFin = new Date(v_puntos[v_puntos.length-1].FECHAHORACAPTURA);
                                    var v_dFechaFin = v_puntos[v_puntos.length-1].FECHAHORACAPTURA;

                                    //alert('this.FECHAHORAINICIO: '+FechaHora_StringToDate(this.FECHAHORAINICIO));
                                    //alert('v_dFechaFin: '+FechaHora_StringToDate(v_dFechaFin));
                                    var v_duracion = CalculaTiempo_hhmm(FechaHora_StringToDate(this.FECHAHORAINICIO), FechaHora_StringToDate(v_dFechaFin));

                                    //alert('v_duracion: '+v_duracion);
                                    var v_distancia= CalculaDistanciaRutaPuntos(v_puntos);

                                    var v_posIni = new google.maps.LatLng(v_puntos[0].COORD_X, v_puntos[0].COORD_Y);
                                    var v_direccionIni = cogerDireccion(v_posIni);
                                    var v_posFin = new google.maps.LatLng(v_puntos[v_puntos.length-1].COORD_X, v_puntos[v_puntos.length-1].COORD_Y);
                                    var v_direccionFin = cogerDireccion(v_posFin);

                                    var v_update="UPDATE Ruta SET ";
                                    v_update+= "FECHAHORAFIN= '"+v_dFechaFin+"' , ";
                                    v_update+= "DURACION= '"+v_duracion+"' , ";
                                    v_update+= "DISTANCIA= '"+v_distancia+"' , ";
                                    v_update+= "OBSERVACIONES= '' , ";
                                    v_update+= "DIRECINICIO= '"+v_direccionIni.split("'").join("´")+"' , ";
                                    v_update+= "DIRECFIN= '"+v_direccionFin.split("'").join("´")+"'  ";
                                    v_update +=" WHERE ID = "+p_ID.toString().trim()+" ";

                                    //alert(v_update);
                                    p_tran.executeSql(v_update,[],
                                        function (p_tran, p_result) {
                                            _bdSQLite.transaction(function(p_tran){
                                                p_tran.executeSql(v_selRuta,[],fnOK,fnError);
                                            });
                                        },
                                        fnError);
                                }
                            },
                            fnError);
                    }
                },
                fnError
            );
        });

        return "OK";
    }
    catch (ex) {return ex.message;}
}


clRuta.prototype.ObtenerPendientesSQLite=function(fnOK,fnError){
    try {
        var v_sql="SELECT COUNT(r.ID) AS TOTAL FROM Ruta r ";
        var v_sql2=" DELETE FROM Ruta WHERE ID NOT IN (SELECT DISTINCT IDRUTALOCAL  AS IDRUTA FROM RutaPunto) ;  ";
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql2,[],
                function(p_tran,p_results){p_tran.executeSql(v_sql,[],fnOK,fnError);},
                fnError);
        });

        return "OK";
    }
    catch (ex){return ex.message;}
}

clRuta.prototype.ObtenerUltimaSQLite=function(fnOK,fnError){
    try {
        var v_sql="SELECT MAX(r.ID) AS TOTAL FROM Ruta r ";
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOK,fnError);
        });

        return "OK";
    }
    catch (ex){return ex.message;}
}

clRuta.prototype.JSONSQLite=function (p_listapuntos){
    var v_idUsuario=this.IDUSUARIO;
    if(v_idUsuario==0) v_idUsuario=_UsuarioApp.IDUSUARIO;
    //var v_direccionini=this.DIRECINICIO;
    //v_direccionini=v_direccionini.split("'").join("´");
    //v_direccionini=v_direccionini.split("\n").join(" ");
    //var v_direccionfin=this.DIRECFIN;
    //v_direccionfin=v_direccionfin.split("'").join("´");
    //v_direccionfin=v_direccionfin.split("\n").join(" ");
    var v_data = {
        "DireccionFin": this.DIRECFIN.split("'").join("´").split("\n").join(" "),
        "DireccionInicio": this.DIRECINICIO.split("'").join("´").split("\n").join(" "),
        "Distancia": this.DISTANCIA.split(",").join("."),
        "Duracion":  this.DURACION+"",
        "EsIOS": this.ESIOS,
        "FechaHoraFin": this.FECHAHORAFIN+"",
        "FechaHoraInicio":this.FECHAHORAINICIO+"",
        "IdRuta": this.ID,
        "IdUsuario": v_idUsuario,
        "ListaPuntos":[],
        "Observaciones": _Dispositivo+ this.OBSERVACIONES+""
    };

    for(var i=0;i<p_listapuntos.length;i++){
        var v_punto=p_listapuntos[i].JSON();
        v_data.ListaPuntos.push(v_punto);
    }
    return v_data;
}


function clListaRuta(){
    this.Lista = new Array();
}

clListaRuta.prototype.ObtenerListaSQLite=function(fnOK,fnError){
    try{
        var v_sql="SELECT ";
        v_sql+= "r.ID, ";
        v_sql+= "r.IDRUTA, ";
        v_sql+= "r.IDUSUARIO, ";
        v_sql+= "r.FECHAHORAINICIO,";
        v_sql+= "r.FECHAHORAFIN,";
        v_sql+= "r.DURACION,";
        v_sql+= "r.DISTANCIA,";
        v_sql+= "r.OBSERVACIONES,";
        v_sql+= "r.DIRECINICIO,";
        v_sql+= "r.DIRECFIN,";
        //v_sql+= "r.ELIMINADA,";
        //v_sql+= "r.DIVIDIDA,";
        //v_sql+= "r.IDRUTAORIGEN,";
        //v_sql+= "r.IDPUNTOINICIO,";
        //v_sql+= "r.IDPUNTOFIN,";
        //v_sql+= "r.ENVIADO,";
        v_sql+= "r.ESIOS, ";
        v_sql+= "p1.ID AS ID_INI, p1.COORD_X AS COORD_X_INI, p1.COORD_Y AS COORD_Y_INI, p1.FECHAHORACAPTURA AS FECHAHORACAPTURA_INI, ";
        v_sql+= "p2.ID AS ID_FIN, p2.COORD_X AS COORD_X_FIN, p2.COORD_Y AS COORD_Y_FIN, p2.FECHAHORACAPTURA AS FECHAHORACAPTURA_FIN, ";
        v_sql+= "p.DISTANCIAPUNTOS ";
        v_sql+= "FROM Ruta r, ";
        v_sql+= "(SELECT r1.ID AS IDRUTA, MIN(p.ID) AS ID_INI,MAX(p.ID) AS ID_FIN,SUM(p.DISTANCIA) AS DISTANCIAPUNTOS FROM Ruta r1,RutaPunto p WHERE p.IDRUTALOCAL= r1.ID GROUP BY r1.ID) p, ";
        v_sql+= "RutaPunto p1,RutaPunto p2 ";
        v_sql+= "WHERE r.ID = p.IDRUTA ";
        v_sql+= "AND   p.ID_INI = p1.ID ";
        v_sql+= "AND   p.ID_FIN = p2.ID ";

        //var v_select1= "SELECT * FROM Ruta "
        _bdSQLite.transaction(function(p_tran){
            p_tran.executeSql(v_sql,[],fnOK,fnError);
        });

        return "OK";
    }
    catch (ex) {return ex.message;}
}

clListaRuta.prototype.ProcesaResultado=function(p_result) {
    try {
        this.Lista = new Array();
        var v_registro = null;
        var v_nInd = 0;
        if (p_result != null && p_result.rows != null && p_result.rows.length > 0) {
            for (var i = 0; i < p_result.rows.length; i++) {
                v_registro = new clRuta();
                v_registro.ID = p_result.rows.item(i).ID;
                v_registro.IDRUTA = p_result.rows.item(i).IDRUTA;
                v_registro.IDUSUARIO = p_result.rows.item(i).IDUSUARIO;
                v_registro.FECHAHORAINICIO = p_result.rows.item(i).FECHAHORAINICIO;
                v_registro.FECHAHORAFIN = p_result.rows.item(i).FECHAHORAFIN;
                v_registro.DURACION = p_result.rows.item(i).DURACION;
                v_registro.DISTANCIA = p_result.rows.item(i).DISTANCIA;
                v_registro.OBSERVACIONES = p_result.rows.item(i).OBSERVACIONES;
                v_registro.DIRECINICIO = p_result.rows.item(i).DIRECINICIO;
                v_registro.DIRECFIN = p_result.rows.item(i).DIRECFIN;
                //v_registro.ELIMINADA = p_result.rows.item(i).ELIMINADA;
                //v_registro.DIVIDIDA = p_result.rows.item(i).DIVIDIDA;
                //v_registro.IDRUTAORIGEN = p_result.rows.item(i).IDRUTAORIGEN;
                //v_registro.IDPUNTOINICIO = p_result.rows.item(i).IDPUNTOINICIO;
                //v_registro.IDPUNTOFIN = p_result.rows.item(i).IDPUNTOFIN;
                //v_registro.ENVIADO = p_result.rows.item(i).ENVIADO;
                v_registro.ESIOS = p_result.rows.item(i).ESIOS;
                v_registro.ID_INI = p_result.rows.item(i).ID_INI;
                v_registro.COORD_X_INI = p_result.rows.item(i).COORD_X_INI;
                v_registro.COORD_Y_INI = p_result.rows.item(i).COORD_Y_INI;
                v_registro.ID_FIN = p_result.rows.item(i).ID_FIN;
                v_registro.COORD_X_FIN = p_result.rows.item(i).COORD_X_FIN;
                v_registro.COORD_Y_FIN = p_result.rows.item(i).COORD_Y_FIN;
                v_registro.FECHAHORACAPTURA_FIN= p_result.rows.item(i).FECHAHORACAPTURA_FIN;
                v_registro.DISTANCIAPUNTOS = p_result.rows.item(i).DISTANCIAPUNTOS;


                this.Lista[v_nInd++] = v_registro;
            }
        }
        return "OK";
    }
    catch (ex){return ex.message;}
}


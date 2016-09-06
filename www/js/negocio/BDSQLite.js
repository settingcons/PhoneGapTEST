var _bdSQLite;
var _bdSQLiteNombre="bdFleetCare.db";
var _bdSQLiteVersion="1.0";
var _bdSQLiteMaxSize="";

function bdSQLite_abrir()
{
    try {
        _bdSQLite = window.sqlitePlugin.openDatabase({name: _bdSQLiteNombre, createFromLocation: 1, bgType: 1});
    }
    catch(ex){
        mensaje("msj_53",'msj_1',ex.message);//Error abrir BD
    }
}

function bdSQLite_creartablas()
{
    var tb_Ruta="CREATE TABLE IF NOT EXISTS Ruta (";
    tb_Ruta +=" ID INTEGER PRIMARY KEY, ";
    tb_Ruta +=" IDRUTA INTEGER, ";
    tb_Ruta +=" IDUSUARIO INTEGER, ";
    tb_Ruta +=" FECHAHORAINICIO TEXT, ";
    tb_Ruta +=" FECHAHORAFIN TEXT, ";
    tb_Ruta +=" DURACION TEXT, ";
    tb_Ruta +=" DISTANCIA TEXT, ";
    tb_Ruta +=" OBSERVACIONES TEXT, ";
    tb_Ruta +=" DIRECINICIO TEXT, ";
    tb_Ruta +=" DIRECFIN TEXT, ";
    tb_Ruta +=" ESIOS INTEGER) ";


    var tb_RutaPunto="CREATE TABLE IF NOT EXISTS RutaPunto (";
    tb_RutaPunto +=" ID INTEGER PRIMARY KEY, ";
    tb_RutaPunto +=" IDRUTALOCAL INTEGER, ";
    tb_RutaPunto +=" IDRUTAPUNTO INTEGER, ";
    tb_RutaPunto +=" IDPUNTO INTEGER, ";
    tb_RutaPunto +=" IDUSUARIO INTEGER, ";
    tb_RutaPunto +=" COORD_X TEXT, ";
    tb_RutaPunto +=" COORD_Y TEXT, ";
    tb_RutaPunto +=" FECHAHORA TEXT, ";
    tb_RutaPunto +=" HEADING TEXT, ";
    tb_RutaPunto +=" VELOCIDAD TEXT, ";
    tb_RutaPunto +=" ALTITUD TEXT, ";
    tb_RutaPunto +=" ACCURACY TEXT, ";
    tb_RutaPunto +=" ALTITUDACCURACY TEXT, ";
    tb_RutaPunto +=" FECHAHORACAPTURA TEXT, ";
    tb_RutaPunto +=" VALIDO INTEGER, ";
    tb_RutaPunto +=" DIFF INTEGER, ";
    tb_RutaPunto +=" DISTANCIA DOUBLE) ";


    _bdSQLite.transaction(function(p_tran){
        p_tran.executeSql(tb_Ruta,[],function(p_tran,p_result){},
            function(error){
                mensaje("msj_54",'msj_1',error.message);//Error crear tabla Ruta
            }
        );
        p_tran.executeSql(tb_RutaPunto,[],function(p_tran,p_result){},
            function(error){
                mensaje("msj_55",'msj_1',error.message);//Error crear tabla RutaPunto
            }
        );
    })

}


function clVehiculoPropio(aDatos) {
    if (undefined === aDatos || void 0 === aDatos || aDatos == null) {
        this.ID = 0;
        this.IDCOCHEPROPIO = 0;
        this.IDUSUARIO = 0;
        this.MARCA = '';
        this.MODELO = '';
        this.VERSION = '';
        this.CILINDRADA = 0;
        this.CV = 0;
        this.EMISIONESCO2 = 0;
        this.BASTIDOR = '';
        this.MATRICULA = '';
        this.NUMEROPOLIZA = '';
        this.VENCIMIENTOPOLIZA = '';
        this.FECHAITV = '';
        this.ENVIADO=1;
        this.CONSUMOALOS100=0;
    }
    else{
        this.ID = 0;
        this.IDCOCHEPROPIO = aDatos['IdCochePropio']+ '' ;
        this.IDUSUARIO = aDatos['IdUsuario']+ '' ;
        this.MARCA = aDatos['Marca'] + '';
        this.MODELO = aDatos['Modelo'] + '';
        this.VERSION= aDatos['Version'] + '';
        this.CILINDRADA= aDatos['Cilindrada']+ '';
        this.CV= aDatos['CV']+ '';
        this.EMISIONESCO2= aDatos['EmisionesCO2']+ '';
        this.BASTIDOR = aDatos['Bastidor'] + '';
        this.MATRICULA = aDatos['Matricula'] + '';
        this.NUMEROPOLIZA = aDatos['NumeroPoliza'] + '';
        this.VENCIMIENTOPOLIZA = aDatos['VencimientoPoliza'] + '';
        this.FECHAITV = aDatos['FechaITV'] + '';
        this.ENVIADO=1;
        this.CONSUMOALOS100 = aDatos['ConsumoALos100']+ '';
    }
}

clVehiculoPropio.prototype.Obtener=function(){
    try{
        var v_vehiculo = null;
        v_vehiculo = leeObjetoLocal('VEHICULOPROPIO', 'NO_EXISTE');
        if(v_vehiculo == 'NO_EXISTE'){
            return null;
        }
        else{
            this.ID = v_vehiculo.ID;
            this.IDCOCHEPROPIO= v_vehiculo.IDCOCHEPROPIO;
            this.IDUSUARIO = v_vehiculo.IDUSUARIO;
            this.MARCA = v_vehiculo.MARCA;
            this.MODELO = v_vehiculo.MODELO;
            this.VERSION = v_vehiculo.VERSION;
            this.CILINDRADA = v_vehiculo.CILINDRADA;
            this.CV = v_vehiculo.CV;
            this.EMISIONESCO2 = v_vehiculo.EMISIONESCO2;
            this.BASTIDOR = v_vehiculo.BASTIDOR;
            this.MATRICULA = v_vehiculo.MATRICULA;
            this.NUMEROPOLIZA = v_vehiculo.NUMEROPOLIZA;
            this.VENCIMIENTOPOLIZA = v_vehiculo.VENCIMIENTOPOLIZA;
            this.FECHAITV = v_vehiculo.FECHAITV;
            this.CONSUMOALOS100 = v_vehiculo.CONSUMOALOS100;
            this.ENVIADO=v_vehiculo.ENVIADO;

            return "OK";
        }
    }
    catch (ex){return ex.message}
}
clVehiculoPropio.prototype.Guardar=function(){
    try{
        this.ID = 0;
        guardaObjetoLocal('VEHICULOPROPIO', this);
        return "OK";
    }
    catch (ex){return ex.message}
}
clVehiculoPropio.prototype.Modificar=function (){
    try {
        guardaObjetoLocal('VEHICULOPROPIO', this);
        return "OK";
    }
    catch (ex){return ex.message}
}


clVehiculoPropio.prototype.ActualizarEnviado=function(p_enviado){
    try{
        if(p_enviado){
            this.ENVIADO=1;
        }
        else{
            this.ENVIADO=0;
        }
        guardaObjetoLocal('VEHICULOPROPIO', this);
        return "OK";
    }
    catch (ex){return ex.message}
}


clVehiculoPropio.prototype.JSON=function (){
    var v_data =
    {
        "Bastidor": ""+this.BASTIDOR+"",
        "CV": indefinidoOvacioToCero(this.CV).toString(),
        "Cilindrada": indefinidoOvacioToCero(this.CILINDRADA).toString(),
        "ConsumoALos100": indefinidoOvacioToCero(this.CONSUMOALOS100).toString(),
        "EmisionesCO2": indefinidoOvacioToCero(this.EMISIONESCO2).toString(),
        "FechaITV": ""+StringFecha_ddmmyyy_a_yyyymmdd(this.FECHAITV)+"",
        "IdCochePropio": this.IDCOCHEPROPIO.toString(),
        "IdUsuario": this.IDUSUARIO.toString(),
        "Marca": ""+this.MARCA+"",
        "Matricula": ""+this.MATRICULA+"",
        "Modelo":""+this.MODELO+"",
        "NumeroPoliza": ""+this.NUMEROPOLIZA+"",
        "VencimientoPoliza": ""+StringFecha_ddmmyyy_a_yyyymmdd(this.VENCIMIENTOPOLIZA)+"",
        "Version": ""+this.VERSION+""
    };
    return v_data;
}

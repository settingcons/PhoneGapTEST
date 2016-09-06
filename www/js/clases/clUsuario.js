function clUsuario(aDatos) {

    if (undefined === aDatos || void 0 === aDatos || aDatos == null){
        this.ID = 0;
        this.IDUSUARIO =0;
        this.LOGIN = '';
        this.PASSWORD = '';
        this.NOMBRE = '';
        this.APELLIDOS = '';
        this.AT_EMAIL = '';
        this.AT_TELEFONO = '';
        this.EMAIL = '';
        this.TELEFONO_FIJO = '';
        this.TELEFONO_MOVIL = '';
        this.OPCIONESMENU = '';
        this.IDIOMA = '';
        this.TIPOUSUARIO = '';
        this.MANUAL = '';
        this.VELOCIDADMIN = '';
        this.INTERVALOCAPTURA = '';
        this.INTERVALOVISUALIZACION = '';
        this.CLAVEGOOGLE = '';
        this.EMPRESA = '';
        this.MAXRUTASSINENVIAR = 0;
    }
    else {
        this.ID = aDatos['id'];
        this.IDUSUARIO = aDatos['idusuario'];
        this.LOGIN = aDatos['login'] + '';
        this.PASSWORD = aDatos['password'] + '';
        this.NOMBRE = aDatos['nombre'] + '';
        this.APELLIDOS = aDatos['apellidos'] + '';
        this.AT_EMAIL = aDatos['at_email'] + '';
        this.AT_TELEFONO = aDatos['at_telefono'] + '';
        this.EMPRESA = aDatos['empresa'] + '';
        this.EMAIL = aDatos['email'] + '';
        this.TELEFONO_FIJO = aDatos['telefono_fijo'] + '';
        this.TELEFONO_MOVIL = aDatos['telefono_movil'] + '';
        this.OPCIONESMENU = aDatos['opcionesmenu'] + '';
        this.IDIOMA = aDatos['idioma'] + '';
        this.TIPOUSUARIO = aDatos['tipousuario'] + '';
        this.MANUAL = aDatos['manual'] + '';
        this.VELOCIDADMIN = aDatos['velocidadmin'] + '';
        this.INTERVALOCAPTURA = aDatos['intervalocaptura'] + '';
        this.INTERVALOVISUALIZACION = aDatos['intervalovisualizacion'] + '';
        this.CLAVEGOOGLE = aDatos['clavegoogle'] + '';
        this.MAXRUTASSINENVIAR = aDatos['MaxRutasSinEnviar'];
        this.EMPRESA = '';
    }
}

clUsuario.prototype.Obtener= function (){
    var v_objUsu = null;
    try {
        v_objUsu = leeObjetoLocal('USUARIO', 'NO_EXISTE');
        if(v_objUsu == 'NO_EXISTE')
            return null;
        else{
            this.ID = v_objUsu.ID;
            this.IDUSUARIO = v_objUsu.IDUSUARIO;
            this.LOGIN = v_objUsu.LOGIN;
            this.PASSWORD = v_objUsu.PASSWORD;
            this.NOMBRE = v_objUsu.NOMBRE;
            this.APELLIDOS = v_objUsu.APELLIDOS;
            this.AT_EMAIL = v_objUsu.AT_EMAIL;
            this.AT_TELEFONO = v_objUsu.AT_TELEFONO;
            this.EMAIL = v_objUsu.EMAIL;
            this.TELEFONO_FIJO = v_objUsu.TELEFONO_FIJO;
            this.TELEFONO_MOVIL = v_objUsu.TELEFONO_MOVIL;
            this.OPCIONESMENU = v_objUsu.OPCIONESMENU;
            this.IDIOMA = v_objUsu.IDIOMA;
            this.TIPOUSUARIO = v_objUsu.TIPOUSUARIO;
            this.MANUAL = v_objUsu.MANUAL;
            this.VELOCIDADMIN = v_objUsu.VELOCIDADMIN;
            this.INTERVALOCAPTURA = v_objUsu.INTERVALOCAPTURA;
            this.INTERVALOVISUALIZACION = v_objUsu.INTERVALOVISUALIZACION;
            this.CLAVEGOOGLE = v_objUsu.CLAVEGOOGLE;
            this.EMPRESA = v_objUsu.EMPRESA;
            this.MAXRUTASSINENVIAR = v_objUsu.MAXRUTASSINENVIAR;

            return "OK";
        }
    }
    catch (ex){return ex.message}
}

clUsuario.prototype.Guardar= function (){
    try {
        this.ID = 0;
        guardaObjetoLocal('USUARIO', this);
        return "OK";
    }
    catch (ex) {return ex.message;}
}

clUsuario.prototype.Modificar=function (){
    try {
        guardaObjetoLocal('USUARIO', this);
        return "OK";
    }
    catch (ex){return ex.message}
}

clUsuario.prototype.JSON=function (){
    var v_data = { "Apellidos": "",
        "ClaveGoogle": "",
        "Etiquetas": "",
        "IdUsuario": 0,
        "Idioma": "",
        "IntervaloCaptura": 0,
        "IntervaloVisualizacion": 0,
        "ListaVehiculos": {},
        "Mail": ""+this.EMAIL+"",
        "MailAC": "",
        "Manual": 0,
        "MaxRutasSinEnviar": 0,
        "Movil": ""+this.TELEFONO_MOVIL+"",
        "Nombre": "",
        "OpcionesDisponibles": "",
        "Telefono": ""+this.TELEFONO_FIJO+"",
        "TelefonoAC": "",
        "TipoUsuario": 0,
        "VelocidadMinima": 0
    };
    return v_data;
}

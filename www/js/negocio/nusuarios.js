
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//
//----------------------------------------------------------------------
//----------------------------------------------------------------------

function ProcesarDatosCompruebaUsuario(datos){
    try {
        var v_error = '';
        if(datos==null){
            return ObtenerTexto('msj_40');//"Usuario o Password no válidos."
        }
        if(datos["IdUsuario"].toString()=="0")
        {
            return ObtenerTexto('msj_40');//"Usuario o Password no válidos."
        }

        var v_usuario = new clUsuario();
        v_usuario.IDUSUARIO = datos["IdUsuario"];
        v_usuario.LOGIN = $('#inputLOGIN').val();
        v_usuario.PASSWORD = $('#inputPASSWORD').val();
        v_usuario.NOMBRE = datos["Nombre"];
        v_usuario.APELLIDOS = datos["Apellidos"];
        v_usuario.AT_EMAIL = datos["MailAC"];
        v_usuario.AT_TELEFONO = datos["TelefonoAC"];
        v_usuario.EMAIL = datos["Mail"];
        v_usuario.TELEFONO_FIJO = datos["Telefono"];
        v_usuario.TELEFONO_MOVIL = datos["Movil"];
        v_usuario.OPCIONESMENU = datos["OpcionesDisponibles"];
        v_usuario.IDIOMA = datos["Idioma"];
        v_usuario.TIPOUSUARIO = datos["TipoUsuario"];
        v_usuario.MANUAL = datos["Manual"];
        v_usuario.VELOCIDADMIN = datos["VelocidadMinima"];
        v_usuario.INTERVALOCAPTURA = datos["IntervaloCaptura"];
        v_usuario.INTERVALOVISUALIZACION = datos["IntervaloVisualizacion"];
        v_usuario.CLAVEGOOGLE = datos["ClaveGoogle"];
        v_usuario.MAXRUTASSINENVIAR = datos["MaxRutasSinEnviar"];

        v_error = v_usuario.Guardar();


        if(v_error=="OK") {
            var v_lista = datos["ListaVehiculos"];
            if(v_lista!=null) {
                for (var i = 0; i < v_lista.length; i++) {
                    var v_vehiculo = new clVehiculoFlota();
                    var v_resultado = v_vehiculo.Obtener_porMatricula(v_lista[i]["Matricula"]);
                    v_vehiculo.FECHAINICIO = v_lista[i]["FechaInicio"];
                    v_vehiculo.MARCA = v_lista[i]["Marca"];
                    v_vehiculo.MATRICULA = v_lista[i]["Matricula"];
                    v_vehiculo.MODELO = v_lista[i]["Modelo"];
                    v_vehiculo.VERSION = v_lista[i]["Version"];
                    if (v_resultado == "OK") {
                        v_resultado = v_vehiculo.Modificar();
                    }
                    else {
                        v_resultado = v_vehiculo.Guardar();
                    }
                    if (v_resultado != "OK") {
                        v_error = ObtenerTexto('msj_41'); //"Error al actualizar los vehículos ";
                    }

                }
            }
        }


        return v_error;

    }
    catch(ex){return ex.message;}
}



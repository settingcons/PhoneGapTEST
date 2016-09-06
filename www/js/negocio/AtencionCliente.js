function Llamar(){
    try {

        var v_objUsu = new clUsuario();
        var v_resultado = v_objUsu.Obtener();
        if (v_resultado == "OK") {
            _TelefonoAT=v_objUsu.AT_TELEFONO;

            var v_mensaje = ObtenerTexto('msj_39');//'¿Seguro que desea llamar al número NNN ?';
            v_mensaje = v_mensaje.replace('NNN',_TelefonoAT);
            var v_titulo = ObtenerTexto('msj_38');//Confirmar Llamada
            var v_botones = ObtenerTexto('msj_35');//"SI,NO";


            if (navigator.notification && navigator.notification.confirm) {
                navigator.notification.confirm(v_mensaje, HacerLlamada, v_titulo, v_botones);
            }
            else {
                var v_retorno = confirm(v_mensaje);
                if (v_retorno) {
                    HacerLlamada(1);
                }
                else {
                    HacerLlamada(2);
                }
            }
        }
        else
        {
            mensaje("msj_6","msj_2")//No hay registrado ningún teléfono
        }
    }
    catch (ex) {
        mensaje(ex.message,'msj_1');
    }
}

function HacerLlamada(respuesta){
    try{
        if(respuesta==1){
            phonedialer.dial(_TelefonoAT, HacerLlamadaError, HacerLlamadaOK)
        }
    }
    catch (ex) {
        mensaje(ex.message,'msj_1');
    }
}
function HacerLlamadaError(error){
    mensaje(error.text(),'msj_1');
}
function HacerLlamadaOK(succes){
}

//window.plugin.email.open({
//    to:          ['ecalvo@settingconsultoria.com'], // email addresses for TO field
//    cc:          Array, // email addresses for CC field
//    bcc:         Array, // email addresses for BCC field
//    attachments: Array, // paths to the files you want to attach or base64 encoded data streams
//    subject:    String, // subject of the email
//    body:       String, // email body (could be HTML code, in this case set isHtml to true)
//    isHtml:    Boolean, // indicats if the body is HTML or plain text
//});
function Enviar(){
    try {

        window.plugin.email.isServiceAvailable(
            function (isAvailable) {

                if(isAvailable)
                {
                    var v_objUsu = new clUsuario();
                    var v_resultado = v_objUsu.Obtener();
                    if (v_resultado =="OK") {
                        var v_email=v_objUsu.AT_EMAIL;

                        window.plugin.email.open({
                            to: [v_email],
                            subject: "BDSQLite",
                            body: ""
                        });
                    }
                }
                else
                {
                    mensaje('msj_7','msj_2')//Servicio de correo no disponible o no configurado
                }
            }
        );

    }
    catch (ex) {
        mensaje(ex.message,'msj_1');
    }

}

function EnviarBD(p_fichero){
    try {
        OcultarEspera();
        window.plugin.email.isServiceAvailable(
            function (isAvailable) {

                if(isAvailable)
                {
                    var v_objUsu = new clUsuario();
                    var v_resultado = v_objUsu.Obtener();
                    if (v_resultado =="OK") {
                        var v_email="ecalvo@settingconsultoria.com";

                        window.plugin.email.open({
                            to: [v_email],
                            subject: "BDSQLite",
                            body: "",
                            attachments:[p_fichero]
                        });
                    }
                }
                else
                {
                    mensaje('msj_7','msj_2')//Servicio de correo no disponible o no configurado
                }
            }
        );

    }
    catch (ex) {
        mensaje(ex.message,'msj_1');
    }

}
function Enviar2() {
    try{
        MostrarEspera();
        if(esIOS()){
            copyDBFileOutIOS();
        }
        else{
            copyDBFileOut(_bdSQLiteNombre);
        }
    }
    catch (ex){
        mensaje("msj_52",'msj_1',ex.message);//No se ha podido obtener el fichero de bd. Error:
     }
}

this.getdbfilename = function () {
    return _bdSQLiteNombre;
};

this.getdbdirectory = function() {
        return cordova.file.applicationStorageDirectory + "databases/";
};

// copy DB file out to non-private app directory.
this.copyDBFileOut = function (outfilename) {
    window.resolveLocalFileSystemURL(this.getdbdirectory() + this.getdbfilename(),
        function (fileEntry) {
            window.resolveLocalFileSystemURL((cordova.file.externalDataDirectory || cordova.file.documentsDirectory),
                function (dirEntry) {
                    fileEntry.copyTo(dirEntry, outfilename,
                        function (entry) {
                            EnviarBD(entry.toURI());
                        },
                        function (error) {
                            mensaje("msj_52",'msj_1',error.code);//No se ha podido obtener el fichero de bd. Error:
                        });
                },
                function(error){
                    mensaje("msj_52",'msj_1',error.code);//No se ha podido obtener el fichero de bd. Error:
                });
        },
        function(error){
            mensaje("msj_52",'msj_1',error.code);//No se ha podido obtener el fichero de bd. Error:
        }
    );
};

this.copyDBFileOutIOS = function () {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function(filesystem){
            filesystem.root.getFile(_bdSQLiteNombre,{create: false,exclusive:false},
                function(file){
                    file.file(
                        function(files){
                            try {
                                var reader = new FileReader();
                                reader.onloadend = function (evt) {
                                    try {
                                        var v_fich = evt.target.result;
                                        v_fich = v_fich.toString().substring(v_fich.toString().indexOf(",") + 1);
                                        v_fich = "base64:" + _bdSQLiteNombre + "//" + v_fich;
                                        EnviarBD(v_fich);
                                    }
                                    catch (ex){  mensaje("msj_52",'msj_1',ex.message);//No se ha podido obtener el fichero de bd. Error:
                                     }
                                };
                                reader.readAsDataURL(files);
                            }
                            catch (ex){ mensaje("msj_52",'msj_1',ex.message);//No se ha podido obtener el fichero de bd. Error:
                             }
                        },
                        function(error){
                            mensaje("msj_52",'msj_1',error.code);//No se ha podido obtener el fichero de bd. Error:
                        }
                    );
                },
                function(error){
                    mensaje("msj_52",'msj_1',error.code);//No se ha podido obtener el fichero de bd. Error:
                }
            );
        },
        function(error){
            mensaje("msj_52",'msj_1',error.code);//No se ha podido obtener el fichero de bd. Error:
        });
};


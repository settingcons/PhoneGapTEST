function Asigna_txt(p_idElemento,p_idTexto){
    try {
        var v_texto = ObtenerTexto(p_idTexto);
        $('#' + p_idElemento).text(v_texto);
    }
    catch(ex){}
}
function Asigna_val(p_idElemento,p_idTexto){
    try {
        var v_texto = ObtenerTexto(p_idTexto);
        $('#' + p_idElemento).val(v_texto);

    }
    catch(ex){}
}

function AsignarLiterales(p_pagina){
    try {
        switch (p_pagina) {
            case 'pageIndex':
                Textos_PageIndex();
                Textos_Menu();
                break;
            case 'pageInicio':
                Textos_pageInicio();
                break;
            case 'pageCapturaRuta':
                Textos_pageCapturaRuta();
                break;
            case 'pageListaRuta':
                Textos_pageListaRuta();
                break;
            case 'pageConsultaRuta':
                Textos_pageConsultaRuta();
                break;
            case 'pageDatosConductor':
                Textos_pageDatosConductor();
                break;
            case 'pageDatosVehiculo':
                Textos_pageDatosVehiculo();
                break;
            case 'pageNotificacion':
                Textos_pageNotificacion();
                break;
            case 'pageFichaNotificacion':
                Textos_pageFichaNotificacion();
                break;
            case 'pageEntradaKM':
                Textos_pageEntradaKM();
                break;
            case 'pageRevisionKM':
                Textos_pageRevisionKM();
                break;
            case 'pageFichaRuta':
                Textos_pageFichaRuta();
                break;
            case 'pageEditarRuta':
                Textos_pageEditarRuta();
                break;
            case 'divObservaciones':
                Textos_divObservaciones();
                break;
        }
    }
    catch(ex){}
}
function Textos_PageIndex(){
    Asigna_txt('pageIndex_text1','txt_1');//h3: FleetCare - Autenticación
    Asigna_txt('pageIndex_text2','txt_2');//td: Usuario
    Asigna_txt('pageIndex_text3','txt_3');//td: Contraseña
    Asigna_txt('pageIndex_text4','txt_4');//Botón: Validar
}

function Textos_Menu(){
    Asigna_txt('menuInicio','txt_5');//div: Inicio
    Asigna_txt('menuCaptura','txt_6');//div: Captura Ruta
    Asigna_txt('menuLista','txt_7');//div: Rutas Pendientes
    Asigna_txt('menuConsulta','txt_8');//div: Consulta Rutas
    Asigna_txt('menuDatosConductor','txt_9');//div: Datos Usuario
    Asigna_txt('menuDatosVehiculo','txt_10');//div: Datos Vehículo
    Asigna_txt('menuNotificacion','txt_11');//div: Notificaciones
    Asigna_txt('menuEntradaKm','txt_12');//div: Entrada Km
    Asigna_txt('menuRevisionKm','txt_13');//div: Revisión Km
    Asigna_txt('menuSalir','txt_14');//div: Salir
}

function Textos_pageInicio(){
    Asigna_txt('pageInicio_text1','txt_15');//h3: Fleet Care
    Asigna_txt('pageInicio_Capturar','txt_6');//div: Captura Ruta
    Asigna_txt('pageInicio_Pendiente','txt_7');//div: Rutas Pendientes
    Asigna_txt('pageInicio_Consultar','txt_8');//div: Consulta Rutas
    Asigna_txt('pageInicio_Conductor','txt_9');//div: Datos Usuario
    Asigna_txt('pageInicio_Vehiculo','txt_10');//div: Datos Vehículo
    Asigna_txt('pageInicio_Notificacion','txt_16');//div: Notificación
    Asigna_txt('pageInicio_EntradaKm','txt_12');//div: Entrada Km
    Asigna_txt('pageInicio_RevisionKm','txt_13');//div: Revisión Km
    Asigna_txt('pageInicio_Aviso1','txt_61');//div: Sólo puede capturar una ruta más.
    Asigna_txt('pageInicio_Aviso2','txt_62');//div: Revise el número de rutas pendientes.
}

function Textos_pageCapturaRuta(){
    Asigna_txt('pageCapturaRuta_txt1','txt_17');//h3: Capturar
    Asigna_txt('btnIniciarCapturatext','txt_18');//a: INICIAR RUTA
    Asigna_txt('btnFinalizarCapturatext','txt_19');//a: FINALIZAR
}

function Textos_pageListaRuta(){
    Asigna_txt('pageListaRuta_txt1','txt_20');//h3: Pendientes
}

function Textos_pageConsultaRuta(){
    Asigna_txt('pageConsultaRuta_txt1','txt_21');//h3: Consultar
    Asigna_txt('pageConsultaRuta_txt2','txt_31');//td: entre
}

function Textos_pageFichaRuta(){
    Asigna_txt('pageFichaRuta_txt1','txt_22');//h3: Ficha Ruta
    Asigna_txt('btFichaRutaEnviar','txt_23');//a: Enviar
}

function Textos_pageEditarRuta(){
    Asigna_txt('pageEditarRuta_txt1','txt_39');//h3: Editar Ruta
    Asigna_txt('btEditarRutaGuardar','txt_38');//a: Guardar
}

function Textos_pageEntradaKM(){
    Asigna_txt('pageEntradaKM_txt1','txt_12');//h3: Entrada Km
    Asigna_txt('btEntradaKmEnviar','txt_23');//a: Enviar
    Asigna_txt('pageEntradaKM_txt3','txt_24');//label: Vehículo
    Asigna_txt('pageEntradaKM_txt4','txt_25');//label: Última lectura: km.
    Asigna_txt('pageEntradaKM_txt5','txt_26');//label: fecha
    Asigna_txt('pageEntradaKM_txt6','txt_27');//label: Lectura actual: km.
    Asigna_txt('pageEntradaKM_txt7','txt_26');//label: fecha
    Asigna_txt('pageEntradaKM_txt8','txt_28');//label: km. profesionales
    Asigna_txt('pageEntradaKM_txt9','txt_29');//label: km. personales
    Asigna_txt('pageEntradaKM_txt10','txt_30');//label: Observaciones
    Asigna_txt('inputENTRADAKM_VEHICULO','txt_36');//span: Escoger un vehículo...
}

function Textos_pageRevisionKM(){
    Asigna_txt('pageRevisionKM_txt1','txt_13');//h3: Revisión Km
    Asigna_txt('pageRevisionKM_txt2','txt_31');//td: entre
    Asigna_txt('inputREVISIONBUSCARKM_VEHICULO','txt_36');//span: Escoger un vehículo...
}

function Textos_pageNotificacion(){
    Asigna_txt('pageNotificacion_txt1','txt_11');//h3: Notificaciones
}

function Textos_pageFichaNotificacion(){
    Asigna_txt('pageFichaNotificacion_txt1','txt_16');//h3: Notificación
}

function Textos_pageDatosVehiculo(){
    Asigna_txt('pageDatosVehiculo_txt1','txt_24');//h3: Vehículo
    Asigna_txt('pageDatosVehiculo_txt3','txt_40');//label: Marca
    Asigna_txt('pageDatosVehiculo_txt4','txt_41');//label: Modelo
    Asigna_txt('pageDatosVehiculo_txt6','txt_42');//label: Versión
    Asigna_txt('pageDatosVehiculo_txt7','txt_43');//label: Cilindrada
    Asigna_txt('pageDatosVehiculo_txt8','txt_44');//label: CV
    Asigna_txt('pageDatosVehiculo_txt9','txt_45');//label: EmisionesCO2
    Asigna_txt('pageDatosVehiculo_txt2','txt_46');//label: Matrícula
    Asigna_txt('pageDatosVehiculo_txt5','txt_47');//label: Bastidor
    Asigna_txt('pageDatosVehiculo_txt10','txt_48');//label: N.Póliza
    Asigna_txt('pageDatosVehiculo_txt11','txt_49');//label: Vencimiento
    Asigna_txt('pageDatosVehiculo_txt12','txt_50');//label: Fecha ITV
    Asigna_txt('pageDatosVehiculo_txt14','txt_51');//label: Consumo a los 100
    Asigna_txt('btDatosVehiculoEnviar','txt_23');//a: Enviar
}

function Textos_pageDatosConductor(){
    Asigna_txt('pageDatosConductor_txt1','txt_37');//h3: Conductor
    Asigna_txt('labelCONDUCTOR_NOMBRE','txt_52');//label: Nombre
    Asigna_txt('labelCONDUCTOR_APELLIDOS','txt_53');//label: Apellidos
    Asigna_txt('labelCONDUCTOR_EMAIL','txt_54');//label: Email de contacto
    Asigna_txt('labelCONDUCTOR_TELEFONOFIJO','txt_55');//label: Teléfono fijo
    Asigna_txt('labelCONDUCTOR_TELEFONOMOVIL','txt_56');//label: Teléfono móvil
    Asigna_txt('btDatosUsuGuardar','txt_23');//a: Enviar
}

function Textos_divObservaciones(){
    Asigna_txt('divObservaciones_txt1','txt_57');//td: Observaciones de la ruta
    Asigna_txt('btObservacionesAceptar','txt_58');//a: Aceptar
    Asigna_txt('btObservacionesCancelar','txt_59');//a: Cancelar
}

function ProcesarDatosEtiquetas(p_datos){
    var v_error="OK";
    try{
        if(p_datos!=null) {
            var v_lista_et = p_datos.split(';');

            for (var i = 0; i < v_lista_et.length; i++) {
                var v_etiqueta = v_lista_et[i].split(':');
                var v_texto = new clTexto();
                var v_resultado = v_texto.Actualizar(v_etiqueta[0], v_etiqueta[1]);

                if (v_resultado != "OK") {
                    v_error = "Error al actualizar las etiquetas";
                }
            }
        }
    }
    catch(ex){v_error=ex.message;}
    return v_error;
}

function ObtenerTexto(p_idTexto){

    try{
        var v_texto = new clTexto();
        var v_resultado= v_texto.Obtener_porIdTexto(p_idTexto);
        if(v_resultado=="OK"){
           return v_texto.TEXTO;
        }
    }
    catch(ex){}

    switch (p_idTexto) {
        case 'txt_1':
            return 'FleetCare - Autenticación';
        case 'txt_2':
            return 'Usuario';
        case 'txt_3':
            return 'Contraseña';
        case 'txt_4':
            return 'Validar';
        case 'txt_5':
            return 'Inicio';
        case 'txt_6':
            return 'Captura Ruta';
        case 'txt_7':
            return 'Rutas Pendientes';
        case 'txt_8':
            return 'Consulta Rutas';
        case 'txt_9':
            return 'Datos Usuario';
        case 'txt_10':
            return 'Datos Vehículo';
        case 'txt_11':
            return 'Notificaciones';
        case 'txt_12':
            return 'Entrada Km';
        case 'txt_13':
            return 'Revisión Km';
        case 'txt_14':
            return 'Salir';
        case 'txt_15':
            return 'Fleet Care';
        case 'txt_16':
            return 'Notificación';
        case 'txt_17':
            return 'Capturar';
        case 'txt_18':
            return 'Iniciar Ruta';
        case 'txt_19':
            return 'Finalizar';
        case 'txt_20':
            return 'Pendientes';
        case 'txt_21':
            return 'Consultar';
        case 'txt_22':
            return 'Ficha Ruta';
        case 'txt_23':
            return 'Enviar';
        case 'txt_24':
            return 'Vehículo';
        case 'txt_25':
            return 'Última lectura: km.';
        case 'txt_26':
            return 'fecha';
        case 'txt_27':
            return 'Lectura actual: km.';
        case 'txt_28':
            return 'km. profesionales';
        case 'txt_29':
            return 'km. personales';
        case 'txt_30':
            return 'Observaciones';
        case 'txt_31':
            return 'entre';
        case 'txt_32':
            return 'Fecha';
        case 'txt_33':
            return 'Km.';
        case 'txt_34':
            return 'Prof.';
        case 'txt_35':
            return 'Pers.';
        case 'txt_36':
            return 'Escoger un vehículo...';
        case 'txt_37':
            return 'Conductor';
        case 'txt_38':
            return 'Guardar';
        case 'txt_39':
            return 'Editar Ruta';
        case 'txt_40':
            return 'Marca';
        case 'txt_41':
            return 'Modelo';
        case 'txt_42':
            return 'Versión';
        case 'txt_43':
            return 'Cilindrada';
        case 'txt_44':
            return 'CV';
        case 'txt_45':
            return 'EmisionesCO2';
        case 'txt_46':
            return 'Matrícula';
        case 'txt_47':
            return 'Bastidor';
        case 'txt_48':
            return 'N.Póliza';
        case 'txt_49':
            return 'Vencimiento';
        case 'txt_50':
            return 'Fecha ITV';
        case 'txt_51':
            return 'Consumo a los 100';
        case 'txt_52':
            return 'Nombre';
        case 'txt_53':
            return 'Apellidos';
        case 'txt_54':
            return 'Email de contacto';
        case 'txt_55':
            return 'Teléfono fijo';
        case 'txt_56':
            return 'Teléfono móvil';
        case 'txt_57':
            return 'Observaciones de la ruta';
        case 'txt_58':
            return 'Aceptar';
        case 'txt_59':
            return 'Cancelar';
        case 'txt_60':
            return 'Total';
        case 'txt_61':
            return 'Sólo puede capturar una ruta más.';
        case 'txt_62':
            return 'Revise el número de rutas pendientes.';
        case 'txt_63':
            return 'No puede capturar más rutas.';
        case 'msj_1':
            return 'Error';
        case 'msj_2':
            return 'Aviso';
        case 'msj_3':
            return 'Error de comunicación';
        case 'msj_4':
            return 'Error de validación';
        case 'msj_5':
            return 'Error de aplicación';
        case 'msj_6':
            return 'No hay registrado ningún teléfono';
        case 'msj_7':
            return 'Servicio de correo no disponible o no configurado';
        case 'msj_8':
            return 'localstorage no soportado';
        case 'msj_9':
            return 'No se puede establecer conexión con el servidor.';
        case 'msj_10':
            return 'No se puede acceder a esta opción de menú.';
        case 'msj_11':
            return 'Compruebe el GPS. La información de la localización no está disponible.';
        case 'msj_12':
            return 'No se ha guardado la ruta porque no tenía puntos asociados.';
        case 'msj_13':
            return 'No se ha podido realizar la búsqueda.';
        case 'msj_14':
            return 'No se pueden añadir más de cuatro puntos de corte.';
        case 'msj_15':
            return 'No se ha podido dividir la ruta.';
        case 'msj_16':
            return 'No se ha añadido ningún punto de corte.';
        case 'msj_17':
            return 'No hay vehículos asociados para entrar su lectura.';
        case 'msj_18':
            return 'No se ha podido obtener la última lectura de central.';
        case 'msj_19':
            return 'No se ha podido mostrar los resultados de la búsqueda.';
        case 'msj_20':
            return 'Antes de capturar otra ruta debe reducir el número de rutas pendientes.';
        case 'msj_21':
            return 'Debe escoger una matrícula.';
        case 'msj_22':
            return 'Email de contacto no válido.';
        case 'msj_23':
            return 'Teléfono fijo no válido.';
        case 'msj_24':
            return 'Teléfono móvil no válido.';
        case 'msj_25':
            return 'No se ha podido procesar los datos.';
        case 'msj_26':
            return 'Campo Marca obligatorio.';
        case 'msj_27':
            return 'Campo Modelo obligatorio.';
        case 'msj_28':
            return 'Campo Matrícula obligatorio.';
        case 'msj_29':
            return 'No se ha podido actualizar la lista de notificaciones.';
        case 'msj_30':
            return 'La lectura actual es obligatoria y ha de ser superior a la última lectura.';
        case 'msj_31':
            return 'La fecha actual es obligatoria, no puede ser a futuro y ha de ser superior o igual a la de última lectura.';
        case 'msj_32':
            return 'Los km profesionales son obligatorios y no pueden superar los km. totales.';
        case 'msj_33':
            return '¿Quieres eliminar las rutas seleccionadas?';
        case 'msj_34':
            return 'Eliminar rutas locales';
        case 'msj_35':
            return 'SI,NO';
        case 'msj_36':
            return '¿Quiere eliminar las lecturas seleccionadas?';
        case 'msj_37':
            return 'Eliminar lecturas';
        case 'msj_38':
            return 'Confirmar Llamada';
        case 'msj_39':
            return '¿Seguro que desea llamar al teléfono NNN ?';
        case 'msj_40':
            return 'Usuario o Password no válidos.';
        case 'msj_41':
            return 'Error al actualizar los vehículos';
        case 'msj_42':
            return '¿Seguro que desea salir de la app?';
        case 'msj_43':
            return 'phonegap no soportado';
        case 'msj_44':
            return 'Envío correcto.';
        case 'msj_45':
            return 'Los datos se han actualizado correctamente.';
        case 'msj_46':
            return 'Error de comunicación.';
        case 'msj_47':
            return 'Los datos no se han podido enviar a central.';
        case 'msj_48':
            return '¿Quiere eliminar las notificaciones seleccionadas?';
        case 'msj_49':
            return 'Eliminar notificaciones';
        case 'msj_50':
            return 'Este usuario no tiene acceso a google maps';
        case 'msj_51':
            return 'Dirección no encontrada';
        case 'msj_52':
            return 'No se ha podido obtener el fichero de bd. Error: ';
        case 'msj_53':
            return 'Error abrir BD: ';
        case 'msj_54':
            return 'Error crear tabla Ruta: ';
        case 'msj_55':
            return 'Error crear tabla RutaPunto: ';
        case 'msj_56':
            return 'No se ha podido iniciar la captura.';
        case 'msj_57':
            return 'Lleva más de 10 minutos sin capturar coordenadas. ¿Quiere finalizar la captura de ruta?';
        case 'msj_58':
            return 'No se ha podido recuperar la ruta para enviarla.';
        case 'msj_59':
            return 'Error al obtener la lista de rutas pendientes.';
        default:
            return p_idTexto;
    }

}



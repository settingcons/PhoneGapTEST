String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

function localStorageRun() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function salir() {
    if (esIOS()) {

    }
    else {

        var v_mensaje = ObtenerTexto('msj_42');//¿Seguro que desea salir de la app?
        var v_titulo = "InfCateter";
        var v_botones = ObtenerTexto('msj_35');//"SI,NO";

        if (navigator.notification && navigator.notification.confirm) {
            navigator.notification.confirm(v_mensaje, salir1, v_titulo, v_botones);
        }
        else {
            var v_retorno = confirm(v_mensaje);
            if (v_retorno) {
                salir1(1);
            }
            else {
                salir1(2);
            }
        }
    }
}

function salir1(p_opcion) {
    if(p_opcion==1) {
        if (_wathID != null) {
            navigator.geolocation.clearWatch(_wathID);
            _wathID = null;
        }

        if (esIOS()) {

        }
        else {
            if (navigator.app) {
                navigator.app.exitApp();
            } else if (navigator.device) {
                navigator.device.exitApp();
            }
        }
    }
}


function localStorageSupport() {
    if ("localStorage" in window && window["localStorage"] != null)
        return true;
    else
        return false;
}

function phoneGapRun() {
    return(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/));
}

function esIOS() {
    return(navigator.userAgent.match(/(iPhone|iPod|iPad)/));
}

function mensaje(p_idmsg,p_idtitulo,p_exc) {
    OcultarEspera();
    $.mobile.loading( "hide" );
    var v_titulo=ObtenerTexto(p_idtitulo);
    var v_texto = ObtenerTexto(p_idmsg);
    if(p_exc!=null){
        v_texto=v_texto+'\n'+p_exc;
    }
    if(phoneGapRun())
        navigator.notification.alert(v_texto, null, v_titulo);
    else
        alert(v_texto);

}

function FechaHora_DateToStringYYYYMMDDhhmmss(p_dFecha) {
    var d = new Date(p_dFecha);

    var v_sFecha = (parseInt(d.getDate()) < 10 ? '0' : '') + d.getDate().toString() + '/' + (parseInt(d.getMonth() + 1) < 10 ? '0' : '') + (parseInt(d.getMonth()) + 1).toString() + '/' + d.getFullYear().toString();
    var v_sHora=  (parseInt(d.getHours()) < 10 ? '0' : '') + d.getHours().toString() + ':' + (parseInt(d.getMinutes()) < 10 ? '0' : '') + d.getMinutes().toString() + ':' + (parseInt(d.getSeconds()) < 10 ? '0' : '') + d.getSeconds().toString() ;

    return v_sFecha +' '+v_sHora;
}


function FechaHora_DateToString(p_dFecha) {
    var d = p_dFecha;
    var v_sFecha = (parseInt(d.getDate()) < 10 ? '0' : '') + d.getDate().toString() + '/' + (parseInt(d.getMonth() + 1) < 10 ? '0' : '') + (parseInt(d.getMonth()) + 1).toString() + '/' + d.getFullYear().toString();
    var v_sHora=  (parseInt(d.getHours()) < 10 ? '0' : '') + d.getHours().toString() + ':' + (parseInt(d.getMinutes()) < 10 ? '0' : '') + d.getMinutes().toString() + ':' + (parseInt(d.getSeconds()) < 10 ? '0' : '') + d.getSeconds().toString() ;

    return v_sFecha +' '+v_sHora;
}

function Fecha_DateToString(p_dFecha) {
    var d = p_dFecha;
    var v_sFecha = (parseInt(d.getDate()) < 10 ? '0' : '') + d.getDate().toString() + '/' + (parseInt(d.getMonth() + 1) < 10 ? '0' : '') + (parseInt(d.getMonth()) + 1).toString() + '/' + d.getFullYear().toString();

    return v_sFecha ;
}

function FechaHora_StringToDate(p_sFecha) {
    var v_list1 = p_sFecha.split(' ');

    var v_dia = v_list1[0].split('/');
    var v_hora = v_list1[1].split(':');

    var v_dFecha=new Date(v_dia[2],parseInt(v_dia[1])-1,v_dia[0],v_hora[0],v_hora[1],v_hora[2]);

    return v_dFecha;
}
function Fecha_StringToDate(p_sFecha) {
    var v_dia = p_sFecha.substr(0,2);
    var v_mes = p_sFecha.substr(3,2);
    var v_ano = p_sFecha.substr(6,4);

    var v_dFecha=new Date(v_ano,v_mes-1,v_dia);

    return v_dFecha;
}
function StringFecha_yyyymmdd_a_ddmmyyy(p_fecha){
    var v_retorno="";
    if(p_fecha != undefined && p_fecha!=null && p_fecha != ''){
        var v_lista = p_fecha.split('/');
        if(v_lista.length==3){
            v_retorno = v_lista[2]+"/"+v_lista[1]+"/"+v_lista[0];
        }
    }
    return v_retorno;
}
function StringFecha_ddmmyyy_a_yyyymmdd(p_fecha){
    var v_retorno="";
    if(p_fecha != undefined && p_fecha!=null && p_fecha != ''){
        var v_lista = p_fecha.split('/');
        if(v_lista.length==3){
            v_retorno = v_lista[2]+"/"+v_lista[1]+"/"+v_lista[0];
        }
    }
    return v_retorno;
}

function StringFecha_a_YYYYMMDDhhmmss(p_fecha){
    var v_retorno="";
    if(p_fecha != undefined && p_fecha!=null && p_fecha != ''){
        var v_lista = p_fecha.split('/');
        if(v_lista.length==3){
            var v_lista1= v_lista[2].split(' ');
            var v_lista2=v_lista1[1].split(':');
            v_retorno = v_lista1[0]+v_lista[1]+v_lista[0]+v_lista2[0]+v_lista2[1]+v_lista2[2];
        }
    }
    return v_retorno;
}



function CalculaTiempo(p_dFechaIni,p_dFechaFin){
    var v_timeIni=p_dFechaIni.getTime();
    var v_timeFin=p_dFechaFin.getTime();

    var v_diff=v_timeFin-v_timeIni;

    var d = new Date(v_diff);

    var v_sHora='';
    if(d.getUTCHours()>0) {
        v_sHora = d.getUTCHours().toString() + ' horas y ' + d.getUTCMinutes().toString() + ' minutos';
    }
    else{
        v_sHora = d.getUTCMinutes().toString() + ' minutos';
    }
    return v_sHora;
}

function CalculaTiempo_hhmm(p_dFechaIni,p_dFechaFin) {
    var v_timeIni = p_dFechaIni.getTime();
    var v_timeFin = p_dFechaFin.getTime();

    var v_diff = v_timeFin - v_timeIni;

    var v_asco = v_diff;

    // obtenemos los segundos
    v_diff = v_diff / 1000;

    var v_segundos = 0;
    var v_minutos = 0;
    var v_horas = 0;

    if (v_diff < 60) {
        v_segundos = v_diff;
    }
    else {

        // cogemos la parte entera de los segundos
        v_segundos = Math.round(v_diff % 60);

        // restamos los segundos que hemos cogido
        v_diff = Math.floor(v_diff / 60);

        // cogemos los minutos
        v_minutos = Math.round(v_diff % 60);

        // restamos los minutos que hemos cogido
        v_horas = Math.floor(v_diff / 60);
    }

    //alert('v_horas: '+v_horas+' v_minutos: '+v_minutos+' v_segundos: '+v_segundos);
    v_sHora = (parseInt(v_horas) < 10 ? '0' : '') + v_horas.toString() + ':' + (parseInt(v_minutos) < 10 ? '0' : '') + v_minutos.toString() + ':' + (parseInt(v_segundos) < 10 ? '0' : '') + v_segundos.toString();

    return v_sHora;
}

function DiferenciaEnSegundos(p_dFechaIni,p_dFechaFin){

    var v_diff=p_dFechaFin-p_dFechaIni;

    return (v_diff/1000);
}


function CalculaDistanciaRutaPuntos(p_ListaPuntos){

    var v_distancia=0;

    var v_puntos =p_ListaPuntos;

    for(var x=0; x<v_puntos.length; x++) {
        if(x>0)
        {
            var v_punto1=new google.maps.LatLng( v_puntos[x-1].COORD_X, v_puntos[x-1].COORD_Y);
            var v_punto2=new google.maps.LatLng( v_puntos[x].COORD_X, v_puntos[x].COORD_Y);
            v_distancia= v_distancia + google.maps.geometry.spherical.computeDistanceBetween(v_punto1,v_punto2);
        }
    }

    var v_km=v_distancia/1000;

    return  +(Math.round(v_km + "e+2")  + "e-2");

}

function CalculaDistanciaEntrePuntos(p_ListaPuntos,p_ini,p_fin){

    var v_distancia=0;

    var v_puntos =p_ListaPuntos;

    for(var x=p_ini; x<p_fin; x++) {
        if(x>p_ini)
        {
            var v_punto1=new google.maps.LatLng( v_puntos[x-1].COORD_X, v_puntos[x-1].COORD_Y);
            var v_punto2=new google.maps.LatLng( v_puntos[x].COORD_X, v_puntos[x].COORD_Y);
            v_distancia= v_distancia + google.maps.geometry.spherical.computeDistanceBetween(v_punto1,v_punto2);
        }
    }

    var v_km=v_distancia/1000;

    return  +(Math.round(v_km + "e+2")  + "e-2");

}


function Numero_String(p_numero){
    if(parseInt(p_numero)<1000){
        return p_numero.toString();
    }
    else if(parseInt(p_numero)<1000000){
        var v_numero =parseInt(p_numero).toString();
        var v_long=v_numero.length;
        v_numero=v_numero.substring(0,v_long-3)+'.'+v_numero.substring(v_long-3,v_long);
        return v_numero;
    }
    else if(parseInt(p_numero)<1000000000){
        var v_numero =parseInt(p_numero).toString();
        var v_long=v_numero.length;
        v_numero=v_numero.substring(0,v_long-6)+'.'+v_numero.substring(v_long-6,v_long-3)+'.'+v_numero.substring(v_long-3,v_long);
        return v_numero;
    }
    return p_numero.toString();
}

function estadoControl(control, bHabilitar){
    if(bHabilitar)
    {
        try{ $('#' + control).removeAttr("disabled", "disabled"); } catch(e) {}
        try{ $('#' + control).attr("enabled", "enabled"); } catch(e) {}
        try{ $('#' + control).removeClass('ui-disabled'); } catch(e) {}
        try{ $('#' + control).addClass('ui-enabled'); } catch(e) {}
    }
    else
    {
        try{ $('#' + control).removeAttr("enabled", "enabled"); } catch(e) {}
        try{ $('#' + control).attr("disabled", "disabled"); } catch(e) {}
        try{ $('#' + control).removeClass('ui-enabled'); } catch(e) {}
        try{ $('#' + control).addClass('ui-disabled'); } catch(e) {}
    }
}

function esTelefono(p_numero){
    if(indefinidoOnullToVacio(p_numero) != '') {
        var v_res1=/^\d{7,15}$/; //7 a 15 cifras seguidas
        var v_res2=/^\+\s\d{7,15}$/;//+ seguido de espacio en blanco y 7 a 15 cifras consecutivas
        var v_res3=/^\+\d{7,15}$/;//+   seguido de 7 a 15 cifras consecutivas

        return v_res1.test(p_numero)||v_res2.test(p_numero)||v_res3.test(p_numero);
    }
    else return true;
}


function esEmail(email) {
    if(indefinidoOnullToVacio(email) != '') {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    else return true;
}
function indefinidoOnullToVacio(algo){
    if (undefined === algo) return '';
    if (void 0 === algo) return '';
    if(algo == null) return '';
    if(algo == 'null') return '';
    return algo;
}
function indefinidoOvacioToCero(algo){
    if (undefined === algo) return 0;
    if (void 0 === algo) return 0;
    if(algo == null) return 0;
    if (isNaN(algo)) return 0;
    if(algo.toString() == '') return 0;
    return algo;
}
function SoloNumero(p_campo) {
    var a = event.keyCode;
    //9->tab
    //8->delete
    //13->intro
    if (a >= 48 && a <= 57) {

        event.returnValue = true;
    }
    //else if (a > 95 && a < 106) {
    //    event.returnValue = true;
    //}
    else if (a == 13 || a == 8 || a == 9) {
            event.returnValue = true;
    }
    else {
        event.returnValue = false;
    }
}
function SoloDecimal(p_campo) {
    var a = event.keyCode;
    //9->tab
    //8->delete
    //13->intro
    //188->coma
    if (a >= 48 && a <= 57) {

        event.returnValue = true;
    }
    //else if (a > 95 && a < 106) {
    //    event.returnValue = true;
    //}
    else if (a == 188 || a == 13 || a == 8 || a == 9) {
        event.returnValue = true;
    }
    else {
        event.returnValue = false;
    }

}

function String_Entero(p_numero){
    if(indefinidoOnullToVacio(p_numero) != '') {
        var v_numero=p_numero.toString().replace(/\./g, '');
        if(v_numero.indexOf(",")==-1){
            return parseInt(v_numero);
        }
        else{
            return parseInt(v_numero.substring(0,v_numero.indexOf(",")));
        }
    }
    else return 0;
}

 /*InfCateter*/
var xmlFic;

//Devuelve un objeto XML document (el XML entero)
function leeXML(idioma, fichero) {
    //DEBUG: alert("content/" + idioma + "/" + fichero);
    try
    {

        $.ajax({
            type: "GET",
            url: "content/" + idioma + "/" + fichero,
            dataType: "xml",
            success: function (xml) {
                xmlFic = xml;
            },
            error: function () {
                mensaje("Error processant arxiu XML", "error");
            }, async: false
        });

    }
    catch(ex)
    {
        alert(ex.message);
    }
}

/*InfCateter*/
function getPath() {
    // Get local path for Phonegap
    path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    return 'file://' + path;
}

/*function onSuccess(fileEntry) {
    alert('onSuccess : ' + fileEntry.name);
    var dirDestino = new DirectoryEntry(parentName, parent);
    fileEntry.copyTo(dirDestino, "Gentamicina.pdf", function(o){alert('copiado');}, function(e){alert('error : ' + e.message);} );
}
function copyDoc(ruta, fic) {
    var wwwPath = window.location.pathname;
    var basePath = 'file://'+ wwwPath.substring(0,wwwPath.length-10);
    window.resolveLocalFileSystemURI(basePath + ruta + fic, onSuccess, function(e){alert('error : ' + e.message);});
}*/


function copyDoc3(ruta, fic) {
    try{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        alert(fileSystem.name);

        var dirDest = fileSystem.root.fullPath;
        alert('dirDest : ' + dirDest);

        var wwwPath = window.location.pathname;
        var basePath = 'file://'+ wwwPath.substring(0,wwwPath.length-10);
alert('Origen : ' + basePath + ruta + fic);

        window.resolveLocalFileSystemURI(basePath + ruta + fic, function(fileEntry){
            alert('onSuccess : ' + fileEntry.name);
            var dirDestino = new DirectoryEntry({fullPath: dirDest});
            fileEntry.copyTo(dirDestino, "Gentamicina.pdf", function(o){alert('copiado');}, function(e){alert('errorCopyTo : ' + e.message);} );
        }, function(e){alert('errorResolveLocalFileSystemURI : ' + e.message);});

    }, function (e) {
        alert('errorRequestFileSystem : ' + e.message);
    });

}
catch(e)
{
    alert('exception : ' + e.message);
}

}

function copyDoc1(ruta, fic) {

    try {
        var wwwPath = window.location.pathname;
        var basePath = 'file://' + wwwPath.substring(0, wwwPath.length - 10);
        alert('copyDoc : ' + basePath);
        window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function (fs) {
            alert('requestFileSystem : ' + basePath + ruta + fic);
            fs.root.getFile("temp", {create: true, exclusive: false},
                function (entry) {
                    alert('fs.root.getFile : ' + entry.fullPath);
                    var ft = new FileTransfer();
                    ft.download(
                        basePath + ruta + fic,
                        entry.fullPath,
                        function (entry) {
                            // do what you want with the entry here
                            alert("download complete: " + entry.fullPath);
                        },
                        function (error) {
                            alert("error source " + error.source);
                            alert("error target " + error.target);
                            alert("error code " + error.code);
                        },
                        false,
                        null
                    );
                }, function () {
                    alert("file create error");
                });
        }, null);
    }
    catch(e)
    {
        alert('exception : ' + e.message);
    }
}


function copyDoc2(ruta, fic) {
alert('copyDoc');
    try{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        fs.root.getFile("readme.txt", {create: false, exclusive: false}, function(entry) {
            entry.file(function(fp) {
                alert(fp.name);
                alert(fp.fullPath);


            }, function(e){alert('errorGetFile : ' + e.message);})
        })
    }, function(e){alert('errorRequestFileSystem : ' + e.message);});

}
catch(e)
{
    alert('exception : ' + e.message);
}
}

function copyDoc4(ruta, fic) {
    try {
        var wwwPath = window.location.pathname;
        var basePath = 'file://' + wwwPath.substring(0, wwwPath.length - 10);
        var miFic = basePath + ruta + fic;
alert(miFic);
        miFic = 'file:///storage/sdcard0/Android/data/com.settingconsultoria.PhoneGapTEST/www/' + ruta+ fic;
alert(miFic);
        window.resolveLocalFileSystemURI(miFic,
            function (entry) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                    function (fileSys) {
                        fileSys.root.getDirectory('infCateter', {create: true, exclusive: false},
                            function (directory) {
                                entry.copyTo(directory, 'Gentamicina.pdf', function (entryFile) {
                                    alert("Success. New doc: " + entryFile.fullPath);
                                }, function(e){alert('error copyTo : ' + e.message);} );
                            }, function(e){alert('error fileSys.root.getDirectory : ' + e.message);});
                    }, function(e){alert('error window.requestFileSystem : ' + e.message);});
            }, function(e){alert('error window.resolveLocalFileSystemURI : ' + e.message);});
    }
    catch(e)
    {
        alert('exception : ' + e.message);
    }
}

function copyDoc5(ruta, fic) {
    try{
        window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + '/www/content/es-es/PDF',
                function (dirEntry) {
                    alert(dirEntry.fullPath);

        }, function(e){alert('error window.resolveLocalFileSystemURL : ' + e.message);});
    }
    catch(e)
    {
        alert('exception : ' + e.message);
    }
}

function copyDoc6(ruta, fic) {

    alert('1- ' + cordova.file.applicationDirectory);  //Read-only directory where the application is installed. (iOS, Android, BlackBerry 10, OSX, windows)
    alert('2- ' + cordova.file.applicationStorageDirectory);  //Root directory of the application's sandbox; on iOS & windows this location is read-only (but specific subdirectories [like  /Documents  on iOS or  /localState  on windows] are read-write). All data contained within is private to the app. (iOS, Android, BlackBerry 10, OSX)
    alert('3- ' + cordova.file.dataDirectory);  //Persistent and private data storage within the application's sandbox using internal memory (on Android, if you need to use external memory, use  .externalDataDirectory ). On iOS, this directory is not synced with iCloud (use  .syncedDataDirectory ). (iOS, Android, BlackBerry 10, windows)
    alert('4- ' + cordova.file.cacheDirectory);  //Directory for cached data files or any files that your app can re-create easily. The OS may delete these files when the device runs low on storage, nevertheless, apps should not rely on the OS to delete files in here. (iOS, Android, BlackBerry 10, OSX, windows)
    alert('5- ' + cordova.file.externalApplicationStorageDirectory);  //Application space on external storage. (Android)
    alert('6- ' + cordova.file.externalDataDirectory);  //Where to put app-specific data files on external storage. (Android)
    alert('7- ' + cordova.file.externalCacheDirectory);  //Application cache on external storage. (Android)
    alert('8- ' + cordova.file.externalRootDirectory);  //External storage (SD card) root. (Android, BlackBerry 10)

    var dirApp = cordova.file.applicationDirectory;
    alert(dirApp);

    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (fileEntry) {
        var filepath = fileEntry.toURL() + fic;
        var fileTransfer = new FileTransfer();
alert('FilePath ' + filepath);
        fileTransfer.download(dirApp + ruta + fic, filepath,
            function (fileEntry) {
                alert("download complete: " + fileEntry.toURL());
            },
            function (error) {
                alert("ErrorDownload: " + JSON.stringify(error));
            },
            true,
            {});
    });
}

/*function copyDoc(ruta, fic){
alert('0-copyDoc ' + ruta + fic);
    var wwwPath = window.location.pathname;
alert('1-copyDoc ' + wwwPath);
    var basePath = 'file://'+ wwwPath.substring(0,wwwPath.length-10);
alert('2- ' + basePath + ruta + fic);

*//*alert("OTRO: " + cordova.file.applicationDirectory);*//*

    function copyFile(entry) {
        var parent = document.getElementById('parent').value,
            parentName = parent.substring(parent.lastIndexOf('/')+1),
            parentEntry = new DirectoryEntry(parentName, parent);

        // copy the file to a new directory and rename it
        entry.copyTo(parentEntry, "file.copy", success, fail);
    }

    window.resolveLocalFileSystemURL(basePath + ruta + fic,
        function(elFic){
            alert('3-success! file found')
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, null);

            function onSuccess(fileSystem) {
                var documentsPath = fileSystem.root;
alert('4-copio a : ' + documentsPath);
                elFic.copyTo(documentsPath, fic,
                    function(){
                        alert('copying was successful');
                        window.plugins.fileOpener.open(fic);
                    },
                    function(){
                        alert('unsuccessful copying');
                    });
            }
        },
        function(){
            alert('failure! file was not found');
        });
}*/

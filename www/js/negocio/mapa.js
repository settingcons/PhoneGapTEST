function cogerDireccion(p_posicion) {
    var v_resultado='Dirección no encontrada';
    var v_Param = "latlng=" + p_posicion.toString().replace(" ", "").replace("(", "").replace(")", "") + "&sensor=true";
    var v_url = "https://maps.googleapis.com/maps/api/geocode/json?key="+_UsuarioApp.CLAVEGOOGLE+"&"+v_Param;

    $.ajax({
        type: "GET",
        url: v_url,
        cache:false,
        contentType: 'application/x-www-form-urlencoded',
        dataType: "json",
        success: function (datos) {
            v_resultado=recuperarDireccion(datos);
            v_resultado=v_resultado.split("'").join("´");
        },
        error: function (error) {
            v_resultado=ObtenerTexto('msj_51');
        },
        async: false
    });


    return v_resultado;
}
function recuperarDireccion(results){

    var v_direccion=ObtenerTexto('msj_51');
    if (results.status == google.maps.GeocoderStatus.OK) {
        if (results.results[0]) {
            var v_dir1='';
            var v_dir2='';
            var v_dir3='';
            var v_dir4='';
            try{v_dir1=results.results[0].address_components[1].short_name}
            catch (ex){}
            try{v_dir2=results.results[0].address_components[0].short_name}
            catch (ex){}
            try{v_dir3=results.results[0].address_components[6].short_name}
            catch (ex){}
            try{v_dir4=results.results[0].address_components[2].short_name}
            catch (ex){}
            v_direccion=v_dir1+", "+v_dir2+", "+v_dir3+" "+v_dir4;
        }
    }

    return v_direccion;
}


function PintarRutaMapa(p_listapuntos,p_mapa){

    var v_limites = new google.maps.LatLngBounds();
    var trackCoords = [];
    var v_punto;
    var v_puntoIni;
    var v_puntoFin;
    var v_puntoCentro;
    var v_medio=p_listapuntos.length/2;

    //primero poner todas las coordenada de la ruta en un array
    for(i=0; i<p_listapuntos.length; i++) {

        v_punto = new google.maps.LatLng(p_listapuntos[i].COORD_X, p_listapuntos[i].COORD_Y);
        trackCoords.push(v_punto);
        v_limites.extend(v_punto);

        if (v_puntoIni == null) {
            v_puntoIni =v_punto;
        }
        if (v_puntoCentro == null) {
            if (i > v_medio) {
                v_puntoCentro = v_punto;
            }
        }
        v_puntoFin = v_punto;
    }

    var v_anchoLinea=4;

    if(_media_480.matches){
        v_anchoLinea=6;
    }
    if(_media_768.matches){
        v_anchoLinea=8;
    }
    if(_media_800.matches){
        v_anchoLinea=10;
    }
    //Poner el array de coordenadas en una linea en googel maps
    var trackPath = new google.maps.Polyline({
        path: trackCoords,
        strokeColor: "#008cff",
        strokeOpacity: 0.8,
        strokeWeight:v_anchoLinea,
        clickable: false
    });


    CrearMarcadorInicioRuta(v_puntoIni,p_mapa);

    CrearMarcadorFinRuta(v_puntoFin,p_mapa);

    //Aplicar la linea al mapa
    trackPath.setMap(p_mapa);

    //establecer límites del mapa
    p_mapa.fitBounds(v_limites);


}

function CrearMarcadorInicioRuta(p_punto,p_mapa){

    var v_scalas=6;
    var v_strokeWeight=8;
    if(_media_480.matches){
        v_scalas=8;
        v_strokeWeight=10;
    }
    if(_media_768.matches){
        v_scalas=10;
        v_strokeWeight=12;
    }
    if(_media_800.matches){
        v_scalas=12;
        v_strokeWeight=14;
    }
    var _marcadorIni = new google.maps.Marker({
        position:p_punto,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: v_scalas, //tamaño
            strokeColor: '#46f800', //color del borde
            strokeWeight: v_strokeWeight, //grosor del borde
            strokeOpacity:0.3,//opacidad del borde
            fillColor: '#46f800', //color de relleno
            fillOpacity:1// opacidad del relleno
        },
        map: p_mapa
    });

    return _marcadorIni;
}

function CrearMarcadorFinRuta(p_punto,p_mapa){
    var v_scalas=6;
    var v_strokeWeight=8;
    if(_media_480.matches){
        v_scalas=8;
        v_strokeWeight=10;
    }
    if(_media_768.matches){
        v_scalas=10;
        v_strokeWeight=12;
    }
    if(_media_800.matches){
        v_scalas=12;
        v_strokeWeight=14;
    }
    var v_marcadorFin = new google.maps.Marker({
        position:p_punto,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: v_scalas, //tamaño
            strokeColor: '#fe0000', //color del borde
            strokeWeight: v_strokeWeight, //grosor del borde
            strokeOpacity:0.3,//opacidad del borde
            fillColor: '#fe0000', //color de relleno
            fillOpacity:1// opacidad del relleno
        },
        map: p_mapa
    });

    return p_mapa;
}


function ImagenPunto(p_punto){
    var v_sIcono = "imagenes/punto" + p_punto.toString().trim() + "_20.png";
    var v_image = new google.maps.MarkerImage(
        v_sIcono
        , new google.maps.Size(20,20)
        , new google.maps.Point(0,0)
        , new google.maps.Point(10,10)
    );

    if(_media_480.matches){
        v_sIcono = "imagenes/punto" + p_punto.toString().trim() + "_24.png";
        v_image = new google.maps.MarkerImage(
            v_sIcono
            , new google.maps.Size(24,24)
            , new google.maps.Point(0,0)
            , new google.maps.Point(12,12)
        );
    }
    if(_media_768.matches){
        v_sIcono = "imagenes/punto" + p_punto.toString().trim() + "_28.png";
        v_image = new google.maps.MarkerImage(
            v_sIcono
            , new google.maps.Size(28,28)
            , new google.maps.Point(0,0)
            , new google.maps.Point(14,14)
        );
    }
    if(_media_800.matches){
        v_sIcono = "imagenes/punto" + p_punto.toString().trim() + "_32.png";
        v_image = new google.maps.MarkerImage(
            v_sIcono
            , new google.maps.Size(32,32)
            , new google.maps.Point(0,0)
            , new google.maps.Point(16,16)
        );
    }


    return v_image;
}

function IconoPuntoActual()
{
    var v_scalas=6;
    var v_strokeWeight=20;
    if(_media_480.matches){
        v_scalas=8;
        v_strokeWeight=22;
    }
    if(_media_768.matches){
        v_scalas=10;
        v_strokeWeight=24;
    }
    if(_media_800.matches){
        v_scalas=12;
        v_strokeWeight=26;
    }
    var v_icon= {path: google.maps.SymbolPath.CIRCLE,
        scale: v_scalas, //tamaño
        strokeColor: '#008cff', //color del borde
        strokeWeight: v_strokeWeight, //grosor del borde
        strokeOpacity:0.2,//opacidad del borde
        fillColor: '#008cff', //color de relleno
        fillOpacity:1// opacidad del relleno
    };

    return v_icon;
}
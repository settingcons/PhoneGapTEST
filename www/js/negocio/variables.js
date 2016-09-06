
//-----------------------------------------------------------------------------
// Usuario de la app
//-----------------------------------------------------------------------------
var _UsuarioApp;
var _versionApp="FleetCareTEST 0.0.4 ";
var _appEnSegundoPlano = false;
var _Dispositivo = "";
var _AndroidVersion = "";
var _AndroidNumNucleos = "";
//-----------------------------------------------------------------------------
// URL's de los servicios rest
//como el webservice enrealidad son servicios rest la invocación de los métodos
//es diferente de los webservices tradicionales
//-----------------------------------------------------------------------------
var _urlUsuario="http://rest.anteveni.com/Usuario";
var _urlEntradaKm="http://rest.anteveni.com/LecturaConductor";
var _urlVehiculoPropio="http://rest.anteveni.com/VehiculoPropio";
var _urlNotificacion="http://rest.anteveni.com/notificacion";
var _urlRutas=" http://rest.anteveni.com/Rutas";


var _media_320_1 = matchMedia("only screen and  (max-width : 320px) , only screen and  (max-device-width : 320px)");
var _media_320_2 = matchMedia("only screen and  (min-width : 320px) and (orientation: portrait), only screen and  (min-width : 480px) and (orientation: landscape)");
var _media_360 = matchMedia("only screen and  (min-width : 360px) and (orientation: portrait), only screen and  (min-width : 640px) and (orientation: landscape)");
var _media_480 = matchMedia("only screen and  (min-width : 480px) and (orientation: portrait), only screen and  (min-width : 800px) and (orientation: landscape)");
var _media_768 = matchMedia("only screen and  (min-width : 600px) and (orientation: portrait),only screen and  (min-width : 900px) and (orientation: landscape)");
var _media_800 = matchMedia("only screen and  (min-width : 800px) and (orientation: portrait), only screen and  (min-width : 1280px) and (orientation: landscape)");
//-----------------------------------------------------------------------------
// Lista de vehículos de flota del usuario de la app
//-----------------------------------------------------------------------------
var _ListaVehiculosFlota;//se utiliza para la selección de vehículos, se carga al inicio, al validar el usuario
var _tempCampoVehiculo; //Se utiliza en la selección de vehículo flota, guarda el id del cambo destinatario de la selección

//-----------------------------------------------------------------------------
// Lista de notificaciones
//-----------------------------------------------------------------------------
var _ListaNotificaciones;
var _ListaNotificacionesEliminar;

//-----------------------------------------------------------------------------
// Lista para Revisión de KM
//-----------------------------------------------------------------------------
var _ListaEntradaKm; //Se utiliza para guardar los resultados de la búsqueda
var _ListaEntradaKmEliminar;

var _tempEntradaKmId=null;
var _primeralectura=false;

//-----------------------------------------------------------------------------
// Captura de ruta
//-----------------------------------------------------------------------------
var _wathID;
var _RutaCaptura;//Se utiliza en pageCapturaRuta, guarda la ruta que se está capturando
var _mapaCaptura;//Se utiliza en pageCapturaRuta, muestra el mapa de captuta
var _mapaCapturaMarcador;//Se utiliza en pageCapturaRuta, muestra el punto que se está capturando
var _PuntoActual;//Se utiliza en pageCapturaRuta, guarda el punto actual
var _PuntoAnterior;//Se utiliza en pageCapturaRuta, guarda el punto anterior, para descartar repetidos
var _TimePosicionAnterior;//Se utiliza en pageCapturaRuta, guarda la fecha hora den que el GPS dió la posición anterior
var _TimeVisualizacionAnterior;//Se utiliza en pageCapturaRuta, guarda la fecha hora del punto que se visualiza en la captura de ruta
var _frecuenciaDeCaptura=3;//Se utiliza en pageCapturaRuta, frecuencia en segundos de proceso de coordenadas GPS
var _mapaCapturaRuta;
var _esperaAlarma= 60;//
var _TimeEspera;
var _ListaRutasLocal;//Se utiliza en pageListaRuta, guarda la lista de rutas pendientes de envío
var _ListaRutasLocalEliminar;//Se utiliza en pageListaRuta, guarda la lista de idRutas seleccionados para eliminar

var _RutaCapturaEdicion;

var _RutaEnvio;
var _IdRutaFicha;
//-----------------------------------------------------------------------------
// Consulta Rutas
//-----------------------------------------------------------------------------
var _ListaRutasConsulta; //Se utiliza para guardar los resultados de la búsqueda


var _TelefonoAT;

var _origenFichaRuta;
var _origenEntradaKm;

var _tempCampoTexto;
var _tempTituloTexto;


var _tempFichaRuta_IdRuta=null;

var _opacidad30 = {'opacity': '.3 !important'};
var _filtro30 = {'filter': 'Alpha(Opacity=30) !important'};

var _opacidad100 = {'opacity': '1 !important'};
var _filtro100 = {'filter': 'Alpha(Opacity=100) !important'};

var _lenguajeMapa="es-ES";
var _claveMapa="AIzaSyCMB0TkKqcaa0eKRvBsaoYi9RGN2vjRvYA";

var _cambioSlider;
var _ListaPuntosRutaEditar;
var _mapaEditar;
var _ListaPuntosTemp= new Array();
var _ListaMarcadoresTemp = new Array();
var textoXML = "";
var tituloXML = "";

/* Muestra un PDF del directorio PDF según idioma */
function paginaInfoPDF(idioma,fichero){
    switch(fichero)
    {
        case 'Ciprofloxacino.pdf':
            try
            {
                /*
                alert("window.open(" + encodeURI('content/' + idioma + '/PDF/' + fichero) + ", '_blank','location=no, menubar=yes, titlebar=yes')");
                window.open(encodeURI('content/' + idioma + '/PDF/' + fichero), '_blank','location=no, menubar=yes, titlebar=yes');
                */
                var fic =  "infCateter/" + fichero;
                alert(" winjdow.plugins.fileOpener.open('" + fic + "')");
                window.plugins.fileOpener.open(fic);

                /*cordova.plugins.FileOpener.openFile(fic, function(data){alert('ok');} , function(e){ alert('error');})*/
            }
            catch(ex)
            {
                alert('error : ' + ex.message);
            }
            break;

        case 'Gentamicina.pdf':
            try
            {

                var fic = encodeURI('../../content/' + idioma + '/PDF/' + fichero);
alert(fic);
                copyDoc4('content/' + idioma + '/PDF/' , fichero );

                //alert(" window.plugins.fileOpener.open('" + fichero + "')");

                //window.plugins.fileOpener.open(fichero);

                /*cordova.plugins.fileopener.open(fic);*/

/*                alert("window.open(" + fic + ", '_top','location=yes, menubar=yes, titlebar=yes')");
                window.open(fic, '_top','location=yes, menubar=yes, titlebar=yes');*/
            }
            catch(ex)
            {
                alert('error : ' + ex.message);
            }
            break;

        case 'Paracetamol.pdf':
            try
            {
                var fic = getPath() + 'content/' + idioma + '/PDF/' + fichero;

                copyDoc3('content/' + idioma + '/PDF/' , fichero );

/*                alert(" window.plugins.fileOpener.open('" + fic + "')");
                window.plugins.fileOpener.open(fic);*/

                /*cordova.plugins.fileOpener.open(fic);*/

                //alert("window.cordova.plugins.FileOpener.openFile.open(" + fic + ", function(e){ alert('error')} , function(data){ alert('ok')})");
                //window.cordova.plugins.FileOpener.openFile.open(fic, function(e){ alert('error')} , function(data){ alert('ok')});
                //window.plugins.fileOpener.open(getPath() + 'content/' + idioma + '/PDF/' + fichero , onSuccess, onError);
                //window.open(encodeURI(getPath() + 'content/' + idioma + '/PDF/') + fichero, '_top','location=yes, menubar=yes, titlebar=yes');
            }
            catch(ex)
            {
                alert('error : ' + ex.message);
            }
            break;
    }

}

/* Muestra el texto XML a partir de Textes.xml */
function inicioPaginaInfoXML() {
    $('#divTituloXML').html(tituloXML);
    $('#divInfoXML').html(textoXML);
}

/* Lee el texto XML de Textes.xml según idioma */
function paginaInfoTXT(idioma,id, titulo){
    leeXML(idioma , "Textes.xml");

    try
    {
        $(xmlFic).find('menu').each(function () {
            $(this).find('itemMenu').each(function () {
                if(id == $(this).attr('id')) {
                    tituloXML = titulo;
                    textoXML = $(this).find('txt').text();
                    abrirPagina("pageInfoXML",false,'');
                }
            });
        });

    }
    catch(ex)
    {
        alert(ex.message);
    }
}

function paginaFiltroFichas(idioma,id, titulo) {
    abrirPagina("pageFiltro",false,titulo);
}

function inicioPaginaFiltro(titulo) {
    $('#divTituloFiltro').html(titulo);
    $("#ulFichas").empty();
}

function listaPDF(ficsPDF){
    alert('fics : ' + ficsPDF.length);
}

function filtroFichas(idioma){
    var items="";
    var nomFarmaco = "";
    var fic = "";
    var sFiltro = $("#inputFiltro").val().toUpperCase();

    $("#ulFichas").empty();

    leeXML(idioma,'Farmacos.xml');
    try
    {
        $(xmlFic).find('farmacos').each(function () {
            $(this).find('farmaco').each(function () {
                nomFarmaco = $(this).attr('nom').toUpperCase();
                if(nomFarmaco.indexOf(sFiltro) != -1) {
                    fic = $(this).find('fic').text();
                    items += "<li><a href='#' style='text-decoration:none;' onclick=\"paginaInfoPDF('" + idioma + "','" + fic + "')\" >" + nomFarmaco + "</a></li>";
                }
            });
        });

        $("#ulFichas").append(items).listview('refresh');

    }
    catch(ex)
    {
        alert(ex.message);
    }

/*    //Buscar fichas que cumplan el filtro
    var sFiltro = $("#inputFiltro").val();

    items += "<li><a href='#'>CIPROFLOXACINO 2 MG/ML</li></a>";
    items += "<li><a href='#'>GENTAMICINA 5 MG/ML</a></li>";
    items += "<li><a href='#'>PARACETAMOL 1 GR</a></li>";
    items += "<li><a href='#'>ASPIRINA 500 MG</a></li>";
    items += "<li><a href='#'>DAUNORRUBICINA LIPOSOMAL</a></li>";

    //Crear el listview
    $("#ulFichas").append(items).listview('refresh');*/
}

function inicioPaginaAyuda(titulo) {
    $('#divTituloAyuda').html(titulo);
    $("#iconoAyuda").attr("class","ui-btn ui-corner-all ui-icon-comment ui-btn-icon-notext");
}

function inicioPaginaInfo(titulo) {
    $('#divTituloInfo').html(titulo);
    $("#iconoInfo").attr("class","ui-btn ui-corner-all ui-icon-info ui-btn-icon-notext");
}

function volverInicio(sPag, id, titulo){
    javascript:navLIFO=[];
    abrirPagina(sPag, id, titulo );
    $("#pageMenuLateral").panel("close");
}

function cargaPaginaInfoCateter(idioma, idPadreSel) {
    var menu = leeXML(idioma,'menu.xml');
    var img = "";
    var id, idPadre,idPadreAnt,titol, tieneLink, nivel, nivelAnt, esPadre;
    var bPrimero = true;
    var nCierres = 0;
    var contenido = "";
    var sFiltro = "";
    var sItem = "";
    idPadreAnt = -1;
    nivelAnt = 0;

    $("#ulMenu").empty();

    try
    {
        $(xmlFic).find('menu').each(function () {
            $(this).find('itemMenu').each(function () {
                idPadre = $(this).find('idPadre').text();

                if (idPadre == idPadreSel) {
                    sItem = "";
                    id = $(this).attr('id');
                    titol = $(this).find('titol').text();
                    tieneLink = $(this).find('ficAsociado').text();
                    nivel = $(this).find('nivel').text();
                    esPadre = $(this).find('esPadre').text();
                    img = "";

                    if(esPadre==1) {
                        if(idPadre==0)
                            img = "<img src='images/seccion.png' onclick=\"abrirPagina('pageMENU','" + id + "','" + titol + "')\">";
                        else
                            img = "<img src='images/desplega.png' onclick=\"abrirPagina('pageMENU','" + id + "','" + titol + "')\">";

                        sItem += "<li>";
                        sItem += "<div style='width: 100%; height:100%;  vertical-align: middle;'>";
                        sItem += "<table width='100%' height='100%'><tr><td style='width: 5%; vertical-align: middle; text-align: left;'>";
                        sItem += img;
                        sItem += "</td><td style='width: 95%; vertical-align: middle;'>";
                        sItem += "<a href='#' style='text-decoration:none;' onclick=\"abrirPagina('pageMENU','" + id + "','" + titol + "')\">";
                        sItem += "<font style='white-space:normal;'>";
                        sItem += titol;
                        sItem += "</font></a></td></tr></table></div></li>";

/*
                        $('#pageMENU').bind('pageinit', function() {
                            $('#ulMenu').listview('refresh');
                        });
*/

                        $("#ulMenu").append(sItem).listview('refresh');

                        //$("#ulMenu").append("<li><a href='#' style='text-decoration:none;' onclick=\"abrirPagina('pageMENU','" + id + "','" + titol + "')\">" + img + "<font style='white-space:normal;'>" + titol + "</font></a></li>").listview('refresh');
                    }
                    else
                    {
                        switch(tieneLink){
                            case 'TXT':  //link a un Texto de Textes.xml
                                img = "<img src='images/text.png' onclick=\"paginaInfoTXT('" + idioma + "','" + id + "','" + titol + "')\">";
                                sItem += "<li>";
                                sItem += "<div style='width: 100%; height:100%;  vertical-align: middle;'>";
                                sItem += "<table width='100%' height='100%'><tr><td style='width: 5%; vertical-align: middle; text-align: left;'>";
                                sItem += img;
                                sItem += "</td><td style='width: 95%; vertical-align: middle;'>";
                                sItem += "<a href='#' style='text-decoration:none;' onclick=\"paginaInfoTXT('" + idioma + "','" + id + "','" + titol + "')\"> ";
                                sItem += "<font style='white-space:normal;'>";
                                sItem += titol;
                                sItem += "</font></a></td></tr></table></div></li>";
                                $("#ulMenu").append(sItem).listview('refresh');
                                //$("#ulMenu").append("<li><a href='#' style='text-decoration:none;' onclick=\"paginaInfoTXT('" + idioma + "','" + id + "','" + titol + "')\"> " + img + "<font style='white-space:normal;'>" + titol + "</font></a></li>").listview('refresh');
                                break;

                            case '':  //no hay link, es sólo para leer
                                img = "<img src='images/itemFinal.png'>";
                                sItem += "<li>";
                                sItem += "<div style='width: 100%; height:100%;  vertical-align: middle;'>";
                                sItem += "<table width='100%' height='100%'><tr><td style='width: 5%; vertical-align: middle; text-align: left;'>";
                                sItem += img;
                                sItem += "</td><td style='width: 95%; vertical-align: middle;'>";
                                sItem += "<font style='white-space:normal;'>";
                                sItem += titol;
                                sItem += "</font></td></tr></table></div></li>";
                                $("#ulMenu").append(sItem).listview('refresh');
                                //$("#ulMenu").append("<li>" + img + "<font style='white-space:normal;'>" + titol + "</font></li>").listview('refresh');
                                break;

                            case 'FILTRO':  //Buscador de fichas
                                img = "<img src='images/lupa.png' onclick=\"paginaFiltroFichas('" + idioma + "','" + id + "','" + titol + "')\">";
                                sItem += "<li>";
                                sItem += "<div style='width: 100%; height:100%;  vertical-align: middle;'>";
                                sItem += "<table width='100%' height='100%'><tr><td style='width: 5%; vertical-align: middle; text-align: left;'>";
                                sItem += img;
                                sItem += "</td><td style='width: 95%; vertical-align: middle;'>";
                                sItem += "<a href='#' style='text-decoration:none;' onclick=\"paginaFiltroFichas('" + idioma + "','" + id + "','" + titol + "')\"> ";
                                sItem += "<font style='white-space:normal;'>";
                                sItem += titol;
                                sItem += "</font></a></td></tr></table></div></li>";
                                $("#ulMenu").append(sItem).listview('refresh');
                                //$("#ulMenu").append("<li><a href='#' style='text-decoration:none;' onclick=\"paginaFiltroFichas('" + idioma + "','" + id + "','" + titol + "')\"> " + img + "<font style='white-space:normal;'>" + titol + "</font></a></li>").listview('refresh');
                                break;

                            default:  //link al fichero PDF especificado
                                img = "<img src='images/pdf.png' onclick=\"paginaInfoPDF('" + idioma + "','" + tieneLink + "')\" >";
                                sItem += "<li>";
                                sItem += "<div style='width: 100%; height:100%;  vertical-align: middle;'>";
                                sItem += "<table width='100%' height='100%'><tr><td style='width: 5%; vertical-align: middle; text-align: left;'>";
                                sItem += img;
                                sItem += "</td><td style='width: 95%; vertical-align: middle;'>";
                                sItem += "<a href='#' style='text-decoration:none;' onclick=\"paginaInfoPDF('" + idioma + "','" + tieneLink + "')\" >";
                                sItem += "<font style='white-space:normal;'>";
                                sItem += titol;
                                sItem += "</font></a></td></tr></table></div></li>";
                                $("#ulMenu").append(sItem).listview('refresh');
                                //$("#ulMenu").append("<li><a href='#' style='text-decoration:none;' onclick=\"paginaInfoPDF('" + idioma + "','" + tieneLink + "')\" >" + img + "<font style='white-space:normal;'>" + titol + "</font></a></li>").listview('refresh');
                                break;
                        }
                    }
                }
            });
        });

    }
    catch(ex)
    {
        alert(ex.message);
    }

}





let countTab = 0;
let idCodeArea = '';
let idCode3D = '';
let TitleCompiled = '';
editors = []
    //Estilos Consola
var Consola = CodeMirror.fromTextArea(consola, {
    lineNumbers: true,
    theme: "ayu-dark"
});
Consola.setSize(null, 100);

//Estilos Errores
var Errores = CodeMirror.fromTextArea(errores, {
    lineNumbers: true,
    theme: "darcula"
});
Errores.setSize(null, 100);

//Estilos Reporte
var Reporte = CodeMirror.fromTextArea(reporte, {
    lineNumbers: true,
    theme: "nord"
});
Reporte.setSize(null, 100);

//Estilos Editor
function addStyleArea(TextArea, content, idCodeArea) {
    var editor = CodeMirror.fromTextArea(TextArea, {
        lineNumbers: true,
        theme: "mdn-like"
    });
    editor.setSize(null, 370);
    editor.setValue(content)
    let editorA = {
        id: idCodeArea,
        meditor: editor
    }
    editors.push(editorA);
}

//Agregar Nueva Tab
function addNewTab(tabName, content) {

    countTab = countTab + 1;
    $('#myTab').append(`
    <li class="nav-item">
        <a class="nav-link py-1 text-dark" id="${countTab}" data-toggle="tab" href="#tabPane${countTab}" role="tab"
            aria-controls="tabPane${countTab}">${tabName} <span class="close ml-1">&times;</span>
        </a>
   </li>
    `)

    $('#tabPanels').append(`
    <div class="tab-pane  fade show active" id="tabPane${countTab}" role="tabpanel" aria-labelledby="home-tab">
        <div class="row">
            <div class="col-7  ">
                <textarea name="codeArea${countTab}" id="codeArea${countTab}" ></textarea>
            </div>
            <div class="col-5 ">
                <textarea name="c3d${countTab}" id="c3d${countTab}" ></textarea>
            </div>
        </div>
   </div>
    
     `)

    let codeArea = document.getElementById('codeArea' + countTab);
    let c3dArea = document.getElementById('c3d' + countTab);
    idCodeArea = 'codeArea' + countTab;
    idCode3D = 'c3d' + countTab;
    addStyleArea(codeArea, content, idCodeArea);
    addStyleArea(c3dArea, "", idCode3D);
    return countTab;
}

//CerrarTab
$(".nav-tabs").on("click", "span", function() {
    var tab = $(this).parent();
    $(tab.attr("href")).remove();
    tab.tab('dispose');
    tab.remove();
});


//Creando un Nuevo Archivo
$('#btnCrear').on('click', function(e) {

    e.preventDefault()
    let title = $('#txtTitulo').val();
    $('#txtTitulo').val('');
    $('#exampleModal').modal('hide')
    addNewTab(title, "");
    if (countTab == 1) {
        $('div').remove('#zero');
    }
    $("#" + countTab).tab('show');
    TitleCompiled = title;
})



//Cargar Archivo
const inputFile = document.querySelector('input[type="file"]');
inputFile.addEventListener('change', function(e) {

    title = inputFile.files[0]['name'];
    const reader = new FileReader();
    reader.onload = function() {
        addNewTab(title, reader.result);
        if (countTab == 1) {
            $('div').remove('#zero');
        }
        $("#" + countTab).tab('show');

        console.log(reader.result);
    }

    reader.readAsText(inputFile.files[0])
    TitleCompiled = title;

}, false)


//TODO: Compilar
$('#btnCompilar').on('click', function(e) {

    e.preventDefault()
    $('#CompileFile').text('Archivo Compilado: ' + TitleCompiled);
    let codeArea = editors.find(editor => editor.id == idCodeArea);
    let code3DArea = editors.find(editor => editor.id == idCode3D);

    // console.log('ID TextArea: ' + idCodeArea);
    // console.log('Title Text: ' + TitleCompiled);
    // console.log(editors)
    console.log(codeArea.meditor.getValue())
    console.log(code3DArea.meditor.getValue())


    // code3DArea.meditor.setValue('ddddd')

    $.ajax({
        url: '/compilar',
        method: 'POST',
        data: {
            code: codeArea.meditor.getValue()
        },
        success: function(res) {
            console.log(res);
            code3DArea.meditor.setValue(res.code3D);
            Consola.setValue(res.Console);
            Errores.setValue(res.Errores);
            Reporte.setValue(res.Reportes);
        }
    })




})






//Foco de la Tab seleccionada
$('#myTab').on('click', '.nav-link', function(e) {
    e.preventDefault()
    let name = $(this).text().split(' ')
    idCodeArea = 'codeArea' + this.id;
    idCode3D = 'c3d' + this.id;

    TitleCompiled = name[0];


})
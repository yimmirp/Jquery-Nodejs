

function addStyleArea(TextArea) {

    CodeMirror.fromTextArea(TextArea, {
        lineNumbers: true,
        theme: "mdn-like"

    });
}

countTab = 0;
// var Tabs = [
//     {
//         id: 1,
//         tabName: "Untitled-1",
//     }
// ]


// if (countTab > 0) {

//     Tabs.forEach((tab) => {

//         $('#myTab').append(`
//         <li class="nav-item ">
//         <a class="nav-link py-1 text-dark " id="${tab.id}" data-toggle="tab" href="#tabPane${tab.id}" role="tab"
//             aria-controls="tabPane${tab.id}" >${tab.tabName} <span class="close ml-1">&times;</span>

//         </a>
//        </li>
//         `)

//         $('#tabPanels').append(`
//         <div class="tab-pane border" id="tabPane${tab.id}" role="tabpanel" aria-labelledby="home-tab">
//         <div class="row">
//             <div class="col-7  pr-0">
//                 <textarea name="codeArea${tab.id}" id="codeArea${tab.id}" cols="30" rows="10"></textarea>
//             </div>
//             <div class="col-5 pl-0">
//                 <textarea name="c3d${tab.id}" id="c3d${tab.id}" cols="30" rows="10"></textarea>
//             </div>
//         </div>


//        </div>

//          `)

//         let codeArea = document.getElementById('codeArea' + tab.id);
//         let c3dArea = document.getElementById('c3d' + tab.id);

//         addStyleArea(codeArea);
//         addStyleArea(c3dArea);


//     })


// } else {

//     $('#AreaCode').append(`
//     <div class="row justify-content-center mt-5 pt-5">
//     <div class="col-8 mt-5 pt-5 ">
//     <h1>Carge un archivo o cree uno nuevo</h1>    

//     </div>
//     </div>
//     `)


// }

function addNewTab(tabName) {

    countTab = countTab + 1;
    $('#myTab').append(`
    <li class="nav-item ">
    <a class="nav-link py-1 text-dark " id="${countTab}" data-toggle="tab" href="#tabPane${countTab}" role="tab"
        aria-controls="tabPane${countTab}" >${tabName} <span class="close ml-1">&times;</span>
    
    </a>
   </li>
    `)

    $('#tabPanels').append(`
    <div class="tab-pane border" id="tabPane${countTab}" role="tabpanel" aria-labelledby="home-tab">
    <div class="row">
        <div class="col-7  pr-0">
            <textarea name="codeArea${countTab}" id="codeArea${countTab}" cols="30" rows="10"></textarea>
        </div>
        <div class="col-5 pl-0">
            <textarea name="c3d${countTab}" id="c3d${countTab}" cols="30" rows="10"></textarea>
        </div>
    </div>
   
   
   </div>
    
     `)


    let codeArea = document.getElementById('codeArea' + countTab);
    let c3dArea = document.getElementById('c3d' + countTab);

    addStyleArea(codeArea);
    addStyleArea(c3dArea);
}


$(".nav-tabs").on("click", "span", function () {
    var tab = $(this).parent();
    $(tab.attr("href")).remove();
    $("#firstTab-nav").tab('show');
    tab.tab('dispose');
    tab.remove();
});

$('#myTab a').on('click', function (e) {
    e.preventDefault()
    console.log(this)

})


$('#btnCrear').on('click', function (e) {

    e.preventDefault()
    let title = $('#txtTitulo').val();
    console.log(title)
    $('#txtTitulo').val('');
    $('#exampleModal').modal('hide')
    addNewTab(title);
    if (countTab == 1) {
        $('div').remove('#zero');
    }
    $("#" + countTab).tab('show');

})






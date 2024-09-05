// 
function switchTab(index) {
    var tabsP = document.getElementById("tabs")
    if (tabsP.children.item(index).className.includes("active")) {
        return
    }
    for (const child of tabsP.children) {
        child.className = 'tb'
    }
    tabsP.children.item(index).className += " active"

    var dshtb = document.getElementById("dshb")
    var tltb = document.getElementById("tln")
    var rltb = document.getElementById("rls")
    var sttb = document.getElementById("stt")

    switch (index) {
        case 0:
            dshtb.className = "dshbrd"
            tltb.className = " hd"
            rltb.className = " hd"
            sttb.className = " hd"
            break;
        case 1:
            tltb.className = "tlbrd"
            dshtb.className = " hd"
            rltb.className = " hd"
            sttb.className = " hd"
            break;
        case 2:
            rltb.className ="rlsbrd"
            tltb.className = " hd"
            dshtb.className = " hd"
            sttb.className = " hd"
            break;
        case 3:
            sttb.className = "sttbrd"
            tltb.className = " hd"
            rltb.className = " hd"
            dshtb.className = " hd"
            break;
        default:
            break;
    }
}

function timelineForm(){
    var form = document.getElementById("tlform")
    var btn = document.getElementById("tlformbt")
    
    if (form.className.includes("hd")) {
        form.className = " "
        btn.className += " hd"
    }
}

function timelineFormClose(){
    var form = document.getElementById("tlform")
    var btn = document.getElementById("tlformbt")
    
    btn.className = "btnb"
    form.className = "hd"
}

function propToggle(id) {
    var idv = ""
    if (id === 0) {
        idv = "props"
    } else {
        idv = "props1"
    }
    var itms = document.getElementsByClassName("itemtl")
    for (let index = 0; index < itms.length; index++) {
        itms.item(index).className = "itemtl"    
    }
    var props = document.getElementById(idv)
    props.className = "props hd"
}

function timelineSelect(id, ref=false){
    var clnm = ""
    if (ref) {
        clnm = "props1"
    }else{
        clnm = "props"
    }
    var props = document.getElementById(clnm)
    var itms = document.getElementsByClassName("itemtl")
    var title = ""
    var category = ""
    var date = null

    for (let index = 0; index < itms.length; index++) {
        if(itms.item(index).getAttribute("data-id") === id){
            itms.item(index).className = "itemtl selected"
            title = itms.item(index).getAttribute("data-title")
            category = itms.item(index).getAttribute("data-category")
            date = itms.item(index).getAttribute("data-date")
        }else{
            itms.item(index).className = "itemtl"
        }

    }

    var tl = props.getElementsByClassName("tlwrd")
    var ct = props.getElementsByClassName("ctgwht")
    var cl = props.getElementsByClassName("col1")
    tl.item(0).innerHTML = title
    ct.item(0).innerHTML = category
    cl.item(0).children.item(1).innerHTML = date
    props.className = "props"
}

function nextRelease(index, id) {
    switchTab(index)
    timelineSelect(id, true)
}
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
        form.className = ""
        btn.className += " hd"
    }
}
var flag = 0;
//var index:number=0;
function onFormSubmit() {
    if (flag === 0) {
        storeData();
    }
    else {
        update();
    }
    resetForm();
}
function storeData() {
    var formdata = (JSON.parse(localStorage.getItem("formdata")) ||
        []);
    formdata.push({
        tid: document.getElementById("taskid").value,
        name: document.getElementById("taskname").value,
        status: document.getElementById("status").value,
        stime: document.getElementById("starttime").value,
        etime: document.getElementById("endtime").value
    });
    localStorage.setItem("formdata", JSON.stringify(formdata));
    deleteTable();
    generateTable();
}
if (typeof window !== "undefined")
    window.onload = function () { return generateTable(); };
function deleteTable() {
    var tasktbl = document.getElementById("taskTable");
    if (tasktbl)
        tasktbl.remove();
}
function generateTable() {
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "taskTable");
    var tblBody = document.createElement("tbody");
    // creates a table row
    var row = document.createElement("tr");
    // creating all header cells
    var h1 = document.createElement("th");
    var c1 = document.createTextNode("Task ID");
    h1.appendChild(c1);
    h1.addEventListener("click", function () { sortTable(0); });
    row.appendChild(h1);
    //h1.onclick=()=>function sortTable(0);
    var h2 = document.createElement("th");
    var c2 = document.createTextNode("Task Name");
    h2.appendChild(c2);
    h2.addEventListener("click", function () { sortTable(1); });
    row.appendChild(h2);
    var h3 = document.createElement("th");
    var c3 = document.createTextNode("Status");
    h3.appendChild(c3);
    h3.addEventListener("click", function () { sortTable(2); });
    row.appendChild(h3);
    var h4 = document.createElement("th");
    var c4 = document.createTextNode("Start Time");
    h4.appendChild(c4);
    row.appendChild(h4);
    var h5 = document.createElement("th");
    var c5 = document.createTextNode("End Time");
    h5.appendChild(c5);
    row.appendChild(h5);
    var h6 = document.createElement("th");
    var c6 = document.createTextNode("Edit");
    h6.appendChild(c6);
    row.appendChild(h6);
    var h7 = document.createElement("th");
    var c7 = document.createTextNode("Delete");
    h7.appendChild(c7);
    row.appendChild(h7);
    // add the row to the end of the table body
    tblBody.appendChild(row);
    var td = localStorage.getItem("formdata");
    if (td !== null) {
        var data = JSON.parse(td);
        var tid = tbl.getAttribute("id");
        for (var i = 0; i < data.length; i++) {
            var row2 = document.createElement("tr");
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell1 = document.createElement("td");
            var cellText1 = document.createTextNode(data[i].tid);
            cell1.appendChild(cellText1);
            row2.appendChild(cell1);
            var cell2 = document.createElement("td");
            var cellText2 = document.createTextNode(data[i].name);
            cell2.appendChild(cellText2);
            row2.appendChild(cell2);
            var cell3 = document.createElement("td");
            var cellText3 = document.createTextNode(data[i].status);
            cell3.appendChild(cellText3);
            row2.appendChild(cell3);
            var cell4 = document.createElement("td");
            var cellText4 = document.createTextNode(data[i].stime);
            cell4.appendChild(cellText4);
            row2.appendChild(cell4);
            var cell5 = document.createElement("td");
            var cellText5 = document.createTextNode(data[i].etime);
            cell5.appendChild(cellText5);
            row2.appendChild(cell5);
            var cell6 = document.createElement("button");
            cell6.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            cell6.setAttribute("align", "center");
            cell6.addEventListener("click", editRecord);
            row2.appendChild(cell6);
            var cell7 = document.createElement("button");
            cell7.innerHTML = '<i class="fa-solid fa-trash"></i>';
            cell7.setAttribute("align", "center");
            cell7.addEventListener("click", removeRecord);
            row2.appendChild(cell7);
            tblBody.appendChild(row2);
        }
    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
    tbl.setAttribute("align", "center");
}
function removeRecord() {
    var selectedRow = this.parentNode;
    console.log(selectedRow.rowIndex);
    if (confirm("Are you sure want to delete this record?")) {
        var td = localStorage.getItem("formdata");
        if (td !== null) {
            var tarr = JSON.parse(td);
            var o = document.getElementById("taskTable");
            if (o !== null) {
                o.deleteRow(selectedRow.rowIndex);
                tarr.splice((selectedRow.rowIndex - 1), 1);
                console.log("Array after deleting this record: " + tarr);
                localStorage.setItem("formdata", JSON.stringify(tarr));
            }
        }
        if (typeof window !== "undefined")
            window.location.reload();
    }
    resetForm();
}
function resetForm() {
    document.getElementById("taskid").value = "";
    document.getElementById("taskname").value = "";
    document.getElementById("status").value = "";
    document.getElementById("starttime").value = "";
    document.getElementById("endtime").value = "";
}
function editRecord() {
    var selectedRow = this.parentNode;
    document.getElementById("taskid").value =
        selectedRow.cells[0].innerHTML;
    document.getElementById("taskname").value =
        selectedRow.cells[1].innerHTML;
    document.getElementById("status").value =
        selectedRow.cells[2].innerHTML;
    document.getElementById("starttime").value =
        selectedRow.cells[3].innerHTML;
    document.getElementById("endtime").value =
        selectedRow.cells[4].innerHTML;
    flag = 1;
}
function update() {
    var taskid = document.getElementById("taskid").value;
    var tarr = JSON.parse(localStorage.getItem("formdata"));
    var rowIndex = 0;
    var temparr = [];
    for (var i = 0; i < tarr.length; i++) {
        temparr += tarr[i].tid;
        if (temparr.includes(taskid)) {
            rowIndex = i;
            break;
        }
    }
    tarr.splice(rowIndex, 1);
    tarr.push({
        tid: document.getElementById("taskid").value,
        name: document.getElementById("taskname").value,
        status: document.getElementById("status").value,
        stime: document.getElementById("starttime").value,
        etime: document.getElementById("endtime").value
    });
    localStorage.setItem("formdata", JSON.stringify(tarr));
    // generateTable();
    if (typeof window !== "undefined")
        window.location.reload();
}
function sortTable(n) {
    var shouldSwitch = true;
    var i;
    var switchcount = 0;
    var table = document.getElementById("taskTable");
    var switching = true;
    //Set the sorting direction to ascending:
    var dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        var rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            var x = rows[i].getElementsByTagName("TD")[n];
            var y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            if (rows[i].parentNode !== null) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount++;
            }
        }
        else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
function searchTableColumns() {
    var table = document.getElementById("taskTable");
    var filter, tr, td, i, j, count_td;
    var column_length = (table.rows[0]).cells.length;
    var input = document.getElementById("searchbtn");
    if (input !== null) {
        filter = (input.value).toUpperCase();
        console.log("Searched keyword is: " + filter);
    }
    if (table !== null) {
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            count_td = 0;
            for (j = 0; j < column_length - 1; j++) {
                td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        count_td++;
                    }
                }
            }
            if (count_td > 0) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}

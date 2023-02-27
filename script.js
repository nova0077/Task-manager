const addBtn = document.getElementById('add-task');
const taskDescription = document.getElementById('task-description')
const recordsDisplay = document.getElementById('records');
const btn_name = document.getElementById('add-task'); 
let prev = btn_name.innerText;

let arr = [];
let edit_id = null;
let obj = localStorage.getItem('tasks');
if(obj != null)
    arr = JSON.parse(obj);
displayinfo(arr);

addBtn.onclick=()=>{
    const task = taskDescription.value; 
    if(edit_id != null)
    {
        // edit
        arr.splice(edit_id,1,{'name':task});
        edit_id = null;
        btn_name.innerText=prev;
    }
    else
    {
        // insert
        arr.push({'name':task}); 
    }  
    saveinfo(arr);
    taskDescription.value='';
}

function saveinfo(arr){
    let str = JSON.stringify(arr);
    localStorage.setItem('tasks',str);
    displayinfo();
}

function displayinfo(){
    let statment=' ';
    arr.forEach((task,i) => {
        statment+=`<tr>
        <th class="ind-no" scope="row">${i+1} </th>
        <td>${task.name}  </td>
        <td class="action">
            <i class="btn text-white fa fa-edit btn-info" style="font-size:14px" onclick='editinfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash-o" style="font-size:14px" onclick='deleteinfo(${i})'></i>
        </td>
      </tr>`
    });
    recordsDisplay.innerHTML=statment;
}

function editinfo(id){
    edit_id = id;
    taskDescription.value = arr[id].name;
    btn_name.innerText = "save";
}

function deleteinfo(id){
    arr.splice(id,1);
    saveinfo(arr);
}
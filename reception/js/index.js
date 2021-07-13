function callback(data) {
    console.log(data); 
    let arr = data.map((item) => {
        return(`
        <li _id="${item._id}">
        <label>
            <input type="checkbox" ${item.isDone ? 'checked' : ''}/>
            <span class="${item.isDone ? 'active' : ''}">${item.todoListName}</span>
        </label>
        <button class="btn btn-danger" style="display:none">删除</button>
        </li>
        `)
    })
    arr = arr.join('')
    const todoMain = document.querySelector('.todo-main')
    todoMain.innerHTML = arr

    const checkAll = document.querySelector('.todo-footer input')
    const numSpan = document.querySelector('#num')
    const sumSpan = document.querySelector('#sum')
    const num = data.filter((item) => item.isDone).length
    const sum = data.length
    checkAll.checked = num === sum
    numSpan.textContent = num
    sumSpan.textContent = sum
}


const script = document.createElement('script');
script.src = 'http://127.0.0.1:5000/todoData?callback=callback';
document.body.appendChild(script);

const todo = document.querySelector('.todo-header input')
todo.onkeydown = async function(e){
    if(e.keyCode === 13){
        const value = this.value
        const ruselt = await myAjax({
            url:'http://127.0.0.1:5000/addData',
            type:'post',
            data:{
                todoListName:value
            }
        })
        callback(ruselt)
        todo.value = ''
    }
}

const todoMain = document.querySelector('.todo-main')
console.log(todoMain);

todoMain.onmouseover = function(e){
    // e.target.lastElementChild.style.display = 'block'
    if(e.target.tagName === 'LI'){
        e.target.lastElementChild.style.display = 'block'
    }
    if(e.target.tagName === 'BUTTON'){
        e.target.style.display = 'block'
    }
}
todoMain.onmouseout = function(e){
    // e.target.lastElementChild.style.display = 'block'
    if(e.target.tagName === 'LI'){
        e.target.lastElementChild.style.display = 'none'
    }
    if(e.target.tagName === 'BUTTON'){
        e.target.style.display = 'none'
    }
}

todoMain.onclick = async function(e){
    if(e.target.tagName === 'BUTTON'){
        const arr = [e.target.parentNode.getAttribute('_id')]
        console.log(arr);
        const a = await myAjax({
            url:'http://127.0.0.1:5000/deleteAllData',
            type:'post',
            data:{
                ids:arr
            }
        })
        callback(a)
        

        // 
    }
}


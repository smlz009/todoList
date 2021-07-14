function render(data){
    if(data.length){
        document.querySelector('.todo-main').style.display = 'block'
        document.querySelector('.todo-footer').style.display = 'block'
        document.querySelector('.tip').style.display = 'none'

    }else{
        document.querySelector('.todo-main').style.display = 'none'
        document.querySelector('.todo-footer').style.display = 'none'
        document.querySelector('.tip').style.display = 'block'
    }
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

function callback(data) {
    render(data)
}


const script = document.createElement('script');
script.src = 'http://127.0.0.1:5000/todoData?callback=callback';
document.body.appendChild(script);

const todo = document.querySelector('.todo-header input')
todo.onkeydown = async function(e){
    if(e.keyCode === 13){
        const value = this.value.trim()
        if(!value) return
        const ruselt = await myAjax({
            url:'http://127.0.0.1:5000/addData',
            type:'post',
            data:{
                todoListName:value
            }
        })
        render(ruselt)
        todo.value = ''
    }
}

const todoMain = document.querySelector('.todo-main')

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
        let arr = [e.target.parentNode.getAttribute('_id')]
        arr = JSON.stringify(arr)
        const result = await myAjax({
            url:'http://127.0.0.1:5000/deleteAllData',
            type:'post',
            data:{
                ids:arr
            }
        })
        callback(result)
        // 
    }
    if(e.target.tagName === 'INPUT'){
        const status = e.target.checked;
        const id = e.target.parentNode.parentNode.getAttribute('_id')
        const result = await myAjax({
            url:'http://127.0.0.1:5000/updateData',
            type:'post',
            data:{
                id,
                isDone:status
            }
        })
        render(result)
    }
}

const todoFooter = document.querySelector('.todo-footer')
todoFooter.onclick = async function(e){
    if(e.target.tagName === 'INPUT'){
        const status = e.target.checked;
        const result = await myAjax({
            url:'http://127.0.0.1:5000/updateAllData',
            type:'post',
            data:{
                isDone:status
            }
        })
        render(result)
    }

    if(e.target.tagName === 'BUTTON'){
        const lis = document.querySelectorAll('.todo-main li'); 
        const chencks = document.querySelectorAll('.todo-main input[checked]')
        console.log(chencks);
        let arr = Array.from(chencks).map((item) => {
            return item.parentNode.parentNode.getAttribute('_id')
        })
        arr = JSON.stringify(arr)
        console.log(arr);
        const result = await myAjax({
            url:'http://127.0.0.1:5000/deleteAllData',
            type:'post',
            data:{
                ids:arr
            }
        })
        render(result)
    }
}


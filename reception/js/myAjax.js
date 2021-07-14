function myAjax(options){
    let {url,type = 'get',data} = options;
    if(!url) return
    console.log(data);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        data = data && newData(data)
        if(type == 'get'){
            url += `?${data}`
            data = null
        }
        xhr.open(type,url)
        if(type == 'post'){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        }
        console.log(data);
        xhr.send(data)

    
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText))
                }else{
                    reject()
                }
            }
        }
    })
}

function newData(data){
    let arr = []
    for (const key in data) {
        arr.push(`${key}=${data[key]}`)
    }
    return arr.join('&')
}



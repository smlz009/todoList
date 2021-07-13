const model = require('../dbs/model')
function find(){
    return model.find()
}
function add(todoListName){
    return model.create({
        todoListName
    })
}
function update(_id,isDone){
    return model.updateOne(
        {_id},{$set:{isDone}}
    )
}

function updateMany(isDone){
    return model.updateMany({},{$set:{isDone}})
}

function delAll(ids){
    return model.deleteMany({_id:{$in:ids}})
}


module.exports = {find,add,update,updateMany,delAll}
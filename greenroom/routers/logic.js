const express = require('express');
const { find,add,update,updateMany,delAll} = require('../dbs/crud')

const router = express.Router()

router.get('/todoData',async(req,res) => {
    const {callback} = req.query
    
    let data  = await find()

    data = JSON.stringify(data)

    res.send(`${callback}(${data})`)
})

router.post('/addData',async(req,res) => {
    const { todoListName } = req.body
    await add(todoListName)
    const result = await find()
    res.send(result)
})

router.post('/updateData',async(req,res) => {
    const { id,isDone } = req.body
    await update(id,isDone)
    const result = await find()
    res.send(result)
})

router.post('/updateAllData',async(req,res) => {
    const {isDone} = req.body
    await updateMany(isDone)
    const result = await find()
    res.send(result)
})

router.post('/deleteAllData',async(req,res) => {
    let {ids} = req.body
    // console.log(ids);
    ids = JSON.parse(ids)

    await delAll(ids)
    const result = await find() 
    res.send(result)
})

module.exports = router
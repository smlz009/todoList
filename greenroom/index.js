(async function(){
    const express = require('express');
    const cors = require('cors')
    const db = require('./dbs/db')
    const router = require('./routers/logic')

    await db

    console.log('数据库连接成功');

    const app = express();

    app.use(express.urlencoded({extended : true}))
    app.use(cors())

    app.use(router)

    app.listen(5000,(err) => {
        if(err) console.log('服务器连接失败');
        else console.log('服务器连接成功');
    })
})()
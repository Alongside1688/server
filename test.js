const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://127.0.0.1:27017/alongside')

const model = db.model('categories',{})

/**
const insertObj = new model({
    name: 'holy',
    age: 21,
    sex: '男'
})

insertObj.save().then(res => {
    console.log(res);
    return res
}).catch(err => {
    console.log('写入失败' + err);
    return false
})
*/

model.find({}).then(res => {
    console.log(res);
},err => {
    console.log(err);
})

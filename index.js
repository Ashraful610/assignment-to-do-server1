const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())

//to-do-user
//bUAW2wU6MGiOoYZO

const uri = "mongodb+srv://to-do-user:bUAW2wU6MGiOoYZO@cluster0.kbsmy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect()
        const taskCollection = client.db('task-stock').collection('task')
        
        // get task data 
        app.get('/task' , async ( req , res) => {
            const query = {}
            const cursor = taskCollection.find(query)
            const task = await cursor.toArray()
            res.send(task)
        })

        //  new task post 
        app.post('/task' , async(req , res) => {
            const task = req.body
            const result = await taskCollection.insertOne(task)
            res.send(result)
        }) 

        // delete a task
        app.delete('/task/:id' , async(req , res)=> {
            const id = req.params.id
            const query = {_id:ObjectId(id)}
            const task = await taskCollection.deleteOne(query)
            res.send(task)
        })

    }
    finally{

    }
}
run().catch(console.dir)



app.get('/' ,(req , res) => {
    res.send(' to do assignment server site is ok')
})

app.listen(port ,() => {
    console.log(' to do  assignment server site is ok')
})
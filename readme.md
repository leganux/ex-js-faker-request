``` txt
                   _             __      _                                                   _   
                  (_)           / _|    | |                                                 | |  
   _____  ________ _ ___ ______| |_ __ _| | _____ _ __ ______ _ __ ___  __ _ _   _  ___  ___| |_ 
  / _ \ \/ /______| / __|______|  _/ _` | |/ / _ \ '__|______| '__/ _ \/ _` | | | |/ _ \/ __| __|
 |  __/>  <       | \__ \      | || (_| |   <  __/ |         | | |  __/ (_| | |_| |  __/\__ \ |_ 
  \___/_/\_\      | |___/      |_| \__,_|_|\_\___|_|         |_|  \___|\__, |\__,_|\___||___/\__|
                 _/ |                                                     | |                    
                |__/                                                      |_|                      
                                                                            v1.0.0 (c) leganux.net 2007-2023 
 ```


# ex-js-faker-request
## A simple way to emulate request in ExpressJS project to get data from inner controller whithout calling rest http (no axios, request or http method) only internal functions

If we have a controller function made using express like this

````javascript

controller.getAllusers = async function(req,res){
    
    let list = await users.find({name:req.body.name, company:req.params.company}).limit(req.query.limit).exec()
    
    res.status(200).json({
        status:200,
        data:list,
        error:'none'
        
    })
}

module.exports = controller

````
Commonly  we use this in a route  like this

````javascript

let {getAllusers} = require('usercontroller.js')

router.post('/getAllusers', getAllusers)

````

But if we have to get the info internal is a litle complex and must of people use axios,  request or another http request but is not very efficient.
To solve this problem we can execute like this


````javascript

//Import library
let {fakeRequestFunction, fakeResponseFunction} = require('ex-js-faker-request')

//Import controller
let {getAllusers} = require('usercontroller.js')

// create the fake req objet as json object


let main = async function (){
    
    let req = {
        body:{name:'erick'},
        params:{company:'leganux'},
        query:{limit:5},
    }

// make the instance of fake functions
    let fakeResUser = new fakeResponseFunction()
    let fakeReqUser = new fakeRequestFunction(req)
    
     await getAllusers(fakeReqUser,fakeResUser)
    
    console.log(fakeResUser.status_)
    /* console:  
    200 
    */
    console.log(fakeResUser.json_)
    /* console: 
    {
        status:200,
        data:[{},{}],
        error:'none'
    } 
    */  
}

main()



````
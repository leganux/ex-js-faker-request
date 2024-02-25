console.info(` 
                   _             __      _                                                   _   
                  (_)           / _|    | |                                                 | |  
   _____  ________ _ ___ ______| |_ __ _| | _____ _ __ ______ _ __ ___  __ _ _   _  ___  ___| |_ 
  / _ \\ \\/ /______| / __|______|  _/ _\` | |/ / _ \\ '__|______| '__/ _ \\/ _\` | | | |/ _ \\/ __| __|
 |  __/>  <       | \\__ \\      | || (_| |   <  __/ |         | | |  __/ (_| | |_| |  __/\\__ \\ |_ 
  \\___/_/\\_\\      | |___/      |_| \\__,_|_|\\_\\___|_|         |_|  \\___|\\__, |\\__,_|\\___||___/\\__|
                 _/ |                                                     | |                    
                |__/                                                      |_|                    
                                                                                           v1.0.0 (c) leganux.net 2007-2023                                                                           
       
       `)

module.exports = {
    /** Función para crear objeto de request falso */
    fakeRequestFunction: function (originalReq) {
        this.body = originalReq.body
        this.user = originalReq.user
        this.params = originalReq.params
        this.query = originalReq.query
        this.headers = originalReq.headers
        this.cookies = originalReq.cookies
    },
    /** Creamos el objeto de la funcion de retorno falsa **/
    fakeResponseFunction: function () {
        this.status_ = 200;
        this.json_ = {};

        this.json = function (resp) {
            this.json_ = resp
            return this
        };
        this.status = function (number) {
            this.status_ = number;
            return this
        };
        this.send = function (text) {
            this.json_ = {text};
            return this
        };
        this.sendFile = function (filePath) {
            this.json_ = {filePath};
            return this
        };
        /** todo render pug to html*/
        this.render = function (filePath) {
            this.json_ = {filePath};
            return this
        };
        this.get = function () {
            return {
                status: this.status_,
                json: this.json_
            }
        }
    }

}
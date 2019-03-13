const {
  MongoClient,
  ObjectId
} = require("mongodb");
const {
  config
} = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

// const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`; // prettier-ignore
const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?ssl=true&authSource=admin&retryWrites=true`


let isDisconnecting = false,
  instance = null

class MongoLib {


  constructor() {
    // console.log(MONGO_URI)
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true
    });
    this.dbName = DB_NAME;


  }

  connect() {

    return new Promise((resolve, reject) => {
      if (!this.client.isConnected()) {
        this.client.connect(error => {
          if (error) {
            reject(error);
          }
          console.log("Connected succesfully to mongo");
          //console.log(instance)
          instance = this.client
          resolve(this.client.db(this.dbName))
        });
        
        this.client.close()
      } else {
        resolve(this.client.db(this.dbName))        
      }
      
    });

  }

  //   disconnect(){  

  //     if (instance && !isDisconnecting){
  //       console.log(isDisconnecting)
  //         isDisconnecting = true;
  //         console.log("Desconectando instancia de Mongo");
  //         return new Promise((resolve, reject)=>{
  //             instance.close((err, result)=>{
  //                 if (err) { reject(err); isDisconnecting=false; return; }
  //                 console.log("Instancia de Mongo desconectada!");
  //                 resolve();
  //             });
  //         })
  //     }
  // }

  getAll(collection, query) {
    console.log(query)
    return this.connect()
      .then(db => {
        let product = db.collection(collection).find(query).toArray();
        return product;
      })
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId)
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({
            _id: ObjectId(id)
          }, {
            $set: data
          }, {
            upsert: true
          });
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({
          _id: ObjectId(id)
        });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
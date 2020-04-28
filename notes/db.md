# DB - mongoDB - mongoose

## **DB connection**

```
const mongoose = require('mongoose')
const DB_URI = process.env.DB_URI

try {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('DB connected'))
    .catch(err => console.error('DB connection error', err))

} catch(err) {
  console.error('Error establishing connection to DB')
  process.exit(1)
}
```

**options**

- useUnfiiedTopology: true, takes care of connecting to the db and reconnection.

</br>

---

## **Model**

The main way for communicating to the db in mongoose is using Models\
Models represents the collections in the db and define the structure of the documents in it.

To create a Model we have to define a schema to represent how to document will look like.

we can create new documents by initializing the model with doc data then .save() to save to db.

```
const mongoose =require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {type: String, require: true, unique: true}
})

const UserModel = mongoose.model('User', UserSchema)

cosnt user1 = new UserModel({name: 'muhamed'})
user1.save()
```

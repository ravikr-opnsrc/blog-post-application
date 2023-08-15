import mongoose from "mongoose";
const CONNECTION_URL = `mongodb+srv://ravikr-opnsrc:mongoDB-%402023@cluster-23.mhpo6nn.mongodb.net/`;
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));

 
 

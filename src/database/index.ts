import mongoose from "mongoose";

export default {
  mongoose,
  connect: (url: string) => {
    mongoose.Promise = Promise;
    mongoose
      .set("strictQuery", true)
      .connect(url)
      .then(() => console.log("connection to database successful"))
      .catch((err) => console.log(err.message));
  },

  disconnect: () => {
    mongoose.disconnect();
  },
};

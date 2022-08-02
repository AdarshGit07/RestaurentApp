const mongoose = require('mongoose');
const db_link='mongodb+srv://foodme:he%40q5arZzmiM6vi@cluster0.oakel4t.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log('Plans db connected');
})
.catch(function(err){
    console.log(err);
})

const planSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: [20, "plan name should not exceed more than 20 characters"],
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "price not entered"],
    },
    ratingsAverage: {
      type: Number,
    },
    discount: {
      type: Number,
      validate: [
        function () {
          return this.discount < 100;
        },
        "dicount should not exceed price",
      ],
    },
});


const planModel = mongoose.model("planModel", planSchema);
// (async function createPlan() {
//   let planObj = {
//     name: "SuperFood10",
//     duration: 30,
//     price: 1000,
//     ratingsAverage: 5,
//     discount: 20,
//   };
//   // let data= await planModel.create(planObj);
//   // console.log(data);
//   const doc = new planModel(planObj);
//   await doc.save();
// })();
// // model
// const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;
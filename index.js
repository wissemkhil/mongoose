const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("could not connect to mongodb", err.message));
//schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createPerson = async () => {
  const person = new Person({
    name: "john doe",
    age: 29,
    favoriteFoods: [ "Lazagne", "Pencake"],
  });
  try {
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

const createPeople = async (people) => {
  try {
    const result = await Person.create(people);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

/*createPeople([
      {
        name: "user 1",
        age: 39,
        favoriteFoods: ["Spageti", "Crepe"],
      },
      {
        name: "user2",
        age: 27,
        favoriteFoods: ["Couscous", "pizza"],
      },
      {
        name: "user3",
        age: 36,
        favoriteFoods: ["Gateau"],
      },
    ]);*/
//model find()
const findPerson = async (person) => {
  try {
    const result = await Person.find({ name: person });
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//findPerson("user1");

// model findone
const findFood = async (food) => {
  try {
    const result = await Person.findOne({ favoriteFoods: food });
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//findFood("Gateau");
//find by id
const findId = async (id) => {
  try {
    const result = await Person.findById({ _id: id });
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//findId("635953c4bc7ac9262497420a");
//Perform Classic Updates
const updateFood = async (id, food) => {
  try {
    const result = await Person.findById({ _id: id });
    result.favoriteFoods.push(food);
    await result.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//updateFood("635953c4bc7ac9262497420a", "hamburger");
// find one and update
const updateAge = async (name, age) => {
  try {
    const result = await Person.findOneAndUpdate(
      { name },
      { age },
      { new: true }
    );
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//updateAge("user3", 39);
// find by id and delete
const deletePerson = async (id) => {
  try {
    const result = await Person.findByIdAndRemove(id);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

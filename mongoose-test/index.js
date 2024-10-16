const mongoose = require('mongoose')
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test')
  const kittySchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: [String]
  })
  
  const Kitten = mongoose.model('Kitten', kittySchema)
  // const guang = new Kitten();
  // guang.name = 'guang';
  // guang.age = 20;

  // await guang.save();

  // const dong = new Kitten();
  // dong.name = 'dong';
  // dong.age = 21;
  // dong.hobbies = ['reading', 'football']

  // await dong.save();

  const kittens = await Kitten.find({
    age: {
      $in: [20, 21]
    }
  });
  console.log(kittens);
}
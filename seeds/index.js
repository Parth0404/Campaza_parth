const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');
const { $where } = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/campaza', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () =>{
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i <50; i++) {
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() * 3000)+1000;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, reprehenderit?',
            price,
    })
    await camp.save();
    }
}
seedDB() .then(() => mongoose.connection.close())
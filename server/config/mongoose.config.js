const mongoose = require('mongoose');
const project = "met_art_db";
 
mongoose.connect(`mongodb://127.0.0.1/${project}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`SUCCESSFULLY CONNECTED TO THE ${project}`))
    .catch(err => console.log(`THERE WAS A PROBLEM CONNECTING TO THE ${project}`, err));

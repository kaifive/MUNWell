require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require ('cors');
const app = express();
const PORT = process.env.PORT || 8080

app.set('port', (process.env.PORT || 8080))

const routes = require('./src/routes/api')

mongoose.connect(process.env.REACT_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB has been connected!!!')
})
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'))
}

app.use('/api', routes);

app.listen(app.get('port'), function () {
    console.log('Node server is running on port ' + app.get('port'));
});
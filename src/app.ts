import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});
import sequelize from './db/context/context';

(
    sequelize.sync()
    .then(()=>{
        console.log('DB connected!');
    })
    .catch(err =>{
        console.log(process.env.DB_USER)
        console.log('Error connect to DB!\nMessage: ' + err.message);
    }));
import App from './base/application'
const dotenv = require("dotenv");
const path = require("path")

// const configPath =
//     process.env.NODE_ENV === 'production' ? path.resolve(process.cwd(), '.env') : path.resolve(process.cwd(), './src/config', '.env')

// console.log(process.env.NODE_ENV)
// console.log(configPath)
// if (dotenv.config({ path: configPath }).error) {
//     throw dotenv.config({ path: configPath }).error
// }
if (dotenv.config().error) {
    throw dotenv.config().error
}
App.start()
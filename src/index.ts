import express,{json} from 'express'
import Auth from './Route/Auth'
import errorHandler from './utils/ErrorHandler'

const app = express()
const port = 3000
app.use(json())
app.use(Auth)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
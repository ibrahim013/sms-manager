import express from 'express';
import bodyParser from 'body-parser';
import route from '../routes/index';

const app = express();
const port = process.env.PORT || 8000;


//  middleware configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use('/api/v1', route);
app.get('/', (req, res) => res.status(200).json({ msg: 'this is a SMS management application' }));

app.listen(port, () => console.log(`server is up and runing on ${port}`));

export default app;

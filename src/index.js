const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const config = require('./config');
const { authentication } = require('./middlewares/authMiddleware');
const setupViewEngine = require('./config/viewEngine');
const initDatabase = require('./config/databaseInit');

const app = express();
setupViewEngine(app);


// Setup the static files
app.use('/static', express.static('src/public'));
app.use(cookieParser());
// Setup the body parser
app.use(express.urlencoded({ extended: false }));
app.use(authentication);
app.use(routes);

initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`)))
    .catch((err) => console.error(err.message));
import cors from 'cors';
import bodyParser from 'body-parser';
import { setup } from '../routes/apiRoute';
import { createError } from '../utils/utils';
import { errorMessage } from "../utils/status"
/**
 * Registers all api routes with the express app.
 * @param  {object} config The app config object
 * @return {Promise}
 */
export default function loadRoutes(app, config) {
  return new Promise((resolve, reject) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/api', setup());
    
    app.use((err, req, res, next) => {
      // handle internal server errors
      if (!err.status) {
        console.log(err);
        err = createError(500, err.message || 'Internal server error');
      }

      res.status(err.status).json({
        status:errorMessage.status,
        message: err.message
      });
    });

    resolve();
  });
}
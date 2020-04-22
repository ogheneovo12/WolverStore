import loadMongo from './loadMongo';
import loadRoutes from './loadRoutes';

/**
 * Executes all loaders. If an error occurs in one, the whole
 * loading process fails.
 * @param  {object} config The app config object
 * @return {Promise}
 */
export default function loadAll(app, config) {
  return Promise.all([
    loadMongo(app, config),
    loadRoutes(app, config)
  ]).then(() => console.log('System resources loaded'));
}
import { Router } from 'express';
import recordRoute from './record.route.js';

const router = Router();

const defaultRoutes = [
  {
    path: '/record',
    route: recordRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

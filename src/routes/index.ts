import { Request, Response, NextFunction, Router } from "express";

const router: Router = Router();

async function indexFn(req: Request, res: Response) {
  res.send({ version: "v1.0.0 ", endpoints: ['/pacientes', '/login'] });
}



router.get('/', indexFn);

export default router;

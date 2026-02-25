import { Request, Response, NextFunction, Router } from "express";

const router: Router = Router();

async function indexFn(req: Request, res: Response) {
  res.send({ resource: "hello world " });
}



router.get('/', indexFn);

export default router;

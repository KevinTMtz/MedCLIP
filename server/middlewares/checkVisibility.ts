import { Request, Response, NextFunction } from 'express';
import IDiagnostic from '../db/interfaces/IDiagnostic';

const checkVisibility = (req: Request, res: Response, next: NextFunction) => {
  const diagnostic: IDiagnostic = res.locals.diagnostic;
  if (diagnostic.getDataValue('public')) next();
  const userId = res.locals.jwt.id;
  if (userId === res.locals.case.userId) next();
  return res;
};

export default checkVisibility;

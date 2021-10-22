import { Request, Response, NextFunction } from 'express';
import IDiagnostic from '../db/interfaces/IDiagnostic';

const checkVisibility = (req: Request, res: Response, next: NextFunction) => {
  const diagnostic: IDiagnostic = res.locals.diagnostic;
  const userId = res.locals.jwt.id;
  if (!diagnostic.getDataValue('isPublic') && userId !== res.locals.case.userId)
    return res
      .status(403)
      .json({ message: 'You can not access this diagnostic' });
  else next();
};

export default checkVisibility;

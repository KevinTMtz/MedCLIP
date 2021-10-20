import { Request, Response, NextFunction } from 'express';
import Case from '../db/models/Case';

const isOwnedBy = (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.jwt.id;
  const caseId = req.params.caseId;
  Case.findOne({ where: { id: caseId } }).then(
    (the_case) => {
      if (!the_case) return res.status(404).json({ message: 'Case not found' });
      if (the_case.getDataValue('userId') === userId) {
        res.locals.case = the_case;
        next();
      } else
        return res.status(403).json({ message: 'You do not own this case' });
    },
    (error) => {
      return res.status(400).json(error);
    },
  );
};

export default isOwnedBy;

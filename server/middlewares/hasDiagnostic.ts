import { Request, Response, NextFunction } from 'express';

import Case from '../db/models/Case';
import Diagnostic from '../db/models/Diagnostic';

const hasDiagnostic = (req: Request, res: Response, next: NextFunction) => {
  const caseId = req.params.caseId;
  Case.findOne({ where: { id: caseId } }).then(
    (case_found) => {
      if (!case_found)
        return res.status(404).json({ message: 'Case not found' });
      const the_case = case_found;
      res.locals.case = case_found;
      const diagnosticId = the_case.getDataValue('diagnosticId');

      if (!diagnosticId) {
        return res
          .status(404)
          .json({ message: 'The case does not have a diagnostic yet' });
      }

      Diagnostic.findOne({ where: { id: diagnosticId } }).then(
        (diagnostic) => {
          res.locals.diagnostic = diagnostic;
          next();
        },
        (error) => {
          return res.status(400).json(error);
        },
      );
    },
    (error) => {
      return res.status(400).json(error);
    },
  );
};

export default hasDiagnostic;

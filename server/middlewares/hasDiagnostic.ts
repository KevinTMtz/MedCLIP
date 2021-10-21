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
      const diagnosticID = the_case.getDataValue('diagnosticId');

      if (!diagnosticID) {
        return res
          .status(404)
          .json({ message: 'The case does not have a diagnostic yet' });
      }

      Diagnostic.findOne({ where: { id: diagnosticID } }).then(
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

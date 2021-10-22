import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

import verifyJWT from '../middlewares/verifyJWT';
import Diagnostic from '../db/models/Diagnostic';
import ICase from '../db/interfaces/ICase';
import isOwnedBy from '../middlewares/isOwnedBy';
import hasDiagnostic from '../middlewares/hasDiagnostic';
import checkVisibility from '../middlewares/checkVisibility';
import IDiagnostic from '../db/interfaces/IDiagnostic';
import Case from '../db/models/Case';

const router = Router();

router.post(
  '/get-all-public',
  body('start').isInt(),
  body('end').isInt(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please provide the number of cases' });
    }
    const { start, end } = req.body;
    Case.findAll({
      include: [
        {
          model: Diagnostic,
          as: 'diagnostic',
          required: true,
        },
      ],
      limit: end - start,
      offset: start,
    }).then(
      (cases) => {
        return res.status(200).json(cases);
      },
      (error) => {
        return res.status(400).json(error);
      },
    );
  },
);

router.get(
  '/:caseId([0-9]+)',
  verifyJWT,
  hasDiagnostic,
  checkVisibility,
  async (req: Request, res: Response) => {
    const case_data: ICase = res.locals.case;
    const diagnostic_data: IDiagnostic = res.locals.diagnostic;
    if (diagnostic_data.getDataValue('anonymous')) {
      case_data.patientName = 'Anonymous';
      case_data.patientSex = 'Anonymous';
      case_data.patientBirthDate = new Date();
      case_data.patientWeight = 0;
    }
    const data = case_data.get({ plain: true });
    data.diagnostic = diagnostic_data;
    return res.status(200).json(data);
  },
);

router.get(
  '/:caseId([0-9]+)/get-diagnosis',
  verifyJWT,
  isOwnedBy,
  async (req: Request, res: Response) => {
    // const the_case: ICase = res.locals.case;
    // TODO: Use model to get diagnostic
    // const diagnostic = makeDiagnostic(the_case.imageURL)
    const diagnosis = 'Vein of Galen Malformation';
    return res.status(200).json(diagnosis);
  },
);

router.post(
  '/:caseId([0-9]+)/save-diagnostic',
  verifyJWT,
  isOwnedBy,
  body('diagnosis').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please provide the cases diagnosis' });
    }

    const the_case: ICase = res.locals.case;
    if (the_case.getDataValue('diagnosticId'))
      return res
        .status(400)
        .json({ message: 'This case already has a diagnostic' });

    const { diagnosis } = req.body;
    await Diagnostic.create({
      diagnosis: diagnosis,
    }).then(
      (diagnostic) => {
        const diagnosticId: number = diagnostic.getDataValue('id');
        the_case.update({ diagnosticId: diagnosticId }).then(
          () => {
            return res
              .status(200)
              .json({ message: 'Diagnostic successfully created' });
          },
          (error) => res.status(500).json(error),
        );
      },
      (error) => {
        return res.status(500).json({ message: error.message, error });
      },
    );
  },
);

router.post(
  '/:caseId([0-9]+)/change-visibility',
  verifyJWT,
  isOwnedBy,
  hasDiagnostic,
  body('isPublic').isBoolean(),
  body('isAnonymous').isBoolean(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please provide the diagnostic visibility' });
    }
    const diagnostic: IDiagnostic = res.locals.diagnostic;
    const { isPublic, isAnonymous } = req.body;
    diagnostic.update({ isPublic: isPublic, isAnonymous: isAnonymous }).then(
      () => {
        return res
          .status(200)
          .json({ message: 'Visibility successfully updated' });
      },
      (error) => {
        return res.status(400).json(error);
      },
    );
  },
);

router.post(
  '/:caseId([0-9]+)/delete',
  verifyJWT,
  isOwnedBy,
  hasDiagnostic,
  body('isPublic').isBoolean(),
  body('isAnonymous').isBoolean(),
  async (req: Request, res: Response) => {
    const diagnostic: IDiagnostic = res.locals.diagnostic;
    diagnostic.destroy().then(
      () => {
        return res
          .status(200)
          .json({ message: 'Diagnostic successfully deleted' });
      },
      (error) => {
        return res.status(400).json(error);
      },
    );
  },
);

export default router;

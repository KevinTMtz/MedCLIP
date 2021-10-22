import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

import verifyJWT from '../middlewares/verifyJWT';
import isOwnedBy from '../middlewares/isOwnedBy';
import Case from '../db/models/Case';
import ICase from '../db/interfaces/ICase';

const router = Router();

router.get('/', verifyJWT, async (req: Request, res: Response) => {
  const userId = res.locals.jwt.id;

  Case.findAll({ where: { userId: userId } }).then(
    (cases) => {
      return res.status(200).json(cases);
    },
    (error) => {
      console.log(error);
      return res.status(500).json({ message: error.message, error });
    },
  );
});

router.post(
  '/create',
  verifyJWT,
  body('caseName').notEmpty(),
  body('caseDescription').notEmpty(),
  body('imageURL').notEmpty(),
  body('patientName').notEmpty(),
  body('patientBirthDate').notEmpty(),
  body('patientSex').notEmpty(),
  body('patientWeight').notEmpty(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please fill all the fields correctly' });
    }
    const userId = res.locals.jwt.id;
    const data = req.body;
    await Case.create({
      userId: userId,
      caseName: data.caseName,
      caseDescription: data.caseDescription,
      patientName: data.patientName,
      patientBirthDate: Date.parse(data.patientBirthDate),
      patientSex: data.patientSex,
      patientWeight: parseFloat(data.patientWeight),
      imageURL: data.imageURL,
    }).then(
      () => {
        return res.status(201).json({ message: 'Case succesfully created' });
      },
      (error) => {
        return res.status(500).json({ message: error.message, error });
      },
    );
  },
);

router.get(
  '/:caseId([0-9]+)',
  verifyJWT,
  isOwnedBy,
  async (req: Request, res: Response) => {
    const the_case: ICase = res.locals.case;
    return res.status(200).json(the_case);
  },
);

router.post(
  '/:caseId([0-9]+)/update',
  verifyJWT,
  isOwnedBy,
  body('caseName').notEmpty(),
  body('caseDescription').notEmpty(),
  body('imageURL').notEmpty(),
  body('patientName').notEmpty(),
  body('patientBirthDate').notEmpty(),
  body('patientSex').notEmpty(),
  body('patientWeight').notEmpty(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please fill all the fields correctly' });
    }
    const data = req.body;
    const the_case: ICase = res.locals.case;
    await the_case
      .update({
        caseName: data.caseName,
        caseDescription: data.caseDescription,
        patientName: data.patientName,
        patientBirthDate: Date.parse(data.patientBirthDate),
        patientSex: data.patientSex,
        patientWeight: parseFloat(data.patientWeight),
        imageURL: data.imageURL,
        diagnosticId: null,
      })
      .then(
        () => {
          console.log('Case updated');
          return res.status(200).json({ message: 'Case succesfully updated' });
        },
        (error) => res.status(500).json(error),
      );
  },
);

router.post(
  '/:caseId([0-9]+)/delete',
  verifyJWT,
  isOwnedBy,
  async (req: Request, res: Response) => {
    const the_case: ICase = res.locals.case;
    await the_case.destroy().then(
      () => {
        console.log('Case deleted');
        return res.status(200).json({ message: 'Case succesfully deleted' });
      },
      (error) => res.status(500).json(error),
    );
  },
);

export default router;

import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

import verifyJWT from '../middlewares/verifyJWT';
import isOwnedBy from '../middlewares/isOwnedBy';
import Case from '../db/models/Case';
import ICase from '../db/interfaces/ICase';
import Diagnostic from '../db/models/Diagnostic';

const router = Router();

router.get('/', verifyJWT, async (req: Request, res: Response) => {
  const userID = res.locals.jwt.id;

  Case.findAll({ where: { userId: userID } }).then(
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
  body('case_data.name').notEmpty(),
  body('case_data.description').notEmpty(),
  body('case_data.imageURL').notEmpty(),
  body('patient_data.name').notEmpty(),
  body('patient_data.birthDate').notEmpty(),
  body('patient_data.sex').notEmpty(),
  body('patient_data.weight').notEmpty(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please fill all the fields correctly' });
    }
    const userID = res.locals.jwt.id;
    const { case_data, patient_data } = req.body;
    await Case.create({
      name: case_data.name,
      userId: userID,
      description: case_data.description,
      patientName: patient_data.name,
      patientBirthDate: Date.parse(patient_data.birthDate),
      patientSex: patient_data.sex,
      patientWeight: parseFloat(patient_data.weight),
      imageURL: case_data.imageURL,
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
  body('case_data.name').notEmpty(),
  body('case_data.description').notEmpty(),
  body('case_data.imageURL').notEmpty(),
  body('patient_data.name').notEmpty(),
  body('patient_data.birthDate').notEmpty(),
  body('patient_data.sex').notEmpty(),
  body('patient_data.weight').notEmpty(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please fill all the fields correctly' });
    }
    const { case_data, patient_data } = req.body;
    const the_case: ICase = res.locals.case;
    await the_case
      .update({
        name: case_data.name,
        description: case_data.description,
        patientName: patient_data.name,
        patientBirthDate: Date.parse(patient_data.birthDate),
        patientSex: patient_data.sex,
        patientWeight: parseFloat(patient_data.weight),
        imageURL: case_data.imageURL,
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

router.post(
  '/:caseId([0-9]+)/make-diagnostic',
  verifyJWT,
  isOwnedBy,
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please fill all the fields correctly' });
    }

    const the_case: ICase = res.locals.case;
    // TODO: Use model to get diagnostic
    // const diagnostic = makeDiagnostic(the_case.imageURL)
    const diagnosis = 'Vein of Galen Malformation';
    await Diagnostic.create({
      diagnosis: diagnosis,
      public: false,
      anonymous: false,
    }).then(
      (diagnostic) => {
        const diagnosticID: number = diagnostic.getDataValue('id');
        the_case.update({ diagnosticId: diagnosticID }).then(
          () => {
            return res
              .status(200)
              .json({ message: 'Diagnostic succesfully created' });
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

export default router;

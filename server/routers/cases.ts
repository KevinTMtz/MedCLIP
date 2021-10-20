import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

import verifyJWT from '../middlewares/verifyJWT';
import Case from '../db/models/Case';

const router = Router();

router.post('/create', verifyJWT, async (req: Request, res: Response) => {
  const userID = res.locals.jwt.id;
  const { case_data, patient_data } = req.body;
  Case.create({
    name: case_data.name,
    userId: userID,
    description: case_data.description,
    patientName: patient_data.name,
    patientBirthDate: Date.parse(patient_data.birthDate),
    patientSex: patient_data.sex,
    patientWeight: parseFloat(patient_data.weight),
    imageURL: case_data.imageURL,
  }).then(
    (new_case) => {
      return res
        .status(200)
        .json({ message: 'Case succesfully created', new_case });
    },
    (error) => {
      console.log(error);
      return res.status(500).json({ message: error.message, error });
    },
  );
});

export default router;

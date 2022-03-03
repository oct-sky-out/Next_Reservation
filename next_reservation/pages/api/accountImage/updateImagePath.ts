import { firestroeAdmin } from 'firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const updateImagePath = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, _req, res) {
    res.status(400).send(err);
  },
  onNoMatch(_req, res) {
    res.status(404);
  },
});

updateImagePath.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, imagePath } = req.body;

  await firestroeAdmin().collection('NEXT_USERS').doc(email).update({
    userPicture: imagePath,
  });

  res.status(200).send({ state: 'success' });
});

export default updateImagePath;

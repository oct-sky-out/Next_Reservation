import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { bucket } from 'firebaseAdmin';

const fileDelete = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res) => {
    res.status(404);
  },
});

fileDelete.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { removePhotoFileName } = req.body;
  await bucket().file(`registerRyokanPhoto/${removePhotoFileName}`).delete();
  res
    .status(200)
    .send({ state: 'success', removePhotoName: removePhotoFileName });
});

export default fileDelete;

import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { bucket, firestroeAdmin } from 'firebaseAdmin';

const remove = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res) => {
    res.status(404);
  },
});

remove.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { removePhotoFileName } = req.body;
  await bucket().file(`accountPhoto/${removePhotoFileName}`).delete();

  const defualtSrcPath =
    '/_next/static/image/public/static/user/default_user_picture.0864b7391dea61a6ccfc62059ab89fd2.png';

  res.status(200).send({
    state: 'success',
    removePhotoName: removePhotoFileName,
    newPhotoPath: defualtSrcPath,
  });
});

export default remove;

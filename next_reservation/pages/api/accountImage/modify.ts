import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { bucket, firestroeAdmin } from 'firebaseAdmin';
import multer from 'multer';
import fileNameCreater from '@/lib/utils/fileNameCreater';

export const config = {
  api: {
    bodyParser: false,
  },
};

const modify = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    res.status(400).send(err);
  },
  onNoMatch(req, res) {
    res.status(404);
  },
});

const uploader = multer({ storage: multer.memoryStorage() });

modify.post(uploader.single('file'), async (req, res) => {
  const { photoName } = req.query;
  const photo = req.file;
  const fileName = fileNameCreater(photo?.originalname || null);

  await bucket().file(`accountPhoto/${photoName}`).delete();

  const imageUrl = await new Promise<string>((resolve, reject) => {
    try {
      bucket()
        .file(`registerRyokanPhoto/${fileName}`)
        .createWriteStream({ metadata: { contentType: photo?.mimetype } })
        .end(photo?.buffer);

      const newPhotoName = `https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/registerRyokanPhoto%2F${fileName}?alt=media`;
      setTimeout(() => {
        resolve(newPhotoName);
      }, 2000);
    } catch (err: any) {
      reject(err);
    }
  });
  res
    .status(200)
    .send({ state: 'success', photoUrl: imageUrl, photoName: fileName });
});

export default modify;

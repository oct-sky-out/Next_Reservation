import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { bucket } from 'firebaseAdmin';
import multer from 'multer';
import fileNameCreater from '@/lib/utils/fileNameCreater';
import stream from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

const app = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    res.status(400).send(err);
  },
  onNoMatch(req, res) {
    res.status(404);
  },
});

const upload = multer({ storage: multer.memoryStorage() });

app.post(upload.single('file'), async (req, res) => {
  const photo = req.file;
  const fileName = fileNameCreater(photo?.originalname || null);
  await bucket()
    .file(`registerRyokanPhoto/${fileName}`)
    .createWriteStream({ metadata: { contentType: photo?.mimetype } })
    .end(photo?.buffer);

  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/registerRyokanPhoto%2F${fileName}?alt=media`;
  res.status(200).send(imageUrl);
});

export default app;

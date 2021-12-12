import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { bucket } from 'firebaseAdmin';
import multer from 'multer';
import fileNameCreater from '@/lib/utils/fileNameCreater';
import stream from 'stream';
import { resolve } from 'path/posix';

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
  const imageUrl = await new Promise<string>((resolve, reject) => {
    try {
      bucket()
        .file(`registerRyokanPhoto/${fileName}`)
        .createWriteStream({ metadata: { contentType: photo?.mimetype } })
        .end(photo?.buffer);
      setTimeout(() => {
        resolve(
          `https://firebasestorage.googleapis.com/v0/b/next-reservation.appspot.com/o/registerRyokanPhoto%2F${fileName}?alt=media`
        );
      }, 1000);
    } catch (err: any) {
      reject(err);
    }
  });

  res.status(200).send({ photoUrl: imageUrl, photoName: fileName });
});

export default app;

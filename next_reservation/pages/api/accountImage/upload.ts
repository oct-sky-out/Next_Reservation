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

const upload = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, _req, res) {
    res.status(400).send(err);
  },
  onNoMatch(_req, res) {
    res.status(404);
  },
});

const uploader = multer({ storage: multer.memoryStorage() });

upload.post(uploader.single('file'), async (req, res) => {
  const photo = req.file;
  const fileName = fileNameCreater(photo?.originalname || null);
  const imageUrl = await new Promise<string>((resolve, reject) => {
    try {
      bucket()
        .file(`accountPhoto/${fileName}`)
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

  res
    .status(200)
    .send({ status: 'success', photoUrl: imageUrl, photoName: fileName });
});

export default upload;

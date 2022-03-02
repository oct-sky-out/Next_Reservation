import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from 'firebaseAdmin';

const searchRyokanByTitle = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.send(404);
  },
});

searchRyokanByTitle.get(async (req, res) => {
  const { title } = req.query;

  if (!title) res.status(400).send('검색할 료칸제목이 없습니다.');
  if (title) {
    let searchResult = null;
    await (
      await firestroeAdmin().collection('RegisterRyokans').get()
    ).forEach((ryokan) => {
      const ryokanData = ryokan.data();
      if (ryokanData.title === title)
        searchResult = {
          ...ryokan.data(),
          option: { isEdit: true, ryokanId: ryokan.id },
        };
    });

    res.status(200).send(searchResult);
  }
  res.status(400).send('조회 실패');
});

export default searchRyokanByTitle;

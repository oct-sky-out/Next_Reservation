import { IRyokanType } from '@/types/reduxActionTypes/ReduxRyokanType';
import { RyokanSearchResultType } from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { firestroeAdmin } from '../../../firebaseAdmin';

const search = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    res.status(400).send(err);
  },
  onNoMatch: (_req, res, _next) => {
    res.status(404).end();
  },
});

search.get(async (req, res) => {
  try {
    const RESULT_LIMIT = 10;
    //*쿼리에는 조건이 들어와야함
    //! documentStart는 문서 검색 시작번호 20개씩 조회
    //! filters는 필터링 조건이다.
    const {
      documentStart,
      latitude,
      longitude,
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      infantsCount,
    } = req.query;
    let searchDocumentsResults: RyokanSearchResultType[] = [];
    const ryokanCollection = firestroeAdmin().collection('RegisterRyokans');
    await (
      await ryokanCollection
        .orderBy('title')
        .offset(+documentStart)
        .limit(RESULT_LIMIT)
        .get()
    ).docs.forEach((doc) => {
      searchDocumentsResults.push({
        ...(doc.data() as IRyokanType),
        id: doc.id,
      });
    });
    searchDocumentsResults = searchDocumentsResults.filter(
      (ryokan) =>
        ryokan.location.latitude <= +latitude + 0.5 &&
        ryokan.location.latitude >= +latitude - 0.5 &&
        ryokan.location.longitude <= +longitude + 0.5 &&
        ryokan.location.longitude >= +longitude - 0.5 &&
        ryokan.bedrooms.personnel >=
          Number(adultCount) + Number(childrenCount) + Number(infantsCount) &&
        new Date(
          ryokan.date.openDate?.toLocaleString('ko-KR') || ''
        ).getTime() <= new Date(checkInDate as string).getTime() &&
        new Date(
          ryokan.date.closeDate?.toLocaleString('ko-KR') || ''
        ).getTime() >= new Date(checkOutDate as string).getTime()
    );
    res.status(200).send(searchDocumentsResults);
  } catch {
    res.status(500).send('서버오류');
  }
});

export default search;

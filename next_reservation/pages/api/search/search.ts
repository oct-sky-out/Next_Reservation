import {
  convenienceSpacesType,
  IRyokanType,
} from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
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
      convenienceSpaces,
      priceMin,
      priceMax,
      ryokanType,
    } = req.query;
    let searchDocumentsResults: IRyokanType[] = [];

    const ryokanCollection = firestroeAdmin().collection('RegisterRyokans');
    await (
      await ryokanCollection
        .orderBy('title')
        .startAt(documentStart)
        .limit(20)
        .get()
    ).docs.forEach((doc) =>
      searchDocumentsResults.push(doc.data() as IRyokanType)
    );

    searchDocumentsResults = searchDocumentsResults.filter((ryokan) => {
      return (
        (ryokan.location.latitude <= +latitude + 0.5 &&
          ryokan.location.latitude >= +latitude - 0.5 &&
          ryokan.location.longitude <= +longitude + 0.5 &&
          ryokan.location.longitude >= +longitude - 0.5 &&
          ryokan.bedrooms.personnel <=
            Number(adultCount) + Number(childrenCount) + Number(infantsCount) &&
          ryokan.date.openDate?.getTime()) ||
        (0 >= new Date(checkInDate as string).getTime() &&
          ryokan.date.closeDate?.getTime()) ||
        0 <= new Date(checkOutDate as string).getTime()
      );
    });
    if (convenienceSpaces !== null) {
      searchDocumentsResults = searchDocumentsResults.filter((ryokan) => {
        const conveniencesFilter = JSON.parse(
          convenienceSpaces as string
        ) as Array<keyof convenienceSpacesType>;
        let filterStatus = false;

        conveniencesFilter.forEach((convenienceSpace) => {
          if (ryokan.convenienceSpaces[convenienceSpace] === false)
            return (filterStatus = false);
          if (ryokan.convenienceSpaces[convenienceSpace] === true)
            filterStatus = true;
        });

        return filterStatus;
      });
    }
    if (priceMin !== null) {
      searchDocumentsResults = searchDocumentsResults.filter((ryokan) => {
        return +ryokan.pricePerDay >= +priceMin;
      });
    }
    if (priceMax !== null) {
      searchDocumentsResults = searchDocumentsResults.filter((ryokan) => {
        return +ryokan.pricePerDay <= +priceMax;
      });
    }
    if (ryokanType !== null) {
      searchDocumentsResults = searchDocumentsResults.filter((ryokan) => {
        return ryokan.ryokanType === ryokanType;
      });
    }
    res.status(200).send(searchDocumentsResults);
  } catch {
    res.status(500).send('서버오류');
  }
});

export default search;

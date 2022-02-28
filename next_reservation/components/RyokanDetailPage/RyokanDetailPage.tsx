import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSelector } from '@/store/index';
import { ryokanDetailActions } from '@/store/ryokanDetail';
import { useDispatch } from 'react-redux';
import RyokanDetailImage from './RyokanDetailImage';
import RyokanDetailPost from './RyokanDetailPost';
import axios from '@/lib/api';
import { RyokanSearchResultType } from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';

const RyokanDetailPage = () => {
  const router = useRouter();
  const { isModalOpend, ryokanDetail } = useSelector((state) => ({
    isModalOpend: state.modalState.modalState,
    ryokanDetail: state.ryokanDetail,
  }));
  const dispatch = useDispatch();

  const fetchRyokanDetail = useCallback(async () => {
    const { data } = await axios.get<RyokanSearchResultType>(
      `/api/ryokan/detail?title=${router.query.ryokan}`
    );
    dispatch(ryokanDetailActions.setRyokanDetail(data));
  }, [router.query]);

  useEffect(() => {
    fetchRyokanDetail();
  }, [fetchRyokanDetail]);

  return (
    <div
      className={`w-screen h-screen text-black p-5 ${
        isModalOpend ? 'filter blur-sm' : ''
      }`}
    >
      <div className="w-3/4 h-3/4">
        <RyokanDetailImage />
      </div>
      <div className="w-3/4 h-2/3">
        <RyokanDetailPost />
      </div>
    </div>
  );
};

export default RyokanDetailPage;

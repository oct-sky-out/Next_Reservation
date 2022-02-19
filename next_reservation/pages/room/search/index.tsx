import { NextPage } from 'next';
import { wrapper } from '@/store/index';
import { searchResultsRoomsActions } from '@/store/searchResultsRyokans';
import Search from '@/components/Search/Search';

const index: NextPage = () => {
  return <Search />;
};

index.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
  const dispatch = store.dispatch;
  dispatch(searchResultsRoomsActions.initFilter());
  dispatch(searchResultsRoomsActions.setSearchResult([]));
  return { props: {} };
});

export default index;

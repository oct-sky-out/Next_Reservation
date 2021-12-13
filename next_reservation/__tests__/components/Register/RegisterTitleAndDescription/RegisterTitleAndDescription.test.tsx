//! test import
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useMockStore } from '@/store/index';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../../../__mocks__/redux/reduxStateMocks';

//! component import
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { registerRyokanActions } from '@/store/registerRyokan';

const RegisterTitleAndDescription = () => {
  const { title, description } = useSelector((selector) => ({
    title: selector.registerRyokan.title,
    description: selector.registerRyokan.description,
  }));
  const dispatch = useDispatch();

  const changeTitle = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRyokanActions.setTitle(value));
  };
  const changeDescription = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(registerRyokanActions.setDesctription(value));
  };

  return (
    <div>
      <div>
        <span>료칸 제목</span>
        <input
          data-testid="title"
          type="text"
          placeholder="고객들이 볼 료칸의 제목을 적어주세요."
          value={title}
          onChange={changeTitle}
        />
      </div>
      <div>
        <span>료칸 설명</span>
        <textarea
          data-testid="description"
          name="ryokan-description"
          placeholder="등록하시려는 료칸은 어떤 특징을 가지고있나요?."
          value={description}
          cols={30}
          rows={10}
          onChange={changeDescription}
        ></textarea>
      </div>
    </div>
  );
};

const store = useMockStore;

describe('호스팅하는 료칸의 제목과 설명', () => {
  beforeEach(() => {
    const dispatchMock = useDispatchMock;
    store.dispatch = dispatchMock;
    useSelectorMock.mockImplementation((selector) => selector(mockStoreValue));

    render(
      <Provider store={store}>
        <RegisterTitleAndDescription />
      </Provider>
    );
  });
  test('제목 input 박스에 입력하면 이상없이 잘 stroe와 텍스트box에 입력이 되는가?', async () => {
    const titleInput = await screen.findByTestId<HTMLInputElement>('title');

    const title = '한적한 강원도 동해바다에서 즐기는 료칸';

    userEvent.type(titleInput, title);
    expect(titleInput.value).toBe(title);
    expect(store.getState().registerRyokan.title).toBe(title);
  });
  test('설명 textarea에 입력하면 이상없이 잘 stroe와 textarea에 입력이 되는가?', async () => {
    const descriptionTextarea = await screen.findByTestId<HTMLTextAreaElement>(
      'description'
    );

    const description =
      '동해바다와 7번국도가 보이는 루프탑뷰와 함께 온천을 즐겨보세요!';

    userEvent.type(descriptionTextarea, description);
    expect(descriptionTextarea.value).toBe(description);
    expect(store.getState().registerRyokan.description).toBe(description);
  });
});

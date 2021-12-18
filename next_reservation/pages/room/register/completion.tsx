import { useEffect } from 'react';
import { useSelector } from '@/store/index';
import axios from '@/lib/api';

const completion = () => {
  const registerInfo = useSelector((selector) => selector.registerRyokan);
  const email = useSelector((selector) => selector.user.data.email);
  useEffect(() => {
    (async () =>
      await axios.post('/api/ryokan/register', {
        email,
        registerData: registerInfo,
      }))();
  }, []);
  return <div>Enter</div>;
};

export default completion;

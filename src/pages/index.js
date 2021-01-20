import { navigate } from 'gatsby';

import { isBrowser } from '../utils/utils';

const Index = () => {
  if (isBrowser) {
    navigate('/home/');
  }
  return null;
};

export { Index as default };

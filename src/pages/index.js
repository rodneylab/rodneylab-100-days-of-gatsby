import { navigate } from 'gatsby';

import { isBrowser } from '../utils/utils';

export default function Index() {
  if (isBrowser) {
    navigate('/home/');
  }
  return null;
}

import { createClient } from '@formium/client';

// eslint-disable-next-line import/prefer-default-export
export const formium = createClient(process.env.GATSBY_FORMIUM_PROJECTID);

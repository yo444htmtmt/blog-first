import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: '2tpho35f76',
  apiKey: process.env.API_KEY,
});
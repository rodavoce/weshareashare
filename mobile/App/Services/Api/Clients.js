import { Buffer } from 'buffer';
import { fetchApi } from '@services/Fetch';

export const authorize = (session) =>
  fetchApi('/clients', {}, 'post', session)

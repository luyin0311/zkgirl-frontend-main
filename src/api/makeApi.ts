import { initMakeApi } from '@c3/api';
import axios from '@src/api/base';

export const makeApi = initMakeApi({ rawHttp: axios });

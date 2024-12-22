/// <reference types="vite/client" />
/// <reference types="react" />

interface ImportMetaEnv {
  readonly REACT_APP_BASE_URL: string;
  readonly REACT_APP_PARTNER_TICKET_ADDRESS: string;
  readonly REACT_APP_PARTNER_TICKET_FACTORY_ADDRESS: string;
  readonly REACT_APP_LEGEND_FACTORY_ADDRESS: string;
  readonly REACT_APP_ZKGRIRLS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  ethereum: any;
}

interface IList<T> {
  total: number;
  data: T;
}

interface IResponse<T> {
  code: number;
  data: T;
  message: string;
  error?: string;
}

type IPromise<T> = Promise<import('axios').AxiosResponse<T>>;

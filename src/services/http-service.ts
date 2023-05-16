import axios, { AxiosResponse } from "axios";

export interface DefenseRawResponse {
  status: string;
  hs: [
    {
      text: string;
      value: string;
    }
  ];
  items: [
    {
      Curso: string;
      Programa: string;
      Ordem: string;
      Nome: string;
      Data: string;
    }
  ];
}

export interface Defense {
  Curso: string;
  Programa: string;
  Ordem: string;
  Nome: string;
  Data: string;
}

axios.defaults.baseURL = "http://thanos.icmc.usp.br:4567/api/v1";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
};

const defenses = {
  list: () => request.get<DefenseRawResponse[]>("/defesas"),
};

const api = {
  defenses,
};

export default { api };

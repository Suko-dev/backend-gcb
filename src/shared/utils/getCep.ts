import axios from 'axios';

export default async (cep: number) => {
  const { data } = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
  return data;
};

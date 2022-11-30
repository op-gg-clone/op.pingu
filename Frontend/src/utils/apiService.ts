import axios from 'axios';

const baseURL: string = 'http://localhost:3000/records';

export const getMatchBySummonerName = async (summonerName: string) => {
  const response = await axios.get(`${baseURL}/matchesInfo/${summonerName}`);
  return response.data;
};

export const getSummonerInfoBySummonerName = async (summonerName: string) => {
  const response = await axios.get(`${baseURL}/summonerInfo/${summonerName}`);
  return response.data;
};

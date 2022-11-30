import Unranked from '../img/Emblem_Unranked.png';
import Iron from '../img/Emblem_Iron.png';
import Bronze from '../img/Emblem_Bronze.png';
import Silver from '../img/Emblem_Silver.png';
import Gold from '../img/Emblem_Gold.png';
import Platinum from '../img/Emblem_Platinum.png';
import Diamond from '../img/Emblem_Diamond.png';
import Master from '../img/Emblem_Master.png';
import Grandmaster from '../img/Emblem_Grandmaster.png';
import Challenger from '../img/Emblem_Challenger.png';

type TierType = {
  [key: string]: string;
  IRON: string;
  BRONZE: string;
  SILVER: string;
  GOLD: string;
  PLATINUM: string;
  DAIMOND: string;
  MASTER: string;
  GRNADMASTER: string;
  CHALLENGER: string;
};
const tireObj: TierType = {
  IRON: Iron,
  BRONZE: Bronze,
  SILVER: Silver,
  GOLD: Gold,
  PLATINUM: Platinum,
  DAIMOND: Diamond,
  MASTER: Master,
  GRNADMASTER: Grandmaster,
  CHALLENGER: Challenger,
};

export const getRankEmblem = (tier: string): string => {
  if (!tireObj[tier]) return Unranked;
  return tireObj[tier];
};

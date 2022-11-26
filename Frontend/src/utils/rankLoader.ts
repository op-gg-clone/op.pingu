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
  Iron: string;
  Bronze: string;
  Silver: string;
  Gold: string;
  Platinum: string;
  Diamond: string;
  Master: string;
  Grandmaster: string;
  Challenger: string;
};
const tireObj: TierType = {
  Iron: Iron,
  Bronze: Bronze,
  Silver: Silver,
  Gold: Gold,
  Platinum: Platinum,
  Diamond: Diamond,
  Master: Master,
  Grandmaster: Grandmaster,
  Challenger: Challenger,
};

export const getRankEmblem = (tier: string): string => {
  return tireObj[tier];
};

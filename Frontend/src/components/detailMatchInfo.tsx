interface openProps {
  isDetail: any;
}

const DetailMatchInfo = ({ isDetail }: openProps) => {
  console.log(isDetail);
  return <div>dd</div>;
};

export default DetailMatchInfo;

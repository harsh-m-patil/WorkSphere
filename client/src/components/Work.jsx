import { useParams } from 'react-router-dom';
const Work = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Work</div>;
};

export default Work;

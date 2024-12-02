import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWorks } from '../redux/workSlice';

const FetchWorks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetching data from a mock API
    fetch('http://localhost:3000/api/v1/work')
      .then((response) => response.json())
      .then((data) => {
        const fetchedWorks = data.data.works;

        dispatch(addWorks(fetchedWorks));
      })
      .catch((error) => {
        console.error('Error fetching works:', error);
      });
  }, [dispatch]);

  return <div></div>;
};

export default FetchWorks;

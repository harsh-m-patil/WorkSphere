import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWorks } from '../redux/workSlice';
import { API_URL } from '../../utils/constants';

const FetchWorks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetching data from a mock API
    fetch(`${API_URL}/work`)
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

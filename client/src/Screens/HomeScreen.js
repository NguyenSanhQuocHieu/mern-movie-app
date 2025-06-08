import React, { useEffect } from 'react';
import Banner from '../Components/Home/Banner';
import PopularMovies from '../Components/Home/PopularMovies';
import Promos from '../Components/Home/Promos';
import TopRated from '../Components/Home/TopRated';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomMoviesAction, getTopRatedMoviesAction ,getAllMoviesAction} from '../Redux/Actions/MoviesActions';   
import { toast } from 'react-hot-toast';

function HomeScreen() {
  const dispatch = useDispatch();
  //use selector
  const {
    isLoading:randomLoading ,
    isError:randomError,
    movies:randomMovies
  } = useSelector((state) => state.getRandomMovies);
  const {
    isLoading:topLoading ,
    isError:topError,
    movies:topMovies
  } = useSelector((state) => state.getTopRatedMovies);
  const {isLoading ,isError,movies} = useSelector(
    (state) => state.getAllMovies
  );
  //use effect
  useEffect(() => {
    dispatch(getRandomMoviesAction());
    dispatch(getAllMoviesAction({}));
    dispatch(getTopRatedMoviesAction());
    if(isError || randomError || topError){
      toast.error("Something went wrong");
    }
  }, [dispatch,isError,randomError,topError]);

  return (
     <Layout>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
        <Banner movies={movies} isLoading={isLoading}/>
        <PopularMovies movies={randomMovies} isLoading={randomLoading}/>
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading}/>
      </div>
     </Layout>
  );
}

export default HomeScreen;  

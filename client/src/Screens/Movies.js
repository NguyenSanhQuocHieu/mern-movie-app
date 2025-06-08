import React,{useEffect, useMemo, useState} from "react";
import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RiMovie2Line } from "react-icons/ri";
import Loader from "../Components/Notfications/Loader";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import { YearData, TimesData, RatesData, LanguageData } from "../Data/FilterData";
import { useParams } from "react-router-dom";

function MoviesPage() {
  const {search} = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);

  const sameClass = 
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  
  // Lấy tổng số phim từ Redux store
  const {isLoading, isError, movies, totalMovies, pages, page} = useSelector(
    (state) => state.getAllMovies
  );
  const {categories} = useSelector((state) => state.categoryGetAll); 

  //queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      language: language?.title === "Sort By Language" ? "" : language?.title,
      year: year?.title.replace(/\D/g, ""),
      times: times?.title.replace(/\D/g, ""),
      rates: rates?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query; 
  }, [category, language, year, times, rates, search]);

  useEffect(() => {
    dispatch(getAllMoviesAction(queries));
    if(isError) {
      toast.error(isError);
    }
  }, [dispatch, isError, queries]);

  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    year: year,
    setYear: setYear,
    times: times,
    setTimes: setTimes,
    rates: rates,
    setRates: setRates,
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {totalMovies || 0}
          </span>{" "}
          items Found
          {search && ` for "${search}"`}
        </p>
        {
          isLoading ? (
            <div className="w-full gap-6 flex-colo min-h-screen">
              <Loader />
            </div>
          ) : movies?.length > 0 ? (
            <>
              <div className="grid sm:mt-10 mt-6 xl:grid-cols-5 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                {movies.map((movie, index) => (
                  <Movie key={movie?._id || index} movie={movie} />
                ))}
              </div>
              {/* Phân trang */}
              <div className="w-full flex-rows gap-6 md:my-20 my-10 justify-center">
                <button 
                  onClick={prevPage}
                  disabled={page === 1} 
                  className={sameClass}    
                >
                  <TbPlayerTrackPrev className="text-xl" />
                </button>
                <span className="text-white font-semibold px-4 py-2">
                  Page {page} of {pages}
                </span>
                <button 
                  onClick={nextPage}
                  disabled={page === pages} 
                  className={sameClass}
                >
                  <TbPlayerTrackNext className="text-xl" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full gap-6 flex-colo min-h-screen">
              <div className="w-24 h-24 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
                <RiMovie2Line />
              </div>
              <p className="text-border text-sm">
                No movies found matching your criteria
              </p>
            </div>
          )}
      </div>
    </Layout>
  );
}

export default MoviesPage;

import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay } from "swiper/modules";  
import { Swiper, SwiperSlide } from "swiper/react";
import Titles from "../Titles";

function MovieCasts({movie}) {
  // Kiểm tra nếu không có movie hoặc cast
  if (!movie?.cast || movie.cast.length === 0) {
    return null;
  }

  return (
    <div className="my-12">
      <Titles title="Casts" Icon={FaUserFriends} />
      <div className="mt-10">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          modules={[Autoplay]}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {movie.cast.map((cast, index) => (
            <SwiperSlide key={cast._id || `cast-${index}`}>
              <div className="w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800">
                <img
                  src={cast?.image ? cast?.image : "/images/user.png"}
                  alt={cast?.name || 'Cast Member'}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p>{cast.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieCasts;
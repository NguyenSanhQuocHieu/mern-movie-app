import React, { useEffect, useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs";
import Rating from "../Stars";
import {Empty} from "../Notfications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {ReviewValidation} from "../Validation/MovieValidation";
import { toast } from "react-toastify";
import { InlineError } from "../Notfications/Error";
import { Link } from "react-router-dom";
import { reviewMovieAction, updateReviewAction, deleteReviewAction, reportReviewAction } from "../../Redux/Actions/MoviesActions";
import { FaEdit, FaTrash, FaFlag } from "react-icons/fa";
import styled from "styled-components";

const ReviewsContainer = styled.div`
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #141414;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e50914;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #f40612;
  }
`;

const Ratings = [
  {
    title: "0 - Poor",
    value: 0,
  },
  {
    title: "1 - Fair",
    value: 1,
  },
  {
    title: "2 - Good",
    value: 2,
  },
  {
    title: "3 - Very Good",
    value: 3,
  },
  {
    title: "4 - Excellent",
    value: 4,
  },
  {
    title: "5 - Masterpiece",
    value: 5,
  },
];

function MovieRates({ movie }) {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.createReview);
  const { userInfo } = useSelector(state => state.userLogin);
  const [isEditing, setIsEditing] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);

  // validation review
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(ReviewValidation),
  });

  // on submit
  const onSubmit = (data) => {
    if (isEditing) {
      dispatch(updateReviewAction({
        movieId: movie?._id,
        reviewId: editReviewId,
        review: {...data}
      }));
      setIsEditing(false);
      setEditReviewId(null);
    } else {
      dispatch(reviewMovieAction({
        id: movie?._id,
        review: {...data}
      }));
    }
    reset();
  };

  // handle edit review
  const handleEditReview = (review) => {
    setIsEditing(true);
    setEditReviewId(review._id);
    setValue("rating", review.rating);
    setValue("comment", review.comment);
  };

  // handle delete review
  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReviewAction({
        movieId: movie?._id,
        reviewId: reviewId
      }));
    }
  };

  // handle report review
  const handleReportReview = (reviewId) => {
    if (window.confirm("Are you sure you want to report this review?")) {
      dispatch(reportReviewAction({
        movieId: movie?._id,
        reviewId: reviewId
      }));
    }
  };

  useEffect(() => {
    if(isError) {
      toast.error(isError);
      dispatch({type: "CREATE_REVIEW_RESET"});
    }
  }, [isError, dispatch]);
  
  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* write review */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            {isEditing ? "Edit Review" : `Review "${movie?.name}"`}
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie. It will be posted on this page.
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Rating"
              options={Ratings}
              name="rating"
              register={{...register("rating")}}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={watch("rating",false)} />
            </div>
            {errors?.rating && <InlineError text={errors.rating.message}/>}
          </div>
          {/* message */}
          <div className="w-full">
            <Message 
              name="comment"
              register={{...register("comment")}} 
              label="Message" 
              placeholder="Make it short and sweet...." 
            />
            {errors?.comment && <InlineError text={errors.comment.message}/>}
          </div>
          
          {/* submit */}
          {userInfo ? (
            <button 
              disabled={isLoading}
              type="submit"  
              className="bg-subMain text-white py-3 w-full flex-colo rounded"
            >
              {isLoading ? "Loading..." : (isEditing ? "Update Review" : "Submit")}
            </button>
          ) : (
            <Link 
              to="/login"
              className="bg-main border border-subMain text-white py-3 w-full flex-colo rounded"
            >
              Login to review
            </Link>
          )}
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditReviewId(null);
                reset();
              }}
              className="bg-dry text-white py-3 w-full flex-colo rounded"
            >
              Cancel Edit
            </button>
          )}
        </form>
        {/* REVIWERS */}
        <div className="col-span-3">
          <h3 className="text-xl text-text font-semibold">Reviews ({movie?.numberOfReviews})</h3>
          <ReviewsContainer className={`w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header ${movie?.reviews?.length > 0 ? 'overflow-y-scroll' : ''}`}>
            {movie?.reviews?.length > 0 ? movie?.reviews?.map((review) => (
              <div key={review?._id} className="md:grid flex flex-col w-full grid-cols-12 gap-4 bg-dry p-4 border border-gray-800 rounded-lg">
                <div className="col-span-2 bg-main hidden md:block">
                  <img
                    src={review?.userImage ? review?.userImage : "/images/user.png"}
                    alt={review?.userName}
                    className="w-full h-24 rounded-lg object-cover"
                  />
                </div>
                <div className="col-span-10">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold truncate">{review?.userName}</h2>
                      <div className="flex gap-2 text-star">
                        <Rating value={review?.rating} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Nút Chỉnh sửa (Edit): Chỉ hiển thị cho người dùng TRÊN REVIEW CỦA CHÍNH HỌ, nếu review chưa bị báo cáo */}
                      {(userInfo?._id === review?.userId) && !review?.isReported && (
                          <button
                              onClick={() => handleEditReview(review)}
                              title="Edit Review"
                              className="w-6 h-6 flex-colo rounded-md bg-subMain text-white hover:bg-main transitions"
                          >
                              <FaEdit className="w-3 h-3" />
                          </button>
                      )}

                      {/* Nút Xóa (Delete): Chỉ hiển thị cho người dùng thông thường (trên review của chính họ), nếu review chưa bị báo cáo */}
                      {(userInfo?._id === review?.userId) && !review?.isReported && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          title="Delete Review"
                          className="w-6 h-6 flex-colo rounded-md bg-red-600 text-white hover:bg-red-700 transitions"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      )}

                      {/* Nút Báo cáo (Report): Chỉ hiển thị cho Admin và nếu review chưa bị báo cáo VÀ KHÔNG phải review của người dùng hiện tại */}
                      {(userInfo?.isAdmin && !review?.isReported && (userInfo?._id !== review?.userId)) && (
                        <button
                          onClick={() => handleReportReview(review._id)}
                          title="Report Review"
                          className="w-6 h-6 flex-colo rounded-md bg-red-600 text-white hover:bg-red-700 transitions"
                        >
                          <FaFlag className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  {review?.isReported ? (
                    <p className="text-sm text-red-500 italic mt-2">
                      This review has been reported and is under review.
                    </p>
                  ) : (
                    <p className="text-sm leading-6 font-medium text-text break-words mt-2">
                      {review?.comment}
                    </p>
                  )}
                </div>
              </div>
            )) : (
              <Empty message={`Be first to rate "${movie?.name}"`}/>
            )}
          </ReviewsContainer>
        </div>
      </div>
    </div>
  );
}

export default MovieRates;

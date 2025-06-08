import React from "react";
import MainModal from "./MainModal";
import {
  FaFacebook,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { MdEmail } from "react-icons/md";

function ShareMovieModal({ modalOpen, setModalOpen, movie }) {
  const shareData = [
    {
      icon: FaFacebook,
      shareButton: FacebookShareButton,
    },
    {
      icon: FaTwitter,
      shareButton: TwitterShareButton,
    },
    {
      icon: FaTelegram,
      shareButton: TelegramShareButton,
    },
    {
      icon: FaWhatsapp,
      shareButton: WhatsappShareButton,
    },
    {
      icon: FaPinterest,
      shareButton: PinterestShareButton,
    },
    {
      icon: MdEmail,
      shareButton: EmailShareButton,
    },
  ];

  const url = `${window.location.protocol}//${window.location.host}/movie/${movie?._id}`;
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="relative inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <button
          onClick={() => setModalOpen(false)}
          type="button"
          className="absolute right-5 top-5 transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white z-50"
        >
          <span className="sr-only">Close</span>
          &times;
        </button>
        <h2 className="text-2xl">
          Share <span className="text-xl font-bold">"{movie?.name}"</span>
        </h2>
        <form className="flex-rows flex-wrap gap-6 mt-6">
          {shareData.map((data, index) => (
            <data.shareButton
              key={index}
              url={url}
              quote="Netflixo | Free Movies Site"
            >
              <div className="w-12 transitions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30">
                <data.icon />
              </div>
            </data.shareButton>
          ))}
        </form>
      </div>
    </MainModal>
  );
}

export default ShareMovieModal;

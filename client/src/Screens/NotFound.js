import React from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';

function NotFound() {
  return (  
    <div className='relative w-full h-screen'>
      {/* Background image */}
      <div className='absolute top-0 left-0 w-full h-full z-0'>
        <img
          className="w-full h-full object-cover opacity-50" 
          src="/images/404.svg"
          alt="not found"
        />
      </div>
      
      {/* Content overlay */}
      <div className='relative z-10 flex-colo w-full h-full text-white bg-main bg-opacity-90 lg:py-20 py-10 px-6'>
        <h1 className='lg:text-6xl text-4xl font-bold mb-4'>Page Not Found</h1>
        <p className='font-medium text-border italic leading-6 text-center mb-8'>
          The page you are looking for does not exist.
        </p>
        <Link 
          to="/"
          className='bg-subMain px-8 rounded-full text-white flex-rows gap-4 font-medium py-3 hover:bg-transparent border-2 border-subMain transitions'>
          <BiHomeAlt className="w-6 h-6" /> Go Back Home
        </Link>
      </div>
    </div>
  );
}  

export default NotFound;
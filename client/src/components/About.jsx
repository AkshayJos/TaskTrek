import React from 'react';
import Header from './Header';
import Menus from './menus';

const About = () =>{
    return(
      <div className="container mx-auto lg:px-40 px-4">
      <Header />
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3">
          <Menus />
        </div>
    
        <div className="w-full md:w-2/3 mt-3">
          <h2 className="text-center font-serif text-3xl">This is About Section.</h2>
        </div>
      </div>
    </div>
    
    )
}

export default About;
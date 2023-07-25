import React from 'react';
import Header from '../../copmonents/Frontend/Header/Header';
import Footer from '../../copmonents/Frontend/Footer';
import NewsLetter from '../../copmonents/Frontend/NewsLetter/NewsLetter';
// import RiComputerLine from 'react-icons';
import Testimonial from '../../copmonents/Frontend/Testimonial/Testimonial';
import Greatoffer from '../../copmonents/Frontend/Greatoffer';
import Trending from '../../copmonents/Frontend/Trending/Trending';
import HeroSection from '../../copmonents/Frontend/HeroSection';
import LargeSlider from '../../copmonents/Frontend/LargeSlider/LargeSlider';
import HowDo from '../../copmonents/Frontend/HowDo';


// sliders at the mid
// const slidesLarge = [
//   {
//     name: 'Pizzas',
//     title: 'Pepperoni Pizza',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: pepperoniPizza,
//   },
//   {
//     name: 'Desserts',
//     title: 'Rum With Soda',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: rumSoda,
//   },
//   {
//     name: 'Dessertss',
//     title: 'Chocolate Cookies',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: chocolateCookie,
//   },
//   {
//     name: 'Pizzas',
//     title: 'Vegetarian',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: Vegetarian,
//   },
//   {
//     name: 'Pasta',
//     title: 'Sea Food Pasta',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: seaFoodPasta,
//   },
//   {
//     name: 'Beverages',
//     title: 'Russian Beer',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: russianBeer,
//   },
//   {
//     name: 'Pizzas',
//     title: 'Four Cheese',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: fourCheese,
//   },
//   {
//     name: 'Sides',
//     title: 'Ceaser Salad',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: ceaserSalad,
//   },
//   {
//     name: 'Sides',
//     title: 'Chicken Wrap',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: chickenWrap,
//   },
//   {
//     name: 'Pizzas',
//     title: 'Barbeque Chicken',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: barbequeChicken,
//   },
//   {
//     name: 'Sides',
//     title: 'Sea Food Noodles',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: seaFoodNoodles,
//   },
//   {
//     name: 'Dessertss',
//     title: 'Orange Juice',
//     description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc',
//     image: orangeJuice,
//   },
//   // Add more slides as needed
// ];


export default function Home() {
  // var splide = new Splide( '.splide', {
  //   type   : 'loop',
  //   drag   : 'free',
  //   snap   : true,
  //   perPage: 1,
  // } );

  // splide.mount();

  return (
    <>
      <Header />
      <div className="mainBg " >


       {/* hero section */}
       <HeroSection/>
        {/* What we do */}
        <HowDo/>
        {/* large mid slide */}
        <LargeSlider/>
                {/* trendings */}
        <Trending/>
        {/* greate offer */}
        <Greatoffer/>
        <Testimonial/>
        {/* News Letters */}
        <NewsLetter />
        {/* footer */}

        <Footer />
      </div>
    </>
  )
}

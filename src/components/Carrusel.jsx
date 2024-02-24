import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 import '../styles/Carrusel.css';


const Carrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carrusel">
        <Slider {...settings}>
          <div>
            <img src="src/images/imagen1.png" alt="Imagen 1" />
          </div>
          <div>
            <img src="src/images/login.jpg" alt="Imagen 2" />
          </div>
          <div>
            <img src="src/images/imagen 2.jpg" alt="Imagen 2" />
          </div>
          <div>
            <img src="src/images/imagen3.png" alt="Imagen 2" />
          </div>
        </Slider>
    </div>
  );
};
export default Carrusel;
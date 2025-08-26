import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const HeroSlider = () => {
  const banners = [
    { id: 1, src: "/images/welcome.jpg", alt: "Welcome Banner" },
    { id: 2, src: "/images/sale.jpg", alt: "Sale Banner" },
    { id: 3, src: "/images/new arrival.jpg", alt: "New Arrival Banner" },
  ];

  return (
    <section className="hero-section">
      <div className="hero-swiper">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img
                src={banner.src}
                alt={banner.alt}
                style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSlider;

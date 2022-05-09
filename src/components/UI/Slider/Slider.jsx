import React from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const Slider = (props) => {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={4}
            className={props.theme === "dark" && "dark"}
        >
            {props?.children?.map((child, index) =>
                <SwiperSlide key={index}>
                    {child}
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default Slider;
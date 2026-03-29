import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; import AOS from 'aos';
import '../Styles/Slider.css';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Slider = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);
    return (
        <div className="dashboard-slider" data-aos={"fade-up"}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                spaceBetween={30}
                slidesPerView={1} >
                <SwiperSlide>
                    <div className="slide-content" >
                        <div className="gradient-overlay"></div>
                        <img src="https://www.shutterstock.com/image-photo/young-woman-working-on-computer-600nw-1711024264.jpg" alt="Welcome" className="slide-image" />
                        <div className="text-overlay">
                            <h3>Customize Your Profile</h3>
                            <p>Update your bio, avatar, and connect with other writers.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-content">
                        <div className="gradient-overlay"></div>
                        <img src="https://paulmackey.ie/img/blog_lede.d2ed38cb.png" alt="Welcome" className="slide-image" />
                        <div className="text-overlay">
                            <h3>Welcome to Blognest!</h3>
                            <p>Start writing your first blog or explore trending posts.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-content">
                        <div className="gradient-overlay"></div>
                        <img src="https://maxhemingway.com/wp-content/uploads/2017/12/blog.jpg" alt="Welcome" className="slide-image" />
                        <div className="text-overlay">
                            <h3>Track Your Stats</h3>
                            <p>View your blog views, likes, and comments in real-time.</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
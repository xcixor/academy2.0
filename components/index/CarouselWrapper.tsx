"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import "./custom.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Props = {
  deviceType?: string;
};
const images = [
  {
    src: "/carousel/carousel1.jpg",
    title: "Explore Excellence",
    legend:
      "Dive into our curated selection of featured courses at PES Academy. From foundational principles to advanced strategies, discover transformative learning experiences that elevate your understanding on various topics.",
    alt: "Photo 1",
  },
  {
    src: "/carousel/carousel2.jpg",
    title: "Guiding Experts",
    legend: "Our seasoned instructors bring real-world insights and expertise, ensuring a rich and engaging learning journey. Discover the mentors shaping your path to success.",
    alt: "Photo 2",
  },
  {
    src: "/carousel/carousel3.jpg",
    title: "Practical Insights for Today's Challenges",
    legend: "Our practical insights carousel offers courses designed to address today's challenges. Equip yourself with the knowledge to thrive in a rapidly evolving financial landscape.",
    alt: "Photo 3",
  },
];
const CarouselWrapper = () => {
  const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("android") || userAgent.includes("iphone")) {
      return "mobile";
    } else if (userAgent.includes("ipad") || userAgent.includes("tablet")) {
      return "tablet";
    } else {
      return "desktop";
    }
  };

  const deviceType = getDeviceType();
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={deviceType !== "mobile" ? true : false}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {images.map((image, index) => (
        <div key={index} className="relative">
          <Image
            src={image.src}
            height={400}
            width={800}
            alt={image.alt}
            className="h-[600px] w-full"
            style={{ objectFit: "cover" }}
          />
          <div className="carousel-text-wrapper absolute bottom-0 h-full w-full text-white">
            <div className="flex h-full flex-col items-center justify-center-">
              <div className="w-1/2">
                <h2 className="animate-fadeIn text-4xl font-bold mb-5">
                  {image.title}
                </h2>
                <p className="animate-left font-semibold">{image.legend}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;

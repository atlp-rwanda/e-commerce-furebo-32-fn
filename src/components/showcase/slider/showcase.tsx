import React from "react";
import { Carousel, ConfigProvider } from "antd";
import Card from "../Card";

const customTheme = {
  components: {
    Carousel: {
      dotActiveWidth: 24,
      dotHeight: 10,
      dotWidth: 10,
      dotColor: "#d9d9d9",
      dotActiveColor: "#1890ff",
    },
  },
};

const CardSlider: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Carousel afterChange={onChange} autoplay={true}>
        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
      </Carousel>
    </ConfigProvider>
  );
};

export default CardSlider;

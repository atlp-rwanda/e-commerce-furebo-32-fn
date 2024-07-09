import { CartButton } from "../atom/cartButton";

function ChooseUs() {

  return (
    <div className="py-8 h-auto lg:h-[100vh] flex flex-col lg:flex-row justify-between w-full">
      <div
        style={{
          backgroundImage: `url(/image.jpg)`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full lg:w-[50%] h-64 lg:h-full bg-black rounded-3xl mb-4 lg:mb-0"
      ></div>
      <div className="w-full lg:w-[48%] h-auto lg:h-full flex flex-col gap-4">
        <div className="h-auto lg:h-[45%] flex flex-col justify-between">
          <h1 className="text-4xl lg:text-6xl font-semibold text-black">
            Why choose us?
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            GeekMart offers a wide range of high-quality products from fashion
            and electronics to home essentials, all at competitive prices. Enjoy
            fast and reliable shipping, exceptional customer service, and secure
            shopping. Choose GeekMart for unbeatable value and a seamless,
            enjoyable shopping experience.
          </p>
          <CartButton rounded="rounded-lg" />
        </div>
        <div
          style={{
            backgroundImage: `url(/jbl.png)`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="h-64 lg:h-[55%] bg-black rounded-3xl"
        ></div>
      </div>
    </div>
  );
}

export default ChooseUs;

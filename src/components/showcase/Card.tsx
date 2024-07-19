import { Avatar, AvatarGroup } from "@mui/material";
import Shoes from "./shoes";
import { CartButton } from "../atom/cartButton";

function Card() {
  return (
    <div className="bg-blue-100 w-full mt-4 p-6 md:p-10 rounded-3xl flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-4/5 flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col lg:flex-row">
          <div className="h-fit flex flex-col gap-6 md:gap-10">
            <h1 className="text-4xl md:text-7xl text-black font-medium">
              <span className="font-semibold text-5xl md:text-8xl">Shoes</span>{" "}
              <br />
              <span className="tracking-wide">Collection</span>
            </h1>
            <h6 className="text-sm md:text-base">
              Discover our stylish and comfortable shoes, perfect for any
              occasion. Crafted with premium materials, they offer elegance and
              ease, ensuring you step out in confidence and comfort. Elevate
              your footwear game with our versatile collection.
            </h6>
          </div>
          <img
            src="/shoes.png"
            alt=""
            className="w-full lg:w-auto mt-4 lg:mt-0"
          />
        </div>
        <div className="flex max-md:flex-col max-md:flex-row gap-4 md:gap-16 ">
          <CartButton rounded="rounded-full max-sm:w-full gap:4" />
          <div className="border border-primary-300 max-sm:hidden flex items-center w-fit rounded-full px-2">
            <AvatarGroup
              renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
              total={2}
            >
              <Avatar alt="Remy Sharp" src="/nike.png" />
              <Avatar alt="Travis Howard" src="/jordan.png" />
            </AvatarGroup>
            <span className="ml-2">+9 Brands</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4 lg:mt-0 max-sm:hidden max-md:flex-row max-md:justify-between">
        <Shoes />
        <Shoes />
        <Shoes />
      </div>
    </div>
  );
}

export default Card;
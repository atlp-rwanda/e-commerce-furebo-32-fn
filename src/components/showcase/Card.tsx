import { Avatar, AvatarGroup } from "@mui/material";
import Shoes from "./shoes";
import { CartButton } from "../atom/cartButton";

function Card() {
  return (
    <div className="bg-blue-100 w-full mt-4 p-10 rounded-3xl flex justify-between">
      <div className="w-4/5 flex flex-col gap-10">
        <div className="flex">
          <div className="h-fit flex flex-col gap-10">
            <h1 className="text-7xl text-black font-medium">
              <span className="font-semibold text-8xl">Shoes</span> <br />
              <span className="tracking-wide">Collection</span>
            </h1>
            <h6>
              Discover our stylish and comfortable shoes, perfect for any
              occasion. Crafted with premium materials, they offer elegance and
              ease, ensuring you step out in confidence and comfort. Elevate
              your footwear game with our versatile collection.
            </h6>
          </div>
          <img src="/shoes.png" alt="" />
        </div>
        <div className="flex gap-16">
          <CartButton rounded="rounded-full" />
          <div className="border border-primary-300 flex items-center rounded-full px-2">
            <AvatarGroup
              renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
              total={2}
            >
              <Avatar alt="Remy Sharp" src="/nike.png" />
              <Avatar alt="Travis Howard" src="/jordan.png" />
            </AvatarGroup>
            <span>+9 Brands</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Shoes />
        <Shoes />
        <Shoes />
      </div>
    </div>
  );
}

export default Card

import { Facebook, Github, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <div className="bg-black py-10 text-white">
      <div className="flex justify-between px-24 max-sm:flex-wrap max-sm:px-2 gap-4">
        <div className="w-1/4 max-sm:w-full">
          <div className="bg-white w-fit rounded-lg mb-10 max-sm:mb-1">
            <img src="/logo.png" alt="Logo" />
          </div>
          <p className="text-xs">
            GeekMart offers a wide range of high-quality products from fashion
            and electronics to home essentials, all at competitive prices. Enjoy
            fast and reliable shipping, exceptional customer service, and secure
            shopping. Choose GeekMart for unbeatable value and a seamless,
            enjoyable shopping experience.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Navigate</h1>
          <ul className="text-sm flex flex-col gap-2">
            <li>About</li>
            <li>products</li>
            <li>Messages</li>
            <li>Order</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Collection</h1>
          <ul className="text-sm flex flex-col gap-2">
            <li>Fashion</li>
            <li>Electronic</li>
            <li>Furniture</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Install App</h1>
          <img src="/App Store.png" alt="" />
          <img src="/Play Store.png" alt="" />
        </div>
      </div>
      <hr className="mx-24 my-5 max-sm:mx-2" />
      <div className="text-xs mx-24 flex justify-between flex-wrap max-sm:mx-2 max-sm:justify-center max-sm:gap-4">
        <h1>&copy; Copyright 2024, all Rights Reserved by GeekLords</h1>
        <div className="flex gap-2">
          <div className="bg-primary-300 p-2 rounded-full">
            <Facebook width={15} height={15} />
          </div>
          <div className="bg-primary-300 p-2 rounded-full">
            <Twitter width={15} height={15} />
          </div>
          <div className="bg-primary-300 p-2 rounded-full">
            <Instagram width={15} height={15} />
          </div>
          <div className="bg-primary-300 p-2 rounded-full">
            <Github width={15} height={15} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

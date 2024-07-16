import { Divider } from '@mui/material';

function SellerHeader() {
  return (
    <div className='flex flex-col w-full bg-white'>
      <header className="flex justify-between items-center w-full px-4">
        <div>
          <img src="/logo.png" alt="" width={80.5} />
        </div>
        <div className="flex items-center justify-between gap-4 text-black text-lg font-light">
          <div className="flex flex-col justify-between text-sm h-full gap-1">
            <span>Mugisha Joseph</span>
            <span className="text-xs text-gray">
              mugishajoseph092@gmail.com
            </span>
          </div>
          <div className="border-2 border-primary-300 rounded-full">
            <img src="/pic.jpeg" className="rounded-full" width={40} alt="" />
          </div>
        </div>
      </header>
      <Divider />
    </div>
  );
}

export default SellerHeader;

import { Tag } from "lucide-react";

function Shoes() {
  return (
    <div className="w-40 bg-white flex flex-col h-36 rounded-2xl">
      <div className="bg-primary-100 text-sm p-3 rounded-2xl">
        <span>Blue Mesh</span>
        <span className="flex text-sm items-center">
          <Tag width={15} />
          <span>200$</span>
        </span>
      </div>
      <img src="/nikee.png" alt="" className="shoes" />
    </div>
  );
}

export default Shoes

import Image from "next/image";
import Link from "next/link";
export type prop = {
  image: string;
  title: string;
};
const NavImages = (propImage: { propImage: prop[] }) => {
  return (
    <div className="flex flex-col gap-1 pl-2 text-sm font-medium md:absolute md:flex-row md:pl-0  md:bg-white md:top-10 md:w-max md:h-auto md:drop-shadow-xl">
      {propImage?.propImage?.map((item: prop) => (
        <Link href="#" className="hover:font-semibold md:p-2" key={item.image}>
          <Image
            src={item.image}
            alt="image"
            width={160}
            height={160}
            className="hidden  md:flex md:w-40 md:h-40 md:rounded-md"
          />
          <div className="md:text-secondary">{item.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default NavImages;

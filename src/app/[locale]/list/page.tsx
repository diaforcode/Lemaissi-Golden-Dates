import SearchBar from "@/Components/SearchBar";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  return (
    <div>
      <div className="flex  flex-col items-center justify-center pt-[10vh]">
        <h2 className="text-3xl font-serif font-bold ">
          Searched for {searchParams.name}
        </h2>
        <p className="p-2">0 Products Found</p>
        <div className="p-2 md:w-[50%]">
          <SearchBar typeBar="search" />
        </div>
      </div>
      <div className="p-5">Result</div>
    </div>
  );
};

export default ListPage;

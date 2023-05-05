import { ApiResponse, Beer } from "@/interfaces";
import { BeerApiService } from "@/services";
import { useEffect, useState } from "react";
import { SingleBeer } from "./single-beer.component";

export const BeerList = () => {
  const [beerResponse, setBeerResponse] = useState<ApiResponse<Beer[]>>();
  const [isLoadingBeers, setLoadingBeers] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoadingBeers(true);

    BeerApiService.getBeers({ page }).then((response) => {
      setBeerResponse(response);
      setLoadingBeers(false);
    });
  }, [page]);

  return (
    <div>
      {isLoadingBeers && <div className="text-center">Loading...</div>}
      {beerResponse?.data && (
        <div className="grid grid-cols-4 grid-flow-row gap-4">
          {beerResponse.data.map((beer) => (
            <SingleBeer key={beer.id} beer={beer} />
          ))}
        </div>
      )}
      {/* pagination */}
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

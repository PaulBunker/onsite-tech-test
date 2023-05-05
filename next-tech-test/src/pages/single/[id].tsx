import React from "react";
import { GetServerSideProps } from "next";
import { BeerApiService } from "@/services";
import { ApiResponse, Beer } from "@/interfaces";

type SingleBeerProps = {
  beer: Beer;
};

const SingleBeer: React.FC<SingleBeerProps> = ({ beer }) => {
  console.log(beer);
  return (
    <div className="bg-slate-700 min-h-screen">
      <div className="container mx-auto py-12">
        <div className="bg-slate-700 rounded-md p-6 shadow-md">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <img
              src={beer.image_url}
              alt={`Image of ${beer.name}`}
              className="object-cover max-w-[381px] max-h-[760px]"
            />
            <div>
              <h1 className="text-blue-400 text-lg font-bold mb-2">
                {beer.name}
              </h1>
              <p className="text-blue-200 text-xs mb-2">{beer.tagline}</p>
              <p className="text-blue-200 text-xs mb-2">ABV: {beer.abv}</p>
              <p className="text-blue-200 text-xs mb-2">
                IBU: {beer.ibu || "N/A"}
              </p>
              <p className="text-blue-200 text-xs mb-2">
                First Brewed: {beer.first_brewed}
              </p>
              <hr className="bg-slate-600 my-4" />
              <p className="text-blue-200 text-xs">{beer.description}</p>
              <p className="text-blue-200 text-xs mt-4">Food Pairing:</p>
              <ul className="list-disc list-inside text-blue-200 text-xs pl-6">
                {beer.food_pairing.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
              <p className="text-blue-200 text-xs mt-4">Brewer&apos;s Tips:</p>
              <p className="text-blue-200 text-xs">{beer.brewers_tips}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SingleBeerProps> = async (
  context
) => {
  const { id } = context.params as { id: string };
  const response: ApiResponse<Beer[]> = await BeerApiService.getBeerById(id);
  console.log(response);
  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      beer: response.data[0],
    },
  };
};

export default SingleBeer;

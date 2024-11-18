"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import BuisnessItem from "./BuisnessItem";

function BuisnessList() {
  const params = useSearchParams();
  const [category, setCategory] = useState("all");
  const [buisnessList, setBuisnessList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    params && setCategory(params.get("category"));
    params && getBuisnessList(params.get("category"));
  }, [params]);

  const getBuisnessList = (category_) => {
    setLoading(true);
    GlobalApi.GetBuisness(category_).then((resp) => {
      setBuisnessList(resp?.restaurants);
      setLoading(false)
    });
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">
        Popular {category === "all" ? "restaurants" : `${category} restaurants`}
      </h2>
      <h2 className="font-bold text-primary">{buisnessList?.length} Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3">
        {!loading? buisnessList.map((restaurants,index)=>(
            <BuisnessItem key={index}
            buisness={restaurants}/>
        )):<div>Loading...</div>
        }
      </div>
    </div>
  );
}

export default BuisnessList;

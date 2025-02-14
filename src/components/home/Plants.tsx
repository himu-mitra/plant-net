import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import axios from "axios";
import LoadingSpinner from "../shared/LoadingSpinner";
const Plants = () => {
  const { data: plants = [], isLoading } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const { data } = await axios.get("/api/get-plants");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      {plants && plants.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {plants.map((plant: any) => (
            <Card key={plant._id} plant={plant} />
          ))}
        </div>
      ) : (
        <p>No Data Availabla</p>
      )}
    </div>
  );
};

export default Plants;

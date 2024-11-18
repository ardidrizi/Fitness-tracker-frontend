import { useUserContext } from "../context/UserContext";

const Favorites = () => {
  const { favorites } = useUserContext();
  console.log("<<<<FAVORITES ::::", favorites);
  return <h1 className="text-4xl font-bold text-gray-800">Favorites</h1>;
};

export default Favorites;

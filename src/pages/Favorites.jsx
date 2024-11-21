import { useUserContext } from "../context/UserContext";

const Favorites = () => {
  const { favorites } = useUserContext();

  console.log("<<<<FAVORITES ::::", favorites);
  return (
    <div className="favorites mt-16">
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite, index) => (
            <div
              key={favorite.id || index}
              className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={favorite.image}
                alt={favorite.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {favorite.name}
                </h2>
                <p className="text-gray-600 mb-2">{favorite.description}</p>
                <p className="text-gray-600 mb-1">
                  Duration: {favorite.duration}
                </p>
                <p className="text-gray-600 mb-1">
                  Difficulty: {favorite.difficulty}
                </p>
                <p className="text-gray-600 mb-1">
                  Equipment: {favorite.equipment}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-16">No favorites yet!</p>
      )}
    </div>
  );
};

export default Favorites;

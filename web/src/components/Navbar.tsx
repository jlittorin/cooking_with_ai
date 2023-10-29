const Navbar = () => {
  return (
    <div className="flex p-4 w-auto justify-between items-baseline bg-white shadow-md rounded m-4">
      <h1 className="text-black font-semibold text-3xl">A Cooking Site</h1>
      <ul className="flex">
        <li className="px-4">Home</li>
        <li className="px-4">Recipes</li>
      </ul>
    </div>
  );
};

export default Navbar;

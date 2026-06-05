function Navbar() {

  return (
    <div
      className="
      bg-white
      h-16
      px-8
      flex
      items-center
      justify-between
      border-b
      "
    >

      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <span className="text-gray-600">
          Welcome Admin
        </span>

        

      </div>

    </div>
  );

}

export default Navbar;
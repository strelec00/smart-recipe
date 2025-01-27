const Main = () => {
  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="bg-[#EF5C0C] h-[500px] w-screen">
          {/* About Us */}
          <p className="text-center text-[40px] font-crimson mt-2 text-white ">
            About Us
          </p>

          {/* Content */}
          <div className="flex w-full h-full">
            <div className="w-1/2 text-[18px] h-full text-left pl-28 mt-10 text-white font-light tracking-wider">
              <p>
                At Smart Recipe, we make cooking simple and personalized. Log in
                to our recipe maker, enter the ingredients you have, and get
                recipes tailored to your preferences. Powered by OpenAI, our AI
                creates unique, delicious meals just for you. Transform your
                ingredients into amazing dishes with ease—only at Smart Recipe!
              </p>
              <p className="mt-6">
                Turn your ingredients into amazing meals with Smart Recipe!
              </p>
              <button className="relative mt-20  inline-block bg-white text-black font-bold px-6 py-2 skew-x-[-12deg] shadow-lg hover:shadow-xl transition-all duration-200 ">
                <span className="inline-block ">EXPLORE</span>
              </button>
            </div>
            {/* Image */}
            <div className="w-1/2 h-[50px] ml-36 mt-5">
              <img
                src="../src/assets/food3.png"
                alt=""
                className="h-[380px] w-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

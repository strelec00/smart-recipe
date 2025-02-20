import { useState } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/icons/male-user.png";
import axios from "axios";

type HeaderProps = {
  logged: boolean;
};

const Header = ({ logged }: HeaderProps) => {
  const [ingredients, setIngredients] = useState<string[]>([]);

  const [ingredient, setIngredient] = useState("");

  const handleSearch = () => {
    if (ingredient.trim() !== "" && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setIngredient(""); // Clear input after adding
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Content & Background */}
      <div className="flex h-full w-full">
        {logged && (
          <div className="xs:m-5 m-2 sm:w-[75px] sm:h-[75px] w-[60px] h-[60px] absolute">
            <Link to="/">
              <img src={profilePic} alt="" className="rounded-full" />
            </Link>
          </div>
        )}
        {/* Content */}
        <div className="xmd:w-1/3 w-full h-full sm:px-2 px-2 xl:pl-10 flex flex-col xmd:pt-[17%] xmd:justify-normal justify-center">
          <div className="w-full text-center">
            <p className="text-[52px] font-crimson font-light">
              Be your own Chef
            </p>
            {!logged && (
              <>
                <p className="text-[22px] font-crimson px-[0px] text-[#585147]">
                  Create recipes with ingredients you have at home, access our
                  AI recipe maker
                </p>
                <div className="flex justify-center mt-[50px] space-x-9">
                  <button className="rounded-[30px] border-black border w-[148px] h-[41px]">
                    Learn more
                  </button>
                  <Link to="/login">
                    <button className="bg-[#EE4C0C] rounded-[30px] w-[148px] h-[41px] text-stone-50 font-medium">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}
            {logged && (
              <>
                <p className="text-[22px] font-crimson px-[0px] text-[#585147]">
                  Type in your ingredients to discover new recipes
                </p>

                <div className="flex justify-center mt-[40px]">
                  <div className="flex items-center bg-[#EEA47F] rounded-full px-4 py-2 w-full max-w-[500px]">
                    <input
                      type="text"
                      placeholder="Search for ingredients"
                      value={ingredient}
                      onChange={(e) => setIngredient(e.target.value)}
                      onKeyDown={handleKeyDown} // Handle Enter key press
                      className="bg-transparent outline-none text-[#34322F] pl-6 flex-grow placeholder:text-[#504535] placeholder:font-light text-[15px]"
                    />
                    <button
                      onClick={handleSearch}
                      className="text-black pl-[5px] border-l border-[#504535] border-opacity-80"
                    >
                      <img
                        src="../src/assets/icons/search.png"
                        alt=""
                        className="opacity-60"
                      />
                    </button>
                  </div>
                </div>

                <div className="flex justify-center mt-[40px] xs:space-x-9 space-x-5">
                  <Link to="/id">
                    <button className="rounded-[30px] border-black border w-[148px] h-[41px]">
                      Submit
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="bg-[#EE4C0C] rounded-[30px] w-[148px] h-[41px] text-stone-50 font-medium">
                      OpenAI
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Background Image */}
        <div
          className="xmd:w-2/3 bg-[url('../src/assets/bg_chef_red.png')] xmd:block hidden bg-right-top bg-no-repeat bg-contain"
          id="home"
        ></div>
      </div>
      {/* Ingredients List */}
      <div className="flex">
        <div className="flex flex-wrap space-x-3 ml-5 ">
          {ingredients.map((item) => (
            <div
              key={item}
              className="flex border-[#333030] border-[1px] border-opacity-50 rounded-[20px] px-[10px] py-[2px] mb-4"
            >
              <p className="text-[#6E6A6A] text-[13px]">{item}</p>
              <button
                className="ml-[5px]"
                onClick={() =>
                  setIngredients(ingredients.filter((i) => i !== item))
                }
              >
                <img src="../src/assets/icons/exit.png" alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;

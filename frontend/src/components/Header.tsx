import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import profilePic from "../assets/icons/male-user.png";
import dataIngredients from "../data/ingredients.json";

type HeaderProps = {
  logged: boolean;
};

const Header = ({ logged }: HeaderProps) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [value, setValue] = useState("");
  const [errorSuggestionMessage, setErrorSuggestionMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const suggestionRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidIngredient =
    value.trim() !== "" &&
    !ingredients.includes(value) &&
    dataIngredients.some(
      (item) => item.ingredient.toLowerCase() === value.toLowerCase()
    );

  const isUsed = dataIngredients.some(
    (item) => item.ingredient.toLowerCase() === value.toLowerCase()
  );

  const handleSearch = () => {
    setSuggestionOpen(true);
    if (isValidIngredient) {
      setIngredients([...ingredients, value]);
      setValue("");
      setErrorSuggestionMessage("");
      setSelectedIndex(-1);
    } else {
      if (isUsed) {
        setErrorSuggestionMessage("Ingredient already used!");
      } else {
        setErrorSuggestionMessage("Ingredient doesn't exist!");
      }
      setValue("");
    }
  };

  const filteredSuggestions = dataIngredients
    .filter((item) => {
      const searchTerm = value.toLowerCase();
      const ingredient = item.ingredient.toLowerCase();
      return (
        searchTerm &&
        ingredient.startsWith(searchTerm) &&
        searchTerm !== ingredient
      );
    })
    .slice(0, 4);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex !== -1) {
          setValue(filteredSuggestions[selectedIndex].ingredient);
          setSuggestionOpen(false);
          setSelectedIndex(-1);
        } else {
          handleSearch();
        }
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  // Close suggestion box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Content & Background */}
      <div className="flex h-full w-full">
        {logged && (
          <div className="xs:m-5 m-2 sm:w-[75px] sm:h-[75px] w-[60px] h-[60px] absolute">
            <Link to="/profile">
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
            {/* Search Content */}
            {logged && (
              <>
                <p className="text-[22px] font-crimson px-[0px] text-[#585147]">
                  Type in your ingredients to discover new recipes
                </p>

                {/* Search Input */}
                <div className="flex flex-col items-center mt-[40px]">
                  {errorSuggestionMessage && (
                    <div className=" text-red-600 pb-2 -mt-6">
                      {errorSuggestionMessage}
                    </div>
                  )}
                  <div className="flex items-center bg-[#EEA47F] rounded-full px-4 py-2 w-full max-w-[500px] ">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search for ingredients"
                      value={value}
                      onBlur={() => setSuggestionOpen(false)}
                      onFocus={() => setSuggestionOpen(true)}
                      onChange={(e) => setValue(e.target.value)}
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

                {/* Suggestion Tab */}
                <div className="relative">
                  {suggestionOpen && (
                    <div
                      ref={suggestionRef}
                      className="absolute top-1 left-0 w-full bg-white rounded-lg mt-1 z-20 shadow-lg border border-gray-200 overflow-hidden"
                    >
                      {filteredSuggestions.map((item, index) => (
                        <div
                          key={item.ingredient}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setValue(item.ingredient);
                            setSuggestionOpen(false);
                            setSelectedIndex(-1);
                          }}
                          className={`p-2 cursor-pointer ${
                            selectedIndex === index
                              ? "bg-[#EE4C0C] text-white rounded-lg"
                              : "hover:bg-[#EEA47F]"
                          }`}
                        >
                          {item.ingredient}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit & OpenAI buttons */}
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
      {/* Botttom Ingredients List */}
      <div className="flex min-h-[40px]">
        <div className="flex flex-wrap space-x-3 ml-5 ">
          {ingredients.map((item) => (
            <div
              key={item}
              className="flex border-[#333030] border-[1px] border-opacity-50 rounded-[20px] px-[10px] py-[2px] mb-4"
            >
              <p className="text-[#6E6A6A] text-[13px]">{item}</p>
              <button
                className="ml-[5px]"
                onClick={() => {
                  setIngredients(ingredients.filter((i) => i !== item));
                }}
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

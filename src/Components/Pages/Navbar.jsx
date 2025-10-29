import React, { useState, useEffect } from 'react';
import { FaRegUser, FaBars, FaGlobe } from "react-icons/fa"; 
import { IoSearch, IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { AllDataprovice, menu } from '../data';

// Language options
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'km', name: 'ភាសាខ្មែរ' },
  { code: 'fr', name: 'Français' },
  { code: 'th', name: 'ภาษาไทย' },
  { code: 'zh-CN', name: '中文' },
];

// Google Translate trigger
const triggerGoogleTranslate = (langCode) => {
  if (langCode === 'en') {
    window.location.hash = '';
  } else {
    window.location.hash = `#googtrans(en|${langCode})`;
  }

  setTimeout(() => {
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event('change'));
    }
  }, 100);

  if (window.location.hash.includes('googtrans')) {
    window.location.reload();
  }
};

const Navbar = () => {
  const [opensidebar, setOpensidebar] = useState(false);
  const [opensearch, setOpensearch] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false); 
  const [openLangDropdown, setOpenLangDropdown] = useState(false); 
  const [searchData, setSearchData] = useState("");
  console.log(searchData);
  

  const FilterProduct = AllDataprovice.filter((s) =>
    s.name.toLowerCase().includes(searchData.toLowerCase())
  );

  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }
  }, []);

  const handleLanguageChange = (code) => {
    triggerGoogleTranslate(code);
    setOpenLangDropdown(false);
  };

  const navigate = useNavigate();

  return (
    <div
      className={`font-poppins w-full shadow-md sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-white' : 'bg-black'
      }`}
    >
      {/* Google Translate container */}
      <div id="google_translate_element"></div>

      {/* Navbar container */}
      <div className="w-full h-[80px] px-6 md:px-14 flex justify-between items-center relative">
        {/* Logo + Menu */}
        <div className="flex items-center gap-80">
          <Link to="/" className="flex items-center gap-2">
            <span
              className={`text-3xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-[#8BC34A]' : 'text-[#8BC34A]'
              }`}
            >
              Tourism
            </span>
          </Link>
          <ul className="lg:flex hidden gap-10 items-center font-medium">
            {menu.map((u) => (
              <li className="group relative" key={u.id}>
                <Link
                  to={u.link}
                  className={`text-xl transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-800 hover:text-[#8BC34A]'
                      : 'text-white hover:text-[#8BC34A]'
                  }`}
                >
                  {u.name}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#8BC34A] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Icons + Language + Login */}
        <div className="flex items-center gap-6 relative">
          {/* Language Dropdown */}
          <div className="relative hidden lg:block">
            <FaGlobe
              onClick={() => setOpenLangDropdown(!openLangDropdown)}
              className={`text-2xl cursor-pointer transition-colors duration-300 ${
                scrolled
                  ? 'text-gray-700 hover:text-[#8BC34A]'
                  : 'text-gray-200 hover:text-[#8BC34A]'
              }`}
            />
            {openLangDropdown && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-[60] border border-gray-200">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#8BC34A] hover:text-white transition-colors duration-200"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Search */}
          <IoSearch
            onClick={() => setOpensearch(!opensearch)}
            className={`hidden lg:flex text-2xl cursor-pointer transition-colors duration-300 ${
              scrolled ? 'text-gray-700' : 'text-gray-200'
            }`}
          />

          {/* Desktop Login */}
          <button
            onClick={() => setOpenLogin(true)}
            className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl shadow-md font-semibold transition-all ${
              scrolled
                ? 'bg-[#8BC34A] text-white hover:opacity-90'
                : 'bg-[#8BC34A] text-white hover:opacity-90'
            }`}
          >
            <FaRegUser className="text-lg" />
            Login
          </button>

          {/* Mobile Icons */}
          <div className="lg:hidden flex items-center gap-4">
            <FaGlobe
              onClick={() => setOpenLangDropdown(!openLangDropdown)}
              className={`text-2xl cursor-pointer transition-colors duration-300 ${
                scrolled ? 'text-gray-700' : 'text-gray-200'
              }`}
            />
            <IoSearch
              onClick={() => setOpensearch(!opensearch)}
              className={`text-2xl transition-colors duration-300 ${
                scrolled ? 'text-gray-700' : 'text-gray-200'
              }`}
            />
            <FaBars
              onClick={() => setOpensidebar(!opensidebar)}
              className={`text-2xl transition-colors duration-300 ${
                scrolled ? 'text-gray-700' : 'text-gray-200'
              }`}
            />
          </div>
        </div>
      </div>

      {/* 🔥 Restored Old Search Dropdown Layout 🔥 */}
      <div
        className={`absolute top-0 left-0 w-full z-50 flex flex-col items-center bg-gray-200 md:bg-black/80 px-5 md:px-10 border-b border-gray-200 md:h-[220px] h-[200px]
          shadow-md overflow-hidden transition-all duration-300
          ${opensearch ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="relative w-85 md:w-[600px] flex items-center mt-5">
          <IoSearch className="absolute left-3 text-gray-500 text-xl" />
          <input
            onChange={(e) => setSearchData(e.target.value)}
            value={searchData}
            type="text"
            placeholder="Search for your perfect place..."
            className="w-full h-[45px] md:h-[52px] border border-gray-300 px-10 md:px-10 rounded-2xl 
                        text-base md:text-lg text-white placeholder-gray-400 focus:border-blue-500
                        shadow-sm transition-all outline-none"
          />
          <IoCloseSharp
            onClick={() => setOpensearch(false)}
            className="absolute right-3 text-gray-500 text-xl cursor-pointer"
          />
        </div>

        {/* 🔍 Search Result Dropdown */}
        <ul className="bg-white w-85 md:w-[900px] mt-3 rounded-xl shadow-lg max-h-[300px] overflow-y-auto">
          {FilterProduct.length > 0 ? (
            FilterProduct.map((p, i) => (
              <li
                key={i}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-none"
                onClick={() => navigate(`${p.linkUrl}`)} // 👉 អ្នកអាចប្ដូរទៅ navigate ឬបង្ហាញលម្អិតបាន
              >
                {/* Product Image */}
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded-lg border"
                />
                {/* Product Name */}
                <div className="flex-1">
                  <h1 className="text-sm md:text-base font-medium text-gray-800">
                    {p.name}
                  </h1>
                  <p className="text-xs text-gray-500">{p.category}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center py-3 text-sm">
              មិនមានផលិតផលត្រូវបានរកឃើញ
            </li>
          )}
        </ul>
      </div>

      {/* Sidebar (Mobile) */}
      <div
        className={`w-[75%] md:w-1/2 h-full fixed z-50 top-0 left-0 bg-gradient-to-b from-purple-600 to-pink-500 text-white lg:hidden shadow-black/5
          ${opensidebar ? 'translate-x-0' : '-translate-x-full'} transition-all duration-400 ease-in-out`}
      >
        <div className="w-full h-[80px] px-4 flex items-center justify-between border-b border-white">
          <a href="/" className="text-3xl font-bold text-white hover:text-gray-100 transition-colors duration-300">
            Tourist
          </a>
          <IoCloseSharp
            className="text-white text-3xl md:text-4xl cursor-pointer"
            onClick={() => setOpensidebar(false)}
          />
        </div>

        <ul>
          {menu.map((u) => (
            <li
              className="p-4 py-3 hover:bg-emerald-500/30 rounded-lg transition-all duration-300 ease-in-out"
              key={u.id}
            >
              <a
                href={u.link}
                className="text-xl text-white hover:text-emerald-200 transition-all duration-300 ease-in-out"
              >
                {u.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="p-4">
          <button
            onClick={() => setOpenLogin(true)}
            className="w-[80%] mx-auto mt-6 py-2 bg-white text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white transition-all duration-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {openLogin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
          onClick={() => setOpenLogin(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-2xl w-[90%] md:w-[400px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <IoCloseSharp
              onClick={() => setOpenLogin(false)}
              className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-700"
            />
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md outline-none focus:border-[#8BC34A]"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-md outline-none focus:border-[#8BC34A]"
              />
              <button
                type="submit"
                className="p-3 bg-[#8BC34A] text-white rounded-md font-semibold hover:opacity-90 transition-all"
              >
                Log In
              </button>
            </form>
            <p className="text-sm text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#8BC34A] font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

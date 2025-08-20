/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import currenciesWithFlags from "../data/currencies-with-flags.json";
import { FaCheck } from "react-icons/fa";

const POPULAR_CODES = ["USD", "AED", "GBP"];

const currencyOptions = currenciesWithFlags.map((c) => ({
  value: c.code,
  label: c.code,
  flag: c.flag,
  code: c.code,
  name: c.name,
  countryCode: c.countryCode,
}));

const popularCurrencies = currencyOptions.filter((c) =>
  POPULAR_CODES.includes(c.code)
);
const allCurrencies = currencyOptions
  .filter((c) => !POPULAR_CODES.includes(c.code))
  .sort((a, b) => a.name.localeCompare(b.name));

const POPULAR_CRYPTO = ["bitcoin", "ethereum", "binancecoin", "tether"];

const CryptoSelectModal = ({
  open,
  onClose,
  onSelect,
  selected,
  cryptoOptions,
}) => {
  const [search, setSearch] = useState("");
  const filteredPopular = cryptoOptions.filter(
    (c) =>
      POPULAR_CRYPTO.includes(c.value) &&
      (c.label.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredAll = cryptoOptions.filter(
    (c) =>
      !POPULAR_CRYPTO.includes(c.value) &&
      (c.label.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase()))
  );
  const modalRef = useRef(null);

  // Trap focus inside modal
  useEffect(() => {
    if (!open) return;
    const focusable = modalRef.current?.querySelectorAll("button, input");
    if (focusable && focusable.length) focusable[0].focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && focusable && focusable.length) {
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Animated Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full mx-auto bg-[#18191A] rounded-t-3xl z-50 flex  flex-col shadow-2xl border-t border-[#232526]"
            style={{ height: "80vh", maxHeight: "650px" }}
            tabIndex={-1}
          >
            {/* Drag handle */}
            <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mt-3 mb-2 px-4" />
            {/* Sticky header/search */}
            <div className="sticky top-0 z-10 bg-[#18191A] pt-2 pb-2">
           <div className="flex items-center gap-10  px-4 mb-4">
           <button
                className=" text-2xl text-white"
                onClick={onClose}
                aria-label="Close selector"
              >
                &larr;
              </button>
              <div className="text-center text-2xl font-semibold  text-white px-4">
                Select Currency
              </div>
           </div>
              <input
                className="w-[330px] bg-input rounded-xl px-4 py-3 mb-2 text-white placeholder-gray-400 outline-none mx-4 mb-4"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            {/* Scrollable list area */}
            <div className="overflow-y-auto flex-1 px-3 mx-2 pb-4 custom-scrollbar">
              <div>
                <div className="text-xs text-gray-400 mb-2 font-medium">
                  POPULAR CURRENCIES
                </div>
                {filteredPopular.length === 0 && (
                  <div className="text-gray-500 text-sm mb-4">No results</div>
                )}
                {filteredPopular.map((c) => (
                  <button
                    key={c.value}
                    className={`flex items-center justify-between w-full py-3 px-2 rounded-lg mb-1 hover:bg-[#232526] transition-colors group ${
                      selected?.value === c.value ? "bg-[#232526]" : ""
                    }`}
                    onClick={() => {
                      onSelect(c);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-3 px-3">
                      <img
                        src={c.icon}
                        alt={c.symbol}
                        className="w-8 h-8 rounded-full bg-white"
                      />
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm text-white font-medium">
                          {c.label}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {c.symbol.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300 font-semibold">
                        {c.symbol.toUpperCase()}
                      </span>
                      {selected?.value === c.value && (
                        <FaCheck className="text-green-400 text-sm" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 px-3">
                <div className="text-xs text-gray-400 mb-2 font-medium">
                  ALL CURRENCIES
                </div>
                {filteredAll.length === 0 && (
                  <div className="text-gray-500 text-sm">No results</div>
                )}
                {filteredAll.map((c) => (
                  <button
                    key={c.value}
                    className={`flex items-center justify-between w-full py-3 px-2 rounded-lg mb-1 hover:bg-[#232526] transition-colors group ${
                      selected?.value === c.value ? "bg-[#232526]" : ""
                    }`}
                    onClick={() => {
                      onSelect(c);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.icon}
                        alt={c.symbol}
                        className="w-8 h-8 rounded-full bg-white"
                      />
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-white font-medium">
                          {c.label}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {c.symbol.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300 font-semibold">
                        {c.symbol.toUpperCase()}
                      </span>
                      {selected?.value === c.value && (
                        <FaCheck className="text-green-400 text-sm" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CurrencySelectModal = ({ open, onClose, onSelect, selected }) => {
  const [search, setSearch] = useState("");
  const filteredPopular = popularCurrencies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );
  const filteredAll = allCurrencies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );
  const modalRef = useRef(null);

  // Trap focus inside modal
  useEffect(() => {
    if (!open) return;
    const focusable = modalRef.current?.querySelectorAll("button, input");
    if (focusable && focusable.length) focusable[0].focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && focusable && focusable.length) {
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Animated Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full mx-auto bg-[#18191A] rounded-t-3xl z-50 flex flex-col shadow-2xl border-t border-[#232526]"
            style={{ height: "80vh", maxHeight: "650px" }}
            tabIndex={-1}
          >
            {/* Drag handle */}
            <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mt-3 mb-2" />
            {/* Sticky header/search */}
            <div className="sticky top-0 z-10 bg-[#18191A] pt-2 pb-2">
       <div className="flex items-center gap-10  px-4 mb-4">
       <button
                className=" text-2xl text-white"
                onClick={onClose}
                aria-label="Close selector"
              >
                &larr;
              </button>
                <div className="text-center text-2xl font-semibold  text-white px-4">
                Select Currency
              </div>
       </div>
              <input
                className="w-[330px] bg-input rounded-xl px-4 py-3 mb-2 text-white placeholder-gray-400 outline-none mx-4 mb-4"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            {/* Scrollable list area */}
            <div className="overflow-y-auto flex-1 px-3 pb-4 custom-scrollbar">
              <div>
                  <div className="text-xs text-gray-400 mb-2 font-medium">
                  POPULAR CURRENCIES
                </div>
                {filteredPopular.length === 0 && (
                  <div className="text-gray-500 text-sm mb-4">No results</div>
                )}
                {filteredPopular.map((c) => (
                  <button
                    key={c.code}
                    className={`flex items-center justify-between w-full py-3 px-2 rounded-lg mb-1 hover:bg-[#232526] transition-colors group ${
                      selected?.code === c.code ? "bg-[#232526]" : ""
                    }`}
                    onClick={() => {
                      onSelect(c);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-3 px-3">
                      <img
                        src={c.flag}
                        alt={c.code}
                        className="w-8 h-8 rounded-full bg-white"
                      />
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm text-white font-medium">
                          {c.name}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {c.countryCode}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300 font-semibold">
                        {c.code}
                      </span>
                      {selected?.code === c.code && (
                        <FaCheck className="text-green-400 text-sm" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 ">
                <div className="text-xs text-gray-400 mb-2 font-medium">
                  ALL CURRENCIES
                </div>
                {filteredAll.length === 0 && (
                  <div className="text-gray-500 text-sm">No results</div>
                )}
                {filteredAll.map((c) => (
                  <button
                    key={c.code}
                    className={`flex items-center justify-between w-full py-3 px-2 rounded-lg mb-1 hover:bg-[#232526] transition-colors group ${
                      selected?.code === c.code ? "bg-[#232526]" : ""
                    }`}
                    onClick={() => {
                      onSelect(c);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-3 px-3">
                      <img
                        src={c.flag}
                        alt={c.code}
                        className="w-8 h-8 rounded-full bg-white"
                      />
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm text-white font-medium">
                          {c.name}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {c.countryCode}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300 font-semibold">
                        {c.code}
                      </span>
                      {selected?.code === c.code && (
                          <FaCheck className="text-green-400 text-sm" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SwapHome = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [amount, setAmount] = useState("789.315");
  const [screen, setScreen] = useState("swap"); // 'swap', 'loading', 'select-quote', 'confirm', 'success'
  const [selectedQuote, setSelectedQuote] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dummy quote data for demo
  const bestQuote = {
    provider: "Paybis",
    amount: "1.098",
    currency: selectedCrypto?.label || "ETH",
    forAmount: amount,
    forCurrency: selectedCurrency?.code || "USD",
    rate: "3,684.86",
  };
  const otherQuotes = [
    {
      provider: "Transfi",
      amount: "1.098",
      currency: bestQuote.currency,
      forAmount: amount,
      forCurrency: bestQuote.forCurrency,
    },
    {
      provider: "Paybis",
      amount: "1.098",
      currency: bestQuote.currency,
      forAmount: amount,
      forCurrency: bestQuote.forCurrency,
    },
    {
      provider: "Zodia",
      amount: "1.098",
      currency: bestQuote.currency,
      forAmount: amount,
      forCurrency: bestQuote.forCurrency,
    },
    {
      provider: "Transfi",
      amount: "1.098",
      currency: bestQuote.currency,
      forAmount: amount,
      forCurrency: bestQuote.forCurrency,
    },
  ];

  // Set default currency by geolocation
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code) {
          const match = currencyOptions.find(
            (c) => c.countryCode === data.country_code
          );
          if (match) setSelectedCurrency(match);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch top 250 coins from CoinGecko
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((coin) => ({
          value: coin.id,
          label: coin.name,
          symbol: coin.symbol,
          icon: coin.image,
        }));
        setCryptoOptions(options);
        setSelectedCrypto(options[0]);
      })
      .catch(() => {});
  }, []);

  // Handle fetch best quote
  const handleFetchQuote = () => {
    setScreen("loading");
    setTimeout(() => setScreen("select-quote"), 3000);
  };

  // Handle continue to confirm
  const handleContinue = () => {
    setScreen("confirm");
  };

  // Handle confirm swap
  const handleConfirm = () => {
    setScreen("loading");
    setTimeout(() => {
      setScreen("success");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setScreen("swap");
      }, 5000);
    }, 5000);
  };

  // Loader screen
  if (screen === "loading") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        <button
          className="absolute left-4 top-4 text-2xl text-white"
          onClick={() => setScreen("swap")}
        >
          &larr;
        </button>
        <div className="text-2xl font-semibold mb-8 mt-24 text-white text-center">
          Please wait...
        </div>
        <div className="flex items-center justify-center mt-2">
          <svg
            className="animate-spin h-16 w-16 text-white"
            viewBox="0 0 50 50"
          >
            <circle
              className="opacity-25"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
            />
            <circle
              className="opacity-75"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              strokeDasharray="90 150"
              strokeDashoffset="0"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Success popup
  if (screen === "success" && showSuccess) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center">
          <div className="bg-[#18191A] rounded-2xl px-8 py-10 shadow-2xl flex flex-col items-center">
            <svg
              className="h-16 w-16 text-green-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div className="text-2xl font-semibold text-white mb-2">
              Successfully Swapped
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Confirm page
  if (screen === "confirm") {
    return (
      <div className="w-full h-full flex flex-col relative px-4 pt-4 pb-8">
        <button
          className="absolute left-4 top-4 text-2xl text-white"
          onClick={() => setScreen("select-quote")}
        >
          &larr;
        </button>
        <div className="text-center text-2xl font-semibold mb-6 text-white">
          Confirm And Proceed
        </div>
        <div className="mb-6">
          <div className="text-xs text-gray-400 mb-2">YOU SPEND</div>
          <div className="flex items-center bg-[#232526] rounded-xl px-5 py-4 mb-4">
            <span className="text-3xl font-semibold text-white flex-1">
              {amount}
            </span>
            <div className="flex items-center gap-2">
              <img
                src={selectedCurrency.flag}
                alt={selectedCurrency.code}
                className="w-6 h-6 rounded-sm"
              />
              <span className="text-base font-medium">
                {selectedCurrency.code}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-400 mb-2">YOU GET</div>
          <div className="flex items-center bg-[#232526] rounded-xl px-5 py-4 mb-4">
            <span className="text-3xl font-semibold text-white flex-1">
              {bestQuote.amount}
            </span>
            <div className="flex items-center gap-2">
              <img
                src={selectedCrypto?.icon}
                alt={selectedCrypto?.symbol}
                className="w-6 h-6 rounded-full bg-white"
              />
              <span className="text-base font-medium">
                {selectedCrypto?.symbol?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-[#232526] rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
            <span>
              1 {bestQuote.currency} = {bestQuote.rate} {bestQuote.forCurrency}
            </span>
            <span className="flex items-center gap-1">
              00:58{" "}
              <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin align-middle"></span>
            </span>
          </div>
          <div className="text-white text-base mb-2">
            You get{" "}
            <span className="font-bold">
              {bestQuote.amount} {bestQuote.currency}
            </span>{" "}
            for{" "}
            <span className="font-bold">
              {bestQuote.forAmount} {bestQuote.forCurrency}
            </span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm mb-1">
            <span>Service fee</span>
            <span>15.242969 ETH</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm mb-1">
            <span>Network fee</span>
            <span>1.437631 ETH</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>
              Including the fees{" "}
              <span
                className="ml-1 cursor-pointer"
                title="Total including all fees"
              >
                &#9432;
              </span>
            </span>
            <span>16.6806601 ETH</span>
          </div>
        </div>
        <button
          className="w-full bg-teal-700 hover:bg-teal-800 transition-colors text-white rounded-xl py-4 text-lg font-semibold mt-8"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    );
  }

  // Select Quote screen
  if (screen === "select-quote") {
    return (
      <div className="w-full h-full flex flex-col relative px-4 pt-4 pb-8">
   <div className="flex items-center gap-10  px-4 mb-4">
   <button
          className=" text-2xl text-white"
          onClick={() => setScreen("swap")}
        >
          &larr;
        </button>
        <div className="text-center text-2xl font-semibold  text-white px-4">
          Select Quote
        </div>
   </div>
        <div className="text-lg font-semibold text-white mb-4 px-4  mt-4 ">
          Best Quote{" "}
          <span className="float-right text-xs font-normal text-gray-400 flex items-center gap-1">
            00:25{" "}
            <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin align-middle"></span>
          </span>
        </div>
        <div
          className={`border-2 rounded-2xl p-5 mb-6 px-4 bg-[#373737]  ${
            selectedQuote === 0 ? "border-[#106A6A]" : "border-[#232526]"
          }`}
          onClick={() => setSelectedQuote(0)}
          style={{ cursor: "pointer" }}
        >
          <div className="text-gray-400 mb-1">{bestQuote.provider}</div>
          <div className="text-white text-lg font-bold mb-1">
            Get{" "}
            <span className="font-extrabold">
              {bestQuote.amount} {bestQuote.currency}
            </span>{" "}
            for{" "}
            <span className="font-extrabold">
              {bestQuote.forAmount} {bestQuote.forCurrency}
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            1 {bestQuote.currency} = {bestQuote.rate} {bestQuote.forCurrency}
          </div>
        </div>
        <div className="text-gray-400 text-base mb-2 mt-2">others</div>
        <div className="flex-1 overflow-y-auto">
          {otherQuotes.map((q, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-[#232526] py-3 cursor-pointer"
              onClick={() => setSelectedQuote(i + 1)}
            >
              <div>
                <span className="text-white font-bold">
                  Get {q.amount} {q.currency}
                </span>{" "}
                for{" "}
                <span className="font-bold text-white">
                  {q.forAmount} {q.forCurrency}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">{q.provider}</span>
                <span
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    selectedQuote === i + 1
                      ? "border-teal-600"
                      : "border-[#232526]"
                  }`}
                >
                  {selectedQuote === i + 1 && (
                    <span className="w-3 h-3 bg-teal-600 rounded-full block"></span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full bg-teal-700 hover:bg-teal-800 transition-colors text-white rounded-xl py-4 text-lg font-semibold mt-8"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className=" px-6 py-8 w-full max-w-sm mx-auto  shadow-xl text-white font-sans h-[650px]  flex flex-col relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 z-10">
        <div className="font-black text-2xl tracking-widest flex items-center">
          <img src="/swap.png" alt="logo" className=" object-contain" />
        </div>
        <img src="/cat.png" alt="menu" className=" object-contain" />
      </div>
      {/* Main Content */}
      <div className="flex flex-col gap-6 flex-1 justify-center z-10">
        {/* Spend input */}
        <div>
          <div className="text-xs text-gray-400 font-medium mb-2 ml-1">
            YOU SPEND
          </div>
          <div className="flex items-center justify-between bg-input rounded-xl px-3 py-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none text-white text-2xl sm:text-3xl font-medium w-40 outline-none mr-3 appearance-none hide-arrows"
              style={{ MozAppearance: "textfield" }}
            />
            <div className="w-fit">
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#232526] transition-colors text-sm"
                onClick={() => setShowCurrencyModal(true)}
                type="button"
              >
                <img
                  src={selectedCurrency.flag}
                  alt={selectedCurrency.code}
                  className="w-4 h-4 rounded-sm"
                />
                <span className="text-sm font-medium">
                  {selectedCurrency.code}
                </span>
                <MdKeyboardArrowDown className="inline text-lg ml-1" />
              </button>
            </div>
          </div>
        </div>
        {/* For token select */}
        <div>
          <div className="text-xs text-gray-400 font-medium mb-2 ml-1">FOR</div>
          <div className="flex items-center bg-input rounded-xl px-3 py-4 text-lg font-medium">
            <div className="min-w-[150px] w-full">
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#232526] transition-colors w-full text-sm"
                onClick={() => setShowCryptoModal(true)}
                type="button"
              >
                {selectedCrypto && (
                  <>
                    <img
                      src={selectedCrypto.icon}
                      alt={selectedCrypto.symbol}
                      className="w-5 h-5 rounded-full bg-white"
                    />
                    <span className="text-sm font-medium">
                      {selectedCrypto.label}
                    </span>
                    <span className="text-xs text-gray-400 uppercase ml-1">
                      {selectedCrypto.symbol}
                    </span>
                  </>
                )}
                <MdKeyboardArrowDown className="inline text-lg ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Fetch button */}
      <button
        className="w-full bg-[#106A6A] hover:bg-teal-800 transition-colors text-white rounded-xl py-4 text-base font-medium mt-8 cursor-pointer"
        onClick={handleFetchQuote}
      >
        Fetch Best Quote
      </button>

      <style>{`
        /* Hide number input arrows for all browsers */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #232526; border-radius: 8px; }
      `}</style>

      <CurrencySelectModal
        open={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        onSelect={setSelectedCurrency}
        selected={selectedCurrency}
      />
      <CryptoSelectModal
        open={showCryptoModal}
        onClose={() => setShowCryptoModal(false)}
        onSelect={setSelectedCrypto}
        selected={selectedCrypto}
        cryptoOptions={cryptoOptions}
      />
    </motion.div>
  );
};

export default SwapHome;

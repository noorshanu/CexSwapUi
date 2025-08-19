import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { motion } from 'framer-motion'
import Select from 'react-select'
import currenciesWithFlags from '../data/currencies-with-flags.json'

const currencyOptions = currenciesWithFlags.map(c => ({
  value: c.code,
  label: `${c.code}`,
  flag: c.flag,
  code: c.code,

  countryCode: c.countryCode
}))

const formatCurrencyOption = ({ code, flag }) => (
  <div className="flex items-center gap-2">
    <img src={flag} alt={code} className="w-6 h-6 rounded-sm" />
    <span>{code}</span>
  </div>
)

const formatCryptoOption = ({ label, icon, symbol }) => (
  <div className="flex items-center gap-2">
    {icon && <img src={icon} alt={symbol} className="w-6 h-6 rounded-full" />}
    <span>{label} <span className="text-xs text-gray-400 uppercase ml-1">{symbol}</span></span>
  </div>
)

const SwapHome = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0])
  const [cryptoOptions, setCryptoOptions] = useState([])
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [amount, setAmount] = useState('789.315')

  // Set default currency by geolocation
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code) {
          const match = currencyOptions.find(c => c.countryCode === data.country_code)
          if (match) setSelectedCurrency(match)
        }
      })
      .catch(() => {})
  }, [])

  // Fetch top 250 coins from CoinGecko
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
      .then(res => res.json())
      .then(data => {
        const options = data.map(coin => ({
          value: coin.id,
          label: coin.name,
          symbol: coin.symbol,
          icon: coin.image
        }))
        setCryptoOptions(options)
        setSelectedCrypto(options[0])
      })
      .catch(() => {})
  }, [])

  return (
    <motion.div
      className="bg-[#111111] rounded-3xl px-6 py-8 w-full max-w-sm mx-auto mt-10 shadow-xl text-white font-sans relative h-[650px]
       border border-white flex flex-col  "
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
    >
      <img src="/top.png" alt="bg" className=' absolute top-0 left-0 z-0 ' />
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
          <div className="text-xs text-gray-400 mb-2 ml-1">YOU SPEND</div>
          <div className="flex items-center bg-[#232526] rounded-xl px-5 py-4">
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="bg-transparent border-none text-white text-3xl font-semibold w-40 outline-none mr-3 appearance-none hide-arrows"
              style={{ MozAppearance: 'textfield' }}
            />
            <div className="min-w-[120px]">
              <Select
                options={currencyOptions}
                value={selectedCurrency}
                onChange={setSelectedCurrency}
                formatOptionLabel={formatCurrencyOption}
                classNamePrefix="currency-select"
                isSearchable={true}
                styles={{
                  control: (base) => ({ ...base, background: 'transparent', border: 'none', boxShadow: 'none', minHeight: 'unset' }),
                  valueContainer: (base) => ({ ...base, padding: 0 }),
                  dropdownIndicator: (base) => ({ ...base, color: '#fff', padding: 0 }),
                  singleValue: (base) => ({ ...base, color: '#fff' }),
                  menu: (base) => ({ ...base, background: '#232526', color: '#fff', zIndex: 50 }),
                  option: (base, state) => ({ ...base, background: state.isFocused ? '#333' : 'transparent', color: '#fff' })
                }}
              />
            </div>
          </div>
        </div>
        {/* For token select */}
        <div>
          <div className="text-xs text-gray-400 mb-2 ml-1">FOR</div>
          <div className="flex items-center bg-[#232526] rounded-xl px-5 py-4 text-lg font-medium">
            <div className="min-w-[150px] w-full">
              <Select
                options={cryptoOptions}
                value={selectedCrypto}
                onChange={setSelectedCrypto}
                formatOptionLabel={formatCryptoOption}
                classNamePrefix="crypto-select"
                isSearchable={true}
                styles={{
                  control: (base) => ({ ...base, background: 'transparent', border: 'none', boxShadow: 'none', minHeight: 'unset' }),
                  valueContainer: (base) => ({ ...base, padding: 0 }),
                  dropdownIndicator: (base) => ({ ...base, color: '#fff', padding: 0 }),
                  singleValue: (base) => ({ ...base, color: '#fff' }),
                  menu: (base) => ({ ...base, background: '#232526', color: '#fff', zIndex: 50 }),
                  option: (base, state) => ({ ...base, background: state.isFocused ? '#333' : 'transparent', color: '#fff' })
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Fetch button */}
      <button className="w-full bg-[#106A6A] hover:bg-teal-800 transition-colors text-white rounded-xl py-4 text-lg font-semibold mt-8">
        Fetch Best Quote
      </button>
      <style>{`
        /* Hide number input arrows for all browsers */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </motion.div>
  )
}

export default SwapHome
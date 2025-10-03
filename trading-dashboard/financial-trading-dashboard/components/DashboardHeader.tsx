import React, { useState } from 'react';
import type { Theme } from '../App';

interface DashboardHeaderProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const HeaderItem: React.FC<{ label: string; value: string; color?: string; }> = ({ label, value, color = 'text-gray-800 dark:text-gray-200' }) => (
  <div className="flex items-baseline space-x-2">
    <span className="text-gray-500 dark:text-gray-400">{label}</span>
    <span className={`font-semibold ${color}`}>{value}</span>
  </div>
);

const IndexItem: React.FC<{ name: string; value: string; change: number; changePercent: number; }> = ({ name, value, change, changePercent }) => {
  const isUp = change >= 0;
  const color = isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500';
  const symbol = isUp ? '▲' : '▼';

  return (
    <div className="flex items-baseline space-x-2">
      <span className="font-semibold text-gray-600 dark:text-gray-300">{name}</span>
      <span className={`font-semibold ${color}`}>
        {value}
      </span>
      <span className={`font-mono text-xs ${color}`}>
        {symbol}{Math.abs(change).toFixed(2)} ({isUp ? '+' : ''}{changePercent.toFixed(2)}%)
      </span>
    </div>
  );
};

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 12M20 20l-1.5-1.5A9 9 0 003.5 12" />
    </svg>
);


const DashboardHeader: React.FC<DashboardHeaderProps> = ({ theme, setTheme }) => {
  const [appKey, setAppKey] = useState('Pdnf32f38dsfSDFd324s');
  const [secretKey, setSecretKey] = useState('lksdf8342KJdfs98w342KJHdfs983wKJdfs98');
  const [focusedField, setFocusedField] = useState<'appkey' | 'secretkey' | null>(null);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-sm">
      <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
        <h1 className="font-bold text-base text-gray-900 dark:text-white mr-2">Trading Dashboard</h1>
        <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
        
        <HeaderItem label="아이디" value="kiwoom_user" />
        <HeaderItem label="계좌번호" value="0043-78-98411" />
        
        <div className="flex items-baseline space-x-2">
            <label htmlFor="appkey" className="text-gray-500 dark:text-gray-400">appkey</label>
            <input
              id="appkey"
              type={focusedField === 'appkey' ? 'text' : 'password'}
              value={appKey}
              onChange={(e) => setAppKey(e.target.value)}
              onFocus={() => setFocusedField('appkey')}
              onBlur={() => setFocusedField(null)}
              className="font-mono bg-transparent outline-none p-0 m-0 w-40 text-gray-800 dark:text-gray-200"
              aria-label="App Key"
              autoComplete="off"
            />
        </div>

        <div className="flex items-baseline space-x-2">
            <label htmlFor="secretkey" className="text-gray-500 dark:text-gray-400">secretkey</label>
            <input
              id="secretkey"
              type={focusedField === 'secretkey' ? 'text' : 'password'}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              onFocus={() => setFocusedField('secretkey')}
              onBlur={() => setFocusedField(null)}
              className="font-mono bg-transparent outline-none p-0 m-0 w-48 text-gray-800 dark:text-gray-200"
              aria-label="Secret Key"
              autoComplete="off"
            />
        </div>
        
        <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>

        <HeaderItem label="추정예수금" value="2,000,000 원" />
        <HeaderItem label="총매입" value="19,896,311 원" />
        <HeaderItem label="총평가" value="20,085,000 원" />
        <HeaderItem label="평가손익" value="+188,689 원" color="text-red-600 dark:text-red-500" />
        <HeaderItem label="수익율%" value="+0.95%" color="text-red-600 dark:text-red-500" />
        <HeaderItem label="종목보유수" value="4 종목" />
        <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
        <IndexItem name="코스피" value="2,754.89" change={1.25} changePercent={0.05} />
        <IndexItem name="코스닥" value="852.67" change={-3.51} changePercent={-0.41} />
      </div>
      <div className="flex items-center space-x-3">
        <button onClick={toggleTheme}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button><RefreshIcon /></button>
        <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
         <button className="px-3 py-1 font-medium text-gray-700 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-500">자동매매실행</button>
         <button className="px-3 py-1 font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 rounded">포트폴리오</button>
      </div>
    </header>
  );
};

export default DashboardHeader;
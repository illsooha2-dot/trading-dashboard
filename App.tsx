import React, { useState, useCallback, useEffect } from 'react';
import type { Stock } from './types';
import DashboardHeader from './components/DashboardHeader';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import RightPanel from './components/RightPanel';
import NewsPanel from './components/NewsPanel';
import ConditionalSearchPanel from './components/ConditionalSearchPanel';
import { mockStocks } from './services/mockData';

export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<Stock>(mockStocks[0]);
  const [theme, setTheme] = useState<Theme>('light');
  const [rightPanelStocks, setRightPanelStocks] = useState<Stock[]>(mockStocks);
  const [searchSourceTitle, setSearchSourceTitle] = useState<string | null>(null);
  const [botToken, setBotToken] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-gray-300');
      document.body.classList.remove('bg-gray-100', 'text-gray-800');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-gray-100', 'text-gray-800');
      document.body.classList.remove('bg-gray-900', 'text-gray-300');
    }
  }, [theme]);


  const handleSelectStock = useCallback((stock: Stock) => {
    setSelectedStock(stock);
  }, []);

  const handleSelectStockByCode = useCallback((code: string) => {
    const stock = mockStocks.find(s => s.code === code);
    if (stock) {
      setSelectedStock(stock);
    }
  }, []);
  
  const sendTelegramNotification = async (strategyTitle: string, stocks: { code: string; name: string; }[]) => {
    if (!botToken || !chatId) {
      console.log('Telegram settings are not configured. Skipping notification.');
      return;
    }

    let message = `*${strategyTitle} 검색 결과*\n`;
    if (stocks.length > 0) {
        message += "```\n";
        message += stocks.map(stock => `- ${stock.name} (${stock.code})`).join('\n');
        message += "\n```";
    } else {
        message += '_검색된 종목이 없습니다._';
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            }),
        });
        const result = await response.json();
        if (!result.ok) {
            console.error('Telegram notification failed:', result.description);
        }
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
    }
  };


  const handleSearchComplete = useCallback((searchResults: { code: string; name: string; }[], strategyTitle: string) => {
      setSearchSourceTitle(strategyTitle);
      if (searchResults.length > 0) {
          const foundStocks = searchResults
              .map(result => mockStocks.find(stock => stock.code === result.code))
              .filter((stock): stock is Stock => stock !== undefined);
          setRightPanelStocks(foundStocks);
          if(foundStocks.length > 0) {
            setSelectedStock(foundStocks[0]);
          }
      } else {
          setRightPanelStocks([]);
      }
      sendTelegramNotification(strategyTitle, searchResults);
  }, [botToken, chatId]);

  const handleShowAllStocks = useCallback(() => {
    setRightPanelStocks(mockStocks);
    setSearchSourceTitle(null);
    if (mockStocks.length > 0) {
        setSelectedStock(mockStocks[0]);
    }
  }, []);


  return (
    <div className="flex flex-col h-screen font-sans text-sm">
      <DashboardHeader theme={theme} setTheme={setTheme} />
      <main className="flex-grow p-2 grid grid-cols-12 grid-rows-11 gap-2">
        <div className="col-span-4 row-span-11">
          <LeftPanel 
            onSelectStock={handleSelectStockByCode} 
            selectedStockCode={selectedStock.code}
            botToken={botToken}
            setBotToken={setBotToken}
            chatId={chatId}
            setChatId={setChatId}
           />
        </div>
        <div className="col-span-4 row-span-7">
          <CenterPanel selectedStock={selectedStock} />
        </div>
        <div className="col-span-4 row-span-7">
          <RightPanel 
            stocks={rightPanelStocks} 
            onSelectStock={handleSelectStock} 
            selectedStockCode={selectedStock.code}
            searchSourceTitle={searchSourceTitle}
            onShowAll={handleShowAllStocks}
          />
        </div>
        <div className="col-span-4 row-span-4">
          <NewsPanel />
        </div>
        <div className="col-span-4 row-span-4">
          <ConditionalSearchPanel onSearchComplete={handleSearchComplete} />
        </div>
      </main>
    </div>
  );
};

export default App;
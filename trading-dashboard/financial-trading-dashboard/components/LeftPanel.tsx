import React, { useState, useEffect } from 'react';
import type { PortfolioItem, TradeLogItem } from '../types';
import { mockPortfolio, mockPendingOrders } from '../services/mockData';

interface LeftPanelProps {
  onSelectStock: (code: string) => void;
  selectedStockCode: string;
  botToken: string;
  setBotToken: (token: string) => void;
  chatId: string;
  setChatId: (id: string) => void;
}

interface PortfolioTableProps {
  items: PortfolioItem[];
  onSelectStock: (code: string) => void;
  selectedStockCode: string;
}

interface PendingOrdersTableProps {
  items: TradeLogItem[];
  onSelectStock: (code: string) => void;
  selectedStockCode: string;
}

interface TelegramSettingsProps {
    botToken: string;
    setBotToken: (token: string) => void;
    chatId: string;
    setChatId: (id: string) => void;
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({ items, onSelectStock, selectedStockCode }) => (
  <div className="overflow-y-auto">
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 dark:bg-gray-700/30">
        <tr>
          {['종목명', '평가손익', '수익률', '보유수량', '매입가', '현재가'].map(h => (
            <th key={h} className="p-2 font-medium text-gray-500 dark:text-gray-400">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {items.map(item => {
          const isSelected = item.code === selectedStockCode;
          return (
            <tr 
              key={item.code} 
              onClick={() => onSelectStock(item.code)}
              className={`cursor-pointer ${isSelected ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
            >
              <td className="p-2">
                <div>{item.name} ({item.code})</div>
              </td>
              <td className={`p-2 ${item.profit > 0 ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>{item.profit.toLocaleString()}</td>
              <td className={`p-2 ${item.profitPercent > 0 ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>{item.profitPercent.toFixed(2)}%</td>
              <td className="p-2">{item.quantity.toLocaleString()}</td>
              <td className="p-2">{item.avgPrice.toLocaleString()}</td>
              <td className="p-2">{item.currentPrice.toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const PendingOrdersTable: React.FC<PendingOrdersTableProps> = ({ items, onSelectStock, selectedStockCode }) => (
    <div className="overflow-y-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-700/30">
          <tr>
            {['시간', '종목명', '구분', '수량', '가격', '상태'].map(h => (
              <th key={h} className="p-2 font-medium text-gray-500 dark:text-gray-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map(item => {
            const isSelected = item.code === selectedStockCode;
            return (
              <tr 
                key={item.id}
                onClick={() => onSelectStock(item.code)}
                className={`cursor-pointer ${isSelected ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              >
                <td className="p-2">{item.time}</td>
                <td className="p-2">{item.name} ({item.code})</td>
                <td className={`p-2 font-semibold ${item.type === '매수' ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>{item.type}</td>
                <td className="p-2">{item.quantity.toLocaleString()}</td>
                <td className="p-2">{item.price.toLocaleString()}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
);

const TelegramSettings: React.FC<TelegramSettingsProps> = ({ botToken, setBotToken, chatId, setChatId }) => {
    const [localBotToken, setLocalBotToken] = useState(botToken);
    const [localChatId, setLocalChatId] = useState(chatId);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        setLocalBotToken(botToken);
        setLocalChatId(chatId);
    }, [botToken, chatId]);

    const isDirty = botToken !== localBotToken || chatId !== localChatId;

    const handleSave = () => {
        if (!localBotToken || !localChatId) {
            alert('봇 토큰과 채팅 ID를 모두 입력해주세요.');
            return;
        }
        setBotToken(localBotToken);
        setChatId(localChatId);
        alert('설정이 저장되었습니다.');
    };
    
    const handleTestSend = async () => {
        setIsSending(true);
        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: 'Trading Dashboard: 텔레그램 연동 테스트 메시지입니다.'
                }),
            });

            const result = await response.json();

            if (result.ok) {
                alert('테스트 메시지를 성공적으로 발송했습니다.');
            } else {
                throw new Error(result.description || '알 수 없는 오류가 발생했습니다.');
            }
        } catch (error: any) {
            console.error('Telegram test message failed:', error);
            alert(`테스트 메시지 발송에 실패했습니다: ${error.message}\n\n입력하신 봇 토큰과 채팅 ID가 정확한지 확인해주세요.`);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="p-4 space-y-4 text-sm">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">텔레그램 알림 설정</h4>
            <div>
                <label htmlFor="bot-token" className="block mb-1 text-gray-600 dark:text-gray-400">봇 토큰 (BOT_TOKEN)</label>
                <input
                    id="bot-token"
                    type="text"
                    value={localBotToken}
                    onChange={(e) => setLocalBotToken(e.target.value)}
                    placeholder="텔레그램 봇 토큰을 입력하세요"
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    aria-label="Telegram Bot Token"
                />
            </div>
            <div>
                <label htmlFor="chat-id" className="block mb-1 text-gray-600 dark:text-gray-400">채팅 ID (CHAT_ID)</label>
                <input
                    id="chat-id"
                    type="text"
                    value={localChatId}
                    onChange={(e) => setLocalChatId(e.target.value)}
                    placeholder="텔레그램 채팅 ID를 입력하세요"
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    aria-label="Telegram Chat ID"
                />
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    설정 저장
                </button>
                <button
                    onClick={handleTestSend}
                    disabled={isDirty || isSending || !botToken || !chatId}
                    className="w-full px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 disabled:bg-gray-300 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isSending ? '발송 중...' : '테스트 발송'}
                </button>
            </div>
        </div>
    );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-sm font-bold rounded-md transition-colors ${
            active
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100'
        }`}
        aria-pressed={active}
    >
        {children}
    </button>
);


const LeftPanel: React.FC<LeftPanelProps> = ({ onSelectStock, selectedStockCode, botToken, setBotToken, chatId, setChatId }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'telegram'>('portfolio');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
            <div className="flex space-x-1">
                <TabButton active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')}>보유종목</TabButton>
                <TabButton active={activeTab === 'telegram'} onClick={() => setActiveTab('telegram')}>텔레그램</TabButton>
            </div>
        </div>
        <div className="flex-grow overflow-y-auto">
            {activeTab === 'portfolio' && <PortfolioTable items={mockPortfolio} onSelectStock={onSelectStock} selectedStockCode={selectedStockCode} />}
            {activeTab === 'telegram' && <TelegramSettings botToken={botToken} setBotToken={setBotToken} chatId={chatId} setChatId={setChatId} />}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden border-t border-gray-200 dark:border-gray-700">
        <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
            <h3 className="font-bold text-base text-gray-800 dark:text-gray-200">미체결내역</h3>
        </div>
        <div className="flex-grow overflow-y-auto">
            <PendingOrdersTable items={mockPendingOrders} onSelectStock={onSelectStock} selectedStockCode={selectedStockCode} />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
import React from 'react';
import type { Stock } from '../types';

interface RightPanelProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  selectedStockCode: string;
  searchSourceTitle: string | null;
  onShowAll: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ stocks, onSelectStock, selectedStockCode, searchSourceTitle, onShowAll }) => {

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md">
       <div className="p-2 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <h3 className="font-bold text-base text-gray-800 dark:text-gray-200">
          {searchSourceTitle ? `"${searchSourceTitle}" 검색 결과` : '종목 리스트'}
        </h3>
        {searchSourceTitle && (
            <button
                onClick={onShowAll}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
                전체보기
            </button>
        )}
      </div>
      <div className="flex-grow overflow-y-auto">
        <table className="w-full text-sm text-left">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700/50">
            <tr>
              {['종목명', '현재가', '등락률'].map(h => (
                <th key={h} className="p-2 font-medium text-gray-500 dark:text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {stocks.length > 0 ? (
              stocks.map(stock => {
                const isUp = stock.change >= 0;
                const isSelected = stock.code === selectedStockCode;
                return (
                  <tr
                    key={stock.code}
                    onClick={() => onSelectStock(stock)}
                    className={`cursor-pointer ${isSelected ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                  >
                    <td className="p-2">{stock.name} ({stock.code})</td>
                    <td className={`p-2 font-semibold ${isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>{stock.price.toLocaleString()}</td>
                    <td className={`p-2 font-semibold ${isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>
                      {isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500 dark:text-gray-400">
                  검색된 종목이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RightPanel;
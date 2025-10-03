import React, { useState } from 'react';

// A mock type for the search result
interface SearchResult {
  code: string;
  name: string;
}

interface ConditionalSearchPanelProps {
  onSearchComplete: (stocks: SearchResult[], strategyTitle: string) => void;
}

type StrategyId = 'volume_high' | 'todays_gainers' | 'cherry_triple_seven';

interface SearchStrategy {
    id: StrategyId;
    title: string;
    description: string;
    fullDescription?: string;
}

const strategies: SearchStrategy[] = [
    { id: 'volume_high', title: '조건검색', description: '거래량상위100 & 신고가' },
    { id: 'todays_gainers', title: 'cherry', description: '오늘의 급등주' },
    { 
        id: 'cherry_triple_seven', 
        title: 'cherryTriple Seven', 
        description: '일봉 Envelope 돌파 & 분봉 HMA 골든크로스',
        fullDescription: '60일 내 거래대금 300억 & 8% 이상 상승 / 일봉 Envelope 상단 돌파 / 1분봉 cherryTripleSeven 캔들 & HMA 골든크로스'
    },
];

const mockResults: Record<StrategyId, SearchResult[]> = {
    volume_high: [
        { code: '005930', name: '삼성전자' },
        { code: '000660', name: 'SK하이닉스' },
    ],
    todays_gainers: [
        { code: '035720', name: '카카오' },
        { code: '051910', name: 'LG화학' },
    ],
    cherry_triple_seven: [
        { code: '035720', name: '카카오' },
        { code: '000660', name: 'SK하이닉스' },
        { code: '207940', name: '삼성바이오로직스' },
    ]
};

const SearchStrategyRow: React.FC<{
    strategy: SearchStrategy;
    isLoading: boolean;
    isAnyLoading: boolean;
    onSearch: () => void;
}> = ({ strategy, isLoading, isAnyLoading, onSearch }) => {
    return (
        <div className="p-2 flex items-center justify-between gap-3 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="flex-grow">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{strategy.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate" title={strategy.fullDescription || strategy.description}>
                    {strategy.description}
                </p>
            </div>
            <button
                onClick={onSearch}
                disabled={isAnyLoading}
                className="px-4 py-1 text-sm font-bold text-gray-800 bg-yellow-400 rounded hover:bg-yellow-500 disabled:bg-gray-300 dark:text-gray-900 dark:hover:bg-yellow-300 dark:disabled:bg-gray-500 flex-shrink-0"
                style={{minWidth: '80px'}}
            >
                {isLoading ? '검색중...' : '검색'}
            </button>
        </div>
    );
};

const ConditionalSearchPanel: React.FC<ConditionalSearchPanelProps> = ({ onSearchComplete }) => {
  const [loadingStrategy, setLoadingStrategy] = useState<StrategyId | null>(null);

  const handleSearch = async (strategy: SearchStrategy) => {
    setLoadingStrategy(strategy.id);
    try {
      // In a real application, you would fetch from your backend.
      // This is a mock implementation.
      
      // Simulating network delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));

      const results = mockResults[strategy.id];
      
      // Randomly return empty results to show that UI case
      if (Math.random() > 0.3) {
        onSearchComplete(results, strategy.title);
      } else {
        onSearchComplete([], strategy.title);
      }

    } catch (e) {
      onSearchComplete([], strategy.title); // Send empty array on error
      alert('검색 중 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인하세요.');
      console.error(e);
    } finally {
      setLoadingStrategy(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <h3 className="font-bold text-base text-gray-800 dark:text-gray-200">조건 검색식</h3>
      </div>
      <div className="flex-grow p-3">
        <div className="space-y-3">
            {strategies.map(strategy => (
                <SearchStrategyRow
                    key={strategy.id}
                    strategy={strategy}
                    isLoading={loadingStrategy === strategy.id}
                    isAnyLoading={loadingStrategy !== null}
                    onSearch={() => handleSearch(strategy)}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ConditionalSearchPanel;
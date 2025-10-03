import React, { useState, useEffect } from 'react';
import type { NewsItem } from '../types';
import { mockNews } from '../services/mockData';

// Get all breaking news articles to use as a fallback
const allBreakingNews = mockNews.filter(news => news.type === '속보');
const MAX_DISPLAY_NEWS = 12;

const NewsPanel: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            if (!loading) setLoading(true); // Show loader for subsequent fetches too
            setError(null);
            
            try {
                // This is a placeholder for a real API endpoint.
                // In a real application, this would fetch live news from your backend server.
                const response = await fetch('/api/realtime-news');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: NewsItem[] = await response.json();
                
                // Assuming the API returns the latest news, sorted by time.
                // We only display breaking news ('속보').
                const breakingNews = data.filter(item => item.type === '속보');
                setNews(breakingNews.slice(0, MAX_DISPLAY_NEWS));

            } catch (e) {
                console.warn(
                    "뉴스 API 호출 실패. 백엔드가 구현되지 않았을 수 있습니다. 모의 데이터로 대체합니다.",
                    e
                );
                setError('실시간 로딩 실패');

                // Fallback to mock data
                const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
                setNews(
                    allBreakingNews.slice(0, MAX_DISPLAY_NEWS).map(item => ({
                        ...item,
                        time: currentTime
                    }))
                );
            } finally {
                setLoading(false);
            }
        };

        // Fetch news immediately on component mount
        fetchNews();

        // And then fetch new data every minute
        const intervalId = setInterval(fetchNews, 60000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // The empty dependency array is correct here as setInterval handles the recurring calls.

    const NewsTypeBadge: React.FC<{ type: NewsItem['type'] }> = ({ type }) => {
        const isBreaking = type === '속보';
        const color = isBreaking 
            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400' 
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400';
        return <span className={`flex-shrink-0 px-1.5 py-0.5 rounded-sm font-semibold text-xs ${color}`}>{type}</span>
    }

    const renderContent = () => {
        if (loading && news.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">뉴스 로딩 중...</div>;
        }

        if (!loading && news.length === 0 && !error) {
             return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">표시할 속보가 없습니다.</div>;
        }

        return (
            <ul className="divide-y divide-gray-200/70 dark:divide-gray-700">
                {news.map((item) => (
                    <li key={item.id}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">{item.time}</span>
                            <NewsTypeBadge type={item.type} />
                            <span className="flex-grow text-gray-700 dark:text-gray-300 truncate group-hover:underline group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
        );
    }


    return (
        <div className="grid grid-rows-[auto_1fr] h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md overflow-hidden">
            <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">뉴스속보</h3>
                {error && <span className="text-xs text-yellow-600 dark:text-yellow-500" title="실시간 뉴스 로딩에 실패하여 모의 데이터를 표시하고 있습니다.">{error}</span>}
            </div>
            <div className="overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default NewsPanel;
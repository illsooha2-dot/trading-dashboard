import React, { useState, useEffect } from 'react';
import type { Stock, OrderBookItem } from '../types';
import { generateOrderBook } from '../services/mockData';

interface CenterPanelProps {
  selectedStock: Stock;
}

const OrderBook: React.FC<{ bids: OrderBookItem[], asks: OrderBookItem[], stock: Stock }> = ({ bids, asks, stock }) => {
  const basePrice = stock.price - stock.change; // Previous day's close

  const summaryData = [
    { label: '2차저항', value: 85200 },
    { label: '1차저항', value: 84300 },
    { label: '피봇값', value: 83400 },
    { label: '1차지지', value: 82500 },
    { label: '2차지지', value: 81600 },
    { label: '체결강도', value: '98.18%' },
    { label: '기준가', value: 82300 },
    { label: '시가', value: 83000 },
    { label: '고가', value: 84100 },
    { label: '저가', value: 82800 },
  ];

  return (
    <div className="flex-grow flex text-sm font-sans border-t border-gray-200 dark:border-gray-700">
      <div className="flex-grow grid grid-cols-[45%_25%_30%] border-r border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="col-span-3 grid grid-cols-[45%_25%_30%] items-center h-4 text-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 font-semibold">
            <div className="border-r border-gray-200 dark:border-gray-700 text-right pr-2">잔량</div>
            <div className="border-r border-gray-200 dark:border-gray-700">%</div>
            <div>호가</div>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="col-span-3">
            <div className="grid grid-cols-[45%_25%_30%] items-center h-4 text-center border-b border-gray-200 dark:border-gray-700 text-red-600 dark:text-red-500 font-bold bg-red-50 dark:bg-red-900/20">
                <div className="border-r border-gray-200 dark:border-gray-700"></div>
                <div className="border-r border-gray-200 dark:border-gray-700">상한가</div>
                <div className="text-center">112,740</div>
            </div>
            {asks.slice().reverse().map(item => {
              const priceChange = ((item.price - basePrice) / basePrice) * 100;
              const isUp = priceChange >= 0;
              return (
                <div key={`ask-${item.price}`} className="grid grid-cols-[45%_25%_30%] items-center h-4 border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="text-right pr-2 text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700/50 h-full flex items-center justify-end truncate">{item.size.toLocaleString()}</div>
                  <div className={`text-right pr-2 ${isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'} border-r border-gray-200 dark:border-gray-700/50 h-full flex items-center justify-end truncate`}>{priceChange.toFixed(2)}%</div>
                  <div className={`text-center font-semibold ${isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'} bg-pink-50 dark:bg-red-900/20 h-full flex items-center justify-center`}>{item.price.toLocaleString()}</div>
                </div>
              );
            })}
        </div>

        {/* Bids (Buy Orders) */}
        <div className="col-span-3">
             {bids.map(item => {
                const priceChange = ((item.price - basePrice) / basePrice) * 100;
                const isUp = priceChange >= 0;
                return (
                    <div key={`bid-${item.price}`} className="grid grid-cols-[45%_25%_30%] items-center h-4 border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div className="text-right pr-2 text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700/50 h-full flex items-center justify-end truncate">{item.size.toLocaleString()}</div>
                        <div className={`text-right pr-2 ${isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'} border-r border-gray-200 dark:border-gray-700/50 h-full flex items-center justify-end truncate`}>{priceChange.toFixed(2)}%</div>
                        <div className={`text-center font-semibold ${isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'} bg-blue-50 dark:bg-blue-900/20 h-full flex items-center justify-center`}>{item.price.toLocaleString()}</div>
                    </div>
                );
            })}
             <div className="grid grid-cols-[45%_25%_30%] items-center h-4 text-center border-b border-gray-200 dark:border-gray-700/50 text-blue-600 dark:text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/20">
                <div className="border-r border-gray-200 dark:border-gray-700/50"></div>
                <div className="border-r border-gray-200 dark:border-gray-700/50">하한가</div>
                <div className="text-center">57,700</div>
            </div>
        </div>
      </div>
      <div className="w-40 flex-shrink-0">
         {summaryData.map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center h-4 px-2 border-b border-gray-200 dark:border-gray-700/50">
                <span className="text-gray-500 dark:text-gray-400">{label}</span>
                <span className={`font-semibold ${typeof value === 'string' ? 'text-gray-800 dark:text-gray-200' : (value > basePrice ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500')}`}>{typeof value === 'number' ? value.toLocaleString() : value}</span>
            </div>
         ))}
         <div className="flex justify-between items-center h-4 px-2 border-b border-gray-200 dark:border-gray-700/50">
            <span className="text-gray-500 dark:text-gray-400">전일대비</span>
            <span className={`font-semibold ${stock.change >= 0 ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>{stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toLocaleString()}</span>
         </div>
      </div>
    </div>
  );
};


const NumberInputWithAdornment: React.FC<{ value: number, onChange: (v:number)=>void, prefix?:string, suffix?:string, step?:number, min?:number, max?:number }> = 
({ value, onChange, prefix, suffix, step=1, min, max }) => {
    return (
        <div className="relative flex items-center">
            {prefix && <span className="absolute left-2 text-gray-400">{prefix}</span>}
            <input 
                type="number" 
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                step={step}
                min={min}
                max={max}
                className={`w-full p-1 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded text-center ${prefix ? 'pl-5' : ''} ${suffix ? 'pr-6' : ''}`}
            />
            {suffix && <span className="absolute right-2 text-gray-400">{suffix}</span>}
        </div>
    );
};


const OrderForm: React.FC<{ stock: Stock }> = ({ stock }) => {
    const [quantity, setQuantity] = useState<number>(10);
    const [price, setPrice] = useState<number>(stock.price);
    const [autoTrade, setAutoTrade] = useState(true);

    // Sell Strategy State
    const [isSellStrategyEnabled, setIsSellStrategyEnabled] = useState(false);
    const [selectedStrategy, setSelectedStrategy] = useState<'fixed' | 'trailing' | 'ma'>('fixed');
    
    // Fixed Strategy State
    const [targetProfit, setTargetProfit] = useState(2.0);
    const [stopLoss, setStopLoss] = useState(1.0);

    // Trailing Stop State
    const [trailingStart, setTrailingStart] = useState(1.0);
    const [trailingFall, setTrailingFall] = useState(0.5);
    const [trailingBaseStoploss, setTrailingBaseStoploss] = useState(2.0);
    
    // Moving Average State
    const [maTimeUnit, setMaTimeUnit] = useState<'daily' | 'minute'>('daily');
    const [maTimeInterval, setMaTimeInterval] = useState(3);
    const [maShort, setMaShort] = useState(5);
    const [maLong, setMaLong] = useState(20);


    useEffect(() => {
        setPrice(stock.price);
    }, [stock]);

    return (
        <div className="p-2 space-y-3 text-sm bg-gray-50/50 dark:bg-gray-900/50 h-full">
            <div className="flex items-start gap-2">
                <div className="flex-grow space-y-1">
                    <div className="grid grid-cols-2 gap-2">
                        <button className="py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">거래구분</button>
                        <button className="py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">지정가</button>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 items-center">
                        <label className="text-gray-500 dark:text-gray-400">주문가격</label>
                        <input type="number" min="0" value={price} onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value, 10) || 0))} className="w-full p-1 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded text-right"/>
                        <label className="text-gray-500 dark:text-gray-400">수량</label>
                        <input type="number" min="0" value={quantity} onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value, 10) || 0))} className="w-full p-1 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded text-right"/>
                    </div>
                     <div className="grid grid-cols-[auto_1fr] gap-x-2 items-center">
                         <label className="text-gray-500 dark:text-gray-400">금액</label>
                         <div className="p-1 text-right font-semibold">{(quantity * price).toLocaleString()}</div>
                     </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 font-bold">매수</button>
                    <button className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 font-bold">정정</button>
                    <button className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 font-bold">매도</button>
                    <button className="w-full px-4 py-2 text-gray-800 bg-yellow-400 rounded hover:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-300 font-bold">취소</button>
                </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 grid grid-cols-2 gap-x-4">
                {/* Left side: "매도 전략 선택" */}
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer font-semibold" onClick={() => setIsSellStrategyEnabled(!isSellStrategyEnabled)}>
                         <div className="w-4 h-4 flex justify-center items-center rounded-sm border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800">
                            {isSellStrategyEnabled && <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span>매도 전략 선택</span>
                    </label>
                    
                    {isSellStrategyEnabled && (
                        <div className="pl-6 space-y-2">
                            {/* Strategy Radio Buttons */}
                            <div className="flex space-x-4">
                                <StrategyRadio name="sellStrategy" label="고정 손익절" isSelected={selectedStrategy === 'fixed'} onChange={() => setSelectedStrategy('fixed')} />
                                <StrategyRadio name="sellStrategy" label="트레일링 스탑" isSelected={selectedStrategy === 'trailing'} onChange={() => setSelectedStrategy('trailing')} />
                                <StrategyRadio name="sellStrategy" label="이동평균선" isSelected={selectedStrategy === 'ma'} onChange={() => setSelectedStrategy('ma')} />
                            </div>
                            
                            {/* Fixed Stop Loss Settings */}
                            {selectedStrategy === 'fixed' && (
                                <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded space-y-2 border border-gray-200 dark:border-gray-600">
                                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                                        <label>✅ 익절 목표:</label>
                                        <NumberInputWithAdornment value={targetProfit} onChange={setTargetProfit} suffix="%" step={0.1} />
                                    </div>
                                     <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                                        <label>❌ 손절 한도:</label>
                                        <NumberInputWithAdornment value={stopLoss} onChange={setStopLoss} prefix="-" suffix="%" step={0.1} />
                                    </div>
                                </div>
                            )}

                            {/* Trailing Stop Settings */}
                            {selectedStrategy === 'trailing' && (
                               <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded space-y-2 border border-gray-200 dark:border-gray-600">
                                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                                        <label>📈 트레일링 시작:</label>
                                        <NumberInputWithAdornment value={trailingStart} onChange={setTrailingStart} suffix="%" step={0.1} />
                                    </div>
                                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                                        <label>📉 트레일링 하락폭:</label>
                                        <NumberInputWithAdornment value={trailingFall} onChange={setTrailingFall} prefix="-" suffix="%" step={0.1} />
                                    </div>
                                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                                        <label>❌ 기본 손절률:</label>
                                        <NumberInputWithAdornment value={trailingBaseStoploss} onChange={setTrailingBaseStoploss} prefix="-" suffix="%" step={0.1} />
                                    </div>
                               </div>
                            )}
                            
                            {/* Moving Average Settings */}
                            {selectedStrategy === 'ma' && (
                                <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded space-y-2 border border-gray-200 dark:border-gray-600">
                                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                                        <label>차트 기간:</label>
                                        <div className="flex items-center gap-2">
                                            <select value={maTimeUnit} onChange={e => setMaTimeUnit(e.target.value as any)} className="p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                                                <option value="daily">일봉</option>
                                                <option value="minute">분봉</option>
                                            </select>
                                            {maTimeUnit === 'minute' && (
                                                <NumberInputWithAdornment value={maTimeInterval} onChange={setMaTimeInterval} min={1} max={60} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                                        <label>단기 이평선:</label>
                                        <NumberInputWithAdornment value={maShort} onChange={setMaShort} min={1} max={100} />
                                    </div>
                                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
                                        <label>장기 이평선:</label>
                                        <NumberInputWithAdornment value={maLong} onChange={setMaLong} min={1} max={200} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right side: "자동매매 활성화" */}
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer" onClick={() => setAutoTrade(!autoTrade)}>
                         <div className="w-4 h-4 flex justify-center items-center rounded-sm border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800">
                            {autoTrade && <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className="whitespace-nowrap">자동매매 활성화</span>
                    </label>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 items-center">
                        <label className="text-gray-500 dark:text-gray-400 whitespace-nowrap">종목당 매수금액:</label>
                        <input type="text" defaultValue="0" className="p-1 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded text-right" />
                        <span>원</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const StrategyRadio: React.FC<{name: string, label: string, isSelected: boolean, onChange: () => void}> = ({name, label, isSelected, onChange}) => (
    <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer">
        <input type="radio" name={name} checked={isSelected} onChange={onChange} className="form-radio bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-blue-600 focus:ring-blue-500" />
        <span>{label}</span>
    </label>
)

const CenterPanel: React.FC<CenterPanelProps> = ({ selectedStock }) => {
  const [orderBookData, setOrderBookData] = useState(generateOrderBook(selectedStock.price));
  
  useEffect(() => {
    const interval = setInterval(() => {
        setOrderBookData(generateOrderBook(selectedStock.price));
    }, 2000); // Refresh order book data every 2 seconds
    return () => clearInterval(interval);
  }, [selectedStock]);

  const isUp = selectedStock.change >= 0;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md overflow-hidden">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
        <div className="flex items-baseline space-x-2">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">{selectedStock.name} ({selectedStock.code})</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div>
                <span className="font-semibold">현재가: </span>
                <span className={`font-bold ${isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>{selectedStock.price.toLocaleString()}</span>
            </div>
            <span>거래량: <span className="font-mono">{selectedStock.volume.toLocaleString()}</span></span>
            <div className={`font-semibold ${isUp ? 'text-red-600 dark:text-red-500' : 'text-blue-600 dark:text-blue-500'}`}>
                <span>{isUp ? '▲' : '▼'} {Math.abs(selectedStock.change).toLocaleString()}</span>
                <span className="ml-2">({selectedStock.changePercent.toFixed(2)}%)</span>
            </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-[4] overflow-y-auto flex flex-col">
          <OrderBook bids={orderBookData.bids} asks={orderBookData.asks} stock={selectedStock} />
        </div>
        <div className="flex-[3] overflow-y-auto border-t border-gray-200 dark:border-gray-700">
          <OrderForm stock={selectedStock} />
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;
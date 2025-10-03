
export interface Stock {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface PortfolioItem {
  code: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  valuation: number;
  profit: number;
  profitPercent: number;
}

export interface OrderBookItem {
  price: number;
  size: number;
}

export interface TradeLogItem {
  id: string;
  time: string;
  code: string;
  name: string;
  type: '매수' | '매도';
  quantity: number;
  price: number;
  status: '체결' | '미체결';
}

export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NewsItem {
  id: string;
  type: '속보' | '주요 뉴스';
  title: string;
  link: string;
  time: string;
}

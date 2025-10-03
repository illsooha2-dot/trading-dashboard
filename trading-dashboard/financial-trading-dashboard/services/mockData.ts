import type { Stock, PortfolioItem, OrderBookItem, TradeLogItem, ChartData, NewsItem } from '../types';

export const mockStocks: Stock[] = [
  { code: '005930', name: '삼성전자', price: 83500, change: 1200, changePercent: 1.46, volume: 15230240 },
  { code: '035720', name: '카카오', price: 43500, change: -500, changePercent: -1.14, volume: 2483630 },
  { code: '000660', name: 'SK하이닉스', price: 226000, change: 3000, changePercent: 1.35, volume: 3012510 },
  { code: '035420', name: 'NAVER', price: 168000, change: -2300, changePercent: -1.35, volume: 980154 },
  { code: '051910', name: 'LG화학', price: 387000, change: 5000, changePercent: 1.31, volume: 450321 },
  { code: '207940', name: '삼성바이오로직스', price: 765000, change: -11000, changePercent: -1.42, volume: 158990 },
  { code: '005380', name: '현대차', price: 278000, change: 2500, changePercent: 0.91, volume: 785412 },
];

export const mockPortfolio: PortfolioItem[] = [
  { code: '005930', name: '삼성전자', quantity: 100, avgPrice: 78000, currentPrice: 83500, valuation: 8350000, profit: 550000, profitPercent: 7.05 },
  { code: '000660', name: 'SK하이닉스', quantity: 20, avgPrice: 210000, currentPrice: 226000, valuation: 4520000, profit: 320000, profitPercent: 7.62 },
  { code: '035720', name: '카카오', quantity: 50, avgPrice: 48000, currentPrice: 43500, valuation: 2175000, profit: -225000, profitPercent: -9.38 },
  { code: '035420', name: 'NAVER', quantity: 30, avgPrice: 172000, currentPrice: 168000, valuation: 5040000, profit: -120000, profitPercent: -2.33 },
];

export const mockTradeLog: TradeLogItem[] = [
    { id: '1', time: '11:35:40', code: '005930', name: '삼성전자', type: '매수', quantity: 20, price: 83400, status: '체결' },
    { id: '2', time: '10:52:19', code: '035720', name: '카카오', type: '매도', quantity: 10, price: 43600, status: '체결' },
    { id: '3', time: '09:48:21', code: '000660', name: 'SK하이닉스', type: '매수', quantity: 5, price: 225500, status: '체결' },
];

export const mockPendingOrders: TradeLogItem[] = [
    { id: '4', time: '14:01:05', code: '035420', name: 'NAVER', type: '매수', quantity: 10, price: 167500, status: '미체결' },
    { id: '5', time: '13:30:11', code: '005930', name: '삼성전자', type: '매도', quantity: 30, price: 83800, status: '미체결' },
]

export const generateOrderBook = (midPrice: number): { bids: OrderBookItem[], asks: OrderBookItem[] } => {
  const bids: OrderBookItem[] = [];
  const asks: OrderBookItem[] = [];
  let currentPrice = midPrice - 500;
  for (let i = 0; i < 10; i++) {
    bids.push({ price: currentPrice, size: Math.floor(Math.random() * 5000) + 100 });
    currentPrice -= 100;
  }
  currentPrice = midPrice;
  for (let i = 0; i < 10; i++) {
    asks.push({ price: currentPrice, size: Math.floor(Math.random() * 5000) + 100 });
    currentPrice += 100;
  }
  return { bids: bids.reverse(), asks };
};


export const generateChartData = (startPrice: number): ChartData[] => {
  const data: ChartData[] = [];
  let lastClose = startPrice;
  for (let i = 0; i < 60; i++) {
    const open = lastClose;
    const close = open + (Math.random() - 0.5) * 500;
    const high = Math.max(open, close) + Math.random() * 200;
    const low = Math.min(open, close) - Math.random() * 200;
    const volume = Math.floor(Math.random() * 100000) + 50000;
    data.push({
      time: `10:${i < 10 ? '0' : ''}${i}`,
      open,
      high,
      low,
      close,
      volume
    });
    lastClose = close;
  }
  return data;
};

export const mockNews: NewsItem[] = [
  { id: 'n1', type: '속보', title: '삼성전자, 4분기 실적 예상치 상회 전망', link: 'https://search.naver.com/search.naver?query=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%204%EB%B6%84%EA%B8%B0%20%EC%8B%A4%EC%A0%81%20%EC%A0%84%EB%A7%9D', time: '14:32' },
  { id: 'n2', type: '주요 뉴스', title: '코스피, 외국인 매수세에 2700선 돌파', link: 'https://search.naver.com/search.naver?query=%EC%BD%94%EC%8A%A4%ED%94%BC%20%EC%99%B8%EA%B5%AD%EC%9D%B8%20%EB%A7%A4%EC%88%98%EC%84%B8', time: '14:28' },
  { id: 'n3', type: '속보', title: 'SK하이닉스, 차세대 HBM 메모리 개발 성공', link: 'https://search.naver.com/search.naver?query=SK%ED%95%98%EC%9D%B4%EB%8B%89%EC%8A%A4%20HBM%20%EB%A9%94%EB%AA%A8%EB%A6%AC%20%EA%B0%9C%EB%B0%9C', time: '14:25' },
  { id: 'n4', type: '주요 뉴스', title: '정부, 반도체 산업 지원 확대 방안 발표', link: 'https://search.naver.com/search.naver?query=%EC%A0%95%EB%B6%80%20%EB%B0%98%EB%8F%84%EC%B2%B4%20%EC%82%B0%EC%97%85%20%EC%A7%80%EC%9B%90', time: '14:10' },
  { id: 'n5', type: '속보', title: '카카오, AI 챗봇 신규 서비스 출시', link: 'https://search.naver.com/search.naver?query=%EC%B9%B4%EC%B9%B4%EC%98%A4%20AI%20%EC%B1%97%EB%B4%87', time: '13:55' },
  { id: 'n6', type: '주요 뉴스', title: 'LG화학, 미국 배터리 공장 증설 계획', link: 'https://search.naver.com/search.naver?query=LG%ED%99%94%ED%95%99%20%EB%AF%B8%EA%B5%AD%20%EB%B0%B0%ED%84%B0%EB%A6%AC%20%EA%B3%B5%EC%9E%A5', time: '13:40' },
  { id: 'n7', type: '속보', title: '현대차, 전기차 아이오닉 7 티저 공개', link: 'https://search.naver.com/search.naver?query=%ED%98%84%EB%8C%80%EC%B0%A8%20%EC%95%84%EC%9D%B4%EC%98%A4%EB%8B%89%207', time: '13:21' },
  { id: 'n8', type: '주요 뉴스', title: '글로벌 증시, 인플레이션 우려 완화에 상승', link: 'https://search.naver.com/search.naver?query=%EA%B8%80%EB%A1%9C%EB%B2%8C%20%EC%A6%9D%EC%8B%9C%20%EC%9D%B8%ED%94%8C%EB%A0%88%EC%9D%B4%EC%85%98', time: '13:05' },
  { id: 'n9', type: '속보', title: '네이버웹툰, 나스닥 상장 예비심사 통과', link: 'https://search.naver.com/search.naver?query=%EB%84%A4%EC%9D%B4%EB%B2%84%EC%9B%B9%ED%88%B0%20%EB%82%98%EC%8A%A4%EB%8B%A5%20%EC%83%81%EC%9E%A5', time: '12:50' },
  { id: 'n10', type: '주요 뉴스', title: '바이오 업계, M&A 통한 신약 개발 활발', link: 'https://search.naver.com/search.naver?query=%EB%B0%94%EC%9D%B4%EC%98%A4%20%EC%97%85%EA%B3%84%20M%26A', time: '12:33' },
  { id: 'n11', type: '속보', title: '셀트리온, 신약 임상 3상 성공 발표', link: 'https://search.naver.com/search.naver?query=%EC%85%80%ED%8A%B8%EB%A6%AC%EC%98%A8%20%EC%8B%A0%EC%95%BD%20%EC%9E%84%EC%83%81', time: '12:15' },
  { id: 'n12', type: '주요 뉴스', title: '한미 금리 격차, 향후 시장 영향은?', link: 'https://search.naver.com/search.naver?query=%ED%95%9C%EB%AF%B8%20%EA%B8%88%EB%A6%AC%20%EA%B2%A9%EC%B0%A8', time: '12:01' },
  { id: 'n13', type: '속보', title: '포스코, 친환경 제철 기술 개발에 박차', link: 'https://search.naver.com/search.naver?query=%ED%8F%AC%EC%8A%A4%EC%BD%94%20%EC%B9%9C%ED%99%98%EA%B2%BD%20%EC%A0%9C%EC%B2%A0', time: '11:45' },
  { id: 'n14', type: '주요 뉴스', title: '게임 업계, 하반기 신작 출시 봇물', link: 'https://search.naver.com/search.naver?query=%EA%B2%8C%EC%9E%84%20%EC%97%85%EA%B3%84%20%EC%8B%A0%EC%9E%91', time: '11:30' },
  { id: 'n15', type: '속보', title: '쿠팡, 2분기 어닝 서프라이즈 기록', link: 'https://search.naver.com/search.naver?query=%EC%BF%A0%ED%8C%A1%20%EC%96%B4%EB%8B%9D%20%EC%84%9C%ED%94%84%EB%9D%BC%EC%9D%B4%EC%A6%88', time: '11:18' },
  { id: 'n16', type: '주요 뉴스', title: '엔터주, 글로벌 팬덤 확장으로 실적 개선', link: 'https://search.naver.com/search.naver?query=%EC%97%94%ED%84%B0%EC%A3%BC%20%EA%B8%80%EB%A1%9C%EB%B2%8C%20%ED%8C%AC%EB%8D%A4', time: '11:05' },
  { id: 'n17', type: '속보', title: '대한항공-아시아나 합병, EU 승인 임박', link: 'https://search.naver.com/search.naver?query=%EB%8C%80%ED%95%9C%ED%95%AD%EA%B3%B5%20%EC%95%84%EC%8B%9C%EC%95%84%EB%82%98%20%ED%95%A9%EB%B3%91', time: '10:52' },
  { id: 'n18', type: '주요 뉴스', title: '건설 경기, 하반기 회복세 전망 엇갈려', link: 'https://search.naver.com/search.naver?query=%EA%B1%B4%EC%84%A4%20%EA%B2%BD%EA%B8%B0%20%ED%9A%8C%EB%B3%B5', time: '10:38' },
  { id: 'n19', type: '속보', title: '두산로보틱스, 협동로봇 신제품 공개', link: 'https://search.naver.com/search.naver?query=%EB%91%90%EC%82%B0%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4%20%ED%98%91%EB%8F%99%EB%A1%9C%EB%B4%87', time: '10:22' },
  { id: 'n20', type: '주요 뉴스', title: '중국 소비 회복 지연, 국내 수출에 영향', link: 'https://search.naver.com/search.naver?query=%EC%A4%91%EA%B5%AD%20%EC%86%8C%EB%B9%84%20%ED%9A%8C%EB%B3%B5', time: '10:10' },
];
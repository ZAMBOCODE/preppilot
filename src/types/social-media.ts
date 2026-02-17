export type TimePeriod = "7d" | "30d" | "90d";

export type Platform = "tiktok" | "instagram" | "youtube" | "snapchat" | "shopify";

export interface PlatformConfig {
  id: Platform;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
}

export interface MetricData {
  label: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  format?: "number" | "percentage" | "duration" | "compact";
}

// ── Shared: Demographics & Audience ─────────────────────────────

export interface AgeGroup {
  range: string;
  percentage: number;
}

export interface GenderSplit {
  male: number;
  female: number;
  other: number;
}

export interface CountryData {
  country: string;
  percentage: number;
  followers: number;
}

export interface CityData {
  city: string;
  percentage: number;
}

export interface ActiveHour {
  hour: number;
  day: string;
  activity: number;
}

export interface TrafficSource {
  source: string;
  percentage: number;
  views: number;
}

export interface DeviceData {
  device: string;
  percentage: number;
}

// ── Overview ────────────────────────────────────────────────────────

export interface OverviewData {
  totalFollowers: number;
  totalFollowersChange: number;
  totalEngagementRate: number;
  totalEngagementRateChange: number;
  topPerformingPlatform: Platform;
  totalPosts: number;
  totalPostsChange: number;
  totalReach: number;
  totalReachChange: number;
  totalImpressions: number;
  totalImpressionsChange: number;
  totalVideoViews: number;
  totalVideoViewsChange: number;
  totalLikes: number;
  totalLikesChange: number;
  totalComments: number;
  totalCommentsChange: number;
  totalShares: number;
  totalSharesChange: number;
  followersByPlatform: Record<Platform, number>;
  followerGrowth: {
    platform: Platform;
    data: TimeSeriesDataPoint[];
  }[];
  engagementComparison: {
    platform: Platform;
    rate: number;
    totalEngagements: number;
  }[];
  reachByPlatform: {
    platform: Platform;
    reach: number;
    impressions: number;
  }[];
  audienceDemographics: {
    ageGroups: AgeGroup[];
    gender: GenderSplit;
    topCountries: CountryData[];
  };
  contentPerformance: {
    platform: Platform;
    posts: number;
    avgEngagement: number;
    bestPostTime: string;
  }[];
  platformRadar: {
    platform: Platform;
    followerGrowth: number;
    engagementRate: number;
    reach: number;
    impressions: number;
    contentOutput: number;
  }[];
  activeHours: ActiveHour[];
  engagementByType: { type: string; count: number }[];
  contentMixByPlatform: { platform: Platform; posts: number }[];
  topContentCrossPlatform: {
    id: string;
    platform: Platform;
    title: string;
    metric: string;
    value: number;
    postedAt: string;
  }[];
  viewsByCountry: {
    country: string;
    code: string;
    views: number;
    percentage: number;
  }[];
  viewsByCityTop: {
    city: string;
    country: string;
    views: number;
    percentage: number;
  }[];
}

// ── Goals ────────────────────────────────────────────────────────────

export interface Goal {
  id: string;
  platform: Platform | "all";
  metric: string;
  current: number;
  target: number;
  deadline: string;
  label: string;
}

// ── AI Insights ─────────────────────────────────────────────────────

export type InsightType = "positive" | "negative" | "neutral" | "action";

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  metric?: string;
  change?: number;
  platform?: Platform;
}

// ── Competitor Benchmarking ─────────────────────────────────────────

export interface Competitor {
  id: string;
  name: string;
  avatar: string;
  platforms: {
    platform: Platform;
    followers: number;
    engagementRate: number;
    postsPerWeek: number;
    avgViews: number;
  }[];
}

// ── Alerts ──────────────────────────────────────────────────────────

export type AlertSeverity = "warning" | "critical" | "info";

export interface MetricAlert {
  id: string;
  severity: AlertSeverity;
  platform: Platform;
  metric: string;
  message: string;
  currentValue: number;
  previousValue: number;
  change: number;
  timestamp: string;
  acknowledged: boolean;
}

// ── Content Calendar ────────────────────────────────────────────────

export interface CalendarPost {
  id: string;
  platform: Platform;
  title: string;
  type: "video" | "image" | "story" | "reel" | "short" | "spotlight" | "live";
  scheduledAt: string;
  status: "published" | "scheduled" | "draft";
  performance?: {
    views: number;
    likes: number;
    comments: number;
  };
}

// ── TikTok ──────────────────────────────────────────────────────────

export interface TikTokVideo {
  id: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  avgWatchTime: string;
  watchFullPercentage: number;
  postedAt: string;
}

export interface TikTokLiveStream {
  id: string;
  title: string;
  peakViewers: number;
  totalViewers: number;
  duration: string;
  diamonds: number;
  newFollowers: number;
  date: string;
}

export interface TikTokData {
  // Profile metrics
  followers: number;
  followersChange: number;
  following: number;
  likes: number;
  likesChange: number;
  totalViews: number;
  totalViewsChange: number;
  profileViews: number;
  profileViewsChange: number;
  shares: number;
  sharesChange: number;
  comments: number;
  commentsChange: number;
  saves: number;
  savesChange: number;
  engagementRate: number;
  engagementRateChange: number;
  avgWatchTime: string;
  watchFullPercentage: number;
  watchFullPercentageChange: number;
  // Time series
  viewsOverTime: TimeSeriesDataPoint[];
  followersOverTime: TimeSeriesDataPoint[];
  // Content
  videoPerformance: TikTokVideo[];
  trendingHashtags: { tag: string; uses: number; views: number }[];
  // Audience
  audienceDemographics: {
    ageGroups: AgeGroup[];
    gender: GenderSplit;
    topCountries: CountryData[];
    topCities: CityData[];
  };
  trafficSources: TrafficSource[];
  deviceBreakdown: DeviceData[];
  activeHours: ActiveHour[];
  // Live
  liveStreams: TikTokLiveStream[];
}

// ── Instagram ───────────────────────────────────────────────────────

export interface InstagramReel {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  reach: number;
  postedAt: string;
}

export interface InstagramStory {
  id: string;
  title: string;
  impressions: number;
  reach: number;
  exits: number;
  replies: number;
  tapsForward: number;
  tapsBack: number;
  postedAt: string;
}

export interface InstagramPost {
  id: string;
  title: string;
  type: "image" | "carousel" | "reel" | "video";
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  reach: number;
  impressions: number;
  postedAt: string;
}

export interface InstagramData {
  // Profile metrics
  followers: number;
  followersChange: number;
  following: number;
  posts: number;
  profileVisits: number;
  profileVisitsChange: number;
  websiteClicks: number;
  websiteClicksChange: number;
  emailClicks: number;
  // Engagement
  likes: number;
  likesChange: number;
  comments: number;
  commentsChange: number;
  saves: number;
  savesChange: number;
  shares: number;
  sharesChange: number;
  // Discovery
  reach: number;
  reachChange: number;
  impressions: number;
  impressionsChange: number;
  accountsReached: number;
  accountsEngaged: number;
  // Stories
  storiesViews: number;
  storiesViewsChange: number;
  storiesPosted: number;
  avgStoryExitRate: number;
  avgStoryReplyRate: number;
  stories: InstagramStory[];
  // Content
  reelsPerformance: InstagramReel[];
  topPosts: InstagramPost[];
  reachOverTime: TimeSeriesDataPoint[];
  impressionsOverTime: TimeSeriesDataPoint[];
  engagementByType: { type: string; count: number }[];
  contentTypePerformance: { type: string; avgReach: number; avgEngagement: number; count: number }[];
  // Audience
  audienceDemographics: {
    ageGroups: AgeGroup[];
    gender: GenderSplit;
    topCountries: CountryData[];
    topCities: CityData[];
  };
  activeHours: ActiveHour[];
  followerGrowthOverTime: TimeSeriesDataPoint[];
}

// ── YouTube ─────────────────────────────────────────────────────────

export interface YouTubeVideo {
  id: string;
  title: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  watchTimeHours: number;
  avgViewDuration: string;
  avgViewPercentage: number;
  impressions: number;
  ctr: number;
  publishedAt: string;
}

export interface YouTubeData {
  // Channel metrics
  subscribers: number;
  subscribersChange: number;
  totalViews: number;
  totalViewsChange: number;
  watchTimeHours: number;
  watchTimeChange: number;
  likes: number;
  likesChange: number;
  comments: number;
  commentsChange: number;
  shares: number;
  sharesChange: number;
  averageViewDuration: string;
  avgViewPercentage: number;
  impressions: number;
  impressionsChange: number;
  clickThroughRate: number;
  clickThroughRateChange: number;
  uniqueViewers: number;
  uniqueViewersChange: number;
  // Revenue (if monetized)
  estimatedRevenue: number;
  estimatedRevenueChange: number;
  rpm: number;
  cpm: number;
  adImpressions: number;
  // Time series
  viewsOverTime: TimeSeriesDataPoint[];
  watchTimeOverTime: TimeSeriesDataPoint[];
  subscribersOverTime: TimeSeriesDataPoint[];
  revenueOverTime: TimeSeriesDataPoint[];
  // Content
  videoPerformance: YouTubeVideo[];
  topVideos: YouTubeVideo[];
  // Traffic & Audience
  trafficSources: TrafficSource[];
  audienceDemographics: {
    ageGroups: AgeGroup[];
    gender: GenderSplit;
    topCountries: CountryData[];
  };
  viewerTypes: { type: string; percentage: number }[];
  deviceBreakdown: DeviceData[];
  // Search
  topSearchTerms: { term: string; views: number; impressions: number }[];
}

// ── Snapchat ────────────────────────────────────────────────────────

export interface SnapchatStory {
  id: string;
  title: string;
  views: number;
  screenshots: number;
  replies: number;
  completionRate: number;
  postedAt: string;
}

export interface SnapchatSpotlight {
  id: string;
  title: string;
  views: number;
  favorites: number;
  shares: number;
  totalWatchTime: string;
  postedAt: string;
}

export interface SnapchatData {
  // Profile
  score: number;
  scoreChange: number;
  friends: number;
  friendsChange: number;
  bestFriends: number;
  // Stories
  storyViews: number;
  storyViewsChange: number;
  storiesPosted: number;
  avgCompletionRate: number;
  avgCompletionRateChange: number;
  totalScreenshots: number;
  totalReplies: number;
  stories: SnapchatStory[];
  storyViewsOverTime: TimeSeriesDataPoint[];
  // Streaks
  streaks: number;
  streaksChange: number;
  longestStreak: number;
  // Spotlight
  spotlightViews: number;
  spotlightViewsChange: number;
  spotlights: SnapchatSpotlight[];
  spotlightViewsOverTime: TimeSeriesDataPoint[];
  // Audience
  audienceDemographics: {
    ageGroups: AgeGroup[];
    gender: GenderSplit;
    topCountries: CountryData[];
  };
}

// ── Shopify ────────────────────────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  title: string;
  revenue: number;
  units: number;
  avgPrice: number;
  image: string;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: string;
  total: number;
  items: number;
  status: "erfüllt" | "ausstehend" | "storniert" | "in Bearbeitung";
  date: string;
}

export interface PaymentMethod {
  method: string;
  percentage: number;
  amount: number;
}

export interface ComparisonTimeSeriesPoint {
  date: string;
  current: number;
  previous: number;
}

export interface CustomerTimeSeriesPoint {
  date: string;
  firstTime: number;
  returning: number;
}

export interface ConversionFunnelStep {
  label: string;
  sessions: number;
  rate: number;
  rateChange: number;
}

export interface SalesChannel {
  channel: string;
  amount: number;
  change: number;
}

export interface ShopifyData {
  // Total Sales
  totalSales: number;
  totalSalesChange: number;
  salesByChannel: SalesChannel[];
  salesOverTime: ComparisonTimeSeriesPoint[];
  // Online Store Sessions
  sessions: number;
  sessionsChange: number;
  visitors: number;
  visitorsChange: number;
  sessionsOverTime: ComparisonTimeSeriesPoint[];
  // Returning Customer Rate
  returningCustomerRate: number;
  returningCustomerRateChange: number;
  customersOverTime: CustomerTimeSeriesPoint[];
  // Conversion
  conversionRate: number;
  conversionRateChange: number;
  conversionFunnel: ConversionFunnelStep[];
  // Average Order Value
  avgOrderValue: number;
  avgOrderValueChange: number;
  avgOrderValueOverTime: ComparisonTimeSeriesPoint[];
  // Total Orders
  totalOrders: number;
  totalOrdersChange: number;
  ordersOverTime: ComparisonTimeSeriesPoint[];
  // Sessions by Device
  sessionsByDevice: DeviceData[];
  // Products & Orders
  topProducts: ShopifyProduct[];
  recentOrders: ShopifyOrder[];
}

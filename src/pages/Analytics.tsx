import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, Activity, Users, Calendar, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { useState } from "react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for charts
  const portfolioData = [
    { date: "Mar 10", value: 12400, rewards: 234 },
    { date: "Mar 11", value: 13200, rewards: 345 },
    { date: "Mar 12", value: 12800, rewards: 287 },
    { date: "Mar 13", value: 14100, rewards: 412 },
    { date: "Mar 14", value: 15300, rewards: 456 },
    { date: "Mar 15", value: 16200, rewards: 523 },
    { date: "Mar 16", value: 17500, rewards: 634 }
  ];

  const poolDistribution = [
    { name: "ETH Quantum Pod", value: 35, color: "hsl(var(--primary))" },
    { name: "USDC Stealth Farm", value: 28, color: "hsl(var(--secondary))" },
    { name: "BTC Cipher Grove", value: 20, color: "hsl(var(--accent))" },
    { name: "FHE Genesis Seed", value: 17, color: "hsl(var(--bio-green))" }
  ];

  const apyTrends = [
    { pool: "ETH Quantum", apy: 23.4, change: "+2.1%" },
    { pool: "USDC Stealth", apy: 18.9, change: "-0.5%" },
    { pool: "BTC Cipher", apy: 31.2, change: "+1.8%" },
    { pool: "FHE Genesis", apy: 45.7, change: "+3.2%" }
  ];

  const rewardsHistory = [
    { month: "Jan", claimed: 1200, pending: 800 },
    { month: "Feb", claimed: 1850, pending: 950 },
    { month: "Mar", claimed: 2340, pending: 1234 }
  ];

  return (
    <div className="min-h-screen bg-gradient-field particle-field">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-cyber font-bold text-4xl mb-4 text-gradient-primary">
              Analytics Dashboard
            </h1>
            <p className="font-tech text-lg text-muted-foreground">
              Track your farming performance and portfolio insights
            </p>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-card/40 border-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-primary" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Total Portfolio</p>
                <p className="font-cyber font-bold text-2xl text-primary">
                  $17,500
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-bio-green" />
                  <span className="font-tech text-xs text-bio-green">+12.3%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-secondary" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Average APY</p>
                <p className="font-cyber font-bold text-2xl text-secondary">
                  29.8%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-bio-green" />
                  <span className="font-tech text-xs text-bio-green">+1.4%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Active Farms</p>
                <p className="font-cyber font-bold text-2xl text-accent">
                  4
                </p>
                <Badge variant="secondary" className="font-tech text-xs mt-1">
                  All encrypted
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-harvest-ready" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">This Week</p>
                <p className="font-cyber font-bold text-2xl text-harvest-ready">
                  $634
                </p>
                <span className="font-tech text-xs text-muted-foreground">rewards earned</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30">
            <TabsTrigger value="overview" className="font-tech">
              Portfolio Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="font-tech">
              Performance
            </TabsTrigger>
            <TabsTrigger value="distribution" className="font-tech">
              Distribution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Portfolio Value Chart */}
            <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h3 className="font-cyber font-bold text-xl text-primary">
                  Portfolio Value Over Time
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.2)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--primary) / 0.2)",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Rewards Tracking */}
            <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-harvest-ready" />
                <h3 className="font-cyber font-bold text-xl text-harvest-ready">
                  Rewards Progress
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={rewardsHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.2)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--primary) / 0.2)",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="claimed" fill="hsl(var(--harvest-ready))" />
                  <Bar dataKey="pending" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* APY Trends */}
            <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-secondary" />
                <h3 className="font-cyber font-bold text-xl text-secondary">
                  APY Performance by Pool
                </h3>
              </div>
              <div className="space-y-4">
                {apyTrends.map((pool, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-cyber font-semibold text-primary">
                        {pool.pool}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-cyber font-bold text-xl text-secondary">
                          {pool.apy}%
                        </p>
                      </div>
                      <Badge 
                        variant={pool.change.startsWith('+') ? 'default' : 'secondary'}
                        className="font-tech"
                      >
                        {pool.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
                <h3 className="font-cyber font-bold text-lg text-primary mb-4">
                  Best Performer
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-muted-foreground">Pool</span>
                    <span className="font-cyber font-semibold text-primary">FHE Genesis Seed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-muted-foreground">APY</span>
                    <span className="font-cyber font-bold text-harvest-ready">45.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-muted-foreground">Growth</span>
                    <Badge className="bg-bio-green text-background">+3.2%</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
                <h3 className="font-cyber font-bold text-lg text-primary mb-4">
                  Risk Assessment
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-muted-foreground">Portfolio Risk</span>
                    <Badge variant="secondary" className="font-tech">Low</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-muted-foreground">Diversification</span>
                    <Badge className="bg-bio-green text-background">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-muted-foreground">Encryption</span>
                    <Badge className="bg-accent text-background">100%</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            {/* Pool Distribution */}
            <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <PieChartIcon className="w-6 h-6 text-accent" />
                <h3 className="font-cyber font-bold text-xl text-accent">
                  Portfolio Distribution
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={poolDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {poolDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--primary) / 0.2)",
                        borderRadius: "8px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  {poolDistribution.map((pool, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: pool.color }}
                      />
                      <div className="flex-1">
                        <p className="font-tech text-sm text-muted-foreground">
                          {pool.name}
                        </p>
                      </div>
                      <span className="font-cyber font-semibold text-primary">
                        {pool.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Asset Breakdown */}
            <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20">
              <h3 className="font-cyber font-bold text-xl text-primary mb-6">
                Asset Allocation
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-tech text-muted-foreground mb-4">By Token Type</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-tech">ETH</span>
                      <span className="font-cyber font-semibold text-primary">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-tech">Stablecoins</span>
                      <span className="font-cyber font-semibold text-secondary">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-tech">BTC</span>
                      <span className="font-cyber font-semibold text-accent">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-tech">FHE Token</span>
                      <span className="font-cyber font-semibold text-bio-green">17%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-tech text-muted-foreground mb-4">By Risk Level</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-tech">Low Risk</span>
                      <span className="font-cyber font-semibold text-primary">63%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-tech">Medium Risk</span>
                      <span className="font-cyber font-semibold text-secondary">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-tech">High Risk</span>
                      <span className="font-cyber font-semibold text-accent">17%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
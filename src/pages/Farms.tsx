import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SeedPod from "@/components/SeedPod";
import { Search, Filter, TrendingUp, Clock, Shield } from "lucide-react";

const Farms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("apy");
  const [filterType, setFilterType] = useState("all");

  const allFarms = [
    {
      name: "ETH Quantum Pod",
      stakingToken: "ETH",
      rewardToken: "QFT", 
      apy: 23.4,
      totalStaked: "1,234.56 ETH",
      userStaked: "12.34 ETH",
      pendingRewards: "156.78",
      isEncrypted: true,
      maturity: 85
    },
    {
      name: "USDC Stealth Farm",
      stakingToken: "USDC",
      rewardToken: "PRIV",
      apy: 18.9,
      totalStaked: "456,789 USDC", 
      userStaked: "5,000 USDC",
      pendingRewards: "892.45",
      isEncrypted: true,
      maturity: 67
    },
    {
      name: "BTC Cipher Grove",
      stakingToken: "BTC",
      rewardToken: "CRYPT",
      apy: 31.2,
      totalStaked: "89.45 BTC",
      userStaked: "0.5 BTC", 
      pendingRewards: "234.12",
      isEncrypted: false,
      maturity: 42
    },
    {
      name: "FHE Genesis Seed",
      stakingToken: "FHE",
      rewardToken: "GENESIS",
      apy: 45.7,
      totalStaked: "12,345 FHE",
      userStaked: "1,000 FHE",
      pendingRewards: "567.89",
      isEncrypted: true,
      maturity: 95
    },
    {
      name: "LINK Oracle Farm",
      stakingToken: "LINK",
      rewardToken: "ORACLE",
      apy: 27.8,
      totalStaked: "23,456 LINK",
      userStaked: "0 LINK",
      pendingRewards: "0",
      isEncrypted: true,
      maturity: 0
    },
    {
      name: "MATIC Polygon Grove",
      stakingToken: "MATIC",
      rewardToken: "POLY",
      apy: 15.3,
      totalStaked: "1,234,567 MATIC",
      userStaked: "0 MATIC",
      pendingRewards: "0",
      isEncrypted: false,
      maturity: 0
    }
  ];

  const filteredFarms = allFarms
    .filter(farm => {
      if (filterType === "encrypted" && !farm.isEncrypted) return false;
      if (filterType === "active" && farm.maturity === 0) return false;
      if (searchTerm && !farm.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "apy") return b.apy - a.apy;
      if (sortBy === "maturity") return b.maturity - a.maturity;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-gradient-field particle-field">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-cyber font-bold text-4xl mb-4 text-gradient-primary">
            Farming Pools
          </h1>
          <p className="font-tech text-lg text-muted-foreground">
            Stake your assets in encrypted seed pods and earn rewards privately
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Total Pools</p>
                <p className="font-cyber font-bold text-2xl text-primary">
                  {allFarms.length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-accent" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Encrypted Pools</p>
                <p className="font-cyber font-bold text-2xl text-accent">
                  {allFarms.filter(f => f.isEncrypted).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-secondary" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Active Farms</p>
                <p className="font-cyber font-bold text-2xl text-secondary">
                  {allFarms.filter(f => f.maturity > 0).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/40 backdrop-blur-sm border-primary/20 hover-glow">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-bio-green" />
              <div>
                <p className="font-tech text-sm text-muted-foreground">Max APY</p>
                <p className="font-cyber font-bold text-2xl text-bio-green">
                  {Math.max(...allFarms.map(f => f.apy)).toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="p-6 mb-8 bg-card/40 backdrop-blur-sm border-primary/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search farming pools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/30 border-primary/20"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-muted/30 border-primary/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apy">Highest APY</SelectItem>
                <SelectItem value="maturity">Maturity Progress</SelectItem>
                <SelectItem value="name">Pool Name</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 bg-muted/30 border-primary/20">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pools</SelectItem>
                <SelectItem value="encrypted">Encrypted Only</SelectItem>
                <SelectItem value="active">Active Farms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 mt-4">
            <Badge variant="secondary" className="font-tech">
              {filteredFarms.length} pools found
            </Badge>
            {filterType !== "all" && (
              <Badge variant="outline" className="font-tech">
                {filterType} filter active
              </Badge>
            )}
          </div>
        </Card>

        {/* Farming Pools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredFarms.map((farm, index) => (
            <SeedPod key={index} {...farm} />
          ))}
        </div>

        {filteredFarms.length === 0 && (
          <Card className="p-12 text-center bg-card/40 backdrop-blur-sm border-primary/20">
            <div className="space-y-4">
              <Filter className="w-16 h-16 text-muted-foreground mx-auto" />
              <h3 className="font-cyber font-bold text-xl text-muted-foreground">
                No pools found
              </h3>
              <p className="font-tech text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                }}
                className="border-primary/30 hover:bg-primary/20"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Farms;
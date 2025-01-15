import React from 'react';
import { TokenDistributionChart } from '../components/TokenDistributionChart';

export function Tokenomics() {
  return (
    <div className="p-6 rounded-lg border border-[#00ff41] bg-[#0d0208]/90">
      <h1 className="text-2xl font-bold mb-6">Tokenomics</h1>
      
      <TokenDistributionChart />
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">Token Distribution</h2>
          <ul className="space-y-2">
            <li>• Community Rewards: 40%</li>
            <li>• Development Fund: 20%</li>
            <li>• Team Allocation: 5%</li>
            <li>• Marketing: 10%</li>
            <li>• Liquidity Pool: 10%</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Token Utility</h2>
          <ul className="space-y-2">
            <li>• Governance voting rights</li>
            <li>• Access to our AI Marketplace</li>
            <li>• Eco Friendly Tokens</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
import React from 'react';

export function Roadmap() {
  return (
    <div className="p-6 rounded-lg border border-[#00ff41] bg-[#0d0208]/90">
      <h1 className="text-2xl font-bold mb-6">Development Roadmap</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Phase 1: Foundation</h2>
          <ul className="space-y-2">
            <li>✓ Core AI implementation</li>
            <li>✓ Basic chat interface</li>
            <li>✓ Voice interaction system</li>
            <li>• Token smart contract deployment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Phase 2: Enhancement</h2>
          <ul className="space-y-2">
            <li>• Advanced memory system</li>
            <li>• Personality engine integration</li>
            <li>• AI Marketplace Integration</li>
            <li>• Multi-language support</li>
            <li>• Mobile app development</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Phase 3: Expansion</h2>
          <ul className="space-y-2">
            <li>• DAO governance implementation</li>
            <li>• Developer API access</li>
            <li>• Cross-chain integration</li>
            <li>• Enterprise solutions</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
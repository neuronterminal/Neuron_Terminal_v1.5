import React from 'react';
import { DeveloperCard } from '../components/DeveloperCard';

const developers = [
  {
    name: "Sarah Ananya",
    role: "Lead AI Engineer",
    bio: "Full-stack developer with a passion for AI and machine learning. Specializes in neural networks and natural language processing.",
    experience: [
      "Senior Developer at Cresta (2018-2023)",
      "ML Engineer at Glean",
      "Led development at Figure AI"
    ],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Marcus Rodriguez",
    role: "Backend Architect",
    bio: "Systems architect with extensive experience in scalable infrastructure and blockchain technology.",
    experience: [
      "Principal Engineer at Gemini",
      "Backend Lead at Crypto.com",
      "Developed high-performance trading platforms"
    ],
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Alex Thompson",
    role: "Frontend Developer",
    bio: "Creative developer focused on building intuitive and responsive user interfaces with modern web technologies.",
    experience: [
      "UI/UX Lead at Creative Digital",
      "Frontend Developer at Activision Studios",
      "Created award-winning web applications"
    ],
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

export function Team() {
  return (
    <div className="p-6 rounded-lg border border-[#00ff41] bg-[#0d0208]/90">
      <h1 className="text-2xl font-bold mb-6">Meet the Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <DeveloperCard key={index} {...dev} />
        ))}
      </div>
    </div>
  );
}
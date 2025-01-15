import React from 'react';

interface DeveloperProps {
  name: string;
  role: string;
  bio: string;
  experience: string[];
  imageUrl: string;
}

export function DeveloperCard({ name, role, bio, experience, imageUrl }: DeveloperProps) {
  return (
    <div className="p-6 rounded-lg border border-[#00ff41] bg-[#0d0208]/90 hover:bg-[#00ff41]/5 transition-all">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full border-2 border-[#00ff41] overflow-hidden mb-4">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-[#00ff41]/80 mb-4">{role}</p>
        <p className="text-sm mb-4 text-center">{bio}</p>
        <div>
          <h4 className="font-semibold mb-2">Experience:</h4>
          <ul className="text-sm space-y-1">
            {experience.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
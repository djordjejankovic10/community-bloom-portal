import React from 'react';

interface CommunityDescriptionProps {
  title: string;
  description: string;
}

export const CommunityDescription: React.FC<CommunityDescriptionProps> = ({
  title,
  description
}) => {
  return (
    <div className="px-4 py-3 bg-background">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  );
};

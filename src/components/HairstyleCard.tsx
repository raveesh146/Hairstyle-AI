
import type { Hairstyle } from '../types';
import { Sparkles } from 'lucide-react';

interface Props {
  hairstyle: Hairstyle;
  onSelect: (hairstyle: Hairstyle) => void;
}

export function HairstyleCard({ hairstyle, onSelect }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={hairstyle.imageUrl}
        alt={hairstyle.name}
        className="w-full h-48 object-cover"
        crossOrigin="anonymous"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{hairstyle.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{hairstyle.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Maintenance: {hairstyle.maintenanceLevel}
          </span>
          <button
            onClick={() => onSelect(hairstyle)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Try it
          </button>
        </div>
      </div>
    </div>
  );
}
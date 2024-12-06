import React from 'react';
import { Camera } from './components/Camera';
import { Preview } from './components/Preview';
import { HairstyleCard } from './components/HairstyleCard';
import { useStore } from './store/useStore';
import { hairstyles } from './data/hairstyles';
import { Scissors } from 'lucide-react';

function App() {
  const { userPhoto, setSelectedHairstyle } = useStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-semibold text-gray-900">AI Hairstyle Advisor</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Photo</h2>
            {userPhoto ? <Preview /> : <Camera />}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Recommended Styles</h2>
            <div className="grid gap-6">
              {hairstyles.map((hairstyle) => (
                <HairstyleCard
                  key={hairstyle.id}
                  hairstyle={hairstyle}
                  onSelect={setSelectedHairstyle}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
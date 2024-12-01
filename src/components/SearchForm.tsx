"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface SearchFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchForm({ onChange }: SearchFormProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    router.push(`/analyze/${username}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            onChange(e); // Track typing for background change
          }}
          className="flex-1 text-lg h-12"
        />
        <Button 
          type="submit" 
          disabled={loading || !username.trim()} 
          size="lg"
          className="w-full md:w-auto text-lg h-12"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Search className="w-5 h-5 mr-2" />
          )}
          Analyze Profile
        </Button>
      </div>
    </form>
  );
}

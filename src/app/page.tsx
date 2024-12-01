"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import SearchForm from '@/components/SearchForm';
import HomeAnimation from '@/components/HomeAnimation';
import Image from 'next/image';

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);

  // Function to handle user typing in the search input
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <main className="min-h-screen relative">
      {/* Background image changes when typing */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img
          src={isTyping ? "/chilguy.gif" : "/brainrot.gif"} // Change background image
          alt="Backround Image"
          className="object-cover w-full h-full opacity-30 transition-all duration-500" // Use smooth transition for background change
        />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <HomeAnimation>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80 tracking-tight">
              Welcome to GitHub Brain Rot Analyzer
            </h1>
            <p className="text-xl md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
              Tired of pretending to be productive? Discover your GitHub profile’s true brain rot personality. 🧠💀 We’ll tell you how deep you’ve sunk into the code dungeon, whether you’re a basement dweller or a lowkey chill guy. 🛋️
            </p>

            <Card className="max-w-2xl mx-auto p-8 backdrop-blur-sm bg-background/95 border-2">
              {/* Pass the handleTyping function to SearchForm */}
              <SearchForm onChange={handleTyping} />
            </Card>

            <div className="mt-8 text-sm text-stone-600">
              <p>Made with 💖 by <a href='https://github.com/HarshitVashisht11'>Harshit</a> in Ohio⚡</p>
            </div>
          </div>
        </HomeAnimation>
      </div>
    </main>
  );
}

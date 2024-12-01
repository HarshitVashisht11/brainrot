"use client";

import { useEffect, useState } from 'react';
import { fetchGitHubProfile } from '@/lib/github';
import { analyzeProfile } from '@/lib/ai';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import ProfileCard from './ProfileCard';
import AnalysisCard from './AnalysisCard';
import AnalysisAnimation from './AnalysisAnimation';

export default function AnalysisContent({ username }: { username: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [brainRotScore, setBrainRotScore] = useState(0);

  const analyzeGitHubProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const githubData = await fetchGitHubProfile(username);
      setProfile(githubData.profile);
      
      const aiAnalysis = await analyzeProfile(githubData);
      setAnalysis(aiAnalysis);
      setBrainRotScore(aiAnalysis.chill_score + Math.floor(1*20));
    } catch {
      setError('Failed to analyze profile. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeGitHubProfile();
  }, [username]);

  if (loading) {
    return <LoadingSpinner message="Analyzing GitHub Profile" />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={analyzeGitHubProfile} />;
  }

  return (
    <AnalysisAnimation>
      <ProfileCard 
        profile={profile} 
        analysis={analysis} 
        brainRotScore={brainRotScore}
      />
      <AnalysisCard analysis={analysis} />
    </AnalysisAnimation>
  );
}
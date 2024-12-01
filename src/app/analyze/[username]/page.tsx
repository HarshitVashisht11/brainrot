"use client";
import { useEffect, useState } from 'react';
import { fetchGitHubProfile } from '@/lib/github';
import { analyzeProfile } from '@/lib/ai';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import ProfileCard from '@/components/ProfileCard';
import AnalysisCard from '@/components/AnalysisCard';
import AnalysisAnimation from '@/components/AnalysisAnimation';
import { usePathname } from 'next/navigation';

export default function AnalysisContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const pathname = usePathname(); 
  const username = pathname.split('/').pop() || '';
  
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
    } catch (err) {
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
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full">
        <AnalysisAnimation>
          <ProfileCard
            profile={profile}
            analysis={analysis}
            brainRotScore={brainRotScore}
          />
          <AnalysisCard analysis={analysis} />
        </AnalysisAnimation>
      </div>
    </div>
  );
}

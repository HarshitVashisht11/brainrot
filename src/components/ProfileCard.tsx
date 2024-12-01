"use client";
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Calendar, GitBranch, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProfileCard({ profile, analysis, brainRotScore }: { 
  profile: any; 
  analysis: any; 
  brainRotScore: number; 
}) {
  return (
    <Card className="p-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-16 h-16">
          <img
            src={profile?.avatar_url || '/placeholder.png'}
            alt="Avatar"
            className="rounded-full"
          />
        </Avatar>
        <div>
          <h3 className="text-2xl font-semibold text-black">{profile?.name || "Unknown User"}</h3>
          <p className="text-sm text-black">{profile?.login || "N/A"}</p>
        </div>
      </div>

      {/* User Tag */}
      <div className="mt-4">
        <h4 className="text-lg font-bold">User Tag:</h4>
        <Badge
          className="mt-2"
          style={{
            backgroundColor: analysis?.user_tag_color || '#3b82f6', // Default blue
            color: '#fff',
          }}
        >
          {analysis?.user_tag || "N/A"}
        </Badge>
      </div>

      {/* Brain Rot Score */}
      <div className="mt-6">
        <h4 className="text-lg font-bold">Brain Rot Score:</h4>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium">{brainRotScore}%</span>
          <Progress value={brainRotScore} max={100} className="w-full" />
        </div>
      </div>

      {/* Chill Guy Score */}
      <div className="mt-6">
        <h4 className="text-lg font-bold">Chill Guy Score:</h4>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium">{analysis?.chill_score || 0}%</span>
          <Progress value={analysis?.chill_score || 0} max={100} className="w-full" />
        </div>
      </div>

      {/* Additional Profile Details */}
      <div className="mt-8 space-y-4">
        <h4 className="text-lg font-bold">Additional Details:</h4>
        <div className="flex items-center gap-3 text-sm text-black">
          <Calendar className="w-5 h-5 text-primary" />
          <span>Joined: {new Date(profile?.created_at).toLocaleDateString() || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-black">
          <GitBranch className="w-5 h-5 text-primary" />
          <span>Public Repos: {profile?.public_repos || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-black">
          <Star className="w-5 h-5 text-primary" />
          <span>Followers: {profile?.followers || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-black">
          <Users className="w-5 h-5 text-primary" />
          <span>Following: {profile?.following || "N/A"}</span>
        </div>
      </div>
    </Card>
  );
}

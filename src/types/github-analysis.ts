export interface GitHubProfile {
    name: string
    login: string
    avatar_url: string
    bio?: string
    public_repos: number
    followers: number
    following: number
  }
  
  export interface Analysis {
    brainRotScore: number
    personalityType: string
    codingStyle: string
    hobbies: string
    funFact: string
    generation: string
  }
  
  
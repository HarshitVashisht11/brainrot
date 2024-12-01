import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

export async function fetchGitHubProfile(username: string) {
  try {
    const [userResponse, reposResponse, contributionsResponse] = await Promise.all([
      octokit.rest.users.getByUsername({ username }),
      octokit.rest.repos.listForUser({ username, per_page: 100, sort: 'updated' }),
      octokit.rest.search.commits({ q: `author:${username}` })
    ]);

    return {
      profile: userResponse.data,
      repositories: reposResponse.data,
      contributions: contributionsResponse.data
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
}
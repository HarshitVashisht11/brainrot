import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export async function analyzeProfile(githubData: any) {
    const client = new BedrockRuntimeClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION !,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ID !,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET !,
      },
    });
      
    const repoCount = githubData.repositories.length || 0;
    const commitCount = githubData.profile.total_contributions || 0; // Assuming you fetch this data
    const chillScore = Math.min(100, 100 - repoCount - commitCount / 100); // Scale to 0-100
    
    const tagData = [
      { condition: repoCount > 100, tag: "Basement Dweller", color: "#ff0000" }, // Red
      { condition: repoCount > 50, tag: "Skibidi Sigma", color: "#ffa500" }, // Orange
      { condition: repoCount > 20, tag: "Ohio Coder NPC", color: "#00ff00" }, // Green
      { condition: true, tag: "Lowkey Chill Guy", color: "#3b82f6" }, // Blue as default
    ];
    
    const { tag: userTag, color: userTagColor } = tagData.find((item) => item.condition) || {};
    
    const repoNames = githubData.repositories
      .slice(0, 5) // Limit to 5 repositories
      .map((repo: { name: string }) => repo.name)
      .join(", ");
    
    const profileSummary = {
      login: githubData.profile.login,
      name: githubData.profile.name,
      followers: githubData.profile.followers,
      public_repos: githubData.profile.public_repos,
    };
    
    const prompt = `
      Based on the GitHub profile provided, generate a brief brain rot analysis about the user's coding habits and personality. 
      Make sure to use full brain rot style language and make the roast not a summary. 
      It should be more of a roast, not exceeding 150 words.
      User Profile: ${JSON.stringify(profileSummary)}
      Top Repositories: ${repoNames || "No repositories available"}
    `;
    
    try {
      const input = {
        modelId: "meta.llama3-70b-instruct-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          prompt,
          max_gen_len: 512,
          temperature: 0.7,
          top_p: 0.9,
        }),
      };
    
      const command = new InvokeModelCommand(input);
      const response = await client.send(command);
    
      const decodedResponse = new TextDecoder().decode(response.body);
      console.log("Raw response:", decodedResponse);
    
      const cleanedResponse = decodedResponse.trim().replace(/^\s*\/\*\s*/, '');
      const parsedResponse = JSON.parse(cleanedResponse);
    
      return {
        small_analysis: parsedResponse.generation ? parsedResponse.generation.trim() : "No analysis available",
        user_tag: userTag,
        user_tag_color: userTagColor,
        chill_score: chillScore,
      };
    } catch (error) {
      console.error("Error analyzing profile:", error);
      throw new Error("AI analysis failed.");
    }

}
import { Card } from '@/components/ui/card';
import AnalysisContent from '@/components/AnalysisContent';

export default async function AnalyzePage({ params }: { params: { username: string } }) {
  // Ensure `params` is awaited before using its properties
  const { username } = await params;

  return (
    <div className="container mx-auto px-4 py-16">
      <AnalysisContent username={username} />
    </div>
  );
}

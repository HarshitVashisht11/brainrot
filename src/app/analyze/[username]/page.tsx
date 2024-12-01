import AnalysisContent from '@/components/AnalysisContent';

export default function AnalyzePage({ params }: { params: { username: string } }) {
  const { username } = params;

  return (
    <div className="container mx-auto px-4 py-16">
      <AnalysisContent username={username} />
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function AnalysisCard({ analysis }: { analysis: any }) {
  return (
    <Card className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-primary" />
          <h3 className="text-2xl font-semibold">AI Analysis</h3>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="text-lg font-bold">Summary:</h4>
            <p>{analysis?.small_analysis || "Generating analysis..."}</p>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}


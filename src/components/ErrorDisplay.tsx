"use client";

import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ErrorDisplay({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <Card className="p-8 max-w-md w-full">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-destructive mb-4">Analysis Failed</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" size="lg">
              Try Again
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
"use client";

import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ message }: { message: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex flex-col items-center justify-center"
    >
      <div className="text-center max-w-md mx-auto p-8">
        <Loader2 className="w-16 h-16 animate-spin mx-auto mb-8 text-primary" />
        <p className="text-2xl font-medium text-primary">{message}</p>
        <p className="text-muted-foreground mt-2">Please wait while we analyze your profile</p>
      </div>
    </motion.div>
  );
}
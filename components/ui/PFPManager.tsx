'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PFPManagerProps {
  currentPFP?: string | null;
  onPFPChange: (pfpData: string | null) => void;
  size?: 'sm' | 'md' | 'lg';
  showRemove?: boolean;
}

export function PFPManager({
  currentPFP,
  onPFPChange,
  size = 'md',
  showRemove = true
}: PFPManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onPFPChange(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Error reading file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePFP = () => {
    setPreviewUrl(null);
    onPFPChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const displayUrl = previewUrl || currentPFP;

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} rounded-full cursor-pointer hover:scale-105 transition-transform`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          <div className={`${sizeClasses[size]} rounded-full bg-white flex items-center justify-center overflow-hidden`}>
            <AnimatePresence mode="wait">
              {displayUrl ? (
                <motion.div
                  key="pfp"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={displayUrl}
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                    sizes={`${sizeClasses[size]}`}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-2xl font-bold text-gray-400"
                >
                  👤
                </motion.div>
              )}
            </AnimatePresence>

            {isUploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"
              >
                <div className="spinner-rainbow w-4 h-4"></div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Upload indicator */}
        <motion.div
          className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: displayUrl ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          ✓
        </motion.div>
      </div>

      <div className="flex flex-col gap-2">
        <motion.button
          onClick={handleClick}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : displayUrl ? 'Change PFP' : 'Add PFP'}
        </motion.button>

        {showRemove && displayUrl && (
          <motion.button
            onClick={handleRemovePFP}
            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Remove
          </motion.button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}

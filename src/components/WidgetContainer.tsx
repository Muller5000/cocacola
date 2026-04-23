import React from 'react';
import { MoreHorizontal, X, Minus, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface WidgetContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  onRemove?: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
  isLoading?: boolean;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({ 
  title, 
  subtitle,
  children, 
  className,
  onRemove,
  onMinimize,
  isMinimized,
  isLoading
}) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        height: isMinimized ? 'auto' : (title ? '100%' : 'auto')
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "card-clean flex flex-col h-full relative overflow-hidden group/widget",
        isMinimized ? "p-4" : "p-6",
        className
      )}
    >
      {title && (
        <div className={cn("flex items-center justify-between", isMinimized ? "mb-0" : "mb-6")}>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] group-hover/widget:text-[#F40009] transition-colors">
              {title}
            </h3>
            {subtitle && !isMinimized && (
              <p className="text-[10px] text-[#48484A] font-bold uppercase tracking-widest mt-1.5">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover/widget:opacity-100 transition-opacity">
            {onMinimize && (
              <button 
                onClick={onMinimize}
                className="p-2 hover:bg-[#232326] rounded-lg text-[#48484A] hover:text-white transition-colors border border-transparent hover:border-[#38383A]"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </button>
            )}
            <button className="p-2 hover:bg-[#232326] rounded-lg text-[#48484A] hover:text-white transition-colors border border-transparent hover:border-[#38383A]">
              <MoreHorizontal className="w-5 h-5" />
            </button>
            {onRemove && (
              <button 
                onClick={onRemove}
                className="p-2 hover:bg-red-500/10 text-[#48484A] hover:text-[#F40009] rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                title="Remove Widget"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        {!isMinimized && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-[#232326] border-t-[#F40009] rounded-full animate-spin"></div>
              </div>
            ) : (
              children
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

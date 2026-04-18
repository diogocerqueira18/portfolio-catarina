import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const getIcon = (iconName: string): LucideIcon => {
  const formattedName = 
    iconName.charAt(0).toUpperCase() + 
    iconName.slice(1).toLowerCase();

  const Icon = LucideIcons[formattedName as keyof typeof LucideIcons];

  if (Icon) {
    return Icon as LucideIcon;
  }

  return LucideIcons.Video;
};
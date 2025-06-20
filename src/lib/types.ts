
export type MenuItemCategory = 'Appetizers' | 'Main Courses' | 'Desserts' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: MenuItemCategory;
  dataAiHint?: string;
}

export type EventType = 'Wedding' | 'Corporate' | 'Private Party' | 'Other';

export interface EventItem {
  id: string;
  name?: string;
  type: EventType;
  description?: string;
  date: string; // e.g., "2023-10-26"
  images?: string[]; // URLs to images - now optional
  videoUrl?: string; // Optional URL to a video
  dataAiHint?: string; // For main media
}

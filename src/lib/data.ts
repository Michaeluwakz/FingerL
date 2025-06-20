
import type { MenuItem, EventItem, EventType } from './types';
import { Salad, ChefHat, CakeSlice, Coffee, GlassWater, Briefcase, PartyPopper, CalendarDays } from 'lucide-react';

export const menuCategories = [
  { name: 'Appetizers', icon: Salad, dataAiHint: 'appetizer salad' },
  { name: 'Main Courses', icon: ChefHat, dataAiHint: 'gourmet dish' },
  { name: 'Desserts', icon: CakeSlice, dataAiHint: 'delicious cake' },
  { name: 'Drinks', icon: Coffee, dataAiHint: 'specialty coffee' },
] as const;


export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app1',
    name: 'Crispy Calamari',
    description: 'Lightly fried calamari served with a zesty lemon aioli.',
    price: 12.50,
    imageUrl: 'https://cdn.prod.website-files.com/60da4419d98adf0a36dc660e/63ac4f04eb51b026e62521e4_AirFryerCalamari_2022-4.jpg',
    category: 'Appetizers',
    dataAiHint: 'fried calamari'
  },
  {
    id: 'app2',
    name: 'Bruschetta al Pomodoro',
    description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil.',
    price: 9.00,
    imageUrl: 'https://cdn.prod.website-files.com/60da4419d98adf0a36dc660e/63ac4f04eb51b026e62521e4_AirFryerCalamari_2022-4.jpg',
    category: 'Appetizers',
    dataAiHint: 'bruschetta tomato'
  },
  // Main Courses
  {
    id: 'main1',
    name: 'Grilled Salmon',
    description: 'Served with roasted asparagus and a lemon-dill sauce.',
    price: 24.00,
    imageUrl: 'https://images.services.kitchenstories.io/15iKhS4lJ5o7zvrPbl6q0u_md_k=/1920x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R3022-final-photo-3.jpg',
    category: 'Main Courses',
    dataAiHint: 'grilled salmon'
  },
  {
    id: 'main2',
    name: 'Filet Mignon',
    description: '8oz center-cut filet, cooked to perfection, with potato gratin.',
    price: 35.00,
    imageUrl: 'https://h2qshop.com/cdn/shop/articles/garlic-butter-filet-mignon-973408.jpg?v=1718419589',
    category: 'Main Courses',
    dataAiHint: 'filet mignon'
  },
  // Desserts
  {
    id: 'des1',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
    price: 8.50,
    imageUrl: 'https://www.bakinglikeachef.com/wp-content/uploads/italian-tiramisu.jpg',
    category: 'Desserts',
    dataAiHint: 'tiramisu slice'
  },
  {
    id: 'des2',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 9.00,
    imageUrl: 'https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes8.webp',
    category: 'Desserts',
    dataAiHint: 'lava cake'
  },
  // Drinks
  {
    id: 'dri1',
    name: 'Artisan Coffee',
    description: 'Freshly brewed, locally sourced coffee beans.',
    price: 4.00,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfXU6fXOilmmPd6WZTLf9gh77yYY6ce_9e2A&s',
    category: 'Drinks',
    dataAiHint: 'coffee cup'
  },
  {
    id: 'dri2',
    name: 'Sparkling Elderflower Presse',
    description: 'Refreshing and lightly sparkling, non-alcoholic.',
    price: 5.50,
    imageUrl: 'https://masonfoods.co.uk/wp-content/uploads/2024/03/Untitled-design-8-600x600.png',
    category: 'Drinks',
    dataAiHint: 'sparkling drink'
  },
];

export const eventTypes: { name: EventType; icon: React.ElementType, dataAiHint: string }[] = [
  { name: 'Wedding', icon: GlassWater, dataAiHint: 'wedding reception' },
  { name: 'Corporate', icon: Briefcase, dataAiHint: 'corporate event' },
  { name: 'Private Party', icon: PartyPopper, dataAiHint: 'party celebration' },
  { name: 'Other', icon: CalendarDays, dataAiHint: 'special event video' }
];

const vimeoBaseUrl = "https://player.vimeo.com/video/";
const defaultEventDate = "2024-07-26";

const videoUrls = [
  { id: "1094890630", hash: "cd92ac523c" },
  { id: "1094891669", hash: "eda7185e10" },
  { id: "1094892584", hash: "cd7d331901" },
  { id: "1094892995", hash: "8587582f2a" },
  { id: "1094894244", hash: "aa69b4401a" },
  { id: "1094894956", hash: "aa8c71fdd7" },
  { id: "1094894970", hash: "0ea2bc5a39" },
  { id: "1094894987", hash: "a07e54caf1" },
  { id: "1094895412", hash: "022bfaaa15" },
  { id: "1094895425", hash: "7e2107b336" },
  { id: "1094895437", hash: "8a7756beac" },
  { id: "1094895463", hash: "f2699d72ef" },
  { id: "1094895475", hash: "2051c50719" },
  { id: "1094895501", hash: "c7273f5d86" },
  { id: "1094898496", hash: "24520d2dd1" },
  { id: "1094898512", hash: "b3ab6149ff" },
  { id: "1094899490", hash: "cb23994546" },
];

export const eventItems: EventItem[] = videoUrls.map((video, index) => ({
  id: `vid${index + 1}`,
  type: 'Other',
  date: defaultEventDate,
  images: [],
  videoUrl: `${vimeoBaseUrl}${video.id}?h=${video.hash}&autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`,
  dataAiHint: 'event video promotion'
}));

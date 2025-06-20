// This is an AI-powered function to dynamically select the most appropriate media background to maximize customer conversions.
// It analyzes various signals such as time of day, day of week, upcoming events, and website traffic.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BackgroundSignalSchema = z.object({
  timeOfDay: z.enum(['morning', 'afternoon', 'evening', 'night']).describe('The time of day.'),
  dayOfWeek: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).describe('The day of the week.'),
  upcomingEvents: z.string().describe('Information about upcoming events.'),
  websiteTraffic: z.number().describe('The current website traffic volume.'),
});
export type BackgroundSignal = z.infer<typeof BackgroundSignalSchema>;

const SelectedBackgroundSchema = z.object({
  mediaType: z.enum(['image', 'video']).describe('The type of media to display.'),
  mediaUrl: z.string().describe('The URL of the media to display.'),
  reason: z.string().describe('The reasoning behind selecting this media.'),
});
export type SelectedBackground = z.infer<typeof SelectedBackgroundSchema>;

export async function selectDynamicBackground(input: BackgroundSignal): Promise<SelectedBackground> {
  return dynamicBackgroundSelectorFlow(input);
}

const dynamicBackgroundPrompt = ai.definePrompt({
  name: 'dynamicBackgroundPrompt',
  input: {schema: BackgroundSignalSchema},
  output: {schema: SelectedBackgroundSchema},
  prompt: `Given the following signals, select the most appropriate media background to maximize customer conversions.\n\nTime of Day: {{{timeOfDay}}}\nDay of Week: {{{dayOfWeek}}}\nUpcoming Events: {{{upcomingEvents}}}\nWebsite Traffic: {{{websiteTraffic}}}\n\nConsider the following guidelines:\n- Use high-quality images or videos.\n- Choose media relevant to the time of day, day of week, and upcoming events.\n- Select media that is likely to appeal to website visitors and encourage conversions.\n\nReturn the media type (image or video), the URL of the media, and the reason for selecting this media.\n`,
});

const dynamicBackgroundSelectorFlow = ai.defineFlow(
  {
    name: 'dynamicBackgroundSelectorFlow',
    inputSchema: BackgroundSignalSchema,
    outputSchema: SelectedBackgroundSchema,
  },
  async input => {
    const {output} = await dynamicBackgroundPrompt(input);
    return output!;
  }
);

import { OnsenType } from '@/types/onsen';
import chlorideImg from '@/assets/onsen-chloride.jpg';
import bicarbonateImg from '@/assets/onsen-bicarbonate.jpg';
import sulfurImg from '@/assets/onsen-sulfur.jpg';
import carbonatedImg from '@/assets/onsen-carbonated.jpg';
import sulfateImg from '@/assets/onsen-sulfate.jpg';
import simpleImg from '@/assets/onsen-simple.jpg';
import ferruginousImg from '@/assets/onsen-ferruginous.jpg';
import acidicImg from '@/assets/onsen-acidic.jpg';
import radonImg from '@/assets/onsen-radon.jpg';
import yodoImg from '@/assets/onsen-yodo.jpg';

export const onsenImages: Record<OnsenType, string> = {
  chloride: chlorideImg,
  bicarbonate: bicarbonateImg,
  sulfur: sulfurImg,
  carbonated: carbonatedImg,
  sulfate: sulfateImg,
  simple: simpleImg,
  ferruginous: ferruginousImg,
  acidic: acidicImg,
  radon: radonImg,
  yodo: yodoImg,
  alkaline: yodoImg, // deprecated, use 'yodo' instead
};

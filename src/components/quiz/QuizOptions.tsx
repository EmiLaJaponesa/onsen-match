import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuestionOption } from '@/types/onsen';

interface QuizOptionsProps {
  options: QuestionOption[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

export const QuizOptions = ({ options, selectedOption, onOptionChange }: QuizOptionsProps) => {
  return (
    <RadioGroup 
      value={selectedOption} 
      onValueChange={onOptionChange}
      className="space-y-3"
    >
      {options.map((option) => (
        <div 
          key={option.id} 
          className={`group relative flex items-center space-x-4 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer
            ${selectedOption === option.id
              ? 'border-primary backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]' 
              : 'border-transparent backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 hover:border-primary/50 hover:scale-[1.02] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.2)]'
            }`}
        >
          <RadioGroupItem 
            value={option.id}
            id={option.id}
            className="transition-smooth"
          />
          <Label 
            htmlFor={option.id}
            className="flex-1 cursor-pointer text-base md:text-lg leading-relaxed"
          >
            {option.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

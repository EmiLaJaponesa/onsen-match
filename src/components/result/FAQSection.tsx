import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { onsenFAQs } from '@/data/faqData';

export const FAQSection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <HelpCircle className="w-7 h-7 text-primary" />
        <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
          Preguntas frecuentes
        </h3>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {onsenFAQs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border border-border rounded-lg px-4 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30"
          >
            <AccordionTrigger className="text-left text-base md:text-lg font-medium text-foreground hover:text-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed pt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

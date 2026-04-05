import { motion } from "motion/react";
import VibeSection from "#/components/layout/vibe-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question:
      "Why are some tracks not found on the destination streaming platform?",
    answer:
      "There are a few reasons why some of the tracks in your source playlist may not be found on the destination platform. The simplest of them is that the track is not listed in the destination platform. If this is not the case, then it just happens that the track did not meet the matching criteria of our algorithm. We are constantly working on this.",
  },
  {
    question:
      "Why does the new playlist have more tracks missing than the specified number that were not found?",
    answer:
      "Some playlists contain duplicate tracks. SwitchVibes picks the first of such tracks and does not include the same track again. Be rest assured, the only tracks that won’t be in your newly converted playlist are the ones that are stated to be not found.",
  },
  {
    question: "Why are some of the tracks in my new playlist flagged?",
    answer:
      "SwitchVibes searches for a match of each track on your source playlist using data like its title, duration etc. Sometimes weak matches are found and these are included in the flagged tracks.",
  },
];

export default function FaqsSection() {
  return (
    <VibeSection id="faqs" className="flex flex-col md:gap-2">
      {/* Heading */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter uppercase lg:text-5xl text-foreground"
      >
        Faqs
      </motion.h2>

      {/* Accordion List */}
      <div className="w-full max-w-5xl">
        <Accordion className="w-full">
          {FAQ_ITEMS.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <AccordionItem
                value={faq.question}
                className="border-b border-border py-4 lg:py-6 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-base md:text-lg lg:text-xl font-semibold hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground md:text-base lg:text-lg leading-relaxed pt-2 pb-6 pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </VibeSection>
  );
}

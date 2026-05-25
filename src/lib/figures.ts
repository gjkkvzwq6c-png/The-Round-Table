import { Figure } from "@/types";

export const FIGURES: Figure[] = [
  { id: "socrates", name: "Socrates", descriptor: "Greek Philosopher, 470–399 BC", era: "Ancient" },
  { id: "plato", name: "Plato", descriptor: "Greek Philosopher, 428–348 BC", era: "Ancient" },
  { id: "aristotle", name: "Aristotle", descriptor: "Greek Philosopher, 384–322 BC", era: "Ancient" },
  { id: "cleopatra", name: "Cleopatra VII", descriptor: "Pharaoh of Egypt, 69–30 BC", era: "Ancient" },
  { id: "julius-caesar", name: "Julius Caesar", descriptor: "Roman General & Statesman, 100–44 BC", era: "Ancient" },
  { id: "sun-tzu", name: "Sun Tzu", descriptor: "Military Strategist & Author, 544–496 BC", era: "Ancient" },
  { id: "confucius", name: "Confucius", descriptor: "Chinese Philosopher, 551–479 BC", era: "Ancient" },
  { id: "leonardo-da-vinci", name: "Leonardo da Vinci", descriptor: "Renaissance Polymath, 1452–1519", era: "Renaissance" },
  { id: "galileo", name: "Galileo Galilei", descriptor: "Astronomer & Physicist, 1564–1642", era: "Early Modern" },
  { id: "william-shakespeare", name: "William Shakespeare", descriptor: "Playwright & Poet, 1564–1616", era: "Early Modern" },
  { id: "isaac-newton", name: "Isaac Newton", descriptor: "Mathematician & Physicist, 1643–1727", era: "Early Modern" },
  { id: "benjamin-franklin", name: "Benjamin Franklin", descriptor: "Statesman & Inventor, 1706–1790", era: "18th Century" },
  { id: "napoleon", name: "Napoleon Bonaparte", descriptor: "French Emperor, 1769–1821", era: "18th Century" },
  { id: "mary-wollstonecraft", name: "Mary Wollstonecraft", descriptor: "Philosopher & Author, 1759–1797", era: "18th Century" },
  { id: "charles-darwin", name: "Charles Darwin", descriptor: "Naturalist & Biologist, 1809–1882", era: "19th Century" },
  { id: "abraham-lincoln", name: "Abraham Lincoln", descriptor: "16th US President, 1809–1865", era: "19th Century" },
  { id: "harriet-tubman", name: "Harriet Tubman", descriptor: "Abolitionist & Activist, 1822–1913", era: "19th Century" },
  { id: "friedrich-nietzsche", name: "Friedrich Nietzsche", descriptor: "Philosopher, 1844–1900", era: "19th Century" },
  { id: "nikola-tesla", name: "Nikola Tesla", descriptor: "Inventor & Engineer, 1856–1943", era: "19th Century" },
  { id: "sigmund-freud", name: "Sigmund Freud", descriptor: "Founder of Psychoanalysis, 1856–1939", era: "19th Century" },
  { id: "marie-curie", name: "Marie Curie", descriptor: "Physicist & Chemist, 1867–1934", era: "Early 20th" },
  { id: "albert-einstein", name: "Albert Einstein", descriptor: "Theoretical Physicist, 1879–1955", era: "20th Century" },
  { id: "virginia-woolf", name: "Virginia Woolf", descriptor: "Author & Modernist, 1882–1941", era: "20th Century" },
  { id: "mahatma-gandhi", name: "Mahatma Gandhi", descriptor: "Political Leader & Activist, 1869–1948", era: "20th Century" },
  { id: "winston-churchill", name: "Winston Churchill", descriptor: "British Prime Minister, 1874–1965", era: "20th Century" },
  { id: "alan-turing", name: "Alan Turing", descriptor: "Mathematician & Computer Scientist, 1912–1954", era: "20th Century" },
  { id: "rosa-parks", name: "Rosa Parks", descriptor: "Civil Rights Activist, 1913–2005", era: "20th Century" },
  { id: "martin-luther-king", name: "Martin Luther King Jr.", descriptor: "Minister & Civil Rights Leader, 1929–1968", era: "20th Century" },
  { id: "john-f-kennedy", name: "John F. Kennedy", descriptor: "35th US President, 1917–1963", era: "20th Century" },
  { id: "nelson-mandela", name: "Nelson Mandela", descriptor: "South African President & Activist, 1918–2013", era: "20th Century" },
  { id: "stephen-hawking", name: "Stephen Hawking", descriptor: "Theoretical Physicist & Cosmologist, 1942–2018", era: "20th Century" },
  { id: "maya-angelou", name: "Maya Angelou", descriptor: "Poet & Civil Rights Activist, 1928–2014", era: "20th Century" },
  { id: "carl-sagan", name: "Carl Sagan", descriptor: "Astronomer & Author, 1934–1996", era: "20th Century" },
  { id: "frida-kahlo", name: "Frida Kahlo", descriptor: "Painter & Icon, 1907–1954", era: "20th Century" },
  { id: "elon-musk", name: "Elon Musk", descriptor: "Entrepreneur & CEO, 1971–", era: "Contemporary" },
  { id: "oprah-winfrey", name: "Oprah Winfrey", descriptor: "Media Executive & Philanthropist, 1954–", era: "Contemporary" },
  { id: "malala-yousafzai", name: "Malala Yousafzai", descriptor: "Education Activist & Nobel Laureate, 1997–", era: "Contemporary" },
  { id: "michelle-obama", name: "Michelle Obama", descriptor: "Attorney & Former First Lady, 1964–", era: "Contemporary" },
  { id: "barack-obama", name: "Barack Obama", descriptor: "44th US President, 1961–", era: "Contemporary" },
  { id: "ruth-bader-ginsburg", name: "Ruth Bader Ginsburg", descriptor: "Supreme Court Justice, 1933–2020", era: "20th Century" },
];

export const FEATURED_FIGURES: Figure[] = [
  FIGURES.find(f => f.id === "socrates")!,
  FIGURES.find(f => f.id === "albert-einstein")!,
  FIGURES.find(f => f.id === "cleopatra")!,
  FIGURES.find(f => f.id === "martin-luther-king")!,
  FIGURES.find(f => f.id === "marie-curie")!,
  FIGURES.find(f => f.id === "nikola-tesla")!,
  FIGURES.find(f => f.id === "maya-angelou")!,
  FIGURES.find(f => f.id === "carl-sagan")!,
  FIGURES.find(f => f.id === "friedrich-nietzsche")!,
  FIGURES.find(f => f.id === "harriet-tubman")!,
  FIGURES.find(f => f.id === "alan-turing")!,
  FIGURES.find(f => f.id === "frida-kahlo")!,
];

export function searchFigures(query: string): Figure[] {
  const q = query.toLowerCase().trim();
  if (!q) return FEATURED_FIGURES;
  return FIGURES.filter(
    f =>
      f.name.toLowerCase().includes(q) ||
      f.descriptor.toLowerCase().includes(q) ||
      (f.era?.toLowerCase().includes(q) ?? false)
  ).slice(0, 10);
}

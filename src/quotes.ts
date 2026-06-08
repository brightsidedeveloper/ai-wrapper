export type Quote = {
  text: string
  author: string
}

export const quotes: Quote[] = [
  { text: 'A computer would deserve to be called intelligent if it could deceive a human into believing that it was human.', author: 'Alan Turing' },
  { text: 'Machine intelligence is the last invention that humanity will ever need to make.', author: 'Nick Bostrom' },
  { text: 'Artificial intelligence is the new electricity.', author: 'Andrew Ng' },
  { text: 'The science of today is the technology of tomorrow.', author: 'Edward Teller' },
  { text: 'The question of whether a computer can think is no more interesting than the question of whether a submarine can swim.', author: 'Edsger W. Dijkstra' },
  { text: 'It seems probable that once the machine thinking method had started, it would not take long to outstrip our feeble powers.', author: 'Alan Turing' },
  { text: 'By far the greatest danger of artificial intelligence is that people conclude too early that they understand it.', author: 'Eliezer Yudkowsky' },
  { text: 'Some people call this artificial intelligence, but the reality is this technology will enhance us. So instead of artificial intelligence, I think we’ll augment our intelligence.', author: 'Ginni Rometty' },
  { text: 'The real question is not whether machines think but whether men do.', author: 'B. F. Skinner' },
  { text: 'Our intelligence is what makes us human, and AI is an extension of that quality.', author: 'Yann LeCun' },
  { text: 'I visualize a time when we will be to robots what dogs are to humans, and I’m rooting for the machines.', author: 'Claude Shannon' },
  { text: 'Predicting the future isn’t magic, it’s artificial intelligence.', author: 'Dave Waters' },
  { text: 'AI is likely to be either the best or worst thing to happen to humanity.', author: 'Stephen Hawking' },
  { text: 'Anything that could give rise to smarter-than-human intelligence — in the form of artificial intelligence, brain-computer interfaces, or neuroscience-based human intelligence enhancement — wins hands down beyond contest as doing the most to change the world.', author: 'Eliezer Yudkowsky' },
  { text: 'The development of full artificial intelligence could spell the end of the human race… but it could also be the most significant event in our history.', author: 'Stephen Hawking' },
  { text: 'Everything we love about civilization is a product of intelligence, so amplifying our human intelligence with artificial intelligence has the potential of helping civilization flourish.', author: 'Max Tegmark' },
  { text: 'A year spent in artificial intelligence is enough to make one believe in God.', author: 'Alan Perlis' },
  { text: 'If a machine can think, it might think more intelligently than we do, and then where should we be?', author: 'Alan Turing' },
  { text: 'The key to artificial intelligence has always been the representation.', author: 'Jeff Hawkins' },
  { text: 'Intelligence is the ability to adapt to change.', author: 'Stephen Hawking' },
]

/**
 * Pick a quote deterministically from the given date. The same calendar day
 * always yields the same quote, and it cycles through the list day by day.
 */
export function quoteForDate(date: Date = new Date()): Quote {
  const dayNumber = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  )
  return quotes[((dayNumber % quotes.length) + quotes.length) % quotes.length]
}

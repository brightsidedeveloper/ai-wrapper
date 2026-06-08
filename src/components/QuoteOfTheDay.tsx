import { quoteForDate } from '../quotes'

export default function QuoteOfTheDay() {
  const quote = quoteForDate()
  return (
    <figure className="quote-card">
      <span className="quote-label">💡 Quote of the Day</span>
      <blockquote className="quote-text">{quote.text}</blockquote>
      <figcaption className="quote-author">— {quote.author}</figcaption>
    </figure>
  )
}

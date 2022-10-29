import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAllQuotes } from '~/models/quote.server';

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    quotes: await getAllQuotes(),
  });
};

export default function Quotes() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Quotes</h1>
      <ul>
        {data.quotes.map(quote => (
          <li key={quote.id}>
            <blockquote>{quote.text}</blockquote>
            <footer>
              <cite>{quote.authorName}</cite>
            </footer>
          </li>
        ))}
      </ul>
    </main>
  );
}

import {Tool} from "langchain/tools";
import {Serper} from "serper";
import {NextResponse} from "next/server";
import {convert as htmlToText} from "html-to-text";

export class SerperSearch extends Tool {
  name = "google_search";

  maxResults=6
  /** @ignore */
  async _call(input: string) {
    const serper = new Serper({
      apiKey: process.env.SERPER_API_KEY // Get your API key at https://serper.dev/api-key
      // apiKey: '2d8b098449068e4ecca0287ceda29c3e5f68e598'
    });
    const searchResults = await serper.search(input);

    const results = searchResults.organic
        .slice(0, this.maxResults)
        .map(({ title, snippet, link }) => htmlToText(snippet))
        .join("\n\n");

    return results;
  }

  description =
      "a search engine. useful for when you need to answer questions about current events. input should be a search query.";
}

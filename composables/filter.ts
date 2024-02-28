import type { Post } from "~/types/post";
export function extractPost(posts: Post[]) {
  let arr: string[] = [];
  posts.map((post) => {
    const extracted = exportKeywords(post);
    arr.push(...extracted);
  });
  return arr;
}

function exportKeywords(post: Post) {
  const content = post.content.toLowerCase().match(/\b\w+\b/g) || [];

  const stopWords = [
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "about",
    "above",
    "after",
    "along",
    "amid",
    "among",
    "as",
    "at",
    "by",
    "for",
    "from",
    "in",
    "into",
    "like",
    "minus",
    "near",
    "of",
    "off",
    "on",
    "onto",
    "out",
    "over",
    "past",
    "per",
    "plus",
    "since",
    "till",
    "to",
    "under",
    "until",
    "up",
    "via",
    "vs",
    "with",
    "that",
    "can",
    "cannot",
    "could",
    "may",
    "might",
    "must",
    "need",
    "ought",
    "shall",
    "should",
    "will",
    "would",
    "have",
    "had",
    "has",
    "having",
    "be",
    "is",
    "am",
    "are",
    "was",
    "were",
    "being",
    "been",
    "get",
    "gets",
    "got",
    "gotten",
    "getting",
    "seem",
    "seems",
    "seemed",
    "seeming",
    "do",
    "does",
    "did",
    "doing",
    "a",
    "an",
    "the",
    "and",
    "but",
    "if",
    "or",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "s",
    "t",
    "can",
    "will",
    "just",
    "don",
    "should",
    "now",
  ];

  const keywords = content.filter((word) => !stopWords.includes(word));

  return keywords;
}

/**
 * Extracts keywords from the content of each post, counts the occurrences of each keyword, and returns the top three keywords with their respective counts.
 * @param posts An array of Post objects representing the posts to count the keywords from.
 * @returns An array of objects, where each object represents a keyword and its count. The array is sorted in descending order based on the count. Only the top three keywords are included in the output.
 */
export function countKeywords(posts: Post[]) {
  const keywords = extractPost(posts);

  const keywordsCount: { [key: string]: number } = {};
  for (const word of keywords) {
    keywordsCount[word] = (keywordsCount[word] || 0) + 1;
  }

  const sortedKeywords = Object.entries(keywordsCount).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedKeywords.slice(0, 3).map(([key, value]) => ({ [key]: value }));
}

export const sortPostByLikes = (posts: Post[]) => {
  return posts
    .sort((a, b) => (b.likes?.length ?? 0) - (a.likes?.length ?? 0))
    .slice(0, 5);
};

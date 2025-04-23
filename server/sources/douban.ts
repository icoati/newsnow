// newsnow/server/sources/douban.ts
import * as cheerio from "cheerio";
import type { NewsItem } from "@shared/types";

export default defineSource(async () => {
  const baseURL = "https://www.douban.com/gallery/";
  const html: any = await myFetch(baseURL);
  const $ = cheerio.load(html);
  const $main = $("your - selector - here"); // 需要根据实际页面结构修改选择器
  const news: NewsItem[] = [];

  $main.each((_, el) => {
    const a = $(el).find("a");
    const title = a.text().trim();
    const url = a.attr("href");

    if (url && title) {
      news.push({
        url,
        title,
        id: url,
      });
    }
  });

  return news;
});

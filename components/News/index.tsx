import { NewsData } from "@/typescript/types"
import NewsItem from "./Item"
import styles from "./News.module.scss"

interface NewsProps {
  data: NewsData[]
}

export default function News({ data }: NewsProps) {
  return (
    <div className={styles.news}>
      <ul className={styles.newsList}>
        {data.length > 0 &&
          data.map((dataNew) => (
            <li key={dataNew.id} className={styles.newsItem}>
              <NewsItem {...dataNew} />
            </li>
          ))}
      </ul>
    </div>
  )
}

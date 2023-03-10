import PrimaryLink from "@/components/Link"
import { useDateDiff } from "@/hooks/dateDiff"
import { RouterPaths } from "@/typescript/enums"
import { NotifyData } from "@/typescript/types"
import { formatDate } from "@/utils/formatData"
import { setDynamicCls } from "@/utils/setCls"
import Image from "next/image"

import styles from "./HeaderActionsNotifyItem.module.scss"

interface HeaderActionsNotifyItemProps extends NotifyData {
}

export default function HeaderActionsNotifyItem({
                                                  title,
                                                  img,
                                                  text,
                                                  date,
                                                  id,
                                                  isNew
                                                }: HeaderActionsNotifyItemProps) {
  const dateDiffState = useDateDiff(date)

  const dateDiff = dateDiffState && dateDiffState / 1000 / 60 / 60 / 24

  return (
    <PrimaryLink
      href={RouterPaths.NotifyPage}
      className={setDynamicCls({
        stClasses: [styles.headerActionsNotifyItem],
        dnClasses: [[styles._newNotify]],
        conditions: [isNew]
      })}
      title={title}
    >
      <div className={styles.headerActionsNotifyItemImg}>
        <Image src={img} width={50} height={50} alt={title}/>
      </div>
      <div className={styles.headerActionsNotifyItemInfo}>
        <header className={styles.headerActionsNotifyItemInfoHeader}>
          <h3 className={styles.headerActionsNotifyItemInfoHeaderTitle}>{title}</h3>
          <div className={styles.headerActionsNotifyItemInfoHeaderWrapper}>
            <span
              className={styles.headerActionsNotifyItemInfoHeaderIndicator}
            ></span>
            {dateDiff && (
              <time
                className={styles.headerActionsNotifyItemInfoHeaderTime}
                title={formatDate(date, dateDiff).fullDate}
                dateTime={date.toISOString()}
              >
                {Math.floor(dateDiff)} ??. ??????????
              </time>
            )}
          </div>
        </header>
        <p className={styles.headerActionsNotifyItemText} title={text}>
          {text}
        </p>
      </div>
    </PrimaryLink>
  )
}

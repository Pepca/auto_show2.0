import PrimaryButton from '@/components/Button'
import PrimaryLink from '@/components/Link'
import { useHeaderActionsProfileContext } from '@/context/HeaderActionsProfileContext'
import { RouterPaths } from '@/typescript/enums'
import { setStaticCls } from '@/utils/setCls'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MouseEvent, MouseEventHandler, useState } from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FaRegAddressBook } from 'react-icons/fa'
import { GrLanguage, GrSolaris } from 'react-icons/gr'
import { SlSettings } from 'react-icons/sl'
import { HeaderActionsMenuProps } from '../HeaderActions'
import headerActionsStyles from '../HeaderActions.module.scss'
import HeaderActionsItem from '../HeaderActionsItem'
import styles from './HeaderActionsProfile.module.scss'
import HeaderActionsProfileCity from './City'
import HeaderActionsProfileLang, {
  DocumentLangState
} from './Lang'
import HeaderActionsProfileTheme, {
  SiteThemeState
} from './Theme'

type HeaderActionsProfileSelectedMenuState =
  | 'changeTheme'
  | 'changeLang'
  | 'changeCity'
  | null

interface HeaderActionsProfileProps extends HeaderActionsMenuProps {}

export interface HeaderActionsProfileMenuProps {
  backButtonClickHandler: MouseEventHandler
}

export default function HeaderActionsProfile({
  state,
  toggleMenuStateHandler,
}: HeaderActionsProfileProps) {
  const [{ documentLang, siteTheme, userCity }] =
    useHeaderActionsProfileContext()

  const [selectedMenu, setSelectedMenu] =
    useState<HeaderActionsProfileSelectedMenuState>(null)

  function resetSelectedMenu() {
    setSelectedMenu(null)
  }

  function handleItemClick() {
    if (!state) resetSelectedMenu()

    toggleMenuStateHandler('profile')
  }

  function handleSetSelectedMenu(
    selectMenu: HeaderActionsProfileSelectedMenuState,
    event: MouseEvent
  ) {
    event.stopPropagation()
    setSelectedMenu(selectMenu)
  }

  function convertSiteThemeValue(siteThemeValue: SiteThemeState) {
    switch (siteThemeValue) {
      case 'dark-theme':
        return '????????????'
      case 'light-theme':
        return '??????????????'
      default:
        return '??????????????????'
    }
  }

  function convertDocumentLangValue(documentLangValue: DocumentLangState) {
    switch (documentLangValue) {
      case 'ru':
        return '??????????????'
      case 'de':
        return '????????????????'
      case 'en':
        return '????????????????????'
      case 'en-us':
        return '???????????????????? (??????)'
    }
  }

  return (
    <HeaderActionsItem
      onClickHandler={handleItemClick}
      icon={<CgProfile />}
      title='??????????????'
    >
      <div
        className={headerActionsStyles.headerActionsMenu}
        aria-hidden={state}
      >
        {selectedMenu === null ? (
          <div className={headerActionsStyles.headerActionsMenuWrapper}>
            <header
              className={setStaticCls(
                headerActionsStyles.headerActionsMenuHeader,
                styles.headerActionsProfileHeader
              )}
            >
              <PrimaryLink
                href={RouterPaths.ProfilePage}
                className={styles.headerActionsProfileHeaderAvatar}
              >
                <Image
                  src='https://via.placeholder.com/100'
                  alt='placeholder'
                  width={100}
                  height={100}
                />
                {/* <div></div> */}
              </PrimaryLink>
              <div className={styles.headerActionsProfileHeaderInfo}>
                <p className={styles.headerActionsProfileHeaderInfoName}>
                  ?????????????? ?????????? ????????????????????
                </p>
                <p>danil-danil-korolev@bk.ru</p>
                <p>+7 (913) 225 31-47</p>
              </div>
            </header>
            <div className={headerActionsStyles.headerActionsMenuBody}>
              <ul className={styles.headerActionsProfileList}>
                <li>
                  <PrimaryButton
                    className={styles.headerActionsProfileItemLink}
                    title='?????????????? ????????'
                    onClick={handleSetSelectedMenu.bind(null, 'changeTheme')}
                  >
                    <span className={styles.headerActionsProfileItemLinkIcon}>
                      <GrSolaris />
                    </span>
                    <p>
                      ?????????????? ????????:{' '}
                      <span>{convertSiteThemeValue(siteTheme)}</span>
                    </p>
                  </PrimaryButton>
                </li>
                <li>
                  <PrimaryButton
                    className={styles.headerActionsProfileItemLink}
                    title='?????????????? ????????'
                    onClick={handleSetSelectedMenu.bind(null, 'changeLang')}
                  >
                    <span className={styles.headerActionsProfileItemLinkIcon}>
                      <GrLanguage />
                    </span>
                    <p>
                      ?????????????? ????????:{' '}
                      <span>{convertDocumentLangValue(documentLang)}</span>
                    </p>
                  </PrimaryButton>
                </li>
                <li>
                  <PrimaryButton
                    className={styles.headerActionsProfileItemLink}
                    title='?????????????? ??????????'
                    onClick={handleSetSelectedMenu.bind(null, 'changeCity')}
                  >
                    <span className={styles.headerActionsProfileItemLinkIcon}>
                      <FaRegAddressBook />
                    </span>
                    <p>
                      ?????????????? ??????????: <span>{userCity}</span>
                    </p>
                  </PrimaryButton>
                </li>
                <span className={styles.headerActionsProfile__separator}></span>
                <li>
                  <PrimaryLink
                    href={RouterPaths.SettingsPage}
                    className={styles.headerActionsProfileItemLink}
                    title='??????????????????'
                  >
                    <span className={styles.headerActionsProfileItemLinkIcon}>
                      <SlSettings />
                    </span>
                    <p>??????????????????</p>
                  </PrimaryLink>
                </li>
                <span className={styles.headerActionsProfile__separator}></span>
                <li>
                  <PrimaryLink
                    href={RouterPaths.HomePage}
                    className={styles.headerActionsProfileItemLink}
                    styleType='danger'
                    title='??????????'
                  >
                    <span className={styles.headerActionsProfileItemLinkIcon}>
                      <AiOutlinePoweroff />
                    </span>
                    <p>??????????</p>
                  </PrimaryLink>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
        {selectedMenu === 'changeTheme' ? (
          <HeaderActionsProfileTheme
            backButtonClickHandler={handleSetSelectedMenu.bind(null, null)}
          />
        ) : null}
        {selectedMenu === 'changeLang' ? (
          <HeaderActionsProfileLang
            backButtonClickHandler={handleSetSelectedMenu.bind(null, null)}
          />
        ) : null}
        {selectedMenu === 'changeCity' ? (
          <HeaderActionsProfileCity
            backButtonClickHandler={handleSetSelectedMenu.bind(null, null)}
          />
        ) : null}
      </div>
    </HeaderActionsItem>
  )
}

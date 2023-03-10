import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { setStaticCls } from '@/utils/setCls'
import Head from 'next/head'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
  title?: string
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='page-content__wrapper _container'>{children}</div>
    </>
  )
}

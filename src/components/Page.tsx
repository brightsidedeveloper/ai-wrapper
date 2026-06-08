import type { ReactNode } from 'react'

export default function Page({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <section className="page">
      <header className="page-header">
        <h1>{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </header>
      <div className="page-body">{children}</div>
    </section>
  )
}

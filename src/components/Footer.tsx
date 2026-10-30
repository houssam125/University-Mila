import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUp, ChevronRight, ExternalLink, Mail, MapPin, Network, Phone } from 'lucide-react'
import { LOGO_URL } from '@/data/navigation'
import {
  contact,
  map,
  quickLinks,
  relatedLinks,
  sitePages,
  socialLinks,
  type FooterLink,
} from '@/data/footer'

const currentYear = new Date().getFullYear()
const FOOTER_BACKGROUND =
  'https://ik.imagekit.io/qg0um49ak/Universty%20Mila/2020-05-13.jpg?tr=w-1920'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative z-10 overflow-hidden bg-neutral-950 text-white">
      {/* Campus photo behind a dark filter, so every column stays readable */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${FOOTER_BACKGROUND})` }}
      />
      <div className="absolute inset-0 bg-neutral-950/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/70" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute -start-32 top-0 h-96 w-96 rounded-full bg-[#e8c27a]/10 blur-3xl" />
      <div className="relative h-1 bg-gradient-to-r from-crimson via-[#e8c27a] to-crimson" />

      <div className="relative mx-auto grid max-w-[1500px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
        {/* About, social and contact */}
        <div>
          <Link to="/" className="flex items-center gap-3" aria-label={t('brand.home')}>
            <img src={LOGO_URL} alt={t('brand.logoAlt')} className="h-14 w-auto" />
            <span className="leading-tight">
              <span className="block font-serif text-2xl font-bold tracking-[0.14em]">
                {t('brand.name')}
              </span>
              <span className="block text-xs tracking-[0.2em] text-white/60">
                {t('brand.subtitle')}
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{t('footer.about')}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/75 transition hover:border-crimson hover:bg-crimson hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-3 text-sm text-white/75">
            <li>
              <a
                href={contact.phoneHref}
                className="flex items-center gap-3 transition hover:text-white"
                dir="ltr"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#e8c27a]" />
                {contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e8c27a]" />
              <span>{t('footer.address')}</span>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#e8c27a]" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Platforms and site pages */}
        <div className="space-y-10">
          <FooterColumn title={t('footer.quickLinks')} links={quickLinks} />
          <FooterColumn title={t('footer.sitePages')} links={sitePages} compact />
        </div>

        {/* Related institutions and the university structure */}
        <div className="space-y-10">
          <FooterColumn title={t('footer.relatedLinks')} links={relatedLinks} />
          <Link
            to="/university/structure"
            className="group relative block overflow-hidden border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#e8c27a]/50"
          >
            <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[#e8c27a] transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
            <Network className="h-6 w-6 text-[#e8c27a]" />
            <p className="mt-3 font-serif text-xl font-semibold">{t('footer.structureTitle')}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/60">
              {t('footer.structureText')}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#e8c27a]">
              {t('footer.structureCta')}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </span>
          </Link>
        </div>

        {/* Map */}
        <div>
          <ColumnTitle>{t('footer.map')}</ColumnTitle>
          <div className="group relative mt-6 overflow-hidden border border-white/10">
            <iframe
              src={map.embedUrl}
              title={t('footer.mapTitle')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-60 w-full grayscale-[60%] transition duration-500 group-hover:grayscale-0"
            />
          </div>
          <a
            href={map.openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            {t('footer.openMap')}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-white/50 sm:flex-row sm:px-6">
          <p>
            © {currentYear} {t('footer.rights')}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            {t('footer.backToTop')}
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

function ColumnTitle({ children }: { children: string }) {
  return (
    <p className="border-b border-white/10 pb-4 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
      {children}
    </p>
  )
}

function FooterColumn({
  title,
  links,
  compact = false,
}: {
  title: string
  links: FooterLink[]
  compact?: boolean
}) {
  const { t } = useTranslation()
  const itemClass = 'group flex items-center gap-3 text-white/75 transition hover:text-white'

  return (
    <div>
      <ColumnTitle>{title}</ColumnTitle>
      <ul className={compact ? 'mt-5 space-y-2.5' : 'mt-6 space-y-3.5'}>
        {links.map(({ key, href, icon: Icon, external }) => {
          const label = t(`footer.links.${key}`)
          const leading = Icon ? (
            <Icon className="h-4 w-4 shrink-0 text-[#e8c27a]/80" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/40 transition group-hover:text-[#e8c27a] rtl:rotate-180" />
          )
          return (
            <li key={key}>
              {external ? (
                <a
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={itemClass}
                >
                  {leading}
                  <span>{label}</span>
                  <ExternalLink className="h-3 w-3 shrink-0 opacity-0 transition group-hover:opacity-60" />
                </a>
              ) : (
                <Link to={href} className={itemClass}>
                  {leading}
                  <span className={compact ? 'text-[15px]' : undefined}>{label}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

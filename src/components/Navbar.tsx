import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, ChevronDown, ChevronRight, Globe, Menu, Search, X } from 'lucide-react'
import clsx from 'clsx'
import { languages, type LanguageCode } from '@/i18n'
import {
  BOUSSOUF_PATH,
  portrait as boussoufPortrait,
  profile as boussoufProfile,
} from '@/data/boussouf'
import {
  LOGO_URL,
  MENU_BACKGROUND_URL,
  navCategories,
  navLinks,
  type NavItem,
} from '@/data/navigation'

export default function Navbar() {
  const { t } = useTranslation()
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [isScrolled, setScrolled] = useState(false)
  const [isPreviewOpen, setPreviewOpen] = useState(false)
  const previewCloseTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // The Boussouf preview stays open while the pointer moves from the menu entry onto it
  const openPreview = () => {
    clearTimeout(previewCloseTimer.current)
    setPreviewOpen(true)
  }
  const schedulePreviewClose = () => {
    previewCloseTimer.current = setTimeout(() => setPreviewOpen(false), 200)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setActiveCategory(null)
    setActiveItem(null)
    setPreviewOpen(false)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  // The bar follows the page; once the visitor scrolls, it gets a solid background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes whichever panel is open; the page can't scroll behind the menu
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (isMenuOpen) closeMenu()
      else if (isSearchOpen) closeSearch()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, isSearchOpen])

  const onSearchSubmit = (event: FormEvent) => {
    event.preventDefault()
    // TODO: send the query to the search results page once it exists
  }

  const selectCategory = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index)
    setActiveItem(null)
  }

  const category = activeCategory === null ? null : navCategories[activeCategory]
  const item = category && activeItem !== null ? category.items[activeItem] : null

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-40 text-white transition-[background-color,box-shadow,backdrop-filter] duration-500',
          isScrolled
            ? 'bg-neutral-950/85 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md'
            : 'bg-gradient-to-b from-black/50 to-transparent',
        )}
      >
        <div
          className={clsx(
            'flex items-stretch justify-between ps-4 transition-[height] duration-500 sm:ps-6',
            isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-[72px]',
          )}
        >
          <Brand />

          <div className="flex items-stretch">
            <div className="flex items-center border-s border-white/15 px-4 sm:px-6">
              {isSearchOpen ? (
                <form onSubmit={onSearchSubmit} className="flex items-center gap-3" role="search">
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t('header.searchPlaceholder')}
                    aria-label={t('header.searchLabel')}
                    className="w-32 border-b border-white/40 bg-transparent py-1 text-base text-white placeholder:text-white/60 focus:border-white focus:outline-none sm:w-72"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    aria-label={t('header.closeSearch')}
                    className="text-white/80 transition hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label={t('header.search')}
                  className="flex items-center gap-2 text-base transition hover:text-accent"
                >
                  <Search className="h-[18px] w-[18px]" strokeWidth={2.25} />
                  <span className="hidden sm:inline">{t('header.search')}</span>
                </button>
              )}
            </div>

            <div className="flex items-center border-s border-white/15 px-3 sm:px-5">
              <LanguageMenu />
            </div>

            <div className="flex items-center border-s border-white/15 px-4 sm:px-7">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={isMenuOpen}
                aria-controls="main-menu"
                className="flex items-center gap-2 text-base transition hover:text-accent"
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={2.25} />
                <span>{t('header.menu')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          id="main-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('header.mainMenu')}
          className="fixed inset-0 z-50 animate-fade-in overflow-y-auto bg-neutral-950 bg-cover bg-center text-white"
          style={{ backgroundImage: `url(${MENU_BACKGROUND_URL})` }}
        >
          <div className="pointer-events-none fixed inset-0 bg-black/80" />

          <div className="relative flex min-h-full flex-col">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:h-[72px] sm:px-6">
              <Brand />
              <div className="flex items-center gap-5 sm:gap-8">
                <LanguageTabs />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-base text-white/90 transition hover:text-white"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={2.25} />
                  {t('header.close')}
                </button>
              </div>
            </div>

            <div className="relative grid flex-1 md:grid-cols-3">
              {/* Column 1: main categories and direct links */}
              <nav className="border-white/10 px-4 py-8 sm:px-10 md:border-e">
                <ColumnLabel>{t('menu.navigate')}</ColumnLabel>
                <ul className="space-y-0.5">
                  {navCategories.map((navCategory, index) => {
                    const isActive = activeCategory === index
                    const Chevron = isActive ? ChevronDown : ChevronRight
                    return (
                      <li key={navCategory.labelKey}>
                        <button
                          type="button"
                          onClick={() => selectCategory(index)}
                          aria-expanded={isActive}
                          className={clsx(
                            'flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-start font-serif text-[22px] transition',
                            isActive
                              ? 'border-white/80 font-medium text-white'
                              : 'border-transparent text-neutral-300 hover:bg-white/5 hover:text-white',
                          )}
                        >
                          {t(navCategory.labelKey)}
                          <Chevron
                            className={clsx(
                              'h-5 w-5 text-neutral-400',
                              !isActive && 'rtl:rotate-180',
                            )}
                          />
                        </button>
                      </li>
                    )
                  })}
                </ul>

                <ul className="my-3 space-y-0.5 border-y border-white/60 py-2">
                  {navLinks.map((link) => (
                    <li key={link.labelKey}>
                      <MenuLink item={link} onNavigate={closeMenu} size="lg" />
                    </li>
                  ))}
                </ul>

                {/* The university's namesake; hovering shows a preview over the other columns */}
                <Link
                  to={BOUSSOUF_PATH}
                  onClick={closeMenu}
                  onMouseEnter={openPreview}
                  onMouseLeave={schedulePreviewClose}
                  onFocus={openPreview}
                  onBlur={schedulePreviewClose}
                  className={clsx(
                    'group flex items-center gap-4 rounded-lg border px-4 py-3 transition',
                    isPreviewOpen
                      ? 'border-[#e8c27a]/60 bg-white/5'
                      : 'border-transparent hover:bg-white/5',
                  )}
                >
                  <img
                    src={boussoufPortrait.src}
                    alt=""
                    className="h-12 w-10 shrink-0 object-cover object-top grayscale transition group-hover:grayscale-0"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold tracking-[0.15em] text-[#e8c27a] uppercase">
                      {t('boussouf.menuEyebrow')}
                    </span>
                    <span className="block font-serif text-[19px] text-white">
                      {t('nav.boussouf')}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-500 rtl:rotate-180" />
                </Link>
              </nav>

              {isPreviewOpen && (
                <BoussoufPreview
                  onMouseEnter={openPreview}
                  onMouseLeave={schedulePreviewClose}
                  onNavigate={closeMenu}
                />
              )}

              {/* Column 2: items of the selected category */}
              <section className="border-white/10 px-4 py-8 sm:px-10 md:border-e">
                {category ? (
                  <>
                    <ColumnLabel>{t(category.sectionLabelKey)}</ColumnLabel>
                    <ul className="space-y-0.5">
                      {category.items.map((navItem, index) => {
                        if (!navItem.children) {
                          return (
                            <li key={navItem.labelKey}>
                              <MenuLink item={navItem} onNavigate={closeMenu} size="lg" serif />
                            </li>
                          )
                        }
                        const isActive = activeItem === index
                        const Chevron = isActive ? ChevronDown : ChevronRight
                        const Icon = navItem.icon
                        return (
                          <li key={navItem.labelKey}>
                            <button
                              type="button"
                              onClick={() => setActiveItem(isActive ? null : index)}
                              aria-expanded={isActive}
                              className={clsx(
                                'flex w-full items-center gap-3.5 rounded-lg px-4 py-2.5 text-start font-serif text-[19px] transition',
                                isActive
                                  ? 'font-medium text-white'
                                  : 'text-neutral-300 hover:bg-white/5 hover:text-white',
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0 text-neutral-500" />
                              <span className="flex-1">{t(navItem.labelKey)}</span>
                              <Chevron
                                className={clsx(
                                  'h-4 w-4 text-neutral-500',
                                  !isActive && 'rtl:rotate-180',
                                )}
                              />
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </>
                ) : (
                  <Placeholder>{t('menu.selectCategory')}</Placeholder>
                )}
              </section>

              {/* Column 3: links of the selected sub-category */}
              <section className="px-4 py-8 sm:px-10">
                {item?.children ? (
                  <>
                    <ColumnLabel>{t(item.labelKey)}</ColumnLabel>
                    <ul className="space-y-0.5">
                      {item.children.map((child) => (
                        <li key={child.labelKey}>
                          <MenuLink item={child} onNavigate={closeMenu} size="base" />
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  category?.items.some((navItem) => navItem.children) && (
                    <Placeholder>{t('menu.selectSubcategory')}</Placeholder>
                  )
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/** Header dropdown: globe button showing the current language, list of the three languages */
function LanguageMenu() {
  const { t, i18n } = useTranslation()
  const [isOpen, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const current = languages.find((language) => language.code === i18n.resolvedLanguage)

  // Close when clicking anywhere else or pressing Escape
  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('header.language')}
        className="flex items-center gap-1.5 text-sm font-semibold transition hover:text-accent"
      >
        <Globe className="h-[18px] w-[18px]" strokeWidth={2} />
        <span>{current?.short}</span>
        <ChevronDown className={clsx('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={t('header.language')}
          className="absolute end-0 top-full mt-5 w-44 animate-fade-in border border-white/10 bg-neutral-950/95 py-1.5 shadow-2xl backdrop-blur-md"
        >
          {languages.map((language) => {
            const isSelected = language.code === current?.code
            return (
              <li key={language.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  lang={language.code}
                  onClick={() => {
                    i18n.changeLanguage(language.code)
                    setOpen(false)
                  }}
                  className={clsx(
                    'flex w-full items-center justify-between px-4 py-2.5 text-start text-sm transition hover:bg-white/10',
                    isSelected ? 'text-white' : 'text-white/70',
                  )}
                >
                  {language.label}
                  {isSelected && <Check className="h-4 w-4 text-accent" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/** Compact language buttons for the open menu's top bar */
function LanguageTabs() {
  const { t, i18n } = useTranslation()
  return (
    <div role="group" aria-label={t('header.language')} className="flex items-center gap-1">
      {languages.map((language) => {
        const isSelected = language.code === i18n.resolvedLanguage
        return (
          <button
            key={language.code}
            type="button"
            lang={language.code}
            aria-pressed={isSelected}
            aria-label={language.label}
            onClick={() => i18n.changeLanguage(language.code)}
            className={clsx(
              'min-w-9 px-2 py-1 text-sm font-semibold transition',
              isSelected ? 'bg-white text-neutral-900' : 'text-white/60 hover:text-white',
            )}
          >
            {language.short}
          </button>
        )
      })}
    </div>
  )
}

function Brand() {
  const { t } = useTranslation()
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={t('brand.home')}>
      <img
        src={LOGO_URL}
        alt={t('brand.logoAlt')}
        className="h-10 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:h-11"
      />
      <span className="leading-tight">
        <span className="block font-serif text-lg font-bold tracking-[0.14em] sm:text-xl">
          {t('brand.name')}
        </span>
        <span className="block text-[10px] tracking-[0.2em] text-white/70 sm:text-[11px]">
          {t('brand.subtitle')}
        </span>
      </span>
    </Link>
  )
}

function ColumnLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs font-medium tracking-[0.22em] text-neutral-500 uppercase">
      {children}
    </p>
  )
}

function Placeholder({ children }: { children: string }) {
  return (
    <p className="hidden h-full items-center justify-center font-serif text-base text-neutral-600 md:flex">
      {children}
    </p>
  )
}

function MenuLink({
  item,
  onNavigate,
  size,
  serif = false,
}: {
  item: NavItem
  onNavigate: () => void
  size: 'base' | 'lg'
  serif?: boolean
}) {
  const { t } = useTranslation()
  const Icon = item.icon
  return (
    <Link
      to={item.to ?? '/'}
      onClick={onNavigate}
      className={clsx(
        'flex items-center gap-3.5 rounded-lg px-4 py-2.5 text-neutral-300 transition hover:bg-white/5 hover:text-white',
        size === 'lg' ? 'text-[17px]' : 'text-base',
        serif && 'font-serif text-[19px]',
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-neutral-500" />
      {t(item.labelKey)}
    </Link>
  )
}

/** Large preview of the Abdelhafid Boussouf page, shown over the menu's second and third columns */
function BoussoufPreview({
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: {
  onMouseEnter: () => void
  onMouseLeave: () => void
  onNavigate: () => void
}) {
  const { t, i18n } = useTranslation()
  const language = (i18n.resolvedLanguage ?? 'en') as LanguageCode

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-y-0 end-0 hidden w-2/3 animate-fade-in items-center border-s border-white/10 bg-neutral-950/95 px-10 backdrop-blur-sm md:flex lg:px-16"
    >
      <div className="grid w-full max-w-3xl items-center gap-10 lg:grid-cols-[220px_1fr]">
        <div className="relative mx-auto w-44 lg:w-full">
          <div className="absolute inset-0 translate-x-3 translate-y-3 border border-white/20 rtl:-translate-x-3" />
          <img
            src={boussoufPortrait.src}
            alt={boussoufPortrait.caption[language]}
            className="relative aspect-[595/815] w-full object-cover"
          />
          <span className="absolute -start-2 -top-2 h-6 w-6 border-s-2 border-t-2 border-[#e8c27a]" />
          <span className="absolute -end-2 -bottom-2 h-6 w-6 border-e-2 border-b-2 border-[#e8c27a]" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#e8c27a] uppercase">
            {t('boussouf.menuEyebrow')}
          </p>
          <h3 className="mt-3 font-serif text-4xl leading-tight font-semibold">
            {boussoufProfile.name[language]}
          </h3>
          <p className="mt-1 font-serif text-lg text-white/60 italic">
            « {boussoufProfile.alias[language]} » · {boussoufProfile.years}
          </p>
          <p className="mt-5 leading-relaxed text-white/80">{boussoufProfile.excerpt[language]}</p>
          <Link
            to={BOUSSOUF_PATH}
            onClick={onNavigate}
            className="group mt-7 inline-flex items-center gap-3 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#e8c27a]"
          >
            {t('boussouf.readStory')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

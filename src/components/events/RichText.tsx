import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import clsx from 'clsx'
import type { Block, Inline } from '@/api/types'

const linkClass =
  'font-medium text-crimson underline decoration-crimson/30 underline-offset-4 transition hover:decoration-crimson'

/** Renders the API's rich text blocks; links to other pages work like Wikipedia links */
export default function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 leading-relaxed text-neutral-700">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p>
          <Inlines nodes={block.children} />
        </p>
      )
    case 'heading': {
      const Heading = block.level === 2 ? 'h2' : 'h3'
      return (
        <Heading
          className={clsx(
            'pt-3 font-serif font-semibold text-neutral-900',
            block.level === 2 ? 'text-2xl' : 'text-xl',
          )}
        >
          <Inlines nodes={block.children} />
        </Heading>
      )
    }
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List
          className={clsx(
            'space-y-2 ps-6',
            block.ordered ? 'list-decimal' : 'list-disc marker:text-crimson',
          )}
        >
          {block.items.map((item, index) => (
            <li key={index}>
              <Inlines nodes={item} />
            </li>
          ))}
        </List>
      )
    }
    case 'quote':
      return (
        <blockquote className="border-s-2 border-crimson bg-white/60 px-6 py-4 font-serif text-lg text-neutral-800 italic">
          <Inlines nodes={block.children} />
          {block.cite && (
            <footer className="mt-2 font-sans text-sm text-neutral-500 not-italic">
              — {block.cite}
            </footer>
          )}
        </blockquote>
      )
  }
}

function Inlines({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>
          <InlineView node={node} />
        </Fragment>
      ))}
    </>
  )
}

function InlineView({ node }: { node: Inline }) {
  if (node.type === 'text') {
    return (
      <span
        className={clsx(
          node.marks?.includes('bold') && 'font-semibold text-neutral-900',
          node.marks?.includes('italic') && 'italic',
        )}
      >
        {node.text}
      </span>
    )
  }

  // Outside links open in a new tab and show a small icon
  if (node.target.kind === 'url') {
    return (
      <a href={node.target.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {node.text}
        <ExternalLink className="ms-1 inline h-3.5 w-3.5 align-baseline" aria-hidden="true" />
      </a>
    )
  }

  return (
    <Link to={node.target.href} className={linkClass}>
      {node.text}
    </Link>
  )
}

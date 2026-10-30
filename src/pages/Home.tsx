import EventsSection from '@/components/EventsSection'
import FacultiesSection from '@/components/FacultiesSection'
import Hero from '@/components/Hero'
import KeyFigures from '@/components/KeyFigures'
import PlatformsSection from '@/components/PlatformsSection'
import RectorSection from '@/components/RectorSection'
import StudentLifeSection from '@/components/StudentLifeSection'

export default function Home() {
  return (
    <>
      <Hero nextSectionId="key-figures" />
      <KeyFigures id="key-figures" />
      <RectorSection />
      <PlatformsSection />
      <FacultiesSection />
      <StudentLifeSection />
      <EventsSection />
    </>
  )
}

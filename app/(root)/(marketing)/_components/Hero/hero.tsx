import { Button } from '@/components/custom/ui/button'
import { HeroSupports } from './hero-supports'
import { SectionContainer } from '@/components/custom/ui/Layout/section-container'
import { TypewriterEffectSmooth } from '@/components/custom/ui/typewriter-effect'

const words = [
    {
        text: "Welcome to",
        className: "text-2xl md:text-3xl lg:text-4xl"
    },
    {
        text: "Shorts",
        className: "text-2xl md:text-3xl lg:text-4xl"
    },
    {
        text: "Hub",
        className: "text-2xl md:text-3xl lg:text-4xl"
    },

]



export function Hero() {

    return (
        <SectionContainer>
            <div className="sm:py-18 gap-4 lg:gap-8 py-16 md:py-24 lg:py-24 flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center flex-col">
                    <TypewriterEffectSmooth words={words} />
                    <p className='pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-base'>ShortsHub is a comprehensive platform designed for aggregating essential shortcuts catering to various needs such as gaming and program workstations.</p>
                </div>

                <Button variant={'primary'} size={'lg'} className="px-10">Let&apos;s Create a Post</Button>
                <HeroSupports />
            </div>
        </SectionContainer>
    )
}

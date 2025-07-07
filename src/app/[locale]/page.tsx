import HomeComponent from '@/block/Home';
import { Divider } from '@/block/Divider';
import About from '@/block/About';
import Skills from '@/block/Skills';
import Projects from '@/block/Projects';
import Experience from '@/block/Experience';
import Contact from '@/block/Contact';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
    const t = await getTranslations('Page');
    return (
        <div className="w-full h-[fit-content] max-w-[1440px] flex flex-col items-center justify-center">
            <HomeComponent />

            <Divider variant='type2' />
            <About />
            <div className="flex relative self-start">
                <p className="absolute hidden lg:inline-flex -top-[0px] left-0 w-fit bg-background">{t("sections.skillsModule")}</p>
                <br />
                <p className=" top-[20px] hidden lg:inline-flex left-0 absolute">{t("sections.loading")}</p>
                <div className="mt-[5px]">
                    <Divider variant="type1" />
                </div>
            </div>
            <Skills />
            <Divider variant="type2" />
            <Projects />
            <div className="flex relative self-start">
                <p className="absolute hidden lg:inline-flex -top-[0px] left-0 w-fit bg-background">{t("sections.experienceModule")}</p>
                <br />
                <p className=" top-[20px] hidden lg:inline-flex left-0 absolute">{t("sections.loading")}</p>
                <div className="mt-[5px]">
                    <Divider variant="type1" />
                </div>
            </div>
            <Experience />
            <Divider variant="type2" />
            <Contact />

        </div>
    );
}
"use client"

import logo from "./assets/treasure-1-removebg.png"
import hero from "./assets/pngwing.com (1).png";
import { Button, Flex, Image } from "antd";
import { useRouter } from "next/navigation";
import { TextHoverEffect } from "./components/texthover";
import { FollowPointer, FollowerPointerCard } from "./components/pointercard";
import "./styles/hero.css"
import { ExpandableCardDemo } from "./components/elites";
import RuleSection from "./components/rulesection";
import SponsorSection from "./components/sponsorsection";

export default function Home() {
  const router = useRouter();
  const scrollToElites = () => {
    document.querySelector('.rules-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-background">
      <div className="hero-headline-bg"
        style={{
          minHeight: '60vh',
          maxHeight: '700px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem 0',
          backgroundColor: '#000',
        }}
      >
        {/* Background video */}
        <video className="hero-bg-video" autoPlay muted loop playsInline preload="auto">
          <source src="/api/hero-video" type="video/mp4" />
        </video>
  <div className="hero-wrapper hero-wrapper-left">
          <Flex justify="space-between" align="center" style={{ width: "100%", marginBottom: '2rem' }}>
            <div></div>
            <div style={{ height: "100px", width: "100px" }}>
              <Image src={logo.src} preview={false}></Image>
            </div>
          </Flex>
          <div className="hero-content-left">
            <h1 className="anton-heading" style={{ 
              lineHeight: 1.1, 
              marginBottom: '0.5rem', 
              color: '#ffffffff', 
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)', 
              textAlign: 'inherit',
              wordBreak: 'break-word',
              hyphens: 'auto'
            }}>WAR FOR</h1>
            <h1 className="anton-heading" style={{ 
              lineHeight: 1.1, 
              marginBottom: '1.25rem', 
              color: '#fff', 
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)', 
              textAlign: 'inherit',
              wordBreak: 'break-word',
              hyphens: 'auto'
            }}><span className="stroke">TREZOR</span></h1>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '2rem', 
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              width: '100%'
            }}>
              <Button className="anton-button" style={{ 
                backgroundColor: "#0d0f129e", 
                border: "2px dotted white", 
                borderRadius: '8px',
                height: 'auto'
              }} onClick={() => router.push('/register')}>Register</Button>
              <Button className="anton-button" style={{ 
                backgroundColor: "#0d0f129e", 
                border: "2px dotted white", 
                borderRadius: '8px',
                height: 'auto'
              }} onClick={() => router.push('/quiz')}>Join Hunt</Button>
            </div>
            <h3 className="anton-text" style={{ 
              fontSize: 'clamp(0.9rem, 2.5vw, 2rem)', 
              marginBottom: '0.25rem', 
              color: '#fff', 
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)', 
              textAlign: 'inherit',
              lineHeight: '1.4'
            }}>Mozilla Phoniex Club</h3>
           {/* <h3 className="anton-text" style={{ 
              fontSize: 'clamp(0.9rem, 2.5vw, 2rem)', 
              color: '#fff', 
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)', 
              textAlign: 'inherit',
              lineHeight: '1.4'
            }}>8 November</h3>*/}
          </div>
        </div>
      </div>
      {/* Rules Section with Modern Animation Effects */}
      <RuleSection />
      
      {/* Sponsor Section */}
      <SponsorSection />
      
      <section className="rules-section">
        {/* ELITES section - Hidden until results are declared */}
        {/* <Flex justify="center" align="center" vertical style={{ marginTop: "50px" }}>
          <h1 className="background-text rules-text">ELITES</h1>
          <h1 className="background-covertext rules-covertext">ELITE</h1>

          <Flex align="center" justify="center" className="elites">
            <ExpandableCardDemo />
          </Flex>

        </Flex> */}
        
        <div >
          <Flex justify="center" align="center">
            <TextHoverEffect text=".HUNT." />
          </Flex>
        </div>
      </section>
      {/* <footer className="footer-maindiv">
        <Flex align="center" justify="space-between" style={{ marginBottom: "14vh" }}>
          <Flex vertical>
            <h1 className="footer-heading">CREDITS</h1>
            <h1 className="footer-heading footer-10x">To our 10x Developers</h1>
            <h1 className="footer-text">Vibhor Phalke</h1>
            <h1 className="footer-text">Tanish Bhole</h1>
            <h1 className="footer-text">Shashwat Pratap Singh</h1>
          </Flex>
          <Flex vertical>
            <h1 className="footer-heading">CONTACT US</h1>
            <h1 className="footer-text">Please Dont!</h1>
            <h1 className="footer-text">&#8203;</h1>
            <h1 className="footer-text">&#8203;</h1>
          </Flex>
        </Flex>
      </footer> */}
    </div>
  );
}

const blogContent = [
  {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "HACK",
    date: "28th March, 2023",
    title: "Rule 1",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "./assets/",
    authorAvatar: "/manu.png",
  },
  {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "HACK",
    date: "28th March, 2023",
    title: "Rule 2",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "./assets/",
    authorAvatar: "/manu.png",
  },
  {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "HACK",
    date: "28th March, 2023",
    title: "Rule 3",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "./assets/",
    authorAvatar: "/manu.png",
  }
]

const TitleComponent = ({
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={logo.src}
      height="100px"
      width="100px"
      className="rounded-full border-2 border-white"
    />
  </div>
);

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come Back to the Portal!";
      } else {
        document.title = "Imgify"; 
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set the initial document title
    document.title = "Imgify";

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Imgify</title>
        <meta name="description" content="Create stunning, custom images with our advanced image generation platform. Whether for personal, professional, or promotional use, our tool offers unique and dynamic image designs." />
        <meta name="keywords" content="image generation, custom images, graphic design, dynamic backgrounds, personalized graphics, image customization" />
        <meta property="og:title" content="Imgify - Create Stunning Custom Images" />
        <meta property="og:description" content="Generate unique and captivating images for various needs with Imgify's advanced image generation tool. Perfect for personal, professional, and promotional purposes." />
        <meta property="og:image" content="https://imgify.itshivam.me/imgify.png" />
        <meta property="og:url" content="https://imgify.itshivam.me" />
        <link rel="canonical" href="https://imgify.itshivam.me" />
      </Head>
      <CustomCursor />
      <Component {...pageProps} />
    </>
  );
}
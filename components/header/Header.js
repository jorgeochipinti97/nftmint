import React from 'react'
import Head from 'next/head'
import Contact from '../contact/Contact';
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <Head>
                <title>Creative Coding</title>
                <meta name="description" content="Creative Codign" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="min-w-full  py-14 px-4 md:px-0 ">
                <div className="flex items-center container mx-auto max-w-5xl justify-between text-white">
            <Link href='/'>
                    <span className="font-coiny text-xl md:text-3xl font-bold cursor-pointer">
                        <span className="bg-gradient-to-br text-gray-500 from-brand-blue to-brand-purple pr-2 bg-clip-text ">
                            Creative
                        </span>
                        Coding
                    </span>
            </Link>
                    <nav aria-label="Contact Menu">
                        <Contact />
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header
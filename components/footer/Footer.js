import React, { useEffect } from 'react'
import Contact from '../contact/Contact'
import { useRouter } from 'next/router'


export const Footer = () => {
    const { asPath } = useRouter()

    return (
        <>
            <footer className="p-4 rounded-lg shadow md:px-6 md:py-8 self-end">
                <hr className="my-6 border-black-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
                <Contact />
                <span className={`block text-sm sm:text-center p-2 ${asPath == '/mint' ? 'text-gray-300' : null} mt-5 `}>© 2022 <span className={`p-2 ${asPath == '/mint' ? 'text-gray-300' : null}`}>CreativeCodign.</span> All Rights Reserved.</span>
            </footer>
        </>
    )
}


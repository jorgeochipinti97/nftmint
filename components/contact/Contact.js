import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useRouter } from 'next/router'
import Link from 'next/link';


const Contact = () => {

    const { asPath } = useRouter()

    return (
        <div className='flex justify-center'>
            <div className={`p-2 ${asPath == '/mint' ? 'text-gray-300' : null}`}>
                <Link href='https://www.linkedin.com/in/jorge-ochipinti-3232971a6/'>
                    <LinkedInIcon />
                </Link>
            </div>
            <div className={`p-2 ${asPath == '/mint' ? 'text-gray-300' : null}`}>
                <Link href='#'>
                    <TwitterIcon />
                </Link>
            </div>
            <div className={`p-2 ${asPath == '/mint' ? 'text-gray-300' : null}`}>
                <Link href='mailto:jorgeochipinti97@gmail.com'>
                    <MailIcon />
                </Link>
            </div>
        </div>
    )
}

export default Contact
import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useRouter } from 'next/router'
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';

const Contact = () => {

    const { asPath } = useRouter()

    return (
        <div className='flex justify-center'>
            <div className={`p-2 ${asPath == '/mint' ? 'text-gray-300' : null} cursor-pointer`} sx={{flexWrap:'wrap'}}>
                <Link href='https://www.linkedin.com/in/jorge-ochipinti-3232971a6/'>
                    <LinkedInIcon className='xm:text-white' />
                </Link>
            </div>
            <div className={`p-2 ${asPath == '/mint' ? 'text-gray-300' : null} cursor-pointer`}>
                <Link href='https://github.com/jorgeochipinti97/nftmint'>
                    <GitHubIcon className='xm:text-white' />
                </Link>
            </div>
            <div className={`p-2 ${asPath == '/mint' ? 'text-gray-300' : null} cursor-pointer`}>
                <Link href='#'>
                    <TwitterIcon className='xm:text-white' />
                </Link>
            </div>
            <div className={`p-2 ${asPath == '/mint' ? 'text-gray-300' : null} cursor-pointer`}>
                <Link href='mailto:jorgeochipinti97@gmail.com'>
                    <MailIcon className='xm:text-white' />
                </Link>
            </div>
        </div>
    )
}

export default Contact
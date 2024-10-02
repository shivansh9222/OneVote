import React from 'react';
import {Link} from 'react-router-dom'

function Footer(){
    return(
        <>
            <footer className=''>
                {/* Info Section starts here */}
                <section>
                    <section>
                        {/* About us of company starts here */}
                        <article className='flex flex-col items-center gap-y-0.5 mb-3'>
                            <h2>About</h2>
                            <div className='w-1/2 border-[1px] border-orange-600 mb-2'></div>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/7444/7444400.png" 
                                alt="Logo"
                                className="w-7 h-7 mb-2"
                            />
                            <p className='text-sm ubuntu-light-italic text-orange-600 px-3'>
                                One Vote is a web app for online voting system .
                                It is a simple and secure way to cast your vote.
                                We just created a sample to verify our understanding of the topic known.
                            </p>
                        </article>
                        {/* About us of the company ends here */}

                        {/* Quick Link section starts here */}
                        <article className='flex flex-col items-center gap-y-0.5 '>
                            <h2>Quick Links</h2>
                            <div className='w-1/2 border-[1px] border-orange-600 mb-2'></div>
                            <ul 
                                className='text-sm text-orange-600 ubuntu-light-italic'
                            >
                                <li className='underline hover:text-blue-500'> 
                                    <Link to='/'>
                                        Home
                                    </Link>
                                </li>
                                <li className='underline hover:text-blue-500'> 
                                    <Link to='/faq'>
                                        FAQ
                                    </Link>
                                </li>
                                <li className='underline hover:text-blue-500'> 
                                    <Link to='/tc'>
                                        Terms and Conditions
                                    </Link>
                                </li>
                                <li className='underline hover:text-blue-500'> 
                                    <Link to='/pp'>
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </article>
                        {/* Quick Links section ends here */}
                    </section>

                    <section>
                        {/* Contact Us section starts here */}
                        <article>
                            This is Contact Section
                        </article>
                        {/* Contact us section ends here */}

                        {/* Social Links starts here */}
                        <article>
                            This is media section
                        </article>
                        {/* Social Links ends here */}
                    </section>
                </section>
                {/* Info section ends here */}

                {/* Copyright section starts here */}
                <section 
                    className='bg-orange-600 text-sm text-center md:text-base text-white ubuntu-light md:ubuntu-bold p-1 w-full'
                >
                    © 2023 One Vote. All rights reserved.
                </section>
                {/* Copyright section ends here */}
            </footer>
        </>
    )
}

export default Footer;
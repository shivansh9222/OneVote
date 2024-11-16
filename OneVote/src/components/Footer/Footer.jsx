import React from 'react';
import {Link} from 'react-router-dom'
import Media from './Media';
import Contact from './Contact';


function Footer(){
    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return(
        <>
            <footer 
                className='border-t-[4px] border-orange-600 z-20'
                style={{boxShadow: '0px -10px 10px rgba(200 200 200 / 0.6)'}}
            >
                {/* Info Section starts here */}
                <section>
                    <section 
                        className='md:flex md:w-full md:justify-around md:items-center md:border-b-[2px] md:mb-2'
                    >

                        {/* About us of company starts here */}
                        <article 
                            className='flex flex-col items-center gap-y-0.5 mb-3 text-base md:font-semibold lg:text-xl md:w-1/2 md:max-w-[300px] md:mt-4'
                        >
                            <h2>About</h2>
                            <div className='w-1/2 border-[1px] border-orange-600 mb-2'></div>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/7444/7444400.png" 
                                alt="Logo"
                                className="w-7 h-7 mb-2"
                            />
                            <p className='text-sm md:text-base md:text-center ubuntu-light-italic  md:ubuntu-medium text-orange-600 px-3'>
                                One Vote is a web app for online voting system .
                                It is a simple and secure way to cast your vote.
                                We just created a sample to verify our understanding of the topic known.
                            </p>
                        </article>
                        {/* About us of the company ends here */}

                        {/* Quick Link section starts here */}
                        <article 
                            className='flex flex-col items-center gap-y-0.5 text-base md:font-semibold md:w-1/2 md:max-w-[300px] lg:text-xl'
                        >
                            <h2>Quick Links</h2>
                            <div className='w-1/2 border-[1px] border-orange-600 mb-2'></div>
                            <ul 
                                className='text-sm md:text-base text-orange-600 ubuntu-light-italic md:ubuntu-medium'
                            >
                                <li className='underline hover:text-blue-500'> 
                                    <Link to='/home' onClick={scrollToTop}>
                                        Home
                                    </Link>
                                </li>
                                <li className='underline hover:text-blue-500'> 
                                    <Link to='/extra' onClick={scrollToTop}>
                                        FAQ
                                    </Link>
                                </li>
                                <li className='underline hover:text-blue-500'> 
                                    <Link to='/extra' onClick={scrollToTop}>
                                        Terms and Conditions
                                    </Link>
                                </li>
                                <li className='underline hover:text-blue-500'> 
                                    <Link to='/extra' onClick={scrollToTop}>
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </article>
                        {/* Quick Links section ends here */}
                    </section>

                    <section className='md:flex md:w-full md:justify-around md:items-center'>
                        {/* Contact Us section starts here */}
                        <article className='md:w-1/2'>
                            <Contact />
                        </article>
                        {/* Contact us section ends here */}

                        {/* Social Links starts here */}
                        <article className='flex flex-col items-center gap-y-0.5 text-base md:font-semibold md:w-1/2 lg:text-xl'>
                            <h2>Media Links</h2>
                            <div className='w-1/2 border-[1px] border-orange-600 mb-2'></div>

                            <div className='flex gap-x-4 md:gap-x-7'>
                                <Media name={'Instagram'} icon={'https://cdn-icons-png.flaticon.com/512/174/174855.png'} takeTo={'https://www.instagram.com/'}/>
                                <Media name={'Facebook'} icon={'https://cdn-icons-png.flaticon.com/512/5968/5968764.png'} takeTo={'https://www.facebook.com/'}/>
                                <Media name={'X'} icon={'https://cdn-icons-png.flaticon.com/512/5969/5969020.png'} takeTo={'https://x.com/?lang=en'}/>
                                <Media name={'News'} icon={'https://cdn-icons-png.flaticon.com/512/2644/2644746.png'} takeTo={'https://www.india.gov.in/news_lists?a422857629'}/>
                            </div>

                        </article>
                        {/* Social Links ends here */}
                    </section>
                </section>
                {/* Info section ends here */}

                {/* Copyright section starts here */}
                <section 
                    className='bg-orange-600 text-sm text-center md:text-base text-white ubuntu-light md:ubuntu-bold p-2 w-full'
                >
                    © 2023 One Vote. All rights reserved. <br />
                    Contact Us at: mail@to.com
                </section>
                {/* Copyright section ends here */}
            </footer>
        </>
    )
}

export default Footer;
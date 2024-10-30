import React from 'react'
import { useEffect } from 'react';

function Modal({isOpen , closeModal , children , link , message}) {

    useEffect( ()=> {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    } , [isOpen])

    return (
        <>
            {children}
            {isOpen && (
                // all container box
                <main 
                    className='fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 ease-in-out'
                > 
                    {/* overlay section starts here */}
                    <section 
                        className='fixed inset-0 backdrop-blur-sm opacity-90'
                        onClick={closeModal}
                    >
                        
                    </section>
                    {/* overlay section ends here */}

                    {/* Modal section starts here */}
                    <article 
                        className='relative box-border flex flex-col items-center justify-center gap-y-2 h-max w-60  bg-white shadow-lg shadow-gray-800 text-orange-500 opacity-100 z-10 rounded-xl overflow-auto p-3'
                    > 
                        {/* Animation div starts here */}
                        {/* <div className='w-full'>
                            <img 
                                className='h-full w-full object-cover object-center'
                                src={link} 
                                alt="gif" 
                            />
                        </div> */}
                        {/* Animation div ends here */}

                        {/* Message section starts here */}
                        <p className='text-lg md:text-xl italic text-orange-500 rounded-lg text-center'>{message}</p>
                        {/* Message section ends here */}
                        <button 
                            onClick={closeModal}
                            className='bg-red-500 text-white mx-auto rounded-[40px] italic text-center hover:bg-red-600 py-1 px-2 mb-2'
                        >
                            Ok
                        </button>
                    </article>
                    {/* Modal section ends here */}
                </main>
                
            )}
        </>
    )
}

export default Modal
import React from 'react';

function About() {
    return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-3xl font-bold mb-4 text-center">About Our Online Voting System</h1>
        <div className=' h-[2px] text-center bg-orange-400 mb-4'></div>
        <p className="text-lg mb-6 bg-orange-400 p-2 rounded-[20px] text-gray-50">
            Our online voting system is designed to provide a secure, transparent, and efficient way for individuals to cast their votes in various elections and polls. Our system is built with the latest technology and security measures to ensure the integrity of the voting process.
        </p>
        <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                <p className="text-lg bg-orange-400 text-gray-100 rounded-lg p-2">
                    Our mission is to empower citizens to participate in the democratic process by providing a convenient, accessible, and secure online voting platform.
                </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <h2 className="text-2xl font-bold mb-2">Our Values</h2>
                <ul className="list-disc pl-4 bg-orange-400 p-2 rounded-[20px] text-gray-50">
                <li>Security: We prioritize the security of our system to ensure the integrity of the voting process.</li>
                <li>Transparency: We provide transparent and auditable voting processes to ensure trust and confidence in the system.</li>
                <li>Accessibility: We strive to make our system accessible to all citizens, regardless of their location or ability.</li>
                </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <h2 className="text-2xl font-bold mb-2">Our Team</h2>
                <p className="text-lg bg-orange-400 p-2 rounded-[20px] text-gray-50">
                    Our team consists of experienced professionals in the fields of computer science (Django expert), cybersecurity (Savior), and election administration (Model Glow). We are dedicated to providing a secure and efficient online voting system.
                </p>
                <ul className="flex flex-col list-none pl-4 mt-2 gap-y-1">
                    <li className='bg-blue-400 text-center rounded-[15px] p-1 flex flex-col md:flex-row  items-center cursor-pointer justify-evenly'>
                        <img 
                            src="https://i.pinimg.com/564x/08/87/34/088734b8ac027c244bcd74faff4d08c4.jpg" 
                            alt="Maharana Pratap" 
                            className="w-12 h-12 rounded-full object-cover object-center"
                        />
                        Anmol Chauhan, CEO
                    </li>
                    <li className='bg-blue-400 text-center rounded-[15px] p-1 flex flex-col md:flex-row  items-center cursor-pointer justify-evenly'>
                        <img 
                            src="https://i.pinimg.com/564x/b4/e1/31/b4e1312d99b3a6cca80964ea0bcf0bfd.jpg" 
                            alt="Savior Pink" 
                            className="w-12 h-12 rounded-full object-cover object-center"
                        />
                        Arun Kumar, CTO
                    </li>
                    <li className='bg-blue-400 text-center rounded-[15px] p-1 flex flex-col md:flex-row  items-center cursor-pointer justify-evenly'>
                        <img 
                            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSOyJ8-S30LI4pUXpE9Rbs6qWqv7qFyJ01RVwl2ya575xUxSZBM1p-Pfs9gs2Bsf8JY4bddJBQv8y69Qnq6BQ5O2Ox7zj8N8LQazAVMhw" 
                            alt="Love" 
                            className="w-12 h-12 rounded-full object-cover object-center"
                        />
                        Francisco Lachowski. aka. (Love Kumar), Election Administrator
                        
                    </li>
                </ul>
            </div>
        </div>
        <p className="text-lg mb-6 bg-orange-400 p-2 rounded-[20px] text-gray-100">
        Our online voting system is designed to provide a seamless and user-friendly experience for voters. We use advanced security measures, such as encryption and two-factor authentication, to ensure the integrity of the voting process.
        </p>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Learn More About Our Security Measures
        </button>
    </div>
    );
}

export default About;
import React from "react";

function Extra(){
    return(
    <>
        <main className="w-full h-full">
            <section 
                id="extra"
                className="faq-container flex-col items-center my-[10%] md:my-[100px] mx-auto w-[80vw] max-w-[500px] p-4 bg-orange-500 rounded-lg text-sm md:text-base overflow-auto"
            >
                <h1 
                    className="text-black font-bold text-xl text-center mb-1"
                >
                    Frequently Asked Questions
                </h1>
                <div className="w-[70%] border-[2px] border-white mx-auto mb-3"></div>

                {/* General Questions Sections starts here */}
                <section className="faq-section">
                    <h2 className="font-semibold text-orange-600 text-center mb-2 bg-white rounded-lg py-1">General</h2>
                    <ul>
                        <li><h4 className="ubuntu-medium-italic text-gray-800">Q: What is One Vote?</h4></li>
                        <li className="ubuntu-light-italic text-white mb-2">A: One Vote is a web app for online voting systems. It's a simple and secure way to cast your vote.</li>

                        <li><h4 className="ubuntu-medium-italic text-gray-800">Q: What is the purpose of One Vote?</h4></li>
                        <li className="ubuntu-light-italic text-white mb-4">A: One Vote aims to provide a convenient and reliable platform for online voting, making it easier for individuals and organizations to conduct elections and polls.</li>
                    </ul>
                </section>
                {/* General Questions Sections ends here */}

                {/* How to use One Vote Starts here */}
                <section className="faq-section">
                    <h2 className="font-semibold text-orange-600 text-center mb-2 bg-white rounded-lg py-1">Using One Vote</h2>
                    <ul>
                        <li className="ubuntu-medium-italic text-gray-800">Q: How do I create an account on One Vote?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: Currently, we don't require users to create an account to use One Vote. Simply visit our website and start voting!</li>

                        <li className="ubuntu-medium-italic text-gray-800">Q: How do I cast my vote on One Vote?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: To cast your vote, navigate to the voting page, select your preferred option, and click the "Vote" button.</li>

                        <li className="ubuntu-medium-italic text-gray-800">Q: Can I change my vote after submitting it?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: No, once you've submitted your vote, it cannot be changed.</li>
                    </ul>
                </section>
                {/* How to use One Vote Ends here */}

                {/* Security and Privarcy Section starts here */}
                <section className="faq-section">
                    <h2 className="font-semibold text-orange-600 text-center mb-2 bg-white rounded-lg py-1">Security and Privacy</h2>
                    <ul>
                        <li className="ubuntu-medium-italic text-gray-800">Q: Is my vote secure on One Vote?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: Yes, our platform uses secure protocols to ensure the integrity and confidentiality of your vote.</li>

                        <li className="ubuntu-medium-italic text-gray-800">Q: How do you protect my personal information?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: We do not collect any personal information from our users. Our platform is designed to be anonymous, and we do not store any identifiable data.</li>
                    </ul>
                </section>
                {/* Security and Privarcy Section ends here */}

                {/* Technical Issues Section starts here */}
                <section className="faq-section">
                    <h2 className="font-semibold text-orange-600 text-center mb-2 bg-white rounded-lg py-1">Technical Issues</h2>
                    <ul>
                        <li className="ubuntu-medium-italic text-gray-800">Q: What if I encounter an error while voting?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: If you encounter any issues while voting, please try refreshing the page or contacting our support team below.</li>

                        <li className="ubuntu-medium-italic text-gray-800">Q: Is One Vote compatible with all devices and browsers?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: One Vote is designed to be compatible with most modern devices and browsers. If you experience any issues, please let us know so we can assist you</li>
                    </ul>
                </section>
                {/* Technical Issues Section end here */}

                {/* Miscellaneous section starts here  */}
                <section className="faq-section">
                    <h2 className="font-semibold text-orange-600 text-center mb-2 bg-white rounded-lg py-1">Miscellaneous</h2>
                    <ul>
                        <li className="ubuntu-medium-italic text-gray-800">Q: Can I use One Vote for commercial purposes?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: No, One Vote is currently designed for personal and non-commercial use only.</li>

                        <li className="ubuntu-medium-italic text-gray-800">Q: How do I contact One Vote support?</li>
                        <li className="ubuntu-light-italic text-white mb-2">A: You can reach out to our support team at <a href="mailto:support@onevote.com">support@onevote.com</a> for any questions or concerns.</li>
                    </ul>
                </section>
                {/* Miscellenous Section ends here  */}

                <p className="font-semibold text-white">For more information, please refer to our Contact Section and write in your queries! Thank You.</p>
            </section>
        </main>
    </>
    )
}

export default Extra;
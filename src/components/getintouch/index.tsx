import { useState } from "react";

const accordionData = [
    {
        label: "Chat with our Interior Designers",
        content: "Our design experts are available to help bring your ideas to life. Our design experts are available to help bring your ideas to life. Our design experts are available to help bring your ideas to life. Our design experts are available to help bring your ideas to life."
    },
    {
        label: "Elevate your space with Vietnamese furniture design",
        content: "Discover unique styles crafted by local artisans for your home."
    },
    {
        label: "A designer furniture store like no other",
        content: "We combine aesthetic with function to deliver timeless pieces."
    },
    {
        label: "Create your signature look with customization options",
        content: "Choose your material, color, and style for a personalized touch."
    }
];

const GetInTouch = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <section className="get-in-touch">
            <div className="container">
                <h3 className="get-in-touch__title">Get in touch</h3>
                <div className="get-in-touch__box">
                    <div className="get-in-touch__intro">
                        <p className="get-in-touch__description">
                            Looking for Vietnamese Design Furniture? Our dedicated customer services team is ready to answer any enquiries you may have. Whether it's about our services, products, or something else – we're here to help.
                        </p>
                    </div>

                    <div className="get-in-touch__options">
                        {accordionData.map((item, index) => (
                            <div key={index} className={`get-in-touch__option ${openIndex === index ? "active" : ""}`} onClick={() => handleToggle(index)}>
                                <div className="get-in-touch__header">
                                    <span className="get-in-touch__label">{item.label}</span>
                                    <i className={`get-in-touch__icon ${openIndex === index ? 'rotate' : ''}`}>
                                        <svg
                                            width="15"
                                            height="8"
                                            viewBox="0 0 15 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 1L8 8L15 1"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </i>
                                </div>
                                <div className={`get-in-touch__content-wrapper ${openIndex === index ? "expanded" : "collapsed"}`}>
                                    <div className="get-in-touch__content">
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;

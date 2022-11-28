import React from "react";
import { useRef, useState } from "react";

const FaqsCard = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  // Open Answer Handler
  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b faq-sec"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-fuchsia-800 font-medium">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-fuchsia-800">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};

// All Questions And Answers
const FaQ = () => {
  const faqsList = [
    {
      q: "What is Horses of Past?",
      a: "Every people have a dreame to buy his won bike we are providing some good quality of bike to people — from delicate details and décor to tantalizing food shots and couture-clad, gorgeous brides, Jen’s images have it all, and then some",
    },
    {
      q: "What dose Horses of Past do?",
      a: "Every people have a dreame to buy his won bike we are providing some good quality of bike to people. My imagery is understated yet evocative, resulting from clear and polished creative direction that elicits light-filled, painterly portraits. ",
    },
    {
      q: "What is YAMAHA?",
      a: "Yamaha kabushiki gaisha; Japanese pronunciation: [jamaha]) is a Japanese multinational corporation and conglomerate with a very wide range of products and services. It is one of the constituents of Nikkei 225 and is the world's largest musical instrument manufacturing company. The former motorcycle division was established in 1955 as Yamaha Motor Co., Ltd., which started as an affiliated company but later became independent, although Yamaha Corporation is still a major shareholder.",
    },
    {
      q: "What is HERO HONDA?",
      a: "Hero MotoCorp Limited (formerly Hero Honda) is an Indian multinational motorcycle and scooter manufacturer headquartered in New Delhi. The company is one of the largest two-wheeler manufacturers in the world,[3][link expired] as well as in India, where it has a market share of about 37.1% in the two-wheeler industry.[3][4] As of 27 May 2021, the market capitalization of the company was ₹59,600 crore (US$7.5 billion).",
    },
    {
      q: "What is BAJAJ?",
      a: "Bajaj Auto Limited is an Indian multinational automotive manufacturing company based in Pune.[2] It manufactures motorcycles, scooters and auto rickshaws. Bajaj Auto is a part of the Bajaj Group. It was founded by Jamnalal Bajaj (1889–1942) in Rajasthan in the 1940s.",
    },
  ];

  return (
    <section className="leading-relaxed max-w-screen-xl mx-auto px-4 lg:px-8">
      <div className="space-y-3 text-center">
        <h1 className="font-bold text-2xl md:text-5xl text-secondary">
          Frequently Asked Questions
        </h1>
        <p className="text-fuchsia-800 max-w-lg mx-auto text-lg">
          Answered all frequently asked questions, Still confused? feel free to
          contact us.
        </p>
      </div>
      <div className="my-4 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <FaqsCard key={idx} faqsList={item} />
        ))}
      </div>
    </section>
  );
};

export default FaQ;

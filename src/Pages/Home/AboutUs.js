import React from 'react';
import about from '../../assects/about.webp'
const AboutUs = () => {
    return (
        <div>
            <div className="hero bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={about}
              className="max-w-sm rounded-lg shadow-2xl"
              alt=""
            />
            <div className="p-10">
              <h1 className="text-5xl font-bold">About Us</h1>
              <p className="py-6">
                I approach photography with a romantic, fine art sensibility. My
                imagery is understated yet evocative, resulting from clear and
                polished creative direction that elicits light-filled, painterly
                portraits. My use of fresh and simple composition, and natural
                light has evolved from a deep love and respect for the old
                masters - Rembrandt, Vermeer, Botticelli. I am a fiercely
                dedicated medium format film photographer and my creative
                process is imaginative, industrious and detailed. In each
                capture, I aim for perfection and beauty.
              </p>
            </div>
          </div>
        </div>
        </div>
    );
};

export default AboutUs;
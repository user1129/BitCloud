import React from "react";

import "./Subscription.css";

const SubscriptionPage = () => {
  return (
    <div id="pricing">
      <div className="price_card alpha">
        <div className="header">
          <span className="price">$0</span>
          <span className="name">Basic Pack</span>
        </div>
        <ul className="features">
          <li>Complete documentation</li>
          <li>Working materials in PSD and Sketch format</li>
        </ul>
        {/* <button className="subs_button">Add to cart</button> */}
        <span className="tip">* Great for beginners!</span>
      </div>
      <div className="price_card bravo">
        <div className="header">
          <span className="price">$15</span>
          <span className="name">Bravo Pack</span>
        </div>
        <ul className="features">
          <li>Complete documentation</li>
          <li>Preview Feature (Video, Music, Docs)</li>
          <li>6 months access to the library</li>
        </ul>
        <a href="https://buy.stripe.com/test_5kA3cU7c1dqD9W08ww">
          <button className="subs_button">Add to cart</button>
        </a>
        <span className="tip">* Most popular!</span>
      </div>
      <div className="price_card charlie">
        <div className="header">
          <span className="price">$25</span>
          <span className="name">Charlie Pack</span>
        </div>
        <ul className="features">
          <li>Complete documentation</li>
          {/* <li>Working materials in PSD, Sketch and EPS format</li> */}
          <li>1 year access to the library</li>
          <li>+50GB cloud storage</li>
        </ul>
        <a href="https://buy.stripe.com/test_5kA3cU7c1dqD9W08ww">
          <button className="subs_button">Add to cart</button>
        </a>
      </div>
    </div>
  );
};

export default SubscriptionPage;

import React, { Component } from 'react'

export const Bot = (props) => (
  <div>
   <div className="container">
    <input id="speech" type="text" />
    <button id="rec" className="btn">Speak</button>
    <div id="spokenResponse" className="spoken-response">
      <div className="spoken-response__text">PUT RESPONSE HERE</div>
    </div>
  </div>
  <div className="debug">
    <div className="debug__btn btn">
      Debug JSON results
    </div>
    <div className="debug__content">
      <textarea id="response" cols="40" rows="20"></textarea>
    </div>
  </div>
  </div>
)

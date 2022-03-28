import React, { Component } from 'react';

const TopBarComponent =  ()=>{
    return (
        <>
            <nav class="navbar" style={{padding:"25px 50px"}}>
      <a class="navbar-brand" href="#">
        <img src={'https://cdn.discordapp.com/attachments/851706415244115991/957868699958804560/Heart_Health.png'} width="80px" height="80px" alt="Logo"/>
      </a>

      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About Us</a>
        </li>
      </ul>
    </nav>
        </>
    )
}

export default TopBarComponent;
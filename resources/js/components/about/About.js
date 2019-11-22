import React from 'react';

export default function About() {
    return (<>
        <div 
            className="container pt-4 container-height text-center">
             <h2 className="my-3">About</h2>
             <hr/>
             <p> Aplicação para estudo do react router, JWT token e redux. </p>
             <img src="https://cdn.iconscout.com/icon/free/png-256/redux-283024.png"
                  className="mt-5 col-12 col-sm-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
                  className="col-12 col-lg-3" />
        </div>
    </>
    );
}
  
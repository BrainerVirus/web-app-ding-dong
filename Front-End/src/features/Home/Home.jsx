import React from "react";
import "../../scss/features/HomeStyle.scss";
//import { useUser, useUserUpdate } from "../context/AuthContext";

function Home() {
  // const userProvider = useUser();
  // console.log(
  //   "User:" + userProvider.user + userProvider.isLogged + userProvider.role
  // );
  return (
    <div className="container-fluid" id="home-container">
      <div className="row  d-flex align-content-center justify-content-center gap-md-5 gap-sm-3">
        <div id="header-title" className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
            <img src="..." className="card-img-bottom" alt="..."></img>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
            <img src="..." className="card-img-bottom" alt="..."></img>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
            <img src="..." className="card-img-bottom" alt="..."></img>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
            <img src="..." className="card-img-bottom" alt="..."></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

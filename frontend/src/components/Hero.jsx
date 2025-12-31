import { Link } from "react-router-dom";
import heroBg from "../assets/network.png";

const Hero = () => {
  return (
    <div
    className="hero min-h-screen items-start"
    style={{
        backgroundImage: `url(${heroBg})`,
    }}
    >
    <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center mt-20">
        <div className="mx-auto text-center">
            <h1 className="mb-5 text-5xl font-bold">
            Welcome&nbsp;to&nbsp;DevTinder
            </h1>
            <p className="mb-5 text-center">
            Your developer community for networking, learning, and collaboration.<br />
            Discover opportunities, share knowledge, and grow with like-minded developers.
            </p>
            <Link to="/signup"><button className="btn btn-primary cursor-pointer">Join the Community</button></Link>
        </div>
        </div>
    </div>
  )
}

export default Hero;
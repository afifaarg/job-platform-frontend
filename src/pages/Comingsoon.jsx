import NavBar from "../components/Navbar"; // Import the NavBar component for navigation

// ComingSoon component to display a "Coming Soon" message
export default function ComingSoon() {
  return (
    <>
      <NavBar /> {/* Render the NavBar component at the top of the page */}
      <div className="coming-soon mx-auto w-3/4 justify-center">
        {" "}
        {/* Container for the coming soon message */}
        <img src="/coming_soon.png" alt="" className="mx-auto" />{" "}
        {/* Image indicating the page is coming soon */}
        <h1 className="text-primary font-bold text-2xl text-center">
          {" "}
          {/* Main heading for the message */}
          THIS PAGE WILL BE AVAILABLE VERY SOON
        </h1>
      </div>
    </>
  );
}

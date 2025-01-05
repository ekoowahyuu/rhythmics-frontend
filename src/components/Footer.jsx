import logo from "../assets/rhythmics-logo.png";

const Footer = () => {
  return (
    <section className="h-f flex flex-col ">
      <div className="flex-grow"></div>
      <footer className="bg-primary py-10 flex flex-col items-center drop-shadow-2xl">
        <a href="/home">
          <img src={logo} alt="footer" className="object-cover px-24 py-2" />
        </a>
        <div className="flex flex-row justify-center gap-12 px-24 py-6">
          <a href="/home">
            <button className="font-poppins text-primary2">Home</button>
          </a>
          <a href="/studio">
            <button className="font-poppins text-primary2">Studio</button>
          </a>
          <a href="/about-us">
            <button className="font-poppins text-primary2">About Us</button>
          </a>
          <a href="/contact-us">
            <button className="font-poppins text-primary2">Contact Us</button>
          </a>
        </div>
      </footer>

      <footer className="">
        <div className="flex flex-row-reverse justify-center bg-primary">
          <h1 className="font-poppins text-white py-5 ">
            Copyright &copy; RHYTHMICS, 2024
          </h1>
        </div>
      </footer>
    </section>
  );
};
export default Footer;

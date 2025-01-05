import hero2 from "../assets/hero2.jpg";
import eko from "../assets/eko.jpg";
import doni from "../assets/doni.jpg";
import hafiz from "../assets/hafiz.jpg";
import gatien from "../assets/gatien.jpg";
import adhi from "../assets/eko.jpg";
import kayla from "../assets/eko.jpg";

const AboutUs = () => {
  return (
    <section className="">
      <img src={hero2} alt="footer" className="w-full h-64 object-cover" />
      <div>
        <h1 className="text-center font-bold text-3xl mt-14 mb-14 font-poppins">
          Get Closer with Rhythmics
        </h1>
        <p className="mr-32 ml-32 font-poppins mb-5">
          Rhythmics is the go-to platform for discovering and booking
          exceptional music studios that match your creative needs. Whether
          you’re a seasoned musician, an up-and-coming artist, or just starting
          your musical journey, we make the process effortless so you can focus
          on what matters most—your music.
        </p>
        <p className="mr-32 ml-32 font-poppins mb-5">
          Music is more than just a craft; it’s a powerful way to express
          yourself, connect with others, and push boundaries. That’s why we
          bring together a diverse range of high-quality studios, from cozy
          rehearsal spaces to professional recording environments, tailored to
          fuel your creativity and vision.
        </p>
        <p className="mr-32 ml-32 font-poppins mb-5">
          We know how challenging it can be to find the right studio, especially
          when inspiration strikes or deadlines loom. That’s why Rhythmics is
          designed to make studio booking simple and fast. Browse our platform,
          check real-time availability, and reserve your spot in moments—all
          from the comfort of your device.
        </p>
        <p className="mr-32 ml-32 font-poppins mb-20">
          With Rhythmics, you’re not just booking a studio—you’re stepping into
          a community that values artistry, collaboration, and innovation.
          Whether you’re rehearsing for a performance, producing a track, or
          experimenting with new sounds, we’re here to help you find the perfect
          environment to thrive. Let Rhythmics be your partner in turning dreams
          into reality. The perfect studio is waiting—let’s make music together.
        </p>
      </div>

      <section className="max-w-5xl mx-auto p-6">
        <div className="relative w-full overflow-hidden bg-gray-100 px-8 py-10">
          <h1 className="text-3xl font-bold text-center font-poppins mb-8">
            Meet the Rhythmics Team
          </h1>
          <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {[
              {
                name: "Eko Wahyu Setiawan",
                role: "Founder & CEO",
                img: eko,
              },
              {
                name: "Rafhiromadoni Sopandi",
                role: "Vice President",
                img: doni,
              },
              {
                name: "Hafiz Alkhairi Renal",
                role: "Studio Manager",
                img: hafiz,
              },
              {
                name: "Gatien Naufal R",
                role: "Marketing Head",
                img: gatien,
              },
              {
                name: "Adhi Suryo Nugroho S",
                role: "Community Manager",
                img: adhi,
              },
              {
                name: "Kayla Amalika",
                role: "Customer Support",
                img: kayla,
              },
            ].map((member, index) => (
              <div
                key={index}
                className="min-w-[200px] bg-white shadow-lg rounded-lg overflow-hidden snap-center"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold font-poppins">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <style>
            {`
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}
          </style>
        </div>
      </section>
    </section>
  );
};
export default AboutUs;

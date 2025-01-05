const About = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">About Us</h1>
        
        <div className="space-y-8">
          <section className="prose lg:prose-xl mx-auto">
            <p className="text-lg text-gray-600">
              At Innocorner, we are dedicated to transforming the lives of individuals and companies by blending innovative technology with practical solutions. With a strong foundation in IT operations and the Software Development Life Cycle (SDLC), we bring a deep understanding of how to align technical expertise with business objectives to deliver secure, efficient, and scalable solutions.
            </p>
          </section>

          <section className="bg-secondary/5 p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">Our Mission</h2>
            <p className="text-gray-600">
              To inspire change through technology, offering products and services that not only enhance life routines but also reflect our spirit of innovation. Whether it's through cutting-edge IT task automation, advanced services, or life-changing products, we aim to innovate the way people and businesses operate, helping them achieve their goals in harmony with their vision.
            </p>
          </section>

          <section className="bg-primary/5 p-6 md:p-8 rounded-lg">
            <p className="text-gray-600">
              We believe in bridging the gap between strategy and execution. Our capacity for management and collaboration enables us to guide cross-functional initiatives, optimize workflows, and enhance operational efficiency for our clients. By combining strategic thinking, technical skills, and a passion for innovation, we strive to deliver value and inspire growth.
            </p>
          </section>

          <section className="bg-secondary/5 p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-secondary">Innovative Products</h3>
                <p className="text-gray-600">Our curated selection of products is designed to bring meaningful changes to daily routines, empowering individuals and businesses to embrace a smarter, more efficient way of living.</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-secondary">Tailored Services</h3>
                <p className="text-gray-600">From IT task automation to workflow optimization, our services are crafted to address your unique needs, ensuring sustainable success.</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-secondary">Collaborative Approach</h3>
                <p className="text-gray-600">We work alongside you, fostering open communication and collaboration to develop solutions that align with your goals and values.</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-secondary">Commitment to Excellence</h3>
                <p className="text-gray-600">With a focus on continuous improvement, we bring the latest advancements in technology to help you stay ahead in an ever-changing world.</p>
              </div>
            </div>
          </section>

          <section className="text-center p-6 md:p-8 bg-primary/5 rounded-lg">
            <p className="text-lg font-medium text-gray-700">
              Let us help you unlock your potential with innovative solutions that resonate with your ambitions. Together, we can build a better, more efficient future.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
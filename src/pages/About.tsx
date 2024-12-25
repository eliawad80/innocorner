const About = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">About Us</h1>
        
        <div className="space-y-8">
          <section className="prose lg:prose-xl mx-auto">
            <p className="text-lg text-gray-600">
              Welcome to Your Store, where quality meets convenience. We started our journey with a simple mission: to provide our customers with the best products and shopping experience possible.
            </p>
          </section>

          <section className="bg-gray-50 p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To deliver exceptional products that enhance our customers' lives while providing outstanding service and maintaining the highest standards of quality.
            </p>
          </section>

          <section className="bg-gray-50 p-6 md:p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">We never compromise on the quality of our products.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-gray-600">Honest and transparent in all our dealings.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                <p className="text-gray-600">Your satisfaction is our top priority.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">Constantly improving our products and services.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
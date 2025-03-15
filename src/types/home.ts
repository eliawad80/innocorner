
export interface Service {
  id: number;
  name: string;
  description: string | null;
  image: string;
}

export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
  };
  whyChooseUs: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

export const defaultContent: HomeContent = {
  hero: {
    title: "Welcome to Our Platform",
    subtitle: "Discover innovative solutions for your business needs"
  },
  whyChooseUs: {
    title: "Why Choose Us",
    items: [
      {
        title: "Quality Service",
        description: "We deliver exceptional quality in everything we do"
      },
      {
        title: "Expert Team",
        description: "Our experienced team is here to support you"
      },
      {
        title: "Customer Focus",
        description: "Your success is our priority"
      }
    ]
  }
};

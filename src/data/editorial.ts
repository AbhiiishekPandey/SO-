export interface EditorialStory {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  image: string;
}

export const CAMPAIGN_CONTENT = {
  hero: {
    brandMark: "SÓ",
    titlePrimary: "THE NEW",
    titleSecondary: "FEMININE.",
    tagline: "Contemporary silhouettes designed for every version of you.",
    cta: "DISCOVER THE EDIT",
    // Clean editorial luxury imagery
    backgroundImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85",
    subImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
  },
  newEdit: {
    eyebrow: "CURATED COLLECTION",
    title: "THE NEW EDIT",
    description: "A deliberate balance of architectural structure and fluid movement. Sculpted waists, cascading hemlines, and tactile silks created for singular moments.",
    quote: "Luxury is not about excess. It is the poise found when every proportion is exact."
  },
  artOfDressing: {
    title: "THE ART OF DRESSING.",
    statement: "To wear a garment is to inhabit a feeling. We design for the quiet confidence that needs no explanation.",
    pillars: [
      {
        number: "I",
        label: "PROPORTION",
        text: "Every drape and waistline is calculated to accentuate natural poise with unrestrained comfort."
      },
      {
        number: "II",
        label: "TACTILITY",
        text: "Whisperweight silks, liquid jerseys, and crisp cotton lawns that respond sensually to motion."
      },
      {
        number: "III",
        label: "LONGEVITY",
        text: "Timeless silhouettes immune to transient trends—cherished season after season."
      }
    ],
    editorialImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    detailImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85"
  },
  brandStory: {
    heading: "MADE FOR THE MOMENTS THAT MATTER.",
    copyPrimary: "At SÓ Boutique, we believe modern womanhood is both powerful and delicate. Our pieces do not overpower the woman who wears them; they amplify her grace.",
    copySecondary: "Crafted in small, conscious batches, each midi silhouette transitions seamlessly from daytime reverie to twilight affairs.",
    atelierLocation: "DUBLIN — MILAN — PARIS"
  }
};

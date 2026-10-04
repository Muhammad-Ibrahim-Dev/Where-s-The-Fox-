import { Product } from "/types";

export class ProductRepository {
  private static products: Product[] = [
    {
      id: "wtf-drop-01",
      slug: "wtf-signature-drop-shoulder",
      name: "WTF Signature Drop-Shoulder",
      price: 2000,
      gsm: 200,
      fit: "Extended Drop-Shoulder Boxy Fit",
      tagline: "Catch Me If You Can",
      description: "Crafted from 200 GSM combed organic cotton. Features extended shoulder drops, wide collar ribbing, and soft-touch chest print.",
      badge: "Core Collection",
      colors: [
        { name: "Fox Orange", hex: "#F15A24" },
        { name: "Royal Blue", hex: "#1B52E8" },
        { name: "Midnight Navy", hex: "#0A0F1D" }
      ],
      sizes: ["S", "M", "L", "XL"],
      inStock: true
    },
    {
      id: "wtf-drop-02",
      slug: "fox-was-here-heavy-tee",
      name: "FOX WAS HERE Heavy Tee",
      price: 1900,
      gsm: 200,
      fit: "Ultra-Heavyweight Boxy Fit",
      tagline: "Paw Trails Edition",
      description: "Heavy-duty 200 GSM construction with high-density puff printing across the rear. Engineered to maintain its boxy shape after repeated wear.",
      badge: "Limited Drop",
      colors: [
        { name: "Royal Blue", hex: "#1B52E8" },
        { name: "Midnight Navy", hex: "#0A0F1D" }
      ],
      sizes: ["M", "L", "XL", "XXL"],
      inStock: true
    },
    {
      id: "wtf-drop-03",
      slug: "stealth-shadow-drop-tee",
      name: "Stealth Shadow Oversized Tee",
      price: 2000,
      gsm: 200,
      fit: "Relaxed Drop-Shoulder",
      tagline: "Hidden In Plain Sight",
      description: "Deep Midnight Navy base with micro-embroidered orange paw accent on the sleeve cuff.",
      badge: "New Release",
      colors: [
        { name: "Midnight Navy", hex: "#0A0F1D" }
      ],
      sizes: ["S", "M", "L", "XL"],
      inStock: true
    }
  ];

  static getAll(): Product[] {
    return this.products;
  }

  static getBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  static getByGsm(gsm: number): Product[] {
    return this.products.filter((p) => p.gsm === gsm);
  }
}
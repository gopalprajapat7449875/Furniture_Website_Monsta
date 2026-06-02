
import Testimonial from "./comon/Testimonial.jsx";
import BannerSection from "./components/home/BannerSection.jsx"
import Bestselling from "./components/home/Bestselling";
import Formsection from "./components/home/Formsection.jsx";
import OfferSection from "./components/home/OfferSection.jsx";
import Support from "./components/home/Support.jsx";
import Tabing from "./components/home/Tabing.jsx";
import TrandingColaction from "./components/home/TrandingColaction.jsx";

import { Sliderdata, TestimonialData } from "./services/HomeService.js";
import { Productdata } from "./services/ProductServices.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function Home() {

let testimonialdata=await TestimonialData()
  let productdata=await Productdata()
  let data=await Sliderdata()
 
  return (
    <>

<BannerSection sliderdata={data} />

<OfferSection/>
<Tabing Productdata={productdata} />

<TrandingColaction/>
<Bestselling productdata={productdata} />
<Support/>
<Testimonial testimonialdata={testimonialdata} />
<Formsection/>
    </>
  );
}

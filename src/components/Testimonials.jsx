import Slider from "react-slick";
import { sliderProps } from "../sliderProps";
import { AlexioContext, useAlexio } from "../Context";
import { useContext } from "react";
import SectionContainer from "./SectionContainer";

const Testimonials = () => {
  const { nav, changeNav } = useContext(AlexioContext);
  const activePageClass = () => ("tesimonials" === nav ? "" : "page--inactive");
  const user = useAlexio();

  if (!user.userData) {
    return <div></div>;
  }
  const testimonials = user.userData.user.testimonials;
  return (
    <SectionContainer
      name={"testimonial"}
      extraClass={"testimonial-section"}
      title={"What People Say?"}
      subTitle={"Testimonials"}
      leftImage={user.userData.user.about.avatar.url}
    >
      <div className="testimonial-section m-30px-t sm-m-20px-t pb-5">
        <Slider {...sliderProps.testimonial} id="client-slider-single">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-col" key={index}>
              <div className="say">
                <p>{testimonial.review}</p>
              </div>
              <div className="user">
                <div className="img">
                  <img src={testimonial.image.url} alt title />
                </div>
                <div className="name ml-2">
                  <span>{testimonial.name}</span>
                  <label>{testimonial.position}</label>
                </div>
              </div>
            </div>
          ))}
        </Slider>{" "}
      </div>
    </SectionContainer>
  );
};
export default Testimonials;

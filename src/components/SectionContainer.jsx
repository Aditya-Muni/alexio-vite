import { useContext } from "react";
import { AlexioContext } from "../Context";
import SectionTitle from "./SectionTitle";
import PropTypes from "prop-types";

const SectionContainer = ({
  extraClass,
  name,
  children,
  title,
  subTitle,
  leftImage,
  leftImageTitle,
}) => {
  const { nav, changeNav } = useContext(AlexioContext);
  const activePageClass = () => (name === nav ? "" : "page--inactive");
  return (
    <div
      className={`page ${extraClass} white-bg ${activePageClass(name)}`}
      id={name}
      onClick={() => changeNav(name, false)}
    >
      {" "}
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div
            className="col-lg-3 col-xl-4 page-title"
            style={{ backgroundImage: `url(${leftImage})` }}
          >
            <div className="v-center-box d-flex align-items-end">
              <h2>{leftImageTitle ? leftImageTitle : title}</h2>
            </div>
          </div>
          <div className="col-lg-9 col-xl-8">
            <div className="page-scroll">
              <div className="page-content">
                {/* 
      ==========================
        Page Titel
      ==========================
      */}
                <SectionTitle title={title} subTitle={subTitle} />
                {/* 
      ==========================
        Contact Us
      ==========================
      */}
                {children}
              </div>{" "}
              {/* page-content */}
            </div>{" "}
            {/* page-scroll  */}
          </div>
        </div>{" "}
        {/* row */}
      </div>
    </div>
  );
};

SectionContainer.propTypes = {
  extraClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  leftImage: PropTypes.string.isRequired,
  leftImageTitle: PropTypes.string,
};

export default SectionContainer;

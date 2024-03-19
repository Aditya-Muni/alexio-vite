import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useClickOutside from "../../useClickOutside";
import PropTypes from "prop-types";

const VideoPopup_ = ({ close, videoID }) => {
  let domNode = useClickOutside(() => {
    close(false);
  });
  return (
    <>
      <div className="mfp-bg mfp-ready" onClick={() => close(false)}></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        tabIndex={-1}
        style={{ overflow: "hidden auto" }}
      >
        <div className="mfp-container popup-container mfp-s-ready mfp-iframe-holder">
          <div className="mfp-content" ref={domNode}>
            <div className="mfp-iframe-scaler">
              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => close()}
              >
                ×
              </button>
              <ReactPlayer url={videoID} playing={true} />
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
      </div>
    </>
  );
};

const VideoPopup = () => {
  const [video, setVideo] = useState(false);
  const [videoValue, setVideoValue] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      const a = document.querySelectorAll("a");
      a.forEach((a) => {
        if (
          a.href.includes("www.youtube.com") ||
          a.href.includes("vimeo.com") ||
          a.href.includes("soundcloud.com")
        ) {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            setVideoValue(a.href);
            setVideo(true);
          });
        }
      });
    }, 1500);
  }, []);
  return (
    <>
      {video && (
        <VideoPopup_ close={() => setVideo(false)} videoID={videoValue} />
      )}
    </>
  );
};

VideoPopup_.propTypes = {
  close: PropTypes.func.isRequired,
  videoID: PropTypes.string.isRequired,
};

export default VideoPopup;

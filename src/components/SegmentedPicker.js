import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'

// reused component from https://letsbuildui.dev/articles/building-a-segmented-control-component
function SegmentedPicker({ name, options, callback, controlRef, defaultOption}) {
  const [activeIndex, setActiveIndex] = useState(options.findIndex(opt => opt.value === defaultOption));
  const componentReady = useRef();

  useEffect(() => {
    componentReady.current = true;
  }, []);

  useEffect(() => {
    const activeSegmentRef = options[activeIndex].ref;
    const { offsetWidth, offsetLeft } = activeSegmentRef.current;
    const { style } = controlRef.current;

    style.setProperty("--highlight-width", `${offsetWidth}px`);
    style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
  }, [activeIndex, callback, controlRef, options]);

  const onInputChange = (value, index) => {
    setActiveIndex(index);
    callback(value, index);
  };

  return (
    <div className="controls-container" ref={controlRef}>
      <div className={`controls ${componentReady.current ? "ready" : "idle"}`}>
        {options?.map((item, i) => (
          <div
            key={item.value}
            className={`segment ${i === activeIndex ? "active" : "inactive"}`}
            ref={item.ref}
          >
            <input
              type="radio"
              value={item.value}
              id={item.label}
              name={name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

SegmentedPicker.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
  controlRef: PropTypes.object.isRequired,
  defaultOption: PropTypes.string
};

export default SegmentedPicker;
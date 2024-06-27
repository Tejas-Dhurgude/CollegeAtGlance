import { useState } from "react";
import styles from "./PtoC.module.scss";
import collegeMapping from './collegeMapping.js';

function PtoC() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [checkedBranches, setCheckedBranches] = useState("");
  const [showBranch, setShowBranch] = useState("Enter Branch");
  const [selectedCategory, setSelectedCategory] = useState("Enter Category");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [collegeName, setCollegeName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [collegeCode, setCollegeCode] = useState(0);
  const [surColl, setSurColl] = useState([]);

  const branches = ["Computer", "IT", "Electrical", "Mechanical", "Electronics and Telecommunication", "Civil"];
  const categories = ["open", "ews", "tfws", "st", "sc", "obc", "vjnt", "nt1", "nt2", "nt3"];
  const numbers = [
    3012, 6006, 3215, 6271, 3199, 6007, 6273, 6175, 6276, 3182, 4115, 3185, 6289,
    2008, 6274, 3209, 1002, 3184, 3197, 6754, 3139, 6822, 2020, 6146, 6278, 3176,
    4025, 6272, 3135, 3204, 6004, 6141, 3214, 3211, 3208, 6282, 6139, 6156, 5121,
    6177, 3194, 5004, 4167, 3189, 3203, 6214, 3201, 3207, 3187, 3190, 6802, 6207,
    6267, 3033, 6265, 1101, 3148, 6281, 6796, 3423, 3183, 3475, 6285, 5108, 6222,
    3035, 4116, 5162, 3188, 3196, 6155, 3192, 6178, 6284, 6176, 6145, 6755, 3154,
    4174, 5160, 1012, 6160, 6182, 3210, 1105, 3175, 3146, 6122, 3471, 6283, 2114,
    4142, 6250, 6310, 6179, 6298, 6187, 5151, 4649, 5139, 5449, 3200, 4137, 3193,
    4004, 2113, 6269, 6223, 5181, 3223, 3439, 6732, 6649, 3221, 6203, 6772, 6220,
    1114, 2127, 3212, 2129, 6206, 6317, 3460, 6307, 6268, 4171, 3218, 6288, 3147,
    6786, 3198, 4136, 6270, 6277, 3467, 6311, 6769, 5172, 6275, 4138, 6028, 5104,
    6803, 6185, 4304, 3445, 3216, 3477, 6138, 6797, 4147, 1120, 4123, 5109, 4177,
    6184, 6839, 2126, 6419, 1107, 6640, 5125, 6780, 6834, 1128, 6794, 4179, 5382,
    6622, 1121, 5418, 6643, 6545, 3206, 5103, 5331, 6808, 6303, 5152, 5177, 3217,
    5330, 3202, 1265, 2533, 6144, 6625, 5173, 4104, 6815, 6762, 6634, 3465, 4144,
    6293, 4613, 6609, 1119, 5130, 5124, 4151, 4139, 6770, 5179, 2573, 5390, 6325,
    4163, 1116, 5106, 2250, 4172, 4145, 1123, 5107, 5182, 6759, 3220, 1127, 3222,
    6324, 6767, 2112, 5409, 6320, 5303, 6322, 4135, 6315, 5170, 6757, 4118, 4181,
    6313, 5408, 2254, 6308, 4134, 1276, 4133, 2138, 4190, 1117, 2134, 3351, 4196,
    5399, 4195, 5164, 2130, 2135, 5401, 6321, 6635, 1126, 6768, 5171, 5380, 6901,
    6305, 6938, 2133, 2136, 2116, 1182, 6644, 5184, 4193, 6466, 6756, 4302, 2131,
    6149, 3503, 6326, 5169, 6304, 2111, 6632, 3436, 6628, 3224, 6795, 6758, 6781,
    1180, 5396, 4188, 3219, 4197, 1125, 4192, 3440, 4143, 1130, 3447, 2252, 5411,
    2522, 6319, 5168, 2516, 6782, 3353, 6217, 6219, 6183, 5381, 4141, 5322, 4175,
    6766, 1268, 1005, 2021, 2137, 2141, 2146, 3014, 3036, 3286, 3462, 4005, 4285,
    4648, 5003, 5161, 6005, 6318, 6878,
  ];

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function toggleDiv() {
    setIsOpen(!isOpen);
  }

  function handleCheckboxChange(e) {
    const { value } = e.target;
    const branchIndex = parseInt(value, 10);
    if (value) {
      setCheckedBranches(branchIndex);
      setShowBranch(branches[branchIndex]);
      setIsOpen(false);
    }
  }

  function toggleDropdown() {
    setIsDropDownOpen(!isDropDownOpen);
  }

  function handleOptionClick(option) {
    setSelectedCategory(option.toUpperCase());
    setIsDropDownOpen(false);
  }

  function getCategoryIndex(category) {
    return categories.indexOf(category);
  }

  async function handleClick() {
    const categoryIndex = getCategoryIndex(selectedCategory);
    const percentValue = parseFloat(inputValue);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Category: categoryIndex,
          Branch: checkedBranches,
          Percentile: percentValue,
        }),
      });

      const data = await response.json();
      const predictedCollegeCode = parseInt(data.prediction);
      setCollegeCode(predictedCollegeCode);
      return predictedCollegeCode;

    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      throw error;
    }
  }

  function getSurroundingCodes(numbers, code) {
    const index = numbers.indexOf(code);
    if (index === -1) {
      return null;
    }

    const result = [];
    let startIndex = Math.max(index - 2, 0);
    let endIndex = Math.min(index + 2, numbers.length - 1);

    for (let i = startIndex; i <= endIndex; i++) {
      if (numbers[i] !== code) {
        result.push(numbers[i]);
      }
    }

    while (result.length > 4) {
      if (index - startIndex < endIndex - index) {
        result.pop();
      } else {
        result.shift();
      }
    }

    return result;
  }

  async function handleCollegeName() {
    if (inputValue === "" || showBranch === "Enter Branch" || selectedCategory === "Enter Category") {
      alert("Please fill all the fields");
      return;
    } else if (isNaN(inputValue) || inputValue <= 0 || inputValue > 100) {
      alert("Please enter a valid percentile between 1 and 100");
      return;
    }

    setIsLoading(true);
    
    try {
      const collegeID = await handleClick();
      if (collegeMapping.hasOwnProperty(collegeID)) {
        const collegeName = collegeMapping[collegeID];
        setCollegeId(collegeID);
        setCollegeName(collegeName);

        const surroundingCodes = getSurroundingCodes(numbers, collegeID);
        const surroundingColleges = surroundingCodes?.map(code => collegeMapping[code]).filter(name => name && name !== collegeName) || [];

        setSurColl(surroundingColleges);
        setShowPopup(true);
      } else {
        console.log("College ID not found in mapping.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }

    setInputValue("");
    setShowBranch("Enter Branch");
    setSelectedCategory("Enter Category");
  }

  function Popup({ collegeName, surroundingColleges, onClose }) {
    return (
      <div className={styles.popupBackground} onClick={onClose}>
        <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
          <span className={styles.close} onClick={onClose}>&times;</span>
          <div className={styles.popupContent}>
            <h2>Predicted Colleges</h2>
            <p style={{ textAlign: "left", fontSize: "25px", fontWeight: "bold" }}>1. {collegeName}</p>
            {surroundingColleges.map((name, index) => (
              <p key={index} style={{ textAlign: "left", fontSize: "22px", fontWeight: "bold" }}>{index + 2}. {name}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.circle}></div>
      <div className={styles.rectangle}></div>

      <form onSubmit={e => e.preventDefault()} className={styles.forms}>
        <div className={styles.container}>
          <div className={styles.percentile_section}>
            <div className={styles.percentile}>Predict Your College From Percentile</div>
            <input
              className={styles.get_percentile}
              placeholder="Enter Your Percentile"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.branch_section}>
            <div className={styles.branch} onClick={toggleDiv}>{showBranch}</div>
            {isOpen && (
              <div className={styles.branch_selection}>
                {branches.map((branch, index) => (
                  <li key={index}>
                    <input
                      type="radio"
                      id={index.toString()}
                      name="branch"
                      value={index}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={index.toString()}>{branch}</label>
                  </li>
                ))}
              </div>
            )}
          </div>

          <div className={styles.category_section}>
            <div>
              <button
                className={styles.category_select}
                onClick={toggleDropdown}
              >
                {selectedCategory}
              </button>
              {isDropDownOpen && (
                <div className={styles.category_dropdown}>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleOptionClick(category)}
                      className={styles.dropdown_option}
                    >
                      {category.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className={styles.proceedButton}
            onClick={handleCollegeName}
          >
            {isLoading ? (
              <div className="loader-container">
                <div className="bubble-loader">
                  <div className="bubble"></div>
                  <div className="bubble"></div>
                  <div className="bubble"></div>
                </div>
              </div>
            ) : (
              "Proceed"
            )}
          </button>
          <div className="disclaimer">Use for guidance; accuracy not assured</div>
        </div>
      </form>

      {showPopup && (
        <Popup collegeName={collegeName} surroundingColleges={surColl} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}

export default PtoC;

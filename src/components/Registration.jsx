import React, { useState, Fragment } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Registration.css";
import "./Steps.css";
import "./Login.css";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosRequest from "../AxiosConfig";

const MultiStep = ({ currentStep, handleStepClick }) => {
    return (
        <div className="steps-container">
            {[1, 2, 3, 4].map((stepNumber) => (
                <span key={stepNumber}>
                    {stepNumber > 1 && <div className="line"></div>}
                    <span
                        className={`step-circle ${stepNumber === currentStep ? "active" : ""}`}
                        onClick={() => handleStepClick(stepNumber)}
                        style={{ cursor: "pointer" }}
                    >
                        {stepNumber}
                    </span>
                </span>
            ))}
            <div className="progress-bar-container">
                <span
                    className="progress-indicator"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></span>
            </div>
        </div>
    );
};

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        surName: "",
        email: "",
        phoneNum: "",
        specialty: { value: "" },
        level: { value: "" },
        source: { value: "" },
        expectations: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateStep = () => {
        const stepErrors = {};

        if (currentStep === 1) {
            if (!formData.name.trim()) stepErrors.name = "First name is required";
            if (!formData.surName.trim()) stepErrors.surName = "Last name is required";
            if (!formData.email.trim()) {
                stepErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                stepErrors.email = "Invalid email address";
            }
            if (!formData.phoneNum.trim()) {
                stepErrors.phoneNum = "Phone number is required";
            }
        }

        if (currentStep === 2) {
            if (!formData.specialty.value) stepErrors.specialty = "Please select a specialty";
            if (!formData.level.value) stepErrors.level = "Please select your level";
        }

        if (currentStep === 3) {
            if (!formData.source.value) stepErrors.source = "Please select how you heard about this event";
        }
        console.log(stepErrors)
        // If there are any errors, show one toast message for all fields
        if (Object.keys(stepErrors).length > 0) {
            toast.error("Please fill all the required fields");
        }

        return stepErrors;
    };



    const nextStep = () => {
        const stepErrors = validateStep();
        if (Object.keys(stepErrors).length === 0) {
            setCurrentStep((prev) => prev + 1);
        } else {
            setErrors(stepErrors);
        }
    };

    const previousStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const stepErrors = validateStep();
        if (Object.keys(stepErrors).length === 0 && currentStep === 4) {
            try {
                const res = await axiosRequest.post('/api/send', formData);
                navigate('/success');
            } catch (err) {
                console.error(err);
                toast.error("An error occurred, please try again later.");
            }
        } else {
            setErrors(stepErrors);
        }
    };

    var margin = '7px';
    return (
        <div className="auth-container">
            <div className="signup-innerbox">
                <div className="transparent" style={{ height: "100%", width: "100%", background: "transparent" }}>
                    {/* <img style={{
                        position: "relative",
                        top: '1rem',
                        left: '0',
                        height: '180px'
                    }} src="cis.png" alt="" /> */}
                    <form id="form" className="signup-form" onSubmit={onSubmit}>
                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                            <>
                                <div className="header-signup">
                                    <h2 style={{ marginBottom: "0.4rem" }}>Register Now!</h2>
                                    <span>
                                        <label htmlFor="">Welcome to our AI Journey 😁 </label>
                                    </span>
                                </div>

                                <div style={{ marginBottom: margin }}>
                                    <p htmlFor="name">Name</p>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="First Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{ marginBottom: margin }}>
                                    <p htmlFor="surname">Surname</p>
                                    <input
                                        type="text"
                                        id="surname"
                                        name="surName"
                                        placeholder="Last Name"
                                        value={formData.surName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{ marginBottom: margin }}>
                                    <p htmlFor="email">Email Address</p>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="you@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <p htmlFor="phoneNum">Phone Number</p>
                                    <input
                                        type="text"
                                        id="phoneNum"
                                        name="phoneNum"
                                        placeholder="123-456-7890"
                                        value={formData.phoneNum}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        {/* Step 2: Contact Info */}
                        {currentStep === 2 && (
                            <>
                                <div style={{ marginBottom: '10px' }}>
                                    <p>Specialty</p>
                                    <div style={{ margin: '0.7rem 0' }}>
                                        <Fragment>
                                            <Select
                                                id="specialty"
                                                name="specialty"
                                                options={[
                                                    { value: 'cpi', label: 'CPI' },
                                                    { value: 'lsim', label: 'LSIM' },
                                                    { value: 'lam', label: 'LAM' },
                                                    { value: 'ltic', label: 'LTIC' },
                                                    { value: 'fise', label: 'FIGL' },
                                                    { value: 'figl', label: 'FISE' },
                                                    { value: 'master', label: 'MASTER' },
                                                ]}
                                                value={formData.specialty}
                                                onChange={(selectedOption) =>
                                                    setFormData({ ...formData, specialty: selectedOption })
                                                }
                                                placeholder="Select one or more..."
                                                isSearchable={false}
                                                classNamePrefix="react-select"
                                            />
                                        </Fragment>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <p>Level</p>
                                    <div style={{ margin: '0.7rem 0' }}>
                                        <Fragment>
                                            <Select
                                                id="level"
                                                name="level"
                                                options={[
                                                    { value: '1', label: '1' },
                                                    { value: '2', label: '2' },
                                                    { value: '3', label: '3' },

                                                ]}
                                                value={formData.level}
                                                onChange={(selectedOption) =>
                                                    setFormData({ ...formData, level: selectedOption })
                                                }
                                                placeholder="Select one or more..."
                                                isSearchable={false}
                                                classNamePrefix="react-select"
                                            />
                                        </Fragment>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 3: Event Information */}
                        {currentStep === 3 && (
                            <>
                                <div style={{ marginBottom: '10px' }}>
                                    <p htmlFor="source">How did you hear about this event?</p>
                                    <div style={{ margin: '0.7rem 0' }}>
                                        <Fragment>
                                            <Select
                                                id="source"
                                                name="source"
                                                options={[
                                                    { value: 'facebook', label: 'Facebook' },
                                                    { value: 'instagram', label: 'Instagram' },
                                                    { value: 'cisStand', label: 'CIS Stand' },
                                                    { value: 'friend', label: 'From a Friend' }
                                                ]}
                                                value={formData.source}
                                                onChange={(selectedOptions) => setFormData({ ...formData, source: selectedOptions })}
                                                placeholder="Select one or more..."
                                                isSearchable={false}
                                                classNamePrefix="react-select"
                                            />
                                        </Fragment>
                                    </div>
                                </div>
                                <div style={{
                                    marginBottom: '10px', display: 'flex',
                                    justifyContent: 'center',  // Horizontally center
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}>
                                    <p htmlFor="expectations">
                                        What do you expect from this event? <span style={{ fontSize: '12px', color: '#666' }}>(optional)</span>
                                    </p>
                                    <textarea
                                        id="expectations"
                                        name="expectations"
                                        placeholder="Your expectations"
                                        value={formData.expectations}
                                        onChange={handleChange}
                                        style={{
                                            width: '90%',  // Full width like other inputs
                                            height: '80px',  // Fixed height limit
                                            maxHeight: '150px',  // Maximum height
                                            padding: '8px',  // Padding for content
                                            resize: 'vertical',
                                            margin: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',  // Horizontally center
                                            alignItems: 'center',
                                        }}
                                    />
                                </div>
                            </>
                        )}




                        {/* Step 4: Review and Submit */}
                        {currentStep === 4 && (
                            <div style={{ marginBottom: '10px' }}>
                                <div style={{ marginBottom: '10px' }}>
                                    <h4>Excited to see you!</h4>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <iframe
                                        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02jgU5KKKbwTFzpZZZyXwfBE6MMY1TdVAZ3eo3Bjo7hnAzDq6m2FxTS3n3VNrkZaPwl%26id%3D61566514796721&show_text=true&width=500"
                                        width="500"
                                        height="667"
                                        style={{ border: 'none', overflow: 'auto !important', maxHeight: '300px', width: '100%', overflowY: 'scroll !important;', }}
                                        allowFullScreen={true}
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                                    </iframe>
                                </div>
                                <button
                                    type="button" onClick={onSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        )}

                        <div className="step-navigation">
                            {(currentStep > 1 && currentStep < 4) && (
                                <button type="button" onClick={previousStep} className="back-btn">
                                    <span className="btn-content" id="back"> <FaCircleArrowLeft /> Back
                                    </span>
                                </button>
                            )}
                            {currentStep < 4 && (
                                <button type="button" onClick={nextStep} className="next-btn">
                                    <span className="btn-content" id="next">Next <FaCircleArrowRight />
                                    </span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* MultiStep Component */}
                <MultiStep currentStep={currentStep} handleStepClick={setCurrentStep} />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </div>

        </div>
    );
};

export default RegistrationForm;



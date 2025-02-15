import { useState } from "react";
import backgroundImage from "../../assets/back.png";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { clipPath: "inset(50% 0 50% 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const AURegister = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [participant, setParticipant] = useState({ name: "", college: "", dept: "", phone: "", email: "" });
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [error, setError] = useState("");

  const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+[0-9]{2}@PCCOEPUNE\.ORG$/;
  if (!visible) return null;

  const handleChange = (field, value) => {
    setParticipant({ ...participant, [field]: value });
  };

  const handleNextStep = () => {
    if (!participant.name || !participant.college || !participant.dept || !participant.phone || !participant.email) { 
      setError("All fields are required!");
      return;
    }
    else if (!emailRegex.test(participant.email)) {
      setStep(2);
      console.log(participant.email);
      console.log(emailRegex.test(participant.email));
    }
    else{
      handleSubmit();
      setStep(3);
    }
    setError("");
  };

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const response = await fetch("https://f72b-2409-40c2-3050-6b58-caa-ed1c-7402-97f8.ngrok-free.app/Amoung_usR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: participant.name, college: participant.college, department: participant.dept, phone: participant.phone, email: participant.email }),
    });

    const result = await response.json();
    console.log("Registered Successfully!");
    console.log(result);
  };

  const handleSubmitStep2 = () => {
    handleSubmit();
    setStep(3);
  };
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center event">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        className="w-[540px] h-[540px] md:w-[600px] md:h-[600px] rounded-lg shadow-lg flex flex-col justify-center items-center relative p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        {step === 1 && (
          <motion.div
            variants={textVariants}
            className="w-56 md:w-72 mt-2 md:mt-0">
            <h3 className="text-black event font-bold mb-1 md:mb-2">Participant Details</h3>
            <label className="block text-black text-sm md:text-md font-bold mb-1">Name:</label>
            <input
              type="text"
              value={participant.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-transparent border border-black rounded w-full py-1 px-3 text-gray-700"
            />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">College:</label>
            <input
              type="text"
              value={participant.college}
              onChange={(e) => handleChange("college", e.target.value)}
              className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700"
            />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Dept:</label>
            <input
              type="text"
              value={participant.dept}
              onChange={(e) => handleChange("dept", e.target.value)}
              className="bg-transparent border border-black rounded w-full py-1 px-3 text-gray-700"
            />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Phone No:</label>
            <input
              type="text"
              value={participant.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700"
            />

            <label className="block text-black text-sm md:text-md font-bold md:mb-1 mt-2">Email:</label>
            <input
              type="email"
              value={participant.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-transparent border border-black rounded w-full md:py-1 px-3 text-gray-700"
            />

            {error && <div className="text-red-500 text-md font-bold mt-2">{error}</div>}

            <button className="w-full mt-1 md:mt-3 px-3 py-2 bg-amber-400 text-white rounded" onClick={handleNextStep}>
              Proceed to Payment
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            variants={textVariants}
            className="w-64 md:w-72">
            <h3 className="text-black md:text-lg font-bold mb-2">Upload Payment Screenshot</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-black mb-2" />

            {paymentScreenshot ? (
              <p className="text-green-600 text-sm font-semibold">File selected: {paymentScreenshot.name}</p>
            ) : (
              <p className="text-red-500 text-sm font-semibold">Please upload a screenshot</p>
            )}

            <button className="w-64 md:w-72 mt-2 px-4 py-2 bg-red-500 text-black font-semibold rounded" onClick={handleSubmitStep2} disabled={!paymentScreenshot}>
              Submit
            </button>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            variants={textVariants}
            className="w-64 md:w-72">

            <h3 className="text-black md:text-lg font-bold mb-2">Registered Successfully!</h3>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AURegister;

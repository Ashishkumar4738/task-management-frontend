import React from "react";

function Alert(props) {
  // Function to format alert type
  function toUpper() {
    let type = props.alert.type;
    if (props.alert.type === "danger") {
      type = "error";
    } else if (props.alert.type === "warning") {
      // type remains "warning"
    }
    let first = type.charAt(0).toUpperCase();
    let mainType = first + type.slice(1);
    return mainType;
  }

  return (
    <>
      <div className="absolute top-5 right-10 z-50 flex justify-end">
        {props.alert && (
          <div className={`${props.alert.type === 'success' ? "bg-green-300/60 text-green-500 " : props.alert.type === 'warning' ? "bg-yellow-300/60 text-yellow-500 " : "bg-red-300/60 text-red-500"} px-4 py-2 rounded-[20px]`}>
            <strong>{toUpper()}!</strong> {props.alert.message}
          </div>
        )}
      </div>
    </>
  );
}

export default Alert;

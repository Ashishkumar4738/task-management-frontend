import * as React from "react";

export const ViewIcon = ({ className, ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="1.5em"
            height="1.5em"
            className={`w-full h-auto ${className} `}
            {...rest}
            style={{ fill: "#26e07f" }}
        >
            <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
            >
                <path d="M0,32V0H32V32Z" fill="none"></path>
                <g fill="#1fb141">
                    <path d="M16,6C6,6,0,15.938,0,15.938S6,26,16,26s16-10,16-10S26,6,16,6z M16,24c-8.75,0-13.5-8-13.5-8S7.25,8,16,8s13.5,8,13.5,8S24.75,24,16,24z"></path>
                    <circle cx="16" cy="16" r="6"></circle>
                </g>
            </g>
        </svg>
    )


}

export const EditIcon = ({ className, ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="1.5em"
            height="1.5em"
            className={`w-full h-auto ${className} `}
            {...rest}
            style={{ fill: "#000000" }}
        >
            <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
            >
                <path d="M2,31a1,1,0,0,1-1-1.11l.9-8.17a1,1,0,0,1,.29-.6L21.27,2.05a3.56,3.56,0,0,1,5.05,0L30,5.68a3.56,3.56,0,0,1,0,5.05L10.88,29.8a1,1,0,0,1-.6.29L2.11,31Z" fill="#000000" />
                <path d="M26.52,13.74a1,1,0,0,1-.7-.29L18.55,6.18A1,1,0,0,1,20,4.77L27.23,12a1,1,0,0,1,0,1.41A1,1,0,0,1,26.52,13.74Z" fill="#f0f5f1" />
                <rect x="8.29" y="16.28" width="12.84" height="2" transform="rotate(-45 14.71 17.28)" fill="#f0f5f1" />
            </g>
        </svg>)

}


export const DeleteIcon = ({ className, ...rest }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1.5em"
        height="1.5em"
        className={`w-full h-auto ${className}`}
        {...rest}
        style={{ fill: "#ed3b59" }}
      >
        <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
          <path d="M18.9,8H5.1c-0.6,0-1.1,0.5-1,1.1l1.6,13.1c0.1,1,1,1.7,2,1.7h8.5c1,0,1.9-0.7,2-1.7l1.6-13.1C19.9,8.5,19.5,8,18.9,8z" fill="#ed3b59"/>
          <path d="M20,2h-5l0,0c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2l0,0H4C2.9,2,2,2.9,2,4v1c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1V4C22,2.9,21.1,2,20,2z" fill="#ed3b59"/>
        </g>
      </svg>
    );
  };
export * as Icons from "./icons";

export type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

export const Instagram = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={width || size}
    height={height || size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
  </svg>
);

export const LinkedIn = ({ size = 24, height, width, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={width || size}
    height={height || size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const X = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={width || size}
    height={height || size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export const Discord = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    // viewBox="0 0 24 24"
    viewBox="0 0 127.14 96.36"
    width={width || size}
    height={height || size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

export const HeroRadialGradient = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    viewBox="0 0 552 785"
    // width="552"
    // height="785"
    width={width || size}
    height={height || size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_28_36)">
      <ellipse
        cx="621.124"
        cy="249.111"
        rx="621.124"
        ry="249.111"
        transform="matrix(0.669998 -0.742363 0.704071 0.71013 66 369.198)"
        fill="#8B19E5"
        fillOpacity="0.36"
      />
    </g>
    <g filter="url(#filter1_f_28_36)">
      <path
        d="M798.593 -20.1242C828.536 10.7352 743.329 98.6589 636.5 214.5C529.671 330.341 419.943 420.359 390 389.5C360.057 358.641 455.171 296.341 562 180.5C668.829 64.6589 768.65 -50.9836 798.593 -20.1242Z"
        fill="#FFE194"
        fillOpacity="0.64"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_28_36"
        x="0.124161"
        y="-614.702"
        width="1314.84"
        height="1399.4"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="102.85"
          result="effect1_foregroundBlur_28_36"
        />
      </filter>
      <filter
        id="filter1_f_28_36"
        x="254.911"
        y="-154.685"
        width="679.246"
        height="679.808"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="64.75"
          result="effect1_foregroundBlur_28_36"
        />
      </filter>
    </defs>
  </svg>
);

export const BlueBeam = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    // width="1022"
    // height="625"
    width={width || size}
    height={height || size}
    viewBox="0 0 1022 625"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_356_125)">
      <ellipse
        cx="511.5"
        cy="408.5"
        rx="97.5"
        ry="111.5"
        fill="url(#paint0_linear_356_125)"
      />
    </g>
    <g filter="url(#filter1_f_356_125)">
      <path
        d="M539.421 391.5C539.421 424.637 605.5 474 611.421 481.5C611.421 485.5 531.921 424.637 531.921 391.5C522.921 362 522.936 337 525.421 337C527.907 337 539.421 358.363 539.421 391.5Z"
        fill="url(#paint1_linear_356_125)"
      />
    </g>
    <g filter="url(#filter2_f_356_125)">
      <path
        d="M490.606 391.5C490.606 424.637 400.015 473.5 402.5 473.5C402.5 477.5 498.106 424.637 498.106 391.5C507.106 362 507.091 337 504.606 337C502.121 337 490.606 358.363 490.606 391.5Z"
        fill="url(#paint2_linear_356_125)"
      />
    </g>
    <circle
      cx="251.5"
      cy="251.5"
      r="251"
      fill="#020203"
      stroke="url(#paint3_linear_356_125)"
    />
    <circle
      cx="770.5"
      cy="251.5"
      r="251"
      fill="#020203"
      stroke="url(#paint4_linear_356_125)"
    />
    <rect x="241" y="3" width="549" height="249" fill="#020203" />
    <g filter="url(#filter3_f_356_125)">
      <ellipse
        cx="491.007"
        cy="457.651"
        rx="4.05132"
        ry="39.1768"
        transform="rotate(31.0581 491.007 457.651)"
        fill="white"
        fillOpacity="0.72"
      />
    </g>
    <g filter="url(#filter4_f_356_125)">
      <ellipse
        cx="4.05132"
        cy="39.1768"
        rx="4.05132"
        ry="39.1768"
        transform="matrix(-0.856645 0.515907 0.515907 0.856645 509.941 422)"
        fill="white"
        fillOpacity="0.72"
      />
    </g>
    <rect
      x="494"
      y="250"
      width="34"
      height="42"
      fill="url(#paint5_linear_356_125)"
    />
    <defs>
      <filter
        id="filter0_f_356_125"
        x="309"
        y="192"
        width="405"
        height="433"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="52.5"
          result="effect1_foregroundBlur_356_125"
        />
      </filter>
      <filter
        id="filter1_f_356_125"
        x="511.4"
        y="324.4"
        width="112.621"
        height="169.888"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="6.3"
          result="effect1_foregroundBlur_356_125"
        />
      </filter>
      <filter
        id="filter2_f_356_125"
        x="389.85"
        y="324.4"
        width="128.777"
        height="161.914"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="6.3"
          result="effect1_foregroundBlur_356_125"
        />
      </filter>
      <filter
        id="filter3_f_356_125"
        x="452.896"
        y="406.424"
        width="76.2215"
        height="102.454"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="8.8"
          result="effect1_foregroundBlur_356_125"
        />
      </filter>
      <filter
        id="filter4_f_356_125"
        x="488.572"
        y="406.424"
        width="76.2215"
        height="102.454"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="8.8"
          result="effect1_foregroundBlur_356_125"
        />
      </filter>
      <linearGradient
        id="paint0_linear_356_125"
        x1="511"
        y1="316.391"
        x2="511.58"
        y2="520"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.498933" stopColor="#00FFFF" />
        <stop offset="1" stopColor="#0047FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_356_125"
        x1="567.741"
        y1="337"
        x2="567.741"
        y2="481.688"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_356_125"
        x1="462.286"
        y1="337"
        x2="462.286"
        y2="481.688"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_356_125"
        x1="251"
        y1="330"
        x2="462"
        y2="329"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stopColor="#666666" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_356_125"
        x1="770"
        y1="330"
        x2="608"
        y2="339.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop />
        <stop offset="1" stopColor="#666666" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_356_125"
        x1="511"
        y1="250"
        x2="511"
        y2="292"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.232551" stopColor="#020203" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const Logo = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    // width="67"
    // height="32"
    width={width || size}
    height={height || size}
    viewBox="0 0 67 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 6.24C0 2.79374 2.79374 0 6.24 0V13V19.5V22.75V23V26H0V6.24Z"
      fill="white"
    />
    <path
      d="M7.59229 0.47763C7.59229 0.213842 7.80613 0 8.06991 0H10.8163C12.5969 0 14.0403 1.44343 14.0403 3.224C14.0403 5.00457 12.5969 6.448 10.8163 6.448H8.06992C7.80613 6.448 7.59229 6.23416 7.59229 5.97037V0.47763Z"
      fill="white"
    />
    <path
      d="M7.59229 12.2407C7.59229 10.4774 9.05332 9.04797 10.8166 9.04797C12.5795 9.04797 14.0403 10.4771 14.0403 12.2401V12.3352C14.0403 14.0808 12.6094 15.496 10.8638 15.496C9.06593 15.496 7.59229 14.0385 7.59229 12.2407Z"
      fill="white"
    />
    <path
      d="M6.35 26L9.808 16.984H12.594L16.052 26H13.308L12.552 24.082H9.836L9.094 26H6.35ZM10.186 22.192H12.202L11.194 19.546L10.186 22.192ZM19.6328 26.14C19.0262 26.14 18.4522 26.0933 17.9108 26C17.3695 25.8973 16.9075 25.7573 16.5248 25.58V23.41C16.9448 23.606 17.4115 23.7647 17.9248 23.886C18.4382 24.0073 18.9188 24.068 19.3668 24.068C19.8335 24.068 20.1835 24.0307 20.4168 23.956C20.6595 23.872 20.7808 23.69 20.7808 23.41C20.7808 23.214 20.7108 23.06 20.5708 22.948C20.4402 22.836 20.2302 22.7333 19.9408 22.64C19.6608 22.5467 19.2922 22.43 18.8348 22.29C18.2282 22.094 17.7475 21.8793 17.3928 21.646C17.0382 21.4127 16.7815 21.128 16.6228 20.792C16.4735 20.456 16.3988 20.0453 16.3988 19.56C16.3988 18.6733 16.7115 18.0013 17.3368 17.544C17.9715 17.0773 18.9095 16.844 20.1508 16.844C20.6455 16.844 21.1542 16.886 21.6768 16.97C22.2088 17.054 22.6382 17.1473 22.9648 17.25V19.434C22.5262 19.2567 22.1062 19.1307 21.7048 19.056C21.3035 18.9813 20.9255 18.944 20.5708 18.944C20.1602 18.944 19.8102 18.9767 19.5208 19.042C19.2315 19.1073 19.0868 19.2753 19.0868 19.546C19.0868 19.7793 19.2082 19.952 19.4508 20.064C19.7028 20.1667 20.1462 20.302 20.7808 20.47C21.5182 20.666 22.0782 20.904 22.4608 21.184C22.8528 21.464 23.1188 21.7907 23.2588 22.164C23.3988 22.528 23.4688 22.9433 23.4688 23.41C23.4688 24.2313 23.1515 24.894 22.5168 25.398C21.8822 25.8927 20.9208 26.14 19.6328 26.14ZM26.4185 26V18.944H23.8845V16.984H31.5845V18.944H29.0505V26H26.4185ZM32.2784 26V16.984H34.9104V23.984H38.9704V26H32.2784ZM39.3949 26L42.8529 16.984H45.6389L49.0969 26H46.3529L45.5969 24.082H42.8809L42.1389 26H39.3949ZM43.2309 22.192H45.2469L44.2389 19.546L43.2309 22.192ZM50.0792 26V16.984H52.3192L55.7212 21.758V16.984H58.3532V26H56.0992L52.7112 21.24V26H50.0792ZM59.6085 26V16.984H66.4405V19H62.2405V20.47H65.9225V22.514H62.2405V23.984H66.4405V26H59.6085Z"
      fill="url(#paint0_linear_123_154)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_123_154"
        x1="6"
        y1="21.5"
        x2="67"
        y2="21.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.352922" stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const LogoSM = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    // width="15"
    // height="26"
    width={width || size}
    height={height || size}
    viewBox="0 0 15 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 6.24C0 2.79374 2.79374 0 6.24 0V13V19.5V22.75V23V26H0V6.24Z"
      fill="white"
    />
    <path
      d="M7.59229 0.47763C7.59229 0.213842 7.80613 0 8.06991 0H10.8163C12.5969 0 14.0403 1.44343 14.0403 3.224C14.0403 5.00457 12.5969 6.448 10.8163 6.448H8.06992C7.80613 6.448 7.59229 6.23416 7.59229 5.97037V0.47763Z"
      fill="white"
    />
    <path
      d="M7.59229 12.2407C7.59229 10.4774 9.05332 9.04797 10.8166 9.04797C12.5795 9.04797 14.0403 10.4771 14.0403 12.2401V12.3352C14.0403 14.0808 12.6094 15.496 10.8638 15.496C9.06593 15.496 7.59229 14.0385 7.59229 12.2407Z"
      fill="white"
    />
  </svg>
);

export const LogoLG = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    // width="190"
    // height="78"
    viewBox="0 0 190 78"
    width={width || size}
    height={height || size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.00012207 17.52C0.00012207 7.84397 7.8441 0 17.5201 0V36.5V54.75V63.875V64.5769V73H0.00012207V17.52Z"
      fill="white"
    />
    <path
      d="M21.3164 1.34104C21.3164 0.600403 21.9168 0 22.6574 0H30.3684C35.3677 0 39.4204 4.05272 39.4204 9.052C39.4204 14.0513 35.3677 18.104 30.3684 18.104H22.6574C21.9168 18.104 21.3164 17.5036 21.3164 16.763V1.34104Z"
      fill="white"
    />
    <path
      d="M21.3164 34.3662C21.3164 29.4155 25.4185 25.4021 30.3693 25.4021C35.3191 25.4021 39.4204 29.4147 39.4204 34.3645V34.6316C39.4204 39.5328 35.403 43.5061 30.5018 43.5061C25.4539 43.5061 21.3164 39.414 21.3164 34.3662Z"
      fill="white"
    />
    <path
      d="M20.9001 73L29.7921 49.816H36.9561L45.8481 73H38.7921L36.8481 68.068H29.8641L27.9561 73H20.9001ZM30.7641 63.208H35.9481L33.3561 56.404L30.7641 63.208ZM55.056 73.36C53.496 73.36 52.02 73.24 50.628 73C49.236 72.736 48.048 72.376 47.064 71.92V66.34C48.144 66.844 49.344 67.252 50.664 67.564C51.984 67.876 53.22 68.032 54.372 68.032C55.572 68.032 56.472 67.936 57.072 67.744C57.696 67.528 58.008 67.06 58.008 66.34C58.008 65.836 57.828 65.44 57.468 65.152C57.132 64.864 56.592 64.6 55.848 64.36C55.128 64.12 54.18 63.82 53.004 63.46C51.444 62.956 50.208 62.404 49.296 61.804C48.384 61.204 47.724 60.472 47.316 59.608C46.932 58.744 46.74 57.688 46.74 56.44C46.74 54.16 47.544 52.432 49.152 51.256C50.784 50.056 53.196 49.456 56.388 49.456C57.66 49.456 58.968 49.564 60.312 49.78C61.68 49.996 62.784 50.236 63.624 50.5V56.116C62.496 55.66 61.416 55.336 60.384 55.144C59.352 54.952 58.38 54.856 57.468 54.856C56.412 54.856 55.512 54.94 54.768 55.108C54.024 55.276 53.652 55.708 53.652 56.404C53.652 57.004 53.964 57.448 54.588 57.736C55.236 58 56.376 58.348 58.008 58.78C59.904 59.284 61.344 59.896 62.328 60.616C63.336 61.336 64.02 62.176 64.38 63.136C64.74 64.072 64.92 65.14 64.92 66.34C64.92 68.452 64.104 70.156 62.472 71.452C60.84 72.724 58.368 73.36 55.056 73.36ZM72.5047 73V54.856H65.9887V49.816H85.7887V54.856H79.2727V73H72.5047ZM87.5732 73V49.816H94.3412V67.816H104.781V73H87.5732ZM105.873 73L114.765 49.816H121.929L130.821 73H123.765L121.821 68.068H114.837L112.929 73H105.873ZM115.737 63.208H120.921L118.329 56.404L115.737 63.208ZM133.347 73V49.816H139.107L147.855 62.092V49.816H154.623V73H148.827L140.115 60.76V73H133.347ZM157.851 73V49.816H175.419V55H164.619V58.78H174.087V64.036H164.619V67.816H175.419V73H157.851Z"
      fill="url(#paint0_linear_123_113)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_123_113"
        x1="20.0001"
        y1="55.5"
        x2="190"
        y2="55.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.352922" stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const FooterGradient = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    // width="1200"
    // height="576"
    viewBox="0 0 1200 576"
    width={width || size}
    height={height || size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_71_104)">
      <path
        d="M-378.75 634.722C-361.491 694.666 88.7028 617.668 304.082 555.656C519.46 493.643 990.216 305.481 972.958 245.537C955.699 185.594 456.96 276.569 241.581 338.581C26.2025 400.593 -396.009 574.779 -378.75 634.722Z"
        fill="url(#paint0_radial_71_104)"
        fillOpacity="0.4"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_71_104"
        x="-605.163"
        y="0.0384827"
        width="1804.48"
        height="882.246"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="112.95"
          result="effect1_foregroundBlur_71_104"
        />
      </filter>
      <radialGradient
        id="paint0_radial_71_104"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(297.104 440.13) rotate(73.9378) scale(112.946 703.31)"
      >
        <stop offset="0.566027" stopColor="#D706C9" />
        <stop offset="0.66194" stopColor="#93F2FF" />
        <stop offset="0.805" stopColor="#26E5FF" />
      </radialGradient>
    </defs>
  </svg>
);

export const Cube3DLine = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    // width="37"
    // height="37"
    width={width || size}
    height={height || size}
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_21_11)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.8701 3.72335C18.0997 3.59079 18.3602 3.521 18.6253 3.521C18.8905 3.521 19.1509 3.59079 19.3805 3.72335L22.4014 5.46788C22.7455 5.6696 22.9958 5.99923 23.0977 6.38483C23.1997 6.77043 23.145 7.18071 22.9455 7.52612C22.7461 7.87153 22.4182 8.12404 22.0332 8.22855C21.6483 8.33305 21.2377 8.28106 20.891 8.08392L20.1357 7.64741V9.56262C20.1357 9.96321 19.9766 10.3474 19.6934 10.6306C19.4101 10.9139 19.0259 11.073 18.6253 11.073C18.2247 11.073 17.8406 10.9139 17.5573 10.6306C17.274 10.3474 17.1149 9.96321 17.1149 9.56262V7.64741L16.3597 8.08392C16.013 8.28106 15.6024 8.33305 15.2174 8.22855C14.8325 8.12404 14.5046 7.87153 14.3051 7.52612C14.1057 7.18071 14.051 6.77043 14.1529 6.38483C14.2549 5.99923 14.5052 5.6696 14.8493 5.46788L17.8701 3.72335ZM11.182 9.32851C11.3823 9.67542 11.4366 10.0877 11.3329 10.4746C11.2292 10.8615 10.9761 11.1914 10.6292 11.3917L9.87398 11.8282L11.5324 12.7859C11.7056 12.8843 11.8576 13.016 11.9796 13.1735C12.1016 13.3309 12.1913 13.5109 12.2435 13.7031C12.2957 13.8954 12.3094 14.096 12.2837 14.2936C12.258 14.4911 12.1935 14.6816 12.0939 14.8541C11.9943 15.0266 11.8616 15.1777 11.7034 15.2987C11.5451 15.4197 11.3645 15.5082 11.1719 15.5591C10.9794 15.61 10.7786 15.6224 10.5813 15.5954C10.3839 15.5684 10.1938 15.5026 10.022 15.4019L8.36356 14.4443V15.3158C8.36356 15.7164 8.20443 16.1006 7.92117 16.3838C7.63791 16.6671 7.25373 16.8262 6.85314 16.8262C6.45256 16.8262 6.06838 16.6671 5.78512 16.3838C5.50186 16.1006 5.34273 15.7164 5.34273 15.3158V11.8282C5.343 11.5634 5.41292 11.3032 5.54547 11.0739C5.67803 10.8446 5.86855 10.6542 6.09794 10.5217L9.11877 8.77721C9.46568 8.57692 9.87794 8.52264 10.2649 8.62632C10.6518 8.72999 10.9817 8.98312 11.182 9.33002V9.32851ZM26.0687 9.32851C26.269 8.98161 26.5989 8.72848 26.9858 8.62481C27.3727 8.52113 27.785 8.57541 28.1319 8.7757L31.1527 10.5202C31.3823 10.6528 31.573 10.8435 31.7056 11.0731C31.8381 11.3027 31.9079 11.5631 31.9079 11.8282V15.3173C31.9079 15.7179 31.7488 16.1021 31.4655 16.3853C31.1823 16.6686 30.7981 16.8277 30.3975 16.8277C29.9969 16.8277 29.6128 16.6686 29.3295 16.3853C29.0462 16.1021 28.8871 15.7179 28.8871 15.3173V14.4443L27.2287 15.4019C26.8819 15.599 26.4713 15.651 26.0864 15.5465C25.7015 15.442 25.3735 15.1895 25.1741 14.8441C24.9747 14.4987 24.9199 14.0884 25.0219 13.7028C25.1238 13.3172 25.3742 12.9876 25.7183 12.7859L27.3767 11.8282L26.6215 11.3917C26.2746 11.1914 26.0214 10.8615 25.9178 10.4746C25.8141 10.0877 25.8684 9.67542 26.0687 9.32851ZM13.3932 15.6043C13.5935 15.2574 13.9234 15.0043 14.3104 14.9006C14.6973 14.7969 15.1096 14.8512 15.4565 15.0515L18.6253 16.8806L21.7942 15.0515C22.1409 14.8543 22.5515 14.8024 22.9365 14.9069C23.3214 15.0114 23.6493 15.2639 23.8488 15.6093C24.0482 15.9547 24.1029 16.365 24.001 16.7506C23.899 17.1362 23.6487 17.4658 23.3046 17.6675L20.1357 19.4966V23.1564C20.1357 23.557 19.9766 23.9411 19.6934 24.2244C19.4101 24.5077 19.0259 24.6668 18.6253 24.6668C18.2247 24.6668 17.8406 24.5077 17.5573 24.2244C17.274 23.9411 17.1149 23.557 17.1149 23.1564V19.4966L13.9461 17.6675C13.5992 17.4672 13.346 17.1373 13.2424 16.7504C13.1387 16.3635 13.193 15.9512 13.3932 15.6043ZM6.85314 20.4225C7.25373 20.4225 7.63791 20.5816 7.92117 20.8649C8.20443 21.1482 8.36356 21.5323 8.36356 21.9329V22.806L10.022 21.8483C10.3687 21.6512 10.7794 21.5992 11.1643 21.7037C11.5492 21.8082 11.8772 22.0607 12.0766 22.4062C12.276 22.7516 12.3307 23.1618 12.2288 23.5474C12.1268 23.933 11.8765 24.2627 11.5324 24.4644L9.87398 25.422L10.6292 25.8585C10.8023 25.957 10.9543 26.0887 11.0764 26.2461C11.1984 26.4035 11.2881 26.5836 11.3403 26.7758C11.3925 26.968 11.4061 27.1687 11.3805 27.3662C11.3548 27.5637 11.2903 27.7543 11.1907 27.9268C11.0911 28.0993 10.9584 28.2504 10.8001 28.3714C10.6419 28.4924 10.4613 28.5809 10.2687 28.6318C10.0761 28.6827 9.8754 28.695 9.67804 28.668C9.48068 28.641 9.29061 28.5753 9.11877 28.4745L6.09794 26.73C5.86833 26.5974 5.67766 26.4068 5.54509 26.1772C5.41253 25.9476 5.34273 25.6871 5.34273 25.422V21.9329C5.34273 21.5323 5.50186 21.1482 5.78512 20.8649C6.06838 20.5816 6.45256 20.4225 6.85314 20.4225ZM30.3975 20.4225C30.7981 20.4225 31.1823 20.5816 31.4655 20.8649C31.7488 21.1482 31.9079 21.5323 31.9079 21.9329V25.422C31.9079 25.6871 31.8381 25.9476 31.7056 26.1772C31.573 26.4068 31.3823 26.5974 31.1527 26.73L28.1319 28.4745C27.9601 28.5753 27.77 28.641 27.5726 28.668C27.3753 28.695 27.1745 28.6827 26.9819 28.6318C26.7894 28.5809 26.6088 28.4924 26.4505 28.3714C26.2923 28.2504 26.1596 28.0993 26.06 27.9268C25.9604 27.7543 25.8959 27.5637 25.8702 27.3662C25.8445 27.1687 25.8582 26.968 25.9104 26.7758C25.9626 26.5836 26.0522 26.4035 26.1743 26.2461C26.2963 26.0887 26.4483 25.957 26.6215 25.8585L27.3767 25.422L25.7183 24.4644C25.5451 24.3659 25.3931 24.2342 25.2711 24.0768C25.149 23.9193 25.0593 23.7393 25.0071 23.5471C24.9549 23.3549 24.9413 23.1542 24.967 22.9567C24.9926 22.7591 25.0571 22.5686 25.1567 22.3961C25.2563 22.2236 25.3891 22.0725 25.5473 21.9515C25.7055 21.8305 25.8861 21.742 26.0787 21.6911C26.2713 21.6402 26.472 21.6279 26.6694 21.6549C26.8668 21.6819 27.0568 21.7476 27.2287 21.8483L28.8871 22.806V21.9344C28.8871 21.5339 29.0462 21.1497 29.3295 20.8664C29.6128 20.5832 29.9969 20.424 30.3975 20.424V20.4225ZM18.6253 26.1772C19.0259 26.1772 19.4101 26.3363 19.6934 26.6196C19.9766 26.9028 20.1357 27.287 20.1357 27.6876V29.6028L20.891 29.1663C21.0628 29.0656 21.2529 28.9998 21.4502 28.9728C21.6476 28.9459 21.8483 28.9582 22.0409 29.0091C22.2335 29.06 22.4141 29.1485 22.5723 29.2695C22.7306 29.3905 22.8633 29.5416 22.9629 29.7141C23.0625 29.8866 23.127 30.0771 23.1527 30.2746C23.1783 30.4722 23.1647 30.6728 23.1125 30.8651C23.0603 31.0573 22.9706 31.2373 22.8486 31.3947C22.7265 31.5522 22.5745 31.6839 22.4014 31.7824L19.3805 33.5269C19.1509 33.6595 18.8905 33.7292 18.6253 33.7292C18.3602 33.7292 18.0997 33.6595 17.8701 33.5269L14.8493 31.7824C14.6761 31.6839 14.5241 31.5522 14.4021 31.3947C14.2801 31.2373 14.1904 31.0573 14.1382 30.8651C14.086 30.6728 14.0723 30.4722 14.098 30.2746C14.1237 30.0771 14.1882 29.8866 14.2878 29.7141C14.3874 29.5416 14.5201 29.3905 14.6783 29.2695C14.8366 29.1485 15.0172 29.06 15.2098 29.0091C15.4023 28.9582 15.6031 28.9459 15.8004 28.9728C15.9978 28.9998 16.1879 29.0656 16.3597 29.1663L17.1149 29.6028V27.6876C17.1149 27.287 17.274 26.9028 17.5573 26.6196C17.8406 26.3363 18.2247 26.1772 18.6253 26.1772Z"
        fill="#4D4D4D"
      />
    </g>
    <defs>
      <clipPath id="clip0_21_11">
        <rect
          width="36.25"
          height="36.25"
          fill="white"
          transform="translate(0.500336 0.500122)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const Ellipse = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    // width="942"
    // height="422"
    width={width || size}
    height={height || size}
    viewBox="0 0 942 422"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.9255 345.306C9.28008 367.467 28.3337 384.927 57.5093 397.482C86.6805 410.036 125.898 417.651 172.427 420.159C265.478 425.175 387.654 409.757 516.886 372.7C646.119 335.643 757.9 283.975 834.154 230.412C872.284 203.629 901.507 176.388 919.593 150.284C937.682 124.175 944.588 99.2715 938.233 77.1104C931.879 54.9494 912.825 37.4891 883.649 24.9337C854.478 12.3802 815.26 4.76459 768.732 2.25659C675.68 -2.75914 553.505 12.6591 424.272 49.716C295.039 86.773 183.258 138.441 107.004 192.004C68.875 218.787 39.652 246.028 21.5657 272.132C3.47678 298.241 -3.42907 323.145 2.9255 345.306Z"
      stroke="url(#paint0_linear_71_105)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_71_105"
        x1="424.192"
        y1="49.2189"
        x2="517.082"
        y2="373.164"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity="0" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
);

export const GradientBall1 = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    // width="219"
    // height="219"
    width={width || size}
    height={height || size}
    viewBox="0 0 219 219"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_23_50)">
      <rect
        x="218.618"
        y="171.305"
        width="177"
        height="177"
        rx="88.5"
        transform="rotate(164.496 218.618 171.305)"
        fill="#010101"
      />
      <g filter="url(#filter0_f_23_50)">
        <path
          d="M23.1182 160.118C15.7367 133.509 45.994 6.96849 72.6034 -0.412989C99.2128 -7.79446 156.882 -5.23087 164.264 21.3785C171.645 47.9879 124.263 58.9379 97.6532 66.3194C71.0438 73.7008 30.4997 186.728 23.1182 160.118Z"
          fill="#4200F2"
          fillOpacity="0.63"
        />
      </g>
      <g filter="url(#filter1_f_23_50)">
        <path
          d="M15.9107 256.109C11.5381 240.346 34.2724 189.234 50.5671 184.714C66.8618 180.194 102.081 181.419 106.454 197.182C110.826 212.944 81.822 219.69 65.5272 224.21C49.2325 228.731 20.2832 271.871 15.9107 256.109Z"
          fill="#4200F2"
        />
      </g>
      <g filter="url(#filter2_f_23_50)">
        <path
          d="M6.45675 81.7405C4.04052 73.0302 17.4302 44.7266 25.7177 42.4276C34.0052 40.1286 57.5387 20.8484 59.9549 29.5586C62.3711 38.2689 54.7341 68.3483 46.4466 70.6472C38.1591 72.9462 8.87299 90.4507 6.45675 81.7405Z"
          fill="#D706C9"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_23_50"
        x="-32.2099"
        y="-58.1915"
        width="251.445"
        height="276.557"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="27.1"
          result="effect1_foregroundBlur_23_50"
        />
      </filter>
      <filter
        id="filter1_f_23_50"
        x="-38.8374"
        y="128.227"
        width="199.935"
        height="185.529"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="27.1"
          result="effect1_foregroundBlur_23_50"
        />
      </filter>
      <filter
        id="filter2_f_23_50"
        x="-22.1304"
        y="-0.986828"
        width="110.839"
        height="113.44"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.15"
          result="effect1_foregroundBlur_23_50"
        />
      </filter>
      <clipPath id="clip0_23_50">
        <rect
          x="218.618"
          y="171.305"
          width="177"
          height="177"
          rx="88.5"
          transform="rotate(164.496 218.618 171.305)"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export const GradientBall2 = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    // width="328"
    // height="328"
    viewBox="0 0 328 328"
    width={width || size}
    height={height || size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_23_54)">
      <rect
        x="44.3699"
        y="126.409"
        width="177"
        height="177"
        rx="88.5"
        transform="rotate(-27.613 44.3699 126.409)"
        fill="#B34FA4"
      />
      <g filter="url(#filter0_f_23_54)">
        <path
          d="M252.514 134.902C265.313 159.371 247.626 250.877 223.157 263.676C198.688 276.476 141.764 286.066 128.965 261.597C116.166 237.128 160.197 216.483 184.666 203.684C209.135 190.884 239.715 110.433 252.514 134.902Z"
          fill="#4200F2"
          fillOpacity="0.63"
        />
      </g>
      <g filter="url(#filter1_f_23_54)">
        <path
          d="M224.778 0.969482C232.36 15.4641 220.853 70.2081 205.869 78.0459C190.885 85.8836 156.192 92.0736 148.611 77.579C141.029 63.0843 167.973 50.4041 182.957 42.5663C197.941 34.7286 217.196 -13.5252 224.778 0.969482Z"
          fill="#4200F2"
        />
      </g>
      <g filter="url(#filter2_f_23_54)">
        <path
          d="M266.556 156.849C271.086 165.51 257.965 201.286 247.462 206.779C236.959 212.273 209.131 241.824 204.601 233.163C200.071 224.503 205.374 188.852 215.877 183.359C226.38 177.865 262.026 148.189 266.556 156.849Z"
          fill="#F5AE33"
        />
      </g>
    </g>
    <g filter="url(#filter3_f_23_54)">
      <path
        d="M243.649 185.45C246.34 190.594 245.299 208.313 241.898 210.092C238.497 211.871 231.149 224.621 228.459 219.476C225.768 214.332 223.837 195.813 227.238 194.034C230.639 192.255 240.958 180.306 243.649 185.45Z"
        fill="#F5AE33"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_23_54"
        x="72.4793"
        y="76.0993"
        width="238.517"
        height="254.851"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="27.1"
          result="effect1_foregroundBlur_23_54"
        />
      </filter>
      <filter
        id="filter1_f_23_54"
        x="93.0923"
        y="-55.9288"
        width="188.284"
        height="196.449"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="27.1"
          result="effect1_foregroundBlur_23_54"
        />
      </filter>
      <filter
        id="filter2_f_23_54"
        x="174.674"
        y="126.977"
        width="121.103"
        height="136.065"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.15"
          result="effect1_foregroundBlur_23_54"
        />
      </filter>
      <filter
        id="filter3_f_23_54"
        x="197.12"
        y="155.874"
        width="76.3562"
        height="93.1171"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.15"
          result="effect1_foregroundBlur_23_54"
        />
      </filter>
      <clipPath id="clip0_23_54">
        <rect
          x="44.3699"
          y="126.409"
          width="177"
          height="177"
          rx="88.5"
          transform="rotate(-27.613 44.3699 126.409)"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export const ArrowUp = ({ size = 24, width, height, ...props }: IconProps) => (
  <svg
    // width="82"
    // height="85"
    width={width || size}
    height={height || size}
    viewBox="0 0 82 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_312_172)">
      <g filter="url(#filter1_i_312_172)">
        <rect x="5" width="72" height="72" rx="26" fill="white" />
      </g>
      <g filter="url(#filter2_i_312_172)">
        <path
          d="M57.9422 38.0877L43.1997 20.8837C42.9621 20.6065 42.6673 20.384 42.3356 20.2315C42.0039 20.079 41.6432 20 41.2781 20C40.913 20 40.5523 20.079 40.2206 20.2315C39.8889 20.384 39.5941 20.6065 39.3565 20.8837L24.614 38.0877C23.2071 39.7299 24.3736 42.2664 26.5357 42.2664H56.0247C58.1868 42.2664 59.3533 39.7299 57.9422 38.0877Z"
          fill="black"
          fillOpacity="0.23"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_312_172"
        x="0.9"
        y="0"
        width="80.2"
        height="84.1"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="2.05" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_312_172"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_312_172"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_312_172"
        x="5"
        y="-1.9"
        width="72"
        height="73.9"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-6" />
        <feGaussianBlur stdDeviation="0.95" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.41 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_312_172"
        />
      </filter>
      <filter
        id="filter2_i_312_172"
        x="24"
        y="20"
        width="34.559"
        height="26.2666"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_312_172"
        />
      </filter>
    </defs>
  </svg>
);

export const ArrowDown = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    // width="82"
    // height="85"
    width={width || size}
    height={height || size}
    viewBox="0 0 82 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_312_174)">
      <g filter="url(#filter1_i_312_174)">
        <rect x="5" width="72" height="72" rx="26" fill="white" />
      </g>
      <g filter="url(#filter2_i_312_174)">
        <path
          d="M24.6168 28.1789L39.3592 45.3829C39.5969 45.6601 39.8916 45.8826 40.2233 46.0351C40.555 46.1876 40.9158 46.2666 41.2809 46.2666C41.6459 46.2666 42.0067 46.1876 42.3384 46.0351C42.6701 45.8826 42.9649 45.6601 43.2025 45.3829L57.9449 28.1789C59.3519 26.5367 58.1854 24.0002 56.0233 24.0002L26.5342 24.0002C24.3721 24.0002 23.2056 26.5367 24.6168 28.1789Z"
          fill="black"
          fillOpacity="0.23"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_312_174"
        x="0.9"
        y="0"
        width="80.2"
        height="84.1"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="2.05" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_312_174"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_312_174"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_312_174"
        x="5"
        y="-1.9"
        width="72"
        height="73.9"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-6" />
        <feGaussianBlur stdDeviation="0.95" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.41 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_312_174"
        />
      </filter>
      <filter
        id="filter2_i_312_174"
        x="24"
        y="24"
        width="34.559"
        height="26.2666"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_312_174"
        />
      </filter>
    </defs>
  </svg>
);

export const ArrowLeft = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    // width="82"
    // height="85"
    width={width || size}
    height={height || size}
    viewBox="0 0 82 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_312_175)">
      <g filter="url(#filter1_i_312_175)">
        <rect x="5" width="72" height="72" rx="26" fill="white" />
      </g>
      <g filter="url(#filter2_i_312_175)">
        <path
          d="M45.234 14.4709L28.0299 29.2133C27.7528 29.451 27.5303 29.7458 27.3777 30.0774C27.2252 30.4091 27.1462 30.7699 27.1462 31.135C27.1462 31.5001 27.2252 31.8608 27.3777 32.1925C27.5303 32.5242 27.7528 32.819 28.0299 33.0566L45.234 47.799C46.8761 49.206 49.4126 48.0395 49.4126 45.8774V16.3884C49.4126 14.2262 46.8761 13.0598 45.234 14.4709Z"
          fill="black"
          fillOpacity="0.23"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_312_175"
        x="0.9"
        y="0"
        width="80.2"
        height="84.1"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="2.05" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_312_175"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_312_175"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_312_175"
        x="5"
        y="-1.9"
        width="72"
        height="73.9"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-6" />
        <feGaussianBlur stdDeviation="0.95" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.41 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_312_175"
        />
      </filter>
      <filter
        id="filter2_i_312_175"
        x="27.1462"
        y="13.8545"
        width="22.2664"
        height="38.5586"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_312_175"
        />
      </filter>
    </defs>
  </svg>
);

export const ArrowRight = ({
  size = 24,
  width,
  height,
  ...props
}: IconProps) => (
  <svg
    // width="82"
    // height="85"
    width={width || size}
    height={height || size}
    viewBox="0 0 82 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_312_171)">
      <g filter="url(#filter1_i_312_171)">
        <rect x="5" width="72" height="72" rx="26" fill="white" />
      </g>
      <g filter="url(#filter2_i_312_171)">
        <path
          d="M36.9123 47.9422L54.1163 33.1997C54.3935 32.9621 54.616 32.6673 54.7685 32.3356C54.921 32.0039 55 31.6432 55 31.2781C55 30.913 54.921 30.5523 54.7685 30.2206C54.616 29.8889 54.3935 29.5941 54.1163 29.3565L36.9123 14.614C35.2701 13.2071 32.7336 14.3736 32.7336 16.5357V46.0247C32.7336 48.1868 35.2701 49.3533 36.9123 47.9422Z"
          fill="black"
          fillOpacity="0.23"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_312_171"
        x="0.9"
        y="0"
        width="80.2"
        height="84.1"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="2.05" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_312_171"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_312_171"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_312_171"
        x="5"
        y="-1.9"
        width="72"
        height="73.9"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-6" />
        <feGaussianBlur stdDeviation="0.95" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.41 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_312_171"
        />
      </filter>
      <filter
        id="filter2_i_312_171"
        x="32.7336"
        y="14"
        width="22.2664"
        height="38.5586"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_312_171"
        />
      </filter>
    </defs>
  </svg>
);

export {
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  X as XIcon,
  X as Twitter,
  X as TwitterIcon,
  Discord as DiscordIcon,
  HeroRadialGradient as HeroRadialGradientIcon,
  BlueBeam as BlueBeamIcon,
  Logo as LogoIcon,
  LogoSM as LogoSMIcon,
  LogoLG as LogoLGIcon,
  FooterGradient as FooterGradientIcon,
  Cube3DLine as Cube3DLineIcon,
  Ellipse as EllipseIcon,
  GradientBall1 as GradientBall1Icon,
  GradientBall2 as GradientBall2Icon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
};

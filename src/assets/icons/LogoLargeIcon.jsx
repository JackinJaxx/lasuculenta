import PropTypes from "prop-types";

const LogoLargeIcon = ({ color = "#3A3A3A", width = "100%" }) => {
  return (
    <svg
      width={width}
      style={{ maxWidth: "450px", maxHeight: "170px" }}
      height="170"
      viewBox="0 0 450 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M84.2614 97.3069L74.4238 122.115H4.4198V117.41C9.26732 117.41 12.7841 116.697 14.9703 115.271C16.5862 114.131 17.3941 112.135 17.3941 109.283V35.2871C17.3941 32.1505 16.6336 30.0119 15.1129 28.8713C13.3069 27.6357 9.74259 27.0178 4.4198 27.0178V22.4554H40.4911V27.0178C34.2178 27.0178 30.3208 27.6357 28.8 28.8713C27.2792 30.1069 26.5188 32.2455 26.5188 35.2871V109.426C26.5188 112.277 27.1366 114.273 28.3723 115.414C29.798 116.554 32.1742 117.125 35.501 117.125H51.3267C57.7902 117.125 63.2081 115.366 67.5802 111.849C72.1426 108.618 76.5147 103.152 80.697 95.4534L84.2614 97.3069Z"
        fill={color}
      />
      <path
        d="M121.687 123.184C121.687 131.929 118.741 138.725 112.848 143.572C107.239 148.61 99.6358 151.129 90.0356 151.129C86.8041 151.129 83.287 150.749 79.4851 149.988C75.6833 149.228 72.119 148.135 68.7921 146.709C67.1761 147.184 65.5605 147.707 63.9445 148.277C62.4239 148.847 60.9982 149.513 59.6673 150.273C57.9564 145.711 56.1979 141.243 54.3921 136.871C52.6812 132.499 50.9703 128.032 49.2594 123.469C49.9246 123.089 50.5426 122.756 51.1129 122.471C51.6832 122.091 52.3011 121.758 52.9663 121.473C57.6236 128.982 62.1388 134.353 66.5109 137.584C67.9366 138.725 69.5998 139.77 71.501 140.721C73.497 141.671 75.5407 142.479 77.6317 143.145C79.7226 143.905 81.814 144.475 83.9049 144.855C85.9959 145.235 87.897 145.426 89.6079 145.426C93.2199 145.426 96.4515 144.95 99.303 144C102.154 143.05 104.531 141.719 106.432 140.008C110.424 136.301 112.42 131.406 112.42 125.323C112.42 123.042 111.897 120.808 110.851 118.622C109.806 116.341 108.428 114.487 106.717 113.061C102.915 110.02 95.4535 106.598 84.3327 102.796C75.4931 99.6594 68.5069 96.0001 63.3743 91.8178C56.5307 86.5902 53.1089 80.2216 53.1089 72.7129C53.1089 65.0138 55.8655 58.8355 61.3782 54.1782C66.7011 49.5209 73.6396 47.1921 82.1941 47.1921C86.281 47.1921 90.2731 47.7624 94.1703 48.903C95.216 49.283 96.214 49.6635 97.1644 50.0436C98.21 50.4236 99.1604 50.8041 100.016 51.1842L108.57 48.3327C110.281 52.7048 111.992 57.0297 113.703 61.3069C115.414 65.5841 117.125 69.909 118.836 74.2812C117.79 74.7566 116.745 75.2792 115.699 75.8495C111.707 69.0059 107.145 63.5881 102.012 59.596C95.8335 55.0337 89.1802 52.7525 82.0515 52.7525C79.58 52.7525 77.2989 53.1325 75.2079 53.8931C73.117 54.5583 71.2158 55.4614 69.5049 56.602C67.1289 58.218 65.2754 60.2612 63.9445 62.7327C62.6137 65.2041 61.9485 68.1028 61.9485 71.4297C61.9485 76.8475 64.7523 81.3622 70.3604 84.9742C73.2119 86.6851 75.9685 88.1585 78.6297 89.394C81.2909 90.5346 84.7127 91.7701 88.895 93.101C94.6929 95.0021 99.5881 96.9505 103.58 98.9465C107.572 100.943 110.757 102.891 113.133 104.792C118.836 109.354 121.687 115.485 121.687 123.184Z"
        fill={color}
      />
      <path
        d="M173.317 145.96C171.475 145.96 169.663 146.02 167.881 146.139C166.099 146.317 164.317 146.554 162.535 146.851C162.475 146.079 162.416 145.307 162.356 144.535C162.356 143.822 162.327 143.109 162.267 142.396C158.406 146.198 153.505 148.099 147.564 148.099C144.475 148.099 142.01 147.445 140.168 146.139C137.436 144.297 136.069 141.267 136.069 137.049V113.436C136.069 112.188 135.772 111.356 135.178 110.941C134.168 110.347 132.653 110.049 130.634 110.049C130.574 109.752 130.545 109.456 130.545 109.158C130.545 108.802 130.515 108.475 130.455 108.178C132.357 107.525 134.198 106.901 135.98 106.307C137.822 105.713 139.664 105.119 141.505 104.525V136.604C141.505 141.297 144.119 143.643 149.347 143.643C154.752 143.643 159.059 142.129 162.267 139.099V113.257C162.267 112.485 161.97 111.921 161.376 111.564C160.426 110.436 158.94 109.871 156.921 109.871C156.862 109.574 156.832 109.277 156.832 108.98C156.832 108.683 156.802 108.386 156.743 108.089C160.307 106.782 163.96 105.564 167.703 104.436V138.742C167.703 139.396 167.792 139.931 167.97 140.346C168.089 140.703 168.208 141.029 168.327 141.327C168.446 141.564 168.564 141.772 168.683 141.95C169.574 142.96 171.119 143.465 173.317 143.465V145.96ZM212.241 135.713C212.538 135.95 212.835 136.158 213.132 136.337C213.429 136.515 213.726 136.723 214.023 136.96C209.686 144.327 203.865 148.01 196.558 148.01C191.33 148.01 186.874 146.168 183.191 142.485C179.508 138.445 177.667 133.366 177.667 127.247C177.667 120.891 179.686 115.426 183.726 110.851C187.647 106.574 192.548 104.436 198.429 104.436C201.934 104.436 204.993 105.119 207.607 106.485C208.558 106.96 209.419 107.525 210.191 108.178C211.023 108.832 211.706 109.604 212.241 110.495C212.835 111.505 213.132 112.515 213.132 113.525C213.132 114.594 212.835 115.604 212.241 116.554C211.647 117.505 210.755 117.98 209.568 117.98C207.429 117.98 206.003 116.317 205.29 112.99C205.112 112.099 204.756 111.356 204.221 110.762C203.686 110.168 203.033 109.634 202.261 109.158C200.716 108.208 198.815 107.733 196.558 107.733C193.172 107.733 190.171 109.485 187.557 112.99C184.944 116.673 183.637 121.01 183.637 126C183.637 128.673 183.964 131.109 184.617 133.307C185.33 135.505 186.369 137.406 187.736 139.01C190.528 142.337 194.003 144 198.162 144C203.27 144 207.964 141.238 212.241 135.713ZM260.772 145.96C258.931 145.96 257.119 146.02 255.337 146.139C253.554 146.317 251.772 146.554 249.99 146.851C249.931 146.079 249.871 145.307 249.812 144.535C249.812 143.822 249.782 143.109 249.723 142.396C245.861 146.198 240.96 148.099 235.02 148.099C231.931 148.099 229.465 147.445 227.624 146.139C224.891 144.297 223.525 141.267 223.525 137.049V113.436C223.525 112.188 223.228 111.356 222.634 110.941C221.624 110.347 220.109 110.049 218.089 110.049C218.03 109.752 218 109.456 218 109.158C218 108.802 217.97 108.475 217.911 108.178C219.812 107.525 221.654 106.901 223.436 106.307C225.277 105.713 227.119 105.119 228.96 104.525V136.604C228.96 141.297 231.574 143.643 236.802 143.643C242.208 143.643 246.515 142.129 249.723 139.099V113.257C249.723 112.485 249.426 111.921 248.832 111.564C247.881 110.436 246.396 109.871 244.376 109.871C244.317 109.574 244.287 109.277 244.287 108.98C244.287 108.683 244.257 108.386 244.198 108.089C247.762 106.782 251.416 105.564 255.158 104.436V138.742C255.158 139.396 255.248 139.931 255.426 140.346C255.545 140.703 255.663 141.029 255.782 141.327C255.901 141.564 256.02 141.772 256.139 141.95C257.03 142.96 258.574 143.465 260.772 143.465V145.96ZM282.053 146.406H264.944V143.554C267.261 143.554 268.835 143.228 269.667 142.574C270.38 141.98 270.736 140.703 270.736 138.742V92.3168C270.736 91.3067 270.38 90.5938 269.667 90.1782C268.954 89.7028 267.439 89.4653 265.122 89.4653L264.588 87.3267C266.488 86.6138 268.419 85.9308 270.38 85.2772C272.34 84.5643 274.271 83.8514 276.172 83.1385V138.742C276.172 140.584 276.498 141.831 277.152 142.485C277.627 142.782 278.251 143.02 279.023 143.198C279.855 143.435 280.865 143.554 282.053 143.554V146.406ZM324.28 135.713C324.577 135.95 324.874 136.188 325.171 136.426C325.527 136.663 325.854 136.901 326.151 137.139C324.725 139.277 323.151 141.059 321.428 142.485C319.705 143.911 317.864 145.099 315.904 146.049C313.23 147.356 310.349 148.01 307.26 148.01C301.379 148.01 296.567 146.139 292.824 142.396C288.844 138.416 286.854 133.04 286.854 126.267C286.854 119.732 288.755 114.475 292.557 110.495C296.3 106.396 301.052 104.346 306.814 104.346C312.577 104.346 317.121 106.01 320.448 109.337C324.012 112.723 325.795 117.624 325.795 124.04C320.27 124.218 314.834 124.426 309.488 124.663C304.141 124.842 298.676 125.02 293.092 125.198C293.092 125.435 293.062 125.673 293.003 125.911C293.003 126.089 293.003 126.297 293.003 126.535C293.003 129.03 293.329 131.287 293.983 133.307C294.696 135.327 295.706 137.139 297.012 138.742C299.745 142.307 303.577 144.089 308.508 144.089C311.122 144.089 313.854 143.406 316.706 142.04C318.012 141.267 319.29 140.376 320.537 139.366C321.844 138.297 323.092 137.079 324.28 135.713ZM293.27 121.812C297.725 121.693 302.122 121.544 306.458 121.366C310.794 121.188 315.191 121.04 319.646 120.921C319.587 117 318.369 113.851 315.993 111.475C313.557 108.861 310.498 107.554 306.814 107.554C303.25 107.554 300.131 108.98 297.458 111.832C294.963 114.446 293.567 117.772 293.27 121.812ZM373.754 146.406H356.378V143.554C358.457 143.554 359.913 143.287 360.744 142.752C361.754 142.099 362.259 140.822 362.259 138.921V116.554C362.259 111.564 359.913 109.069 355.219 109.069C352.428 109.069 350.081 109.545 348.18 110.495C347.348 110.911 346.368 111.475 345.239 112.188C344.111 112.842 342.863 113.644 341.497 114.594V138.921C341.497 140.703 341.883 141.891 342.655 142.485C343.13 142.782 343.784 143.02 344.615 143.198C345.447 143.435 346.457 143.554 347.645 143.554V146.406H330.269V143.554C332.526 143.554 334.16 143.198 335.17 142.485C335.764 141.891 336.061 140.703 336.061 138.921V114.327C336.061 112.723 335.764 111.713 335.17 111.297C334.338 110.643 332.824 110.317 330.625 110.317C330.507 110.02 330.418 109.693 330.358 109.337C330.358 108.98 330.299 108.654 330.18 108.356C332.081 107.703 333.952 107.05 335.794 106.396C337.695 105.742 339.596 105.089 341.497 104.436V110.762C346.546 106.604 351.685 104.525 356.912 104.525C360.536 104.525 363.239 105.564 365.021 107.643C366.803 109.782 367.695 112.812 367.695 116.733V138.832C367.695 140.673 368.051 141.891 368.764 142.485C369.239 142.782 369.893 143.02 370.724 143.198C371.556 143.435 372.566 143.554 373.754 143.554V146.406ZM402.48 137.673C402.777 137.911 403.044 138.119 403.282 138.297C403.579 138.475 403.876 138.653 404.173 138.832C403.104 141.327 401.648 143.406 399.807 145.069C397.727 147.03 395.47 148.01 393.034 148.01C389.827 148.01 387.391 146.851 385.728 144.535C385.252 143.703 384.866 142.752 384.569 141.683C384.272 140.614 384.124 139.426 384.124 138.119V108.624H377.173V105.772C380.381 105.772 382.757 104.555 384.302 102.119C386.024 99.3265 386.886 95.3465 386.886 90.1782H389.559V105.148H401.232V108.624H389.559V138.742C389.559 141.891 391.222 143.465 394.549 143.465C397.223 143.465 399.866 141.535 402.48 137.673ZM415.559 107.02C419.123 105.357 423.222 104.525 427.856 104.525C431.598 104.525 434.628 105.505 436.945 107.465C439.44 109.723 440.687 112.871 440.687 116.911V139.99C440.687 140.287 440.687 140.644 440.687 141.059C440.747 141.475 440.806 141.891 440.865 142.307C440.984 142.723 441.133 143.079 441.311 143.376C441.549 143.673 441.816 143.822 442.113 143.822C443.004 143.822 444.281 143.168 445.946 141.861L447.015 143.198C444.4 146.347 442.084 147.921 440.063 147.921C437.45 147.921 435.875 146.258 435.341 142.931C431.658 146.258 426.964 147.921 421.261 147.921C419.301 147.921 417.519 147.713 415.915 147.297C414.371 146.881 413.063 146.228 411.994 145.337C409.796 143.495 408.697 140.911 408.697 137.584C408.697 135.089 409.529 132.861 411.192 130.901C412.915 128.881 415.113 127.218 417.786 125.911C422.361 123.535 428.183 121.901 435.252 121.01V115.485C435.252 113.168 434.539 111.297 433.113 109.871C432.282 109.039 431.301 108.445 430.172 108.089C429.103 107.733 427.945 107.554 426.697 107.554C424.321 107.554 422.301 108.03 420.638 108.98C419.628 109.634 418.826 110.287 418.232 110.941C417.638 111.534 417.341 112.218 417.341 112.99V113.436C417.341 116.346 416.064 117.802 413.509 117.802C411.192 117.802 410.034 116.465 410.034 113.792C410.034 111 411.876 108.743 415.559 107.02ZM435.252 124.396C430.024 124.931 425.182 126.416 420.727 128.851C416.688 131.109 414.667 133.99 414.667 137.495C414.667 139.396 415.44 140.94 416.984 142.129C418.529 143.257 420.46 143.822 422.776 143.822C424.915 143.822 427.143 143.406 429.46 142.574C431.361 141.921 433.291 140.792 435.252 139.188V124.396Z"
        fill={color}
      />
    </svg>
  );
};

LogoLargeIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
};

export default LogoLargeIcon;

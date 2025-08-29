export default function Loader() {
  return (
    <>
      <div className="w-32 h-32">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle
            fill="none"
            stroke-opacity="1"
            stroke="#4f46e5"
            stroke-width=".5"
            cx="100"
            cy="100"
            r="0"
          >
            <animate
              attributeName="r"
              calcMode="spline"
              dur="2"
              values="1;80"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="stroke-width"
              calcMode="spline"
              dur="2"
              values="0;25"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="stroke-opacity"
              calcMode="spline"
              dur="2"
              values="1;0"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            ></animate>
          </circle>
        </svg>
      </div>
    </>
  );
}

export function SadPicachu() {
  return (
    <>
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="black"
        stroke-width="4"
      >
        <circle cx="150" cy="100" r="50" />

        <path d="M120 40 Q115 10 130 30" fill="black" />
        <path d="M180 40 Q185 10 170 30" fill="black" />

        <circle cx="135" cy="90" r="5" fill="black" />
        <circle cx="165" cy="90" r="5" fill="black" />


        <path d="M135 125 Q150 115 165 125" />

  

        <path
          d="M100 190 L70 180 L90 160 L70 140 L110 150"
          fill="none"
          stroke="black"
          stroke-width="4"
        />
      </svg>
    </>
  );
}

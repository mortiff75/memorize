import { FormProvider } from "@/app/components/Form/FormProvider";
import { registerAction } from "../actions";
import RegisterForm from "@/app/components/Form/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* ============ LEFT SIDE - LOGIN FORM ============ */}

      <FormProvider action={registerAction}>
        <RegisterForm />
      </FormProvider>

      {/* ============ RIGHT SIDE - WELCOME PANEL ============ */}
      <div className="w-1/2 bg-linear-to-br from-[#9b6dff] via-[#8b5de0] to-[#7b4dd0] flex items-center justify-center relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-white/5 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center px-12">
          <h2 className="text-white text-5xl lg:text-6xl font-bold leading-tight mb-3">
            Welcome to
          </h2>
          <h2 className="text-white text-5xl lg:text-6xl font-bold leading-tight mb-3">
            student portal
          </h2>
          <p className="text-white/70 text-sm mb-16">
            Login to access your account
          </p>

          {/* ===== SVG ILLUSTRATION ===== */}
          <div className="flex justify-center">
            <svg
              width="520"
              height="380"
              viewBox="0 0 520 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-130"
            >
              {/* Safe / Vault body */}
              <rect
                x="180"
                y="100"
                width="160"
                height="200"
                rx="12"
                fill="white"
              />
              <rect
                x="180"
                y="100"
                width="160"
                height="200"
                rx="12"
                stroke="#1e1e22"
                strokeWidth="2"
              />

              {/* Safe door circle */}
              <circle
                cx="235"
                cy="200"
                r="50"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="2"
              />
              <circle
                cx="235"
                cy="200"
                r="35"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="1.5"
              />
              <circle
                cx="235"
                cy="200"
                r="12"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="1.5"
              />
              <circle cx="235" cy="200" r="5" fill="#1e1e22" />

              {/* Safe handle / wheel */}
              <circle
                cx="235"
                cy="200"
                r="50"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />

              {/* Safe lines/details */}
              <line
                x1="340"
                y1="140"
                x2="320"
                y2="140"
                stroke="#1e1e22"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="340"
                y1="160"
                x2="310"
                y2="160"
                stroke="#1e1e22"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="340"
                y1="180"
                x2="315"
                y2="180"
                stroke="#1e1e22"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="340"
                y1="200"
                x2="310"
                y2="200"
                stroke="#1e1e22"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="340"
                y1="220"
                x2="325"
                y2="220"
                stroke="#1e1e22"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="340"
                y1="240"
                x2="315"
                y2="240"
                stroke="#1e1e22"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Lock dots on safe */}
              <circle cx="220" cy="260" r="3" fill="#1e1e22" />
              <circle cx="250" cy="260" r="3" fill="#1e1e22" />

              {/* ========== PERSON 1 - Standing with phone ========== */}
              {/* Head */}
              <circle
                cx="140"
                cy="105"
                r="18"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="2"
              />
              {/* Hair */}
              <path
                d="M125 100 Q125 85 140 85 Q155 85 155 100 Q152 90 140 90 Q128 90 125 100Z"
                fill="#1e1e22"
              />
              {/* Body / Suit */}
              <path
                d="M125 125 L130 200 L150 200 L155 125"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="2"
              />
              {/* Backpack strap */}
              <path
                d="M150 130 Q160 140 160 155"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
              />
              <rect
                x="155"
                y="140"
                width="12"
                height="18"
                rx="3"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="1.5"
              />
              {/* Left arm */}
              <path
                d="M130 145 L115 170 L105 190"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Right arm holding phone */}
              <path
                d="M150 140 L165 160 L155 175"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Phone */}
              <rect
                x="142"
                y="170"
                width="12"
                height="20"
                rx="3"
                fill="#1e1e22"
              />
              {/* Left leg */}
              <path
                d="M130 200 L120 270 L115 310"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Right leg */}
              <path
                d="M150 200 L160 260 L170 290"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Left shoe */}
              <path
                d="M115 310 L100 310 L100 305"
                fill="#1e1e22"
                stroke="#1e1e22"
                strokeWidth="2"
              />
              {/* Right shoe */}
              <path
                d="M170 290 L180 290 L178 285"
                fill="#1e1e22"
                stroke="#1e1e22"
                strokeWidth="2"
              />

              {/* ========== PERSON 2 - Sitting with laptop ========== */}
              {/* Head */}
              <circle
                cx="380"
                cy="90"
                r="18"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="2"
              />
              {/* Hair */}
              <path
                d="M365 85 Q365 70 380 70 Q395 70 395 85 Q392 75 380 75 Q368 75 365 85Z"
                fill="#1e1e22"
              />
              {/* Body */}
              <path
                d="M365 110 L360 180 L390 180 L395 110"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="2"
              />
              {/* Left arm on laptop */}
              <path
                d="M370 130 L355 150 L350 160"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Right arm on keyboard */}
              <path
                d="M390 130 L410 145 L420 155"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Laptop */}
              <rect
                x="395"
                y="150"
                width="50"
                height="8"
                rx="2"
                fill="#1e1e22"
              />
              <path d="M395 150 L390 145 L450 145 L445 150" fill="#1e1e22" />
              {/* Left leg - bent */}
              <path
                d="M360 180 L340 230 L320 260"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Right leg - extended */}
              <path
                d="M390 180 L420 220 L440 240"
                fill="none"
                stroke="#1e1e22"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Left shoe */}
              <path
                d="M320 260 L310 270 L315 275"
                fill="#1e1e22"
                stroke="#1e1e22"
                strokeWidth="2"
              />
              {/* Right shoe */}
              <path
                d="M440 240 L455 235 L452 230"
                fill="#1e1e22"
                stroke="#1e1e22"
                strokeWidth="2"
              />

              {/* ========== PLANT / POT ========== */}
              {/* Pot */}
              <path d="M440 300 L435 340 L475 340 L470 300" fill="#1e1e22" />
              {/* Leaves */}
              <path
                d="M455 300 Q440 260 430 240 Q450 255 455 300"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="1.5"
              />
              <path
                d="M455 300 Q470 250 480 230 Q465 255 455 300"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="1.5"
              />
              <path
                d="M455 300 Q460 240 455 220 Q450 250 455 300"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="1.5"
              />
              <path
                d="M455 300 Q480 270 490 260 Q475 275 455 300"
                fill="white"
                stroke="#1e1e22"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;

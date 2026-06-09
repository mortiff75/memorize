"use client";

const Root = ({ children, action }) => {
  return (
    <div className="w-1/2 bg-[#1e1e22] flex items-center justify-center p-10">
      <div className="w-full max-w-sm">
        <form action={action}>
          {/* Username */}
          {children}
        </form>
      </div>
    </div>
  );
};

const Input = ({ name, type, error, value }) => {
  return (
    <div className="mb-6">
      <input
        type={type || "text"}
        name={name}
        placeholder={name}
        defaultValue={value ?? ""}
        required
        className="w-full bg-transparent border-b border-gray-600 text-white text-sm py-3 pr-10 focus:outline-none focus:border-purple-400 placeholder-gray-500 transition-colors duration-300 peer"
      />
      {error && (
        <p className="text-red-500 text-sm peer-valid:hidden  transition-all duration-100">
          {error}
        </p>
      )}
    </div>
  );
};

function SubmitBtn({ title, isDisabled }) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="w-full bg-[#9b6dff] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#8b5dd0] active:scale-[0.98] transition-all duration-200"
    >
      {isDisabled ? "Loading..." : title}
    </button>
  );
}

function Header({ title, subTitle }) {
  return (
    <>
      <h1 className="text-white text-4xl font-bold mb-3">{title}</h1>
      <p className="text-gray-400 text-sm mb-10">{subTitle}</p>
    </>
  );
}

export { Input, Header, Root, SubmitBtn };

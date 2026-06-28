import "./loader.css";

export function Loader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
      </div>
    </div>
  );
}

import pedrito from "assets/pedrito.png";

/**
 * Loader component, to use set relative on the element which will be covered by the spinner
 * @returns LoaderComponent
 */
const Loader = () => (
  <>
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="relative square animate-spin rounded-full border-2 border-black flex justify-center items-cente">
        <img
          className="absolute top-1/3 w-auto h-10"
          src={pedrito}
          alt="pedrito"
          //   style={{  }}
        />
      </div>
    </div>
    <div className="absolute bg-black opacity-10 top-0 left-0 w-full h-full" />
  </>
);

export default Loader;

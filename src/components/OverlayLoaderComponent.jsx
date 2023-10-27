import { Circles } from "react-loader-spinner";

function OverlayLoaderComponent() {
  return (
    <main className="fixed w-full h-full bg-black/60 top-0 left-0 flex items-center justify-center">
      <Circles
        height="80"
        width="80"
        color="#ff9800"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </main>
  );
}

export default OverlayLoaderComponent;
